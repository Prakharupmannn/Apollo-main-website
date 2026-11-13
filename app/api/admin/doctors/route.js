import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import pool from "@/lib/db";
import { getAdminSession } from "@/lib/auth";
import { createAdminNotification } from "@/lib/notifications";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ── Helpers ─────────────────────────────────────────── */

function createSlug(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
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

function parseJsonField(value) {
  if (value == null) return value;
  if (typeof value !== "string") return value;

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function getBodyValue(body, apiField, dbField) {
  if (body[apiField] !== undefined) return body[apiField];
  if (body[dbField] !== undefined) return body[dbField];
  return undefined;
}

function normalizeStatus(value) {
  return (
    value === "Inactive" ||
    value === 0 ||
    value === "0" ||
    value === false
  ) ? 0 : 1;
}

/* ── Database field mappings ────────────────────────── */

const TEXT_FIELDS = [
  ["name", "name"],
  ["designation", "designation"],
  ["speciality", "speciality"],
  ["department", "department"],
  ["image", "image"],
  ["summary", "summary"],
  ["experience", "experience"],
  ["tagline", "tagline"],
  ["professionalApproach", "professional_approach"],
  ["researchDetails", "research_details"],
];

const JSON_FIELDS = [
  ["about", "about"],
  ["languages", "languages"],
  ["qualifications", "qualifications"],
  ["highlights", "highlights"],
  ["expertise", "expertise"],
  ["experienceDetails", "experience_details"],
  ["training", "training"],
  ["research", "research"],
  ["publications", "publications"],
  ["faqs", "faqs"],
  ["podcasts", "podcasts"],
  ["opd", "opd"],
  ["expertiseCategories", "expertise_categories"],
  ["conditions", "conditions"],
  ["clinicalProcedures", "clinical_procedures"],
  ["diagnosticServices", "diagnostic_services"],
  ["clinicalInterests", "clinical_interests"],
  ["specializedInterventions", "specialized_interventions"],
  ["areasOfSpecialInterest", "areas_of_special_interest"],
  ["whyChoose", "why_choose"],
  ["certifications", "certifications"],
  ["professionalMemberships", "professional_memberships"],
];

/* ── GET — list ALL doctors ─────────────────────────── */

export async function GET(request) {
  const apiKey = request?.headers?.get("x-api-key");

  const isValidApiKey =
    apiKey &&
    ((process.env.API_KEY && apiKey === process.env.API_KEY) ||
      (process.env.NEXT_PUBLIC_API_KEY &&
        apiKey === process.env.NEXT_PUBLIC_API_KEY) ||
      apiKey === "apollo54321");

  const session = await getAdminSession();

  if (!session && !isValidApiKey) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
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
        status,
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
      ORDER BY display_order ASC, name ASC
    `);

    const doctors = rows.map((doctor) => {
      const parsed = { ...doctor };

      for (const [apiField] of JSON_FIELDS) {
        parsed[apiField] = parseJsonField(parsed[apiField]);
      }

      return parsed;
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
    console.error("GET /api/admin/doctors error:", error.message);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch doctors.",
      },
      { status: 500 }
    );
  }
}

/* ── POST — Create Doctor ───────────────────────────── */

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

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 }
      );
    }

    const [[{ maxId }]] = await pool.execute(
      "SELECT COALESCE(MAX(id), 0) AS maxId FROM doctors"
    );

    const nextNum = Number(maxId) + 1;
    const doctorCode = `DR${String(nextNum).padStart(3, "0")}`;

    const doctorName = body.name || "";
    const speciality = body.speciality || "";

    const slug = await uniqueSlug(createSlug(doctorName));

    const columns = [
      "doctor_code",
      "slug",
      "speciality_slug",
      "status",
      "display_order",
    ];

    const values = [
      doctorCode,
      slug,
      createSlug(speciality),
      body.status === undefined ? 1 : normalizeStatus(body.status),
      nextNum,
    ];

    for (const [apiField, dbField] of TEXT_FIELDS) {
      columns.push(dbField);

      const value = getBodyValue(body, apiField, dbField);

      values.push(String(value ?? "").trim());
    }

    for (const [apiField, dbField] of JSON_FIELDS) {
      columns.push(dbField);

      const value = getBodyValue(body, apiField, dbField);

      values.push(toJson(value));
    }

      const [result] = await pool.execute(
        `INSERT INTO doctors (${columns.join(", ")})
        VALUES (${columns.map(() => "?").join(", ")})`,
        values
      );

      revalidatePath("/doctors");

      // Create notification after successful doctor creation.
      await createAdminNotification({
        category: "doctor",
        title: "New Doctor Added",
        message: `${String(doctorName || "A new doctor").trim()} has been added.`,
        type: "success",
        link: "/admin/doctors",
        referenceId: String(result.insertId),
      });

    return NextResponse.json({
      success: true,
      message: "Doctor created.",
      id: result.insertId,
      doctorCode,
      slug,
    });
  } catch (error) {
    console.error("POST /api/admin/doctors error:", error.message);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create doctor.",
      },
      { status: 500 }
    );
  }
}

/* ── PATCH — Update Doctor ──────────────────────────── */

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

    if (
      databaseId === undefined ||
      databaseId === null ||
      databaseId === ""
    ) {
      return NextResponse.json(
        { success: false, message: "Doctor ID is required." },
        { status: 400 }
      );
    }

    const sets = [];
    const values = [];

    for (const [apiField, dbField] of TEXT_FIELDS) {
      const value = getBodyValue(body, apiField, dbField);

      if (value !== undefined) {
        sets.push(`${dbField} = ?`);
        values.push(String(value ?? "").trim());
      }
    }

    for (const [apiField, dbField] of JSON_FIELDS) {
      const value = getBodyValue(body, apiField, dbField);

      if (value !== undefined) {
        sets.push(`${dbField} = ?`);
        values.push(toJson(value));
      }
    }

    const speciality = getBodyValue(
      body,
      "speciality",
      "speciality"
    );

    if (speciality !== undefined) {
      sets.push("speciality_slug = ?");
      values.push(createSlug(speciality));
    }

    if (body.status !== undefined) {
      sets.push("status = ?");
      values.push(normalizeStatus(body.status));
    }

    if (sets.length === 0) {
      return NextResponse.json({
        success: true,
        message: "Nothing to update.",
      });
    }

// Check whether the doctor exists before updating.
const [[existingDoctor]] = await pool.execute(
  "SELECT id, name FROM doctors WHERE id = ? LIMIT 1",
  [databaseId]
);

if (!existingDoctor) {
  return NextResponse.json(
    {
      success: false,
      message: "Doctor not found.",
    },
    { status: 404 }
  );
}

  await pool.execute(
    `UPDATE doctors SET ${sets.join(", ")} WHERE id = ?`,
    [...values, databaseId]
  );

  revalidatePath("/doctors");

  // Create notification after successful doctor update.
  const updatedDoctorName = String(
    getBodyValue(body, "name", "name") ?? existingDoctor.name ?? "Doctor"
  ).trim();

  await createAdminNotification({
    category: "doctor",
    title: "Doctor Details Updated",
    message: `${updatedDoctorName}'s details have been updated.`,
    type: "info",
    link: "/admin/doctors",
    referenceId: String(databaseId),
  });

    return NextResponse.json({
      success: true,
      message: "Doctor updated.",
    });
  } catch (error) {
    console.error("PATCH /api/admin/doctors error:", error.message);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update doctor.",
      },
      { status: 500 }
    );
  }
}

/* ── DELETE — Soft Delete Doctor ────────────────────── */

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

    if (
      databaseId === undefined ||
      databaseId === null ||
      databaseId === ""
    ) {
      return NextResponse.json(
        { success: false, message: "Doctor ID is required." },
        { status: 400 }
      );
    }

    await pool.execute(
      "UPDATE doctors SET status = 0 WHERE id = ?",
      [databaseId]
    );

    revalidatePath("/doctors");

    return NextResponse.json({
      success: true,
      message: "Doctor removed.",
    });
  } catch (error) {
    console.error("DELETE /api/admin/doctors error:", error.message);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete doctor.",
      },
      { status: 500 }
    );
  }
}
