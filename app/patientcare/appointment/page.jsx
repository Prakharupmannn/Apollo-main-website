"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarPlus,
  Calendar,
  Clock,
  UserCheck,
  Stethoscope,
  PhoneCall,
  CheckCircle2,
  Sparkles,
  MessageCircle,
  Building2,
  ChevronRight,
  ShieldCheck,
  User,
  Phone,
  Mail,
  FileText,
  AlertCircle,
  HeartPulse,
} from "lucide-react";
import AppointmentModal from "../../../components/components/AppointmentModal";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const goldGradient = {
  background: "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
};

export default function MakeAppointmentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Doctor/Specialty, 2: Slot, 3: Details, 4: Confirmed

  const [booking, setBooking] = useState({
    department: "Cardiology",
    doctor: "Dr. Vivek Gupta",
    date: new Date().toISOString().split("T")[0],
    slot: "10:30 AM",
    patientName: "",
    patientPhone: "",
    patientEmail: "",
    notes: "",
  });

  const doctorsList = [
    { name: "Dr. Vivek Gupta", dept: "Cardiology", qual: "MD, DM (Cardiology)", exp: "24+ Yrs Exp", fee: "₹800" },
    { name: "Dr. Rajeev Verma", dept: "Oncology", qual: "MCh (Surgical Oncology)", exp: "22+ Yrs Exp", fee: "₹900" },
    { name: "Dr. Alok Agrawal", dept: "Gastroenterology", qual: "DM (Gastroenterology)", exp: "18+ Yrs Exp", fee: "₹750" },
    { name: "Dr. Nitin Saxena", dept: "Neurology", qual: "MCh (Neurosurgery)", exp: "19+ Yrs Exp", fee: "₹850" },
    { name: "Dr. Deepak Shrivastava", dept: "Orthopaedics", qual: "MS (Ortho), MCh (UK)", exp: "21+ Yrs Exp", fee: "₹800" },
    { name: "Dr. Prashant Choubey", dept: "Nephrology", qual: "DM (Nephrology)", exp: "17+ Yrs Exp", fee: "₹750" },
    { name: "Dr. Saurabh Dubey", dept: "Critical Care", qual: "MD, IDCCM", exp: "18+ Yrs Exp", fee: "₹800" },
  ];

  const timeSlots = ["09:30 AM", "10:30 AM", "11:30 AM", "02:00 PM", "04:30 PM", "06:00 PM"];

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    else if (step === 3) setStep(4);
  };

  return (
    <main className="relative min-h-screen bg-[#EDF6FB] text-slate-900 pt-38 pb-20 selection:bg-[#1D82A6] selection:text-white overflow-hidden">
      {/* ───── Background Orbs ───── */}
      <style jsx>{`
        .apt-orb {
          position: absolute;
          border-radius: 9999px;
          pointer-events: none;
        }
        .apt-orb-1 {
          width: 380px;
          height: 380px;
          top: -120px;
          left: -100px;
          background: radial-gradient(circle, #bfe3f2, transparent 70%);
          opacity: 0.5;
          animation: aptFloat1 16s ease-in-out infinite;
        }
        .apt-orb-2 {
          width: 340px;
          height: 340px;
          top: 30%;
          right: -120px;
          background: radial-gradient(circle, #f3dfa8, transparent 70%);
          opacity: 0.45;
          animation: aptFloat2 20s ease-in-out infinite;
        }
        @keyframes aptFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 40px) scale(1.08); }
        }
        @keyframes aptFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.06); }
        }
      `}</style>

      {/* Dotted texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="apt-orb apt-orb-1" />
        <div className="apt-orb apt-orb-2" />
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
          className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10"
        >
          <div className="relative p-[1.5px] rounded-[2rem] bg-gradient-to-br from-[#F6D98A]/80 via-[#1D82A6]/40 to-[#C8952E]/80 shadow-[0_30px_70px_rgba(10,95,122,0.35)]">
            <div className="relative rounded-[calc(2rem-1.5px)] overflow-hidden bg-gradient-to-tr from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] p-8 sm:p-12 md:p-16 text-white">
              <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#F6D98A]/25 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#0B3446]/40 blur-3xl pointer-events-none" />
              <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px] pointer-events-none" />
              <CalendarPlus className="absolute -right-10 -bottom-10 w-80 h-80 opacity-[0.06] text-white -rotate-12 pointer-events-none" />

              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-[#FEF3C7] text-xs font-bold mb-6 shadow-inner">
                  <Sparkles className="w-4 h-4 text-[#F6D98A] animate-pulse" />
                  <span>Official Online Booking Portal • Apollo Hospitals Jabalpur</span>
                </div>

                <h1 className="font-serif-apollo text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-4">
                  Book Your Doctor{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #F6D98A 0%, #FFFFFF 50%, #C8952E 100%)",
                    }}
                  >
                    Appointment
                  </span>
                </h1>

                <p className="text-slate-100/90 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
                  Select your preferred specialist doctor, date, and time slot. Enjoy priority registration and instant SMS/WhatsApp confirmation.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="https://wa.me/9575308686?text=Hello%20Apollo%20Jabalpur,%20I%20want%20to%20book%20an%20appointment"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-full bg-emerald-600 text-white font-extrabold text-xs shadow-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Instant WhatsApp Booking (+91 9575308686)</span>
                  </a>

                  <a
                    href="tel:18001236666"
                    className="px-6 py-3.5 rounded-full bg-rose-600 text-white font-extrabold text-xs shadow-md hover:bg-rose-700 transition-colors flex items-center gap-2"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Tollfree Helpline: 1800-123-6666</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ───── Step Wizard & Form ───── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="relative p-[1.5px] rounded-[2rem] bg-gradient-to-br from-[#1D82A6]/40 via-white to-[#C8952E]/50 shadow-2xl">
            <div className="bg-white rounded-[calc(2rem-1.5px)] p-6 sm:p-10">
              
              {/* Stepper Header */}
              {step < 4 && (
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-100">
                  {[
                    { num: 1, title: "Doctor & Specialty" },
                    { num: 2, title: "Date & Time Slot" },
                    { num: 3, title: "Patient Details" },
                  ].map((s) => (
                    <div key={s.num} className="flex items-center gap-2">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                          step >= s.num
                            ? "bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] text-white shadow-md"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {s.num}
                      </div>
                      <span className={`text-xs font-bold hidden sm:inline ${step >= s.num ? "text-[#0B3446]" : "text-slate-400"}`}>
                        {s.title}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <AnimatePresence mode="wait">
                {/* STEP 1: SELECT DOCTOR & SPECIALTY */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-serif-apollo text-xl font-black text-[#0B3446] mb-1">
                        Select Specialty & Doctor
                      </h3>
                      <p className="text-xs text-slate-500">Choose your required clinical department or doctor for consultation.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {doctorsList.map((doc, idx) => {
                        const isSelected = booking.doctor === doc.name;
                        return (
                          <div
                            key={idx}
                            onClick={() => setBooking({ ...booking, doctor: doc.name, department: doc.dept })}
                            className={`p-4 rounded-2xl cursor-pointer border transition-all duration-200 flex flex-col justify-between ${
                              isSelected
                                ? "bg-[#EDF6FB] border-[#1D82A6] shadow-md translate-x-1"
                                : "bg-white border-slate-200 hover:border-[#1D82A6]/40 hover:bg-slate-50"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <div className="text-xs font-black text-[#0B3446]">{doc.name}</div>
                                <div className="text-[11px] font-extrabold text-[#0E526B]">{doc.dept}</div>
                                <div className="text-[10px] text-slate-500">{doc.qual}</div>
                              </div>
                              <span className="text-[10px] font-bold text-[#C8952E] bg-[#FEF3C7] px-2 py-0.5 rounded-full shrink-0">
                                {doc.exp}
                              </span>
                            </div>

                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                              <span className="text-slate-500">OPD Consultation Fee:</span>
                              <span className="font-extrabold text-[#0B3446]">{doc.fee}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-4 flex justify-end">
                      <button
                        onClick={() => setStep(2)}
                        className="px-8 py-3.5 rounded-xl text-xs font-extrabold text-[#3A2B0A] shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                        style={goldGradient}
                      >
                        <span>Next: Pick Date & Slot</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: SELECT DATE & SLOT */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-serif-apollo text-xl font-black text-[#0B3446] mb-1">
                        Select Preferred Date & Time Slot
                      </h3>
                      <p className="text-xs text-slate-500">Consultation with <span className="font-bold text-[#0E526B]">{booking.doctor}</span> ({booking.department}).</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 mb-2">
                          Appointment Date *
                        </label>
                        <input
                          type="date"
                          value={booking.date}
                          min={new Date().toISOString().split("T")[0]}
                          onChange={(e) => setBooking({ ...booking, date: e.target.value })}
                          className="w-full sm:w-64 px-4 py-3 rounded-xl border border-slate-300 font-semibold text-xs focus:border-[#1D82A6] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-extrabold text-slate-700 mb-2">
                          Available OPD Time Slots *
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {timeSlots.map((slot) => {
                            const isSelected = booking.slot === slot;
                            return (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => setBooking({ ...booking, slot })}
                                className={`py-3 px-4 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                                  isSelected
                                    ? "bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] text-white shadow-md"
                                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                                }`}
                              >
                                <Clock className="w-3.5 h-3.5" />
                                <span>{slot}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-6 py-3 rounded-xl text-xs font-extrabold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                      >
                        Back
                      </button>

                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="px-8 py-3.5 rounded-xl text-xs font-extrabold text-[#3A2B0A] shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                        style={goldGradient}
                      >
                        <span>Next: Patient Details</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: PATIENT INFORMATION */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    className="space-y-6"
                  >
                    <div>
                      <h3 className="font-serif-apollo text-xl font-black text-[#0B3446] mb-1">
                        Patient Information & Contact
                      </h3>
                      <p className="text-xs text-slate-500">Provide details for instant booking SMS confirmation.</p>
                    </div>

                    <form onSubmit={handleNextStep} className="space-y-4 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1.5">
                            Patient Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            value={booking.patientName}
                            onChange={(e) => setBooking({ ...booking, patientName: e.target.value })}
                            placeholder="e.g. Rajesh Kumar"
                            className="w-full px-3.5 py-3 rounded-xl border border-slate-300 focus:border-[#1D82A6] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1.5">
                            Mobile Number (for SMS & WhatsApp) *
                          </label>
                          <input
                            type="tel"
                            required
                            value={booking.patientPhone}
                            onChange={(e) => setBooking({ ...booking, patientPhone: e.target.value })}
                            placeholder="+91 98765 43210"
                            className="w-full px-3.5 py-3 rounded-xl border border-slate-300 focus:border-[#1D82A6] focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1.5">
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          value={booking.patientEmail}
                          onChange={(e) => setBooking({ ...booking, patientEmail: e.target.value })}
                          placeholder="rajesh@example.com"
                          className="w-full px-3.5 py-3 rounded-xl border border-slate-300 focus:border-[#1D82A6] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1.5">
                          Symptoms / Reason for Visit (Optional)
                        </label>
                        <textarea
                          rows={3}
                          value={booking.notes}
                          onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                          placeholder="Brief description of symptoms..."
                          className="w-full px-3.5 py-3 rounded-xl border border-slate-300 focus:border-[#1D82A6] focus:outline-none resize-none"
                        />
                      </div>

                      <div className="pt-4 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="px-6 py-3 rounded-xl text-xs font-extrabold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                        >
                          Back
                        </button>

                        <button
                          type="submit"
                          className="px-8 py-3.5 rounded-xl text-xs font-extrabold text-[#3A2B0A] shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                          style={goldGradient}
                        >
                          <span>Confirm & Complete Booking</span>
                          <CheckCircle2 className="w-4 h-4 text-[#3A2B0A]" />
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* STEP 4: CONFIRMED */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="p-8 text-center space-y-6"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xl">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-serif-apollo text-2xl font-black text-emerald-950">
                        Appointment Confirmed Successfully!
                      </h3>
                      <p className="text-xs text-slate-600 max-w-md mx-auto">
                        Thank you, <span className="font-bold text-[#0B3446]">{booking.patientName || "Patient"}</span>. Your appointment pass has been registered.
                      </p>
                    </div>

                    <div className="bg-[#EDF6FB] p-6 rounded-2xl border border-[#1D82A6]/20 max-w-md mx-auto text-left text-xs space-y-2 font-mono shadow-sm">
                      <div className="flex justify-between"><span className="font-bold text-slate-600">Booking Pass ID:</span> <span className="font-bold text-[#0A5F7A]">APO-JBP-8842</span></div>
                      <div className="flex justify-between"><span className="font-bold text-slate-600">Doctor:</span> <span className="font-bold text-[#0B3446]">{booking.doctor}</span></div>
                      <div className="flex justify-between"><span className="font-bold text-slate-600">Department:</span> <span className="font-bold text-[#0E526B]">{booking.department}</span></div>
                      <div className="flex justify-between"><span className="font-bold text-slate-600">Date & Slot:</span> <span className="font-bold text-[#C8952E]">{booking.date} at {booking.slot}</span></div>
                      <div className="flex justify-between"><span className="font-bold text-slate-600">Location:</span> <span className="font-bold text-slate-800">Global Square, Patan Rd, Karmeta, Jabalpur</span></div>
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        onClick={() => setStep(1)}
                        className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#0A5F7A] text-white text-xs font-extrabold cursor-pointer"
                      >
                        Book Another Appointment
                      </button>

                      <a
                        href="https://wa.me/9575308686?text=Hello%20Apollo%20Jabalpur,%20I%20have%20booked%20appointment%20pass%20APO-JBP-8842"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-600 text-white text-xs font-extrabold cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Send to WhatsApp</span>
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

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
                    Apollo JBP Hospitals • Jabalpur, MP
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    For walk-in OPD registration: Global Square, Patan Rd, Karmeta, Jabalpur 482002.
                  </p>
                </div>
              </div>

              <a
                href="tel:18001236666"
                className="px-6 py-3 rounded-full text-xs font-extrabold bg-rose-600 text-white shadow-md hover:bg-rose-700 transition-colors shrink-0"
              >
                Emergency Call: 1800-123-6666
              </a>
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
