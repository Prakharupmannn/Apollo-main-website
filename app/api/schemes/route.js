import { callHisApi, apiError } from "@/lib/his-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await callHisApi("get_appointment_schemes");

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    return apiError(error, "Unable to fetch schemes");
  }
}