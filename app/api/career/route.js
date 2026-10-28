import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import pool from "@/lib/db";
import { validateApiKey } from "@/lib/api-auth";
import { getAdminSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ── helpers ───────────────────────────────────────── */

const str = (v) => String(v ?? "").trim();
const errMsg = (e) => e?.sqlMessage || e?.message || "Unknown error";

function createSlug(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseJsonColumn(value, fallback = []) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") return value;
  if (typeof value !== "string" || !value.trim()) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

// always returns a list
function toList(v) {
  if (Array.isArray(v)) return v;
  if (typeof v === "string" && v.trim()) {
    try {
      const p = JSON.parse(v);
      if (Array.isArray(p)) return p;
    } catch {
      /* plain text */
    }
    return v
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

// "Open" / 1 / true -> 1,  "Closed" / 0 / false -> 0
const toStatus = (v) => {
  const s = String(v ?? "").trim().toLowerCase();
  return ["0", "closed", "inactive", "draft", "false"].includes(s) ? 0 : 1;
};

function formatJob(row) {
  return {
    ...row,
    status: Number(row.status),
    responsibilities: parseJsonColumn(row.responsibilities),
    requirements: parseJsonColumn(row.requirements),
    whyJoin: parseJsonColumn(row.whyJoin),
  };
}

async function guardAdmin(request) {
  const authError = await validateApiKey(request);
  if (authError) return authError;

  if (!(await getAdminSession())) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }
  return null;
}

async function uniqueSlug(base, excludeCode = "") {
  const root = base || `job-${Date.now()}`;
  let slug = root;
  let n = 1;
  while (true) {
    const [rows] = await pool.execute(
      "SELECT job_code FROM career_jobs WHERE slug = ? AND job_code <> ? LIMIT 1",
      [slug, excludeCode]
    );
    if (rows.length === 0) return slug;
    n += 1;
    slug = `${root}-${n}`;
  }
}

/* ── GET ───────────────────────────────────────────── */
// GET /api/career                 -> open jobs (public)
// GET /api/career?slug=...        -> one open job (public)
// GET /api/career?status=all      -> every job (admin only)

export async function GET(request) {
  try {
    const authError = await validateApiKey(request);
    if (authError) return authError;

    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const status = searchParams.get("status");

    let sql = `
      SELECT
        job_code AS id,
        job_code AS jobCode,
        slug,
        title,
        full_title AS fullTitle,
        category,
        department AS dept,
        job_type AS type,
        location,
        icon,
        overview,
        responsibilities,
        requirements,
        why_join AS whyJoin,
        status,
        display_order AS displayOrder
      FROM career_jobs
    `;

    const values = [];
    const conditions = [];

    if (slug) {
      conditions.push("slug = ?");
      values.push(slug);
    }

    if (status === "all") {
      if (!(await getAdminSession())) {
        return NextResponse.json(
          { success: false, message: "Unauthorized." },
          { status: 401 }
        );
      }
    } else {
      conditions.push("status = 1");
    }

    if (conditions.length) sql += ` WHERE ${conditions.join(" AND ")}`;
    sql += " ORDER BY display_order ASC, created_at DESC";

    const [rows] = await pool.execute(sql, values);

    if (slug && rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Career job not found." },
        { status: 404 }
      );
    }

    const jobs = rows.map(formatJob);
    return NextResponse.json({ success: true, data: slug ? jobs[0] : jobs });
  } catch (error) {
    console.error("GET /api/career error:", errMsg(error));
    return NextResponse.json(
      { success: false, message: `Failed to fetch career jobs: ${errMsg(error)}` },
      { status: 500 }
    );
  }
}

/* ── POST — create ─────────────────────────────────── */

export async function POST(request) {
  try {
    const denied = await guardAdmin(request);
    if (denied) return denied;

    const b = await request.json();
    const title = str(b.title);

    if (!title) {
      return NextResponse.json(
        { success: false, message: "Job title is required." },
        { status: 400 }
      );
    }

    const slug = await uniqueSlug(createSlug(b.slug || title));

    const [[{ maxNum }]] = await pool.execute(
      "SELECT COALESCE(MAX(CAST(SUBSTRING(job_code, 4) AS UNSIGNED)), 0) AS maxNum FROM career_jobs"
    );
    const nextNum = Number(maxNum) + 1;
    const jobCode = `JOB${String(nextNum).padStart(3, "0")}`;

    const [result] = await pool.execute(
      `INSERT INTO career_jobs (
        job_code, slug, title, full_title, category, department, job_type,
        location, icon, overview, responsibilities, requirements, why_join,
        status, display_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        jobCode,
        slug,
        title,
        str(b.fullTitle) || title,
        str(b.category),
        str(b.department ?? b.dept),
        str(b.jobType ?? b.type) || "Full Time",
        str(b.location),
        str(b.icon),
        str(b.overview),
        JSON.stringify(toList(b.responsibilities)),
        JSON.stringify(toList(b.requirements)),
        JSON.stringify(toList(b.whyJoin ?? b.why_join)),
        toStatus(b.status),
        nextNum,
      ]
    );

    revalidatePath("/careers");

    return NextResponse.json(
      {
        success: true,
        message: "Career job created successfully.",
        id: result.insertId,
        jobCode,
        slug,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/career error:", errMsg(error));
    return NextResponse.json(
      { success: false, message: `Failed to create: ${errMsg(error)}` },
      { status: 500 }
    );
  }
}

/* ── PATCH — update ────────────────────────────────── */

export async function PATCH(request) {
  try {
    const denied = await guardAdmin(request);
    if (denied) return denied;

    const b = await request.json();
    const jobCode = str(b.jobCode ?? b.id);

    if (!jobCode) {
      return NextResponse.json(
        { success: false, message: "Job code is required." },
        { status: 400 }
      );
    }

    const updates = [];
    const values = [];
    const set = (col, val) => {
      updates.push(`${col} = ?`);
      values.push(val);
    };

    if (b.title !== undefined) {
      const t = str(b.title);
      if (!t) {
        return NextResponse.json(
          { success: false, message: "Job title cannot be empty." },
          { status: 400 }
        );
      }
      set("title", t);
    }
    if (b.fullTitle !== undefined) set("full_title", str(b.fullTitle) || str(b.title));
    if (b.category !== undefined) set("category", str(b.category));

    const dep = b.department ?? b.dept;
    if (dep !== undefined) set("department", str(dep));

    const jt = b.jobType ?? b.type;
    if (jt !== undefined) set("job_type", str(jt) || "Full Time");

    if (b.location !== undefined) set("location", str(b.location));
    if (b.icon !== undefined) set("icon", str(b.icon));
    if (b.overview !== undefined) set("overview", str(b.overview));

    if (b.responsibilities !== undefined)
      set("responsibilities", JSON.stringify(toList(b.responsibilities)));
    if (b.requirements !== undefined)
      set("requirements", JSON.stringify(toList(b.requirements)));

    const why = b.whyJoin ?? b.why_join;
    if (why !== undefined) set("why_join", JSON.stringify(toList(why)));

    if (b.displayOrder !== undefined || b.display_order !== undefined)
      set("display_order", Number(b.displayOrder ?? b.display_order) || 0);

    // empty slug keeps the existing one
    if (str(b.slug)) {
      set("slug", await uniqueSlug(createSlug(b.slug), jobCode));
    }

    if (b.status !== undefined) set("status", toStatus(b.status));

    if (!updates.length) {
      return NextResponse.json(
        { success: false, message: "No fields provided to update." },
        { status: 400 }
      );
    }

    await pool.execute(
      `UPDATE career_jobs SET ${updates.join(", ")} WHERE job_code = ?`,
      [...values, jobCode]
    );

    const [found] = await pool.execute(
      "SELECT job_code FROM career_jobs WHERE job_code = ?",
      [jobCode]
    );
    if (!found.length) {
      return NextResponse.json(
        { success: false, message: "Career job not found." },
        { status: 404 }
      );
    }

    revalidatePath("/careers");

    return NextResponse.json({
      success: true,
      message: "Career job updated successfully.",
    });
  } catch (error) {
    console.error("PATCH /api/career error:", errMsg(error));
    return NextResponse.json(
      { success: false, message: `Failed to update: ${errMsg(error)}` },
      { status: 500 }
    );
  }
}

/* ── DELETE — permanent delete ─────────────────────── */

export async function DELETE(request) {
  try {
    const denied = await guardAdmin(request);
    if (denied) return denied;

    const b = await request.json();
    const jobCode = str(b.jobCode ?? b.id);

    if (!jobCode) {
      return NextResponse.json(
        { success: false, message: "Job code is required." },
        { status: 400 }
      );
    }

    await pool.execute("DELETE FROM career_jobs WHERE job_code = ?", [jobCode]);

    revalidatePath("/careers");

    return NextResponse.json({
      success: true,
      message: "Career job deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE /api/career error:", errMsg(error));
    return NextResponse.json(
      { success: false, message: `Failed to delete: ${errMsg(error)}` },
      { status: 500 }
    );
  }
}