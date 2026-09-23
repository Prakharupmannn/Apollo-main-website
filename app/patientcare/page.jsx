"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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

  return (
    <main className="relative min-h-screen bg-[#EDF6FB] text-slate-900 pt-38 pb-20 selection:bg-[#1D82A6] selection:text-white overflow-hidden">
      {/* ───── Background Orbs ───── */}
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
        @keyframes pcFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 40px) scale(1.08); }
        }
        @keyframes pcFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.06); }
        }
      `}</style>

      {/* Dotted texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="pc-orb pc-orb-1" />
        <div className="pc-orb pc-orb-2" />
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
        {/* ───── Hero Header Section ───── */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12"
        >
          <div className="relative p-[1.5px] rounded-[2rem] bg-gradient-to-br from-[#F6D98A]/80 via-[#1D82A6]/40 to-[#C8952E]/80 shadow-[0_30px_70px_rgba(10,95,122,0.35)]">
            <div className="relative rounded-[calc(2rem-1.5px)] overflow-hidden bg-gradient-to-tr from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] p-8 sm:p-12 md:p-16 text-white">
              <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#F6D98A]/25 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#0B3446]/40 blur-3xl pointer-events-none" />
              <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px] pointer-events-none" />
              <Heart className="absolute -right-10 -bottom-10 w-80 h-80 opacity-[0.06] text-white -rotate-12 pointer-events-none" />

              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-[#FEF3C7] text-xs font-bold mb-6 shadow-inner">
                  <Sparkles className="w-4 h-4 text-[#F6D98A] animate-pulse" />
                  <span>Patient-Centred Healthcare • Apollo Hospitals Jabalpur</span>
                </div>

                <h1 className="font-serif-apollo text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-4">
                  Comprehensive{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #F6D98A 0%, #FFFFFF 50%, #C8952E 100%)",
                    }}
                  >
                    Patient Care Portal
                  </span>
                </h1>

                <p className="text-slate-100/90 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
                  Dedicated to making your hospital experience seamless, transparent, and compassionate. Access appointment bookings, ambulance services, clinical case studies, and health camps easily.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setIsAppointmentModalOpen(true)}
                    className="px-6 py-3.5 rounded-full text-xs font-extrabold text-[#3A2B0A] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
                    style={goldGradient}
                  >
                    <CalendarPlus className="w-4 h-4" />
                    <span>Book Appointment</span>
                  </button>

                  <a
                    href="tel:18001236666"
                    className="px-6 py-3.5 rounded-full bg-rose-600 text-white font-extrabold text-xs shadow-md hover:bg-rose-700 transition-colors flex items-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Emergency: 1800-123-6666</span>
                  </a>
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
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#0E526B] text-xs font-extrabold border border-[#1D82A6]/30 shadow-sm mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#C8952E]" />
              Explore Patient Care Services
            </span>
            <h2 className="font-serif-apollo text-2xl sm:text-4xl font-black text-[#0B3446]">
              Everything You Need for Your Healthcare Journey
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patientServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="relative p-[1.5px] rounded-[1.75rem] bg-gradient-to-br from-[#1D82A6]/40 via-white to-[#C8952E]/50 shadow-[0_10px_30px_rgba(10,95,122,0.12)] hover:shadow-[0_20px_45px_rgba(10,95,122,0.25)] transition-all group flex flex-col justify-between"
                >
                  <div className="h-full rounded-[calc(1.75rem-1.5px)] bg-white p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${service.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
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
            <div className="rounded-[calc(2rem-1.5px)] bg-white p-8 sm:p-12">
              <div className="max-w-2xl mb-8">
                <div className="flex items-center gap-2 text-xs font-extrabold text-[#C8952E] uppercase tracking-wider mb-1">
                  <Building2 className="w-4 h-4 text-[#1D82A6]" />
                  <span>World-Class Inpatient Facilities</span>
                </div>
                <h2 className="font-serif-apollo text-2xl sm:text-3xl font-black text-[#0B3446]">
                  Your Comfort & Safety Are Our Highest Priority
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inpatientAmenities.map((item, i) => {
                  const AIcon = item.icon;
                  return (
                    <div
                      key={i}
                      className="p-5 rounded-2xl bg-[#EDF6FB]/80 border border-[#1D82A6]/15 hover:border-[#1D82A6]/40 transition-all flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A5F7A] to-[#17627D] text-[#F6D98A] flex items-center justify-center shadow-md shrink-0">
                        <AIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-[#0B3446] mb-1">{item.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ───── Trust Footer Banner ───── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
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

              <button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="px-6 py-3 rounded-full text-xs font-extrabold text-[#3A2B0A] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer shrink-0"
                style={goldGradient}
              >
                Book Appointment Online
              </button>
            </div>
          </div>
        </section>
      </div>

      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />
    </main>
  );
}