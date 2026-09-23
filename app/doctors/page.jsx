"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  UserCheck,
  Stethoscope,
  Search,
  CalendarPlus,
  Clock,
  Award,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Building2,
  HeartPulse,
  Brain,
  ShieldAlert,
  Activity,
  Bone,
  Droplets,
  Star,
  ChevronRight,
  Filter,
} from "lucide-react";
import AppointmentModal from "../../components/components/AppointmentModal";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const goldGradient = {
  background: "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
};

export default function DoctorsPage() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [selectedDoctorName, setSelectedDoctorName] = useState("");
  const [selectedDept, setSelectedDept] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const doctorsList = [
    {
      id: "doc-1",
      name: "Dr. Vivek Gupta",
      dept: "Cardiac Sciences",
      title: "Senior Director - Interventional Cardiology",
      qual: "MD, DM (Cardiology), FACC",
      exp: "24+ Years Experience",
      opd: "Mon - Sat: 10:00 AM - 04:00 PM",
      rating: "4.9",
      reviews: "1,240+",
      accent: "from-[#0E526B] to-[#1D82A6]",
      specializations: ["Angioplasty & Stenting", "TAVI Valve Implantation", "Robotic Bypass Care"],
    },
    {
      id: "doc-2",
      name: "Dr. Rajeev Verma",
      dept: "Onco Sciences",
      title: "Director - Surgical Oncology",
      qual: "MCh (Oncology), FACS",
      exp: "22+ Years Experience",
      opd: "Mon - Sat: 11:00 AM - 05:00 PM",
      rating: "4.9",
      reviews: "980+",
      accent: "from-[#9F1239] to-[#C8952E]",
      specializations: ["CyberKnife Radiosurgery", "Organ Preserving Cancer Surgery", "Head & Neck Tumors"],
    },
    {
      id: "doc-3",
      name: "Dr. Alok Agrawal",
      dept: "Gastro Sciences",
      title: "Senior Consultant Gastroenterologist",
      qual: "DM (Gastroenterology)",
      exp: "18+ Years Experience",
      opd: "Mon - Sat: 09:30 AM - 03:30 PM",
      rating: "4.8",
      reviews: "860+",
      accent: "from-[#0A5F7A] to-[#2A8FAF]",
      specializations: ["HD Endoscopy & ERCP", "Liver Cirrhosis & Hepatitis", "IBD & GERD Care"],
    },
    {
      id: "doc-4",
      name: "Dr. Nitin Saxena",
      dept: "Neuro Sciences",
      title: "Senior Consultant Neurosurgeon",
      qual: "MCh (Neurosurgery)",
      exp: "19+ Years Experience",
      opd: "Mon - Sat: 10:30 AM - 04:30 PM",
      rating: "4.9",
      reviews: "1,050+",
      accent: "from-[#1D82A6] to-[#0E526B]",
      specializations: ["Awake Brain Tumor Craniotomy", "Minimally Invasive Spine", "Stroke Surgery"],
    },
    {
      id: "doc-5",
      name: "Dr. Deepak Shrivastava",
      dept: "Ortho-Joint and Spine",
      title: "Director - Orthopaedics & Joint Surgery",
      qual: "MS (Ortho), MCh (UK)",
      exp: "21+ Years Experience",
      opd: "Mon - Sat: 10:00 AM - 04:00 PM",
      rating: "4.9",
      reviews: "1,420+",
      accent: "from-[#0A5F7A] to-[#C8952E]",
      specializations: ["Robotic Knee & Hip Replacement", "Arthroscopic ACL Surgery", "Complex Fractures"],
    },
    {
      id: "doc-6",
      name: "Dr. Prashant Choubey",
      dept: "Nephro Sciences",
      title: "Senior Nephrologist & Kidney Transplant Specialist",
      qual: "DM (Nephrology)",
      exp: "17+ Years Experience",
      opd: "Mon - Sat: 11:00 AM - 04:00 PM",
      rating: "4.8",
      reviews: "790+",
      accent: "from-[#0A5F7A] to-[#154052]",
      specializations: ["24/7 Hemodialysis & CRRT", "Kidney Transplant Care", "Diabetic Kidney Disease"],
    },
    {
      id: "doc-7",
      name: "Dr. Saurabh Dubey",
      dept: "Critical Care",
      title: "Chief Intensivist & Critical Care Specialist",
      qual: "MD, IDCCM, FCCP",
      exp: "18+ Years Experience",
      opd: "24/7 Emergency & ICU Cover",
      rating: "4.9",
      reviews: "1,100+",
      accent: "from-[#881337] to-[#0E526B]",
      specializations: ["Mechanical Ventilation", "ECMO Life Support", "Polytrauma Resuscitation"],
    },
    {
      id: "doc-8",
      name: "Dr. Sunita Sharma",
      dept: "Gastro Sciences",
      title: "Consultant Hepatologist & GI Surgeon",
      qual: "MCh (Surgical Gastro)",
      exp: "14+ Years Experience",
      opd: "Mon - Sat: 11:30 AM - 05:00 PM",
      rating: "4.8",
      reviews: "640+",
      accent: "from-[#0A5F7A] to-[#2A8FAF]",
      specializations: ["Laparoscopic GI Surgery", "Pancreatitis Treatment", "Gallbladder Stone Laser"],
    },
    {
      id: "doc-9",
      name: "Dr. Ananya Mishra",
      dept: "Onco Sciences",
      title: "Senior Consultant Medical Oncologist",
      qual: "DM (Medical Oncology)",
      exp: "16+ Years Experience",
      opd: "Mon - Sat: 10:00 AM - 03:00 PM",
      rating: "4.9",
      reviews: "720+",
      accent: "from-[#9F1239] to-[#C8952E]",
      specializations: ["Targeted Immunotherapy", "Precision Chemotherapy", "Breast & Lung Cancer Care"],
    },
    {
      id: "doc-10",
      name: "Dr. Sanjay Deshmukh",
      dept: "Cardiac Sciences",
      title: "Chief Cardiothoracic Surgeon",
      qual: "MCh (CTVS)",
      exp: "20+ Years Experience",
      opd: "Mon - Sat: 11:00 AM - 04:30 PM",
      rating: "4.9",
      reviews: "950+",
      accent: "from-[#0E526B] to-[#1D82A6]",
      specializations: ["Beating Heart Bypass (CABG)", "Valve Repair & Replacement", "Aortic Aneurysm Surgery"],
    },
  ];

  const filteredDoctors = doctorsList.filter((doc) => {
    const matchesDept = selectedDept === "all" || doc.dept === selectedDept;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      doc.name.toLowerCase().includes(query) ||
      doc.dept.toLowerCase().includes(query) ||
      doc.qual.toLowerCase().includes(query) ||
      doc.specializations.some((s) => s.toLowerCase().includes(query));
    return matchesDept && matchesSearch;
  });

  const handleBookDoctor = (docName) => {
    setSelectedDoctorName(docName);
    setIsAppointmentModalOpen(true);
  };

  return (
    <main className="relative min-h-screen bg-[#EDF6FB] text-slate-900 pt-38 pb-20 selection:bg-[#1D82A6] selection:text-white overflow-hidden">
      {/* ───── Background Orbs ───── */}
      <style jsx>{`
        .doc-orb {
          position: absolute;
          border-radius: 9999px;
          pointer-events: none;
        }
        .doc-orb-1 {
          width: 380px;
          height: 380px;
          top: -120px;
          left: -100px;
          background: radial-gradient(circle, #bfe3f2, transparent 70%);
          opacity: 0.5;
          animation: docFloat1 16s ease-in-out infinite;
        }
        .doc-orb-2 {
          width: 340px;
          height: 340px;
          top: 30%;
          right: -120px;
          background: radial-gradient(circle, #f3dfa8, transparent 70%);
          opacity: 0.45;
          animation: docFloat2 20s ease-in-out infinite;
        }
        @keyframes docFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 40px) scale(1.08); }
        }
        @keyframes docFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.06); }
        }
      `}</style>

      {/* Dotted texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="doc-orb doc-orb-1" />
        <div className="doc-orb doc-orb-2" />
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
              <UserCheck className="absolute -right-10 -bottom-10 w-80 h-80 opacity-[0.06] text-white -rotate-12 pointer-events-none" />

              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-[#FEF3C7] text-xs font-bold mb-6 shadow-inner">
                  <Sparkles className="w-4 h-4 text-[#F6D98A] animate-pulse" />
                  <span>Apollo Hospitals Jabalpur • Senior Clinical Faculty</span>
                </div>

                <h1 className="font-serif-apollo text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-4">
                  Meet Our Leading{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #F6D98A 0%, #FFFFFF 50%, #C8952E 100%)",
                    }}
                  >
                    Specialist Doctors
                  </span>
                </h1>

                <p className="text-slate-100/90 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
                  Consult board-certified senior consultants, surgeons, and intensivists at Apollo JBP Hospitals. Book OPD consultations with instant confirmation.
                </p>

                {/* Search Bar */}
                <div className="relative max-w-xl rounded-2xl bg-white/95 backdrop-blur-xl p-2 flex items-center border-2 border-white/40 shadow-2xl">
                  <Search className="w-5 h-5 text-[#0E526B] ml-3 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search doctor by name, qualification, or procedure..."
                    className="w-full px-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="px-3 text-xs font-bold text-slate-400 hover:text-slate-700 cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ───── Department Filter Pills ───── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Specialists" },
              { id: "Cardiac Sciences", label: "Cardiology" },
              { id: "Onco Sciences", label: "Oncology" },
              { id: "Gastro Sciences", label: "Gastroenterology" },
              { id: "Neuro Sciences", label: "Neurology" },
              { id: "Ortho-Joint and Spine", label: "Orthopaedics" },
              { id: "Nephro Sciences", label: "Nephrology" },
              { id: "Critical Care", label: "Critical Care" },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setSelectedDept(d.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
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

        {/* ───── Doctors Directory Grid ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <motion.div
                key={doc.id}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="relative p-[1.5px] rounded-[1.75rem] bg-gradient-to-br from-[#1D82A6]/40 via-white to-[#C8952E]/50 shadow-[0_10px_30px_rgba(10,95,122,0.12)] hover:shadow-xl transition-all group flex flex-col justify-between"
              >
                <div className="h-full rounded-[calc(1.75rem-1.5px)] bg-white p-6 flex flex-col justify-between">
                  <div>
                    {/* Header Row */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0A5F7A] to-[#17627D] text-[#F6D98A] flex items-center justify-center font-serif-apollo text-xl font-black shadow-md shrink-0">
                        {doc.name.split(" ")[1]?.[0] || "D"}
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="inline-flex items-center gap-1 text-xs font-extrabold text-[#C8952E] bg-[#FEF3C7] px-2.5 py-0.5 rounded-full border border-[#F6D98A]">
                          <Star className="w-3 h-3 fill-[#C8952E] text-[#C8952E]" />
                          {doc.rating} ({doc.reviews})
                        </span>
                        <span className="text-[10px] text-slate-500 font-bold mt-1">{doc.exp}</span>
                      </div>
                    </div>

                    <div className="mb-3">
                      <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#EDF6FB] text-[#0E526B] border border-[#1D82A6]/20">
                        {doc.dept}
                      </span>
                      <h3 className="font-serif-apollo text-lg font-black text-[#0B3446] group-hover:text-[#1D82A6] transition-colors mt-2">
                        {doc.name}
                      </h3>
                      <p className="text-xs font-bold text-[#0E526B] mt-0.5">{doc.title}</p>
                      <p className="text-[11px] text-slate-500 font-mono mt-0.5">{doc.qual}</p>
                    </div>

                    {/* Specialization Tags */}
                    <div className="space-y-1.5 mb-4 pt-3 border-t border-slate-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Areas of Expertise:</span>
                      <div className="space-y-1">
                        {doc.specializations.map((spec, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2 text-[11px] font-semibold text-[#0B3446]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1D82A6] shrink-0" />
                            <span className="truncate">{spec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-600 font-medium flex items-center gap-1.5 mb-4">
                      <Clock className="w-3.5 h-3.5 text-[#C8952E] shrink-0" />
                      <span>{doc.opd}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookDoctor(doc.name)}
                    className="w-full py-3 rounded-xl text-xs font-extrabold text-[#3A2B0A] shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                    style={goldGradient}
                  >
                    <CalendarPlus className="w-4 h-4" />
                    <span>Book OPD Appointment</span>
                  </button>
                </div>
              </motion.div>
            ))}
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
                    Apollo JBP Hospitals • Senior Doctor Appointments
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Global Square, Patan Rd, Karmeta, Jabalpur • Call: 1800-123-6666 / 7566 123666.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="px-6 py-3 rounded-full text-xs font-extrabold text-[#3A2B0A] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer shrink-0"
                style={goldGradient}
              >
                Book Doctor Appointment
              </button>
            </div>
          </div>
        </section>
      </div>

      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        initialDoctor={selectedDoctorName}
      />
    </main>
  );
}