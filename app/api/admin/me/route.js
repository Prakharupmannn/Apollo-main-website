import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const [rows] = await pool.execute(
      `SELECT id, name, email, username, status, last_login_at, created_at
       FROM users WHERE id = ? AND deleted_at IS NULL LIMIT 1`,
      [session.id]
    );
    if (!rows[0]) {
      return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
    }
    return NextResponse.json({ success: true, user: rows[0] });
  } catch (err) {
    console.error("GET /api/admin/me error:", err.message);
    return NextResponse.json({ success: false, message: "Failed to fetch profile." }, { status: 500 });
  }
}

export async function PATCH(request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const body  = await request.json();
    const name  = String(body.name  ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const phone = String(body.phone ?? "").trim();

    if (!name) return NextResponse.json({ success: false, message: "Full name is required." }, { status: 400 });
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, message: "A valid email address is required." }, { status: 400 });
    }

    // Duplicate email check (exclude self)
    const [dup] = await pool.execute(
      `SELECT id FROM users WHERE email = ? AND id != ? AND deleted_at IS NULL LIMIT 1`,
      [email, session.id]
    );
    if (dup.length > 0) {
      return NextResponse.json({ success: false, message: "This email is already in use." }, { status: 409 });
    }

    // Try with phone column first, fall back to just name+email
    try {
      await pool.execute(
        `UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ? AND deleted_at IS NULL`,
        [name, email, phone || null, session.id]
      );
    } catch (colErr) {
      if (colErr.code === "ER_BAD_FIELD_ERROR") {
        // phone column doesn't exist — update without it
        await pool.execute(
          `UPDATE users SET name = ?, email = ? WHERE id = ? AND deleted_at IS NULL`,
          [name, email, session.id]
        );
      } else {
        throw colErr;
      }
    }

    return NextResponse.json({ success: true, message: "Profile updated successfully." });
  } catch (err) {
    console.error("PATCH /api/admin/me error:", err.message);
    return NextResponse.json({ success: false, message: "Failed to update profile." }, { status: 500 });
  }
}
