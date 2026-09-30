"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import {
  Briefcase,
  Building2,
  Award,
  Sparkles,
  CheckCircle2,
  Upload,
  Clock,
  MapPin,
  HeartPulse,
  ShieldCheck,
  Mail,
  ChevronLeft,
  Stethoscope,
  Activity,
  ScanEye,
  GraduationCap,
  Salad,
  Eye,
  Syringe,
  FlaskConical,
  Pill,
  Droplet,
  TrendingUp,
  ShieldAlert,
  Send,
  PhoneCall,
} from "lucide-react";
import jobsData from "../../../data/jobsData.json";
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

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  exp: "1-3 Years",
  notes: "",
  resumeName: "",
  resumeFile: null,
  dataConsent: false,
  isCaptchaVerified: false,
};

// Icon map helper (icon name in jobsData.json -> component)
const iconMap = {
  Salad,
  Eye,
  Activity,
  HeartPulse,
  Syringe,
  ScanEye,
  Droplet,
  FlaskConical,
  Pill,
  Stethoscope,
  ShieldCheck,
  Briefcase,
  TrendingUp,
  GraduationCap,
};

// Per-job light-tint color themes (same colours as the careers list page)
const jobThemes = {
  dietician: {
    cardBg: "linear-gradient(135deg, #FFF7ED 0%, #FFEFD5 100%)",
    iconBg: "linear-gradient(135deg, #FB923C 0%, #EA580C 100%)",
    badgeText: "text-orange-700",
    badgeBg: "bg-orange-50 border-orange-200",
    titleAccent: "text-orange-900",
  },
  optometrist: {
    cardBg: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
    iconBg: "linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)",
    badgeText: "text-blue-700",
    badgeBg: "bg-blue-50 border-blue-200",
    titleAccent: "text-blue-900",
  },
  physiotherapist: {
    cardBg: "linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)",
    iconBg: "linear-gradient(135deg, #4ADE80 0%, #16A34A 100%)",
    badgeText: "text-emerald-700",
    badgeBg: "bg-emerald-50 border-emerald-200",
    titleAccent: "text-emerald-900",
  },
  perfusionist: {
    cardBg: "linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)",
    iconBg: "linear-gradient(135deg, #FB7185 0%, #E11D48 100%)",
    badgeText: "text-rose-700",
    badgeBg: "bg-rose-50 border-rose-200",
    titleAccent: "text-rose-900",
  },
  "cath-lab-tech": {
    cardBg: "linear-gradient(135deg, #FDF2F8 0%, #FCE7F3 100%)",
    iconBg: "linear-gradient(135deg, #F472B6 0%, #DB2777 100%)",
    badgeText: "text-pink-700",
    badgeBg: "bg-pink-50 border-pink-200",
    titleAccent: "text-pink-900",
  },
  "cssd-tech": {
    cardBg: "linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%)",
    iconBg: "linear-gradient(135deg, #2DD4BF 0%, #0D9488 100%)",
    badgeText: "text-teal-700",
    badgeBg: "bg-teal-50 border-teal-200",
    titleAccent: "text-teal-900",
  },
  "cssd-incharge": {
    cardBg: "linear-gradient(135deg, #ECFEFF 0%, #CFFAFE 100%)",
    iconBg: "linear-gradient(135deg, #22D3EE 0%, #0891B2 100%)",
    badgeText: "text-cyan-700",
    badgeBg: "bg-cyan-50 border-cyan-200",
    titleAccent: "text-cyan-900",
  },
  "ot-tech": {
    cardBg: "linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%)",
    iconBg: "linear-gradient(135deg, #A78BFA 0%, #7C3AED 100%)",
    badgeText: "text-violet-700",
    badgeBg: "bg-violet-50 border-violet-200",
    titleAccent: "text-violet-900",
  },
  "radiology-tech": {
    cardBg: "linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)",
    iconBg: "linear-gradient(135deg, #818CF8 0%, #4F46E5 100%)",
    badgeText: "text-indigo-700",
    badgeBg: "bg-indigo-50 border-indigo-200",
    titleAccent: "text-indigo-900",
  },
  phlebotomist: {
    cardBg: "linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)",
    iconBg: "linear-gradient(135deg, #F87171 0%, #DC2626 100%)",
    badgeText: "text-red-700",
    badgeBg: "bg-red-50 border-red-200",
    titleAccent: "text-red-900",
  },
  "lab-blood-bank-tech": {
    cardBg: "linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)",
    iconBg: "linear-gradient(135deg, #FBBF24 0%, #D97706 100%)",
    badgeText: "text-amber-700",
    badgeBg: "bg-amber-50 border-amber-200",
    titleAccent: "text-amber-900",
  },
  pharmacist: {
    cardBg: "linear-gradient(135deg, #F7FEE7 0%, #ECFCCB 100%)",
    iconBg: "linear-gradient(135deg, #A3E635 0%, #65A30D 100%)",
    badgeText: "text-lime-700",
    badgeBg: "bg-lime-50 border-lime-200",
    titleAccent: "text-lime-900",
  },
  "staff-nurse": {
    cardBg: "linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)",
    iconBg: "linear-gradient(135deg, #34D399 0%, #059669 100%)",
    badgeText: "text-green-700",
    badgeBg: "bg-green-50 border-green-200",
    titleAccent: "text-green-900",
  },
  "infection-control-nurse": {
    cardBg: "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)",
    iconBg: "linear-gradient(135deg, #38BDF8 0%, #0284C7 100%)",
    badgeText: "text-sky-700",
    badgeBg: "bg-sky-50 border-sky-200",
    titleAccent: "text-sky-900",
  },
  "assistant-nursing-superintendent": {
    cardBg: "linear-gradient(135deg, #FDF4FF 0%, #FAE8FF 100%)",
    iconBg: "linear-gradient(135deg, #E879F9 0%, #C026D3 100%)",
    badgeText: "text-fuchsia-700",
    badgeBg: "bg-fuchsia-50 border-fuchsia-200",
    titleAccent: "text-fuchsia-900",
  },
  "medical-officer-mbbs": {
    cardBg: "linear-gradient(135deg, #F0FDFA 0%, #99F6E4 30%, #ECFEFF 100%)",
    iconBg: "linear-gradient(135deg, #2DD4BF 0%, #0E7490 100%)",
    badgeText: "text-teal-700",
    badgeBg: "bg-teal-50 border-teal-200",
    titleAccent: "text-teal-900",
  },
  "senior-manager": {
    cardBg: "linear-gradient(135deg, #EEF2FF 0%, #C7D2FE 100%)",
    iconBg: "linear-gradient(135deg, #6366F1 0%, #4338CA 100%)",
    badgeText: "text-indigo-700",
    badgeBg: "bg-indigo-50 border-indigo-200",
    titleAccent: "text-indigo-900",
  },
  manager: {
    cardBg: "linear-gradient(135deg, #FEFCE8 0%, #FEF08A 60%, #FFFBEB 100%)",
    iconBg: "linear-gradient(135deg, #FACC15 0%, #CA8A04 100%)",
    badgeText: "text-yellow-700",
    badgeBg: "bg-yellow-50 border-yellow-200",
    titleAccent: "text-yellow-900",
  },
  "deputy-manager": {
    cardBg: "linear-gradient(135deg, #FFF7ED 0%, #FED7AA 60%, #FFF7ED 100%)",
    iconBg: "linear-gradient(135deg, #FB923C 0%, #C2410C 100%)",
    badgeText: "text-orange-700",
    badgeBg: "bg-orange-50 border-orange-200",
    titleAccent: "text-orange-900",
  },
  "assistant-manager": {
    cardBg: "linear-gradient(135deg, #FDF2F8 0%, #FBCFE8 60%, #FDF2F8 100%)",
    iconBg: "linear-gradient(135deg, #F472B6 0%, #BE185D 100%)",
    badgeText: "text-pink-700",
    badgeBg: "bg-pink-50 border-pink-200",
    titleAccent: "text-pink-900",
  },
  executive: {
    cardBg: "linear-gradient(135deg, #ECFDF5 0%, #A7F3D0 60%, #ECFDF5 100%)",
    iconBg: "linear-gradient(135deg, #34D399 0%, #047857 100%)",
    badgeText: "text-emerald-700",
    badgeBg: "bg-emerald-50 border-emerald-200",
    titleAccent: "text-emerald-900",
  },
  trainee: {
    cardBg: "linear-gradient(135deg, #EFF6FF 0%, #BFDBFE 60%, #EFF6FF 100%)",
    iconBg: "linear-gradient(135deg, #60A5FA 0%, #1D4ED8 100%)",
    badgeText: "text-blue-700",
    badgeBg: "bg-blue-50 border-blue-200",
    titleAccent: "text-blue-900",
  },
};

