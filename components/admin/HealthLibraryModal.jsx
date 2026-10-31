"use client";

import React, { useEffect, useState } from "react";
import { X, Plus, Trash2, ImageIcon, Upload } from "lucide-react";
import FileUpload from "./FileUpload";

/* ───────── helpers ───────── */

const TYPES = ["Articles", "Blogs", "News", "Videos", "Guides"]; // adjust to your types

const parse = (v) => {
  if (v === null || v === undefined || v === "") return null;
  if (typeof v !== "string") return v;
  try {
    return JSON.parse(v);
  } catch {
    return v;
  }
};

const toArray = (v) => {
  const p = parse(v);
  if (Array.isArray(p)) return p.map(String).filter(Boolean);
  if (typeof p === "string" && p.trim())
    return p
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  return [];
};

const toDocs = (v) => {
  const p = parse(v);
  const arr = Array.isArray(p) ? p : [];
  return arr
    .map((x) =>
      typeof x === "string"
        ? { title: x, url: x }
        : { title: x?.title || x?.name || "", url: x?.url || x?.link || "" },
    )
    .filter((x) => x.title || x.url);
};

// content -> textarea text (paragraphs separated by a blank line)
const contentToText = (v) => {
  const p = parse(v);
  if (p == null) return "";
  if (typeof p === "string") return p;
  if (Array.isArray(p) && p.every((x) => typeof x === "string"))
    return p.join("\n\n");
  return JSON.stringify(p, null, 2); // keep complex structures as raw JSON
};

// textarea text -> content value
const textToContent = (t) => {
  const s = t.trim();
  if (!s) return [];
  if (s.startsWith("[") || s.startsWith("{")) {
    try {
      return JSON.parse(s);
    } catch {
      /* fall through */
    }
  }
  return s
    .split(/\n\s*\n/)
    .map((x) => x.trim())
    .filter(Boolean);
};

const buildState = (d = {}, categories = []) => ({
  dbId: d.dbId ?? d.id,
  title: d.title ?? "",
  slug: d.slug ?? "",
  type: d.type || "Articles",
  category: d.category ?? "", 
  categories: toArray(d.categories),
  siteCategories: toArray(d.siteCategories),
  tags: toArray(d.tags),
  excerpt: d.excerpt ?? "",
  metaDescription: d.metaDescription ?? "",
  author: d.author ?? "",
  authorRole: d.authorRole ?? "",
  date: d.date
    ? String(d.date).slice(0, 10)
    : new Date().toISOString().slice(0, 10),
  readTime: d.readTime ?? "",
  image: d.image ?? "",
  sourceUrl: d.sourceUrl ?? "",
  partial: Boolean(Number(d.partial ?? 0)),
  newsTicker: Boolean(Number(d.newsTicker ?? 0)),
  documents: toDocs(d.documents),
  content: contentToText(d.content),
});

