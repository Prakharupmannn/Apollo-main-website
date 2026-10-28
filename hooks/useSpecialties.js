"use client";

import { useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/api-client";

export default function useSpecialties() {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => {
    setReloadKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchSpecialties() {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get("/api/specialties", {
          signal: controller.signal,
        });

        const result = response.data;

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error(result.message || "Invalid specialties response.");
        }

        setSpecialties(result.data);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Specialties API error:", err);
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load specialties."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchSpecialties();

    return () => controller.abort();
  }, [reloadKey]);

  return {
    specialties,
    loading,
    error,
    refetch,
  };
}
