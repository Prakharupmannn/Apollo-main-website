"use client";

import { useState } from "react";
import {
  ShieldAlert,
  Heart,
  Brain,
  Activity,
  ArrowRight,
  Sparkles,
  Award,
  Zap,
  CheckCircle2,
  ShieldCheck,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function CentresOfExcellence({ onOpenAppointmentModal }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const centres = [
  {
    id: 1,
    title: "Gastroenterology",
    subtitle: "Digestive Health Excellence",
    desc: "Looking for the best gastroenterologist in Jabalpur near me? Visit Apollo JBP Hospitals, the trusted gastro hospital in Jabalpur, for expert digestive and gastrointestinal care.",
    icon: Activity,
    badge: "Advanced GI Care",
    stat: "24/7",
    statLabel: "Specialist Support",
    accentColor: "from-[#0A5F7A] via-[#2A8FAF] to-[#17627D]",
    slug: "gastro-hospital-in-jabalpur",
    services: [
      "Endoscopy & Colonoscopy",
      "Liver & Pancreas Care",
      "ERCP Procedures",
      "Acid Reflux & GERD",
      "IBD & IBS Management",
      "Fatty Liver & Hepatitis Care",
    ],
  },

  {
    id: 2,
    title: "Critical Care",
    subtitle: "Advanced Intensive Care",
    desc: "Apollo JBP Hospital offers top critical care in Jabalpur with a state-of-the-art CCU, expert intensivists, and 24/7 emergency care.",
    icon: ShieldAlert,
    badge: "24/7 Critical Care",
    stat: "24/7",
    statLabel: "Emergency Care",
    accentColor: "from-[#0E526B] via-[#1D82A6] to-[#0B3446]",
    slug: "critical-care-hospital-in-jabalpur",
    services: [
      "Advanced CCU & ICU",
      "Ventilator & Life Support",
      "Sepsis & Shock Management",
      "24/7 Intensivist Cover",
      "Trauma Stabilisation",
      "Post-Operative Critical Care",
    ],
  },

  {
    id: 3,
    title: "Orthopaedic",
    subtitle: "Joint & Musculoskeletal",
    desc: "Looking for an Orthopaedic Surgeon in Jabalpur near me? Visit Apollo JBP Hospitals to consult trusted Joint Pain Doctors in Jabalpur for advanced orthopaedic care.",
    icon: Activity,
    badge: "Robotic Joint Hub",
    stat: "99.1%",
    statLabel: "Patient Mobility Success",
    accentColor: "from-[#1D82A6] via-[#0A5F7A] to-[#0E526B]",
    slug: "orthopaedic-hospital-in-jabalpur",
    services: [
      "Knee & Hip Replacement",
      "Robotic-Assisted Surgery",
      "Arthroscopy & Sports Injury",
      "Fracture & Trauma Care",
      "Spine & Back Pain Care",
      "Physiotherapy & Rehab",
    ],
  },

  {
    id: 4,
    title: "Nephrology",
    subtitle: "Kidney & Renal Sciences",
    desc: "At Apollo JBP Hospitals, a trusted Kidney Specialist Hospital in Jabalpur, our expert team provides advanced diagnosis and treatment for kidney and renal conditions.",
    icon: Activity,
    badge: "Kidney Care Centre",
    stat: "24/7",
    statLabel: "Renal Support",
    accentColor: "from-[#0A5F7A] via-[#207493] to-[#154052]",
    slug: "kidney-specialist-hospital-in-jabalpur",
    services: [
      "Dialysis Services",
      "Kidney Stone Management",
      "Chronic Kidney Disease Care",
      "Kidney Transplant Support",
      "Acute Kidney Injury Care",
      "Diabetic & Hypertensive Kidney Care",
    ],
  },

  {
    id: 5,
    title: "Cardiology",
    subtitle: "Heart & Vascular Institute",
    desc: "At Apollo Hospitals, our expert Heart Specialists in Jabalpur provide advanced diagnostics and cutting-edge treatments for comprehensive cardiac care.",
    icon: Heart,
    badge: "24/7 STEMI Care",
    stat: "15K+",
    statLabel: "Procedures Done",
    accentColor: "from-[#0E526B] via-[#1D82A6] to-[#0B3446]",
    slug: "heart-hospital-in-jabalpur",
    services: [
      "Angiography & Angioplasty",
      "Primary PCI for Heart Attack",
      "Pacemaker & Device Implants",
      "Echocardiography & TMT",
      "Heart Failure Clinic",
      "Preventive Cardiac Checkups",
    ],
  },

  {
    id: 6,
    title: "Neurology",
    subtitle: "Brain & Spine Excellence",
    desc: "Expert neurological care in Mahakoshal, Madhya Pradesh, with specialized diagnosis and treatment for brain, spine, nerve, and neurological conditions.",
    icon: Brain,
    badge: "Aneurysm Unit",
    stat: "<30m",
    statLabel: "Stroke Door-to-Needle",
    accentColor: "from-[#1D82A6] via-[#0E526B] to-[#C8952E]",
    slug: "neurology-hospital-in-jabalpur",
    services: [
      "Stroke Management",
      "Epilepsy & Seizure Care",
      "Brain Aneurysm Care",
      "Spine & Nerve Disorders",
      "EEG, EMG & NCV Studies",
      "Headache & Movement Disorders",
    ],
  },

  {
    id: 7,
    title: "Cancer Care",
    subtitle: "Comprehensive & Advanced Oncology",
    desc: "Looking for the best cancer hospital in Jabalpur? Apollo offers expert cancer specialists in Jabalpur with advanced and affordable oncology care.",
    icon: ShieldAlert,
    badge: "CyberKnife Hub",
    stat: "98.4%",
    statLabel: "Precision Rate",
    accentColor: "from-[#0A5F7A] via-[#2A8FAF] to-[#17627D]",
    slug: "cancer-hospital-in-jabalpur",
    services: [
      "CyberKnife Radiosurgery",
      "Chemotherapy & Immunotherapy",
      "Surgical Oncology",
      "Radiation Therapy",
      "Cancer Screening & Diagnosis",
      "Palliative & Supportive Care",
    ],
  },
];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % centres.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + centres.length) % centres.length);
  };

  return (
    <section
      id="centres-of-excellence"
      className="relative py-20 lg:py-28 overflow-hidden bg-[#EDF6FB]"
    >
      {/* ───── Dynamic Background Pattern & Floating Particles ───── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="coe-orb coe-orb-1" />
        <div className="coe-orb coe-orb-2" />
        <div className="coe-orb coe-orb-3" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(#1D82A6 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 15%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 40%, black 15%, transparent 75%)",
          }}
        />
        <span
          className="coe-sparkle"
          style={{ top: "12%", left: "8%", animationDelay: "0s" }}
        />
        <span
          className="coe-sparkle"
          style={{ top: "60%", left: "5%", animationDelay: "1.2s" }}
        />
        <span
          className="coe-sparkle"
          style={{ top: "25%", left: "90%", animationDelay: "2.4s" }}
        />
        <span
          className="coe-sparkle"
          style={{ top: "80%", left: "85%", animationDelay: "0.8s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* ───── Header Block ───── */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#0E526B] text-xs font-extrabold border border-[#1D82A6]/30 shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C8952E] animate-pulse" />
            World-Class Clinical Specialty Units
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B3446] tracking-tight leading-tight">
            7 Centres of{" "}
            <span
              className="bg-clip-text text-transparent drop-shadow-sm"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #1D82A6 0%, #0E526B 50%, #C8952E 100%)",
              }}
            >
              Excellence at Apollo JBP Hospitals
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-3 max-w-xl mx-auto font-normal leading-relaxed">
            Combining cutting-edge medical robotics, global clinical experts, and 
            uncompromising patient-centered compassionate care.
          </p>
        </div>

        {/* ───── Interactive Split Showcase Stage ───── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto my-8">
          {/* Left Interactive Selection List */}
          <div className="lg:col-span-5 flex flex-col gap-3 justify-center">
            {centres.map((item, index) => {
              const Icon = item.icon;
              const isSelected = activeIndex === index;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className={`relative p-4 sm:p-5 rounded-2xl cursor-pointer transition-all duration-300 border flex items-center justify-between ${
                    isSelected
                      ? "bg-white border-[#1D82A6] shadow-xl translate-x-2"
                      : "bg-white/60 hover:bg-white/90 border-[#1D82A6]/15 hover:border-[#1D82A6]/40 shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                        isSelected
                          ? "bg-gradient-to-br from-[#0A5F7A] to-[#17627D] text-[#F6D98A] shadow-md scale-105"
                          : "bg-[#EDF6FB] text-[#0E526B]"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-[#0B3446]">
                        {item.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#C8952E] mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#EDF6FB] text-[#0E526B] border border-[#1D82A6]/20">
                      {item.stat}
                    </span>
                    <ChevronRight
                      className={`w-5 h-5 transition-transform ${
                        isSelected ? "text-[#1D82A6] translate-x-1" : "text-slate-400"
                      }`}
                    />
                  </div>

                  {isSelected && (
                    <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-8 bg-gradient-to-b from-[#1D82A6] to-[#C8952E] rounded-r-full" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Highlight Featured Card */}
          <div className="lg:col-span-7">
            {centres.map((item, index) => {
              if (index !== activeIndex) return null;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  className="h-full w-full rounded-3xl bg-white p-7 sm:p-9 shadow-2xl border border-[#1D82A6]/20 flex flex-col justify-between relative overflow-hidden transition-all duration-500 animate-fadeIn"
                >
                  {/* Subtle Background Watermark Icon */}
                  <div className="absolute -right-8 -bottom-8 pointer-events-none opacity-[0.06] text-[#0E526B]">
                    <Icon className="w-80 h-80" />
                  </div>

                  {/* Badge & Top Section */}
                  <div className="flex-1 flex flex-col relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] text-[#F6D98A] shadow-xl flex items-center justify-center">
                        <Icon className="w-8 h-8" />
                      </div>
                      <span className="inline-flex items-center gap-1 bg-gradient-to-l from-[#C8952E] to-[#F6D98A] text-[#0B3446] text-xs font-black tracking-wider uppercase px-4 py-1.5 rounded-full shadow-sm">
                        <Award className="w-3.5 h-3.5 text-[#0B3446]" />
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B3446] tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-sm font-bold text-[#C8952E] mt-1">
                      {item.subtitle}
                    </p>

                    <p className="text-sm text-slate-600 mt-4 leading-relaxed font-normal">
                      {item.desc}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-8">
                      <div className="p-4 rounded-2xl bg-[#EDF6FB] border border-[#1D82A6]/20">
                        <div className="text-2xl font-black text-[#0B3446]">
                          {item.stat}
                        </div>
                        <div className="text-xs text-slate-500 font-semibold mt-1">
                          {item.statLabel}
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#EDF6FB] border border-[#1D82A6]/20 flex items-center gap-3">
                        <ShieldCheck className="w-8 h-8 text-[#1D82A6] shrink-0" />
                        <div>
                          <div className="text-xs font-extrabold text-[#0B3446]">
                            Top-Tier Experts
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium">
                            24/7 Dedicated Care
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic Fill: Key Services (stretches to occupy all remaining space) */}
                    <div className="mt-8 flex-1 flex flex-col min-h-0">
                      <div className="text-xs font-extrabold text-[#0B3446] mb-3 flex items-center gap-2">
                        <span className="w-1.5 h-4 rounded-full bg-gradient-to-b from-[#1D82A6] to-[#C8952E]" />
                        Key Services &amp; Treatments
                      </div>
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 auto-rows-fr gap-3">
                        {item.services.map((service) => (
                          <div
                            key={service}
                            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#EDF6FB]/70 border border-[#1D82A6]/15 hover:border-[#1D82A6]/40 hover:bg-[#EDF6FB] transition-all duration-300"
                          >
                            <CheckCircle2 className="w-5 h-5 text-[#1D82A6] shrink-0" />
                            <span className="text-xs font-bold text-[#0B3446] leading-snug">
                              {service}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#0E526B]">
                      <Zap className="w-4 h-4 text-[#C8952E]" />
                      Priority Appointments Available
                    </div>

                    <button
                      onClick={() =>
                        onOpenAppointmentModal && onOpenAppointmentModal(item.title)
                      }
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3.5 px-7 rounded-xl text-xs font-extrabold text-[#3A2B0A] shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                      style={{
                        background:
                          "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
                      }}
                    >
                      <span>Consult Specialist</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ───── Controls & Indicators ───── */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white border border-[#1D82A6]/30 text-[#0E526B] flex items-center justify-center shadow-md hover:bg-[#0E526B] hover:text-white transition-all cursor-pointer hover:scale-110 active:scale-95"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {centres.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? "w-8 bg-gradient-to-r from-[#1D82A6] to-[#C8952E]"
                    : "w-2.5 bg-[#1D82A6]/30 hover:bg-[#1D82A6]/50"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white border border-[#1D82A6]/30 text-[#0E526B] flex items-center justify-center shadow-md hover:bg-[#0E526B] hover:text-white transition-all cursor-pointer hover:scale-110 active:scale-95"
            aria-label="Next card"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* ───── Trust Guarantee Footer Banner ───── */}
        <div className="mt-16 relative p-[1.5px] rounded-3xl bg-gradient-to-r from-[#1D82A6]/30 via-[#C8952E]/40 to-[#1D82A6]/30 shadow-md">
          <div className="rounded-[calc(1.5rem-1.5px)] bg-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] flex items-center justify-center text-[#F6D98A] shadow-lg shrink-0">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-extrabold text-[#0B3446]">
                  JCI & NABH Accredited Tertiary Facilities
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  Over 50+ super-specialty departments supported by 2,000+ ICU beds nationwide.
                </p>
              </div>
            </div>

            <button
              onClick={() => onOpenAppointmentModal && onOpenAppointmentModal()}
              className="px-6 py-3 rounded-full text-xs font-extrabold text-[#3A2B0A] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer shrink-0"
              style={{
                background:
                  "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
              }}
            >
              Book Priority Consultation
            </button>
          </div>
        </div>
      </div>

      {/* ───── Custom CSS Animations ───── */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .coe-orb {
          position: absolute;
          border-radius: 9999px;
        }
        .coe-orb-1 {
          width: 360px;
          height: 360px;
          top: -140px;
          left: -100px;
          background: radial-gradient(circle, #bfe3f2, transparent 70%);
          opacity: 0.5;
          animation: coeFloat1 16s ease-in-out infinite;
        }
        .coe-orb-2 {
          width: 320px;
          height: 320px;
          top: 25%;
          right: -140px;
          background: radial-gradient(circle, #f3dfa8, transparent 70%);
          opacity: 0.45;
          animation: coeFloat2 20s ease-in-out infinite;
        }
        .coe-orb-3 {
          width: 280px;
          height: 280px;
          bottom: -140px;
          left: 30%;
          background: radial-gradient(circle, #cdeaf7, transparent 70%);
          opacity: 0.4;
          animation: coeFloat3 18s ease-in-out infinite;
        }
        @keyframes coeFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 40px) scale(1.08); }
        }
        @keyframes coeFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.06); }
        }
        @keyframes coeFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -35px) scale(1.05); }
        }
        .coe-sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 9999px;
          background: #c8952e;
          box-shadow: 0 0 8px 2px rgba(200, 149, 46, 0.5);
          animation: coeTwinkle 3.5s ease-in-out infinite;
        }
        @keyframes coeTwinkle {
          0%, 100% { opacity: 0; transform: scale(0.6); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
}