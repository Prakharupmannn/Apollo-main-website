"use client";

import React, { useMemo } from "react";
import ResourcePage from "@/components/admin/ResourcePage";
import HealthLibraryModal from "@/components/admin/HealthLibraryModal";
import useAdminHealthLibrary from "@/hooks/useAdminHealthLibrary";

const TYPES = ["Articles", "Videos", "Infographics", "News"];

const config = {
  title: "Health Library",
  subtitle:
    "Manage clinical health articles, wellness guides, educational videos, and infographics.",
  addLabel: "Add Article",
  singular: "Article",
  idPrefix: "HL",
  initial: [],
  searchKeys: ["title", "category", "author", "type", "id"],
  tabs: { field: "type", options: TYPES },
  columns: [
    { key: "id", label: "ID", type: "id" },
    { key: "image", label: "Image", type: "thumb" },
    { key: "title", label: "Title", type: "title" },
    { key: "category", label: "Category" },
    { key: "date", label: "Date", type: "date" },
  ],
  fields: [], // ← FIX 1: must exist (empty), the custom modal handles the form
};

export default function HealthLibraryPage() {
  const { articles, loading, error, refetch } = useAdminHealthLibrary();

  const formattedArticles = useMemo(() => {
    if (!Array.isArray(articles) || articles.length === 0) return null;
    return articles.map((a) => {
      let cat = a.category;
      if (!cat && Array.isArray(a.categories) && a.categories.length > 0) {
        cat = a.categories[0];
      }

      let typeNormalized = "Articles";
      if (a.type) {
        const found = TYPES.find(
          (t) => t.toLowerCase() === String(a.type).toLowerCase()
        );
        if (found) typeNormalized = found;
      }

      const dateStr = a.date
        ? String(a.date).slice(0, 10)
        : a.created_at
          ? String(a.created_at).slice(0, 10)
          : "";

      return {
        ...a,
        dbId: a.id,
        id:
          typeof a.id === "number"
            ? `HL${String(a.id).padStart(3, "0")}`
            : a.id || "",
        title: a.title || "Health Article",
        category: cat || "General",
        type: typeNormalized,
        date: dateStr,
        image: a.image || "",
        author: a.author || "",
        authorRole: a.authorRole || "",
        excerpt: a.excerpt || "",
      };
    });
  }, [articles]);

  const categoryOptions = useMemo(() => {
    if (!formattedArticles) return [];
    return [
      ...new Set(formattedArticles.map((a) => a.category).filter(Boolean)),
    ].sort();
  }, [formattedArticles]);

  // Wrapper gives the modal real categories + the page's TYPES
  const Modal = useMemo(() => {
    const Wrapped = (props) => (
      <HealthLibraryModal
        {...props}
        departments={categoryOptions}
        types={TYPES}
      />
    );
    return Wrapped;
  }, [categoryOptions]);

  const handleSave = async (mode, form) => {
    const method = mode === "add" ? "POST" : "PATCH";
    const payload = mode === "add" ? { ...form } : { ...form, dbId: form.dbId };

    const res = await fetch("/api/admin/health-library", {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Save failed.");
  };

  const handleDelete = async (row) => {
    const res = await fetch("/api/admin/health-library", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ dbId: row.dbId }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Delete failed.");
  };

  return (
    <ResourcePage
      config={config}
      data={formattedArticles}
      loading={loading}
      error={error}
      onRefresh={refetch}
      onSave={handleSave}
      onDelete={handleDelete}
      CustomModal={Modal} // ← FIX 2: correct prop name + use the wrapper
    />
  );
}