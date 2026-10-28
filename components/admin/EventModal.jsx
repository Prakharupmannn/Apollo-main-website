"use client";

import React, { useEffect, useState } from "react";
import { X, Plus, Trash2, ImageIcon } from "lucide-react";

/* ───────── helpers ───────── */

const today = () => new Date().toISOString().slice(0, 10);

const parseAny = (v) => {
  if (v === null || v === undefined || v === "") return null;
  if (typeof v !== "string") return v;
  try { return JSON.parse(v); } catch { return v; }
};

const isFlatObj = (p) =>
  p && typeof p === "object" && !Array.isArray(p) &&
  Object.values(p).every((x) => x === null || typeof x !== "object");

// doctor / organizer: key-value pairs, plain text, or raw JSON
const toObjField = (v) => {
  const p = parseAny(v);
  if (p == null) return { mode: "pairs", pairs: [] };
  if (typeof p === "string") return { mode: "text", text: p };
  if (isFlatObj(p))
    return {
      mode: "pairs",
      pairs: Object.entries(p).map(([k, val]) => ({ k, v: String(val ?? "") })),
    };
  return { mode: "raw", raw: JSON.stringify(p, null, 2) };
};

const serObjField = (x) => {
  if (x.mode === "text") return x.text;
  if (x.mode === "raw") return x.raw;
  return Object.fromEntries(
    x.pairs.filter((p) => p.k.trim()).map((p) => [p.k.trim(), p.v])
  );
};

// highlights / whatToExpect: list of strings, or raw JSON
const toListField = (v) => {
  const p = parseAny(v);
  if (p == null) return { mode: "items", items: [] };
  if (typeof p === "string") return { mode: "items", items: [p] };
  if (Array.isArray(p) && p.every((x) => typeof x === "string" || typeof x === "number"))
    return { mode: "items", items: p.map(String) };
  return { mode: "raw", raw: JSON.stringify(p, null, 2) };
};

const serListField = (x) =>
  x.mode === "raw" ? x.raw : x.items.map((t) => t.trim()).filter(Boolean);

// faqs: list of {question, answer}, or raw JSON
const toFaqField = (v) => {
  const p = parseAny(v);
  if (p == null) return { mode: "items", items: [] };
  if (Array.isArray(p) && p.every((x) => x && typeof x === "object" && "question" in x))
    return {
      mode: "items",
      items: p.map((x) => ({
        question: String(x.question ?? ""),
        answer: String(x.answer ?? ""),
      })),
    };
  return { mode: "raw", raw: JSON.stringify(p, null, 2) };
};

const serFaqField = (x) =>
  x.mode === "raw"
    ? x.raw
    : x.items
        .filter((f) => f.question.trim() || f.answer.trim())
        .map((f) => ({ question: f.question.trim(), answer: f.answer.trim() }));

const buildState = (d = {}) => ({
  dbId: d.dbId,
  title: d.title ?? "",
  slug: d.slug ?? "",
  subtitle: d.subtitle ?? "",
  category: d.category ?? "",
  status: d.status || "Published",
  date: d.date ? String(d.date).slice(0, 10) : today(),
  time: d.time ?? "",
  cost: d.cost ?? "",
  image: d.image ?? "",
  location: d.location ?? "",
  description: d.description ?? "",
  doctor: toObjField(d.doctor),
  organizer: toObjField(d.organizer),
  highlights: toListField(d.highlights),
  whatToExpect: toListField(d.whatToExpect),
  faqs: toFaqField(d.faqs),
});

const serialize = (s) => ({
  ...s,
  doctor: serObjField(s.doctor),
  organizer: serObjField(s.organizer),
  highlights: serListField(s.highlights),
  whatToExpect: serListField(s.whatToExpect),
  faqs: serFaqField(s.faqs),
});

const inputCls =
  "w-full rounded-xl border border-[#DCE8ED] bg-white px-3.5 py-2.5 text-[13px] text-[#06202B] placeholder:text-[#9FB1B9] outline-none transition focus:border-[#0E526B] focus:ring-4 focus:ring-[#0E526B]/10";
const addBtn =
  "inline-flex items-center gap-1.5 rounded-lg bg-[#0E526B] px-3 py-1.5 text-[11px] font-bold text-white shadow-sm transition hover:bg-[#0B4258]";
const emptyCls =
  "rounded-xl border border-dashed border-[#DCE8ED] px-4 py-3 text-[12px] text-[#9FB1B9]";
const delBtn = "rounded-lg p-2 text-[#D94C5B] transition hover:bg-[#FFF1F3]";

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

function SubHead({ title, onAdd, addLabel }) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#0E526B]">{title}</h4>
      {onAdd && (
        <button type="button" onClick={onAdd} className={addBtn}>
          <Plus className="h-3.5 w-3.5" /> {addLabel}
        </button>
      )}
    </div>
  );
}

