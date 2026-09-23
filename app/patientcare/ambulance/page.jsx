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
    { name: "Portable ICU Ventilator", desc: "Advanced mechanical breathing support for respiratory distress during transport.", icon: Zap },
    { name: "Biphasic Defibrillator & Pacemaker", desc: "Immediate cardiac resuscitation for ventricular fibrillation or cardiac arrest.", icon: HeartPulse },
    { name: "Multi-Para Cardiac Monitor", desc: "Real-time tracking of ECG, SpO2, NIBP, and Capnography.", icon: Activity },
    { name: "Syringe & Infusion Pumps", desc: "Precise intravenous administration of emergency cardiac & vasopressor medications.", icon: ShieldCheck },
    { name: "Central Medical Oxygen Cylinders", desc: "Dual high-capacity oxygen cylinders for continuous high-flow oxygenation.", icon: Flame },
    { name: "Trauma Splints & Cervical Collars", desc: "Spine immobilization and fracture stabilization for highway crash victims.", icon: ShieldAlert },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="relative min-h-screen bg-[#EDF6FB] text-slate-900 pt-38 pb-20 selection:bg-rose-500 selection:text-white overflow-hidden">
      {/* ───── Background Orbs ───── */}
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
        <div className="bg-gradient-to-r from-rose-950 via-red-900 to-rose-950 text-white py-3 px-4 border-b border-rose-500/30 shadow-lg mb-8">
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
        </div>

        {/* ───── Hero Header Section ───── */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12"
        >
          <div className="relative p-[1.5px] rounded-[2rem] bg-gradient-to-br from-rose-400/80 via-[#F6D98A]/50 to-[#1D82A6]/80 shadow-[0_30px_70px_rgba(159,18,57,0.35)]">
            <div className="relative rounded-[calc(2rem-1.5px)] overflow-hidden bg-gradient-to-tr from-[#881337] via-[#9F1239] to-[#0E526B] p-8 sm:p-12 md:p-16 text-white">
              <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-rose-500/25 blur-3xl pointer-events-none animate-pulse" />
              <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#1D82A6]/30 blur-3xl pointer-events-none" />
              <div className="absolute inset-0 opacity-[0.12] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px] pointer-events-none" />
              <Ambulance className="absolute -right-10 -bottom-10 w-80 h-80 opacity-[0.06] text-white -rotate-12 pointer-events-none" />

              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-400/60 text-rose-200 text-xs font-bold mb-6 shadow-xl">
                  <Siren className="w-4 h-4 text-rose-400 animate-pulse" />
                  <span>24/7 Mobile ICU Ambulance • Doctor-on-Board Response</span>
                </div>

                <h1 className="font-serif-apollo text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-4">
                  24/7 Emergency{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #F6D98A 0%, #FFFFFF 50%, #F9A8B8 100%)",
                    }}
                  >
                    Ambulance Services
                  </span>
                </h1>

                <p className="text-rose-100 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
                  High-tech cardiac ACLS ambulances equipped with portable ventilators, biphasic defibrillators, multi-para monitors, and trained emergency doctors servicing Jabalpur and all surrounding MP districts.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="tel:18001236666"
                    className="px-8 py-4 rounded-full bg-rose-600 text-white font-extrabold text-sm shadow-[0_0_30px_rgba(244,63,94,0.65)] border border-rose-200 hover:bg-rose-500 transition-all flex items-center gap-3 cursor-pointer"
                  >
                    <PhoneCall className="w-5 h-5 animate-bounce" />
                    <span>Call Tollfree Hotline: 1800-123-6666</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ───── Express Dispatch Request Form ───── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
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
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 text-white font-extrabold text-xs shadow-lg hover:shadow-rose-600/40 cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Ambulance className="w-4 h-4" />
                        <span>Dispatch Emergency Ambulance Now</span>
                      </button>
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
                    <div className="w-16 h-16 rounded-full bg-rose-600 text-white flex items-center justify-center mx-auto shadow-xl">
                      <Ambulance className="w-8 h-8 animate-bounce" />
                    </div>

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
                      <a
                        href="tel:18001236666"
                        className="px-6 py-2.5 rounded-full bg-rose-600 text-white font-extrabold text-xs shadow-md"
                      >
                        Call Driver Control (1800-123-6666)
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ───── Mobile ICU Equipment Inventory ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#0E526B] text-xs font-extrabold border border-[#1D82A6]/30 shadow-sm mb-3">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />
              Advanced Life Support Equipment
            </span>
            <h2 className="font-serif-apollo text-2xl sm:text-4xl font-black text-[#0B3446]">
              Mobile ICU Capabilities on Wheels
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {icuEquipment.map((eq, idx) => {
              const EIcon = eq.icon;
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#EDF6FB] text-[#0E526B] flex items-center justify-center mb-4">
                      <EIcon className="w-6 h-6" />
                    </div>

                    <h3 className="font-serif-apollo text-base font-extrabold text-[#0B3446] mb-2">
                      {eq.name}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {eq.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Tested & Certified Life-Support</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ───── Trust Footer Banner ───── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
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
        </section>
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
