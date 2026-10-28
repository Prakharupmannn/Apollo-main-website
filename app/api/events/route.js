
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { validateApiKey } from "../../../lib/api-auth.js";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    // Validate API key
    const authError = validateApiKey(request);

    if (authError) {
      return authError;
    }

    // Read query parameters
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

    // Fetch a specific event by slug
    if (slug) {
      query += ` WHERE slug = ?`;
      params.push(slug);
    }

    query += ` ORDER BY id DESC`;

    // Execute database query
    const [rows] = await pool.execute(query, params);

    // Parse JSON fields safely
    const events = rows.map((event) => ({
      ...event,
      doctor: parseJson(event.doctor),
      organizer: parseJson(event.organizer),
      highlights: parseJson(event.highlights),
      whatToExpect: parseJson(event.whatToExpect),
      faqs: parseJson(event.faqs),
    }));

    // Return successful response
    return NextResponse.json(
      {
        success: true,
        count: events.length,
        events,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/events error:", error);

    // Handle unexpected errors
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch events. Please try again later.",
      },
      { status: 500 }
    );
  }
}

// Safely parse JSON values
function parseJson(value) {
  if (value == null) return value;

  if (typeof value !== "string") return value;

  try {
    return JSON.parse(value);
  } catch (error) {
    console.error("Failed to parse event JSON field:", error);
    return value;
  }
}
