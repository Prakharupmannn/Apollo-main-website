"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import {
  Search,
  PhoneCall,
  Calendar,
  UserCheck,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

export default function Navbar({ onOpenAppointmentModal, onOpenSearchModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeLink, setActiveLink] = useState("Home");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#" },
    { label: "About Us", href: "#why-choose-apollo" },
    { label: "Our Specialities", href: "#specialities" },
    {
      label: "Doctors",
      href: "#doctors",
      dropdown: [
        {
          name: "Find a Doctor",
          desc: "Search 10,000+ certified specialists",
          href: "#doctors",
        },
        {
          name: "Video Consultation",
          desc: "Consult top doctors online from home",
          href: "#",
        },
        {
          name: "Second Medical Opinion",
          desc: "Expert review for complex cases",
          href: "#",
        },
      ],
    },
    {
      label: "Patient Care",
      href: "#specialities",
      dropdown: [
        {
          name: "Centres of Excellence",
          desc: "World-class advanced medical institutes",
          href: "#centres-of-excellence",
        },
        {
          name: "Health Check Packages",
          desc: "Preventive health screening programs",
          href: "#",
        },
      ],
    },
    { label: "Health Library", href: "#health-articles" },
    { label: "Contact", href: "#footer" },
    { label: "Emergency", href: "#" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-5 pt-3">
      <div
        className={`max-w-9xl mx-auto bg-white rounded-2xl overflow-hidden transition-all duration-300 ${
          scrolled
            ? "shadow-[0_10px_35px_rgba(10,95,122,0.22)]"
            : "shadow-[0_4px_20px_rgba(10,95,122,0.12)]"
        }`}
      >
        {/* Top utility row - Updated with vibrant theme */}
        <div className="hidden sm:flex items-center justify-between px-8 py-2.5 bg-gradient-to-r from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] text-white text-[12px] font-medium border-b border-white/15 tracking-wide shadow-inner">
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
              href="tel:1066"
              className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-500/90 text-white border border-rose-300/40 hover:bg-rose-600 hover:shadow-[0_0_12px_rgba(244,63,94,0.5)] transition-all duration-200 cursor-pointer font-bold tracking-wider"
            >
              <PhoneCall className="w-3.5 h-3.5 animate-bounce text-white" />
              <span>Emergency: 1066</span>
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
              src="images/apollologo.png"
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
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  onClick={() => setActiveLink(item.label)}
                  className={`relative flex items-center gap-1 px-2.5 xl:px-3 py-2 text-[13px] font-medium transition-colors duration-200 ${
                    activeLink === item.label
                      ? "text-[#0A5F7A] font-semibold"
                      : "text-slate-600 hover:text-[#0A5F7A]"
                  }`}
                >
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        activeDropdown === item.label ? "rotate-180 text-[#0A5F7A]" : ""
                      }`}
                    />
                  )}
                  {activeLink === item.label && (
                    <span className="absolute left-2.5 right-2.5 -bottom-[1px] h-[2.5px] bg-gradient-to-r from-[#0A5F7A] to-[#2A8FAF] rounded-full shadow-[0_1px_4px_rgba(10,95,122,0.4)]" />
                  )}
                </Link>

                {/* Dropdown */}
                {item.dropdown && (
                  <div
                    className={`absolute top-full right-0 pt-3 w-72 z-50 origin-top transition-all duration-200 ${
                      activeDropdown === item.label
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-1 pointer-events-none"
                    }`}
                  >
                    <div className="bg-white border border-cyan-100/80 rounded-xl shadow-[0_16px_40px_rgba(10,95,122,0.18)] p-1.5">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block p-2.5 rounded-lg hover:bg-gradient-to-r hover:from-cyan-50/60 hover:to-transparent transition-colors duration-150 group"
                        >
                          <div className="text-[13px] font-semibold text-[#0A5F7A] flex items-center justify-between">
                            {sub.name}
                            <span className="text-[11px] text-[#C8952E] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-150">
                              →
                            </span>
                          </div>
                          <p className="text-[11.5px] text-slate-500 mt-0.5 leading-snug">
                            {sub.desc}
                          </p>
                        </Link>
                      ))}
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

              <a
                href="tel:1066"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold bg-rose-500 text-white shadow-sm"
              >
                <PhoneCall className="w-3.5 h-3.5 animate-bounce" /> Emergency 1066
              </a>
            </div>

            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => {
                      setActiveLink(item.label);
                      setMobileMenuOpen(false);
                    }}
                    className={`block py-2.5 text-sm font-medium transition-colors ${
                      activeLink === item.label
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