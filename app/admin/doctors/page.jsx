"use client";

import React, { useMemo } from "react";
import ResourcePage from "@/components/admin/ResourcePage";
import useAdminDoctors from "@/hooks/useAdminDoctors";
import DoctorModal from "@/components/admin/DoctorModal";

const DEPARTMENTS = ["Cardiology", "Oncology", "Gastro", "Neuro", "Orthopedics", "Others"];

const JSON_FIELDS = [
  "about", "languages", "qualifications", "highlights", "expertise",
  "experience_details", "training", "research", "publications", "faqs",
  "podcasts", "opd", "expertise_categories", "conditions",
  "clinical_procedures", "diagnostic_services", "clinical_interests",
  "specialized_interventions", "areas_of_special_interest", "why_choose",
  "certifications", "professional_memberships",
];

const TEXT_FIELDS = [
  "name", "designation", "speciality", "department", "image", "summary",
  "experience", "tagline", "professional_approach", "research_details",
];

/* ---------- Premium UI: scoped styles (UI only) ---------- */
const PREMIUM_CSS = `
.doctors-premium {
  --dp-ink: #0f172a;
  --dp-muted: #64748b;
  --dp-line: #e8ecf4;
  --dp-brand: #4f46e5;
  --dp-brand-2: #7c3aed;
  --dp-soft: #f6f7fc;
  font-family: "Plus Jakarta Sans", "Inter", ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  color: var(--dp-ink);
}
.doctors-premium h1, .doctors-premium h2 {
  letter-spacing: -0.02em;
  font-weight: 800;
}

/* Card around table */
.doctors-premium table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
}
.doctors-premium thead th {
  background: linear-gradient(180deg, #fafbff 0%, #f1f3fb 100%);
  color: #475569;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  padding: 16px 20px;
  border-bottom: 1px solid var(--dp-line);
  white-space: nowrap;
}
.doctors-premium tbody td {
  padding: 16px 20px;
  font-size: 14px;
  color: #334155;
  border-bottom: 1px solid #f0f2f8;
  vertical-align: middle;
  background: #fff;
  transition: background 0.25s ease, box-shadow 0.25s ease;
}
.doctors-premium tbody tr:hover td {
  background: linear-gradient(90deg, #f7f6ff 0%, #ffffff 70%);
}
.doctors-premium tbody tr:hover td:first-child {
  box-shadow: inset 3px 0 0 var(--dp-brand);
}
.doctors-premium tbody tr:last-child td { border-bottom: none; }

/* ID */
.doctors-premium tbody td:nth-child(1) {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  font-weight: 600;
  color: var(--dp-brand);
  letter-spacing: 0.04em;
}

/* Doctor cell: avatar + name */
.doctors-premium tbody td:nth-child(2) { font-weight: 700; color: var(--dp-ink); }
.doctors-premium tbody td:nth-child(2) img {
  border-radius: 9999px;
  object-fit: cover;
  box-shadow: 0 0 0 2px #fff, 0 0 0 4px #c7d2fe, 0 6px 14px rgba(79, 70, 229, 0.25);
  transition: transform 0.25s ease;
}
.doctors-premium tbody tr:hover td:nth-child(2) img { transform: scale(1.06); }

/* Action buttons */
.doctors-premium tbody td:last-child button {
  border-radius: 12px;
  transition: all 0.2s ease;
}
.doctors-premium tbody td:last-child button:hover {
  background: #eef2ff;
  color: var(--dp-brand);
  transform: translateY(-2px);
  box-shadow: 0 6px 14px rgba(79, 70, 229, 0.18);
}

/* Primary buttons (Add Doctor etc.) */
.doctors-premium button[class*="primary"],
.doctors-premium header button,
.doctors-premium > div > div:first-child button {
  border-radius: 12px;
}

/* Inputs */
.doctors-premium input[type="text"],
.doctors-premium input[type="search"],
.doctors-premium input:not([type]) {
  border-radius: 12px;
  border: 1px solid var(--dp-line);
  background: #fff;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.doctors-premium input:focus {
  outline: none;
  border-color: var(--dp-brand);
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.12);
}

/* Custom cell chips (used by column render functions) */
.dp-spec { display: flex; flex-direction: column; line-height: 1.25; }
.dp-spec b { font-weight: 700; color: var(--dp-ink); font-size: 13.5px; }
.dp-spec span { font-size: 11.5px; color: var(--dp-muted); }

.dp-exp {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 12px; border-radius: 9999px;
  background: #f1f5f9; color: #334155;
  font-size: 12.5px; font-weight: 600;
}
.dp-exp::before { content: "★"; color: #f59e0b; font-size: 11px; }

.dp-dept {
  display: inline-flex; align-items: center;
  padding: 6px 14px; border-radius: 10px;
  font-size: 12px; font-weight: 700; letter-spacing: 0.02em;
  border: 1px solid transparent;
}
.dp-dept.Cardiology  { background:#fff1f2; color:#e11d48; border-color:#ffe0e5; }
.dp-dept.Oncology    { background:#faf5ff; color:#9333ea; border-color:#f0e1ff; }
.dp-dept.Gastro      { background:#fffbeb; color:#d97706; border-color:#fdecc0; }
.dp-dept.Neuro       { background:#eef2ff; color:#4f46e5; border-color:#dde3ff; }
.dp-dept.Orthopedics { background:#ecfeff; color:#0891b2; border-color:#cdf5fb; }
.dp-dept.Others      { background:#f1f5f9; color:#475569; border-color:#e2e8f0; }

.dp-status {
  display: inline-flex; align-items: center; gap: 7px;
  padding: 6px 14px; border-radius: 9999px;
  font-size: 12px; font-weight: 700;
}
.dp-status::before {
  content: ""; width: 7px; height: 7px; border-radius: 9999px; background: currentColor;
  box-shadow: 0 0 0 3px color-mix(in srgb, currentColor 20%, transparent);
}
.dp-status.Active   { background:#ecfdf5; color:#059669; }
.dp-status.Inactive { background:#fef2f2; color:#dc2626; }
`;

