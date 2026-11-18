
import { unstable_cache } from "next/cache";
import pool from "@/lib/db";

const DEFAULT_CATEGORIES = [
  "All",
  "Apollo News",
  "Blogs",
  "Cardio Sciences",
  "Critical Care",
  "Gastro Sciences",
  "Latest Technology At Apollo JBP Hospitals",
  "Nephro Sciences",
  "Neuro Sciences",
  "Onco Sciences",
  "Ortho-Joint and Spine",
  "Pulmonology & Respiratory",
  "Pediatrics",
  "Women's Health",
  "General Medicine & Wellness",
];

function parseJson(value) {
  if (value == null) return value;
  if (typeof value !== "string") return value;

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function parseArray(value) {
  const parsed = parseJson(value);
  return Array.isArray(parsed) ? parsed : [];
}

function normalizeArticle(article) {
  return {
    ...article,
    categories: parseArray(article.categories),
    tags: parseArray(article.tags),
    documents: parseArray(article.documents),
    content: (() => {
      const parsed = parseJson(article.content);
      if (Array.isArray(parsed)) return parsed;
      if (typeof parsed === "string") return parsed.split("\n");
      return [];
    })(),
    siteCategories: parseArray(article.siteCategories),
    newsTicker: parseArray(article.newsTicker),
    partial: article.partial === true || Number(article.partial) === 1,
  };
}

// Lightweight fields required by HealthLibraryContent.jsx
const LISTING_QUERY = `
  SELECT
    id,
    slug,
    type,
    category,
    categories,
    title,
    excerpt,
    author,
    authorRole,
    date,
    readTime,
    image,
    tags,
    siteCategories,
    newsTicker
  FROM \`health-care\`
  ORDER BY id ASC
`;

// Full fields required only by the article reader/detail page
const DETAIL_QUERY = `
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
  WHERE slug = ?
  LIMIT 1
`;

const getCachedHealthCareListing = unstable_cache(
  async () => {
    const [rows] = await pool.execute(LISTING_QUERY);

    const articles = rows.map(normalizeArticle);

    const categories =
      articles[0]?.siteCategories?.length > 0
        ? articles[0].siteCategories
        : DEFAULT_CATEGORIES;

    const newsTicker = articles[0]?.newsTicker || [];

    return {
      success: true,
      articles,
      categories,
      newsTicker,
      error: null,
    };
  },
  ["health-care-listing-v1"],
  {
    revalidate: 900,
    tags: ["health-care", "health-care-listing"],
  }
);

const getCachedHealthCareArticle = unstable_cache(
  async (slug) => {
    const [rows] = await pool.execute(DETAIL_QUERY, [slug]);

    if (!rows.length) return null;

    return normalizeArticle(rows[0]);
  },
  ["health-care-detail-v1"],
  {
    revalidate: 3600,
    tags: ["health-care", "health-care-detail"],
  }
);

export async function getHealthCareArticles() {
  try {
    return await getCachedHealthCareListing();
  } catch (error) {
    console.error("Health Library listing error:", error);

    return {
      success: false,
      articles: [],
      categories: DEFAULT_CATEGORIES,
      newsTicker: [],
      error: "Unable to load health library articles.",
    };
  }
}

export async function getHealthCareArticleBySlug(slug) {
  if (!slug || typeof slug !== "string") return null;

  try {
    return await getCachedHealthCareArticle(slug);
  } catch (error) {
    console.error(`Health Library detail error (${slug}):`, error);
    throw error;
  }
}