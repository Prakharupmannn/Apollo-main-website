"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Award,
  Sparkles,
  CheckCircle2,
  UserCheck,
  Building2,
  ArrowRight,
  ArrowUpRight,
  Search,
  Star,
  PhoneCall,
  ShieldCheck,
  Users,
  BadgeCheck,
  Stethoscope,
} from "lucide-react";
import AppointmentModal from "../../../components/components/AppointmentModal";
import { caseStudiesData, departments } from "../../../data/caseStudiesData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const goldGradient = {
  background: "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
};

/* ───────────────────────── Instagram-style progress-bar carousel with slow Ken Burns zoom ───────────────────────── */
function CardImageCarousel({ images, alt, duration = 3800 }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      duration,
    );
    return () => clearInterval(t);
  }, [images.length, duration]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={images[index]}
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0, scale: 1.15 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <motion.img
            src={images[index]}
            alt={alt}
            initial={{ scale: 1 }}
            animate={{ scale: 1.14 }}
            transition={{ duration: duration / 1000 + 1, ease: "linear" }}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Story-style progress segments */}
      <div className="absolute top-3 sm:top-4 left-4 right-4 sm:left-5 sm:right-5 flex gap-1.5 z-20">
        {images.map((_, i) => (
          <div
            key={i}
            className="flex-1 h-[3px] rounded-full bg-white/25 overflow-hidden"
          >
            {i === index && (
              <motion.div
                key={index}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: duration / 1000, ease: "linear" }}
                className="h-full bg-gradient-to-r from-[#F6D98A] to-white"
              />
            )}
            {i < index && <div className="h-full w-full bg-white" />}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── Premium glass case study card ───────────────────────── */

function CaseCard({ c, index, onOpenModal }) {
  const Icon = c.icon;
  const initials = c.doctor
    .replace(/^Dr\.?\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const patientName = c.patientInfo?.name || c.patient;
  const patientCity = c.patientInfo?.city;
  const number = String(index + 1).padStart(2, "0");

  const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

  return (
    <motion.div
      custom={index}
      variants={cardVariant}
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative h-full"
    >
      <Link
        href={`/patientcare/case-studies/${c.slug}`}
        className={`cc-border-glow group relative block h-full p-[2px] rounded-[1.5rem] sm:rounded-[2rem] bg-gradient-to-br ${c.accent} shadow-[0_18px_45px_rgba(10,95,122,0.18)] hover:shadow-[0_40px_80px_rgba(10,95,122,0.32)] transition-shadow duration-500`}
      >
        {/* Height is now flexible: image area has a responsive height, body grows with content */}
        <div className="relative h-full min-h-[460px] flex flex-col rounded-[calc(1.5rem-2px)] sm:rounded-[calc(2rem-2px)] overflow-hidden bg-gradient-to-b from-white via-white to-[#EAF5FA]">
          {/* ───────── IMAGE AREA ───────── */}
          <div className="relative h-[250px] sm:h-[290px] xl:h-[315px] shrink-0 overflow-hidden">
            {/* photo: brightened, drifts left + slightly blurs on hover so the glass pops */}
            <div
              className={`absolute inset-0 brightness-[1.15] contrast-[1.03] saturate-[1.1] transition-all duration-[900ms] ${ease} group-hover:-translate-x-6 group-hover:scale-[1.1] group-hover:brightness-[1.25] group-hover:blur-[1.5px]`}
            >
              <CardImageCarousel images={c.images} alt={c.title} />
            </div>

            {/* soft light fade */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/70 to-transparent pointer-events-none" />

            {/* top badges (wrap + shrink on small cards) */}
            <div className="absolute top-8 sm:top-10 left-3 right-3 sm:left-4 sm:right-4 z-30 flex flex-wrap items-start justify-between gap-1.5 sm:gap-2 pointer-events-none">
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <span className="font-serif-apollo italic text-xs sm:text-sm font-bold text-[#0B3446] w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/80 backdrop-blur-md border border-white shadow-lg flex items-center justify-center">
                  {number}
                </span>
                <span className="inline-flex items-center gap-1 sm:gap-1.5 text-[8px] sm:text-[9px] font-black uppercase tracking-wider px-2 sm:px-3 py-1.5 sm:py-2 rounded-full bg-white/80 backdrop-blur-md border border-white text-[#0E526B] shadow-lg whitespace-nowrap">
                  <BadgeCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#C8952E]" />
                  Verified Case
                </span>
              </div>

              <span
                className={`inline-flex items-center gap-1 sm:gap-1.5 max-w-full text-[8px] sm:text-[9px] font-black uppercase tracking-wider px-2 sm:px-3 py-1.5 sm:py-2 rounded-full bg-gradient-to-r ${c.accent} text-white shadow-lg ring-1 ring-white/60`}
              >
                <Stethoscope className="w-3 h-3 shrink-0" />
                <span className="truncate">{c.deptLabel}</span>
              </span>
            </div>

            {/* ───────── PREMIUM GLASS PANEL (slides in from the right on hover, mouse devices only) ───────── */}
            <div
              className={`absolute z-20 inset-x-3 sm:inset-x-4 top-[84px] sm:top-[96px] bottom-3 sm:bottom-4 translate-x-[115%] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-[750ms] ${ease} [@media(hover:none)]:hidden`}
            >
              <div className="relative h-full rounded-[1.3rem] sm:rounded-[1.6rem] overflow-hidden border border-white/50 bg-gradient-to-br from-white/45 via-[#BFE3F2]/35 to-[#1D82A6]/35 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_20px_50px_rgba(10,95,122,0.35),inset_0_1px_0_rgba(255,255,255,0.8),inset_0_0_30px_rgba(255,255,255,0.25)] px-3 sm:px-4 py-3 sm:py-4 flex flex-col justify-center gap-2.5 sm:gap-3">
                {/* gold hairline top */}
                <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#F6D98A] to-transparent" />

                {/* glowing gold edge on the leading side */}
                <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full bg-gradient-to-b from-transparent via-[#F6D98A] to-transparent shadow-[0_0_14px_rgba(246,217,138,0.9)]" />

                {/* soft light orbs inside the glass */}
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-white/50 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-8 w-32 h-32 rounded-full bg-[#F6D98A]/40 blur-3xl pointer-events-none" />

                {/* light sweep that glides across after the panel lands */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[1.3rem] sm:rounded-[1.6rem]">
                  <div className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/45 to-transparent -translate-x-[120%] skew-x-[-12deg] group-hover:[animation:csShimmerSweep_1.3s_ease_0.55s_forwards]" />
                </div>

                {/* summary */}
                <p
                  className={`relative text-[11px] sm:text-[12px] font-medium text-[#0B3446] leading-relaxed line-clamp-3 opacity-0 translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ${ease} group-hover:delay-[300ms]`}
                >
                  {c.summary}
                </p>

                {/* before → after glass tiles */}
                <div
                  className={`relative flex items-stretch gap-1.5 sm:gap-2 opacity-0 translate-x-14 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ${ease} group-hover:delay-[420ms]`}
                >
                  <div className="flex-1 min-w-0 rounded-xl bg-rose-100/60 backdrop-blur-md border border-white/70 border-l-4 border-l-rose-400 px-2.5 sm:px-3 py-2 shadow-[0_6px_16px_rgba(244,63,94,0.15)]">
                    <div className="text-[8px] font-black uppercase tracking-wider text-rose-600 mb-0.5">
                      Before
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-rose-900 leading-snug font-mono break-words">
                      {c.beforeStats}
                    </div>
                  </div>

                  <div className="flex items-center justify-center shrink-0">
                    <div
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shadow-md ring-2 ring-white/70"
                      style={goldGradient}
                    >
                      <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#3A2B0A]" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 rounded-xl bg-emerald-100/60 backdrop-blur-md border border-white/70 border-l-4 border-l-emerald-400 px-2.5 sm:px-3 py-2 shadow-[0_6px_16px_rgba(16,185,129,0.15)]">
                    <div className="text-[8px] font-black uppercase tracking-wider text-emerald-700 mb-0.5">
                      After
                    </div>
                    <div className="text-[10px] sm:text-[11px] font-bold text-emerald-900 leading-snug font-mono break-words">
                      {c.afterStats}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ───────── BODY (always visible, light) ───────── */}
          <div className="relative flex-1 flex flex-col px-4 sm:px-6 pt-8 pb-4 sm:pb-5">
            {/* icon medallion straddling image / body */}
            <div
              className={`absolute -top-6 sm:-top-7 right-4 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${c.accent} text-white flex items-center justify-center shadow-xl ring-4 ring-white group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300 z-40`}
            >
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            {/* patient + city */}
            <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black text-[#B8841F] uppercase tracking-[0.12em] sm:tracking-[0.16em] mb-2 pr-12 sm:pr-14">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8952E] shrink-0" />
              <span className="truncate">Patient: {patientName}</span>
              {patientCity && (
                <span className="text-slate-400 shrink-0">• {patientCity}</span>
              )}
            </div>

            {/* title */}
            <h2 className="font-serif-apollo text-base sm:text-lg font-black text-[#0B3446] leading-snug line-clamp-2 mb-2">
              {c.title}
            </h2>

            {/* summary + before/after for touch devices only (phones & tablets have no hover) */}
            <p className="hidden [@media(hover:none)]:block text-[12px] text-slate-600 leading-relaxed line-clamp-3 mb-2.5">
              {c.summary}
            </p>

            <div className="hidden [@media(hover:none)]:grid grid-cols-2 gap-2 mb-3">
              <div className="min-w-0 rounded-xl bg-rose-50 border border-rose-100 border-l-4 border-l-rose-400 px-2.5 py-1.5">
                <div className="text-[8px] font-black uppercase tracking-wider text-rose-600">
                  Before
                </div>
                <div className="text-[10px] font-bold text-rose-900 leading-snug font-mono break-words">
                  {c.beforeStats}
                </div>
              </div>
              <div className="min-w-0 rounded-xl bg-emerald-50 border border-emerald-100 border-l-4 border-l-emerald-400 px-2.5 py-1.5">
                <div className="text-[8px] font-black uppercase tracking-wider text-emerald-700">
                  After
                </div>
                <div className="text-[10px] font-bold text-emerald-900 leading-snug font-mono break-words">
                  {c.afterStats}
                </div>
              </div>
            </div>

            {/* gold divider that grows on hover */}
            <div className="h-[2px] w-10 group-hover:w-full rounded-full bg-gradient-to-r from-[#C8952E] to-[#1D82A6] transition-all duration-700 mb-3" />

            {/* footer: doctor + CTA */}
            <div className="mt-auto flex items-center justify-between gap-2 sm:gap-3">
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <div
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full text-[#3A2B0A] text-[10px] font-black flex items-center justify-center shrink-0 shadow-md ring-2 ring-white"
                  style={goldGradient}
                >
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] sm:text-[12px] font-bold text-[#0B3446] truncate leading-tight">
                    {c.doctor}
                  </p>
                  <p className="text-[9px] text-slate-500 font-semibold flex items-center gap-1">
                    <BadgeCheck className="w-2.5 h-2.5 text-[#1D82A6]" /> Apollo
                    Specialist
                  </p>
                </div>
              </div>

              <span
                className="cs-shimmer relative overflow-hidden inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black text-[#3A2B0A] pl-3 sm:pl-3.5 pr-1.5 sm:pr-2 py-1.5 sm:py-2 rounded-full shadow-md group-hover:shadow-lg transition-all duration-300 shrink-0 whitespace-nowrap"
                style={goldGradient}
              >
                Read Case
                <span className="w-5 h-5 rounded-full bg-[#0B3446] flex items-center justify-center">
                  <ArrowUpRight className="w-3 h-3 text-[#F6D98A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function CaseStudiesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCases = caseStudiesData.filter((c) => {
    const matchesDept = selectedDept === "all" || c.dept === selectedDept;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.summary.toLowerCase().includes(q) ||
      c.deptLabel.toLowerCase().includes(q) ||
      c.doctor.toLowerCase().includes(q);
    return matchesDept && matchesQuery;
  });

  const stats = [
    { value: `${caseStudiesData.length}+`, label: "Documented Saves" },
    { value: "40+", label: "Years of Trust" },
    { value: "18+", label: "Clinical Units" },
  ];

  return (
    <main className="relative min-h-screen bg-[#F8FBFD] text-slate-900 pt-28 sm:pt-36 xl:pt-40 pb-16 sm:pb-20 selection:bg-[#1D82A6] selection:text-white overflow-hidden">
      {/* global so the classes also apply inside the CaseCard component */}
      <style jsx global>{`
        .cs-orb {
          position: absolute;
          border-radius: 9999px;
          pointer-events: none;
        }
        .cs-orb-1 {
          width: 420px;
          height: 420px;
          top: -140px;
          left: -120px;
          background: radial-gradient(circle, #bfe3f2, transparent 70%);
          opacity: 0.55;
          animation: csFloat1 16s ease-in-out infinite;
        }
        .cs-orb-2 {
          width: 380px;
          height: 380px;
          top: 20%;
          right: -140px;
          background: radial-gradient(circle, #f3dfa8, transparent 70%);
          opacity: 0.5;
          animation: csFloat2 20s ease-in-out infinite;
        }
        @media (max-width: 640px) {
          .cs-orb-1 {
            width: 260px;
            height: 260px;
            top: -90px;
            left: -90px;
          }
          .cs-orb-2 {
            width: 240px;
            height: 240px;
            right: -110px;
          }
        }
        @keyframes csFloat1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(40px, 40px) scale(1.08);
          }
        }
        @keyframes csFloat2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-40px, 30px) scale(1.06);
          }
        }
        @keyframes csShimmerSweep {
          0% {
            transform: translateX(-120%) skewX(-12deg);
          }
          100% {
            transform: translateX(220%) skewX(-12deg);
          }
        }
        .cs-shimmer::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.35),
            transparent
          );
          transform: translateX(-120%) skewX(-12deg);
        }
        .cs-shimmer:hover::after,
        .group:hover .cs-shimmer::after {
          animation: csShimmerSweep 1s ease forwards;
        }
        @keyframes csFloatCard {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .cs-float-card {
          animation: csFloatCard 4.5s ease-in-out infinite;
        }
        @keyframes csPulseRing {
          0% {
            transform: scale(0.9);
            opacity: 0.7;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
        .cs-pulse-ring {
          animation: csPulseRing 2s ease-out infinite;
        }
        .cc-border-glow {
          position: relative;
        }
        .cc-border-glow::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          background: inherit;
          filter: blur(16px);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
        }
        .cc-border-glow:hover::before {
          opacity: 0.6;
        }
        .cc-panel {
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .group:hover .cc-panel {
          transform: translateY(-4px);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="cs-orb cs-orb-1" />
        <div className="cs-orb cs-orb-2" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(#1D82A6 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(ellipse 80% 55% at 50% 25%, black 15%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 55% at 50% 25%, black 15%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* ───── Hero ───── */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16 sm:mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-white border border-[#1D82A6]/20 text-[#0E526B] text-[10px] sm:text-xs font-bold shadow-sm mb-5 max-w-full"
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1D82A6] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1D82A6]" />
                </span>
                <span className="truncate">
                  Clinical Excellence • Apollo Hospitals Jabalpur
                </span>
              </motion.div>

              <p className="font-serif-apollo italic text-base sm:text-xl text-[#C8952E] font-semibold mb-2">
                Real Stories, Real Recoveries
              </p>

              <h1 className="font-serif-apollo text-3xl sm:text-5xl lg:text-[3.4rem] font-black tracking-tight leading-[1.1] sm:leading-[1.08] text-[#0B3446] mb-5">
                Clinical Case Studies &{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #C8952E 0%, #1D82A6 100%)",
                  }}
                >
                  Medical Breakthroughs
                </span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mb-7 sm:mb-8">
                Real documented cases of lives saved through TAVI heart valve
                procedures, awake brain tumor craniotomy, 36-hour trauma
                resuscitations, and robotic knee surgeries.
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-7 sm:mb-8">
                <motion.button
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsModalOpen(true)}
                  className="cs-shimmer relative overflow-hidden px-5 sm:px-7 py-3 sm:py-3.5 rounded-full text-xs sm:text-sm font-black text-[#3A2B0A] shadow-[0_10px_30px_rgba(200,149,46,0.35)] hover:shadow-xl transition-all cursor-pointer flex items-center gap-2"
                  style={goldGradient}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Consult Clinical Team</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <a
                  href="#department-filters"
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0E526B] hover:text-[#1D82A6] transition-colors group"
                >
                  <span className="w-9 h-9 rounded-full bg-white border border-[#1D82A6]/20 shadow-sm flex items-center justify-center group-hover:border-[#1D82A6]/50 transition-colors shrink-0">
                    <ShieldCheck className="w-4 h-4 text-[#1D82A6]" />
                  </span>
                  Browse by Department
                </a>
              </div>

              <div className="relative w-full max-w-md mb-2">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search cases, specialities, doctors..."
                  className="w-full pl-11 pr-4 py-3 sm:py-3.5 rounded-full bg-white border border-slate-200 shadow-sm text-sm focus:outline-none focus:border-[#1D82A6] focus:ring-2 focus:ring-[#1D82A6]/15 transition-all"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-5 sm:pt-6">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3 sm:px-3.5 py-2 rounded-full bg-white border border-slate-200 shadow-sm"
                  >
                    <span className="text-sm font-black text-[#0B3446]">
                      {s.value}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="relative rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden shadow-[0_30px_70px_rgba(10,95,122,0.25)] border-4 border-white"
              >
                <img
                  src="/images/case-studies/Case-Studies.png"
                  alt="Apollo Hospitals clinical team"
                  className="w-full h-[300px] sm:h-[420px] lg:h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B3446]/40 via-transparent to-transparent" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="cs-float-card absolute -top-4 sm:-top-5 left-2 sm:-left-4 lg:-left-8 bg-white rounded-2xl shadow-xl border border-slate-100 px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#EDF6FB] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#1D82A6]" />
                </div>
                <div>
                  <div className="text-sm font-black text-[#0B3446] leading-none">
                    99.4%
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                    Patient satisfaction
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="cs-float-card absolute -bottom-6 left-3 right-3 sm:left-8 sm:right-8 bg-white rounded-2xl shadow-xl border border-slate-100 px-3 sm:px-4 py-3 sm:py-3.5 flex items-center justify-between gap-2 sm:gap-3"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                  <div
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={goldGradient}
                  >
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#3A2B0A] fill-[#3A2B0A]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-black text-[#0B3446] leading-none">
                      4.9 / 5.0
                    </div>
                    <div className="text-[10px] text-slate-500 font-semibold mt-0.5 truncate">
                      150,000+ verified reviews
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-3 sm:px-3.5 py-2 rounded-full bg-[#0E526B] text-white text-[11px] font-bold hover:bg-[#0A5F7A] transition-colors shrink-0"
                >
                  Book Now
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute top-3 right-3 sm:top-6 sm:right-6 lg:right-10"
              >
                <a
                  href="tel:18001236666"
                  className="relative flex items-center gap-2 bg-rose-600 text-white rounded-full pl-2 sm:pl-3 pr-3 sm:pr-4 py-2 sm:py-2.5 shadow-lg hover:bg-rose-700 transition-colors"
                >
                  <span className="relative flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center shrink-0">
                    <span className="cs-pulse-ring absolute inline-flex h-full w-full rounded-full bg-white/50" />
                    <span className="relative inline-flex items-center justify-center h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-white/15">
                      <PhoneCall className="w-3.5 h-3.5" />
                    </span>
                  </span>
                  <div className="leading-tight">
                    <div className="text-[9px] font-semibold text-rose-100">
                      24/7 Emergency
                    </div>
                    <div className="text-[11px] font-black">1800-123-6666</div>
                  </div>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ───── Department Filters ───── */}
        <section
          id="department-filters"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10 scroll-mt-32"
        >
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {departments.map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDept(d.id)}
                className={`shrink-0 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                  selectedDept === d.id
                    ? "bg-gradient-to-r from-[#0A5F7A] to-[#2A8FAF] text-white shadow-md scale-[1.03]"
                    : "bg-white text-[#0E526B] hover:bg-slate-50 border border-[#1D82A6]/20 hover:border-[#1D82A6]/40"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </section>

        {/* ───── Grid intro ───── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
          <div className="flex items-end justify-between flex-wrap gap-3">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#C8952E] mb-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Featured Recoveries
              </span>
              <h2 className="font-serif-apollo text-lg sm:text-2xl font-black text-[#0B3446]">
                Every Case, Verified & Documented
              </h2>
            </div>
            <span className="text-[11px] font-bold text-slate-400">
              {filteredCases.length} case{filteredCases.length !== 1 ? "s" : ""}{" "}
              shown
            </span>
          </div>
        </section>

        {/* ───── Case Studies Grid ───── */}
        <motion.section
          key={selectedDept + searchQuery}
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 sm:mb-16"
        >
          <AnimatePresence mode="wait">
            {filteredCases.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-5 lg:gap-x-7 gap-y-8 sm:gap-y-10 items-stretch w-full max-w-xl mx-auto md:max-w-none">
                {filteredCases.map((c, i) => (
                  <CaseCard
                    key={c.slug}
                    c={c}
                    index={i}
                    onOpenModal={() => setIsModalOpen(true)}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                variants={fadeUp}
                className="text-center py-16 bg-white rounded-3xl border border-slate-200"
              >
                <p className="text-slate-500 font-semibold">
                  No case studies match your search.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* ───── Trust Footer Banner ───── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
          <div className="relative p-[1.5px] rounded-3xl bg-gradient-to-r from-[#1D82A6]/30 via-[#C8952E]/40 to-[#1D82A6]/30 shadow-md">
            <div className="rounded-[calc(1.5rem-1.5px)] bg-white p-5 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 text-center md:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] flex items-center justify-center text-[#F6D98A] shadow-lg shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-extrabold text-[#0B3446]">
                    Apollo JBP Hospitals • Jabalpur Clinical Breakthroughs
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    For medical second opinion & case referral: 1800-123-6666 /
                    7566 123666.
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsModalOpen(true)}
                className="cs-shimmer relative overflow-hidden w-full sm:w-auto px-6 py-3 rounded-full text-xs font-extrabold text-[#3A2B0A] shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
                style={goldGradient}
              >
                Request Case Consultation
              </motion.button>
            </div>
          </div>
        </section>
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}