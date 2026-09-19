"use client";

import {
  Building2,
  UserCheck,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  Check,
} from "lucide-react";

export default function WhyChooseApollo() {
  const advantages = [
    {
      title: "World-Class Infrastructure",
      desc: "State-of-the-art DaVinci robotic surgical suites, 3T MRI, PET-CT, and 24/7 dedicated ICU units.",
      icon: Building2,
      tag: "Technological Edge",
      num: "01",
      featured: true,
      stat: { value: "70+", label: "Advanced facilities nationwide" },
      // Clean Unsplash hospital/infrastructure photography URL
      bgImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
    },
    {
      title: "Renowned Specialists",
      desc: "Over 10,000 internationally trained doctors, surgeons & pioneer researchers.",
      icon: UserCheck,
      tag: "Clinical Excellence",
      num: "02",
    },
    {
      title: "Patient-Centric Approach",
      desc: "Personalized treatment plans, compassionate nursing, transparent family updates.",
      icon: HeartHandshake,
      tag: "Compassionate Healing",
      num: "03",
    },
    {
      title: "Global Standards",
      desc: "JCI & NABH accredited hospitals adhering to strict international safety protocols.",
      icon: ShieldCheck,
      tag: "Accredited Safety",
      num: "04",
    },
  ];

  const accreditations = ["JCI Accredited", "NABH Certified", "ISO 9001:2015", "NABL Labs"];

  return (
    <section id="why-choose-apollo" className="relative py-24 lg:py-32 overflow-hidden bg-[#EDF6FB]">
      {/* ───── Dynamic background — same system as the hero ───── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="wca-orb wca-orb-1" />
        <div className="wca-orb wca-orb-2" />
        <div className="wca-orb wca-orb-3" />

        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(#1D82A6 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 15%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black 15%, transparent 75%)",
          }}
        />

        <span className="wca-sparkle" style={{ top: "14%", left: "10%", animationDelay: "0s" }} />
        <span className="wca-sparkle" style={{ top: "72%", left: "6%", animationDelay: "1.2s" }} />
        <span className="wca-sparkle" style={{ top: "22%", left: "88%", animationDelay: "2.1s" }} />
        <span className="wca-sparkle" style={{ top: "80%", left: "92%", animationDelay: "0.7s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#0E526B]/15 shadow-sm mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#C8952E]" />
            <span className="text-[12px] font-semibold text-[#0E526B] tracking-wide uppercase">
              The Apollo Advantage
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl xl:text-[2.6rem] font-extrabold text-[#0B3446] tracking-tight leading-tight">
            Why Millions Choose{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #C8952E 0%, #E8C173 50%, #C8952E 100%)" }}
            >
              Apollo JBP Hospitals
            </span>
          </h2>
          <p className="text-slate-500 mt-3 text-sm sm:text-base leading-relaxed">
            Four decades of clinical mastery, human compassion, and relentless investment in the
            technology that saves lives.
          </p>
        </div>

        {/* ───── Bento Advantage Grid ───── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[240px] gap-5">
          {advantages.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`group relative rounded-[1.75rem] p-7 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1.5 ${
                  item.featured
                    ? "sm:col-span-2 lg:col-span-2 lg:row-span-2 shadow-[0_20px_50px_rgba(10,95,122,0.35)] hover:shadow-[0_26px_60px_rgba(10,95,122,0.45)]"
                    : "bg-white/95 backdrop-blur-sm border border-slate-100 shadow-[0_6px_22px_rgba(15,52,72,0.06)] hover:shadow-[0_18px_40px_rgba(15,52,72,0.12)]"
                }`}
              >
                {/* ───── Dynamic Photo & Overlay Base for Featured Card ───── */}
                {item.featured && (
                  <>
                    {/* Background Infrastructure Photo with zoom effect */}
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ backgroundImage: `url(${item.bgImage})` }}
                    />

                    {/* Gradient overlay — bright ocean theme, revealing the photo */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0A5F7A]/90 via-[#2A8FAF]/85 to-[#17627D]/92 mix-blend-multiply" />

                    {/* Light accent wash for depth and sheen */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#17627D] via-transparent to-white/10 opacity-80" />
                  </>
                )}

                {/* ghost number */}
                <span
                  className={`absolute -top-4 -right-1 font-extrabold leading-none select-none pointer-events-none ${
                    item.featured
                      ? "text-[110px] text-white/[0.08]"
                      : "text-[64px] text-[#0E526B]/[0.05]"
                  }`}
                >
                  {item.num}
                </span>

                {/* corner glow */}
                <div
                  className={`absolute -top-10 -right-10 w-36 h-36 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                    item.featured ? "bg-[#F6D98A]/20" : "bg-[#C8952E]/10"
                  }`} 
                />

                {/* subtle dot texture on featured card */}
                {item.featured && (
                  <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:18px_18px] pointer-events-none" />
                )}

                {/* Top: icon + tag */}
                <div className="relative z-10 flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 ${
                      item.featured
                        ? "shadow-lg border border-white/20 backdrop-blur-md"
                        : ""
                    }`}
                    style={{
                      background: item.featured
                        ? "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)"
                        : "linear-gradient(135deg, #0E526B, #1D82A6)",
                    }}
                  >
                    <Icon className={`w-6 h-6 ${item.featured ? "text-[#3A2B0A]" : "text-white"}`} strokeWidth={2.2} />
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                      item.featured
                        ? "bg-white/10 backdrop-blur-md text-[#FEF3C7] border-white/20"
                        : "bg-[#C8952E]/10 text-[#C8952E] border-[#C8952E]/20"
                    }`}
                  >
                    {item.tag}
                  </span>
                </div>

                {/* Middle: title + desc */}
                <div className="relative z-10 mt-6">
                  <h3
                    className={`font-bold leading-snug ${
                      item.featured ? "text-2xl sm:text-[1.7rem] text-white" : "text-lg text-[#0B3446]"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p
                    className={`mt-2.5 leading-relaxed ${
                      item.featured ? "text-sm text-slate-100/90 max-w-sm font-normal" : "text-[13px] text-slate-500"
                    }`}
                  >
                    {item.desc}
                  </p>
                </div>

                {/* Bottom: stat (featured) or CTA (others) */}
                {item.featured ? (
                  <div className="relative z-10 mt-6 flex items-end justify-between border-t border-white/20 pt-5 backdrop-blur-[2px]">
                    <div>
                      <div className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-[#F6D98A] to-[#C8952E]">
                        {item.stat.value}
                      </div>
                      <div className="text-[11px] text-white/80 mt-0.5 font-medium">{item.stat.label}</div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300">
                      <ArrowUpRight className="w-4 h-4 text-[#F6D98A]" />
                    </div>
                  </div>
                ) : (
                  <div className="relative z-10 mt-5 flex items-center gap-1 text-xs font-bold text-[#0E526B] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ───── Accreditation trust strip ───── */}
        <div className="mt-8 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-100 shadow-[0_6px_22px_rgba(15,52,72,0.06)] px-6 sm:px-8 py-5 flex flex-wrap items-center justify-center sm:justify-between gap-4">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            Globally Recognized Standards
          </span>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {accreditations.map((a) => (
              <span key={a} className="flex items-center gap-1.5 text-[12.5px] font-semibold text-[#0E526B]">
                <Check className="w-4 h-4 text-emerald-500" />
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .wca-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(70px);
        }
        .wca-orb-1 {
          width: 380px;
          height: 380px;
          top: -140px;
          left: -100px;
          background: radial-gradient(circle, #bfe3f2, transparent 70%);
          opacity: 0.55;
          animation: wcaFloat1 16s ease-in-out infinite;
        }
        .wca-orb-2 {
          width: 340px;
          height: 340px;
          top: 30%;
          right: -140px;
          background: radial-gradient(circle, #f3dfa8, transparent 70%);
          opacity: 0.45;
          animation: wcaFloat2 20s ease-in-out infinite;
        }
        .wca-orb-3 {
          width: 300px;
          height: 300px;
          bottom: -140px;
          left: 30%;
          background: radial-gradient(circle, #cdeaf7, transparent 70%);
          opacity: 0.45;
          animation: wcaFloat3 18s ease-in-out infinite;
        }
        @keyframes wcaFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 40px) scale(1.08); }
        }
        @keyframes wcaFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.06); }
        }
        @keyframes wcaFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -35px) scale(1.05); }
        }
        .wca-sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 9999px;
          background: #c8952e;
          box-shadow: 0 0 8px 2px rgba(200, 149, 46, 0.5);
          animation: wcaTwinkle 3.5s ease-in-out infinite;
        }
        @keyframes wcaTwinkle {
          0%, 100% { opacity: 0; transform: scale(0.6); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
}