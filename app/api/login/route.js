import { NextResponse } from "next/server";
import { SignJWT } from "jose";
import bcrypt from "bcryptjs";
import pool from "@/lib/db";
import { SESSION_COOKIE } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();

    const login = String(body.login ?? "").trim();
    const password = body.password;

    // Validate input
    if (
      !login ||
      typeof password !== "string" ||
      !password ||
      login.length > 190 ||
      password.length > 1024
    ) {
      return NextResponse.json(
        { message: "Enter valid login credentials." },
        { status: 400 }
      );
    }

    // Find user by email or username
    const [rows] = await pool.execute(
      `SELECT id, name, email, username, password_hash,
              status, locked_until
       FROM users
       WHERE (email = ? OR username = ?)
         AND deleted_at IS NULL
       LIMIT 1`,
      [login, login]
    );

    const user = rows[0];

    // Check account status
    if (!user || Number(user.status) !== 1) {
      return NextResponse.json(
        { message: "Invalid credentials or inactive account." },
        { status: 401 }
      );
    }

    // Check account lock
    if (
      user.locked_until &&
      new Date(user.locked_until).getTime() > Date.now()
    ) {
      return NextResponse.json(
        {
          message: "Account temporarily locked. Try again later.",
        },
        { status: 423 }
      );
    }

    // Verify password
    const validPassword = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!validPassword) {
      await pool.execute(
        `UPDATE users
         SET failed_login_attempts = failed_login_attempts + 1,
             locked_until = CASE
               WHEN failed_login_attempts + 1 >= 5
               THEN DATE_ADD(NOW(), INTERVAL 15 MINUTE)
               ELSE locked_until
             END
         WHERE id = ?`,
        [user.id]
      );

      return NextResponse.json(
        { message: "Invalid credentials or inactive account." },
        { status: 401 }
      );
    }

    // Validate authentication secret
    const secretValue = process.env.AUTH_SECRET;

    if (!secretValue || secretValue.length < 32) {
      console.error("AUTH_SECRET is missing or too short.");

      return NextResponse.json(
        { message: "Authentication is not configured." },
        { status: 500 }
      );
    }

    // Create JWT
    const secret = new TextEncoder().encode(secretValue);

    const token = await new SignJWT({
      role: "admin",
      name: user.name,
      email: user.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(String(user.id))
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(secret);

    // Update login information and reset failed attempts
    await pool.execute(
      `UPDATE users
       SET last_login_at = NOW(),
           failed_login_attempts = 0,
           locked_until = NULL
       WHERE id = ?`,
      [user.id]
    );

    // Send successful response
    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
      user: {
        id: String(user.id),
        name: user.name,
        email: user.email,
      },
    });

    // Set secure session cookie
    response.cookies.set(SESSION_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 8 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Admin login failed:", error);

    return NextResponse.json(
      { message: "Unable to log in. Please try again." },
      { status: 500 }
    );
  }
}
