import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ── helpers ─────────────────────────────────────────── */

async function requireAdmin() {
  const session = await getAdminSession();
  return session ?? null;
}

function validEmail(e) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
}

function parseStatus(raw) {
  if (raw === 0 || raw === "0" || raw === "Inactive") return 0;
  return 1;
}

/* ── GET — list all non-deleted users (no password_hash) */
export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const [rows] = await pool.execute(
      `SELECT id, name, email, username, status, last_login_at, created_at
       FROM users
       WHERE deleted_at IS NULL
       ORDER BY id DESC`
    );

    return NextResponse.json({ success: true, users: rows });
  } catch (error) {
    console.error("GET /api/admin/users error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch users." },
      { status: 500 }
    );
  }
}

/* ── POST — register a new admin user ─────────────────── */
export async function POST(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const name     = String(body.name     ?? "").trim();
    const email    = String(body.email    ?? "").trim().toLowerCase();
    const username = String(body.username ?? "").trim().toLowerCase() || email;
    const password = String(body.password ?? "");
    const status   = parseStatus(body.status);

    if (!name || name.length > 200)
      return NextResponse.json(
        { success: false, message: "Full name is required." },
        { status: 400 }
      );
    if (!email || !validEmail(email))
      return NextResponse.json(
        { success: false, message: "A valid email address is required." },
        { status: 400 }
      );
    if (!password || password.length < 8 || password.length > 1024)
      return NextResponse.json(
        { success: false, message: "Password must be at least 8 characters." },
        { status: 400 }
      );

    // Duplicate check
    const [existing] = await pool.execute(
      `SELECT id FROM users
       WHERE (email = ? OR username = ?) AND deleted_at IS NULL
       LIMIT 1`,
      [email, username]
    );
    if (existing.length > 0)
      return NextResponse.json(
        { success: false, message: "A user with this email or username already exists." },
        { status: 409 }
      );

    const passwordHash = await bcrypt.hash(password, 12);

    const [result] = await pool.execute(
      `INSERT INTO users (name, email, username, password_hash, status)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, username, passwordHash, status]
    );

    return NextResponse.json({
      success: true,
      message: "User registered successfully.",
      id: result.insertId,
    });
  } catch (error) {
    console.error("POST /api/admin/users error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to register user." },
      { status: 500 }
    );
  }
}

/* ── PATCH — update an existing user ─────────────────── */
export async function PATCH(request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { id } = body;
    if (!id)
      return NextResponse.json(
        { success: false, message: "User ID is required." },
        { status: 400 }
      );

    const name        = String(body.name        ?? "").trim();
    const email       = String(body.email       ?? "").trim().toLowerCase();
    const username    = String(body.username    ?? "").trim().toLowerCase() || email;
    const newPassword = String(body.newPassword ?? "");
    const status      = parseStatus(body.status);

    if (!name)
      return NextResponse.json(
        { success: false, message: "Full name is required." },
        { status: 400 }
      );
    if (!email || !validEmail(email))
      return NextResponse.json(
        { success: false, message: "A valid email address is required." },
        { status: 400 }
      );

    // Duplicate check (excluding current user)
    const [dup] = await pool.execute(
      `SELECT id FROM users
       WHERE (email = ? OR username = ?) AND id != ? AND deleted_at IS NULL
       LIMIT 1`,
      [email, username, id]
    );
    if (dup.length > 0)
      return NextResponse.json(
        { success: false, message: "Email or username is already in use by another user." },
        { status: 409 }
      );

    // Last-active-admin guard when deactivating
    if (status === 0) {
      const [[{ activeCount }]] = await pool.execute(
        `SELECT COUNT(*) AS activeCount
         FROM users
         WHERE status = 1 AND deleted_at IS NULL AND id != ?`,
        [id]
      );
      if (Number(activeCount) === 0)
        return NextResponse.json(
          { success: false, message: "Cannot deactivate the last active administrator." },
          { status: 409 }
        );
    }

    if (newPassword) {
      if (newPassword.length < 8 || newPassword.length > 1024)
        return NextResponse.json(
          { success: false, message: "New password must be at least 8 characters." },
          { status: 400 }
        );
      const hash = await bcrypt.hash(newPassword, 12);
      await pool.execute(
        `UPDATE users
         SET name = ?, email = ?, username = ?, status = ?,
             password_hash = ?, failed_login_attempts = 0, locked_until = NULL
         WHERE id = ? AND deleted_at IS NULL`,
        [name, email, username, status, hash, id]
      );
    } else {
      await pool.execute(
        `UPDATE users
         SET name = ?, email = ?, username = ?, status = ?
         WHERE id = ? AND deleted_at IS NULL`,
        [name, email, username, status, id]
      );
    }

    return NextResponse.json({ success: true, message: "User updated successfully." });
  } catch (error) {
    console.error("PATCH /api/admin/users error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to update user." },
      { status: 500 }
    );
  }
}

/* ── DELETE — soft-delete a user ─────────────────────── */
export async function DELETE(request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { id } = body;
    if (!id)
      return NextResponse.json(
        { success: false, message: "User ID is required." },
        { status: 400 }
      );

    // Prevent self-deletion
    if (String(id) === String(session.id))
      return NextResponse.json(
        { success: false, message: "You cannot delete your own account." },
        { status: 409 }
      );

    // Last-active-admin guard
    const [[{ activeCount }]] = await pool.execute(
      `SELECT COUNT(*) AS activeCount
       FROM users
       WHERE status = 1 AND deleted_at IS NULL AND id != ?`,
      [id]
    );
    if (Number(activeCount) === 0)
      return NextResponse.json(
        { success: false, message: "Cannot delete the last active administrator." },
        { status: 409 }
      );

    await pool.execute(
      `UPDATE users SET deleted_at = NOW(), status = 0
       WHERE id = ? AND deleted_at IS NULL`,
      [id]
    );

    return NextResponse.json({ success: true, message: "User removed successfully." });
  } catch (error) {
    console.error("DELETE /api/admin/users error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to delete user." },
      { status: 500 }
    );
  }
}
