import axios from "axios";
import apiClient from "@/lib/api-client";

/**
 * Apollo Jabalpur Hospitals - Reusable Appointments API Service
 *
 * Uses only HIS_PHP_API_BASE_URL and HIS_PHP_API_KEY.
 * Server-side requests communicate directly with the HIS API.
 * Client-side requests use the secure Next.js API proxy.
 */

const BASE_URL = process.env.HIS_PHP_API_BASE_URL?.replace(/\/+$/, "");
const API_KEY = process.env.HIS_PHP_API_KEY;

const APPOINTMENTS_API_URL = BASE_URL
  ? `${BASE_URL}/web_appointments`
  : null;

const APPOINTMENTS_REQUEST_KEY = 1234;

/**
 * Server-side: Fetch appointments directly from the hospital HIS API.
 */
export async function fetchHospitalAppointments() {
  if (!BASE_URL || !API_KEY) {
    throw new Error(
      "HIS_PHP_API_BASE_URL or HIS_PHP_API_KEY is missing in environment variables."
    );
  }

  try {
    const response = await axios.post(
      APPOINTMENTS_API_URL,
      { KEY: APPOINTMENTS_REQUEST_KEY },
      {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        timeout: 10000,
      }
    );

    const data = response.data;

    if (data && Array.isArray(data.response)) {
      return data.response;
    }

    if (Array.isArray(data)) {
      return data;
    }

    if (data && Array.isArray(data.data)) {
      return data.data;
    }

    return [];
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.statusText ||
      error.message ||
      "Failed to fetch appointments from hospital API";

    console.error("[Appointments Service Error]:", message);
    throw new Error(message);
  }
}

/**
 * Client-side: Fetch appointments through the Next.js API proxy.
 */
export async function getAppointments(options = {}) {
  const { signal } = options;

  const response = await apiClient.get("/api/admin/appointments", {
    signal,
  });

  const result = response.data;

  if (!result.success || !Array.isArray(result.data)) {
    throw new Error(result.message || "Failed to retrieve appointments.");
  }

  return result.data;
}

export default {
  fetchHospitalAppointments,
  getAppointments,
};
