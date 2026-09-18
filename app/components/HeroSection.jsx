"use client";

import { useState } from "react";
import {
  Search,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  HeartPulse,
  Award,
  Star,
  PhoneCall,
  CheckCircle2,
  Plus,
} from "lucide-react";

export default function HeroSection({
  onOpenAppointmentModal,
  onSearchSubmit,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(searchQuery, selectedCategory);
    }
  };

  return (
    <section className="relative pt-36 pb-24 lg:pt-44 lg:pb-32 overflow-hidden bg-[#EDF6FB]">
      {/* ───── Dynamic animated mesh background ───── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#EDF6FB]">
        {/* Rotating conic mesh wash */}
        <div className="hero-mesh" />

        {/* Large soft orbs drifting */}
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-orb hero-orb-4" />

        {/* Rotating dashed rings */}
        <svg
          className="hero-ring hero-ring-1"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle
            cx="200"
            cy="200"
            r="180"
            stroke="#1D82A6"
            strokeOpacity="0.16"
            strokeWidth="1.5"
            strokeDasharray="4 10"
          />
        </svg>
        <svg
          className="hero-ring hero-ring-2"
          viewBox="0 0 300 300"
          fill="none"
        >
          <circle
            cx="150"
            cy="150"
            r="130"
            stroke="#C8952E"
            strokeOpacity="0.18"
            strokeWidth="1.5"
            strokeDasharray="2 8"
          />
        </svg>

        {/* Twinkling sparkle dots */}
        <span
          className="hero-sparkle"
          style={{ top: "18%", left: "12%", animationDelay: "0s" }}
        />
        <span
          className="hero-sparkle"
          style={{ top: "30%", left: "78%", animationDelay: "1.2s" }}
        />
        <span
          className="hero-sparkle"
          style={{ top: "62%", left: "6%", animationDelay: "2.4s" }}
        />
        <span
          className="hero-sparkle"
          style={{ top: "72%", left: "88%", animationDelay: "0.6s" }}
        />
        <span
          className="hero-sparkle"
          style={{ top: "10%", left: "55%", animationDelay: "1.8s" }}
        />
        <span
          className="hero-sparkle"
          style={{ top: "85%", left: "40%", animationDelay: "3s" }}
        />

        {/* Floating cross / pulse particles */}
        <span
          className="hero-particle"
          style={{
            left: "10%",
            animationDelay: "0s",
            animationDuration: "15s",
          }}
        >
          <Plus className="w-4 h-4 text-[#0E526B]/25" />
        </span>
        <span
          className="hero-particle"
          style={{
            left: "26%",
            animationDelay: "4s",
            animationDuration: "19s",
          }}
        >
          <HeartPulse className="w-5 h-5 text-[#C8952E]/30" />
        </span>
        <span
          className="hero-particle"
          style={{
            left: "64%",
            animationDelay: "7s",
            animationDuration: "17s",
          }}
        >
          <Plus className="w-3.5 h-3.5 text-[#1D82A6]/25" />
        </span>
        <span
          className="hero-particle"
          style={{
            left: "84%",
            animationDelay: "2s",
            animationDuration: "21s",
          }}
        >
          <Plus className="w-4 h-4 text-[#0E526B]/20" />
        </span>
        <span
          className="hero-particle"
          style={{
            left: "48%",
            animationDelay: "10s",
            animationDuration: "18s",
          }}
        >
          <HeartPulse className="w-4 h-4 text-[#C8952E]/25" />
        </span>

        {/* Animated heartbeat line */}
        <svg
          className="absolute top-28 left-0 w-[140%] opacity-[0.16] hero-pulse-line"
          height="60"
          viewBox="0 0 1400 60"
          fill="none"
        >
          <path
            d="M0 30 H480 L520 30 L545 8 L575 55 L605 15 L630 30 H1400"
            stroke="#0E526B"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Bottom flowing wave */}
        <svg
          className="absolute -bottom-1 left-0 w-full hero-wave"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C240,140 480,20 720,60 C960,100 1200,40 1440,90 L1440,160 L0,160 Z"
            fill="url(#waveGradient)"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1D82A6" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#C8952E" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#0E526B" stopOpacity="0.08" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
          {/* ───────────────── Left Content ───────────────── */}
          <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#0E526B]/15 shadow-[0_2px_10px_rgba(15,52,72,0.06)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8952E] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8952E]" />
              </span>
              <span className="text-[12px] font-semibold text-[#0E526B] tracking-wide">
                Apollo Hospitals — Precision &amp; Compassion
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <span className="block font-serif italic text-xl sm:text-2xl text-[#C8952E] font-medium">
                Touching Lives, Healing Hope
              </span>
              <h1 className="text-[2.6rem] sm:text-5xl xl:text-[3.4rem] font-extrabold text-[#0B3446] tracking-tight leading-[1.08]">
                Expert Care for a{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #C8952E 0%, #E8C173 50%, #C8952E 100%)",
                  }}
                >
                  Healthier Tomorrow
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-[15px] sm:text-base text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Advanced healthcare, trusted by millions, for every stage of life.
              Combining 40+ years of clinical excellence, robotic surgical
              precision, and world-renowned specialists — because every life
              matters.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
              <button
                onClick={onOpenAppointmentModal}
                className="group flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-[#3A2B0A] shadow-[0_6px_20px_rgba(197,146,46,0.4)] hover:shadow-[0_10px_28px_rgba(197,146,46,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                style={{
                  background:
                    "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
                }}
              >
                Book an Appointment
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <span
                className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(135deg, #0E526B 0%, #1D82A6 100%)",
                }}
              />

              {/* Soft shimmer sweep */}
              {/* <span className="absolute inset-0 -z-10 overflow-hidden rounded-full">
                <span className="hero-btn-shimmer" />
              </span> */}

              <ShieldCheck className="w-4 h-4 text-[#C8952E] group-hover:text-white transition-colors duration-300" />
              <span className="group-hover:text-white transition-colors duration-300">
                Find a Doctor
              </span>
              <ArrowRight className="w-4 h-4 text-[#C8952E] group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
            </div>

            {/* Search bar */}
            <div className="pt-2 max-w-xl mx-auto lg:mx-0">
              <form
                onSubmit={handleSearch}
                className="flex items-center bg-white p-2 rounded-full shadow-[0_8px_28px_rgba(15,52,72,0.10)] border border-slate-200/80 focus-within:border-[#0E526B]/40 transition-colors"
              >
                <div className="pl-3.5 text-[#0E526B]/60">
                  <Search className="w-4.5 h-4.5" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search doctors, specialities (e.g. Cardiology, Dr. Sangita)..."
                  className="w-full px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 sm:px-6 py-2.5 rounded-full text-white text-xs font-bold transition-all shrink-0 hover:brightness-105"
                  style={{
                    background:
                      "linear-gradient(180deg, #14688A 0%, #0E526B 100%)",
                  }}
                >
                  Search
                </button>
              </form>
            </div>

            {/* Trust badges */}
            <div className="pt-5 mt-2 grid grid-cols-3 gap-4 border-t border-[#0E526B]/10 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-white/70 backdrop-blur-sm flex items-center justify-center shrink-0 shadow-sm">
                  <ShieldCheck className="w-4.5 h-4.5 text-[#0E526B]" />
                </div>
                <div>
                  <div className="text-[12.5px] font-bold text-[#0B3446] leading-tight">
                    JCI Accredited
                  </div>
                  <div className="text-[10.5px] text-slate-500">
                    Global gold standard
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-white/70 backdrop-blur-sm flex items-center justify-center shrink-0 shadow-sm">
                  <HeartPulse className="w-4.5 h-4.5 text-[#0E526B]" />
                </div>
                <div>
                  <div className="text-[12.5px] font-bold text-[#0B3446] leading-tight">
                    24/7 Care
                  </div>
                  <div className="text-[10.5px] text-slate-500">
                    Emergency &amp; trauma
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-white/70 backdrop-blur-sm flex items-center justify-center shrink-0 shadow-sm">
                  <Award className="w-4.5 h-4.5 text-[#0E526B]" />
                </div>
                <div>
                  <div className="text-[12.5px] font-bold text-[#0B3446] leading-tight">
                    10,000+ Doctors
                  </div>
                  <div className="text-[10.5px] text-slate-500">
                    Top consultants
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ───────────────── Right Visual ───────────────── */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Soft gold aura behind the frame */}
              <div
                className="absolute -inset-4 rounded-[2.5rem] blur-2xl opacity-40 hero-aura"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(200,149,46,0.35), rgba(29,130,166,0.30))",
                }}
              />

              {/* Main image frame */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(15,52,72,0.30)] border-[6px] border-white bg-white">
                <div className="relative h-[440px] sm:h-[500px] w-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvc3BpdGFsfGVufDB8fDB8fHww"
                    alt="Apollo doctor caring for a patient"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />

                  {/* <span
                    className="absolute top-5 right-6 font-serif italic text-white/90 hover:bg-gradient-to-r hover:from-[#C8952E hover:via-[#E8C173] hover:to-[#C8952E] hover:bg-clip-text hover:text-transparent text-lg leading-tight text-right drop-shadow-sm"
                  >
                    Because
                    <br />
                    Every Life
                    <br />
                    Matters
                  </span> */}

                  <div className="absolute top-4 left-4 border-t-2 border-l-2 border-[#F6D98A] w-8 h-8 pointer-events-none rounded-tl-sm" />
                  <div className="absolute bottom-[6.5rem] right-4 border-b-2 border-r-2 border-[#F6D98A] w-8 h-8 pointer-events-none rounded-br-sm" />
                </div>

                {/* Floating rating card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/97 backdrop-blur-md rounded-2xl p-4 shadow-[0_12px_30px_rgba(15,52,72,0.2)] border border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        background:
                          "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
                      }}
                    >
                      <Star className="w-5 h-5 text-white fill-white" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-[#0B3446] leading-tight">
                        4.9 / 5.0 Rating
                      </div>
                      <div className="text-[11px] text-slate-500">
                        150,000+ verified reviews
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={onOpenAppointmentModal}
                    className="px-3.5 py-2 rounded-full text-xs font-bold text-white shrink-0 hover:brightness-105 transition-all"
                    style={{
                      background:
                        "linear-gradient(180deg, #14688A 0%, #0E526B 100%)",
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </div>

              {/* Floating stat chip */}
              <div className="hidden sm:flex absolute -left-8 top-10 items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-[0_16px_36px_rgba(15,52,72,0.15)] border border-slate-100 hero-float-slow">
                <div className="w-10 h-10 rounded-full bg-[#0E526B]/8 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-[#0E526B]" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-[#0B3446] leading-tight">
                    99.4%
                  </div>
                  <div className="text-[10.5px] text-slate-500 leading-tight">
                    Patient satisfaction
                  </div>
                </div>
              </div>

              {/* Floating emergency chip */}
              <div
                className="hidden sm:flex absolute -right-6 bottom-24 items-center gap-2 bg-[#0B3446] text-white rounded-full pl-2 pr-4 py-2 shadow-[0_16px_36px_rgba(15,52,72,0.28)] hero-float-slow"
                style={{ animationDelay: "1.5s" }}
              >
                <span className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-3.5 h-3.5 text-white" />
                </span>
                <div className="leading-tight">
                  <div className="text-[10px] text-white/70 font-medium">
                    24/7 Emergency
                  </div>
                  <div className="text-xs font-bold">1066</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Rotating mesh wash behind everything */
        .hero-mesh {
          position: absolute;
          inset: -20%;
          background: conic-gradient(
            from 0deg at 50% 50%,
            rgba(191, 227, 242, 0.5),
            rgba(243, 223, 168, 0.35),
            rgba(205, 234, 247, 0.5),
            rgba(191, 227, 242, 0.5)
          );
          filter: blur(90px);
          animation: meshRotate 30s linear infinite;
        }
        @keyframes meshRotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .hero-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(60px);
        }
        .hero-orb-1 {
          width: 320px;
          height: 320px;
          top: -100px;
          left: -100px;
          background: radial-gradient(circle, #bfe3f2, transparent 70%);
          opacity: 0.65;
          animation: orbFloat1 14s ease-in-out infinite;
        }
        .hero-orb-2 {
          width: 280px;
          height: 280px;
          top: 15%;
          right: -110px;
          background: radial-gradient(circle, #f3dfa8, transparent 70%);
          opacity: 0.55;
          animation: orbFloat2 18s ease-in-out infinite;
        }
        .hero-orb-3 {
          width: 260px;
          height: 260px;
          bottom: -100px;
          left: 25%;
          background: radial-gradient(circle, #a9dcef, transparent 70%);
          opacity: 0.5;
          animation: orbFloat3 20s ease-in-out infinite;
        }
        .hero-orb-4 {
          width: 200px;
          height: 200px;
          bottom: 10%;
          right: 10%;
          background: radial-gradient(circle, #e8c173, transparent 70%);
          opacity: 0.4;
          animation: orbFloat1 16s ease-in-out infinite reverse;
        }
        @keyframes orbFloat1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(50px, 40px) scale(1.1);
          }
        }
        @keyframes orbFloat2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-40px, 50px) scale(1.08);
          }
        }
        @keyframes orbFloat3 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(35px, -45px) scale(1.06);
          }
        }

        .hero-ring {
          position: absolute;
          width: 400px;
          height: 400px;
        }
        .hero-ring-1 {
          top: -60px;
          right: -60px;
          animation: ringSpin 60s linear infinite;
        }
        .hero-ring-2 {
          bottom: -40px;
          left: -40px;
          width: 300px;
          height: 300px;
          animation: ringSpin 45s linear infinite reverse;
        }
        @keyframes ringSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .hero-btn-shimmer {
          position: absolute;
          top: 0;
          left: -60%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255, 255, 255, 0.5) 50%,
            transparent 100%
          );
          transform: skewX(-20deg);
          animation: shimmerSlide 3.5s ease-in-out infinite;
        }
        @keyframes shimmerSlide {
          0% {
            left: -60%;
          }
          45% {
            left: 130%;
          }
          100% {
            left: 130%;
          }
        }

        .hero-sparkle {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 9999px;
          background: #c8952e;
          box-shadow: 0 0 8px 2px rgba(200, 149, 46, 0.5);
          animation: sparkleTwinkle 3.5s ease-in-out infinite;
        }
        @keyframes sparkleTwinkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0.6);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        .hero-particle {
          position: absolute;
          bottom: -40px;
          animation-name: floatUp;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes floatUp {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translateY(-260px) translateX(18px);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-520px) translateX(-10px);
            opacity: 0;
          }
        }

        .hero-pulse-line {
          animation: pulseLine 6s ease-in-out infinite;
        }
        @keyframes pulseLine {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.26;
          }
        }

        .hero-wave {
          animation: waveShift 10s ease-in-out infinite;
        }
        @keyframes waveShift {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }

        .hero-aura {
          animation: auraPulse 6s ease-in-out infinite;
        }
        @keyframes auraPulse {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.03);
          }
        }

        .hero-float-slow {
          animation: floatSlow 5s ease-in-out infinite;
        }
        @keyframes floatSlow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  );
}
