"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowRight,
  Baby,
  Bone,
  Brain,
  CalendarDays,
  Check,
  ChevronDown,
  Droplets,
  Heart,
  HeartPulse,
  LayoutGrid,
  Loader2,
  Search,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  X,
  Zap,
} from "lucide-react";

/* ---------------- meta (icon + color) ---------------- */

// navbar ke Centres of Excellence ki taglines (sirf inhi slugs par)
const COE = {
  gastroenterology: { sub: "Digestive & Liver Care Institute", grad: ["#0E526B", "#1D82A6"] },
  oncology: { sub: "CyberKnife & Precision Cancer Care", grad: ["#A32B3A", "#C8952E"] },
  cardiology: { sub: "24/7 STEMI & Heart Surgery Hub", grad: ["#D94C5B", "#2F4F8F"] },
  neurology: { sub: "Brain, Spine & Stroke Care Unit", grad: ["#0E526B", "#137A9A"] },
  nephrology: { sub: "24/7 Dialysis & Kidney Care", grad: ["#12B5D6", "#0E6E8F"] },
  orthopaedics: { sub: "Robotic Joint & Spine Surgery", grad: ["#2C6E6E", "#C8952E"] },
  "critical-care": { sub: "Level-1 CCU & Trauma ER", grad: ["#D3173F", "#8E0F2B"] },
};

const PALETTE = [
  ["#0E526B", "#1D82A6"],
  ["#A32B3A", "#C8952E"],
  ["#2F4F8F", "#6554C0"],
  ["#2C6E6E", "#C8952E"],
  ["#12B5D6", "#0E6E8F"],
  ["#168B73", "#0E526B"],
  ["#D27A29", "#C8952E"],
  ["#D94C8F", "#8F2F6B"],
];

function hashIndex(str, mod) {
  let h = 0;
  for (const c of str) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % mod;
}

function iconFor(slug) {
  if (slug === "all") return LayoutGrid;
  if (/onco|cancer/.test(slug)) return ShieldAlert;
  if (/card|heart|vascular/.test(slug)) return HeartPulse;
  if (/neuro|brain|psych/.test(slug)) return Brain;
  if (/nephro|uro|renal|dialysis/.test(slug)) return Droplets;
  if (/ortho|joint|spine|rheum/.test(slug)) return Bone;
  if (/paed|pedia|child|neonat/.test(slug)) return Baby;
  if (/gyn|obst|women|maternity/.test(slug)) return Heart;
  if (/critical|icu|emergency|trauma/.test(slug)) return Zap;
  if (/gastro|hepat|liver/.test(slug)) return Activity;
  return Stethoscope;
}

function getMeta(slug) {
  if (slug === "all")
    return { icon: LayoutGrid, sub: "Browse every department", grad: ["#0E526B", "#C8952E"] };

  const coe = COE[slug];
  return {
    icon: iconFor(slug),
    sub: coe?.sub || "",
    grad: coe?.grad || PALETTE[hashIndex(slug, PALETTE.length)],
  };
}

/* ---------------- specialty dropdown ---------------- */

