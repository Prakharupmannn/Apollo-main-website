import { deleteFromBlob } from "@/lib/blob";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import pool from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

/* ── helpers ───────────────────────────────────────── */

const str = (v) => String(v ?? "").trim();
const errMsg = (e) => e?.sqlMessage || e?.message || "Unknown error";

function createSlug(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseJson(value) {
  if (value == null || typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

// JSON columns: always a valid JSON string, never null
const toJson = (v, fallback = "[]") => {
  if (v === undefined || v === null || v === "") return fallback;
  if (typeof v === "string") {
    try {
      JSON.parse(v);
      return v;
    } catch {
      return JSON.stringify(v); // plain text -> JSON string
    }
  }
  return JSON.stringify(v);
};

const unauthorized = () =>
  NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });

async function uniqueSlug(base, excludeId = 0) {
  const root = base || `event-${Date.now()}`;
  let slug = root;
  let n = 1;
  while (true) {
    const [rows] = await pool.execute(
      "SELECT id FROM events WHERE slug = ? AND id <> ? LIMIT 1",
      [slug, excludeId]
    );
    if (rows.length === 0) return slug;
    n += 1;
    slug = `${root}-${n}`;
  }
}

// maps the request body to table columns (no value is ever null/undefined)
function toColumns(b, slug) {
  return {
    slug,
    title: str(b.title),
    subtitle: str(b.subtitle),
    category: str(b.category),
    status: str(b.status) || "Draft",
    event_date: str(b.date).slice(0, 10) || new Date().toISOString().slice(0, 10),
    event_time: str(b.time),
    cost: str(b.cost),
    image: str(b.image),
    doctor: toJson(b.doctor, "{}"),
    location: str(b.location),
    organizer: toJson(b.organizer, "{}"),
    description: str(b.description),
    highlights: toJson(b.highlights, "[]"),
    whatToExpect: toJson(b.whatToExpect, "[]"),
    faqs: toJson(b.faqs, "[]"),
  };
}

function revalidate() {
  revalidatePath("/patientcare/events", "layout");
}

/* ── GET — list all events (admin, every status) ───── */

export async function GET() {
  if (!(await getAdminSession())) return unauthorized();

  try {
    const [rows] = await pool.execute(
      `SELECT id, slug, title, subtitle, category, status,
              DATE_FORMAT(event_date, '%Y-%m-%d') AS date,
              event_time AS time, cost, image, doctor, location, organizer,
              description, highlights, whatToExpect, faqs
       FROM events
       ORDER BY id DESC`
    );

    const events = rows.map((e) => ({
      ...e,
      doctor: parseJson(e.doctor),
      organizer: parseJson(e.organizer),
      highlights: parseJson(e.highlights),
      whatToExpect: parseJson(e.whatToExpect),
      faqs: parseJson(e.faqs),
    }));

    return NextResponse.json({ success: true, count: events.length, events });
  } catch (error) {
    console.error("GET /api/admin/events error:", errMsg(error));
    return NextResponse.json(
      { success: false, message: `Failed to fetch: ${errMsg(error)}` },
      { status: 500 }
    );
  }
}

/* ── POST — create ─────────────────────────────────── */

export async function POST(request) {
  if (!(await getAdminSession())) return unauthorized();

  try {
    const b = await request.json();
    const slug = await uniqueSlug(createSlug(b.slug || b.title));
    const cols = toColumns(b, slug);
    const names = Object.keys(cols);
    const values = names.map((n) => cols[n]);

    const [[{ nextId }]] = await pool.execute(
      "SELECT COALESCE(MAX(id), 0) + 1 AS nextId FROM events"
    );

    await pool.execute(
      `INSERT INTO events (id, ${names.join(", ")})
       VALUES (?, ${names.map(() => "?").join(", ")})`,
      [nextId, ...values]
    );

    revalidate();

    return NextResponse.json({
      success: true,
      message: "Event created.",
      id: nextId,
      slug,
    });
  } catch (error) {
    console.error("POST /api/admin/events error:", errMsg(error));
    return NextResponse.json(
      { success: false, message: `Failed to create: ${errMsg(error)}` },
      { status: 500 }
    );
  }
}

/* ── PATCH — update ────────────────────────────────── */

export async function PATCH(request) {
  if (!(await getAdminSession())) return unauthorized();

  try {
    const b = await request.json();
    const dbId = Number(b.dbId);

    if (!Number.isInteger(dbId) || dbId <= 0) {
      return NextResponse.json(
        { success: false, message: "Event ID is required." },
        { status: 400 }
      );
    }

    const slug = await uniqueSlug(createSlug(b.slug || b.title), dbId);
    const cols = toColumns(b, slug);
    const names = Object.keys(cols);
    const values = names.map((n) => cols[n]);

    await pool.execute(
      `UPDATE events SET ${names.map((n) => `${n} = ?`).join(", ")} WHERE id = ?`,
      [...values, dbId]
    );

    revalidate();

    return NextResponse.json({ success: true, message: "Event updated." });
  } catch (error) {
    console.error("PATCH /api/admin/events error:", errMsg(error));
    return NextResponse.json(
      { success: false, message: `Failed to update: ${errMsg(error)}` },
      { status: 500 }
    );
  }
}

/* ── DELETE ────────────────────────────────────────── */

export async function DELETE(request) {
  if (!(await getAdminSession())) return unauthorized();

  try {
    const { dbId } = await request.json();
    const id = Number(dbId);

    if (!Number.isInteger(id) || id <= 0) {
      return NextResponse.json(
        { success: false, message: "Event ID is required." },
        { status: 400 }
      );
    }

    // Clean up associated Vercel Blob image if any
    try {
      const [existing] = await pool.execute("SELECT image FROM events WHERE id = ? LIMIT 1", [id]);
      if (existing.length > 0 && existing[0].image) {
        await deleteFromBlob(existing[0].image).catch(() => {});
      }
    } catch (e) {
      console.warn("Error cleaning up event blob:", e.message);
    }

    await pool.execute("DELETE FROM events WHERE id = ?", [id]);

    revalidate();

    return NextResponse.json({ success: true, message: "Event deleted." });
  } catch (error) {
    console.error("DELETE /api/admin/events error:", errMsg(error));
    return NextResponse.json(
      { success: false, message: `Failed to delete: ${errMsg(error)}` },
      { status: 500 }
    );
  }
}