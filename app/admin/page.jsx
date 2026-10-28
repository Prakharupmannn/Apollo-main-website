"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  CalendarCheck,
  Stethoscope,
  Megaphone,
  ClipboardList,
  TrendingUp,
  BookOpen,
  ArrowRight,
  Sparkles,
  Plus,
  Layers,
  Users,
  ShieldCheck,
  Briefcase,
  MessageSquareText,
} from "lucide-react";
import AreaChart from "@/components/admin/AreaChart";
import { Sparkline, DonutChart, RadialGauge } from "@/components/admin/Charts";
import {
  Card,
  SpotlightCard,
  IconTile,
  StatusBadge,
  Avatar,
  btnGhost,
  fmtDate,
} from "@/components/admin/ui";
import { displayFont, numFont } from "@/components/admin/fonts";
import {
  ADMIN_BASE,
  STATS,
  CHART_MONTHLY,
  CHART_WEEKLY,
  APPOINTMENTS,
  EVENTS,
  DOCTORS,
} from "@/lib/admin-data";
import useDashboardStats from "@/hooks/useDashboardStats";
import useDoctors from "@/hooks/useDoctors";

/* ─────────────────────────────────────────────────────
   LOGGED-IN USER HELPERS (shows the FULL NAME)

   BEST FIX: set AUTH_STORAGE_KEY to the exact key where your
   login saves the user (find it with the console snippet).
   Example: const AUTH_STORAGE_KEY = "adminUser";
   When it is set, ONLY that key is read.
────────────────────────────────────────────────────── */
const AUTH_STORAGE_KEY = "";

// Used only when AUTH_STORAGE_KEY is empty
const USER_STORAGE_KEYS = [
  "user",
  "adminUser",
  "admin",
  "authUser",
  "currentUser",
  "loggedInUser",
  "userInfo",
  "userData",
];

// Full-name fields first, short/handle fields last
const USER_NAME_FIELDS = [
  "fullName",
  "full_name",
  "fullname",
  "name",
  "displayName",
  "userName",
  "username",
];

// "pradeep   kumar" -> "Pradeep Kumar"
const toFullName = (value) =>
  String(value ?? "")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

const nameFromUser = (u) => {
  if (!u) return "";
  if (typeof u === "string") return toFullName(u);
  if (typeof u !== "object") return "";

  // 1) a single full-name field
  for (const f of USER_NAME_FIELDS) {
    if (u?.[f]) return toFullName(u[f]);
  }

  // 2) first + last name fields
  const combined = [u.firstName ?? u.first_name, u.lastName ?? u.last_name]
    .filter(Boolean)
    .join(" ");
  if (combined) return toFullName(combined);

  // 3) last resort: the part before @ in the email
  if (u?.email) return toFullName(String(u.email).split("@")[0]);
  return "";
};

// How much an object looks like a real person/account (not site settings)
const userScore = (u) => {
  if (!u || typeof u !== "object") return 0;
  let s = 0;
  if (u.role || u.roles || u.userType) s += 3;
  if (u.email) s += 2;
  if (u.username || u.userName) s += 2;
  if (u._id || u.userId || u.user_id) s += 1;
  return s;
};

const safeParse = (raw) => {
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
};

