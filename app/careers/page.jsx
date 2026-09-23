"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  UserCheck,
  Building2,
  Award,
  Sparkles,
  CheckCircle2,
  Send,
  Upload,
  Clock,
  MapPin,
  HeartPulse,
  ShieldCheck,
  PhoneCall,
  Mail,
  ChevronRight,
  Zap,
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

export default function CareersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [appSubmitted, setAppSubmitted] = useState(false);
  const [appForm, setAppForm] = useState({
    name: "",
    email: "",
    phone: "",
    exp: "2-5 Years",
    resumeName: "",
  });

  const jobsList = [
    {
      id: "cardiologist",
      title: "Senior Consultant - Interventional Cardiology",
      dept: "Cardiac Sciences",
      type: "Full-Time",
      location: "Apollo JBP Hospitals, Jabalpur",
      qual: "DM / DNB (Cardiology)",
      exp: "5+ Years Post-DM",
      desc: "Lead emergency cardiac catheterizations, primary PCI angioplasty, electrophysiology, and outpatient cardiology clinics.",
      responsibilities: [
        "24/7 emergency primary angioplasty (PCI) coverage",
        "Perform complex coronary interventions and device implants",
        "Clinical teaching for resident doctors & CME participation",
      ],
    },
    {
      id: "rmo",
      title: "Resident Medical Officer (RMO)",
      dept: "Emergency & Critical Care",
      type: "Full-Time (Rotational Shifts)",
      location: "Apollo JBP Hospitals, Jabalpur",
      qual: "MBBS (MCI Registered)",
      exp: "1-3 Years ER/ICU Exp",
      desc: "Manage ER resuscitation, initial patient assessment, ICU patient monitoring, and coordination with senior consultants.",
      responsibilities: [
        "Immediate trauma triage & patient stabilization",
        "Intra-hospital patient transfers & arterial lines",
        "Maintain electronic medical records & patient progress",
      ],
    },
    {
      id: "icu-nurse",
      title: "Staff Nurse - ICU / CCU / OT",
      dept: "Nursing Services",
      type: "Full-Time",
      location: "Apollo JBP Hospitals, Jabalpur",
      qual: "B.Sc Nursing / GNM",
      exp: "2+ Years ICU / OT Exp",
      desc: "Deliver high-standard intensive nursing care, ventilator management, arterial monitoring, and surgical assistance.",
      responsibilities: [
        "Direct patient care for mechanically ventilated patients",
        "Medication administration via infusion pumps",
        "Strict infection control protocol adherence",
      ],
    },
    {
      id: "radiographer",
      title: "Senior Radiology Technician (MRI & CT)",
      dept: "Diagnostics & Imaging",
      type: "Full-Time",
      location: "Apollo JBP Hospitals, Jabalpur",
      qual: "B.Sc Radiography / Diploma",
      exp: "3+ Years 3T MRI Exp",
      desc: "Operate 3 Tesla MRI scanner and 128-slice CT scanner for neuro, cardiac, and abdominal imaging.",
      responsibilities: [
        "High-definition 3T MRI & CT angiography acquisition",
        "Patient positioning & radiation safety enforcement",
        "Equipment maintenance & contrast safety protocols",
      ],
    },
    {
      id: "front-office",
      title: "Front Office Executive & Patient Relationship Manager",
      dept: "Hospital Administration",
      type: "Full-Time",
      location: "Apollo JBP Hospitals, Jabalpur",
      qual: "Graduate / MBA Healthcare",
      exp: "2+ Years Hospital Desk Exp",
      desc: "Facilitate smooth patient admission, billing guidance, TPA cashless assistance, and OPD visitor management.",
      responsibilities: [
        "Patient registration & appointment scheduling",
        "Insurance TPA pre-authorization coordination",
        "Compassionate grievance resolution & family guidance",
      ],
    },
  ];

  const handleAppSubmit = (e) => {
    e.preventDefault();
    setAppSubmitted(true);
  };

  return (
    <main className="relative min-h-screen bg-[#EDF6FB] text-slate-900 pt-38 pb-20 selection:bg-[#1D82A6] selection:text-white overflow-hidden">
      {/* ───── Background Orbs ───── */}
      <style jsx>{`
        .car-orb {
          position: absolute;
          border-radius: 9999px;
          pointer-events: none;
        }
        .car-orb-1 {
          width: 380px;
          height: 380px;
          top: -120px;
          left: -100px;
          background: radial-gradient(circle, #bfe3f2, transparent 70%);
          opacity: 0.5;
          animation: carFloat1 16s ease-in-out infinite;
        }
        .car-orb-2 {
          width: 340px;
          height: 340px;
          top: 30%;
          right: -120px;
          background: radial-gradient(circle, #f3dfa8, transparent 70%);
          opacity: 0.45;
          animation: carFloat2 20s ease-in-out infinite;
        }
        @keyframes carFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 40px) scale(1.08); }
        }
        @keyframes carFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.06); }
        }
      `}</style>

      {/* Dotted texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="car-orb car-orb-1" />
        <div className="car-orb car-orb-2" />
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
              <Briefcase className="absolute -right-10 -bottom-10 w-80 h-80 opacity-[0.06] text-white -rotate-12 pointer-events-none" />

              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-[#FEF3C7] text-xs font-bold mb-6 shadow-inner">
                  <Sparkles className="w-4 h-4 text-[#F6D98A] animate-pulse" />
                  <span>Work With Asia's Healthcare Leader • Apollo Hospitals Jabalpur</span>
                </div>

                <h1 className="font-serif-apollo text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-4">
                  Build Your Career in{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #F6D98A 0%, #FFFFFF 50%, #C8952E 100%)",
                    }}
                  >
                    Medical Excellence
                  </span>
                </h1>

                <p className="text-slate-100/90 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
                  Join Asia's premier healthcare group. We invite passionate doctors, nurses, technicians, and administrative professionals to shape the future of medicine in Central India.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a
                    href="mailto:jabalpur_careers@apollohospitals.com"
                    className="px-6 py-3.5 rounded-full bg-white text-[#0E526B] font-extrabold text-xs shadow-md hover:bg-slate-100 transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-[#1D82A6]" />
                    <span>Email CV: jabalpur_careers@apollohospitals.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ───── Why Join Apollo Benefits ───── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Cutting-Edge Technology", desc: "Work with CyberKnife, Robotic Joint, 3T MRI & EBUS diagnostic systems.", icon: Zap },
              { title: "Global Growth & Learning", desc: "CME credits, continuous medical education, and fellowship opportunities.", icon: Award },
              { title: "Competitive Remuneration", desc: "Industry-best compensation, medical insurance for family & incentives.", icon: ShieldCheck },
              { title: "Work-Life Harmony", desc: "Structured shift rosters, supportive nursing management & transparent culture.", icon: HeartPulse },
            ].map((b, bIdx) => {
              const BIcon = b.icon;
              return (
                <div key={bIdx} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-md space-y-2">
                  <div className="w-10 h-10 rounded-xl bg-[#EDF6FB] text-[#0E526B] flex items-center justify-center font-bold">
                    <BIcon className="w-5 h-5 text-[#1D82A6]" />
                  </div>
                  <h3 className="font-serif-apollo text-base font-extrabold text-[#0B3446]">{b.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ───── Current Job Openings ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mb-16"
        >
          <div className="flex items-center justify-between">
            <h2 className="font-serif-apollo text-2xl font-black text-[#0B3446]">
              Current Job Openings at Apollo Jabalpur
            </h2>
            <span className="text-xs font-bold text-[#C8952E] bg-[#FEF3C7] px-3 py-1 rounded-full border border-[#F6D98A]">
              5 Active Positions
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobsList.map((job) => (
              <motion.div
                key={job.id}
                variants={fadeUp}
                className="relative p-[1.5px] rounded-[2rem] bg-gradient-to-br from-[#1D82A6]/40 via-white to-[#C8952E]/50 shadow-[0_10px_30px_rgba(10,95,122,0.12)] hover:shadow-xl transition-all"
              >
                <div className="bg-white rounded-[calc(2rem-1.5px)] p-6 sm:p-8 flex flex-col justify-between h-full space-y-6">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#EDF6FB] text-[#0E526B] border border-[#1D82A6]/20">
                        {job.dept}
                      </span>
                      <span className="text-xs font-bold text-[#C8952E]">{job.type}</span>
                    </div>

                    <h3 className="font-serif-apollo text-xl font-black text-[#0B3446] mb-2">
                      {job.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {job.desc}
                    </p>

                    <div className="space-y-2 text-xs mb-4">
                      <div className="flex items-center gap-2 font-semibold text-slate-700">
                        <Award className="w-4 h-4 text-[#1D82A6] shrink-0" />
                        <span>Qualification: {job.qual}</span>
                      </div>
                      <div className="flex items-center gap-2 font-semibold text-slate-700">
                        <Clock className="w-4 h-4 text-[#C8952E] shrink-0" />
                        <span>Experience Required: {job.exp}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Core Responsibilities:</span>
                      {job.responsibilities.map((res, rIdx) => (
                        <div key={rIdx} className="flex items-center gap-2 text-xs font-semibold text-[#0B3446]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#1D82A6] shrink-0" />
                          <span>{res}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedJob(job);
                      setAppSubmitted(false);
                    }}
                    className="w-full py-3 rounded-xl text-xs font-extrabold text-[#3A2B0A] shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                    style={goldGradient}
                  >
                    <span>Apply for this Position</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ───── Job Application Modal ───── */}
        <AnimatePresence>
          {selectedJob && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-[#1D82A6] relative"
              >
                {!appSubmitted ? (
                  <form onSubmit={handleAppSubmit} className="space-y-4 text-xs">
                    <div>
                      <span className="text-[10px] font-black uppercase text-[#C8952E]">Job Application</span>
                      <h3 className="font-serif-apollo text-xl font-black text-[#0B3446]">{selectedJob.title}</h3>
                      <p className="text-[11px] text-slate-500 mt-1">{selectedJob.dept} • {selectedJob.location}</p>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={appForm.name}
                        onChange={(e) => setAppForm({ ...appForm, name: e.target.value })}
                        placeholder="e.g. Dr. Ramesh Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#1D82A6] focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={appForm.email}
                          onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                          placeholder="ramesh@example.com"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#1D82A6] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          value={appForm.phone}
                          onChange={(e) => setAppForm({ ...appForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#1D82A6] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Years of Clinical / Job Experience *</label>
                      <select
                        value={appForm.exp}
                        onChange={(e) => setAppForm({ ...appForm, exp: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#1D82A6] focus:outline-none font-semibold"
                      >
                        <option value="Fresher / <1 Year">Fresher / &lt;1 Year</option>
                        <option value="1-3 Years">1-3 Years</option>
                        <option value="3-5 Years">3-5 Years</option>
                        <option value="5+ Years">5+ Years</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Resume / CV Document *</label>
                      <div className="border-2 border-dashed border-slate-300 rounded-xl p-4 text-center hover:border-[#1D82A6] transition-colors cursor-pointer bg-slate-50">
                        <Upload className="w-6 h-6 text-[#1D82A6] mx-auto mb-1" />
                        <span className="text-xs font-semibold text-slate-600">
                          {appForm.resumeName || "Click to attach PDF / DOC Resume"}
                        </span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => setAppForm({ ...appForm, resumeName: e.target.files[0]?.name || "" })}
                          className="hidden"
                          id="cv-file"
                        />
                      </div>
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedJob(null)}
                        className="px-4 py-2.5 rounded-xl text-slate-500 hover:bg-slate-100 font-bold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl text-[#3A2B0A] font-extrabold shadow-md cursor-pointer"
                        style={goldGradient}
                      >
                        Submit Job Application
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center space-y-4 py-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif-apollo text-xl font-black text-emerald-900">
                      Application Submitted Successfully!
                    </h3>
                    <p className="text-xs text-slate-600">
                      Thank you, <span className="font-bold">{appForm.name}</span>. Apollo HR recruitment team will review your CV for <span className="font-bold">{selectedJob.title}</span> and contact you shortly.
                    </p>
                    <button
                      onClick={() => setSelectedJob(null)}
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
                    Apollo JBP Hospitals • Human Resources Department
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Email CV: jabalpur_careers@apollohospitals.com • Phone: 1800-123-6666.
                  </p>
                </div>
              </div>
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
