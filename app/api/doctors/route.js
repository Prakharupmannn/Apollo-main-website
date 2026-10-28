import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import pool from "@/lib/db";
import { validateApiKey } from "../../../lib/api-auth";
import { getAdminSession } from "@/lib/auth";

function createSlug(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/* ── helpers ─────────────────────────────────────────── */

const TEXT_FIELDS = [
  "name", "designation", "speciality", "department", "image", "summary",
  "experience", "tagline", "professional_approach", "research_details",
];

const JSON_FIELDS = [
  "about", "languages", "qualifications", "highlights", "expertise",
  "experience_details", "training", "research", "publications", "faqs",
  "podcasts", "opd", "expertise_categories", "conditions",
  "clinical_procedures", "diagnostic_services", "clinical_interests",
  "specialized_interventions", "areas_of_special_interest", "why_choose",
  "certifications", "professional_memberships",
];

// Accepts valid JSON, plain text (one item per line), arrays or objects.
// Always stores valid JSON so GET can parse it.
function toJson(value) {
  if (value === undefined || value === null) return null;
  if (typeof value === "string") {
    const t = value.trim();
    if (!t) return null;
    try {
      JSON.parse(t);
      return t;
    } catch {
      return JSON.stringify(
        t.split("\n").map((s) => s.trim()).filter(Boolean)
      );
    }
  }
  return JSON.stringify(value);
}

async function uniqueSlug(base) {
  let slug = base || `doctor-${Date.now()}`;
  let n = 1;
  while (true) {
    const [rows] = await pool.execute(
      "SELECT id FROM doctors WHERE slug = ? LIMIT 1",
      [slug]
    );
    if (rows.length === 0) return slug;
    n += 1;
    slug = `${base || "doctor"}-${n}`;
  }
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ── GET ─────────────────────────────────────────────── */

export async function GET(request) {
  const authResponse = validateApiKey(request);

  if (authResponse) {
    return authResponse;
  }

  try {
    const [rows] = await pool.execute(`
      SELECT
        id AS databaseId,
        doctor_code AS id,
        slug,
        name,
        designation,
        speciality,
        speciality_slug AS specialitySlug,
        speciality_id AS specialityId,
        department,
        department_id AS departmentId,
        image,
        profile_url AS profileUrl,
        summary,
        about,
        languages,
        qualifications,
        highlights,
        expertise,
        experience,
        experience_details AS experienceDetails,
        training,
        research,
        publications,
        faqs,
        podcasts,
        opd,
        display_order AS displayOrder,

        -- Newly added columns
        tagline,
        expertise_categories AS expertiseCategories,
        conditions,
        clinical_procedures AS clinicalProcedures,
        diagnostic_services AS diagnosticServices,
        clinical_interests AS clinicalInterests,
        specialized_interventions AS specializedInterventions,
        areas_of_special_interest AS areasOfSpecialInterest,
        why_choose AS whyChoose,
        professional_approach AS professionalApproach,
        certifications,
        professional_memberships AS professionalMemberships,
        research_details AS researchDetails

      FROM doctors
      WHERE status = 1
      ORDER BY display_order ASC, name ASC
    `);

    const jsonFields = [
      "about",
      "languages",
      "qualifications",
      "highlights",
      "expertise",
      "experienceDetails",
      "training",
      "research",
      "publications",
      "faqs",
      "podcasts",
      "opd",

      // Newly added JSON columns
      "expertiseCategories",
      "conditions",
      "clinicalProcedures",
      "diagnosticServices",
      "clinicalInterests",
      "specializedInterventions",
      "areasOfSpecialInterest",
      "whyChoose",
      "certifications",
      "professionalMemberships",
    ];

    const doctors = rows.map((doctor) => {
      const parsedDoctor = { ...doctor };

      for (const field of jsonFields) {
        const value = parsedDoctor[field];

        if (typeof value === "string") {
          try {
            parsedDoctor[field] = JSON.parse(value);
          } catch {
            parsedDoctor[field] = null;
          }
        }
      }

      return parsedDoctor;
    });

    return NextResponse.json(
      {
        success: true,
        count: doctors.length,
        data: doctors,
      },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Fetch doctors failed:", error.message);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch doctors",
      },
      { status: 500 }
    );
  }
}

/* ── POST — create a new doctor (no validation) ─────── */

export async function POST(request) {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const [[{ maxId }]] = await pool.execute(
      "SELECT COALESCE(MAX(id), 0) AS maxId FROM doctors"
    );
    const nextNum = Number(maxId) + 1;
    const doctorCode = `DR${String(nextNum).padStart(3, "0")}`;
    const slug = await uniqueSlug(createSlug(body.name));

    const columns = ["doctor_code", "slug", "speciality_slug", "status", "display_order"];
    const values = [
      doctorCode,
      slug,
      createSlug(body.speciality),
      body.status === "Inactive" ? 0 : 1,
      nextNum,
    ];

    for (const f of TEXT_FIELDS) {
      columns.push(f);
      values.push(String(body[f] ?? "").trim());
    }
    for (const f of JSON_FIELDS) {
      columns.push(f);
      values.push(toJson(body[f]));
    }

    const [result] = await pool.execute(
      `INSERT INTO doctors (${columns.join(", ")})
       VALUES (${columns.map(() => "?").join(", ")})`,
      values
    );

    revalidatePath("/doctors");

    return NextResponse.json({
      success: true,
      message: "Doctor created.",
      id: result.insertId,
      doctorCode,
      slug,
    });
  } catch (error) {
    console.error("POST /api/doctors error:", error.message);

    return NextResponse.json(
      { success: false, message: "Failed to create doctor." },
      { status: 500 }
    );
  }
}

/* ── PATCH — update an existing doctor ──────────────── */

export async function PATCH(request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { databaseId } = body;

    if (!databaseId) {
      return NextResponse.json(
        { success: false, message: "Doctor ID is required." },
        { status: 400 }
      );
    }

    const sets = [];
    const values = [];

    for (const f of TEXT_FIELDS) {
      if (body[f] !== undefined) {
        sets.push(`${f} = ?`);
        values.push(String(body[f] ?? "").trim());
      }
    }
    for (const f of JSON_FIELDS) {
      if (body[f] !== undefined) {
        sets.push(`${f} = ?`);
        values.push(toJson(body[f]));
      }
    }
    if (body.speciality !== undefined) {
      sets.push("speciality_slug = ?");
      values.push(createSlug(body.speciality));
    }
    if (body.status !== undefined) {
      sets.push("status = ?");
      values.push(body.status === "Inactive" ? 0 : 1);
    }

    if (sets.length === 0) {
      return NextResponse.json({ success: true, message: "Nothing to update." });
    }

    await pool.execute(
      `UPDATE doctors SET ${sets.join(", ")} WHERE id = ?`,
      [...values, databaseId]
    );

    revalidatePath("/doctors");

    return NextResponse.json({ success: true, message: "Doctor updated." });
  } catch (error) {
    console.error("PATCH /api/doctors error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to update doctor." },
      { status: 500 }
    );
  }
}

/* ── DELETE — soft-delete a doctor (status = 0) ─────── */

export async function DELETE(request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const { databaseId } = body;

    if (!databaseId)
      return NextResponse.json(
        { success: false, message: "Doctor ID is required." },
        { status: 400 }
      );

    await pool.execute(
      "UPDATE doctors SET status = 0 WHERE id = ?",
      [databaseId]
    );

    revalidatePath("/doctors");

    return NextResponse.json({ success: true, message: "Doctor removed." });
  } catch (error) {
    console.error("DELETE /api/doctors error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to delete doctor." },
      { status: 500 }
    );
  }
}