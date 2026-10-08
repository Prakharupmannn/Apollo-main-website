"use client";

import React, {
  useState,
  useMemo,
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  memo,
} from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Stethoscope,
  PhoneCall,
  CheckCircle2,
  Sparkles,
  User,
  MapPin,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Award,
  Sun,
  Sunset,
  Moon,
  ChevronRight,
  ChevronDown,
  HeartPulse,
  Search,
  Printer,
  Zap,
  Ticket,
} from "lucide-react";

import appointmentData from "../../../data/appointmentData";

/* ───────────────────────── constants ───────────────────────── */
const goldGradientStyle = {
  background: "linear-gradient(135deg, #F6D98A 0%, #C8952E 100%)",
};

const ease = [0.22, 1, 0.36, 1];

const stepMotion = {
  initial: { opacity: 0, y: 18, scale: 0.985 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.99 },
  transition: { duration: 0.26, ease },
};

const INITIAL_BOOKING = {
  patientName: "",
  ageValue: "",
  ageUnit: "Year",
  gender: "MALE",
  contact: "",
  sameWhatsapp: true,
  whatsappNumber: "",
  scheme: "",
  appointmentDate: "2026-10-07",
  consultant: "",
  pinCode: "",
  state: "MADHYA PRADESH",
  district: "",
  tehsil: "",
  village: "",
  wardNumber: "",
  address: "",
  slot: "09:30:00",
};

/* 16px on phones stops iOS zooming into inputs */
const inputCls =
  "w-full min-h-[48px] px-4 py-3 rounded-xl bg-white border border-slate-200 text-[16px] sm:text-[13px] font-semibold leading-normal text-slate-800 placeholder:text-slate-400 placeholder:font-medium hover:border-[#1D82A6]/50 focus:border-[#1D82A6] focus:ring-4 focus:ring-[#1D82A6]/15 outline-none transition-colors duration-200";

const filterCls =
  "w-full min-h-[44px] pl-9 pr-3 py-2 rounded-xl bg-[#F6FAFC] border border-slate-200 text-[16px] sm:text-xs leading-normal placeholder:text-slate-400 focus:bg-white focus:border-[#1D82A6] focus:ring-4 focus:ring-[#1D82A6]/10 outline-none transition-colors";

const goldBtnCls =
  "relative overflow-hidden group w-full sm:w-auto min-h-[48px] px-8 sm:px-10 py-4 rounded-2xl text-xs font-black text-[#3A2B0A] shadow-[0_12px_30px_rgba(200,149,46,0.4)] cursor-pointer flex items-center justify-center gap-2 sm:gap-3 transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F6D98A]/60 [touch-action:manipulation]";

const STEPS = [
  { n: 1, label: "Patient Info", icon: User },
  { n: 2, label: "Select Slot", icon: Clock },
  { n: 3, label: "Appointment Pass", icon: Ticket },
];

const HEAD = {
  1: { title: "Patient information", next: "Next: Select slot" },
  2: { title: "Select your slot", next: "Next: Appointment pass" },
  3: { title: "Appointment pass", next: "All done: your pass is ready" },
};

const periodMeta = {
  Morning: { icon: Sun, tint: "from-amber-400 to-orange-400" },
  Afternoon: { icon: Sunset, tint: "from-orange-400 to-rose-400" },
  Evening: { icon: Moon, tint: "from-indigo-400 to-[#0A5F7A]" },
};

const CONFETTI = Array.from({ length: 14 }).map((_, i) => ({
  x: (i % 2 ? 1 : -1) * (14 + i * 9),
  delay: i * 0.04,
  color: ["#F6D98A", "#1D82A6", "#10B981", "#C8952E"][i % 4],
}));

const BARCODE = Array.from({ length: 38 }).map((_, i) => ({
  w: i % 3 === 0 ? 3 : 2,
  h: 40 + ((i * 37) % 60),
}));

/* static option lists, built once */
const OPT_DISTRICTS = appointmentData.districts.map((d) => (
  <option key={d} value={d}>
    {d}
  </option>
));
const OPT_TEHSILS = appointmentData.tehsils.map((t) => (
  <option key={t} value={t}>
    {t}
  </option>
));
const OPT_VILLAGES = appointmentData.villages.map((v) => (
  <option key={v} value={v}>
    {v}
  </option>
));

/* ───────────────────────── helpers ───────────────────────── */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatDate(d) {
  if (!d) return "—";
  const [y, mo, da] = String(d).split("-");
  const i = parseInt(mo, 10) - 1;
  if (!y || !da || isNaN(i) || !MONTHS[i]) return d;
  return `${da} ${MONTHS[i]} ${y}`;
}

function formatTime(t) {
  const [h, mi] = String(t).split(":");
  const hh = parseInt(h, 10);
  if (isNaN(hh)) return t;
  return `${String(hh % 12 || 12).padStart(2, "0")}:${(mi || "00").padStart(2, "0")} ${
    hh < 12 ? "AM" : "PM"
  }`;
}

function slotPeriod(time) {
  const h = parseInt(String(time).split(":")[0], 10);
  if (h < 12) return "Morning";
  if (h < 16) return "Afternoon";
  return "Evening";
}

const makePassId = () => `APO-JBP-${Math.floor(1000 + Math.random() * 9000)}`;

function circleCls(state, n) {
  if (state === "done")
    return n === 3
      ? "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-[0_8px_20px_rgba(16,185,129,0.35)]"
      : "bg-gradient-to-br from-[#0A5F7A] to-[#1D82A6] text-white shadow-[0_8px_20px_rgba(10,95,122,0.3)]";
  if (state === "active")
    return "bg-white text-[#0A5F7A] border-2 border-[#1D82A6] shadow-[0_0_0_6px_rgba(29,130,166,0.12)]";
  return "bg-slate-100 text-slate-400 border border-slate-200";
}

function pillCls(state) {
  if (state === "done") return "bg-emerald-50 text-emerald-700 border-emerald-100";
  if (state === "active") return "bg-[#EDF6FB] text-[#0A5F7A] border-[#1D82A6]/20";
  return "bg-slate-100 text-slate-500 border-slate-200";
}

