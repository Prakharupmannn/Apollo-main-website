"use client";

import React, { useMemo, useState } from "react";
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
  fmtDate,
  inputCls,
  btnPrimary,
  btnGhost,
} from "@/components/admin/ui";
import { APPOINTMENTS } from "@/lib/admin-data";

const STATUSES = ["Confirmed", "Pending", "Rescheduled", "Completed", "Cancelled"];
const PAGE = 6;

export default function AppointmentsPage() {
  const [items, setItems] = useState(APPOINTMENTS);
  const [q, setQ] = useState("");
  const [tab, setTab] = useState("All");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [page, setPage] = useState(1);
  const [activeId, setActiveId] = useState(null);
  const [slot, setSlot] = useState({ date: "", time: "" });
  const [toast, toastNode] = useToast();

  const filtered = useMemo(() => {
    const n = q.trim().toLowerCase();
    return items.filter(
      (a) =>
        (tab === "All" || a.status === tab) &&
        (!from || a.date >= from) &&
        (!to || a.date <= to) &&
        (!n || `${a.patient} ${a.doctor} ${a.id}`.toLowerCase().includes(n))
    );
  }, [items, q, tab, from, to]);

  const rows = filtered.slice((page - 1) * PAGE, page * PAGE);
  const current = items.find((a) => a.id === activeId);

  const tabList = [
    { key: "All", label: "All", count: items.length },
    ...STATUSES.map((s) => ({
      key: s,
      label: s,
      count: items.filter((a) => a.status === s).length,
    })),
  ];

  const reset = (fn) => (v) => {
    fn(v);
    setPage(1);
  };

  const setStatus = (id, status, extra = {}) => {
    setItems((p) =>
      p.map((a) => (a.id === id ? { ...a, status, ...extra } : a))
    );
    toast(`${id} marked as ${status.toLowerCase()}.`);
  };

  const openDetails = (a) => {
    setActiveId(a.id);
    setSlot({ date: a.date, time: a.time });
  };

  const exportCsv = () =>
    downloadCsv(
      "appointments.csv",
      ["ID", "Patient", "Doctor", "Date", "Time", "Status", "Phone", "Reason"],
      filtered.map((a) => [
        a.id,
        a.patient,
        a.doctor,
        a.date,
        a.time,
        a.status,
        a.phone,
        a.reason,
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
        <button onClick={exportCsv} className={btnGhost}>
          <Download className="h-4 w-4" /> Export CSV
        </button>
      </PageHeader>

      <Card className="overflow-hidden">
        {/* Filter bar: Search, Date Pickers, Status Tabs */}
        <div className="flex flex-col gap-4 border-b border-slate-200/90 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={q}
                onChange={(e) => reset(setQ)(e.target.value)}
                placeholder="Search patient, doctor or ID…"
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
                >
                  Clear dates
                </button>
              )}
            </div>
          </div>

          <Tabs tabs={tabList} value={tab} onChange={reset(setTab)} />
        </div>

        {/* Appointments Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-bold uppercase tracking-wider text-slate-600">
                <th className="px-5 py-3.5">ID</th>
                <th className="px-5 py-3.5">Patient</th>
                <th className="px-5 py-3.5">Doctor</th>
                <th className="px-5 py-3.5">Date & Time</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((a) => (
                <tr
                  key={a.id}
                  className="transition-colors hover:bg-slate-50/70"
                >
                  <td className="px-5 py-3.5 align-middle">
                    <span className="inline-block rounded-md bg-teal-50 px-2 py-0.5 font-mono text-xs font-bold text-[#0A5F7A] ring-1 ring-teal-600/20">
                      {a.id}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-slate-900">
                    {a.patient}
                  </td>
                  <td className="px-5 py-3.5 text-slate-700">{a.doctor}</td>
                  <td className="whitespace-nowrap px-5 py-3.5 font-medium text-slate-600">
                    {fmtDate(a.date)}, <span className="text-slate-500">{a.time}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={a.status} />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <div className="flex justify-end gap-1.5">
                      {a.status === "Pending" && (
                        <button
                          onClick={() => setStatus(a.id, "Confirmed")}
                          aria-label={`Confirm ${a.id}`}
                          title="Quick Confirm"
                          className={`${iconBtn} text-emerald-600 hover:bg-emerald-50`}
                        >
                          <Check className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={() => openDetails(a)}
                        aria-label={`View ${a.id}`}
                        title="View details"
                        className={`${iconBtn} text-[#0A5F7A] hover:bg-teal-50`}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && <EmptyState title="No appointments match your filter" />}
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
        title={current ? `Appointment ${current.id}` : ""}
        subtitle="Review clinical booking details and update consultation status."
        size="lg"
        footer={
          <button onClick={() => setActiveId(null)} className={btnGhost}>
            Close
          </button>
        }
      >
        {current && (
          <div className="space-y-5">
            {/* 4 Info Cards */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                {
                  icon: User,
                  tone: "teal",
                  label: "Patient Name",
                  value: current.patient,
                },
                {
                  icon: Phone,
                  tone: "emerald",
                  label: "Contact Phone",
                  value: current.phone,
                },
                {
                  icon: Stethoscope,
                  tone: "violet",
                  label: "Assigned Doctor",
                  value: current.doctor,
                },
                {
                  icon: CalendarClock,
                  tone: "gold",
                  label: "Consultation Slot",
                  value: `${fmtDate(current.date)}, ${current.time}`,
                },
              ].map(({ icon, tone, label, value }) => (
                <div
                  key={label}
                  className="flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-3.5"
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
                  </div>
                </div>
              ))}

              <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-3.5 sm:col-span-2">
                <IconTile icon={FileText} tone="rose" size="sm" />
                <div>
                  <p className="text-xs font-semibold text-slate-500">
                    Reason for visit
                  </p>
                  <p className="text-sm font-bold text-slate-900">
                    {current.reason}
                  </p>
                </div>
              </div>
            </div>

            {/* Current Status Pill */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3">
              <span className="text-sm font-semibold text-slate-600">
                Current Status:
              </span>
              <StatusBadge status={current.status} />
            </div>

            {/* Status Actions */}
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                Update Status
              </p>
              <div className="flex flex-wrap gap-2.5">
                {current.status !== "Confirmed" &&
                  current.status !== "Completed" &&
                  current.status !== "Cancelled" && (
                    <button
                      onClick={() => setStatus(current.id, "Confirmed")}
                      className={btnPrimary}
                    >
                      Confirm Appointment
                    </button>
                  )}
                {current.status === "Confirmed" && (
                  <button
                    onClick={() => setStatus(current.id, "Completed")}
                    className={btnPrimary}
                  >
                    Mark as Completed
                  </button>
                )}
                {current.status !== "Cancelled" &&
                  current.status !== "Completed" && (
                    <button
                      onClick={() => setStatus(current.id, "Cancelled")}
                      className="cursor-pointer rounded-xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-200"
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
                          ? setStatus(current.id, "Rescheduled", slot)
                          : toast("Enter both new date and time.", "error")
                      }
                      className={btnGhost}
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