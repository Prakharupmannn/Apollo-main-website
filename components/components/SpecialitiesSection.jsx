"use client";

import { useState } from "react";
import {
  Heart,
  Activity,
  Brain,
  Bone,
  Stethoscope,
  Shield,
  ArrowRight,
  CheckCircle2,
  ArrowUpRight,
  X,
  Sparkles,
} from "lucide-react";

export default function SpecialitiesSection({ onOpenAppointmentModal }) {
  const [activeSpecialty, setActiveSpecialty] = useState(null);

  const specialities = [
    {
      id: "cardiology",
      num: "01",
      name: "Cardiology",
      tagline: "Advanced heart care for every heartbeat",
      desc: "Comprehensive cardiac diagnostics, TAVI, robotic bypass, and 24/7 cath lab emergency interventions.",
      icon: Heart,
      treatments: [
        "Robotic Cardiac Surgery",
        "Angioplasty & Stenting",
        "TAVI & Valve Replacement",
        "Arrhythmia & Pacemakers",
      ],
      stats: "99.2% Success Rate",
      featured: true,
    },
    {
      id: "oncology",
      num: "02",
      name: "Oncology",
      tagline: "Hope through advanced cancer care",
      desc: "Proton therapy, CyberKnife robotic radiosurgery, personalized immunotherapy, and bone marrow transplants.",
      icon: Shield,
      treatments: [
        "CyberKnife Radiosurgery",
        "Proton Beam Therapy",
        "Medical & Chemo Oncology",
        "Bone Marrow Transplant",
      ],
      stats: "Leading Cancer Center",
    },
    {
      id: "neurology",
      num: "03",
      name: "Neurology",
      tagline: "Expert care for a healthier tomorrow",
      desc: "Dedicated stroke unit, DBS for Parkinson's, brain tumor surgeries, and pediatric neuro-rehabilitation.",
      icon: Brain,
      treatments: [
        "Deep Brain Stimulation",
        "Stroke Intervention 24/7",
        "Complex Spine Surgeries",
        "Epilepsy Management",
      ],
      stats: "50,000+ Surgeries",
    },
    {
      id: "orthopaedics",
      num: "04",
      name: "Orthopaedics",
      tagline: "Moving you towards a better life",
      desc: "Mako robotic joint replacements, sports injury arthroscopy, pediatric orthopedics, and complex trauma care.",
      icon: Bone,
      treatments: [
        "Robotic Knee Replacement",
        "Total Hip Arthroplasty",
        "Arthroscopic Shoulder Surgery",
        "Spine Decompression",
      ],
      stats: "Fast Recovery Protocols",
    },
    {
      id: "gastroenterology",
      num: "05",
      name: "Gastroenterology",
      tagline: "Complete care for digestive health",
      desc: "Advanced GI endoscopy, liver transplant program, pancreatic disease management, and GERD treatments.",
      icon: Activity,
      treatments: [
        "Endoscopic Ultrasound (EUS)",
        "Liver Transplant Unit",
        "ERCP Procedure",
        "IBD Specialized Care",
      ],
      stats: "25,000+ Liver Transplants",
    },
  ];

  const featured = specialities.find((s) => s.featured);
  const rest = specialities.filter((s) => !s.featured);

  const CornerBrackets = () => (
    <>
      <span className="corner-bracket corner-tl" />
      <span className="corner-bracket corner-tr" />
      <span className="corner-bracket corner-bl" />
      <span className="corner-bracket corner-br" />
    </>
  );

  return (
    <section
      id="specialities"
      className="relative py-24 bg-[#EDF6FB] overflow-hidden"
    >
      {/* ───── Dynamic background — same system as the hero ───── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="sp-orb sp-orb-1" />
        <div className="sp-orb sp-orb-2" />
        <div className="sp-orb sp-orb-3" />

        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(#1D82A6 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 15%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 15%, transparent 75%)",
          }}
        />

        <span className="sp-sparkle" style={{ top: "12%", left: "10%", animationDelay: "0s" }} />
        <span className="sp-sparkle" style={{ top: "68%", left: "6%", animationDelay: "1.4s" }} />
        <span className="sp-sparkle" style={{ top: "20%", left: "88%", animationDelay: "2.2s" }} />
        <span className="sp-sparkle" style={{ top: "78%", left: "92%", animationDelay: "0.8s" }} />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C8952E]/30 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#1D82A6]/20 shadow-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#C8952E]" />
              <span className="text-[11px] font-bold text-[#1D82A6] uppercase tracking-widest">
                Comprehensive Care
              </span>
            </div>
            <h2 className="font-serif-apollo text-4xl sm:text-5xl font-extrabold text-[#06202B] leading-tight">
              Our{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #C8952E 0%, #E8C173 50%, #C8952E 100%)",
                }}
              >
                Specialities
              </span>
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-md">
              World-class clinical departments, backed by decades of expertise
              and state-of-the-art technology.
            </p>
          </div>

          <a
            href="#all-specialities"
            className="group relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-[#1D82A6]/20 shadow-sm hover:shadow-md hover:border-[#C8952E]/50 transition-all duration-300 ease-out hover:-translate-y-0.5 shrink-0"
          >
            <span className="text-xs font-bold text-[#06202B] group-hover:text-[#1D82A6] transition-colors tracking-wide">
              View All Specialities
            </span>
            <span className="w-6 h-6 rounded-full bg-[#EBF5F8] group-hover:bg-[#C8952E] flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <ArrowRight className="w-3.5 h-3.5 text-[#1D82A6] group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
            </span>
          </a>
        </div>

        {/* Premium Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured large card with new bright ocean gradient */}
          {featured && (
            <div
              onClick={() => setActiveSpecialty(featured)}
              className="premium-card relative lg:row-span-2 rounded-[2rem] p-9 cursor-pointer group flex flex-col justify-between overflow-hidden text-white bg-gradient-to-b from-[#0A5F7A] via-[#2A8FAF] to-[#17627D]"
            >
              <CornerBrackets />

              {/* Decorative watermark icon */}
              <featured.icon
                className="absolute -right-10 -bottom-10 w-64 h-64 text-white/[0.08] rotate-[-8deg]"
                strokeWidth={1}
              />
              <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-[#F6D98A]/20 blur-[80px]" />

              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <div className="relative w-16 h-16 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center">
                    <featured.icon
                      className="w-8 h-8 text-[#F6D98A]"
                      strokeWidth={1.6}
                    />
                  </div>
                  <span className="font-serif-apollo text-6xl font-extrabold text-white/15 leading-none select-none">
                    {featured.num}
                  </span>
                </div>

                <span className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full bg-white/10 border border-[#F6D98A]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6D98A]" />
                  <span className="text-[10.5px] font-bold text-[#F6D98A] tracking-wide uppercase">
                    Flagship Department
                  </span>
                </span>

                <h3 className="font-serif-apollo text-3xl font-bold text-white">
                  {featured.name}
                </h3>
                <p className="text-sm font-semibold text-[#F6D98A] mt-2 italic">
                  {featured.tagline}
                </p>
                <p className="text-[13.5px] text-slate-100/90 mt-4 leading-relaxed max-w-sm">
                  {featured.desc}
                </p>
              </div>

              <div className="relative mt-10">
                <div className="grid grid-cols-2 gap-2.5 mb-7">
                  {featured.treatments.slice(0, 4).map((t) => (
                    <div
                      key={t}
                      className="flex items-center gap-2 text-[11.5px] font-medium text-white/90 bg-white/10 border border-white/15 rounded-lg px-2.5 py-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F6D98A] shrink-0" />
                      <span className="truncate">{t}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-white/15">
                  <span className="text-xs font-bold text-white group-hover:text-[#F6D98A] transition-colors flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    {featured.stats}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F6D98A] to-[#C8952E] flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:rotate-45 shadow-lg">
                    <ArrowUpRight className="w-4.5 h-4.5 text-[#3A2B0A]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Regular cards */}
          {rest.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => setActiveSpecialty(item)}
                className="premium-card relative rounded-[2rem] p-7 cursor-pointer group flex flex-col justify-between bg-white overflow-hidden"
              >
                <CornerBrackets />

                {/* Faded giant numeral */}
                <span className="absolute top-4 right-6 font-serif-apollo text-[58px] leading-none font-extrabold text-[#0E526B]/[0.05] group-hover:text-[#C8952E]/[0.09] transition-colors duration-500 select-none">
                  {item.num}
                </span>

                <div className="relative">
                  {/* Icon */}
                  <div className="relative w-14 h-14 mb-6">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#EBF5F8] to-[#DCEEF5] border border-[#1D82A6]/20 group-hover:border-transparent group-hover:bg-gradient-to-b group-hover:from-[#0A5F7A] group-hover:via-[#2A8FAF] group-hover:to-[#17627D] transition-all duration-500 shadow-sm" />
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Icon
                        className="w-6.5 h-6.5 text-[#1D82A6] group-hover:text-white transition-colors duration-500"
                        strokeWidth={1.8}
                      />
                    </div>
                  </div>

                  {/* Stat pill */}
                  <div className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full bg-[#FFF8EA] border border-[#C8952E]/25">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8952E]" />
                    <span className="text-[10px] font-bold text-[#8A6416] tracking-wide">
                      {item.stats}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif-apollo text-xl font-bold text-[#06202B] group-hover:text-[#0E526B] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-[12.5px] font-semibold text-[#C8952E] mt-1.5 italic">
                    {item.tagline}
                  </p>
                  <p className="text-[13px] text-slate-500 mt-3 leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>

                {/* Footer */}
                <div className="relative mt-6 pt-4 border-t border-dashed border-slate-200 flex items-center justify-between">
                  <span className="text-[11.5px] font-bold text-[#0E526B] group-hover:text-[#C8952E] transition-colors">
                    Explore Procedures
                  </span>
                  <div className="w-8.5 h-8.5 rounded-full bg-[#EBF5F8] group-hover:bg-gradient-to-br group-hover:from-[#F6D98A] group-hover:to-[#C8952E] flex items-center justify-center shrink-0 transition-all duration-500 group-hover:rotate-45">
                    <ArrowUpRight className="w-4 h-4 text-[#1D82A6] group-hover:text-white transition-colors duration-500" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Specialty Modal */}
      {activeSpecialty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[2rem] max-w-lg w-full shadow-2xl relative overflow-hidden">
            {/* Gradient header banner */}
            <div
              className="relative px-7 pt-7 pb-16 bg-gradient-to-b from-[#0A5F7A] via-[#2A8FAF] to-[#17627D]"
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#F6D98A]/25 blur-2xl" />
              <button
                onClick={() => setActiveSpecialty(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-4.5 h-4.5" />
              </button>

              <div className="relative w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4">
                <activeSpecialty.icon
                  className="w-7 h-7 text-[#F6D98A]"
                  strokeWidth={1.8}
                />
              </div>
              <h3 className="font-serif-apollo text-3xl font-bold text-white">
                {activeSpecialty.name}
              </h3>
              <p className="text-[13px] font-semibold text-[#F6D98A] mt-1 italic">
                {activeSpecialty.tagline}
              </p>
            </div>

            {/* Body */}
            <div className="relative px-7 pb-7 -mt-8">
              <div className="bg-white rounded-2xl shadow-[0_8px_24px_-8px_rgba(15,52,72,0.15)] border border-slate-100 p-5">
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  {activeSpecialty.desc}
                </p>

                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Key Clinical Procedures &amp; Treatments
                </h4>
                <div className="grid grid-cols-1 gap-2 mb-2">
                  {activeSpecialty.treatments.map((t) => (
                    <div
                      key={t}
                      className="flex items-center gap-2.5 text-[13px] font-medium text-[#06202B] bg-[#F8FAFC] p-3 rounded-xl border border-slate-100"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#C8952E] shrink-0" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-5">
                <button
                  onClick={() => setActiveSpecialty(null)}
                  className="px-4 py-2.5 rounded-full text-xs font-semibold text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setActiveSpecialty(null);
                    onOpenAppointmentModal();
                  }}
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-[#3A2B0A] shadow-[0_6px_20px_rgba(197,146,46,0.4)] hover:shadow-[0_10px_28px_rgba(197,146,46,0.55)] hover:-translate-y-0.5 transition-all"
                  style={{
                    background:
                      "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
                  }}
                >
                  Book {activeSpecialty.name} Specialist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .premium-card {
          border: 1px solid rgba(15, 52, 72, 0.08);
          box-shadow: 0 8px 24px -10px rgba(15, 52, 72, 0.12);
          transition:
            transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.45s ease,
            border-color 0.45s ease;
        }
        .premium-card:hover {
          transform: translateY(-8px);
          border-color: rgba(200, 149, 46, 0.4);
          box-shadow: 0 30px 54px -16px rgba(197, 146, 46, 0.3);
        }

        /* Museum-frame gold corner brackets */
        .corner-bracket {
          position: absolute;
          width: 18px;
          height: 18px;
          opacity: 0;
          transition:
            opacity 0.45s ease,
            width 0.45s ease,
            height 0.45s ease;
          pointer-events: none;
        }
        .premium-card:hover .corner-bracket {
          opacity: 1;
          width: 26px;
          height: 26px;
        }
        .corner-tl {
          top: 14px;
          left: 14px;
          border-top: 2px solid #c8952e;
          border-left: 2px solid #c8952e;
          border-top-left-radius: 8px;
        }
        .corner-tr {
          top: 14px;
          right: 14px;
          border-top: 2px solid #c8952e;
          border-right: 2px solid #c8952e;
          border-top-right-radius: 8px;
        }
        .corner-bl {
          bottom: 14px;
          left: 14px;
          border-bottom: 2px solid #c8952e;
          border-left: 2px solid #c8952e;
          border-bottom-left-radius: 8px;
        }
        .corner-br {
          bottom: 14px;
          right: 14px;
          border-bottom: 2px solid #c8952e;
          border-right: 2px solid #c8952e;
          border-bottom-right-radius: 8px;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.25s ease-out;
        }

        /* ───── Dynamic background keyframes ───── */
        .sp-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(70px);
        }
        .sp-orb-1 {
          width: 380px;
          height: 380px;
          top: -140px;
          left: -100px;
          background: radial-gradient(circle, #bfe3f2, transparent 70%);
          opacity: 0.55;
          animation: spFloat1 16s ease-in-out infinite;
        }
        .sp-orb-2 {
          width: 340px;
          height: 340px;
          top: 25%;
          right: -140px;
          background: radial-gradient(circle, #f3dfa8, transparent 70%);
          opacity: 0.45;
          animation: spFloat2 20s ease-in-out infinite;
        }
        .sp-orb-3 {
          width: 300px;
          height: 300px;
          bottom: -140px;
          left: 30%;
          background: radial-gradient(circle, #cdeaf7, transparent 70%);
          opacity: 0.45;
          animation: spFloat3 18s ease-in-out infinite;
        }
        @keyframes spFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 40px) scale(1.08); }
        }
        @keyframes spFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.06); }
        }
        @keyframes spFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -35px) scale(1.05); }
        }
        .sp-sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 9999px;
          background: #c8952e;
          box-shadow: 0 0 8px 2px rgba(200, 149, 46, 0.5);
          animation: spTwinkle 3.5s ease-in-out infinite;
        }
        @keyframes spTwinkle {
          0%, 100% { opacity: 0; transform: scale(0.6); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
}