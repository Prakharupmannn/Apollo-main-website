
import pool from "@/lib/db";
import { cache } from "react";

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

  speciality.services = Array.isArray(speciality.services)
    ? speciality.services
    : [];

  return speciality;
}

// Complete speciality details by slug
export const getSpecialityBySlug = cache(async (slug) => {
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
});

// Lightweight speciality cards
export const getSpecialityCards = cache(async () => {
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
});
