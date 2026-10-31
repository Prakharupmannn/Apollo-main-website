import { deleteFromBlob } from "@/lib/blob";
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

/* ── helpers ───────────────────────────────────────── */

function parseJson(value) {
  if (value == null) return value;
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

async function requireAdmin() {
  const session = await getAdminSession();
  return session ?? null;
}

const str = (v) => String(v ?? "").trim();

function createSlug(name) {
  return String(name || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// always store valid JSON in JSON columns
const toJson = (v, fallback = "[]") => {
  if (v === undefined || v === null || v === "") return fallback;
  if (typeof v === "string") {
    try {
      JSON.parse(v);
      return v;
    } catch {
      return JSON.stringify([v]);
    }
  }
  return JSON.stringify(v);
};

/* ── GET — list all health-library articles (admin) ── */
export async function GET() {
  if (!(await requireAdmin())) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 },
    );
  }

  try {
    const [rows] = await pool.execute(
      `SELECT id, slug, type, category, categories, title, excerpt,
        metaDescription, author, authorRole, date, readTime,
        partial, image, sourceUrl, tags, documents, content,
        siteCategories, newsTicker, created_at, updated_at
 FROM \`health-care\`
 ORDER BY id DESC`,
    );

    const articles = rows.map((a) => ({
      ...a,
      categories: parseJson(a.categories),
      tags: parseJson(a.tags),
      documents: parseJson(a.documents),
      content: parseJson(a.content),
      siteCategories: parseJson(a.siteCategories),
      partial: Boolean(a.partial),
      newsTicker: Boolean(a.newsTicker),
    }));

    return NextResponse.json({
      success: true,
      count: articles.length,
      articles,
    });
  } catch (error) {
    console.error("GET /api/admin/health-library error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to fetch health library articles." },
      { status: 500 },
    );
  }
}

/* ── POST — create a health library article ─────────── */
export async function POST(request) {
  if (!(await requireAdmin()))
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 },
    );

  try {
    const b = await request.json();

    if (!str(b.title))
      return NextResponse.json(
        { success: false, message: "Article title is required." },
        { status: 400 },
      );
    if (!str(b.category))
      return NextResponse.json(
        { success: false, message: "Category is required." },
        { status: 400 },
      );

    const slug = createSlug(b.slug || b.title) || `article-${Date.now()}`;
    const date = b.date || new Date().toISOString().slice(0, 10);

    const [[{ nextId }]] = await pool.execute(
      "SELECT COALESCE(MAX(id), 0) + 1 AS nextId FROM `health-care`",
    );

    const [result] = await pool.execute(
      `INSERT INTO \`health-care\`
     (id, slug, type, category, categories, title, excerpt, metaDescription,
      author, authorRole, date, readTime, partial, image, sourceUrl,
      tags, documents, content, siteCategories, newsTicker)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nextId,
        slug,
        str(b.type) || "Articles",
        str(b.category),
        toJson(b.categories),
        str(b.title),
        str(b.excerpt),
        str(b.metaDescription),
        str(b.author),
        str(b.authorRole),
        date,
        str(b.readTime),
        b.partial ? 1 : 0,
        str(b.image),
        str(b.sourceUrl),
        toJson(b.tags),
        toJson(b.documents),
        toJson(b.content),
        toJson(b.siteCategories),
        b.newsTicker ? 1 : 0,
      ],
    );

    return NextResponse.json({
      success: true,
      message: "Article created.",
      id: nextId,
      slug,
    });
  } catch (error) {
    console.error("POST /api/admin/health-library error:", error.message);
    if (error.code === "ER_DUP_ENTRY")
      return NextResponse.json(
        {
          success: false,
          message: "An article with this slug already exists.",
        },
        { status: 409 },
      );
    return NextResponse.json(
      { success: false, message: "Failed to create article." },
      { status: 500 },
    );
  }
}

/* ── PATCH — update an article ───────────────────────── */
export async function PATCH(request) {
  if (!(await requireAdmin()))
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 },
    );

  try {
    const b = await request.json();

    if (!b.dbId)
      return NextResponse.json(
        { success: false, message: "Article ID is required." },
        { status: 400 },
      );
    if (!str(b.title))
      return NextResponse.json(
        { success: false, message: "Article title is required." },
        { status: 400 },
      );

    await pool.execute(
      `UPDATE \`health-care\`
       SET slug = COALESCE(NULLIF(?, ''), slug),
           type = ?, category = ?, categories = ?, title = ?, excerpt = ?,
           metaDescription = ?, author = ?, authorRole = ?, date = ?, readTime = ?,
           partial = ?, image = ?, sourceUrl = ?, tags = ?, documents = ?,
           content = ?, siteCategories = ?, newsTicker = ?, updated_at = NOW()
       WHERE id = ?`,
      [
        createSlug(b.slug), // empty -> keeps the existing slug
        str(b.type) || "Articles",
        str(b.category),
        toJson(b.categories),
        str(b.title),
        str(b.excerpt),
        str(b.metaDescription),
        str(b.author),
        str(b.authorRole),
        b.date || null,
        str(b.readTime),
        b.partial ? 1 : 0,
        str(b.image),
        str(b.sourceUrl),
        toJson(b.tags),
        toJson(b.documents),
        toJson(b.content),
        toJson(b.siteCategories),
        b.newsTicker ? 1 : 0,
        b.dbId,
      ],
    );

    return NextResponse.json({ success: true, message: "Article updated." });
  } catch (error) {
    console.error("PATCH /api/admin/health-library error:", error.message);
    if (error.code === "ER_DUP_ENTRY")
      return NextResponse.json(
        {
          success: false,
          message: "An article with this slug already exists.",
        },
        { status: 409 },
      );
    return NextResponse.json(
      { success: false, message: "Failed to update article." },
      { status: 500 },
    );
  }
}

/* ── DELETE — delete an article ─────────────────────── */
export async function DELETE(request) {
  if (!(await requireAdmin())) {
    return NextResponse.json(
      { success: false, message: "Unauthorized." },
      { status: 401 },
    );
  }

  try {
    const body = await request.json();
    const { dbId } = body;

    if (!dbId)
      return NextResponse.json(
        { success: false, message: "Article ID is required." },
        { status: 400 },
      );

    // Clean up associated Vercel Blob assets if any
    try {
      const [existing] = await pool.execute("SELECT image, documents FROM `health-care` WHERE id = ? LIMIT 1", [dbId]);
      if (existing.length > 0) {
        if (existing[0].image) await deleteFromBlob(existing[0].image).catch(() => {});
        const docs = parseJson(existing[0].documents);
        if (Array.isArray(docs)) {
          for (const doc of docs) {
            if (doc?.url) await deleteFromBlob(doc.url).catch(() => {});
          }
        }
      }
    } catch (e) {
      console.warn("Error cleaning up article blobs:", e.message);
    }

    await pool.execute("DELETE FROM `health-care` WHERE id = ?", [dbId]);

    return NextResponse.json({ success: true, message: "Article deleted." });
  } catch (error) {
    console.error("DELETE /api/admin/health-library error:", error.message);
    return NextResponse.json(
      { success: false, message: "Failed to delete article." },
      { status: 500 },
    );
  }
}
