"use client";

import React, { useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Stethoscope,
  Megaphone,
  ClipboardList,
  BookOpen,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Plus,
  Layers,
  Users,
  ShieldCheck,
  Briefcase,
  MessageSquareText,
  Clock,
  Inbox,
  BarChart3,
  PieChart,
  CalendarClock,
  Activity,
} from "lucide-react";
import { DonutChart, RadialGauge } from "@/components/admin/Charts";
import { Card, StatusBadge, Avatar, btnGhost, fmtDate } from "@/components/admin/ui";
import { displayFont, numFont } from "@/components/admin/fonts";
import { ADMIN_BASE, EVENTS, DOCTORS } from "@/lib/admin-data";
import useDashboardStats from "@/hooks/useDashboardStats";
import useDoctors from "@/hooks/useDoctors";
import useAppointments from "@/hooks/useAppointments";

/* ── Animated count-up hook ───────────────────────── */
function useCountUp(target, ms = 900) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (typeof target !== "number") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setV(target);
      return;
    }
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / ms);
      setV(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}

/* ── Helpers ──────────────────────────────────────── */
const localKey = (d) => d.toLocaleDateString("en-CA"); // YYYY-MM-DD
const hm = (d) =>
  `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;

// Glossy gradient used for every icon chip, so all cards share one look
const chipStyle = (c) => ({
  background: `linear-gradient(140deg, color-mix(in srgb, ${c} 70%, white), ${c})`,
  boxShadow: `0 6px 14px -6px color-mix(in srgb, ${c} 80%, transparent), inset 0 1px 0 rgb(255 255 255 / .35)`,
});

// Map a raw appointment row (hospital API or legacy shape) to what the UI needs
function normalizeAppointment(a, i) {
  const rawDate = String(a.book_apdate ?? a.date ?? "");
  return {
    id: String(a.book_id ?? a.id ?? `AP${i + 1}`),
    patient: a.book_name ?? a.patient ?? "Unknown patient",
    doctor: a.doctor_name ?? a.book_drnam ?? a.doctor ?? "",
    dateKey: rawDate.slice(0, 10),
    time: a.slot_time ? String(a.slot_time).substring(0, 5) : (a.time ?? ""),
    entry: String(a.book_entrydt ?? ""),
    status: a.status || "Confirmed",
  };
}

// Counts per day (last 7 days) or per month (last 6 months), from real data
function buildSeries(list, range, now) {
  if (!now) return [];
  if (range === "Weekly") {
    return Array.from({ length: 7 }, (_, n) => {
      const d = new Date(now);
      d.setDate(now.getDate() - (6 - n));
      const key = localKey(d);
      return {
        label: d.toLocaleDateString("en-IN", { weekday: "short" }),
        full: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
        value: list.filter((a) => a.dateKey === key).length,
      };
    });
  }
  return Array.from({ length: 6 }, (_, n) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - n), 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    return {
      label: d.toLocaleDateString("en-IN", { month: "short" }),
      full: d.toLocaleDateString("en-IN", { month: "long", year: "numeric" }),
      value: list.filter((a) => a.dateKey.slice(0, 7) === key).length,
    };
  });
}

/* ── Constants ────────────────────────────────────── */
const KPIS = [
  { key: "appointments", label: "Appointments", icon: CalendarCheck, color: "#0A5F7A", href: `${ADMIN_BASE}/appointments` },
  { key: "doctors", label: "Doctors", icon: Stethoscope, color: "#D97706", href: `${ADMIN_BASE}/doctors` },
  { key: "specialties", label: "Specialties", icon: Layers, color: "#0D9488", href: `${ADMIN_BASE}/specialties` },
  { key: "events", label: "Events", icon: Megaphone, color: "#E11D48", href: `${ADMIN_BASE}/events` },
  { key: "caseStudies", label: "Case studies", icon: ClipboardList, color: "#4F46E5", href: `${ADMIN_BASE}/case-studies` },
  { key: "articles", label: "Health articles", icon: BookOpen, color: "#B45309", href: `${ADMIN_BASE}/health-library` },
  { key: "users", label: "Admin users", icon: ShieldCheck, color: "#7C3AED", href: `${ADMIN_BASE}/users` },
  { key: "careers", label: "Careers", icon: Briefcase, color: "#0891B2", href: `${ADMIN_BASE}/careers` },
  { key: "inquiries", label: "Inquiries", icon: MessageSquareText, color: "#D97706", href: `${ADMIN_BASE}/inquiries` },
];

const STATUS_COLORS = {
  Confirmed: "#059669",
  Pending: "#D97706",
  Rescheduled: "#0284C7",
  Completed: "#64748B",
  Cancelled: "#E11D48",
};
const DEPT_COLORS = ["#D97706", "#0A5F7A", "#0D9488", "#4F46E5", "#E11D48", "#0891B2"];

const QUICK = [
  { label: "Add doctor", href: `${ADMIN_BASE}/doctors`, icon: Stethoscope, color: "#0A5F7A" },
  { label: "New event", href: `${ADMIN_BASE}/events`, icon: Megaphone, color: "#E11D48" },
  { label: "Publish article", href: `${ADMIN_BASE}/health-library`, icon: BookOpen, color: "#7C3AED" },
  { label: "Post a job", href: `${ADMIN_BASE}/careers`, icon: Briefcase, color: "#0891B2" },
  { label: "View inquiries", href: `${ADMIN_BASE}/inquiries`, icon: MessageSquareText, color: "#D97706" },
  { label: "Manage users", href: `${ADMIN_BASE}/users`, icon: Users, color: "#4F46E5" },
];

/* ── Building blocks ──────────────────────────────── */

/** Section card: soft coloured top edge + overflow clipped */
/* Soft decorative glow in a card corner */
function CornerGlow({ color = "#0A5F7A", className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute -z-10 rounded-full blur-3xl ${className}`}
      style={{ backgroundColor: color, opacity: 0.12 }}
    />
  );
}

