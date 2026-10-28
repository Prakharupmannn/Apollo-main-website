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

        const apiUrl = "/api/specialties";

        console.log("[Specialties] Request started:", {
          url: apiUrl,
          method: "GET",
        });

        let response;

        try {
          response = await fetch(apiUrl, {
            method: "GET",
            headers: {
              "x-api-key": "apollo54321",
            },
            signal: controller.signal,
            cache: "no-store",
          });
        } catch (err) {
          if (err.name === "AbortError") {
            throw err;
          }

          console.error("[Specialties] Network/Fetch Error:", {
            name: err.name,
            message: err.message,
            url: apiUrl,
            error: err,
          });

          throw new Error(
            `Network request failed: ${err.message}. Check the browser Network tab and API server logs.`
          );
        }

        // Read response body once, even for non-2xx responses.
        const responseText = await response.text();

        let result = null;

        try {
          result = responseText ? JSON.parse(responseText) : null;
        } catch {
          console.error("[Specialties] Invalid JSON response:", {
            status: response.status,
            statusText: response.statusText,
            body: responseText,
          });

          throw new Error(
            `API returned invalid JSON. HTTP ${response.status}.`
          );
        }

        console.log("[Specialties] API Response:", {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok,
          body: result,
        });

        if (!response.ok) {
          throw new Error(
            result?.message ||
              result?.error ||
              `HTTP ${response.status}: ${response.statusText}`
          );
        }

        if (!result?.success || !Array.isArray(result.data)) {
          console.error(
            "[Specialties] Unexpected response structure:",
            result
          );

          throw new Error(
            result?.message || "Invalid specialties API response."
          );
        }

        setSpecialties(result.data);

        console.log(
          `[Specialties] Successfully loaded ${result.data.length} records.`
        );
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("[Specialties] Final Error:", err);
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
