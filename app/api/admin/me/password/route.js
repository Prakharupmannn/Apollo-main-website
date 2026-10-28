import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const currentPassword = String(body.current ?? "");
    const newPassword     = String(body.next    ?? "");
    const confirmPassword = String(body.confirm ?? "");

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json({ success: false, message: "All password fields are required." }, { status: 400 });
    }
    if (newPassword.length < 8) {
      return NextResponse.json({ success: false, message: "New password must be at least 8 characters." }, { status: 400 });
    }
    if (newPassword !== confirmPassword) {
      return NextResponse.json({ success: false, message: "Passwords do not match." }, { status: 400 });
    }

    const [rows] = await pool.execute(
      `SELECT password_hash FROM users WHERE id = ? AND deleted_at IS NULL LIMIT 1`,
      [session.id]
    );
    if (!rows[0]) {
      return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
    }

    const valid = await bcrypt.compare(currentPassword, rows[0].password_hash);
    if (!valid) {
      return NextResponse.json({ success: false, message: "Current password is incorrect." }, { status: 401 });
    }

    const hash = await bcrypt.hash(newPassword, 12);
    await pool.execute(
      `UPDATE users SET password_hash = ?, failed_login_attempts = 0, locked_until = NULL WHERE id = ? AND deleted_at IS NULL`,
      [hash, session.id]
    );

    return NextResponse.json({ success: true, message: "Password updated successfully." });
  } catch (err) {
    console.error("POST /api/admin/me/password error:", err.message);
    return NextResponse.json({ success: false, message: "Failed to update password." }, { status: 500 });
  }
}