function Panel({ color = "#0A5F7A", glow = "-right-16 -top-16", className = "", children }) {
  return (
    <Card className={`isolate overflow-hidden ${className}`}>
      <CornerGlow color={color} className={`h-52 w-52 ${glow}`} />
      {children}
    </Card>
  );
}

function SectionHeader({ title, subtitle, href, hrefLabel = "View all", icon: Icon, color = "#0A5F7A" }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        {Icon && (
          <span
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white"
            style={chipStyle(color)}
          >
            <Icon className="h-[17px] w-[17px]" strokeWidth={2.2} />
          </span>
        )}
        <div className="min-w-0">
          <h2
            className={`${displayFont.className} truncate text-base font-bold tracking-tight text-slate-900 sm:text-lg`}
          >
            {title}
          </h2>
          {subtitle && <p className="truncate text-xs text-slate-500">{subtitle}</p>}
        </div>
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold text-[#0A5F7A] transition hover:bg-teal-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5F7A]"
        >
          {hrefLabel} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}

function EmptyNote({ icon: Icon = Inbox, children }) {
  return (
    <div className="grid place-items-center px-4 py-10 text-center">
      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-100 text-slate-400">
        <Icon className="h-5 w-5" />
      </span>
      <p className="mt-2 max-w-xs text-xs text-slate-500">{children}</p>
    </div>
  );
}

/* ── Sparkline (real data, smooth curve) ──────────── */
function Sparkline({ data }) {
  const gid = useId().replace(/:/g, "");
  const W = 240,
    H = 64;
  const max = Math.max(1, ...data);
  const pts = data.map((v, i) => [
    (i / Math.max(1, data.length - 1)) * W,
    H - 8 - (v / max) * (H - 18),
  ]);
  if (pts.length < 2) return <div className="h-16" />;

  let d = `M ${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const mx = (x0 + x1) / 2;
    d += ` C ${mx} ${y0}, ${mx} ${y1}, ${x1} ${y1}`;
  }
  const last = pts[pts.length - 1];

  return (
    <div className="relative h-16 w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${d} L ${W} ${H} L 0 ${H} Z`} fill={`url(#${gid})`} />
        <path
          d={d}
          fill="none"
          stroke="#FCD34D"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span
        className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2"
        style={{ left: "100%", top: `${(last[1] / H) * 100}%` }}
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-amber-300/60 motion-reduce:hidden" />
        <span className="absolute inset-0 rounded-full bg-amber-300 ring-2 ring-[#0A5F7A]" />
      </span>
    </div>
  );
}

