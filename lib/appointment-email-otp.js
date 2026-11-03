
import { createHash, timingSafeEqual } from "node:crypto";
import pool from "@/lib/db";

/**
 * Call this from app/api/appointments/save/route.js before inserting into HIS.
 * The token is checked against the verified email and is claimed atomically.
 * If the HIS booking fails, call releaseAppointmentEmailVerification(claim.id).
 */
export async function claimAppointmentEmailVerification(emailValue, tokenValue) {
  const email = String(emailValue ?? "").trim().toLowerCase();
  const token = String(tokenValue ?? "").trim();
  if (!email || !/^[a-f0-9]{64}$/i.test(token)) {
    const error = new Error("Please verify your email with OTP before booking.");
    error.statusCode = 403;
    throw error;
  }

  const tokenHash = createHash("sha256").update(token).digest("hex");
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [rows] = await connection.execute(
      `SELECT id
       FROM appointment_email_otps
       WHERE email = ? AND verification_token_hash = ?
         AND verified_at IS NOT NULL AND consumed_at IS NULL
         AND expires_at > NOW()
       ORDER BY verified_at DESC
       LIMIT 1 FOR UPDATE`,
      [email, tokenHash]
    );
    if (!rows.length) {
      await connection.rollback();
      const error = new Error("Email verification is missing or expired. Please verify your email again.");
      error.statusCode = 403;
      throw error;
    }

    const id = Number(rows[0].id);
    const [result] = await connection.execute(
      `UPDATE appointment_email_otps
       SET consumed_at = NOW()
       WHERE id = ? AND consumed_at IS NULL AND expires_at > NOW()`,
      [id]
    );
    if (result.affectedRows !== 1) {
      await connection.rollback();
      const error = new Error("Email verification has already been used. Please verify your email again.");
      error.statusCode = 409;
      throw error;
    }
    await connection.commit();
    return { id };
  } catch (error) {
    try { await connection.rollback(); } catch {}
    throw error;
  } finally {
    connection.release();
  }
}

/** Restore the token only if the HIS booking failed before it could complete. */
export async function releaseAppointmentEmailVerification(id) {
  if (!id) return;
  await pool.execute(
    `UPDATE appointment_email_otps
     SET consumed_at = NULL
     WHERE id = ? AND consumed_at IS NOT NULL`,
    [id]
  );
}

