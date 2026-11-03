
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const doctorId = searchParams.get("drid");
    const appointmentDate = searchParams.get("bookdt");

    if (!doctorId || !/^\d+$/.test(doctorId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid doctor ID is required.",
          data: [],
        },
        { status: 400 }
      );
    }

    if (
      !appointmentDate ||
      !/^\d{4}-\d{2}-\d{2}$/.test(appointmentDate)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid appointment date.",
          data: [],
        },
        { status: 400 }
      );
    }

    const baseUrl = process.env.HIS_PHP_API_BASE_URL;

    if (!baseUrl) {
      throw new Error("HIS PHP API URL is not configured.");
    }

    const params = new URLSearchParams({
      drid: doctorId,
      bookdt: appointmentDate,
    });

    const response = await fetch(
      `${baseUrl}/get_doctor_slots?${params.toString()}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Accept: "application/json",
        },
      }
    );

    const result = await response.json();

    // CodeIgniter response:
    // { response: [], message: "...", status: "1" }

    const success =
      response.ok && String(result.status) === "1";

    return NextResponse.json(
      {
        success,
        message: result.message || "Unable to load appointment slots.",
        data: success && Array.isArray(result.response)
          ? result.response
          : [],
      },
      { status: success ? 200 : response.ok ? 400 : response.status }
    );
  } catch (error) {
    console.error("PHP doctor slots proxy error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load slots. Please try again.",
        data: [],
      },
      { status: 502 }
    );
  }
}