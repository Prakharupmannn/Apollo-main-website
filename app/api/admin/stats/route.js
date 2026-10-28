import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAdminSession();

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 }
    );
  }

  try {
    const [[row]] = await pool.execute(`
      SELECT
        (SELECT COUNT(*) FROM doctors      WHERE status = 1)                      AS doctors,
        (SELECT COUNT(*) FROM specialties  WHERE status = 1)                      AS specialties,
        (SELECT COUNT(*) FROM events)                                              AS events,
        (SELECT COUNT(*) FROM case_studies)                                        AS caseStudies,
        (SELECT COUNT(*) FROM \`health-care\`)                                     AS articles,
        (SELECT COUNT(*) FROM users        WHERE deleted_at IS NULL AND status = 1) AS users,
        (SELECT COUNT(*) FROM inquiries)                                           AS inquiries
    `);

    return NextResponse.json({
      success: true,
      stats: {
        doctors:     Number(row.doctors || 0),
        specialties: Number(row.specialties || 0),
        events:      Number(row.events || 0),
        caseStudies: Number(row.caseStudies || 0),
        articles:    Number(row.articles || 0),
        users:       Number(row.users || 0),
        inquiries:   Number(row.inquiries || 0),
      },
    });
  } catch (error) {
    console.error("GET /api/admin/stats error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch dashboard statistics." },
      { status: 500 }
    );
  }
}
