"use client";

import { useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/api-client";

export default function useCaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => {
    setReloadKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCaseStudies() {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get("/api/case-studies", {
          signal: controller.signal,
        });

        const result = response.data;

        if (!result.success || !Array.isArray(result.caseStudies)) {
          throw new Error(result.message || "Invalid case studies API response.");
        }

        setCaseStudies(result.caseStudies);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Case studies API error:", err);
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load case studies."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchCaseStudies();

    return () => controller.abort();
  }, [reloadKey]);

  return {
    caseStudies,
    loading,
    error,
    refetch,
  };
}
