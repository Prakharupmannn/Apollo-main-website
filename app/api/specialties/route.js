
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { validateApiKey } from "../../../lib/api-auth.js";

export const dynamic = "force-dynamic";

export async function GET(request) {
  // Validate API key
  const authResponse = validateApiKey(request);

  if (authResponse) {
    return authResponse;
  }

  try {
    const [rows] = await pool.execute(
      `SELECT
        id,
        slug,
        name,
        category,
        icon,
        tagline,
        badge,
        stat,
        stat_label AS statLabel,
        image,
        intro,
        services
      FROM specialties
      WHERE status = 1
      ORDER BY id ASC`
    );

    const specialties = rows.map((item) => ({
      ...item,
      services:
        typeof item.services === "string"
          ? JSON.parse(item.services)
          : item.services ?? [],
    }));

    return NextResponse.json(
      { success: true, data: specialties },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Fetch specialties failed:", error.message);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch specialties",
      },
      { status: 500 }
    );
  }
}