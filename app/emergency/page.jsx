"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PhoneCall,
  Ambulance,
  Activity,
  HeartPulse,
  Flame,
  Zap,
  Clock,
  ShieldAlert,
  AlertTriangle,
  UserCheck,
  CheckCircle,
  MapPin,
  Stethoscope,
  Building,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  FileText,
  Share2,
  Siren,
  Sparkles,
  ArrowRight,
  Radio,
  Crosshair,
  Waves,
} from "lucide-react";
import AppointmentModal from "../../components/components/AppointmentModal";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

export default function EmergencyPage() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [ambulanceStep, setAmbulanceStep] = useState("form"); // 'form' | 'dispatched'
  const [pickupData, setPickupData] = useState({
    location: "",
    emergencyType: "Chest Pain / Heart Attack",
    contactPhone: "",
    patientCondition: "",
  });

  const emergencyUnits = [
    {
      title: "Level-1 Comprehensive Trauma Unit",
      icon: ShieldAlert,
      color: "bg-rose-50 text-rose-700 border-rose-200",
      desc: "Immediate surgical intervention for multi-trauma, head injuries, highway accidents, and complex fractures.",
      stats: "Zero Wait Time • 24/7 Trauma Surgeons On Standby",
    },
    {
      title: "Cardiac Emergency & STEMI Network",
      icon: HeartPulse,
      color: "bg-[#EDF6FB] text-[#0E526B] border-[#1D82A6]/30",
      desc: "Door-to-Balloon time under 60 minutes for acute myocardial infarction with 24/7 standby Cath Lab team.",
      stats: "Primary Angioplasty Ready • Dedicated CCU",
    },
    {
      title: "Stroke Unit & Thrombolysis Care",
      icon: Zap,
      color: "bg-amber-50 text-amber-800 border-amber-200",
      desc: "Rapid non-contrast CT brain scan and intravenous clot-busting thrombolytic therapy within golden hour.",
      stats: "F.A.S.T Protocol • Neuro-ICU Beds",
    },
    {
      title: "Pediatric & Neonatal ER",
      icon: Activity,
      color: "bg-emerald-50 text-emerald-800 border-emerald-200",
      desc: "Specialized pediatric emergency doctors, warmers, and ventilator support for infants and children.",
      stats: "PICU / NICU Transport Ambulances",
    },
    {
      title: "Poisoning, Snake Bite & Burn Unit",
      icon: Flame,
      color: "bg-purple-50 text-purple-800 border-purple-200",
      desc: "Antivenom availability, gastric lavage facilities, and sterile burn care isolators with intensive monitoring.",
      stats: "24/7 Toxicology Specialists",
    },
    {
      title: "24/7 Emergency Blood Bank & Diagnostics",
      icon: Stethoscope,
      color: "bg-cyan-50 text-cyan-800 border-cyan-200",
      desc: "Instant cross-matching for PRBC, Platelets, and FFP, coupled with emergency CT, MRI, and ABG lab.",
      stats: "NABH Accredited Transfusion Center",
    },
  ];

  const firstAidProtocols = [
    {
      condition: "Heart Attack Symptoms",
      steps: [
        "Call Emergency 1800-123-6666 immediately for cardiac ambulance.",
        "Keep the patient seated in a semi-upright relaxed position.",
        "Loosen tight clothing around neck and waist.",
        "Do not leave the patient unattended; perform CPR if unconscious.",
      ],
      alert:
        "Never attempt patient self-driving if severe chest squeezing is present.",
    },
    {
      condition: "Acute Stroke (F.A.S.T.)",
      steps: [
        "F (Face): Check if one side of face droops when smiling.",
        "A (Arms): Ask to raise both arms; check if one arm drifts down.",
        "S (Speech): Listen for slurred or unintelligible words.",
        "T (Time): Note exact time symptoms began and call immediately.",
      ],
      alert:
        "Do NOT administer food, water, or blood pressure pills during acute stroke.",
    },
    {
      condition: "Severe Trauma & Bleeding",
      steps: [
        "Apply firm, direct pressure on the bleeding wound with clean cloth.",
        "Elevate the injured limb above heart level if no fracture is suspected.",
        "Keep patient warm with blanket to prevent medical shock.",
        "Immobilize head and neck if spine injury is suspected in road accidents.",
      ],
      alert: "Avoid removing embedded objects; apply padding around the wound.",
    },
    {
      condition: "Snake Bite & Poisoning",
      steps: [
        "Immobilize the bitten limb at or slightly below heart level.",
        "Remove rings, tight bracelets, or shoes before swelling begins.",
        "Take a photo of the snake/poison container from safe distance if possible.",
        "Transfer immediately to Apollo Jabalpur for anti-snake venom (ASV).",
      ],
      alert: "Do NOT cut the bite area, apply ice, or use mouth suction.",
    },
  ];

  const emergencyContacts = [
    {
      label: "National Emergency Helpline",
      number: "+91 1800-123-6666",
      desc: "Toll-Free 24/7 Direct Ambulance Hotline",
    },
    {
      label: "Apollo Jabalpur ER Reception",
      number: "+91 1800-123-6666",
      desc: "Emergency Triage & Patient Arrival Desk",
    },
    {
      label: "Trauma & ICU Direct Counter",
      number: "+91 7566123666",
      desc: "Critical Bed Availability & Transfer",
    },
    {
      label: "24/7 Blood Bank Direct Desk",
      number: "+91 7566123666",
      desc: "Emergency PRBC & Platelet Dispatch",
    },
  ];

  const handleDispatchSubmit = (e) => {
    e.preventDefault();
    setAmbulanceStep("dispatched");
  };

  return (
    <main className="relative min-h-screen bg-[#EDF6FB] text-slate-900 pt-28 pb-20 selection:bg-rose-500 selection:text-white overflow-hidden">
      {/* ───── Scoped ambient styling ───── */}
      <style jsx>{`
        .ep-orb {
          position: absolute;
          border-radius: 9999px;
          pointer-events: none;
        }
        .ep-orb-1 {
          width: 380px;
          height: 380px;
          top: -140px;
          left: -100px;
          background: radial-gradient(circle, #f9c9d1, transparent 70%);
          opacity: 0.5;
          animation: epFloat1 18s ease-in-out infinite;
        }
        .ep-orb-2 {
          width: 340px;
          height: 340px;
          top: 30%;
          right: -140px;
          background: radial-gradient(circle, #bfe3f2, transparent 70%);
          opacity: 0.45;
          animation: epFloat2 22s ease-in-out infinite;
        }
        .ep-orb-3 {
          width: 300px;
          height: 300px;
          bottom: 0;
          left: 25%;
          background: radial-gradient(circle, #f3dfa8, transparent 70%);
          opacity: 0.4;
          animation: epFloat1 20s ease-in-out infinite;
        }
        @keyframes epFloat1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(40px, 40px) scale(1.08);
          }
        }
        @keyframes epFloat2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-40px, 30px) scale(1.06);
          }
        }
        .ep-hero-shape {
          clip-path: polygon(
            0% 6%,
            8% 0%,
            92% 0%,
            100% 5%,
            100% 88%,
            94% 100%,
            55% 100%,
            48% 92%,
            18% 96%,
            0% 100%
          );
        }
        @media (max-width: 640px) {
          .ep-hero-shape {
            clip-path: polygon(
              0% 3%,
              6% 0%,
              94% 0%,
              100% 3%,
              100% 94%,
              92% 100%,
              8% 100%,
              0% 96%
            );
          }
        }
        .ep-pulse-ring {
          position: absolute;
          border-radius: 9999px;
          border: 1.5px solid rgba(255, 255, 255, 0.35);
        }
        @keyframes epRingExpand {
          0% {
            transform: scale(0.6);
            opacity: 0.9;
          }
          100% {
            transform: scale(2.4);
            opacity: 0;
          }
        }
        .ep-ring-anim {
          animation: epRingExpand 2.8s cubic-bezier(0.2, 0.6, 0.4, 1) infinite;
        }
        .ep-heartbeat-path {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: epDrawLine 3.2s ease-in-out infinite;
        }
        @keyframes epDrawLine {
          0% {
            stroke-dashoffset: 300;
            opacity: 0.3;
          }
          50% {
            stroke-dashoffset: 0;
            opacity: 1;
          }
          100% {
            stroke-dashoffset: -300;
            opacity: 0.3;
          }
        }
        /* ───── Rotating golden thick border around hero ───── */
        .ep-gold-border-wrap {
          position: relative;
          padding: 6px;
          overflow: hidden;
          isolation: isolate;
          box-shadow: 0 25px 70px rgba(200, 149, 46, 0.35),
            0 0 0 1px rgba(246, 217, 138, 0.15);
        }
        @media (min-width: 640px) {
          .ep-gold-border-wrap {
            padding: 8px;
          }
        }
        .ep-gold-spin {
          position: absolute;
          inset: -100%;
          width: 300%;
          height: 300%;
          z-index: 0;
          background: conic-gradient(
            from 0deg,
            #7a5215 0deg,
            #c8952e 45deg,
            #f6d98a 90deg,
            #fff6dd 130deg,
            #f6d98a 170deg,
            #c8952e 215deg,
            #7a5215 260deg,
            #c8952e 300deg,
            #f6d98a 330deg,
            #7a5215 360deg
          );
          animation: epGoldSpin 7s linear infinite;
        }
        @keyframes epGoldSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .ep-gold-inner {
          position: relative;
          z-index: 1;
        }
      `}</style>

      {/* Ambient background orbs + dotted texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="ep-orb ep-orb-1" />
        <div className="ep-orb ep-orb-2" />
        <div className="ep-orb ep-orb-3" />
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: "radial-gradient(#1D82A6 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(ellipse 80% 55% at 50% 20%, black 15%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 55% at 50% 20%, black 15%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* ───── ATTRACTIVE DARK RED EMERGENCY BANNER (BETWEEN NAVBAR & HERO TITLE) ───── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6"
        >
          <div className="relative overflow-hidden rounded-full bg-gradient-to-r from-rose-950 via-red-900 to-rose-950 px-5 py-3 text-white border border-rose-500/40 shadow-[0_10px_30px_rgba(159,18,57,0.3)] backdrop-blur-md">
            <div className="absolute -left-10 -top-10 w-32 h-32 bg-rose-600/30 rounded-full blur-xl animate-pulse pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="flex items-center gap-3">
                <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-600 shadow-inner">
                  <Siren className="w-4 h-4 text-white animate-bounce" />
                </span>
                <div>

                  <motion.div
                    animate={{ x: [0, 15, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                        CRITICAL NOTICE
                      </span>
                      <span className="text-xs font-semibold text-rose-200 hidden md:inline-block">
                        Priority Resuscitation & Trauma Response Active
                      </span>
                    </div>
                    <p className="text-xs font-medium text-rose-100 mt-0.5">
                      Immediate emergency response & ACLS ambulance units are
                      operational 24/7.
                    </p>
                  </motion.div>
                  
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="tel:18001236666"
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-extrabold text-xs transition-all shadow-md hover:shadow-rose-600/50 border border-rose-400/30"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>Call 1800-123-6666</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ───── High-Impact Hero Section — organic, non-rectangular, interactive, with rotating golden border ───── */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="relative w-full px-0 sm:px-4 lg:px-6 max-w-[100rem] mx-auto mb-24 sm:mb-28"
        >
          {/* Rotating golden thick-border wrapper (shape matches hero) */}
          <div className="ep-hero-shape ep-gold-border-wrap rounded-3xl">
            {/* Spinning conic-gradient layer forming the animated golden border */}
            <div className="ep-gold-spin" />

            {/* Jagged-cut, full-bleed inner panel (unchanged content) */}
            <div className="ep-hero-shape ep-gold-inner relative overflow-hidden bg-gradient-to-br from-[#500b1d] via-[#881337] to-[#0a3848] text-white py-16 sm:py-20 lg:py-28 px-6 sm:px-12 lg:px-20 rounded-3xl shadow-2xl">
              {/* Floating ambient glows */}
              <div className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full bg-rose-500/25 blur-[130px] pointer-events-none animate-pulse" />
              <div className="absolute -bottom-24 -left-24 w-[480px] h-[480px] rounded-full bg-[#1D82A6]/25 blur-[110px] pointer-events-none" />
              <div className="absolute top-1/3 left-1/2 w-72 h-72 rounded-full bg-amber-400/10 blur-[100px] pointer-events-none" />

              {/* Animated heartbeat / ECG line running across the whole hero */}
              <svg
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-24 opacity-30 pointer-events-none hidden md:block"
                viewBox="0 0 1200 100"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  className="ep-heartbeat-path"
                  d="M0,50 L200,50 L230,20 L260,80 L290,10 L320,50 L520,50 L550,35 L580,65 L610,50 L1200,50"
                  stroke="#F6D98A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Radar pulse rings emanating from a floating medallion (desktop only, decorative) */}
              <div className="absolute right-10 lg:right-24 top-10 hidden lg:block pointer-events-none">
                <div className="relative w-40 h-40">
                  <span
                    className="ep-pulse-ring inset-0 ep-ring-anim"
                    style={{ animationDelay: "0s" }}
                  />
                  <span
                    className="ep-pulse-ring inset-0 ep-ring-anim"
                    style={{ animationDelay: "0.9s" }}
                  />
                  <span
                    className="ep-pulse-ring inset-0 ep-ring-anim"
                    style={{ animationDelay: "1.8s" }}
                  />
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Column: Hero Text Content */}
                <div className="lg:col-span-7 space-y-6">
                  {/* Status Pill Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-rose-950/90 border border-rose-400/50 text-rose-200 text-xs font-black shadow-lg backdrop-blur-md"
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
                    </span>
                    <span className="tracking-wide uppercase">
                      24/7 Level-1 Trauma & Emergency Care
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="font-serif-apollo text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]"
                  >
                    Apollo Emergency &{" "}
                    <span
                      className="bg-clip-text text-transparent block sm:inline"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, #F6D98A 0%, #FFFFFF 50%, #F9A8B8 100%)",
                      }}
                    >
                      Critical Care
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-rose-100/90 text-sm sm:text-base leading-relaxed max-w-xl"
                  >
                    Rapid high-precision response, cardiac ACLS ambulances,
                    Level-1 trauma surgeons, 24/7 STEMI Cath Lab, and express
                    emergency triage at Apollo JBP Hospitals Jabalpur.
                  </motion.p>

                  {/* Primary Emergency CTA Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-wrap items-center gap-4 pt-2"
                  >
                    <motion.a
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      href="tel:18001236666"
                      className="relative group flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-red-600 to-rose-600 text-white font-black text-sm sm:text-base shadow-[0_10px_30px_rgba(225,29,72,0.6)] border border-rose-300/40 cursor-pointer overflow-hidden"
                    >
                      <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      <PhoneCall className="w-5 h-5 animate-pulse" />
                      <span>Call Hotline: 1800-123-6666</span>
                    </motion.a>

                    <motion.a
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      href="tel:+917566123666"
                      className="flex items-center gap-2.5 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs sm:text-sm transition-all border border-white/20 backdrop-blur-md shadow-lg"
                    >
                      <Ambulance className="w-4 h-4 text-[#F6D98A]" />
                      <span>Direct Desk: +91 7566123666</span>
                    </motion.a>
                  </motion.div>
                </div>

                {/* Right Column: Floating medallion + orbiting stat chips */}
                <div className="lg:col-span-5 relative flex items-center justify-center min-h-[260px] lg:min-h-[340px]">
                  {/* Central pulsing medallion */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.25,
                      type: "spring",
                      stiffness: 120,
                    }}
                    className="relative"
                  >
                    <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-rose-500 via-red-600 to-rose-800 shadow-[0_0_60px_rgba(244,63,94,0.55)] flex items-center justify-center border-4 border-white/20">
                      <span
                        className="ep-pulse-ring inset-0 ep-ring-anim"
                        style={{ animationDelay: "0.3s" }}
                      />
                      <span
                        className="ep-pulse-ring inset-0 ep-ring-anim"
                        style={{ animationDelay: "1.2s" }}
                      />
                      <HeartPulse className="w-16 h-16 sm:w-20 sm:h-20 text-white drop-shadow-lg" />
                    </div>
                  </motion.div>

                  {/* Orbiting glass stat chips */}
                  <motion.div
                    initial={{ opacity: 0, x: -20, y: 10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="absolute -left-2 sm:left-2 top-2 sm:top-4 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
                  >
                    <Clock className="w-4 h-4 text-[#F6D98A] shrink-0" />
                    <div className="text-left">
                      <div className="text-sm font-black text-white leading-none">
                        &lt;8 min
                      </div>
                      <div className="text-[9px] text-rose-100/80 font-semibold mt-0.5">
                        Avg Response
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20, y: -10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.65 }}
                    className="absolute right-0 sm:right-4 bottom-6 sm:bottom-10 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
                    <div className="text-left">
                      <div className="text-sm font-black text-white leading-none">
                        24/7
                      </div>
                      <div className="text-[9px] text-rose-100/80 font-semibold mt-0.5">
                        Trauma Ready
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="absolute left-4 sm:left-10 bottom-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
                  >
                    <Crosshair className="w-4 h-4 text-cyan-300 shrink-0" />
                    <div className="text-left">
                      <div className="text-sm font-black text-white leading-none">
                        GPS
                      </div>
                      <div className="text-[9px] text-rose-100/80 font-semibold mt-0.5">
                        Live Tracking
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ───── SECTION 1: RAPID AMBULANCE DISPATCH WIDGET ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        >
          <div className="relative p-[1.5px] rounded-[2rem] bg-gradient-to-r from-rose-400/60 via-[#F6D98A]/60 to-rose-400/60 shadow-[0_25px_60px_rgba(159,18,57,0.22)]">
            <div className="bg-white rounded-[calc(2rem-1.5px)] p-6 sm:p-10 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-700 text-white flex items-center justify-center font-bold shadow-lg">
                  <Ambulance className="w-7 h-7 animate-pulse animate-bounce" />
                </div>
                <div>
                  <h2 className="font-serif-apollo text-2xl font-black text-[#0B3446]">
                    Express Ambulance Request{" "}
                    <span className="text-[#C8952E]">
                      (Jabalpur & MP Region)
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Submit pickup coordinates for immediate cardiac ACLS
                    ambulance dispatch.
                  </p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {ambulanceStep === "form" ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleDispatchSubmit}
                    className="space-y-4 text-xs"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1.5">
                          Pickup Location / Address *
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-rose-500 absolute left-3 top-3.5" />
                          <input
                            type="text"
                            required
                            value={pickupData.location}
                            onChange={(e) =>
                              setPickupData({
                                ...pickupData,
                                location: e.target.value,
                              })
                            }
                            placeholder="e.g. Civil Lines, Vijay Nagar, or MP Highway Landmark..."
                            className="w-full pl-9 pr-3.5 py-3 rounded-xl border border-slate-300 bg-[#F8FAFC] focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 focus:outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1.5">
                          Patient Contact Phone Number *
                        </label>
                        <div className="relative">
                          <PhoneCall className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                          <input
                            type="tel"
                            required
                            value={pickupData.contactPhone}
                            onChange={(e) =>
                              setPickupData({
                                ...pickupData,
                                contactPhone: e.target.value,
                              })
                            }
                            placeholder="+91 98765 43210"
                            className="w-full pl-9 pr-3.5 py-3 rounded-xl border border-slate-300 bg-[#F8FAFC] focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1.5">
                          Nature of Emergency *
                        </label>
                        <select
                          value={pickupData.emergencyType}
                          onChange={(e) =>
                            setPickupData({
                              ...pickupData,
                              emergencyType: e.target.value,
                            })
                          }
                          className="w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-[#F8FAFC] font-semibold focus:border-rose-500 focus:outline-none transition-all"
                        >
                          <option value="Chest Pain / Heart Attack">
                            Chest Pain / Heart Attack
                          </option>
                          <option value="Road Accident / Major Trauma">
                            Road Accident / Major Trauma
                          </option>
                          <option value="Stroke Symptoms (F.A.S.T.)">
                            Stroke Symptoms (F.A.S.T.)
                          </option>
                          <option value="Severe Breathing Difficulty">
                            Severe Breathing Difficulty
                          </option>
                          <option value="Poisoning / Snake Bite">
                            Poisoning / Snake Bite
                          </option>
                          <option value="High Fever / Unresponsive">
                            High Fever / Unresponsive
                          </option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1.5">
                          Patient Condition Notes (Optional)
                        </label>
                        <input
                          type="text"
                          value={pickupData.patientCondition}
                          onChange={(e) =>
                            setPickupData({
                              ...pickupData,
                              patientCondition: e.target.value,
                            })
                          }
                          placeholder="Brief description (e.g. conscious, severe pain)..."
                          className="w-full px-3.5 py-3 rounded-xl border border-slate-300 bg-[#F8FAFC] focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 focus:outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>
                          GPS Tracking & Doctor-on-Board Ambulance Response
                        </span>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 text-white font-extrabold text-xs shadow-[0_15px_35px_rgba(225,29,72,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Ambulance className="w-4 h-4" />
                        <span>Request Emergency Ambulance Now</span>
                      </motion.button>
                    </div>
                  </motion.form>
                ) : (
                  /* Dispatched Confirmation Screen */
                  <motion.div
                    key="dispatched"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="p-8 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 14,
                        delay: 0.1,
                      }}
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 text-white flex items-center justify-center mx-auto shadow-xl"
                    >
                      <Ambulance className="w-8 h-8 animate-bounce" />
                    </motion.div>

                    <h3 className="font-serif-apollo text-2xl font-black text-rose-900">
                      Ambulance Dispatch Signal Initiated!
                    </h3>

                    <p className="text-xs text-rose-700 max-w-md mx-auto leading-relaxed">
                      Apollo Emergency Desk has received request for{" "}
                      <span className="font-bold">{pickupData.location}</span>.
                      Our paramedic control driver is calling{" "}
                      <span className="font-bold">
                        {pickupData.contactPhone}
                      </span>{" "}
                      immediately.
                    </p>

                    <div className="bg-white p-4 rounded-2xl border border-rose-300 max-w-md mx-auto text-left text-xs space-y-1 font-mono shadow-sm">
                      <div>
                        <span className="font-bold text-slate-700">
                          Dispatch Ref:
                        </span>{" "}
                        <span className="text-rose-600 font-bold">
                          EMG-1066-JBP
                        </span>
                      </div>
                      <div>
                        <span className="font-bold text-slate-700">
                          Emergency Priority:
                        </span>{" "}
                        {pickupData.emergencyType}
                      </div>
                      <div>
                        <span className="font-bold text-slate-700">
                          Estimated Arrival:
                        </span>{" "}
                        8-12 Mins (Traffic Dependent)
                      </div>
                    </div>

                    <div className="pt-2 flex justify-center gap-3">
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        href="tel:18001236666"
                        className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 text-white font-extrabold text-xs shadow-md"
                      >
                        Call Driver Direct (1800-123-6666)
                      </motion.a>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setAmbulanceStep("form")}
                        className="px-5 py-2.5 rounded-full bg-slate-200 text-slate-700 font-extrabold text-xs hover:bg-slate-300 cursor-pointer"
                      >
                        Modify Request
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.section>

        {/* ───── SECTION 2: 24/7 EMERGENCY SPECIALTY UNITS GRID ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        >
          <motion.div
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-10"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#0E526B] text-xs font-extrabold border border-[#1D82A6]/30 shadow-sm mb-4">
              <Siren className="w-3.5 h-3.5 text-rose-500" />
              Round-the-Clock Critical Infrastructure
            </span>
            <h2 className="font-serif-apollo text-2xl sm:text-4xl font-black text-[#0B3446] tracking-tight">
              24/7 Emergency &{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #9F1239 0%, #0E526B 50%, #C8952E 100%)",
                }}
              >
                Critical Care Units
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-3">
              Multi-specialty emergency infrastructure designed for instant
              resuscitation, trauma surgery, and cardiac catheterization.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyUnits.map((unit, idx) => {
              const Icon = unit.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className={`p-6 rounded-3xl border shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between ${unit.color}`}
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="font-serif-apollo text-lg font-extrabold mb-2">
                      {unit.title}
                    </h3>

                    <p className="text-xs leading-relaxed opacity-90 mb-4">
                      {unit.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-current/15 text-[11px] font-bold tracking-wide">
                    {unit.stats}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ───── SECTION 3: STEP-BY-STEP FIRST AID PROTOCOLS ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        >
          <div className="relative p-[1.5px] rounded-[2rem] bg-gradient-to-r from-[#1D82A6]/40 via-[#F6D98A]/50 to-rose-400/50 shadow-xl">
            <div className="bg-white rounded-[calc(2rem-1.5px)] p-6 sm:p-10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 text-xs font-extrabold text-rose-600 uppercase tracking-wider mb-1">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span>Life Saving First Response</span>
                  </div>
                  <h2 className="font-serif-apollo text-2xl font-black text-[#0B3446]">
                    First Aid Emergency Action Protocols
                  </h2>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EDF6FB] border border-[#1D82A6]/20 text-[11px] font-bold text-[#0E526B]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#1D82A6]" />
                  Approved by Apollo Resuscitation Council
                </div>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {firstAidProtocols.map((proto, idx) => (
                  <motion.div
                    key={idx}
                    variants={fadeUp}
                    whileHover={{ y: -5 }}
                    className="p-6 rounded-2xl bg-[#F8FAFC] border border-slate-200 hover:border-[#1D82A6]/40 hover:shadow-lg transition-all duration-300 space-y-4"
                  >
                    <h3 className="font-serif-apollo text-lg font-extrabold text-[#0B3446] flex items-center justify-between gap-2">
                      <span>{proto.condition}</span>
                      <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] text-[#FEF3C7] shrink-0">
                        Protocol #{idx + 1}
                      </span>
                    </h3>

                    <ul className="space-y-2.5 text-xs text-slate-700">
                      {proto.steps.map((st, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{st}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>{proto.alert}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ───── SECTION 4: DIRECT EMERGENCY HOTLINES & DIRECTORY ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="relative p-[1.5px] rounded-[2rem] bg-gradient-to-br from-[#F6D98A]/70 via-[#1D82A6]/40 to-rose-400/60 shadow-[0_25px_60px_rgba(10,95,122,0.28)]">
            <div className="rounded-[calc(2rem-1.5px)] bg-gradient-to-r from-[#093749] to-[#0E526B] p-8 sm:p-12 text-white relative overflow-hidden">
              <div className="absolute -top-20 -right-16 w-80 h-80 rounded-full bg-[#F6D98A]/15 blur-3xl pointer-events-none" />
              <div className="absolute inset-0 opacity-[0.1] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

              <div className="relative z-10 text-center max-w-xl mx-auto mb-8">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#FEF3C7] text-xs font-bold mb-3 border border-white/25">
                  <PhoneCall className="w-3.5 h-3.5 text-[#F6D98A]" />
                  Direct Access Lines
                </span>
                <h3 className="font-serif-apollo text-2xl sm:text-3xl font-black text-white">
                  Direct Emergency Hotlines
                </h3>
              </div>

              <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {emergencyContacts.map((contact, cIdx) => (
                  <div
                    key={cIdx}
                    className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-[11px] font-bold text-rose-200 uppercase tracking-wider">
                        {contact.label}
                      </p>
                      <p className="text-xs text-slate-300 mt-1 mb-3">
                        {contact.desc}
                      </p>
                    </div>
                    <a
                      href={`tel:${contact.number.replace(/\s+/g, "")}`}
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white text-[#0E526B] hover:bg-[#F6D98A] font-extrabold text-xs transition-colors shadow-md"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-rose-600" />
                      <span>{contact.number}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />
    </main>
  );
}