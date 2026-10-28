"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, SearchX } from "lucide-react";
import { displayFont } from "./fonts";

/* ---------- Shared class strings (Premium Apollo Healthcare theme) ---------- */
export const cardCls =
  "relative rounded-2xl border border-slate-200/90 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04),0_6px_16px_-4px_rgba(15,23,42,0.03)]";

export const inputCls =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition hover:border-slate-300 focus:border-[#0A5F7A] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0A5F7A]/10";

export const btnPrimary =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0A5F7A] to-[#0E526B] hover:from-[#084C62] hover:to-[#0A4357] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_12px_rgba(10,95,122,0.22)] transition hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0A5F7A]/25 disabled:opacity-60";

export const btnGhost =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-xs transition hover:text-slate-900 hover:border-slate-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0A5F7A]/15";

/* ---------- Status badge ---------- */
const TONES = {
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  amber: "bg-amber-50 text-amber-700 ring-amber-600/20",
  sky: "bg-sky-50 text-sky-700 ring-sky-600/20",
  rose: "bg-rose-50 text-rose-700 ring-rose-600/20",
  slate: "bg-slate-100 text-slate-700 ring-slate-600/20",
};

const STATUS_TONE = {
  Active: "emerald",
  Published: "emerald",
  Confirmed: "emerald",
  Pending: "amber",
  Draft: "amber",
  Rescheduled: "sky",
  Cancelled: "rose",
  Inactive: "rose",
  Completed: "slate",
};

export function StatusBadge({ status }) {
  const tone = TONES[STATUS_TONE[status] || "slate"];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${tone}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {status}
    </span>
  );
}

/* ---------- Avatar / Thumbnail ---------- */
const GRADS = [
  "from-[#0A5F7A] to-[#1D82A6]",
  "from-[#C8952E] to-[#D97706]",
  "from-[#4338CA] to-[#6366F1]",
  "from-[#047857] to-[#10B981]",
  "from-[#BE123C] to-[#F43F5E]",
];
const grad = (s = "") => GRADS[(s.charCodeAt(0) || 0) % GRADS.length];

export function Avatar({ name = "", src, size = 40 }) {
  const initials = name
    .replace(/^Dr\.?\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={name}
        className="rounded-full object-cover ring-2 ring-white shadow-sm"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full bg-gradient-to-br ${grad(
        name
      )} text-xs font-bold text-white ring-2 ring-white shadow-sm`}
      style={{ width: size, height: size }}
    >
      {initials}
    </span>
  );
}

export function Thumb({ src, label = "" }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={label}
        className="h-11 w-14 rounded-lg object-cover ring-1 ring-slate-200 shadow-xs"
      />
    );
  }
  return (
    <span
      className={`grid h-11 w-14 place-items-center rounded-lg bg-gradient-to-br ${grad(
        label
      )} font-serif text-lg font-bold text-white shadow-xs ring-1 ring-slate-200`}
    >
      {(label[0] || "A").toUpperCase()}
    </span>
  );
}

/* ---------- Healthcare Tone Icon Tile ---------- */
const TILE = {
  teal: "bg-teal-50 text-[#0A5F7A] ring-1 ring-[#0A5F7A]/20 shadow-xs",
  gold: "bg-amber-50 text-amber-700 ring-1 ring-amber-600/20 shadow-xs",
  rose: "bg-rose-50 text-rose-700 ring-1 ring-rose-600/20 shadow-xs",
  violet: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600/20 shadow-xs",
  emerald: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20 shadow-xs",
};

export function IconTile({ icon: Icon, tone = "teal", size = "md" }) {
  const box =
    size === "lg"
      ? "h-13 w-13 rounded-2xl"
      : size === "sm"
      ? "h-9 w-9 rounded-xl"
      : "h-11 w-11 rounded-xl";
  const ico =
    size === "lg" ? "h-6 w-6" : size === "sm" ? "h-4 w-4" : "h-5 w-5";

  return (
    <span
      className={`relative grid shrink-0 place-items-center transition-transform ${box} ${TILE[tone] || TILE.teal}`}
    >
      <Icon className={ico} />
    </span>
  );
}

/* ---------- Cards ---------- */
export function Card({ className = "", children, ...rest }) {
  return (
    <div className={`${cardCls} ${className}`} {...rest}>
      {children}
    </div>
  );
}

/** Card with subtle hover elevation */
export function SpotlightCard({ className = "", children, ...rest }) {
  return (
    <div
      className={`group overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04),0_6px_16px_-4px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#0A5F7A]/30 hover:shadow-[0_12px_28px_-6px_rgba(10,95,122,0.12)] ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export function PageHeader({ title, subtitle, children }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1
          className={`${displayFont.className} text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl`}
        >
          {title}
        </h1>
        <span className="mt-2 block h-[3px] w-14 rounded-full bg-gradient-to-r from-[#0A5F7A] via-[#1D82A6] to-[#F59E0B]" />
        {subtitle && <p className="mt-2 text-sm text-slate-500">{subtitle}</p>}
      </div>
      {children && (
        <div className="flex flex-wrap items-center gap-2.5">{children}</div>
      )}
    </div>
  );
}

