"use client";

import React, { useEffect, useState } from "react";
import { X, Plus, Trash2, ImageIcon } from "lucide-react";
import FileUpload from "./FileUpload";

/* ───────── helpers ───────── */

const ICONS = ["stethoscope", "heart", "shield-check", "users-round"];

const parse = (v) => {
  if (v === null || v === undefined || v === "") return null;
  if (typeof v !== "string") return v;
  try { return JSON.parse(v); }
  catch { return v.split("\n").map((s) => s.trim()).filter(Boolean); }
};

const parseServices = (v) => {
  const p = parse(v);
  const arr = Array.isArray(p) ? p : p ? [p] : [];
  return arr
    .map((x) =>
      typeof x === "string"
        ? { title: x, description: "" }
        : {
            title: x?.title || x?.name || x?.label || "",
            description: x?.description || x?.text || "",
          }
    )
    .filter((x) => x.title || x.description);
};

// Saves plain strings when no description is used, objects otherwise.
const serializeServices = (list) => {
  const clean = list.filter((s) => s.title.trim());
  if (!clean.length) return "[]";
  const hasDesc = clean.some((s) => s.description.trim());
  return JSON.stringify(
    hasDesc
      ? clean.map((s) => ({ title: s.title.trim(), description: s.description.trim() }))
      : clean.map((s) => s.title.trim())
  );
};

const buildState = (d = {}, categories = []) => ({
  dbId: d.dbId,
  name: d.name ?? "",
  slug: d.slug ?? "",
  category: d.category || categories[0] || "",
  icon: d.icon || "stethoscope",
  tagline: d.tagline ?? "",
  badge: d.badge ?? "",
  stat: d.stat ?? "",
  stat_label: d.statLabel ?? d.stat_label ?? "",
  image: d.image ?? "",
  intro: d.intro ?? "",
  status: d.status || "Active",
  services: parseServices(d.services),
});

const serialize = (s) => ({ ...s, services: serializeServices(s.services) });

const inputCls =
  "w-full rounded-xl border border-[#DCE8ED] bg-white px-3.5 py-2.5 text-[13px] text-[#06202B] placeholder:text-[#9FB1B9] outline-none transition focus:border-[#0E526B] focus:ring-4 focus:ring-[#0E526B]/10";

/* ───────── building blocks ───────── */

