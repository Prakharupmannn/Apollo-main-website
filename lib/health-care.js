import { GET as getHandler } from "@/app/api/health-library/route";

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

function getApiKey() {
  return (
    process.env.HEALTH_CARE_API_KEY ||
    process.env.API_KEY ||
    "apollo54321"
  );
}

function getApiBaseUrl() {
  if (process.env.HEALTH_CARE_API_URL) {
    return process.env.HEALTH_CARE_API_URL.replace(/\/+$/, "");
  }
  const host =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    `http://127.0.0.1:${process.env.PORT || 3000}`;
  return `${host.replace(/\/+$/, "")}/api/health-care`;
}

/**
 * Fetch all health library articles via API with in-process fallback
 */
export async function getHealthCareArticles() {
  const apiKey = getApiKey();
  const apiUrl = getApiBaseUrl();

  try {
    const res = await fetch(apiUrl, {
      headers: {
        "x-api-key": apiKey,
      },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.articles)) {
        return processArticlesPayload(data.articles);
      }
    } else {
      console.warn(`Health Care API HTTP ${res.status}, falling back to handler`);
    }
  } catch (err) {
    console.warn("Health Care API fetch failed, trying direct handler fallback:", err.message);
  }

  // Direct handler fallback
  try {
    const fallbackReq = new Request("http://localhost:3000/api/health-care", {
      headers: { "x-api-key": apiKey },
    });
    const fallbackRes = await getHandler(fallbackReq);
    if (fallbackRes.ok) {
      const data = await fallbackRes.json();
      if (data.success && Array.isArray(data.articles)) {
        return processArticlesPayload(data.articles);
      }
    }
  } catch (fallbackErr) {
    console.error("Direct handler fallback failed:", fallbackErr);
  }

  return {
    success: false,
    articles: [],
    categories: DEFAULT_CATEGORIES,
    newsTicker: [],
    error: "Unable to load health library articles.",
  };
}

/**
 * Fetch single health library article by slug via API with in-process fallback
 */
export async function getHealthCareArticleBySlug(slug) {
  if (!slug) return null;

  const apiKey = getApiKey();
  const apiUrl = `${getApiBaseUrl()}?slug=${encodeURIComponent(slug)}`;

  try {
    const res = await fetch(apiUrl, {
      headers: {
        "x-api-key": apiKey,
      },
      cache: "no-store",
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && Array.isArray(data.articles) && data.articles.length > 0) {
        return data.articles.find((a) => a.slug === slug) || data.articles[0];
      }
      return null;
    }
  } catch (err) {
    console.warn(`Health Care API fetch for slug "${slug}" failed, trying direct handler fallback:`, err.message);
  }

  // Direct handler fallback
  try {
    const fallbackReq = new Request(
      `http://localhost:3000/api/health-care?slug=${encodeURIComponent(slug)}`,
      {
        headers: { "x-api-key": apiKey },
      }
    );
    const fallbackRes = await getHandler(fallbackReq);
    if (fallbackRes.ok) {
      const data = await fallbackRes.json();
      if (data.success && Array.isArray(data.articles) && data.articles.length > 0) {
        return data.articles.find((a) => a.slug === slug) || data.articles[0];
      }
    }
  } catch (fallbackErr) {
    console.error(`Direct handler fallback for slug "${slug}" failed:`, fallbackErr);
  }

  return null;
}

function processArticlesPayload(articles) {
  const categories =
    Array.isArray(articles[0]?.siteCategories) && articles[0].siteCategories.length > 0
      ? articles[0].siteCategories
      : DEFAULT_CATEGORIES;

  const newsTicker =
    Array.isArray(articles[0]?.newsTicker) && articles[0].newsTicker.length > 0
      ? articles[0].newsTicker
      : [];

  return {
    success: true,
    articles,
    categories,
    newsTicker,
    error: null,
  };
}
