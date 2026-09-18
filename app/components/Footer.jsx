"use client";

import { Stethoscope, PhoneCall, Mail, MapPin, Send, ShieldCheck, Globe, Share2, MessageCircle, Video, ChevronRight, HeartPulse } from "lucide-react";

export default function Footer({ onOpenAppointmentModal }) {
  return (
    <footer id="footer" className="bg-gradient-to-b from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] text-white pt-16 pb-8 border-t border-[#1D82A6]/30 relative overflow-hidden">
      
      {/* Background Decorative Ambient Glows & Subtle Grid Patterns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#F6D98A]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-[#C8952E]/10 rounded-full blur-3xl" />
        <div 
          className="absolute inset-0 opacity-[0.12]" 
          style={{ 
            backgroundImage: "radial-gradient(#1D82A6 1px, transparent 1px)", 
            backgroundSize: "28px 28px" 
          }} 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Top Slogan Banner Section (Light Theme Card for Visual Pop) */}
        <div className="mb-16 p-[1.5px] rounded-[2rem] bg-gradient-to-r from-[#1D82A6] via-[#C8952E] to-[#F6D98A] shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          <div className="bg-gradient-to-r from-[#EDF6FB] via-[#F4FAFC] to-[#aedcf5] text-slate-800 rounded-[calc(2rem-1.5px)] p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6 border border-white">
            
            {/* Subtle Watermark inside Banner */}
            <HeartPulse className="absolute -right-6 -bottom-6 w-56 h-56 opacity-[0.07] pointer-events-none text-[#0E526B]" />

            <div className="space-y-2 relative z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E526B]/10 text-[#0E526B] text-xs font-extrabold uppercase tracking-widest border border-[#0E526B]/20">
                Apollo Assurance Slogan
              </span>
              <h3 className="font-serif-apollo text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#0B3446]">
                Healthier People, <span className="bg-gradient-to-r from-[#0E526B] to-[#C8952E] bg-clip-text text-transparent">Brighter Tomorrows</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                For You. For Your Family. For a Healthier Tomorrow.
              </p>
            </div>

            <button
              onClick={onOpenAppointmentModal}
              className="relative z-10 px-8 py-4 rounded-full text-xs font-extrabold text-[#3A2B0A] shadow-[0_10px_25px_rgba(200,149,46,0.4)] hover:shadow-[0_15px_35px_rgba(200,149,46,0.6)] hover:-translate-y-0.5 active:translate-y-0 shrink-0 transition-all duration-300 cursor-pointer"
              style={{ background: "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)" }}
            >
              Together With Apollo
            </button>
          </div>
        </div>

        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-2xl shadow-md border border-[#1D82A6]/30 flex items-center justify-center">
                <img
                  src="images/apollologo.png"
                  alt="Apollo Hospitals Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div>
                <span className="font-serif-apollo text-xl font-extrabold text-white block leading-none">
                  Apollo
                </span>
                <span className="text-[10px] text-[#F6D98A] uppercase tracking-widest font-extrabold">
                  HOSPITALS • TOUCHING LIVES
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-100/90 leading-relaxed font-normal">
              Apollo Hospitals is Asia's foremost integrated healthcare services provider, delivering advanced clinical care, robotic surgery, and emergency services.
            </p>

            <div className="pt-2 flex items-center gap-2.5">
              {[
                { icon: Globe, label: "Website" },
                { icon: Share2, label: "Share" },
                { icon: MessageCircle, label: "Community" },
                { icon: Video, label: "Media" },
              ].map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <a
                    key={idx}
                    href="#"
                    className="w-8 h-8 rounded-full bg-white/10 text-slate-100 border border-white/15 hover:bg-[#F6D98A] hover:text-[#0B3446] hover:border-[#F6D98A] shadow-sm flex items-center justify-center transition-all duration-300"
                    aria-label={item.label}
                  >
                    <IconComp className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif-apollo text-xs font-extrabold text-[#F6D98A] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8952E]" />
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-100/90 font-medium">
              {[
                { label: "About Apollo Hospitals", href: "#why-choose-apollo" },
                { label: "Our Specialities", href: "#specialities" },
                { label: "Centres of Excellence", href: "#centres-of-excellence" },
                { label: "Find a Doctor", href: "#doctors" },
                { label: "Health Library & Articles", href: "#health-articles" },
                { label: "International Patients Desk", href: "#" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="hover:text-[#F6D98A] hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200">
                    <ChevronRight className="w-3 h-3 text-[#C8952E]" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Patient Help */}
          <div className="space-y-3">
            <h4 className="font-serif-apollo text-xs font-extrabold text-[#F6D98A] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8952E]" />
              Patient Help & Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-100/90 font-medium">
              <li>
                <button onClick={onOpenAppointmentModal} className="hover:text-[#F6D98A] hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200 text-left cursor-pointer">
                  <ChevronRight className="w-3 h-3 text-[#C8952E]" />
                  Book Doctor Appointment
                </button>
              </li>
              <li>
                <a href="#specialities" className="hover:text-[#F6D98A] hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200">
                  <ChevronRight className="w-3 h-3 text-[#C8952E]" />
                  Health Check Packages
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#F6D98A] hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200">
                  <ChevronRight className="w-3 h-3 text-[#C8952E]" />
                  Speciality Clinics & Diagnostics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#F6D98A] hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200">
                  <ChevronRight className="w-3 h-3 text-[#C8952E]" />
                  Patient & Visitor Guidelines
                </a>
              </li>
              <li className="pt-2">
                <a href="tel:1066" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-500/15 text-red-300 border border-red-500/30 font-bold hover:bg-red-600 hover:text-white transition-all duration-300 shadow-sm">
                  <PhoneCall className="w-3.5 h-3.5" />
                  Emergency 24/7 Response: 1066
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div className="space-y-4">
            <h4 className="font-serif-apollo text-xs font-extrabold text-[#F6D98A] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8952E]" />
              Connect With Us
            </h4>
            <p className="text-xs text-slate-100/90 leading-relaxed font-normal">
              Subscribe for free weekly health tips, expert medical advice, and checkup offers.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="flex items-center bg-white/10 rounded-full p-1 border border-white/20 focus-within:border-[#F6D98A] focus-within:ring-2 focus-within:ring-[#F6D98A]/20 transition-all backdrop-blur-sm">
              <input
                type="email"
                placeholder="Your email address..."
                className="w-full px-3 py-1.5 text-xs text-white placeholder-slate-200 bg-transparent focus:outline-none"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-full text-[#3A2B0A] flex items-center justify-center shrink-0 hover:scale-105 transition-transform shadow-md cursor-pointer"
                style={{ background: "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)" }}
                aria-label="Subscribe"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="pt-2 text-[11px] text-[#FEF3C7] font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#F6D98A]" />
              <span>JCI & NABH Accredited Healthcare</span>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-200 gap-4 font-medium">
          <div>
            © {new Date().getFullYear()} Apollo Hospitals Enterprise Limited. All Rights Reserved.
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
}