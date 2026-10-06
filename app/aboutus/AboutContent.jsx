"use client";
import Link from "next/link";
import React, { useRef } from "react";
import {
  X,
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Award,
  Quote,
  Heart,
  Star,
  Brain,
  CheckCircle2,
  HeartPulse,
  Hospital,
  Microscope,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  Activity,
  Dna,
  ScanLine,
  Zap,
  Trees,
  Building2,
  Handshake,
  Landmark,
  Check,
  Radiation,
} from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { useEffect, useState } from "react";

/* =========================================================
   DATA
========================================================= */

const milestones = [
  {
    year: "Origin",
    title: "A Partnership Built for Scale",
    text: "Apollo JBP Hospitals is a managed unit of Apollo Hospitals Enterprise Limited, established through a partnership between the Global Institute of Medical Science & Health Care and Apollo Hospitals Enterprise Limited.",
  },
  {
    year: "May 2025",
    title: "Opened to Jabalpur",
    text: "Inaugurated by Pt. Dhirendra Krishna Shastri, with Chairman Saurabh Baderia bringing the project to completion — on the banks of the sacred Narmada, marking a new chapter for healthcare in the city.",
  },
  {
    year: "Today",
    title: "The World of Apollo, Now in Jabalpur",
    text: "Apollo JBP Hospitals brings quaternary care, the region's only PET-CT facility and 12 modular operation theatres to Central India.",
  },
];

const values = [
  {
    number: "01",
    title: "People First",
    subtitle: "Compassion in every step",
    text: "We put patients and their families at the heart of everything we do, ensuring dignity, respect and personalised care at every stage.",
    fullContent: `At Apollo JBP Hospitals, every patient is more than a diagnosis — they are someone's parent, child, or partner, arriving with their own fears and hopes. We start every interaction by listening first, because understanding a patient's story is the foundation of good care.

Our nursing and support teams are trained to treat every person with warmth and dignity, whether they're walking in for a routine check-up or facing a difficult diagnosis. Families are kept informed and involved, never left waiting in the dark.

From the moment you enter our doors to the day you're discharged, our goal is simple: make sure you feel seen, heard and cared for — not just treated.`,
    image: "/images/care.png",
    icon: Heart,
  },
  {
    number: "02",
    title: "Clinical Excellence",
    subtitle: "Advanced for a better tomorrow",
    text: "We combine expertise, technology and evidence-based practices to deliver the highest standards of medical care.",
    fullContent: `Our clinical teams are led by specialists who continually train on the latest surgical techniques, diagnostic tools and treatment protocols, so that the care you receive reflects current medical best practice, not outdated routine.

We invest in advanced diagnostic and surgical technology across our departments, allowing for more accurate diagnoses, less invasive procedures and faster recoveries wherever possible.

Every treatment plan at Apollo JBP is built around evidence — reviewed, discussed and tailored to the individual patient, rather than a one-size-fits-all approach. Excellence, for us, means getting the details right every single time.`,
    image: "/images/excellence.png",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Trust & Transparency",
    subtitle: "Built on integrity",
    text: "We believe in open communication, honest guidance and ethical practices, always.",
    fullContent: `Medical decisions are some of the hardest anyone has to make, and we believe patients deserve complete honesty to make them. Our doctors take the time to explain diagnoses, treatment options and costs clearly, in plain language, before any decision is made.

We never recommend a procedure or test that isn't medically necessary. If a second opinion would help you feel confident in a decision, we encourage it.

Billing at Apollo JBP is transparent from the start — no hidden charges, no surprises. Trust isn't something we ask for; it's something we earn through consistent, honest care.`,
    image: "/images/trust.png",
    icon: Star,
  },
  {
    number: "04",
    title: "Community Impact",
    subtitle: "A healthier tomorrow",
    text: "We work towards stronger, healthier communities through education, outreach and accessible care.",
    fullContent: `Good healthcare shouldn't stop at our hospital walls. We regularly run free health check-up camps, vaccination drives and awareness programs across Jabalpur and surrounding areas, reaching people who may not otherwise have easy access to specialist care.

We work closely with local schools and community organisations to educate people on preventive health — because catching a problem early, or avoiding it altogether, changes lives far more than treating it later.

Our goal is to be more than a hospital people visit when they're unwell — we want to be a partner in helping our community stay healthy, informed and cared for, every day of the year.`,
    image: "/images/community.png",
    icon: Users,
  },
];

const stats = [
  {
    value: "12",
    label: "Modular operation theatres built to international standards",
  },
  {
    value: "50+",
    label: "Accomplished clinicians across specialties",
  },
  {
    value: "10",
    label: "Acres of landscaped campus in Jabalpur",
  },
  {
    value: "1",
    label: "Region's only PET-CT facility for advanced diagnostics",
  },
];

const innovations = [
  {
    title: "Advanced Cancer Care",
    text: "LINAC radiotherapy with SRS & SBRT capabilities, supported by advanced PET-CT diagnostics for comprehensive cancer care.",
    icon: Radiation,
    href: "/service/onco-sciences/",
  },
  {
    title: "Region's Only PET-CT Facility",
    text: "Advanced diagnostics designed to help clinicians understand disease earlier and more precisely.",
    icon: ScanLine,
  },
  {
    title: "12 Modular Operation Theatres",
    text: "Equipped with cutting-edge technology for precision surgeries, built to international standards.",
    icon: Zap,
  },
  {
    title: "Specialised Intensive Care Units",
    text: "MICU, SICU, CTVS ICU, BICU and NICU — critical care built around every stage of a patient's journey.",
    icon: Activity,
  },
];

/* =========================================================
   ANIMATION HELPERS
========================================================= */

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function AboutPage() {
  const handleOpenAppointmentModal = () => {
    window.location.href = "/contact";
  };

  const handleFindDoctor = () => {
    window.location.href = "/doctors";
  };

  return (
    <main className="overflow-hidden bg-[#F7FBFD] text-[#06202B]">
      {/* =====================================================
          01 — CINEMATIC HERO
      ===================================================== */}

      <AboutHero
        onOpenAppointmentModal={handleOpenAppointmentModal}
        onFindDoctor={handleFindDoctor}
      />

      {/* =====================================================
      02 — CHAIRMAN SECTION (DR. PRATHAP C. REDDY + LOCAL LEADERSHIP)
  ===================================================== */}
      <ChairmanSection />

      {/* =====================================================
          02 — INTRODUCTION
      ===================================================== */}

      {/* <StoryIntro /> */}

      {/* =====================================================
          03 — NUMBERS
      ===================================================== */}

      <ImpactNumbers />

      {/* =====================================================
          04 — TIMELINE
      ===================================================== */}

      <ApolloTimeline />

      {/* =====================================================
          05 — PHILOSOPHY
      ===================================================== */}

      <Philosophy />

      {/* =====================================================
          06 — VALUES
      ===================================================== */}

      <Values />

      {/* =====================================================
          07 — INNOVATION
      ===================================================== */}

      <Innovation />

      {/* =====================================================
          08 — QUALITY
      ===================================================== */}

      <Quality />

      {/* =====================================================
          09 — FINAL CTA
      ===================================================== */}

      <AboutCTA onOpenAppointmentModal={handleOpenAppointmentModal} />
    </main>
  );
}

/* =========================================================
   HERO
========================================================= */

