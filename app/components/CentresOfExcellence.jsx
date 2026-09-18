"use client";

import {
  ShieldAlert,
  Heart,
  Brain,
  Activity,
  ArrowRight,
  Sparkles,
  Award,
} from "lucide-react";

export default function CentresOfExcellence({ onOpenAppointmentModal }) {
  const centres = [
    {
      title: "Cancer Care",
      subtitle: "Comprehensive & Advanced",
      desc: "CyberKnife, Proton Beam Therapy & personalized robotic surgical oncology.",
      icon: ShieldAlert,
      badge: "CyberKnife Hub",
      stat: { value: "98.2%", label: "5-yr survival rate" },
      accent: "#E86BA0",
      accentSoft: "rgba(232,107,160,0.15)",
      bgImage: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Heart Institute",
      subtitle: "Advanced in Every Beat",
      desc: "TAVI, robotic cardiac bypass & 24/7 emergency cath lab intervention.",
      icon: Heart,
      badge: "Robotic Cardiac",
      stat: { value: "50,000+", label: "Cardiac procedures" },
      accent: "#E14B4B",
      accentSoft: "rgba(225,75,75,0.15)",
      bgImage: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Neurosciences",
      subtitle: "Advanced Brain & Spine Care",
      desc: "Deep brain stimulation, robotic spine surgery & 24/7 stroke center.",
      icon: Brain,
      badge: "Spine & DBS",
      stat: { value: "15 min", label: "Avg. stroke response" },
      accent: "#4FA8E8",
      accentSoft: "rgba(79,168,232,0.15)",
      bgImage: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800",
    },
    {
      title: "Organ Transplant",
      subtitle: "Acclaimed Choice of Life",
      desc: "Over 25,000 successful liver, kidney, heart & lung transplants.",
      icon: Activity,
      badge: "25k+ Transplants",
      stat: { value: "94%", label: "1-yr graft success" },
      accent: "#3EC48A",
      accentSoft: "rgba(62,196,138,0.15)",
      bgImage: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <section
      id="centres-of-excellence"
      className="relative py-24 lg:py-32 bg-gradient-to-b from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] text-white overflow-hidden"
    >
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="coe-orb coe-orb-1" />
        <div className="coe-orb coe-orb-2" />
        <div className="coe-orb coe-orb-3" />
        <div className="absolute inset-0 bg-[radial-gradient(#1D82A6_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />

        <span className="coe-sparkle" style={{ top: "16%", left: "8%", animationDelay: "0s" }} />
        <span className="coe-sparkle" style={{ top: "74%", left: "12%", animationDelay: "1.3s" }} />
        <span className="coe-sparkle" style={{ top: "24%", left: "90%", animationDelay: "2s" }} />
        <span className="coe-sparkle" style={{ top: "82%", left: "86%", animationDelay: "0.6s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#F6D98A]" />
              <span className="text-[11.5px] font-semibold text-[#FEF3C7] tracking-widest uppercase">
                Advanced Care for Complex Conditions
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl xl:text-[2.6rem] font-extrabold text-white tracking-tight leading-tight">
              Our Centres of{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #F6D98A 0%, #C8952E 100%)" }}
              >
                Excellence
              </span>
            </h2>
            <p className="text-slate-100/90 text-sm sm:text-base mt-3 max-w-xl leading-relaxed">
              Four specialized institutes, each backed by dedicated research, global protocols,
              and outcomes that rank among the best in the country.
            </p>
          </div>

          <a
            href="#all-specialities"
            className="group relative inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white border border-[#1D82A6]/20 shadow-sm hover:shadow-md hover:border-[#C8952E]/50 transition-all duration-300 ease-out hover:-translate-y-0.5 shrink-0"
          >
            <span className="text-xs font-bold text-[#0B3446] group-hover:text-[#1D82A6] transition-colors tracking-wide">
              View All Specialities
            </span>
            <span className="w-6 h-6 rounded-full bg-[#EBF5F8] group-hover:bg-[#C8952E] flex items-center justify-center transition-all duration-300 group-hover:scale-110">
              <ArrowRight className="w-3.5 h-3.5 text-[#1D82A6] group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300" />
            </span>
          </a>
        </div>

        {/* Centres Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {centres.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                onClick={onOpenAppointmentModal}
                className="coe-card group relative rounded-[2rem] p-7 cursor-pointer overflow-hidden flex flex-col justify-between bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-md border border-white/15 transition-all duration-500 hover:-translate-y-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
                style={{ "--accent": item.accent, "--accent-soft": item.accentSoft }}
              >
                {/* ───── Background Photo Layer with Soft Blend ───── */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 opacity-15 group-hover:opacity-25"
                  style={{ backgroundImage: `url(${item.bgImage})` }}
                />

                {/* Bright ocean gradient mask over image to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A5F7A]/90 via-[#2A8FAF]/80 to-[#17627D]/95" />

                {/* Glow blob */}
                <div
                  className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: item.accent }}
                />

                {/* Top hairline that grows on hover */}
                <span
                  className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 ease-out"
                  style={{ background: item.accent }}
                />

                <div className="relative z-10">
                  {/* Icon + badge */}
                  <div className="flex items-start justify-between gap-2 mb-6">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 shadow-xl border border-white/20 backdrop-blur-md"
                      style={{ background: item.accentSoft, color: item.accent }}
                    >
                      <Icon className="w-7 h-7 drop-shadow-md" strokeWidth={2.2} />
                    </div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border backdrop-blur-md shadow-sm"
                      style={{
                        color: item.accent,
                        borderColor: item.accent,
                        background: item.accentSoft,
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <span
                    className="text-[11px] font-bold uppercase tracking-widest block mb-1"
                    style={{ color: item.accent }}
                  >
                    {item.subtitle}
                  </span>

                  <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-[#FEF3C7] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-[13px] text-slate-100/90 mt-3 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                {/* Stat + CTA footer */}
                <div className="relative z-10 mt-8 pt-5 border-t border-white/10 backdrop-blur-[2px]">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <div
                        className="text-2xl font-extrabold tracking-tight drop-shadow-sm"
                        style={{ color: item.accent }}
                      >
                        {item.stat.value}
                      </div>
                      <div className="text-[10.5px] text-slate-100/85 mt-0.5 font-medium">
                        {item.stat.label}
                      </div>
                    </div>
                    <Award className="w-6 h-6 text-white/20 group-hover:text-white/40 transition-colors" />
                  </div>

                  <div
                    className="flex items-center justify-between text-xs font-bold transition-all duration-300"
                    style={{ color: item.accent }}
                  >
                    <span className="group-hover:tracking-wider transition-all duration-300">
                      Explore Centre
                    </span>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-white/10">
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .coe-card:hover {
          border-color: var(--accent);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.45), 0 0 25px var(--accent-soft);
        }

        .coe-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(80px);
        }
        .coe-orb-1 {
          width: 320px;
          height: 320px;
          top: -80px;
          left: -80px;
          background: radial-gradient(circle, rgba(29, 130, 166, 0.35), transparent 70%);
          animation: coeFloat1 16s ease-in-out infinite;
        }
        .coe-orb-2 {
          width: 280px;
          height: 280px;
          top: 40%;
          right: -100px;
          background: radial-gradient(circle, rgba(200, 149, 46, 0.22), transparent 70%);
          animation: coeFloat2 20s ease-in-out infinite;
        }
        .coe-orb-3 {
          width: 260px;
          height: 260px;
          bottom: -80px;
          left: 40%;
          background: radial-gradient(circle, rgba(29, 130, 166, 0.25), transparent 70%);
          animation: coeFloat3 18s ease-in-out infinite;
        }
        @keyframes coeFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, 30px) scale(1.08); }
        }
        @keyframes coeFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 20px) scale(1.06); }
        }
        @keyframes coeFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -25px) scale(1.05); }
        }
        .coe-sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 9999px;
          background: #f6d98a;
          box-shadow: 0 0 8px 2px rgba(246, 217, 138, 0.5);
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