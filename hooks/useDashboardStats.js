"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * useDashboardStats — fetches live aggregate counts from /api/admin/stats.
 * Uses session-cookie authentication (not x-api-key) so fetch() is used
 * directly instead of apiClient.
 *
 * Returns: { stats, loading, error, refetch }
 *   stats = { doctors, specialties, events, caseStudies, articles, users, inquiries }
 */
export default function useDashboardStats() {
  const [stats, setStats]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => setReloadKey((k) => k + 1), []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchStats() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/admin/stats", {
          credentials: "include",
          signal: controller.signal,
        });

        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || "Failed to fetch dashboard stats.");
        }

        setStats(data.stats);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Dashboard stats error:", err.message);
          setError(err.message || "Unable to load dashboard statistics.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchStats();
    return () => controller.abort();
  }, [reloadKey]);

  return { stats, loading, error, refetch };
}
