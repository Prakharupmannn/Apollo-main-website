"use client";

import { useState } from "react";
import { Search, ChevronRight, ShieldCheck, HeartPulse, Award, Users, Star, ArrowRight } from "lucide-react";

export default function HeroSection({ onOpenAppointmentModal, onSearchSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(searchQuery, selectedCategory);
    }
  };

  return (
    <section className="relative pt-32 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#EBF5F8] to-[#F8FAFC]">
      {/* Background Marble Subtle Texture Graphics */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#1D82A6_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#1D82A6]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E526B] border border-[#1D82A6]/40 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-ping" />
              <span className="text-xs sm:text-sm font-semibold text-[#FEF3C7] tracking-wide">
                Apollo Hospitals • Precision & Compassion
              </span>
            </div>

            {/* Script Slogan Accent */}
            <div className="relative">
              <span className="font-serif-apollo italic text-2xl sm:text-3xl text-[#1D82A6] font-bold block mb-1">
                "Touching Lives • Healing Hope"
              </span>
              <h1 className="font-serif-apollo text-4xl sm:text-5xl xl:text-6xl font-extrabold text-[#0E526B] tracking-tight leading-[1.12]">
                Expert Care for a <br className="hidden sm:block" />
                <span className="text-gold-gradient">Healthier Tomorrow</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              Advanced Healthcare, Trusted by Millions, For Every Stage of Life. Combining 40+ years of clinical excellence, robotic surgical precision, and world-renowned specialists.
            </p>

            {/* Primary Action Pill CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              {/* Book Appointment Gold Button */}
              <button
                onClick={onOpenAppointmentModal}
                className="group flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold bg-gold-gradient text-slate-950 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer border border-[#F59E0B]/50"
              >
                Book Appointment
                <ChevronRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Find a Doctor Outline Pill */}
              <a
                href="#doctors"
                className="flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold bg-[#0E526B] text-white hover:bg-[#1D82A6] transition-all shadow-md hover:scale-[1.02] border border-[#1D82A6]/40"
              >
                Find a Doctor
                <ArrowRight className="w-4 h-4 text-[#F59E0B]" />
              </a>
            </div>

            {/* Quick Hero Search Component */}
            <div className="pt-4 max-w-xl mx-auto lg:mx-0">
              <form
                onSubmit={handleSearch}
                className="flex items-center bg-white p-2 rounded-full shadow-xl border-2 border-[#1D82A6]/30 focus-within:border-[#1D82A6] transition-all"
              >
                <div className="pl-4 text-slate-400">
                  <Search className="w-5 h-5 text-[#1D82A6]" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search doctors, specialities (e.g. Cardiology, Dr. Sangita)..."
                  className="w-full px-3 py-2 text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full bg-[#1D82A6] hover:bg-[#166F91] text-white text-xs font-bold transition-all shrink-0 border border-white/20"
                >
                  Search
                </button>
              </form>
            </div>

            {/* Trust Badges Bar */}
            <div className="pt-4 grid grid-cols-3 gap-4 border-t border-[#1D82A6]/20 max-w-lg mx-auto lg:mx-0 text-left">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#F59E0B] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#0E526B]">JCI Accredited</div>
                  <div className="text-[10px] text-slate-500">Global Gold Standard</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <HeartPulse className="w-5 h-5 text-[#F59E0B] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#0E526B]">24/7 Care</div>
                  <div className="text-[10px] text-slate-500">Emergency & Trauma</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-[#F59E0B] shrink-0" />
                <div>
                  <div className="text-xs font-bold text-[#0E526B]">10,000+ Doctors</div>
                  <div className="text-[10px] text-slate-500">Top Consultants</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual Image Card Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Glow Aura */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#1D82A6] via-[#F59E0B] to-[#0E526B] rounded-3xl blur-xl opacity-30 animate-pulse" />

              {/* Main Image Frame Container */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-[#1D82A6]/40 bg-white">
                
                {/* Visual Medical Image */}
                <div className="relative h-[420px] sm:h-[480px] w-full bg-gradient-to-tr from-[#093749] to-[#0E526B] flex items-center justify-center overflow-hidden">
                  
                  {/* High quality medical graphic background */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1D82A6] via-[#0E526B] to-[#093749] opacity-95" />

                  {/* Doctor & Patient Care Scene Visual */}
                  <div className="relative z-10 text-center p-8 space-y-6 text-white max-w-sm">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-[#F59E0B] to-[#FEF3C7] p-1 shadow-2xl flex items-center justify-center">
                      <div className="w-full h-full rounded-full bg-[#0E526B] flex items-center justify-center">
                        <Users className="w-10 h-10 text-[#F59E0B]" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="inline-block px-3 py-1 rounded-full bg-[#F59E0B]/20 text-[#FEF3C7] text-xs font-bold border border-[#F59E0B]/40">
                        Patient First Care
                      </div>
                      <h3 className="font-serif-apollo text-2xl font-bold text-white">
                        World-Class Doctors & Compassionate Staff
                      </h3>
                      <p className="text-xs text-slate-200 leading-relaxed">
                        Dedicated team of medical specialists delivering advanced treatments with personalized empathy.
                      </p>
                    </div>

                    {/* Quick Stat Pill */}
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-xs text-white">
                      <div className="flex -space-x-2">
                        <span className="w-6 h-6 rounded-full bg-[#F59E0B] border border-white text-[10px] font-bold text-slate-950 flex items-center justify-center">A</span>
                        <span className="w-6 h-6 rounded-full bg-[#1D82A6] border border-white text-[10px] font-bold text-white flex items-center justify-center">P</span>
                        <span className="w-6 h-6 rounded-full bg-[#0E526B] border border-white text-[10px] font-bold text-[#FEF3C7] flex items-center justify-center">O</span>
                      </div>
                      <span className="font-semibold text-slate-100">99.4% Patient Satisfaction Rate</span>
                    </div>
                  </div>

                  {/* Decorative Corner Accents */}
                  <div className="absolute top-4 left-4 border-t-2 border-l-2 border-[#F59E0B] w-8 h-8 pointer-events-none" />
                  <div className="absolute bottom-4 right-4 border-b-2 border-r-2 border-[#F59E0B] w-8 h-8 pointer-events-none" />
                </div>

                {/* Floating Rating Overlay Card */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-[#1D82A6]/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0E526B] flex items-center justify-center text-[#F59E0B]">
                      <Star className="w-5 h-5 fill-[#F59E0B]" />
                    </div>
                    <div>
                      <div className="text-sm font-extrabold text-[#0E526B]">4.9 / 5.0 Rating</div>
                      <div className="text-[11px] text-slate-500">Based on 150,000+ Verified Reviews</div>
                    </div>
                  </div>
                  <button
                    onClick={onOpenAppointmentModal}
                    className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#1D82A6] text-white hover:bg-[#F59E0B] hover:text-slate-950 transition-colors"
                  >
                    Book Now
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
