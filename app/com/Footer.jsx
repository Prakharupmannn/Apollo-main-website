"use client";

import { Stethoscope, PhoneCall, Mail, MapPin, Send, ShieldCheck, Globe, Share2, MessageCircle, Video } from "lucide-react";

export default function Footer({ onOpenAppointmentModal }) {
  return (
    <footer id="footer" className="bg-[#093749] text-white pt-16 pb-8 border-t-2 border-[#1D82A6]/40 relative overflow-hidden">
      
      {/* Top Slogan Banner Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-16">
        <div className="bg-gradient-to-r from-[#0E526B] via-[#093749] to-[#0E526B] rounded-3xl p-8 sm:p-12 border-2 border-[#1D82A6]/40 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest block">
              Apollo Assurance Slogan
            </span>
            <h3 className="font-serif-apollo text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
              Healthier People, <span className="text-[#F59E0B]">Brighter Tomorrows</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-200">
              For You. For Your Family. For a Healthier Tomorrow.
            </p>
          </div>

          <button
            onClick={onOpenAppointmentModal}
            className="px-8 py-4 rounded-full text-xs font-bold bg-gold-gradient text-slate-950 hover:brightness-110 shadow-xl shrink-0 transition-transform hover:scale-105 cursor-pointer"
          >
            Together With Apollo
          </button>
        </div>
      </div>

      {/* Main 4-Column Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
        
        {/* Column 1: Brand Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-xl shadow-md flex items-center justify-center">
              <img
                src="/apollo-logo.webp"
                alt="Apollo Hospitals Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div>
              <span className="font-serif-apollo text-xl font-bold text-white block leading-none">
                Apollo
              </span>
              <span className="text-[10px] text-[#FEF3C7] uppercase tracking-widest font-semibold">
                HOSPITALS • TOUCHING LIVES
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed">
            Apollo Hospitals is Asia's foremost integrated healthcare services provider, delivering advanced clinical care, robotic surgery, and emergency services.
          </p>

          <div className="pt-2 flex items-center gap-3 text-slate-300">
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1D82A6] hover:text-white flex items-center justify-center transition-colors" aria-label="Website">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1D82A6] hover:text-white flex items-center justify-center transition-colors" aria-label="Share">
              <Share2 className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1D82A6] hover:text-white flex items-center justify-center transition-colors" aria-label="Community">
              <MessageCircle className="w-4 h-4" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1D82A6] hover:text-white flex items-center justify-center transition-colors" aria-label="Media">
              <Video className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-3">
          <h4 className="font-serif-apollo text-sm font-bold text-[#F59E0B] uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2 text-xs text-slate-200">
            <li><a href="#why-choose-apollo" className="hover:text-[#F59E0B] transition-colors">About Apollo Hospitals</a></li>
            <li><a href="#specialities" className="hover:text-[#F59E0B] transition-colors">Our Specialities</a></li>
            <li><a href="#centres-of-excellence" className="hover:text-[#F59E0B] transition-colors">Centres of Excellence</a></li>
            <li><a href="#doctors" className="hover:text-[#F59E0B] transition-colors">Find a Doctor</a></li>
            <li><a href="#health-articles" className="hover:text-[#F59E0B] transition-colors">Health Library & Articles</a></li>
            <li><a href="#" className="hover:text-[#F59E0B] transition-colors">International Patients Desk</a></li>
          </ul>
        </div>

        {/* Column 3: Patient Help */}
        <div className="space-y-3">
          <h4 className="font-serif-apollo text-sm font-bold text-[#F59E0B] uppercase tracking-wider">
            Patient Help & Services
          </h4>
          <ul className="space-y-2 text-xs text-slate-200">
            <li><button onClick={onOpenAppointmentModal} className="hover:text-[#F59E0B] transition-colors text-left cursor-pointer">Book Doctor Appointment</button></li>
            <li><a href="#specialities" className="hover:text-[#F59E0B] transition-colors">Health Check Packages</a></li>
            <li><a href="#" className="hover:text-[#F59E0B] transition-colors">Speciality Clinics & Diagnostics</a></li>
            <li><a href="#" className="hover:text-[#F59E0B] transition-colors">Patient & Visitor Guidelines</a></li>
            <li><a href="tel:1066" className="text-red-400 font-bold hover:underline">Emergency 24/7 Response: 1066</a></li>
          </ul>
        </div>

        {/* Column 4: Newsletter Subscription */}
        <div className="space-y-4">
          <h4 className="font-serif-apollo text-sm font-bold text-[#F59E0B] uppercase tracking-wider">
            Connect With Us
          </h4>
          <p className="text-xs text-slate-200">
            Subscribe for free weekly health tips, expert medical advice, and checkup offers.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="flex items-center bg-white/10 rounded-full p-1 border border-[#1D82A6]/40">
            <input
              type="email"
              placeholder="Your email address..."
              className="w-full px-3 py-1.5 text-xs text-white placeholder-slate-400 bg-transparent focus:outline-none"
            />
            <button
              type="submit"
              className="w-8 h-8 rounded-full bg-gold-gradient text-slate-950 flex items-center justify-center shrink-0 hover:scale-105 transition-transform"
              aria-label="Subscribe"
            >
              <Send className="w-3.5 h-3.5 text-slate-950" />
            </button>
          </form>

          <div className="pt-2 text-[11px] text-[#FEF3C7] flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
            <span>JCI & NABH Accredited Healthcare</span>
          </div>
        </div>

      </div>

      {/* Bottom Copyright & Legal Links Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-4">
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

    </footer>
  );
}
