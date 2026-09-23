"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  PhoneCall,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Building,
  Navigation,
  Globe,
  ShieldCheck,
  Calendar,
  ChevronDown,
  Phone,
  Sparkles,
  Zap,
  HeartPulse,
  MessageCircle,
} from "lucide-react";
import AppointmentModal from "../../components/components/AppointmentModal";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09 },
  },
};

const goldStyle = {
  background: "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
};

// Theme configurations per contact card type
// Updated Light-Theme configurations for contact cards
// Light-theme contact cards with subtle darker hover background transitions
const cardThemes = {
  emergency: {
    outerBorder:
      "bg-gradient-to-br from-rose-200 via-red-300 to-amber-200 shadow-[0_10px_30px_rgba(239,68,68,0.12)] border border-rose-200/60 hover:shadow-[0_15px_35px_rgba(239,68,68,0.22)] transition-all duration-300",
    cardBg:
      "bg-gradient-to-br from-rose-50 via-red-50/70 to-white hover:from-rose-100/80 hover:via-red-100/70 hover:to-rose-50/90 text-slate-800 transition-colors duration-300",
    iconBg:
      "bg-rose-100 text-rose-600 border border-rose-200 shadow-[0_4px_12px_rgba(239,68,68,0.12)] group-hover:bg-rose-200/80 transition-colors duration-300",
    titleColor: "text-slate-900",
    numberColor: "text-rose-600 font-bold",
    descColor: "text-slate-600",
    glowColor: "bg-rose-400/20",
  },
  appointment: {
    outerBorder:
      "bg-gradient-to-br from-sky-200 via-cyan-300 to-blue-200 shadow-[0_10px_30px_rgba(14,165,233,0.12)] border border-sky-200/60 hover:shadow-[0_15px_35px_rgba(14,165,233,0.22)] transition-all duration-300",
    cardBg:
      "bg-gradient-to-br from-sky-50 via-cyan-50/70 to-white hover:from-sky-100/80 hover:via-cyan-100/70 hover:to-sky-50/90 text-slate-800 transition-colors duration-300",
    iconBg:
      "bg-sky-100 text-sky-600 border border-sky-200 shadow-[0_4px_12px_rgba(14,165,233,0.12)] group-hover:bg-sky-200/80 transition-colors duration-300",
    titleColor: "text-slate-900",
    numberColor: "text-sky-600 font-bold",
    descColor: "text-slate-600",
    glowColor: "bg-sky-400/20",
  },
  whatsapp: {
    outerBorder:
      "bg-gradient-to-br from-emerald-200 via-teal-300 to-green-200 shadow-[0_10px_30px_rgba(16,185,129,0.12)] border border-emerald-200/60 hover:shadow-[0_15px_35px_rgba(16,185,129,0.22)] transition-all duration-300",
    cardBg:
      "bg-gradient-to-br from-emerald-50 via-teal-50/70 to-white hover:from-emerald-100/80 hover:via-teal-100/70 hover:to-emerald-50/90 text-slate-800 transition-colors duration-300",
    iconBg:
      "bg-emerald-100 text-emerald-600 border border-emerald-200 shadow-[0_4px_12px_rgba(16,185,129,0.12)] group-hover:bg-emerald-200/80 transition-colors duration-300",
    titleColor: "text-slate-900",
    numberColor: "text-emerald-600 font-bold",
    descColor: "text-slate-600",
    glowColor: "bg-emerald-400/20",
  },
  email: {
    outerBorder:
      "bg-gradient-to-br from-amber-200 via-yellow-300 to-amber-200 shadow-[0_10px_30px_rgba(245,158,11,0.12)] border border-amber-200/60 hover:shadow-[0_15px_35px_rgba(245,158,11,0.22)] transition-all duration-300",
    cardBg:
      "bg-gradient-to-br from-amber-50 via-yellow-50/70 to-white hover:from-amber-100/80 hover:via-yellow-100/70 hover:to-amber-50/90 text-slate-800 transition-colors duration-300",
    iconBg:
      "bg-amber-100 text-amber-600 border border-amber-200 shadow-[0_4px_12px_rgba(245,158,11,0.12)] group-hover:bg-amber-200/80 transition-colors duration-300",
    titleColor: "text-slate-900",
    numberColor: "text-amber-700 font-bold",
    descColor: "text-slate-600",
    glowColor: "bg-amber-400/20",
  },
};