function SpecialtyDropdown({ value, onChange, items }) {
  const [open, setOpen] = useState(false);
  const [hi, setHi] = useState(0);

  const wrapRef = useRef(null);
  const panelRef = useRef(null);
  const listRef = useRef(null);
  const triggerRef = useRef(null);
  const byKeyboard = useRef(false);

  const selected = items.find((i) => i.slug === value) || items[0];
  const SelectedIcon = getMeta(selected.slug).icon;

  function closeList() {
    setOpen(false);
  }

  function openList() {
    setHi(Math.max(0, items.findIndex((i) => i.slug === value)));
    byKeyboard.current = true; // selected item list me dikhe
    setOpen(true);
  }

  function choose(slug) {
    closeList();
    onChange(slug);
  }

  // bahar click par band
  useEffect(() => {
    if (!open) return;
    function onDown(e) {
      if (!wrapRef.current?.contains(e.target)) closeList();
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // MOUSE WHEEL: panel ke upar sirf list scroll hogi, page nahi
  useEffect(() => {
    if (!open) return;

    function onWheel(e) {
      const list = listRef.current;
      const panel = panelRef.current;
      if (!list || !panel || !panel.contains(e.target)) return;

      e.preventDefault();
      e.stopImmediatePropagation();

      const unit =
        e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? list.clientHeight : 1;
      list.scrollTop += e.deltaY * unit;
    }

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () =>
      window.removeEventListener("wheel", onWheel, { capture: true });
  }, [open]);

  // keyboard se highlighted item dikhta rahe (page scroll nahi, sirf list)
  useEffect(() => {
    if (!open || !byKeyboard.current) return;
    byKeyboard.current = false;

    const list = listRef.current;
    const el = list?.querySelector(`[data-i="${hi}"]`);
    if (!list || !el) return;

    const top = el.offsetTop;
    const bottom = top + el.offsetHeight;

    if (top < list.scrollTop) list.scrollTop = top - 8;
    else if (bottom > list.scrollTop + list.clientHeight)
      list.scrollTop = bottom - list.clientHeight + 8;
  }, [hi, open]);

  function onKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!open) return openList();
      byKeyboard.current = true;
      setHi((i) => Math.min(i + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return openList();
      byKeyboard.current = true;
      setHi((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && open) {
      e.preventDefault();
      const item = items[hi];
      if (item) choose(item.slug);
    } else if (e.key === "Escape" && open) {
      e.preventDefault();
      closeList();
      triggerRef.current?.focus();
    } else if (e.key === "Tab" && open) {
      closeList();
    }
  }

  return (
    <div
      ref={wrapRef}
      onKeyDown={onKeyDown}
      className="group relative flex items-center gap-3 rounded-[22px] px-3 py-2.5 ring-1 ring-transparent transition focus-within:bg-[#F4FAFC] focus-within:ring-[#0E526B]/25 hover:bg-[#F8FCFD] before:absolute before:left-0 before:top-1/4 before:hidden before:h-1/2 before:w-px before:bg-[#E3EDF1] before:content-[''] lg:before:block"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFF6DF] to-white text-[#C8952E] shadow-sm ring-1 ring-[#F1E3BC] transition group-focus-within:bg-[#C8952E] group-focus-within:text-white">
        <SelectedIcon className="h-5 w-5" />
      </span>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#C8952E]">
          Speciality
        </span>

        {/* MOBILE: native picker */}
        <div className="relative md:hidden">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-0.5 w-full cursor-pointer appearance-none truncate bg-transparent pr-6 text-sm font-semibold text-[#06202B] outline-none"
          >
            {items.map((i) => (
              <option key={i.slug} value={i.slug}>
                {i.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-[#0E526B]" />
        </div>

        {/* DESKTOP: custom trigger */}
        <button
          ref={triggerRef}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => (open ? closeList() : openList())}
          className="relative mt-0.5 hidden w-full items-center justify-between gap-2 text-left text-sm font-semibold text-[#06202B] outline-none after:absolute after:-inset-x-16 after:-inset-y-6 after:content-[''] md:flex"
        >
          <span className="truncate">{selected.label}</span>
          <ChevronDown
            className={`h-4 w-4 shrink-0 text-[#0E526B] transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* PANEL: sirf list */}
      {open && (
        <div
          ref={panelRef}
          className="anim-fade-up absolute left-0 top-[calc(100%+12px)] z-50 hidden w-full min-w-[320px] overflow-hidden rounded-[22px] border border-[#E1B54A]/60 bg-white shadow-[0_28px_70px_rgba(6,32,43,.22)] md:block"
          style={{ animationDuration: "0.25s" }}
        >
          <div
            ref={listRef}
            role="listbox"
            className="thin-scroll relative max-h-[340px] overflow-y-auto overscroll-contain px-1"
          >
            {items.map((item, i) => {
              const meta = getMeta(item.slug);
              const Icon = meta.icon;
              const isSelected = item.slug === value;
              const isHi = i === hi;

              return (
                <button
                  key={item.slug}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  data-i={i}
                  onMouseEnter={() => setHi(i)}
                  onClick={() => choose(item.slug)}
                  className={`flex w-full items-center gap-4 rounded-2xl px-2.5 py-2.5 text-left transition ${
                    isHi ? "bg-[#F2F8FA]" : ""
                  }`}
                >
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] text-white shadow-[0_8px_18px_rgba(6,32,43,.18)] transition-transform duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${meta.grad[0]}, ${meta.grad[1]})`,
                      transform: isHi ? "scale(1.06)" : "scale(1)",
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span
                      className={`block truncate text-[13px] text-[#0E526B] ${
                        isSelected ? "font-extrabold" : "font-bold"
                      }`}
                    >
                      {item.label}
                    </span>
                    {meta.sub && (
                      <span className="mt-0.5 block truncate text-[12px] text-[#6B7F88]">
                        {meta.sub}
                      </span>
                    )}
                  </span>

                  <span className="rounded-full bg-[#FFF8E7] px-2 py-0.5 text-[10px] font-bold text-[#C8952E]">
                    {item.count}
                  </span>

                  {isSelected && (
                    <Check className="h-4 w-4 shrink-0 text-[#0E526B]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------------- finder bar ---------------- */

export default function DoctorFinder({
  search = "",
  specialty = "all",
  options = [],
  total = 0,
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState(search);
  const [spec, setSpec] = useState(specialty);

  const lastPushed = useRef({ search, specialty });

  const items = useMemo(
    () => [{ slug: "all", label: "All Specialties", count: total }, ...options],
    [options, total]
  );

  // URL kisi aur link se badle to input bhi sync ho
  useEffect(() => {
    if (search !== lastPushed.current.search) setQuery(search);
    if (specialty !== lastPushed.current.specialty) setSpec(specialty);
    lastPushed.current = { search, specialty };
  }, [search, specialty]);

  function go(nextSearch, nextSpec, { replace = false, scroll = false } = {}) {
    const s = nextSearch.trim();
    const params = new URLSearchParams();

    if (s) params.set("search", s);
    if (nextSpec && nextSpec !== "all") params.set("specialty", nextSpec);

    const url = `/doctors${params.toString() ? `?${params}` : ""}`;
    lastPushed.current = { search: s, specialty: nextSpec };

    startTransition(() => {
      if (replace) router.replace(url, { scroll: false });
      else router.push(url, { scroll: false });
    });

    if (scroll) {
      requestAnimationFrame(() =>
        document
          .getElementById("expert-doctors")
          ?.scrollIntoView({ behavior: "smooth", block: "start" })
      );
    }
  }

  // typing rukne ke baad live search
  useEffect(() => {
    if (query.trim() === lastPushed.current.search) return;

    const t = setTimeout(() => go(query, spec, { replace: true }), 450);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  function onSubmit(e) {
    e.preventDefault();
    go(query, spec, { scroll: true });
  }

  function clearSearch() {
    setQuery("");
    go("", spec, { replace: true });
  }

  function clearSpecialty() {
    setSpec("all");
    go(query, "all", { replace: true });
  }

  function clearAll() {
    setQuery("");
    setSpec("all");
    go("", "all", { replace: true });
  }

  const hasSearch = Boolean(search?.trim());
  const hasSpec = specialty && specialty !== "all";
  const activeSpecLabel =
    items.find((i) => i.slug === specialty)?.label ||
    specialty.replace(/-/g, " ");

  return (
    <section className="relative z-20 -mt-7 px-6 lg:px-10">
      <div className="anim-fade-up relative mx-auto max-w-5xl">
        <div className="pointer-events-none absolute -inset-x-6 -inset-y-4 rounded-[40px] bg-gradient-to-r from-[#E1B54A]/25 via-[#137A9A]/20 to-[#E1B54A]/25 blur-2xl" />

        <div className="relative z-10 rounded-[32px] bg-gradient-to-r from-[#E1B54A] via-[#8CC5D6] to-[#E1B54A] p-[1.5px] shadow-[0_24px_60px_rgba(14,82,107,.16)]">
          <form
            onSubmit={onSubmit}
            className="grid gap-1.5 rounded-[30.5px] bg-white/95 p-2 backdrop-blur lg:grid-cols-[1.7fr_1fr_auto] lg:items-center"
          >
            {/* SEARCH */}
            <label className="group flex items-center gap-3 rounded-[22px] px-3 py-2.5 ring-1 ring-transparent transition focus-within:bg-[#F4FAFC] focus-within:ring-[#0E526B]/25 hover:bg-[#F8FCFD]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EAF6FA] to-white text-[#0E526B] shadow-sm ring-1 ring-[#DCEAF0] transition group-focus-within:bg-[#0E526B] group-focus-within:text-white">
                {isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Search className="h-5 w-5" />
                )}
              </span>

              <span className="flex min-w-0 flex-1 flex-col">
                <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#C8952E]">
                  Doctor or keyword
                </span>
                <input
                  type="search"
                  enterKeyHint="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, speciality..."
                  className="mt-0.5 w-full min-w-0 bg-transparent text-sm font-semibold text-[#06202B] outline-none placeholder:font-normal placeholder:text-[#8AA0AA] [&::-webkit-search-cancel-button]:hidden"
                />
              </span>

              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={clearSearch}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EDF2F4] text-[#294A58] transition hover:bg-[#0E526B] hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>

            {/* SPECIALTY */}
            <SpecialtyDropdown
              value={spec}
              items={items}
              onChange={(v) => {
                setSpec(v);
                go(query, v, { scroll: true });
              }}
            />

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isPending}
              className="btn-shimmer group flex h-[60px] items-center justify-center gap-3 rounded-[22px] bg-gradient-to-r from-[#0E526B] via-[#137A9A] to-[#0E526B] px-8 text-sm font-bold text-white shadow-[0_14px_30px_rgba(14,82,107,.32)] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-80 lg:ml-1"
            >
              {isPending ? "Searching..." : "Find a Doctor"}
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/20 transition group-hover:translate-x-0.5 group-hover:bg-white/30">
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </button>
          </form>
        </div>

        {/* ACTIVE FILTERS */}
        {(hasSearch || hasSpec) && (
          <div className="relative mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#71858E]">
              Active filters
            </span>

            {hasSearch && (
              <button
                type="button"
                onClick={clearSearch}
                className="group inline-flex items-center gap-2 rounded-full border border-[#DCEAF0] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#294A58] shadow-sm transition hover:border-[#C8952E]/50"
              >
                Search: &ldquo;{search}&rdquo;
                <X className="h-3.5 w-3.5 text-[#8AA0AA] transition group-hover:text-[#D94C5B]" />
              </button>
            )}

            {hasSpec && (
              <button
                type="button"
                onClick={clearSpecialty}
                className="group inline-flex items-center gap-2 rounded-full border border-[#0E526B]/20 bg-[#0E526B]/10 px-3.5 py-1.5 text-xs font-semibold capitalize text-[#0E526B] transition hover:border-[#C8952E]/50"
              >
                {activeSpecLabel}
                <X className="h-3.5 w-3.5 transition group-hover:text-[#D94C5B]" />
              </button>
            )}

            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-bold text-[#C8952E] underline-offset-4 hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </section>
  );
}