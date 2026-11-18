"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Search,
  RotateCw,
  Eye,
  Trash2,
  Mail,
  Phone,
  MapPin,
  AlertTriangle,
  MessageSquareText,
  Building2,
  FileText,
  Clock,
  Filter,
} from "lucide-react";
import {
  PageHeader,
  Card,
  Modal,
  Avatar,
  Pagination,
  useToast,
  btnGhost,
  inputCls,
  thCls,
  tdCls,
  rowIconBtn,
} from "@/components/admin/ui";

// Safely parse and format MySQL created_at timestamp into localized date & time
function formatSubmittedDate(val) {
  if (!val) return "—";

  let d = null;
  if (val instanceof Date) {
    d = val;
  } else if (typeof val === "number") {
    d = new Date(val);
  } else if (typeof val === "string") {
    const trimmed = val.trim();
    if (!trimmed) return "—";

    // Handle date-only "YYYY-MM-DD"
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
      d = new Date(`${trimmed}T00:00:00`);
    } else if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}/.test(trimmed)) {
      // Handle MySQL DATETIME "YYYY-MM-DD HH:mm:ss"
      d = new Date(trimmed.replace(" ", "T"));
    } else {
      d = new Date(trimmed);
    }
  }

  if (!d || isNaN(d.getTime())) return "—";

  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

const DEPARTMENTS = [
  "All Departments",
  "General Inquiry",
  "Gastro Sciences",
  "Onco Sciences",
  "Cardiac Sciences",
  "Neuro Sciences",
  "Nephro Sciences",
  "Ortho-Joint & Spine",
  "Critical Care",
  "Preventive Health Checkup",
  "Pediatric Nephrology",
  "Neonatology",
  "Pulmonology",
  "Paediatrics",
  "Obstetrics & Gynecology",
  "Dental Clinic",
  "Ophthalmology",
  "ENT",
  "Anesthesiology",
  "Dermatology & Cosmetology",
  "General Medicine",
  "Sleep Medicine",
  "Urology",
  "Second Opinion",
];

