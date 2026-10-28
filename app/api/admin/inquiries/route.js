import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const url = new URL(request.url);
    const search = url.searchParams.get("search")?.trim() || "";

    let sql = `
      SELECT
        id,
        full_name,
        phone_number,
        email_address,
        department,
        city,
        subject,
        message,
        created_at,
        updated_at
      FROM inquiries
    `;

    const params = [];
    if (search) {
      sql += `
        WHERE
          full_name LIKE ? OR
          email_address LIKE ? OR
          phone_number LIKE ? OR
          department LIKE ? OR
          city LIKE ? OR
          subject LIKE ? OR
          message LIKE ?
      `;
      const term = `%${search}%`;
      params.push(term, term, term, term, term, term, term);
    }

    sql += ` ORDER BY created_at DESC, id DESC LIMIT 500`;

    const [rows] = await pool.execute(sql, params);
    const [[countRow]] = await pool.execute(
      `SELECT COUNT(*) AS total FROM inquiries`
    );

    return NextResponse.json({
      success: true,
      count: rows.length,
      total: Number(countRow.total || 0),
      data: rows,
    });
  } catch (error) {
    console.error("GET /api/admin/inquiries error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch inquiries." },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const url = new URL(request.url);
    let id = url.searchParams.get("id");

    if (!id) {
      try {
        const body = await request.json();
        id = body.id;
      } catch {}
    }

    const numericId = parseInt(id, 10);
    if (!numericId || numericId <= 0) {
      return NextResponse.json(
        { success: false, message: "A valid numeric inquiry ID is required." },
        { status: 400 }
      );
    }

    const [res] = await pool.execute(
      `DELETE FROM inquiries WHERE id = ? LIMIT 1`,
      [numericId]
    );

    if (res.affectedRows === 0) {
      return NextResponse.json(
        { success: false, message: "Inquiry not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE /api/admin/inquiries error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete inquiry." },
      { status: 500 }
    );
  }
}
