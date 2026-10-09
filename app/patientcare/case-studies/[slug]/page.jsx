"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  CheckCircle2,
  Quote,
  UserCheck,
  Stethoscope,
  Building2,
  ArrowRight,
  User,
  MapPin,
  Clock,
  Activity,
  Award,
  Sparkles,
  BadgeCheck,
  Calendar,
  FileText,
  ShieldCheck,
  ChevronRight,
  PhoneCall,
  ArrowUpRight,
} from "lucide-react";

import {
  getCaseBySlug,
  caseStudiesData,
} from "../../../../data/caseStudiesData";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const goldGradient = {
  background: "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
};

/* ───────────────────────── Image gallery / carousel component ───────────────────────── */
function CaseDetailGallery({ images, title }) {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-lg group">
      <div className="relative h-64 sm:h-80 w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[index]}
            src={images[index]}
            alt={`${title} image ${index + 1}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider">
          Clinical Imagery ({index + 1}/{images.length})
        </span>
      </div>

      {images.length > 1 && (
        <div className="flex items-center justify-between p-3 bg-white border-t border-slate-100">
          <div className="flex gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`relative w-12 h-12 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  i === index
                    ? "border-[#1D82A6] scale-105 shadow-md"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt="thumb"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
          <span className="text-[11px] font-semibold text-slate-500">
            Click thumbnail to view
          </span>
        </div>
      )}
    </div>
  );
}

