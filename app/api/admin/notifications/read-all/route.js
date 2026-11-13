import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function PATCH() {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const [result] = await pool.execute(
      `UPDATE admin_notifications
       SET is_read = 1,
           read_at = CURRENT_TIMESTAMP
       WHERE is_read = 0`
    );

    return NextResponse.json({
      success: true,
      updated: result.affectedRows,
    });
  } catch (error) {
    console.error("Mark all notifications read error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to update notifications" },
      { status: 500 }
    );
  }
}
