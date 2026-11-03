const BASE_URL = process.env.HIS_PHP_API_BASE_URL?.replace(/\/+$/, "");
const API_KEY = process.env.HIS_PHP_API_KEY;

export async function callHisApi(endpoint, payload = {}) {
  if (!BASE_URL || !API_KEY) {
    throw new Error(
      "HIS_PHP_API_BASE_URL or HIS_PHP_API_KEY is missing in .env.local"
    );
  }

  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      ...payload,
      KEY: API_KEY,
    }),
    cache: "no-store",
  });

  const raw = await response.text();

  let result;
  try {
    result = JSON.parse(raw);
  } catch {
    throw new Error(
      `HIS API "${endpoint}" returned invalid JSON (HTTP ${response.status})`
    );
  }

  if (!response.ok || String(result.status) !== "1") {
    throw new Error(
      result.message || `HIS API "${endpoint}" failed (HTTP ${response.status})`
    );
  }

  return Array.isArray(result.response) ? result.response : [];
}

export function apiError(error, fallback = "Unable to fetch data") {
  console.error("[HIS API]", error);

  return Response.json(
    {
      success: false,
      message: error instanceof Error ? error.message : fallback,
      data: [],
    },
    { status: 502 }
  );
}