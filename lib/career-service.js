import db from "@/lib/db";

function parseJsonColumn(value, fallback = []) {
  if (Array.isArray(value) || (value && typeof value === "object")) return value;
  if (typeof value !== "string" || !value.trim()) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export async function getActiveCareerJobs() {
  const [rows] = await db.execute(
    `SELECT
       job_code AS id,
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
       why_join AS whyJoin
     FROM career_jobs
     WHERE status = 1
     ORDER BY display_order ASC, created_at DESC`
  );

  return rows.map((row) => ({
    ...row,
    responsibilities: parseJsonColumn(row.responsibilities),
    requirements: parseJsonColumn(row.requirements),
    whyJoin: parseJsonColumn(row.whyJoin),
  }));
}

export async function getActiveCareerJobBySlug(slug) {
  const [rows] = await db.execute(
    `SELECT
       job_code AS id,
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
       why_join AS whyJoin
     FROM career_jobs
     WHERE slug = ? AND status = 1
     LIMIT 1`,
    [slug]
  );

  if (!rows.length) return null;
  const row = rows[0];
  return {
    ...row,
    responsibilities: parseJsonColumn(row.responsibilities),
    requirements: parseJsonColumn(row.requirements),
    whyJoin: parseJsonColumn(row.whyJoin),
  };
}