// helper to build a textarea field
const area = (name, label, placeholder = "Write here........", rows = 3) => ({
  name, label, type: "textarea", rows, placeholder, full: true,
});

const config = {
  title: "Doctors",
  subtitle: "Manage your hospital's doctors and specialists.",
  addLabel: "Add Doctor",
  singular: "Doctor",
  idPrefix: "DR",
  initial: [],
  searchKeys: ["name", "speciality", "department", "designation", "id"],
  tabs: { field: "department", options: DEPARTMENTS },
  columns: [
    { key: "id", label: "ID", type: "id" },
    { key: "name", label: "Doctor", type: "person", subKey: "designation", imageKey: "image" },
    {
      key: "speciality",
      label: "Speciality",
      render: (row) => (
        <div className="dp-spec">
          <b>{row.speciality}</b>
        </div>
      ),
    },
    {
      key: "experience",
      label: "Experience",
      render: (row) => <span className="dp-exp">{row.experience}</span>,
    },
    {
      key: "department",
      label: "Department",
      render: (row) => <span className={`dp-dept ${row.department}`}>{row.department}</span>,
    },
    {
      key: "status",
      label: "Status",
      type: "status",
      render: (row) => <span className={`dp-status ${row.status}`}>{row.status}</span>,
    },
  ],
  // No `required: true` anywhere → no validation
  fields: [
    { name: "name", label: "Full name", placeholder: "Dr. Full Name", full: true },
    { name: "designation", label: "Designation", placeholder: "e.g. Senior Consultant", full: true },
    { name: "speciality", label: "Speciality", placeholder: "e.g. Consultant Neurosurgery" },
    { name: "department", label: "Department", type: "select", options: DEPARTMENTS },
    { name: "experience", label: "Experience", placeholder: "e.g. 15+ Years" },
    { name: "status", label: "Status", type: "select", options: ["Active", "Inactive"] },
    { name: "image", label: "Photo URL", placeholder: "https://…", full: true },
    { name: "tagline", label: "Tagline", placeholder: "Short tagline", full: true },
    area("summary", "Summary", "Short summary", 3),
    area("about", "About"),
    area("languages", "Languages", "e.g. English\nHindi"),
    area("qualifications", "Qualifications"),
    area("highlights", "Highlights"),
    area("expertise", "Expertise"),
    area("experience_details", "Experience Details"),
    area("training", "Training"),
    area("research", "Research"),
    area("research_details", "Research Details", "Plain text"),
    area("publications", "Publications"),
    area("faqs", 'FAQs', '[{"question":"...","answer":"..."}]', 4),
    area("podcasts", "Podcasts"),
    area("opd", "OPD", '[{"day":"Mon","time":"10am-1pm"}]'),
    area("expertise_categories", "Expertise Categories"),
    area("conditions", "Conditions"),
    area("clinical_procedures", "Clinical Procedures"),
    area("diagnostic_services", "Diagnostic Services"),
    area("clinical_interests", "Clinical Interests"),
    area("specialized_interventions", "Specialized Interventions"),
    area("areas_of_special_interest", "Areas of Special Interest"),
    area("why_choose", "Why Choose"),
    area("professional_approach", "Professional Approach", "Plain text"),
    area("certifications", "Certifications"),
    area("professional_memberships", "Professional Memberships"),
  ],
};

