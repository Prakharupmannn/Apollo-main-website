"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Stethoscope,
  CalendarCheck,
  Megaphone,
  ClipboardList,
  BookOpen,
  Image as ImageIcon,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Users,
  Briefcase,
  MessageSquareText,
  CalendarDays,

MessageSquare,
Globe,
BriefcaseBusiness,
AlertTriangle,
} from "lucide-react";
import { RefreshCw, X, Info } from "lucide-react";
import { useAdminNotifications } from "@/hooks/useAdminNotifications";
import { ADMIN_BASE, NOTIFICATIONS } from "@/lib/admin-data";
import { displayFont } from "./fonts";

export const NAV = [
  { label: "Dashboard", href: ADMIN_BASE, icon: LayoutDashboard },
  { label: "Doctors", href: `${ADMIN_BASE}/doctors`, icon: Stethoscope },
  { label: "Careers", href: `${ADMIN_BASE}/careers`, icon: Briefcase },

  {
    label: "Appointments",
    href: `${ADMIN_BASE}/appointments`,
    icon: CalendarCheck,
  },
  { label: "Events", href: `${ADMIN_BASE}/events`, icon: Megaphone },
  {
    label: "Case Studies",
    href: `${ADMIN_BASE}/case-studies`,
    icon: ClipboardList,
  },
  {
    label: "Health Library",
    href: `${ADMIN_BASE}/health-library`,
    icon: BookOpen,
  },
  { label: "Admin Users", href: `${ADMIN_BASE}/users`, icon: Users },
  {
    label: "Inquiries",
    href: `${ADMIN_BASE}/inquiries`,
    icon: MessageSquareText,
  },
  { label: "Specialties", href: `${ADMIN_BASE}/specialties`, icon: Sparkles },
  { label: "Settings", href: `${ADMIN_BASE}/settings`, icon: Settings },
];


const NOTIFICATION_ICONS = {
  appointment: CalendarDays,
  doctor: Stethoscope,
  enquiry: MessageSquare,
  website: Globe,
  career: BriefcaseBusiness,
  system: AlertTriangle,
};

const NOTIFICATION_COLORS = {
  info: "bg-sky-50 text-sky-600",
  success: "bg-emerald-50 text-emerald-600",
  warning: "bg-amber-50 text-amber-600",
  error: "bg-rose-50 text-rose-600",
};

function getNotificationTime(date) {
  const timestamp = new Date(date).getTime();

  if (!Number.isFinite(timestamp)) return "";

  const seconds = Math.max(
    0,
    Math.floor((Date.now() - timestamp) / 1000)
  );

  if (seconds < 60) return "Just now";

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) return `${minutes} min ago`;

  const hours = Math.floor(minutes / 60);

  if (hours < 24) return `${hours} hr ago`;

  const days = Math.floor(hours / 24);

  if (days < 7) return `${days} days ago`;

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}


