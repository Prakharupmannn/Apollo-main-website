"use client";

import React, { useEffect, useState } from "react";
import { X, Plus, Trash2, ImageIcon } from "lucide-react";

/* ───────── helpers ───────── */

const parse = (v) => {
  if (v === null || v === undefined || v === "") return null;
  if (typeof v !== "string") return v;
  try {
    return JSON.parse(v);
  } catch {
    return v;
  }
};

const looseText = (v) =>
  v == null ? "" : typeof v === "string" ? v : JSON.stringify(v, null, 2);

const toUrls = (v) => {
  const p = parse(v);
  const arr = Array.isArray(p) ? p : p ? [p] : [];
  return arr
    .map((x) => (typeof x === "string" ? x : x?.url || x?.src || ""))
    .filter(Boolean);
};

const toFlex = (v) => {
  const p = parse(v);
  if (p == null || p === "") return { items: [] };
  if (typeof p === "string") return { items: [p] };
  if (Array.isArray(p) && p.every((x) => typeof x === "string"))
    return { items: p };
  return { raw: JSON.stringify(p, null, 2) };
};

const toPairs = (v) => {
  const p = parse(v);
  if (p == null || p === "") return { pairs: [], shape: "object" };
  if (
    Array.isArray(p) &&
    p.every((x) => x && typeof x === "object" && "label" in x && "value" in x)
  ) {
    return {
      pairs: p.map((x) => ({
        k: String(x.label ?? ""),
        v: String(x.value ?? ""),
      })),
      shape: "array",
    };
  }
  if (
    typeof p === "object" &&
    !Array.isArray(p) &&
    Object.values(p).every((x) => x === null || typeof x !== "object")
  ) {
    return {
      pairs: Object.entries(p).map(([k, val]) => ({ k, v: String(val ?? "") })),
      shape: "object",
    };
  }
  return { raw: JSON.stringify(p, null, 2) };
};

const serFlex = (x) =>
  x.raw !== undefined ? x.raw : x.items.map((t) => t.trim()).filter(Boolean);

const serPairs = (x) => {
  if (x.raw !== undefined) return x.raw;
  const clean = x.pairs.filter((p) => p.k.trim());
  return x.shape === "array"
    ? clean.map((p) => ({ label: p.k.trim(), value: p.v }))
    : Object.fromEntries(clean.map((p) => [p.k.trim(), p.v]));
};

const extractDbId = (record) => {
  if (!record) return undefined;
  if (typeof record.dbId === "number" && !isNaN(record.dbId) && record.dbId > 0)
    return record.dbId;
  if (typeof record.id === "number" && !isNaN(record.id) && record.id > 0)
    return record.id;
  const str = String(record.dbId ?? record.id ?? "");
  const digits = str.replace(/\D/g, "");
  if (digits) {
    const n = parseInt(digits, 10);
    if (!isNaN(n) && n > 0) return n;
  }
  return undefined;
};

const buildState = (d = {}) => ({
  dbId: extractDbId(d),
  title: d.title ?? "",
  slug: d.slug ?? "",
  deptLabel: d.deptLabel ?? d.department ?? "",
  dept: d.dept ?? "",
  icon: d.icon || "Stethoscope",
  accent: d.accent || "from-[#0E526B] to-[#1D82A6]",
  patient: d.patient ?? "",
  patientInfo: toPairs(d.patientInfo),
  doctor: d.doctor ?? "",
  doctorRole: d.doctorRole ?? "",
  treatmentDuration: d.treatmentDuration ?? "",
  acquiredDiseases: looseText(d.acquiredDiseases),
  summary: d.summary ?? "",
  quote: d.quote ?? "",
  challenge: d.challenge ?? "",
  outcome: d.outcome ?? "",
  beforeStats: looseText(d.beforeStats),
  afterStats: looseText(d.afterStats),
  images: toUrls(d.images),
  details: toFlex(d.details),
  procedures: toFlex(d.procedures),
  outcomesList: toFlex(d.outcomesList),
});

