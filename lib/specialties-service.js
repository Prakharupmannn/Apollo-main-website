import pool from "@/lib/db";

export async function getActiveSpecialties() {
  const [rows] = await pool.execute(`
    SELECT id, name, slug, icon, category
    FROM specialties
    WHERE status = 1
    ORDER BY name ASC
  `);

  return rows;
}



function parseSpeciality(row) {
  if (!row) return null;

  const speciality = { ...row };

  if (typeof speciality.services === "string") {
    try {
      speciality.services = JSON.parse(speciality.services);
    } catch {
      speciality.services = [];
    }
  }

  speciality.services = speciality.services ?? [];

  return speciality;
}

// Complete speciality details by slug
export async function getSpecialityBySlug(slug) {
  if (!slug) return null;

  const [rows] = await pool.execute(
    `
      SELECT
        id,
        slug,
        name,
        category,
        icon,
        tagline,
        badge,
        stat,
        stat_label AS statLabel,
        image,
        intro,
        services
      FROM specialties
      WHERE slug = ? AND status = 1
      LIMIT 1
    `,
    [slug]
  );

  return parseSpeciality(rows[0]);
}

// Lightweight speciality cards
export async function getSpecialityCards() {
  const [rows] = await pool.execute(`
    SELECT
      id,
      slug,
      name,
      category,
      icon,
      tagline,
      image
    FROM specialties
    WHERE status = 1
    ORDER BY name ASC
  `);

  return rows;
}
