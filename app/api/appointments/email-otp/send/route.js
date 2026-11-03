
import { randomInt, randomUUID, createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import pool from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OTP_TTL_MINUTES = 5;
const RESEND_COOLDOWN_SECONDS = 60;
const MAX_SENDS_PER_HOUR = 5;

function normalizeEmail(value) {
  return String(value ?? "").trim().toLowerCase();
}

function validEmail(email) {
  return (
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  );
}

function otpDigest(otp) {
  const secret =
    process.env.OTP_HASH_SECRET ||
    process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("OTP_HASH_SECRET or AUTH_SECRET is missing.");
  }

  return createHmac("sha256", secret)
    .update(otp)
    .digest("hex");
}

export async function POST(request) {
  let connection;
  let transactionStarted = false;

  try {
    // Validate request body.
    let body;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body. Please send valid JSON.",
        },
        { status: 400 }
      );
    }

    const email = normalizeEmail(body?.email);

    if (!validEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Enter a valid email address.",
        },
        { status: 400 }
      );
    }

    // Validate SMTP configuration.
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_APP_PASSWORD;

    if (!smtpUser || !smtpPassword) {
      console.error("SMTP configuration is missing.");

      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured.",
        },
        { status: 500 }
      );
    }

    // Validate OTP hashing configuration.
    const secret =
      process.env.OTP_HASH_SECRET ||
      process.env.AUTH_SECRET;

    if (!secret) {
      console.error("OTP hashing secret is missing.");

      return NextResponse.json(
        {
          success: false,
          message: "OTP service is not configured.",
        },
        { status: 500 }
      );
    }

    // Start database transaction.
    connection = await pool.getConnection();
    await connection.beginTransaction();
    transactionStarted = true;

    // Enforce resend cooldown.
    const [recentRows] = await connection.execute(
      `SELECT id, last_sent_at
       FROM appointment_email_otps
       WHERE email = ?
         AND last_sent_at >= DATE_SUB(
           NOW(), INTERVAL ? SECOND
         )
       ORDER BY last_sent_at DESC
       LIMIT 1 FOR UPDATE`,
      [email, RESEND_COOLDOWN_SECONDS]
    );

    if (recentRows.length > 0) {
      await connection.rollback();
      transactionStarted = false;

      return NextResponse.json(
        {
          success: false,
          message:
            "Please wait 60 seconds before requesting another OTP.",
        },
        { status: 429 }
      );
    }

    // Enforce hourly send limit.
    const [hourRows] = await connection.execute(
      `SELECT COUNT(*) AS total
       FROM appointment_email_otps
       WHERE email = ?
         AND last_sent_at >= DATE_SUB(NOW(), INTERVAL 1 HOUR)`,
      [email]
    );

    if (
      Number(hourRows[0]?.total || 0) >=
      MAX_SENDS_PER_HOUR
    ) {
      await connection.rollback();
      transactionStarted = false;

      return NextResponse.json(
        {
          success: false,
          message:
            "OTP request limit reached. Please try again later.",
        },
        { status: 429 }
      );
    }

    // Generate OTP and challenge.
    const otp = String(
      randomInt(0, 1_000_000)
    ).padStart(6, "0");

    const challengeId = randomUUID();
    const hash = otpDigest(otp);

    await connection.execute(
      `INSERT INTO appointment_email_otps
        (
          challenge_id,
          email,
          otp_hash,
          expires_at,
          attempts,
          last_sent_at,
          created_at
        )
       VALUES (
          ?, ?, ?, DATE_ADD(NOW(), INTERVAL ? MINUTE),
          0, NOW(), NOW()
       )`,
      [
        challengeId,
        email,
        hash,
        OTP_TTL_MINUTES,
      ]
    );

    await connection.commit();
    transactionStarted = false;

    // Release connection before sending email.
    connection.release();
    connection = null;

    // Send OTP email.
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    try {
      await transporter.sendMail({
        from: `"Apollo JBP Hospitals" <${smtpUser}>`,
        to: email,
        subject:
          "Apollo JBP - Appointment Email Verification",
        text: `Your Apollo JBP appointment verification OTP is ${otp}. It expires in ${OTP_TTL_MINUTES} minutes. Do not share this code with anyone.`,
        html: `
          <div style="font-family:Arial,sans-serif;padding:24px">
            <h2>Apollo JBP Hospitals</h2>
            <p>Your appointment verification OTP is:</p>
            <h1 style="letter-spacing:8px">${otp}</h1>
            <p>This code expires in ${OTP_TTL_MINUTES} minutes.</p>
            <p>Never share your OTP with anyone.</p>
          </div>
        `,
      });
    } catch (mailError) {
      console.error("Gmail SMTP OTP failed:", mailError);

      // Invalidate OTP if email delivery fails.
      try {
        await pool.execute(
          `UPDATE appointment_email_otps
           SET expires_at = NOW()
           WHERE challenge_id = ?
             AND verified_at IS NULL`,
          [challengeId]
        );
      } catch (cleanupError) {
        console.error(
          "Failed to invalidate undelivered OTP:",
          cleanupError
        );
      }

      return NextResponse.json(
        {
          success: false,
          message:
            "Could not send OTP. Please try again shortly.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      challengeId,
      message:
        "OTP sent to your email. It expires in 5 minutes.",
    });
  } catch (error) {
    // Roll back only if a transaction is active.
    if (connection && transactionStarted) {
      try {
        await connection.rollback();
      } catch (rollbackError) {
        console.error(
          "OTP transaction rollback failed:",
          rollbackError
        );
      }
    }

    console.error("Send appointment OTP error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to send OTP right now.",
      },
      { status: 500 }
    );
  } finally {
    // Always release a connection that is still held.
    if (connection) {
      try {
        connection.release();
      } catch (releaseError) {
        console.error(
          "Database connection release failed:",
          releaseError
        );
      }
    }
  }
}