export function Tabs({ tabs, value, onChange }) {
  return (
    <div
      className="flex flex-wrap gap-1.5 rounded-xl bg-slate-100/90 p-1"
      role="tablist"
    >
      {tabs.map((t) => {
        const on = value === t.key;
        return (
          <button
            key={t.key}
            role="tab"
            aria-selected={on}
            onClick={() => onChange(t.key)}
            className={`cursor-pointer rounded-lg px-3.5 py-1.5 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5F7A] ${
              on
                ? "bg-white text-slate-900 shadow-xs ring-1 ring-slate-200/80 font-bold"
                : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
            }`}
          >
            {t.label}
            {t.count !== undefined && (
              <span
                className={`ml-1.5 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  on
                    ? "bg-[#0A5F7A] text-white"
                    : "bg-slate-200 text-slate-600"
                }`}
              >
                {t.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function EmptyState({
  title = "No records found",
  text = "Try adjusting your search criteria or filter options.",
}) {
  return (
    <div className="grid place-items-center px-6 py-14 text-center">
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-slate-100 text-[#0A5F7A] ring-1 ring-slate-200">
        <SearchX className="h-6 w-6" />
      </span>
      <p className="mt-3.5 text-sm font-bold text-slate-900">{title}</p>
      <p className="mt-1 text-xs text-slate-500 max-w-sm">{text}</p>
    </div>
  );
}

export function Pagination({
  page,
  pageSize,
  total,
  onChange,
  noun = "items",
}) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);
  const start = Math.max(1, Math.min(page - 2, pages - 4));
  const nums = [];
  for (let i = start; i <= Math.min(pages, start + 4); i++) nums.push(i);

  const base =
    "grid h-8 min-w-8 cursor-pointer place-items-center rounded-lg px-2 text-xs font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5F7A]";

  return (
    <div className="flex flex-col items-center justify-between gap-3 border-t border-slate-200/80 bg-slate-50/50 px-5 py-3.5 sm:flex-row">
      <p className="text-xs text-slate-500">
        Showing{" "}
        <span className="font-semibold text-slate-700">
          {from}–{to}
        </span>{" "}
        of <span className="font-semibold text-slate-700">{total}</span> {noun}
      </p>
      <div className="flex items-center gap-1.5">
        <button
          className={`${base} border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed`}
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        {nums.map((n) => (
          <button
            key={n}
            onClick={() => onChange(n)}
            aria-current={n === page ? "page" : undefined}
            className={`${base} ${
              n === page
                ? "bg-[#0A5F7A] text-white shadow-xs font-bold"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {n}
          </button>
        ))}
        <button
          className={`${base} border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-40 disabled:cursor-not-allowed`}
          disabled={page === pages}
          onClick={() => onChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/* ---------- Modal ---------- */
export function Modal({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  size = "md",
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;
  const width =
    size === "lg" ? "max-w-2xl" : size === "sm" ? "max-w-sm" : "max-w-lg";

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className={`relative flex max-h-[90dvh] w-full ${width} flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-1 shrink-0 bg-gradient-to-r from-[#0A5F7A] via-[#1D82A6] to-[#F59E0B]" />
        <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-1">
          <div>
            <h3
              className={`${displayFont.className} text-2xl font-bold text-slate-900 sm:text-3xl`}
            >
              {title}
            </h3>
            {subtitle && (
              <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-4">{children}</div>
        {footer && (
          <div className="flex shrink-0 justify-end gap-2.5 border-t border-slate-100 bg-slate-50/80 px-6 py-3.5">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Toast ---------- */
export function useToast() {
  const [t, setT] = useState(null);
  const show = useCallback(
    (message, type = "success") => setT({ message, type, id: Date.now() }),
    []
  );

  useEffect(() => {
    if (!t) return;
    const id = setTimeout(() => setT(null), 3000);
    return () => clearTimeout(id);
  }, [t]);

  const node = t ? (
    <div
      key={t.id}
      role="status"
      className="fixed bottom-5 right-5 z-[80] flex items-center gap-2.5 rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-2xl animate-in slide-in-from-bottom-2 fade-in duration-200"
    >
      {t.type === "error" ? (
        <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
      ) : (
        <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
      )}
      <span>{t.message}</span>
    </div>
  ) : null;

  return [show, node];
}

/* ---------- CSV Export ---------- */
export function downloadCsv(filename, headers, rows) {
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const csv = [
    headers.map(esc).join(","),
    ...rows.map((r) => r.map(esc).join(",")),
  ].join("\n");
  const url = URL.createObjectURL(
    new Blob([csv], { type: "text/csv;charset=utf-8;" })
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export const fmtDate = (d) =>
  d
    ? new Date(`${d}T00:00:00`).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";