
import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import pool from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function normalizeEmail(value) {
  return String(value ?? "").trim().toLowerCase();
}

function validEmail(email) {
  return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function otpDigest(otp) {
  const secret = process.env.OTP_HASH_SECRET || process.env.AUTH_SECRET || process.env.RESEND_API_KEY;
  if (!secret) throw new Error("Configure OTP_HASH_SECRET in .env.local.");
  return createHmac("sha256", secret).update(otp).digest("hex");
}

function safeEqualHex(left, right) {
  if (!/^[a-f0-9]{64}$/i.test(left || "") || !/^[a-f0-9]{64}$/i.test(right || "")) return false;
  return timingSafeEqual(Buffer.from(left, "hex"), Buffer.from(right, "hex"));
}

export async function POST(request) {
  let connection;
  try {
    const body = await request.json();
    const email = normalizeEmail(body?.email);
    const challengeId = String(body?.challengeId ?? "");
    const otp = String(body?.otp ?? "").trim();

    if (!validEmail(email) || !/^\d{6}$/.test(otp) || !/^[0-9a-f-]{36}$/i.test(challengeId)) {
      return NextResponse.json({ success: false, message: "Enter the six-digit OTP sent to your email." }, { status: 400 });
    }

    connection = await pool.getConnection();
    await connection.beginTransaction();

    const [rows] = await connection.execute(
      `SELECT id, email, otp_hash, expires_at, verified_at, consumed_at, attempts
       FROM appointment_email_otps
       WHERE challenge_id = ? AND email = ?
       LIMIT 1 FOR UPDATE`,
      [challengeId, email]
    );

    if (!rows.length) {
      await connection.rollback();
      return NextResponse.json({ success: false, message: "OTP request not found. Please request a new OTP." }, { status: 404 });
    }

    const row = rows[0];
    if (row.verified_at || row.consumed_at) {
      await connection.rollback();
      return NextResponse.json({ success: false, message: "This OTP request has already been used. Please request a new OTP." }, { status: 409 });
    }
    if (new Date(row.expires_at).getTime() <= Date.now()) {
      await connection.rollback();
      return NextResponse.json({ success: false, message: "OTP expired. Please request a new one." }, { status: 410 });
    }
    if (Number(row.attempts) >= 5) {
      await connection.rollback();
      return NextResponse.json({ success: false, message: "Too many incorrect attempts. Please request a new OTP." }, { status: 429 });
    }

    const candidate = otpDigest(otp);
    if (!safeEqualHex(candidate, row.otp_hash)) {
      await connection.execute(
        `UPDATE appointment_email_otps SET attempts = attempts + 1 WHERE id = ?`,
        [row.id]
      );
      await connection.commit();
      return NextResponse.json({ success: false, message: "Incorrect OTP. Please check the code and try again." }, { status: 400 });
    }

    const verificationToken = randomBytes(32).toString("hex");
    const tokenHash = createHash("sha256").update(verificationToken).digest("hex");

    await connection.execute(
      `UPDATE appointment_email_otps
       SET verified_at = NOW(), verification_token_hash = ?,
           expires_at = DATE_ADD(NOW(), INTERVAL 15 MINUTE)
       WHERE id = ? AND verified_at IS NULL AND consumed_at IS NULL`,
      [tokenHash, row.id]
    );
    await connection.commit();

    return NextResponse.json({
      success: true,
      verificationToken,
      message: "Email verified successfully.",
    });
  } catch (error) {
    if (connection) {
      try { await connection.rollback(); } catch {}
    }
    console.error("Verify appointment OTP error:", error);
    return NextResponse.json({ success: false, message: "Unable to verify OTP right now." }, { status: 500 });
  } finally {
    connection?.release();
  }
}