/* ── Featured KPI (Appointments) ──────────────────── */
function FeaturedStat({ item, stat, series, pending, today, loading }) {
  const n = useCountUp(stat.value);
  const hasValue = typeof stat.value === "number";
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      aria-label={`Open ${item.label}`}
      className="group relative flex h-full min-h-[210px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-[#06303F] via-[#0A5F7A] to-[#0E7FA3] p-4 text-white shadow-[0_14px_36px_-16px_rgba(10,95,122,0.7)] ring-1 ring-inset ring-white/10 transition duration-300 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-5"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse at 80% 0%, black, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 80% 0%, black, transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full bg-amber-300/25 blur-3xl"
      />

      <div className="relative flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 py-1 pl-1.5 pr-2.5 text-[11px] font-bold ring-1 ring-inset ring-white/20 backdrop-blur">
          <span className="grid h-5 w-5 place-items-center rounded-full bg-amber-300 text-[#06303F]">
            <Icon className="h-3 w-3" strokeWidth={2.6} />
          </span>
          {item.label}
        </span>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 ring-1 ring-inset ring-white/20 transition group-hover:bg-amber-300 group-hover:text-[#06303F]">
          <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-px group-hover:-translate-y-px" />
        </span>
      </div>

      <div className="relative mt-3 flex items-end justify-between gap-3">
        <div>
          {stat.loading ? (
            <div className="h-11 w-24 animate-pulse rounded-lg bg-white/20" />
          ) : hasValue ? (
            <p className={`${numFont.className} text-5xl font-extrabold leading-none tracking-tight`}>
              {n.toLocaleString("en-IN")}
            </p>
          ) : (
            <p className="text-5xl font-extrabold leading-none text-white/40">—</p>
          )}
          <p className="mt-1.5 text-[11px] font-medium text-teal-100/90">
            {stat.error && !hasValue ? "Offline" : "total bookings"}
          </p>
        </div>

        <div className="flex flex-col items-end gap-1.5 text-[11px] font-bold">
          <span className="rounded-full bg-amber-300/15 px-2.5 py-1 text-amber-200 ring-1 ring-inset ring-amber-300/30">
            {loading ? "…" : pending} pending
          </span>
          <span className="rounded-full bg-white/10 px-2.5 py-1 ring-1 ring-inset ring-white/20">
            {loading ? "…" : today} today
          </span>
        </div>
      </div>

      <div className="relative mt-3">
        <Sparkline data={series.map((s) => s.value)} />
        <div className="mt-1 flex justify-between text-[9px] font-semibold uppercase tracking-wider text-teal-100/70">
          {series.map((s) => (
            <span key={s.full}>{s.label}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}

/* ── Compact KPI tile with gradient hairline border ── */
function StatTile({ item, stat }) {
  const n = useCountUp(stat.value);
  const hasValue = typeof stat.value === "number";
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      aria-label={`Open ${item.label}`}
      style={{ "--c": item.color }}
      className="group block h-full rounded-2xl bg-gradient-to-br from-slate-200 via-slate-200/70 to-slate-100 p-px transition duration-300 hover:-translate-y-0.5 hover:from-[color:var(--c)] hover:via-[color:color-mix(in_srgb,var(--c)_30%,white)] hover:to-slate-100 hover:shadow-[0_12px_28px_-14px_color-mix(in_srgb,var(--c)_70%,transparent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--c)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <div className="relative flex h-full flex-col justify-between gap-3 overflow-hidden rounded-[15px] bg-white p-3">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 -top-2 h-16 w-16 opacity-60 transition-opacity group-hover:opacity-100"
          style={{
            backgroundImage:
              "radial-gradient(color-mix(in srgb, var(--c) 45%, transparent) 1px, transparent 1.2px)",
            backgroundSize: "7px 7px",
            maskImage: "radial-gradient(circle at 100% 0%, black, transparent 70%)",
            WebkitMaskImage: "radial-gradient(circle at 100% 0%, black, transparent 70%)",
          }}
        />

        <span
          className="relative grid h-9 w-9 place-items-center rounded-xl text-white"
          style={chipStyle("var(--c)")}
        >
          <Icon className="h-[17px] w-[17px]" strokeWidth={2.2} />
        </span>

        <div className="relative min-w-0">
          {stat.loading ? (
            <div className="h-6 w-10 animate-pulse rounded bg-slate-200" />
          ) : hasValue ? (
            <p className={`${numFont.className} text-2xl font-extrabold leading-none tracking-tight text-slate-900`}>
              {n.toLocaleString("en-IN")}
            </p>
          ) : (
            <p className="text-2xl font-extrabold leading-none text-slate-300">—</p>
          )}
          <p className="mt-1 truncate text-[11px] font-semibold text-slate-500">
            {item.label}
            {stat.error && !hasValue && (
              <span className="ml-1 font-bold text-rose-600">· Offline</span>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}

/* ── Bar chart: ghost tracks, gridlines, peak highlighted ── */
function BarChart({ data, animate }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const peakIdx = data.some((d) => d.value > 0)
    ? data.findIndex((d) => d.value === Math.max(...data.map((x) => x.value)))
    : -1;

  return (
    <div
      className="relative"
      role="img"
      aria-label={`Appointments: ${data.map((d) => `${d.full} ${d.value}`).join(", ")}`}
    >
      {/* gridlines */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex h-40 flex-col justify-between sm:h-48">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="block h-px w-full border-t border-dashed border-slate-200" />
        ))}
      </div>

      <div className="relative flex items-end gap-2 sm:gap-4">
        {data.map((d, i) => {
          const isPeak = i === peakIdx;
          const pct = animate ? Math.max((d.value / max) * 100, d.value ? 5 : 0) : 0;
          return (
            <div
              key={d.full}
              className="group flex min-w-0 flex-1 flex-col items-center gap-2"
              title={`${d.full}: ${d.value}`}
            >
              <div className="relative flex h-40 w-full items-end sm:h-48">
                <div className="absolute inset-x-0 bottom-0 top-0 rounded-t-xl bg-slate-50 transition-colors group-hover:bg-slate-100/80" />
                <div
                  className={`relative w-full rounded-t-xl transition-all duration-700 ease-out motion-reduce:transition-none ${
                    isPeak
                      ? "bg-gradient-to-t from-[#D97706] to-[#FBBF24] shadow-[0_8px_18px_-8px_rgba(217,119,6,0.7)]"
                      : "bg-gradient-to-t from-[#0A5F7A] to-[#2BA3C8] group-hover:from-[#084a60] group-hover:to-[#0A5F7A]"
                  }`}
                  style={{ height: `${pct}%`, transitionDelay: `${i * 60}ms` }}
                >
                  <span
                    className={`${numFont.className} absolute -top-5 left-1/2 -translate-x-1/2 text-[11px] font-bold ${
                      isPeak ? "text-amber-600" : "text-slate-600"
                    }`}
                  >
                    {d.value}
                  </span>
                </div>
              </div>
              <span
                className={`text-[10px] font-semibold sm:text-[11px] ${
                  isPeak ? "text-amber-600" : "text-slate-500"
                }`}
              >
                {d.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Page ─────────────────────────────────────────── */
export default function DashboardPage({ initialUser }) {
  const [range, setRange] = useState("Weekly");
  const [now, setNow] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [userName, setUserName] = useState(initialUser?.name || "");

  const { stats, loading: statsLoading, error: statsError } = useDashboardStats();
  const { doctors: liveDoctors } = useDoctors();
  const {
    appointments: liveAppointments,
    loading: appointmentsLoading,
    error: appointmentsError,
  } = useAppointments();

  useEffect(() => {
    setNow(new Date());

    fetch("/api/admin/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.success && data.user?.name) setUserName(data.user.name);
      })
      .catch(() => {});

    const id = setInterval(() => setNow(new Date()), 30000);
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => {
      clearInterval(id);
      cancelAnimationFrame(raf);
    };
  }, []);

  const hour = now ? now.getHours() : 9;
  const greet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const timeStr = now
    ? now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
    : "--:--";
  const dateStr = now
    ? now.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
    : "";

  /* ── Appointments (live) ── */
  const appts = useMemo(
    () => (Array.isArray(liveAppointments) ? liveAppointments.map(normalizeAppointment) : []),
    [liveAppointments],
  );
  const apptsLoading = appointmentsLoading && !appts.length;

  const pending = appts.filter((a) => a.status === "Pending").length;
  const todayCount = now ? appts.filter((a) => a.dateKey === localKey(now)).length : 0;

  // next appointment still to come today
  const nowHM = now ? hm(now) : "";
  const nextUp = useMemo(() => {
    if (!now) return null;
    const key = localKey(now);
    return (
      appts
        .filter(
          (a) =>
            a.dateKey === key &&
            a.time &&
            a.time >= nowHM &&
            !["Cancelled", "Completed"].includes(a.status),
        )
        .sort((a, b) => a.time.localeCompare(b.time))[0] || null
    );
  }, [appts, now, nowHM]);

  const recent = useMemo(
    () =>
      [...appts]
        .sort((a, b) => (b.entry || b.dateKey).localeCompare(a.entry || a.dateKey))
        .slice(0, 6),
    [appts],
  );

  const series = useMemo(() => buildSeries(appts, range, now), [appts, range, now]);
  const weekSeries = useMemo(() => buildSeries(appts, "Weekly", now), [appts, now]);

  const chartTotal = series.reduce((s, d) => s + d.value, 0);
  const chartPeak = Math.max(0, ...series.map((d) => d.value));
  const chartAvg = series.length ? Math.round((chartTotal / series.length) * 10) / 10 : 0;

  const segments = Object.keys(STATUS_COLORS)
    .map((k) => ({
      label: k,
      value: appts.filter((a) => a.status === k).length,
      color: STATUS_COLORS[k],
    }))
    .filter((s) => s.value > 0);

  /* ── Doctors: prefer live API, fall back to static ── */
  const doctorsLive = Boolean(liveDoctors && liveDoctors.length > 0);
  const doctorsData = doctorsLive ? liveDoctors : DOCTORS;

  const byDept = Object.entries(
    doctorsData.reduce((acc, d) => {
      const k = d.department || "Others";
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {}),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const topDept = byDept[0]?.[1] || 1;
  const activeDocs = doctorsData.filter(
    (d) => d.status === "Active" || d.status === 1 || !d.status,
  ).length;
  const offDocs = doctorsData.length - activeDocs;
  const dutyPct = Math.round((activeDocs / (doctorsData.length || 1)) * 100);

  /* ── KPI values ── */
  const buildStat = (key) => {
    if (key === "appointments") {
      const value = Array.isArray(liveAppointments) ? liveAppointments.length : stats?.appointments;
      return { value, loading: appointmentsLoading && value === undefined, error: appointmentsError };
    }
    const value = stats?.[key];
    return { value, loading: statsLoading && value === undefined, error: statsError };
  };

  const upcomingEvents = EVENTS.filter((e) => e.status === "Published").slice(0, 3);

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* ───────────── HERO ───────────── */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#041F29] via-[#08485E] to-[#0A6A88] p-5 text-white shadow-[0_24px_50px_-28px_rgba(4,31,41,0.9)] sm:p-8">
        {/* texture, glow and ECG line */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse at 15% 0%, black, transparent 65%)",
            WebkitMaskImage: "radial-gradient(ellipse at 15% 0%, black, transparent 65%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl"
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 800 64"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-14 w-full opacity-[0.14]"
        >
          <path
            d="M0 38 H150 L168 38 L180 10 L196 60 L210 24 L220 38 H420 L438 38 L450 10 L466 60 L480 24 L490 38 H800"
            fill="none"
            stroke="#fff"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10">
          <div className="min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/30 bg-amber-400/15 px-3 py-1 text-[11px] font-bold text-amber-200">
              <Sparkles className="h-3 w-3" />
              Apollo Jabalpur · Administration
            </span>

            <h1
              className={`${displayFont.className} mt-3 text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl`}
            >
              {greet},
              <span className="block bg-gradient-to-r from-white via-teal-100 to-amber-200 bg-clip-text text-transparent">
                {userName || "Admin"}
              </span>
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-teal-50/85">
              {apptsLoading
                ? "Loading today’s numbers…"
                : pending > 0
                  ? `${pending} appointment${pending === 1 ? " is" : "s are"} waiting for your review.`
                  : "You’re all caught up. No appointments are waiting for review."}
            </p>

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
              <Link
                href={`${ADMIN_BASE}/appointments`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#FBBF24] to-[#D97706] px-5 py-2.5 text-sm font-bold text-slate-950 shadow-[0_10px_24px_-10px_rgba(245,158,11,0.9)] transition hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-300/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                Review appointments <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`${ADMIN_BASE}/doctors`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/20 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/30 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <Plus className="h-4 w-4" /> Add doctor
              </Link>
            </div>
          </div>

          {/* clock + next appointment */}
          <div className="rounded-2xl border border-white/15 bg-white/[0.08] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md lg:w-[300px]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p
                  className={`${numFont.className} text-3xl font-bold leading-none tracking-tight sm:text-4xl`}
                >
                  {timeStr}
                </p>
                <p className="mt-1.5 text-[11px] font-medium text-teal-100/85">
                  {dateStr || "\u00A0"}
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2.5 py-1 text-[10px] font-bold text-emerald-200 ring-1 ring-inset ring-emerald-300/25">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70 motion-reduce:hidden" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                IST
              </span>
            </div>

            <div className="mt-3.5 border-t border-white/15 pt-3.5">
              <p className="flex items-center gap-1.5 text-[11px] font-semibold text-teal-100/80">
                <Clock className="h-3 w-3" /> Next appointment
              </p>
              {apptsLoading ? (
                <div className="mt-2 h-9 animate-pulse rounded-lg bg-white/10" />
              ) : nextUp ? (
                <div className="mt-2 flex items-center gap-3">
                  <span
                    className={`${numFont.className} grid h-9 min-w-[3.25rem] place-items-center rounded-lg bg-amber-300 px-2 text-sm font-extrabold text-[#06303F]`}
                  >
                    {nextUp.time}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-[13px] font-bold">{nextUp.patient}</p>
                    <p className="truncate text-[11px] text-teal-100/80">
                      {nextUp.doctor || "Doctor not set"}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mt-2 text-xs text-teal-100/80">
                  No more appointments scheduled today.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── KPI BENTO ───────────── */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3 lg:grid-cols-6">
        <div className="col-span-2 sm:row-span-2">
          <FeaturedStat
            item={KPIS[0]}
            stat={buildStat("appointments")}
            series={weekSeries}
            pending={pending}
            today={todayCount}
            loading={apptsLoading}
          />
        </div>
        {KPIS.slice(1).map((k) => (
          <StatTile key={k.key} item={k} stat={buildStat(k.key)} />
        ))}
      </div>

      {/* ───────────── TREND + STATUS ───────────── */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3">
        <Panel color="#0A5F7A" className="p-4 sm:p-6 lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <SectionHeader
              icon={BarChart3}
              color="#0A5F7A"
              title="Appointments trend"
              subtitle="Counted by appointment date"
            />
            <div className="flex rounded-xl bg-slate-100 p-1" role="tablist">
              {[
                { k: "Weekly", l: "7 days" },
                { k: "Monthly", l: "6 months" },
              ].map((r) => (
                <button
                  key={r.k}
                  role="tab"
                  aria-selected={range === r.k}
                  onClick={() => setRange(r.k)}
                  className={`cursor-pointer rounded-lg px-3 py-1.5 text-[11px] font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5F7A] ${
                    range === r.k
                      ? "bg-white text-[#0A5F7A] shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {r.l}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { l: "Total", v: chartTotal, c: "#0A5F7A" },
              { l: "Busiest", v: chartPeak, c: "#D97706" },
              { l: "Average", v: chartAvg, c: "#7C3AED" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-xl px-3 py-2"
                style={{
                  backgroundColor: `color-mix(in srgb, ${s.c} 7%, white)`,
                  border: `1px solid color-mix(in srgb, ${s.c} 18%, transparent)`,
                }}
              >
                <p className="text-[11px] font-bold" style={{ color: s.c }}>
                  {s.l}
                </p>
                <p className={`${numFont.className} text-xl font-bold leading-tight text-slate-900`}>
                  {apptsLoading ? "…" : s.v}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-7">
            {appointmentsError && !appts.length ? (
              <EmptyNote>Couldn’t load appointments. Try refreshing the page.</EmptyNote>
            ) : (
              <BarChart key={range} data={series} animate={mounted} />
            )}
          </div>
        </Panel>

        <Panel color="#D97706" className="p-4 sm:p-6">
          <SectionHeader
            icon={PieChart}
            color="#D97706"
            title="Status breakdown"
            subtitle={`${appts.length} bookings in total`}
          />
          <div className="mt-4">
            {segments.length ? (
              <DonutChart segments={segments} centerLabel="Appointments" />
            ) : (
              <EmptyNote icon={CalendarCheck}>
                {appointmentsLoading ? "Loading appointments…" : "No appointments to show yet."}
              </EmptyNote>
            )}
          </div>
        </Panel>
      </div>

      {/* ───────────── RECENT + EVENTS ───────────── */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3">
        <Panel color="#0D9488" className="lg:col-span-2">
          <div className="border-b border-slate-100 px-4 py-4 sm:px-6">
            <SectionHeader
              icon={CalendarClock}
              color="#0D9488"
              title="Recent appointments"
              subtitle="Newest bookings first"
              href={`${ADMIN_BASE}/appointments`}
            />
          </div>

          {apptsLoading ? (
            <ul className="divide-y divide-slate-100">
              {Array.from({ length: 4 }).map((_, i) => (
                <li key={i} className="flex animate-pulse items-center gap-3 px-4 py-3 sm:px-6">
                  <div className="h-8 w-8 rounded-full bg-slate-200" />
                  <div className="space-y-1.5">
                    <div className="h-3 w-32 rounded bg-slate-200" />
                    <div className="h-2.5 w-20 rounded bg-slate-100" />
                  </div>
                </li>
              ))}
            </ul>
          ) : recent.length ? (
            <ul className="divide-y divide-slate-100">
              {recent.map((a) => (
                <li
                  key={a.id}
                  className="flex items-center justify-between gap-3 px-4 py-2.5 transition hover:bg-teal-50/40 sm:px-6"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className="shrink-0 rounded-full p-0.5"
                      style={{
                        boxShadow: `0 0 0 2px color-mix(in srgb, ${STATUS_COLORS[a.status] || "#94A3B8"} 35%, transparent)`,
                      }}
                    >
                      <Avatar name={a.patient} size={32} />
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-semibold leading-tight text-slate-900">
                        {a.patient}
                      </p>
                      <p className="truncate text-[11px] text-slate-500">
                        {a.doctor || "—"}
                        <span className="sm:hidden">{a.dateKey && <> · {fmtDate(a.dateKey)}</>}</span>
                      </p>
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-4">
                    <div className="hidden text-right sm:block">
                      <p className="text-xs font-semibold text-slate-700">
                        {a.dateKey ? fmtDate(a.dateKey) : "—"}
                      </p>
                      <p className="text-[11px] text-slate-400">{a.time || ""}</p>
                    </div>
                    <StatusBadge status={a.status} />
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyNote icon={CalendarCheck}>
              {appointmentsError ? "Couldn’t load appointments." : "No appointments yet."}
            </EmptyNote>
          )}
        </Panel>

        <Panel color="#E11D48" className="flex flex-col p-4 sm:p-6">
          <SectionHeader
            icon={Megaphone}
            color="#E11D48"
            title="Upcoming events"
            subtitle="Published camps and sessions"
          />
          {upcomingEvents.length ? (
            <ul className="mt-4 space-y-2.5">
              {upcomingEvents.map((e) => {
                const d = new Date(`${e.date}T00:00`);
                return (
                  <li
                    key={e.id}
                    className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-white p-2.5 transition hover:border-[#0A5F7A]/30 hover:shadow-sm"
                  >
                    <span
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-center leading-none text-white"
                      style={chipStyle("#0A5F7A")}
                    >
                      <span>
                        <span className={`${numFont.className} block text-lg font-extrabold`}>
                          {d.getDate()}
                        </span>
                        <span className="block text-[9px] font-bold uppercase tracking-wider text-amber-200">
                          {d.toLocaleString("en", { month: "short" })}
                        </span>
                      </span>
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-semibold text-slate-900">{e.title}</p>
                      <p className="truncate text-[11px] text-slate-500">{e.location}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <EmptyNote icon={Megaphone}>No published events right now.</EmptyNote>
          )}
          <div className="mt-auto pt-4">
            <Link href={`${ADMIN_BASE}/events`} className={`${btnGhost} w-full justify-center`}>
              Manage events
            </Link>
          </div>
        </Panel>
      </div>

      {/* ───────────── DEPARTMENTS, QUICK ACTIONS, ROSTER ───────────── */}
      <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        <Panel color="#4F46E5" className="p-4 sm:p-6">
          <SectionHeader
            icon={Stethoscope}
            color="#4F46E5"
            title="Doctors by department"
            subtitle={doctorsLive ? "Specialist distribution · Live" : "Specialist distribution"}
            href={`${ADMIN_BASE}/doctors`}
          />
          <ul className="mt-4 space-y-3">
            {byDept.map(([dept, count], i) => {
              const c = DEPT_COLORS[i % DEPT_COLORS.length];
              return (
                <li key={dept} className="flex items-center gap-3">
                  <span
                    className={`${numFont.className} grid h-7 w-7 shrink-0 place-items-center rounded-lg text-[11px] font-extrabold text-white`}
                    style={chipStyle(c)}
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center justify-between gap-2 text-xs">
                      <span className="truncate font-semibold text-slate-700">{dept}</span>
                      <span className={`${numFont.className} shrink-0 font-bold text-slate-900`}>
                        {count}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out motion-reduce:transition-none"
                        style={{
                          width: mounted ? `${(count / topDept) * 100}%` : "0%",
                          background: `linear-gradient(90deg, ${c}, color-mix(in srgb, ${c} 55%, white))`,
                          transitionDelay: `${i * 70}ms`,
                        }}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>

        <Panel color="#7C3AED" className="p-4 sm:p-6">
          <SectionHeader
            icon={Sparkles}
            color="#7C3AED"
            title="Quick actions"
            subtitle="Common administrative tasks"
          />
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {QUICK.map(({ label, href, icon: Icon, color }) => (
              <Link
                key={label}
                href={href}
                style={{ "--c": color }}
                className="group rounded-2xl bg-gradient-to-br from-slate-200 via-slate-200/70 to-slate-100 p-px transition duration-300 hover:-translate-y-0.5 hover:from-[color:var(--c)] hover:via-[color:color-mix(in_srgb,var(--c)_30%,white)] hover:shadow-[0_12px_28px_-14px_color-mix(in_srgb,var(--c)_70%,transparent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--c)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <div className="flex h-full items-center gap-2.5 rounded-[15px] bg-white p-2.5">
                  <span
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white"
                    style={chipStyle("var(--c)")}
                  >
                    <Icon className="h-[17px] w-[17px]" strokeWidth={2.2} />
                  </span>
                  <span className="min-w-0 flex-1 truncate text-[13px] font-bold text-slate-900">
                    {label}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-300 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--c)]" />
                </div>
              </Link>
            ))}
          </div>
        </Panel>

        <Panel color="#059669" className="flex flex-col p-4 sm:p-6 md:col-span-2 lg:col-span-1">
          <SectionHeader
            icon={Activity}
            color="#059669"
            title="Doctors on duty"
            subtitle={doctorsLive ? "Active roster · Live" : "Active roster"}
          />
          <div className="my-auto pt-3">
            <RadialGauge
              value={dutyPct}
              label="Active specialists"
              sub={`${activeDocs} of ${doctorsData.length} on duty`}
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <div className="rounded-xl bg-emerald-50 px-3 py-2 ring-1 ring-inset ring-emerald-200/70">
              <p className="text-[11px] font-bold text-emerald-700">Active</p>
              <p className={`${numFont.className} text-xl font-bold leading-tight text-slate-900`}>
                {activeDocs}
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-inset ring-slate-200">
              <p className="text-[11px] font-bold text-slate-500">Inactive</p>
              <p className={`${numFont.className} text-xl font-bold leading-tight text-slate-900`}>
                {offDocs}
              </p>
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}