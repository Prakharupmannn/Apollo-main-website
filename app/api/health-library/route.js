
import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { validateApiKey } from "@/lib/api-auth";

export const dynamic = "force-dynamic";

export async function GET(request) {
  // 1. Authenticate the API request
  const authError = validateApiKey(request);

  if (authError) {
    return authError;
  }

  try {
    // 2. Read the optional slug query parameter
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    // 3. Fetch Health Library articles from MySQL
    let query = `
      SELECT
        id,
        slug,
        type,
        category,
        categories,
        title,
        excerpt,
        metaDescription,
        author,
        authorRole,
        date,
        readTime,
        partial,
        image,
        sourceUrl,
        tags,
        documents,
        content,
        siteCategories,
        newsTicker,
        created_at,
        updated_at
      FROM \`health-care\`
    `;

    const params = [];

    // 4. Fetch a specific article when slug is provided
    if (slug) {
      query += ` WHERE slug = ?`;
      params.push(slug);
    }

    query += ` ORDER BY id ASC`;

    const [rows] = await pool.execute(query, params);

    // 5. Parse MySQL JSON columns
    const articles = rows.map((article) => ({
      ...article,
      categories: parseJson(article.categories),
      tags: parseJson(article.tags),
      documents: parseJson(article.documents),
      content: parseJson(article.content),
      siteCategories: parseJson(article.siteCategories),
      newsTicker: parseJson(article.newsTicker),

      // Ensure partial is returned as a boolean.
      partial: Boolean(article.partial),
    }));

    // 6. Return the API response
    return NextResponse.json({
      success: true,
      count: articles.length,
      articles,
    });
  } catch (error) {
    console.error("GET /api/health-care error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch Health Library articles.",
      },
      { status: 500 }
    );
  }
}

// Helper to parse MySQL JSON columns
function parseJson(value) {
  if (value == null) return value;

  // mysql2 may already return objects or arrays.
  if (typeof value !== "string") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}
