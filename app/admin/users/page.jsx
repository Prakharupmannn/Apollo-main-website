"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  AlertTriangle,
  Loader2,
  ShieldCheck,
  UserCheck,
  UserX,
  Users,
  RotateCw,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  PageHeader,
  Card,
  Modal,
  StatusBadge,
  Avatar,
  useToast,
  btnPrimary,
  btnGhost,
  inputCls,
  fmtDate,
} from "@/components/admin/ui";

/* ── API helpers ──────────────────────────────────── */

async function apiCall(method, body) {
  const res  = await fetch("/api/admin/users", {
    method,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Request failed.");
  return data;
}

/* ── Password input with visibility toggle ────────── */
function PasswordInput({ id, value, onChange, placeholder, autoComplete }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete || "new-password"}
        className={`${inputCls} pr-11`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        tabIndex={-1}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

/* ── Form defaults ────────────────────────────────── */
const EMPTY_FORM = { name: "", email: "", username: "", password: "", newPassword: "", status: "1" };

/* ── Main Users page ──────────────────────────────── */
export default function UsersPage() {
  const [users, setUsers]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [fetchErr, setFetchErr] = useState(null);
  const [q, setQ]               = useState("");
  const [editing, setEditing]   = useState(null); // { mode: "add"|"edit", form }
  const [deleting, setDeleting] = useState(null); // user row to delete
  const [saving, setSaving]     = useState(false);
  const [delSaving, setDelSaving] = useState(false);
  const [toast, toastNode]      = useToast();

  /* ── Fetch users ────────────────────────────────── */
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setFetchErr(null);
      const data = await apiCall("GET");
      setUsers(data.users || []);
    } catch (err) {
      setFetchErr(err.message || "Failed to load users.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  /* ── Filtered list ──────────────────────────────── */
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return users;
    return users.filter(
      (u) =>
        String(u.name     ?? "").toLowerCase().includes(needle) ||
        String(u.email    ?? "").toLowerCase().includes(needle) ||
        String(u.username ?? "").toLowerCase().includes(needle)
    );
  }, [users, q]);

  /* ── Open add / edit ────────────────────────────── */
  const openAdd  = () => setEditing({ mode: "add",  form: { ...EMPTY_FORM } });
  const openEdit = (user) =>
    setEditing({
      mode: "edit",
      form: {
        id:          user.id,
        name:        user.name        || "",
        email:       user.email       || "",
        username:    user.username    || "",
        newPassword: "",
        status:      String(user.status ?? 1),
      },
    });

  const setField = (name, value) =>
    setEditing((s) => ({ ...s, form: { ...s.form, [name]: value } }));

  /* ── Save ───────────────────────────────────────── */
  const handleSave = async (e) => {
    e.preventDefault();
    const { form, mode } = editing;

    if (!form.name?.trim())    return toast("Full name is required.", "error");
    if (!form.email?.trim())   return toast("Email address is required.", "error");
    if (mode === "add" && (!form.password || form.password.length < 8))
      return toast("Password must be at least 8 characters.", "error");
    if (mode === "edit" && form.newPassword && form.newPassword.length < 8)
      return toast("New password must be at least 8 characters.", "error");

    setSaving(true);
    try {
      if (mode === "add") {
        await apiCall("POST", {
          name:     form.name.trim(),
          email:    form.email.trim(),
          username: form.username.trim() || form.email.trim(),
          password: form.password,
          status:   form.status === "0" ? 0 : 1,
        });
        toast("User registered successfully.");
      } else {
        await apiCall("PATCH", {
          id:          form.id,
          name:        form.name.trim(),
          email:       form.email.trim(),
          username:    form.username.trim() || form.email.trim(),
          newPassword: form.newPassword || undefined,
          status:      form.status === "0" ? 0 : 1,
        });
        toast("User updated successfully.");
      }
      setEditing(null);
      await fetchUsers();
    } catch (err) {
      toast(err.message || "Operation failed.", "error");
    } finally {
      setSaving(false);
    }
  };

  /* ── Delete ─────────────────────────────────────── */
  const handleDelete = async () => {
    setDelSaving(true);
    try {
      await apiCall("DELETE", { id: deleting.id });
      toast("User removed successfully.");
      setDeleting(null);
      await fetchUsers();
    } catch (err) {
      toast(err.message || "Delete failed.", "error");
      setDeleting(null);
    } finally {
      setDelSaving(false);
    }
  };

  const deleteBtnCls =
    "inline-flex cursor-pointer items-center gap-2 rounded-xl bg-rose-600 hover:bg-rose-700 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:brightness-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-500/30 disabled:opacity-60";

  return (
    <div>
      <PageHeader
        title="Admin Users"
        subtitle="Manage administrator accounts with role-based access to the Apollo JBP Admin Panel."
      >
        <button onClick={fetchUsers} className={btnGhost} title="Refresh">
          <RotateCw className={`h-4 w-4 ${loading ? "animate-spin text-[#0A5F7A]" : ""}`} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
        <button onClick={openAdd} className={btnPrimary}>
          <Plus className="h-4 w-4" /> Add Admin User
        </button>
      </PageHeader>

      {/* Error banner */}
      {fetchErr && (
        <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3.5 text-sm text-rose-800">
          <div className="flex items-center gap-2.5">
            <AlertTriangle className="h-4 w-4 shrink-0 text-rose-600" />
            <span className="font-medium">{fetchErr}</span>
          </div>
          <button
            onClick={fetchUsers}
            className="cursor-pointer text-xs font-bold text-rose-700 underline hover:text-rose-900"
          >
            Retry
          </button>
        </div>
      )}

      {/* Stats strip */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Total Accounts",  value: users.length,                                             icon: Users,       color: "text-[#0A5F7A]", bg: "bg-teal-50" },
          { label: "Active Admins",   value: users.filter((u) => u.status === 1).length,               icon: UserCheck,   color: "text-emerald-700", bg: "bg-emerald-50" },
          { label: "Inactive Admins", value: users.filter((u) => u.status !== 1).length,               icon: UserX,       color: "text-slate-700", bg: "bg-slate-50" },
        ].map(({ label, value, icon: Icon, color, bg }) => (
          <Card key={label} className="flex items-center gap-4 px-5 py-4">
            <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${bg}`}>
              <Icon className={`h-5 w-5 ${color}`} />
            </span>
            <div>
              <p className="text-2xl font-bold text-slate-900">{loading ? "—" : value}</p>
              <p className="text-xs font-semibold text-slate-500">{label}</p>
            </div>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden">
        {/* Search */}
        <div className="border-b border-slate-200/90 p-4 sm:p-5">
          <div className="relative max-w-sm">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, email, or username…"
              aria-label="Search admin users"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-bold uppercase tracking-wider text-slate-600">
                <th className="px-5 py-3.5">User</th>
                <th className="px-5 py-3.5">Username</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Last Login</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {[1, 2, 3, 4, 5].map((j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-4 w-24 rounded-md bg-slate-200" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-sm text-slate-500">
                    {q ? `No users matching "${q}".` : "No admin users found."}
                  </td>
                </tr>
              ) : (
                filtered.map((user) => (
                  <tr key={user.id} className="transition-colors hover:bg-slate-50/70">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <Avatar name={user.name} size={36} />
                        <div>
                          <p className="font-semibold text-slate-900">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-700">
                        {user.username || user.email}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusBadge status={user.status === 1 ? "Active" : "Inactive"} />
                    </td>
                    <td className="px-5 py-3.5 text-xs text-slate-500">
                      {user.last_login_at ? fmtDate(user.last_login_at) : "Never"}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => openEdit(user)}
                          title="Edit user"
                          aria-label={`Edit ${user.name}`}
                          className="grid h-9 w-9 cursor-pointer place-items-center rounded-xl text-[#0A5F7A] transition hover:bg-teal-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5F7A]"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setDeleting(user)}
                          title="Delete user"
                          aria-label={`Delete ${user.name}`}
                          className="grid h-9 w-9 cursor-pointer place-items-center rounded-xl text-rose-600 transition hover:bg-rose-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add / Edit Modal */}
      <Modal
        open={!!editing}
        onClose={() => !saving && setEditing(null)}
        title={editing?.mode === "add" ? "Add Admin User" : "Edit Admin User"}
        subtitle={
          editing?.mode === "add"
            ? "Create a new administrator account with login access."
            : "Update user details. Leave password blank to keep unchanged."
        }
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
              form="user-form"
              disabled={saving}
              className={btnPrimary}
            >
              {saving ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
              ) : editing?.mode === "add" ? (
                "Register User"
              ) : (
                "Save Changes"
              )}
            </button>
          </>
        }
      >
        {editing && (
          <form
            id="user-form"
            onSubmit={handleSave}
            noValidate
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {/* Security badge */}
            <div className="sm:col-span-2 flex items-center gap-2.5 rounded-xl border border-teal-200 bg-teal-50 px-4 py-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-teal-600" />
              <p className="text-xs text-teal-800">
                Passwords are stored as{" "}
                <strong>bcrypt hashes</strong> (12 rounds). They are never
                stored or transmitted in plain text.
              </p>
            </div>

            {/* Full name */}
            <div className="sm:col-span-2">
              <label htmlFor="u-name" className="mb-1 block text-sm font-semibold text-slate-700">
                Full name <span className="text-rose-500">*</span>
              </label>
              <input
                id="u-name"
                type="text"
                autoComplete="name"
                value={editing.form.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="Dr. Full Name"
                className={inputCls}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="u-email" className="mb-1 block text-sm font-semibold text-slate-700">
                Email address <span className="text-rose-500">*</span>
              </label>
              <input
                id="u-email"
                type="email"
                autoComplete="email"
                value={editing.form.email}
                onChange={(e) => setField("email", e.target.value)}
                placeholder="admin@apollo.com"
                className={inputCls}
              />
            </div>

            {/* Username */}
            <div>
              <label htmlFor="u-username" className="mb-1 block text-sm font-semibold text-slate-700">
                Username
              </label>
              <input
                id="u-username"
                type="text"
                autoComplete="username"
                value={editing.form.username}
                onChange={(e) => setField("username", e.target.value)}
                placeholder="Defaults to email"
                className={inputCls}
              />
            </div>

            {/* Password (add mode) or New Password (edit mode) */}
            {editing.mode === "add" ? (
              <div className="sm:col-span-2">
                <label htmlFor="u-password" className="mb-1 block text-sm font-semibold text-slate-700">
                  Password <span className="text-rose-500">*</span>
                </label>
                <PasswordInput
                  id="u-password"
                  value={editing.form.password}
                  onChange={(e) => setField("password", e.target.value)}
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                />
              </div>
            ) : (
              <div className="sm:col-span-2">
                <label htmlFor="u-newpassword" className="mb-1 block text-sm font-semibold text-slate-700">
                  New password{" "}
                  <span className="text-xs font-normal text-slate-400">(leave blank to keep current)</span>
                </label>
                <PasswordInput
                  id="u-newpassword"
                  value={editing.form.newPassword}
                  onChange={(e) => setField("newPassword", e.target.value)}
                  placeholder="Min. 8 characters or leave blank"
                  autoComplete="new-password"
                />
              </div>
            )}

            {/* Status */}
            <div className="sm:col-span-2">
              <label htmlFor="u-status" className="mb-1 block text-sm font-semibold text-slate-700">
                Account Status
              </label>
              <select
                id="u-status"
                value={editing.form.status}
                onChange={(e) => setField("status", e.target.value)}
                className={inputCls}
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
          </form>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        open={!!deleting}
        onClose={() => !delSaving && setDeleting(null)}
        title="Delete admin user?"
        size="sm"
        footer={
          <>
            <button
              onClick={() => !delSaving && setDeleting(null)}
              disabled={delSaving}
              className={btnGhost}
            >
              Keep account
            </button>
            <button
              onClick={handleDelete}
              disabled={delSaving}
              className={deleteBtnCls}
            >
              {delSaving ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Deleting…</>
              ) : (
                <><Trash2 className="h-4 w-4" /> Delete User</>
              )}
            </button>
          </>
        }
      >
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-rose-50 text-rose-600 ring-1 ring-rose-600/20">
            <AlertTriangle className="h-5 w-5" />
          </span>
          <div className="text-sm text-slate-600">
            <p>
              Are you sure you want to remove{" "}
              <strong className="text-slate-900">{deleting?.name}</strong> from
              the admin panel? Their account will be deactivated.
            </p>
            <p className="mt-1.5 text-xs text-rose-700 font-medium">
              Note: The last active administrator cannot be deleted.
            </p>
          </div>
        </div>
      </Modal>

      {toastNode}
    </div>
  );
}