function Section({ n, title, subtitle, children }) {
  return (
    <section className="rounded-2xl border border-[#E3EEF2] bg-gradient-to-b from-white to-[#F8FBFD] p-5 shadow-[0_10px_30px_-18px_rgba(14,82,107,.25)]">
      <header className="mb-4 flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#0E526B] to-[#1B7A99] text-[12px] font-bold text-white shadow-[0_6px_14px_-4px_rgba(14,82,107,.5)]">
          {n}
        </span>
        <div>
          <h3 className="text-sm font-bold text-[#06202B]">{title}</h3>
          {subtitle && <p className="text-[11px] text-[#71858E]">{subtitle}</p>}
        </div>
      </header>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, hint, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 flex items-baseline justify-between text-[12px] font-semibold text-[#2B4A58]">
        {label}
        {hint && <span className="text-[10.5px] font-normal text-[#9FB1B9]">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

/* ───────── the modal ───────── */

export default function SpecialtyModal({
  open,
  mode = "add",
  initial,
  departments = [], // categories (passed by ResourcePage from tabs.options)
  onClose,
  onSubmit,
}) {
  const [f, setF] = useState(() => buildState(initial, departments));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imgOk, setImgOk] = useState(true);

  useEffect(() => {
    if (open) {
      setF(buildState(initial, departments));
      setError("");
      setImgOk(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initial]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const text = (k) => ({
    value: f[k],
    onChange: (e) => setF((p) => ({ ...p, [k]: e.target.value })),
  });

  const setService = (i, k, v) =>
    setF((p) => ({
      ...p,
      services: p.services.map((s, idx) => (idx === i ? { ...s, [k]: v } : s)),
    }));

  const submit = async () => {
    setSaving(true);
    setError("");
    try {
      await onSubmit(serialize(f));
      onClose?.();
    } catch (e) {
      setError(e.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <div className="absolute inset-0 bg-[#06202B]/55 backdrop-blur-sm" onClick={onClose} />

      <div className="relative flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_40px_100px_-20px_rgba(6,32,43,.55)]">
        <div className="h-1.5 w-full shrink-0 bg-gradient-to-r from-[#0E526B] via-[#3C93AE] to-[#E1B54A]" />

        {/* header */}
        <div className="flex shrink-0 items-start justify-between px-7 pb-3 pt-6">
          <div>
            <h2 className="font-serif text-[28px] leading-none text-[#06202B]">
              {mode === "add" ? "Add Specialty" : "Edit Specialty"}
            </h2>
            <p className="mt-2 text-[12px] text-[#71858E]">
              Fill in the details to {mode === "add" ? "add a new specialty to" : "update the specialty in"} the system.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#71858E] transition hover:bg-[#F1F6F8] hover:text-[#06202B]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* body */}
        <div className="flex-1 space-y-5 overflow-y-auto bg-[#F4F9FB] px-7 py-5 [scrollbar-color:#C9D9DF_transparent] [scrollbar-width:thin]">
          {/* 1 */}
          <Section n="1" title="Basic Information">
            <div className="grid gap-5 md:grid-cols-[170px_1fr]">
              <div>
                <FileUpload
                  value={f.image}
                  onChange={(url) => {
                    setF((p) => ({ ...p, image: url }));
                    setImgOk(true);
                  }}
                  folder="specialties"
                  label="Specialty Image"
                  placeholder="https://... or upload image"
                  aspectRatio="aspect-[4/5]"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Specialty Name" className="sm:col-span-2">
                  <input {...text("name")} placeholder="e.g. Cardiology" className={inputCls} />
                </Field>
                <Field label="Slug" hint="auto if empty">
                  <input {...text("slug")} placeholder="e.g. cardiology" className={inputCls} />
                </Field>
                <Field label="Category">
                  <select {...text("category")} className={inputCls}>
                    {departments.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Icon">
                  <select {...text("icon")} className={inputCls}>
                    {ICONS.map((i) => <option key={i}>{i}</option>)}
                  </select>
                </Field>
                <Field label="Status">
                  <select {...text("status")} className={inputCls}>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </Field>
                <Field label="Tagline" className="sm:col-span-2">
                  <input
                    {...text("tagline")}
                    placeholder="e.g. Advanced Cardiac Surgery & TAVI"
                    className={inputCls}
                  />
                </Field>
              </div>
            </div>
          </Section>

          {/* 2 */}
          <Section n="2" title="Highlights" subtitle="Shown on specialty cards and headers.">
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Badge">
                <input {...text("badge")} placeholder="e.g. Centre of Excellence" className={inputCls} />
              </Field>
              <Field label="Key Stat">
                <input {...text("stat")} placeholder="e.g. 15,000+" className={inputCls} />
              </Field>
              <Field label="Stat Label">
                <input {...text("stat_label")} placeholder="e.g. Surgeries" className={inputCls} />
              </Field>
            </div>
          </Section>

          {/* 3 */}
          <Section n="3" title="Department Intro">
            <Field label="Intro">
              <textarea
                rows={5}
                {...text("intro")}
                placeholder="Write a short introduction about this department…"
                className={`${inputCls} resize-y`}
              />
            </Field>
          </Section>

          {/* 4 */}
          <Section n="4" title="Services" subtitle="Description is optional.">
            <div className="flex items-center justify-between">
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#0E526B]">
                Services Offered
              </h4>
              <button
                type="button"
                onClick={() =>
                  setF((p) => ({ ...p, services: [...p.services, { title: "", description: "" }] }))
                }
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#0E526B] px-3 py-1.5 text-[11px] font-bold text-white shadow-sm transition hover:bg-[#0B4258]"
              >
                <Plus className="h-3.5 w-3.5" /> Add Service
              </button>
            </div>

            {f.services.length === 0 ? (
              <p className="rounded-xl border border-dashed border-[#DCE8ED] px-4 py-3 text-[12px] text-[#9FB1B9]">
                No services added yet.
              </p>
            ) : (
              <ul className="space-y-2.5">
                {f.services.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 rounded-xl border border-[#E3EEF2] bg-white p-3"
                  >
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EDF7FA] text-[11px] font-bold text-[#0E526B]">
                      {i + 1}
                    </span>
                    <div className="grid flex-1 gap-2 sm:grid-cols-2">
                      <input
                        value={s.title}
                        onChange={(e) => setService(i, "title", e.target.value)}
                        placeholder="Service name"
                        className={inputCls}
                      />
                      <input
                        value={s.description}
                        onChange={(e) => setService(i, "description", e.target.value)}
                        placeholder="Description (optional)"
                        className={inputCls}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setF((p) => ({ ...p, services: p.services.filter((_, x) => x !== i) }))
                      }
                      className="mt-1 rounded-lg p-2 text-[#D94C5B] transition hover:bg-[#FFF1F3]"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </Section>
        </div>

        {/* footer */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-t border-[#E3EEF2] bg-white px-7 py-4">
          <p className="min-h-[18px] text-[12px] font-semibold text-[#D94C5B]">{error}</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#DCE8ED] bg-white px-5 py-2.5 text-[13px] font-bold text-[#2B4A58] transition hover:bg-[#F4F9FB]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={submit}
              disabled={saving}
              className="rounded-xl bg-gradient-to-r from-[#0E526B] to-[#137A9A] px-6 py-2.5 text-[13px] font-bold text-white shadow-[0_12px_26px_-10px_rgba(14,82,107,.6)] transition hover:-translate-y-0.5 disabled:opacity-60"
            >
              {saving ? "Saving…" : mode === "add" ? "Add Record" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}