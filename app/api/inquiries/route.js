import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

// Allowed inquiry departments
const DEPARTMENTS = [
  "General Inquiry",
  "Gastro Sciences",
  "Onco Sciences",
  "Cardiac Sciences",
  "Neuro Sciences",
  "Nephro Sciences",
  "Ortho-Joint & Spine",
  "Critical Care",
  "Preventive Health Checkup",
  "Pediatric Nephrology",
  "Neonatology",
  "Pulmonology",
  "Paediatrics",
  "Obstetrics & Gynecology",
  "Dental Clinic",
  "Ophthalmology",
  "ENT",
  "Anesthesiology",
  "Dermatology & Cosmetology",
  "General Medicine",
  "Sleep Medicine",
  "Urology",
  "Second Opinion",
];

// In-memory rate limiting map (IP -> timestamps array)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

function isRateLimited(ip) {
  if (!ip) return false;
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const timestamps = (rateLimitMap.get(ip) || []).filter((t) => t > windowStart);

  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);

  // Periodic cleanup if map grows large
  if (rateLimitMap.size > 1000) {
    for (const [key, list] of rateLimitMap.entries()) {
      const valid = list.filter((t) => t > windowStart);
      if (valid.length === 0) rateLimitMap.delete(key);
      else rateLimitMap.set(key, valid);
    }
  }

  return false;
}

// Server-side API key validation helper (optional for external clients)
function validateApiKey(request) {
  const apiKey = request.headers.get("x-api-key");
  return Boolean(
    process.env.APOLLO_API_KEY &&
    apiKey &&
    apiKey === process.env.APOLLO_API_KEY
  );
}

// POST: Public submission from the website contact form
export async function POST(request) {
  try {
    // Basic IP-based rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown-ip";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many requests. Please wait a moment before trying again.",
        },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Spam honeypot check (hidden field should always be empty for real users)
    if (body.hp_check || body.website) {
      return NextResponse.json(
        {
          success: true,
          message: "Inquiry submitted successfully.",
        },
        { status: 201 }
      );
    }

    const fullName = String(body.full_name ?? "").trim();
    const phoneNumber = String(body.phone_number ?? "").trim();
    const emailAddress = String(body.email_address ?? "").trim().toLowerCase();
    const departmentRaw = String(body.department ?? "General Inquiry").trim();
    const city = String(body.city ?? "").trim();
    const subject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();

    // Required fields check
    if (!fullName) {
      return NextResponse.json(
        { success: false, message: "Full Name is required." },
        { status: 400 }
      );
    }

    if (!phoneNumber) {
      return NextResponse.json(
        { success: false, message: "Phone Number is required." },
        { status: 400 }
      );
    }

    if (!emailAddress) {
      return NextResponse.json(
        { success: false, message: "Email Address is required." },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        { success: false, message: "Message / Details are required." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Phone number format sanity check (at least 7 characters)
    if (phoneNumber.length < 7 || phoneNumber.length > 20) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid phone number." },
        { status: 400 }
      );
    }

    // Field length safety limits
    if (fullName.length > 150) {
      return NextResponse.json(
        { success: false, message: "Full name must be under 150 characters." },
        { status: 400 }
      );
    }
    if (emailAddress.length > 255) {
      return NextResponse.json(
        { success: false, message: "Email address is too long." },
        { status: 400 }
      );
    }
    if (city.length > 100) {
      return NextResponse.json(
        { success: false, message: "City name must be under 100 characters." },
        { status: 400 }
      );
    }
    if (subject.length > 255) {
      return NextResponse.json(
        { success: false, message: "Subject must be under 255 characters." },
        { status: 400 }
      );
    }
    if (message.length > 10000) {
      return NextResponse.json(
        { success: false, message: "Message is too long (maximum 10,000 characters)." },
        { status: 400 }
      );
    }

    // Department normalization
    const department = DEPARTMENTS.includes(departmentRaw)
      ? departmentRaw
      : "General Inquiry";

    // Insert inquiry into MySQL table
    const [result] = await pool.execute(
      `INSERT INTO inquiries
        (full_name, phone_number, email_address, department, city, subject, message)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        fullName,
        phoneNumber,
        emailAddress,
        department,
        city || null,
        subject || null,
        message,
      ]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been submitted successfully.",
        data: {
          id: result.insertId,
          full_name: fullName,
          department,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/inquiries error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An unexpected error occurred while saving your inquiry. Please try again.",
      },
      { status: 500 }
    );
  }
}

// GET: Retrieve inquiries (Admin Session or API Key Protected)
export async function GET(request) {
  const session = await getAdminSession();
  const hasValidApiKey = validateApiKey(request);

  if (!session && !hasValidApiKey) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Admin session required." },
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

    // Also get total count
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
    console.error("GET /api/inquiries error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch inquiries." },
      { status: 500 }
    );
  }
}

// DELETE: Remove an inquiry (Admin Session Protected)
export async function DELETE(request) {
  const session = await getAdminSession();
  const hasValidApiKey = validateApiKey(request);

  if (!session && !hasValidApiKey) {
    return NextResponse.json(
      { success: false, message: "Unauthorized. Admin session required." },
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
    console.error("DELETE /api/inquiries error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete inquiry." },
      { status: 500 }
    );
  }
}
