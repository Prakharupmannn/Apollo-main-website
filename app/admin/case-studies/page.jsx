"use client";

import React, { useMemo } from "react";
import ResourcePage from "@/components/admin/ResourcePage";
import CaseStudyModal from "@/components/admin/CaseStudyModal";
import useAdminCaseStudies from "@/hooks/useAdminCaseStudies";

const DEPTS = [
  "Cardiology",
  "Oncology",
  "Gastro",
  "Neuro",
  "Orthopedics",
  "Critical Care",
  "Others",
];

const config = {
  title: "Case Studies",
  subtitle:
    "Manage patient clinical success stories, surgical breakthroughs, and recovery outcomes.",
  addLabel: "Add Case Study",
  singular: "Case study",
  idPrefix: "CS",
  initial: [],
  searchKeys: ["title", "department", "doctor", "patient", "id"],
  tabs: { field: "department", options: DEPTS },
  columns: [
    { key: "id", label: "ID", type: "id" },
    { key: "image", label: "Image", type: "thumb" },
    { key: "title", label: "Title", type: "title" },
    { key: "department", label: "Department" },
    { key: "date", label: "Date", type: "date" },
  ],
  fields: [],
};

function toNumericId(val) {
  if (typeof val === "number" && Number.isInteger(val) && val > 0) return val;
  if (!val) return null;
  const raw = typeof val === "object" ? (val.dbId ?? val.id) : val;
  if (typeof raw === "number" && Number.isInteger(raw) && raw > 0) return raw;
  const digits = String(raw || "").replace(/\D/g, "");
  const num = parseInt(digits, 10);
  return Number.isInteger(num) && num > 0 ? num : null;
}

async function callApi(method, payload) {
  const res = await fetch("/api/admin/case-studies", {
    method,
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`Server error (HTTP ${res.status}): ${text.slice(0, 200)}`);
  }

  if (!res.ok || !data.success) {
    throw new Error(data.message || `Request failed (HTTP ${res.status}).`);
  }
  return data;
}

export default function CaseStudiesPage() {
  const { caseStudies, loading, error, refetch } = useAdminCaseStudies();

  const formattedCases = useMemo(() => {
    if (!Array.isArray(caseStudies)) return [];

    return caseStudies.map((c) => {
      const deptRaw = c.deptLabel || c.dept || "Others";
      const deptNormalized =
        DEPTS.find((d) =>
          String(deptRaw).toLowerCase().includes(d.toLowerCase())
        ) || deptRaw;

      let img = "";
      if (Array.isArray(c.images) && c.images.length > 0) {
        img =
          typeof c.images[0] === "string" ? c.images[0] : c.images[0]?.url || "";
      } else if (typeof c.images === "string" && c.images.trim()) {
        img = c.images.trim();
      }

      const numericId = toNumericId(c.id);

      return {
        ...c,
        dbId: numericId ?? c.id, // Explicitly tracks numeric primary key
        id: numericId
          ? `CS${String(numericId).padStart(3, "0")}`
          : c.id || "",
        department: deptNormalized,
        date: c.created_at ? String(c.created_at).slice(0, 10) : "",
        image: img,
      };
    });
  }, [caseStudies]);

  const handleSave = async (mode, form) => {
    const payload = { ...form };
    if (mode !== "add") {
      const validId = toNumericId(form);
      if (!validId) {
        throw new Error("Missing or invalid Case Study ID for update.");
      }
      payload.dbId = validId;
    }
    await callApi(mode === "add" ? "POST" : "PATCH", payload);
  };

  const handleDelete = async (row) => {
    const validId = toNumericId(row);
    if (!validId) {
      throw new Error("Missing or invalid Case Study ID for delete.");
    }
    await callApi("DELETE", { dbId: validId });
  };

  return (
    <ResourcePage
      config={config}
      data={formattedCases}
      loading={loading}
      error={error}
      onRefresh={refetch}
      onSave={handleSave}
      onDelete={handleDelete}
      CustomModal={CaseStudyModal}
    />
  );
}
