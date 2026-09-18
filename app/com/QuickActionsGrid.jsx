"use client";

import { Calendar, UserCheck, Activity, Globe, Siren, ArrowUpRight, Award, ShieldAlert, HeartHandshake, Sparkles } from "lucide-react";

export default function QuickActionsGrid({ onOpenAppointmentModal, onOpenSpecialtyDrawer }) {
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
      desc: "Expert, Clinical, Comprehensive preventive plans",
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
      
      {/* 5 Dark Metallic Teal Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {actionCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={card.action ? card.action : undefined}
              className={`group relative rounded-2xl p-6 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between ${
                card.highlight
                  ? "bg-gradient-to-b from-[#0E526B] to-[#093749] border-2 border-red-500/50 shadow-2xl hover:border-red-500"
                  : "glass-teal-card"
              }`}
            >
              {/* Subtle Corner Highlight */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#F59E0B]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div>
                {/* Badge & Icon Row */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                    card.highlight
                      ? "bg-red-600 text-white shadow-lg"
                      : "bg-[#0E526B] text-[#F59E0B] border border-[#1D82A6]/40 group-hover:bg-[#F59E0B] group-hover:text-slate-950"
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border ${
                    card.highlight
                      ? "bg-red-500/20 text-red-300 border-red-500/40"
                      : "bg-[#F59E0B]/15 text-[#FEF3C7] border-[#F59E0B]/40"
                  }`}>
                    {card.badge}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="font-serif-apollo text-lg font-bold text-white group-hover:text-[#FEF3C7] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-200 mt-2 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              {/* Bottom CTA Arrow */}
              <div className="mt-6 flex items-center gap-1 text-xs font-bold text-[#F59E0B] group-hover:translate-x-1 transition-transform">
                <span>Access Now</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Attached Stats Banner Below */}
      <div className="mt-6 rounded-2xl bg-gradient-to-r from-[#093749] via-[#0E526B] to-[#093749] border-2 border-[#1D82A6]/40 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Background Subtle Shimmer */}
        <div className="absolute inset-0 bg-[radial-gradient(#1D82A6_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Stats Items Columns */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center sm:text-left divide-y sm:divide-y-0 sm:divide-x divide-[#1D82A6]/30">
            {stats.map((stat, idx) => (
              <div key={stat.label} className={idx > 0 ? "sm:pl-6 pt-4 sm:pt-0" : ""}>
                <div className="font-serif-apollo text-2xl sm:text-3xl xl:text-4xl font-extrabold text-[#F59E0B] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-white mt-1">
                  {stat.label}
                </div>
                <div className="text-[10px] text-slate-200 mt-0.5">
                  {stat.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Slogan & Social Hashtag Callout Column */}
          <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-[#1D82A6]/40 pt-6 md:pt-0 md:pl-8 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F59E0B]/20 text-[#FEF3C7] text-xs font-bold mb-2 border border-[#F59E0B]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" /> Apollo Assurance
            </div>
            <h4 className="font-serif-apollo text-xl font-bold text-white leading-snug">
              A Healthier, Brighter Tomorrow
            </h4>
            <div className="text-sm font-extrabold text-[#F59E0B] mt-1 tracking-wider">
              #WithApollo
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
