"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldAlert,
  HeartPulse,
  Brain,
  Activity,
  ArrowRight,
  Sparkles,
  Award,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Stethoscope,
  Bone,
  Droplets,
  CalendarPlus,
  PhoneCall,
  Search,
  ChevronRight,
  Clock,
  UserCheck,
  Star,
  Download,
  Flame,
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

export default function CentresOfExcellencePage() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [selectedCentreModal, setSelectedCentreModal] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.replace("#", "");
      const matched = centresData.find((c) => c.anchor === hash || c.id === hash);
      if (matched) {
        setActiveTab(matched.id);
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const centresData = [
    {
      id: "gastro-sciences",
      anchor: "gastro-sciences",
      title: "Gastro Sciences",
      subtitle: "Digestive, Liver & Biliary Care Institute",
      icon: Activity,
      badge: "Advanced Endoscopy & ERCP Hub",
      stat: "12K+",
      statLabel: "Successful Endoscopies",
      accent: "from-[#0A5F7A] via-[#2A8FAF] to-[#17627D]",
      tagline: "The Most Trusted Gastro Hospital in Jabalpur & Mahakoshal Region",
      desc: "Apollo JBP Hospitals delivers high-precision gastroenterology care equipped with modern video endoscopes, high-definition colonoscopy, ERCP for bile duct stones, and advanced liver disease management.",
      highlights: [
        "Advanced Therapeutic Endoscopy & HD Colonoscopy",
        "ERCP for Obstructive Jaundice & Bile Duct Stones",
        "Comprehensive Fatty Liver & Hepatitis C Clinic",
        "Minimally Invasive Laparoscopic Gastrointestinal Surgeries",
        "Inflammatory Bowel Disease (IBD & IBS) Specialty Unit",
        "24/7 Acute Gastrointestinal Bleed & Pancreatitis ER",
      ],
      keyTech: ["High-Definition Endoscopy System", "FibroScan Liver Assessment", "Endoscopic Ultrasound (EUS)"],
      doctors: [
        { name: "Dr. Alok Agrawal", role: "Senior Consultant Gastroenterologist", exp: "18+ Yrs Exp", qual: "DM (Gastroenterology)" },
        { name: "Dr. Sunita Sharma", role: "Consultant Hepatologist & GI Surgeon", exp: "14+ Yrs Exp", qual: "MCh (Surgical Gastro)" },
      ],
    },
    {
      id: "onco-sciences",
      anchor: "onco-sciences",
      title: "Onco Sciences",
      subtitle: "Comprehensive Cancer Care Institute",
      icon: ShieldAlert,
      badge: "CyberKnife & Precision Oncology",
      stat: "98.4%",
      statLabel: "Target Precision",
      accent: "from-[#9F1239] via-[#C8952E] to-[#881337]",
      tagline: "Advanced Multi-Disciplinary Cancer Hospital in Jabalpur",
      desc: "Providing holistic cancer treatment through CyberKnife radiosurgery, target-specific chemotherapy, immunotherapy, surgical oncology, and compassionate palliative care under one roof.",
      highlights: [
        "Sub-Millimeter CyberKnife Robotic Radiosurgery",
        "Day Care Chemotherapy & Targeted Immunotherapy Unit",
        "Organ-Preserving Surgical Oncology Procedures",
        "Multi-Disciplinary Tumor Board Evaluation",
        "Early Cancer Screening & Biomarker Diagnostics",
        "Dedicated Pain Management & Palliative Care Team",
      ],
      keyTech: ["CyberKnife Radiosurgery System", "PET-CT Scan Facility", "Laminar Airflow Chemotherapy Suite"],
      doctors: [
        { name: "Dr. Rajeev Verma", role: "Director - Surgical Oncology", exp: "22+ Yrs Exp", qual: "MCh (Oncology), FACS" },
        { name: "Dr. Ananya Mishra", role: "Senior Consultant Medical Oncologist", exp: "16+ Yrs Exp", qual: "DM (Medical Oncology)" },
      ],
    },
    {
      id: "cardiac-sciences",
      anchor: "cardiac-sciences",
      title: "Cardiac Sciences",
      subtitle: "Heart & Vascular Institute",
      icon: HeartPulse,
      badge: "24/7 STEMI Cath Lab Standby",
      stat: "<45 min",
      statLabel: "Primary PCI Door-to-Balloon",
      accent: "from-[#0E526B] via-[#1D82A6] to-[#0B3446]",
      tagline: "Pioneering Heart Hospital in Jabalpur with 50,000+ Surgeries Group Legacy",
      desc: "Offering 24/7 primary angioplasty, TAVI valve replacements, robotic cardiac bypass procedures, pediatric cardiac interventions, and advanced arrhythmia management.",
      highlights: [
        "24/7 Flat-Panel Cardiac Cath Lab for Emergency Angioplasty",
        "Robotic-Assisted & Minimally Invasive CABG (Bypass Surgery)",
        "TAVI (Transcatheter Aortic Valve Implantation) Procedure",
        "Electrophysiology (EP) Studies & Pacemaker Implantation",
        "Comprehensive Heart Failure & Cardiac Rehabilitation Clinic",
        "Pediatric Cardiology & Congenital Heart Defect Surgery",
      ],
      keyTech: ["Bi-Plane Digital Cath Lab", "3D Echocardiography", "Intra-Aortic Balloon Pump (IABP)"],
      doctors: [
        { name: "Dr. Vivek Gupta", role: "Senior Director - Interventional Cardiology", exp: "24+ Yrs Exp", qual: "MD, DM (Cardiology), FACC" },
        { name: "Dr. Sanjay Deshmukh", role: "Chief Cardiothoracic Surgeon", exp: "20+ Yrs Exp", qual: "MCh (CTVS)" },
      ],
    },
    {
      id: "neuro-sciences",
      anchor: "neuro-sciences",
      title: "Neuro Sciences",
      subtitle: "Brain, Spine & Stroke Care Centre",
      icon: Brain,
      badge: "Rapid Stroke Thrombolysis Unit",
      stat: "<30 min",
      statLabel: "Door-to-Needle Stroke Care",
      accent: "from-[#1D82A6] via-[#0E526B] to-[#C8952E]",
      tagline: "Leading Neurology & Neurosurgery Centre in Mahakoshal",
      desc: "Delivering acute stroke management within the golden hour, micro-neurosurgery for brain tumors, complex spine reconstruction, epilepsy care, and neuro-rehabilitation.",
      highlights: [
        "Golden Hour Acute Stroke Thrombolysis & Mechanical Thrombectomy",
        "Awake Craniotomy & Image-Guided Brain Tumor Resection",
        "Minimally Invasive Spine Surgery (MISS) for Herniated Discs",
        "Comprehensive Epilepsy & Movement Disorder Clinic",
        "24/7 Dedicated Neuro-ICU with Intracranial Pressure Monitoring",
        "Advanced Nerve Conduction Studies (NCV), EEG & EMG",
      ],
      keyTech: ["Neuro-Navigation System", "Carl Zeiss Surgical Microscope", "3T Digital MRI Scanner"],
      doctors: [
        { name: "Dr. Nitin Saxena", role: "Senior Consultant Neurosurgeon", exp: "19+ Yrs Exp", qual: "MCh (Neurosurgery)" },
        { name: "Dr. Meenakshi Roy", role: "Chief Neurologist & Stroke Specialist", exp: "15+ Yrs Exp", qual: "DM (Neurology)" },
      ],
    },
    {
      id: "nephro-sciences",
      anchor: "nephro-sciences",
      title: "Nephro Sciences",
      subtitle: "Kidney Care & Dialysis Institute",
      icon: Droplets,
      badge: "24/7 Ultra-Pure Dialysis Hub",
      stat: "24/7",
      statLabel: "Emergency Renal Support",
      accent: "from-[#0A5F7A] via-[#207493] to-[#154052]",
      tagline: "Trusted Kidney Specialist Hospital in Jabalpur",
      desc: "Equipped with state-of-the-art dialysis stations, SLED, CRRT for ICU patients, kidney stone management, pediatric nephrology, and kidney transplant pre/post care.",
      highlights: [
        "24/7 Modern Hemodialysis & On-Line Hemodiafiltration (HDF)",
        "SLED & CRRT for Critically Ill Patients with Kidney Failure",
        "Laser Lithotripsy & RIRS for Painless Kidney Stone Removal",
        "Diabetic Kidney Disease & Hypertensive Nephropathy Clinic",
        "Pediatric Nephrology Unit for Childhood Kidney Disorders",
        "AV Fistula Creation & Permanent Catheter Insertion",
      ],
      keyTech: ["Fresenius Dialysis Machines", "Holmium Laser Lithotripter", "Portable CRRT Unit"],
      doctors: [
        { name: "Dr. Prashant Choubey", role: "Senior Nephrologist & Transplant Specialist", exp: "17+ Yrs Exp", qual: "DM (Nephrology)" },
        { name: "Dr. Varun Joshi", role: "Consultant Urologist & Transplant Surgeon", exp: "13+ Yrs Exp", qual: "MCh (Urology)" },
      ],
    },
    {
      id: "ortho-sciences",
      anchor: "ortho-sciences",
      title: "Ortho-Joint and Spine",
      subtitle: "Robotic Joint & Musculoskeletal Centre",
      icon: Bone,
      badge: "Robotic Knee & Hip Surgery",
      stat: "99.1%",
      statLabel: "Mobility Restoration Rate",
      accent: "from-[#0A5F7A] via-[#1D82A6] to-[#C8952E]",
      tagline: "Top Orthopaedic & Joint Replacement Hospital in Jabalpur",
      desc: "Pioneering robotic-assisted knee and hip replacements, keyhole arthroscopic ligament repairs, complex fracture trauma management, and dedicated sports rehabilitation.",
      highlights: [
        "Sub-Millimeter Precision Robotic Total Knee & Hip Replacement",
        "Arthroscopic Ligament Reconstruction (ACL / PCL / Meniscus)",
        "Complex Trauma, Revision Joint & Deformity Correction",
        "Spine Surgery for Slip Disc, Sciatica & Scoliosis",
        "Joint Preservation Therapy & Hyaluronic Injections",
        "Dedicated Orthopaedic Rehabilitation & Physiotherapy Gym",
      ],
      keyTech: ["Robotic Joint Alignment System", "Stryker Arthroscopy Tower", "Digital C-Arm Fluoroscopy"],
      doctors: [
        { name: "Dr. Deepak Shrivastava", role: "Director - Orthopaedics & Joint Surgery", exp: "21+ Yrs Exp", qual: "MS (Ortho), MCh (UK)" },
        { name: "Dr. Ruchir Patel", role: "Consultant Spine & Trauma Surgeon", exp: "12+ Yrs Exp", qual: "MS (Ortho), FNB (Spine)" },
      ],
    },
    {
      id: "critical-care",
      anchor: "critical-care",
      title: "Critical Care",
      subtitle: "Advanced Intensive Care & Resuscitation",
      icon: Zap,
      badge: "Level-1 CCU & Trauma ER",
      stat: "24/7",
      statLabel: "Intensivist Cover",
      accent: "from-[#0E526B] via-[#1D82A6] to-[#0B3446]",
      tagline: "Ranked Top Critical Care Hospital in Jabalpur",
      desc: "Round-the-clock intensivist coverage, advanced mechanical ventilation, invasive arterial monitoring, ECMO support, and rapid trauma resuscitation.",
      highlights: [
        "State-of-the-Art CCU, MICU, SICU & Neuro-ICU Beds",
        "24/7 In-House Board-Certified Intensivists & Anaesthetists",
        "Advanced High-Frequency Ventilator & BiPAP Support",
        "ECMO (Extracorporeal Membrane Oxygenation) Facility",
        "Bedside Echocardiography, ABG, Ultrasound & Dialysis",
        "Dedicated Multi-Trauma & Septic Shock Isolation Wards",
      ],
      keyTech: ["High-End Hamilton Ventilators", "Continuous Hemodynamic Monitor", "ECMO Life Support"],
      doctors: [
        { name: "Dr. Saurabh Dubey", role: "Chief Intensivist & Critical Care Specialist", exp: "18+ Yrs Exp", qual: "MD, IDCCM, FCCP" },
        { name: "Dr. Priyanka Kulkarni", role: "Senior Consultant Anaesthesiologist", exp: "14+ Yrs Exp", qual: "MD (Anaesthesia)" },
      ],
    },
  ];

  const filteredCentres = centresData.filter((item) => {
    const matchesTab = activeTab === "all" || item.id === activeTab;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(query) ||
      item.subtitle.toLowerCase().includes(query) ||
      item.highlights.some((h) => h.toLowerCase().includes(query));
    return matchesTab && matchesSearch;
  });

  return (
    <main className="relative min-h-screen bg-[#EDF6FB] text-slate-900 pt-38 pb-20 selection:bg-[#1D82A6] selection:text-white overflow-hidden">
      {/* ───── CSS Background Animations ───── */}
      <style jsx>{`
        .coe-orb {
          position: absolute;
          border-radius: 9999px;
          pointer-events: none;
        }
        .coe-orb-1 {
          width: 400px;
          height: 400px;
          top: -140px;
          left: -120px;
          background: radial-gradient(circle, #bfe3f2, transparent 70%);
          opacity: 0.55;
          animation: coeFloat1 18s ease-in-out infinite;
        }
        .coe-orb-2 {
          width: 360px;
          height: 360px;
          top: 35%;
          right: -140px;
          background: radial-gradient(circle, #f3dfa8, transparent 70%);
          opacity: 0.5;
          animation: coeFloat2 22s ease-in-out infinite;
        }
        @keyframes coeFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(45px, 45px) scale(1.08); }
        }
        @keyframes coeFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-45px, 35px) scale(1.06); }
        }
      `}</style>

      {/* Background radial dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="coe-orb coe-orb-1" />
        <div className="coe-orb coe-orb-2" />
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
        {/* ───── Hero Banner ───── */}
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
                  <span>Apollo Hospitals Jabalpur • Flagship Clinical Hubs</span>
                </div>

                <h1 className="font-serif-apollo text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-4">
                  7 Centres of{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #F6D98A 0%, #FFFFFF 50%, #C8952E 100%)",
                    }}
                  >
                    Clinical Excellence
                  </span>
                </h1>

                <p className="text-slate-100/90 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
                  Combining medical robotics, world-class super-specialists, and state-of-the-art diagnostic infrastructure at Apollo JBP Hospitals, Global Square Patan Rd Karmeta Jabalpur.
                </p>

                {/* Quick Search inside Hero */}
                <div className="relative max-w-xl rounded-2xl bg-white/95 backdrop-blur-xl p-2 flex items-center border-2 border-white/40 shadow-2xl">
                  <Search className="w-5 h-5 text-[#0E526B] ml-3 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Gastro, CyberKnife, Cath Lab, Dialysis, Joint replacement..."
                    className="w-full px-3 py-2 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="px-2 text-slate-400 hover:text-slate-700 text-xs font-bold cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ───── Interactive Filter Tabs ───── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-3 hl-noscroll">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-gradient-to-r from-[#0A5F7A] to-[#2A8FAF] text-white shadow-md"
                  : "bg-white text-[#0E526B] hover:bg-slate-100 border border-[#1D82A6]/20"
              }`}
            >
              All 7 Centres
            </button>
            {centresData.map((c) => {
              const Icon = c.icon;
              const isAct = activeTab === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setActiveTab(c.id);
                    const el = document.getElementById(c.anchor);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                    isAct
                      ? "bg-gradient-to-r from-[#0A5F7A] to-[#2A8FAF] text-white shadow-md"
                      : "bg-white text-[#0E526B] hover:bg-slate-100 border border-[#1D82A6]/20"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{c.title}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ───── Comprehensive Centres Grid ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 mb-16"
        >
          {filteredCentres.map((centre, idx) => {
            const Icon = centre.icon;
            return (
              <motion.div
                key={centre.id}
                id={centre.anchor}
                variants={fadeUp}
                className="relative p-[1.5px] rounded-[2rem] bg-gradient-to-br from-[#1D82A6]/50 via-white to-[#C8952E]/60 shadow-[0_20px_50px_rgba(10,95,122,0.18)] scroll-mt-36"
              >
                <div className="bg-white rounded-[calc(2rem-1.5px)] p-6 sm:p-10 relative overflow-hidden">
                  {/* Subtle Background Watermark */}
                  <Icon className="absolute -right-8 -bottom-8 w-80 h-80 opacity-[0.04] text-[#0E526B] pointer-events-none" />

                  {/* Header Row */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${centre.accent} text-[#F6D98A] flex items-center justify-center shadow-xl shrink-0`}>
                        <Icon className="w-8 h-8" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#EDF6FB] text-[#0E526B] border border-[#1D82A6]/20">
                            Centre #{idx + 1}
                          </span>
                          <span className="text-xs font-bold text-[#C8952E] flex items-center gap-1">
                            <Award className="w-3.5 h-3.5" />
                            {centre.badge}
                          </span>
                        </div>
                        <h2 className="font-serif-apollo text-2xl sm:text-3xl font-black text-[#0B3446]">
                          {centre.title}
                        </h2>
                        <p className="text-xs font-semibold text-slate-500">{centre.subtitle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="px-4 py-2 rounded-2xl bg-[#EDF6FB] border border-[#1D82A6]/20 text-center">
                        <div className="text-xl font-black text-[#0B3446]">{centre.stat}</div>
                        <div className="text-[10px] text-slate-500 font-semibold">{centre.statLabel}</div>
                      </div>

                      <button
                        onClick={() => setIsAppointmentModalOpen(true)}
                        className="px-6 py-3 rounded-xl text-xs font-extrabold text-[#3A2B0A] shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer"
                        style={goldGradient}
                      >
                        Book Consultation
                      </button>
                    </div>
                  </div>

                  {/* Body Content Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left: Overview & Key Highlights */}
                    <div className="lg:col-span-7 space-y-6">
                      <div>
                        <h3 className="text-sm font-extrabold text-[#0E526B] mb-2">{centre.tagline}</h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{centre.desc}</p>
                      </div>

                      <div>
                        <h4 className="text-xs font-extrabold text-[#0B3446] uppercase tracking-wider mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#1D82A6]" />
                          Clinical Highlights & Key Services
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {centre.highlights.map((item, hIdx) => (
                            <div
                              key={hIdx}
                              className="flex items-start gap-2.5 p-3 rounded-xl bg-[#EDF6FB]/80 border border-[#1D82A6]/15 hover:border-[#1D82A6]/40 transition-all text-xs font-semibold text-[#0B3446]"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C8952E] mt-1.5 shrink-0" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technology Chips */}
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-2">
                          Advanced Tech Installed:
                        </span>
                        <div className="inline-flex flex-wrap gap-2 mt-2">
                          {centre.keyTech.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[11px] px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-extrabold border border-slate-200"
                            >
                              ⚡ {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right: Leading Specialists Cards */}
                    <div className="lg:col-span-5 bg-[#F8FAFC] p-6 rounded-2xl border border-slate-200 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-xs font-extrabold text-[#0B3446] uppercase tracking-wider flex items-center gap-2">
                            <UserCheck className="w-4 h-4 text-[#C8952E]" />
                            Senior Consultants
                          </h4>
                          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                            OPD Active
                          </span>
                        </div>

                        <div className="space-y-3">
                          {centre.doctors.map((doc, dIdx) => (
                            <div key={dIdx} className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-black text-[#0B3446]">{doc.name}</span>
                                <span className="text-[10px] font-bold text-[#C8952E] bg-[#FEF3C7] px-2 py-0.5 rounded-full">
                                  {doc.exp}
                                </span>
                              </div>
                              <div className="text-[11px] font-bold text-[#0E526B]">{doc.role}</div>
                              <div className="text-[10px] text-slate-500 font-mono">{doc.qual}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                        <span className="text-[11px] text-slate-500 font-medium">24/7 Priority Emergency Admissions</span>
                        <button
                          onClick={() => setIsAppointmentModalOpen(true)}
                          className="text-xs font-bold text-[#0A5F7A] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          View Schedule <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.section>

        {/* ───── Trust Guarantee Footer Banner ───── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="relative p-[1.5px] rounded-3xl bg-gradient-to-r from-[#1D82A6]/30 via-[#C8952E]/40 to-[#1D82A6]/30 shadow-md">
            <div className="rounded-[calc(1.5rem-1.5px)] bg-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] flex items-center justify-center text-[#F6D98A] shadow-lg shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[#0B3446]">
                    NABH Accredited Tertiary Care Centre in Jabalpur
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Global Square, Patan Rd, Karmeta, Jabalpur, MP 482002 • Emergency Helpline: 1800-123-6666
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="px-6 py-3 rounded-full text-xs font-extrabold text-[#3A2B0A] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer shrink-0"
                style={goldGradient}
              >
                Book Priority Consultation
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