"use client";

import { useState, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Building2,
  Award,
  Sparkles,
  CheckCircle2,
  Upload,
  MapPin,
  HeartPulse,
  ShieldCheck,
  Mail,
  ChevronRight,
  ChevronLeft,
  Zap,
  Stethoscope,
  Activity,
  ScanEye,
  Users,
  GraduationCap,
  BedDouble,
  Search,
  Salad,
  Eye,
  Syringe,
  FlaskConical,
  Pill,
  Droplet,
  TrendingUp,
  X,
  ArrowRight,
  ShieldAlert,
  Star,
  PhoneCall,
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

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  exp: "Fresher / <1 Year",
  resumeName: "",
  resumeFile: null,
  dataConsent: false,
  isCaptchaVerified: false,
};

/* ───────────── Job categories (orbit nodes) ───────────── */
const categories = [
  { key: "nutrition-rehab", label: "Nutrition & Rehab", icon: Salad },
  { key: "cardiac-perfusion", label: "Cardiac & Perfusion", icon: HeartPulse },
  { key: "sterile-ot", label: "Sterilization & OT", icon: Syringe },
  { key: "diagnostics-lab", label: "Diagnostics & Lab", icon: FlaskConical },
  { key: "nursing-clinical", label: "Nursing & Clinical", icon: Stethoscope },
  { key: "corporate-sales", label: "Corporate & Sales", icon: TrendingUp },
];