function AboutHero({ onOpenAppointmentModal, onFindDoctor }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Subtle parallax — reduced so content does not move too aggressively
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Floating particles — fixed positions + per-particle timing so they
  // don't all drift in sync
  const particles = [
    { top: "18%", left: "8%", size: 5, duration: 9, delay: 0 },
    { top: "62%", left: "5%", size: 3, duration: 11, delay: 1.2 },
    { top: "32%", left: "92%", size: 4, duration: 10, delay: 0.6 },
    { top: "78%", left: "88%", size: 6, duration: 8, delay: 2 },
    { top: "12%", left: "48%", size: 3, duration: 12, delay: 1.6 },
    { top: "85%", left: "42%", size: 4, duration: 9.5, delay: 0.4 },
    { top: "48%", left: "15%", size: 3, duration: 10.5, delay: 2.4 },
    { top: "55%", left: "80%", size: 5, duration: 11.5, delay: 0.9 },
  ];

  return (
    <section
      ref={ref}
      className="relative min-h-[calc(100vh-125px)] overflow-hidden bg-[#EDF6FB]"
    >
      {/* =========================================================
          BACKGROUND ATMOSPHERE
      ========================================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Soft blue glow — organic morphing blob instead of a static circle */}
        <motion.div
          animate={{
            borderRadius: [
              "42% 58% 65% 35% / 45% 40% 60% 55%",
              "58% 42% 35% 65% / 55% 60% 40% 45%",
              "42% 58% 65% 35% / 45% 40% 60% 55%",
            ],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 -top-40 h-[430px] w-[430px] bg-[#BFE3F2]/50 blur-[95px]"
        />

        {/* Soft gold glow — organic morphing blob */}
        <motion.div
          animate={{
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "35% 65% 65% 35% / 40% 60% 40% 60%",
              "60% 40% 30% 70% / 60% 30% 70% 40%",
            ],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute -right-40 top-[15%] h-[380px] w-[380px] bg-[#F3DFA8]/35 blur-[100px]"
        />

        {/* Bottom glow — organic morphing blob */}
        <motion.div
          animate={{
            borderRadius: [
              "50% 50% 40% 60% / 55% 45% 55% 45%",
              "40% 60% 60% 40% / 45% 55% 45% 55%",
              "50% 50% 40% 60% / 55% 45% 55% 45%",
            ],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-[-180px] left-[35%] h-[400px] w-[400px] bg-[#CDEAF7]/40 blur-[100px]"
        />

        {/* Slow-rotating soft conic light sweep behind everything */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
          className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-[0.35]"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0%, rgba(200,149,46,0.08) 15%, transparent 30%, transparent 60%, rgba(29,130,166,0.08) 75%, transparent 90%)",
          }}
        />

        {/* Rotating ring 1 */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute right-[-160px] top-[-160px] h-[430px] w-[430px] rounded-full border border-[#1D82A6]/10"
        />

        {/* Rotating ring 2 */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute right-[-105px] top-[-105px] h-[330px] w-[330px] rounded-full border border-dashed border-[#C8952E]/15"
        />

        {/* Medical dot grid */}
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage: "radial-gradient(#1D82A6 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 70% 70% at 50% 40%, black, transparent 80%)",
          }}
        />

        {/* Animated ECG / heartbeat trace, drawing itself across the hero */}
        <svg
          className="absolute inset-x-0 top-[10%] h-42 w-full opacity-[0.28] sm:top-[8%]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="none"
        >
          <motion.path
            d="M0 60 L260 60 L285 20 L310 100 L335 60 L360 60 L1200 60"
            stroke="#C8952E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatDelay: 1.2,
              ease: "easeInOut",
            }}
          />
        </svg>
        <svg
          className="absolute inset-x-0 bottom-[14%] h-24 w-full opacity-[0.2]"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <motion.path
            d="M0 50 L640 50 L662 22 L684 78 L706 50 L728 50 L1200 50"
            stroke="#1D82A6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              repeatDelay: 0.8,
              delay: 1.6,
              ease: "easeInOut",
            }}
          />
        </svg>

        {/* Heartbeat pulse rings — right, behind the hero image */}
        <div className="absolute right-[8%] top-1/2 hidden -translate-y-1/2 lg:block">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C8952E]/25"
              initial={{ width: 40, height: 40, opacity: 0.6 }}
              animate={{
                width: [40, 420],
                height: [40, 420],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeOut",
                delay: i * 1.5,
              }}
            />
          ))}
        </div>

        {/* Heartbeat pulse rings — left, mirrors the right side */}
        <div className="absolute left-[8%] top-1/2 hidden -translate-y-1/2 lg:block">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={`left-${i}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#1D82A6]/20"
              initial={{ width: 40, height: 40, opacity: 0.6 }}
              animate={{
                width: [40, 380],
                height: [40, 380],
                opacity: [0.45, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.7 + i * 1.6,
              }}
            />
          ))}
        </div>

        {/* Heartbeat pulse rings — centre, between content and image */}
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          {[0, 1].map((i) => (
            <motion.span
              key={`mid-${i}`}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C8952E]/15"
              initial={{ width: 24, height: 24, opacity: 0.5 }}
              animate={{
                width: [24, 220],
                height: [24, 220],
                opacity: [0.4, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.4 + i * 2,
              }}
            />
          ))}
        </div>

        {/* Floating particles */}
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-[#C8952E]/50"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              boxShadow: "0 0 6px 1px rgba(200,149,46,0.35)",
            }}
            animate={{
              y: [0, -22, 0],
              opacity: [0.25, 0.85, 0.25],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        ))}

        {/* Floating heart-pulse icons — drift slowly from bottom to top */}
        {[
          { left: "10%", size: 16, duration: 15, delay: 0 },
          { left: "26%", size: 20, duration: 19, delay: 4 },
          { left: "64%", size: 14, duration: 17, delay: 7 },
          { left: "84%", size: 16, duration: 21, delay: 2 },
          { left: "48%", size: 18, duration: 18, delay: 10 },
        ].map((f, i) => (
          <motion.div
            key={`heart-${i}`}
            className="absolute"
            style={{ left: f.left }}
            initial={{ top: "100%", opacity: 0 }}
            animate={{
              top: ["100%", "-10%"],
              opacity: [0, 0.45, 0.45, 0],
            }}
            transition={{
              duration: f.duration,
              repeat: Infinity,
              delay: f.delay,
              ease: "linear",
            }}
          >
            <HeartPulse
              style={{ width: f.size, height: f.size }}
              className="text-[#C8952E]"
            />
          </motion.div>
        ))}

        {/* Slow ambient gradient shimmer across the whole hero */}
        <motion.div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, rgba(191,227,242,0.15), rgba(243,223,168,0.1), rgba(205,234,247,0.15))",
            backgroundSize: "200% 200%",
          }}
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* =========================================================
          MAIN HERO
      ========================================================== */}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-125px)] max-w-7xl items-center px-5 pb-16 pt-[145px] sm:min-h-[calc(100vh-125px)] sm:px-8 sm:pt-[145px] lg:pb-20 lg:pt-[145px]">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* =====================================================
              LEFT CONTENT
          ====================================================== */}

          <motion.div
            style={{ y: contentY, opacity }}
            className="lg:col-span-6"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#1D82A6]/15 bg-white/70 px-3.5 py-1.5 backdrop-blur-md"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C8952E] opacity-60" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[#C8952E]" />
              </span>

              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#0E526B]">
                The World of Apollo Healthcare, now in Jabalpur
              </span>
            </motion.div>

            <motion.div variants={stagger} initial="hidden" animate="visible">
              {/* Editorial line */}
              <motion.p
                variants={fadeUp}
                className="mb-2 font-serif text-base italic text-[#C8952E] sm:text-lg"
              >
                Where medicine meets humanity.
              </motion.p>

              {/* Main heading */}
              <motion.h1
                variants={fadeUp}
                className="max-w-2xl text-[2.5rem] font-extrabold leading-[1] tracking-[-0.035em] text-[#06202B] sm:text-5xl lg:text-[4rem]"
              >
                Built around
                <br />
                <span className="relative inline-block text-[#0E526B]">
                  every life.
                  <motion.span
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                      delay: 0.9,
                      duration: 0.9,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute bottom-[-5px] left-0 h-[2px] rounded-full bg-gradient-to-r from-[#C8952E] to-transparent"
                  />
                </span>
              </motion.h1>

              {/* Description */}
              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-lg text-[13px] leading-6 text-slate-600 sm:text-sm"
              >
                Apollo JBP Hospitals is a state-of-the-art healthcare facility
                in Central India, a managed unit of Apollo Hospitals Enterprise
                Ltd, bringing quaternary care, advanced technology and
                personalised patient attention to Jabalpur and the Mahakoshal
                region.
              </motion.p>

              {/* Actions */}
              <motion.div
                variants={fadeUp}
                className="mt-7 flex flex-wrap items-center gap-3"
              >
                {/* Appointment */}
                <button
                  onClick={onOpenAppointmentModal}
                  className="group flex items-center gap-2.5 rounded-full bg-gradient-to-b from-[#F6D98A] to-[#C8952E] px-5 py-2.5 text-xs font-bold text-[#3A2B0A] shadow-[0_10px_25px_rgba(200,149,46,0.22)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(200,149,46,0.32)]"
                >
                  Book an Appointment
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                {/* Find Doctor */}
                <button
                  onClick={onFindDoctor}
                  className="group flex items-center gap-2 rounded-full border border-[#0E526B]/15 bg-white/70 px-5 py-2.5 text-xs font-bold text-[#0E526B] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md"
                >
                  Find a Doctor
                  <ArrowUpRight className="h-3.5 w-3.5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </motion.div>

              {/* Trust indicators */}
              <motion.div
                variants={fadeUp}
                className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2"
              >
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C8952E]" />
                  <span className="text-[9px] font-semibold text-slate-500">
                    Patient First
                  </span>
                </div>
                <span className="h-3 w-px bg-slate-300" />
                <span className="text-[9px] font-semibold text-slate-500">
                  Quaternary Care
                </span>
                <span className="h-3 w-px bg-slate-300" />
                <span className="text-[9px] font-semibold text-slate-500">
                  Region's only PET-CT
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* =====================================================
              RIGHT IMAGE
          ====================================================== */}

          <motion.div style={{ y: imageY }} className="relative lg:col-span-6">
            <div className="relative mx-auto max-w-[500px]">
              {/* Image aura */}
              <motion.div
                animate={{
                  scale: [1, 1.035, 1],
                  opacity: [0.3, 0.45, 0.3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-[#C8952E]/25 to-[#1D82A6]/15 blur-3xl"
              />

              {/* Image frame */}
              <div className="relative overflow-hidden rounded-[2rem] border-[5px] border-white bg-white shadow-[0_25px_60px_-18px_rgba(15,52,72,0.30)]">
                <motion.img
                  src="/images/image.png"
                  alt="Apollo JBP Hospitals"
                  className="h-[430px] w-full object-cover sm:h-[500px]"
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Image gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06202B]/35 via-transparent to-transparent" />

                {/* Decorative corners */}
                <div className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-[#F6D98A]" />
                <div className="absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-[#F6D98A]" />
              </div>

              {/* FLOATING PATIENT-FIRST CARD */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-5 -left-3 hidden rounded-xl border border-white/80 bg-white/90 px-3.5 py-3 shadow-[0_15px_35px_rgba(15,52,72,0.16)] backdrop-blur-xl sm:block"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EDF6FB]">
                    <HeartPulse className="h-4 w-4 text-[#0E526B]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-[#06202B]">
                      Patient First
                    </div>
                    <div className="mt-0.5 text-[9px] text-slate-500">
                      At the heart of every decision
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* EXPERIENCE CARD */}
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-3 top-12 hidden rounded-xl border border-[#C8952E]/20 bg-[#06202B] px-3.5 py-2.5 text-white shadow-[0_15px_30px_rgba(6,32,43,0.18)] sm:block"
              >
                <span className="text-[8px] uppercase tracking-[0.18em] text-white/45">
                  Facility
                </span>
                <div className="mt-0.5 text-lg font-extrabold tracking-tight">
                  12
                </div>
                <div className="text-[8px] text-[#F6D98A]">
                  Operation Theatres
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* =========================================================
          SCROLL INDICATOR
      ========================================================== */}

      <motion.div
        animate={{ y: [0, 6, 0], opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-1.5 md:flex"
      >
        <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#0E526B]/45">
          Explore
        </span>
        <ArrowDown className="h-3.5 w-3.5 text-[#0E526B]/45" />
      </motion.div>
    </section>
  );
}

/* =========================================================
   02 — CHAIRMAN SECTION (NEW COMPONENT)
========================================================= */
function ChairmanSection() {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  const stats = [
    {
      value: "1983",
      label: "Apollo Founded",
      desc: "A new chapter in Indian healthcare",
    },
    {
      value: "140+",
      label: "Countries",
      desc: "Healthcare reaching across borders",
    },
    {
      value: "70M+",
      label: "Lives Touched",
      desc: "Care delivered with compassion",
    },
  ];

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#F7FBFD] py-10 sm:py-24 lg:py-20"
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Soft blue atmosphere */}
        <motion.div
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -left-48 top-10 h-[420px] w-[420px] rounded-full bg-[#BFE3F2]/30 blur-3xl"
        />

        {/* Gold atmosphere */}
        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 25, 0],
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -right-40 bottom-0 h-[380px] w-[380px] rounded-full bg-[#F3DFA8]/25 blur-3xl"
        />

        {/* Dot matrix */}
        <div
          className="absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage: "radial-gradient(#0E526B 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "linear-gradient(to bottom, black 0%, transparent 85%)",
          }}
        />

        {/* Large orbital circle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 70,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -right-[220px] -top-[220px] h-[600px] w-[600px] rounded-full border border-[#0E526B]/[0.045]"
        >
          <div className="absolute inset-[60px] rounded-full border border-dashed border-[#C8952E]/[0.07]" />
          <div className="absolute right-[15%] top-[10%] h-2 w-2 rounded-full bg-[#C8952E]/40 shadow-[0_0_15px_#C8952E]" />
        </motion.div>

        {/* Bottom orbital */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 55,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-[250px] -left-[220px] h-[520px] w-[520px] rounded-full border border-[#0E526B]/[0.04]"
        />
      </div>

      {/* =====================================================
          MAIN CONTAINER
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        {/* ===================================================
            SECTION HEADER
        ==================================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-12 flex items-center justify-between border-b border-[#0E526B]/10 pb-5"
        >
          <div className="flex items-center gap-3">
            <motion.span
              initial={{ width: 0 }}
              animate={isInView ? { width: 36 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="block h-px bg-[#C8952E]"
            />

            <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#0E526B]">
              Leadership & Vision
            </span>
          </div>

          <span className="hidden font-mono text-[9px] tracking-[0.15em] text-[#C8952E] sm:block">
            01 / FOUNDER CHAIRMAN
          </span>
        </motion.div>

        {/* ===================================================
            MAIN GRID
        ==================================================== */}

        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* =================================================
              PORTRAIT SIDE
          ================================================== */}

          <div className="lg:col-span-5">
            <motion.div
              initial={{
                opacity: 0,
                x: -50,
              }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      x: 0,
                    }
                  : {}
              }
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative mx-auto max-w-[400px]"
            >
              {/* =================================================
                  ORBITAL DECORATION
              ================================================== */}

              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 28,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="pointer-events-none absolute -inset-8 hidden rounded-[3rem] border border-dashed border-[#C8952E]/10 sm:block"
              >
                <span className="absolute left-[12%] top-[5%] h-2 w-2 rounded-full bg-[#C8952E]/70 shadow-[0_0_12px_rgba(200,149,46,0.6)]" />
              </motion.div>

              {/* Ambient glow */}
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.25, 0.4, 0.25],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-7 rounded-[3rem] bg-gradient-to-br from-[#1D82A6]/20 via-[#C8952E]/10 to-[#A9DCEF]/20 blur-3xl"
              />

              {/* =================================================
                  IMAGE FRAME
              ================================================== */}

              <motion.div
                whileHover={{
                  y: -6,
                }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-[2.2rem] border-[5px] border-white bg-[#06202B] shadow-[0_35px_80px_-25px_rgba(6,32,43,0.35)]">
                  {/* Image */}
                  <motion.img
                    initial={{
                      scale: 1.1,
                    }}
                    animate={
                      isInView
                        ? {
                            scale: 1,
                          }
                        : {}
                    }
                    whileHover={{
                      scale: 1.035,
                    }}
                    transition={{
                      duration: 1.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    src="/images/Dr-Reddy.jpeg"
                    alt="Dr. Prathap Chandra Reddy"
                    className="h-[470px] w-full object-cover object-[50%_18%] sm:h-[510px]"
                  />

                  {/* Warm cinematic tint */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#06202B]/10 via-transparent to-[#F3DFA8]/10" />

                  {/* Bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#06202B] via-[#06202B]/55 to-transparent" />

                  {/* =================================================
                      ANIMATED SCAN LIGHT
                  ================================================== */}

                  <motion.div
                    initial={{ x: "-120%" }}
                    animate={
                      isInView
                        ? {
                            x: "140%",
                          }
                        : {}
                    }
                    transition={{
                      duration: 2,
                      delay: 0.8,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-y-0 w-[35%] skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />

                  {/* =================================================
                      CORNER BRACKETS
                  ================================================== */}

                  <div className="absolute left-5 top-5 h-8 w-8 border-l border-t border-[#F6D98A]/80" />

                  <div className="absolute bottom-5 right-5 h-8 w-8 border-b border-r border-[#F6D98A]/80" />

                  {/* =================================================
                      IMAGE LABEL
                  ================================================== */}

                  <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-[#06202B]/45 px-3 py-1.5 backdrop-blur-md">
                    <span className="text-[8px] font-bold uppercase tracking-[0.18em] text-white/80">
                      Founder • 1983
                    </span>
                  </div>

                  {/* =================================================
                      CAPTION
                  ================================================== */}

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#F6D98A] shadow-[0_0_8px_#F6D98A]" />

                      <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#F6D98A]">
                        Architect of Modern Healthcare
                      </span>
                    </div>

                    <div className="text-xl font-extrabold tracking-tight text-white">
                      Dr. Prathap C. Reddy
                    </div>

                    <div className="mt-1 text-[10px] text-white/55">
                      Founder Chairman, Apollo Hospitals Group
                    </div>
                  </div>
                </div>

                {/* =================================================
                    FLOATING ID CARD
                ================================================== */}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 20,
                    x: 15,
                  }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          y: 0,
                          x: 0,
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.8,
                    delay: 0.6,
                  }}
                  className="absolute -bottom-5 -right-3 hidden rounded-2xl border border-white/80 bg-white/90 p-3 shadow-[0_20px_40px_rgba(6,32,43,0.15)] backdrop-blur-xl sm:block"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#F6D98A] to-[#C8952E] text-[#3A2B0A]">
                      <Award className="h-4 w-4" />
                    </div>

                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-wider text-[#06202B]">
                        Padma Vibhushan
                      </div>

                      <div className="mt-0.5 text-[8px] text-slate-500">
                        National Recognition
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* =================================================
              CONTENT SIDE
          ================================================== */}

          <div className="lg:col-span-7">
            <motion.div
              initial={{
                opacity: 0,
                y: 35,
              }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                    }
                  : {}
              }
              transition={{
                duration: 0.9,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        x: 0,
                      }
                    : {}
                }
                transition={{
                  delay: 0.35,
                  duration: 0.6,
                }}
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C8952E]/20 bg-[#FBF7EE] px-3 py-1.5"
              >
                <Sparkles className="h-3 w-3 text-[#C8952E]" />

                <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#8B6417]">
                  Founder Chairman's Message
                </span>
              </motion.div>

              {/* =================================================
                  HEADING
              ================================================== */}

              <h2 className="max-w-2xl text-[2.4rem] font-extrabold leading-[0.98] tracking-[-0.045em] text-[#06202B] sm:text-4xl lg:text-[3rem]">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {}
                  }
                  transition={{
                    delay: 0.3,
                    duration: 0.7,
                  }}
                  className="block"
                >
                  Dr. Prathap
                </motion.span>

                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView
                      ? {
                          opacity: 1,
                          y: 0,
                        }
                      : {}
                  }
                  transition={{
                    delay: 0.4,
                    duration: 0.7,
                  }}
                  className="relative inline-block text-[#0E526B]"
                >
                  Chandra Reddy
                  {/* Animated underline */}
                  <motion.span
                    initial={{ width: 0 }}
                    animate={
                      isInView
                        ? {
                            width: "55%",
                          }
                        : {}
                    }
                    transition={{
                      delay: 0.9,
                      duration: 0.8,
                    }}
                    className="absolute -bottom-2 left-0 h-[3px] rounded-full bg-[#C8952E]"
                  />
                </motion.span>
              </h2>

              <p className="mt-4 text-xs font-semibold tracking-[0.04em] text-[#0E526B] sm:text-sm">
                Pioneer of Private Healthcare & Medical Tourism in India
              </p>

              {/* =================================================
                  QUOTE
              ================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                      }
                    : {}
                }
                transition={{
                  delay: 0.55,
                  duration: 0.8,
                }}
                className="group relative my-7 overflow-hidden rounded-2xl border border-[#0E526B]/10 bg-white/75 p-5 shadow-[0_15px_40px_rgba(15,52,72,0.06)] backdrop-blur-xl sm:p-6"
              >
                {/* Animated gold edge */}
                <motion.div
                  animate={{
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-[#C8952E] via-[#F6D98A] to-transparent"
                />

                {/* Quote mark */}
                <Quote className="absolute right-5 top-5 h-9 w-9 text-[#C8952E]/10 transition-transform duration-500 group-hover:scale-110" />

                <p className="relative max-w-2xl font-serif text-[15px] italic leading-7 text-[#06202B] sm:text-[17px]">
                  "Our mission is to bring healthcare of International standards
                  within the reach of every individual. We are committed to the
                  achievement and maintenance of excellence in education,
                  research and healthcare for the benefit of humanity."
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <span className="h-px w-7 bg-[#C8952E]" />

                  <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#C8952E]">
                    Dr. Prathap C. Reddy
                  </span>
                </div>
              </motion.div>

              {/* =================================================
                  STORY
              ================================================== */}

              <motion.p
                initial={{ opacity: 0 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                      }
                    : {}
                }
                transition={{
                  delay: 0.7,
                  duration: 0.8,
                }}
                className="max-w-2xl text-[13px] leading-6 text-slate-600 sm:text-[14px]"
              >
                In 1983, Dr. Prathap Chandra Reddy revolutionized the Indian
                healthcare landscape by establishing Apollo Hospitals — India's
                first corporate hospital chain. That same vision now powers
                Apollo JBP Hospitals in Jabalpur, a managed unit of Apollo
                Hospitals Enterprise Ltd, bringing quaternary and
                super-specialised care to Central India.
              </motion.p>

              {/* =================================================
                  STATS
              ================================================== */}

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={
                      isInView
                        ? {
                            opacity: 1,
                            y: 0,
                          }
                        : {}
                    }
                    transition={{
                      delay: 0.8 + index * 0.12,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{
                      y: -5,
                    }}
                    className="group relative overflow-hidden rounded-xl border border-[#0E526B]/10 bg-white/70 p-4 backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_15px_30px_rgba(14,82,107,0.08)]"
                  >
                    {/* Hover glow */}
                    <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#BFE3F2]/30 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div
                      className={`relative text-xl font-extrabold tracking-tight ${
                        index === 1 ? "text-[#C8952E]" : "text-[#0E526B]"
                      }`}
                    >
                      {stat.value}
                    </div>

                    <div className="relative mt-1 text-[10px] font-bold text-[#06202B]">
                      {stat.label}
                    </div>

                    <div className="relative mt-1 text-[9px] leading-4 text-slate-500">
                      {stat.desc}
                    </div>

                    {/* Bottom animated line */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={
                        isInView
                          ? {
                              width: "100%",
                            }
                          : {}
                      }
                      transition={{
                        delay: 1 + index * 0.12,
                        duration: 0.8,
                      }}
                      className={`absolute bottom-0 left-0 h-[2px] ${
                        index === 1 ? "bg-[#C8952E]" : "bg-[#0E526B]"
                      }`}
                    />
                  </motion.div>
                ))}
              </div>

              {/* =================================================
                  CTA
              ================================================== */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        y: 0,
                      }
                    : {}
                }
                transition={{
                  delay: 1.15,
                  duration: 0.7,
                }}
                className="mt-8 flex flex-wrap items-center gap-5"
              >
                <a
                  href="#philosophy"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#0E526B] px-5 py-2.5 text-[10px] font-bold text-white shadow-[0_10px_25px_rgba(14,82,107,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#06202B]"
                >
                  {/* Button shimmer */}
                  <span className="absolute inset-y-0 -left-[80%] w-[45%] skew-x-[-20deg] bg-white/20 transition-all duration-700 group-hover:left-[130%]" />

                  <span className="relative">Read Chairman's Vision</span>

                  <ArrowRight className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <div className="flex items-center gap-2 text-[10px] font-medium text-slate-500">
                  <span className="relative flex h-4 w-4 items-center justify-center">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-[#C8952E]/20" />

                    <CheckCircle2 className="relative h-4 w-4 text-[#C8952E]" />
                  </span>

                  <span>Serving with compassion since 1983</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   STORY INTRO
========================================================= */

// function StoryIntro() {
//   const ref = useRef(null);

//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start 80%", "end 20%"],
//   });

//   const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

//   const facts = [
//     { value: "10", unit: "acres", label: "Landscaped campus", icon: Trees },
//     { value: "2.3", unit: "acres", label: "Built-up hospital area", icon: Building2 },
//     { value: "JV", unit: "", label: "Global Institute × Apollo Enterprise", icon: Handshake },
//   ];

//   return (
//     <section className="relative bg-white px-5 py-14 sm:px-8 lg:py-20">
//       <div className="mx-auto max-w-7xl">

//         {/* ===== Capsule panel ===== */}
//         <div
//           ref={ref}
//           className="relative overflow-hidden rounded-[2.5rem] border border-[#1D82A6]/10 bg-gradient-to-br from-[#EDF6FB] via-[#EDF6FB]/50 to-white px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14"
//         >

//           {/* Ambient glows */}
//           <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-[#1D82A6]/[0.08] blur-3xl" />
//           <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-[#C8952E]/[0.07] blur-3xl" />

//           {/* Fine dot-grid texture */}
//           <div
//             className="pointer-events-none absolute inset-0 opacity-[0.35]"
//             style={{
//               backgroundImage:
//                 "radial-gradient(circle, rgba(14,82,107,0.12) 1px, transparent 1px)",
//               backgroundSize: "22px 22px",
//             }}
//           />

//           {/* Large watermark landmark icon */}
//           <Landmark
//             className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 text-[#0E526B]/[0.05] sm:h-72 sm:w-72"
//             strokeWidth={0.75}
//           />

//           {/* Corner brackets */}
//           <span className="pointer-events-none absolute left-6 top-6 h-6 w-6 border-l border-t border-[#C8952E]/40 sm:left-8 sm:top-8" />
//           <span className="pointer-events-none absolute bottom-6 right-6 h-6 w-6 border-b border-r border-[#C8952E]/40 sm:bottom-8 sm:right-8" />

//           <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">

//             {/* label */}
//             <div className="lg:col-span-3">
//               <div className="flex items-center gap-3 text-[#C8952E]">
//                 <span className="relative flex h-2 w-2">
//                   <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C8952E]/60" />
//                   <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C8952E]" />
//                 </span>
//                 <span className="text-[10px] font-bold uppercase tracking-[0.25em]">
//                   Our Story
//                 </span>
//               </div>

//               <p className="mt-4 max-w-[220px] text-sm leading-6 text-slate-500">
//                 Established under an agreement between Global Institute of
//                 Medical Science & Health Care and Apollo Hospitals
//                 Enterprise Limited.
//               </p>
//             </div>

//             {/* content */}
//             <div className="lg:col-span-9">

//               <motion.h2
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, amount: 0.3 }}
//                 transition={{ duration: 0.8 }}
//                 className="max-w-5xl text-3xl font-extrabold leading-[1.08] tracking-[-0.035em] text-[#06202B] sm:text-4xl lg:text-[2.75rem]"
//               >
//                 We believe healthcare in Central India should feel{" "}
//                 <span className="font-serif italic font-medium text-[#C8952E]">
//                   more human,
//                 </span>{" "}
//                 not less.
//               </motion.h2>

//               <motion.p
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, amount: 0.3 }}
//                 transition={{ duration: 0.8, delay: 0.1 }}
//                 className="mt-5 max-w-2xl text-sm leading-7 text-slate-600"
//               >
//                 Equipped with the latest medical technologies and a wide
//                 range of super-specialised treatments, the hospital brings
//                 together specialists, advanced infrastructure and modern
//                 clinical systems — centred on critical care, elective
//                 healthcare and genuinely personalised patient attention.
//               </motion.p>

//               {/* ===== Credential strip ===== */}
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true, amount: 0.3 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 className="mt-8 grid grid-cols-1 divide-y divide-[#1D82A6]/10 rounded-[1.5rem] border border-[#1D82A6]/10 bg-white/70 backdrop-blur-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0"
//               >
//                 {facts.map((fact) => {
//                   const FactIcon = fact.icon;
//                   return (
//                     <div key={fact.label} className="flex items-center gap-4 px-6 py-4 sm:block sm:px-6 sm:py-5">
//                       <FactIcon className="h-5 w-5 shrink-0 text-[#C8952E]" strokeWidth={1.75} />

//                       <div className="sm:mt-3">
//                         <div className="flex items-baseline gap-1.5">
//                           <span className="font-serif text-2xl italic text-[#0E526B] sm:text-3xl">
//                             {fact.value}
//                           </span>
//                           {fact.unit && (
//                             <span className="text-[10px] font-semibold uppercase tracking-wide text-[#C8952E]">
//                               {fact.unit}
//                             </span>
//                           )}
//                         </div>
//                         <p className="mt-0.5 text-[12px] leading-4 text-slate-500 sm:mt-1.5 sm:text-[13px] sm:leading-5">
//                           {fact.label}
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </motion.div>

//               {/* animated line */}
//               <div className="relative mt-8 h-px overflow-hidden bg-[#1D82A6]/15">
//                 <motion.div
//                   style={{ scaleX: lineScale }}
//                   className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-[#C8952E] via-[#1D82A6] to-transparent"
//                 />
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

/* =========================================================
   IMPACT NUMBERS
========================================================= */

function ImpactNumbers() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] px-5 py-10 sm:px-8 lg:py-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#53B3D4_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />

        <div className="absolute left-[-150px] top-[-150px] h-[500px] w-[500px] rounded-full bg-[#F59E0B]/20 blur-[120px]" />

        <div className="absolute bottom-[-200px] right-[-100px] h-[500px] w-[500px] rounded-full bg-[#2A8FAF]/40 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3 text-[#F6D98A]">
              <span className="h-px w-8 bg-[#F6D98A]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em]">
                Apollo JBP at a glance
              </span>
            </div>

            <h2 className="max-w-2xl text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              A facility built for
              <span className="font-serif italic font-medium text-[#F6D98A]">
                {" "}
                quaternary care.
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-sm leading-6 text-white/55">
            A state-of-the-art healthcare facility in Central India, shaped by
            advanced technology and an enduring commitment to patients.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-8">
          {stats.map((stat, index) => (
            <StatItem key={stat.label} stat={stat} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.5,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={
        inView
          ? {
              opacity: 1,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: 0.8,
        delay: index * 0.12,
      }}
      className="group"
    >
      <div className="mb-5 h-px w-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: "45%" } : {}}
          transition={{
            duration: 1,
            delay: 0.4 + index * 0.1,
          }}
          className="h-px bg-[#C8952E]"
        />
      </div>

      <div className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
        {stat.value}
      </div>

      <div className="mt-3 max-w-[180px] text-xs leading-5 text-white/50">
        {stat.label}
      </div>
    </motion.div>
  );
}

/* =========================================================
   TIMELINE
========================================================= */

function ApolloTimeline() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 75%", "end 30%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#F7FBFD] px-5 py-10 sm:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#1D82A6]/15 bg-white px-4 py-2 shadow-sm">
            <Hospital className="h-3.5 w-3.5 text-[#C8952E]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0E526B]">
              Our journey
            </span>
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight text-[#06202B] sm:text-5xl lg:text-6xl">
            Decades of
            <span className="font-serif italic font-medium text-[#C8952E]">
              {" "}
              progress.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-500">
            A journey shaped by changing technology, evolving medicine and one
            constant — putting patients first.
          </p>
        </div>

        <div className="relative">
          {/* central line */}
          <div className="absolute left-4 top-0 h-full w-px bg-slate-200 md:left-1/2 md:-translate-x-1/2" />

          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-4 top-0 w-[2px] origin-top bg-gradient-to-b from-[#C8952E] via-[#1D82A6] to-[#C8952E] md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-20 md:space-y-28">
            {milestones.map((item, index) => (
              <TimelineItem key={item.year} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index }) {
  const isRight = index % 2 !== 0;

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: isRight ? 60 : -60,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative grid grid-cols-1 pl-12 md:grid-cols-2 md:gap-20 md:pl-0"
    >
      <div
        className={`${
          isRight
            ? "md:col-start-2 md:text-left"
            : "md:col-start-1 md:text-right"
        }`}
      >
        <div className="text-5xl font-extrabold tracking-tight text-[#C8952E]/25 sm:text-6xl">
          {item.year}
        </div>

        <h3 className="mt-3 text-2xl font-extrabold text-[#06202B]">
          {item.title}
        </h3>

        <p className="mt-4 max-w-md text-sm leading-7 text-slate-500 md:ml-auto">
          {item.text}
        </p>
      </div>

      {/* node */}
      <motion.div
        whileInView={{
          scale: [0.6, 1.2, 1],
        }}
        viewport={{
          once: true,
        }}
        transition={{
          duration: 0.7,
        }}
        className="absolute left-[9px] top-2 flex h-4 w-4 items-center justify-center rounded-full border-4 border-[#F7FBFD] bg-[#C8952E] shadow-[0_0_0_5px_rgba(200,149,46,0.12)] md:left-1/2 md:-translate-x-1/2"
      />
    </motion.div>
  );
}

/* =========================================================
   PHILOSOPHY
========================================================= */

function Philosophy() {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-10 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          {/* ================= LEFT ================= */}
          <div className="lg:col-span-7">
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[#C8952E]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0E526B]">
                Our philosophy
              </span>
            </div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9 }}
              className="text-[3rem] font-extrabold leading-[1] tracking-[-0.045em] text-[#06202B] sm:text-5xl lg:text-[3.5rem]"
            >
              Every life
              <br />
              deserves
              <br />
              <span className="font-serif italic font-medium text-[#C8952E]">
                extraordinary care.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="mt-8 max-w-md text-sm leading-7 text-slate-500"
            >
              This belief shapes every decision we make — from the specialists
              we bring on board to the equipment we invest in, and the way our
              teams speak with every patient who walks through our doors.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="mt-9 flex items-center gap-6 border-t border-slate-100 pt-7"
            >
              <div>
                <p className="font-serif text-2xl italic text-[#0E526B]">01</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Compassion first
                </p>
              </div>
              <span className="h-8 w-px bg-slate-200" />
              <div>
                <p className="font-serif text-2xl italic text-[#0E526B]">02</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Clinical rigour
                </p>
              </div>
              <span className="h-8 w-px bg-slate-200" />
              <div>
                <p className="font-serif text-2xl italic text-[#0E526B]">03</p>
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Lasting trust
                </p>
              </div>
            </motion.div>
          </div>

          {/* ================= RIGHT — Plaque card ================= */}
          <div className="relative lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative overflow-hidden rounded-[2rem] bg-[#1D82A6] p-2"
            >
              {/* Ambient glows */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#06202B]/25 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#F6D98A]/20 blur-3xl" />

              {/* Subtle dot-grid texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              />

              {/* Inner gold hairline frame */}
              <div className="relative rounded-[1.65rem] border border-[#F6D98A]/30 p-8 sm:p-10">
                {/* Corner ornaments */}
                <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-[#F6D98A]/70" />
                <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-[#F6D98A]/70" />
                <span className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-[#F6D98A]/70" />
                <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-[#F6D98A]/70" />

                {/* Oversized quote mark */}
                <span className="pointer-events-none absolute -top-2 left-7 font-serif text-[110px] italic leading-none text-[#F6D98A]/25">
                  &ldquo;
                </span>

                <p className="relative z-10 mt-9 font-serif text-xl italic leading-9 text-white/95 sm:text-[22px]">
                  Delivering international standard healthcare to every
                  individual, fostering excellence in education, research, and
                  patient care.
                </p>

                {/* Seal / signature row */}
                <div className="relative z-10 mt-10 flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#F6D98A]/50 bg-white/10 backdrop-blur-sm">
                    <HeartPulse className="h-5 w-5 text-[#F6D98A]" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F6D98A]">
                      Apollo JBP Hospitals
                    </p>
                    <p className="mt-0.5 text-[11px] font-medium text-white/60">
                      Our Mission
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   VALUES
========================================================= */

function Values() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null); // 👈 NEW

  const openValue = (valueNumber) => {
    const index = values.findIndex((item) => item.number === valueNumber);
    if (index === -1) return;
    setActiveIndex(index);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + values.length) % values.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % values.length);
  };

  return (
    <section className="relative overflow-hidden bg-[#EDF6FB] px-5 py-10 sm:px-8 lg:py-20">
      {/* Background */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-[#1D82A6]/[0.06] blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#C8952E]/[0.05] blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-4">
          {/* ================= LEFT (unchanged) ================= */}
          {/* ...same as before... */}
          <div className="lg:col-span-4 lg:pr-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#C8952E]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0E526B]">
                What drives us
              </span>
            </div>

            <h2 className="max-w-md text-4xl font-extrabold leading-[1.08] tracking-tight text-[#06202B] sm:text-5xl">
              Care built on
              <span className="block font-serif font-medium italic text-[#C8952E]">
                strong foundations.
              </span>
            </h2>

            <p className="mt-6 max-w-sm text-sm leading-6 text-slate-500">
              Four things that shape every patient's experience at Apollo JBP
              Hospitals, from diagnosis to discharge.
            </p>

            {/* VALUE LIST */}
            <div className="mt-9 hidden space-y-1 sm:block">
              {values.map((value, idx) => {
                const Icon = value.icon;
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={value.number}
                    type="button"
                    onClick={() => openValue(value.number)}
                    className="group relative flex w-full items-center gap-4 rounded-2xl py-2.5 pl-3 pr-2 text-left transition-colors duration-300"
                  >
                    {/* Active rail */}
                    <span
                      className={`absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-[#C8952E] opacity-100"
                          : "bg-[#1D82A6]/20 opacity-0 group-hover:opacity-100"
                      }`}
                    />

                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isActive
                          ? "border-[#C8952E]/50 bg-[#0E526B] shadow-md"
                          : "border-[#1D82A6]/10 bg-white group-hover:border-[#C8952E]/30"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 transition-colors ${
                          isActive
                            ? "text-[#F6D98A]"
                            : "text-[#0E526B] group-hover:text-[#C8952E]"
                        }`}
                      />
                    </div>

                    <div>
                      <p
                        className={`text-sm font-bold transition-colors ${isActive ? "text-[#C8952E]" : "text-[#0B3446]"}`}
                      >
                        {value.title}
                      </p>
                      <p className="mt-0.5 text-[10px] uppercase tracking-[0.15em] text-slate-400">
                        {value.subtitle}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= CARDS ================= */}
          <div className="min-w-0 lg:col-span-8">
            <div className="relative overflow-hidden py-10 perspective-1000">
              <div className="relative min-h-[460px] sm:min-h-[480px] flex items-center justify-center w-full [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]">
                {values.map((value, index) => {
                  const Icon = value.icon;

                  let offset = index - activeIndex;
                  const total = values.length;
                  if (offset > total / 2) offset -= total;
                  if (offset < -total / 2) offset += total;

                  const absOffset = Math.abs(offset);
                  const isCenter = offset === 0;

                  const translateX = offset * 280;
                  const translateZ = -absOffset * 160;
                  const rotateY = offset * -22;
                  const scale = Math.max(1 - absOffset * 0.15, 0.75);
                  const opacity = Math.max(1 - absOffset * 0.35, 0);

                  return (
                    <article
                      key={value.number}
                      onClick={() => {
                        if (!isCenter) {
                          setActiveIndex(index);
                        } else {
                          setSelectedValue(value); // 👈 center click = open modal
                        }
                      }}
                      style={{
                        transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                        zIndex: 30 - absOffset * 10,
                        opacity,
                        pointerEvents: absOffset > 2 ? "none" : "auto",
                      }}
                      className={`group absolute top-0 h-[460px] w-[290px] sm:w-[320px] cursor-pointer select-none overflow-hidden rounded-[28px] transition-all duration-700 ease-out ${
                        isCenter
                          ? "ring-2 ring-[#C8952E] ring-offset-4 ring-offset-[#EDF6FB] shadow-[0_28px_60px_-14px_rgba(6,32,43,.45)]"
                          : "shadow-[0_18px_40px_-18px_rgba(6,32,43,.35)]"
                      }`}
                    >
                      <img
                        src={value.image}
                        alt={value.title}
                        draggable={false}
                        className="absolute inset-0 h-full w-full select-none object-cover transition-all duration-700"
                        style={{
                          filter: isCenter
                            ? "grayscale(0) brightness(1)"
                            : "grayscale(0.85) brightness(0.6)",
                          transform: isCenter ? "scale(1)" : "scale(1.06)",
                        }}
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />

                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06202B] via-[#06202B]/55 to-[#06202B]/5" />

                      <div
                        className={`pointer-events-none absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-500 ${
                          isCenter
                            ? "border-[#C8952E]/60 bg-[#C8952E]/90 text-[#0B3446]"
                            : "border-white/25 bg-white/10 text-white/80"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>

                      <span className="pointer-events-none absolute right-5 top-6 font-serif text-xs italic tracking-wide text-white/50">
                        {String(index + 1).padStart(2, "0")} /{" "}
                        {String(total).padStart(2, "0")}
                      </span>

                      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
                        {value.subtitle && (
                          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F6D98A]">
                            {value.subtitle}
                          </p>
                        )}

                        <h3 className="mt-2 font-serif text-[26px] italic leading-tight text-white">
                          {value.title}
                        </h3>

                        <p
                          className={`mt-3 text-sm leading-5 text-white/75 transition-all duration-500 ${isCenter ? "line-clamp-2 opacity-100" : "line-clamp-1 opacity-0"}`}
                        >
                          {value.text}
                        </p>

                        {/* CTA — ab clickable hai */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation(); // card ke onClick se conflict na ho
                            setSelectedValue(value);
                          }}
                          className={`mt-4 flex items-center gap-2 border-t border-white/15 pt-3 text-xs font-semibold text-white transition-opacity duration-500 ${
                            isCenter
                              ? "pointer-events-auto opacity-100"
                              : "pointer-events-none opacity-0"
                          }`}
                        >
                          Read the value
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C8952E] text-[#0B3446] transition-transform group-hover:translate-x-0.5">
                            <ArrowRight className="h-3 w-3" />
                          </span>
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Nav + Dots — unchanged */}
              {values.length > 1 && (
                <div className="mt-6 flex items-center justify-center gap-4">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous value"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1D82A6]/30 bg-white text-[#0B3446] shadow-sm transition-all hover:border-[#0E526B] hover:bg-[#0E526B] hover:text-white"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <div className="flex items-center justify-center gap-2">
                    {values.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        aria-label={`Go to value ${idx + 1}`}
                        className={`h-[7px] rounded-full transition-all duration-300 ${idx === activeIndex ? "w-[22px] bg-[#0E526B]" : "w-[7px] bg-[#1D82A6]/25 hover:bg-[#1D82A6]/50"}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={handleNext}
                    aria-label="Next value"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1D82A6]/30 bg-white text-[#0B3446] shadow-sm transition-all hover:border-[#0E526B] hover:bg-[#0E526B] hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= Value Detail Modal ================= */}
      {selectedValue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#06202B]/80 backdrop-blur-md animate-fade-in">
          <div className="relative grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-[2rem] bg-white shadow-[0_40px_100px_-20px_rgba(6,32,43,.55)] md:h-[560px] md:grid-cols-5">
            {/* Close */}
            <button
              onClick={() => setSelectedValue(null)}
              className="absolute right-5 top-5 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#0B3446] shadow-md backdrop-blur-sm transition-all hover:bg-[#0B3446] hover:text-white"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {/* ================= LEFT — Photographic panel ================= */}
            <div className="relative hidden h-full overflow-hidden md:col-span-2 md:block">
              <img
                src={selectedValue.image}
                alt={selectedValue.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06202B] via-[#06202B]/60 to-[#06202B]/10" />
              <div className="absolute inset-0 bg-[#0E526B]/20 mix-blend-multiply" />

              {/* Icon chip */}
              <div className="absolute left-7 top-7 flex h-12 w-12 items-center justify-center rounded-full border border-[#C8952E]/50 bg-[#C8952E]/90 text-[#0B3446] shadow-lg">
                {(() => {
                  const ModalIcon = selectedValue.icon;
                  return <ModalIcon className="h-5 w-5" />;
                })()}
              </div>

              {/* Bottom title overlay */}
              <div className="absolute inset-x-0 bottom-0 p-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#F6D98A]">
                  Patient Care Philosophy
                </p>
                <h3 className="mt-3 font-serif text-3xl italic leading-tight text-white">
                  {selectedValue.title}
                </h3>
              </div>
            </div>

            {/* ================= RIGHT — Content panel ================= */}
            <div className="relative flex flex-col md:col-span-3">
              {/* Mobile-only compact header (image panel hidden below md) */}
              <div className="border-b border-slate-100 px-6 pb-5 pt-7 md:hidden">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C8952E]">
                  Patient Care Philosophy
                </p>
                <h3 className="mt-2 font-serif text-2xl italic leading-tight text-[#0B3446]">
                  {selectedValue.title}
                </h3>
              </div>

              {/* Subtitle strip */}
              {selectedValue.subtitle && (
                <div className="hidden items-center gap-3 px-9 pt-8 md:flex">
                  <span className="h-px w-8 bg-[#C8952E]" />
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#0E526B]">
                    {selectedValue.subtitle}
                  </p>
                </div>
              )}

              {/* Scrollable content — scrollbar hidden */}
              <div className="scrollbar-hide flex-1 overflow-y-auto px-6 py-6 md:px-9 md:py-7">
                <span className="font-serif text-5xl italic leading-none text-[#C8952E]/30">
                  &ldquo;
                </span>
                <div className="-mt-3 whitespace-pre-line text-[15px] leading-[1.85] text-slate-600">
                  {selectedValue.fullContent}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between border-t border-slate-100 px-6 py-5 md:px-9">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0E526B]">
                  <ShieldCheck className="h-4 w-4 text-[#C8952E]" />
                  Apollo JBP Hospitals
                </div>
                <button
                  onClick={() => setSelectedValue(null)}
                  className="rounded-full px-6 py-2 text-xs font-extrabold text-[#3A2B0A] shadow-md transition-all hover:shadow-lg"
                  style={{
                    background:
                      "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
                  }}
                >
                  Done Reading
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* =========================================================
   INNOVATION
========================================================= */

function Innovation() {
  return (
    <section className="relative overflow-hidden bg-[#075873] px-5 py-12 sm:px-8 lg:py-14">
      {/* ───────────────── Background ───────────────── */}

      <div className="pointer-events-none absolute inset-0">
        {/* soft glow */}
        <div className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#38B5D4]/15 blur-[120px]" />

        <div className="absolute -bottom-40 -right-32 h-[420px] w-[420px] rounded-full bg-[#C8952E]/10 blur-[130px]" />

        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />

        {/* radial fade */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.06),transparent_40%)]" />
      </div>

      {/* ───────────────── Content ───────────────── */}

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          {/* ───────────── LEFT ───────────── */}

          <div className="lg:col-span-5">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-7 bg-[#E5C46B]" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#E5C46B]">
                Medicine × Technology
              </span>
            </div>

            <h2 className="max-w-xl text-[2.35rem] font-semibold leading-[1.02] tracking-[-0.035em] text-white sm:text-5xl lg:text-[3.35rem]">
              Advanced care,
              <br />
              <span className="font-serif italic font-normal text-[#E5C46B]">
                built for what comes next.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-[13px] leading-6 text-white/55">
              Bringing advanced technology, precision diagnostics and
              specialised care together to create better patient journeys.
            </p>

            {/* small signature */}

            <div className="mt-7 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05]">
                <Microscope className="h-4 w-4 text-[#E5C46B]" />
              </div>

              <div>
                <p className="text-[11px] font-semibold text-white">
                  Innovation with purpose
                </p>

                <p className="mt-0.5 text-[10px] text-white/35">
                  Technology designed around better outcomes
                </p>
              </div>
            </div>
          </div>

          {/* ───────────── RIGHT ───────────── */}

          <div className="lg:col-span-7">
            <div className="space-y-2.5">
              {innovations.map((item, index) => {
                const Icon = item.icon;

                const Card = (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 25,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.08,
                    }}
                    whileHover={{
                      y: -2,
                    }}
                    className="group relative overflow-hidden rounded-xl border border-white/[0.09] bg-white/[0.045] px-4 py-3.5 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.075]"
                  >
                    {/* hover glow */}

                    <div className="absolute inset-0 bg-gradient-to-r from-[#E5C46B]/[0.06] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    {/* gold line */}

                    <div className="absolute left-0 top-0 h-full w-[2px] origin-bottom scale-y-0 bg-[#E5C46B] transition-transform duration-500 group-hover:scale-y-100" />

                    <div className="relative flex items-center gap-4">
                      {/* number */}

                      <span className="hidden w-6 shrink-0 text-[10px] font-medium tracking-wider text-white/25 sm:block">
                        {item.number}
                      </span>

                      {/* icon */}

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-[#78D1E6] transition-all duration-300 group-hover:border-[#E5C46B]/30 group-hover:bg-[#E5C46B]/10 group-hover:text-[#E5C46B]">
                        <Icon className="h-[18px] w-[18px]" />
                      </div>

                      {/* content */}

                      <div className="min-w-0 flex-1">
                        <h3 className="text-[14px] font-semibold tracking-[-0.01em] text-white">
                          {item.title}
                        </h3>

                        <p className="mt-1 max-w-2xl text-[11px] leading-[1.5] text-white/40">
                          {item.text}
                        </p>
                      </div>

                      {/* arrow */}

                      <ArrowUpRight className="hidden h-[17px] w-[17px] shrink-0 text-white/20 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#E5C46B] sm:block" />
                    </div>
                  </motion.div>
                );

                return item.href ? (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="block outline-none"
                  >
                    {Card}
                  </Link>
                ) : (
                  <div key={item.title}>{Card}</div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   QUALITY
========================================================= */

function Quality() {
  const highlights = [
    "Critical care for emergencies and life-threatening conditions",
    "Elective treatments across multiple medical specialties",
    "Advanced radiology and diagnostic services",
    "Patient-first approach with personalised care",
  ];

  return (
    <section className="relative overflow-hidden bg-white px-5 py-10 sm:px-8 lg:py-20">
      {/* Ambient glow, ties to rest of page */}
      <div className="pointer-events-none absolute -left-32 top-1/3 h-80 w-80 rounded-full bg-[#1D82A6]/[0.05] blur-3xl" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
          {/* ================= IMAGE ================= */}
          <div className="lg:col-span-6">
            <div className="group relative overflow-hidden rounded-[2rem] bg-[#EDF6FB] p-3">
              {/* Dot-grid texture, brand-consistent */}
              <div
                className="pointer-events-none absolute inset-0 z-10 opacity-[0.25]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, rgba(14,82,107,0.15) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              <div className="relative overflow-hidden rounded-[1.5rem]">
                <img
                  src="/images/quality.png"
                  alt="Apollo JBP Hospitals quality and patient care"
                  className="h-[480px] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />

                {/* Hover tint — teal wash for brand cohesion */}
                <div className="pointer-events-none absolute inset-0 bg-[#0E526B]/0 transition-colors duration-700 group-hover:bg-[#0E526B]/10" />

                {/* Base gradient for legibility of floating card */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#06202B]/40 to-transparent" />
              </div>

              {/* Corner brackets */}
              <span className="pointer-events-none absolute left-6 top-6 z-20 h-6 w-6 border-l border-t border-white/60" />
              <span className="pointer-events-none absolute right-6 top-6 z-20 h-6 w-6 border-r border-t border-white/60" />

              {/* Floating seal badge — top right */}
              <div className="absolute right-7 top-7 z-20 flex h-16 w-16 items-center justify-center rounded-full border border-[#F6D98A]/60 bg-white/95 shadow-lg backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6">
                <div className="flex flex-col items-center">
                  <Award className="h-5 w-5 text-[#C8952E]" />
                  <span className="mt-0.5 text-[7px] font-bold uppercase tracking-wider text-[#0E526B]">
                    Trusted
                  </span>
                </div>
              </div>

              {/* Floating glass info card — bottom — now a link to /doctors */}
              <Link
                href="/doctors"
                className="group/card absolute bottom-8 left-8 right-8 z-20 block rounded-2xl border border-white/70 bg-white/90 p-5 shadow-xl backdrop-blur-xl transition-transform duration-500 hover:-translate-y-1"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#F6D98A] to-[#C8952E]">
                    <Users className="h-5 w-5 text-[#3A2B0A]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-extrabold text-[#06202B]">
                      Team of Experts
                    </div>

                    <div className="mt-1 text-[11px] text-slate-500">
                      50+ accomplished clinicians, patient-first approach
                    </div>
                  </div>

                  <ArrowRight className="h-4 w-4 shrink-0 text-[#0E526B] transition-transform duration-300 group-hover/card:translate-x-1" />
                </div>
              </Link>
            </div>
          </div>

          {/* ================= CONTENT ================= */}
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-[#C8952E]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0E526B]">
                Quality & trust
              </span>
            </div>

            <h2 className="text-4xl font-extrabold leading-tight text-[#06202B] sm:text-5xl">
              Excellence is not a
              <span className="font-serif italic font-medium text-[#C8952E]">
                {" "}
                destination.
              </span>
            </h2>

            <p className="mt-7 text-sm leading-7 text-slate-500">
              Highly experienced doctors and healthcare professionals
              specialising in diverse medical fields, delivering a patient-first
              approach with personalised care.
            </p>

            {/* ===== Meet Our Doctors CTA ===== */}
            <Link
              href="/doctors"
              className="group mt-6 inline-flex items-center gap-2.5 rounded-full bg-[#0E526B] px-5 py-2.5 text-xs font-bold text-white shadow-[0_10px_25px_rgba(14,82,107,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#06202B]"
            >
              Meet Our Doctors
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* ===== Verification line ===== */}
            <div className="relative mt-10">
              <div className="absolute bottom-1 left-[9px] top-1 w-px bg-gradient-to-b from-[#C8952E]/40 via-[#1D82A6]/20 to-transparent" />

              <div className="space-y-1">
                {highlights.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.6 }}
                    className="group/item relative flex items-start gap-4 rounded-xl py-2.5 pl-0 pr-2 transition-colors duration-300 hover:bg-[#EDF6FB]/60"
                  >
                    <span className="relative z-10 mt-0.5 flex h-[19px] w-[19px] shrink-0 items-center justify-center rounded-full border-2 border-[#C8952E] bg-white transition-colors duration-300 group-hover/item:bg-[#C8952E]">
                      <Check
                        className="h-2.5 w-2.5 text-[#C8952E] transition-colors duration-300 group-hover/item:text-white"
                        strokeWidth={3}
                      />
                    </span>

                    <span className="text-sm font-semibold leading-6 text-[#06202B]">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ===== Certification seals ===== */}
            <div className="mt-10 flex flex-wrap gap-4">
              {[
                { label: "Quality", value: "NABH Pathway" },
                { label: "Laboratory", value: "NABL Pathway" },
              ].map((cert) => (
                <div
                  key={cert.label}
                  className="relative rounded-2xl border border-dashed border-[#1D82A6]/30 bg-[#F8FBFD] px-5 py-3.5"
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="h-4 w-4 text-[#C8952E]" />
                    <div>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                        {cert.label}
                      </div>
                      <div className="mt-0.5 text-xs font-bold text-[#0E526B]">
                        {cert.value}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-3 text-[11px] leading-5 text-slate-400">
              Certification status shown as in-progress — confirm current
              accreditation with the hospital before publishing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FINAL CTA
========================================================= */

function AboutCTA({ onOpenAppointmentModal }) {
  return (
    <section className="relative overflow-hidden bg-[#EDF6FB] px-5 py-10 sm:px-8 lg:py-20">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[15%] top-[-150px] h-[500px] w-[500px] rounded-full bg-[#BFE3F2]/60 blur-[100px]"
        />

        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-[-200px] right-[5%] h-[500px] w-[500px] rounded-full bg-[#F3DFA8]/40 blur-[100px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1D82A6]/15 bg-white/80 px-4 py-2 backdrop-blur-md">
          <HeartPulse className="h-3.5 w-3.5 text-[#C8952E]" />

          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0E526B]">
            Your health. Our commitment.
          </span>
        </div>

        <motion.h2
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.9,
          }}
          className="text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] text-[#06202B] sm:text-5xl lg:text-6xl"
        >
          Become part of the healthcare
          <br />
          <span className="font-serif italic font-medium text-[#C8952E]">
            pride of Mahakoshal.
          </span>
        </motion.h2>

        <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-slate-500">
          Whether you are looking for a specialist, exploring treatment options
          or simply taking the next step in your health journey, Apollo JBP
          Hospitals is here to help.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <button
            onClick={onOpenAppointmentModal}
            className="group flex items-center gap-3 rounded-full bg-gradient-to-b from-[#F6D98A] to-[#C8952E] px-7 py-3.5 text-sm font-bold text-[#3A2B0A] shadow-[0_12px_30px_rgba(200,149,46,0.25)] transition-all hover:-translate-y-1"
          >
            Book an Appointment
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button className="group flex items-center gap-3 rounded-full border border-[#0E526B]/15 bg-white px-7 py-3.5 text-sm font-bold text-[#0E526B] shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
            Explore Our Care
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
