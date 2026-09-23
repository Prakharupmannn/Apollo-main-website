"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  HeartPulse,
  Brain,
  ShieldAlert,
  Bone,
  Microscope,
  Award,
  Sparkles,
  CheckCircle2,
  UserCheck,
  Building2,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  Download,
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

export default function CaseStudiesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCaseModal, setSelectedCaseModal] = useState(null);
  const [selectedDept, setSelectedDept] = useState("all");

  const caseStudiesData = [
    {
      id: "tavi-cardiac",
      dept: "cardiology",
      deptLabel: "Cardiac Sciences",
      icon: HeartPulse,
      title: "Transcatheter Aortic Valve Implantation (TAVI) in 78-Year-Old High-Risk Patient",
      patient: "Mr. Ramashankar P. (Age 78)",
      doctor: "Dr. Vivek Gupta (Director - Interventional Cardiology)",
      summary: "High-risk aortic stenosis successfully treated via non-surgical TAVI procedure without open-heart incision.",
      accent: "from-[#0E526B] via-[#1D82A6] to-[#0B3446]",
      beforeStats: "EF: 28% • Severe Dyspnea",
      afterStats: "EF: 52% • Fully Mobile in 48 Hours",
      details: [
        "Patient presented with NYHA Class-IV heart failure due to calcific aortic valve stenosis.",
        "Open-heart surgery was deemed extremely high-risk due to advanced age and comorbidities.",
        "Team Apollo performed TAVI via femoral artery puncture using 3D CT digital guidance.",
        "New bioprosthetic valve deployed seamlessly; patient discharged on Day 3 with complete mobility.",
      ],
      quote: "Apollo's TAVI procedure gave me a second lease on life without open surgery.",
    },
    {
      id: "trauma-resuscitation",
      dept: "critical-care",
      deptLabel: "Critical Care & Trauma",
      icon: ShieldAlert,
      title: "36-Hour Multi-Organ Highway Trauma Resuscitation & Complex Reconstruction",
      patient: "Sunil K. (Age 34)",
      doctor: "Dr. Saurabh Dubey & Multi-Trauma Surgical Team",
      summary: "Level-1 emergency response saved a highway crash victim with polytrauma, severe internal hemorrhage, and pelvic fracture.",
      accent: "from-[#881337] via-[#9F1239] to-[#0E526B]",
      beforeStats: "GCS: 6/15 • Hemorrhagic Shock",
      afterStats: "Full Neurological & Physical Recovery",
      details: [
        "Brought to Apollo ER in hemorrhagic shock following a high-speed vehicle collision.",
        "Massive blood transfusion protocol activated; PRBC and platelets administered within 10 minutes.",
        "Emergency damage-control laparotomy performed followed by pelvic fracture fixation.",
        "Discharged after 14 days of intensive CCU care and advanced physiotherapy.",
      ],
      quote: "The zero-wait-time trauma response at Apollo saved my son's life.",
    },
    {
      id: "awake-craniotomy",
      dept: "neurology",
      deptLabel: "Neuro Sciences",
      icon: Brain,
      title: "Awake Craniotomy for Brain Tumor Resection Preserving Speech Function",
      patient: "Mrs. Kavita S. (Age 42)",
      doctor: "Dr. Nitin Saxena (Senior Neurosurgeon)",
      summary: "Complex motor-speech area brain tumor resected while patient conversed with surgeons.",
      accent: "from-[#1D82A6] via-[#0E526B] to-[#C8952E]",
      beforeStats: "Glioma in Eloquent Cortex",
      afterStats: "100% Tumor Resection • Speech Intact",
      details: [
        "Patient suffered from speech arrest and focal seizures due to a left frontal lobe tumor.",
        "Awake craniotomy technique chosen to map speech area during real-time tumor removal.",
        "Carl Zeiss surgical microscope and intraoperative neuro-navigation ensured total tumor excision.",
        "Patient experienced zero speech deficit and returned to her teaching profession within a month.",
      ],
      quote: "I was talking to the doctor during brain surgery; it felt like a miracle.",
    },
    {
      id: "robotic-knee",
      dept: "orthopaedics",
      deptLabel: "Ortho & Joint Care",
      icon: Bone,
      badge: "Robotic Joint",
      title: "Sub-Millimeter Precision Robotic Total Knee Replacement in Severe Osteoarthritis",
      patient: "Mrs. Meena Sharma (Age 64)",
      doctor: "Dr. Deepak Shrivastava (Director - Orthopaedics)",
      summary: "Severe Grade-IV bilateral osteoarthritis treated with robotic arm-assisted knee replacement.",
      accent: "from-[#0A5F7A] via-[#1D82A6] to-[#C8952E]",
      beforeStats: "Severe Deformity • Wheelchair Bound",
      afterStats: "Walking Unassisted on Day 2",
      details: [
        "Patient suffered from severe joint deformity and unbearable knee pain for 7 years.",
        "Robotic 3D bone mapping allowed accurate implant alignment with zero soft tissue trauma.",
        "Painless rehabilitation protocol enabled unassisted walking on Day 2 post-surgery.",
        "Patient achieved 130-degree knee flexion and pain-free stair climbing.",
      ],
      quote: "I can walk without pain for the first time in years thanks to Apollo's robotic knee tech.",
    },
    {
      id: "ebus-pulmonary",
      dept: "pulmonology",
      deptLabel: "Pulmonology",
      icon: Microscope,
      title: "EBUS Diagnostic Technology Pinpoints Mediastinal Lymphadenopathy",
      patient: "Mr. Harish V. (Age 55)",
      doctor: "Dr. Pulmonology Team",
      summary: "Endobronchial Ultrasound (EBUS) biopsy identified rare curable granulomatous disease avoiding open thoracic biopsy.",
      accent: "from-[#17627D] via-[#2A8FAF] to-[#0A5F7A]",
      beforeStats: "Unexplained Fever & Lung Shadow",
      afterStats: "Painless Daycare Biopsy • Cured",
      details: [
        "Patient presented with persistent fever and enlarged mediastinal lymph nodes on CT.",
        "EBUS-TBNA (Endobronchial Ultrasound Transbronchial Needle Aspiration) performed under mild sedation.",
        "Real-time ultrasound guidance captured node tissue without external surgical cut.",
        "Targeted medication initiated; complete resolution achieved in 8 weeks.",
      ],
      quote: "EBUS biopsy spared me from open chest surgery and gave exact diagnosis.",
    },
  ];

  const filteredCases = caseStudiesData.filter(
    (c) => selectedDept === "all" || c.dept === selectedDept
  );

  return (
    <main className="relative min-h-screen bg-[#EDF6FB] text-slate-900 pt-38 pb-20 selection:bg-[#1D82A6] selection:text-white overflow-hidden">
      {/* ───── Background Orbs ───── */}
      <style jsx>{`
        .cs-orb {
          position: absolute;
          border-radius: 9999px;
          pointer-events: none;
        }
        .cs-orb-1 {
          width: 380px;
          height: 380px;
          top: -120px;
          left: -100px;
          background: radial-gradient(circle, #bfe3f2, transparent 70%);
          opacity: 0.5;
          animation: csFloat1 16s ease-in-out infinite;
        }
        .cs-orb-2 {
          width: 340px;
          height: 340px;
          top: 30%;
          right: -120px;
          background: radial-gradient(circle, #f3dfa8, transparent 70%);
          opacity: 0.45;
          animation: csFloat2 20s ease-in-out infinite;
        }
        @keyframes csFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 40px) scale(1.08); }
        }
        @keyframes csFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.06); }
        }
      `}</style>

      {/* Dotted texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="cs-orb cs-orb-1" />
        <div className="cs-orb cs-orb-2" />
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
              <Award className="absolute -right-10 -bottom-10 w-80 h-80 opacity-[0.06] text-white -rotate-12 pointer-events-none" />

              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-[#FEF3C7] text-xs font-bold mb-6 shadow-inner">
                  <Sparkles className="w-4 h-4 text-[#F6D98A] animate-pulse" />
                  <span>Clinical Excellence & Medical Saves • Apollo Hospitals Jabalpur</span>
                </div>

                <h1 className="font-serif-apollo text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-4">
                  Clinical Case Studies &{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #F6D98A 0%, #FFFFFF 50%, #C8952E 100%)",
                    }}
                  >
                    Medical Breakthroughs
                  </span>
                </h1>

                <p className="text-slate-100/90 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
                  Real documented cases of lives saved through TAVI heart valve procedures, awake brain tumor craniotomy, 36-hour trauma resuscitations, and robotic knee surgeries.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-3.5 rounded-full text-xs font-extrabold text-[#3A2B0A] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
                    style={goldGradient}
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Consult Clinical Team</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ───── Department Filters ───── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Case Studies" },
              { id: "cardiology", label: "Cardiac Sciences" },
              { id: "critical-care", label: "Trauma & Critical Care" },
              { id: "neurology", label: "Neuro Sciences" },
              { id: "orthopaedics", label: "Ortho & Joint" },
              { id: "pulmonology", label: "Pulmonology & EBUS" },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDept(d.id)}
                className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                  selectedDept === d.id
                    ? "bg-gradient-to-r from-[#0A5F7A] to-[#2A8FAF] text-white shadow-md"
                    : "bg-white text-[#0E526B] hover:bg-slate-100 border border-[#1D82A6]/20"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </section>

        {/* ───── Case Studies Grid ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 mb-16"
        >
          {filteredCases.map((c, idx) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.id}
                variants={fadeUp}
                className="relative p-[1.5px] rounded-[2rem] bg-gradient-to-br from-[#1D82A6]/40 via-white to-[#C8952E]/50 shadow-[0_15px_45px_rgba(10,95,122,0.15)]"
              >
                <div className="bg-white rounded-[calc(2rem-1.5px)] p-6 sm:p-10 relative overflow-hidden">
                  <Icon className="absolute -right-8 -bottom-8 w-80 h-80 opacity-[0.04] text-[#0E526B] pointer-events-none" />

                  {/* Header Row */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${c.accent} text-[#F6D98A] flex items-center justify-center shadow-lg shrink-0`}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#EDF6FB] text-[#0E526B] border border-[#1D82A6]/20">
                            {c.deptLabel}
                          </span>
                          <span className="text-xs font-bold text-[#C8952E]">Case Study #{idx + 1}</span>
                        </div>
                        <h2 className="font-serif-apollo text-xl sm:text-2xl font-black text-[#0B3446]">
                          {c.title}
                        </h2>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <div className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-mono font-bold">
                        Before: {c.beforeStats}
                      </div>
                      <div className="px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-mono font-bold">
                        After: {c.afterStats}
                      </div>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-4">
                      <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-relaxed">
                        {c.summary}
                      </p>

                      <div className="space-y-2">
                        <h4 className="text-xs font-extrabold text-[#0B3446] uppercase tracking-wider">
                          Clinical Procedure Details:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {c.details.map((d, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2 p-3 rounded-xl bg-[#EDF6FB]/80 text-xs text-[#0B3446] font-medium border border-[#1D82A6]/15">
                              <CheckCircle2 className="w-4 h-4 text-[#1D82A6] shrink-0 mt-0.5" />
                              <span>{d}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Patient & Doctor Meta */}
                    <div className="lg:col-span-4 bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4">
                      <div className="space-y-3 text-xs">
                        <div>
                          <span className="font-bold text-slate-500 uppercase text-[10px]">Patient Profile:</span>
                          <div className="font-black text-[#0B3446]">{c.patient}</div>
                        </div>

                        <div>
                          <span className="font-bold text-slate-500 uppercase text-[10px]">Lead Physician:</span>
                          <div className="font-bold text-[#0E526B]">{c.doctor}</div>
                        </div>

                        <div className="p-3.5 rounded-xl bg-[#FEF3C7] border border-[#F6D98A] text-[#3A2B0A] font-medium text-[11.5px] italic">
                          "{c.quote}"
                        </div>
                      </div>

                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full py-2.5 rounded-xl text-xs font-extrabold text-[#3A2B0A] shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                        style={goldGradient}
                      >
                        <span>Consult Lead Specialist</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
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
                    Apollo JBP Hospitals • Jabalpur Clinical Breakthroughs
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    For medical second opinion & case referral: 1800-123-6666 / 7566 123666.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 rounded-full text-xs font-extrabold text-[#3A2B0A] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer shrink-0"
                style={goldGradient}
              >
                Request Case Consultation
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
