"use client";

import { useState } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  CheckCircle2,
  Sparkles,
  Heart,
  Award,
  Users,
  ShieldCheck,
  Play,
} from "lucide-react";

export default function PatientTestimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "New Delhi, India",
      procedure: "Robotic Cardiac Surgery",
      rating: 5,
      quote:
        "The care and support I received at Apollo Hospitals was exceptional. The doctors and staff were always there for me, and I felt healthier and stronger today. Truly a life-changing experience!",
      avatar: "RK",
      recoveredIn: "12 Days",
      hospitalBranch: "Apollo Delhi",
      verified: true,
    },
    {
      id: 2,
      name: "Ananya Sharma",
      location: "Mumbai, India",
      procedure: "CyberKnife Oncology",
      rating: 5,
      quote:
        "When I was diagnosed with an early-stage tumor, Apollo's CyberKnife team gave me absolute confidence. Non-invasive, pain-free treatments, and I was back with my family in days.",
      avatar: "AS",
      recoveredIn: "5 Days",
      hospitalBranch: "Apollo Mumbai",
      verified: true,
    },
    {
      id: 3,
      name: "David Miller",
      location: "London, UK",
      procedure: "Total Hip Replacement",
      rating: 5,
      quote:
        "Traveled from the UK for orthopedic surgery at Apollo Hospitals. The international patient care desk managed everything seamlessly, from flight pickup to top surgeon consultations.",
      avatar: "DM",
      recoveredIn: "18 Days",
      hospitalBranch: "Apollo Chennai",
      verified: true,
    },
    {
      id: 4,
      name: "Priya Nair",
      location: "Bengaluru, India",
      procedure: "Advanced Neuro Care",
      rating: 5,
      quote:
        "From emergency admittance to intensive rehabilitation, every specialist showed deep empathy and surgical precision. I couldn't have asked for a better medical team.",
      avatar: "PN",
      recoveredIn: "14 Days",
      hospitalBranch: "Apollo Bengaluru",
      verified: true,
    },
  ];

  const stats = [
    { icon: Users, value: "150,000+", label: "Happy Patients" },
    { icon: Award, value: "99.4%", label: "Success Rate" },
    { icon: Heart, value: "24/7", label: "Compassionate Care" },
    { icon: ShieldCheck, value: "JCI Accredited", label: "Global Standards" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const active = testimonials[currentIndex];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-[#EDF6FB]">
      {/* ───── Dynamic Background Pattern & Floating Particles ───── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="pt-orb pt-orb-1" />
        <div className="pt-orb pt-orb-2" />
        <div className="pt-orb pt-orb-3" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(#1D82A6 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 15%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 15%, transparent 75%)",
          }}
        />
        <span className="pt-sparkle" style={{ top: "12%", left: "8%", animationDelay: "0s" }} />
        <span className="pt-sparkle" style={{ top: "68%", left: "5%", animationDelay: "1.2s" }} />
        <span className="pt-sparkle" style={{ top: "25%", left: "88%", animationDelay: "2.3s" }} />
        <span className="pt-sparkle" style={{ top: "78%", left: "91%", animationDelay: "0.8s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* ───── Top Metric Badges ───── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-16">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="group relative p-4 rounded-2xl bg-white/70 backdrop-blur-md border border-[#1D82A6]/20 shadow-sm hover:shadow-md hover:border-[#1D82A6]/40 transition-all duration-300 flex items-center gap-3.5"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#0A5F7A] via-[#2A8FAF] to-[#06202B] flex items-center justify-center text-[#F6D98A] shadow-md group-hover:scale-105 transition-transform">

{/* from- via- to- */}

                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-base sm:text-lg font-extrabold text-[#0B3446] tracking-tight leading-none">
                    {stat.value}
                  </div>
                  <div className="text-[11px] font-semibold text-slate-600 mt-1">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ───── Main Container Outer Glow ───── */}
        <div className="relative p-[1.5px] rounded-[2.25rem] bg-gradient-to-r from-[#F59E0B]/50 via-[#1D82A6]/40 to-[#F59E0B]/50 shadow-[0_30px_60px_-15px_rgba(15,52,72,0.35)]">
          <div className="relative rounded-[calc(2.25rem-1.5px)] overflow-hidden bg-gradient-to-b from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] p-6 sm:p-10 lg:p-14 text-white">
            
            {/* Ambient Ambient Radial Light */}
            <div className="absolute inset-0 bg-[radial-gradient(#1D82A6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />
            <div className="absolute -top-24 -right-16 w-80 h-80 bg-[#F59E0B]/15 rounded-full blur-[90px] pointer-events-none pt-glow" />
            <div className="absolute -bottom-24 -left-16 w-72 h-72 bg-[#1D82A6]/25 rounded-full blur-[90px] pointer-events-none" />

            {/* ───── Section Header ───── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 mb-8 border-b border-white/10 relative z-10">
              <div>
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#FEF3C7] text-xs font-bold border border-[#F6D98A]/40 shadow-inner mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-[#F6D98A] animate-pulse" />
                  Real Stories, Real Healing
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                  Patient{" "}
                  <span
                    className="bg-clip-text text-transparent drop-shadow-sm"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #F6D98A 0%, #E8C173 50%, #C8952E 100%)",
                    }}
                  >
                    Testimonials
                  </span>
                </h2>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prevSlide}
                  className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#F6D98A] hover:bg-[#F6D98A] hover:text-[#0B3446] transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Previous story"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                </button>
                <div className="text-xs font-bold text-slate-300 tracking-wider px-2">
                  <span className="text-[#F6D98A]">0{currentIndex + 1}</span> / 0{testimonials.length}
                </div>
                <button
                  onClick={nextSlide}
                  className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-[#F6D98A] hover:bg-[#F6D98A] hover:text-[#0B3446] transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                  aria-label="Next story"
                >
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>
            </div>

            {/* ───── Active Testimonial Card ───── */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              
              {/* Left Profile Card */}
              <div className="lg:col-span-5 bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-[2rem] p-6 sm:p-8 text-center lg:text-left relative overflow-hidden shadow-2xl">
                
                <Quote className="w-20 h-20 text-white/5 absolute -top-2 -right-2 pointer-events-none" />

                <div className="flex flex-col lg:flex-row items-center gap-5">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#F6D98A] via-[#E8C173] to-[#C8952E] p-1 shadow-lg">
                      <div className="w-full h-full rounded-[14px] bg-[#0B3446] flex items-center justify-center text-[#F6D98A] text-2xl font-black tracking-wider">
                        {active.avatar}
                      </div>
                    </div>
                    {active.verified && (
                      <div
                        className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-[#0B3446] shadow-md"
                        title="Verified Patient"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center justify-center lg:justify-start gap-2">
                      {active.name}
                    </h3>
                    <p className="text-xs text-[#F6D98A] font-semibold mt-0.5">
                      {active.location}
                    </p>
                    <span className="inline-block text-[11px] text-slate-300 bg-white/10 border border-white/10 px-2.5 py-0.5 rounded-full mt-2 font-medium">
                      {active.hospitalBranch}
                    </span>
                  </div>
                </div>

                {/* Patient Case Highlights */}
                <div className="mt-6 pt-5 border-t border-white/10 space-y-3 text-xs">
                  <div className="flex items-center justify-between text-slate-200">
                    <span className="text-slate-200 font-medium">Procedure</span>
                    <span className="font-bold text-white bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                      {active.procedure}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-slate-200">
                    <span className="text-slate-200 font-medium">Recovery Time</span>
                    <span className="font-bold text-emerald-300">{active.recoveredIn}</span>
                  </div>
                </div>

                {/* Rating Bar */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-300">Overall Care</span>
                  <div className="flex items-center gap-1">
                    {[...Array(active.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F6D98A] text-[#F6D98A]" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Main Quote & Video Link */}
              <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
                <div className="relative">
                  <Quote className="w-12 h-12 text-[#F6D98A]/30 mb-2" />
                  <p className="text-lg sm:text-2xl font-medium text-slate-100 leading-relaxed italic font-serif">
                    "{active.quote}"
                  </p>
                </div>

                {/* Interactive Video Story Placeholder CTA */}
                <div className="pt-4">
                  <button className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 hover:border-[#F6D98A]/50 text-xs font-bold text-white transition-all duration-300">
                    <span className="w-7 h-7 rounded-full bg-gradient-to-r from-[#F6D98A] to-[#C8952E] text-[#0B3446] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </span>
                    <span>Watch Video Testimonial</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ───── Bottom Selector Thumbnails ───── */}
            <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 relative z-10">
              {testimonials.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`p-3 rounded-2xl text-left transition-all duration-300 border ${
                    currentIndex === idx
                      ? "bg-white/20 border-[#F6D98A] shadow-lg -translate-y-0.5"
                      : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 opacity-70 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#0B3446] text-[#F6D98A] font-bold text-xs flex items-center justify-center border border-white/10">
                      {t.avatar}
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-white truncate">{t.name}</div>
                      <div className="text-[10px] text-[#F6D98A] truncate">{t.procedure}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

          </div>
        </div>

      </div>

      <style jsx>{`
        .pt-glow {
          animation: ptGlowPulse 6s ease-in-out infinite;
        }
        @keyframes ptGlowPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.08); }
        }

        .pt-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(70px);
        }
        .pt-orb-1 {
          width: 360px;
          height: 360px;
          top: -140px;
          left: -100px;
          background: radial-gradient(circle, #bfe3f2, transparent 70%);
          opacity: 0.5;
          animation: ptFloat1 16s ease-in-out infinite;
        }
        .pt-orb-2 {
          width: 320px;
          height: 320px;
          top: 20%;
          right: -140px;
          background: radial-gradient(circle, #f3dfa8, transparent 70%);
          opacity: 0.4;
          animation: ptFloat2 20s ease-in-out infinite;
        }
        .pt-orb-3 {
          width: 280px;
          height: 280px;
          bottom: -140px;
          left: 30%;
          background: radial-gradient(circle, #cdeaf7, transparent 70%);
          opacity: 0.4;
          animation: ptFloat3 18s ease-in-out infinite;
        }
        @keyframes ptFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 40px) scale(1.08); }
        }
        @keyframes ptFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.06); }
        }
        @keyframes ptFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -35px) scale(1.05); }
        }
        .pt-sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 9999px;
          background: #c8952e;
          box-shadow: 0 0 8px 2px rgba(200, 149, 46, 0.5);
          animation: ptTwinkle 3.5s ease-in-out infinite;
        }
        @keyframes ptTwinkle {
          0%, 100% { opacity: 0; transform: scale(0.6); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
}