const defaultTheme = {
  cardBg: "linear-gradient(135deg, #EDF6FB 0%, #DCEEF6 100%)",
  iconBg: "linear-gradient(135deg, #2A8FAF 0%, #0A5F7A 100%)",
  badgeText: "text-[#0E526B]",
  badgeBg: "bg-[#EDF6FB] border-[#1D82A6]/15",
  titleAccent: "text-[#0B3446]",
};

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params?.id;

  const job =
    jobsData.find(
      (j) =>
        j.id === jobId ||
        j.slug === jobId ||
        j.id.toLowerCase() === String(jobId).toLowerCase(),
    ) || jobsData[0]; // fallback to first job if not found

  const theme = jobThemes[job.id] || defaultTheme;
  const JIcon = iconMap[job.icon] || Briefcase;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appSubmitted, setAppSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [appForm, setAppForm] = useState(EMPTY_FORM);

  const handleAppSubmit = async (e) => {
    e.preventDefault();
    if (
      !appForm.dataConsent ||
      !appForm.isCaptchaVerified ||
      !appForm.resumeFile
    )
      return;

    setSubmitting(true);
    try {
      // TODO: send to your backend. Right now nothing is sent anywhere.
      // const fd = new FormData();
      // fd.append("jobId", job.id);
      // fd.append("jobTitle", job.title);
      // fd.append("name", appForm.name);
      // fd.append("email", appForm.email);
      // fd.append("phone", appForm.phone);
      // fd.append("exp", appForm.exp);
      // fd.append("notes", appForm.notes);
      // fd.append("resume", appForm.resumeFile);
      // const res = await fetch("/api/apply", { method: "POST", body: fd });
      // if (!res.ok) throw new Error("Failed");
      setAppSubmitted(true);
    } catch (err) {
      alert(
        "Could not submit your application. Please try again or email your CV.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setAppForm(EMPTY_FORM);
    setAppSubmitted(false);
  };

  return (
    <main className="relative min-h-screen bg-[#EDF6FB] text-slate-900 pt-36 pb-20 selection:bg-[#1D82A6] selection:text-white overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-96 h-96 -top-20 -left-20 rounded-full bg-cyan-200/40 blur-3xl" />
        <div className="absolute w-80 h-80 top-1/3 -right-20 rounded-full bg-amber-100/40 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: "radial-gradient(#1D82A6 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Back Link */}
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[#1D82A6]/20 text-[#0E526B] text-xs font-bold shadow-sm hover:bg-[#0E526B] hover:text-white transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to All Careers</span>
          </Link>
        </motion.div>

        {/* Hero Card for Job */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="relative rounded-3xl p-8 sm:p-10 shadow-xl border overflow-hidden"
          style={{
            background: theme.cardBg,
            borderColor: "rgba(29, 130, 166, 0.2)",
          }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span
                  className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full border ${theme.badgeBg} ${theme.badgeText}`}
                >
                  {job.type}
                </span>
                <span className="text-xs font-bold text-slate-500 bg-white/70 px-3 py-1 rounded-full border border-slate-200">
                  {job.dept}
                </span>
              </div>

              <h1
                className={`font-serif-apollo text-3xl sm:text-4xl lg:text-5xl font-black ${theme.titleAccent} leading-tight`}
              >
                {job.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-600 pt-1">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#1D82A6] shrink-0" />
                  <span>Apollo Hospitals Enterprise</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#C8952E] shrink-0" />
                  <span>Immediate Opening</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3 shrink-0">
              <div
                className="w-16 h-16 rounded-2xl text-white flex items-center justify-center shadow-lg"
                style={{ background: theme.iconBg }}
              >
                <JIcon className="w-8 h-8" />
              </div>
              <a
                href="#apply-form"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-[#3A2B0A] font-extrabold text-xs shadow-md hover:brightness-110 transition-all cursor-pointer"
                style={goldGradient}
              >
                <Send className="w-4 h-4" />
                <span>Apply For This Position</span>
              </a>
            </div>
          </div>
        </motion.section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Job Details */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="lg:col-span-7 space-y-8"
          >
            {/* Job Overview */}
            <motion.div
              variants={fadeUp}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#1D82A6]/15 space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A5F7A] to-[#2A8FAF] text-[#F6D98A] flex items-center justify-center shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h2 className="font-serif-apollo text-xl sm:text-2xl font-black text-[#0B3446]">
                  Job Overview
                </h2>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed font-medium">
                {job.overview}
              </p>
            </motion.div>

            {/* Key Responsibilities */}
            <motion.div
              variants={fadeUp}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#1D82A6]/15 space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A5F7A] to-[#2A8FAF] text-[#F6D98A] flex items-center justify-center shadow-sm">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h2 className="font-serif-apollo text-xl sm:text-2xl font-black text-[#0B3446]">
                  Key Responsibilities
                </h2>
              </div>
              <ul className="space-y-3 pt-2">
                {job.responsibilities.map((resp, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#1D82A6]/10 text-[#1D82A6] flex items-center justify-center shrink-0 mt-0.5 font-black text-[10px]">
                      ✓
                    </span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Required Skills & Qualifications */}
            <motion.div
              variants={fadeUp}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#1D82A6]/15 space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A5F7A] to-[#2A8FAF] text-[#F6D98A] flex items-center justify-center shadow-sm">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h2 className="font-serif-apollo text-xl sm:text-2xl font-black text-[#0B3446]">
                  Required Skills & Qualifications
                </h2>
              </div>
              <ul className="space-y-3 pt-2">
                {job.requirements.map((req, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-black text-[10px]">
                      ★
                    </span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Why Join */}
            <motion.div
              variants={fadeUp}
              className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#1D82A6]/15 space-y-4"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0A5F7A] to-[#2A8FAF] text-[#F6D98A] flex items-center justify-center shadow-sm">
                  <Award className="w-5 h-5" />
                </div>
                <h2 className="font-serif-apollo text-xl sm:text-2xl font-black text-[#0B3446]">
                  Why Join Apollo Hospitals Jabalpur?
                </h2>
              </div>
              <ul className="space-y-3 pt-2">
                {job.whyJoin.map((wj, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed"
                  >
                    <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5 font-black text-[10px]">
                      ✦
                    </span>
                    <span>{wj}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* RIGHT: Inline Application Form */}
          <motion.div
            id="apply-form"
            initial="hidden"
            animate="show"
            variants={fadeUp}
            className="lg:col-span-5 lg:sticky lg:top-28 space-y-6 scroll-mt-32"
          >
            <div className="relative p-[2px] rounded-3xl bg-gradient-to-br from-[#1D82A6] via-[#F6D98A] to-[#C8952E] shadow-xl">
              <div className="bg-white rounded-[calc(1.5rem-2px)] p-6 sm:p-8 space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <span className="text-[10px] font-black uppercase text-[#C8952E] tracking-wider">
                    Direct Application
                  </span>
                  <h3 className="font-serif-apollo text-2xl font-black text-[#0B3446] mt-0.5">
                    Apply For {job.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out the form below to submit your CV directly to Apollo
                    Hospitals HR team.
                  </p>
                </div>

                {!appSubmitted ? (
                  <form
                    onSubmit={handleAppSubmit}
                    className="space-y-4 text-xs font-semibold"
                  >
                    <div>
                      <label className="block text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={appForm.name}
                        onChange={(e) =>
                          setAppForm({ ...appForm, name: e.target.value })
                        }
                        placeholder="e.g. Dr. Ananya Sharma"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#1D82A6] focus:outline-none bg-slate-50 focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={appForm.email}
                        onChange={(e) =>
                          setAppForm({ ...appForm, email: e.target.value })
                        }
                        placeholder="ananya@example.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#1D82A6] focus:outline-none bg-slate-50 focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={appForm.phone}
                        onChange={(e) =>
                          setAppForm({ ...appForm, phone: e.target.value })
                        }
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#1D82A6] focus:outline-none bg-slate-50 focus:bg-white transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1">
                        Years of Experience *
                      </label>
                      <select
                        value={appForm.exp}
                        onChange={(e) =>
                          setAppForm({ ...appForm, exp: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#1D82A6] focus:outline-none bg-slate-50 focus:bg-white transition-colors font-semibold"
                      >
                        <option value="Fresher / <1 Year">
                          Fresher / &lt;1 Year
                        </option>
                        <option value="1-3 Years">1-3 Years</option>
                        <option value="3-5 Years">3-5 Years</option>
                        <option value="5+ Years">5+ Years</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-700 mb-1">
                        Cover Letter / Short Introduction
                      </label>
                      <textarea
                        rows={3}
                        value={appForm.notes}
                        onChange={(e) =>
                          setAppForm({ ...appForm, notes: e.target.value })
                        }
                        placeholder="Tell us about your qualification and medical background..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#1D82A6] focus:outline-none bg-slate-50 focus:bg-white transition-colors"
                      />
                    </div>

                    {/* Resume upload (sr-only, NOT hidden, so validation works) */}
                    <div>
                      <label className="block text-slate-700 mb-1">
                        Resume / CV Document *
                      </label>

                      <label
                        htmlFor="cv-file-detail"
                        className={`border-2 border-dashed rounded-xl p-4 text-center transition-all cursor-pointer block ${
                          appForm.resumeName
                            ? "border-emerald-500 bg-emerald-50/50"
                            : "border-slate-300 hover:border-[#1D82A6] bg-slate-50 hover:bg-slate-100/70"
                        }`}
                      >
                        <Upload
                          className={`w-6 h-6 mx-auto mb-1.5 transition-colors ${
                            appForm.resumeName
                              ? "text-emerald-600"
                              : "text-[#1D82A6]"
                          }`}
                        />
                        <span
                          className={`text-xs font-semibold block ${
                            appForm.resumeName
                              ? "text-emerald-800"
                              : "text-slate-600"
                          }`}
                        >
                          {appForm.resumeName ||
                            "Click to attach PDF / DOC Resume"}
                        </span>
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          Supported formats: PDF, DOC, DOCX (Max 5MB)
                        </span>

                        <input
                          type="file"
                          id="cv-file-detail"
                          required={!appForm.resumeFile}
                          accept=".pdf,.doc,.docx"
                          className="sr-only"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            if (file.size > 5 * 1024 * 1024) {
                              alert(
                                "File is too large. Please upload a file under 5 MB.",
                              );
                              e.target.value = "";
                              return;
                            }
                            setAppForm((prev) => ({
                              ...prev,
                              resumeName: file.name,
                              resumeFile: file,
                            }));
                          }}
                        />
                      </label>

                      {appForm.resumeName && (
                        <div className="flex justify-end mt-1">
                          <button
                            type="button"
                            onClick={() =>
                              setAppForm((prev) => ({
                                ...prev,
                                resumeName: "",
                                resumeFile: null,
                              }))
                            }
                            className="text-[11px] font-bold text-rose-600 hover:underline cursor-pointer"
                          >
                            Remove file
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Consent + captcha */}
                    <div className="space-y-3 pt-1">
                      <label className="flex items-start gap-2.5 text-slate-700 text-[11px] leading-relaxed font-normal cursor-pointer select-none">
                        <input
                          type="checkbox"
                          required
                          checked={appForm.dataConsent}
                          onChange={(e) =>
                            setAppForm({
                              ...appForm,
                              dataConsent: e.target.checked,
                            })
                          }
                          className="mt-0.5 rounded border-slate-300 accent-[#1D82A6] w-4 h-4 shrink-0"
                        />
                        <span>
                          By using this form you agree with the storage and
                          handling of your data by this website.{" "}
                          <span className="text-rose-500 font-bold">*</span>
                        </span>
                      </label>

                      {/* Mock reCAPTCHA (see note below the code for the real one) */}
                      {/* Real Google reCAPTCHA */}
                      <div className="pt-1">
                        <ReCAPTCHA
                          sitekey="YOUR_RECAPTCHA_SITE_KEY"
                          onChange={(token) =>
                            setAppForm({
                              ...appForm,
                              isCaptchaVerified: !!token,
                            })
                          }
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3.5 rounded-xl text-[#3A2B0A] font-extrabold text-sm shadow-md hover:brightness-110 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={goldGradient}
                    >
                      <Send className="w-4 h-4" />
                      <span>
                        {submitting
                          ? "Submitting..."
                          : "Submit Application Now"}
                      </span>
                    </button>
                  </form>
                ) : (
                  <div className="text-center space-y-4 py-6">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h4 className="font-serif-apollo text-xl font-black text-emerald-900">
                      Application Submitted!
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Thank you,{" "}
                      <span className="font-bold">{appForm.name}</span>. Your
                      application for{" "}
                      <span className="font-bold">{job.title}</span> has been
                      received by Apollo Hospitals Jabalpur HR team.
                    </p>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-6 py-2.5 rounded-full bg-[#0A5F7A] text-white text-xs font-extrabold cursor-pointer hover:bg-[#0E526B] transition-colors"
                    >
                      Submit Another Response
                    </button>
                  </div>
                )}

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Your information is safely handled by Apollo HR.</span>
                </div>
              </div>
            </div>

            {/* Quick Contact Box */}
            <div className="bg-white rounded-3xl p-6 shadow-md border border-[#1D82A6]/15 space-y-3 text-xs">
              <h4 className="font-serif-apollo font-extrabold text-[#0B3446]">
                Have Questions About Recruitment?
              </h4>
              <p className="text-slate-600">
                You can reach out directly to the Jabalpur Careers team:
              </p>
              <div className="space-y-1.5 font-bold text-[#0E526B]">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#C8952E]" />
                  <a
                    href="mailto:jabalpur_careers@apollohospitals.com"
                    className="hover:underline"
                  >
                    jabalpur_careers@apollohospitals.com
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-[#C8952E]" />
                  <a href="tel:1800-123-6666" className="hover:underline">
                    Tollfree: 1800-123-6666
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Disclaimer Strip */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="p-6 rounded-3xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-3"
        >
          <ShieldAlert className="w-5 h-5 text-rose-600 shrink-0" />
          <span>
            Notice: Apollo Hospitals Jabalpur never asks for monetary payments,
            processing fees, or bank transfers during any stage of recruitment.
            Beware of fraudulent agencies.
          </span>
        </motion.div>
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </main>
  );
}
