import { NextResponse } from "next/server";
import {
  claimAppointmentEmailVerification,
  releaseAppointmentEmailVerification,
} from "@/lib/appointment-email-otp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  let claim = null;
  let hisRequestStarted = false;

  try {
    const body = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        {
          status: false,
          message: "Invalid appointment request.",
          data: null,
        },
        { status: 400 }
      );
    }

    // Email verification is mandatory before booking.
    const email = String(body.email ?? "").trim().toLowerCase();
    const verificationToken = String(
      body.emailVerificationToken ?? ""
    ).trim();

    if (!email || !verificationToken) {
      return NextResponse.json(
        {
          status: false,
          message: "Please verify your email with OTP before booking.",
          data: null,
        },
        { status: 403 }
      );
    }

    const baseUrl = process.env.HIS_PHP_API_BASE_URL;
    const apiKey = process.env.HIS_PHP_API_KEY;

    if (!baseUrl || !apiKey) {
      console.error("HIS PHP API configuration is missing.");

      return NextResponse.json(
        {
          status: false,
          message: "Appointment service is not configured.",
          data: null,
        },
        { status: 500 }
      );
    }

    // Atomically claim the verified token to prevent reuse.
    claim = await claimAppointmentEmailVerification(
      email,
      verificationToken
    );

    // Do not send the verification token to the PHP HIS API.
    const {
      emailVerificationToken: _verificationToken,
      ...bookingBody
    } = body;

    const payload = {
      ...bookingBody,
      email,
      KEY: apiKey,
    };

    // From this point, the booking outcome may become uncertain.
    hisRequestStarted = true;

    const response = await fetch(
      `${baseUrl.replace(/\/+$/, "")}/save_appointment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
        signal: AbortSignal.timeout(20000),
      }
    );

    let result;

    try {
      result = await response.json();
    } catch {
      // HIS may have saved the booking even if its response is invalid.
      console.error("HIS appointment API returned invalid JSON.");

      return NextResponse.json(
        {
          status: false,
          message:
            "Booking status could not be confirmed. Please contact the hospital before trying again.",
          data: null,
        },
        { status: 502 }
      );
    }

    const success = response.ok && String(result?.status) === "1";

    if (success) {
      return NextResponse.json(
        {
          status: true,
          message:
            result.message || "Appointment booked successfully.",
          data: result.response ?? null,
        },
        { status: 200 }
      );
    }

    // Release only when the HIS API returned a valid, explicit failure.
    // A transport failure or malformed response is handled separately.
    await releaseAppointmentEmailVerification(claim.id);
    claim = null;

    return NextResponse.json(
      {
        status: false,
        message: result?.message || "Unable to save appointment.",
        data: null,
      },
      {
        status: response.ok ? 400 : response.status,
      }
    );
  } catch (error) {
    console.error("Appointment save proxy error:", error);

    // Before contacting HIS, the token can safely be released.
    // Once the request starts, a network error may leave the outcome unknown.
    if (claim && !hisRequestStarted) {
      try {
        await releaseAppointmentEmailVerification(claim.id);
      } catch (releaseError) {
        console.error(
          "Unable to release email verification claim:",
          releaseError
        );
      }
    }

    const statusCode =
      Number(error?.statusCode) >= 400 &&
      Number(error?.statusCode) < 500
        ? Number(error.statusCode)
        : 502;

    return NextResponse.json(
      {
        status: false,
        message:
          statusCode === 403 || statusCode === 409
            ? error.message
            : hisRequestStarted
              ? "Booking status could not be confirmed. Please contact the hospital before trying again."
              : "Unable to save appointment. Please try again.",
        data: null,
      },
      { status: statusCode }
    );
  }
}