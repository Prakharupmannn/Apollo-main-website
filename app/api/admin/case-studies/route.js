import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

/* ── helpers ──────────────────────────────────────── */

const str = (v) => (v == null ? "" : String(v).trim());

function parseNumericId(val) {
  if (typeof val === "number" && Number.isInteger(val) && val > 0) {
    return val;
  }
  if (!val) return null;
  const digits = String(val).replace(/\D/g, "");
  const num = parseInt(digits, 10);
  return Number.isInteger(num) && num > 0 ? num : null;
}

function createSlug(val) {
  return String(val || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function uniqueSlug(base, excludeId = 0) {
  const root = base || `case-study-${Date.now()}`;
  let slug = root;
  let counter = 1;

  while (true) {
    const [rows] = await pool.execute(
      "SELECT id FROM case_studies WHERE slug = ? AND id <> ? LIMIT 1",
      [slug, excludeId]
    );
    if (rows.length === 0) return slug;
    counter += 1;
    slug = `${root}-${counter}`;
  }
}

function parseJson(value) {
  if (value == null || typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

/**
 * Ensures images is ALWAYS a serialized non-null JSON array string.
 * MySQL case_studies.images is `longtext NOT NULL`.
 */
function serializeImages(images, singleImage) {
  if (Array.isArray(images)) {
    const clean = images
      .map((x) => (typeof x === "string" ? x.trim() : x?.url || x?.src || ""))
      .filter(Boolean);
    return JSON.stringify(clean);
  }

  if (typeof images === "string" && images.trim()) {
    const trimmed = images.trim();
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
      try {
        const parsed = JSON.parse(trimmed);
        if (Array.isArray(parsed)) return JSON.stringify(parsed.filter(Boolean));
      } catch {}
    }
    return JSON.stringify([trimmed]);
  }

  if (singleImage && typeof singleImage === "string" && singleImage.trim()) {
    return JSON.stringify([singleImage.trim()]);
  }

  return "[]";
}

/**
 * Serializes flex/pair JSON fields (patientInfo, details, procedures, outcomesList).
 */
function serializeJsonField(val, defaultVal = null) {
  if (val === undefined || val === null || val === "") return defaultVal;
  if (typeof val === "string") {
    const trimmed = val.trim();
    if (!trimmed) return defaultVal;
    if (
      (trimmed.startsWith("{") && trimmed.endsWith("}")) ||
      (trimmed.startsWith("[") && trimmed.endsWith("]"))
    ) {
      try {
        JSON.parse(trimmed);
        return trimmed;
      } catch {}
    }
    return trimmed;
  }
  try {
    return JSON.stringify(val);
  } catch {
    return defaultVal;
  }
}

function mapCaseStudyColumns(body, slug) {
  const deptLabel = str(body.deptLabel || body.department);
  const dept = str(body.dept) || createSlug(deptLabel) || "general";

  return {
    slug,
    dept,
    deptLabel: deptLabel || dept || "Others",
    icon: str(body.icon) || "Stethoscope",
    images: serializeImages(body.images, body.image),
    title: str(body.title),
    patient: str(body.patient) || null,
    patientInfo: serializeJsonField(body.patientInfo, null),
    doctor: str(body.doctor) || null,
    doctorRole: str(body.doctorRole) || null,
    treatmentDuration: str(body.treatmentDuration) || null,
    acquiredDiseases: str(body.acquiredDiseases) || null,
    summary: str(body.summary) || null,
    accent: str(body.accent) || "from-[#0E526B] to-[#1D82A6]",
    beforeStats: str(body.beforeStats) || null,
    afterStats: str(body.afterStats) || null,
    details: serializeJsonField(body.details, null),
    quote: str(body.quote) || null,
    challenge: str(body.challenge) || null,
    procedures: serializeJsonField(body.procedures, null),
    outcome: str(body.outcome) || null,
    outcomesList: serializeJsonField(body.outcomesList, null),
  };
}

async function requireAdmin() {
  const session = await getAdminSession();
  return session ?? null;
}

/* ── GET — list all case studies (admin) ─────────── */
export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Please log in as an administrator." },
      { status: 401 }
    );
  }

  try {
    const [rows] = await pool.execute(
      `SELECT id, slug, dept, deptLabel, icon, images, title, patient,
              patientInfo, doctor, doctorRole, treatmentDuration,
              acquiredDiseases, summary, accent, beforeStats, afterStats,
              details, quote, challenge, procedures, outcome, outcomesList,
              created_at, updated_at
       FROM case_studies
       ORDER BY id DESC`
    );

    const caseStudies = rows.map((c) => {
      const parsedImages = parseJson(c.images);
      return {
        ...c,
        images: Array.isArray(parsedImages)
          ? parsedImages
          : parsedImages
          ? [parsedImages]
          : [],
        patientInfo: parseJson(c.patientInfo),
        details: parseJson(c.details),
        procedures: parseJson(c.procedures),
        outcomesList: parseJson(c.outcomesList),
      };
    });

    return NextResponse.json(
      { success: true, count: caseStudies.length, caseStudies },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("[GET /api/admin/case-studies Error]:", {
      message: error.message,
      code: error.code,
      sqlMessage: error.sqlMessage,
    });
    return NextResponse.json(
      {
        success: false,
        message: error.sqlMessage || error.message || "Failed to fetch case studies.",
      },
      { status: 500 }
    );
  }
}

/* ── POST — create a case study ───────────────────── */
export async function POST(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Please log in as an administrator." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid request payload." },
        { status: 400 }
      );
    }

    const title = str(body.title);
    if (!title) {
      return NextResponse.json(
        { success: false, message: "Title is required." },
        { status: 400 }
      );
    }

    const rawSlug = str(body.slug) || createSlug(title);
    const slug = await uniqueSlug(rawSlug);

    const cols = mapCaseStudyColumns(body, slug);
    const columnNames = Object.keys(cols);
    const columnValues = columnNames.map((name) => cols[name]);

    const [result] = await pool.execute(
      `INSERT INTO case_studies (${columnNames.join(", ")}, created_at, updated_at)
       VALUES (${columnNames.map(() => "?").join(", ")}, NOW(), NOW())`,
      columnValues
    );

    return NextResponse.json(
      {
        success: true,
        message: "Case study created successfully.",
        id: result.insertId,
        slug,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[POST /api/admin/case-studies Error]:", {
      message: error.message,
      code: error.code,
      sqlMessage: error.sqlMessage,
    });

    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { success: false, message: "A case study with this slug already exists." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error.sqlMessage || error.message || "Failed to create case study.",
      },
      { status: 500 }
    );
  }
}