export default function ContactPage() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    department: "General Inquiry",
    subject: "",
    city: "",
    message: "",
  });

  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState("Jabalpur");

  // Madhya Pradesh Regional Reach List
  const mpDistricts = [
    {
      name: "Jabalpur",
      distance: "Main Campus Hub",
      feature: "24/7 Super-Specialty Hospital & Trauma Center",
    },
    {
      name: "Satna",
      distance: "180 km",
      feature: "Rapid Cardiac & Emergency Ambulance Transport",
    },
    {
      name: "Mandla",
      distance: "95 km",
      feature: "Tele-Consultation & Specialist Outreach Clinics",
    },
    {
      name: "Rewa",
      distance: "230 km",
      feature: "Oncology & Critical Care Referral Linkage",
    },
    {
      name: "Katni",
      distance: "90 km",
      feature: "Fast-Track Emergency Patient Transfer",
    },
    {
      name: "Seoni",
      distance: "140 km",
      feature: "Cardiology & Orthopaedic Rehabilitation Care",
    },
    {
      name: "Shahdol",
      distance: "185 km",
      feature: "Advanced Diagnostics & Tele-Pathology Support",
    },
    {
      name: "Sidhi",
      distance: "240 km",
      feature: "Direct Specialist Referral Network",
    },
    {
      name: "Tikamgarh",
      distance: "260 km",
      feature: "Tele-ICU Remote Monitoring Services",
    },
    {
      name: "Singrauli",
      distance: "300 km",
      feature: "Industrial Health & Trauma Emergency Care",
    },
    {
      name: "Panna",
      distance: "210 km",
      feature: "Outreach Preventive Health Checkup Camps",
    },
    {
      name: "Sagar",
      distance: "170 km",
      feature: "Robotic Joint & Cardiac Surgery Referral Desk",
    },
    {
      name: "Damoh",
      distance: "105 km",
      feature: "Dedicated Ambulance Dispatch Helpline",
    },
    {
      name: "Chhatarpur",
      distance: "220 km",
      feature: "Second Opinion & Tele-Medicine Services",
    },
    {
      name: "Narsinghpur",
      distance: "85 km",
      feature: "Express Emergency Ambulance Coverage",
    },
    {
      name: "Dindori",
      distance: "140 km",
      feature: "Maternal & Child Health Referral Desk",
    },
    {
      name: "Anuppur",
      distance: "210 km",
      feature: "Specialist OPD Consultation Camps",
    },
    {
      name: "Umaria",
      distance: "150 km",
      feature: "Neurology & Stroke Emergency Transfer",
    },
  ];

  const contactCards = [
    {
      type: "emergency",
      title: "24/7 Emergency Hotline",
      number: "+91 1800-123-6666",
      desc: "Immediate Trauma Care, Ambulance Dispatch & Critical Triage",
      icon: PhoneCall,
      highlight: true,
    },
    {
      type: "appointment",
      title: "Appointment Booking Desk",
      number: "+91 7566123666 ",
      desc: "OPD Appointments & Specialist Doctor Schedule",
      icon: Calendar,
      highlight: false,
    },
    {
      type: "whatsapp",
      title: "WhatsApp Support",
      number: "+91 9575308686",
      desc: "Chat with us on WhatsApp for Health Checkups, TPA & Insurance Assistance",
      icon: MessageCircle,
      highlight: false,
    },
    {
      type: "email",
      title: "Email & Helpdesk",
      number: "jabalpur_info@apollohospitals.com",
      desc: "General inquiries, feedback, and medical records assistance",
      icon: Mail,
      highlight: false,
    },
  ];

  const faqs = [
    {
      q: "Where is Apollo Hospital Jabalpur located and how do I navigate there?",
      a: "Apollo Hospital Jabalpur is conveniently situated on the main arterial corridor in Jabalpur, Madhya Pradesh. You can follow our live interactive Google Map embed above or navigate via GPS for direct entry to main OPD and Emergency gates.",
    },
    {
      q: "What emergency services are available 24/7 at the Jabalpur facility?",
      a: "Our emergency department operates round the clock with Level-1 Trauma Care, Cardiac Cath Lab standby, Stroke ICU, 24/7 Blood Bank, Diagnostic Imaging (CT/MRI), and advanced Cardiac Ambulances with ventilators.",
    },
    {
      q: "How does the Cashless Insurance / TPA Helpdesk work?",
      a: "We are empanelled with major insurance providers and TPAs. Visit our TPA desk located on the ground floor near admission counters with your e-card and doctor recommendation for hassle-free pre-authorization.",
    },
    {
      q: "What are the visiting hours for Patient Wards and Intensive Care Units (ICU)?",
      a: "General Wards: 4:00 PM – 6:00 PM daily. ICU / ICCU: 11:00 AM – 12:00 PM & 5:00 PM – 6:00 PM (1 visitor per patient pass to ensure strict infection control).",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const activeDistrict = mpDistricts.find((d) => d.name === selectedDistrict);

  return (
    <main className="relative min-h-screen bg-[#EDF6FB] text-slate-900 pt-38 pb-20 selection:bg-[#1D82A6] selection:text-white overflow-hidden">
      {/* ───── Scoped ambient styling ───── */}
      <style jsx>{`
        .cp-orb {
          position: absolute;
          border-radius: 9999px;
          pointer-events: none;
        }
        .cp-orb-1 {
          width: 380px;
          height: 380px;
          top: -140px;
          left: -100px;
          background: radial-gradient(circle, #bfe3f2, transparent 70%);
          opacity: 0.5;
          animation: cpFloat1 18s ease-in-out infinite;
        }
        .cp-orb-2 {
          width: 340px;
          height: 340px;
          top: 30%;
          right: -140px;
          background: radial-gradient(circle, #f3dfa8, transparent 70%);
          opacity: 0.45;
          animation: cpFloat2 22s ease-in-out infinite;
        }
        .cp-orb-3 {
          width: 300px;
          height: 300px;
          bottom: 0;
          left: 25%;
          background: radial-gradient(circle, #cdeaf7, transparent 70%);
          opacity: 0.4;
          animation: cpFloat1 20s ease-in-out infinite;
        }
        @keyframes cpFloat1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(40px, 40px) scale(1.08);
          }
        }
        @keyframes cpFloat2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-40px, 30px) scale(1.06);
          }
        }
      `}</style>

      {/* Ambient background orbs + dotted texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="cp-orb cp-orb-1" />
        <div className="cp-orb cp-orb-2" />
        <div className="cp-orb cp-orb-3" />
        <div
          className="absolute inset-0 opacity-[0.3]"
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
        {/* ───── Hero Banner Header ───── */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12"
        >
          <div className="relative p-[1.5px] rounded-[2rem] bg-gradient-to-br from-[#F6D98A]/80 via-[#1D82A6]/40 to-[#C8952E]/80 shadow-[0_30px_70px_rgba(10,95,122,0.35)]">
            <div className="relative rounded-[calc(2rem-1.5px)] overflow-hidden bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] p-8 sm:p-12 md:p-16 text-white">
              <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#F6D98A]/25 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#0B3446]/40 blur-3xl pointer-events-none" />
              <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px] pointer-events-none" />
              <HeartPulse className="absolute -right-10 -bottom-10 w-80 h-80 opacity-[0.07] text-white -rotate-12 pointer-events-none" />

              <div className="relative z-10 max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-[#FEF3C7] text-xs font-bold mb-6 shadow-inner"
                >
                  <Building className="w-4 h-4 text-[#F6D98A]" />
                  <span>
                    Apollo Hospital Jabalpur • Super-Specialty Medical Hub
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="font-serif-apollo text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-4"
                >
                  Contact Us &{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #F6D98A 0%, #FFFFFF 50%, #C8952E 100%)",
                    }}
                  >
                    Visit Apollo Jabalpur
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-slate-100/90 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl"
                >
                  We are dedicated to providing world-class healthcare with 24/7
                  emergency response, expert consultations, and seamless
                  regional medical connectivity across Madhya Pradesh.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-wrap items-center gap-4"
                >
                  <motion.a
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    href="tel:1800-123-6666"
                    className="relative flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 text-white font-extrabold text-xs shadow-[0_12px_30px_rgba(239,68,68,0.4)] border border-rose-300/40"
                  >
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/70 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
                    </span>
                    <PhoneCall className="w-4 h-4 animate-bounce" />
                    <span>Call Emergency Hotline: 1800-123-6666</span>
                  </motion.a>

                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsAppointmentModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-full text-[#3A2B0A] font-extrabold text-xs shadow-[0_12px_30px_rgba(200,149,46,0.45)] cursor-pointer"
                    style={goldStyle}
                  >
                    <Calendar className="w-4 h-4 animate-bounce" />
                    <span>Book Appointment Online</span>
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ───── Quick Contact Cards Grid (With Custom Themes) ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card, idx) => {
              const Icon = card.icon;
              const theme = cardThemes[card.type] || cardThemes.email;

              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className={`relative p-[1.5px] rounded-[1.75rem] cursor-default transition-all duration-300 ${theme.outerBorder}`}
                >
                  <div
                    className={`relative h-full rounded-[calc(1.75rem-1.5px)] p-6 flex flex-col justify-between overflow-hidden backdrop-blur-xl ${theme.cardBg}`}
                  >
                    {/* Background Ambient Glow Accent */}
                    <div
                      className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl pointer-events-none ${theme.glowColor}`}
                    />

                    {/* Ping Indicator for Highlighted Cards */}
                    {card.highlight && (
                      <span className="absolute top-5 right-5 flex h-2.5 w-2.5 z-10">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-400" />
                      </span>
                    )}

                    <div className="relative z-10">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-110 ${theme.iconBg}`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>

                      <h3 className={`font-serif-apollo text-base font-extrabold mb-1 ${theme.titleColor}`}>
                        {card.title}
                      </h3>

                      <div
                        className={`text-xs font-mono font-bold tracking-wide mb-2 break-all ${theme.numberColor}`}
                      >
                        {card.number}
                      </div>

                      <p className={`text-[11px] leading-relaxed font-normal ${theme.descColor}`}>
                        {card.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ───── SECTION 1: GOOGLE MAPS EMBED ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        >
          <div className="relative p-[1.5px] rounded-[2rem] bg-gradient-to-r from-[#1D82A6]/40 via-[#F6D98A]/50 to-[#C8952E]/50 shadow-[0_25px_60px_rgba(10,95,122,0.2)]">
            <div className="bg-white rounded-[calc(2rem-1.5px)] p-6 sm:p-8 relative overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 text-xs font-extrabold text-[#C8952E] uppercase tracking-wider mb-1">
                    <MapPin className="w-4 h-4 text-[#1D82A6]" />
                    <span>Hospital Navigation & Campus Map</span>
                  </div>
                  <h2 className="font-serif-apollo text-2xl sm:text-3xl font-black text-[#0B3446]">
                    Apollo Hospitals{" "}
                    <span
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, #1D82A6 0%, #0E526B 50%, #C8952E 100%)",
                      }}
                    >
                      Jabalpur Location
                    </span>
                  </h2>
                </div>

                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="https://maps.google.com/?q=Apollo+Hospital+Jabalpur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] text-[#FEF3C7] text-xs font-extrabold shadow-md shrink-0"
                >
                  <Navigation className="w-4 h-4 text-[#F6D98A]" />
                  <span>Open in Google Maps &rarr;</span>
                </motion.a>
              </div>

              {/* Map Frame Container */}
              <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden border border-[#1D82A6]/20 shadow-inner group">
                <iframe
                  title="Apollo JBP Hospitals Jabalpur Location"
                  src="https://www.google.com/maps?q=Apollo%20JBP%20Hospitals,%20Global%20Square,%20Patan%20Rd,%20Karmeta,%20Jabalpur,%20Madhya%20Pradesh%20482002&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter saturate-105"
                ></iframe>

                {/* Glowing Map Overlay Badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#1D82A6]/30 max-w-xs text-xs space-y-1.5 hidden sm:block"
                >
                  <div className="flex items-center gap-2 font-extrabold text-[#0E526B]">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Apollo JBP Hospitals</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Global Square, Patan Rd, Karmeta, Jabalpur, Madhya Pradesh
                    482002
                  </p>
                  <div className="text-[10px] text-[#1D82A6] font-bold">
                    Emergency 24/7 Gate Entry Available
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ───── SECTION 2: SERVICE REACH IN MADHYA PRADESH ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        >
          <div className="relative p-[1.5px] rounded-[2rem] bg-gradient-to-br from-[#F6D98A]/70 via-[#1D82A6]/40 to-[#C8952E]/70 shadow-[0_25px_60px_rgba(10,95,122,0.28)]">
            <div className="rounded-[calc(2rem-1.5px)] bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] p-6 sm:p-10 lg:p-12 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#F6D98A]/15 blur-3xl pointer-events-none" />
              <div className="absolute inset-0 opacity-[0.1] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

              <div className="relative z-10 mb-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#FEF3C7] text-xs font-bold mb-3 border border-white/25">
                  <Globe className="w-4 h-4 text-[#F6D98A]" />
                  <span>Regional Healthcare Leadership</span>
                </div>
                <h2 className="font-serif-apollo text-2xl sm:text-3xl lg:text-4xl font-black text-white">
                  Our Service Reach in{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #F6D98A 0%, #FFFFFF 60%, #C8952E 100%)",
                    }}
                  >
                    Madhya Pradesh
                  </span>
                </h2>
                <p className="text-slate-100/90 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed">
                  Apollo JBP Hospital is proud to serve patients across the
                  following key regions of Madhya Pradesh with 24/7 ambulance
                  dispatch, tele-consultation, and referral care.
                </p>
              </div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* District Selector Interactive Grid */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.2 }}
                  className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3"
                >
                  {mpDistricts.map((dist) => {
                    const isSelected = selectedDistrict === dist.name;
                    return (
                      <motion.button
                        key={dist.name}
                        variants={fadeUp}
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setSelectedDistrict(dist.name)}
                        className={`p-3 rounded-2xl text-left text-xs font-semibold transition-colors cursor-pointer flex items-center justify-between border ${
                          isSelected
                            ? "text-[#3A2B0A] font-extrabold border-[#F6D98A]/80 shadow-lg"
                            : "bg-white/10 hover:bg-white/20 text-white border-white/15"
                        }`}
                        style={isSelected ? goldStyle : undefined}
                      >
                        <span>{dist.name}</span>
                        {isSelected && (
                          <Sparkles className="w-3.5 h-3.5 text-[#3A2B0A] shrink-0" />
                        )}
                      </motion.button>
                    );
                  })}
                </motion.div>

                {/* Active Region Highlight Detail Card */}
                <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/20 text-white flex flex-col justify-between min-h-[320px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedDistrict}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-xs font-extrabold uppercase tracking-wider text-[#FEF3C7] mb-2">
                        Region Service Focus
                      </div>
                      <h3 className="font-serif-apollo text-2xl font-black text-white mb-2">
                        {selectedDistrict} District
                      </h3>

                      {activeDistrict && (
                        <div className="space-y-3 text-xs text-slate-100/95">
                          <div className="p-3 rounded-xl bg-black/20 border border-white/10">
                            <span className="font-extrabold text-[#F6D98A]">
                              Distance from Main Hub:
                            </span>{" "}
                            {activeDistrict.distance}
                          </div>

                          <div className="p-3 rounded-xl bg-black/20 border border-white/10 leading-relaxed">
                            <span className="font-extrabold text-emerald-300">
                              Specialized Services:
                            </span>{" "}
                            {activeDistrict.feature}
                          </div>

                          <p className="text-[11.5px] leading-relaxed opacity-90 pt-2">
                            Patients in {selectedDistrict} have direct access to
                            Apollo Jabalpur's express critical care transfer,
                            video consultations, and specialized surgical
                            admissions.
                          </p>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between">
                    <motion.a
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      href="tel:1800-123-6666"
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Regional Ambulance Helpline</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ───── SECTION 3: CONTACT FORM & VISITING HOURS ───── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 relative p-[1.5px] rounded-[1.75rem] bg-gradient-to-br from-[#1D82A6]/40 via-white to-[#F6D98A]/50 shadow-xl"
            >
              <div className="bg-white rounded-[calc(1.75rem-1.5px)] p-6 sm:p-10">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EDF6FB] text-[#0E526B] text-[11px] font-extrabold border border-[#1D82A6]/20 mb-3">
                    <Send className="w-3.5 h-3.5 text-[#C8952E] animate-bounce" />
                    Get In Touch
                  </div>
                  <h3 className="font-serif-apollo text-2xl font-black text-[#0B3446]">
                    Send Us a Message
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out the form below and our hospital administration team
                    will respond within 24 hours.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {formSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-3"
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
                      >
                        <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                      </motion.div>
                      <h4 className="font-serif-apollo text-xl font-black text-emerald-900">
                        Message Received Successfully!
                      </h4>
                      <p className="text-xs text-emerald-700 max-w-md mx-auto">
                        Thank you,{" "}
                        <span className="font-bold">{formData.name}</span>. Our
                        patient support desk has logged your inquiry regarding{" "}
                        <span className="font-bold">{formData.department}</span>{" "}
                        and will get in touch shortly.
                      </p>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => setFormSubmitted(false)}
                        className="px-6 py-2.5 rounded-full bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] text-white text-xs font-extrabold cursor-pointer"
                      >
                        Send Another Message
                      </motion.button>
                    </motion.div>
                  ) : (
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
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData({ ...formData, name: e.target.value })
                            }
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#1D82A6] text-slate-800 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1.5">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) =>
                              setFormData({ ...formData, phone: e.target.value })
                            }
                            placeholder="+91 98765 43210"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#1D82A6] text-slate-800 transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1.5">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData({ ...formData, email: e.target.value })
                            }
                            placeholder="your.email@example.com"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#1D82A6] text-slate-800 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1.5">
                            Department / Inquiry Type
                          </label>
                          <select
                            value={formData.department}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                department: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#1D82A6] text-slate-800 transition-colors"
                          >
                            <option>General Inquiry</option>
                            <option>Cardiology OPD</option>
                            <option>Neurology & Neurosurgery</option>
                            <option>Oncology / Cancer Care</option>
                            <option>TPA & Cashless Insurance</option>
                            <option>Emergency & Trauma Care</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1.5">
                          City
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) =>
                            setFormData({ ...formData, city: e.target.value })
                          }
                          placeholder="Enter Your City"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#1D82A6] text-slate-800 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1.5">
                          Subject
                        </label>
                        <input
                          type="text"
                          value={formData.subject}
                          onChange={(e) =>
                            setFormData({ ...formData, subject: e.target.value })
                          }
                          placeholder="Brief summary of your inquiry"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#1D82A6] text-slate-800 transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1.5">
                          Message / Details *
                        </label>
                        <textarea
                          rows={4}
                          required
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          placeholder="Please provide details about your medical query or assistance needed..."
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#1D82A6] text-slate-800 transition-colors resize-none"
                        />
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-4 rounded-xl text-white font-extrabold text-xs shadow-lg bg-gradient-to-r from-[#0A5F7A] to-[#2A8FAF] cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Message to Hospital Admin</span>
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Visiting Hours & Quick Info Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Visiting Hours Card */}
              <div className="p-6 sm:p-8 rounded-[1.75rem] bg-gradient-to-br from-[#0A5F7A] to-[#2A8FAF] text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-[#F6D98A]/15 blur-2xl pointer-events-none" />
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center border border-white/25">
                    <Clock className="w-5 h-5 text-[#F6D98A]" />
                  </div>
                  <div>
                    <h3 className="font-serif-apollo text-lg font-black">
                      Visiting Hours
                    </h3>
                    <p className="text-[11px] text-slate-200">
                      Strict adherence for patient safety
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-black/20 border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="font-extrabold block text-[#FEF3C7]">General Wards</span>
                      <span className="text-slate-200 text-[11px]">Daily Visiting</span>
                    </div>
                    <span className="font-mono font-bold bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                      4:00 PM – 6:00 PM
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-black/20 border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="font-extrabold block text-[#FEF3C7]">ICU & Critical Care</span>
                      <span className="text-slate-200 text-[11px]">1 Visitor / Pass</span>
                    </div>
                    <span className="font-mono font-bold bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                      11 AM & 5 PM
                    </span>
                  </div>
                </div>
              </div>

              {/* Insurance & TPA Desk Info */}
              <div className="p-6 sm:p-8 rounded-[1.75rem] bg-white border border-slate-200 shadow-xl">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EDF6FB] flex items-center justify-center border border-[#1D82A6]/20">
                    <ShieldCheck className="w-5 h-5 text-[#1D82A6]" />
                  </div>
                  <div>
                    <h3 className="font-serif-apollo text-base font-black text-[#0B3446]">
                      Cashless Insurance & TPA
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      Empanelled with 50+ Insurers
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Our dedicated TPA desk helps process pre-authorizations and
                  cashless claims smoothly. Bring your corporate insurance e-card
                  and valid photo ID.
                </p>
                <div className="text-xs font-extrabold text-[#0E526B] bg-[#EDF6FB] p-3 rounded-xl border border-[#1D82A6]/20 flex items-center justify-between">
                  <span>TPA Desk Helpline:</span>
                  <span className="font-mono">+91 7566123666</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───── SECTION 4: FAQ ACCORDION ───── */}
        {/* ───── SECTION 4: FAQ ACCORDION ───── */}
