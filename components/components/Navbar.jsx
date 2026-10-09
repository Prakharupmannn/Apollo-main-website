"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LanguageSwitcher } from "./GoogleTranslate";

import {
  Search,
  PhoneCall,
  Calendar,
  UserCheck,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Stethoscope,
  Activity,
  HeartPulse,
  Brain,
  ShieldAlert,
  Bone,
  Droplets,
  CalendarPlus,
  Ambulance,
  FileText,
  PartyPopper,
  Briefcase,
  Zap,
  MapPin,
  Phone,
  Clock,
  ExternalLink,
} from "lucide-react";

// Icon + accent lookup for dropdown items, matched by name.
const DROPDOWN_ICON_MAP = {
  "Gastro Sciences": { icon: Activity, color: "from-[#0A5F7A] to-[#2A8FAF]" },
  "Onco Sciences": { icon: ShieldAlert, color: "from-[#9F1239] to-[#C8952E]" },
  "Cardiac Sciences": { icon: HeartPulse, color: "from-rose-500 to-[#0E526B]" },
  "Neuro Sciences": { icon: Brain, color: "from-[#1D82A6] to-[#0E526B]" },
  "Nephro Sciences": { icon: Droplets, color: "from-cyan-500 to-[#0A5F7A]" },
  "Ortho-Joint and Spine Sciences": {
    icon: Bone,
    color: "from-[#0A5F7A] to-[#C8952E]",
  },
  "Critical Care": { icon: Zap, color: "from-rose-600 to-[#881337]" },
  "Our Specialities": {
    icon: Stethoscope,
    color: "from-[#0A5F7A] to-[#2A8FAF]",
  },
  "Make Appointment": {
    icon: CalendarPlus,
    color: "from-[#C8952E] to-[#F6D98A]",
  },
  "Ambulance Service": { icon: Ambulance, color: "from-rose-500 to-rose-700" },
  "Case Studies": { icon: FileText, color: "from-[#1D82A6] to-[#0E526B]" },
  Events: { icon: PartyPopper, color: "from-[#C8952E] to-[#0E526B]" },
  Careers: { icon: Briefcase, color: "from-[#0A5F7A] to-[#17627D]" },
};

const DEFAULT_DROPDOWN_ICON = {
  icon: Sparkles,
  color: "from-[#0A5F7A] to-[#2A8FAF]",
};

