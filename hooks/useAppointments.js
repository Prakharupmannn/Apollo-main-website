"use client";

import { useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/api-client";

/**
 * useAppointments — fetches live appointments from /api/admin/appointments using Axios.
 * Follows the same pattern as useDoctors / useDashboardStats.
 * The API key is injected automatically by apiClient interceptor.
 *
 * @returns {{ appointments: Array, loading: boolean, error: string|null, refetch: Function }}
 */
export default function useAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => {
    setReloadKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchAppointments() {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get("/api/admin/appointments", {
          signal: controller.signal,
        });

        const result = response.data;

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error(result.message || "Invalid appointments API response.");
        }

        setAppointments(result.data);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Appointments API error:", err);
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load appointments."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchAppointments();

    return () => controller.abort();
  }, [reloadKey]);

  return { appointments, loading, error, refetch };
}