<section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
  {/* Header Section styled with Hero Theme */}
  <div className="text-center mb-10">
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-[#0E526B] text-xs font-extrabold border border-[#1D82A6]/20 shadow-md mb-3">
      <Zap className="w-4 h-4 text-[#C8952E] animate-pulse" />
      <span>Got Questions? We Have Answers</span>
    </div>

    <h2 className="font-serif-apollo text-3xl sm:text-4xl font-black text-[#0B3446]">
      Frequently Asked{" "}
      <span
        className="bg-clip-text text-transparent"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #1D82A6 0%, #0E526B 50%, #C8952E 100%)",
        }}
      >
        Questions
      </span>
    </h2>
    <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl mx-auto leading-relaxed">
      Find quick answers regarding hospital navigation, 24/7 emergency admission, visiting hours, and cashless insurance claims.
    </p>
  </div>

  {/* Accordion Container */}
  <div className="space-y-4">
    {faqs.map((faq, index) => {
      const isOpen = activeFaq === index;

      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08, duration: 0.5 }}
          className={`relative p-[1.5px] rounded-2xl transition-all duration-300 ${
            isOpen
              ? "bg-gradient-to-r from-[#F6D98A] via-[#1D82A6] to-[#C8952E] shadow-[0_12px_30px_rgba(10,95,122,0.18)] scale-[1.01]"
              : "bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 hover:from-[#1D82A6]/40 hover:to-[#C8952E]/40 shadow-sm"
          }`}
        >
          <div className="bg-white rounded-[calc(1rem-1.5px)] overflow-hidden">
            {/* Question Header Button */}
            <button
              onClick={() => setActiveFaq(isOpen ? null : index)}
              className={`w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer transition-all duration-300 ${
                isOpen
                  ? "bg-gradient-to-r from-[#0A5F7A]/5 via-white to-[#F6D98A]/10"
                  : "hover:bg-slate-50/80"
              }`}
            >
              <div className="flex items-center gap-3.5">
                {/* Number Badge with Hero Theme Gradients */}
                <span
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-xs font-mono font-bold shrink-0 transition-colors duration-300 ${
                    isOpen
                      ? "bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] text-[#FEF3C7] shadow-md border border-[#F6D98A]/40"
                      : "bg-slate-100 text-slate-500 border border-slate-200"
                  }`}
                >
                  {index < 9 ? `0${index + 1}` : index + 1}
                </span>

                <span
                  className={`font-serif-apollo font-extrabold text-sm sm:text-base transition-colors duration-300 ${
                    isOpen ? "text-[#0A5F7A]" : "text-[#0B3446]"
                  }`}
                >
                  {faq.q}
                </span>
              </div>

              {/* Toggle Chevron Icon with Animated Ring */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                  isOpen
                    ? "bg-[#1D82A6] text-white shadow-md rotate-180"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
              >
                <ChevronDown className="w-4 h-4 transition-transform duration-300" />
              </div>
            </button>

            {/* Answer Drawer */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                  <div className="px-5 sm:px-6 pb-6 pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/80 bg-gradient-to-b from-slate-50/50 to-white">
                    <div className="p-4 rounded-xl bg-[#EDF6FB]/60 border border-[#1D82A6]/15 text-slate-700">
                      {faq.a}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      );
    })}
  </div>
</section>
      </div>

      {/* Appointment Modal Component */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />
    </main>
  );
}