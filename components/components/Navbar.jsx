"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  
} from "lucide-react";

// Icon + accent lookup for dropdown items, matched by name.
// Purely presentational — does not touch navItems data.
const DROPDOWN_ICON_MAP = {
  "Gastro Sciences": { icon: Activity, color: "from-[#0A5F7A] to-[#2A8FAF]" },
  "Onco Sciences": { icon: ShieldAlert, color: "from-[#9F1239] to-[#C8952E]" },
  "Cardiac Sciences": { icon: HeartPulse, color: "from-rose-500 to-[#0E526B]" },
  "Neuro Sciences": { icon: Brain, color: "from-[#1D82A6] to-[#0E526B]" },
  "Nephro Sciences": { icon: Droplets, color: "from-cyan-500 to-[#0A5F7A]" },
  "Ortho-Joint and Spine Sciences": { icon: Bone, color: "from-[#0A5F7A] to-[#C8952E]" },
  "Critical Care": { icon: Zap, color: "from-rose-600 to-[#881337]" },
  "Our Specialities": { icon: Stethoscope, color: "from-[#0A5F7A] to-[#2A8FAF]" },
  "Make Appointment": { icon: CalendarPlus, color: "from-[#C8952E] to-[#F6D98A]" },
  "Ambulance Service": { icon: Ambulance, color: "from-rose-500 to-rose-700" },
  "Case Studies": { icon: FileText, color: "from-[#1D82A6] to-[#0E526B]" },
  "Events": { icon: PartyPopper, color: "from-[#C8952E] to-[#0E526B]" },
  "Careers": { icon: Briefcase, color: "from-[#0A5F7A] to-[#17627D]" },
};

const DEFAULT_DROPDOWN_ICON = { icon: Sparkles, color: "from-[#0A5F7A] to-[#2A8FAF]" };