/* ── PATCH — update a case study ─────────────────── */
export async function PATCH(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Please log in as an administrator." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid request payload." },
        { status: 400 }
      );
    }

    const dbId = parseNumericId(body.dbId ?? body.id);
    if (!dbId) {
      return NextResponse.json(
        { success: false, message: "Valid numeric Case study ID (dbId) is required." },
        { status: 400 }
      );
    }

    const title = str(body.title);
    if (!title) {
      return NextResponse.json(
        { success: false, message: "Title is required." },
        { status: 400 }
      );
    }

    // Verify record exists before updating
    const [existing] = await pool.execute(
      "SELECT id, slug FROM case_studies WHERE id = ? LIMIT 1",
      [dbId]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { success: false, message: `Case study with ID ${dbId} not found.` },
        { status: 404 }
      );
    }

    const rawSlug = str(body.slug) || str(existing[0].slug) || createSlug(title);
    const slug = await uniqueSlug(rawSlug, dbId);

    const cols = mapCaseStudyColumns(body, slug);
    const columnNames = Object.keys(cols);
    const columnValues = columnNames.map((name) => cols[name]);

    const setClauses = columnNames.map((name) => `${name} = ?`).join(", ");

    await pool.execute(
      `UPDATE case_studies
       SET ${setClauses}, updated_at = NOW()
       WHERE id = ?`,
      [...columnValues, dbId]
    );

    return NextResponse.json({
      success: true,
      message: "Case study updated successfully.",
      id: dbId,
    });
  } catch (error) {
    console.error("[PATCH /api/admin/case-studies Error]:", {
      message: error.message,
      code: error.code,
      sqlMessage: error.sqlMessage,
    });

    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { success: false, message: "A case study with this slug already exists." },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error.sqlMessage || error.message || "Failed to update case study.",
      },
      { status: 500 }
    );
  }
}

/* ── DELETE — delete a case study ────────────────── */
export async function DELETE(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Please log in as an administrator." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid request payload." },
        { status: 400 }
      );
    }

    const dbId = parseNumericId(body.dbId ?? body.id);
    if (!dbId) {
      return NextResponse.json(
        { success: false, message: "Valid numeric Case study ID (dbId) is required." },
        { status: 400 }
      );
    }

    const [result] = await pool.execute(
      "DELETE FROM case_studies WHERE id = ?",
      [dbId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: `Case study with ID ${dbId} not found.` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Case study deleted successfully.",
      id: dbId,
    });
  } catch (error) {
    console.error("[DELETE /api/admin/case-studies Error]:", {
      message: error.message,
      code: error.code,
      sqlMessage: error.sqlMessage,
    });

    return NextResponse.json(
      {
        success: false,
        message: error.sqlMessage || error.message || "Failed to delete case study.",
      },
      { status: 500 }
    );
  }
}
