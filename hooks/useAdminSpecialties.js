"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * useAdminSpecialties — fetches ALL specialties (active + inactive)
 * from /api/admin/specialties using session-cookie authentication.
 */
export default function useAdminSpecialties() {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [reloadKey, setReloadKey]     = useState(0);

  const refetch = useCallback(() => setReloadKey((k) => k + 1), []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchSpecialties() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/admin/specialties", {
          credentials: "include",
          signal: controller.signal,
        });

        const result = await res.json();

        if (!result.success || !Array.isArray(result.specialties)) {
          throw new Error(result.message || "Invalid specialties API response.");
        }

        setSpecialties(result.specialties);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Admin specialties API error:", err);
          setError(err.message || "Unable to load specialties.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchSpecialties();
    return () => controller.abort();
  }, [reloadKey]);

  return { specialties, loading, error, refetch };
}