/* ───────────── Per-job light-tint color themes ───────────── */
const jobThemes = {
  dietician: {
    cardBg: "linear-gradient(135deg, #FFF7ED 0%, #FFEFD5 100%)",
    iconBg: "linear-gradient(135deg, #FB923C 0%, #EA580C 100%)",
    border: "border-orange-200/70",
    ring: "from-orange-300/40 via-white to-orange-200/50",
    badgeText: "text-orange-700",
    badgeBg: "bg-orange-50 border-orange-200",
    titleAccent: "text-orange-900",
    linkHover: "hover:text-orange-600",
  },
  optometrist: {
    cardBg: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
    iconBg: "linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)",
    border: "border-blue-200/70",
    ring: "from-blue-300/40 via-white to-blue-200/50",
    badgeText: "text-blue-700",
    badgeBg: "bg-blue-50 border-blue-200",
    titleAccent: "text-blue-900",
    linkHover: "hover:text-blue-600",
  },
  physiotherapist: {
    cardBg: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
    iconBg: "linear-gradient(135deg, #4ADE80 0%, #16A34A 100%)",
    border: "border-emerald-200/70",
    ring: "from-emerald-300/40 via-white to-emerald-200/50",
    badgeText: "text-emerald-700",
    badgeBg: "bg-emerald-50 border-emerald-200",
    titleAccent: "text-emerald-900",
    linkHover: "hover:text-emerald-600",
  },
  perfusionist: {
    cardBg: "linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)",
    iconBg: "linear-gradient(135deg, #FB7185 0%, #E11D48 100%)",
    border: "border-rose-200/70",
    ring: "from-rose-300/40 via-white to-rose-200/50",
    badgeText: "text-rose-700",
    badgeBg: "bg-rose-50 border-rose-200",
    titleAccent: "text-rose-900",
    linkHover: "hover:text-rose-600",
  },
  "cath-lab-tech": {
    cardBg: "linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)",
    iconBg: "linear-gradient(135deg, #F472B6 0%, #DB2777 100%)",
    border: "border-pink-200/70",
    ring: "from-pink-300/40 via-white to-pink-200/50",
    badgeText: "text-pink-700",
    badgeBg: "bg-pink-50 border-pink-200",
    titleAccent: "text-pink-900",
    linkHover: "hover:text-pink-600",
  },
  "cssd-tech": {
    cardBg: "linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)",
    iconBg: "linear-gradient(135deg, #2DD4BF 0%, #0D9488 100%)",
    border: "border-teal-200/70",
    ring: "from-teal-300/40 via-white to-teal-200/50",
    badgeText: "text-teal-700",
    badgeBg: "bg-teal-50 border-teal-200",
    titleAccent: "text-teal-900",
    linkHover: "hover:text-teal-600",
  },
  "cssd-incharge": {
    cardBg: "linear-gradient(135deg, #ECFEFF 0%, #CFFAFE 100%)",
    iconBg: "linear-gradient(135deg, #22D3EE 0%, #0891B2 100%)",
    border: "border-cyan-200/70",
    ring: "from-cyan-300/40 via-white to-cyan-200/50",
    badgeText: "text-cyan-700",
    badgeBg: "bg-cyan-50 border-cyan-200",
    titleAccent: "text-cyan-900",
    linkHover: "hover:text-cyan-600",
  },
  "ot-tech": {
    cardBg: "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)",
    iconBg: "linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)",
    border: "border-violet-200/70",
    ring: "from-violet-300/40 via-white to-violet-200/50",
    badgeText: "text-violet-700",
    badgeBg: "bg-violet-50 border-violet-200",
    titleAccent: "text-violet-900",
    linkHover: "hover:text-violet-600",
  },
  "radiology-tech": {
    cardBg: "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)",
    iconBg: "linear-gradient(135deg, #818CF8 0%, #4F46E5 100%)",
    border: "border-indigo-200/70",
    ring: "from-indigo-300/40 via-white to-indigo-200/50",
    badgeText: "text-indigo-700",
    badgeBg: "bg-indigo-50 border-indigo-200",
    titleAccent: "text-indigo-900",
    linkHover: "hover:text-indigo-600",
  },
  phlebotomist: {
    cardBg: "linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)",
    iconBg: "linear-gradient(135deg, #F87171 0%, #DC2626 100%)",
    border: "border-red-200/70",
    ring: "from-red-300/40 via-white to-red-200/50",
    badgeText: "text-red-700",
    badgeBg: "bg-red-50 border-red-200",
    titleAccent: "text-red-900",
    linkHover: "hover:text-red-600",
  },
  "lab-blood-bank-tech": {
    cardBg: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
    iconBg: "linear-gradient(135deg, #FBBF24 0%, #D97706 100%)",
    border: "border-amber-200/70",
    ring: "from-amber-300/40 via-white to-amber-200/50",
    badgeText: "text-amber-700",
    badgeBg: "bg-amber-50 border-amber-200",
    titleAccent: "text-amber-900",
    linkHover: "hover:text-amber-600",
  },
  pharmacist: {
    cardBg: "linear-gradient(135deg, #F7FEE7 0%, #ECFCCB 100%)",
    iconBg: "linear-gradient(135deg, #A3E635 0%, #65A30D 100%)",
    border: "border-lime-200/70",
    ring: "from-lime-300/40 via-white to-lime-200/50",
    badgeText: "text-lime-700",
    badgeBg: "bg-lime-50 border-lime-200",
    titleAccent: "text-lime-900",
    linkHover: "hover:text-lime-600",
  },
  "staff-nurse": {
    cardBg: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
    iconBg: "linear-gradient(135deg, #34D399 0%, #059669 100%)",
    border: "border-green-200/70",
    ring: "from-green-300/40 via-white to-green-200/50",
    badgeText: "text-green-700",
    badgeBg: "bg-green-50 border-green-200",
    titleAccent: "text-green-900",
    linkHover: "hover:text-green-600",
  },
  "infection-control-nurse": {
    cardBg: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)",
    iconBg: "linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)",
    border: "border-sky-200/70",
    ring: "from-sky-300/40 via-white to-sky-200/50",
    badgeText: "text-sky-700",
    badgeBg: "bg-sky-50 border-sky-200",
    titleAccent: "text-sky-900",
    linkHover: "hover:text-sky-600",
  },
  "assistant-nursing-superintendent": {
    cardBg: "linear-gradient(135deg, #FDF4FF 0%, #FAE8FF 100%)",
    iconBg: "linear-gradient(135deg, #E879F9 0%, #C026D3 100%)",
    border: "border-fuchsia-200/70",
    ring: "from-fuchsia-300/40 via-white to-fuchsia-200/50",
    badgeText: "text-fuchsia-700",
    badgeBg: "bg-fuchsia-50 border-fuchsia-200",
    titleAccent: "text-fuchsia-900",
    linkHover: "hover:text-fuchsia-600",
  },
  "medical-officer-mbbs": {
    cardBg: "linear-gradient(135deg, #F0FDFA 0%, #99F6E4 30%, #ECFEFF 100%)",
    iconBg: "linear-gradient(135deg, #2DD4BF 0%, #0E7490 100%)",
    border: "border-teal-200/70",
    ring: "from-teal-300/40 via-white to-cyan-200/50",
    badgeText: "text-teal-700",
    badgeBg: "bg-teal-50 border-teal-200",
    titleAccent: "text-teal-900",
    linkHover: "hover:text-teal-600",
  },
  "senior-manager": {
    cardBg: "linear-gradient(135deg, #EEF2FF 0%, #C7D2FE 100%)",
    iconBg: "linear-gradient(135deg, #6366F1 0%, #4338CA 100%)",
    border: "border-indigo-200/70",
    ring: "from-indigo-300/40 via-white to-indigo-200/50",
    badgeText: "text-indigo-700",
    badgeBg: "bg-indigo-50 border-indigo-200",
    titleAccent: "text-indigo-900",
    linkHover: "hover:text-indigo-600",
  },
  manager: {
    cardBg: "linear-gradient(135deg, #FEFCE8 0%, #FEF08A 60%, #FFFBEB 100%)",
    iconBg: "linear-gradient(135deg, #FACC15 0%, #CA8A04 100%)",
    border: "border-yellow-200/70",
    ring: "from-yellow-300/40 via-white to-yellow-200/50",
    badgeText: "text-yellow-700",
    badgeBg: "bg-yellow-50 border-yellow-200",
    titleAccent: "text-yellow-900",
    linkHover: "hover:text-yellow-600",
  },
  "deputy-manager": {
    cardBg: "linear-gradient(135deg, #FFF7ED 0%, #FED7AA 60%, #FFF7ED 100%)",
    iconBg: "linear-gradient(135deg, #FB923C 0%, #C2410C 100%)",
    border: "border-orange-200/70",
    ring: "from-orange-300/40 via-white to-orange-200/50",
    badgeText: "text-orange-700",
    badgeBg: "bg-orange-50 border-orange-200",
    titleAccent: "text-orange-900",
    linkHover: "hover:text-orange-600",
  },
  "assistant-manager": {
    cardBg: "linear-gradient(135deg, #FDF2F8 0%, #FBCFE8 60%, #FDF2F8 100%)",
    iconBg: "linear-gradient(135deg, #F472B6 0%, #BE185D 100%)",
    border: "border-pink-200/70",
    ring: "from-pink-300/40 via-white to-pink-200/50",
    badgeText: "text-pink-700",
    badgeBg: "bg-pink-50 border-pink-200",
    titleAccent: "text-pink-900",
    linkHover: "hover:text-pink-600",
  },
  executive: {
    cardBg: "linear-gradient(135deg, #ECFDF5 0%, #A7F3D0 60%, #ECFDF5 100%)",
    iconBg: "linear-gradient(135deg, #34D399 0%, #047857 100%)",
    border: "border-emerald-200/70",
    ring: "from-emerald-300/40 via-white to-emerald-200/50",
    badgeText: "text-emerald-700",
    badgeBg: "bg-emerald-50 border-emerald-200",
    titleAccent: "text-emerald-900",
    linkHover: "hover:text-emerald-600",
  },
  trainee: {
    cardBg: "linear-gradient(135deg, #EFF6FF 0%, #BFDBFE 60%, #EFF6FF 100%)",
    iconBg: "linear-gradient(135deg, #60A5FA 0%, #1D4ED8 100%)",
    border: "border-blue-200/70",
    ring: "from-blue-300/40 via-white to-blue-200/50",
    badgeText: "text-blue-700",
    badgeBg: "bg-blue-50 border-blue-200",
    titleAccent: "text-blue-900",
    linkHover: "hover:text-blue-600",
  },
};

