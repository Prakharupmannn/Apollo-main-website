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
  Calendar,
  AlertTriangle,
  MessageSquareText,
  Building2,
  FileText,
  Clock,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import {
  PageHeader,
  Card,
  Modal,
  Avatar,
  useToast,
  btnGhost,
  inputCls,
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
        `INQ${String(inq.id || "").padStart(3, "0")}`,
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

  // Pagination slice
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
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

  return (
    <div className="space-y-6">
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
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3.5 text-sm text-rose-800">
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

      {/* Stats summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="flex items-center gap-4 px-5 py-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-50 text-[#0A5F7A]">
            <MessageSquareText className="h-5 w-5" />
          </span>
          <div>
            <p className="text-2xl font-bold text-slate-900">
              {loading ? "—" : totalCount}
            </p>
            <p className="text-xs font-semibold text-slate-500">
              Total Inquiries
            </p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 px-5 py-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
            <Clock className="h-5 w-5" />
          </span>
          <div>
            <p className="text-2xl font-bold text-slate-900">
              {loading ? "—" : todayCount}
            </p>
            <p className="text-xs font-semibold text-slate-500">
              Received Today
            </p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 px-5 py-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-700">
            <Building2 className="h-5 w-5" />
          </span>
          <div>
            <p className="text-2xl font-bold text-slate-900">
              {loading ? "—" : generalCount}
            </p>
            <p className="text-xs font-semibold text-slate-500">
              General Inquiries
            </p>
          </div>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="overflow-hidden">
        {/* Search & Filter Bar */}
        <div className="flex flex-col gap-3 border-b border-slate-200/90 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
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
            <Filter className="h-4 w-4 text-slate-400 shrink-0" />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              aria-label="Filter by department"
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 focus:border-[#0A5F7A] focus:outline-none focus:ring-4 focus:ring-[#0A5F7A]/10"
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
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                <th className="px-4 py-3.5">ID</th>
                <th className="px-4 py-3.5">Full Name</th>
                <th className="px-4 py-3.5">Phone Number</th>
                <th className="px-4 py-3.5">Email Address</th>
                <th className="px-4 py-3.5">Department</th>
                <th className="px-4 py-3.5">City</th>
                <th className="px-4 py-3.5">Subject</th>
                <th className="px-4 py-3.5">Message / Details</th>
                <th className="px-4 py-3.5">Submitted Date</th>
                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {Array.from({ length: 10 }).map((_, j) => (
                      <td key={j} className="px-4 py-4">
                        <div className="h-4 w-20 rounded-md bg-slate-200" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="py-14 text-center text-sm text-slate-500"
                  >
                    <MessageSquareText className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                    {q || selectedDept !== "All Departments"
                      ? "No inquiries matching your criteria."
                      : "No patient inquiries received yet."}
                  </td>
                </tr>
              ) : (
                paginated.map((inq) => {
                  const formattedId = `INQ${String(inq.id).padStart(3, "0")}`;
                  const isLongMsg = (inq.message || "").length > 45;
                  const shortMsg = isLongMsg
                    ? `${inq.message.slice(0, 45)}…`
                    : inq.message || "—";

                  return (
                    <tr
                      key={inq.id}
                      className="transition-colors hover:bg-slate-50/70"
                    >
                      {/* ID */}
                      <td className="px-4 py-3.5 font-mono text-xs font-bold text-[#0A5F7A]">
                        {formattedId}
                      </td>

                      {/* Full Name */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={inq.full_name} size="sm" />
                          <span className="font-semibold text-slate-900">
                            {inq.full_name}
                          </span>
                        </div>
                      </td>

                      {/* Phone Number */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <a
                          href={`tel:${inq.phone_number}`}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-[#0A5F7A]"
                          title="Call phone number"
                        >
                          <Phone className="h-3 w-3 text-teal-600" />
                          <span>{inq.phone_number}</span>
                        </a>
                      </td>

                      {/* Email Address */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <a
                          href={`mailto:${inq.email_address}`}
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 hover:text-[#0A5F7A]"
                          title="Send email"
                        >
                          <Mail className="h-3 w-3 text-amber-600" />
                          <span>{inq.email_address}</span>
                        </a>
                      </td>

                      {/* Department */}
                      <td className="px-4 py-3.5 whitespace-nowrap">
                        <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-[#0A5F7A] ring-1 ring-inset ring-[#0A5F7A]/20">
                          {inq.department || "General Inquiry"}
                        </span>
                      </td>

                      {/* City */}
                      <td className="px-4 py-3.5 text-xs text-slate-600 whitespace-nowrap">
                        {inq.city || "—"}
                      </td>

                      {/* Subject */}
                      <td className="px-4 py-3.5 text-xs font-medium text-slate-800 max-w-[160px] truncate">
                        {inq.subject || "—"}
                      </td>

                      {/* Message / Details */}
                      <td className="px-4 py-3.5 text-xs text-slate-600 max-w-[200px]">
                        <span>{shortMsg}</span>
                        {isLongMsg && (
                          <button
                            type="button"
                            onClick={() => setActiveModalInquiry(inq)}
                            className="ml-1 text-[11px] font-bold text-[#0A5F7A] hover:underline cursor-pointer"
                          >
                            more
                          </button>
                        )}
                      </td>

                      {/* Submitted Date */}
                      <td className="px-4 py-3.5 text-xs text-slate-500 whitespace-nowrap">
                        {formatSubmittedDate(inq.created_at)}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setActiveModalInquiry(inq)}
                            className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-teal-50 hover:text-[#0A5F7A] hover:border-[#0A5F7A]/30 cursor-pointer"
                            title="View full details"
                            aria-label="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeletingInquiry(inq)}
                            className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-rose-50 hover:text-rose-600 hover:border-rose-300 cursor-pointer"
                            title="Delete inquiry"
                            aria-label="Delete inquiry"
                          >
                            <Trash2 className="h-4 w-4" />
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

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-slate-200/80 px-4 py-3 text-xs text-slate-600 sm:px-6">
            <span>
              Showing {(page - 1) * ITEMS_PER_PAGE + 1} to{" "}
              {Math.min(page * ITEMS_PER_PAGE, filtered.length)} of{" "}
              {filtered.length} inquiries
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <span className="px-2 font-semibold text-slate-800">
                Page {page} of {totalPages}
              </span>

              <button
                type="button"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </Card>

      {/* Inquiry Details Modal */}
      {activeModalInquiry && (
        <Modal
          title={`Inquiry Details — INQ${String(activeModalInquiry.id).padStart(3, "0")}`}
          onClose={() => setActiveModalInquiry(null)}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5 text-sm">
            {/* Header with Avatar and Basic Info */}
            <div className="flex items-center gap-3.5 rounded-2xl bg-slate-50 p-4 border border-slate-100">
              <Avatar name={activeModalInquiry.full_name} size="lg" />
              <div className="flex-1">
                <h4 className="text-base font-bold text-slate-900">
                  {activeModalInquiry.full_name}
                </h4>
                <p className="text-xs text-slate-500">
                  Submitted on {formatSubmittedDate(activeModalInquiry.created_at)}
                </p>
              </div>
              <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-[#0A5F7A] ring-1 ring-inset ring-[#0A5F7A]/20">
                {activeModalInquiry.department || "General Inquiry"}
              </span>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200/80 bg-white p-3">
                <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <Phone className="h-3.5 w-3.5 text-teal-600" /> Phone Number
                </span>
                <a
                  href={`tel:${activeModalInquiry.phone_number}`}
                  className="mt-1 block font-semibold text-slate-900 hover:text-[#0A5F7A]"
                >
                  {activeModalInquiry.phone_number}
                </a>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-white p-3">
                <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <Mail className="h-3.5 w-3.5 text-amber-600" /> Email Address
                </span>
                <a
                  href={`mailto:${activeModalInquiry.email_address}`}
                  className="mt-1 block font-semibold text-slate-900 hover:text-[#0A5F7A] break-all"
                >
                  {activeModalInquiry.email_address}
                </a>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-white p-3">
                <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-rose-600" /> City / Location
                </span>
                <p className="mt-1 font-semibold text-slate-900">
                  {activeModalInquiry.city || "Not specified"}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200/80 bg-white p-3">
                <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <FileText className="h-3.5 w-3.5 text-indigo-600" /> Subject
                </span>
                <p className="mt-1 font-semibold text-slate-900">
                  {activeModalInquiry.subject || "General Query"}
                </p>
              </div>
            </div>

            {/* Full Message Container */}
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Message / Query Details:
              </span>
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                {activeModalInquiry.message}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-4">
              <button
                type="button"
                onClick={() => setDeletingInquiry(activeModalInquiry)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-800 cursor-pointer"
              >
                <Trash2 className="h-4 w-4" /> Delete this record
              </button>

              <button
                type="button"
                onClick={() => setActiveModalInquiry(null)}
                className="cursor-pointer rounded-xl bg-slate-100 px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deletingInquiry && (
        <Modal
          title="Delete Patient Inquiry"
          onClose={() => setDeletingInquiry(null)}
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <p className="text-sm text-slate-600">
              Are you sure you want to delete the inquiry from{" "}
              <strong className="text-slate-900">
                {deletingInquiry.full_name}
              </strong>{" "}
              (ID: INQ{String(deletingInquiry.id).padStart(3, "0")})? This action
              cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
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
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-700 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition disabled:opacity-60"
              >
                {delSaving ? "Deleting…" : "Yes, Delete Record"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
