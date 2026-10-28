"use client";

import React, { useEffect, useState } from "react";
import { X, Plus, Pencil, Trash2, Check, ImageIcon } from "lucide-react";

/* ───────── data helpers (same format the API already accepts) ───────── */

const TEXT_FIELDS = [
  "name", "designation", "speciality", "department", "image", "summary",
  "experience", "tagline", "professional_approach", "research_details",
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const parse = (v) => {
  if (v === null || v === undefined || v === "") return null;
  if (typeof v !== "string") return v;
  try { return JSON.parse(v); }
  catch { return v.split("\n").map((s) => s.trim()).filter(Boolean); }
};

const toArr = (v) => {
  const p = parse(v);
  return Array.isArray(p) ? p : p ? [p] : [];
};

const toStrings = (v) =>
  toArr(v)
    .map((x) =>
      typeof x === "string" ? x : x?.text || x?.name || x?.title || x?.label || x?.value || ""
    )
    .filter(Boolean);

const toObjects = (v, keys) =>
  toArr(v).map((x) =>
    typeof x === "object" && x
      ? Object.fromEntries(keys.map((k) => [k, x[k] ?? ""]))
      : { ...Object.fromEntries(keys.map((k) => [k, ""])), [keys[0]]: String(x) }
  );

const parseOpd = (v) => {
  const p = parse(v);
  if (Array.isArray(p)) {
    return {
      days: p.map((x) => x?.day).filter(Boolean),
      timing: p.find((x) => x?.time)?.time || "",
    };
  }
  if (p && typeof p === "object") {
    return { days: Array.isArray(p.days) ? p.days : [], timing: p.timing || "" };
  }
  return { days: [], timing: "" };
};

const ser = (arr) => (arr.length ? JSON.stringify(arr) : "");

const SCHEMA = {
  qualifications: ["degree", "institute", "year"],
  highlights: ["value", "label"],
  experience_details: ["title", "organization", "period", "description"],
  podcasts: ["title", "url"],
  faqs: ["question", "answer"],
};

const buildState = (d = {}) => ({
  ...Object.fromEntries(TEXT_FIELDS.map((f) => [f, d[f] ?? ""])),
  status: d.status || "Active",
  databaseId: d.databaseId,
  // string lists
  about: toStrings(d.about),
  training: toStrings(d.training),
  research: toStrings(d.research),
  publications: toStrings(d.publications),
  why_choose: toStrings(d.why_choose),
  // tags
  languages: toStrings(d.languages),
  expertise: toStrings(d.expertise),
  expertise_categories: toStrings(d.expertise_categories),
  conditions: toStrings(d.conditions),
  clinical_procedures: toStrings(d.clinical_procedures),
  diagnostic_services: toStrings(d.diagnostic_services),
  clinical_interests: toStrings(d.clinical_interests),
  specialized_interventions: toStrings(d.specialized_interventions),
  areas_of_special_interest: toStrings(d.areas_of_special_interest),
  certifications: toStrings(d.certifications),
  professional_memberships: toStrings(d.professional_memberships),
  // object lists
  qualifications: toObjects(d.qualifications, SCHEMA.qualifications),
  highlights: toObjects(d.highlights, SCHEMA.highlights),
  experience_details: toObjects(d.experience_details, SCHEMA.experience_details),
  podcasts: toObjects(d.podcasts, SCHEMA.podcasts),
  faqs: toObjects(d.faqs, SCHEMA.faqs),
  opd: parseOpd(d.opd),
});

const serialize = (s) => {
  const out = { ...s };
  for (const k of Object.keys(s)) {
    if (Array.isArray(s[k])) {
      const clean = s[k].filter((x) =>
        typeof x === "string" ? x.trim() : Object.values(x).some((v) => String(v).trim())
      );
      out[k] = ser(clean);
    }
  }
  out.opd = s.opd.days.length || s.opd.timing ? JSON.stringify(s.opd) : "";
  return out;
};

/* ───────── styles ───────── */

const inputCls =
  "w-full rounded-xl border border-[#DCE8ED] bg-white px-3.5 py-2.5 text-[13px] text-[#06202B] placeholder:text-[#9FB1B9] outline-none transition focus:border-[#0E526B] focus:ring-4 focus:ring-[#0E526B]/10";

/* ───────── small building blocks ───────── */

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

function Field({ label, children, className = "" }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-[12px] font-semibold text-[#2B4A58]">{label}</span>
      {children}
    </label>
  );
}

function SubHead({ title, onAdd, addLabel }) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#0E526B]">{title}</h4>
      {onAdd && (
        <button
          type="button"
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#0E526B] px-3 py-1.5 text-[11px] font-bold text-white shadow-sm transition hover:bg-[#0B4258]"
        >
          <Plus className="h-3.5 w-3.5" /> {addLabel}
        </button>
      )}
    </div>
  );
}

