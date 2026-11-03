import { callHisApi, apiError } from "@/lib/his-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tehsilId = Number(searchParams.get("tehsilId"));
  

  if (!Number.isSafeInteger(tehsilId) || tehsilId <= 0) {
    return Response.json(
      {
        success: false,
        message: "Valid tehsilId is required",
        data: [],
      },
      { status: 400 }
    );
  }

  try {
    const data = await callHisApi("pat_village", { tehsilId });

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    return apiError(error, "Unable to fetch villages");
  }
}