"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * useAdminEvents — fetches ALL events (Published + Draft) from
 * /api/admin/events using session-cookie authentication.
 */
export default function useAdminEvents() {
  const [events, setEvents]     = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => setReloadKey((k) => k + 1), []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchEvents() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("/api/admin/events", {
          credentials: "include",
          signal: controller.signal,
        });

        const result = await res.json();

        if (!result.success || !Array.isArray(result.events)) {
          throw new Error(result.message || "Invalid events API response.");
        }

        setEvents(result.events);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Admin events API error:", err);
          setError(err.message || "Unable to load events.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    fetchEvents();
    return () => controller.abort();
  }, [reloadKey]);

  return { events, loading, error, refetch };
}
