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