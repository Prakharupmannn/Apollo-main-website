"use client";

import {
  Calendar,
  ChevronRight,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  Clock,
  MessageCircleMore,
  Zap,
  CheckCircle2,
  Headphones,
} from "lucide-react";

export default function AppointmentBanner({ onOpenAppointmentModal }) {
  const trustPoints = [
    { icon: Zap, label: "Zero Wait Times", desc: "Instant slot confirmation" },
    { icon: MessageCircleMore, label: "SMS & WhatsApp", desc: "Digital receipt, instantly" },
    { icon: Clock, label: "24/7 Booking Desk", desc: "Round-the-clock support" },
  ];

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-[#EDF6FB]">
      {/* ───── Dynamic background — same system as the hero ───── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="ab-orb ab-orb-1" />
        <div className="ab-orb ab-orb-2" />
        <div className="ab-orb ab-orb-3" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(#2A8FAF 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 15%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 15%, transparent 75%)",
          }}
        />
        <span className="ab-sparkle" style={{ top: "16%", left: "10%", animationDelay: "0s" }} />
        <span className="ab-sparkle" style={{ top: "72%", left: "6%", animationDelay: "1.3s" }} />
        <span className="ab-sparkle" style={{ top: "22%", left: "90%", animationDelay: "2.1s" }} />
        <span className="ab-sparkle" style={{ top: "80%", left: "92%", animationDelay: "0.7s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Gradient-border wrapper for the glow-edge effect */}
        <div className="relative p-[1.5px] rounded-[2.25rem] bg-gradient-to-r from-[#F59E0B]/50 via-[#2A8FAF] to-[#F59E0B]/50 shadow-[0_30px_60px_-15px_rgba(10,95,122,0.35)]">
          <div className="relative rounded-[calc(2.25rem-1.5px)] overflow-hidden bg-gradient-to-b from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] p-8 sm:p-12 lg:p-14 text-white">
            {/* Ambient texture + glows */}
            <div className="absolute inset-0 bg-[radial-gradient(#53B3D4_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
            <div className="absolute -top-24 -right-16 w-80 h-80 bg-[#F59E0B]/20 rounded-full blur-[90px] pointer-events-none ab-glow" />
            <div className="absolute -bottom-24 -left-16 w-72 h-72 bg-[#2A8FAF]/40 rounded-full blur-[90px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              {/* Left content */}
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[#FEF3C7] text-xs font-bold border border-[#F6D98A]/40 shadow-inner">
                  <Sparkles className="w-3.5 h-3.5 text-[#F6D98A] animate-pulse" /> Take the First Step
                </span>

                <h2 className="text-3xl sm:text-4xl lg:text-[2.85rem] font-extrabold text-white leading-[1.15] tracking-tight">
                  Book Your Appointment{" "}
                  <span
                    className="bg-clip-text text-transparent drop-shadow-sm"
                    style={{ backgroundImage: "linear-gradient(90deg, #F6D98A 0%, #E8C173 50%, #C8952E 100%)" }}
                  >
                    Today
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-slate-100/90 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                  World-class healthcare is just a click away. Connect with top surgeons and
                  multi-specialty consultants in minutes — no queues, no delays.
                </p>

                {/* CTAs */}
                <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <button
                    onClick={onOpenAppointmentModal}
                    className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-extrabold text-[#3A2B0A] shadow-[0_10px_30px_rgba(197,146,46,0.45)] hover:shadow-[0_16px_40px_rgba(197,146,46,0.65)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer overflow-hidden"
                    style={{ background: "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)" }}
                  >
                    {/* Subtle shine sweep on button hover */}
                    <span className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                    <Calendar className="w-4 h-4 text-[#3A2B0A]" />
                    <span>Book Now</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>

                  <a
                    href="tel:1066"
                    className="group flex items-center gap-3 px-6 py-4 rounded-full text-sm font-bold bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/25 hover:border-white/40 shadow-sm transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
                    </span>
                    <PhoneCall className="w-4 h-4 text-[#F6D98A] group-hover:rotate-12 transition-transform duration-300" />
                    <span>Call 1066 Emergency</span>
                  </a>
                </div>

                {/* Mini trust row under CTAs */}
                <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-3 border-t border-white/15 mt-4">
                  {trustPoints.map((t) => {
                    const Icon = t.icon;
                    return (
                      <div
                        key={t.label}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.08] backdrop-blur-sm border border-white/15 text-xs text-slate-100 hover:bg-white/15 hover:border-white/25 transition-all duration-200"
                      >
                        <Icon className="w-3.5 h-3.5 text-[#F6D98A] shrink-0" />
                        <span className="font-semibold text-[11.5px]">{t.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right: Enhanced Trust card */}
              <div className="lg:col-span-5">
                <div className="group relative rounded-[2rem] bg-gradient-to-b from-white/20 to-white/5 backdrop-blur-xl border border-white/25 hover:border-white/40 p-7 sm:p-8 overflow-hidden shadow-2xl transition-all duration-300">
                  {/* Subtle top glow accent */}
                  <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[#F6D98A]/25 blur-3xl pointer-events-none group-hover:bg-[#F6D98A]/35 transition-all duration-500" />

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold tracking-wide uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Desk Active
                  </div>

                  <div className="relative z-10 flex flex-col items-center text-center pt-2">
                    {/* Glowing Icon Wrapper */}
                    <div className="relative mb-5">
                      <div className="absolute inset-0 rounded-2xl bg-[#F6D98A]/40 blur-xl group-hover:blur-2xl transition-all duration-300" />
                      <div
                        className="relative w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl border border-white/30 transform group-hover:scale-105 transition-transform duration-300"
                        style={{ background: "linear-gradient(135deg, #F6D98A 0%, #C8952E 100%)" }}
                      >
                        <ShieldCheck className="w-8 h-8 text-[#3A2B0A]" />
                      </div>
                    </div>

                    <h3 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-1.5">
                      Instant Confirmation
                      <CheckCircle2 className="w-4 h-4 text-[#F6D98A]" />
                    </h3>
                    <p className="text-xs text-slate-100/90 mt-2 leading-relaxed max-w-[240px]">
                      Zero wait times, direct digital receipt, and immediate SMS &amp; WhatsApp confirmation.
                    </p>
                  </div>

                  {/* Grid Features */}
                  <div className="relative z-10 mt-7 pt-6 border-t border-white/15 grid grid-cols-3 gap-3">
                    {trustPoints.map((t) => {
                      const Icon = t.icon;
                      return (
                        <div
                          key={t.label}
                          className="flex flex-col items-center text-center p-2 rounded-xl hover:bg-white/10 transition-colors duration-200"
                        >
                          <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center mb-2 shadow-inner group-hover:border-[#F6D98A]/50 transition-colors">
                            <Icon className="w-4 h-4 text-[#F6D98A]" />
                          </div>
                          <span className="text-[10px] text-slate-100 font-medium leading-tight">
                            {t.desc}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ab-glow {
          animation: abGlowPulse 6s ease-in-out infinite;
        }
        @keyframes abGlowPulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.08); }
        }

        .ab-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(70px);
        }
        .ab-orb-1 {
          width: 360px;
          height: 360px;
          top: -140px;
          left: -100px;
          background: radial-gradient(circle, #bfe3f2, transparent 70%);
          opacity: 0.5;
          animation: abFloat1 16s ease-in-out infinite;
        }
        .ab-orb-2 {
          width: 320px;
          height: 320px;
          top: 20%;
          right: -140px;
          background: radial-gradient(circle, #f3dfa8, transparent 70%);
          opacity: 0.4;
          animation: abFloat2 20s ease-in-out infinite;
        }
        .ab-orb-3 {
          width: 280px;
          height: 280px;
          bottom: -140px;
          left: 30%;
          background: radial-gradient(circle, #cdeaf7, transparent 70%);
          opacity: 0.4;
          animation: abFloat3 18s ease-in-out infinite;
        }
        @keyframes abFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 40px) scale(1.08); }
        }
        @keyframes abFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.06); }
        }
        @keyframes abFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -35px) scale(1.05); }
        }
        .ab-sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 9999px;
          background: #c8952e;
          box-shadow: 0 0 8px 2px rgba(200, 149, 46, 0.5);
          animation: abTwinkle 3.5s ease-in-out infinite;
        }
        @keyframes abTwinkle {
          0%, 100% { opacity: 0; transform: scale(0.6); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
}