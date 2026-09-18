"use client";

import { Calendar, ChevronRight, ShieldCheck, PhoneCall, Sparkles } from "lucide-react";

export default function AppointmentBanner({ onOpenAppointmentModal }) {
  return (
    <section className="py-12 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Full Width Callout Card Container */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#093749] via-[#0E526B] to-[#1D82A6] border-2 border-[#1D82A6]/50 shadow-2xl p-8 sm:p-12 text-white">
          
          {/* Subtle Background Radial Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(#1D82A6_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

          {/* Corner Accents */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F59E0B]/20 text-[#FEF3C7] text-xs font-bold border border-[#F59E0B]/40">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" /> TAKE THE FIRST STEP
              </span>

              <h2 className="font-serif-apollo text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Book Your Appointment <span className="text-[#F59E0B]">Today</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-100 max-w-xl font-normal leading-relaxed">
                World class healthcare is just a click away. Connect with top surgeons and multi-specialty consultants in minutes.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={onOpenAppointmentModal}
                  className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold bg-gold-gradient text-slate-950 shadow-xl hover:shadow-2xl hover:scale-105 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-slate-950" />
                  Read More & Book Now
                  <ChevronRight className="w-4 h-4 text-slate-950" />
                </button>

                <a
                  href="tel:1066"
                  className="flex items-center gap-2 px-6 py-4 rounded-full text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
                >
                  <PhoneCall className="w-4 h-4 text-[#FEF3C7]" />
                  Call 1066 Emergency
                </a>
              </div>
            </div>

            {/* Right Graphic/Trust Marker Column */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <ShieldCheck className="w-12 h-12 text-[#F59E0B] mb-3 animate-pulse" />
              <div className="font-serif-apollo text-xl font-bold text-white">Instant Confirmation</div>
              <p className="text-xs text-slate-200 mt-1">Zero wait times • Direct digital receipt • Instant SMS & WhatsApp confirmation</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
