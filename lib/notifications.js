import pool from "@/lib/db";

const CATEGORIES = [
  "appointment",
  "doctor",
  "enquiry",
  "website",
  "career",
  "system",
];

const TYPES = ["info", "success", "warning", "error"];

export async function createAdminNotification({
  category,
  title,
  message,
  type = "info",
  link = null,
  referenceId = null,
}) {
  try {
    if (!CATEGORIES.includes(category)) {
      throw new Error("Invalid notification category");
    }

    if (!TYPES.includes(type)) {
      throw new Error("Invalid notification type");
    }

    if (!title?.trim() || !message?.trim()) {
      throw new Error("Notification title and message are required");
    }

    const [result] = await pool.execute(
      `INSERT INTO admin_notifications
        (category, title, message, type, link, reference_id)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        category,
        title.trim(),
        message.trim(),
        type,
        link,
        referenceId != null ? String(referenceId) : null,
      ]
    );

    return result.insertId;
  } catch (error) {
    console.error("Create admin notification failed:", error);
    return null;
  }
}