"use client";

import { useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/api-client";

export default function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => {
    setReloadKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchEvents() {
      try {
        setLoading(true);
        setError("");

        const response = await apiClient.get("/api/events", {
          signal: controller.signal,
        });

        const result = response.data;

        if (!result.success || !Array.isArray(result.events)) {
          throw new Error(result.message || "Invalid events API response.");
        }

        setEvents(result.events);
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load events."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchEvents();

    return () => controller.abort();
  }, [reloadKey]);

  return { events, loading, error, refetch };
}