export default function CaseStudyDetailPage({ params }) {
  const { slug } = use(params);

  const caseData = getCaseBySlug(slug);

  if (!caseData) notFound();

  const Icon = caseData.icon || Stethoscope;
  const relatedCases = caseStudiesData
    .filter((c) => c.slug !== caseData.slug && c.dept === caseData.dept)
    .slice(0, 2);
  const fallbackRelated = caseStudiesData
    .filter((c) => c.slug !== caseData.slug)
    .slice(0, 2);
  const related = relatedCases.length ? relatedCases : fallbackRelated;

  const patientMeta = caseData.patientInfo || {};

  return (
    <main className="relative min-h-screen bg-[#F8FBFD] text-slate-900 pt-38 pb-20 selection:bg-[#1D82A6] selection:text-white overflow-hidden">
      <style jsx>{`
        .cd-orb {
          position: absolute;
          border-radius: 9999px;
          pointer-events: none;
        }
        .cd-orb-1 {
          width: 420px;
          height: 420px;
          top: -140px;
          left: -120px;
          background: radial-gradient(circle, #bfe3f2, transparent 70%);
          opacity: 0.55;
          animation: cdFloat1 16s ease-in-out infinite;
        }
        .cd-orb-2 {
          width: 380px;
          height: 380px;
          top: 30%;
          right: -140px;
          background: radial-gradient(circle, #f3dfa8, transparent 70%);
          opacity: 0.45;
          animation: cdFloat2 20s ease-in-out infinite;
        }
        @keyframes cdFloat1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(40px, 40px) scale(1.08);
          }
        }
        @keyframes cdFloat2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-40px, 30px) scale(1.06);
          }
        }
        @keyframes cdShimmerSweep {
          0% {
            transform: translateX(-120%) skewX(-12deg);
          }
          100% {
            transform: translateX(220%) skewX(-12deg);
          }
        }
        .cd-shimmer::after {
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
        .cd-shimmer:hover::after {
          animation: cdShimmerSweep 1s ease forwards;
        }
      `}</style>

      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="cd-orb cd-orb-1" />
        <div className="cd-orb cd-orb-2" />
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/patientcare/case-studies"
          className="inline-flex items-center gap-2 text-xs font-extrabold text-[#0E526B] hover:text-[#1D82A6] transition-colors mb-6 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-slate-200 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to All Clinical Case Studies
        </Link>

        {/* ───── Hero Header Card ───── */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="relative p-[1.5px] rounded-[2.2rem] bg-gradient-to-br from-[#F6D98A]/80 via-[#1D82A6]/40 to-[#C8952E]/80 shadow-[0_30px_70px_rgba(10,95,122,0.25)] mb-10 overflow-hidden"
        >
          <div
            className={`relative rounded-[calc(2.2rem-1.5px)] overflow-hidden bg-gradient-to-br ${caseData.accent} p-8 sm:p-12 text-white`}
          >
            <Icon className="absolute -right-12 -bottom-12 w-80 h-80 opacity-[0.07] pointer-events-none" />

            {/* Verified badge top right */}
            <div className="absolute top-6 right-6 hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 backdrop-blur-md text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
              <BadgeCheck className="w-4 h-4 text-[#F6D98A]" />
              Apollo Verified Clinical Case
            </div>

            <div className="relative z-10 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2.5 mb-5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/15 border border-white/25 text-[10px] font-black uppercase tracking-wider text-white shadow-sm">
                  <Stethoscope className="w-3.5 h-3.5 text-[#F6D98A]" />
                  {caseData.deptLabel}
                </span>

                {caseData.treatmentDuration && (
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/20 border border-white/20 text-[10px] font-bold text-slate-100">
                    <Clock className="w-3.5 h-3.5 text-[#F6D98A]" />
                    Duration: {caseData.treatmentDuration}
                  </span>
                )}
              </div>

              <h1 className="font-serif-apollo text-2xl sm:text-4xl lg:text-5xl font-black leading-tight mb-6 drop-shadow-sm">
                {caseData.title}
              </h1>

              {/* Before vs After Highlight Badges */}
              <div className="flex flex-wrap items-stretch gap-3">
                {caseData.beforeStats && (
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-500/20 border border-rose-300/35 text-rose-50 text-xs font-mono font-bold shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
                    <span>Before: {caseData.beforeStats}</span>
                  </div>
                )}
                {caseData.afterStats && (
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-300/35 text-emerald-50 text-xs font-mono font-bold shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                    <span>After: {caseData.afterStats}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ───── Quick Specs Grid (Patient & Clinical Metadata) ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10"
        >
          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
              <User className="w-3.5 h-3.5 text-[#1D82A6]" /> Patient Name
            </span>
            <span className="text-sm font-black text-[#0B3446] truncate">
              {caseData.patient || patientMeta.name || "Apollo Patient"}
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
              <User className="w-3.5 h-3.5 text-[#C8952E]" /> Gender & Age
            </span>
            <span className="text-sm font-black text-[#0B3446] truncate">
              {patientMeta.gender || "Patient"}{" "}
              {patientMeta.age ? `• ${patientMeta.age}` : ""}
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
              <MapPin className="w-3.5 h-3.5 text-rose-500" /> Origin City
            </span>
            <span className="text-sm font-black text-[#0B3446] truncate">
              {patientMeta.city || "Jabalpur, MP"}
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
              <Stethoscope className="w-3.5 h-3.5 text-[#0A5F7A]" /> Lead Doctor
            </span>
            <span className="text-sm font-black text-[#0E526B] truncate">
              {caseData.doctor}
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 bg-white rounded-2xl border border-slate-200/80 p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center gap-1 mb-1">
              <Clock className="w-3.5 h-3.5 text-emerald-600" /> Duration
            </span>
            <span className="text-sm font-black text-[#0B3446] truncate">
              {caseData.treatmentDuration || "Successful Recovery"}
            </span>
          </div>
        </motion.section>

        {/* ───── Main Body Grid (8 Cols Left, 4 Cols Sticky Right) ───── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Main Left Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Acquired Disease / Diagnosis Banner if available */}
            {caseData.acquiredDiseases && (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-gradient-to-r from-[#0E526B]/5 via-[#1D82A6]/10 to-[#C8952E]/10 rounded-3xl border border-[#1D82A6]/20 p-6 flex items-start gap-4 shadow-sm"
              >
                <div className="w-10 h-10 rounded-2xl bg-[#0E526B] text-white flex items-center justify-center shrink-0 shadow-md">
                  <Activity className="w-5 h-5 text-[#F6D98A]" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#C8952E]">
                    Primary Diagnosis & Condition
                  </span>
                  <h3 className="text-base font-black text-[#0B3446] leading-snug mt-0.5">
                    {caseData.acquiredDiseases}
                  </h3>
                </div>
              </motion.div>
            )}

            {/* Case Summary */}
            <motion.section
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl bg-[#EDF6FB] text-[#0E526B] flex items-center justify-center font-black">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="font-serif-apollo text-xl sm:text-2xl font-black text-[#0B3446]">
                  Case Summary & Patient Overview
                </h2>
              </div>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                {caseData.summary}
              </p>

              {/* Extra details array if present */}
              {caseData.details && caseData.details.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                  {caseData.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1D82A6] mt-2 shrink-0" />
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </motion.section>

            {/* The Clinical Challenge */}
            {caseData.challenge && (
              <motion.section
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="bg-gradient-to-br from-rose-50/60 to-orange-50/40 rounded-3xl border border-rose-200/80 p-6 sm:p-8 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h2 className="font-serif-apollo text-xl font-black text-[#0B3446]">
                    The Clinical Challenge
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {caseData.challenge}
                </p>
              </motion.section>
            )}

            {/* Treatment Details & Procedure */}
            <motion.section
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0A5F7A] to-[#1D82A6] text-white flex items-center justify-center shadow-md">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <h2 className="font-serif-apollo text-xl sm:text-2xl font-black text-[#0B3446]">
                    Clinical Procedure & Treatment Details
                  </h2>
                </div>
              </div>

              <div className="space-y-4">
                {(caseData.procedure || caseData.details || []).map(
                  (step, i) => (
                    <div
                      key={i}
                      className="group flex items-start gap-4 p-4 rounded-2xl bg-[#F8FBFD] border border-slate-200/70 hover:border-[#1D82A6]/40 hover:shadow-md transition-all duration-300"
                    >
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#0A5F7A] to-[#1D82A6] text-white text-xs font-black flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform">
                        {i + 1}
                      </div>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <p className="text-xs sm:text-sm text-[#0B3446] font-medium leading-relaxed">
                          {step}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </motion.section>

            {/* Documented Clinical Outcomes */}
            <motion.section
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-serif-apollo text-xl sm:text-2xl font-black text-[#0B3446]">
                    Clinical Outcomes & Results
                  </h2>
                  <p className="text-xs text-slate-500 font-medium">
                    Documented therapeutic achievements
                  </p>
                </div>
              </div>

              {/* Outcome summary paragraph */}
              {caseData.outcome && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 text-sm text-emerald-950 font-medium leading-relaxed">
                  {caseData.outcome}
                </div>
              )}

              {/* Outcomes list grid */}
              {caseData.outcomesList && caseData.outcomesList.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {caseData.outcomesList.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F8FBFD] border border-slate-200/80"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-bold text-[#0B3446] leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-slate-700 leading-relaxed font-medium">
                    {caseData.outcome ||
                      "Full clinical recovery achieved without surgical or systemic complications."}
                  </p>
                </div>
              )}
            </motion.section>

            {/* Patient Testimonial Quote */}
            {caseData.quote && (
              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={fadeUp}
                className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#FEF3C7] via-[#FFFBEB] to-[#FEF3C7] border border-[#F6D98A] text-[#3A2B0A] shadow-sm"
              >
                <Quote className="w-8 h-8 text-[#C8952E] mb-3 opacity-60" />
                <p className="font-serif-apollo italic text-base sm:text-lg font-bold leading-relaxed mb-4">
                  "{caseData.quote}"
                </p>
                <div className="flex items-center gap-3 border-t border-[#F6D98A]/60 pt-4">
                  <div className="w-9 h-9 rounded-full bg-[#C8952E] text-white font-black text-xs flex items-center justify-center">
                    {caseData.patient ? caseData.patient[0] : "P"}
                  </div>
                  <div>
                    <div className="text-xs font-black text-[#3A2B0A]">
                      {caseData.patient || "Verified Apollo Patient"}
                    </div>
                    <div className="text-[10px] font-semibold text-[#8C6418]">
                      Apollo JBP Hospitals Jabalpur Patient Review
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sticky Sidebar (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Doctor & Patient Profile Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-5">
                <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${caseData.accent} text-white text-base font-black flex items-center justify-center shrink-0 shadow-md ring-4 ring-slate-50`}
                  >
                    {caseData.doctor
                      .replace(/^Dr\.?\s*/i, "")
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <span className="text-[9px] font-black uppercase tracking-wider text-[#C8952E]">
                      Lead Specialist
                    </span>
                    <h3 className="text-base font-black text-[#0B3446] truncate">
                      {caseData.doctor}
                    </h3>
                    {caseData.doctorRole && (
                      <p className="text-[11px] text-slate-500 font-semibold truncate">
                        {caseData.doctorRole}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-semibold">
                      Patient Name
                    </span>
                    <span className="font-extrabold text-[#0B3446]">
                      {caseData.patient || "Confidential"}
                    </span>
                  </div>

                  {patientMeta.age && (
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500 font-semibold">
                        Age & Gender
                      </span>
                      <span className="font-extrabold text-[#0B3446]">
                        {patientMeta.gender}, {patientMeta.age}
                      </span>
                    </div>
                  )}

                  {patientMeta.city && (
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500 font-semibold">
                        Location / City
                      </span>
                      <span className="font-extrabold text-[#0B3446]">
                        {patientMeta.city}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-500 font-semibold">
                      Department
                    </span>
                    <span className="font-extrabold text-[#0E526B]">
                      {caseData.deptLabel}
                    </span>
                  </div>
                </div>

                <Link
                  href="/patientcare/appointment"
                  className="cd-shimmer relative overflow-hidden w-full py-3.5 rounded-2xl text-xs font-black text-[#3A2B0A] shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  style={goldGradient}
                >
                  <UserCheck className="w-4 h-4" />
                  <span>Consult Lead Specialist</span>
                </Link>
              </div>

              {/* Case Images Gallery if available */}
              {caseData.images && caseData.images.length > 0 && (
                <CaseDetailGallery
                  images={caseData.images}
                  title={caseData.title}
                />
              )}

              {/* Emergency Call Box */}
              <div className="rounded-3xl bg-gradient-to-br from-[#0B3446] to-[#0A5F7A] p-6 text-white shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-600 flex items-center justify-center text-white shrink-0 shadow-md">
                    <PhoneCall className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black">24/7 Apollo Helpline</h4>
                    <p className="text-[10px] text-slate-300">
                      Second opinion & emergency booking
                    </p>
                  </div>
                </div>
                <div className="space-y-1.5 pt-2">
                  <a
                    href="tel:18001236666"
                    className="block w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-center text-xs font-black transition-colors"
                  >
                    Tollfree: 1800-123-6666
                  </a>
                  <a
                    href="tel:7566123666"
                    className="block w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-center text-xs font-black transition-colors"
                  >
                    Direct: 7566 123666
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ───── Related Cases Section ───── */}
        {related.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif-apollo text-xl sm:text-2xl font-black text-[#0B3446]">
                More Case Studies in {caseData.deptLabel}
              </h2>
              <Link
                href="/patientcare/case-studies"
                className="text-xs font-bold text-[#0E526B] hover:text-[#1D82A6] transition-colors flex items-center gap-1"
              >
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((r) => {
                const RIcon = r.icon || Stethoscope;
                return (
                  <Link
                    key={r.slug}
                    href={`/patientcare/case-studies/${r.slug}`}
                    className="group flex items-center gap-4 bg-white rounded-3xl border border-slate-200 p-5 hover:shadow-lg hover:border-[#1D82A6]/30 transition-all duration-300"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${r.accent} text-white flex items-center justify-center shrink-0 shadow-md`}
                    >
                      <RIcon className="w-7 h-7" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-[#C8952E]">
                        {r.deptLabel} • {r.patient || "Apollo Case"}
                      </span>
                      <h3 className="text-sm font-black text-[#0B3446] leading-snug truncate group-hover:text-[#1D82A6] transition-colors">
                        {r.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                        {r.doctor}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#1D82A6] group-hover:translate-x-1 transition-all shrink-0" />
                  </Link>
                );
              })}
            </div>
          </motion.section>
        )}

        {/* ───── Trust Footer Banner ───── */}
        <section className="mb-16">
          <div className="relative p-[1.5px] rounded-3xl bg-gradient-to-r from-[#1D82A6]/30 via-[#C8952E]/40 to-[#1D82A6]/30 shadow-md">
            <div className="rounded-[calc(1.5rem-1.5px)] bg-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] flex items-center justify-center text-[#F6D98A] shadow-lg shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[#0B3446]">
                    Apollo JBP Hospitals • Jabalpur Clinical Breakthroughs
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    For medical second opinion & case referral: 1800-123-6666 /
                    7566 123666.
                  </p>
                </div>
              </div>

              <Link
                href="/patientcare/appointment"
                className="cd-shimmer relative overflow-hidden px-6 py-3 rounded-full text-xs font-extrabold text-[#3A2B0A] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer shrink-0"
                style={goldGradient}
              >
                Request Case Consultation
              </Link>
            </div>
          </div>
        </section>
      </div>

    </main>
  );
}
