"use client";

import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  FileText,
  Users,
  Layers,
  Plus,
  Search,
  MapPin,
  Pencil,
  Trash2,
  X,
  Eye,
  EyeOff,
  ArrowLeft,
  Sparkles,
  Inbox,
  Mail,
  Phone,
  RotateCw,
} from "lucide-react";
import {
  Card,
  IconTile,
  Avatar,
  Pagination,
  useToast,
  btnGhost,
  fmtDate,
  thCls,
  tdCls,
  rowIconBtn,
} from "@/components/admin/ui";
import { displayFont, numFont } from "@/components/admin/fonts";
import { ADMIN_BASE } from "@/lib/admin-data";

/* ─────────────────────────────────────────────────────
   API CONFIG
────────────────────────────────────────────────────── */
const API_KEY = "apollo54321";
const JOBS_API = "/api/career";
const APPLICATIONS_API = "/api/career-applications";
const API_HEADERS = { "x-api-key": API_KEY };

const PAGE_SIZE = 10;

const DEFAULT_DEPARTMENTS = [
  "Cardiology",
  "Nursing",
  "Radiology",
  "Pharmacy",
  "Administration",
  "Orthopaedics",
  "Neurology",
  "Others",
];
const JOB_TYPES = ["Full Time", "Part Time", "Contract", "Internship"];
const JOB_STATUSES = ["Open", "Closed"];
const APP_STATUSES = ["New", "Shortlisted", "Interview", "Hired", "Rejected"];

const JOB_BADGE = {
  Open: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Closed: "bg-slate-100 text-slate-600 ring-slate-500/20",
};
const APP_BADGE = {
  New: "bg-sky-50 text-sky-700 ring-sky-600/20",
  Shortlisted: "bg-teal-50 text-teal-700 ring-teal-600/20",
  Interview: "bg-violet-50 text-violet-700 ring-violet-600/20",
  Hired: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Rejected: "bg-rose-50 text-rose-700 ring-rose-600/20",
};
const STATUS_DOT = {
  Open: "bg-emerald-500",
  Closed: "bg-slate-400",
};

const EMPTY_FORM = {
  id: "", // job_code (empty = new job)
  slug: "",
  title: "",
  fullTitle: "",
  category: "",
  department: "",
  jobType: "Full Time",
  location: "Jabalpur",
  icon: "",
  overview: "",
  responsibilities: [],
  requirements: [],
  whyJoin: [],
  status: "Open",
};

