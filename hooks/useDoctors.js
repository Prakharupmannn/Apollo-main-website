"use client";

import { useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/api-client";

/**
 * useDoctors — fetches live doctor records from /api/doctors.
 * Follows the same pattern as useSpecialties / useEvents / useHealthLibrary.
 * The API key is injected automatically by apiClient (reads API_KEY from env).
 */
export default function useDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => {
    setReloadKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchDoctors() {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get("/api/doctors", {
          signal: controller.signal,
        });

        const result = response.data;

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error(result.message || "Invalid doctors API response.");
        }

        setDoctors(result.data);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Doctors API error:", err);
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load doctors."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchDoctors();

    return () => controller.abort();
  }, [reloadKey]);

  return { doctors, loading, error, refetch };
}
