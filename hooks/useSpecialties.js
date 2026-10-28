"use client";

import { useCallback, useEffect, useState } from "react";

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

        const response = await fetch("/api/specialties", {
          method: "GET",
          headers: {
            "x-api-key": process.env.NEXT_PUBLIC_API_KEY || "apollo54321",
          },
          signal: controller.signal,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch specialties.");
        }

        const result = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
          throw new Error("Invalid specialties response.");
        }

        setSpecialties(result.data);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Specialties API error:", err);
          setError(err.message || "Unable to load specialties.");
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
