"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * useAdminCaseStudies — fetches ALL case studies from
 * /api/admin/case-studies using session-cookie authentication.
 */
export default function useAdminCaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [reloadKey, setReloadKey]     = useState(0);

  const refetch = useCallback(() => setReloadKey((k) => k + 1), []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCaseStudies() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/admin/case-studies", {
          cache: "no-store",
          credentials: "include",
          signal: controller.signal,
        });

        const text = await res.text();
        let result;
        try {
          result = JSON.parse(text);
        } catch {
          throw new Error(
            `Failed to parse response (HTTP ${res.status}): ${text.slice(0, 100)}`
          );
        }

        if (!res.ok || !result.success || !Array.isArray(result.caseStudies)) {
          throw new Error(
            result.message || `Failed to fetch case studies (HTTP ${res.status}).`
          );
        }

        setCaseStudies(result.caseStudies);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Admin case studies API error:", err);
          setError(err.message || "Unable to load case studies.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchCaseStudies();
    return () => controller.abort();
  }, [reloadKey]);

  return { caseStudies, loading, error, refetch };
}