function useOutside(ref, onOut) {
  useEffect(() => {
    const h = (e) => ref.current && !ref.current.contains(e.target) && onOut();
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [ref, onOut]);
}

function Sidebar({ collapsed, setCollapsed, mobileOpen, onClose, onLogout }) {
  const pathname = usePathname();
  const isActive = (href) =>
    href === ADMIN_BASE ? pathname === href : pathname.startsWith(href);

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col overflow-hidden border-r border-[#062c3b] bg-gradient-to-b from-[#073646] via-[#083D4F] to-[#062E3C] text-white shadow-xl transition-all duration-300 ${
          collapsed ? "lg:w-[88px]" : "lg:w-[276px]"
        } w-[276px] ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Brand header */}
        <div className="relative flex items-center justify-between px-4 pb-3 pt-5 border-b border-white/10">
          <Link
            href={ADMIN_BASE}
            className="block rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
          >
            {collapsed ? (
              <span
                className={`${displayFont.className} grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#F59E0B] to-[#D97706] text-3xl font-bold text-slate-950 shadow-md ring-2 ring-white/20`}
              >
                A
              </span>
            ) : (
              <div className="flex items-center gap-3">
                <span className="block rounded-xl bg-white px-3 py-1.5 shadow-sm ring-1 ring-white/50">
                  <Image
                    src="/images/apollologo.webp"
                    alt="Apollo JBP Hospitals"
                    width={200}
                    height={60}
                    priority
                    className="h-9 w-auto object-contain"
                  />
                </span>
                <div className="leading-tight">
                  <span className="block text-xs font-bold uppercase tracking-wider text-amber-300">
                    Admin Portal
                  </span>
                  <span className="block text-[11px] text-teal-100/75">
                    Jabalpur Center
                  </span>
                </div>
              </div>
            )}
          </Link>
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-xl text-teal-100/70 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Section Title */}
        <p
          className={`relative px-5 pb-1 pt-4 text-[10px] font-bold uppercase tracking-wider text-teal-200/50 ${
            collapsed ? "lg:hidden" : ""
          }`}
        >
          Management Console
        </p>

        {/* Navigation list */}
        <nav
          className="relative flex-1 space-y-1 overflow-y-auto px-3 py-2"
          aria-label="Admin navigation"
        >
          {NAV.map(({ label, href, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                title={collapsed ? label : undefined}
                onClick={onClose}
                aria-current={active ? "page" : undefined}
                className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 ${
                  collapsed ? "lg:justify-center" : ""
                } ${
                  active
                    ? "bg-white/15 text-white shadow-xs ring-1 ring-inset ring-white/20"
                    : "text-teal-100/75 hover:bg-white/10 hover:text-white"
                }`}
              >
                {active && (
                  <span className="absolute bottom-2 left-0 top-2 w-1.5 rounded-r-full bg-gradient-to-b from-[#F59E0B] to-[#D97706] shadow-sm" />
                )}
                <Icon
                  className={`h-[19px] w-[19px] shrink-0 transition-colors ${
                    active ? "text-[#FDE68A]" : "group-hover:text-amber-200"
                  }`}
                />
                <span className={collapsed ? "lg:hidden" : ""}>{label}</span>
              </Link>
            );
          })}
        </nav>

        {/* System Status card */}
        <div
          className={`relative mx-3 mb-2 rounded-2xl border border-white/10 bg-white/[0.06] p-3.5 ${
            collapsed ? "lg:hidden" : ""
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <p className="text-xs font-bold text-white">
              All Systems Operational
            </p>
          </div>
          <p className="mt-1 text-[11px] text-teal-100/70">
            Website and clinical portals live.
          </p>
        </div>

        {/* Bottom Actions */}
        <div className="relative space-y-1 border-t border-white/10 p-3">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden w-full cursor-pointer items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-teal-100/70 transition hover:bg-white/10 hover:text-white lg:flex"
            aria-label={
              collapsed ? "Expand sidebar menu" : "Collapse sidebar menu"
            }
          >
            {collapsed ? (
              <ChevronsRight className="mx-auto h-[18px] w-[18px]" />
            ) : (
              <>
                <ChevronsLeft className="h-[18px] w-[18px]" />
                <span>Collapse menu</span>
              </>
            )}
          </button>
          <button
            className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/20 hover:text-rose-100 ${
              collapsed ? "lg:justify-center" : ""
            }`}
            onClick={onLogout}
          >
            <LogOut className="h-[18px] w-[18px] shrink-0" />
            <span className={collapsed ? "lg:hidden" : ""}>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}

function TopBar({ onMenu, onLogout, user }) {
  const router = useRouter();
  const pathname = usePathname();
  const [q, setQ] = useState("");
  const [focus, setFocus] = useState(false);
  const [bell, setBell] = useState(false);
  const [profile, setProfile] = useState(false);
  const inputRef = useRef(null);
  const searchRef = useRef(null);
  const bellRef = useRef(null);
  const profRef = useRef(null);

  const {
  notifications,
  unreadCount,
  loading: loadingNotifications,
  fetchNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} = useAdminNotifications();

  // Derive display values from the user prop
  const displayName = user?.name || "Admin";
  const displayEmail = user?.email || "";
  const displayRole = "Administrator";
  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase() || "A";

  useOutside(searchRef, () => setFocus(false));
  useOutside(bellRef, () => setBell(false));
  useOutside(profRef, () => setProfile(false));

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = NAV.find((n) =>
    n.href === ADMIN_BASE ? pathname === n.href : pathname.startsWith(n.href),
  );

  const results = useMemo(
    () =>
      q.trim()
        ? NAV.filter((n) => n.label.toLowerCase().includes(q.toLowerCase()))
        : NAV,
    [q],
  );

  const go = (href) => {
    setQ("");
    setFocus(false);
    inputRef.current?.blur();
    router.push(href);
  };

  const pop =
    "absolute right-0 top-full z-50 mt-2 rounded-2xl border border-slate-200 bg-white shadow-2xl animate-in fade-in-0 zoom-in-95 duration-150";
  const iconBtn =
    "relative grid h-10 w-10 cursor-pointer place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5F7A]";

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-slate-200/90 bg-white/95 px-4 py-2.5 backdrop-blur-md sm:px-8 shadow-xs">
      <button
        onClick={onMenu}
        className={`${iconBtn} lg:hidden`}
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Breadcrumb */}
      <p className="hidden shrink-0 text-sm text-slate-400 md:block">
        Admin <span className="mx-1.5 text-slate-300">/</span>
        <span className="font-semibold text-slate-800">
          {current?.label || "Dashboard"}
        </span>
      </p>

      {/* Jump to page search */}
      <div ref={searchRef} className="relative ml-0 max-w-md flex-1 md:ml-4">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocus(true)}
          onKeyDown={(e) =>
            e.key === "Enter" && results[0] && go(results[0].href)
          }
          placeholder="Quick jump to page…"
          aria-label="Quick jump to page"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-16 text-sm text-slate-900 placeholder:text-slate-400 transition hover:border-slate-300 focus:border-[#0A5F7A] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0A5F7A]/10"
        />
        <kbd className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 shadow-2xs sm:block">
          Ctrl K
        </kbd>
        {focus && (
          <div
            className={`${pop} left-0 right-0 p-1.5 max-h-80 overflow-y-auto`}
          >
            {results.length === 0 && (
              <p className="px-3 py-2 text-xs text-slate-500">
                No matching page
              </p>
            )}
            {results.map(({ label, href, icon: Icon }) => (
              <button
                key={href}
                onClick={() => go(href)}
                className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              >
                <Icon className="h-4 w-4 text-[#0A5F7A]" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right utilities */}
      <div className="ml-auto flex items-center gap-2.5">
        {/* Notifications */}
       
{/* Notifications */}
<div ref={bellRef} className="relative">
  <button
    onClick={() => {
      const next = !bell;
      setBell(next);

      if (next) {
        fetchNotifications(true);
      }
    }}
    className={iconBtn}
    aria-label={`Notifications (${unreadCount} unread)`}
    aria-expanded={bell}
  >
    <Bell className="h-[18px] w-[18px]" />

    {unreadCount > 0 && (
      <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
        {unreadCount > 99 ? "99+" : unreadCount}
      </span>
    )}
  </button>

  {bell && (
    <div className={`${pop} w-[380px] max-w-[90vw] overflow-hidden`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <div>
          <p className="text-sm font-bold text-slate-900">
            Notifications
          </p>
          <p className="text-[11px] text-slate-500">
            {unreadCount > 0
              ? `${unreadCount} unread`
              : "You're all caught up"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-[11px] font-semibold text-[#0A5F7A] hover:underline"
            >
              Mark all read
            </button>
          )}

          <button
            onClick={() => fetchNotifications()}
            className="grid h-8 w-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-100"
            aria-label="Refresh notifications"
          >
            <RefreshCw
              className={`h-4 w-4 ${
                loadingNotifications ? "animate-spin" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="max-h-[380px] overflow-y-auto">
        {loadingNotifications && notifications.length === 0 ? (
          <div className="space-y-3 p-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex animate-pulse gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-100" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="h-3 w-3/4 rounded bg-slate-100" />
                  <div className="h-3 w-full rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-12 text-center">
            <div className="mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-slate-50">
              <Bell className="h-6 w-6 text-slate-300" />
            </div>

            <p className="text-sm font-bold text-slate-800">
              No notifications yet
            </p>

            <p className="mt-1 text-xs text-slate-500">
              New updates will appear here.
            </p>
          </div>
        ) : (
          notifications.map((n) => {
            const Icon =
              NOTIFICATION_ICONS[n.category] || Info;

            const color =
              NOTIFICATION_COLORS[n.type] ||
              NOTIFICATION_COLORS.info;

            return (
              <div
                key={n.id}
                className={`group relative flex gap-3 border-b border-slate-100 px-4 py-3 transition hover:bg-slate-50 ${
                  !n.is_read ? "bg-[#0A5F7A]/[0.035]" : ""
                }`}
              >
                <div
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${color}`}
                >
                  <Icon className="h-[18px] w-[18px]" />
                </div>

                <button
                  type="button"
                  className="min-w-0 flex-1 text-left"
                  onClick={async () => {
                    await markAsRead(n.id);
                    setBell(false);

                    // Only navigate to internal admin paths.
                    if (
                      n.link &&
                      n.link.startsWith("/") &&
                      !n.link.startsWith("//")
                    ) {
                      router.push(n.link);
                    }
                  }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p
                      className={`text-[13px] leading-5 ${
                        n.is_read
                          ? "font-medium text-slate-700"
                          : "font-bold text-slate-900"
                      }`}
                    >
                      {n.title}
                    </p>

                    {!n.is_read && (
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#0A5F7A]" />
                    )}
                  </div>

                  <p className="mt-0.5 line-clamp-2 text-xs leading-5 text-slate-500">
                    {n.message}
                  </p>

                  <p className="mt-1 text-[10px] font-semibold text-slate-400">
                    {getNotificationTime(n.created_at)}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => deleteNotification(n.id)}
                  className="absolute right-2 top-2 hidden h-7 w-7 place-items-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 group-hover:grid"
                  aria-label="Delete notification"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-2.5">
        <p className="text-center text-[10px] font-medium text-slate-400">
          Automatically refreshes every 30 seconds
        </p>
      </div>
    </div>
  )}
</div>


        {/* Profile menu */}
        <div ref={profRef} className="relative">
          <button
            onClick={() => setProfile(!profile)}
            className="flex cursor-pointer items-center gap-2.5 rounded-xl border border-slate-200 bg-white py-1.5 pl-1.5 pr-3 shadow-2xs transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5F7A]"
            aria-expanded={profile}
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[#0A5F7A] to-[#1D82A6] text-xs font-bold text-white shadow-xs">
              {initials}
            </span>
            <span className="hidden text-left leading-tight sm:block">
              <span className="block text-sm font-bold text-slate-900">
                {displayName}
              </span>
              <span className="block text-[11px] font-semibold text-slate-500">
                {displayRole}
              </span>
            </span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
          {profile && (
            <div className={`${pop} w-52 p-1.5`}>
              <div className="border-b border-slate-100 px-3 py-2 sm:hidden">
                <p className="text-sm font-bold text-slate-900">
                  {displayName}
                </p>
                <p className="text-xs text-slate-500">{displayRole}</p>
              </div>
              <div className="border-b border-slate-100 px-3 py-2">
                <p className="text-sm font-bold text-slate-900">
                  {displayName}
                </p>
                <p className="text-[11px] text-slate-500 truncate">
                  {displayEmail}
                </p>
              </div>
              <Link
                href={`${ADMIN_BASE}/settings`}
                onClick={() => setProfile(false)}
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              >
                <Settings className="h-4 w-4 text-[#0A5F7A]" /> Settings
              </Link>
              <button
                className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default function AdminShell({ children, initialUser }) {
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(initialUser || null);

  // Refresh user profile from API on mount & redirect if unauthorized
  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => {
        if (r.status === 401) {
          window.location.href = "/login";
          return null;
        }
        return r.ok ? r.json() : null;
      })
      .then((data) => {
        if (data?.success && data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {});
  }, []);

  // Invalidate and reload if restored from bfcache or session expires while in background
  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    const checkAuthStatus = async () => {
      try {
        const res = await fetch("/api/admin/me");
        if (res.status === 401) {
          window.location.href = "/login";
        }
      } catch {
        // network issue, ignore
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        checkAuthStatus();
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("focus", checkAuthStatus);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("focus", checkAuthStatus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Intercept links navigating outside the admin section to trigger a secure logout first
  useEffect(() => {
    const handleAnchorClick = async (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("javascript:"))
        return;

      try {
        const dest = new URL(anchor.href, window.location.href);

        // Same origin link targeting outside the /admin area
        if (dest.origin === window.location.origin) {
          if (!dest.pathname.startsWith("/admin")) {
            e.preventDefault();
            e.stopPropagation();

            try {
              await fetch("/api/logout", { method: "POST" });
            } catch (err) {
              console.error("Logout error on navigation away from admin:", err);
            }

            window.location.href = dest.href;
          }
        } else {
          // External link leaving site
          try {
            navigator.sendBeacon?.("/api/logout");
          } catch {}
        }
      } catch {
        // Ignore malformed URLs
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleAnchorClick, {
        capture: true,
      });
    };
  }, []);

  async function logout() {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      router.replace("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      alert("Unable to log out. Please try again.");
    }
  }

  return (
    <div className="relative min-h-dvh bg-[#F8FAFC] text-slate-900 antialiased selection:bg-[#0A5F7A] selection:text-white">
      {/* Subtle background healthcare tint */}
      <div
        className="pointer-events-none fixed inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(50rem 30rem at 10% -5%, rgba(10,95,122,0.06), transparent 60%), radial-gradient(40rem 25rem at 95% 5%, rgba(245,158,11,0.04), transparent 60%)",
        }}
      />

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onLogout={logout}
      />

      <div
        className={`relative flex min-h-dvh flex-col transition-all duration-300 ${
          collapsed ? "lg:pl-[88px]" : "lg:pl-[276px]"
        }`}
      >
        <TopBar
          onMenu={() => setMobileOpen(true)}
          onLogout={logout}
          user={user}
        />
        <main className="mx-auto w-full max-w-[1600px] flex-1 px-4 py-6 sm:px-8 sm:py-8">
          {children}
        </main>
        <footer className="border-t border-slate-200/80 bg-white/60 px-4 py-4 text-center text-xs text-slate-500 sm:px-8 sm:text-left">
          © 2025 Apollo JBP Hospitals Jabalpur. Enterprise Healthcare
          Administration Console.
        </footer>
      </div>
    </div>
  );
}