// Decode a JWT payload (used only as a fallback)
const decodeJwt = (token) => {
  try {
    const part = String(token).split(".")[1];
    if (!part) return null;
    const json = decodeURIComponent(
      atob(part.replace(/-/g, "+").replace(/_/g, "/"))
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
};

function readLoggedInName() {
  if (typeof window === "undefined") return "";

  const stores = [];
  try {
    stores.push(window.localStorage, window.sessionStorage);
  } catch {
    /* storage blocked */
  }

  // 1) Exact key chosen by you
  if (AUTH_STORAGE_KEY) {
    for (const store of stores) {
      const raw = store.getItem(AUTH_STORAGE_KEY);
      if (!raw) continue;
      const parsed = safeParse(raw);
      const name = nameFromUser(parsed?.user ?? parsed);
      if (name) return name;
    }
    return "";
  }

  // 2) Auto-detect: pick the object that looks most like a user account
  let best = { score: 0, name: "" };
  for (const store of stores) {
    for (const key of USER_STORAGE_KEYS) {
      try {
        const raw = store.getItem(key);
        if (!raw) continue;
        const parsed = safeParse(raw);
        const obj = parsed?.user ?? parsed;
        const name = nameFromUser(obj);
        const score = userScore(obj);
        // ignore anything with no account-like fields (e.g. site settings)
        if (name && score > best.score) best = { score, name };
      } catch {
        /* ignore */
      }
    }
  }
  if (best.name) return best.name;

  // 3) Fallback: token stored in storage or cookie
  const tokens = [];
  for (const store of stores) {
    for (const key of ["token", "accessToken", "authToken", "jwt"]) {
      const t = store.getItem(key);
      if (t) tokens.push(t);
    }
  }
  document.cookie.split(";").forEach((c) => {
    const [k, ...v] = c.trim().split("=");
    if (/token|jwt|auth/i.test(k)) tokens.push(v.join("="));
  });
  for (const t of tokens) {
    const payload = decodeJwt(t);
    const name = nameFromUser(payload?.user ?? payload);
    if (name) return name;
  }

  return "";
}

/* ── Animated count-up hook ───────────────────────── */
function useCountUp(target, ms = 1000) {
  const [v, setV] = useState(0);
  useEffect(() => {
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

/* ── KPI stat card ────────────────────────────────── */
function StatCard({ icon, label, stat, tone, color, href }) {
  const n = useCountUp(stat.value);
  const pct = Math.round(
    (stat.spark[stat.spark.length - 1] / Math.max(...stat.spark)) * 100,
  );

  return (
    <SpotlightCard className="relative p-5.5">
      <Link
        href={href}
        aria-label={`Open ${label}`}
        className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0A5F7A]/20"
      />
      <div className="flex items-start justify-between">
        <IconTile icon={icon} tone={tone} size="lg" />
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
          <TrendingUp className="h-3.5 w-3.5" /> {stat.delta}
        </span>
      </div>

      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <div className="mt-1 flex items-end justify-between gap-3">
        <p
          className={`${numFont.className} text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl`}
        >
          {n}
        </p>
        <Sparkline data={stat.spark} color={color} />
      </div>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </SpotlightCard>
  );
}

/* ── KPI definitions ──────────────────────────────── */
const KPIS = [
  {
    key: "appointments",
    label: "Total appointments",
    icon: CalendarCheck,
    tone: "teal",
    color: "#0A5F7A",
    href: `${ADMIN_BASE}/appointments`,
  },
  {
    key: "doctors",
    label: "Total doctors",
    icon: Stethoscope,
    tone: "gold",
    color: "#D97706",
    href: `${ADMIN_BASE}/doctors`,
  },
  {
    key: "specialties",
    label: "Total specialties",
    icon: Layers,
    tone: "teal",
    color: "#0D9488",
    href: `${ADMIN_BASE}/specialties`,
  },
  {
    key: "events",
    label: "Total events",
    icon: Megaphone,
    tone: "rose",
    color: "#E11D48",
    href: `${ADMIN_BASE}/events`,
  },
  {
    key: "caseStudies",
    label: "Total case studies",
    icon: ClipboardList,
    tone: "violet",
    color: "#4F46E5",
    href: `${ADMIN_BASE}/case-studies`,
  },
  {
    key: "articles",
    label: "Health articles",
    icon: BookOpen,
    tone: "gold",
    color: "#B45309",
    href: `${ADMIN_BASE}/health-library`,
  },
  {
    key: "users",
    label: "Admin users",
    icon: ShieldCheck,
    tone: "violet",
    color: "#7C3AED",
    href: `${ADMIN_BASE}/users`,
  },
  {
    key: "careers",
    label: "Careers",
    icon: Briefcase,
    tone: "teal",
    color: "#0891B2",
    href: `${ADMIN_BASE}/careers`,
  },
  {
    key: "inquiries",
    label: "Inquiries",
    icon: MessageSquareText,
    tone: "gold",
    color: "#D97706",
    href: `${ADMIN_BASE}/inquiries`,
  },
];

// Fallback spark/delta for keys not in STATS
const STAT_FALLBACK = {
  specialties: { delta: "Live", spark: [4, 5, 5, 6, 7, 7, 8] },
  articles: { delta: "Live", spark: [10, 12, 15, 18, 20, 22, 24] },
  users: { delta: "Live", spark: [1, 1, 1, 1, 1, 1, 1] },
  careers: { delta: "Live", spark: [2, 3, 3, 4, 5, 5, 6] },
  inquiries: { delta: "Live", spark: [1, 2, 4, 3, 5, 4, 6] },
};

const STATUS_COLORS = {
  Confirmed: "#059669",
  Pending: "#D97706",
  Rescheduled: "#0284C7",
  Completed: "#64748B",
  Cancelled: "#E11D48",
};

/* ── Dashboard page ───────────────────────────────── */
export default function DashboardPage({ initialUser }) {
  const [range, setRange] = useState("Monthly");
  const [now, setNow] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [userName, setUserName] = useState("");

  // Live stats from API
  const { stats } = useDashboardStats();
  const { doctors: liveDoctors } = useDoctors();

  useEffect(() => {
    setNow(new Date());

    // Fetch the logged-in user directly from your API session
    fetch("/api/admin/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.success && data.user?.name) {
          setUserName(data.user.name);
        }
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
  const greet =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const timeStr = now
    ? now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
    : "--:--";
  const dateStr = now
    ? now.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const pending = APPOINTMENTS.filter((a) => a.status === "Pending").length;
  const liveEvents = EVENTS.filter((e) => e.status === "Published").length;

  const chart = range === "Monthly" ? CHART_MONTHLY : CHART_WEEKLY;
  const chartTotal = chart.reduce((s, d) => s + d.value, 0);
  const chartPeak = Math.max(...chart.map((d) => d.value));
  const chartAvg = Math.round(chartTotal / chart.length);

  const segments = Object.keys(STATUS_COLORS)
    .map((k) => ({
      label: k,
      value: APPOINTMENTS.filter((a) => a.status === k).length,
      color: STATUS_COLORS[k],
    }))
    .filter((s) => s.value > 0);

  // Doctors data: prefer live API, fall back to static
  const doctorsData =
    liveDoctors && liveDoctors.length > 0 ? liveDoctors : DOCTORS;

  const byDept = Object.entries(
    doctorsData.reduce(
      (a, d) => ({
        ...a,
        [d.department || "Others"]: (a[d.department || "Others"] || 0) + 1,
      }),
      {},
    ),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const topDept = byDept[0]?.[1] || 1;
  const activeDocs = doctorsData.filter(
    (d) => d.status === "Active" || d.status === 1 || !d.status,
  ).length;
  const dutyPct = Math.round((activeDocs / (doctorsData.length || 1)) * 100);

  // Build stat for each KPI key — overlay real count when available
  const buildStat = (key) => {
    const liveCount = stats?.[key];
    const base = STATS[key] ||
      STAT_FALLBACK[key] || { delta: "Live", spark: [1, 1, 1, 1, 1, 1, 1] };
    return {
      value: liveCount !== undefined ? liveCount : (base.value ?? 0),
      delta: base.delta ?? "Live",
      spark: base.spark ?? [1, 1, 1, 1, 1, 1, 1],
    };
  };

  const quick = [
    {
      label: "Add doctor",
      href: `${ADMIN_BASE}/doctors`,
      icon: Stethoscope,
      tone: "teal",
    },
    {
      label: "New event",
      href: `${ADMIN_BASE}/events`,
      icon: Megaphone,
      tone: "rose",
    },
    {
      label: "Publish article",
      href: `${ADMIN_BASE}/health-library`,
      icon: BookOpen,
      tone: "violet",
    },
    {
      label: "Manage users",
      href: `${ADMIN_BASE}/users`,
      icon: Users,
      tone: "violet",
    },
    {
      label: "Post a job",
      href: `${ADMIN_BASE}/careers`,
      icon: Briefcase,
      tone: "gold",
    },
  ];

  const h2 = `${displayFont.className} text-2xl font-bold text-slate-900`;

  return (
    <div className="space-y-6">
      {/* EXECUTIVE WELCOME HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-[#0A5F7A]/20 bg-gradient-to-br from-[#062E3C] via-[#0A4D62] to-[#0A5F7A] p-6 text-white shadow-xl sm:p-8">
        <div className="relative grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-400/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-200">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Apollo Jabalpur · Executive Administration</span>
            </div>
            <h1
              className={`${displayFont.className} mt-3 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl`}
            >
              {greet}, {userName || "Admin"}
            </h1>
            <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-teal-50/90 sm:text-base">
              You currently have{" "}
              <strong className="font-bold text-amber-300">
                {pending} appointments
              </strong>{" "}
              pending review and{" "}
              <strong className="font-bold text-amber-300">
                {liveEvents} events
              </strong>{" "}
              active on the hospital website.
              {stats && (
                <>
                  {" "}
                  Managing{" "}
                  <strong className="font-bold text-amber-300">
                    {stats.doctors}
                  </strong>{" "}
                  doctors across{" "}
                  <strong className="font-bold text-amber-300">
                    {stats.specialties}
                  </strong>{" "}
                  specialties.
                </>
              )}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`${ADMIN_BASE}/appointments`}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:brightness-105 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-md transition hover:-translate-y-0.5"
              >
                Review appointments <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`${ADMIN_BASE}/doctors`}
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 hover:bg-white/15 px-5 py-2.5 text-sm font-semibold text-white shadow-xs backdrop-blur-xs transition"
              >
                <Plus className="h-4 w-4" /> Add doctor
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/10 p-5 text-center backdrop-blur-md lg:min-w-[210px] shadow-sm">
            <p
              className={`${numFont.className} text-4xl sm:text-5xl font-bold tracking-tight text-white`}
            >
              {timeStr}
            </p>
            <p className="mt-1.5 text-xs font-medium text-teal-100">
              {dateStr || "\u00A0"}
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-slate-950/30 px-3 py-1 text-[11px] font-semibold text-amber-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />{" "}
              Jabalpur · IST
            </p>
          </div>
        </div>
      </section>

      {/* KPI METRICS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {KPIS.map((k) => (
          <StatCard
            key={k.key}
            icon={k.icon}
            label={k.label}
            stat={buildStat(k.key)}
            tone={k.tone}
            color={k.color}
            href={k.href}
          />
        ))}
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Area chart card */}
        <Card className="p-6 xl:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className={h2}>Appointments overview</h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Patient volume trajectory and consultation trends.
              </p>
            </div>
            <div className="flex rounded-xl bg-slate-100 p-1">
              {["Monthly", "Weekly"].map((r) => (
                <button
                  key={r}
                  onClick={() => setRange(r)}
                  className={`cursor-pointer rounded-lg px-3.5 py-1.5 text-xs font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5F7A] ${
                    range === r
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            {[
              { l: "Total Visits", v: chartTotal },
              { l: "Peak Day/Month", v: chartPeak },
              { l: "Average", v: chartAvg },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3"
              >
                <p className="text-xs font-semibold text-slate-500">{s.l}</p>
                <p
                  className={`${numFont.className} mt-0.5 text-2xl font-bold text-slate-900`}
                >
                  {s.v}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <AreaChart key={range} data={chart} />
          </div>
        </Card>

        {/* Donut chart card */}
        <Card className="p-6">
          <h2 className={h2}>Appointments by status</h2>
          <p className="mb-4 mt-0.5 text-xs text-slate-500">
            Real-time status breakdown.
          </p>
          <DonutChart segments={segments} centerLabel="Appointments" />
        </Card>
      </div>

      {/* RECENT RECORDS & UPCOMING EVENTS */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Recent appointments */}
        <Card className="overflow-hidden xl:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
            <div>
              <h2 className={h2}>Recent appointments</h2>
              <p className="text-xs text-slate-500">
                Latest patients scheduled for consultation
              </p>
            </div>
            <Link
              href={`${ADMIN_BASE}/appointments`}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#0A5F7A] hover:underline"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <ul className="divide-y divide-slate-100">
            {APPOINTMENTS.slice(0, 5).map((a) => (
              <li
                key={a.id}
                className="flex items-center justify-between gap-3 px-6 py-3.5 transition hover:bg-slate-50/80"
              >
                <div className="flex min-w-0 items-center gap-3.5">
                  <Avatar name={a.patient} size={40} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {a.patient}
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      {a.doctor}
                    </p>
                  </div>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-xs font-semibold text-slate-700">
                    {fmtDate(a.date)}
                  </p>
                  <p className="text-xs text-slate-400">{a.time}</p>
                </div>
                <StatusBadge status={a.status} />
              </li>
            ))}
          </ul>
        </Card>

        {/* Upcoming events */}
        <Card className="p-6">
          <h2 className={h2}>Upcoming events</h2>
          <p className="text-xs text-slate-500 mb-4">
            Published health camps &amp; sessions
          </p>
          <ul className="space-y-3">
            {EVENTS.filter((e) => e.status === "Published")
              .slice(0, 3)
              .map((e) => {
                const d = new Date(`${e.date}T00:00`);
                return (
                  <li
                    key={e.id}
                    className="flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-3 transition hover:border-[#0A5F7A]/30 hover:bg-slate-50"
                  >
                    <span className="grid h-13 w-13 shrink-0 place-items-center rounded-xl bg-teal-50 border border-teal-200/60 text-center leading-none text-[#0A5F7A]">
                      <span>
                        <span
                          className={`${numFont.className} block text-lg font-bold`}
                        >
                          {d.getDate()}
                        </span>
                        <span className="block text-[10px] font-bold uppercase">
                          {d.toLocaleString("en", { month: "short" })}
                        </span>
                      </span>
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {e.title}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {e.location}
                      </p>
                    </div>
                  </li>
                );
              })}
          </ul>
          <Link
            href={`${ADMIN_BASE}/events`}
            className={`${btnGhost} mt-4 w-full justify-center`}
          >
            Manage all events
          </Link>
        </Card>
      </div>

      {/* BOTTOM ROW: DEPARTMENTS, QUICK ACTIONS, DOCTORS ON DUTY */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Doctors by department */}
        <Card className="p-6">
          <h2 className={h2}>Doctors by department</h2>
          <p className="text-xs text-slate-500 mb-4">
            Specialist staff distribution
            {liveDoctors && liveDoctors.length > 0 && (
              <span className="ml-1 text-emerald-600">· Live</span>
            )}
          </p>
          <ul className="space-y-4">
            {byDept.map(([dept, count]) => (
              <li key={dept}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="font-semibold text-slate-700">{dept}</span>
                  <span
                    className={`${numFont.className} font-bold text-[#0A5F7A]`}
                  >
                    {count} {count === 1 ? "Doctor" : "Doctors"}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#0A5F7A] to-[#1D82A6] transition-all duration-700 ease-out"
                    style={{
                      width: mounted ? `${(count / topDept) * 100}%` : "0%",
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        {/* Quick actions */}
        <Card className="p-6">
          <h2 className={h2}>Quick actions</h2>
          <p className="text-xs text-slate-500 mb-4">
            Common administrative tasks
          </p>
          <div className="grid grid-cols-2 gap-3">
            {quick.map(({ label, href, icon, tone }) => (
              <Link
                key={label}
                href={href}
                className="group flex flex-col items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 transition-all duration-150 hover:-translate-y-0.5 hover:border-[#0A5F7A]/40 hover:bg-white hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5F7A]"
              >
                <IconTile icon={icon} tone={tone} />
                <span className="flex items-center gap-1 text-sm font-bold text-slate-900">
                  {label}{" "}
                  <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-[#0A5F7A] opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
              </Link>
            ))}
          </div>
        </Card>

        {/* Doctors on duty */}
        <Card className="flex flex-col p-6">
          <h2 className={h2}>Doctors on duty</h2>
          <p className="text-xs text-slate-500 mb-2">
            Active roster availability
            {liveDoctors && liveDoctors.length > 0 && (
              <span className="ml-1 text-emerald-600">· Live</span>
            )}
          </p>
          <div className="my-auto pt-2">
            <RadialGauge
              value={dutyPct}
              label="Active specialists"
              sub={`${activeDocs} of ${doctorsData.length} on duty`}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
