"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PartyPopper,
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Sparkles,
  HeartPulse,
  Award,
  Building2,
  PhoneCall,
  UserCheck,
  ChevronRight,
  Ticket,
  Share2,
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

const goldGradient = {
  background: "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
};

export default function EventsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registeredEvent, setRegisteredEvent] = useState(null);
  const [regForm, setRegForm] = useState({ name: "", phone: "", seats: "1" });
  const [regSuccess, setRegSuccess] = useState(false);

  const eventsList = [
    {
      id: "cardiac-camp",
      title: "Mega Free Cardiac Screening & ECG Health Camp",
      date: "Sunday, October 15, 2026",
      time: "09:00 AM – 04:00 PM",
      location: "Main Auditorium, Apollo JBP Hospitals, Global Square Patan Rd, Karmeta, Jabalpur",
      badge: "Free Registration",
      accent: "from-[#0E526B] via-[#1D82A6] to-[#0B3446]",
      desc: "Free blood sugar test, ECG, lipid profile evaluation, and consultation with Apollo senior cardiologists.",
      perks: ["Free ECG & Random Blood Sugar Test", "Senior Cardiologist Consultation", "20% Discount on Echo & TMT Tests"],
    },
    {
      id: "blood-donation",
      title: "Apollo Community Mega Blood Donation Drive",
      date: "Saturday, October 28, 2026",
      time: "10:00 AM – 03:00 PM",
      location: "Blood Transfusion Unit, Apollo Hospitals Jabalpur",
      badge: "Community Initiative",
      accent: "from-rose-600 via-rose-500 to-[#881337]",
      desc: "Donate blood and help save lives across Mahakoshal region. Donor certificates & refreshment hampers provided.",
      perks: ["Free Blood Grouping & Hemoglobin Check", "Donor Certificate & Refreshment Pass", "Emergency Priority Blood Donor Card"],
    },
    {
      id: "cme-conference",
      title: "CME Conference on Recent Advances in CyberKnife Radiosurgery",
      date: "Saturday, November 11, 2026",
      time: "05:00 PM – 09:00 PM",
      location: "Grand Hotel Conference Hall, Jabalpur",
      badge: "Medical CME (3 Credit Hours)",
      accent: "from-[#9F1239] via-[#C8952E] to-[#0E526B]",
      desc: "Specialist symposium for practicing doctors and oncologists highlighting sub-millimeter precision tumor radiosurgery.",
      perks: ["3 MP Medical Council CME Credit Hours", "Case Discussions & International Faculty", "Dinner & Networking Session"],
    },
    {
      id: "womens-wellness",
      title: "Women's Health & Breast Cancer Awareness Summit",
      date: "Sunday, November 26, 2026",
      time: "10:00 AM – 02:00 PM",
      location: "Apollo JBP Hospitals OPD Complex",
      badge: "Women Wellness",
      accent: "from-[#2A8FAF] via-[#0A5F7A] to-[#C8952E]",
      desc: "Educational workshop on self-breast examination, cervical cancer screening (Pap Smear), and PCOS management.",
      perks: ["Free Mammography Screening Voucher", "Consultation with Gynec-Oncologist", "Wellness Nutrition Guide Kit"],
    },
  ];

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegSuccess(true);
  };

  return (
    <main className="relative min-h-screen bg-[#EDF6FB] text-slate-900 pt-38 pb-20 selection:bg-[#1D82A6] selection:text-white overflow-hidden">
      {/* ───── Background Orbs ───── */}
      <style jsx>{`
        .ev-orb {
          position: absolute;
          border-radius: 9999px;
          pointer-events: none;
        }
        .ev-orb-1 {
          width: 380px;
          height: 380px;
          top: -120px;
          left: -100px;
          background: radial-gradient(circle, #bfe3f2, transparent 70%);
          opacity: 0.5;
          animation: evFloat1 16s ease-in-out infinite;
        }
        .ev-orb-2 {
          width: 340px;
          height: 340px;
          top: 30%;
          right: -120px;
          background: radial-gradient(circle, #f3dfa8, transparent 70%);
          opacity: 0.45;
          animation: evFloat2 20s ease-in-out infinite;
        }
        @keyframes evFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 40px) scale(1.08); }
        }
        @keyframes evFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.06); }
        }
      `}</style>

      {/* Dotted texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="ev-orb ev-orb-1" />
        <div className="ev-orb ev-orb-2" />
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
              <PartyPopper className="absolute -right-10 -bottom-10 w-80 h-80 opacity-[0.06] text-white -rotate-12 pointer-events-none" />

              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-[#FEF3C7] text-xs font-bold mb-6 shadow-inner">
                  <Sparkles className="w-4 h-4 text-[#F6D98A] animate-pulse" />
                  <span>Apollo Community Outreach • Events & Health Camps</span>
                </div>

                <h1 className="font-serif-apollo text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-4">
                  Events, Health Camps &{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #F6D98A 0%, #FFFFFF 50%, #C8952E 100%)",
                    }}
                  >
                    Medical Conferences
                  </span>
                </h1>

                <p className="text-slate-100/90 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
                  Join our free cardiac health screening camps, blood donation drives, women's wellness summits, and doctor CME conferences at Apollo Hospitals Jabalpur.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="tel:18001236666"
                    className="px-6 py-3.5 rounded-full bg-rose-600 text-white font-extrabold text-xs shadow-md hover:bg-rose-700 transition-colors flex items-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Event Desk: 1800-123-6666</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ───── Upcoming Events Grid ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mb-16"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-serif-apollo text-2xl font-black text-[#0B3446]">
              Upcoming Events & Health Camps
            </h2>
            <span className="text-xs font-bold text-[#C8952E] bg-[#FEF3C7] px-3 py-1 rounded-full border border-[#F6D98A]">
              Free Entry / Registration Open
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {eventsList.map((ev) => (
              <motion.div
                key={ev.id}
                variants={fadeUp}
                className="relative p-[1.5px] rounded-[2rem] bg-gradient-to-br from-[#1D82A6]/40 via-white to-[#C8952E]/50 shadow-[0_10px_30px_rgba(10,95,122,0.12)] hover:shadow-xl transition-all"
              >
                <div className="bg-white rounded-[calc(2rem-1.5px)] p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#EDF6FB] text-[#0E526B] border border-[#1D82A6]/20">
                        {ev.badge}
                      </span>
                      <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#1D82A6]" />
                        {ev.date}
                      </span>
                    </div>

                    <h3 className="font-serif-apollo text-xl font-black text-[#0B3446] mb-2">
                      {ev.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {ev.desc}
                    </p>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2 font-semibold text-slate-700">
                        <Clock className="w-4 h-4 text-[#C8952E] shrink-0" />
                        <span>{ev.time}</span>
                      </div>
                      <div className="flex items-start gap-2 font-semibold text-slate-700">
                        <MapPin className="w-4 h-4 text-[#1D82A6] shrink-0 mt-0.5" />
                        <span>{ev.location}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Key Event Benefits:</span>
                      {ev.perks.map((p, pIdx) => (
                        <div key={pIdx} className="flex items-center gap-2 text-xs font-semibold text-[#0B3446]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1D82A6] shrink-0" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setRegisteredEvent(ev);
                      setRegSuccess(false);
                    }}
                    className="w-full py-3 rounded-xl text-xs font-extrabold text-[#3A2B0A] shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                    style={goldGradient}
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Register Free Pass</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ───── Registration Modal ───── */}
        <AnimatePresence>
          {registeredEvent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-[#1D82A6] relative"
              >
                {!regSuccess ? (
                  <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#C8952E]">Free Event Pass</span>
                      <h3 className="font-serif-apollo text-xl font-black text-[#0B3446]">{registeredEvent.title}</h3>
                      <p className="text-[11px] text-slate-500 mt-1">{registeredEvent.date} • {registeredEvent.time}</p>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={regForm.name}
                        onChange={(e) => setRegForm({ ...regForm, name: e.target.value })}
                        placeholder="e.g. Anjali Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#1D82A6] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Phone Number (for SMS Pass) *</label>
                      <input
                        type="tel"
                        required
                        value={regForm.phone}
                        onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#1D82A6] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Number of Attendees *</label>
                      <select
                        value={regForm.seats}
                        onChange={(e) => setRegForm({ ...regForm, seats: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#1D82A6] focus:outline-none font-semibold"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons</option>
                        <option value="3">3 Persons</option>
                        <option value="4">Family (4 Persons)</option>
                      </select>
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setRegisteredEvent(null)}
                        className="px-4 py-2.5 rounded-xl text-slate-500 hover:bg-slate-100 font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl text-[#3A2B0A] font-extrabold shadow-md cursor-pointer"
                        style={goldGradient}
                      >
                        Generate Entry Pass
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center space-y-4 py-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                      <Ticket className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif-apollo text-xl font-black text-emerald-900">
                      Event Entry Pass Generated!
                    </h3>
                    <p className="text-xs text-slate-600">
                      Registered for <span className="font-bold">{regForm.name}</span> ({regForm.seats} Seat/s).
                    </p>
                    <div className="bg-[#EDF6FB] p-4 rounded-2xl border border-[#1D82A6]/20 font-mono text-left text-xs space-y-1">
                      <div><span className="font-bold text-slate-700">Pass Code:</span> <span className="text-[#0A5F7A] font-bold">EVT-JBP-7712</span></div>
                      <div><span className="font-bold text-slate-700">Event:</span> {registeredEvent.title}</div>
                      <div><span className="font-bold text-slate-700">Date & Venue:</span> {registeredEvent.date} at Apollo JBP Hospitals</div>
                    </div>
                    <button
                      onClick={() => setRegisteredEvent(null)}
                      className="px-6 py-2.5 rounded-full bg-[#0A5F7A] text-white font-extrabold cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

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
                    Apollo JBP Hospitals • Community Health Desk
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    For bulk camp organizing or doctor CME queries: 1800-123-6666 / 7566 123666.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 rounded-full text-xs font-extrabold text-[#3A2B0A] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer shrink-0"
                style={goldGradient}
              >
                Contact Event Team
              </button>
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
