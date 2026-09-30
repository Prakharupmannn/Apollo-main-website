"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  CalendarPlus,
  Ambulance,
  FileText,
  PartyPopper,
  Stethoscope,
  ShieldCheck,
  Building2,
  Clock,
  PhoneCall,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  HeartPulse,
  Heart,
  BedDouble,
  ShieldAlert,
  CreditCard,
  ClipboardList,
  Award,
} from "lucide-react";
import AppointmentModal from "../../components/components/AppointmentModal";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const goldGradient = {
  background: "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
};

export default function PatientCarePage() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const patientServices = [
    {
      title: "Our Specialities",
      href: "/ourspecialities",
      icon: Stethoscope,
      color: "from-[#0A5F7A] to-[#2A8FAF]",
      badge: "18+ Clinical Units",
      desc: "Comprehensive surgical, medical, and diagnostic specialties ranging from Cardiology to CyberKnife Oncology.",
    },
    {
      title: "Make Appointment",
      href: "/patientcare/appointment",
      icon: CalendarPlus,
      color: "from-[#C8952E] to-[#F6D98A]",
      badge: "Instant Booking",
      desc: "Book online consultations with senior consultants at Apollo JBP Hospitals with instant time slot confirmation.",
    },
    {
      title: "Ambulance Service",
      href: "/patientcare/ambulance",
      icon: Ambulance,
      color: "from-rose-500 to-rose-700",
      badge: "24/7 Mobile ICU",
      desc: "ACLS cardiac ambulances with doctor-on-board, ventilators, defibrillators, and live GPS dispatch.",
    },
    {
      title: "Case Studies",
      href: "/patientcare/case-studies",
      icon: FileText,
      color: "from-[#1D82A6] to-[#0E526B]",
      badge: "Clinical Saves",
      desc: "Real medical breakthroughs at Apollo Jabalpur: TAVI, 36-hr multi-trauma resuscitation, and robotic surgeries.",
    },
    {
      title: "Events & Health Camps",
      href: "/patientcare/events",
      icon: PartyPopper,
      color: "from-[#C8952E] to-[#0E526B]",
      badge: "Free Screening",
      desc: "Mega cardiac screening camps, blood donation drives, wellness workshops, and medical CME conferences.",
    },
  ];

  const inpatientAmenities = [
    {
      title: "Deluxe & Executive Suite Rooms",
      desc: "Spacious private suites with electric ICU beds, attendant couch, LED TV, Wi-Fi, and personalized nursing.",
      icon: BedDouble,
    },
    {
      title: "Cashless TPA & Insurance Desk",
      desc: "Empanelled with leading TPAs & insurance companies for hassle-free pre-authorization and quick discharge.",
      icon: CreditCard,
    },
    {
      title: "24/7 In-House Pharmacy & Blood Bank",
      desc: "Fully stocked pharmacy and NABH-accredited blood transfusion center with PRBC, FFP & Platelets.",
      icon: ShieldCheck,
    },
    {
      title: "Patient Rights & Family Lounge",
      desc: "Transparent billing, compassionate counseling rooms, and comfortable waiting lounges for patient families.",
      icon: ClipboardList,
    },
  ];

  // Trust stats used in the refreshed hero right-panel
  const heroStats = [
    { icon: Award, value: "40+", label: "Years of Trust" },
    { icon: Stethoscope, value: "18+", label: "Clinical Units" },
    { icon: ShieldCheck, value: "24/7", label: "Patient Desk" },
  ];

  return (
    <main className="relative min-h-screen bg-[#EDF6FB] text-slate-900 pt-38 pb-20 selection:bg-[#1D82A6] selection:text-white overflow-hidden">
      {/* ───── Background Orbs + dynamic hero styling ───── */}
      <style jsx>{`
        .pc-orb {
          position: absolute;
          border-radius: 9999px;
          pointer-events: none;
        }
        .pc-orb-1 {
          width: 380px;
          height: 380px;
          top: -120px;
          left: -100px;
          background: radial-gradient(circle, #bfe3f2, transparent 70%);
          opacity: 0.5;
          animation: pcFloat1 16s ease-in-out infinite;
        }
        .pc-orb-2 {
          width: 340px;
          height: 340px;
          top: 30%;
          right: -120px;
          background: radial-gradient(circle, #f3dfa8, transparent 70%);
          opacity: 0.45;
          animation: pcFloat2 20s ease-in-out infinite;
        }
        .pc-orb-3 {
          width: 300px;
          height: 300px;
          bottom: 0;
          left: 30%;
          background: radial-gradient(circle, #cdeaf7, transparent 70%);
          opacity: 0.4;
          animation: pcFloat1 19s ease-in-out infinite;
        }
        @keyframes pcFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 40px) scale(1.08); }
        }
        @keyframes pcFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.06); }
        }

        /* Refreshed hero: soft rounded panel instead of the busy polygon clip-path */
        .pc-hero-shape {
          border-radius: 2.25rem;
        }

        /* Subtle static gold ring frame for hero (replaces the spinning conic border) */
        .pc-gold-wrap {
          position: relative;
          padding: 1.5px;
          border-radius: 2.25rem;
          background: linear-gradient(135deg, #7a5215 0%, #f6d98a 30%, #c8952e 55%, #f6d98a 80%, #7a5215 100%);
          box-shadow: 0 30px 70px rgba(10,95,122,0.35), 0 0 0 1px rgba(246,217,138,0.15);
        }
        .pc-gold-inner { position: relative; z-index: 1; }

        /* Gentle glow pulse behind the hero side-panel icon */
        .pc-icon-glow {
          animation: pcIconGlow 3.5s ease-in-out infinite;
        }
        @keyframes pcIconGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(246,217,138,0.35); }
          50% { box-shadow: 0 0 0 14px rgba(246,217,138,0); }
        }

        /* Shimmer sweep for CTA buttons */
        @keyframes pcShimmerSweep {
          0% { transform: translateX(-120%) skewX(-12deg); }
          100% { transform: translateX(220%) skewX(-12deg); }
        }
        .pc-shimmer::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
          transform: translateX(-120%) skewX(-12deg);
        }
        .pc-shimmer:hover::after {
          animation: pcShimmerSweep 1s ease forwards;
        }
      `}</style>

      {/* Dotted texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="pc-orb pc-orb-1" />
        <div className="pc-orb pc-orb-2" />
        <div className="pc-orb pc-orb-3" />
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
        {/* ───── Hero Header Section — refreshed: clean rounded panel, static gold frame, focused layout ───── */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="relative w-full px-4 sm:px-6 lg:px-6 max-w-[100rem] mx-auto mb-20 sm:mb-24"
        >
          <div className="pc-hero-shape pc-gold-wrap">
            <div className="pc-hero-shape pc-gold-inner relative overflow-hidden bg-gradient-to-tr from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] py-14 sm:py-20 lg:py-24 px-6 sm:px-12 lg:px-20 text-white shadow-2xl">
              <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#F6D98A]/25 blur-3xl pointer-events-none animate-pulse" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#0B3446]/40 blur-3xl pointer-events-none" />
              <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px] pointer-events-none" />
              <Heart className="absolute -right-10 -bottom-10 w-80 h-80 opacity-[0.06] text-white -rotate-12 pointer-events-none" />

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left: text content */}
                <div className="lg:col-span-7 space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-[#FEF3C7] text-xs font-bold shadow-inner"
                  >
                    <Sparkles className="w-4 h-4 text-[#F6D98A] animate-pulse" />
                    <span>Patient-Centred Healthcare • Apollo Hospitals Jabalpur</span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="font-serif-apollo text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]"
                  >
                    Comprehensive{" "}
                    <span
                      className="bg-clip-text text-transparent block sm:inline"
                      style={{
                        backgroundImage: "linear-gradient(90deg, #F6D98A 0%, #FFFFFF 50%, #C8952E 100%)",
                      }}
                    >
                      Patient Care Portal
                    </span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-slate-100/90 text-sm sm:text-base leading-relaxed max-w-xl"
                  >
                    Dedicated to making your hospital experience seamless, transparent, and compassionate. Access appointment bookings, ambulance services, clinical case studies, and health camps easily.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-wrap items-center gap-4 pt-2"
                  >
                    <motion.button
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setIsAppointmentModalOpen(true)}
                      className="pc-shimmer relative overflow-hidden px-8 py-4 rounded-full text-xs sm:text-sm font-black text-[#3A2B0A] shadow-[0_10px_30px_rgba(200,149,46,0.45)] hover:shadow-xl transition-all cursor-pointer flex items-center gap-2"
                      style={goldGradient}
                    >
                      <CalendarPlus className="w-4 h-4" />
                      <span>Book Appointment</span>
                    </motion.button>

                    <motion.a
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      href="tel:18001236666"
                      className="relative px-6 py-4 rounded-full bg-rose-600 text-white font-extrabold text-xs sm:text-sm shadow-[0_10px_30px_rgba(225,29,72,0.4)] hover:bg-rose-700 transition-colors flex items-center gap-2"
                    >
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/70 opacity-75" />
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
                      </span>
                      <PhoneCall className="w-4 h-4" />
                      <span>Emergency: 1800-123-6666</span>
                    </motion.a>
                  </motion.div>

                  {/* Quick trust strip */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-wrap items-center gap-3 pt-4"
                  >
                    {[
                      { icon: ShieldCheck, text: "NABH Accredited" },
                      { icon: Clock, text: "24/7 Patient Desk" },
                      { icon: Award, text: "Trusted Since 1983" },
                    ].map((t, i) => {
                      const TIcon = t.icon;
                      return (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-[10px] font-bold text-slate-100"
                        >
                          <TIcon className="w-3.5 h-3.5 text-[#F6D98A] animate-bounce" />
                          <span>{t.text}</span>
                        </div>
                      );
                    })}
                  </motion.div>
                </div>

                {/* Right: refreshed panel — clean glass card with center icon + stat row, replaces the spinning orbit */}
                <div className="lg:col-span-5 relative flex items-center justify-center min-h-[280px] lg:min-h-[340px]">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.25, type: "spring", stiffness: 120 }}
                    className="relative w-full max-w-sm rounded-[1.75rem] bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.25)] px-7 py-8 sm:px-8 sm:py-9"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div
                        className="pc-icon-glow w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center shadow-[0_0_45px_rgba(200,149,46,0.5)] border-4 border-white/20 mb-4"
                        style={goldGradient}
                      >
                        <HeartPulse className="w-9 h-9 sm:w-10 sm:h-10 text-[#3A2B0A]" />
                      </div>
                      <span className="text-sm font-black text-white uppercase tracking-wide leading-snug">
                        Complete Patient Care
                      </span>
                      <p className="text-[11px] text-slate-100/75 mt-1.5 max-w-[220px]">
                        Every service you need, in one connected portal
                      </p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-white/15 grid grid-cols-3 gap-2">
                      {heroStats.map((stat, i) => {
                        const SIcon = stat.icon;
                        return (
                          <div key={i} className="flex flex-col items-center text-center gap-1">
                            <SIcon className="w-4 h-4 text-[#F6D98A]" />
                            <span className="text-sm sm:text-base font-black text-white leading-none  animate-bounce">
                              {stat.value}
                            </span>
                            <span className="text-[9px] font-semibold text-slate-100/70 leading-tight">
                              {stat.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ───── Patient Care Dropdown Pages Grid ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        >
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#0E526B] text-xs font-extrabold border border-[#1D82A6]/30 shadow-sm mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C8952E]" />
              Explore Patient Care Services
            </span>
            <h2 className="font-serif-apollo text-2xl sm:text-4xl font-black text-[#0B3446]">
              Everything You Need for Your Healthcare Journey
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patientServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="relative p-[1.5px] rounded-[1.75rem] bg-gradient-to-br from-[#1D82A6]/40 via-white to-[#C8952E]/50 shadow-[0_10px_30px_rgba(10,95,122,0.12)] hover:shadow-[0_25px_55px_rgba(10,95,122,0.3)] transition-shadow duration-300 group flex flex-col justify-between overflow-hidden"
                >
                  {/* subtle glow blob that blooms on hover */}
                  <div
                    className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-gradient-to-br ${service.color} pointer-events-none z-0`}
                  />

                  <div className="relative h-full rounded-[calc(1.75rem-1.5px)] bg-white p-6 flex flex-col justify-between z-10">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#EDF6FB] text-[#0E526B] border border-[#1D82A6]/20">
                          {service.badge}
                        </span>
                      </div>

                      <h3 className="font-serif-apollo text-xl font-black text-[#0B3446] group-hover:text-[#1D82A6] transition-colors mb-2">
                        {service.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed mb-6">
                        {service.desc}
                      </p>
                    </div>

                    <Link
                      href={service.href}
                      className="inline-flex items-center justify-between w-full p-3 rounded-xl bg-[#EDF6FB] text-[#0E526B] font-extrabold text-xs hover:bg-[#0A5F7A] hover:text-white transition-all duration-200 group/link"
                    >
                      <span>Explore Page</span>
                      <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ───── Inpatient & Hospital Care Amenities ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        >
          <div className="relative p-[1.5px] rounded-[2rem] bg-gradient-to-br from-[#F6D98A]/70 via-[#1D82A6]/40 to-[#C8952E]/70 shadow-[0_25px_60px_rgba(10,95,122,0.22)]">
            <div className="rounded-[calc(2rem-1.5px)] bg-white p-8 sm:p-12 relative overflow-hidden">
              <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#EDF6FB] blur-3xl pointer-events-none" />

              <div className="relative max-w-2xl mb-8">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#C8952E] uppercase tracking-wider mb-1">
                  <Building2 className="w-4 h-4 text-[#1D82A6]" />
                  <span>World-Class Inpatient Facilities</span>
                </div>
                <h2 className="font-serif-apollo text-2xl sm:text-3xl font-black text-[#0B3446]">
                  Your Comfort & Safety Are Our Highest Priority
                </h2>
              </div>

              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
                {inpatientAmenities.map((item, i) => {
                  const AIcon = item.icon;
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.4, delay: i * 0.06 }}
                      whileHover={{ y: -4 }}
                      className="p-5 rounded-2xl bg-[#EDF6FB]/80 border border-[#1D82A6]/15 hover:border-[#1D82A6]/40 hover:shadow-md transition-all duration-300 flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A5F7A] to-[#17627D] text-[#F6D98A] flex items-center justify-center shadow-md shrink-0">
                        <AIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-[#0B3446] mb-1">{item.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
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
          <div className="relative p-[1.5px] rounded-3xl bg-gradient-to-r from-[#1D82A6]/30 via-[#C8952E]/40 to-[#1D82A6]/30 shadow-md">
            <div className="rounded-[calc(1.5rem-1.5px)] bg-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] flex items-center justify-center text-[#F6D98A] shadow-lg shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[#0B3446]">
                    Apollo JBP Hospitals • Global Square, Patan Rd, Karmeta, Jabalpur
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    24/7 Patient Helpdesk: 1800-123-6666 / 7566 123666 • WhatsApp: +91 9575308686
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsAppointmentModalOpen(true)}
                className="pc-shimmer relative overflow-hidden px-6 py-3 rounded-full text-xs font-extrabold text-[#3A2B0A] shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
                style={goldGradient}
              >
                Book Appointment Online
              </motion.button>
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