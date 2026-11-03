import axios from "axios";
import apiClient from "@/lib/api-client";

/**
 * Apollo Jabalpur Hospitals - Reusable Appointments API Service
 * 
 * Handles:
 * 1. Server-side direct fetching from the hospital HIS API using Axios with credentials
 *    kept securely on the server.
 * 2. Client-side fetching via the secure Next.js API proxy reusing the centralized Axios apiClient.
 */

const APPOINTMENTS_API_URL =
  process.env.APPOINTMENTS_API_URL ||
  (process.env.HIS_PHP_API_BASE_URL
    ? `${process.env.HIS_PHP_API_BASE_URL.replace(/\/+$/, "")}/web_appointments`
    : "http://10.10.34.63/apollo/Empapi/web_appointments");

const APPOINTMENTS_API_KEY =
  process.env.APPOINTMENTS_API_KEY ||
  process.env.API_KEY ||
  process.env.HEALTH_CARE_API_KEY ||
  "apollo54321";

const APPOINTMENTS_REQUEST_KEY = process.env.APPOINTMENTS_REQUEST_KEY
  ? Number(process.env.APPOINTMENTS_REQUEST_KEY) || 1234
  : 1234;

/**
 * Server-side: Fetch raw appointment list directly from the hospital appointments API
 * using Axios.
 *
 * Method: POST
 * Headers: x-api-key: <APPOINTMENTS_API_KEY>, Content-Type: application/json
 * Body: { "KEY": 1234 }
 *
 * @returns {Promise<Array>} Array of raw appointment objects matching the 11 API fields.
 */
export async function fetchHospitalAppointments() {
  if (!APPOINTMENTS_API_URL) {
    throw new Error("Appointments API URL is not configured.");
  }

  try {
    const response = await axios.post(
      APPOINTMENTS_API_URL,
      { KEY: APPOINTMENTS_REQUEST_KEY },
      {
        headers: {
          "x-api-key": APPOINTMENTS_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        timeout: 10000,
      }
    );

    const data = response.data;

    // Confirmed API response structure:
    // { status: 1, message: "Success", response: [ ...appointments ] }
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
 * Client-side: Fetch appointments through the Next.js API proxy
 * using the configured Axios apiClient.
 *
 * @param {object} options - Optional Axios request config (e.g. signal for AbortController)
 * @returns {Promise<Array>}
 */
export async function getAppointments(options = {}) {
  const { signal } = options;
  const response = await apiClient.get("/api/admin/appointments", { signal });
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
