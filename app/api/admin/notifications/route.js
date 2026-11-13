
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);

    const requestedLimit = Number(searchParams.get("limit")) || 20;
    const limit = Math.min(Math.max(requestedLimit, 1), 50);

    const [notifications] = await pool.execute(
      `SELECT
        id,
        category,
        title,
        message,
        type,
        link,
        reference_id,
        is_read,
        read_at,
        created_at
       FROM admin_notifications
       ORDER BY created_at DESC, id DESC
       LIMIT ?`,
      [limit]
    );

    const [[count]] = await pool.execute(
      `SELECT COUNT(*) AS unread_count
       FROM admin_notifications
       WHERE is_read = 0`
    );

    return NextResponse.json(
      {
        success: true,
        unreadCount: Number(count.unread_count),
        notifications: notifications.map((item) => ({
          ...item,
          id: String(item.id),
          is_read: Boolean(item.is_read),
          reference_id:
            item.reference_id == null
              ? null
              : String(item.reference_id),
        })),
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("GET admin notifications error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to fetch notifications",
      },
      { status: 500 }
    );
  }
}