export default function Navbar({ onOpenAppointmentModal, onOpenSearchModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let currentScrolled = false;
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== currentScrolled) {
        currentScrolled = isScrolled;
        setScrolled(isScrolled);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus whenever the route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileExpanded(null);
    setActiveDropdown(null);
  }, [pathname]);

  // Close mobile menu automatically if screen grows to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMobileMenuOpen(false);
        setMobileExpanded(null);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent background scrolling when sidebar drawer or mobile menu is open
  useEffect(() => {
    if (sidebarOpen || mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen, mobileMenuOpen]);

  const handleRequestAppointment = () => {
    setSidebarOpen(false);
    setMobileMenuOpen(false);
    if (onOpenAppointmentModal) {
      onOpenAppointmentModal();
    } else {
      router.push("/patientcare/appointment");
    }
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/aboutus" },
    {
      label: "Centres of Excellence",
      href: "/centres-of-excellence",
      dropdown: [
        {
          name: "Gastro Sciences",
          href: "/centres-of-excellence/gastro",
          desc: "Digestive & Liver Care Institute",
        },
        {
          name: "Onco Sciences",
          href: "/centres-of-excellence/onco",
          desc: "CyberKnife & Precision Cancer Care",
        },
        {
          name: "Cardiac Sciences",
          href: "/centres-of-excellence/cardiac",
          desc: "24/7 STEMI & Heart Surgery Hub",
        },
        {
          name: "Neuro Sciences",
          href: "/centres-of-excellence/neuro",
          desc: "Brain, Spine & Stroke Care Unit",
        },
        {
          name: "Nephro Sciences",
          href: "/centres-of-excellence/nephro",
          desc: "24/7 Dialysis & Kidney Care",
        },
        {
          name: "Ortho-Joint and Spine Sciences",
          href: "/centres-of-excellence/ortho-joint-spine",
          desc: "Robotic Joint & Spine Surgery",
        },
        {
          name: "Critical Care",
          href: "/centres-of-excellence/critical-care",
          desc: "Level-1 CCU & Trauma ER",
        },
      ],
    },
    {
      label: "Doctors",
      href: "/doctors",
    },
    {
      label: "Patient Care",
      href: "/patientcare",
      dropdown: [
        {
          name: "Our Specialities",
          href: "/ourspecialities",
          desc: "37+ Clinical Specialty Departments",
        },
        {
          name: "Make Appointment",
          href: "/patientcare/appointment",
          desc: "Book a Doctor’s Appointment Instantly",
        },
        {
          name: "Ambulance Service",
          href: "/patientcare/ambulance",
          desc: "24/7 Mobile ICU & Trauma Express",
        },
        {
          name: "Case Studies",
          href: "/patientcare/case-studies",
          desc: "Clinical Breakthroughs & Saved Lives",
        },
        {
          name: "Events",
          href: "/patientcare/events",
          desc: "Free Health Camps & CME Seminars",
        },
      ],
    },
    { label: "Health Library", href: "/health-library" },
    {
      label: "Contact",
      href: "/contact",
      dropdown: [
        {
          name: "Careers",
          href: "/careers",
          desc: "Join Apollo Hospitals Jabalpur Team",
        },
      ],
    },
    { label: "Emergency", href: "/emergency" },
  ];

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs xl:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      <header className="fixed top-0 left-0 right-0 z-50">
        <div
          className={`w-full max-w-[1920px] mx-auto bg-white rounded-t-none rounded-b-xl sm:rounded-b-2xl transition-all duration-300 ${
            scrolled
              ? "shadow-[0_10px_35px_rgba(10,95,122,0.22)]"
              : "shadow-[0_4px_20px_rgba(10,95,122,0.12)]"
          }`}
        >
          {/* Top utility row (tablet & up) */}
          <div className="hidden sm:flex items-center justify-end lg:justify-between gap-3 px-4 md:px-6 xl:px-8 py-1.5 bg-gradient-to-r from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] text-white text-[11px] md:text-[12px] font-medium border-b border-white/15 tracking-wide shadow-inner">
            {/* Left Side: General Info / Tagline (laptop & up) */}
            <div className="hidden lg:flex items-center gap-2 text-white/95 font-semibold min-w-0">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
              </span>
              <span className="truncate">
                24/7 Care & Emergency Services Available
              </span>
            </div>

            {/* Right Side: Interactive Utility Actions */}
            <div className="flex items-center gap-3 md:gap-5 shrink-0">
              <Link
                href="/doctors"
                className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors duration-200 group cursor-pointer whitespace-nowrap"
              >
                <UserCheck className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform drop-shadow-[0_0_6px_rgba(252,211,77,0.5)]" />
                <span>Find a Doctor</span>
              </Link>

              <span className="h-3 w-0.5 bg-white/25 rounded-full" />

              <button
                onClick={() => setSidebarOpen(true)}
                className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors duration-200 group cursor-pointer bg-transparent border-0 whitespace-nowrap"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform drop-shadow-[0_0_6px_rgba(252,211,77,0.5)]" />
                <span>Book Appointment</span>
              </button>

              <span className="h-3 w-0.5 bg-white/25 rounded-full" />

              <a
                href="tel:1800-123-6666"
                className="flex items-center gap-1.5 px-2.5 md:px-3 py-0.5 rounded-full bg-rose-500/90 text-white border border-rose-300/40 hover:bg-rose-600 hover:shadow-[0_0_12px_rgba(244,63,94,0.5)] transition-all duration-200 cursor-pointer font-bold tracking-wider whitespace-nowrap"
              >
                <PhoneCall className="w-3.5 h-3.5 animate-bounce text-white" />
                <span>
                  Emergency:{" "}
                  <span className="notranslate" translate="no">
                    1800-123-6666
                  </span>
                </span>
              </a>

              <span className="h-3 w-0.5 bg-white/25 rounded-full" />

              {/* Language switcher (tablet & laptop) */}
              <LanguageSwitcher variant="light" showIcon />

              <button
                onClick={onOpenSearchModal}
                className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 backdrop-blur-sm transition-all cursor-pointer"
                aria-label="Search website"
              >
                {/* <Search className="w-4 h-4" /> */}
              </button>
            </div>
          </div>

          {/* Main row */}
          <div className="flex items-center justify-between gap-3 px-3 sm:px-5 xl:px-6 py-2 sm:py-2.5">
            <Link href="/" className="flex items-center shrink-0 group">
              <Image
                src="/images/apollologo.png"
                alt="Apollo JBP Hospitals Jabalpur"
                width={180}
                height={48}
                priority
                className="h-9 sm:h-11 xl:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
              />
            </Link>

            {/* Desktop nav links (xl and up) */}
            <ul className="hidden xl:flex items-center gap-1 2xl:gap-1.5">
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`relative flex items-center gap-1 px-2.5 2xl:px-3 py-2 text-[13px] font-medium whitespace-nowrap transition-colors duration-200 ${
                      isActive(item.href)
                        ? "text-[#0A5F7A] font-semibold"
                        : "text-slate-600 hover:text-[#0A5F7A]"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.dropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          activeDropdown === item.label
                            ? "rotate-180 text-[#0A5F7A]"
                            : ""
                        }`}
                      />
                    )}
                    {isActive(item.href) && (
                      <span className="absolute left-2.5 right-2.5 -bottom-[1px] h-[2.5px] bg-gradient-to-r from-[#0A5F7A] to-[#2A8FAF] rounded-full shadow-[0_1px_4px_rgba(10,95,122,0.4)]" />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.dropdown && (
                    <div
                      className={`absolute top-full right-0 w-80 max-w-[calc(100vw-2rem)] z-[999] origin-top transition-all duration-200 pt-3 ${
                        activeDropdown === item.label
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-1 pointer-events-none"
                      }`}
                    >
                      <div className="relative p-[1.5px] rounded-2xl bg-gradient-to-br from-[#1D82A6]/50 via-[#F6D98A]/50 to-[#C8952E]/60 shadow-[0_20px_45px_rgba(10,95,122,0.25)]">
                        <div className="bg-white rounded-[calc(1rem-1.5px)] overflow-hidden">
                          <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] text-white">
                            <Sparkles className="w-3.5 h-3.5 text-[#F6D98A]" />
                            <span className="text-[11px] font-extrabold uppercase tracking-wider">
                              {item.label}
                            </span>
                          </div>

                          <div className="p-1.5 max-h-[60vh] overflow-y-auto">
                            {item.dropdown.map((sub) => {
                              const meta =
                                DROPDOWN_ICON_MAP[sub.name] ||
                                DEFAULT_DROPDOWN_ICON;
                              const SubIcon = meta.icon;
                              return (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  className="group/item flex items-center gap-3 p-2.5 rounded-xl hover:bg-gradient-to-r hover:from-[#EDF6FB] hover:to-transparent transition-all duration-200"
                                >
                                  <div
                                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${meta.color} text-white flex items-center justify-center shadow-md shrink-0 group-hover/item:scale-110 group-hover/item:-rotate-6 transition-transform duration-200`}
                                  >
                                    <SubIcon className="w-4 h-4" />
                                  </div>

                                  <div className="min-w-0 flex-1">
                                    <div className="text-[13px] font-bold text-[#0A5F7A] flex items-center justify-between gap-2">
                                      <span className="truncate">{sub.name}</span>
                                      <ArrowRight className="w-3.5 h-3.5 text-[#C8952E] shrink-0 opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all duration-200" />
                                    </div>
                                    {sub.desc && (
                                      <p className="text-[11.5px] text-slate-500 mt-0.5 leading-snug truncate">
                                        {sub.desc}
                                      </p>
                                    )}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>

                          <button
                            onClick={handleRequestAppointment}
                            className="w-full flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-extrabold text-[#3A2B0A] cursor-pointer transition-opacity hover:opacity-95"
                            style={{
                              background:
                                "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
                            }}
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Book a Consultation</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* CTA (desktop) -> Triggers Slide-over Sidebar */}
            <div className="hidden xl:flex items-center gap-3 pl-3 shrink-0">
              <button
                onClick={() => setSidebarOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-[#3A2B0A] shadow-[0_3px_10px_rgba(197,146,46,0.35)] hover:shadow-[0_5px_16px_rgba(197,146,46,0.5)] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 cursor-pointer border-0 whitespace-nowrap"
                style={{
                  background:
                    "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
                }}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book an Appointment</span>
              </button>
            </div>

            {/* Right group on phones/tablets: language switcher (phones only) + menu toggle */}
            <div className="flex items-center gap-2 xl:hidden shrink-0">
              {/* Phones only: the top bar is hidden here, so show the switcher beside the menu button */}
              <div className="sm:hidden">
                <LanguageSwitcher variant="dark" showIcon />
              </div>

              {/* Mobile / tablet toggle button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl border border-slate-200 text-[#0A5F7A] hover:bg-[#EDF6FB] active:bg-[#D8ECF5] transition-all shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0A5F7A]/30"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile / tablet menu drawer */}
          <div
            className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              mobileMenuOpen
                ? "max-h-[calc(100dvh-4.5rem)] opacity-100 border-t border-slate-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-4 sm:px-6 py-4 space-y-4 max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-3 border-b border-slate-100">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSidebarOpen(true);
                  }}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold text-[#3A2B0A] shadow-sm hover:opacity-95 transition-opacity"
                  style={{
                    background:
                      "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
                  }}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appointment</span>
                </button>
                <a
                  href="tel:1800-123-6666"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-bold bg-rose-500 text-white shadow-sm hover:bg-rose-600 transition-colors"
                >
                  <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
                  <span>
                    Emergency{" "}
                    <span className="notranslate" translate="no">
                      1800-123-6666
                    </span>
                  </span>
                </a>
              </div>

              <ul className="space-y-1">
                {navItems.map((item) => {
                  const expanded = mobileExpanded === item.label;
                  const hasDropdown = Boolean(
                    item.dropdown && item.dropdown.length > 0
                  );

                  return (
                    <li
                      key={item.label}
                      className="rounded-xl overflow-hidden transition-colors"
                    >
                      {hasDropdown ? (
                        /* Items with dropdown: clicking the row toggles the submenu expansion */
                        <button
                          type="button"
                          onClick={() =>
                            setMobileExpanded(expanded ? null : item.label)
                          }
                          className={`w-full flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-medium transition-all text-left cursor-pointer ${
                            expanded
                              ? "bg-[#EDF6FB] text-[#0A5F7A] font-bold"
                              : isActive(item.href)
                              ? "text-[#0A5F7A] font-semibold bg-slate-50"
                              : "text-slate-700 hover:text-[#0A5F7A] hover:bg-slate-50"
                          }`}
                          aria-label={`Toggle ${item.label} menu`}
                          aria-expanded={expanded}
                        >
                          <span className="flex items-center gap-2">
                            <span>{item.label}</span>
                            {expanded && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#2A8FAF]/15 text-[#0A5F7A]">
                                {`${item.dropdown.length} options`}
                              </span>
                            )}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 text-[#0A5F7A] ${
                              expanded ? "rotate-180" : "opacity-75"
                            }`}
                          />
                        </button>
                      ) : (
                        /* Items without dropdown: direct link */
                        <Link
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`block py-2.5 px-3 rounded-xl text-sm font-medium transition-colors ${
                            isActive(item.href)
                              ? "text-[#0A5F7A] font-semibold bg-[#EDF6FB]"
                              : "text-slate-700 hover:text-[#0A5F7A] hover:bg-slate-50"
                          }`}
                        >
                          <span>{item.label}</span>
                        </Link>
                      )}

                      {/* Dropdown submenu list */}
                      {hasDropdown && (
                        <div
                          className={`overflow-hidden transition-all duration-300 ease-in-out ${
                            expanded
                              ? "max-h-[50rem] opacity-100 mt-1 mb-2"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="ml-2 pl-3 border-l-2 border-[#2A8FAF]/30 space-y-1 py-1">
                            {/* Main Overview link for this section */}
                            <Link
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center gap-2 py-2 px-2.5 rounded-lg text-xs font-bold text-[#0A5F7A] bg-[#EDF6FB]/70 hover:bg-[#EDF6FB] transition-colors"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-[#C8952E]" />
                              <span>{`Explore All ${item.label}`}</span>
                              <ArrowRight className="w-3.5 h-3.5 ml-auto text-[#C8952E]" />
                            </Link>

                            {item.dropdown.map((sub) => {
                              const meta =
                                DROPDOWN_ICON_MAP[sub.name] ||
                                DEFAULT_DROPDOWN_ICON;
                              const SubIcon = meta.icon;
                              return (
                                <Link
                                  key={sub.name}
                                  href={sub.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="flex items-center gap-3 py-2 px-2 rounded-lg hover:bg-slate-100/90 active:bg-slate-200/90 transition-colors group"
                                >
                                  <div
                                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${meta.color} text-white flex items-center justify-center shadow-sm shrink-0`}
                                  >
                                    <SubIcon className="w-4 h-4" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <div className="text-[13px] font-bold text-slate-800 group-hover:text-[#0A5F7A] leading-tight">
                                      {sub.name}
                                    </div>
                                    {sub.desc && (
                                      <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">
                                        {sub.desc}
                                      </p>
                                    )}
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </header>

      {/* ────────────────── ATTRACTIVE SIDEBAR DRAWER ────────────────── */}
      {/* Backdrop */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[101] h-[100dvh] w-full sm:max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Top Decorative Header */}
        <div className="relative p-4 sm:p-6 bg-gradient-to-br from-[#0A5F7A] via-[#17627D] to-[#0E526B] text-white shrink-0 overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-32 h-32 bg-[#F6D98A]/20 rounded-full blur-xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all duration-200 cursor-pointer border-0"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo & Tagline */}
          <div className="flex items-center gap-3 pr-10">
            <div className="p-1.5 sm:p-2 bg-white rounded-xl shadow-md shrink-0">
              <Image
                src="/images/apollologo.png"
                alt="Apollo JBP Hospitals"
                width={140}
                height={40}
                className="h-8 sm:h-10 w-auto object-contain"
              />
            </div>
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold bg-[#F6D98A]/20 text-[#F6D98A] border border-[#F6D98A]/30 uppercase tracking-widest">
                <Sparkles className="w-3 h-3 shrink-0" />
                <span>World-Class Healthcare</span>
              </span>
              <h2 className="text-base sm:text-lg font-bold mt-1 text-white leading-tight">
                Apollo JBP Hospitals
              </h2>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto overscroll-contain flex-1 space-y-5 sm:space-y-6 scrollbar-thin">
          {/* Emergency Alert Banner */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-rose-50 to-orange-50 border border-rose-100/80 shadow-sm relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="p-2 sm:p-2.5 rounded-xl bg-rose-500 text-white shadow-md shadow-rose-200 shrink-0 mt-0.5">
                <PhoneCall className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider">
                  Need Immediate Help?
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  We are always here to help in an emergency. Contact us immediately if you are experiencing any serious health problems.
                </p>
                <a
                  href="tel:7566123666"
                  className="inline-flex flex-wrap items-center gap-1.5 mt-2 text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors"
                >
                  <span>
                    Emergency Hotline:{" "}
                    <strong className="notranslate" translate="no">
                      7566123666
                    </strong>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Main Hospital Contact Details */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Contact Apollo JBP Hospitals, Jabalpur
            </h3>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#2A8FAF]/30 transition-all duration-200 group">
              <div className="flex items-start gap-3 sm:gap-3.5">
                <div className="p-2 sm:p-2.5 rounded-xl bg-white text-[#0A5F7A] shadow-sm border border-slate-100 group-hover:scale-105 transition-transform shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#0A5F7A]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-800">Hospital Address</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">
                    Global Square, Patan Rd, Karmeta, Jabalpur, Madhya Pradesh 482002
                  </p>
                </div>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#2A8FAF]/30 transition-all duration-200 group">
              <div className="flex items-center gap-3 sm:gap-3.5">
                <div className="p-2 sm:p-2.5 rounded-xl bg-white text-[#0A5F7A] shadow-sm border border-slate-100 group-hover:scale-105 transition-transform shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-[#0A5F7A]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-800">Phone Consultation</h4>
                  <a
                    href="tel:7566123666"
                    className="notranslate text-sm font-bold text-[#0A5F7A] hover:underline mt-0.5 block"
                    translate="no"
                  >
                    +91 7566123666
                  </a>
                </div>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#2A8FAF]/30 transition-all duration-200 group">
              <div className="flex items-center gap-3 sm:gap-3.5">
                <div className="p-2 sm:p-2.5 rounded-xl bg-white text-[#0A5F7A] shadow-sm border border-slate-100 group-hover:scale-105 transition-transform shrink-0">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#0A5F7A]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-800">OPD Timing</h4>
                  <p className="text-xs text-slate-600 font-medium mt-0.5">
                    Mon - Sat: 09:00 AM - 08:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-4 sm:p-6 pb-[max(1rem,env(safe-area-inset-bottom))] bg-slate-50 border-t border-slate-100 space-y-3 shrink-0">
          <button
            onClick={handleRequestAppointment}
            className="w-full flex items-center justify-center gap-2 py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#0A5F7A] via-[#17627D] to-[#0E526B] shadow-[0_8px_20px_rgba(10,95,122,0.35)] hover:shadow-[0_10px_25px_rgba(10,95,122,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer group"
          >
            <Calendar className="w-4 h-4 text-[#F6D98A]" />
            <span>Request an Appointment</span>
            <ArrowRight className="w-4 h-4 text-[#F6D98A] group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="https://wa.me/917566123666"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 sm:px-6 rounded-xl font-bold text-xs text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors cursor-pointer"
          >
            <span>How can I help you?</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </aside>
    </>
  );
}