function TagInput({ title, items, onChange, placeholder = "Type and press Enter" }) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const v = draft.trim();
    if (v && !items.includes(v)) onChange([...items, v]);
    setDraft("");
  };

  return (
    <div>
      <SubHead title={title} />
      <div className="flex min-h-[46px] flex-wrap items-center gap-2 rounded-xl border border-[#DCE8ED] bg-white p-2 transition focus-within:border-[#0E526B] focus-within:ring-4 focus-within:ring-[#0E526B]/10">
        {items.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#0E526B]/15 bg-[#EDF7FA] py-1 pl-3 pr-1.5 text-[11.5px] font-semibold text-[#0E526B]"
          >
            {t}
            <button
              type="button"
              onClick={() => onChange(items.filter((_, x) => x !== i))}
              className="flex h-4 w-4 items-center justify-center rounded-full hover:bg-[#0E526B]/15"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              add();
            } else if (e.key === "Backspace" && !draft && items.length) {
              onChange(items.slice(0, -1));
            }
          }}
          onBlur={add}
          placeholder={items.length ? "" : placeholder}
          className="min-w-[140px] flex-1 bg-transparent px-1.5 py-1 text-[13px] outline-none placeholder:text-[#9FB1B9]"
        />
      </div>
    </div>
  );
}

