"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Ambulance,
  PhoneCall,
  Siren,
  ShieldAlert,
  Activity,
  HeartPulse,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Zap,
  Sparkles,
  Building2,
  Radio,
  Navigation,
  ShieldCheck,
  Gauge,
  Stethoscope,
  ChevronRight,
} from "lucide-react";
import AppointmentModal from "../../../components/components/AppointmentModal";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function AmbulanceServicePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [form, setForm] = useState({
    location: "",
    landmark: "",
    phone: "",
    patientCondition: "Chest Pain / Heart Emergency",
  });

 const icuEquipment = [
    {
      name: "Portable ICU Ventilator",
      desc: "Advanced mechanical breathing support for respiratory distress during transport.",
      icon: Zap,
      gradient: "from-amber-500 via-orange-500 to-rose-500",
      bgGlow: "bg-amber-500/10",
      accentBorder: "border-amber-400/50",
      iconBg: "from-amber-500/20 to-orange-500/20 text-amber-600",
      shadow: "hover:shadow-amber-500/25",
      tag: "Critical Care",
    },
    {
      name: "Biphasic Defibrillator & Pacemaker",
      desc: "Immediate cardiac resuscitation for ventricular fibrillation or cardiac arrest.",
      icon: HeartPulse,
      gradient: "from-rose-500 via-red-500 to-pink-600",
      bgGlow: "bg-rose-500/10",
      accentBorder: "border-rose-400/50",
      iconBg: "from-rose-500/20 to-red-500/20 text-rose-600",
      shadow: "hover:shadow-rose-500/25",
      tag: "Cardiac Resuscitation",
    },
    {
      name: "Multi-Para Cardiac Monitor",
      desc: "Real-time tracking of ECG, SpO2, NIBP, and Capnography.",
      icon: Activity,
      gradient: "from-cyan-500 via-blue-500 to-indigo-600",
      bgGlow: "bg-cyan-500/10",
      accentBorder: "border-cyan-400/50",
      iconBg: "from-cyan-500/20 to-blue-500/20 text-cyan-600",
      shadow: "hover:shadow-cyan-500/25",
      tag: "Telemetry Telematics",
    },
    {
      name: "Syringe & Infusion Pumps",
      desc: "Precise intravenous administration of emergency cardiac & vasopressor medications.",
      icon: ShieldCheck,
      gradient: "from-emerald-500 via-teal-500 to-cyan-600",
      bgGlow: "bg-emerald-500/10",
      accentBorder: "border-emerald-400/50",
      iconBg: "from-emerald-500/20 to-teal-500/20 text-emerald-600",
      shadow: "hover:shadow-emerald-500/25",
      tag: "Automated IV",
    },
    {
      name: "Central Medical Oxygen Cylinders",
      desc: "Dual high-capacity oxygen cylinders for continuous high-flow oxygenation.",
      icon: Flame,
      gradient: "from-violet-500 via-[#1D82A6] to-cyan-500",
      bgGlow: "bg-sky-500/10",
      accentBorder: "border-sky-400/50",
      iconBg: "from-sky-500/20 to-blue-500/20 text-sky-600",
      shadow: "hover:shadow-sky-500/25",
      tag: "Dual Tank Matrix",
    },
    {
      name: "Trauma Splints & Cervical Collars",
      desc: "Spine immobilization and fracture stabilization for highway crash victims.",
      icon: ShieldAlert,
      gradient: "from-fuchsia-500 via-purple-500 to-indigo-600",
      bgGlow: "bg-purple-500/10",
      accentBorder: "border-purple-400/50",
      iconBg: "from-purple-500/20 to-fuchsia-500/20 text-purple-600",
      shadow: "hover:shadow-purple-500/25",
      tag: "Trauma Immobilize",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="relative min-h-screen bg-[#EDF6FB] text-slate-900 pt-38 pb-20 selection:bg-rose-500 selection:text-white overflow-hidden">
      {/* ───── Background Orbs + Hero-only dynamic styles ───── */}
      <style jsx>{`
        .amb-orb {
          position: absolute;
          border-radius: 9999px;
          pointer-events: none;
        }
        .amb-orb-1 {
          width: 380px;
          height: 380px;
          top: -120px;
          left: -100px;
          background: radial-gradient(circle, #f9c9d1, transparent 70%);
          opacity: 0.5;
          animation: ambFloat1 16s ease-in-out infinite;
        }
        .amb-orb-2 {
          width: 340px;
          height: 340px;
          top: 30%;
          right: -120px;
          background: radial-gradient(circle, #bfe3f2, transparent 70%);
          opacity: 0.45;
          animation: ambFloat2 20s ease-in-out infinite;
        }
        @keyframes ambFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 40px) scale(1.08); }
        }
        @keyframes ambFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.06); }
        }

        /* Hero jagged shape */
        .amb-hero-shape {
          clip-path: polygon(
            0% 5%, 7% 0%, 93% 0%, 100% 4%,
            100% 90%, 95% 100%, 52% 100%, 45% 90%,
            15% 95%, 0% 100%
          );
        }
        @media (max-width: 640px) {
          .amb-hero-shape {
            clip-path: polygon(
              0% 2%, 6% 0%, 94% 0%, 100% 2%,
              100% 95%, 90% 100%, 10% 100%, 0% 97%
            );
          }
        }

        /* Rotating golden border */
        .amb-gold-wrap {
          position: relative;
          padding: 5px;
          overflow: hidden;
          isolation: isolate;
          box-shadow: 0 25px 70px rgba(159,18,57,0.35), 0 0 0 1px rgba(246,217,138,0.15);
        }
        .amb-gold-spin {
          position: absolute;
          inset: -100%;
          width: 300%;
          height: 300%;
          z-index: 0;
          background: conic-gradient(
            from 0deg,
            #7a5215 0deg, #c8952e 45deg, #f6d98a 90deg, #fff6dd 130deg,
            #f6d98a 170deg, #c8952e 215deg, #7a5215 260deg, #c8952e 300deg,
            #f6d98a 330deg, #7a5215 360deg
          );
          animation: ambGoldSpin 8s linear infinite;
        }
        @keyframes ambGoldSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .amb-gold-inner { position: relative; z-index: 1; }

        /* Radar pulse rings */
        .amb-pulse-ring {
          position: absolute;
          border-radius: 9999px;
          border: 1.5px solid rgba(255,255,255,0.4);
        }
        @keyframes ambRingExpand {
          0% { transform: scale(0.6); opacity: 0.9; }
          100% { transform: scale(2.3); opacity: 0; }
        }
        .amb-ring-anim { animation: ambRingExpand 2.6s cubic-bezier(0.2,0.6,0.4,1) infinite; }

        /* Moving route line + dot */
        .amb-route-path {
          stroke-dasharray: 6 10;
          animation: ambRouteDash 2s linear infinite;
        }
        @keyframes ambRouteDash {
          to { stroke-dashoffset: -32; }
        }
        .amb-route-dot {
          offset-rotate: 0deg;
          animation: ambDotMove 4.5s linear infinite;
        }
        @keyframes ambDotMove {
          0% { motion-offset: 0%; }
          100% { motion-offset: 100%; }
        }

        /* Siren strobe glow */
        @keyframes ambStrobeRed {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.55; }
        }
        @keyframes ambStrobeBlue {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.15; }
        }
        .amb-strobe-red { animation: ambStrobeRed 1.1s ease-in-out infinite; }
        .amb-strobe-blue { animation: ambStrobeBlue 1.1s ease-in-out infinite; }
      `}</style>

      {/* Dotted texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="amb-orb amb-orb-1" />
        <div className="amb-orb amb-orb-2" />
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: "radial-gradient(#1D82A6 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(ellipse 80% 55% at 50% 25%, black 15%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 55% at 50% 25%, black 15%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* ───── Emergency Live Ticker ───── */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-rose-950 via-red-900 to-rose-950 text-white py-3 px-4 border-b border-rose-500/30 shadow-lg mb-8"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500" />
              </span>
              <span className="text-xs font-black tracking-wider uppercase text-rose-200">
                24/7 CRITICAL ICU AMBULANCE HOTLINE
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="tel:18001236666"
                className="px-4 py-1.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-black text-xs transition-colors shadow-md flex items-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 animate-bounce" />
                <span>1800-123-6666</span>
              </a>
              <a
                href="tel:7566123666"
                className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors border border-white/20"
              >
                <span>Desk: 7566 123666</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* ───── Hero Header Section — organic shape, rotating gold border, radar + route animation ───── */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="relative w-full px-0 sm:px-4 lg:px-6 max-w-[100rem] mx-auto mb-16 sm:mb-20"
        >
          <div className="amb-hero-shape amb-gold-wrap rounded-3xl">
            <div className="amb-gold-spin" />

            <div className="amb-hero-shape amb-gold-inner relative overflow-hidden bg-gradient-to-br from-[#881337] via-[#9F1239] to-[#0a3848] text-white py-16 sm:py-20 lg:py-24 px-6 sm:px-12 lg:px-20 rounded-3xl shadow-2xl">
              {/* Ambient glows */}
              <div className="absolute top-0 right-0 w-[520px] h-[520px] rounded-full bg-rose-500/25 blur-[130px] pointer-events-none animate-pulse" />
              <div className="absolute -bottom-24 -left-24 w-[460px] h-[460px] rounded-full bg-[#1D82A6]/25 blur-[110px] pointer-events-none" />

              {/* Siren strobe wash (subtle, non-intrusive) */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -left-10 top-10 w-72 h-72 rounded-full bg-rose-500/25 blur-3xl amb-strobe-red" />
                <div className="absolute -right-10 bottom-10 w-72 h-72 rounded-full bg-[#1D82A6]/30 blur-3xl amb-strobe-blue" />
              </div>

              {/* Animated ambulance route across the hero */}
              <svg
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-28 opacity-40 pointer-events-none hidden md:block"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                fill="none"
              >
                <path
                  id="ambRoutePath"
                  className="amb-route-path"
                  d="M0,70 C150,70 180,30 320,30 C460,30 480,90 620,90 C760,90 780,40 920,40 C1040,40 1080,70 1200,70"
                  stroke="#F6D98A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>

              {/* Radar pulse rings, desktop only */}
              <div className="absolute right-10 lg:right-24 top-10 hidden lg:block pointer-events-none">
                <div className="relative w-36 h-36">
                  <span className="amb-pulse-ring inset-0 amb-ring-anim" style={{ animationDelay: "0s" }} />
                  <span className="amb-pulse-ring inset-0 amb-ring-anim" style={{ animationDelay: "0.9s" }} />
                  <span className="amb-pulse-ring inset-0 amb-ring-anim" style={{ animationDelay: "1.8s" }} />
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left: text content */}
                <div className="lg:col-span-7 space-y-6">
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
                    <Siren className="w-3.5 h-3.5 text-rose-300" />
                    <span className="tracking-wide uppercase">24/7 Mobile ICU • Doctor-on-Board</span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="font-serif-apollo text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]"
                  >
                    24/7 Emergency{" "}
                    <span
                      className="bg-clip-text text-transparent block sm:inline"
                      style={{ backgroundImage: "linear-gradient(90deg, #F6D98A 0%, #FFFFFF 50%, #F9A8B8 100%)" }}
                    >
                      Ambulance Services
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-rose-100/90 text-sm sm:text-base leading-relaxed max-w-xl"
                  >
                    High-tech cardiac ACLS ambulances equipped with portable ventilators, biphasic defibrillators, multi-para monitors, and trained emergency doctors servicing Jabalpur and all surrounding MP districts.
                  </motion.p>

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
                      <span>Call Tollfree: 1800-123-6666</span>
                    </motion.a>

                    <motion.a
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      href="tel:7566123666"
                      className="flex items-center gap-2.5 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs sm:text-sm transition-all border border-white/20 backdrop-blur-md shadow-lg"
                    >
                      <Ambulance className="w-4 h-4 text-[#F6D98A]" />
                      <span>Direct Desk: 7566 123666</span>
                    </motion.a>
                  </motion.div>
                </div>

                {/* Right: floating medallion + orbiting stat chips */}
                <div className="lg:col-span-5 relative flex items-center justify-center min-h-[260px] lg:min-h-[320px]">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.25, type: "spring", stiffness: 120 }}
                    className="relative"
                  >
                    <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-rose-500 via-red-600 to-rose-800 shadow-[0_0_60px_rgba(244,63,94,0.55)] flex items-center justify-center border-4 border-white/20">
                      <span className="amb-pulse-ring inset-0 amb-ring-anim" style={{ animationDelay: "0.3s" }} />
                      <span className="amb-pulse-ring inset-0 amb-ring-anim" style={{ animationDelay: "1.2s" }} />
                      <Ambulance className="w-16 h-16 sm:w-20 sm:h-20 text-white drop-shadow-lg" />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20, y: 10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="absolute -left-2 sm:left-2 top-2 sm:top-4 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
                  >
                    <Gauge className="w-4 h-4 text-[#F6D98A] shrink-0" />
                    <div className="text-left">
                      <div className="text-sm font-black text-white leading-none">&lt;10 min</div>
                      <div className="text-[9px] text-rose-100/80 font-semibold mt-0.5">Avg Dispatch</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20, y: -10 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.65 }}
                    className="absolute right-0 sm:right-4 bottom-6 sm:bottom-10 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
                  >
                    <Stethoscope className="w-4 h-4 text-emerald-300 shrink-0" />
                    <div className="text-left">
                      <div className="text-sm font-black text-white leading-none">Doctor</div>
                      <div className="text-[9px] text-rose-100/80 font-semibold mt-0.5">On Board</div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="absolute left-4 sm:left-10 bottom-0 flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
                  >
                    <Navigation className="w-4 h-4 text-cyan-300 shrink-0" />
                    <div className="text-left">
                      <div className="text-sm font-black text-white leading-none">GPS</div>
                      <div className="text-[9px] text-rose-100/80 font-semibold mt-0.5">Live Tracking</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ───── Express Dispatch Request Form ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        >
          <div className="relative p-[1.5px] rounded-[2rem] bg-gradient-to-r from-rose-400/60 via-[#F6D98A]/60 to-rose-400/60 shadow-2xl">
            <div className="bg-white rounded-[calc(2rem-1.5px)] p-6 sm:p-10">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-700 text-white flex items-center justify-center font-bold shadow-md">
                  <Navigation className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-serif-apollo text-xl font-black text-[#0B3446]">
                    Request Immediate Ambulance Dispatch
                  </h3>
                  <p className="text-xs text-slate-500">Provide pickup location details for rapid GPS control routing.</p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4 text-xs"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1.5">
                          Pickup Address / Location *
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-rose-500 absolute left-3 top-3.5" />
                          <input
                            type="text"
                            required
                            value={form.location}
                            onChange={(e) => setForm({ ...form, location: e.target.value })}
                            placeholder="e.g. Civil Lines, Karmeta, or Highway KM marker..."
                            className="w-full pl-9 pr-3.5 py-3 rounded-xl border border-slate-300 focus:border-rose-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1.5">
                          Caller Phone Number *
                        </label>
                        <div className="relative">
                          <PhoneCall className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                          <input
                            type="tel"
                            required
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: e.target.value })}
                            placeholder="+91 98765 43210"
                            className="w-full pl-9 pr-3.5 py-3 rounded-xl border border-slate-300 focus:border-rose-500 focus:outline-none"
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
                          value={form.patientCondition}
                          onChange={(e) => setForm({ ...form, patientCondition: e.target.value })}
                          className="w-full px-3.5 py-3 rounded-xl border border-slate-300 font-semibold focus:border-rose-500 focus:outline-none"
                        >
                          <option value="Chest Pain / Heart Emergency">Chest Pain / Heart Attack</option>
                          <option value="Road Accident / Major Trauma">Road Accident / Highway Trauma</option>
                          <option value="Stroke (F.A.S.T. Paralysis)">Stroke (F.A.S.T. Paralysis)</option>
                          <option value="Severe Respiratory Distress">Severe Respiratory Distress</option>
                          <option value="Snake Bite / Poisoning">Snake Bite / Poisoning</option>
                          <option value="ICU-to-ICU Patient Transfer">ICU-to-ICU Patient Transfer</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1.5">
                          Nearby Landmark (Optional)
                        </label>
                        <input
                          type="text"
                          value={form.landmark}
                          onChange={(e) => setForm({ ...form, landmark: e.target.value })}
                          placeholder="e.g. Near New RTO Office..."
                          className="w-full px-3.5 py-3 rounded-xl border border-slate-300 focus:border-rose-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 text-white font-extrabold text-xs shadow-lg hover:shadow-rose-600/40 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Ambulance className="w-4 h-4" />
                        <span>Dispatch Emergency Ambulance Now</span>
                      </motion.button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="submitted"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="p-8 text-center space-y-4 bg-rose-50 rounded-2xl border border-rose-200"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-rose-600 text-white flex items-center justify-center mx-auto shadow-xl"
                    >
                      <Ambulance className="w-8 h-8 animate-bounce" />
                    </motion.div>

                    <h3 className="font-serif-apollo text-2xl font-black text-rose-950">
                      Ambulance Control Signal Sent!
                    </h3>

                    <p className="text-xs text-rose-800 max-w-md mx-auto">
                      Our ER paramedic driver is contacting <span className="font-bold">{form.phone}</span> for live GPS directions to <span className="font-bold">{form.location}</span>.
                    </p>

                    <div className="bg-white p-4 rounded-xl border border-rose-300 max-w-sm mx-auto text-xs font-mono text-left space-y-1">
                      <div><span className="font-bold text-slate-700">Dispatch Ref:</span> <span className="text-rose-600 font-bold">EMG-AMB-9921</span></div>
                      <div><span className="font-bold text-slate-700">Condition:</span> {form.patientCondition}</div>
                      <div><span className="font-bold text-slate-700">Response Guarantee:</span> Doctor on Board</div>
                    </div>

                    <div className="pt-2 flex justify-center gap-3">
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        href="tel:18001236666"
                        className="px-6 py-2.5 rounded-full bg-rose-600 text-white font-extrabold text-xs shadow-md"
                      >
                        Call Driver Control (1800-123-6666)
                      </motion.a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.section>

        {/* ───── Mobile ICU Equipment Inventory ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        >
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 text-[#0E526B] text-xs font-extrabold border border-[#1D82A6]/30 shadow-md backdrop-blur-md mb-3">
              <ShieldAlert className="w-4 h-4 text-rose-600 animate-pulse" />
              Advanced Life Support Equipment
            </span>
            <h2 className="font-serif-apollo text-3xl sm:text-4xl font-black text-[#0B3446]">
              Mobile ICU Capabilities on Wheels
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Hospital-grade intensive care diagnostics and life support ready for instant deployment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {icuEquipment.map((eq, idx) => {
              const EIcon = eq.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className={`group relative p-7 rounded-3xl bg-white/90 backdrop-blur-xl border border-white/80 shadow-lg ${eq.shadow} hover:shadow-2xl transition-all duration-300 flex flex-col justify-between overflow-hidden`}
                >
                  {/* Glowing dynamic background blur on hover */}
                  <div
                    className={`absolute -top-16 -right-16 w-36 h-36 rounded-full ${eq.bgGlow} blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`}
                  />

                  {/* Gradient accent top bar */}
                  <div
                    className={`absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r ${eq.gradient} opacity-80 group-hover:opacity-100 transition-opacity`}
                  />

                  {/* Card Light Sweep Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                  <div className="relative z-10">
                    {/* Header Badge & Icon */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${eq.iconBg} border ${eq.accentBorder} flex items-center justify-center shadow-inner group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <EIcon className="w-7 h-7" />
                      </div>

                      <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/80 group-hover:bg-slate-900 group-hover:text-white transition-colors">
                        {eq.tag}
                      </span>
                    </div>

                    <h3 className="font-serif-apollo text-lg font-black text-[#0B3446] mb-2.5 group-hover:text-rose-600 transition-colors">
                      {eq.name}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {eq.desc}
                    </p>
                  </div>

                  {/* Card Footer Status */}
                  <div className="relative z-10 mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] font-extrabold">
                    <div className="text-emerald-600 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>Certified Unit</span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400 group-hover:text-rose-500 transition-colors">
                      <span>Ready</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ───── Trust Footer Banner ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        >
          <div className="relative p-[1.5px] rounded-3xl bg-gradient-to-r from-rose-400/40 via-[#F6D98A]/50 to-[#1D82A6]/40 shadow-md">
            <div className="rounded-[calc(1.5rem-1.5px)] bg-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-700 text-white flex items-center justify-center shadow-lg shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[#0B3446]">
                    Apollo JBP Hospitals Ambulance Hub
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Global Square, Patan Rd, Karmeta, Jabalpur • Emergency Helpline: 1800-123-6666 / 7566 123666.
                  </p>
                </div>
              </div>

              <a
                href="tel:18001236666"
                className="px-6 py-3 rounded-full text-xs font-extrabold bg-rose-600 text-white shadow-md hover:bg-rose-700 transition-colors shrink-0"
              >
                Call Emergency: 1800-123-6666
              </a>
            </div>
          </div>
        </motion.section>
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}