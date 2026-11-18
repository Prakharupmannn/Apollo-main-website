"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  Eye,
  Check,
  Download,
  CalendarClock,
  Phone,
  User,
  Stethoscope,
  FileText,
  RefreshCw,
  Hash,
  ShieldAlert,
  Clock,
  X,
} from "lucide-react";
import {
  Card,
  PageHeader,
  Tabs,
  Pagination,
  Modal,
  StatusBadge,
  EmptyState,
  IconTile,
  useToast,
  downloadCsv,
  inputCls,
  btnPrimary,
  btnGhost,
} from "@/components/admin/ui";
import useAppointments from "@/hooks/useAppointments";

const STATUSES = ["Confirmed", "Pending", "Rescheduled", "Completed", "Cancelled"];
const PAGE = 10;
const BLANK = "—";

/* ---------- helpers ---------- */

const isEmptyDate = (v) =>
  !v || v === "0" || v === "0000-00-00 00:00:00" || v === "0000-00-00";

function parseDate(v) {
  const d = new Date(String(v).trim().replace(" ", "T"));
  return isNaN(d.getTime()) ? null : d;
}

function formatDisplayDate(v) {
  if (isEmptyDate(v)) return BLANK;
  const d = parseDate(v);
  if (!d) return String(v);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDisplayDateTime(v) {
  if (isEmptyDate(v)) return BLANK;
  const d = parseDate(v);
  if (!d) return String(v);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatGender(val) {
  if (val == null || val === "") return BLANK;
  const s = String(val).trim();
  if (s === "1") return "Male";
  if (s === "2") return "Female";
  if (s === "3") return "Other";
  return s;
}

const todayKey = () => new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD

/** One place that maps the raw API row to the fields the UI needs. */
function normalize(a) {
  const rawDate = a.book_apdate ?? a.date ?? "";
  const age = [a.book_ptage, a.book_ageuni].filter(Boolean).join(" ");
  return {
    raw: a,
    id: a._id,
    uhid: a.book_uhid ?? "",
    name: a.book_name ?? a.patient ?? "",
    age,
    gender: formatGender(a.book_gend),
    scheme: a.scheme_short_name ?? a.book_schem ?? "",
    mobile: a.book_mobile ?? a.phone ?? "",
    doctor: a.doctor_name ?? a.book_drnam ?? a.doctor ?? "",
    rawDate: String(rawDate),
    dateKey: String(rawDate).slice(0, 10),
    time: a.slot_time ? String(a.slot_time).substring(0, 5) : "",
    entry: a.book_entrydt ?? "",
    status: a.status || "Confirmed",
  };
}

/* ---------- small presentational pieces ---------- */

const iconBtn =
  "grid h-9 w-9 cursor-pointer place-items-center rounded-xl transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5F7A]";

function IdChip({ children }) {
  return (
    <span className="inline-block rounded bg-teal-50 px-1.5 py-px font-mono text-[11px] font-bold text-[#0A5F7A] ring-1 ring-teal-600/20">
      {children}
    </span>
  );
}

function UhidChip({ children }) {
  return (
    <span className="inline-block rounded bg-blue-50 px-1.5 py-px font-mono text-[11px] font-bold text-blue-700 ring-1 ring-blue-600/20">
      {children}
    </span>
  );
}

function Field({ label, children }) {
  return (
    <div className="min-w-0">
      <dt className="text-[11px] font-semibold text-slate-500">{label}</dt>
      <dd className="truncate text-sm font-medium text-slate-800">{children}</dd>
    </div>
  );
}

/** Mobile / tablet card — replaces the wide table below the lg breakpoint. */
function AppointmentCard({ a, onView, onConfirm }) {
  return (
    <li className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-base font-bold text-slate-900">
            {a.name || BLANK}
          </p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            <IdChip>{a.id}</IdChip>
            {a.uhid && <UhidChip>{a.uhid}</UhidChip>}
          </div>
        </div>
        <StatusBadge status={a.status} />
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-slate-100 pt-3">
        <Field label="Doctor">{a.doctor || BLANK}</Field>
        <Field label="Date">{formatDisplayDate(a.rawDate)}</Field>
        <Field label="Time">{a.time || BLANK}</Field>
        <Field label="Mobile">
          {a.mobile ? (
            <a href={`tel:${a.mobile}`} className="text-[#0A5F7A] hover:underline">
              {a.mobile}
            </a>
          ) : (
            BLANK
          )}
        </Field>
        <Field label="Age / Gender">
          {[a.age, a.gender !== BLANK ? a.gender : ""].filter(Boolean).join(" · ") || BLANK}
        </Field>
        <Field label="Scheme">{a.scheme || BLANK}</Field>
      </dl>

      <div className="mt-4 flex gap-2">
        {a.status === "Pending" && (
          <button
            onClick={() => onConfirm(a.id)}
            type="button"
            className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          >
            <Check className="h-4 w-4" /> Confirm
          </button>
        )}
        <button
          onClick={() => onView(a)}
          type="button"
          className={`${btnGhost} flex-1 justify-center`}
        >
          <Eye className="h-4 w-4" /> View details
        </button>
      </div>
    </li>
  );
}

/* ---------- page ---------- */

export default function AppointmentsPage() {
  const { appointments, loading, error, refetch } = useAppointments();
  console.log(appointments)
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("All");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [page, setPage] = useState(1);
  const [activeId, setActiveId] = useState(null);
  const [slot, setSlot] = useState({ date: "", time: "" });
  const [toast, toastNode] = useToast();

  // Give every row a stable id once, so we never rely on array index later.
  useEffect(() => {
    if (Array.isArray(appointments)) {
      setItems(
        appointments.map((a, i) => ({
          ...a,
          _id: String(a.book_id ?? a.id ?? `AP${i + 1}`),
        }))
      );
    }
  }, [appointments]);

  const list = useMemo(() => items.map(normalize), [items]);

  const filtered = useMemo(() => {
    const n = q.trim().toLowerCase();
    return list.filter((a) => {
      const matchSearch =
        !n ||
        [a.name, a.id, a.uhid, a.mobile, a.doctor].some((v) =>
          String(v).toLowerCase().includes(n)
        );
      const matchFrom = !from || (a.dateKey && a.dateKey >= from);
      const matchTo = !to || (a.dateKey && a.dateKey <= to);
      const matchTab = tab === "All" || a.status === tab;
      return matchSearch && matchFrom && matchTo && matchTab;
    });
  }, [list, q, tab, from, to]);

  // Keep the page valid when filters / refetch shrink the result set.
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const rows = filtered.slice((page - 1) * PAGE, page * PAGE);
  const current = list.find((a) => a.id === activeId);

  const tabList = [
    { key: "All", label: "All", count: list.length },
    ...STATUSES.map((s) => ({
      key: s,
      label: s,
      count: list.filter((a) => a.status === s).length,
    })),
  ];

  const reset = (fn) => (v) => {
    fn(v);
    setPage(1);
  };

  const hasFilters = q || from || to || tab !== "All";
  const clearFilters = () => {
    setQ("");
    setFrom("");
    setTo("");
    setTab("All");
    setPage(1);
  };

  const isToday = from === todayKey() && to === todayKey();
  const toggleToday = () => {
    if (isToday) {
      setFrom("");
      setTo("");
    } else {
      setFrom(todayKey());
      setTo(todayKey());
    }
    setPage(1);
  };

  const setStatus = (id, status, extra = {}) => {
    setItems((p) => p.map((a) => (a._id === id ? { ...a, status, ...extra } : a)));
    toast(`${id} marked as ${status.toLowerCase()}.`);
  };

  const openDetails = (a) => {
    setActiveId(a.id);
    setSlot({ date: a.dateKey, time: a.time });
  };

  const saveSlot = () => {
    if (!current) return;
    if (!slot.date || !slot.time) {
      toast("Enter both new date and time.", "error");
      return;
    }
    setStatus(current.id, "Rescheduled", {
      book_apdate: slot.date,
      slot_time: slot.time,
    });
  };

  const exportCsv = () =>
    downloadCsv(
      "appointments.csv",
      [
        "ID",
        "Patient UHID",
        "Patient Name",
        "Patient Age",
        "Gender",
        "Scheme",
        "Mobile Number",
        "Doctor",
        "Appointment Date",
        "Slot Time",
        "Booking Entry Date",
        "Status",
      ],
      filtered.map((a) => [
        a.id,
        a.uhid,
        a.name,
        a.age,
        a.gender === BLANK ? "" : a.gender,
        a.scheme,
        a.mobile,
        a.doctor,
        a.rawDate,
        a.time,
        a.entry,
        a.status,
      ])
    );

  const thBase =
    "border-b border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-bold uppercase tracking-wide text-slate-600 whitespace-nowrap";
  const tdBase = "whitespace-nowrap px-3 py-1.5 align-middle text-[12.5px] leading-tight text-slate-600";

  return (
    <div>
      <PageHeader
        title="Appointments"
        subtitle="View, schedule, and manage patient appointments across hospital departments."
      >
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => refetch()}
            disabled={loading}
            className={`${btnGhost} ${loading ? "cursor-not-allowed opacity-60" : ""}`}
            title="Refresh latest appointments"
            type="button"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span>{loading ? "Refreshing…" : "Refresh"}</span>
          </button>
          <button onClick={exportCsv} className={btnGhost} type="button">
            <Download className="h-4 w-4" />
            <span>
              Export CSV
              <span className="hidden sm:inline"> ({filtered.length})</span>
            </span>
          </button>
        </div>
      </PageHeader>

      <Card className="overflow-hidden">
        {error && (
          <div className="flex flex-col gap-2 border-b border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div className="flex items-start gap-2">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
              <p>
                <span className="font-semibold">Couldn’t load appointments: </span>
                {error}
              </p>
            </div>
            <button
              onClick={() => refetch()}
              className="cursor-pointer self-start font-bold text-rose-900 underline hover:no-underline sm:self-auto"
              type="button"
            >
              Try again
            </button>
          </div>
        )}

        {/* ---------- Filters ---------- */}
        <div className="flex flex-col gap-4 border-b border-slate-200/90 p-4 sm:p-5">
          <div className="grid gap-3 lg:grid-cols-[minmax(0,24rem)_1fr] lg:items-end">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={q}
                onChange={(e) => reset(setQ)(e.target.value)}
                placeholder="Search patient, UHID, doctor or ID…"
                aria-label="Search appointments"
                className={`${inputCls} pl-10`}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-end lg:justify-end">
              <label className="flex flex-col gap-1 text-xs font-semibold text-slate-600 sm:flex-row sm:items-center sm:gap-2">
                From
                <input
                  type="date"
                  value={from}
                  max={to || undefined}
                  onChange={(e) => reset(setFrom)(e.target.value)}
                  className={`${inputCls} !w-full text-xs sm:!w-auto`}
                />
              </label>
              <label className="flex flex-col gap-1 text-xs font-semibold text-slate-600 sm:flex-row sm:items-center sm:gap-2">
                To
                <input
                  type="date"
                  value={to}
                  min={from || undefined}
                  onChange={(e) => reset(setTo)(e.target.value)}
                  className={`${inputCls} !w-full text-xs sm:!w-auto`}
                />
              </label>
              <div className="col-span-2 flex items-center gap-2 sm:col-span-1">
                <button
                  onClick={toggleToday}
                  type="button"
                  aria-pressed={isToday}
                  className={`cursor-pointer rounded-xl border px-3 py-2 text-xs font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5F7A] ${
                    isToday
                      ? "border-[#0A5F7A] bg-[#0A5F7A] text-white"
                      : "border-slate-200 bg-white text-[#0A5F7A] hover:bg-teal-50"
                  }`}
                >
                  Today
                </button>
                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    type="button"
                    className="inline-flex cursor-pointer items-center gap-1 px-1 py-2 text-xs font-bold text-slate-500 hover:text-slate-800"
                  >
                    <X className="h-3.5 w-3.5" /> Clear all
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Status tabs scroll sideways on narrow screens instead of wrapping */}
          <div className="-mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 [&>*]:min-w-max">
            <Tabs tabs={tabList} value={tab} onChange={reset(setTab)} />
          </div>
        </div>

        {/* ---------- Loading / empty (shared by both layouts) ---------- */}
        {loading && list.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 px-5 py-16 text-slate-500">
            <RefreshCw className="h-6 w-6 animate-spin text-[#0A5F7A]" />
            <p className="text-xs font-semibold text-slate-700">
              Loading appointments from hospital API…
            </p>
          </div>
        ) : rows.length === 0 ? (
          <EmptyState title="No appointments match your filter" />
        ) : (
          <>
            {/* ---------- Mobile + tablet: card list, page scrolls naturally ---------- */}
            <ul className="grid gap-3 bg-slate-50/60 p-3 sm:grid-cols-2 sm:p-4 lg:hidden">
              {rows.map((a) => (
                <AppointmentCard
                  key={a.id}
                  a={a}
                  onView={openDetails}
                  onConfirm={(id) => setStatus(id, "Confirmed")}
                />
              ))}
            </ul>

            {/* ---------- Desktop: full table, sticky header + ID/Name columns ---------- */}
            <div className="hidden max-h-[calc(100dvh-15rem)] min-h-[360px] overflow-auto overscroll-contain lg:block">
              <table className="w-full min-w-[1150px] border-separate border-spacing-0 text-left text-[13px]">
                <thead>
                  <tr>
                    <th className={`${thBase} sticky left-0 top-0 z-40 w-[96px] min-w-[96px]`}>
                      ID
                    </th>
                    <th
                      className={`${thBase} sticky left-[96px] top-0 z-40 w-[200px] min-w-[200px] shadow-[4px_0_6px_-4px_rgba(15,23,42,0.25)]`}
                    >
                      Patient
                    </th>
                    {[
                      "UHID",
                      "Age",
                      "Gender",
                      "Scheme",
                      "Mobile",
                      "Doctor",
                      "Date",
                      "Time",
                      "Booked on",
                      "Status",
                    ].map((h) => (
                      <th key={h} className={`${thBase} sticky top-0 z-30`}>
                        {h}
                      </th>
                    ))}
                    <th className={`${thBase} sticky right-0 top-0 z-40 text-right`}>
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {rows.map((a) => (
                    <tr key={a.id} className="group">
                      <td
                        className={`${tdBase} sticky left-0 z-[5] border-b border-slate-100 bg-white group-hover:bg-teal-50`}
                      >
                        <IdChip>{a.id}</IdChip>
                      </td>
                      <td
                        className={`${tdBase} sticky left-[96px] z-[5] max-w-[200px] truncate border-b border-slate-100 bg-white font-semibold text-slate-800 shadow-[4px_0_6px_-4px_rgba(15,23,42,0.25)] group-hover:bg-teal-50`}
                        title={a.name}
                      >
                        {a.name || BLANK}
                      </td>
                      <td className={`${tdBase} border-b border-slate-100 group-hover:bg-teal-50`}>
                        {a.uhid ? <UhidChip>{a.uhid}</UhidChip> : BLANK}
                      </td>
                      <td className={`${tdBase} border-b border-slate-100 group-hover:bg-teal-50`}>
                        {a.age || BLANK}
                      </td>
                      <td className={`${tdBase} border-b border-slate-100 group-hover:bg-teal-50`}>
                        {a.gender}
                      </td>
                      <td className={`${tdBase} border-b border-slate-100 group-hover:bg-teal-50`}>
                        {a.scheme || BLANK}
                      </td>
                      <td
                        className={`${tdBase} border-b border-slate-100 font-mono text-xs group-hover:bg-teal-50`}
                      >
                        {a.mobile || BLANK}
                      </td>
                      <td className={`${tdBase} border-b border-slate-100 group-hover:bg-teal-50`}>
                        {a.doctor || BLANK}
                      </td>
                      <td
                        className={`${tdBase} border-b border-slate-100 font-medium group-hover:bg-teal-50`}
                      >
                        {formatDisplayDate(a.rawDate)}
                      </td>
                      <td
                        className={`${tdBase} border-b border-slate-100 font-medium group-hover:bg-teal-50`}
                      >
                        {a.time || BLANK}
                      </td>
                      <td
                        className={`${tdBase} border-b border-slate-100 font-medium group-hover:bg-teal-50`}
                      >
                        {formatDisplayDateTime(a.entry)}
                      </td>
                      <td className={`${tdBase} border-b border-slate-100 group-hover:bg-teal-50`}>
                        <StatusBadge status={a.status} />
                      </td>
                      <td
                        className={`${tdBase} sticky right-0 z-[5] border-b border-slate-100 bg-white text-right group-hover:bg-teal-50`}
                      >
                        <div className="flex justify-end gap-1">
                          {a.status === "Pending" && (
                            <button
                              onClick={() => setStatus(a.id, "Confirmed")}
                              aria-label={`Confirm ${a.id}`}
                              title="Quick confirm"
                              type="button"
                              className={`${iconBtn} !h-7 !w-7 text-emerald-600 hover:bg-emerald-50`}
                            >
                              <Check className="h-3.5 w-3.5" />
                            </button>
                          )}
                          <button
                            onClick={() => openDetails(a)}
                            aria-label={`View ${a.id}`}
                            title="View details"
                            type="button"
                            className={`${iconBtn} !h-7 !w-7 text-[#0A5F7A] hover:bg-teal-50`}
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        <Pagination
          page={page}
          pageSize={PAGE}
          total={filtered.length}
          onChange={setPage}
          noun="appointments"
        />
      </Card>

      {/* ---------- Detail modal ---------- */}
      <Modal
        open={!!current}
        onClose={() => setActiveId(null)}
        title={current ? `Appointment ${current.id}` : ""}
        subtitle="Review booking details and manage this appointment."
        size="lg"
        footer={
          <button onClick={() => setActiveId(null)} className={btnGhost} type="button">
            Close
          </button>
        }
      >
        {current && (
          <div className="space-y-5">
            <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3">
              <span className="text-sm font-semibold text-slate-600">Status</span>
              <StatusBadge status={current.status} />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { icon: Hash, tone: "teal", label: "Appointment ID", value: current.id },
                { icon: User, tone: "teal", label: "Patient UHID", value: current.uhid || BLANK },
                { icon: User, tone: "teal", label: "Patient name", value: current.name || BLANK },
                {
                  icon: User,
                  tone: "gold",
                  label: "Age & gender",
                  value:
                    [current.age, current.gender !== BLANK ? current.gender : ""]
                      .filter(Boolean)
                      .join(" · ") || BLANK,
                },
                { icon: FileText, tone: "emerald", label: "Scheme", value: current.scheme || BLANK },
                {
                  icon: Phone,
                  tone: "emerald",
                  label: "Mobile number",
                  value: current.mobile || BLANK,
                },
                { icon: Stethoscope, tone: "violet", label: "Doctor", value: current.doctor || BLANK },
                {
                  icon: CalendarClock,
                  tone: "teal",
                  label: "Appointment date",
                  value: formatDisplayDate(current.rawDate),
                },
                { icon: Clock, tone: "teal", label: "Slot time", value: current.time || BLANK },
                {
                  icon: CalendarClock,
                  tone: "gold",
                  label: "Booked on",
                  value: formatDisplayDateTime(current.entry),
                },
              ].map(({ icon, tone, label, value }) => (
                <div
                  key={label}
                  className="flex items-start gap-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-3.5"
                >
                  <IconTile icon={icon} tone={tone} size="sm" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-500">{label}</p>
                    <p
                      className="notranslate break-words text-sm font-bold text-slate-900"
                      translate="no"
                    >
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Actions stack full-width on phones */}
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                Update status
              </p>
              <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
                {!["Confirmed", "Completed", "Cancelled"].includes(current.status) && (
                  <button
                    onClick={() => setStatus(current.id, "Confirmed")}
                    className={`${btnPrimary} justify-center`}
                    type="button"
                  >
                    Confirm appointment
                  </button>
                )}
                {current.status === "Confirmed" && (
                  <button
                    onClick={() => setStatus(current.id, "Completed")}
                    className={`${btnPrimary} justify-center`}
                    type="button"
                  >
                    Mark as completed
                  </button>
                )}
                {!["Completed", "Cancelled"].includes(current.status) && (
                  <button
                    onClick={() => setStatus(current.id, "Cancelled")}
                    className="cursor-pointer rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-200"
                    type="button"
                  >
                    Cancel appointment
                  </button>
                )}
              </div>
            </div>

            {!["Completed", "Cancelled"].includes(current.status) && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                <p className="mb-3 text-sm font-bold text-slate-900">Reschedule</p>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                  <label className="flex-1 text-xs font-semibold text-slate-600">
                    New date
                    <input
                      type="date"
                      value={slot.date}
                      onChange={(e) => setSlot({ ...slot, date: e.target.value })}
                      className={`${inputCls} mt-1`}
                    />
                  </label>
                  <label className="flex-1 text-xs font-semibold text-slate-600">
                    New time
                    <input
                      type="time"
                      value={slot.time}
                      onChange={(e) => setSlot({ ...slot, time: e.target.value })}
                      className={`${inputCls} mt-1`}
                    />
                  </label>
                  <button
                    onClick={saveSlot}
                    className={`${btnGhost} justify-center`}
                    type="button"
                  >
                    Save new slot
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {toastNode}
    </div>
  );
}
