"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Home,
  ChevronDown,
  Phone,
  MapPin,
  Menu,
  X,
  ArrowRight,
} from "lucide-react";
import { navLinks } from "./NavLinksData";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleEnter = (label) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenDropdown(label);
  };

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      {/* Main nav */}
      <nav
        className={`relative transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-lg shadow-[0_1px_20px_rgba(10,42,67,0.08)] py-3"
            : "bg-white/70 backdrop-blur-md py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-full bg-navy-900 flex items-center justify-center">
              <span className="text-gold-400 font-serif text-lg font-semibold">A</span>
            </div>
            <div className="leading-tight">
              <p className="font-serif text-xl text-navy-900 font-semibold tracking-tight">
                Apollo
              </p>
              <p className="text-[11px] text-navy-800/60 tracking-[0.15em] uppercase -mt-0.5">
                JBP Hospitals
              </p>
            </div>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex items-center gap-1">
            <li>
              <Link
                href="/"
                aria-label="Home"
                className="flex items-center justify-center w-10 h-10 rounded-full text-navy-800 hover:bg-navy-900 hover:text-gold-400 transition-colors duration-200"
              >
                <Home size={18} />
              </Link>
            </li>

            {navLinks.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.dropdown && handleEnter(item.label)}
                onMouseLeave={() => item.dropdown && handleLeave()}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-1 px-4 py-2.5 text-[14.5px] font-medium text-navy-900/85 hover:text-navy-900 rounded-full hover:bg-navy-900/5 transition-colors duration-200"
                >
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${
                        openDropdown === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {item.dropdown && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                      openDropdown === item.label
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="w-[340px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(10,42,67,0.18)] border border-navy-900/5 p-3">
                      {item.dropdown.map((d) => (
                        <Link
                          key={d.label}
                          href={d.href}
                          className="flex flex-col gap-0.5 px-4 py-3 rounded-xl hover:bg-navy-900/[0.04] transition-colors group"
                        >
                          <span className="text-[14.5px] font-medium text-navy-900 flex items-center justify-between">
                            {d.label}
                            <ArrowRight
                              size={14}
                              className="text-gold-500 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
                            />
                          </span>
                          {d.description && (
                            <span className="text-[12.5px] text-navy-800/55">
                              {d.description}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* CTA + mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="hidden md:inline-flex items-center gap-2 bg-navy-900 text-offwhite text-[14px] font-medium px-5 py-2.5 rounded-full hover:bg-navy-800 transition-colors duration-200 border border-transparent hover:border-gold-500/40"
            >
              Book Appointment
              <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-navy-900 hover:bg-navy-900/5"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden bg-white border-t border-navy-900/5 overflow-hidden transition-all duration-300 ${
          mobileOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="px-6 py-4 flex flex-col gap-1">
          <li>
            <Link
              href="/"
              className="flex items-center gap-3 py-3 text-navy-900 font-medium"
            >
              <Home size={18} className="text-gold-500" /> Home
            </Link>
          </li>
          {navLinks.map((item) => (
            <li key={item.label} className="border-t border-navy-900/5 py-1">
              <Link
                href={item.href}
                className="flex items-center justify-between py-3 text-navy-900 font-medium"
              >
                {item.label}
              </Link>
              {item.dropdown && (
                <ul className="pl-4 pb-2 flex flex-col gap-2">
                  {item.dropdown.map((d) => (
                    <li key={d.label}>
                      <Link
                        href={d.href}
                        className="text-[14px] text-navy-800/70 hover:text-gold-600"
                      >
                        {d.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          <li className="pt-3">
            <Link
              href="#"
              className="flex items-center justify-center gap-2 bg-navy-900 text-offwhite text-[14px] font-medium px-5 py-3 rounded-full"
            >
              Book Appointment
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}