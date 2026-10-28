"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * useAdminDoctors — fetches ALL doctor records (active + inactive)
 * from /api/admin/doctors. Uses session-cookie authentication.
 */
export default function useAdminDoctors() {
  const [doctors, setDoctors]   = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => setReloadKey((k) => k + 1), []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDoctors() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/admin/doctors", {
          credentials: "include",
          signal: controller.signal,
        });

        const result = await res.json();

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error(result.message || "Invalid doctors API response.");
        }

        setDoctors(result.data);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Admin doctors API error:", err);
          setError(err.message || "Unable to load doctors.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchDoctors();
    return () => controller.abort();
  }, [reloadKey]);

  return { doctors, loading, error, refetch };
}