function RawBox({ title, value, onChange }) {
  return (
    <div>
      <SubHead title={title} />
      <p className="mb-2 text-[11px] text-[#9FB1B9]">
        Stored in a custom format, so it is edited as JSON.
      </p>
      <textarea
        rows={6}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputCls} resize-y font-mono text-[12px]`}
      />
    </div>
  );
}

function ListEditor({ title, value, onChange, addLabel, rows = 2, placeholder }) {
  if (value.mode === "raw")
    return <RawBox title={title} value={value.raw} onChange={(raw) => onChange({ mode: "raw", raw })} />;

  const items = value.items;
  const setItems = (next) => onChange({ mode: "items", items: next });

  return (
    <div>
      <SubHead title={title} onAdd={() => setItems([...items, ""])} addLabel={addLabel} />
      {items.length === 0 ? (
        <p className={emptyCls}>Nothing added yet.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((t, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#C8952E]" />
              <textarea
                rows={rows}
                value={t}
                placeholder={placeholder}
                onChange={(e) => setItems(items.map((x, idx) => (idx === i ? e.target.value : x)))}
                className={`${inputCls} resize-y`}
              />
              <button type="button" onClick={() => setItems(items.filter((_, x) => x !== i))} className={`mt-1.5 ${delBtn}`}>
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ObjEditor({ title, value, onChange, keyPh, valPh }) {
  if (value.mode === "raw")
    return <RawBox title={title} value={value.raw} onChange={(raw) => onChange({ mode: "raw", raw })} />;

  if (value.mode === "text")
    return (
      <div>
        <SubHead title={title} />
        <input
          value={value.text}
          onChange={(e) => onChange({ mode: "text", text: e.target.value })}
          className={inputCls}
        />
      </div>
    );

  const pairs = value.pairs;
  const setPairs = (next) => onChange({ mode: "pairs", pairs: next });

  return (
    <div>
      <SubHead title={title} onAdd={() => setPairs([...pairs, { k: "", v: "" }])} addLabel="Add Detail" />
      {pairs.length === 0 ? (
        <p className={emptyCls}>Nothing added yet.</p>
      ) : (
        <ul className="space-y-2.5">
          {pairs.map((p, i) => (
            <li key={i} className="flex items-start gap-2.5 rounded-xl border border-[#E3EEF2] bg-white p-3">
              <div className="grid flex-1 gap-2 sm:grid-cols-[180px_1fr]">
                <input
                  value={p.k}
                  placeholder={keyPh}
                  onChange={(e) => setPairs(pairs.map((x, idx) => (idx === i ? { ...x, k: e.target.value } : x)))}
                  className={inputCls}
                />
                <input
                  value={p.v}
                  placeholder={valPh}
                  onChange={(e) => setPairs(pairs.map((x, idx) => (idx === i ? { ...x, v: e.target.value } : x)))}
                  className={inputCls}
                />
              </div>
              <button type="button" onClick={() => setPairs(pairs.filter((_, x) => x !== i))} className={delBtn}>
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FaqEditor({ value, onChange }) {
  if (value.mode === "raw")
    return <RawBox title="FAQs" value={value.raw} onChange={(raw) => onChange({ mode: "raw", raw })} />;

  const items = value.items;
  const setItems = (next) => onChange({ mode: "items", items: next });
  const upd = (i, k, v) => setItems(items.map((x, idx) => (idx === i ? { ...x, [k]: v } : x)));

  return (
    <div>
      <SubHead title="FAQs" onAdd={() => setItems([...items, { question: "", answer: "" }])} addLabel="Add FAQ" />
      {items.length === 0 ? (
        <p className={emptyCls}>No FAQs added yet.</p>
      ) : (
        <ul className="space-y-2.5">
          {items.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 rounded-xl border border-[#E3EEF2] bg-white p-3">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EDF7FA] text-[11px] font-bold text-[#0E526B]">
                {i + 1}
              </span>
              <div className="flex-1 space-y-2">
                <input value={f.question} placeholder="Question" onChange={(e) => upd(i, "question", e.target.value)} className={inputCls} />
                <textarea rows={2} value={f.answer} placeholder="Answer" onChange={(e) => upd(i, "answer", e.target.value)} className={`${inputCls} resize-y`} />
              </div>
              <button type="button" onClick={() => setItems(items.filter((_, x) => x !== i))} className={delBtn}>
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ───────── the modal ───────── */

export default function EventModal({
  open,
  mode = "add",
  initial,
  categories = [],
  onClose,
  onSubmit,
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

  const text = (k) => ({
    value: f[k] ?? "",
    onChange: (e) => setF((p) => ({ ...p, [k]: e.target.value })),
  });
  const set = (k) => (v) => setF((p) => ({ ...p, [k]: v }));

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

      <div className="relative flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_40px_100px_-20px_rgba(6,32,43,.55)]">
        <div className="h-1.5 w-full shrink-0 bg-gradient-to-r from-[#0E526B] via-[#3C93AE] to-[#E1B54A]" />

        <div className="flex shrink-0 items-start justify-between px-7 pb-3 pt-6">
          <div>
            <h2 className="font-serif text-[28px] leading-none text-[#06202B]">
              {mode === "add" ? "Add Event" : "Edit Event"}
            </h2>
            <p className="mt-2 text-[12px] text-[#71858E]">
              Fill in the details to {mode === "add" ? "add a new event to" : "update the event in"} the system.
            </p>
          </div>
          <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full text-[#71858E] transition hover:bg-[#F1F6F8] hover:text-[#06202B]">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto bg-[#F4F9FB] px-7 py-5 [scrollbar-color:#C9D9DF_transparent] [scrollbar-width:thin]">
          <Section n="1" title="Basic Information">
            <div className="grid gap-5 md:grid-cols-[170px_1fr]">
              <div>
                <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[#BFD6DF] bg-[#F4FAFC]">
                  {f.image && imgOk ? (
                    <img src={f.image} alt="" onError={() => setImgOk(false)} className="h-full w-full object-cover" />
                  ) : (
                    <div className="text-center text-[#71858E]">
                      <ImageIcon className="mx-auto h-7 w-7 text-[#0E526B]" />
                      <p className="mt-2 text-[11px] font-semibold">Image preview</p>
                    </div>
                  )}
                </div>
                <Field label="Image URL" className="mt-3">
                  <input {...text("image")} onInput={() => setImgOk(true)} placeholder="https://… or /images/…" className={inputCls} />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Event Title" className="sm:col-span-2">
                  <input {...text("title")} placeholder="e.g. Free Heart Health Camp" className={inputCls} />
                </Field>
                <Field label="Subtitle" className="sm:col-span-2">
                  <input {...text("subtitle")} placeholder="Short line under the title" className={inputCls} />
                </Field>
                <Field label="Slug" hint="auto if empty">
                  <input {...text("slug")} placeholder="e.g. free-heart-health-camp" className={inputCls} />
                </Field>
                <Field label="Category">
                  <input list="ev-cats" {...text("category")} placeholder="e.g. Health Camp" className={inputCls} />
                  <datalist id="ev-cats">
                    {categories.map((c) => <option key={c} value={c} />)}
                  </datalist>
                </Field>
                <Field label="Event Date">
                  <input type="date" {...text("date")} className={inputCls} />
                </Field>
                <Field label="Event Time">
                  <input {...text("time")} placeholder="e.g. 10:00 AM - 2:00 PM" className={inputCls} />
                </Field>
                <Field label="Cost">
                  <input {...text("cost")} placeholder="e.g. Free" className={inputCls} />
                </Field>
                <Field label="Status">
                  <select {...text("status")} className={inputCls}>
                    <option>Published</option>
                    <option>Draft</option>
                  </select>
                </Field>
                <Field label="Location" className="sm:col-span-2">
                  <input {...text("location")} placeholder="e.g. Apollo JBP Hospitals, Jabalpur" className={inputCls} />
                </Field>
              </div>
            </div>
          </Section>

          <Section n="2" title="Description">
            <Field label="Description">
              <textarea rows={5} {...text("description")} placeholder="Describe the event…" className={`${inputCls} resize-y`} />
            </Field>
          </Section>

          <Section n="3" title="Doctor & Organizer" subtitle="Saved as label / value pairs.">
            <ObjEditor title="Doctor" value={f.doctor} onChange={set("doctor")} keyPh="Label (e.g. name)" valPh="Value (e.g. Dr. A. Sharma)" />
            <ObjEditor title="Organizer" value={f.organizer} onChange={set("organizer")} keyPh="Label (e.g. name)" valPh="Value (e.g. Apollo JBP Hospitals)" />
          </Section>

          <Section n="4" title="Highlights & What To Expect">
            <ListEditor title="Highlights" value={f.highlights} onChange={set("highlights")} addLabel="Add Highlight" />
            <ListEditor title="What To Expect" value={f.whatToExpect} onChange={set("whatToExpect")} addLabel="Add Item" />
          </Section>

          <Section n="5" title="FAQs">
            <FaqEditor value={f.faqs} onChange={set("faqs")} />
          </Section>
        </div>

        <div className="flex shrink-0 items-center justify-between gap-4 border-t border-[#E3EEF2] bg-white px-7 py-4">
          <p className="min-h-[18px] text-[12px] font-semibold text-[#D94C5B]">{error}</p>
          <div className="flex gap-3">
            <button type="button" onClick={onClose} className="rounded-xl border border-[#DCE8ED] bg-white px-5 py-2.5 text-[13px] font-bold text-[#2B4A58] transition hover:bg-[#F4F9FB]">
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