const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition focus:border-[#0A5F7A] focus:outline-none focus:ring-4 focus:ring-[#0A5F7A]/15";

function Pill({ className = "", children }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${className}`}
    >
      {children}
    </span>
  );
}

/* ── Helpers ── */
const toTitle = (s) =>
  String(s ?? "")
    .trim()
    .replace(/^\w/, (c) => c.toUpperCase());

// supports: [..] | { data: [..] } | { jobs: [..] } | { careers: [..] } | { applications: [..] }
const extractList = (payload, keys = []) => {
  if (Array.isArray(payload)) return payload;
  for (const k of ["data", ...keys]) {
    if (Array.isArray(payload?.[k])) return payload[k];
  }
  return [];
};

const sameId = (a, b) =>
  a !== undefined && a !== null && b !== undefined && b !== null
    ? String(a) === String(b)
    : false;

const apiError = (err) =>
  err?.response?.data?.message || err?.message || "Something went wrong.";

const tryParse = (v) => {
  if (typeof v !== "string") return v;
  try {
    return JSON.parse(v);
  } catch {
    return v;
  }
};

/* ── API -> admin job shape ── */
const normalizeAdminJob = (j, i) => ({
  id: j.jobCode ?? j.id ?? j.slug ?? `api-${i}`,
  slug: j.slug ?? "",
  title: String(j.title ?? "Untitled Role"),
  fullTitle: j.fullTitle ?? j.full_title ?? "",
  category: j.category ?? "",
  department: String(j.dept ?? j.department ?? ""),
  jobType: j.type ?? j.jobType ?? "Full Time",
  location: j.location ?? "",
  icon: j.icon ?? "",
  overview: j.overview ?? "",
  responsibilities: j.responsibilities ?? [],
  requirements: j.requirements ?? [],
  whyJoin: j.whyJoin ?? j.why_join ?? [],
  status: Number(j.status) === 0 ? "Closed" : "Open",
});

/* ── API -> admin application shape ── */
const normalizeApplication = (a, i) => {
  const jobRef = a.jobId ?? a.job_id ?? a.careerId ?? a.career_id ?? a.job;
  const jobId =
    jobRef && typeof jobRef === "object"
      ? (jobRef.id ?? jobRef._id ?? null)
      : (jobRef ?? null);

  const fullName =
    a.name ??
    a.fullName ??
    a.full_name ??
    [a.firstName, a.lastName].filter(Boolean).join(" ");

  const rawStatus = toTitle(a.status ?? "New");
  const status =
    APP_STATUSES.find((s) => s.toLowerCase() === rawStatus.toLowerCase()) ||
    "New";

  const appliedRaw = a.applied ?? a.appliedAt ?? a.createdAt ?? a.created_at;

  return {
    id: a.id ?? a._id ?? `app-${i}`,
    jobId,
    jobTitle:
      a.jobTitle ??
      a.position ??
      (jobRef && typeof jobRef === "object" ? jobRef.title : "") ??
      "",
    name: String(fullName || "Unknown applicant"),
    email: String(a.email ?? ""),
    phone: String(a.phone ?? a.mobile ?? a.contact ?? ""),
    applied: appliedRaw ? String(appliedRaw).slice(0, 10) : "",
    status,
    resumePath: a.resumePath ?? a.resume_path ?? "",
    resumeOriginalName: a.resumeOriginalName ?? a.resume_original_name ?? "Resume",
  };
};

/* ── List editor (strings, or raw JSON if the stored shape is custom) ── */
const toListState = (v) => {
  const p = tryParse(v);
  if (p == null || p === "") return { items: [] };
  if (typeof p === "string") return { items: [p] };
  if (
    Array.isArray(p) &&
    p.every((x) => typeof x === "string" || typeof x === "number")
  )
    return { items: p.map(String) };
  return { raw: JSON.stringify(p, null, 2) };
};

const serList = (x, label) => {
  if (x.raw !== undefined) {
    if (!x.raw.trim()) return [];
    let p;
    try {
      p = JSON.parse(x.raw);
    } catch {
      throw new Error(`${label}: invalid JSON.`);
    }
    if (!Array.isArray(p)) throw new Error(`${label} must be a list [ ... ].`);
    return p;
  }
  return x.items.map((t) => t.trim()).filter(Boolean);
};

function ListEditor({ title, value, onChange, addLabel, placeholder }) {
  const head = (
    <div className="mb-2 flex items-center justify-between">
      <label className="text-xs font-bold text-slate-600">{title}</label>
      {value.raw === undefined && (
        <button
          type="button"
          onClick={() => onChange({ items: [...value.items, ""] })}
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#0A5F7A] px-3 py-1.5 text-[11px] font-bold text-white transition hover:bg-[#084a60]"
        >
          <Plus className="h-3.5 w-3.5" /> {addLabel}
        </button>
      )}
    </div>
  );

  if (value.raw !== undefined) {
    return (
      <div>
        {head}
        <p className="mb-2 text-[11px] text-slate-400">
          Stored in a custom format, so it is edited as JSON.
        </p>
        <textarea
          rows={6}
          className={`${inputCls} resize-y font-mono text-xs`}
          value={value.raw}
          onChange={(e) => onChange({ raw: e.target.value })}
        />
      </div>
    );
  }

  const items = value.items;
  return (
    <div>
      {head}
      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-slate-200 px-4 py-3 text-xs text-slate-400">
          Nothing added yet.
        </p>
      ) : (
        <ul className="space-y-2">
          {items.map((t, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rotate-45 bg-amber-500" />
              <textarea
                rows={2}
                className={`${inputCls} resize-y`}
                value={t}
                placeholder={placeholder}
                onChange={(e) =>
                  onChange({
                    items: items.map((x, idx) =>
                      idx === i ? e.target.value : x,
                    ),
                  })
                }
              />
              <button
                type="button"
                aria-label="Remove"
                onClick={() =>
                  onChange({ items: items.filter((_, x) => x !== i) })
                }
                className="mt-1 grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-xl text-rose-500 transition hover:bg-rose-50"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── Job form modal ───────────────────────────────── */
function JobModal({ initial, onClose, onSave, categories, departments }) {
  const [form, setForm] = useState(() => ({
    ...initial,
    responsibilities: toListState(initial.responsibilities),
    requirements: toListState(initial.requirements),
    whyJoin: toListState(initial.whyJoin),
  }));
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const setList = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));
  const editing = Boolean(initial.id);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && !saving && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, saving]);

  const submit = async () => {
    if (!form.title.trim()) return setError("Enter a job title.");

    let payload;
    try {
      payload = {
        id: form.id,
        slug: form.slug.trim(),
        title: form.title.trim(),
        fullTitle: form.fullTitle.trim(),
        category: form.category.trim(),
        department: form.department.trim(),
        jobType: form.jobType.trim(),
        location: form.location.trim(),
        icon: form.icon.trim(),
        overview: form.overview.trim(),
        responsibilities: serList(form.responsibilities, "Responsibilities"),
        requirements: serList(form.requirements, "Requirements"),
        whyJoin: serList(form.whyJoin, "Why join us"),
        status: form.status,
      };
    } catch (e) {
      return setError(e.message);
    }

    setSaving(true);
    setError("");
    try {
      await onSave(payload);
    } catch (e) {
      setError(e.message || "Could not save the job.");
      setSaving(false);
    }
  };

  const label = "mb-1.5 block text-xs font-bold text-slate-600";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(e) =>
        e.target === e.currentTarget && !saving && onClose()
      }
      role="dialog"
      aria-modal="true"
      aria-label={editing ? "Edit job" : "Add job"}
    >
      <div className="max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white/95 px-4 py-3.5 backdrop-blur sm:px-6 sm:py-4">
          <div>
            <h2
              className={`${displayFont.className} text-xl font-bold text-slate-900`}
            >
              {editing ? "Edit job opening" : "Add job opening"}
            </h2>
            <p className="text-xs text-slate-500">
              Open jobs show on the hospital careers page.
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={saving}
            aria-label="Close"
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5F7A]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-6">
          {editing && (
            <div>
              <label className={label}>Job code</label>
              <input className={`${inputCls} bg-slate-50`} value={form.id} disabled />
            </div>
          )}
          <div className={editing ? "" : "sm:col-span-2"}>
            <label className={label}>
              Slug <span className="font-normal text-slate-400">(auto if empty)</span>
            </label>
            <input
              className={inputCls}
              value={form.slug}
              onChange={set("slug")}
              placeholder="e.g. senior-cardiologist-apollo-jabalpur"
            />
          </div>

          <div>
            <label className={label}>Job title</label>
            <input
              className={inputCls}
              value={form.title}
              onChange={set("title")}
              placeholder="e.g. Senior Cardiologist"
              autoFocus
            />
          </div>
          <div>
            <label className={label}>Full title</label>
            <input
              className={inputCls}
              value={form.fullTitle}
              onChange={set("fullTitle")}
              placeholder="e.g. Senior Cardiologist - Apollo Hospitals Jabalpur"
            />
          </div>

          <div>
            <label className={label}>Category</label>
            <input
              list="job-categories"
              className={inputCls}
              value={form.category}
              onChange={set("category")}
              placeholder="e.g. Doctors"
            />
            <datalist id="job-categories">
              {categories.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
          <div>
            <label className={label}>Department</label>
            <input
              list="job-departments"
              className={inputCls}
              value={form.department}
              onChange={set("department")}
              placeholder="e.g. Cardiology"
            />
            <datalist id="job-departments">
              {departments.map((d) => (
                <option key={d} value={d} />
              ))}
            </datalist>
          </div>

          <div>
            <label className={label}>Job type</label>
            <input
              list="job-types"
              className={inputCls}
              value={form.jobType}
              onChange={set("jobType")}
            />
            <datalist id="job-types">
              {JOB_TYPES.map((t) => (
                <option key={t} value={t} />
              ))}
            </datalist>
          </div>
          <div>
            <label className={label}>Location</label>
            <input
              className={inputCls}
              value={form.location}
              onChange={set("location")}
            />
          </div>

          <div className="sm:col-span-2">
            <label className={label}>
              Icon <span className="font-normal text-slate-400">(use the same value as your existing jobs)</span>
            </label>
            <input
              className={inputCls}
              value={form.icon}
              onChange={set("icon")}
              placeholder="e.g. Stethoscope"
            />
          </div>

          <div className="sm:col-span-2">
            <label className={label}>Status</label>
            <div className="flex gap-2">
              {JOB_STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, status: s }))}
                  className={`cursor-pointer rounded-xl border px-4 py-2 text-xs font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5F7A] ${
                    form.status === s
                      ? "border-[#0A5F7A] bg-[#0A5F7A] text-white"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className={label}>Overview</label>
            <textarea
              rows={4}
              className={`${inputCls} resize-y`}
              value={form.overview}
              onChange={set("overview")}
              placeholder="What will this person do?"
            />
          </div>

          <div className="sm:col-span-2">
            <ListEditor
              title="Responsibilities"
              value={form.responsibilities}
              onChange={setList("responsibilities")}
              addLabel="Add responsibility"
            />
          </div>
          <div className="sm:col-span-2">
            <ListEditor
              title="Requirements"
              value={form.requirements}
              onChange={setList("requirements")}
              addLabel="Add requirement"
            />
          </div>
          <div className="sm:col-span-2">
            <ListEditor
              title="Why join us"
              value={form.whyJoin}
              onChange={setList("whyJoin")}
              addLabel="Add reason"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm font-medium text-rose-700 sm:col-span-2"
            >
              {error}
            </p>
          )}
        </div>

        <div className="sticky bottom-0 flex justify-end gap-3 border-t border-slate-100 bg-white/95 px-4 py-3.5 backdrop-blur sm:px-6 sm:py-4">
          <button onClick={onClose} disabled={saving} className={btnGhost}>
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={saving}
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] px-5 py-2.5 text-sm font-bold text-slate-950 shadow-md transition hover:-translate-y-0.5 hover:brightness-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/30 disabled:opacity-60"
          >
            {saving ? "Saving…" : editing ? "Save changes" : "Publish job"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Jobs: desktop table + mobile cards ───────────── */
const TYPE_BADGE = {
  fulltime: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-600/20",
  parttime: "bg-sky-50 text-sky-700 ring-sky-600/20",
  contract: "bg-amber-50 text-amber-700 ring-amber-600/20",
  internship: "bg-rose-50 text-rose-700 ring-rose-600/20",
};
const typeBadge = (t) =>
  TYPE_BADGE[String(t || "").toLowerCase().replace(/[^a-z]/g, "")] ||
  "bg-slate-100 text-slate-600 ring-slate-500/20";

function StatusPill({ status }) {
  return (
    <Pill className={JOB_BADGE[status]}>
      <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[status]}`} />
      {status}
    </Pill>
  );
}

function ApplicantCount({ count, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={count === 0}
      title={count ? "View applicants" : "No applicants yet"}
      className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-slate-50 px-2 py-0.5 text-[11px] font-bold text-slate-700 ring-1 ring-inset ring-slate-200 transition hover:bg-teal-50 hover:text-[#0A5F7A] disabled:cursor-default disabled:opacity-60 disabled:hover:bg-slate-50 disabled:hover:text-slate-700"
    >
      <Users className="h-3 w-3 text-[#0A5F7A]" />
      <span className={numFont.className}>{count}</span>
    </button>
  );
}

function JobActions({ job, onEdit, onDelete, onToggle }) {
  const isOpen = job.status === "Open";
  return (
    <div className="flex justify-end gap-1">
      <button
        onClick={() => onToggle(job)}
        aria-label={isOpen ? "Close job" : "Publish job"}
        title={isOpen ? "Close job" : "Publish job"}
        className={`${rowIconBtn} text-slate-500 hover:bg-teal-50 hover:text-[#0A5F7A]`}
      >
        {isOpen ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
      </button>
      <button
        onClick={() => onEdit(job)}
        aria-label="Edit job"
        title="Edit"
        className={`${rowIconBtn} text-[#0A5F7A] hover:bg-teal-50`}
      >
        <Pencil className="h-3.5 w-3.5" />
      </button>
      <button
        onClick={() => onDelete(job)}
        aria-label="Delete job"
        title="Delete"
        className={`${rowIconBtn} text-rose-600 hover:bg-rose-50`}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function JobsTable({ jobs, countFor, onEdit, onDelete, onToggle, onApplicants }) {
  return (
    <div className="hidden max-h-[calc(100dvh-17rem)] min-h-[320px] overflow-auto overscroll-contain lg:block">
      <table className="w-full min-w-[960px] border-separate border-spacing-0 text-left">
        <thead>
          <tr>
            <th className={`${thCls} sticky top-0 z-10`}>Job role</th>
            <th className={`${thCls} sticky top-0 z-10`}>Category</th>
            <th className={`${thCls} sticky top-0 z-10`}>Department</th>
            <th className={`${thCls} sticky top-0 z-10`}>Location</th>
            <th className={`${thCls} sticky top-0 z-10`}>Employment</th>
            <th className={`${thCls} sticky top-0 z-10 text-center`}>Applicants</th>
            <th className={`${thCls} sticky top-0 z-10`}>Status</th>
            <th className={`${thCls} sticky top-0 z-10 text-right`}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="group hover:bg-teal-50/40">
              <td className={`${tdCls} border-b border-slate-100`}>
                <div className="flex items-baseline gap-2">
                  <span
                    className={`${displayFont.className} max-w-[260px] truncate text-[15px] font-bold text-slate-900`}
                    title={job.title}
                  >
                    {job.title}
                  </span>
                  <span className="font-mono text-[11px] text-slate-400">
                    {job.id}
                  </span>
                </div>
              </td>
              <td className={`${tdCls} whitespace-nowrap border-b border-slate-100`}>
                {job.category || "—"}
              </td>
              <td className={`${tdCls} whitespace-nowrap border-b border-slate-100 text-slate-700`}>
                {job.department || "—"}
              </td>
              <td className={`${tdCls} whitespace-nowrap border-b border-slate-100`}>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-slate-400" />
                  {job.location || "—"}
                </span>
              </td>
              <td className={`${tdCls} whitespace-nowrap border-b border-slate-100`}>
                <Pill className={typeBadge(job.jobType)}>{job.jobType}</Pill>
              </td>
              <td className={`${tdCls} border-b border-slate-100 text-center`}>
                <ApplicantCount
                  count={countFor(job.id)}
                  onClick={() => onApplicants(job)}
                />
              </td>
              <td className={`${tdCls} whitespace-nowrap border-b border-slate-100`}>
                <StatusPill status={job.status} />
              </td>
              <td className={`${tdCls} border-b border-slate-100`}>
                <JobActions
                  job={job}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onToggle={onToggle}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function JobCards({ jobs, countFor, onEdit, onDelete, onToggle, onApplicants }) {
  return (
    <ul className="grid gap-3 bg-slate-50/60 p-3 sm:grid-cols-2 sm:p-4 lg:hidden">
      {jobs.map((job) => (
        <li
          key={job.id}
          className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p
                className={`${displayFont.className} truncate text-[15px] font-bold text-slate-900`}
              >
                {job.title}
              </p>
              <p className="font-mono text-[10px] text-slate-400">{job.id}</p>
            </div>
            <StatusPill status={job.status} />
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[12px] text-slate-600">
            {job.department && (
              <span className="rounded-md bg-slate-100 px-2 py-0.5 font-medium">
                {job.department}
              </span>
            )}
            {job.category && (
              <span className="rounded-md bg-slate-100 px-2 py-0.5 font-medium">
                {job.category}
              </span>
            )}
            <Pill className={typeBadge(job.jobType)}>{job.jobType}</Pill>
            {job.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3 w-3 text-slate-400" />
                {job.location}
              </span>
            )}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
            <ApplicantCount
              count={countFor(job.id)}
              onClick={() => onApplicants(job)}
            />
            <JobActions
              job={job}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggle={onToggle}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ── Page ─────────────────────────────────────────── */
export default function CareersPage() {
  // jobs
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  // applications
  const [applicants, setApplicants] = useState([]);
  const [appsLoading, setAppsLoading] = useState(true);
  const [appsError, setAppsError] = useState(false);

  const [tab, setTab] = useState("jobs");
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("All");
  const [status, setStatus] = useState("All");
  const [appFilter, setAppFilter] = useState("All");
  const [jobPage, setJobPage] = useState(1);
  const [appPage, setAppPage] = useState(1);
  const [modal, setModal] = useState(null); // null | job object
  const [confirm, setConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, toastNode] = useToast();

  const flash = (text, type = "success") => toast(text, type);

  /* ── API call for create / update / delete ── */
  const request = async (method, data) => {
    const res = await axios({
      url: JOBS_API,
      method,
      data,
      headers: API_HEADERS,
      withCredentials: true,
    });
    return res.data;
  };

  /* ── GET jobs (every status, admin only) ── */
  const loadJobs = async (signal, silent = false) => {
    try {
      if (!silent) setLoading(true);
      setLoadError(false);

      const res = await axios.get(JOBS_API, {
        headers: API_HEADERS,
        params: { status: "all" },
        withCredentials: true,
        signal,
      });

      const list = extractList(res.data, ["jobs", "careers"]);
      setJobs(list.map(normalizeAdminJob));
    } catch (err) {
      if (axios.isCancel(err) || err?.code === "ERR_CANCELED") return;
      setLoadError(true);
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  };

  /* ── GET applications ── */
  const loadApplications = async (signal) => {
    try {
      setAppsLoading(true);
      setAppsError(false);

      const res = await axios.get(APPLICATIONS_API, {
        headers: API_HEADERS,
        signal,
      });

      const list = extractList(res.data, [
        "applications",
        "applicants",
        "careerApplications",
      ]);
      setApplicants(list.map(normalizeApplication));
    } catch (err) {
      if (axios.isCancel(err) || err?.code === "ERR_CANCELED") return;
      setAppsError(true);
    } finally {
      if (!signal?.aborted) setAppsLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    loadJobs(controller.signal);
    loadApplications(controller.signal);
    return () => controller.abort();
  }, []);

  const refreshAll = () => {
    loadJobs();
    loadApplications();
  };

  const countFor = (id) => applicants.filter((a) => sameId(a.jobId, id)).length;

  const jobTitle = (a) =>
    jobs.find((j) => sameId(j.id, a.jobId))?.title ||
    a.jobTitle ||
    "Removed job";

  // suggestions for the modal + filter options built from real data
  const departmentOptions = useMemo(
    () =>
      [
        ...new Set([
          ...DEFAULT_DEPARTMENTS,
          ...jobs.map((j) => j.department).filter(Boolean),
        ]),
      ].sort(),
    [jobs],
  );
  const categoryOptions = useMemo(
    () => [...new Set(jobs.map((j) => j.category).filter(Boolean))].sort(),
    [jobs],
  );
  const filterDepartments = useMemo(
    () => [...new Set(jobs.map((j) => j.department).filter(Boolean))].sort(),
    [jobs],
  );

  const stats = useMemo(
    () => ({
      open: jobs.filter((j) => j.status === "Open").length,
      closed: jobs.filter((j) => j.status === "Closed").length,
      applicants: applicants.length,
      newApps: applicants.filter((a) => a.status === "New").length,
      depts: new Set(jobs.map((j) => j.department).filter(Boolean)).size,
    }),
    [jobs, applicants],
  );

  const filteredJobs = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return jobs.filter(
      (j) =>
        (dept === "All" || j.department === dept) &&
        (status === "All" || j.status === status) &&
        `${j.title} ${j.fullTitle} ${j.department} ${j.category} ${j.location}`
          .toLowerCase()
          .includes(needle),
    );
  }, [jobs, q, dept, status]);

  // newest applications first
  const filteredApps = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return applicants
      .filter(
        (a) =>
          (appFilter === "All" || a.status === appFilter) &&
          `${a.name} ${a.email} ${jobTitle(a)}`.toLowerCase().includes(needle),
      )
      .sort((a, b) => String(b.applied).localeCompare(String(a.applied)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicants, jobs, q, appFilter]);

  // reset to page 1 whenever the filters change
  useEffect(() => setJobPage(1), [q, dept, status, tab]);
  useEffect(() => setAppPage(1), [q, appFilter, tab]);

  // keep pages valid after deletes / refreshes
  const jobPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
  const appPages = Math.max(1, Math.ceil(filteredApps.length / PAGE_SIZE));
  useEffect(() => {
    if (jobPage > jobPages) setJobPage(jobPages);
  }, [jobPage, jobPages]);
  useEffect(() => {
    if (appPage > appPages) setAppPage(appPages);
  }, [appPage, appPages]);

  const pagedJobs = filteredJobs.slice((jobPage - 1) * PAGE_SIZE, jobPage * PAGE_SIZE);
  const pagedApps = filteredApps.slice((appPage - 1) * PAGE_SIZE, appPage * PAGE_SIZE);

  const hasJobFilters = q || dept !== "All" || status !== "All";
  const clearJobFilters = () => {
    setQ("");
    setDept("All");
    setStatus("All");
  };

  /* ── Delete dialog: Escape to close ── */
  useEffect(() => {
    if (!confirm) return;
    const onKey = (e) => e.key === "Escape" && !deleting && setConfirm(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [confirm, deleting]);

  /* ── create / update ── */
  const saveJob = async (data) => {
    if (data.id) {
      await request("PATCH", { ...data, jobCode: data.id });
    } else {
      await request("POST", data);
    }
    await loadJobs(undefined, true);
    setModal(null);
    flash(data.id ? "Job updated." : "Job published.");
  };

  /* ── open / close ── */
  const toggleJob = async (job) => {
    const next = job.status === "Open" ? "Closed" : "Open";
    try {
      await request("PATCH", { jobCode: job.id, status: next });
      setJobs((l) =>
        l.map((j) => (sameId(j.id, job.id) ? { ...j, status: next } : j)),
      );
      flash(next === "Open" ? "Job is now open." : "Job closed.");
    } catch (err) {
      flash(apiError(err), "error");
    }
  };

  /* ── delete ── */
  const removeJob = async () => {
    setDeleting(true);
    try {
      await request("DELETE", { jobCode: confirm.id });
      setJobs((l) => l.filter((j) => !sameId(j.id, confirm.id)));
      setApplicants((l) => l.filter((a) => !sameId(a.jobId, confirm.id)));
      setConfirm(null);
      flash("Job deleted.");
    } catch (err) {
      flash(apiError(err), "error");
    } finally {
      setDeleting(false);
    }
  };

  const setAppStatus = (id, s) =>
    setApplicants((l) =>
      l.map((a) => (sameId(a.id, id) ? { ...a, status: s } : a)),
    );

  // jump from a job row to that job's applications
  const showApplicants = (job) => {
    setTab("apps");
    setAppFilter("All");
    setQ(job.title);
  };

  const h2 = `${displayFont.className} text-xl font-bold text-slate-900`;

  // KPI cards double as shortcuts into the matching list
  const kpis = [
    {
      label: "Open positions",
      value: stats.open,
      icon: Briefcase,
      tone: "teal",
      onClick: () => {
        setTab("jobs");
        clearJobFilters();
        setStatus("Open");
      },
    },
    {
      label: "Total applicants",
      value: stats.applicants,
      sub: stats.newApps ? `${stats.newApps} new` : "",
      icon: Users,
      tone: "gold",
      onClick: () => {
        setTab("apps");
        setQ("");
        setAppFilter("All");
      },
    },
    {
      label: "Departments hiring",
      value: stats.depts,
      icon: Layers,
      tone: "violet",
      onClick: () => {
        setTab("jobs");
        clearJobFilters();
      },
    },
    {
      label: "Closed positions",
      value: stats.closed,
      icon: EyeOff,
      tone: "rose",
      onClick: () => {
        setTab("jobs");
        clearJobFilters();
        setStatus("Closed");
      },
    },
  ];

  const selectCls = `${inputCls} !h-9 !px-2.5 !py-0 text-xs`;

  return (
    <div className="space-y-4">
      {toastNode}

      {/* HERO */}
      <section className="relative overflow-hidden rounded-2xl border border-[#0A5F7A]/20 bg-gradient-to-br from-[#062E3C] via-[#0A4D62] to-[#0A5F7A] p-4 text-white shadow-lg sm:p-5">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-400/10 blur-3xl" />

        <div className="relative flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={ADMIN_BASE}
              className="mb-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-100 transition hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to dashboard
            </Link>

            <h1
              className={`${displayFont.className} text-2xl font-bold leading-tight tracking-tight sm:text-3xl`}
            >
              Careers &amp; hiring
            </h1>

            <p className="mt-1 max-w-xl text-xs leading-relaxed text-teal-50/90 sm:text-sm">
              <strong className="font-bold text-amber-300">
                {stats.open} open positions
              </strong>{" "}
              and{" "}
              <strong className="font-bold text-amber-300">
                {stats.newApps} new applications
              </strong>{" "}
              waiting for review.
            </p>
          </div>

          <button
            onClick={() => setModal(EMPTY_FORM)}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] px-4 py-2.5 text-xs font-bold text-slate-950 shadow-md transition hover:-translate-y-0.5 hover:brightness-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/40 sm:w-auto"
          >
            <Plus className="h-4 w-4" />
            Add job opening
          </button>
        </div>
      </section>

      {/* KPIs (click to filter) */}
      <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
        {kpis.map((k) => (
          <button
            key={k.label}
            type="button"
            onClick={k.onClick}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left shadow-sm transition hover:border-[#0A5F7A]/40 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5F7A]"
          >
            <IconTile icon={k.icon} tone={k.tone} size="sm" />
            <div className="min-w-0">
              <p
                className={`${numFont.className} flex items-baseline gap-1.5 text-xl font-bold leading-none text-slate-900`}
              >
                {k.value}
                {k.sub && (
                  <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">
                    {k.sub}
                  </span>
                )}
              </p>
              <p className="mt-1 truncate text-[11px] font-semibold text-slate-500">
                {k.label}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* TOOLBAR */}
      <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-2 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div
          className="flex w-full shrink-0 rounded-lg bg-slate-100 p-1 lg:w-auto"
          role="tablist"
        >
          {[
            { id: "jobs", label: "Job openings", count: jobs.length },
            { id: "apps", label: "Applications", count: applicants.length },
          ].map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => {
                setTab(t.id);
                setQ("");
              }}
              className={`flex flex-1 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-[11px] font-bold transition lg:flex-none ${
                tab === t.id
                  ? "bg-white text-[#0A5F7A] shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {t.label}
              <span
                className={`rounded px-1.5 py-0.5 text-[10px] ${
                  tab === t.id
                    ? "bg-[#0A5F7A]/10 text-[#0A5F7A]"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
          <div className="relative col-span-2 min-w-0 sm:col-span-1 sm:w-56">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={tab === "jobs" ? "Search jobs…" : "Search applicants…"}
              aria-label="Search"
              className={`${inputCls} !h-9 !py-0 pl-8 pr-2 text-xs`}
            />
          </div>

          {tab === "jobs" ? (
            <>
              <select
                aria-label="Filter by department"
                value={dept}
                onChange={(e) => setDept(e.target.value)}
                className={`${selectCls} min-w-0 sm:w-40`}
              >
                <option value="All">All departments</option>
                {filterDepartments.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>

              <select
                aria-label="Filter by status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={`${selectCls} min-w-0 sm:w-32`}
              >
                <option value="All">All status</option>
                {JOB_STATUSES.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </>
          ) : (
            <select
              aria-label="Filter by status"
              value={appFilter}
              onChange={(e) => setAppFilter(e.target.value)}
              className={`${selectCls} col-span-2 min-w-0 sm:col-span-1 sm:w-40`}
            >
              <option value="All">All status</option>
              {APP_STATUSES.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          )}

          {((tab === "jobs" && hasJobFilters) ||
            (tab === "apps" && (q || appFilter !== "All"))) && (
            <button
              type="button"
              onClick={() => {
                if (tab === "jobs") clearJobFilters();
                else {
                  setQ("");
                  setAppFilter("All");
                }
              }}
              className="inline-flex cursor-pointer items-center gap-1 px-1 text-xs font-bold text-slate-500 hover:text-slate-800"
            >
              <X className="h-3.5 w-3.5" /> Clear
            </button>
          )}

          <button
            type="button"
            onClick={refreshAll}
            title="Refresh"
            aria-label="Refresh"
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5F7A]"
          >
            <RotateCw
              className={`h-4 w-4 ${loading || appsLoading ? "animate-spin text-[#0A5F7A]" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* JOBS */}
      {tab === "jobs" &&
        (loading ? (
          <Card className="grid place-items-center px-4 py-10 text-center">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#0A5F7A]/30 border-t-[#0A5F7A]" />
            <p className="mt-3 text-sm font-semibold text-slate-900">
              Loading job openings…
            </p>
          </Card>
        ) : loadError ? (
          <Card className="grid place-items-center px-4 py-10 text-center">
            <IconTile icon={Briefcase} tone="rose" size="sm" />
            <h2 className={`${h2} mt-3`}>Could not load jobs</h2>
            <p className="mt-1 max-w-sm text-xs text-slate-500">
              Check your connection and make sure you are signed in as admin.
            </p>
            <button onClick={() => loadJobs()} className={`${btnGhost} mt-3`}>
              Try again
            </button>
          </Card>
        ) : filteredJobs.length ? (
          <Card className="overflow-hidden p-0">
            <JobsTable
              jobs={pagedJobs}
              countFor={countFor}
              onEdit={setModal}
              onDelete={setConfirm}
              onToggle={toggleJob}
              onApplicants={showApplicants}
            />
            <JobCards
              jobs={pagedJobs}
              countFor={countFor}
              onEdit={setModal}
              onDelete={setConfirm}
              onToggle={toggleJob}
              onApplicants={showApplicants}
            />
            <Pagination
              page={jobPage}
              pageSize={PAGE_SIZE}
              total={filteredJobs.length}
              onChange={setJobPage}
              noun="jobs"
            />
          </Card>
        ) : (
          <Card className="grid place-items-center px-4 py-10 text-center">
            <IconTile icon={Briefcase} tone="teal" size="sm" />
            <h2 className={`${h2} mt-3`}>
              {hasJobFilters ? "No jobs match your filters" : "No jobs yet"}
            </h2>
            <p className="mt-1 max-w-sm text-xs text-slate-500">
              {hasJobFilters
                ? "Change your search or filters to see more."
                : "Add a new opening to start hiring."}
            </p>
            <div className="mt-3 flex gap-2">
              {hasJobFilters && (
                <button onClick={clearJobFilters} className={btnGhost}>
                  Clear filters
                </button>
              )}
              <button onClick={() => setModal(EMPTY_FORM)} className={btnGhost}>
                <Plus className="h-4 w-4" />
                Add job opening
              </button>
            </div>
          </Card>
        ))}

      {/* APPLICATIONS */}
      {tab === "apps" && (
        <Card className="overflow-hidden">
          <div className="border-b border-slate-100 px-4 py-3">
            <h2 className={h2}>Applications</h2>
            <p className="text-[11px] text-slate-500">
              Newest first. Change a candidate’s status from the dropdown on each row.
            </p>
          </div>

          {appsLoading ? (
            <div className="grid place-items-center px-4 py-10 text-center">
              <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#0A5F7A]/30 border-t-[#0A5F7A]" />
              <p className="mt-3 text-sm font-semibold text-slate-900">
                Loading applications…
              </p>
            </div>
          ) : appsError ? (
            <div className="grid place-items-center px-4 py-10 text-center">
              <IconTile icon={Inbox} tone="rose" size="sm" />
              <h2 className={`${h2} mt-3`}>Could not load applications</h2>
              <p className="mt-1 max-w-sm text-xs text-slate-500">
                Check your connection and try again.
              </p>
              <button
                onClick={() => loadApplications()}
                className={`${btnGhost} mt-3`}
              >
                Try again
              </button>
            </div>
          ) : filteredApps.length ? (
            <>
              <ul className="divide-y divide-slate-100">
                {pagedApps.map((a) => (
                  <li
                    key={a.id}
                    className="flex flex-col gap-2 px-4 py-2.5 transition hover:bg-slate-50/80 sm:flex-row sm:items-center sm:justify-between sm:gap-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar name={a.name} size={32} />

                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-semibold leading-tight text-slate-900">
                          {a.name}
                        </p>

                        <p className="truncate text-[11px] text-slate-500">
                          <span className="font-semibold text-[#0A5F7A]">
                            {jobTitle(a)}
                          </span>
                          {a.applied && <> · {fmtDate(a.applied)}</>}
                        </p>

                        <div className="flex flex-wrap gap-x-3 text-[11px] text-slate-500">
                          {a.email && (
                            <a
                              href={`mailto:${a.email}`}
                              className="inline-flex items-center gap-1 hover:text-[#0A5F7A]"
                            >
                              <Mail className="h-3 w-3" />
                              {a.email}
                            </a>
                          )}
                          {a.phone && (
                            <a
                              href={`tel:${a.phone.replace(/\s/g, "")}`}
                              className="inline-flex items-center gap-1 hover:text-[#0A5F7A]"
                            >
                              <Phone className="h-3 w-3" />
                              {a.phone}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 pl-11 sm:pl-0">
                      {a.resumePath && (
                        <a
                          href={a.resumePath}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-[#0A5F7A] transition hover:bg-[#EDF7FA]"
                          title={a.resumeOriginalName || "View resume"}
                        >
                          <FileText className="h-3.5 w-3.5" />
                          Resume
                        </a>
                      )}

                      {/* one control: the select is coloured by status */}
                      <select
                        aria-label={`Change status for ${a.name}`}
                        value={a.status}
                        onChange={(e) => setAppStatus(a.id, e.target.value)}
                        className={`cursor-pointer rounded-full px-2.5 py-1 text-[11px] font-semibold ring-1 ring-inset focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5F7A] ${APP_BADGE[a.status]}`}
                      >
                        {APP_STATUSES.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                  </li>
                ))}
              </ul>

              <Pagination
                page={appPage}
                pageSize={PAGE_SIZE}
                total={filteredApps.length}
                onChange={setAppPage}
                noun="applications"
              />
            </>
          ) : (
            <div className="grid place-items-center px-4 py-10 text-center">
              <IconTile icon={Inbox} tone="gold" size="sm" />
              <p className="mt-3 text-sm font-semibold text-slate-900">
                No applications match
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Try a different status or search term.
              </p>
            </div>
          )}
        </Card>
      )}

      {/* MODALS */}
      {modal && (
        <JobModal
          initial={modal}
          categories={categoryOptions}
          departments={departmentOptions}
          onClose={() => setModal(null)}
          onSave={saveJob}
        />
      )}

      {confirm && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-slate-950/50 p-4 backdrop-blur-sm"
          onMouseDown={(e) =>
            e.target === e.currentTarget && !deleting && setConfirm(null)
          }
          role="alertdialog"
          aria-modal="true"
        >
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl">
            <IconTile icon={Trash2} tone="rose" size="sm" />

            <h2 className={`${h2} mt-3`}>Delete this job?</h2>

            <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
              “{confirm.title}” and its {countFor(confirm.id)} applications will
              be removed. This can’t be undone.
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setConfirm(null)}
                disabled={deleting}
                className={btnGhost}
              >
                Keep job
              </button>

              <button
                onClick={removeJob}
                disabled={deleting}
                className="cursor-pointer rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-md transition hover:bg-rose-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-500/30 disabled:opacity-60"
              >
                {deleting ? "Deleting…" : "Delete job"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}