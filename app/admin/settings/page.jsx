"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  User,
  ShieldCheck,
  Bell,
  Save,
  Mail,
  Phone,
  Building2,
  Calendar,
  Clock,
  Eye,
  EyeOff,
  Users,
  CheckCircle2,
  Lock,
  Edit3,
  Loader2,
} from "lucide-react";
import {
  Card,
  PageHeader,
  Avatar,
  useToast,
  inputCls,
  btnPrimary,
} from "@/components/admin/ui";
import { displayFont } from "@/components/admin/fonts";

/* ── Toggle switch ─────────────────────────────────────── */
function Switch({ checked, onChange, label, text }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 transition hover:bg-slate-50 hover:border-slate-300">
      <div className="min-w-0">
        <p className="text-sm font-bold text-slate-900">{label}</p>
        <p className="text-xs text-slate-500 mt-0.5">{text}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0A5F7A]/20 ${
          checked ? "bg-[#0A5F7A]" : "bg-slate-200"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-200 ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

/* ── Password field with show/hide ────────────────────── */
function PasswordInput({ id, label, value, onChange, autoComplete, placeholder }) {
  const [show, setShow] = useState(false);
  const labelCls = "mb-1.5 block text-sm font-semibold text-slate-700";
  return (
    <div>
      <label className={labelCls} htmlFor={id}>{label}</label>
      <div className="relative">
        <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          id={id}
          type={show ? "text" : "password"}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className={`${inputCls} pl-10 pr-10`}
          value={value}
          onChange={onChange}
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

/* ── Stat pill for profile card ───────────────────────── */
function StatPill({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-white/60 border border-slate-200/80 px-3.5 py-2.5">
      <Icon className="h-4 w-4 text-[#0A5F7A] shrink-0" />
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{label}</p>
        <p className="text-sm font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

/* ── Tabs ─────────────────────────────────────────────── */
const TABS = [
  { key: "profile", label: "Profile", icon: User },
  { key: "security", label: "Security", icon: ShieldCheck },
  { key: "notifications", label: "Notifications", icon: Bell },
  { key: "team", label: "Team Members", icon: Users },
];

/* ── Helpers ──────────────────────────────────────────── */
function fmtDate(d) {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
}

function fmtDateTime(d) {
  if (!d) return "—";
  return new Date(d).toLocaleString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

/* ── Main Page ────────────────────────────────────────── */
export default function SettingsPage() {
  const [tab, setTab] = useState("profile");
  const [toast, toastNode] = useToast();

  // Profile state
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    username: "",
    phone: "",
    status: 1,
    last_login_at: null,
    created_at: null,
  });

  // Password state
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });
  const [savingPw, setSavingPw] = useState(false);

  // Notifications state
  const [prefs, setPrefs] = useState({
    newAppt: true,
    events: true,
    drafts: false,
    digest: true,
  });

  // Team members state
  const [teamUsers, setTeamUsers] = useState([]);
  const [loadingTeam, setLoadingTeam] = useState(false);

  /* ── Fetch current user profile ──── */
  const fetchProfile = useCallback(async () => {
    setLoadingProfile(true);
    try {
      const res = await fetch("/api/admin/me");
      const data = await res.json();
      if (data.success && data.user) {
        setProfile({
          id: String(data.user.id),
          name: data.user.name || "",
          email: data.user.email || "",
          username: data.user.username || "",
          phone: data.user.phone || "",
          status: data.user.status,
          last_login_at: data.user.last_login_at,
          created_at: data.user.created_at,
        });
      }
    } catch (e) {
      toast("Failed to load profile.", "error");
    } finally {
      setLoadingProfile(false);
    }
  }, [toast]);

  /* ── Fetch team members ──── */
  const fetchTeam = useCallback(async () => {
    setLoadingTeam(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.success) {
        setTeamUsers(data.users || []);
      }
    } catch (e) {
      // silent fail
    } finally {
      setLoadingTeam(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (tab === "team") fetchTeam();
  }, [tab, fetchTeam]);

  /* ── Save profile ──── */
  const saveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const res = await fetch("/api/admin/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast("Profile saved successfully.");
      } else {
        toast(data.message || "Failed to save profile.", "error");
      }
    } catch (e) {
      toast("Network error. Please try again.", "error");
    } finally {
      setSavingProfile(false);
    }
  };

  /* ── Save password ──── */
  const savePassword = async (e) => {
    e.preventDefault();
    if (pw.next.length < 8) return toast("New password must be at least 8 characters.", "error");
    if (pw.next !== pw.confirm) return toast("Passwords do not match.", "error");
    setSavingPw(true);
    try {
      const res = await fetch("/api/admin/me/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ current: pw.current, next: pw.next, confirm: pw.confirm }),
      });
      const data = await res.json();
      if (data.success) {
        setPw({ current: "", next: "", confirm: "" });
        toast("Password updated successfully.");
      } else {
        toast(data.message || "Failed to update password.", "error");
      }
    } catch (e) {
      toast("Network error. Please try again.", "error");
    } finally {
      setSavingPw(false);
    }
  };

  const labelCls = "mb-1.5 block text-sm font-semibold text-slate-700";
  const h2 = `${displayFont.className} text-2xl font-bold text-slate-900 mb-1`;

  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Manage your account, security credentials, and system preferences."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* ── Left vertical tab list ── */}
        <div className="h-fit lg:col-span-1">
          <Card className="overflow-hidden p-2">
            <div role="tablist" className="flex gap-1 lg:flex-col">
              {TABS.map(({ key, label: l, icon: Icon }) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={tab === key}
                  onClick={() => setTab(key)}
                  className={`flex flex-1 cursor-pointer items-center gap-2.5 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5F7A] lg:flex-none ${
                    tab === key
                      ? "bg-[#0A5F7A] text-white shadow-xs font-bold"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 ${
                      tab === key ? "text-amber-300" : "text-slate-400"
                    }`}
                  />
                  <span className="hidden sm:block lg:block">{l}</span>
                </button>
              ))}
            </div>
          </Card>

          {/* Quick info card below tabs (desktop) */}
          {!loadingProfile && profile.name && (
            <Card className="mt-4 hidden p-4 lg:block">
              <div className="flex flex-col items-center gap-3 text-center">
                <div className="relative">
                  <Avatar name={profile.name} size={64} />
                  <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 ring-2 ring-white">
                    <CheckCircle2 className="h-3 w-3 text-white" />
                  </span>
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900">{profile.name}</p>
                  <p className="text-xs text-[#0A5F7A] font-semibold">Administrator</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">{profile.email}</p>
                </div>
                <div className="w-full border-t border-slate-100 pt-3 space-y-1.5 text-left">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Calendar className="h-3.5 w-3.5 text-slate-400" />
                    <span>Joined {fmtDate(profile.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="h-3.5 w-3.5 text-slate-400" />
                    <span>Last login {fmtDate(profile.last_login_at)}</span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* ── Right content area ── */}
        <div className="lg:col-span-3">
          {/* PROFILE TAB */}
          {tab === "profile" && (
            <Card className="overflow-hidden">
              {/* Header banner */}
              <div className="h-24 bg-gradient-to-r from-[#2a4e61] via-[#0A5F7A] to-[#1D82A6] relative">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(245,158,11,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 40%)" }}
                />
              </div>

              <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                {loadingProfile ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-[#0A5F7A]" />
                  </div>
                ) : (
                  <form onSubmit={saveProfile} className="space-y-6">
                    {/* Avatar + identity */}
                    <div className="-mt-6 mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                      <div className="flex items-end gap-4">
                        <div className="relative">
                          <Avatar name={profile.name} size={80} />
                          <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400 ring-2 ring-white shadow-sm">
                            <CheckCircle2 className="h-4 w-4 text-white" />
                          </span>
                        </div>
                        <div className="pb-1">
                          <h2 className={`${displayFont.className} text-xl font-bold text-slate-900`}>
                            {profile.name || "Your Profile"}
                          </h2>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#0A5F7A]/10 px-2.5 py-0.5 text-[11px] font-bold text-[#0A5F7A]">
                              <ShieldCheck className="h-3 w-3" /> Administrator
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 mb-6">
                      <StatPill icon={Building2} label="Organization" value="Apollo JBP" />
                      <StatPill icon={Calendar} label="Member Since" value={fmtDate(profile.created_at)} />
                      <StatPill icon={Clock} label="Last Login" value={fmtDate(profile.last_login_at)} />
                    </div>

                    {/* Section title */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0A5F7A]/10">
                        <Edit3 className="h-4 w-4 text-[#0A5F7A]" />
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">Edit Profile Information</h3>
                        <p className="text-xs text-slate-500">Update your personal details below</p>
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="sm:col-span-2">
                        <label className={labelCls} htmlFor="s-name">
                          Full Name
                        </label>
                        <div className="relative">
                          <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <input
                            id="s-name"
                            className={`${inputCls} pl-10`}
                            value={profile.name}
                            placeholder="Your full name"
                            onChange={(e) =>
                              setProfile({ ...profile, name: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <label className={labelCls} htmlFor="s-email">
                          Official Email
                        </label>
                        <div className="relative">
                          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <input
                            id="s-email"
                            type="email"
                            className={`${inputCls} pl-10`}
                            value={profile.email}
                            placeholder="your@email.com"
                            onChange={(e) =>
                              setProfile({ ...profile, email: e.target.value })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <label className={labelCls} htmlFor="s-phone">
                          Contact Phone
                        </label>
                        <div className="relative">
                          <Phone className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                          <input
                            id="s-phone"
                            className={`${inputCls} pl-10`}
                            value={profile.phone}
                            placeholder="+91 XXXXX XXXXX"
                            onChange={(e) =>
                              setProfile({ ...profile, phone: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={savingProfile}
                        className={`${btnPrimary} min-w-[140px]`}
                      >
                        {savingProfile ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Save className="h-4 w-4" />
                        )}
                        {savingProfile ? "Saving…" : "Save Profile"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Card>
          )}

          {/* SECURITY TAB */}
          {tab === "security" && (
            <Card className="overflow-hidden">
              {/* Header */}
              <div className="h-2 bg-gradient-to-r from-[#073646] via-[#0A5F7A] to-[#1D82A6]" />
              <div className="px-6 sm:px-8 py-6 sm:py-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A5F7A]/10">
                    <ShieldCheck className="h-5 w-5 text-[#0A5F7A]" />
                  </span>
                  <div>
                    <h2 className={h2}>Security Credentials</h2>
                    <p className="text-xs text-slate-500">Update your password to keep your account secure</p>
                  </div>
                </div>

                {/* Security info banner */}
                <div className="mb-6 rounded-2xl border border-amber-200/80 bg-amber-50/60 p-4">
                  <div className="flex items-start gap-3">
                    <Lock className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-amber-900">Password requirements</p>
                      <ul className="mt-1 text-xs text-amber-700 space-y-0.5 list-disc list-inside">
                        <li>At least 8 characters long</li>
                        <li>Use a mix of letters, numbers, and symbols for best security</li>
                        <li>Do not reuse recent passwords</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <form onSubmit={savePassword} className="max-w-md space-y-4">
                  <PasswordInput
                    id="p-cur"
                    label="Current Password"
                    autoComplete="current-password"
                    placeholder="Enter your current password"
                    value={pw.current}
                    onChange={(e) => setPw({ ...pw, current: e.target.value })}
                  />
                  <PasswordInput
                    id="p-new"
                    label="New Password"
                    autoComplete="new-password"
                    placeholder="Enter a new password (min. 8 chars)"
                    value={pw.next}
                    onChange={(e) => setPw({ ...pw, next: e.target.value })}
                  />
                  <PasswordInput
                    id="p-con"
                    label="Confirm New Password"
                    autoComplete="new-password"
                    placeholder="Re-enter your new password"
                    value={pw.confirm}
                    onChange={(e) => setPw({ ...pw, confirm: e.target.value })}
                  />

                  {/* Password strength indicator */}
                  {pw.next && (
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <p className="text-xs font-semibold text-slate-600 mb-2">Password strength</p>
                      <div className="flex gap-1">
                        {[8, 12, 16].map((threshold, i) => (
                          <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-colors ${
                              pw.next.length >= threshold
                                ? i === 0 ? "bg-rose-400" : i === 1 ? "bg-amber-400" : "bg-emerald-500"
                                : "bg-slate-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className={`text-[11px] mt-1 font-medium ${
                        pw.next.length >= 16 ? "text-emerald-600" :
                        pw.next.length >= 12 ? "text-amber-600" : "text-rose-500"
                      }`}>
                        {pw.next.length >= 16 ? "Strong" : pw.next.length >= 12 ? "Medium" : "Weak"}
                      </p>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={savingPw}
                      className={`${btnPrimary} min-w-[160px]`}
                    >
                      {savingPw ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <ShieldCheck className="h-4 w-4" />
                      )}
                      {savingPw ? "Updating…" : "Update Password"}
                    </button>
                  </div>
                </form>
              </div>
            </Card>
          )}

          {/* NOTIFICATIONS TAB */}
          {tab === "notifications" && (
            <Card className="overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-[#073646] via-[#0A5F7A] to-[#1D82A6]" />
              <div className="px-6 sm:px-8 py-6 sm:py-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A5F7A]/10">
                    <Bell className="h-5 w-5 text-[#0A5F7A]" />
                  </span>
                  <div>
                    <h2 className={h2}>Notification Preferences</h2>
                    <p className="text-xs text-slate-500">Choose which alerts and digests you receive</p>
                  </div>
                </div>

                <div className="max-w-xl space-y-3">
                  <Switch
                    checked={prefs.newAppt}
                    onChange={(v) => setPrefs({ ...prefs, newAppt: v })}
                    label="New Appointments"
                    text="Receive immediate alerts when a patient schedules a new visit."
                  />
                  <Switch
                    checked={prefs.events}
                    onChange={(v) => setPrefs({ ...prefs, events: v })}
                    label="Event Updates"
                    text="Notify me when community health camps or events are published."
                  />
                  <Switch
                    checked={prefs.drafts}
                    onChange={(v) => setPrefs({ ...prefs, drafts: v })}
                    label="Draft Reminders"
                    text="Send periodic reminders about unpublished articles or case studies."
                  />
                  <Switch
                    checked={prefs.digest}
                    onChange={(v) => setPrefs({ ...prefs, digest: v })}
                    label="Daily Clinical Digest"
                    text="Email an executive summary of hospital activities every morning."
                  />
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => toast("Preferences saved.")}
                      className={`${btnPrimary} min-w-[160px]`}
                    >
                      <Save className="h-4 w-4" /> Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* TEAM MEMBERS TAB */}
          {tab === "team" && (
            <Card className="overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-[#073646] via-[#0A5F7A] to-[#1D82A6]" />
              <div className="px-6 sm:px-8 py-6 sm:py-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0A5F7A]/10">
                    <Users className="h-5 w-5 text-[#0A5F7A]" />
                  </span>
                  <div>
                    <h2 className={h2}>Team Members</h2>
                    <p className="text-xs text-slate-500">All administrators with access to this panel</p>
                  </div>
                </div>

                {loadingTeam ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-[#0A5F7A]" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {teamUsers.length === 0 && (
                      <p className="text-sm text-slate-500 text-center py-8">No team members found.</p>
                    )}
                    {teamUsers.map((u) => {
                      const isMe = String(u.id) === String(loadingProfile ? "" : profile.id);
                      return (
                        <div
                          key={u.id}
                          className={`flex items-center gap-4 rounded-2xl border p-4 transition ${
                            isMe
                              ? "border-[#0A5F7A]/30 bg-[#0A5F7A]/5"
                              : "border-slate-200/80 bg-slate-50/50 hover:bg-slate-50"
                          }`}
                        >
                          <div className="relative shrink-0">
                            <Avatar name={u.name} size={48} />
                            {isMe && (
                              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0A5F7A] ring-2 ring-white">
                                <CheckCircle2 className="h-2.5 w-2.5 text-white" />
                              </span>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="text-sm font-bold text-slate-900">{u.name}</p>
                              {isMe && (
                                <span className="rounded-full bg-[#0A5F7A] px-2 py-0.5 text-[10px] font-bold text-white">
                                  You
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 truncate">{u.email}</p>
                            {u.last_login_at && (
                              <p className="text-[11px] text-slate-400 mt-0.5">
                                Last login: {fmtDateTime(u.last_login_at)}
                              </p>
                            )}
                          </div>
                          <div className="shrink-0">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                              Number(u.status) === 1
                                ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20"
                                : "bg-rose-50 text-rose-700 ring-rose-600/20"
                            }`}>
                              <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
                              {Number(u.status) === 1 ? "Active" : "Inactive"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>

      {toastNode}
    </div>
  );
}
