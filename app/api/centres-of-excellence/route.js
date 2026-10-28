
import { NextResponse } from "next/server";
import { getActiveCentres } from "@/lib/centres-service";
import { validateApiKey } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const authError = validateApiKey(request);

  if (authError) return authError;

  try {
    const data = await getActiveCentres();

    return NextResponse.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Centres API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch Centres of Excellence",
      },
      { status: 500 }
    );
  }
}