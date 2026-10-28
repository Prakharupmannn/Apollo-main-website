"use client";

import React, { useMemo } from "react";
import ResourcePage from "@/components/admin/ResourcePage";
import SpecialtyModal from "@/components/admin/SpecialtyModal";
import useAdminSpecialties from "@/hooks/useAdminSpecialties";

const CATEGORIES = [
  "Centres of Excellence",
  "Surgical Sciences",
  "Medical Specialties",
  "Diagnostic Sciences",
  "Others",
];

const config = {
  title: "Specialties",
  subtitle:
    "Manage clinical specialties, surgical departments, Centres of Excellence, and treatments.",
  addLabel: "Add Specialty",
  singular: "Specialty",
  idPrefix: "SP",
  initial: [],
  searchKeys: ["name", "category", "tagline", "slug", "id"],
  tabs: { field: "category", options: CATEGORIES },
  columns: [
    { key: "id", label: "ID", type: "id" },
    { key: "image", label: "Image", type: "thumb" },
    { key: "name", label: "Specialty", type: "title" },
    { key: "category", label: "Category" },
    { key: "statDisplay", label: "Key Stat" },
    { key: "status", label: "Status", type: "status" },
  ],
  fields: [], // form is handled inside SpecialtyModal
};

export default function SpecialtiesPage() {
  const { specialties, loading, error, refetch } = useAdminSpecialties();

  const formattedSpecialties = useMemo(() => {
    if (!Array.isArray(specialties) || specialties.length === 0) return null;

    return specialties.map((s) => {
      let cat = s.category || "Medical Specialties";
      const matched = CATEGORIES.find((c) => c.toLowerCase() === cat.toLowerCase());
      if (matched) cat = matched;

      const statLabel = s.statLabel ?? s.stat_label ?? "";

      return {
        ...s,
        dbId: s.id,
        id: typeof s.id === "number" ? `SP${String(s.id).padStart(3, "0")}` : s.id || "",
        name: s.name || "Medical Specialty",
        category: cat,
        stat: s.stat ?? "",               // raw value, used by the modal
        statLabel,                        // raw label, used by the modal
        statDisplay: s.stat
          ? `${s.stat} ${statLabel}`.trim()
          : s.badge || "Clinical Care",   // shown in the table only
        status: s.status === 0 || s.status === "0" ? "Inactive" : "Active",
        image: s.image || "",
        intro: s.intro || "",
        tagline: s.tagline || "",
      };
    });
  }, [specialties]);

  const handleSave = async (mode, form) => {
    const payload = {
      name: form.name,
      slug: form.slug,
      category: form.category,
      icon: form.icon,
      tagline: form.tagline,
      badge: form.badge,
      stat: form.stat,
      stat_label: form.stat_label,
      image: form.image,
      intro: form.intro,
      services: form.services,
      status: form.status,
    };
    if (mode !== "add") payload.dbId = form.dbId;

    const res = await fetch("/api/admin/specialties", {
      method: mode === "add" ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Save failed.");
  };

  const handleDelete = async (row) => {
    const res = await fetch("/api/admin/specialties", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ dbId: row.dbId, name: row.name }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Delete failed.");
  };

  return (
    <ResourcePage
      config={config}
      data={formattedSpecialties}
      loading={loading}
      error={error}
      onRefresh={refetch}
      onSave={handleSave}
      onDelete={handleDelete}
      CustomModal={SpecialtyModal}
    />
  );
}