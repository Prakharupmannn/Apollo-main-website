import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export async function PATCH(request, { params }) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!/^[1-9]\d*$/.test(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid notification ID" },
        { status: 400 }
      );
    }

    const [result] = await pool.execute(
      `UPDATE admin_notifications
       SET is_read = 1,
           read_at = CURRENT_TIMESTAMP
       WHERE id = ? AND is_read = 0`,
      [id]
    );

    return NextResponse.json({
      success: true,
      updated: result.affectedRows > 0,
    });
  } catch (error) {
    console.error("Mark notification read error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to update notification" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await getAdminSession();

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!/^[1-9]\d*$/.test(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid notification ID" },
        { status: 400 }
      );
    }

    const [result] = await pool.execute(
      `DELETE FROM admin_notifications WHERE id = ?`,
      [id]
    );

    return NextResponse.json({
      success: true,
      deleted: result.affectedRows > 0,
    });
  } catch (error) {
    console.error("Delete notification error:", error);

    return NextResponse.json(
      { success: false, message: "Unable to delete notification" },
      { status: 500 }
    );
  }
}
