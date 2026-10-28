import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const department = String(
      body.department ?? "General Inquiry"
    ).trim();
    const subject = String(body.subject ?? "").trim();
    const city = String(body.city ?? "").trim();
    const message = String(body.message ?? "").trim();

    // Required fields
    if (!name || !phone || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    // Length validation
    if (
      name.length > 150 ||
      phone.length > 20 ||
      email.length > 255 ||
      department.length > 150 ||
      subject.length > 255 ||
      city.length > 100 ||
      message.length > 5000
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "One or more fields exceed the allowed length.",
        },
        { status: 400 }
      );
    }

    // Basic validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email." },
        { status: 400 }
      );
    }

    if (!/^[0-9+()\-\s]{7,20}$/.test(phone)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid phone number." },
        { status: 400 }
      );
    }

    const [result] = await pool.execute(
      `INSERT INTO contact_inquiries
        (name, phone, email, department, subject, city, message)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, phone, email, department, subject, city, message]
    );

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been submitted successfully.",
        id: result.insertId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form submission failed:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit your inquiry. Please try again.",
      },
      { status: 500 }
    );
  }
}