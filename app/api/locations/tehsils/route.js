import { callHisApi, apiError } from "@/lib/his-api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const districtId = Number(searchParams.get("districtId"));
  console.log(districtId);

  if (!Number.isSafeInteger(districtId) || districtId <= 0) {
    return Response.json(
      {
        success: false,
        message: "Valid districtId is required",
        data: [],
      },
      { status: 400 }
    );
  }

  try {
    const data = await callHisApi("pat_tehsil", { districtId });

    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    return apiError(error, "Unable to fetch tehsils");
  }
}