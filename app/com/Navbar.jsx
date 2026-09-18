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
  ShieldCheck,
  Activity,
  Heart,
  Stethoscope,
} from "lucide-react";

export default function Navbar({ onOpenAppointmentModal, onOpenSearchModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", href: "#" },
    { label: "About Us", href: "#why-choose-apollo" },
    {
      label: "Book Appointment",
      href: "#",
      action: onOpenAppointmentModal,
    },
    {
      label: "Doctors",
      href: "#doctors",
      dropdown: [
        { name: "Find a Doctor", desc: "Search 10,000+ certified specialists", href: "#doctors" },
        { name: "Video Consultation", desc: "Consult top doctors online from home", href: "#" },
        { name: "Second Medical Opinion", desc: "Expert review for complex cases", href: "#" },
      ],
    },
    {
      label: "Patient Care",
      href: "#specialities",
      dropdown: [
        { name: "Our Specialities", desc: "Comprehensive care for every condition", href: "#specialities" },
        { name: "Centres of Excellence", desc: "World-class advanced medical institutes", href: "#centres-of-excellence" },
        { name: "Health Check Packages", desc: "Preventive health screening programs", href: "#" },
      ],
    },
    { label: "International Patients", href: "#" },
    { label: "Health Library", href: "#health-articles" },
    { label: "Contact", href: "#footer" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Utility Header Bar */}
      <div className="bg-[#0E526B] text-white border-b border-[#1D82A6]/30 px-4 sm:px-8 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Brand Tagline */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-white p-1.5 rounded-xl shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
              <img
                src="/apollo-logo.webp"
                alt="Apollo Hospitals Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-serif-apollo text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Apollo
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-[#F59E0B] text-slate-900 px-1.5 py-0.5 rounded shadow-sm">
                  Hospitals
                </span>
              </div>
              <p className="text-[10px] text-[#FEF3C7]/90 uppercase tracking-widest font-semibold">
                Touching Lives • Healing Hope
              </p>
            </div>
          </Link>

          {/* Top Bar Quick Action Controls (Desktop) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Find a Doctor */}
            <a
              href="#doctors"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#1D82A6] hover:bg-[#166F91] text-white border border-white/20 transition-colors shadow-sm"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#FEF3C7]" />
              Find a Doctor
            </a>

            {/* Book Appointment Pill */}
            <button
              onClick={onOpenAppointmentModal}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-gold-gradient text-slate-950 shadow-md hover:shadow-lg hover:brightness-110 transition-all cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-slate-950" />
              Book Appointment
            </button>

            {/* Emergency 1066 Badge */}
            <a
              href="tel:1066"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-red-600 hover:bg-red-700 text-white shadow-md animate-pulse-glow transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-white animate-bounce" />
              Emergency 1066
            </a>

            {/* Search Trigger Button */}
            <button
              onClick={onOpenSearchModal}
              className="w-8 h-8 rounded-full bg-[#1D82A6] hover:bg-[#F59E0B] hover:text-slate-950 flex items-center justify-center text-white transition-colors border border-white/20"
              aria-label="Search website"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Toggle & Emergency Quick Call */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="tel:1066"
              className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white"
            >
              <PhoneCall className="w-3 h-3" />
              1066
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-[#1D82A6] text-white hover:bg-[#F59E0B] hover:text-slate-950 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Links Bar */}
      <nav
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-[#093749]/95 backdrop-blur-md shadow-xl py-2 border-b border-[#1D82A6]/40"
            : "bg-[#093749] py-2.5 border-b border-[#1D82A6]/30"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          <ul className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.action ? (
                  <button
                    onClick={item.action}
                    className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-white hover:text-[#F59E0B] rounded-lg hover:bg-[#0E526B] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-3.5 py-1.5 text-xs font-semibold text-white hover:text-[#F59E0B] rounded-lg hover:bg-[#0E526B] transition-colors"
                  >
                    {item.label}
                    {item.dropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#F59E0B] transition-transform ${
                          activeDropdown === item.label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </Link>
                )}

                {/* Dropdown Menu */}
                {item.dropdown && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2 w-72 z-50">
                    <div className="bg-[#0E526B] border border-[#1D82A6]/50 rounded-xl shadow-2xl p-2 backdrop-blur-xl">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="block p-2.5 rounded-lg hover:bg-[#1D82A6]/40 transition-colors group"
                        >
                          <div className="text-xs font-bold text-[#FEF3C7] group-hover:text-white flex items-center justify-between">
                            {sub.name}
                            <span className="text-[10px] text-[#F59E0B] font-mono">→</span>
                          </div>
                          <p className="text-[11px] text-slate-200 mt-0.5">{sub.desc}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3 text-xs text-[#FEF3C7]">
            <span className="flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#F59E0B]" /> JCI & NABH Accredited
            </span>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0E526B] border-t border-[#1D82A6]/40 px-6 py-5 shadow-2xl space-y-4">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-700">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAppointmentModal();
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold bg-gold-gradient text-slate-950"
              >
                <Calendar className="w-3.5 h-3.5" /> Book Appointment
              </button>
              <a
                href="#doctors"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-[#1D82A6] text-white border border-white/20"
              >
                <UserCheck className="w-3.5 h-3.5 text-[#FEF3C7]" /> Find Doctor
              </a>
            </div>

            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.action ? (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        item.action();
                      }}
                      className="block w-full text-left py-2 text-sm font-medium text-slate-100 hover:text-[#F59E0B]"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block py-2 text-sm font-medium text-slate-100 hover:text-[#F59E0B]"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
