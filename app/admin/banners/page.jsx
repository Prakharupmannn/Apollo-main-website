"use client";

import ResourcePage from "@/components/admin/ResourcePage";
import { BANNERS } from "@/lib/admin-data";

const PLACEMENTS = ["Home hero", "Home strip", "Doctors page", "Events page"];

const config = {
  title: "Banners",
  subtitle: "Control the banners shown across your website.",
  addLabel: "Add Banner",
  singular: "Banner",
  idPrefix: "BN",
  initial: BANNERS,
  searchKeys: ["title", "placement", "id"],
  tabs: { field: "placement", options: PLACEMENTS },
  columns: [
    { key: "id", label: "ID", type: "id" },
    { key: "image", label: "Preview", type: "thumb" },
    { key: "title", label: "Title", type: "title" },
    { key: "placement", label: "Placement" },
    { key: "order", label: "Order" },
    { key: "status", label: "Status", type: "status" },
  ],
  fields: [
    { name: "title", label: "Banner title", required: true, full: true },
    { name: "placement", label: "Placement", type: "select", options: PLACEMENTS },
    { name: "order", label: "Display order", type: "number" },
    { name: "status", label: "Status", type: "select", options: ["Published", "Draft"] },
    { name: "image", label: "Image URL (optional)", placeholder: "https://…" },
  ],
};

export default function BannersPage() {
  return <ResourcePage config={config} />;
}