const ITEMS_PER_PAGE = 10;
const inqId = (id) => `INQ${String(id ?? "").padStart(3, "0")}`;

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchErr, setFetchErr] = useState(null);
  const [q, setQ] = useState("");
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [page, setPage] = useState(1);

  const [activeModalInquiry, setActiveModalInquiry] = useState(null);
  const [deletingInquiry, setDeletingInquiry] = useState(null);
  const [delSaving, setDelSaving] = useState(false);

  const [toast, toastNode] = useToast();

  const fetchInquiries = useCallback(async () => {
    try {
      setLoading(true);
      setFetchErr(null);
      const res = await fetch("/api/inquiries", {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to load inquiries.");
      }
      setInquiries(data.data || []);
    } catch (err) {
      setFetchErr(err.message || "Unable to fetch inquiries.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  // Filtered inquiries based on search term and selected department
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return inquiries.filter((inq) => {
      const matchesDept =
        selectedDept === "All Departments" ||
        (inq.department || "").toLowerCase() === selectedDept.toLowerCase();

      if (!matchesDept) return false;
      if (!query) return true;

      const haystack = [
        String(inq.id || ""),
        inqId(inq.id),
        inq.full_name || "",
        inq.phone_number || "",
        inq.email_address || "",
        inq.department || "",
        inq.city || "",
        inq.subject || "",
        inq.message || "",
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [inquiries, q, selectedDept]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [q, selectedDept]);

  // Keep the page valid after a delete / refresh
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filtered.slice(start, start + ITEMS_PER_PAGE);
  }, [filtered, page]);

  // Delete inquiry
  const handleDelete = async () => {
    if (!deletingInquiry) return;
    setDelSaving(true);
    try {
      const res = await fetch(`/api/inquiries?id=${deletingInquiry.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Delete failed.");
      }
      toast("Inquiry deleted successfully.");
      setDeletingInquiry(null);
      if (activeModalInquiry?.id === deletingInquiry.id) {
        setActiveModalInquiry(null);
      }
      await fetchInquiries();
    } catch (err) {
      toast(err.message || "Failed to delete inquiry.", "error");
    } finally {
      setDelSaving(false);
    }
  };

  // Quick stats
  const totalCount = inquiries.length;
  const todayCount = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return inquiries.filter(
      (inq) => inq.created_at && inq.created_at.slice(0, 10) === today
    ).length;
  }, [inquiries]);

  const generalCount = useMemo(() => {
    return inquiries.filter(
      (inq) => (inq.department || "").toLowerCase() === "general inquiry"
    ).length;
  }, [inquiries]);

  const stats = [
    { icon: MessageSquareText, tone: "bg-teal-50 text-[#0A5F7A]", value: totalCount, label: "Total Inquiries" },
    { icon: Clock, tone: "bg-emerald-50 text-emerald-700", value: todayCount, label: "Received Today" },
    { icon: Building2, tone: "bg-amber-50 text-amber-700", value: generalCount, label: "General Inquiries" },
  ];

  const m = activeModalInquiry;

  return (
    <div className="space-y-4">
      {toastNode}

      <PageHeader
        title="Patient Inquiries"
        subtitle="Manage contact messages, specialty consultation requests, and patient queries submitted through the website."
      >
        <button
          onClick={fetchInquiries}
          className={btnGhost}
          title="Refresh inquiries"
        >
          <RotateCw
            className={`h-4 w-4 ${loading ? "animate-spin text-[#0A5F7A]" : ""}`}
          />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </PageHeader>

      {/* Error banner */}
      {fetchErr && (
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600" />
            <span className="font-medium">{fetchErr}</span>
          </div>
          <button
            onClick={fetchInquiries}
            className="cursor-pointer text-xs font-bold text-rose-700 underline hover:text-rose-900"
          >
            Retry
          </button>
        </div>
      )}

      {/* Stats: slimmer cards, three across even on phones */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
        {stats.map(({ icon: Icon, tone, value, label }) => (
          <Card
            key={label}
            className="flex flex-col items-start gap-2 px-3 py-2.5 sm:flex-row sm:items-center sm:gap-3 sm:px-4"
          >
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg sm:h-9 sm:w-9 ${tone}`}>
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-lg font-bold leading-tight text-slate-900 sm:text-xl">
                {loading ? "—" : value}
              </p>
              <p className="truncate text-[11px] font-semibold text-slate-500 sm:text-xs">
                {label}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Main Table Card */}
      <Card className="overflow-hidden">
        {/* Search & Filter Bar */}
        <div className="flex flex-col gap-2.5 border-b border-slate-200/90 p-3 sm:flex-row sm:items-center sm:justify-between sm:p-4">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by patient name, phone, email, subject, city…"
              aria-label="Search inquiries"
              className={`${inputCls} pl-10`}
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 shrink-0 text-slate-400" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              aria-label="Filter by department"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 focus:border-[#0A5F7A] focus:outline-none focus:ring-4 focus:ring-[#0A5F7A]/10 sm:w-auto"
            >
              {DEPARTMENTS.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] border-separate border-spacing-0 text-left">
            <thead>
              <tr>
                <th className={thCls}>ID</th>
                <th className={thCls}>Full Name</th>
                <th className={thCls}>Phone Number</th>
                <th className={thCls}>Email Address</th>
                <th className={thCls}>Department</th>
                <th className={thCls}>City</th>
                <th className={thCls}>Subject</th>
                <th className={thCls}>Message</th>
                <th className={thCls}>Submitted</th>
                <th className={`${thCls} text-right`}>Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {Array.from({ length: 10 }).map((_, j) => (
                      <td key={j} className={tdCls}>
                        <div className="h-3.5 w-20 rounded bg-slate-200" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="py-12 text-center text-sm text-slate-500"
                  >
                    <MessageSquareText className="mx-auto mb-2 h-8 w-8 text-slate-300" />
                    {q || selectedDept !== "All Departments"
                      ? "No inquiries matching your criteria."
                      : "No patient inquiries received yet."}
                  </td>
                </tr>
              ) : (
                paginated.map((inq) => {
                  const msg = inq.message || "";
                  const isLongMsg = msg.length > 45;
                  const shortMsg = isLongMsg ? `${msg.slice(0, 45)}…` : msg || "—";

                  return (
                    <tr
                      key={inq.id}
                      className="transition-colors hover:bg-slate-50/70"
                    >
                      <td className={`${tdCls} whitespace-nowrap font-mono text-[11px] font-bold text-[#0A5F7A]`}>
                        {inqId(inq.id)}
                      </td>

                      <td className={`${tdCls} whitespace-nowrap`}>
                        <div className="flex items-center gap-2">
                          <Avatar name={inq.full_name} size={24} />
                          <span className="font-semibold text-slate-900">
                            {inq.full_name}
                          </span>
                        </div>
                      </td>

                      <td className={`${tdCls} whitespace-nowrap`}>
                        <a
                          href={`tel:${inq.phone_number}`}
                          className="inline-flex items-center gap-1.5 font-medium text-slate-700 hover:text-[#0A5F7A]"
                          title="Call phone number"
                        >
                          <Phone className="h-3 w-3 text-teal-600" />
                          <span>{inq.phone_number}</span>
                        </a>
                      </td>

                      <td className={`${tdCls} whitespace-nowrap`}>
                        <a
                          href={`mailto:${inq.email_address}`}
                          className="inline-flex items-center gap-1.5 font-medium text-slate-700 hover:text-[#0A5F7A]"
                          title="Send email"
                        >
                          <Mail className="h-3 w-3 text-amber-600" />
                          <span>{inq.email_address}</span>
                        </a>
                      </td>

                      <td className={`${tdCls} whitespace-nowrap`}>
                        <span className="inline-flex items-center rounded-full bg-teal-50 px-2 py-0.5 text-[11px] font-semibold text-[#0A5F7A] ring-1 ring-inset ring-[#0A5F7A]/20">
                          {inq.department || "General Inquiry"}
                        </span>
                      </td>

                      <td className={`${tdCls} whitespace-nowrap`}>
                        {inq.city || "—"}
                      </td>

                      <td className={`${tdCls} font-medium text-slate-800`}>
                        <div className="max-w-[160px] truncate" title={inq.subject}>
                          {inq.subject || "—"}
                        </div>
                      </td>

                      <td className={tdCls}>
                        <div className="flex max-w-[220px] items-center gap-1 whitespace-nowrap">
                          <span className="truncate" title={msg}>
                            {shortMsg}
                          </span>
                          {isLongMsg && (
                            <button
                              type="button"
                              onClick={() => setActiveModalInquiry(inq)}
                              className="shrink-0 cursor-pointer text-[11px] font-bold text-[#0A5F7A] hover:underline"
                            >
                              more
                            </button>
                          )}
                        </div>
                      </td>

                      <td className={`${tdCls} whitespace-nowrap text-slate-500`}>
                        {formatSubmittedDate(inq.created_at)}
                      </td>

                      <td className={`${tdCls} whitespace-nowrap text-right`}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => setActiveModalInquiry(inq)}
                            className={`${rowIconBtn} text-[#0A5F7A] hover:bg-teal-50`}
                            title="View full details"
                            aria-label="View details"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingInquiry(inq)}
                            className={`${rowIconBtn} text-rose-600 hover:bg-rose-50`}
                            title="Delete inquiry"
                            aria-label="Delete inquiry"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
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
          pageSize={ITEMS_PER_PAGE}
          total={filtered.length}
          onChange={setPage}
          noun="inquiries"
        />
      </Card>

      {/* Inquiry Details Modal (shared Modal needs `open`, `size` and `footer`) */}
      <Modal
        open={!!m}
        onClose={() => setActiveModalInquiry(null)}
        title={m ? `Inquiry ${inqId(m.id)}` : ""}
        subtitle={m ? `Submitted on ${formatSubmittedDate(m.created_at)}` : ""}
        size="lg"
        footer={
          <>
            <button
              type="button"
              onClick={() => setDeletingInquiry(m)}
              className="mr-auto inline-flex cursor-pointer items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-800"
            >
              <Trash2 className="h-4 w-4" /> Delete this record
            </button>
            <button
              type="button"
              onClick={() => setActiveModalInquiry(null)}
              className={btnGhost}
            >
              Close
            </button>
          </>
        }
      >
        {m && (
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
              <Avatar name={m.full_name} size={44} />
              <h4 className="min-w-0 flex-1 truncate text-base font-bold text-slate-900">
                {m.full_name}
              </h4>
              <span className="inline-flex shrink-0 items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-[#0A5F7A] ring-1 ring-inset ring-[#0A5F7A]/20">
                {m.department || "General Inquiry"}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200/80 bg-white p-3">
                <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <Phone className="h-3.5 w-3.5 text-teal-600" /> Phone Number
                </span>
                <a
                  href={`tel:${m.phone_number}`}
                  className="mt-1 block font-semibold text-slate-900 hover:text-[#0A5F7A]"
                >
                  {m.phone_number}
                </a>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-white p-3">
                <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <Mail className="h-3.5 w-3.5 text-amber-600" /> Email Address
                </span>
                <a
                  href={`mailto:${m.email_address}`}
                  className="mt-1 block break-all font-semibold text-slate-900 hover:text-[#0A5F7A]"
                >
                  {m.email_address}
                </a>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-white p-3">
                <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-rose-600" /> City / Location
                </span>
                <p className="mt-1 font-semibold text-slate-900">
                  {m.city || "Not specified"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-white p-3">
                <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <FileText className="h-3.5 w-3.5 text-indigo-600" /> Subject
                </span>
                <p className="mt-1 font-semibold text-slate-900">
                  {m.subject || "General Query"}
                </p>
              </div>
            </div>

            <div>
              <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-500">
                Message / Query Details
              </span>
              <div className="max-h-60 overflow-y-auto whitespace-pre-wrap rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-xs leading-relaxed text-slate-800 sm:text-sm">
                {m.message}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={!!deletingInquiry}
        onClose={() => !delSaving && setDeletingInquiry(null)}
        title="Delete patient inquiry?"
        size="sm"
        footer={
          <>
            <button
              type="button"
              onClick={() => setDeletingInquiry(null)}
              disabled={delSaving}
              className={btnGhost}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDelete}
              disabled={delSaving}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-rose-700 disabled:opacity-60"
            >
              {delSaving ? "Deleting…" : "Yes, delete record"}
            </button>
          </>
        }
      >
        {deletingInquiry && (
          <p className="text-sm leading-relaxed text-slate-600">
            Are you sure you want to delete the inquiry from{" "}
            <strong className="text-slate-900">{deletingInquiry.full_name}</strong>{" "}
            ({inqId(deletingInquiry.id)})? This action cannot be undone.
          </p>
        )}
      </Modal>
    </div>
  );
}