const defaultTheme = {
  cardBg: "linear-gradient(135deg, #EDF6FB 0%, #DCEEF6 100%)",
  iconBg: "linear-gradient(135deg, #2A8FAF 0%, #0A5F7A 100%)",
  border: "border-[#1D82A6]/20",
  ring: "from-[#1D82A6]/30 via-white to-[#C8952E]/40",
  badgeText: "text-[#0E526B]",
  badgeBg: "bg-[#EDF6FB] border-[#1D82A6]/15",
  titleAccent: "text-[#0B3446]",
  linkHover: "hover:text-[#C8952E]",
};

/* ───────────── All 22 job openings ───────────── */
const LOC = "Apollo Hospitals Jabalpur";
const jobsList = [
  { id: "dietician", title: "Dietician", category: "nutrition-rehab", dept: "Dietetics & Nutrition", type: "Full Time", location: LOC, icon: Salad },
  { id: "optometrist", title: "Optometrist", category: "nutrition-rehab", dept: "Ophthalmology", type: "Full Time", location: LOC, icon: Eye },
  { id: "physiotherapist", title: "Physiotherapist", category: "nutrition-rehab", dept: "Physiotherapy & Rehabilitation", type: "Full Time", location: LOC, icon: Activity },
  { id: "perfusionist", title: "Perfusionist", category: "cardiac-perfusion", dept: "Cardiology & Cardiothoracic Surgery", type: "Full Time", location: LOC, icon: HeartPulse },
  { id: "cath-lab-tech", title: "Cath Lab Technician", category: "cardiac-perfusion", dept: "Cardiology & Cath Labs", type: "Full Time", location: LOC, icon: HeartPulse },
  { id: "cssd-tech", title: "CSSD Technician", category: "sterile-ot", dept: "Sterilization & Infection Control", type: "Full Time", location: LOC, icon: Syringe },
  { id: "cssd-incharge", title: "CSSD Incharge", category: "sterile-ot", dept: "Sterilization & Infection Control", type: "Full Time", location: LOC, icon: Syringe },
  { id: "ot-tech", title: "OT Technician", category: "sterile-ot", dept: "Surgery & Operation Theatre (OT)", type: "Full Time", location: LOC, icon: Syringe },
  { id: "radiology-tech", title: "Radiology Technician", category: "diagnostics-lab", dept: "Radiology", type: "Full Time", location: LOC, icon: ScanEye },
  { id: "phlebotomist", title: "Phlebotomist", category: "diagnostics-lab", dept: "Pathology", type: "Full Time", location: LOC, icon: Droplet },
  { id: "lab-blood-bank-tech", title: "Lab & Blood Bank Technician", category: "diagnostics-lab", dept: "Pathology & Blood Bank", type: "Full Time", location: LOC, icon: FlaskConical },
  { id: "pharmacist", title: "Pharmacist", category: "diagnostics-lab", dept: "Clinical, Pharmacy", type: "Full Time", location: LOC, icon: Pill },
  { id: "staff-nurse", title: "Staff Nurse – Ward, ICU, Oncology, ER", category: "nursing-clinical", dept: "Clinical, Nursing", type: "Full Time", location: LOC, icon: Stethoscope },
  { id: "infection-control-nurse", title: "Infection Control Nurse", category: "nursing-clinical", dept: "Clinical, Nursing", type: "Full Time", location: LOC, icon: ShieldCheck },
  { id: "assistant-nursing-superintendent", title: "Assistant Nursing Superintendent", category: "nursing-clinical", dept: "Clinical", type: "Full Time", location: LOC, icon: Stethoscope },
  { id: "medical-officer-mbbs", title: "Medical Officer (MBBS) Job in Jabalpur", category: "nursing-clinical", dept: "Clinical", type: "Full Time", location: LOC, icon: Stethoscope },
  { id: "senior-manager", title: "Senior Manager", category: "corporate-sales", dept: "Marketing & Sales", type: "Full Time", location: LOC, icon: Briefcase },
  { id: "manager", title: "Manager", category: "corporate-sales", dept: "Marketing & Sales", type: "Full Time", location: LOC, icon: Briefcase },
  { id: "deputy-manager", title: "Deputy Manager", category: "corporate-sales", dept: "Marketing & Sales", type: "Full Time", location: LOC, icon: Briefcase },
  { id: "assistant-manager", title: "Assistant Manager", category: "corporate-sales", dept: "Marketing & Sales", type: "Full Time", location: LOC, icon: Briefcase },
  { id: "executive", title: "Executive", category: "corporate-sales", dept: "Marketing & Sales", type: "Full Time", location: LOC, icon: TrendingUp },
  { id: "trainee", title: "Trainee", category: "corporate-sales", dept: "Marketing & Sales", type: "Full Time", location: LOC, icon: GraduationCap },
];

