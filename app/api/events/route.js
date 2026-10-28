import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { validateApiKey } from "../../../lib/api-auth.js";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const authError = validateApiKey(request);

  if (authError) {
    return authError;
  }

  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    let query = `
      SELECT
        id,
        slug,
        title,
        subtitle,
        category,
        status,
        event_date AS date,
        event_time AS time,
        cost,
        image,
        doctor,
        location,
        organizer,
        description,
        highlights,
        whatToExpect,
        faqs
      FROM events
    `;
    const params = [];

    if (slug) {
      query += ` WHERE slug = ?`;
      params.push(slug);
    }

    query += ` ORDER BY id DESC`;

    const [rows] = await pool.execute(query, params);

    const events = rows.map((event) => ({
      ...event,
      doctor: parseJson(event.doctor),
      organizer: parseJson(event.organizer),
      highlights: parseJson(event.highlights),
      whatToExpect: parseJson(event.whatToExpect),
      faqs: parseJson(event.faqs),
    }));

    return NextResponse.json({
      success: true,
      count: events.length,
      events,
    });
  } catch (error) {
    console.error("GET /api/events error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch events.",
      },
      { status: 500 }
    );
  }
}

function parseJson(value) {
  if (value == null) return value;

  if (typeof value !== "string") return value;

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}