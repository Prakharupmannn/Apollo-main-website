import { NextResponse } from "next/server";
import { callHisApi, apiError } from "@/lib/his-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const doctors = await callHisApi("get_appointment_doctors");

    return NextResponse.json({
      success: true,
      data: doctors.map((doctor) => ({
        id: Number(doctor.id),
        name: doctor.name,
      })),
    });
  } catch (error) {
    console.error("Appointment doctors API error:", error);

    return apiError(error, "Unable to fetch consultants.");
  }
}