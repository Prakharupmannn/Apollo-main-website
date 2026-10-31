import { NextResponse } from "next/server";
import pool from "@/lib/db";
import path from "node:path";
import { uploadToBlob, deleteFromBlob } from "@/lib/blob";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

const experiences = new Set([
  "Fresher",
  "<1 Year",
  "1-3 Years",
  "3-5 Years",
  "5+ Years",
]);

const mimeTypes = {
  ".pdf": ["application/pdf", "application/x-pdf", ""],
  ".doc": ["application/msword", "application/octet-stream", ""],
  ".docx": [
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/octet-stream",
    "",
  ],
};

const bad = (message, status = 400) =>
  NextResponse.json({ message }, { status });

// 📥 1. GET Request: Fetches all applications for the admin dashboard
export async function GET(request) {
  try {
    const apiKey = request.headers.get("x-api-key");
    if (apiKey !== "apollo54321") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const [rows] = await pool.execute(
      `SELECT id, job_id AS jobId, job_title AS jobTitle, full_name AS name, 
              email, phone, experience AS exp, cover_letter AS notes, 
              resume_path AS resumePath, resume_original_name AS resumeOriginalName, 
              created_at AS applied 
       FROM career_applications 
       ORDER BY created_at DESC`
    );

    return NextResponse.json({ data: rows }, { status: 200 });
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json(
      { message: "Failed to fetch applications.", error: error.message },
      { status: 500 }
    );
  }
}

// 📤 2. POST Request: Submit candidate application with Vercel Blob Storage
export async function POST(request) {
  let uploadedBlobUrl = null;

  try {
    // 🔒 API Key Authentication Check
    const apiKey = request.headers.get("x-api-key");
    if (apiKey !== "apollo54321") {
      return NextResponse.json(
        { message: "Unauthorized: Invalid or missing API key." },
        { status: 401 }
      );
    }

    const data = await request.formData();

    const jobId = String(data.get("jobId") || "").trim();
    const jobTitle = String(data.get("jobTitle") || "").trim();
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const exp = String(data.get("exp") || "").trim();
    const notes = String(data.get("notes") || "").trim();
    const consent = data.get("dataConsent");
    const resume = data.get("resume");

    if (!jobId || !jobTitle || !name || !email || !phone || !exp) {
      return bad("Please complete all required fields.");
    }

    if (
      jobId.length > 100 ||
      jobTitle.length > 255 ||
      name.length > 150 ||
      email.length > 255 ||
      phone.length > 20 ||
      notes.length > 10000
    ) {
      return bad("One or more fields are too long.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return bad("Please enter a valid email address.");
    }

    if (!/^[0-9+\-()\s]{7,20}$/.test(phone)) {
      return bad("Please enter a valid phone number.");
    }

    if (!experiences.has(exp)) {
      return bad("Please select a valid experience level.");
    }

    if (consent !== "true") {
      return bad("Please accept the data consent.");
    }

    if (
      !resume ||
      typeof resume === "string" ||
      typeof resume.arrayBuffer !== "function" ||
      resume.size === 0
    ) {
      return bad("Please attach your resume.");
    }

    if (resume.size > MAX_FILE_SIZE) {
      return bad("Resume must not exceed 10 MB.");
    }

    const originalName = path.basename(resume.name || "resume.pdf");
    const extension = path.extname(originalName).toLowerCase();

    if (
      !Object.prototype.hasOwnProperty.call(mimeTypes, extension) ||
      !mimeTypes[extension].includes(resume.type || "")
    ) {
      return bad("Upload a valid PDF, DOC or DOCX resume.");
    }

    const buffer = Buffer.from(await resume.arrayBuffer());

    if (extension === ".pdf" && buffer.subarray(0, 5).toString() !== "%PDF-") {
      return bad("The uploaded PDF file is invalid.");
    }

    // ☁️ Upload resume to Vercel Blob Storage
    try {
      const uploadedFile = await uploadToBlob(resume, {
        folder: "resumes",
        filename: originalName,
        contentType: resume.type || (extension === ".pdf" ? "application/pdf" : "application/octet-stream"),
        access: "public",
        maxSize: MAX_FILE_SIZE,
      });

      uploadedBlobUrl = uploadedFile.url;
    } catch (uploadError) {
      console.error("Vercel Blob resume upload error:", uploadError);
      return NextResponse.json(
        {
          message: "Failed to upload resume to storage. " + (uploadError.message || ""),
        },
        { status: 500 }
      );
    }

    // 💾 Save application into MySQL database
    try {
      const [result] = await pool.execute(
        `INSERT INTO career_applications
          (job_id, job_title, full_name, email, phone, experience,
           cover_letter, resume_path, resume_original_name)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          jobId,
          jobTitle,
          name,
          email,
          phone,
          exp,
          notes || null,
          uploadedBlobUrl,
          originalName,
        ]
      );

      return NextResponse.json(
        {
          message: "Your application has been submitted successfully.",
          applicationId: result.insertId,
          resumeUrl: uploadedBlobUrl,
        },
        { status: 201 }
      );
    } catch (dbError) {
      // Clean up uploaded blob if database insert fails
      if (uploadedBlobUrl) {
        await deleteFromBlob(uploadedBlobUrl).catch(() => {});
      }
      throw dbError;
    }
  } catch (error) {
    if (uploadedBlobUrl) {
      await deleteFromBlob(uploadedBlobUrl).catch(() => {});
    }

    console.error("Career application API error:", error);

    return NextResponse.json(
      {
        message: "Failed to submit career application.",
        debug: error?.sqlMessage || error?.message,
        code: error?.code,
      },
      { status: 500 }
    );
  }
}
