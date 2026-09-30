"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  Activity,
  HeartPulse,
  Brain,
  ShieldAlert,
  Bone,
  Droplets,
  Sparkles,
  Search,
  CheckCircle2,
  ArrowRight,
  UserCheck,
  Building2,
  Zap,
  PhoneCall,
  Flame,
  Award,
  ChevronRight,
  Eye,
  Microscope,
  Baby,
  Smile,
  ShieldCheck,
  CircleDot,
} from "lucide-react";
import AppointmentModal from "../../../components/components/AppointmentModal";

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

export default function OurSpecialitiesPage() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSpecialtyModal, setActiveSpecialtyModal] = useState(null);

  const specialities = [
    {
      id: "gastroenterology",
      name: "Gastroenterology",
      cat: "super",
      icon: Activity,
      badge: "Gastro Centre",
      color: "from-[#0A5F7A] to-[#2A8FAF]",
      desc: "Comprehensive diagnosis and treatment for liver, stomach, pancreas, bowel, acid reflux (GERD), and ERCP procedures.",
      procedures: ["HD Endoscopy & Colonoscopy", "ERCP Bile Duct Procedure", "Liver Cirrhosis Care", "IBD & IBS Management"],
      doctorsCount: "6 Specialists",
      symptoms: ["Abdominal pain", "Acid reflux", "Jaundice", "Indigestion"],
    },
    {
      id: "oncology",
      name: "Oncology (Cancer Care)",
      cat: "super",
      icon: ShieldAlert,
      badge: "CyberKnife Hub",
      color: "from-[#9F1239] to-[#C8952E]",
      desc: "Sub-millimeter CyberKnife radiosurgery, chemotherapy, targeted immunotherapy, and surgical oncology care.",
      procedures: ["CyberKnife Radiosurgery", "Daycare Chemotherapy", "Surgical Tumor Resection", "PET-CT Staging"],
      doctorsCount: "8 Specialists",
      symptoms: ["Unexplained weight loss", "Lumps or swellings", "Chronic fatigue"],
    },
    {
      id: "cardiology",
      name: "Cardiac Sciences",
      cat: "super",
      icon: HeartPulse,
      badge: "24/7 STEMI Cath Lab",
      color: "from-[#0E526B] to-[#1D82A6]",
      desc: "24/7 primary angioplasty, robotic bypass surgery, TAVI aortic valve procedures, and arrhythmia pacemaker care.",
      procedures: ["Angioplasty & Stenting", "Robotic CABG Surgery", "TAVI Valve Implantation", "Pacemaker Implantation"],
      doctorsCount: "9 Specialists",
      symptoms: ["Chest pain", "Shortness of breath", "Palpitations", "Dizziness"],
    },
    {
      id: "neurology",
      name: "Neurology & Neurosurgery",
      cat: "super",
      icon: Brain,
      badge: "Stroke Unit",
      color: "from-[#1D82A6] to-[#0E526B]",
      desc: "Golden hour stroke thrombolysis, awake craniotomy brain tumor surgery, spine disc repairs, and epilepsy care.",
      procedures: ["Acute Stroke Thrombolysis", "Brain Tumor Resection", "Minimally Invasive Spine", "EEG & NCV Testing"],
      doctorsCount: "7 Specialists",
      symptoms: ["Severe headache", "Numbness", "Seizures", "Slurred speech"],
    },
    {
      id: "nephrology",
      name: "Nephrology & Urology",
      cat: "super",
      icon: Droplets,
      badge: "Kidney Care",
      color: "from-[#0A5F7A] to-[#154052]",
      desc: "24/7 hemodialysis, CRRT for critical ICU patients, Holmium laser kidney stone removal, and transplant care.",
      procedures: ["24/7 Dialysis Services", "Laser Stone Removal (RIRS)", "Kidney Transplant Support", "Diabetic Kidney Care"],
      doctorsCount: "5 Specialists",
      symptoms: ["Swollen feet", "Decreased urination", "Flank pain", "Blood in urine"],
    },
    {
      id: "orthopaedics",
      name: "Orthopaedics & Joint Care",
      cat: "surgical",
      icon: Bone,
      badge: "Robotic Joint Hub",
      color: "from-[#0A5F7A] to-[#C8952E]",
      desc: "Robotic total knee and hip replacement, arthroscopic ligament reconstruction, spine surgeries, and trauma care.",
      procedures: ["Robotic Knee Replacement", "ACL & Meniscus Surgery", "Slip Disc Spine Surgery", "Fracture Trauma Care"],
      doctorsCount: "8 Specialists",
      symptoms: ["Joint stiffness", "Knee pain", "Back ache", "Sports injury"],
    },
    {
      id: "critical-care",
      name: "Critical Care & ICU",
      cat: "medical",
      icon: Zap,
      badge: "24/7 CCU & ER",
      color: "from-[#881337] to-[#0E526B]",
      desc: "Level-1 CCU, MICU, SICU with 24/7 board-certified intensivists, high-frequency ventilators, and ECMO support.",
      procedures: ["Mechanical Ventilation", "ECMO Life Support", "Septic Shock Protocol", "Arterial Hemodynamic Control"],
      doctorsCount: "10 Intensivists",
      symptoms: ["Respiratory failure", "Severe trauma", "Septicemia"],
    },
    {
      id: "pulmonology",
      name: "Pulmonology & EBUS",
      cat: "super",
      icon: Microscope,
      badge: "EBUS Pulmonary Tech",
      color: "from-[#17627D] to-[#2A8FAF]",
      desc: "Endobronchial Ultrasound (EBUS) for lung biopsy/TB staging, asthma management, COPD, and sleep apnea care.",
      procedures: ["EBUS Diagnostic Biopsy", "Bronchoscopy & Lavage", "Sleep Study (Polysomnography)", "Asthma & COPD Care"],
      doctorsCount: "4 Specialists",
      symptoms: ["Persistent cough", "Wheezing", "Breathlessness", "Snoring"],
    },
    {
      id: "dental",
      name: "Apollo Dental Clinic Jabalpur",
      cat: "surgical",
      icon: Smile,
      badge: "Laser Dentistry",
      color: "from-[#C8952E] to-[#F6D98A]",
      desc: "Painless root canals, dental implants, laser teeth whitening, smile designing, and pediatric orthodontics.",
      procedures: ["Computer-Guided Implants", "Laser Root Canal (RCT)", "Invisible Braces / Aligners", "Cosmetic Smile Design"],
      doctorsCount: "5 Dentists",
      symptoms: ["Toothache", "Bleeding gums", "Cavities", "Misaligned teeth"],
    },
    {
      id: "gynaecology",
      name: "Obstetrics & Gynaecology",
      cat: "medical",
      icon: Baby,
      badge: "Maternity & Motherhood",
      color: "from-[#9F1239] to-[#E11D48]",
      desc: "High-risk pregnancy management, painless normal delivery, laparoscopic fibroid/ovarian cyst surgery, and IVF.",
      procedures: ["High-Risk Delivery Suite", "Laparoscopic Hysterectomy", "PCOS & Fertility Clinic", "Fetal Ultrasound Monitoring"],
      doctorsCount: "6 Specialists",
      symptoms: ["Irregular periods", "Pelvic pain", "Pregnancy care"],
    },
    {
      id: "neonatology",
      name: "Neonatology & Pediatrics",
      cat: "medical",
      icon: Baby,
      badge: "Level-3 NICU",
      color: "from-[#2A8FAF] to-[#0A5F7A]",
      desc: "Level-3 Neonatal ICU for premature babies, pediatric vaccinations, growth monitoring, and child emergency care.",
      procedures: ["Level-3 NICU Incubators", "Pediatric Vaccination", "Child Growth & Nutrition", "Pediatric ER Response"],
      doctorsCount: "5 Pediatricians",
      symptoms: ["Infant fever", "Premature birth care", "Growth delay"],
    },
    {
      id: "pediatric-nephro",
      name: "Pediatric Nephrology",
      cat: "super",
      icon: Droplets,
      badge: "Child Kidney Care",
      color: "from-[#0A5F7A] to-[#1D82A6]",
      desc: "Specialist evaluation and treatment for childhood urinary tract infections (UTI), nephrotic syndrome, and congenital renal defects.",
      procedures: ["Child DMSA Scan Testing", "Nephrotic Syndrome Care", "Pediatric Dialysis", "Congenital Kidney Surgery"],
      doctorsCount: "3 Specialists",
      symptoms: ["Child UTI", "Facial swelling in children", "Proteinuria"],
    },
    {
      id: "urology",
      name: "Urology & Andrology",
      cat: "surgical",
      icon: Activity,
      badge: "Laser Urology",
      color: "from-[#0E526B] to-[#C8952E]",
      desc: "Minimally invasive prostate laser surgery (TURP/HoLEP), reconstructive urology, and male fertility care.",
      procedures: ["HoLEP Laser Prostate", "Reconstructive Urology", "Bladder Tumor Surgery", "Male Infertility Therapy"],
      doctorsCount: "4 Specialists",
      symptoms: ["Urinary hesitation", "Prostate enlargement", "Kidney pain"],
    },
    {
      id: "ent",
      name: "ENT & Head Neck Surgery",
      cat: "surgical",
      icon: Stethoscope,
      badge: "Endoscopic ENT",
      color: "from-[#1D82A6] to-[#0A5F7A]",
      desc: "Endoscopic sinus surgery (FESS), tympanoplasty ear surgery, vertigo clinic, and thyroid tumor resections.",
      procedures: ["Endoscopic Sinus (FESS)", "Micro Ear Tympanoplasty", "Cochlear Implant Surgery", "Vertigo & Balance Clinic"],
      doctorsCount: "4 Specialists",
      symptoms: ["Sinus pressure", "Hearing loss", "Ear pain", "Hoarseness"],
    },
    {
      id: "dermatology",
      name: "Dermatology & Cosmetology",
      cat: "medical",
      icon: Sparkles,
      badge: "Laser Skin Clinic",
      color: "from-[#C8952E] to-[#9F1239]",
      desc: "Advanced clinical dermatology for psoriasis, eczema, acne scar laser resurfacing, anti-aging, and hair transplants.",
      procedures: ["Laser Scar Reduction", "PRP Hair Regeneration", "Psoriasis Phototherapy", "Chemical Peels & Anti-Aging"],
      doctorsCount: "3 Dermatologists",
      symptoms: ["Skin rash", "Hair thinning", "Acne scars", "Pigmentation"],
    },
    {
      id: "ophthalmology",
      name: "Ophthalmology (Eye Care)",
      cat: "surgical",
      icon: Eye,
      badge: "Micro-Phaco Cataract",
      color: "from-[#0A5F7A] to-[#2A8FAF]",
      desc: "No-stitch Phacoemulsification cataract surgery, LASIK vision correction, dry eye tear film therapy, and glaucoma care.",
      procedures: ["Robotic Phaco Cataract", "LASIK Laser Eye Surgery", "Glaucoma Pressure Care", "Dry Eye MGD Hydration"],
      doctorsCount: "4 Eye Surgeons",
      symptoms: ["Blurry vision", "Eye strain", "Cataract cloudy lens", "Dry eyes"],
    },
    {
      id: "radiology",
      name: "Radiology & Imaging",
      cat: "diagnostic",
      icon: Microscope,
      badge: "3T MRI & 128 Slice CT",
      color: "from-[#0E526B] to-[#17627D]",
      desc: "Ultra-fast 128-slice cardiac CT angiogram, 3 Tesla silent MRI, 4D ultrasound, mammography, and interventional radiology.",
      procedures: ["3T Digital MRI Scan", "128-Slice Cardiac CT", "Interventional Biopsy", "4D Fetal Ultrasound"],
      doctorsCount: "6 Radiologists",
      symptoms: ["Diagnostic scan referral", "Internal imaging"],
    },
    {
      id: "emergency-med",
      name: "24/7 Emergency Medicine",
      cat: "medical",
      icon: Flame,
      badge: "Level-1 ER Desk",
      color: "from-[#881337] to-[#E11D48]",
      desc: "Immediate emergency resuscitation for road trauma, acute heart attack, snake bites, stroke, and industrial injuries.",
      procedures: ["Immediate Resuscitation", "Trauma Stabilization", "Poisoning Antivenom", "24/7 Blood Transfusion"],
      doctorsCount: "12 ER Physicians",
      symptoms: ["Critical emergency", "Trauma injury", "Accident"],
    },
  ];

  const filteredSpecialities = specialities.filter((s) => {
    const matchesCat = selectedCategory === "all" || s.cat === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      s.name.toLowerCase().includes(query) ||
      s.desc.toLowerCase().includes(query) ||
      s.procedures.some((p) => p.toLowerCase().includes(query)) ||
      s.symptoms.some((sym) => sym.toLowerCase().includes(query));
    return matchesCat && matchesSearch;
  });

  return (
    <main className="relative min-h-screen bg-[#EDF6FB] text-slate-900 pt-38 pb-20 selection:bg-[#1D82A6] selection:text-white overflow-hidden">
      {/* ───── CSS Ambient Orbs ───── */}
      <style jsx>{`
        .sp-orb {
          position: absolute;
          border-radius: 9999px;
          pointer-events: none;
        }
        .sp-orb-1 {
          width: 380px;
          height: 380px;
          top: -120px;
          left: -100px;
          background: radial-gradient(circle, #bfe3f2, transparent 70%);
          opacity: 0.5;
          animation: spFloat1 16s ease-in-out infinite;
        }
        .sp-orb-2 {
          width: 340px;
          height: 340px;
          top: 30%;
          right: -120px;
          background: radial-gradient(circle, #f3dfa8, transparent 70%);
          opacity: 0.45;
          animation: spFloat2 20s ease-in-out infinite;
        }
        @keyframes spFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 40px) scale(1.08); }
        }
        @keyframes spFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.06); }
        }
      `}</style>

      {/* Dotted background texture */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="sp-orb sp-orb-1" />
        <div className="sp-orb sp-orb-2" />
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
              <Stethoscope className="absolute -right-10 -bottom-10 w-80 h-80 opacity-[0.06] text-white -rotate-12 pointer-events-none" />

              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25 text-[#FEF3C7] text-xs font-bold mb-6 shadow-inner">
                  <Sparkles className="w-4 h-4 text-[#F6D98A] animate-pulse" />
                  <span>Apollo Hospitals Jabalpur • Multi-Super Specialty Directory</span>
                </div>

                <h1 className="font-serif-apollo text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-4">
                  Our Comprehensive{" "}
                  <span
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #F6D98A 0%, #FFFFFF 50%, #C8952E 100%)",
                    }}
                  >
                    Clinical Specialities
                  </span>
                </h1>

                <p className="text-slate-100/90 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
                  Explore 18+ specialized clinical departments powered by senior consultants, modern surgical robotics, and 24/7 tertiary care at Apollo JBP Hospitals.
                </p>

                {/* Search Bar */}
                <div className="relative max-w-xl rounded-2xl bg-white/95 backdrop-blur-xl p-2 flex items-center border-2 border-white/40 shadow-2xl">
                  <Search className="w-5 h-5 text-[#0E526B] ml-3 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by specialty, symptom (e.g. chest pain, joint stiffness, kidney stone)..."
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

        {/* ───── Category Filters ───── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Specialities (18)" },
              { id: "super", label: "Super-Specialties" },
              { id: "surgical", label: "Surgical Institutes" },
              { id: "medical", label: "Medical Departments" },
              { id: "diagnostic", label: "Diagnostic & Imaging" },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-[#0A5F7A] to-[#2A8FAF] text-white shadow-md"
                    : "bg-white text-[#0E526B] hover:bg-slate-100 border border-[#1D82A6]/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* ───── Specialities Cards Grid ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpecialities.map((spec) => {
              const Icon = spec.icon;
              return (
                <motion.div
                  key={spec.id}
                  variants={fadeUp}
                  whileHover={{ y: -6, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="relative p-[1.5px] rounded-[1.75rem] bg-gradient-to-br from-[#1D82A6]/40 via-white to-[#C8952E]/50 shadow-[0_10px_30px_rgba(10,95,122,0.12)] hover:shadow-[0_20px_45px_rgba(10,95,122,0.25)] transition-all group flex flex-col justify-between"
                >
                  <div className="h-full rounded-[calc(1.75rem-1.5px)] bg-white p-6 flex flex-col justify-between">
                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${spec.color} text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#EDF6FB] text-[#0E526B] border border-[#1D82A6]/20">
                          {spec.badge}
                        </span>
                      </div>

                      <h3 className="font-serif-apollo text-lg font-extrabold text-[#0B3446] group-hover:text-[#1D82A6] transition-colors mb-2">
                        {spec.name}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed mb-4">
                        {spec.desc}
                      </p>

                      {/* Key Procedures */}
                      <div className="space-y-1.5 mb-4">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Key Treatments & Procedures:
                        </div>
                        <div className="grid grid-cols-1 gap-1">
                          {spec.procedures.slice(0, 3).map((proc, pIdx) => (
                            <div key={pIdx} className="flex items-center gap-2 text-[11px] font-semibold text-[#0B3446]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#1D82A6] shrink-0" />
                              <span className="truncate">{proc}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Common Symptoms Tag */}
                      {spec.symptoms && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {spec.symptoms.map((sym, sIdx) => (
                            <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 font-medium">
                              #{sym}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Card Footer */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-[#0E526B] flex items-center gap-1">
                        <UserCheck className="w-3.5 h-3.5 text-[#C8952E]" />
                        {spec.doctorsCount}
                      </span>

                      <button
                        onClick={() => setIsAppointmentModalOpen(true)}
                        className="px-4 py-2 rounded-xl text-xs font-extrabold text-[#3A2B0A] shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                        style={goldGradient}
                      >
                        <span>Consult</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ───── Trust Banner Footer ───── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="relative p-[1.5px] rounded-3xl bg-gradient-to-r from-[#1D82A6]/30 via-[#C8952E]/40 to-[#1D82A6]/30 shadow-md">
            <div className="rounded-[calc(1.5rem-1.5px)] bg-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] flex items-center justify-center text-[#F6D98A] shadow-lg shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[#0B3446]">
                    Apollo JBP Hospitals • Jabalpur, Madhya Pradesh
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Need help deciding which specialty doctor to visit? Call our helpline: 1800-123-6666 / 7566 123666.
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
      />
    </main>
  );
}