/* ───────────────────────── small reusable pieces ───────────────────────── */
const AnimatedCheck = memo(function AnimatedCheck({ className = "w-5 h-5" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path className="ap-check" pathLength="1" d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
});

/* label sits on the top border of the field */
const Field = memo(function Field({ label, htmlFor, required, className = "", children, hint }) {
  return (
    <div className={`group relative min-w-0 ${className}`}>
      <label
        htmlFor={htmlFor}
        className="absolute left-3 -top-2 z-10 px-1.5 bg-white text-[10px] font-extrabold uppercase tracking-wider leading-none text-slate-500 group-focus-within:text-[#0A5F7A] transition-colors"
      >
        {label} {required && <span className="text-rose-500">*</span>}
      </label>
      {children}
      {hint}
    </div>
  );
});

const SelectBox = memo(function SelectBox({ children, className = "", wrapCls = "", ...props }) {
  return (
    <div className={`relative ${wrapCls}`}>
      <select {...props} className={`${inputCls} appearance-none pr-10 cursor-pointer ${className}`}>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
    </div>
  );
});

const FormBlock = memo(function FormBlock({ icon: Icon, title, desc, children, first }) {
  return (
    <div className={first ? "" : "pt-6 sm:pt-7 border-t border-slate-100"}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-[#EDF6FB] text-[#0A5F7A] flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4" />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-extrabold text-[#0B3446] leading-snug">{title}</h3>
          <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
        </div>
      </div>
      {children}
    </div>
  );
});

/* ───────────────────────── HERO ───────────────────────── */
const Hero = memo(function Hero({ consultant, date, slot }) {
  return (
    <section className="relative mb-6 sm:mb-8">
      <div className="rounded-[1.75rem] sm:rounded-[2.25rem] p-[2px] bg-gradient-to-r from-[#F6D98A] via-[#1D82A6] to-[#C8952E] shadow-[0_25px_60px_-15px_rgba(10,95,122,0.4)]">
        <div className="relative rounded-[calc(1.75rem-2px)] sm:rounded-[calc(2.25rem-2px)] bg-gradient-to-tr from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] overflow-hidden text-white p-5 sm:p-9 lg:p-10">
          <div className="ap-spin hidden sm:block absolute -top-24 -right-24 w-80 h-80 rounded-full border border-white/10 pointer-events-none" />
          <div className="hidden sm:block absolute -bottom-24 -left-16 w-72 h-72 bg-[#F6D98A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
            <div className="lg:col-span-7 space-y-4 min-w-0">
              <div className="ap-in inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-[#FEF3C7] text-[11px] sm:text-xs font-semibold max-w-full">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <Sparkles className="w-4 h-4 text-[#F6D98A] shrink-0" />
                <span>Apollo Hospitals Jabalpur • Express Digital Booking</span>
              </div>

              <h1
                className="ap-in font-serif-apollo text-[1.8rem] sm:text-5xl lg:text-[3.3rem] font-black tracking-tight leading-[1.15]"
                style={{ animationDelay: "70ms" }}
              >
                Book Your OPD <br />
                <span className="ap-shimmer-text bg-clip-text text-transparent bg-gradient-to-r from-[#F6D98A] via-[#FFFFFF] to-[#E3AF4D]">
                  Doctor Appointment
                </span>
              </h1>

              <p
                className="ap-in text-slate-200/90 text-sm sm:text-base leading-relaxed max-w-2xl font-light"
                style={{ animationDelay: "140ms" }}
              >
                Fast-track your consultation. Complete your patient registration, select your panel
                scheme, and reserve your preferred consultation window seamlessly.
              </p>

              <div className="ap-in flex flex-wrap gap-2.5 text-xs font-semibold" style={{ animationDelay: "200ms" }}>
                {[
                  { icon: ShieldCheck, text: "Instant Confirmation" },
                  { icon: Award, text: "Verified Specialists" },
                ].map((f) => (
                  <div
                    key={f.text}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 border border-white/15 text-slate-100"
                  >
                    <f.icon className="w-4 h-4 text-[#F6D98A]" />
                    <span>{f.text}</span>
                  </div>
                ))}
              </div>

              <div className="ap-in" style={{ animationDelay: "260ms" }}>
                <a
                  href="tel:18001236666"
                  className="inline-flex items-center gap-3 min-h-[48px] px-5 sm:px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-[0.97] text-white border border-white/25 font-bold text-xs shadow-lg transition-all [touch-action:manipulation]"
                >
                  <span className="relative flex h-8 w-8 items-center justify-center shrink-0">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#F6D98A]/40 animate-ping" />
                    <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#F6D98A]/20">
                      <PhoneCall className="w-4 h-4 text-[#F6D98A]" />
                    </span>
                  </span>
                  <span>Help Desk: 1800-123-6666</span>
                </a>
              </div>
            </div>

            <div
              className="ap-in lg:col-span-5 relative mx-auto w-full max-w-sm lg:max-w-none"
              style={{ animationDelay: "160ms" }}
            >
              <div className="ap-float relative rounded-3xl bg-white/10 sm:backdrop-blur-xl border border-white/25 p-4 sm:p-5 shadow-[0_30px_60px_rgba(0,0,0,0.3)]">
                <div className="flex items-center gap-3 pb-4 border-b border-white/15">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg shrink-0"
                    style={goldGradientStyle}
                  >
                    <HeartPulse className="w-6 h-6 text-[#3A2B0A]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#F6D98A] leading-normal">
                      Your Booking
                    </p>
                    <p className="text-sm font-black leading-snug truncate">
                      {consultant || "Select Doctors"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="rounded-2xl bg-white/10 border border-white/10 p-3 min-w-0">
                    <Calendar className="w-4 h-4 text-[#F6D98A] mb-1.5" />
                    <p className="text-[10px] text-slate-300 leading-normal">Date</p>
                    <p className="text-xs font-extrabold leading-snug break-words">{formatDate(date)}</p>
                  </div>
                  <div className="rounded-2xl bg-white/10 border border-white/10 p-3 min-w-0">
                    <Clock className="w-4 h-4 text-[#F6D98A] mb-1.5" />
                    <p className="text-[10px] text-slate-300 leading-normal">Slot</p>
                    <p className="text-xs font-extrabold leading-snug break-words">{formatTime(slot)}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-[11px] text-emerald-300 font-bold">
                  <Zap className="w-3.5 h-3.5" />
                  <span>Ready in 3 simple steps</span>
                </div>
              </div>

              <div className="ap-float2 hidden sm:flex absolute -top-4 -left-5 items-center gap-2 px-3 py-2 rounded-2xl bg-white text-[#0B3446] shadow-xl">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-[11px] font-black">Instant Pass</span>
              </div>
              <div
                className="ap-float hidden sm:flex absolute -bottom-4 -right-5 items-center gap-2 px-3 py-2 rounded-2xl text-[#3A2B0A] shadow-xl"
                style={goldGradientStyle}
              >
                <Stethoscope className="w-4 h-4" />
                <span className="text-[11px] font-black">OPD Express</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

/* ───────────────────────── TOP HORIZONTAL STEPPER ───────────────────────── */
const TopStepper = memo(function TopStepper({ items, onGo }) {
  return (
    <div className="rounded-2xl sm:rounded-3xl bg-white border border-slate-100 shadow-[0_10px_30px_rgba(10,95,122,0.07)] p-4 sm:p-6">
      <h2 className="font-serif-apollo text-base sm:text-xl font-black text-[#0B3446] mb-4 sm:mb-5 leading-snug">
        Appointment journey
      </h2>
      <ol className="flex items-start">
        {items.map((s, i) => {
          const Icon = s.icon;
          return (
            <React.Fragment key={s.n}>
              <li className="flex flex-col items-center text-center w-[84px] sm:w-32 shrink-0">
                <button
                  type="button"
                  disabled={!s.clickable}
                  onClick={() => onGo(s.n)}
                  aria-current={s.state === "active" ? "step" : undefined}
                  aria-label={`${s.label}: ${s.status}`}
                  className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 disabled:cursor-default enabled:cursor-pointer enabled:hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1D82A6]/30 [touch-action:manipulation] ${circleCls(
                    s.state,
                    s.n
                  )}`}
                >
                  {s.state === "active" && (
                    <span className="ap-ring absolute inset-0 rounded-full border-2 border-[#1D82A6]" />
                  )}
                  {s.state === "done" ? (
                    <AnimatedCheck className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </button>
                <span
                  className={`mt-2 text-[11px] sm:text-xs font-bold leading-snug ${
                    s.state === "upcoming" ? "text-slate-400" : "text-[#0B3446]"
                  }`}
                >
                  {s.label}
                </span>
              </li>

              {i < items.length - 1 && (
                <div
                  aria-hidden="true"
                  className="flex-1 mt-[21px] sm:mt-6 h-[3px] rounded-full bg-slate-200 overflow-hidden"
                >
                  <div
                    className="h-full w-full origin-left bg-gradient-to-r from-[#0A5F7A] via-[#1D82A6] to-[#C8952E] transition-transform duration-500 ease-out"
                    style={{ transform: `scaleX(${items[i + 1].state !== "upcoming" ? 1 : 0})` }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </div>
  );
});

/* ───────────────────────── PROGRESS RING ───────────────────────── */
const ProgressRing = memo(function ProgressRing({ value, total }) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative w-[68px] h-[68px] sm:w-20 sm:h-20 shrink-0">
      <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90" aria-hidden="true">
        <defs>
          <linearGradient id="ringGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#0A5F7A" />
            <stop offset="60%" stopColor="#1D82A6" />
            <stop offset="100%" stopColor="#C8952E" />
          </linearGradient>
        </defs>
        <circle cx="40" cy="40" r={r} fill="none" stroke="#E2EEF3" strokeWidth="7" />
        <circle
          cx="40"
          cy="40"
          r={r}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - value / total)}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[11px] sm:text-xs font-black text-[#0B3446]">
        {value} of {total}
      </div>
    </div>
  );
});

/* ───────────────────────── PHONE / TABLET BANNER ───────────────────────── */
const StepBanner = memo(function StepBanner({ step, items }) {
  const cur = items[step - 1];
  const Icon = cur.icon;
  return (
    <div className="lg:hidden rounded-2xl bg-gradient-to-br from-[#0A5F7A] via-[#0A5F7A] to-[#0B3446] text-white p-4 flex items-center gap-3 shadow-[0_12px_30px_rgba(10,95,122,0.28)]">
      <div className="w-12 h-12 rounded-full bg-white/15 flex items-center justify-center shrink-0">
        <div className="w-9 h-9 rounded-full bg-white text-[#0A5F7A] flex items-center justify-center">
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-bold tracking-[0.18em] text-white/70 leading-normal">
          STEP {step} OF 3
        </p>
        <p className="text-base sm:text-lg font-black leading-snug truncate">{cur.label}</p>
      </div>
      <div className="flex items-center gap-1.5 shrink-0" aria-hidden="true">
        {items.map((s) => (
          <span
            key={s.n}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              s.n === step ? "w-5 bg-[#F6D98A]" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
});

/* ───────────────────────── LEFT: VERTICAL STEP LIST ───────────────────────── */
const StepList = memo(function StepList({ items }) {
  return (
    <aside className="hidden lg:block rounded-3xl bg-white border border-slate-100 shadow-[0_10px_30px_rgba(10,95,122,0.07)] p-6">
      <ol className="relative">
        <span
          aria-hidden="true"
          className="absolute left-[5px] top-3 bottom-3 border-l border-dashed border-slate-200"
        />
        {items.map((s) => (
          <li key={s.n} className="relative pl-8 pb-8 last:pb-0">
            <span
              aria-hidden="true"
              className={`absolute left-0 top-2 w-[11px] h-[11px] rounded-full ring-4 ring-white transition-colors ${
                s.state === "done"
                  ? s.n === 3
                    ? "bg-emerald-500"
                    : "bg-[#0A5F7A]"
                  : s.state === "active"
                  ? "bg-[#C8952E]"
                  : "bg-slate-300"
              }`}
            />
            <p
              className={`text-[11px] font-bold leading-normal ${
                s.state === "active" ? "text-[#B8841F]" : "text-slate-500"
              }`}
            >
              Step {s.n}
            </p>
            <p
              className={`text-lg font-black leading-snug ${
                s.state === "upcoming" ? "text-slate-400" : "text-[#0B3446]"
              }`}
            >
              {s.label}
            </p>
            <p className="text-xs text-slate-500 leading-relaxed mt-0.5 break-words">{s.short}</p>
            <span
              className={`mt-2 inline-block px-2.5 py-0.5 rounded-md border text-[10px] font-bold leading-normal ${pillCls(
                s.state
              )}`}
            >
              {s.status}
            </span>
          </li>
        ))}
      </ol>
    </aside>
  );
});

/* ───────────────────────── RIGHT: TIMELINE CARDS ───────────────────────── */
const Timeline = memo(function Timeline({ items, onGo }) {
  return (
    <aside className="hidden xl:block rounded-3xl bg-white border border-slate-100 shadow-[0_10px_30px_rgba(10,95,122,0.07)] p-6">
      <p className="text-xs text-slate-500 leading-normal">Appointment process</p>
      <h2 className="font-serif-apollo text-2xl font-black text-[#0B3446] leading-snug">
        Your journey
      </h2>
      <div className="h-px bg-slate-100 my-4" />

      <ol className="relative">
        <span
          aria-hidden="true"
          className="absolute left-[17px] top-4 bottom-4 border-l border-dashed border-slate-200"
        />
        {items.map((s) => (
          <li key={s.n} className="relative flex gap-3 pb-6 last:pb-0">
            <button
              type="button"
              disabled={!s.clickable}
              onClick={() => onGo(s.n)}
              aria-label={`Go to ${s.label}`}
              className={`relative z-10 w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-sm font-black ring-4 ring-white transition-all disabled:cursor-default enabled:cursor-pointer enabled:hover:scale-105 ${circleCls(
                s.state,
                s.n
              )}`}
            >
              {s.state === "done" ? <AnimatedCheck className="w-4 h-4" /> : s.n}
            </button>

            <div className="min-w-0 flex-1">
              <p
                className={`text-sm font-black leading-snug mb-1.5 ${
                  s.state === "active"
                    ? "text-[#0A5F7A]"
                    : s.state === "upcoming"
                    ? "text-slate-400"
                    : "text-[#0B3446]"
                }`}
              >
                {s.label}
              </p>
              <div className="rounded-lg border border-slate-200 p-2.5">
                <p className="text-[11px] font-extrabold text-[#0B3446] leading-snug">{s.status}</p>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5 break-words">
                  {s.detail}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </aside>
  );
});

/* ───────────────────────── STEP 1 ───────────────────────── */
const StepOne = memo(function StepOne({ booking, setBooking, setField, onSubmit }) {
  const [docSearch, setDocSearch] = useState("");
  const [schemeSearch, setSchemeSearch] = useState("");
  const deferredDoc = useDeferredValue(docSearch);
  const deferredScheme = useDeferredValue(schemeSearch);

  const doctorOptions = useMemo(() => {
    const q = deferredDoc.trim().toLowerCase();
    const list = q
      ? appointmentData.consultants.filter((d) => d.toLowerCase().includes(q))
      : appointmentData.consultants;
    return list.map((doc) => (
      <option key={doc} value={doc}>
        {doc}
      </option>
    ));
  }, [deferredDoc]);

  const schemeOptions = useMemo(() => {
    const q = deferredScheme.trim().toLowerCase();
    const list = q
      ? appointmentData.schemes.filter((s) => s.toLowerCase().includes(q))
      : appointmentData.schemes;
    return list.map((sch) => (
      <option key={sch} value={sch}>
        {sch}
      </option>
    ));
  }, [deferredScheme]);

  const on = (key) => (e) => setField(key, e.target.value);

  return (
    <m.form {...stepMotion} onSubmit={onSubmit} className="space-y-6 sm:space-y-7">
      {/* A. Patient */}
      <FormBlock
        first
        icon={User}
        title="Patient Demographics & Contact"
        desc="Tell us about the patient: legal name, age, gender, and mobile details."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 sm:gap-y-6">
          <Field label="Patient Name" htmlFor="f-name" required>
            <input
              id="f-name"
              type="text"
              required
              autoComplete="name"
              value={booking.patientName}
              onChange={on("patientName")}
              placeholder="ENTER PATIENT NAME"
              className={`${inputCls} uppercase`}
            />
          </Field>

          <Field label="Age of Patient" htmlFor="f-age" required>
            <div className="flex gap-2">
              <input
                id="f-age"
                type="number"
                inputMode="numeric"
                required
                min="0"
                value={booking.ageValue}
                onChange={on("ageValue")}
                placeholder="Enter Age"
                className={`${inputCls} min-w-0 flex-1`}
              />
              <SelectBox
                aria-label="Age unit"
                wrapCls="w-[42%] min-w-0"
                value={booking.ageUnit}
                onChange={on("ageUnit")}
                className="!pl-3"
              >
                <option value="Year">Year</option>
                <option value="Month">Month</option>
                <option value="Days">Days</option>
                <option value="Hours">Hours</option>
              </SelectBox>
            </div>
          </Field>

          <Field label="Patient Gender" htmlFor="f-gender" required>
            <SelectBox id="f-gender" required value={booking.gender} onChange={on("gender")}>
              <option value="MALE">Select Gender (MALE)</option>
              <option value="FEMALE">FEMALE</option>
              <option value="TRANSGENDER">TRANSGENDER</option>
            </SelectBox>
          </Field>

          <Field
            label="Contact"
            htmlFor="f-contact"
            required
            hint={
              <label className="mt-2 inline-flex items-center gap-1.5 cursor-pointer text-[11px] text-[#0A5F7A] font-bold leading-normal min-h-[24px]">
                <input
                  type="checkbox"
                  checked={booking.sameWhatsapp}
                  onChange={(e) =>
                    setBooking((b) => ({
                      ...b,
                      sameWhatsapp: e.target.checked,
                      whatsappNumber: e.target.checked ? b.contact : "",
                    }))
                  }
                  className="w-4 h-4 rounded border-slate-300 text-[#0A5F7A] focus:ring-[#0A5F7A]"
                />
                <span>Same whatsapp</span>
              </label>
            }
          >
            <input
              id="f-contact"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              value={booking.contact}
              onChange={(e) => {
                const v = e.target.value;
                setBooking((b) => ({
                  ...b,
                  contact: v,
                  whatsappNumber: b.sameWhatsapp ? v : b.whatsappNumber,
                }));
              }}
              placeholder="Enter Contact Number"
              className={inputCls}
            />
          </Field>

          <Field label="WhatsApp Number" htmlFor="f-wa">
            <input
              id="f-wa"
              type="tel"
              inputMode="tel"
              disabled={booking.sameWhatsapp}
              value={booking.sameWhatsapp ? booking.contact : booking.whatsappNumber}
              onChange={on("whatsappNumber")}
              placeholder="Enter WhatsApp Number"
              className={`${inputCls} disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-slate-50`}
            />
          </Field>
        </div>
      </FormBlock>

      {/* B. Address */}
      <FormBlock
        icon={MapPin}
        title="Residential Location & Address"
        desc="Where can we contact you? Provide locality, PIN code, district, and address."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 sm:gap-y-6">
          <Field label="PIN Code" htmlFor="f-pin">
            <input
              id="f-pin"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              value={booking.pinCode}
              onChange={on("pinCode")}
              placeholder="ENTER PIN CODE"
              className={`${inputCls} uppercase`}
            />
          </Field>

          <Field label="State" htmlFor="f-state" required>
            <SelectBox id="f-state" required value={booking.state} onChange={on("state")}>
              <option value="MADHYA PRADESH">MADHYA PRADESH</option>
              <option value="MAHARASHTRA">MAHARASHTRA</option>
              <option value="CHHATTISGARH">CHHATTISGARH</option>
              <option value="UTTAR PRADESH">UTTAR PRADESH</option>
            </SelectBox>
          </Field>

          <Field label="District" htmlFor="f-district" required>
            <SelectBox id="f-district" required value={booking.district} onChange={on("district")}>
              <option value="">Select District</option>
              {OPT_DISTRICTS}
            </SelectBox>
          </Field>

          <Field label="Tehsil" htmlFor="f-tehsil">
            <SelectBox id="f-tehsil" value={booking.tehsil} onChange={on("tehsil")}>
              <option value="">Select Tahsil Name</option>
              {OPT_TEHSILS}
            </SelectBox>
          </Field>

          <Field label="Village" htmlFor="f-village">
            <SelectBox id="f-village" value={booking.village} onChange={on("village")}>
              <option value="">Select Village Name</option>
              {OPT_VILLAGES}
            </SelectBox>
          </Field>

          <Field label="Ward Number" htmlFor="f-ward">
            <input
              id="f-ward"
              type="text"
              value={booking.wardNumber}
              onChange={on("wardNumber")}
              placeholder="Enter Ward Number"
              className={`${inputCls} !bg-amber-50/70 !border-amber-200`}
            />
          </Field>

          <Field label="Address" htmlFor="f-address" required className="sm:col-span-2">
            <input
              id="f-address"
              type="text"
              required
              autoComplete="street-address"
              value={booking.address}
              onChange={on("address")}
              placeholder="Enter Address"
              className={inputCls}
            />
          </Field>
        </div>
      </FormBlock>

      {/* C. Consultation */}
      <FormBlock
        icon={Stethoscope}
        title="Scheme Panel & Doctor Consultation"
        desc="Choose your doctor and applicable panel scheme."
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5 sm:gap-y-6">
          <Field label="Scheme Name" htmlFor="f-scheme" required>
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  aria-label="Filter scheme"
                  placeholder="Filter scheme..."
                  value={schemeSearch}
                  onChange={(e) => setSchemeSearch(e.target.value)}
                  className={`${filterCls} mt-1`}
                />
              </div>
              <SelectBox id="f-scheme" required value={booking.scheme} onChange={on("scheme")}>
                <option value="">Select Scheme Name</option>
                {schemeOptions}
              </SelectBox>
            </div>
          </Field>

          <Field label="Consultant" htmlFor="f-doctor" required>
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  aria-label="Filter doctor"
                  placeholder="Filter doctor..."
                  value={docSearch}
                  onChange={(e) => setDocSearch(e.target.value)}
                  className={`${filterCls} mt-1`}
                />
              </div>
              <SelectBox
                id="f-doctor"
                required
                value={booking.consultant}
                onChange={on("consultant")}
              >
                <option value="">Select Doctors</option>
                {doctorOptions}
              </SelectBox>
            </div>
          </Field>

          <Field label="Appointment Date" htmlFor="f-date" required>
            <div className="relative">
              <Calendar className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0A5F7A]" />
              <input
                id="f-date"
                type="date"
                required
                value={booking.appointmentDate}
                onChange={on("appointmentDate")}
                className={`${inputCls} pr-10`}
              />
            </div>
          </Field>
        </div>
      </FormBlock>

      <div className="pt-1 flex justify-end">
        <button type="submit" className={goldBtnCls} style={goldGradientStyle}>
          <span className="ap-btn-sheen" />
          <span className="relative">Proceed to Slot Booking</span>
          <ArrowRight className="relative w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </m.form>
  );
});

/* ───────────────────────── STEP 2 ───────────────────────── */
const SlotButton = memo(function SlotButton({ s, selected, onSelect }) {
  const isVisitors = s.note === "Visitors Only";
  return (
    <button
      type="button"
      onClick={() => onSelect(s.time)}
      aria-pressed={selected}
      className={`relative min-h-[88px] p-3 sm:p-4 rounded-2xl border text-center transition-all duration-200 flex flex-col items-center justify-between gap-2 cursor-pointer hover:-translate-y-1 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1D82A6]/30 [touch-action:manipulation] ${
        selected
          ? "scale-[1.03] bg-gradient-to-br from-[#0A5F7A] to-[#1D82A6] border-[#0A5F7A] text-white shadow-xl ring-2 ring-[#F6D98A]"
          : isVisitors
          ? "bg-amber-100/70 border-amber-300 text-amber-900 hover:bg-amber-200"
          : "bg-white border-slate-200 text-slate-800 hover:border-[#1D82A6]/50 hover:bg-[#EDF6FB]"
      }`}
    >
      {selected && (
        <span className="ap-pop absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#F6D98A] text-[#3A2B0A] flex items-center justify-center shadow-md">
          <CheckCircle2 className="w-4 h-4" />
        </span>
      )}
      <div className={`p-2 rounded-xl ${selected ? "bg-white/20" : "bg-[#EDF6FB] text-[#0A5F7A]"}`}>
        <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-black tracking-tight leading-normal">{formatTime(s.time)}</div>
        <div
          className={`text-[10px] font-bold uppercase tracking-wider leading-normal ${
            selected ? "text-[#F6D98A]" : "text-emerald-600"
          }`}
        >
          {selected ? "Selected" : "Available"}
        </div>
        {s.note && (
          <div className="text-[10px] font-black mt-1 px-2 py-0.5 rounded bg-rose-600 text-white inline-block leading-normal">
            {s.note}
          </div>
        )}
      </div>
    </button>
  );
});

const SummaryTile = memo(function SummaryTile({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-[#EDF6FB] border border-[#1D82A6]/15 px-3.5 py-3 min-w-0">
      <div className="w-9 h-9 rounded-xl bg-white text-[#0A5F7A] flex items-center justify-center shadow-sm shrink-0">
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 leading-normal">
          {label}
        </p>
        <p className="text-xs font-extrabold text-[#0B3446] leading-snug break-words">{value}</p>
      </div>
    </div>
  );
});

const StepTwo = memo(function StepTwo({ booking, onSelectSlot, onBack, onConfirm }) {
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  const groupedSlots = useMemo(() => {
    const groups = { Morning: [], Afternoon: [], Evening: [] };
    appointmentData.timeSlots.forEach((s) => groups[slotPeriod(s.time)].push(s));
    return Object.entries(groups).filter(([, list]) => list.length > 0);
  }, []);

  return (
    <m.div {...stepMotion} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
        <SummaryTile icon={User} label="Patient" value={booking.patientName || "Patient"} />
        <SummaryTile icon={Stethoscope} label="Doctor" value={booking.consultant || "Select Doctors"} />
        <SummaryTile icon={Calendar} label="Date" value={formatDate(booking.appointmentDate)} />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="min-w-0">
          <h3
            ref={headingRef}
            tabIndex={-1}
            className="text-sm sm:text-base font-extrabold text-[#0B3446] leading-snug outline-none"
          >
            Select Your Preferred Time
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Choose an available time window for your visit.
          </p>
        </div>

        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF9EC] border border-[#C8952E]/30 text-xs font-bold text-[#0A5F7A] self-start sm:self-auto"
          aria-live="polite"
        >
          <span>Selected Slot:</span>
          <span key={booking.slot} className="ap-pop text-[#B8841F] font-extrabold">
            {formatTime(booking.slot)}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {groupedSlots.map(([period, list]) => {
          const meta = periodMeta[period];
          const PIcon = meta.icon;
          return (
            <div key={period}>
              <div className="flex items-center gap-2.5 mb-3">
                <div
                  className={`w-8 h-8 rounded-xl bg-gradient-to-br ${meta.tint} text-white flex items-center justify-center shadow-md`}
                >
                  <PIcon className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-black text-[#0B3446] leading-normal uppercase tracking-wider">
                  {period}
                </h4>
                <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent" />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-2.5 sm:gap-3">
                {list.map((s) => (
                  <SlotButton
                    key={s.time}
                    s={s}
                    selected={booking.slot === s.time}
                    onSelect={onSelectSlot}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-5 border-t border-slate-100 flex flex-col-reverse sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
        <button
          type="button"
          onClick={onBack}
          className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1D82A6]/25 [touch-action:manipulation]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Edit Patient Info</span>
        </button>

        <button type="button" onClick={onConfirm} className={goldBtnCls} style={goldGradientStyle}>
          <span className="ap-btn-sheen" />
          <span className="relative">Confirm & Generate Registration Pass</span>
          <ChevronRight className="relative w-4 h-4" />
        </button>
      </div>
    </m.div>
  );
});

/* ───────────────────────── STEP 3 ───────────────────────── */
const StepThree = memo(function StepThree({ booking, passId, onReset }) {
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true });
  }, []);

  const extras = [
    ["Age / Gender", `${booking.ageValue} ${booking.ageUnit} • ${booking.gender}`],
    ["Scheme", booking.scheme || "N/A"],
    ["Contact", booking.contact],
  ];

  return (
    <m.div {...stepMotion} className="relative text-center space-y-6 sm:space-y-7">
      <div className="absolute inset-x-0 top-0 h-44 pointer-events-none overflow-hidden" aria-hidden="true">
        {CONFETTI.map((c, i) => (
          <span
            key={i}
            className="ap-confetti absolute top-0 left-1/2 w-2 h-3 rounded-sm"
            style={{ "--x": `${c.x}px`, animationDelay: `${c.delay}s`, background: c.color }}
          />
        ))}
      </div>

      <div className="relative mx-auto w-20 h-20 sm:w-24 sm:h-24">
        <span className="absolute inset-0 rounded-full bg-emerald-400/40 animate-ping" />
        <m.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.1 }}
          className="relative w-full h-full rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-white flex items-center justify-center shadow-[0_20px_40px_rgba(16,185,129,0.35)]"
        >
          <AnimatedCheck className="w-10 h-10 sm:w-12 sm:h-12" />
        </m.div>
      </div>

      <div>
        <h3
          ref={headingRef}
          tabIndex={-1}
          className="text-2xl sm:text-3xl font-black text-emerald-950 leading-snug outline-none"
        >
          Registration Confirmed!
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto mt-1.5 leading-relaxed">
          Your appointment is ready. It has been logged for{" "}
          <span className="font-bold text-[#0B3446]">{booking.patientName}</span>.
        </p>
        <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-[11px] font-bold text-emerald-700">
          <Ticket className="w-3.5 h-3.5" />
          Appointment pass generated
        </span>
      </div>

      {/* PASS TICKET */}
      <div
        id="pass-ticket"
        className="relative rounded-3xl bg-gradient-to-br from-[#06384A] via-[#0A5F7A] to-[#0D2E3A] text-white max-w-lg mx-auto text-left text-xs shadow-[0_30px_60px_rgba(6,56,74,0.4)] overflow-hidden border border-white/20"
      >
        <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-[#F6D98A]/15 blur-2xl pointer-events-none" />
        <div className="absolute top-[46%] -left-3 w-6 h-6 rounded-full bg-white" />
        <div className="absolute top-[46%] -right-3 w-6 h-6 rounded-full bg-white" />

        <div className="relative p-4 sm:p-6 space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-2 pb-3 border-b border-dashed border-white/25">
            <span className="inline-flex items-center gap-2 font-black text-[#F6D98A] tracking-[0.16em] uppercase text-[10px] leading-normal">
              <HeartPulse className="w-4 h-4" />
              Apollo Hospitals
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold leading-normal">
              CONFIRMED
            </span>
          </div>

          <div>
            <span className="text-slate-300 block text-[10px] uppercase tracking-wider leading-normal">
              Pass ID
            </span>
            <span className="font-black text-[#F6D98A] tracking-wider text-sm leading-snug">
              {passId}
            </span>
          </div>

          <div className="min-w-0">
            <span className="text-slate-300 block text-[10px] uppercase tracking-wider leading-normal">
              Patient
            </span>
            <span className="font-black uppercase text-base leading-snug break-words">
              {booking.patientName}
            </span>
          </div>

          <div className="min-w-0">
            <span className="text-slate-300 block text-[10px] uppercase tracking-wider leading-normal">
              Consultant
            </span>
            <span className="font-bold text-[#F6D98A] leading-snug break-words">
              {booking.consultant || "Select Doctors"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-slate-300 block text-[10px] uppercase tracking-wider leading-normal">
                Date
              </span>
              <span className="font-bold leading-snug">{formatDate(booking.appointmentDate)}</span>
            </div>
            <div>
              <span className="text-slate-300 block text-[10px] uppercase tracking-wider leading-normal">
                Time
              </span>
              <span className="font-bold leading-snug">{formatTime(booking.slot)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-3 border-t border-dashed border-white/25 text-[11px]">
            {extras.map(([label, value]) => (
              <div key={label} className="min-w-0">
                <span className="text-slate-300 block text-[10px] uppercase leading-normal">
                  {label}:
                </span>
                <span className="font-bold leading-snug break-words">{value}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-dashed border-white/25 flex items-end justify-center gap-[2px] sm:gap-[3px] h-12 sm:h-14">
            {BARCODE.map((b, i) => (
              <span
                key={i}
                className="bg-white/80 rounded-[1px]"
                style={{ width: b.w, height: `${b.h}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => window.print()}
          className="w-full sm:w-auto min-h-[48px] px-8 py-3 rounded-2xl text-[#3A2B0A] text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:-translate-y-0.5 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#F6D98A]/60 [touch-action:manipulation]"
          style={goldGradientStyle}
        >
          <Printer className="w-4 h-4" />
          <span>Print Pass</span>
        </button>
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto min-h-[48px] px-8 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#1D82A6]/25 [touch-action:manipulation]"
        >
          Book Another Appointment
        </button>
      </div>
    </m.div>
  );
});

/* ───────────────────────── PAGE ───────────────────────── */
export default function MakeAppointmentPage() {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState(INITIAL_BOOKING);
  const [passId, setPassId] = useState("APO-JBP-9921");
  const journeyRef = useRef(null);

  const setField = useCallback(
    (key, value) => setBooking((b) => ({ ...b, [key]: value })),
    []
  );

  const scrollToJourney = useCallback(() => {
    requestAnimationFrame(() =>
      journeyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
    );
  }, []);

  const handleNextToSlots = useCallback(
    (e) => {
      e.preventDefault();
      setStep(2);
      scrollToJourney();
    },
    [scrollToJourney]
  );

  const handleFinalSubmit = useCallback(() => {
    setPassId(makePassId());
    setStep(3);
    scrollToJourney();
  }, [scrollToJourney]);

  const goToStep1 = useCallback(() => {
    setStep(1);
    scrollToJourney();
  }, [scrollToJourney]);

  /* completed steps in the stepper / timeline are clickable */
  const goTo = useCallback(
    (n) => {
      if (n < step) {
        setStep(n);
        scrollToJourney();
      }
    },
    [step, scrollToJourney]
  );

  const handleReset = useCallback(() => {
    setBooking(INITIAL_BOOKING);
    setStep(1);
    scrollToJourney();
  }, [scrollToJourney]);

  const handleSelectSlot = useCallback(
    (time) => setBooking((b) => (b.slot === time ? b : { ...b, slot: time })),
    []
  );

  /* journey data shared by stepper, step list and timeline */
  const items = useMemo(
    () =>
      STEPS.map((s) => {
        const state =
          step > s.n || (s.n === 3 && step === 3) ? "done" : step === s.n ? "active" : "upcoming";

        const status =
          state === "done"
            ? s.n === 3
              ? "Generated"
              : "Completed"
            : state === "active"
            ? "In progress"
            : s.n === 3
            ? "Locked"
            : "Upcoming";

        let short;
        let detail;
        if (s.n === 1) {
          short =
            state === "done"
              ? "Patient information completed."
              : "Patient, address and doctor details.";
          detail =
            state === "done"
              ? `${booking.patientName} • ${booking.ageValue} ${booking.ageUnit} • ${booking.gender}`
              : "Fill in patient, address and consultation details.";
        } else if (s.n === 2) {
          short =
            state === "done" ? "Appointment slot selected." : "Select an available slot.";
          detail =
            state === "done"
              ? `${formatDate(booking.appointmentDate)} • ${formatTime(booking.slot)}`
              : state === "active"
              ? "Select an available slot for your consultation."
              : "Choose your time after patient details.";
        } else {
          short = state === "done" ? "Your digital pass is ready." : "Your digital pass.";
          detail =
            state === "done"
              ? `Pass ${passId} generated.`
              : "Unlocks after you confirm your slot.";
        }

        return { ...s, state, status, short, detail, clickable: s.n < step };
      }),
    [
      step,
      booking.patientName,
      booking.ageValue,
      booking.ageUnit,
      booking.gender,
      booking.appointmentDate,
      booking.slot,
      passId,
    ]
  );

  return (
    <LazyMotion features={domAnimation} strict>
      <main className="relative min-h-screen bg-[#EEF5F9] text-slate-900 pt-28 sm:pt-36 xl:pt-40 pb-16 sm:pb-24 selection:bg-[#1D82A6] selection:text-white overflow-hidden">
        {/* static background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 -left-40 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] rounded-full bg-gradient-to-br from-[#1D82A6]/25 via-[#0A5F7A]/15 to-transparent sm:blur-3xl" />
          <div className="absolute top-1/2 -right-40 w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] rounded-full bg-gradient-to-br from-[#F6D98A]/35 via-[#C8952E]/15 to-transparent sm:blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.3]"
            style={{
              backgroundImage: "radial-gradient(#1D82A6 1px, transparent 1px)",
              backgroundSize: "28px 28px",
              maskImage:
                "radial-gradient(ellipse 80% 50% at 50% 20%, black 10%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 50% at 50% 20%, black 10%, transparent 75%)",
            }}
          />
        </div>

        <div className="relative z-10 max-w-[88rem] mx-auto px-3 sm:px-6 lg:px-8">
          <Hero
            consultant={booking.consultant}
            date={booking.appointmentDate}
            slot={booking.slot}
          />

          {/* ───── journey ───── */}
          <div ref={journeyRef} className="scroll-mt-28 sm:scroll-mt-36 xl:scroll-mt-40 space-y-4 sm:space-y-5">
            <TopStepper items={items} onGo={goTo} />

            <div className="grid grid-cols-1 lg:grid-cols-[250px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)_290px] gap-4 sm:gap-5 items-start">
              <div className="lg:sticky lg:top-36 xl:top-40">
                <StepList items={items} />
              </div>

              {/* center: form card */}
              <div className="min-w-0 space-y-4">
                <StepBanner step={step} items={items} />

                <section
                  aria-live="polite"
                  className="rounded-[1.5rem] sm:rounded-3xl bg-white border border-slate-100 shadow-[0_20px_60px_rgba(10,95,122,0.12)] p-4 sm:p-7 lg:p-8"
                >
                  <div className="flex items-start justify-between gap-4 pb-5 mb-6 border-b border-slate-100">
                    <div className="min-w-0">
                      <p className="text-xs text-slate-500 leading-normal">Appointment process</p>
                      <h2
                        key={step}
                        className="ap-in font-serif-apollo text-2xl sm:text-3xl font-black text-[#0B3446] leading-snug"
                      >
                        {HEAD[step].title}
                      </h2>
                      <p className="text-xs sm:text-sm font-semibold text-[#0A5F7A] mt-0.5 leading-normal">
                        {HEAD[step].next}
                      </p>
                    </div>
                    <ProgressRing value={step} total={3} />
                  </div>

                  <AnimatePresence mode="wait" initial={false}>
                    {step === 1 && (
                      <StepOne
                        key="s1"
                        booking={booking}
                        setBooking={setBooking}
                        setField={setField}
                        onSubmit={handleNextToSlots}
                      />
                    )}
                    {step === 2 && (
                      <StepTwo
                        key="s2"
                        booking={booking}
                        onSelectSlot={handleSelectSlot}
                        onBack={goToStep1}
                        onConfirm={handleFinalSubmit}
                      />
                    )}
                    {step === 3 && (
                      <StepThree
                        key="s3"
                        booking={booking}
                        passId={passId}
                        onReset={handleReset}
                      />
                    )}
                  </AnimatePresence>
                </section>
              </div>

              <div className="xl:sticky xl:top-40">
                <Timeline items={items} onGo={goTo} />
              </div>
            </div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes apIn {
            from { opacity: 0; transform: translateY(14px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .ap-in { animation: apIn 0.45s cubic-bezier(0.22, 1, 0.36, 1) both; }

          @keyframes apSpin { to { transform: rotate(360deg); } }
          .ap-spin { animation: apSpin 40s linear infinite; }

          @keyframes apFloat {
            0%, 100% { transform: translateY(0); }
            50%      { transform: translateY(-8px); }
          }
          .ap-float  { animation: apFloat 6s ease-in-out infinite; }
          .ap-float2 { animation: apFloat 5s ease-in-out infinite reverse; }

          @keyframes apShimmerText {
            from { background-position: 0% 0; }
            to   { background-position: 200% 0; }
          }
          .ap-shimmer-text {
            background-size: 200% 100%;
            animation: apShimmerText 5s linear infinite;
          }

          @keyframes apPop {
            0%   { transform: scale(0.4); opacity: 0; }
            70%  { transform: scale(1.12); opacity: 1; }
            100% { transform: scale(1); }
          }
          .ap-pop { animation: apPop 0.28s ease-out both; display: inline-block; }

          @keyframes apCheck { to { stroke-dashoffset: 0; } }
          .ap-check {
            stroke-dasharray: 1;
            stroke-dashoffset: 1;
            animation: apCheck 0.45s ease-out 0.1s forwards;
          }

          @keyframes apRing {
            0%   { transform: scale(1);   opacity: 0.6; }
            100% { transform: scale(1.5); opacity: 0; }
          }
          .ap-ring { animation: apRing 1.8s ease-out infinite; }

          @keyframes apConfetti {
            0%   { transform: translate(0, -10px) rotate(0); opacity: 0; }
            15%  { opacity: 1; }
            100% { transform: translate(var(--x), 150px) rotate(360deg); opacity: 0; }
          }
          .ap-confetti { animation: apConfetti 1.8s ease-out both; }

          .ap-btn-sheen {
            position: absolute;
            top: 0; bottom: 0; left: -60%;
            width: 40%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent);
            transform: skewX(-20deg);
            transition: left 0.7s ease;
            pointer-events: none;
          }
          .group:hover .ap-btn-sheen { left: 150%; }

          @media (prefers-reduced-motion: reduce) {
            .ap-in, .ap-spin, .ap-float, .ap-float2, .ap-shimmer-text,
            .ap-pop, .ap-ring, .ap-confetti, .animate-ping {
              animation: none !important;
            }
            .ap-check { stroke-dashoffset: 0; animation: none; }
          }

          @media print {
            body * { visibility: hidden !important; }
            #pass-ticket, #pass-ticket * { visibility: visible !important; }
            #pass-ticket {
              position: absolute; left: 0; top: 0; width: 100%;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        `}</style>
      </main>
    </LazyMotion>
  );
}