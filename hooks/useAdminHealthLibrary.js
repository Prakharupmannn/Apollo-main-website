"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * useAdminHealthLibrary — fetches ALL health library articles from
 * /api/admin/health-library using session-cookie authentication.
 */
export default function useAdminHealthLibrary() {
  const [articles, setArticles]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => setReloadKey((k) => k + 1), []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchArticles() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/admin/health-library", {
          credentials: "include",
          signal: controller.signal,
        });

        const result = await res.json();

        if (!result.success || !Array.isArray(result.articles)) {
          throw new Error(result.message || "Invalid health library API response.");
        }

        setArticles(result.articles);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Admin health library API error:", err);
          setError(err.message || "Unable to load health library articles.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchArticles();
    return () => controller.abort();
  }, [reloadKey]);

  return { articles, loading, error, refetch };
}