const serialize = (s) => {
  const numericId = extractDbId(s);
  return {
    ...s,
    dbId: numericId,
    images: s.images.map((x) => x.trim()).filter(Boolean),
    patientInfo: serPairs(s.patientInfo),
    details: serFlex(s.details),
    procedures: serFlex(s.procedures),
    outcomesList: serFlex(s.outcomesList),
  };
};

const inputCls =
  "w-full rounded-xl border border-[#DCE8ED] bg-white px-3.5 py-2.5 text-[13px] text-[#06202B] placeholder:text-[#9FB1B9] outline-none transition focus:border-[#0E526B] focus:ring-4 focus:ring-[#0E526B]/10";

const addBtn =
  "inline-flex items-center gap-1.5 rounded-lg bg-[#0E526B] px-3 py-1.5 text-[11px] font-bold text-white shadow-sm transition hover:bg-[#0B4258]";

const emptyCls =
  "rounded-xl border border-dashed border-[#DCE8ED] px-4 py-3 text-[12px] text-[#9FB1B9]";

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

function SubHead({ title, onAdd, addLabel }) {
  return (
    <div className="mb-2 flex items-center justify-between">
      <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#0E526B]">
        {title}
      </h4>
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

function FlexList({ title, value, onChange, addLabel, rows = 2, placeholder }) {
  if (value.raw !== undefined)
    return (
      <RawBox
        title={title}
        value={value.raw}
        onChange={(raw) => onChange({ raw })}
      />
    );

  const items = value.items;
  const setItems = (next) => onChange({ items: next });

  return (
    <div>
      <SubHead
        title={title}
        onAdd={() => setItems([...items, ""])}
        addLabel={addLabel}
      />
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
                onChange={(e) =>
                  setItems(
                    items.map((x, idx) => (idx === i ? e.target.value : x)),
                  )
                }
                className={`${inputCls} resize-y`}
              />
              <button
                type="button"
                onClick={() => setItems(items.filter((_, x) => x !== i))}
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

function PairList({ title, value, onChange, addLabel, keyPh, valPh }) {
  if (value.raw !== undefined)
    return (
      <RawBox
        title={title}
        value={value.raw}
        onChange={(raw) => onChange({ raw })}
      />
    );

  const pairs = value.pairs;
  const setPairs = (next) => onChange({ ...value, pairs: next });

  return (
    <div>
      <SubHead
        title={title}
        onAdd={() => setPairs([...pairs, { k: "", v: "" }])}
        addLabel={addLabel}
      />
      {pairs.length === 0 ? (
        <p className={emptyCls}>Nothing added yet.</p>
      ) : (
        <ul className="space-y-2.5">
          {pairs.map((p, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 rounded-xl border border-[#E3EEF2] bg-white p-3"
            >
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EDF7FA] text-[11px] font-bold text-[#0E526B]">
                {i + 1}
              </span>
              <div className="grid flex-1 gap-2 sm:grid-cols-2">
                <input
                  value={p.k}
                  placeholder={keyPh}
                  onChange={(e) =>
                    setPairs(
                      pairs.map((x, idx) =>
                        idx === i ? { ...x, k: e.target.value } : x,
                      ),
                    )
                  }
                  className={inputCls}
                />
                <input
                  value={p.v}
                  placeholder={valPh}
                  onChange={(e) =>
                    setPairs(
                      pairs.map((x, idx) =>
                        idx === i ? { ...x, v: e.target.value } : x,
                      ),
                    )
                  }
                  className={inputCls}
                />
              </div>
              <button
                type="button"
                onClick={() => setPairs(pairs.filter((_, x) => x !== i))}
                className="mt-1 rounded-lg p-2 text-[#D94C5B] transition hover:bg-[#FFF1F3]"
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

/* ───────── the modal ───────── */

export default function CaseStudyModal({
  open,
  mode = "add",
  initial,
  departments = [],
  onClose,
  onSubmit,
}) {
  const [f, setF] = useState(() => buildState(initial));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [badImg, setBadImg] = useState(false);

  useEffect(() => {
    if (open) {
      setF(buildState(initial));
      setError("");
      setBadImg(false);
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

  const cover = f.images[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      <div
        className="absolute inset-0 bg-[#06202B]/55 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative flex max-h-[94vh] w-full max-w-4xl flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_40px_100px_-20px_rgba(6,32,43,.55)]">
        <div className="h-1.5 w-full shrink-0 bg-gradient-to-r from-[#0E526B] via-[#3C93AE] to-[#E1B54A]" />

        {/* header */}
        <div className="flex shrink-0 items-start justify-between px-7 pb-3 pt-6">
          <div>
            <h2 className="font-serif text-[28px] leading-none text-[#06202B]">
              {mode === "add" ? "Add Case Study" : "Edit Case Study"}
            </h2>
            <p className="mt-2 text-[12px] text-[#71858E]">
              Fill in the details to{" "}
              {mode === "add"
                ? "add a new case study to"
                : "update the case study in"}{" "}
              the system.
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
              <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[#BFD6DF] bg-[#F4FAFC]">
                {cover && !badImg ? (
                  <img
                    src={cover}
                    alt=""
                    onError={() => setBadImg(true)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center text-[#71858E]">
                    <ImageIcon className="mx-auto h-7 w-7 text-[#0E526B]" />
                    <p className="mt-2 text-[11px] font-semibold">
                      Cover preview
                    </p>
                  </div>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Title" className="sm:col-span-2">
                  <input
                    {...text("title")}
                    placeholder="e.g. Successful TAVI in a 82-year-old patient"
                    className={inputCls}
                  />
                </Field>
                <Field label="Slug" hint="auto if empty">
                  <input
                    {...text("slug")}
                    placeholder="e.g. successful-tavi-case"
                    className={inputCls}
                  />
                </Field>
                <Field label="Icon">
                  <select {...text("icon")} className={inputCls}>
                    <option value="Stethoscope">Stethoscope</option>
                    <option value="Microscope">Microscope</option>
                  </select>
                </Field>
                <Field label="Department Label">
                  <input
                    list="cs-depts"
                    {...text("deptLabel")}
                    placeholder="e.g. Cardiology"
                    className={inputCls}
                  />
                  <datalist id="cs-depts">
                    {departments.map((d) => (
                      <option key={d} value={d} />
                    ))}
                  </datalist>
                </Field>
                <Field label="Department Key" hint="auto if empty">
                  <input
                    {...text("dept")}
                    placeholder="e.g. cardiology"
                    className={inputCls}
                  />
                </Field>
                <Field
                  label="Accent (Tailwind gradient)"
                  className="sm:col-span-2"
                  hint="used on cards"
                >
                  <input
                    list="cs-accents"
                    {...text("accent")}
                    placeholder="from-[#0A5F7A] to-[#1D82A6]"
                    className={inputCls}
                  />
                  <datalist id="cs-accents">
                    <option value="from-[#0A5F7A] to-[#1D82A6]" />
                    <option value="from-rose-600 to-rose-400" />
                    <option value="from-emerald-600 to-teal-400" />
                    <option value="from-violet-600 to-indigo-400" />
                    <option value="from-amber-600 to-orange-400" />
                  </datalist>
                </Field>
              </div>
            </div>
          </Section>

          {/* 2 */}
          <Section n="2" title="Patient & Doctor">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Patient">
                <input
                  {...text("patient")}
                  placeholder="e.g. Mr. R. Sharma, 62"
                  className={inputCls}
                />
              </Field>
              <Field label="Treatment Duration">
                <input
                  {...text("treatmentDuration")}
                  placeholder="e.g. 5 days"
                  className={inputCls}
                />
              </Field>
              <Field label="Doctor">
                <input
                  {...text("doctor")}
                  placeholder="Dr. Name"
                  className={inputCls}
                />
              </Field>
              <Field label="Doctor Role">
                <input
                  {...text("doctorRole")}
                  placeholder="e.g. Senior Interventional Cardiologist"
                  className={inputCls}
                />
              </Field>
              <Field
                label="Acquired Diseases"
                className="sm:col-span-2"
                hint="text or JSON"
              >
                <textarea
                  rows={2}
                  {...text("acquiredDiseases")}
                  placeholder="e.g. Hypertension, Diabetes"
                  className={`${inputCls} resize-y`}
                />
              </Field>
            </div>
            <PairList
              title="Patient Info"
              value={f.patientInfo}
              onChange={set("patientInfo")}
              addLabel="Add Detail"
              keyPh="Label (e.g. Age)"
              valPh="Value (e.g. 62 years)"
            />
          </Section>

          {/* 3 */}
          <Section n="3" title="Story">
            <Field label="Summary">
              <textarea
                rows={3}
                {...text("summary")}
                placeholder="Short summary shown on cards…"
                className={`${inputCls} resize-y`}
              />
            </Field>
            <Field label="Challenge">
              <textarea
                rows={3}
                {...text("challenge")}
                placeholder="What made this case difficult?"
                className={`${inputCls} resize-y`}
              />
            </Field>
            <Field label="Outcome">
              <textarea
                rows={3}
                {...text("outcome")}
                placeholder="Final result for the patient…"
                className={`${inputCls} resize-y`}
              />
            </Field>
            <Field label="Quote">
              <textarea
                rows={2}
                {...text("quote")}
                placeholder="Patient or doctor quote…"
                className={`${inputCls} resize-y`}
              />
            </Field>
          </Section>

          {/* 4 */}
          <Section
            n="4"
            title="Before & After"
            subtitle="Plain text or JSON, the same way it is stored."
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Before Stats">
                <textarea
                  rows={5}
                  {...text("beforeStats")}
                  placeholder="e.g. EF 25%, breathless at rest"
                  className={`${inputCls} resize-y`}
                />
              </Field>
              <Field label="After Stats">
                <textarea
                  rows={5}
                  {...text("afterStats")}
                  placeholder="e.g. EF 45%, walking 2 km daily"
                  className={`${inputCls} resize-y`}
                />
              </Field>
            </div>
          </Section>

          {/* 5 */}
          <Section n="5" title="Details, Procedures & Outcomes">
            <FlexList
              title="Details"
              value={f.details}
              onChange={set("details")}
              addLabel="Add Paragraph"
              rows={3}
            />
            <FlexList
              title="Procedures"
              value={f.procedures}
              onChange={set("procedures")}
              addLabel="Add Procedure"
            />
            <FlexList
              title="Outcomes List"
              value={f.outcomesList}
              onChange={set("outcomesList")}
              addLabel="Add Outcome"
            />
          </Section>

          {/* 6 */}
          <Section
            n="6"
            title="Images"
            subtitle="The first image is the cover."
          >
            <div className="flex items-center justify-between">
              <h4 className="text-[12px] font-bold uppercase tracking-wider text-[#0E526B]">
                Gallery
              </h4>
              <button
                type="button"
                onClick={() =>
                  setF((p) => ({ ...p, images: [...p.images, ""] }))
                }
                className={addBtn}
              >
                <Plus className="h-3.5 w-3.5" /> Add Image
              </button>
            </div>
            {f.images.length === 0 ? (
              <p className={emptyCls}>No images added yet.</p>
            ) : (
              <ul className="space-y-2.5">
                {f.images.map((url, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2.5 rounded-xl border border-[#E3EEF2] bg-white p-3"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#EDF7FA] text-[11px] font-bold text-[#0E526B]">
                      {url ? (
                        <img
                          src={url}
                          alt=""
                          onError={(e) =>
                            (e.currentTarget.style.display = "none")
                          }
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        i + 1
                      )}
                    </span>
                    <input
                      value={url}
                      placeholder="https://… or /images/…"
                      onChange={(e) =>
                        setF((p) => ({
                          ...p,
                          images: p.images.map((x, idx) =>
                            idx === i ? e.target.value : x,
                          ),
                        }))
                      }
                      className={inputCls}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setF((p) => ({
                          ...p,
                          images: p.images.filter((_, x) => x !== i),
                        }))
                      }
                      className="rounded-lg p-2 text-[#D94C5B] transition hover:bg-[#FFF1F3]"
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