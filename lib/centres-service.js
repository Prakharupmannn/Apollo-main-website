
import pool from "@/lib/db";

const jsonFields = [
  "capabilities",
  "conditions",
  "diagnostics",
  "treatments",
  "specializedCare",
  "preventiveCare",
  "highlights",
  "doctors",
  "stats",
];

function parseJson(value) {
  if (typeof value !== "string") return value ?? null;

  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}

export async function getActiveCentres() {
  const [rows] = await pool.execute(`
    SELECT
      id AS databaseId,
      centre_code AS id,
      slug,
      short_name AS shortName,
      title,
      eyebrow,
      subtitle,
      description,
      description_long AS descriptionn,
      image,
      capabilities,
      conditions,
      diagnostics,
      treatments,
      specialized_care AS specializedCare,
      preventive_care AS preventiveCare,
      highlights,
      doctors,
      stats,
      color,
      display_order AS displayOrder
    FROM centres_of_excellence
    WHERE status = 1
    ORDER BY display_order ASC, title ASC
  `);

  return rows.map((centre) => {
    const result = { ...centre };

    for (const field of jsonFields) {
      result[field] = parseJson(result[field]);
    }

    return result;
  });
}
