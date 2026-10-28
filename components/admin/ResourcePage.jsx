"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Download,
  AlertTriangle,
  RotateCw,
  Loader2,
} from "lucide-react";
import {
  Card,
  PageHeader,
  Tabs,
  Pagination,
  Modal,
  StatusBadge,
  Avatar,
  Thumb,
  EmptyState,
  useToast,
  downloadCsv,
  fmtDate,
  inputCls,
  btnPrimary,
  btnGhost,
} from "./ui";

function Cell({ col, row }) {
  const v = row[col.key];
  switch (col.type) {
    case "id":
      return (
        <span className="inline-block rounded-md bg-teal-50 px-2 py-0.5 font-mono text-xs font-bold text-[#0A5F7A] ring-1 ring-teal-600/20">
          {v}
        </span>
      );
    case "status":
      return <StatusBadge status={v || "Active"} />;
    case "date":
      return (
        <span className="whitespace-nowrap font-medium text-slate-600">
          {fmtDate(v)}
        </span>
      );
    case "thumb":
      return <Thumb src={v} label={row.title || row.name} />;
    case "title":
      return <span className="font-semibold text-slate-900">{v}</span>;
    case "person":
      return (
        <div className="flex items-center gap-3">
          <Avatar name={v} src={row[col.imageKey || "photo"]} />
          <div className="min-w-0">
            <p className="font-semibold text-slate-900">{v}</p>
            {col.subKey && (
              <p className="text-xs text-slate-500">{row[col.subKey]}</p>
            )}
          </div>
        </div>
      );
    default:
      return <span className="text-slate-700">{v}</span>;
  }
}

