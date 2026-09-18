"use client";

import { useState } from "react";
import { Play, Building2, UserCheck, HeartHandshake, ShieldCheck, X, Sparkles, Check } from "lucide-react";

export default function WhyChooseApollo() {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const advantages = [
    {
      title: "World-Class Infrastructure",
      desc: "State-of-the-art DaVinci robotic surgical suites, 3T MRI, PET-CT, and 24/7 dedicated ICU units.",
      icon: Building2,
      tag: "Technological Edge",
    },
    {
      title: "Renowned Specialists",
      desc: "Over 10,000 internationally trained doctors, surgeons, and pioneer researchers across India.",
      icon: UserCheck,
      tag: "Clinical Excellence",
    },
    {
      title: "Patient-Centric Approach",
      desc: "Personalized treatment plans, compassionate nursing care, and transparent family communications.",
      icon: HeartHandshake,
      tag: "Compassionate Healing",
    },
    {
      title: "Global Standards",
      desc: "JCI & NABH accredited hospitals adhering to strict international infection control and safety protocols.",
      icon: ShieldCheck,
      tag: "Accredited Safety",
    },
  ];

  return (
    <section id="why-choose-apollo" className="py-20 bg-gradient-to-b from-[#F8FAFC] via-[#EBF5F8] to-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-xs font-bold text-[#1D82A6] uppercase tracking-widest block mb-1">
            The Apollo Advantage
          </span>
          <h2 className="font-serif-apollo text-3xl sm:text-4xl font-extrabold text-[#0E526B]">
            Why Choose Apollo
          </h2>
        </div>

        {/* Video Card + 4 Advantage Cards Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Hospital Video Tour Preview Card */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#1D82A6]/40 bg-[#093749] group">
              
              {/* Card Visual Background */}
              <div className="h-[360px] sm:h-[400px] w-full bg-gradient-to-br from-[#093749] via-[#0E526B] to-[#1D82A6] relative flex flex-col justify-between p-8">
                
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F59E0B]/20 text-[#FEF3C7] text-xs font-bold border border-[#F59E0B]/40">
                    <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" /> Apollo Main Campus Tour
                  </span>
                  <span className="text-xs text-white/70 font-mono">03:45 HD</span>
                </div>

                {/* Center Play Button Trigger */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4 my-auto">
                  <button
                    onClick={() => setVideoModalOpen(true)}
                    className="w-20 h-20 rounded-full bg-gold-gradient text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer group-hover:shadow-[0_0_40px_rgba(245,158,11,0.6)]"
                    aria-label="Play hospital tour video"
                  >
                    <Play className="w-8 h-8 fill-slate-950 ml-1" />
                  </button>
                  <p className="text-sm font-bold text-white tracking-wide">
                    Watch Apollo Hospital Virtual Tour & Robotic Suites
                  </p>
                </div>

                {/* Bottom Title Bar */}
                <div className="relative z-10 border-t border-white/10 pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif-apollo text-lg font-bold text-white">
                      A Legacy of Tech & Innovation
                    </h4>
                    <p className="text-xs text-slate-200">
                      Experience world-class healthcare facilities in action
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Right Column: 4 Advantage Grid Cards */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {advantages.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-6 border-1.5 border-[#1D82A6]/30 shadow-md hover:shadow-xl hover:border-[#1D82A6] transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0E526B] text-[#F59E0B] flex items-center justify-center mb-4 group-hover:bg-[#1D82A6] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[10px] font-bold text-[#1D82A6] uppercase tracking-wider block mb-1">
                    {item.tag}
                  </span>
                  
                  <h3 className="font-serif-apollo text-base font-bold text-[#0E526B]">
                    {item.title}
                  </h3>
                  
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      {/* Video Modal Player */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#0E526B] rounded-3xl max-w-3xl w-full p-6 border-2 border-[#1D82A6] relative shadow-2xl">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-4">
              <h3 className="font-serif-apollo text-xl font-bold text-[#FEF3C7]">
                Apollo Hospitals Tour & Virtual Walkthrough
              </h3>
              <p className="text-xs text-slate-200">
                Showcase of state-of-the-art robotic suites, ICUs, and patient amenities.
              </p>
            </div>

            <div className="aspect-video bg-slate-950 rounded-2xl flex items-center justify-center border border-[#1D82A6]/40 overflow-hidden relative">
              <div className="text-center p-8 space-y-3">
                <Building2 className="w-16 h-16 text-[#F59E0B] mx-auto animate-bounce" />
                <h4 className="text-lg font-bold text-white">Interactive Tour Player</h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  Demonstration video loaded. Standard streaming active.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#093749] text-xs text-[#FEF3C7] border border-[#1D82A6]/40">
                  <Check className="w-4 h-4 text-emerald-400" /> JCI Certified Facility
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
