"use client";

import React, { useMemo } from "react";
import ResourcePage from "@/components/admin/ResourcePage";
import EventModal from "@/components/admin/EventModal";
import useAdminEvents from "@/hooks/useAdminEvents";

const config = {
  title: "Events",
  subtitle:
    "Create and manage hospital events, health camps, and clinical awareness programs.",
  addLabel: "Add Event",
  singular: "Event",
  idPrefix: "EVT",
  initial: [],
  searchKeys: ["title", "location", "category", "id"],
  tabs: { field: "status", options: ["Published", "Draft"] },
  columns: [
    { key: "id", label: "ID", type: "id" },
    { key: "image", label: "Image", type: "thumb" },
    { key: "title", label: "Title", type: "title" },
    { key: "date", label: "Date", type: "date" },
    { key: "location", label: "Location" },
    { key: "status", label: "Status", type: "status" },
  ],
  fields: [], // the form lives in EventModal
};

async function callApi(method, payload) {
  const res = await fetch("/api/admin/events", {
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

export default function EventsPage() {
  const { events, loading, error, refetch } = useAdminEvents();

  const formattedEvents = useMemo(() => {
    if (!Array.isArray(events) || events.length === 0) return null;
    return events.map((e) => ({
      ...e, // keeps every raw field for the modal
      dbId: e.id,
      id:
        typeof e.id === "number"
          ? `EVT${String(e.id).padStart(3, "0")}`
          : e.id || "",
      title: e.title || "Untitled Event",
      date: e.date ? String(e.date).slice(0, 10) : "",
      location: e.location || "",
      status: e.status || "Published",
      image: e.image || "",
    }));
  }, [events]);

  const categories = useMemo(
    () =>
      [...new Set((formattedEvents || []).map((e) => e.category).filter(Boolean))].sort(),
    [formattedEvents]
  );

  // wrapper gives the modal the existing categories
  const Modal = useMemo(() => {
    const Wrapped = (props) => <EventModal {...props} categories={categories} />;
    return Wrapped;
  }, [categories]);

  // ResourcePage refreshes the list after a successful save / delete
  const handleSave = async (mode, form) => {
    const payload = { ...form };
    if (mode !== "add") payload.dbId = Number(form.dbId);
    await callApi(mode === "add" ? "POST" : "PATCH", payload);
  };

  const handleDelete = async (row) => {
    await callApi("DELETE", { dbId: Number(row.dbId) });
  };

  return (
    <ResourcePage
      config={config}
      data={formattedEvents}
      loading={loading}
      error={error}
      onRefresh={refetch}
      onSave={handleSave}
      onDelete={handleDelete}
      CustomModal={Modal}
    />
  );
}