import axios from "axios";

/**
 * Apollo Jabalpur Hospitals - Centralized Axios API Client
 * Configured with authentication header and dynamic base URL.
 *
 * API_KEY is a server-only env var; NEXT_PUBLIC_API_KEY is the
 * browser-exposed copy.  Both must be kept in sync in .env.local.
 */

function getBaseUrl() {
  if (typeof window !== "undefined") {
    // In browser, relative URLs resolve to current origin automatically
    return "";
  }
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/+$/, "");
  }
  if (process.env.SITE_URL) {
    return process.env.SITE_URL.replace(/\/+$/, "");
  }
  return `http://127.0.0.1:${process.env.PORT || 3000}`;
}

function getApiKey() {
  // NEXT_PUBLIC_API_KEY is available in both server and browser bundles.
  // API_KEY / HEALTH_CARE_API_KEY are server-only — fine for SSR calls.
  return (
    process.env.NEXT_PUBLIC_API_KEY ||
    process.env.API_KEY ||
    process.env.HEALTH_CARE_API_KEY ||
    "apollo54321"
  );
}

export const apiClient = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "x-api-key": getApiKey(),
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Interceptor: guarantee the API key is present on every request
apiClient.interceptors.request.use((config) => {
  // Ensure base URL is set when running server-side
  if (!config.baseURL && typeof window === "undefined") {
    config.baseURL = getBaseUrl();
  }

  // Always set the API key so it is never accidentally missing
  config.headers = config.headers || {};
  config.headers["x-api-key"] = getApiKey();

  return config;
});

export default apiClient;