/* ───────────── Circular orbit category selector ───────────── */
function CareerOrbitSelector({ activeCategory, setActiveCategory, counts }) {
  const activeMeta =
    categories.find((c) => c.key === activeCategory) || categories[0];
  const ActiveIcon = activeMeta.icon;
  const radius = 140;

  return (
    <div className="relative w-full flex items-center justify-center py-6">
      <div className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px]">
        {/* dashed orbit ring */}
        <div className="absolute inset-0 rounded-full border border-dashed border-[#1D82A6]/25" />
        <div className="absolute inset-6 rounded-full border border-dotted border-[#C8952E]/25" />

        {/* Center circle */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-white shadow-[0_25px_60px_rgba(10,95,122,0.25)] border border-[#1D82A6]/15 flex flex-col items-center justify-center text-center px-3"
        >
          <span className="inline-flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-[#1D82A6] mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1D82A6]" />
            Complete Care
          </span>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center shadow-md mb-1.5"
            style={goldGradient}
          >
            <ActiveIcon className="w-[18px] h-[18px] text-[#3A2B0A]" />
          </div>
          <h3 className="font-serif-apollo text-xs sm:text-sm font-black text-[#0B3446] leading-snug">
            {activeMeta.label}
          </h3>
          <span className="text-[9px] font-bold text-[#C8952E] mt-1">
            {counts[activeMeta.key] || 0} Open Roles
          </span>
        </motion.div>

        {/* Orbit nodes */}
        {categories.map((cat, i) => {
          const angle = -90 + i * (360 / categories.length);
          const rad = (angle * Math.PI) / 180;
          const x = radius * Math.cos(rad);
          const y = radius * Math.sin(rad);
          const isActive = cat.key === activeCategory;
          const Icon = cat.icon;

          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => setActiveCategory(cat.key)}
              className="absolute left-1/2 top-1/2 flex flex-col items-center gap-1 cursor-pointer group"
              style={{
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
              }}
            >
              <span
                className={`text-[8px] font-black transition-colors ${
                  isActive
                    ? "text-[#C8952E]"
                    : "text-slate-400 group-hover:text-[#1D82A6]"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-lg border-2 transition-all duration-300 ${
                  isActive
                    ? "border-white scale-110"
                    : "bg-white border-[#1D82A6]/15 hover:border-[#1D82A6]/40"
                }`}
                style={isActive ? goldGradient : undefined}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-full border-2 border-[#F6D98A] animate-ping opacity-40" />
                )}
                <Icon
                  className={`w-5 h-5 ${isActive ? "text-[#3A2B0A]" : "text-[#0E526B]"}`}
                />
              </motion.div>
              <span
                className={`text-[8px] sm:text-[9px] font-bold text-center max-w-[62px] leading-tight transition-colors ${
                  isActive
                    ? "text-[#0B3446]"
                    : "text-slate-400 group-hover:text-[#0E526B]"
                }`}
              >
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function CareersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [appSubmitted, setAppSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [appForm, setAppForm] = useState(EMPTY_FORM);
  const [mounted, setMounted] = useState(false);

  const [activeCategory, setActiveCategory] = useState(categories[0].key);
  const [searchQuery, setSearchQuery] = useState("");

  // needed so createPortal only runs in the browser
  useEffect(() => {
    setMounted(true);
  }, []);

  const openApply = (job) => {
    setAppForm(EMPTY_FORM);
    setAppSubmitted(false);
    setSelectedJob(job);
  };
  const closeApply = () => setSelectedJob(null);

  // ESC closes the modal + lock page scroll while it is open
  useEffect(() => {
    if (!selectedJob) return;
    const onKey = (e) => {
      if (e.key === "Escape") setSelectedJob(null);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedJob]);

  const counts = useMemo(() => {
    const c = {};
    categories.forEach((cat) => {
      c[cat.key] = jobsList.filter((j) => j.category === cat.key).length;
    });
    return c;
  }, []);

  const filteredJobs = useMemo(() => {
    return jobsList.filter((j) => {
      const matchesCategory = j.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        j.title.toLowerCase().includes(q) ||
        j.dept.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const groupStats = [
    { value: "50+", label: "Hospitals across India & abroad", icon: Building2 },
    { value: "8,500+", label: "Managed hospital beds", icon: BedDouble },
    { value: "20,000+", label: "Doctors, nurses & clinical staff", icon: Users },
    { value: "1983", label: "Pioneering Indian healthcare since", icon: Award },
  ];

  const handleAppSubmit = async (e) => {
    e.preventDefault();
    if (!appForm.dataConsent || !appForm.isCaptchaVerified || !appForm.resumeFile) return;

    setSubmitting(true);
    try {
      // TODO: send to your backend. Right now nothing is sent anywhere.
      // const fd = new FormData();
      // fd.append("jobId", selectedJob.id);
      // fd.append("jobTitle", selectedJob.title);
      // fd.append("name", appForm.name);
      // fd.append("email", appForm.email);
      // fd.append("phone", appForm.phone);
      // fd.append("exp", appForm.exp);
      // fd.append("resume", appForm.resumeFile);
      // const res = await fetch("/api/apply", { method: "POST", body: fd });
      // if (!res.ok) throw new Error("Failed");
      setAppSubmitted(true);
    } catch (err) {
      alert("Could not submit your application. Please try again or email your CV.");
    } finally {
      setSubmitting(false);
    }
  };

  const goPrevCategory = () => {
    const idx = categories.findIndex((c) => c.key === activeCategory);
    const prev = (idx - 1 + categories.length) % categories.length;
    setActiveCategory(categories[prev].key);
  };
  const goNextCategory = () => {
    const idx = categories.findIndex((c) => c.key === activeCategory);
    const next = (idx + 1) % categories.length;
    setActiveCategory(categories[next].key);
  };

  return (
    <main className="relative min-h-screen bg-[#EDF6FB] text-slate-900 pt-38 pb-20 selection:bg-[#1D82A6] selection:text-white overflow-hidden">
      {/* ───── Background Orbs + keyframes ───── */}
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
        .car-orb-3 {
          width: 300px;
          height: 300px;
          bottom: 0;
          left: 30%;
          background: radial-gradient(circle, #cdeaf7, transparent 70%);
          opacity: 0.4;
          animation: carFloat1 19s ease-in-out infinite;
        }
        @keyframes carFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 40px) scale(1.08); }
        }
        @keyframes carFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.06); }
        }
        .marquee-track {
          animation: statsMarquee 20s linear infinite;
        }
        .stats-marquee-container:hover .marquee-track {
          animation-play-state: paused;
        }
        @keyframes statsMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.333%); }
        }
                  @keyframes carFloatCard {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .car-float-card { animation: carFloatCard 4.5s ease-in-out infinite; }
        @keyframes carPulseRing {
          0% { transform: scale(0.9); opacity: 0.7; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        .car-pulse-ring { animation: carPulseRing 2s ease-out infinite; }
        @keyframes carShimmerSweep {
          0% { transform: translateX(-120%) skewX(-12deg); }
          100% { transform: translateX(220%) skewX(-12deg); }
        }
        .car-shimmer::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: translateX(-120%) skewX(-12deg);
        }
        .car-shimmer:hover::after { animation: carShimmerSweep 1s ease forwards; }
      `}</style>

      {/* Dotted texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="car-orb car-orb-1" />
        <div className="car-orb car-orb-2" />
        <div className="car-orb car-orb-3" />
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
        
                {/* ───── Hero Header Section ───── */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mt-6 mb-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* LEFT: content */}
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#1D82A6]/20 text-[#0E526B] text-xs font-bold shadow-sm mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1D82A6] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1D82A6]" />
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#C8952E]" />
                <span>
                  Work With Asia's Healthcare Leader • Apollo Hospitals Jabalpur
                </span>
              </motion.div>

              <h1 className="font-serif-apollo text-4xl sm:text-5xl lg:text-[3.4rem] font-black tracking-tight leading-[1.08] text-[#0B3446] mb-5">
                Build Your Career in{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #C8952E 0%, #1D82A6 100%)",
                  }}
                >
                  Medical Excellence
                </span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mb-8">
                Join Asia's premier healthcare group. We invite passionate
                doctors, nurses, technicians, and administrative professionals
                to shape the future of medicine in Central India.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <motion.a
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  href="mailto:jabalpur_careers@apollohospitals.com"
                  className="car-shimmer relative overflow-hidden px-6 py-3.5 rounded-full text-xs sm:text-sm font-black text-[#3A2B0A] shadow-[0_10px_30px_rgba(200,149,46,0.35)] hover:shadow-xl transition-all cursor-pointer inline-flex items-center gap-2.5"
                  style={goldGradient}
                >
                  <Mail className="w-4 h-4" />
                  <span>Email CV: jabalpur_careers@apollohospitals.com</span>
                </motion.a>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {[
                  { value: `${jobsList.length}`, label: "Open Roles" },
                  { value: "50+", label: "Hospitals" },
                  { value: "20,000+", label: "Clinical Staff" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-slate-200 shadow-sm"
                  >
                    <span className="text-sm font-black text-[#0B3446] animate-bounce">
                      {s.value}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: image + floating cards */}
            <div className="lg:col-span-6 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                className="relative rounded-[2rem] overflow-hidden shadow-[0_30px_70px_rgba(10,95,122,0.25)] border-4 border-white"
              >
                <img
                  src="/images/careers/career.png"
                  alt="Apollo Hospitals Jabalpur careers"
                  className="w-full h-[340px] sm:h-[420px] lg:h-[460px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B3446]/40 via-transparent to-transparent" />
              </motion.div>

              {/* top-left floating card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="car-float-card absolute -top-5 -left-4 sm:-left-8 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-[#EDF6FB] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-[#1D82A6]" />
                </div>
                <div>
                  <div className="text-sm font-black text-[#0B3446] leading-none">
                    20,000+
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                    Doctors, nurses & staff
                  </div>
                </div>
              </motion.div>

              {/* bottom floating card */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="car-float-card absolute -bottom-6 left-4 right-4 sm:left-8 sm:right-8 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3.5 flex items-center justify-between gap-3"
                style={{ animationDelay: "1s" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={goldGradient}
                  >
                    <Award className="w-5 h-5 text-[#3A2B0A]" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-[#0B3446] leading-none">
                      Since 1983
                    </div>
                    <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                      Pioneering Indian healthcare
                    </div>
                  </div>
                </div>
                <a
                  href="#job-openings"
                  className="px-3.5 py-2 scroll-mt-32 rounded-full bg-[#0E526B] text-white text-[11px] font-bold hover:bg-[#0A5F7A] transition-colors shrink-0"
                >
                  View Jobs
                </a>
              </motion.div>

              {/* top-right HR helpline pill */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute top-6 right-6 sm:right-10"
              >
                <a
                  href="tel:18001236666"
                  className="relative flex items-center gap-2 bg-[#0E526B] text-white rounded-full pl-3 pr-4 py-2.5 shadow-lg hover:bg-[#0A5F7A] transition-colors"
                >
                  <span className="relative flex h-8 w-8 items-center justify-center shrink-0">
                    <span className="car-pulse-ring absolute inline-flex h-full w-full rounded-full bg-white/50" />
                    <span className="relative inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/15">
                      <PhoneCall className="w-3.5 h-3.5" />
                    </span>
                  </span>
                  <div className="leading-tight">
                    <div className="text-[9px] font-semibold text-sky-100">
                      HR Helpline
                    </div>
                    <div className="text-[11px] font-black">1800-123-6666</div>
                  </div>
                </a>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ───── Group-wide scale strip ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        >
          <div className="relative p-[1.5px] rounded-[2rem] bg-gradient-to-r from-[#1D82A6]/40 via-[#F6D98A]/50 to-[#C8952E]/50 shadow-lg">
            <div className="stats-marquee-container relative bg-white rounded-[calc(2rem-1.5px)] p-6 sm:p-8 overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

              <div className="marquee-track flex items-center gap-12 w-max">
                {[...groupStats, ...groupStats, ...groupStats].map((s, sIdx) => {
                  const SIcon = s.icon;
                  return (
                    <div key={sIdx} className="flex items-center gap-3 shrink-0">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0A5F7A] to-[#2A8FAF] text-[#F6D98A] flex items-center justify-center shadow-md shrink-0">
                        <SIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-black text-[#0B3446] leading-none">
                          {s.value}
                        </div>
                        <div className="text-[11px] text-slate-500 font-semibold mt-1 leading-snug">
                          {s.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ───── Why Join Apollo Benefits Cards ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        >
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="font-serif-apollo text-2xl sm:text-3xl font-black text-[#0B3446]">
              Why Professionals Choose{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #1D82A6 0%, #0E526B 50%, #C8952E 100%)",
                }}
              >
                Apollo Jabalpur
              </span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Cutting-Edge Technology",
                desc: "Work with CyberKnife, Robotic Joint, 3T MRI & EBUS diagnostic systems.",
                icon: Zap,
              },
              {
                title: "Global Growth & Learning",
                desc: "CME credits, continuous medical education, and fellowship opportunities.",
                icon: GraduationCap,
              },
              {
                title: "Competitive Remuneration",
                desc: "Industry-best compensation, medical insurance for family & incentives.",
                icon: ShieldCheck,
              },
              {
                title: "Work-Life Harmony",
                desc: "Structured shift rosters, supportive nursing management & transparent culture.",
                icon: HeartPulse,
              },
            ].map((b, bIdx) => {
              const BIcon = b.icon;
              return (
                <motion.div
                  key={bIdx}
                  variants={fadeUp}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="p-6 rounded-3xl bg-white border border-[#1D82A6]/15 shadow-md hover:shadow-xl transition-shadow space-y-2"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center font-bold shadow-md"
                    style={goldGradient}
                  >
                    <BIcon className="w-5 h-5 text-[#3A2B0A]" />
                  </div>
                  <h3 className="font-serif-apollo text-base font-extrabold text-[#0B3446]">
                    {b.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ───── Current Job Openings ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mb-16"
        >
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#0E526B] text-xs font-extrabold border border-[#1D82A6]/30 shadow-sm mb-3">
              <Stethoscope className="w-3.5 h-3.5 text-[#C8952E]" />
              Careers at Apollo JBP
            </span>
            <h2 className="font-serif-apollo text-2xl sm:text-3xl font-black text-[#0B3446]">
              Current Job Openings —{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #1D82A6 0%, #0E526B 50%, #C8952E 100%)",
                }}
              >
                Explore by Department
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              Tap a department in the wheel to browse matching roles on the right.
            </p>
          </motion.div>

          {/* Search bar */}
          <motion.div variants={fadeUp} className="max-w-xl mx-auto">
            <div className="relative flex items-center bg-white rounded-2xl shadow-md border border-[#1D82A6]/15 p-1.5 focus-within:border-[#1D82A6] transition-colors">
              <Search className="w-4 h-4 text-[#1D82A6] ml-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roles — e.g. Nurse, Technician, Manager..."
                className="w-full px-3 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 mr-1 cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: orbit selector */}
            <motion.div variants={fadeUp} className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="relative p-[1.5px] rounded-[2rem] bg-gradient-to-br from-[#1D82A6]/30 via-white to-[#C8952E]/40 shadow-lg">
                <div className="bg-white rounded-[calc(2rem-1.5px)] py-4 px-2 sm:px-4">
                  <CareerOrbitSelector
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    counts={counts}
                  />
                  <p className="text-center text-[10px] font-bold uppercase tracking-widest text-yellow-600 -mt-2 mb-4">
                    Scroll to Explore
                  </p>

                  <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap px-2 pb-2">
                    <button
                      type="button"
                      onClick={goPrevCategory}
                      className="w-8 h-8 rounded-full bg-white border border-[#1D82A6]/25 text-[#0E526B] flex items-center justify-center shadow-sm hover:bg-[#0E526B] hover:text-white transition-all cursor-pointer shrink-0"
                      aria-label="Previous department"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-1.5 flex-wrap justify-center">
                      {categories.map((cat, i) => (
                        <button
                          key={cat.key}
                          type="button"
                          onClick={() => setActiveCategory(cat.key)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                            activeCategory === cat.key
                              ? "text-[#3A2B0A] border-transparent shadow-md"
                              : "bg-white text-slate-500 border-slate-200 hover:border-[#1D82A6]/40 hover:text-[#0E526B]"
                          }`}
                          style={activeCategory === cat.key ? goldGradient : undefined}
                        >
                          <span className="opacity-70">{String(i + 1).padStart(2, "0")}</span>
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={goNextCategory}
                      className="w-8 h-8 rounded-full bg-white border border-[#1D82A6]/25 text-[#0E526B] flex items-center justify-center shadow-sm hover:bg-[#0E526B] hover:text-white transition-all cursor-pointer shrink-0"
                      aria-label="Next department"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: filtered job cards */}
            <motion.div variants={fadeUp} className="lg:col-span-7">
              <div className="lg:max-h-[640px] lg:overflow-y-auto lg:pr-1 space-y-4 lg:space-y-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory + searchQuery}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5"
                  >
                    {filteredJobs.length > 0 ? (
                      filteredJobs.map((job, idx) => {
                        const JIcon = job.icon || Briefcase;
                        const theme = jobThemes[job.id] || defaultTheme;
                        return (
                          <motion.div
                            key={job.id}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: idx * 0.03 }}
                            whileHover={{ y: -5 }}
                            className={`relative p-[1.5px] rounded-[1.5rem] bg-gradient-to-br ${theme.ring} shadow-md hover:shadow-xl transition-shadow duration-300`}
                          >
                            <div
                              className={`rounded-[calc(1.5rem-1.5px)] p-5 h-full flex flex-col justify-between border ${theme.border}`}
                              style={{ background: theme.cardBg }}
                            >
                              <div>
                                <div className="flex items-center justify-between mb-3">
                                  <div
                                    className="w-10 h-10 rounded-xl text-white flex items-center justify-center shadow-sm shrink-0"
                                    style={{ background: theme.iconBg }}
                                  >
                                    <JIcon className="w-5 h-5" />
                                  </div>
                                  <span
                                    className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${theme.badgeBg} ${theme.badgeText}`}
                                  >
                                    {job.type}
                                  </span>
                                </div>

                                <h3
                                  className={`font-serif-apollo text-sm font-black leading-snug mb-1.5 ${theme.titleAccent}`}
                                >
                                  {job.title} – Apollo Hospitals Jabalpur
                                </h3>
                                <p className="text-[11px] text-slate-600 font-semibold">
                                  {job.dept}
                                </p>

                                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold mt-2">
                                  <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                                  <span>{job.location}</span>
                                </div>
                              </div>

                              <div className="mt-4 flex items-center justify-between gap-2">
                                <Link
                                  href={`/careers/${job.id}`}
                                  className={`inline-flex items-center gap-1 text-[11px] font-extrabold text-[#0B3446] ${theme.linkHover} transition-colors cursor-pointer`}
                                >
                                  More Details
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </Link>

                                <button
                                  type="button"
                                  onClick={() => openApply(job)}
                                  className="px-3.5 py-1.5 rounded-full text-[11px] font-extrabold text-[#3A2B0A] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
                                  style={goldGradient}
                                >
                                  Apply Now
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })
                    ) : (
                      <div className="col-span-full text-center py-14 bg-white rounded-3xl border border-[#1D82A6]/15 shadow-sm">
                        <Search className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                        <p className="text-sm font-bold text-[#0B3446]">
                          No roles match your search in this department.
                        </p>
                        <button
                          type="button"
                          onClick={() => setSearchQuery("")}
                          className="mt-3 text-xs font-extrabold text-[#1D82A6] hover:text-[#C8952E] cursor-pointer"
                        >
                          Clear search
                        </button>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
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
                    Apollo JBP Hospitals • Human Resources Department
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Email CV: jabalpur_careers@apollohospitals.com • Phone: 1800-123-6666.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-semibold shrink-0">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>
                  We never ask for money, bank details, or payments during recruitment.
                </span>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* ───── Job Application Modal (rendered in a portal on <body>) ───── */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedJob && (
              <motion.div
                key="apply-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={closeApply}
                className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 12 }}
                  onClick={(e) => e.stopPropagation()}
                  role="dialog"
                  aria-modal="true"
                  className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-[#1D82A6] relative max-h-[90vh] overflow-y-auto"
                >
                  <button
                    type="button"
                    onClick={closeApply}
                    className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {!appSubmitted ? (
                    <form onSubmit={handleAppSubmit} className="space-y-4 text-xs">
                      <div className="flex items-start justify-between gap-3 pr-8">
                        <div>
                          <span className="text-[10px] font-black uppercase text-[#C8952E]">
                            Job Application
                          </span>
                          <h3 className="font-serif-apollo text-xl font-black text-[#0B3446]">
                            {selectedJob.title}
                          </h3>
                          <p className="text-[11px] text-slate-500 mt-1">
                            {selectedJob.dept} • {selectedJob.location}
                          </p>
                        </div>
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center shadow-md shrink-0 text-white"
                          style={{
                            background: (jobThemes[selectedJob.id] || defaultTheme).iconBg,
                          }}
                        >
                          {(() => {
                            const JIcon = selectedJob.icon || Briefcase;
                            return <JIcon className="w-5 h-5" />;
                          })()}
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={appForm.name}
                          onChange={(e) => setAppForm({ ...appForm, name: e.target.value })}
                          placeholder="e.g. Ramesh Sharma"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#1D82A6] focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">
                            Email Address *
                          </label>
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
                          <label className="block font-bold text-slate-700 mb-1">
                            Phone Number *
                          </label>
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
                        <label className="block font-bold text-slate-700 mb-1">
                          Years of Job Experience *
                        </label>
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

                      {/* Resume upload (sr-only, NOT hidden, so validation works) */}
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">
                          Resume / CV Document *
                        </label>

                        <label
                          htmlFor="cv-file"
                          className={`border-2 border-dashed rounded-xl p-4 text-center transition-all cursor-pointer block ${
                            appForm.resumeName
                              ? "border-emerald-500 bg-emerald-50/60"
                              : "border-slate-300 hover:border-[#1D82A6] bg-slate-50 hover:bg-slate-100/70"
                          }`}
                        >
                          <Upload
                            className={`w-6 h-6 mx-auto mb-1 transition-colors ${
                              appForm.resumeName ? "text-emerald-600" : "text-[#1D82A6]"
                            }`}
                          />
                          <span
                            className={`text-xs font-semibold block ${
                              appForm.resumeName ? "text-emerald-800" : "text-slate-600"
                            }`}
                          >
                            {appForm.resumeName || "Click to attach PDF / DOC Resume"}
                          </span>
                          <span className="text-[10px] text-slate-400 mt-1 block">
                            Supported formats: PDF, DOC, DOCX (max 5 MB)
                          </span>

                          <input
                            type="file"
                            id="cv-file"
                            required={!appForm.resumeFile}
                            accept=".pdf,.doc,.docx"
                            className="sr-only"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              if (file.size > 5 * 1024 * 1024) {
                                alert("File is too large. Please upload a file under 5 MB.");
                                e.target.value = "";
                                return;
                              }
                              setAppForm({
                                ...appForm,
                                resumeName: file.name,
                                resumeFile: file,
                              });
                            }}
                          />
                        </label>

                        

                        {appForm.resumeName && (
                          <div className="flex justify-end mt-1">
                            <button
                              type="button"
                              onClick={() =>
                                setAppForm({ ...appForm, resumeName: "", resumeFile: null })
                              }
                              className="text-[10px] font-bold text-rose-600 hover:underline cursor-pointer"
                            >
                              Remove selected file
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Consent + captcha */}
                      <div className="space-y-3 pt-2">
                        <label className="flex items-start gap-2.5 text-slate-700 text-[11px] leading-relaxed cursor-pointer select-none">
                          <input
                            type="checkbox"
                            required
                            checked={appForm.dataConsent}
                            onChange={(e) =>
                              setAppForm({ ...appForm, dataConsent: e.target.checked })
                            }
                            className="mt-0.5 rounded border-slate-300 accent-[#1D82A6] w-4 h-4 shrink-0"
                          />
                          <span>
                            By using this form you agree with the storage and handling of your
                            data by this website.{" "}
                            <span className="text-rose-500 font-bold">*</span>
                          </span>
                        </label>

                        {/* Mock reCAPTCHA (see note below the code for the real one) */}
                        <div className="p-3 bg-[#F9F9F9] border border-[#D3D3D3] rounded-md max-w-[280px] flex items-center justify-between shadow-sm">
                          <label className="flex items-center gap-3 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              required
                              checked={appForm.isCaptchaVerified}
                              onChange={(e) =>
                                setAppForm({
                                  ...appForm,
                                  isCaptchaVerified: e.target.checked,
                                })
                              }
                              className="w-6 h-6 accent-blue-600 cursor-pointer"
                            />
                            <span className="text-xs font-normal text-slate-700">
                              I'm not a robot
                            </span>
                          </label>
                          <div className="flex flex-col items-center justify-center pl-2">
                            <svg
                              className="w-6 h-6 text-blue-500 animate-spin"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                            >
                              <path
                                d="M21 12a9 9 0 1 1-9-9c2.5 0 4.9 1 6.7 2.7L21 8"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span className="text-[8px] font-bold text-slate-400 mt-0.5">
                              reCAPTCHA
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={closeApply}
                          className="px-4 py-2.5 rounded-xl text-slate-500 hover:bg-slate-100 font-bold cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="px-6 py-2.5 rounded-xl text-[#3A2B0A] font-extrabold shadow-md cursor-pointer hover:brightness-105 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                          style={goldGradient}
                        >
                          {submitting ? "Submitting..." : "Submit Job Application"}
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
                        Thank you, <span className="font-bold">{appForm.name}</span>. Apollo HR
                        recruitment team will review your CV for{" "}
                        <span className="font-bold">{selectedJob.title}</span> and contact you
                        shortly.
                      </p>
                      <button
                        type="button"
                        onClick={closeApply}
                        className="px-6 py-2.5 rounded-full bg-[#0A5F7A] text-white font-extrabold cursor-pointer"
                      >
                        Done
                      </button>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </main>
  );
}