function StringList({ title, items, onChange, addLabel, placeholder, rows = 2 }) {
  const update = (i, v) => onChange(items.map((x, idx) => (idx === i ? v : x)));
  return (
    <div>
      <SubHead title={title} onAdd={() => onChange([...items, ""])} addLabel={addLabel} />
      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-[#DCE8ED] px-4 py-3 text-[12px] text-[#9FB1B9]">
          Nothing added yet.
        </p>
      ) : (
        <ul className="space-y-2">
          {items.map((t, i) => (
            <li key={i} className="group flex items-start gap-2">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#C8952E]" />
              <textarea
                rows={rows}
                value={t}
                placeholder={placeholder}
                onChange={(e) => update(i, e.target.value)}
                className={`${inputCls} resize-y`}
              />
              <button
                type="button"
                onClick={() => onChange(items.filter((_, x) => x !== i))}
                className="mt-1.5 rounded-lg p-2 text-[#D94C5B] transition hover:bg-[#FFF1F3]"
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

function ObjectList({ title, items, onChange, schema, labels, addLabel, primary, secondary, longKey }) {
  const [editing, setEditing] = useState(null);
  const empty = Object.fromEntries(schema.map((k) => [k, ""]));

  const update = (i, k, v) =>
    onChange(items.map((x, idx) => (idx === i ? { ...x, [k]: v } : x)));

  return (
    <div>
      <SubHead
        title={title}
        addLabel={addLabel}
        onAdd={() => {
          onChange([...items, { ...empty }]);
          setEditing(items.length);
        }}
      />
      {items.length === 0 ? (
        <p className="rounded-xl border border-dashed border-[#DCE8ED] px-4 py-3 text-[12px] text-[#9FB1B9]">
          Nothing added yet.
        </p>
      ) : (
        <ul className="divide-y divide-[#EDF2F4] overflow-hidden rounded-xl border border-[#E3EEF2] bg-white">
          {items.map((it, i) => (
            <li key={i} className="px-3.5 py-3">
              {editing === i ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {schema.map((k) => (
                    <Field
                      key={k}
                      label={labels[k]}
                      className={k === longKey ? "sm:col-span-2" : ""}
                    >
                      {k === longKey ? (
                        <textarea
                          rows={3}
                          value={it[k]}
                          onChange={(e) => update(i, k, e.target.value)}
                          className={`${inputCls} resize-y`}
                        />
                      ) : (
                        <input
                          value={it[k]}
                          onChange={(e) => update(i, k, e.target.value)}
                          className={inputCls}
                        />
                      )}
                    </Field>
                  ))}
                  <div className="flex justify-end sm:col-span-2">
                    <button
                      type="button"
                      onClick={() => setEditing(null)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#168B73] px-3 py-1.5 text-[11px] font-bold text-white"
                    >
                      <Check className="h-3.5 w-3.5" /> Done
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EDF7FA] text-[11px] font-bold text-[#0E526B]">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-semibold text-[#06202B]">
                      {it[primary] || <span className="text-[#9FB1B9]">Untitled</span>}
                    </p>
                    {secondary && it[secondary] && (
                      <p className="truncate text-[11.5px] text-[#71858E]">{it[secondary]}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditing(i)}
                    className="rounded-lg p-2 text-[#0E526B] transition hover:bg-[#EDF7FA]"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(items.filter((_, x) => x !== i));
                      setEditing(null);
                    }}
                    className="rounded-lg p-2 text-[#D94C5B] transition hover:bg-[#FFF1F3]"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ───────── the modal ───────── */

export default function DoctorModal({
  open,
  mode = "add",
  initial,
  departments = [],
  onClose,
  onSubmit, // (form) => Promise  → call your existing handleSave(mode, form) here
}) {
  const [f, setF] = useState(() => buildState(initial));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [imgOk, setImgOk] = useState(true);

  useEffect(() => {
    if (open) {
      setF(buildState(initial));
      setError("");
      setImgOk(true);
    }
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

  const set = (k) => (v) => setF((p) => ({ ...p, [k]: v }));
  const text = (k) => ({
    value: f[k],
    onChange: (e) => setF((p) => ({ ...p, [k]: e.target.value })),
  });

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

  const toggleDay = (d) =>
    setF((p) => ({
      ...p,
      opd: {
        ...p.opd,
        days: p.opd.days.includes(d) ? p.opd.days.filter((x) => x !== d) : [...p.opd.days, d],
      },
    }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <div className="absolute inset-0 bg-[#06202B]/55 backdrop-blur-sm" onClick={onClose} />

      <div className="relative flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_40px_100px_-20px_rgba(6,32,43,.55)]">
        <div className="h-1.5 w-full shrink-0 bg-gradient-to-r from-[#0E526B] via-[#3C93AE] to-[#E1B54A]" />

        {/* header */}
        <div className="flex shrink-0 items-start justify-between px-7 pb-3 pt-6">
          <div>
            <h2 className="font-serif text-[28px] leading-none text-[#06202B]">
              {mode === "add" ? "Add Doctor" : "Edit Doctor"}
            </h2>
            <p className="mt-2 text-[12px] text-[#71858E]">
              Fill in the details to {mode === "add" ? "add a new doctor to" : "update the doctor in"} the system.
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
                <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[#BFD6DF] bg-[#F4FAFC]">
                  {f.image && imgOk ? (
                    <img
                      src={f.image}
                      alt=""
                      onError={() => setImgOk(false)}
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <div className="text-center text-[#71858E]">
                      <ImageIcon className="mx-auto h-7 w-7 text-[#0E526B]" />
                      <p className="mt-2 text-[11px] font-semibold">Photo preview</p>
                    </div>
                  )}
                </div>
                <Field label="Photo URL" className="mt-3">
                  <input {...text("image")} onInput={() => setImgOk(true)} placeholder="https://…" className={inputCls} />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name"><input {...text("name")} placeholder="Dr. Full Name" className={inputCls} /></Field>
                <Field label="Designation"><input {...text("designation")} placeholder="e.g. Senior Consultant" className={inputCls} /></Field>
                <Field label="Speciality"><input {...text("speciality")} placeholder="e.g. Consultant Neurosurgery" className={inputCls} /></Field>
                <Field label="Department">
                  <select {...text("department")} className={inputCls}>
                    <option value="">Select</option>
                    {departments.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </Field>
                <Field label="Experience"><input {...text("experience")} placeholder="e.g. 15+ Years" className={inputCls} /></Field>
                <Field label="Status">
                  <select {...text("status")} className={inputCls}>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </Field>
                <Field label="Tagline" className="sm:col-span-2">
                  <input {...text("tagline")} placeholder="Short tagline" className={inputCls} />
                </Field>
              </div>
            </div>
          </Section>

          {/* 2 */}
          <Section n="2" title="Professional Profile">
            <Field label="Summary">
              <textarea rows={3} {...text("summary")} placeholder="Short professional summary…" className={`${inputCls} resize-y`} />
            </Field>
            <StringList title="About" items={f.about} onChange={set("about")} addLabel="Add Paragraph" placeholder="Detailed about the doctor…" rows={3} />
            <TagInput title="Languages" items={f.languages} onChange={set("languages")} placeholder="e.g. English, press Enter" />
            <ObjectList
              title="Highlights" items={f.highlights} onChange={set("highlights")}
              schema={SCHEMA.highlights} labels={{ value: "Value (e.g. 15+)", label: "Label (e.g. Years Experience)" }}
              addLabel="Add Highlight" primary="value" secondary="label"
            />
          </Section>

          {/* 3 */}
          <Section n="3" title="Qualifications & Expertise">
            <ObjectList
              title="Qualifications" items={f.qualifications} onChange={set("qualifications")}
              schema={SCHEMA.qualifications} labels={{ degree: "Degree", institute: "Institute", year: "Year" }}
              addLabel="Add Qualification" primary="degree" secondary="institute"
            />
            <TagInput title="Expertise" items={f.expertise} onChange={set("expertise")} />
            <TagInput title="Expertise Categories" items={f.expertise_categories} onChange={set("expertise_categories")} />
          </Section>

          {/* 4 */}
          <Section n="4" title="Experience, Training & Research">
            <ObjectList
              title="Experience Details" items={f.experience_details} onChange={set("experience_details")}
              schema={SCHEMA.experience_details}
              labels={{ title: "Role", organization: "Organization", period: "Period", description: "Description" }}
              addLabel="Add Experience" primary="title" secondary="organization" longKey="description"
            />
            <StringList title="Training" items={f.training} onChange={set("training")} addLabel="Add Training" />
            <StringList title="Research" items={f.research} onChange={set("research")} addLabel="Add Research" />
            <Field label="Research Details">
              <textarea rows={3} {...text("research_details")} placeholder="Plain text" className={`${inputCls} resize-y`} />
            </Field>
            <StringList title="Publications" items={f.publications} onChange={set("publications")} addLabel="Add Publication" />
          </Section>

          {/* 5 */}
          <Section n="5" title="Clinical Focus">
            <div className="grid gap-5 md:grid-cols-2">
              <TagInput title="Conditions" items={f.conditions} onChange={set("conditions")} />
              <TagInput title="Clinical Procedures" items={f.clinical_procedures} onChange={set("clinical_procedures")} />
              <TagInput title="Diagnostic Services" items={f.diagnostic_services} onChange={set("diagnostic_services")} />
              <TagInput title="Clinical Interests" items={f.clinical_interests} onChange={set("clinical_interests")} />
              <TagInput title="Specialized Interventions" items={f.specialized_interventions} onChange={set("specialized_interventions")} />
              <TagInput title="Areas of Special Interest" items={f.areas_of_special_interest} onChange={set("areas_of_special_interest")} />
            </div>
            <StringList title="Why Choose" items={f.why_choose} onChange={set("why_choose")} addLabel="Add Reason" />
            <Field label="Professional Approach">
              <textarea rows={3} {...text("professional_approach")} placeholder="Patient-centric, evidence-based…" className={`${inputCls} resize-y`} />
            </Field>
          </Section>

          {/* 6 */}
          <Section n="6" title="Credentials, Media & FAQs">
            <TagInput title="Certifications" items={f.certifications} onChange={set("certifications")} />
            <TagInput title="Professional Memberships" items={f.professional_memberships} onChange={set("professional_memberships")} />
            <ObjectList
              title="Podcasts" items={f.podcasts} onChange={set("podcasts")}
              schema={SCHEMA.podcasts} labels={{ title: "Podcast Title", url: "URL" }}
              addLabel="Add Podcast" primary="title" secondary="url"
            />
            <ObjectList
              title="FAQs" items={f.faqs} onChange={set("faqs")}
              schema={SCHEMA.faqs} labels={{ question: "Question", answer: "Answer" }}
              addLabel="Add FAQ" primary="question" longKey="answer"
            />
          </Section>

          {/* 7 */}
          <Section n="7" title="OPD Days & Timings">
            <div className="flex flex-wrap gap-2">
              {DAYS.map((d) => {
                const on = f.opd.days.includes(d);
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleDay(d)}
                    className={`h-10 w-14 rounded-xl text-[12px] font-bold transition ${
                      on
                        ? "bg-[#0E526B] text-white shadow-[0_8px_18px_-8px_rgba(14,82,107,.6)]"
                        : "border border-[#DCE8ED] bg-white text-[#71858E] hover:border-[#0E526B]/40"
                    }`}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
            <Field label="Timing">
              <input
                value={f.opd.timing}
                onChange={(e) => setF((p) => ({ ...p, opd: { ...p.opd, timing: e.target.value } }))}
                placeholder="e.g. 9:00 AM - 5:00 PM"
                className={inputCls}
              />
            </Field>
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