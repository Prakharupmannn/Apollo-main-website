import pool from "./db.js";

function parseJson(value) {
  if (value == null) return value;
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function formatEvent(event) {
  if (!event) return null;
  return {
    ...event,
    doctor: parseJson(event.doctor),
    organizer: parseJson(event.organizer),
    highlights: parseJson(event.highlights),
    whatToExpect: parseJson(event.whatToExpect),
    faqs: parseJson(event.faqs),
  };
}

export function slugify(text) {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

const EVENT_SELECT_FIELDS = `
  id,
  slug,
  title,
  subtitle,
  category,
  status,
  event_date AS date,
  event_time AS time,
  cost,
  image,
  doctor,
  location,
  organizer,
  description,
  highlights,
  whatToExpect,
  faqs
`;

export async function getAllEvents() {
  try {
    const [rows] = await pool.execute(`
      SELECT ${EVENT_SELECT_FIELDS}
      FROM events
      ORDER BY id DESC
    `);
    return rows.map(formatEvent);
  } catch (error) {
    console.error("Error fetching all events:", error);
    return [];
  }
}

export async function getEventBySlug(slug) {
  if (!slug) return null;

  try {
    // 1. Try exact match on slug or id
    const [rows] = await pool.execute(
      `SELECT ${EVENT_SELECT_FIELDS} FROM events WHERE slug = ? OR CAST(id AS CHAR) = ? LIMIT 1`,
      [slug, slug]
    );

    if (rows && rows.length > 0) {
      return formatEvent(rows[0]);
    }

    // 2. Fallback: match by slugified title in case slug wasn't stored explicitly
    const all = await getAllEvents();
    return (
      all.find(
        (e) =>
          e.slug === slug ||
          slugify(e.title) === slug ||
          String(e.id) === String(slug)
      ) || null
    );
  } catch (error) {
    console.error("Error fetching event by slug:", error);
    return null;
  }
}

