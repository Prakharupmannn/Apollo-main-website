"use client";

import {
  Calendar,
  UserCheck,
  Activity,
  Globe,
  Siren,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function QuickActionsGrid({ onOpenAppointmentModal }) {
  const actionCards = [
    {
      id: "appointment",
      title: "Book Appointment",
      desc: "Schedule your visit today with top specialists",
      icon: Calendar,
      action: onOpenAppointmentModal,
      badge: "Fast Track",
    },
    {
      id: "find-doctor",
      title: "Find a Doctor",
      desc: "Search doctors in your city & specialty",
      icon: UserCheck,
      href: "#doctors",
      badge: "10,000+ Experts",
    },
    {
      id: "health-check",
      title: "Health Checkup",
      desc: "Expert, clinical, comprehensive preventive plans",
      icon: Activity,
      href: "#specialities",
      badge: "Full Body Care",
    },
    {
      id: "international",
      title: "International Patients",
      desc: "Personalized end-to-end care for overseas patients",
      icon: Globe,
      href: "#",
      badge: "Global Desk",
    },
    {
      id: "emergency",
      title: "Emergency Care",
      desc: "24x7 critical care, trauma & ambulance service",
      icon: Siren,
      href: "tel:1066",
      badge: "24/7 Rapid",
      highlight: true,
    },
  ];

  const stats = [
    { value: "40+", label: "Years of Trusted Care", desc: "Pioneering healthcare since 1983" },
    { value: "10,000+", label: "Expert Doctors", desc: "World-renowned medical minds" },
    { value: "70+", label: "Hospitals Across India", desc: "State-of-the-art facilities" },
    { value: "Millions", label: "Lives Touched", desc: "Across 120+ countries worldwide" },
  ];

  return (
    <section className="relative -mt-10 z-20 max-w-7xl mx-auto px-4 sm:px-8">
      {/* Dynamic Keyframe Injection for Pure Tailwind Scroll */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* ───── Dynamic ambient background — pure Tailwind ───── */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden rounded-[2.5rem]">
        <div className="absolute -top-24 -left-16 w-80 h-80 bg-[#1D82A6]/20 rounded-full blur-3xl animate-pulse [animation-duration:5s]" />
        <div className="absolute top-10 -right-20 w-72 h-72 bg-[#F59E0B]/15 rounded-full blur-3xl animate-pulse [animation-duration:7s]" />
        <div className="absolute -bottom-24 left-1/3 w-64 h-64 bg-[#0E526B]/15 rounded-full blur-3xl animate-pulse [animation-duration:6s]" />
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1D82A6_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* ───── Action Cards ───── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {actionCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={card.action ? card.action : undefined}
              className={`group relative p-[1.5px] rounded-[1.75rem] cursor-pointer transition-all duration-300 hover:-translate-y-2 ${
                card.highlight
                  ? "bg-gradient-to-br from-red-500 via-red-600 to-[#0E526B] shadow-[0_10px_30px_rgba(239,68,68,0.35)] hover:shadow-[0_20px_45px_rgba(239,68,68,0.5)]"
                  : "bg-gradient-to-br from-[#1D82A6]/60 via-white/10 to-[#F59E0B]/60 shadow-[0_10px_30px_rgba(6,32,43,0.3)] hover:shadow-[0_20px_45px_rgba(6,32,43,0.5)]"
              }`}
            >
              {/* Inner card surface using the new bright ocean theme */}
              <div className="relative h-full rounded-[calc(1.75rem-1.5px)] p-6 flex flex-col justify-between overflow-hidden transition-colors duration-300 bg-gradient-to-b from-[#0A5F7A] via-[#2A8FAF] to-[#17627D]">
                {/* Glow blob top-right, blooms on hover */}
                <div
                  className={`absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    card.highlight ? "bg-red-400/40" : "bg-[#F59E0B]/30"
                  }`}
                />

                {/* Faint dotted texture */}
                <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                {/* Live pulse dot on Emergency card */}
                {card.highlight && (
                  <span className="absolute top-5 right-5 flex h-2.5 w-2.5 z-10">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-400" />
                  </span>
                )}

                {/* Badge & Icon Row */}
                <div className="relative z-10 flex items-center justify-between gap-2 mb-5">
                  <div
                    className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center shrink-0 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 ${
                      card.highlight
                        ? "bg-gradient-to-br from-red-500 to-red-700 text-white"
                        : "bg-gradient-to-br from-[#F59E0B] to-[#C8952E] text-slate-950"
                    }`}
                  >
                    <Icon className="w-6 h-6" strokeWidth={2.2} />
                  </div>

                  <span
                    className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border backdrop-blur-sm ${
                      card.highlight
                        ? "bg-red-500/20 text-red-200 border-red-400/40"
                        : "bg-white/10 text-[#FEF3C7] border-white/20"
                    }`}
                  >
                    {card.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-white leading-snug group-hover:text-[#FEF3C7] transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-xs text-slate-100 mt-2 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* Bottom CTA */}
                <div className="relative z-10 mt-6 flex items-center justify-between">
                  <span
                    className={`text-xs font-bold transition-colors duration-200 ${
                      card.highlight ? "text-red-300" : "text-[#F6D98A]"
                    }`}
                  >
                    Access Now
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 ${
                      card.highlight ? "bg-red-500/20" : "bg-white/10"
                    }`}
                  >
                    <ArrowUpRight
                      className={`w-4 h-4 ${card.highlight ? "text-red-300" : "text-[#F6D98A]"}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ───── Stats Banner with Infinite Horizontal Scroll Animation ───── */}
      <div className="mt-6 p-[1.5px] rounded-[1.75rem] bg-gradient-to-r from-[#F59E0B]/50 via-[#1D82A6]/40 to-[#F59E0B]/50 shadow-[0_20px_50px_rgba(6,32,43,0.4)]">
        <div className="relative rounded-[calc(1.75rem-1.5px)] bg-gradient-to-b from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] p-6 overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute -top-16 left-1/4 w-64 h-64 bg-[#F59E0B]/10 rounded-full blur-3xl animate-pulse [animation-duration:8s] pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(#1D82A6_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
            {/* Infinite Horizontal Scroll Track */}
            <div className="md:col-span-8 overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="animate-marquee gap-8 items-center py-1">
                {[...stats, ...stats].map((stat, idx) => (
                  <div
                    key={`${stat.label}-${idx}`}
                    className="flex-shrink-0 w-48 sm:w-56 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:border-[#F59E0B]/50 group"
                  >
                    <div className="text-2xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-[#F6D98A] to-[#C8952E] tracking-tight group-hover:scale-105 transition-transform origin-left">
                      {stat.value}
                    </div>
                    <div className="text-xs font-bold text-white mt-1 group-hover:text-[#FEF3C7] transition-colors">
                      {stat.label}
                    </div>
                    <div className="text-[10px] text-slate-100 mt-0.5 line-clamp-1">
                      {stat.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Slogan Container */}
            <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-white/20 pt-6 md:pt-0 md:pl-8 text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F59E0B]/20 text-[#FEF3C7] text-xs font-bold mb-2 border border-[#F59E0B]/30">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] animate-pulse" /> Apollo Assurance
              </div>
              <h4 className="text-xl font-bold text-white leading-snug">
                A Healthier, Brighter Tomorrow
              </h4>
              <div className="text-sm font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#F6D98A] to-[#C8952E] mt-1 tracking-wider">
                #WithApollo
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}