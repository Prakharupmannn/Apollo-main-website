import { callHisApi, apiError } from "@/lib/his-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const stateId = Number(searchParams.get("stateId"));

  if (!Number.isSafeInteger(stateId) || stateId <= 0) {
    return Response.json(
      {
        success: false,
        message: "Valid stateId is required",
        data: [],
      },
      { status: 400 }
    );
  }

  try {
    const data = await callHisApi("pat_district", { stateId });

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    return apiError(error, "Unable to fetch districts");
  }
}