function normaliseDepartment(raw) {
  if (!raw) return "Others";
  const match = DEPARTMENTS.find((d) => d.toLowerCase() === String(raw).toLowerCase());
  return match || "Others";
}

// DB JSON → text for the textarea when editing
function toText(v) {
  if (v === null || v === undefined) return "";
  if (typeof v === "string") return v;
  return JSON.stringify(v, null, 2);
}

export default function DoctorsPage() {
  const { doctors, loading, error, refetch } = useAdminDoctors();

  const formattedDoctors = useMemo(() => {
    if (!Array.isArray(doctors) || doctors.length === 0) return null;

    return doctors.map((doc) => {
      // camelCase from API → snake_case form fields
      const map = {
        experience_details: doc.experienceDetails ?? doc.experience_details,
        expertise_categories: doc.expertiseCategories ?? doc.expertise_categories,
        clinical_procedures: doc.clinicalProcedures ?? doc.clinical_procedures,
        diagnostic_services: doc.diagnosticServices ?? doc.diagnostic_services,
        clinical_interests: doc.clinicalInterests ?? doc.clinical_interests,
        specialized_interventions: doc.specializedInterventions ?? doc.specialized_interventions,
        areas_of_special_interest: doc.areasOfSpecialInterest ?? doc.areas_of_special_interest,
        why_choose: doc.whyChoose ?? doc.why_choose,
        professional_approach: doc.professionalApproach ?? doc.professional_approach,
        professional_memberships: doc.professionalMemberships ?? doc.professional_memberships,
        research_details: doc.researchDetails ?? doc.research_details,
      };

      const textified = {};
      for (const f of JSON_FIELDS) {
        textified[f] = toText(map[f] !== undefined ? map[f] : doc[f]);
      }

      return {
        ...doc,
        ...map,
        ...textified,
        databaseId: doc.databaseId,
        id: doc.id || (doc.databaseId ? `DR${String(doc.databaseId).padStart(3, "0")}` : ""),
        name: doc.name || "Unknown Doctor",
        designation: doc.designation || doc.speciality || "",
        speciality: doc.speciality || "General",
        department: normaliseDepartment(doc.department),
        experience: doc.experience || "N/A",
        image: doc.image || "",
        status: doc.status === 0 || doc.status === "0" ? "Inactive" : "Active",
      };
    });
  }, [doctors]);

  const handleSave = async (mode, form) => {
    const payload = {};
    for (const f of [...TEXT_FIELDS, ...JSON_FIELDS]) {
      payload[f] = form[f] ?? "";
    }
    payload.status = form.status;
    if (mode !== "add") payload.databaseId = form.databaseId;

    const res = await fetch("/api/doctors", {
      method: mode === "add" ? "POST" : "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Save failed.");
  };

  const handleDelete = async (row) => {
    const res = await fetch("/api/doctors", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ databaseId: row.databaseId }),
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || "Delete failed.");
  };

  return (
    <div className="doctors-premium">
      <style>{PREMIUM_CSS}</style>
      <ResourcePage
        config={config}
        data={formattedDoctors}
        loading={loading}
        error={error}
        onRefresh={refetch}
        onSave={handleSave}
        onDelete={handleDelete}
        CustomModal={DoctorModal}
      />
    </div>
  );
}