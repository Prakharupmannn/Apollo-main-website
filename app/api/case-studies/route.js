import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const str = (v) => String(v ?? "").trim();

function parseNumericId(val) {
  if (typeof val === "number" && Number.isInteger(val) && val > 0) return val;
  if (!val) return null;
  const digits = String(val).replace(/\D/g, "");
  const num = parseInt(digits, 10);
  return Number.isInteger(num) && num > 0 ? num : null;
}

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

const toJson = (v, fallback = "[]") => {
  if (v === undefined || v === null || v === "") return fallback;
  if (typeof v === "string") {
    try {
      JSON.parse(v);
      return v;
    } catch {
      return JSON.stringify([v]);
    }
  }
  return JSON.stringify(v);
};

const errMsg = (e) => e?.sqlMessage || e?.message || "Unknown error";

async function uniqueSlug(base, excludeId = 0) {
  const root = base || `case-study-${Date.now()}`;
  let slug = root;
  let n = 1;
  while (true) {
    const [rows] = await pool.execute(
      "SELECT id FROM case_studies WHERE slug = ? AND id <> ? LIMIT 1",
      [slug, excludeId]
    );
    if (rows.length === 0) return slug;
    n += 1;
    slug = `${root}-${n}`;
  }
}

function toColumns(b, slug) {
  const deptLabel = str(b.deptLabel || b.department);
  return {
    slug,
    dept: str(b.dept) || createSlug(deptLabel) || "general",
    deptLabel: deptLabel || "Others",
    icon: str(b.icon) || "Stethoscope",
    images: toJson(b.images, "[]"),
    title: str(b.title) || "Untitled Case Study",
    patient: str(b.patient),
    patientInfo: toJson(b.patientInfo, "{}"),
    doctor: str(b.doctor),
    doctorRole: str(b.doctorRole),
    treatmentDuration: str(b.treatmentDuration),
    acquiredDiseases: str(b.acquiredDiseases),
    summary: str(b.summary),
    accent: str(b.accent) || "from-[#0A5F7A] to-[#1D82A6]",
    beforeStats: str(b.beforeStats),
    afterStats: str(b.afterStats),
    details: toJson(b.details, "[]"),
    quote: str(b.quote),
    challenge: str(b.challenge),
    procedures: toJson(b.procedures, "[]"),
    outcome: str(b.outcome),
    outcomesList: toJson(b.outcomesList, "[]"),
  };
}

const unauthorized = () =>
  NextResponse.json({ success: false, message: "Unauthorized." }, { status: 401 });

export async function GET(request) {
  const apiKey = request?.headers?.get("x-api-key");
  const isValidKey =
    apiKey === (process.env.API_SECRET_KEY || process.env.NEXT_PUBLIC_API_KEY || "apollo54321");
  const admin = await getAdminSession();

  if (!admin && !isValidKey) {
    return unauthorized();
  }

  try {
    const [rows] = await pool.execute(
      `SELECT id, slug, dept, deptLabel, icon, images, title, patient, patientInfo,
              doctor, doctorRole, treatmentDuration, acquiredDiseases, summary, accent,
              beforeStats, afterStats, details, quote, challenge, procedures, outcome,
              outcomesList, created_at, updated_at
       FROM case_studies
       ORDER BY id DESC`
    );

    const caseStudies = rows.map((c) => ({
      ...c,
      images: parseJson(c.images),
      patientInfo: parseJson(c.patientInfo),
      details: parseJson(c.details),
      procedures: parseJson(c.procedures),
      outcomesList: parseJson(c.outcomesList),
    }));

    return NextResponse.json(
      { success: true, count: caseStudies.length, caseStudies },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("GET /api/case-studies error:", errMsg(error));
    return NextResponse.json(
      { success: false, message: `Failed to fetch: ${errMsg(error)}` },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  if (!(await getAdminSession())) return unauthorized();

  try {
    const b = await request.json();
    const slug = await uniqueSlug(createSlug(b.slug || b.title));
    const cols = toColumns(b, slug);
    const names = Object.keys(cols);
    const values = names.map((n) => cols[n]);

    const [result] = await pool.execute(
      `INSERT INTO case_studies (${names.join(", ")}, created_at, updated_at)
       VALUES (${names.map(() => "?").join(", ")}, NOW(), NOW())`,
      [...values]
    );

    return NextResponse.json({
      success: true,
      message: "Case study created.",
      id: result.insertId,
      slug,
    });
  } catch (error) {
    console.error("POST /api/case-studies error:", errMsg(error));
    return NextResponse.json(
      { success: false, message: `Failed to create: ${errMsg(error)}` },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  if (!(await getAdminSession())) return unauthorized();

  try {
    const b = await request.json();
    const dbId = parseNumericId(b.dbId ?? b.id);

    if (!dbId) {
      return NextResponse.json(
        { success: false, message: "Valid numeric Case study ID is required." },
        { status: 400 }
      );
    }

    const slug = await uniqueSlug(createSlug(b.slug || b.title), dbId);
    const cols = toColumns(b, slug);
    const names = Object.keys(cols);
    const values = names.map((n) => cols[n]);

    await pool.execute(
      `UPDATE case_studies
       SET ${names.map((n) => `${n} = ?`).join(", ")}, updated_at = NOW()
       WHERE id = ?`,
      [...values, dbId]
    );

    return NextResponse.json({ success: true, message: "Case study updated." });
  } catch (error) {
    console.error("PATCH /api/case-studies error:", errMsg(error));
    return NextResponse.json(
      { success: false, message: `Failed to update: ${errMsg(error)}` },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  if (!(await getAdminSession())) return unauthorized();

  try {
    const { dbId, id } = await request.json();
    const targetId = parseNumericId(dbId ?? id);

    if (!targetId) {
      return NextResponse.json(
        { success: false, message: "Valid numeric Case study ID is required." },
        { status: 400 }
      );
    }

    await pool.execute("DELETE FROM case_studies WHERE id = ?", [targetId]);
    return NextResponse.json({ success: true, message: "Case study deleted." });
  } catch (error) {
    console.error("DELETE /api/case-studies error:", errMsg(error));
    return NextResponse.json(
      { success: false, message: `Failed to delete: ${errMsg(error)}` },
      { status: 500 }
    );
  }
}
