"use client";

import { ShieldAlert, Heart, Brain, Activity, ArrowRight, Sparkles } from "lucide-react";

export default function CentresOfExcellence({ onOpenAppointmentModal }) {
  const centres = [
    {
      title: "Cancer Care",
      subtitle: "Comprehensive Advanced",
      desc: "CyberKnife, Proton Beam Therapy & personalized robotic surgical oncology.",
      icon: ShieldAlert,
      badge: "CyberKnife Hub",
      color: "from-pink-950/50 via-[#0E526B] to-[#093749]",
    },
    {
      title: "Heart Institute",
      subtitle: "Advanced In Every Beat",
      desc: "TAVI, robotic cardiac bypass & 24/7 emergency cath lab intervention.",
      icon: Heart,
      badge: "Robotic Cardiac",
      color: "from-red-950/50 via-[#0E526B] to-[#093749]",
    },
    {
      title: "Neurosciences",
      subtitle: "Advance Brain & Spine Care",
      desc: "Deep brain stimulation, robotic spine surgery & stroke center.",
      icon: Brain,
      badge: "Spine & DBS",
      color: "from-sky-950/50 via-[#0E526B] to-[#093749]",
    },
    {
      title: "Organ Transplant",
      subtitle: "Acclaimed Choice of Life",
      desc: "Over 25,000 successful liver, kidney, heart & lung transplants.",
      icon: Activity,
      badge: "25k+ Transplants",
      color: "from-emerald-950/50 via-[#0E526B] to-[#093749]",
    },
  ];

  return (
    <section id="centres-of-excellence" className="py-20 bg-[#093749] text-white relative overflow-hidden">
      
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1D82A6_1px,transparent_1px)] [background-size:28px_28px] opacity-15 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-[#1D82A6]/40 pb-6">
          <div>
            <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest block mb-1">
              Advanced Care for Complex Conditions
            </span>
            <h2 className="font-serif-apollo text-3xl sm:text-4xl font-extrabold text-white">
              Our Centres of Excellence
            </h2>
          </div>

          <a
            href="#specialities"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#F59E0B] hover:text-white transition-colors group"
          >
            <span>View All Centres</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 4 Visual Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {centres.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                onClick={onOpenAppointmentModal}
                className="group relative rounded-3xl p-6 border-2 border-[#1D82A6]/40 bg-gradient-to-b hover:border-[#F59E0B] transition-all duration-300 cursor-pointer overflow-hidden shadow-2xl flex flex-col justify-between"
              >
                {/* Background Image/Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-b ${item.color} opacity-90 group-hover:opacity-100 transition-opacity`} />

                <div className="relative z-10">
                  {/* Badge & Icon */}
                  <div className="flex items-center justify-between gap-2 mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#093749] border border-[#1D82A6]/50 flex items-center justify-center text-[#F59E0B] group-hover:scale-110 transition-transform shadow-lg">
                      <Icon className="w-7 h-7" />
                    </div>

                    <span className="text-[10px] font-bold text-[#FEF3C7] bg-[#F59E0B]/20 px-2.5 py-1 rounded-full border border-[#F59E0B]/30">
                      {item.badge}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-[#F59E0B] block mb-1">
                    {item.subtitle}
                  </span>

                  <h3 className="font-serif-apollo text-2xl font-bold text-white group-hover:text-[#FEF3C7] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-200 mt-3 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom Trigger */}
                <div className="relative z-10 mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-bold text-[#F59E0B]">
                  <span>Explore Centre</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
