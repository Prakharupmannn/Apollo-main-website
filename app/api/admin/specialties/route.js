import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

function createSlug(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// services always stored as valid JSON
function servicesJson(v) {
  if (Array.isArray(v)) return JSON.stringify(v);
  if (typeof v === "string" && v.trim()) {
    try { JSON.parse(v); return v; }
    catch { return JSON.stringify(v.split("\n").map((s) => s.trim()).filter(Boolean)); }
  }
  return "[]";
}

async function uniqueSlug(base, excludeId = null) {
  const root = base || `specialty-${Date.now()}`;
  let slug = root;
  let n = 1;
  while (true) {
    const [rows] = await pool.execute(
      "SELECT id FROM specialties WHERE slug = ? AND id <> ? LIMIT 1",
      [slug, excludeId ?? 0]
    );
    if (rows.length === 0) return slug;
    n += 1;
    slug = `${root}-${n}`;
  }
}

const str = (v) => String(v ?? "").trim();

async function requireAdmin() {
  const session = await getAdminSession();
  return session ?? null;
}

/* ── GET — list all specialties (admin; includes inactive) */
export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const [rows] = await pool.execute(
      `SELECT id, slug, name, category, icon, tagline, badge,
              stat, stat_label AS statLabel, image, intro, services, status
       FROM specialties
       ORDER BY id ASC`
    );

    const specialties = rows.map((s) => ({
      ...s,
      services:
        typeof s.services === "string"
          ? JSON.parse(s.services)
          : s.services ?? [],
    }));

    return NextResponse.json({ success: true, count: specialties.length, specialties });
  } catch (error) {
    console.error("GET /api/admin/specialties error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch specialties." },
      { status: 500 }
    );
  }
}

/* ── POST — create a specialty ─────────────────────── */
export async function POST(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const b = await request.json();

    if (!str(b.name))
      return NextResponse.json({ success: false, message: "Specialty name is required." }, { status: 400 });
    if (!str(b.category))
      return NextResponse.json({ success: false, message: "Category is required." }, { status: 400 });

    const slug = await uniqueSlug(createSlug(b.slug || b.name));

    const [result] = await pool.execute(
      `INSERT INTO specialties
        (slug, name, category, icon, tagline, badge, stat, stat_label, image, intro, services, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        slug,
        str(b.name),
        str(b.category),
        str(b.icon) || "stethoscope",
        str(b.tagline),
        str(b.badge),
        str(b.stat),
        str(b.stat_label),
        str(b.image),
        str(b.intro),
        servicesJson(b.services),
        b.status === "Inactive" ? 0 : 1,
      ]
    );

    return NextResponse.json({ success: true, message: "Specialty created.", id: result.insertId, slug });
  } catch (error) {
    console.error("POST /api/admin/specialties error:", error.message);
    if (error.code === "ER_DUP_ENTRY")
      return NextResponse.json(
        { success: false, message: "A specialty with this name or slug already exists." },
        { status: 409 }
      );
    return NextResponse.json({ success: false, message: "Failed to create specialty." }, { status: 500 });
  }
}

/* ── PATCH — update a specialty ────────────────────── */
export async function PATCH(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });
  }

  try {
    const b = await request.json();

    if (!b.dbId)
      return NextResponse.json({ success: false, message: "Specialty ID is required." }, { status: 400 });
    if (!str(b.name))
      return NextResponse.json({ success: false, message: "Specialty name is required." }, { status: 400 });

    const slug = await uniqueSlug(createSlug(b.slug || b.name), b.dbId);

    await pool.execute(
      `UPDATE specialties
       SET slug = ?, name = ?, category = ?, icon = ?, tagline = ?, badge = ?,
           stat = ?, stat_label = ?, image = ?, intro = ?, services = ?, status = ?
       WHERE id = ?`,
      [
        slug,
        str(b.name),
        str(b.category),
        str(b.icon) || "stethoscope",
        str(b.tagline),
        str(b.badge),
        str(b.stat),
        str(b.stat_label),
        str(b.image),
        str(b.intro),
        servicesJson(b.services),
        b.status === "Inactive" ? 0 : 1,
        b.dbId,
      ]
    );

    return NextResponse.json({ success: true, message: "Specialty updated." });
  } catch (error) {
    console.error("PATCH /api/admin/specialties error:", error.message);
    return NextResponse.json({ success: false, message: "Failed to update specialty." }, { status: 500 });
  }
}

/* ── DELETE — delete a specialty (with doctor check) ── */
export async function DELETE(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { dbId, name } = body;

    if (!dbId)
      return NextResponse.json(
        { success: false, message: "Specialty ID is required." },
        { status: 400 }
      );

    // Check if any active doctors are associated with this specialty
    if (name) {
      const [[{ docCount }]] = await pool.execute(
        `SELECT COUNT(*) AS docCount FROM doctors WHERE speciality = ? AND status = 1`,
        [name]
      );
      if (Number(docCount) > 0)
        return NextResponse.json(
          {
            success: false,
            message: `Cannot delete: ${docCount} active doctor(s) are associated with this specialty.`,
          },
          { status: 409 }
        );
    }

    await pool.execute("DELETE FROM specialties WHERE id = ?", [dbId]);

    return NextResponse.json({ success: true, message: "Specialty deleted." });
  } catch (error) {
    console.error("DELETE /api/admin/specialties error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to delete specialty." },
      { status: 500 }
    );
  }
}
