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

function formatDisplayDate(dateStr) {
  if (!dateStr || dateStr === "0" || dateStr === "0000-00-00 00:00:00") return "—";
  try {
    const cleanStr = String(dateStr).trim().replace(" ", "T");
    const d = new Date(cleanStr);
    if (isNaN(d.getTime())) return String(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return String(dateStr);
  }
}

function formatDisplayDateTime(dateStr) {
  if (!dateStr || dateStr === "0" || dateStr === "0000-00-00 00:00:00") return "—";
  try {
    const cleanStr = String(dateStr).trim().replace(" ", "T");
    const d = new Date(cleanStr);
    if (isNaN(d.getTime())) return String(dateStr);
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return String(dateStr);
  }
}

function formatGender(val) {
  if (val == null || val === "") return "—";
  const s = String(val).trim();
  if (s === "1") return "Male";
  if (s === "2") return "Female";
  if (s === "3") return "Other";
  return s;
}

export default function AppointmentsPage() {
  const { appointments, loading, error, refetch } = useAppointments();
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("All");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [page, setPage] = useState(1);
  const [activeId, setActiveId] = useState(null);
  const [slot, setSlot] = useState({ date: "", time: "" });
  const [toast, toastNode] = useToast();

  useEffect(() => {
    if (Array.isArray(appointments)) {
      setItems(appointments);
    }
  }, [appointments]);

  const filtered = useMemo(() => {
    const n = q.trim().toLowerCase();
    return items.filter((a) => {
      const matchSearch =
        !n ||
        String(a.book_name || a.patient || "").toLowerCase().includes(n) ||
        String(a.book_id || a.id || "").toLowerCase().includes(n) ||
        String(a.book_uhid || "").toLowerCase().includes(n) ||
        String(a.book_mobile || a.phone || "").toLowerCase().includes(n) ||
        String(a.book_drnam || a.doctor || "").toLowerCase().includes(n);

      const apDateStr = String(a.book_apdate || a.date || "").slice(0, 10);
      const matchFrom = !from || (apDateStr && apDateStr >= from);
      const matchTo = !to || (apDateStr && apDateStr <= to);

      const itemStatus = a.status || "Confirmed";
      const matchTab = tab === "All" || itemStatus === tab;

      return matchSearch && matchFrom && matchTo && matchTab;
    });
  }, [items, q, tab, from, to]);

  const rows = filtered.slice((page - 1) * PAGE, page * PAGE);
  const current = items.find((a) => (a.book_id || a.id) === activeId);

  const tabList = [
    { key: "All", label: "All", count: items.length },
    ...STATUSES.map((s) => ({
      key: s,
      label: s,
      count: items.filter((a) => (a.status || "Confirmed") === s).length,
    })),
  ];

  const reset = (fn) => (v) => {
    fn(v);
    setPage(1);
  };

  const setStatus = (id, status, extra = {}) => {
    setItems((p) =>
      p.map((a) => ((a.book_id || a.id) === id ? { ...a, status, ...extra } : a))
    );
    toast(`${id} marked as ${status.toLowerCase()}.`);
  };

  const openDetails = (a) => {
    setActiveId(a.book_id || a.id);
    const apDate = String(a.book_apdate || a.date || "").slice(0, 10);
    setSlot({ date: apDate, time: a.time || "" });
  };

  const exportCsv = () =>
    downloadCsv(
      "appointments.csv",
      [
        "Appointment ID",
        "Patient UHID",
        "Patient Name",
        "Patient Age",
        "Age Unit",
        "Gender",
        "Scheme",
        "Mobile Number",
        "Doctor",
        "Appointment Date",
        "Booking Entry Date",
        "Status",
      ],
      filtered.map((a) => [
        a.book_id ?? a.id ?? "",
        a.book_uhid ?? "",
        a.book_name ?? a.patient ?? "",
        a.book_ptage ?? "",
        a.book_ageuni ?? "",
        formatGender(a.book_gend),
        a.book_schem ?? "",
        a.book_mobile ?? a.phone ?? "",
        a.book_drnam ?? a.doctor ?? "",
        a.book_apdate ?? a.date ?? "",
        a.book_entrydt ?? "",
        a.status || "Confirmed",
      ])
    );

  const iconBtn =
    "grid h-9 w-9 cursor-pointer place-items-center rounded-xl transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5F7A]";

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
            className={`${btnGhost} ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
            title="Refresh latest appointments"
            type="button"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span>{loading ? "Refreshing…" : "Refresh"}</span>
          </button>
          <button onClick={exportCsv} className={btnGhost} type="button">
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </PageHeader>

      <Card className="overflow-hidden">
        {/* Error notification banner if API fails */}
        {error && (
          <div className="flex items-center justify-between gap-3 border-b border-rose-200 bg-rose-50 px-5 py-3 text-sm text-rose-800">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 shrink-0 text-rose-600" />
              <span className="font-semibold">Unable to fetch appointments:</span>
              <span>{error}</span>
            </div>
            <button
              onClick={() => refetch()}
              className="cursor-pointer font-bold text-rose-900 underline hover:no-underline"
              type="button"
            >
              Retry
            </button>
          </div>
        )}

        {/* Filter bar: Search, Date Pickers, Status Tabs */}
        <div className="flex flex-col gap-4 border-b border-slate-200/90 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={q}
                onChange={(e) => reset(setQ)(e.target.value)}
                placeholder="Search patient, UHID, doctor or ID…"
                aria-label="Search appointments"
                className={`${inputCls} pl-10`}
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <label className="flex items-center gap-2 font-semibold text-slate-600">
                <span>From</span>
                <input
                  type="date"
                  value={from}
                  onChange={(e) => reset(setFrom)(e.target.value)}
                  className={`${inputCls} !w-auto text-xs`}
                />
              </label>
              <label className="flex items-center gap-2 font-semibold text-slate-600">
                <span>To</span>
                <input
                  type="date"
                  value={to}
                  onChange={(e) => reset(setTo)(e.target.value)}
                  className={`${inputCls} !w-auto text-xs`}
                />
              </label>
              {(from || to) && (
                <button
                  onClick={() => {
                    setFrom("");
                    setTo("");
                    setPage(1);
                  }}
                  className="cursor-pointer text-xs font-bold text-[#0A5F7A] hover:underline"
                  type="button"
                >
                  Clear dates
                </button>
              )}
            </div>
          </div>

          <Tabs tabs={tabList} value={tab} onChange={reset(setTab)} />
        </div>

        {/* Appointments Table with all 11 required fields */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-bold uppercase tracking-wider text-slate-600">
                <th className="px-4 py-3.5 whitespace-nowrap">Appointment ID</th>
                <th className="px-4 py-3.5 whitespace-nowrap">Patient UHID</th>
                <th className="px-4 py-3.5 whitespace-nowrap">Patient Name</th>
                <th className="px-4 py-3.5 whitespace-nowrap">Patient Age</th>
                <th className="px-4 py-3.5 whitespace-nowrap">Age Unit</th>
                <th className="px-4 py-3.5 whitespace-nowrap">Gender</th>
                <th className="px-4 py-3.5 whitespace-nowrap">Scheme</th>
                <th className="px-4 py-3.5 whitespace-nowrap">Mobile Number</th>
                <th className="px-4 py-3.5 whitespace-nowrap">Doctor</th>
                <th className="px-4 py-3.5 whitespace-nowrap">Appointment Date</th>
                <th className="px-4 py-3.5 whitespace-nowrap">Booking Entry Date</th>
                <th className="px-4 py-3.5 whitespace-nowrap">Status</th>
                <th className="px-4 py-3.5 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && items.length === 0 ? (
                <tr>
                  <td colSpan={13} className="px-5 py-16 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <RefreshCw className="h-7 w-7 animate-spin text-[#0A5F7A]" />
                      <p className="text-sm font-semibold text-slate-700">
                        Loading appointments from hospital API…
                      </p>
                    </div>
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={13}>
                    <EmptyState title="No appointments match your filter" />
                  </td>
                </tr>
              ) : (
                rows.map((a, idx) => {
                  const appointmentId = a.book_id ?? a.id ?? `AP${idx + 1}`;
                  const currentStatus = a.status || "Confirmed";

                  return (
                    <tr
                      key={appointmentId}
                      className="transition-colors hover:bg-slate-50/70"
                    >
                      {/* 1. Appointment ID (book_id) */}
                      <td className="px-4 py-3.5 align-middle whitespace-nowrap">
                        <span className="inline-block rounded-md bg-teal-50 px-2.5 py-0.5 font-mono text-xs font-bold text-[#0A5F7A] ring-1 ring-teal-600/20">
                          {appointmentId}
                        </span>
                      </td>

                      {/* 2. Patient UHID (book_uhid) */}
                      <td className="px-4 py-3.5 font-mono text-xs text-slate-700 whitespace-nowrap">
                        {a.book_uhid ?? "—"}
                      </td>

                      {/* 3. Patient Name (book_name) */}
                      <td className="px-4 py-3.5 font-semibold text-slate-900 whitespace-nowrap">
                        {a.book_name ?? a.patient ?? "—"}
                      </td>

                      {/* 4. Patient Age (book_ptage) */}
                      <td className="px-4 py-3.5 text-slate-700 whitespace-nowrap">
                        {a.book_ptage ?? "—"}
                      </td>

                      {/* 5. Age Unit (book_ageuni) */}
                      <td className="px-4 py-3.5 text-slate-700 whitespace-nowrap">
                        {a.book_ageuni ?? "—"}
                      </td>

                      {/* 6. Gender (book_gend) */}
                      <td className="px-4 py-3.5 text-slate-700 whitespace-nowrap">
                        {formatGender(a.book_gend)}
                      </td>

                      {/* 7. Scheme (book_schem) */}
                      <td className="px-4 py-3.5 text-slate-700 whitespace-nowrap">
                        {a.scheme_name ?? "—"}
                      </td>

                      {/* 8. Mobile Number (book_mobile) */}
                      <td className="px-4 py-3.5 font-mono text-xs text-slate-700 whitespace-nowrap">
                        {a.book_mobile ?? a.phone ?? "—"}
                      </td>

                      {/* 9. Doctor (book_drnam) */}
                      <td className="px-4 py-3.5 text-slate-700 whitespace-nowrap">
                        {a.doctor_name ?? a.doctor ?? "—"}
                      </td>

                      {/* 10. Appointment Date (book_apdate) */}
                      <td className="whitespace-nowrap px-4 py-3.5 font-medium text-slate-600">
                        {formatDisplayDate(a.book_apdate ?? a.date)}
                      </td>

                      {/* 11. Booking Entry Date (book_entrydt) */}
                      <td className="whitespace-nowrap px-4 py-3.5 font-medium text-slate-600">
                        {formatDisplayDateTime(a.book_entrydt)}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <StatusBadge status={currentStatus} />
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="flex justify-end gap-1.5">
                          {currentStatus === "Pending" && (
                            <button
                              onClick={() => setStatus(appointmentId, "Confirmed")}
                              aria-label={`Confirm ${appointmentId}`}
                              title="Quick Confirm"
                              type="button"
                              className={`${iconBtn} text-emerald-600 hover:bg-emerald-50`}
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => openDetails(a)}
                            aria-label={`View ${appointmentId}`}
                            title="View details"
                            type="button"
                            className={`${iconBtn} text-[#0A5F7A] hover:bg-teal-50`}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          pageSize={PAGE}
          total={filtered.length}
          onChange={setPage}
          noun="appointments"
        />
      </Card>

      {/* Appointment Detail Modal */}
      <Modal
        open={!!current}
        onClose={() => setActiveId(null)}
        title={current ? `Appointment ${current.book_id || current.id}` : ""}
        subtitle="Review clinical booking details and patient consultation information."
        size="lg"
        footer={
          <button onClick={() => setActiveId(null)} className={btnGhost} type="button">
            Close
          </button>
        }
      >
        {current && (
          <div className="space-y-5">
            {/* Info Cards displaying all clinical appointment fields */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                {
                  icon: Hash,
                  tone: "teal",
                  label: "Appointment ID (book_id)",
                  value: current.book_id ?? current.id ?? "—",
                },
                {
                  icon: User,
                  tone: "teal",
                  label: "Patient UHID (book_uhid)",
                  value: current.book_uhid ?? "—",
                },
                {
                  icon: User,
                  tone: "teal",
                  label: "Patient Name (book_name)",
                  value: current.book_name ?? current.patient ?? "—",
                },
                {
                  icon: User,
                  tone: "gold",
                  label: "Age & Unit (book_ptage / book_ageuni)",
                  value: `${current.book_ptage ?? "—"} ${current.book_ageuni ?? ""}`.trim() || "—",
                },
                {
                  icon: User,
                  tone: "gold",
                  label: "Gender (book_gend)",
                  value: formatGender(current.book_gend),
                },
                {
                  icon: FileText,
                  tone: "emerald",
                  label: "Scheme (book_schem)",
                  value: current.book_schem ?? "—",
                },
                {
                  icon: Phone,
                  tone: "emerald",
                  label: "Mobile Number (book_mobile)",
                  value: current.book_mobile ?? current.phone ?? "—",
                },
                {
                  icon: Stethoscope,
                  tone: "violet",
                  label: "Doctor (book_drnam)",
                  value: current.book_drnam ?? current.doctor ?? "—",
                },
                {
                  icon: CalendarClock,
                  tone: "teal",
                  label: "Appointment Date (book_apdate)",
                  value: formatDisplayDate(current.book_apdate ?? current.date),
                  subvalue: current.book_apdate ? `Original: ${current.book_apdate}` : null,
                },
                {
                  icon: CalendarClock,
                  tone: "teal",
                  label: "Booking Entry Date (book_entrydt)",
                  value: formatDisplayDateTime(current.book_entrydt),
                  subvalue: current.book_entrydt ? `Original: ${current.book_entrydt}` : null,
                },
              ].map(({ icon, tone, label, value, subvalue }) => (
                <div
                  key={label}
                  className="flex items-start gap-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-3.5"
                >
                  <IconTile icon={icon} tone={tone} size="sm" />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-500">
                      {label}
                    </p>
                    <p
                      className="notranslate truncate text-sm font-bold text-slate-900"
                      translate="no"
                    >
                      {value}
                    </p>
                    {subvalue && (
                      <p className="mt-0.5 text-[11px] text-slate-500 font-mono">
                        {subvalue}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Current Status Pill */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3">
              <span className="text-sm font-semibold text-slate-600">
                Current Status:
              </span>
              <StatusBadge status={current.status || "Confirmed"} />
            </div>

            {/* Status Actions */}
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                Update Status
              </p>
              <div className="flex flex-wrap gap-2.5">
                {(current.status || "Confirmed") !== "Confirmed" &&
                  current.status !== "Completed" &&
                  current.status !== "Cancelled" && (
                    <button
                      onClick={() => setStatus(current.book_id || current.id, "Confirmed")}
                      className={btnPrimary}
                      type="button"
                    >
                      Confirm Appointment
                    </button>
                  )}
                {(current.status || "Confirmed") === "Confirmed" && (
                  <button
                    onClick={() => setStatus(current.book_id || current.id, "Completed")}
                    className={btnPrimary}
                    type="button"
                  >
                    Mark as Completed
                  </button>
                )}
                {current.status !== "Cancelled" &&
                  current.status !== "Completed" && (
                    <button
                      onClick={() => setStatus(current.book_id || current.id, "Cancelled")}
                      className="cursor-pointer rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-200"
                      type="button"
                    >
                      Cancel Appointment
                    </button>
                  )}
              </div>
            </div>

            {/* Reschedule Section */}
            {current.status !== "Completed" &&
              current.status !== "Cancelled" && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <p className="mb-3 text-sm font-bold text-slate-900">
                    Reschedule Appointment
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                    <label className="flex-1 text-xs font-semibold text-slate-600">
                      New Date
                      <input
                        type="date"
                        value={slot.date}
                        onChange={(e) =>
                          setSlot({ ...slot, date: e.target.value })
                        }
                        className={`${inputCls} mt-1`}
                      />
                    </label>
                    <label className="flex-1 text-xs font-semibold text-slate-600">
                      New Time
                      <input
                        value={slot.time}
                        onChange={(e) =>
                          setSlot({ ...slot, time: e.target.value })
                        }
                        placeholder="e.g. 04:30 PM"
                        className={`${inputCls} mt-1`}
                      />
                    </label>
                    <button
                      onClick={() =>
                        slot.date && slot.time
                          ? setStatus(current.book_id || current.id, "Rescheduled", slot)
                          : toast("Enter both new date and time.", "error")
                      }
                      className={btnGhost}
                      type="button"
                    >
                      Save New Slot
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
