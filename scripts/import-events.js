
import events from "../data/eventsData.js";
import pool from "../lib/db.js";

const toJson = (value) =>
  value == null ? null : JSON.stringify(value);

async function importEvents() {
  if (!Array.isArray(events)) {
    throw new Error(
      "Events data must be an array. Check the export in data/eventsData.js."
    );
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const sql = `
      INSERT INTO events (
        slug,
        title,
        subtitle,
        category,
        status,
        event_date,
        event_time,
        cost,
        image,
        doctor,
        location,
        organizer,
        description,
        highlights,
        whatToExpect,
        faqs
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        subtitle = VALUES(subtitle),
        category = VALUES(category),
        status = VALUES(status),
        event_date = VALUES(event_date),
        event_time = VALUES(event_time),
        cost = VALUES(cost),
        image = VALUES(image),
        doctor = VALUES(doctor),
        location = VALUES(location),
        organizer = VALUES(organizer),
        description = VALUES(description),
        highlights = VALUES(highlights),
        whatToExpect = VALUES(whatToExpect),
        faqs = VALUES(faqs)
    `;

    for (const event of events) {
      if (!event.slug || !event.title) {
        throw new Error(
          `An event is missing its slug or title: ${event.slug || "unknown"}`
        );
      }

      const values = [
        event.slug,
        event.title,
        event.subtitle ?? null,
        event.category,
        event.status,
        event.date,
        event.time ?? null,
        event.cost ?? null,
        event.image ?? null,
        toJson(event.doctor),
        event.location ?? null,
        toJson(event.organizer),
        event.description ?? null,
        toJson(event.highlights ?? []),
        toJson(event.whatToExpect ?? []),
        toJson(event.faqs ?? []),
      ];

      await connection.execute(sql, values);
      console.log(`Processed: ${event.slug}`);
    }

    await connection.commit();

    console.log(
      `Successfully processed ${events.length} events.`
    );
  } catch (error) {
    await connection.rollback();
    console.error("Event import failed:", error.message);
    throw error;
  } finally {
    connection.release();
    await pool.end();
  }
}

importEvents().catch(() => {
  process.exitCode = 1;
});