export default function Navbar({ onOpenAppointmentModal, onOpenSearchModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/aboutus" },
    { label: "Centres of Excellence", 
      href: "/center-of-excellence",
      dropdown: [
        {
          name: "Gastro Sciences",
          href: "/center-of-excellence#gastro-sciences",
          desc: "Digestive & Liver Care Institute",
        },
        {
          name: "Onco Sciences",
          href: "/center-of-excellence#onco-sciences",
          desc: "CyberKnife & Precision Cancer Care",
        },
        {
          name: "Cardiac Sciences",
          href: "/center-of-excellence#cardiac-sciences",
          desc: "24/7 STEMI & Heart Surgery Hub",
        },
        {
          name: "Neuro Sciences",
          href: "/center-of-excellence#neuro-sciences",
          desc: "Brain, Spine & Stroke Care Unit",
        },
        {
          name: "Nephro Sciences",
          href: "/center-of-excellence#nephro-sciences",
          desc: "24/7 Dialysis & Kidney Care",
        },
        {
          name: "Ortho-Joint and Spine Sciences",
          href: "/center-of-excellence#ortho-sciences",
          desc: "Robotic Joint & Spine Surgery",
        },
        {
          name: "Critical Care",
          href: "/center-of-excellence#critical-care",
          desc: "Level-1 CCU & Trauma ER",
        },
      ], },
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
          desc: "18+ Clinical Specialty Departments",
        },
        {
          name: "Make Appointment",
          href: "/patientcare/appointment",
          desc: "Instant Doctor Consultation Booking",
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
    { label: "Contact", href: "/contact",
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 ">
      <div
        className={`max-w-9xl mx-auto bg-white rounded-t-none rounded-b-2xl transition-all duration-300 ${
          scrolled
            ? "shadow-[0_10px_35px_rgba(10,95,122,0.22)]"
            : "shadow-[0_4px_20px_rgba(10,95,122,0.12)]"
        }`}
      >
        {/* Top utility row - Updated with vibrant theme */}
        <div className="hidden sm:flex items-center justify-between px-8 py-1.5 bg-gradient-to-r from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] text-white text-[12px] font-medium border-b border-white/15 tracking-wide shadow-inner">
          {/* Left Side: General Info / Tagline */}
          <div className="flex items-center gap-2 text-white/95 font-semibold">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
            </span>
            <span>24/7 Care & Emergency Services Available</span>
          </div>

          {/* Right Side: Interactive Utility Actions */}
          <div className="flex items-center gap-5">
            {/* Find a Doctor */}
            <a
              href="#find-doctor"
              className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors duration-200 group cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform drop-shadow-[0_0_6px_rgba(252,211,77,0.5)]" />
              <span>Find a Doctor</span>
            </a>

            <span className="h-3 w.5 bg-white/25 rounded-full" />

            {/* Book Appointment */}
            <button
              onClick={onOpenAppointmentModal}
              className="flex items-center gap-1.5 text-white/90 hover:text-white transition-colors duration-200 group cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-300 group-hover:scale-110 transition-transform drop-shadow-[0_0_6px_rgba(252,211,77,0.5)]" />
              <span>Book Appointment</span>
            </button>

            <span className="h-3 w.5 bg-white/25 rounded-full" />

            {/* Emergency Hotline - Highlighted Pill Badge */}
            <a
              href="tel:1800-123-6666"
              className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-500/90 text-white border border-rose-300/40 hover:bg-rose-600 hover:shadow-[0_0_12px_rgba(244,63,94,0.5)] transition-all duration-200 cursor-pointer font-bold tracking-wider"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-bounce text-white" />
              <span>Emergency: 1800-123-6666</span>
            </a>

            <span className="h-3 w.5 bg-white/25 rounded-full" />

            {/* Search Trigger */}
            <button
              onClick={onOpenSearchModal}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/15 backdrop-blur-sm transition-all cursor-pointer"
              aria-label="Search website"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main row */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5">
          <Link href="/" className="flex items-center shrink-0 group">
            <img
              src="/images/apollologo.png"
              alt="Apollo JBP Hospitals Jabalpur"
              className="h-11 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
            />
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
              >
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-1 px-2.5 xl:px-3 py-2 text-[13px] font-medium transition-colors duration-200 ${
                    item.href === "/"
                      ? pathname === "/"
                        ? "text-[#0A5F7A] font-semibold"
                        : "text-slate-600 hover:text-[#0A5F7A]"
                      : pathname.startsWith(item.href)
                        ? "text-[#0A5F7A] font-semibold"
                        : "text-slate-600 hover:text-[#0A5F7A]"
                  }`}
                >
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeDropdown === item.label
                          ? "rotate-180 text-[#0A5F7A]"
                          : ""
                      }`}
                    />
                  )}
                  {(item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href)) && (
                    <span className="absolute left-2.5 right-2.5 -bottom-[1px] h-[2.5px] bg-gradient-to-r from-[#0A5F7A] to-[#2A8FAF] rounded-full shadow-[0_1px_4px_rgba(10,95,122,0.4)]" />
                  )}
                </Link>

                {/* ───── Dropdown (enhanced with icons & premium styling) ───── */}
                {item.dropdown && (
                  <div
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className={`absolute top-full right-0 w-80 z-[999] origin-top transition-all duration-200 pt-3 ${
                      activeDropdown === item.label
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-1 pointer-events-none"
                    }`}
                  >
                    <div className="relative p-[1.5px] rounded-2xl bg-gradient-to-br from-[#1D82A6]/50 via-[#F6D98A]/50 to-[#C8952E]/60 shadow-[0_20px_45px_rgba(10,95,122,0.25)]">
                      <div className="bg-white rounded-[calc(1rem-1.5px)] overflow-hidden">
                        {/* Mini header strip */}
                        <div className="flex items-center gap-2 px- py-3 bg-gradient-to-r from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] text-white">
                          <Sparkles className="w-3.5 h-3.5 text-[#F6D98A]" />
                          <span className="text-[11px] font-extrabold uppercase tracking-wider">
                            {item.label}
                          </span>
                        </div>

                        <div className="p-1.5">
                          {item.dropdown.map((sub) => {
                            const meta = DROPDOWN_ICON_MAP[sub.name] || DEFAULT_DROPDOWN_ICON;
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

                        {/* Footer CTA strip */}
                        <button
                          onClick={onOpenAppointmentModal}
                          className="w-full flex items-center justify-center gap-1.5 py-2.5 text-[11px] font-extrabold text-[#3A2B0A] cursor-pointer"
                          style={{
                            background: "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
                          }}
                        >
                          <Calendar className="w-3.5 h-3.5" />
                          Book a Consultation
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* CTA (desktop) */}
          <div className="hidden lg:flex items-center gap-3 pl-3">
            <button
              onClick={onOpenAppointmentModal}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-[#3A2B0A] shadow-[0_3px_10px_rgba(197,146,46,0.35)] hover:shadow-[0_5px_16px_rgba(197,146,46,0.5)] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 cursor-pointer"
              style={{
                background: "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
              }}
            >
              <Calendar className="w-3.5 h-3.5" />
              Book an Appointment
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-slate-200 text-[#0A5F7A] hover:bg-slate-50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile menu drawer */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
            mobileMenuOpen ? "max-h-[36rem] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="border-t border-slate-100 px-5 py-5 space-y-4">
            <div className="grid grid-cols-2 gap-2 pb-4 border-b border-slate-100">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAppointmentModal();
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold text-[#3A2B0A]"
                style={{
                  background:
                    "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
                }}
              >
                <Calendar className="w-3.5 h-3.5" /> Book Appointment
              </button>

              
                href="tel:1800-123-6666"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold bg-rose-500 text-white shadow-sm"
              <a>
                <PhoneCall className="w-3.5 h-3.5 animate-bounce" /> Emergency
                1800-123-6666
              </a>
            </div>

            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      setMobileMenuOpen(false);
                    }}
                    className={`block py-2.5 text-sm font-medium transition-colors ${
                      item.href === "/"
                        ? pathname === "/"
                          ? "text-[#0A5F7A] font-semibold"
                          : "text-slate-600 hover:text-[#0A5F7A]"
                        : pathname.startsWith(item.href)
                          ? "text-[#0A5F7A] font-semibold"
                          : "text-slate-600 hover:text-[#0A5F7A]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}