const serialize = (s) => ({
  ...s,
  documents: s.documents.filter((x) => x.title.trim() || x.url.trim()),
  content: textToContent(s.content),
  partial: s.partial ? 1 : 0,
  newsTicker: s.newsTicker ? 1 : 0,
});

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
        {hint && (
          <span className="text-[10.5px] font-normal text-[#9FB1B9]">
            {hint}
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

function Toggle({ label, hint, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between rounded-xl border border-[#DCE8ED] bg-white px-3.5 py-2.5 text-left transition hover:bg-[#F4F9FB]"
    >
      <span>
        <span className="block text-[12px] font-semibold text-[#2B4A58]">
          {label}
        </span>
        {hint && (
          <span className="block text-[10.5px] text-[#9FB1B9]">{hint}</span>
        )}
      </span>
      <span
        className={`flex h-5 w-9 items-center rounded-full p-0.5 transition ${checked ? "bg-[#0E526B]" : "bg-[#C9D9DF]"}`}
      >
        <span
          className={`h-4 w-4 rounded-full bg-white shadow transition ${checked ? "translate-x-4" : ""}`}
        />
      </span>
    </button>
  );
}

// chips input: Enter or comma adds, backspace removes last
function TagInput({ value, onChange, placeholder }) {
  const [draft, setDraft] = useState("");

  const add = () => {
    const v = draft.trim().replace(/,$/, "");
    if (v && !value.includes(v)) onChange([...value, v]);
    setDraft("");
  };

  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-xl border border-[#DCE8ED] bg-white px-2.5 py-2 transition focus-within:border-[#0E526B] focus-within:ring-4 focus-within:ring-[#0E526B]/10">
      {value.map((t) => (
        <span
          key={t}
          className="inline-flex items-center gap-1 rounded-lg bg-[#EDF7FA] px-2 py-1 text-[11.5px] font-semibold text-[#0E526B]"
        >
          {t}
          <button
            type="button"
            onClick={() => onChange(value.filter((x) => x !== t))}
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
          } else if (e.key === "Backspace" && !draft && value.length)
            onChange(value.slice(0, -1));
        }}
        onBlur={add}
        placeholder={value.length ? "" : placeholder}
        className="min-w-[120px] flex-1 bg-transparent px-1 py-0.5 text-[13px] text-[#06202B] outline-none placeholder:text-[#9FB1B9]"
      />
    </div>
  );
}

/* ───────── the modal ───────── */

export default function HealthLibraryModal({
  open,
  mode = "add",
  initial,
  departments = [], // category options (same prop name your ResourcePage already passes)
  types = TYPES,
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
  const set = (k) => (v) => setF((p) => ({ ...p, [k]: v }));

  const setDoc = (i, k, v) =>
    setF((p) => ({
      ...p,
      documents: p.documents.map((d, idx) =>
        idx === i ? { ...d, [k]: v } : d,
      ),
    }));

  const submit = async () => {
    if (!f.title.trim()) return setError("Article title is required.");
    if (!f.category.trim()) return setError("Category is required.");
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
      <div
        className="absolute inset-0 bg-[#06202B]/55 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_40px_100px_-20px_rgba(6,32,43,.55)]">
        <div className="h-1.5 w-full shrink-0 bg-gradient-to-r from-[#0E526B] via-[#3C93AE] to-[#E1B54A]" />

        {/* header */}
        <div className="flex shrink-0 items-start justify-between px-7 pb-3 pt-6">
          <div>
            <h2 className="font-serif text-[28px] leading-none text-[#06202B]">
              {mode === "add" ? "Add Article" : "Edit Article"}
            </h2>
            <p className="mt-2 text-[12px] text-[#71858E]">
              Fill in the details to{" "}
              {mode === "add"
                ? "publish a new article in"
                : "update the article in"}{" "}
              the Health Library.
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
                  folder="health-library"
                  label="Article Image"
                  placeholder="https://... or upload image"
                  aspectRatio="aspect-[4/5]"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Title" className="sm:col-span-2">
                  <input
                    {...text("title")}
                    placeholder="e.g. Understanding Heart Health"
                    className={inputCls}
                  />
                </Field>
                <Field
                  label="Slug"
                  hint="auto if empty"
                  className="sm:col-span-2"
                >
                  <input
                    {...text("slug")}
                    placeholder="e.g. understanding-heart-health"
                    className={inputCls}
                  />
                </Field>
                <Field label="Type">
                  <select {...text("type")} className={inputCls}>
                    {types.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Primary Category" hint="pick or type new">
                  <input
                    list="hl-categories"
                    {...text("category")}
                    placeholder="Select or type a category"
                    className={inputCls}
                  />
                  <datalist id="hl-categories">
                    {departments.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </Field>
                <Field label="Publish Date">
                  <input type="date" {...text("date")} className={inputCls} />
                </Field>
                <Field label="Read Time" hint="e.g. 5 min read">
                  <input
                    {...text("readTime")}
                    placeholder="5 min read"
                    className={inputCls}
                  />
                </Field>
              </div>
            </div>
          </Section>

          {/* 2 */}
          <Section n="2" title="Author">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Author">
                <input
                  {...text("author")}
                  placeholder="e.g. Dr. A. Sharma"
                  className={inputCls}
                />
              </Field>
              <Field label="Author Role">
                <input
                  {...text("authorRole")}
                  placeholder="e.g. Senior Cardiologist"
                  className={inputCls}
                />
              </Field>
            </div>
          </Section>

          {/* 3 */}
          <Section
            n="3"
            title="Categorisation & Tags"
            subtitle="Type a value and press Enter or comma."
          >
            <Field label="Categories">
              <TagInput
                value={f.categories}
                onChange={set("categories")}
                placeholder="Add category…"
              />
            </Field>
            <Field label="Site Categories">
              <TagInput
                value={f.siteCategories}
                onChange={set("siteCategories")}
                placeholder="Add site category…"
              />
            </Field>
            <Field label="Tags">
              <TagInput
                value={f.tags}
                onChange={set("tags")}
                placeholder="Add tag…"
              />
            </Field>
          </Section>

          {/* 4 */}
          <Section n="4" title="Summary & SEO">
            <Field label="Excerpt" hint="shown on cards">
              <textarea
                rows={3}
                {...text("excerpt")}
                placeholder="Short summary of the article…"
                className={`${inputCls} resize-y`}
              />
            </Field>
            <Field
              label="Meta Description"
              hint={`${f.metaDescription.length}/160`}
            >
              <textarea
                rows={2}
                {...text("metaDescription")}
                placeholder="SEO description for search engines…"
                className={`${inputCls} resize-y`}
              />
            </Field>
            <Field label="Source URL">
              <input
                {...text("sourceUrl")}
                placeholder="https://original-source.com/article"
                className={inputCls}
              />
            </Field>
          </Section>

          {/* 5 */}
          <Section
            n="5"
            title="Content"
            subtitle="Separate paragraphs with a blank line."
          >
            <textarea
              rows={10}
              {...text("content")}
              placeholder="Write the article content here…"
              className={`${inputCls} resize-y font-mono text-[12.5px] leading-relaxed`}
            />
          </Section>

          {/* 6 */}
          <Section
            n="6"
            title="Documents"
            subtitle="Downloadable files or reference links."
          >
            <div className="flex items-center justify-between">
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#0E526B]">
                Attached Documents
              </h4>
              <button
                type="button"
                onClick={() =>
                  setF((p) => ({
                    ...p,
                    documents: [...p.documents, { title: "", url: "" }],
                  }))
                }
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#0E526B] px-3 py-1.5 text-[11px] font-bold text-white shadow-sm transition hover:bg-[#0B4258]"
              >
                <Plus className="h-3.5 w-3.5" /> Add Document
              </button>
            </div>

            {f.documents.length === 0 ? (
              <p className="rounded-xl border border-dashed border-[#DCE8ED] px-4 py-3 text-[12px] text-[#9FB1B9]">
                No documents added yet.
              </p>
            ) : (
              <ul className="space-y-2.5">
                {f.documents.map((d, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 rounded-xl border border-[#E3EEF2] bg-white p-3"
                  >
                    <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EDF7FA] text-[11px] font-bold text-[#0E526B]">
                      {i + 1}
                    </span>
                    <div className="grid flex-1 gap-2 sm:grid-cols-2">
                      <input
                        value={d.title}
                        onChange={(e) => setDoc(i, "title", e.target.value)}
                        placeholder="Document title"
                        className={inputCls}
                      />
                      <input
                        value={d.url}
                        onChange={(e) => setDoc(i, "url", e.target.value)}
                        placeholder="https://… or /files/…pdf"
                        className={inputCls}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setF((p) => ({
                          ...p,
                          documents: p.documents.filter((_, x) => x !== i),
                        }))
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

          {/* 7 */}
          <Section n="7" title="Display Options">
            <div className="grid gap-3 sm:grid-cols-2">
              <Toggle
                label="Partial article"
                hint="Show only a preview with a link to the source"
                checked={f.partial}
                onChange={set("partial")}
              />
              <Toggle
                label="News ticker"
                hint="Show this article in the news ticker"
                checked={f.newsTicker}
                onChange={set("newsTicker")}
              />
            </div>
          </Section>
        </div>

        {/* footer */}
        <div className="flex shrink-0 items-center justify-between gap-4 border-t border-[#E3EEF2] bg-white px-7 py-4">
          <p className="min-h-[18px] text-[12px] font-semibold text-[#D94C5B]">
            {error}
          </p>
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
              {saving
                ? "Saving…"
                : mode === "add"
                  ? "Add Record"
                  : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