export default function ResourcePage({
  config,
  data,
  loading = false,
  error = null,
  onRefresh,
  onSave,    // async (mode: "add"|"edit", form: object) => void — throws on error
  onDelete,  // async (row: object) => void — throws on error
  CustomModal,
}) {
  const {
    title,
    subtitle,
    addLabel,
    singular,
    idPrefix,
    initial = [],
    tabs,
    columns,
    fields,
    searchKeys,
    pageSize = 6,
  } = config;

  const [items, setItems]     = useState(data || initial);
  const [q, setQ]             = useState("");
  const [tab, setTab]         = useState("All");
  const [page, setPage]       = useState(1);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [saving, setSaving]   = useState(false);
  const [delSaving, setDelSaving] = useState(false);
  const [toast, toastNode]    = useToast();

  // Sync state when dynamic API data updates
  useEffect(() => {
    if (data !== undefined && data !== null) setItems(data);
  }, [data]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((r) => {
      const okTab = !tabs || tab === "All" || r[tabs.field] === tab;
      const okQ =
        !needle ||
        searchKeys.some((k) =>
          String(r[k] ?? "")
            .toLowerCase()
            .includes(needle)
        );
      return okTab && okQ;
    });
  }, [items, q, tab, tabs, searchKeys]);

  const pageItems = filtered.slice((page - 1) * pageSize, page * pageSize);

  const tabList = tabs
    ? [
        { key: "All", label: "All", count: items.length },
        ...tabs.options.map((o) => ({
          key: o,
          label: o,
          count: items.filter((r) => r[tabs.field] === o).length,
        })),
      ]
    : null;

  const defaults = () =>
    Object.fromEntries(
      fields.map((f) => [
        f.name,
        f.type === "select"
          ? f.options[0]
          : f.name === "date"
          ? new Date().toISOString().slice(0, 10)
          : "",
      ])
    );

  const openAdd  = () => setEditing({ mode: "add",  form: defaults() });
  const openEdit = (row) => setEditing({ mode: "edit", form: { ...row } });
  const setField = (name, value) =>
    setEditing((s) => ({ ...s, form: { ...s.form, [name]: value } }));

  /* ── Save (Create / Update) ─────────────────────── */
  const save = async (e) => {
    e.preventDefault();
    const missing = fields.find(
      (f) => f.required && !String(editing.form[f.name] ?? "").trim()
    );
    if (missing) return toast(`${missing.label} is required.`, "error");

    if (onSave) {
      // API-backed save
      setSaving(true);
      try {
        await onSave(editing.mode, editing.form);
        toast(`${singular} ${editing.mode === "add" ? "added" : "updated"}.`);
        setEditing(null);
        setPage(1);
        if (onRefresh) onRefresh();
      } catch (err) {
        toast(err.message || `Failed to save ${singular.toLowerCase()}.`, "error");
      } finally {
        setSaving(false);
      }
    } else {
      // Local-state fallback (no backend)
      if (editing.mode === "add") {
        const n =
          items.reduce(
            (m, r) =>
              Math.max(m, parseInt(String(r.id).replace(/\D/g, ""), 10) || 0),
            0
          ) + 1;
        const id = `${idPrefix}${String(n).padStart(3, "0")}`;
        setItems([{ ...editing.form, id }, ...items]);
        toast(`${singular} added.`);
      } else {
        setItems(
          items.map((r) => (r.id === editing.form.id ? editing.form : r))
        );
        toast(`${singular} updated.`);
      }
      setEditing(null);
      setPage(1);
    }
  };

    /* ── Save used by the custom modal ──────────────── */
  const saveCustom = async (form) => {
    await onSave(editing.mode, form); // throws on error, so the modal shows it
    toast(`${singular} ${editing.mode === "add" ? "added" : "updated"}.`);
    setPage(1);
    if (onRefresh) onRefresh();
  };

  /* ── Delete ─────────────────────────────────────── */
  const confirmDelete = async () => {
    if (onDelete) {
      setDelSaving(true);
      try {
        await onDelete(deleting);
        toast(`${singular} deleted.`);
        setDeleting(null);
        if (onRefresh) onRefresh();
      } catch (err) {
        toast(err.message || `Failed to delete ${singular.toLowerCase()}.`, "error");
        setDeleting(null);
      } finally {
        setDelSaving(false);
      }
    } else {
      setItems(items.filter((r) => r.id !== deleting.id));
      setDeleting(null);
      toast(`${singular} deleted.`);
    }
  };

  const exportCsv = () =>
    downloadCsv(
      `${singular.toLowerCase().replace(/\s/g, "-")}s.csv`,
      columns.map((c) => c.label),
      filtered.map((r) => columns.map((c) => r[c.key]))
    );

  const deleteBtnCls =
    "inline-flex cursor-pointer items-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-700 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:brightness-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-500/30 disabled:opacity-60";

  return (
    <div>
      <PageHeader title={title} subtitle={subtitle}>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className={btnGhost}
            title="Refresh from API"
          >
            <RotateCw
              className={`h-4 w-4 ${loading ? "animate-spin text-[#0A5F7A]" : ""}`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        )}
        <button onClick={exportCsv} className={btnGhost}>
          <Download className="h-4 w-4" /> Export CSV
        </button>
        <button onClick={openAdd} className={btnPrimary}>
          <Plus className="h-4 w-4" /> {addLabel}
        </button>
      </PageHeader>

      {/* Error alert banner */}
      {error && (
        <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3.5 text-sm text-rose-800">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600" />
            <span className="font-medium">{error}</span>
          </div>
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="cursor-pointer text-xs font-bold text-rose-700 underline hover:text-rose-900"
            >
              Retry
            </button>
          )}
        </div>
      )}

      <Card className="overflow-hidden">
        {/* Search bar & Tabs */}
        <div className="flex flex-col gap-3.5 border-b border-slate-200/90 p-4 sm:p-5">
          <div className="relative max-w-sm">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              placeholder={`Search ${title.toLowerCase()}…`}
              aria-label={`Search ${title}`}
              className={`${inputCls} pl-10`}
            />
          </div>
          {tabList && (
            <Tabs
              tabs={tabList}
              value={tab}
              onChange={(k) => {
                setTab(k);
                setPage(1);
              }}
            />
          )}
        </div>

        {/* Data table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-bold uppercase tracking-wider text-slate-600">
                {columns.map((c) => (
                  <th key={c.key} className="px-5 py-3.5">
                    {c.label}
                  </th>
                ))}
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={`skeleton-${i}`} className="animate-pulse">
                    {columns.map((c) => (
                      <td key={c.key} className="px-5 py-4">
                        <div className="h-4 w-28 rounded-md bg-slate-200" />
                      </td>
                    ))}
                    <td className="px-5 py-4 text-right">
                      <div className="ml-auto h-7 w-16 rounded-md bg-slate-200" />
                    </td>
                  </tr>
                ))
              ) : pageItems.length > 0 ? (
                pageItems.map((row) => (
                  <tr
                    key={row.id}
                    className="transition-colors hover:bg-slate-50/70"
                  >
                    {columns.map((c) => (
                      <td key={c.key} className="px-5 py-3.5 align-middle">
                        <Cell col={c} row={row} />
                      </td>
                    ))}
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => openEdit(row)}
                          aria-label={`Edit ${row.id}`}
                          title="Edit record"
                          className="grid h-9 w-9 cursor-pointer place-items-center rounded-xl text-[#0A5F7A] transition hover:bg-teal-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5F7A]"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleting(row)}
                          aria-label={`Delete ${row.id}`}
                          title="Delete record"
                          className="grid h-9 w-9 cursor-pointer place-items-center rounded-xl text-rose-600 transition hover:bg-rose-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="py-6">
                    <EmptyState />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <Pagination
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onChange={setPage}
          noun={title.toLowerCase()}
        />
      </Card>

      {/* Add / Edit Modal */}
      {CustomModal ? (
        <CustomModal
          open={!!editing}
          mode={editing?.mode}
          initial={editing?.form}
          departments={tabs?.options}
          onClose={() => setEditing(null)}
          onSubmit={saveCustom}
        />
      ) : (
      <Modal
        open={!!editing}
        onClose={() => !saving && setEditing(null)}
        title={
          editing
            ? `${editing.mode === "add" ? "Add" : "Edit"} ${singular}`
            : ""
        }
        subtitle="Fields marked * are required."
        size="lg"
        footer={
          <>
            <button
              type="button"
              onClick={() => !saving && setEditing(null)}
              disabled={saving}
              className={btnGhost}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="resource-form"
              disabled={saving}
              className={btnPrimary}
            >
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : editing?.mode === "add" ? (
                "Add Record"
              ) : (
                "Save Changes"
              )}
            </button>
          </>
        }
      >
        {editing && (
          <form
            id="resource-form"
            onSubmit={save}
            noValidate
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {fields.map((f) => (
              <div key={f.name} className={f.full ? "sm:col-span-2" : ""}>
                <label
                  htmlFor={`f-${f.name}`}
                  className="mb-1 block text-sm font-semibold text-slate-700"
                >
                  {f.label}
                  {f.required && <span className="text-rose-500"> *</span>}
                </label>
                {f.type === "select" ? (
                  <select
                    id={`f-${f.name}`}
                    value={editing.form[f.name]}
                    onChange={(e) => setField(f.name, e.target.value)}
                    className={inputCls}
                  >
                    {f.options.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                ) : f.type === "textarea" ? (
                  <textarea
                    id={`f-${f.name}`}
                    rows={3}
                    value={editing.form[f.name] ?? ""}
                    onChange={(e) => setField(f.name, e.target.value)}
                    placeholder={f.placeholder}
                    className={inputCls}
                  />
                ) : (
                  <input
                    id={`f-${f.name}`}
                    type={f.type || "text"}
                    value={editing.form[f.name] ?? ""}
                    onChange={(e) => setField(f.name, e.target.value)}
                    placeholder={f.placeholder}
                    className={inputCls}
                  />
                )}
              </div>
            ))}
          </form>
        )}
      </Modal>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        open={!!deleting}
        onClose={() => !delSaving && setDeleting(null)}
        title={`Delete ${singular.toLowerCase()}?`}
        size="sm"
        footer={
          <>
            <button
              onClick={() => !delSaving && setDeleting(null)}
              disabled={delSaving}
              className={btnGhost}
            >
              Keep it
            </button>
            <button
              onClick={confirmDelete}
              disabled={delSaving}
              className={deleteBtnCls}
            >
              {delSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deleting…
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" /> Delete Record
                </>
              )}
            </button>
          </>
        }
      >
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-rose-50 text-rose-600 ring-1 ring-rose-600/20">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <p className="text-sm leading-relaxed text-slate-600">
            Are you sure you want to delete{" "}
            <strong className="text-slate-900">
              {deleting?.title || deleting?.name}
            </strong>
            ? This action cannot be undone.
          </p>
        </div>
      </Modal>

      {toastNode}
    </div>
  );
}