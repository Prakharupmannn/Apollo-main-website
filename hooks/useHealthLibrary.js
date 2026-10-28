"use client";

import { useCallback, useEffect, useState } from "react";
import apiClient from "@/lib/api-client";

export default function useHealthLibrary() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => {
    setReloadKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchArticles() {
      try {
        setLoading(true);
        setError(null);

        const response = await apiClient.get("/api/health-care", {
          signal: controller.signal,
        });

        const result = response.data;

        if (!result.success || !Array.isArray(result.articles)) {
          throw new Error(
            result.message || "Invalid health library API response."
          );
        }

        setArticles(result.articles);
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error("Health library API error:", err);
          setError(
            err.response?.data?.message ||
              err.message ||
              "Unable to load health library articles."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchArticles();

    return () => controller.abort();
  }, [reloadKey]);

  return {
    articles,
    loading,
    error,
    refetch,
  };
}
