"use client";

import {
  Stethoscope,
  PhoneCall,
  Mail,
  MapPin,
  Send,
  ShieldCheck,
  Globe,
  Share2,
  MessageCircle,
  Video,
  ChevronRight,
  HeartPulse,
  Sparkles,
} from "lucide-react";

export default function Footer({ onOpenAppointmentModal }) {
  return (
    <footer
      id="footer"
      className="bg-gradient-to-b from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] text-white pt-20 pb-10 border-t border-[#1D82A6]/40 relative overflow-hidden group/footer select-none"
    >
      {/* Dynamic Keyframe Animations */}
      <style jsx>{`
        @keyframes pulseSlow {
          0%,
          100% {
            transform: scale(1) translate(0px, 0px);
            opacity: 0.25;
          }
          50% {
            transform: scale(1.15) translate(20px, -20px);
            opacity: 0.45;
          }
        }
        @keyframes floatGlow {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(30px, -30px) rotate(120deg);
          }
          66% {
            transform: translate(-20px, 20px) rotate(240deg);
          }
        }
        @keyframes shimmerBorder {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes gridMove {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 28px 28px;
          }
        }
        .animate-pulse-slow {
          animation: pulseSlow 8s ease-in-out infinite;
        }
        .animate-float-glow {
          animation: floatGlow 15s linear infinite;
        }
        .animate-shimmer {
          background-size: 200% 200%;
          animation: shimmerBorder 6s ease infinite;
        }
        .animate-grid {
          animation: gridMove 20s linear infinite;
        }
      `}</style>

      {/* Background Layer: Dynamic Ambient Orbs, Grid Mesh & Light FX */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* ───── NEW: Hospital Photo Background (soft, light shade) ───── */}
        <div
          className="absolute inset-0 opacity-[0.28] mix-blend-luminosity scale-105 blur-[1.5px]"
          style={{
            backgroundImage: "url('/images/apollo-hospital-image.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center 30%",
            backgroundRepeat: "no-repeat",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 22%, black 70%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 22%, black 70%, transparent 100%)",
          }}
        />
        {/* Soft colour wash so the photo blends into the footer theme & text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A5F7A]/60 via-[#2A8FAF]/10 to-[#17627D]/70" />

        {/* Animated Gradient Orbs */}
        <div className="absolute -top-32 -left-32 w-[30rem] h-[30rem] bg-[#F6D98A]/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-0 -right-20 w-[35rem] h-[35rem] bg-[#C8952E]/20 rounded-full blur-[140px] animate-float-glow" />
        <div
          className="absolute top-1/2 left-1/3 w-[25rem] h-[25rem] bg-[#1D82A6]/30 rounded-full blur-[100px] animate-pulse-slow"
          style={{ animationDelay: "3s" }}
        />

        {/* Dynamic Animated Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.15] animate-grid"
          style={{
            backgroundImage:
              "radial-gradient(#1D82A6 1.2px, transparent 1.2px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Dynamic Light Beam Sweep */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-full h-80 bg-gradient-to-b from-white/10 to-transparent blur-2xl transform -skew-y-12 opacity-30 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Slogan Banner Section (Glassmorphic Premium Light Card) */}
        <div className="mb-20 p-[2px] rounded-[2.5rem] bg-gradient-to-r from-[#1D82A6] via-[#F6D98A] to-[#C8952E] animate-shimmer shadow-[0_25px_60px_rgba(0,0,0,0.35)] transform transition-transform duration-500 hover:scale-[1.005]">
          <div className="bg-gradient-to-r from-[#EDF6FB] via-[#F4FAFC] to-[#D5EBF7] text-slate-800 rounded-[calc(2.5rem-2px)] p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-8 border border-white/80 backdrop-blur-md">
            {/* Dynamic Watermark Glow Effect */}
            <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-[#C8952E]/10 rounded-full blur-2xl pointer-events-none" />
            <HeartPulse className="absolute -right-6 -bottom-6 w-64 h-64 opacity-[0.08] pointer-events-none text-[#0E526B] transform -rotate-12 transition-transform duration-700 hover:scale-110" />

            <div className="space-y-3 relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0E526B]/10 text-[#0E526B] text-[11px] font-extrabold uppercase tracking-widest border border-[#0E526B]/20 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#C8952E]" />
                Apollo Assurance Slogan
              </span>
              <h3 className="font-serif-apollo text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-[#0B3446] leading-tight">
                Healthier People,{" "}
                <span className="bg-gradient-to-r from-[#0E526B] via-[#17627D] to-[#C8952E] bg-clip-text text-transparent">
                  Brighter Tomorrows
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                For You. For Your Family. For a Healthier Tomorrow.
              </p>
            </div>

            <button
              onClick={onOpenAppointmentModal}
              className="relative z-10 px-9 py-4 rounded-full text-xs font-black text-[#3A2B0A] shadow-[0_12px_30px_rgba(200,149,46,0.45)] hover:shadow-[0_20px_40px_rgba(200,149,46,0.65)] hover:-translate-y-1 active:translate-y-0 shrink-0 transition-all duration-300 cursor-pointer overflow-hidden group/btn"
              style={{
                background: "linear-gradient(135deg, #F6D98A 0%, #C8952E 100%)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2 tracking-wider uppercase">
                Together With Apollo
                <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out" />
            </button>
          </div>
        </div>

        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-white/15">
          {/* Column 1: Brand Info */}
          <div className="space-y-5">
            <div className="flex items-center gap-3.5">
              <div className="bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-xl border border-white/40 flex items-center justify-center transform transition-transform duration-300 hover:scale-105">
                <img
                  src="images/apollologo.png"
                  alt="Apollo Hospitals Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div>
                <span className="font-serif-apollo text-2xl font-black text-white block leading-none tracking-wide">
                  Apollo
                </span>
                <span className="text-[10px] text-[#F6D98A] uppercase tracking-widest font-extrabold block mt-1">
                  HOSPITALS • TOUCHING LIVES
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-100/90 leading-relaxed font-normal">
              <p>Apollo JBP Hospitals, Jabalpur</p>

              <p>
                Address: Global Square, Patan Rd, Karmeta,
                <br />
                Jabalpur, Madhya Pradesh 482002
              </p>

              <p className="hover:text-[#F6D98A] transition-colors">
                Call: 7566 123666
              </p>

              <p className="hover:text-[#F6D98A] transition-colors mt-2">
                Tollfree: 1800-123-6666
              </p>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
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
                    className="w-9 h-9 rounded-xl bg-white/10 text-slate-100 border border-white/20 hover:bg-[#F6D98A] hover:text-[#0B3446] hover:border-[#F6D98A] shadow-md backdrop-blur-sm flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1"
                    aria-label={item.label}
                  >
                    <IconComp className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif-apollo text-xs font-black text-[#F6D98A] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C8952E] shadow-[0_0_8px_#C8952E]" />
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-100/90 font-medium">
              {[
                { label: "About Apollo Hospitals", href: "#why-choose-apollo" },
                { label: "Our Specialities", href: "#specialities" },
                {
                  label: "Centres of Excellence",
                  href: "#centres-of-excellence",
                },
                { label: "Find a Doctor", href: "#doctors" },
                {
                  label: "Health Library & Articles",
                  href: "#health-articles",
                },
                { label: "International Patients Desk", href: "#" },
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="group/link hover:text-[#F6D98A] flex items-center gap-1.5 transition-all duration-200"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#C8952E] transition-transform duration-200 group-hover/link:translate-x-1" />
                    <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">
                      {link.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Patient Help */}
          <div className="space-y-4">
            <h4 className="font-serif-apollo text-xs font-black text-[#F6D98A] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C8952E] shadow-[0_0_8px_#C8952E]" />
              Patient Help & Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-100/90 font-medium">
              <li>
                <button
                  onClick={onOpenAppointmentModal}
                  className="group/btn hover:text-[#F6D98A] flex items-center gap-1.5 transition-all duration-200 text-left cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#C8952E] transition-transform duration-200 group-hover/btn:translate-x-1" />
                  <span className="transition-transform duration-200 group-hover/btn:translate-x-0.5">
                    Book Doctor Appointment
                  </span>
                </button>
              </li>
              <li>
                <a
                  href="#specialities"
                  className="group/link hover:text-[#F6D98A] flex items-center gap-1.5 transition-all duration-200"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#C8952E] transition-transform duration-200 group-hover/link:translate-x-1" />
                  <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">
                    Health Check Packages
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="group/link hover:text-[#F6D98A] flex items-center gap-1.5 transition-all duration-200"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#C8952E] transition-transform duration-200 group-hover/link:translate-x-1" />
                  <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">
                    Speciality Clinics & Diagnostics
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="group/link hover:text-[#F6D98A] flex items-center gap-1.5 transition-all duration-200"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#C8952E] transition-transform duration-200 group-hover/link:translate-x-1" />
                  <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">
                    Patient & Visitor Guidelines
                  </span>
                </a>
              </li>
              <li className="pt-3">
                <a
                  href="tel:1066"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-red-500/20 text-red-200 border border-red-500/40 font-bold hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-red-500/30 transform hover:-translate-y-0.5 backdrop-blur-sm"
                >
                  <PhoneCall className="w-4 h-4 animate-pulse text-red-400 group-hover:text-white" />
                  <span>Emergency 24/7 Response: 1066</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div className="space-y-4">
            <h4 className="font-serif-apollo text-xs font-black text-[#F6D98A] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C8952E] shadow-[0_0_8px_#C8952E]" />
              Connect With Us
            </h4>
            <p className="text-xs text-slate-100/90 leading-relaxed font-normal">
              Subscribe for free weekly health tips, expert medical advice, and
              checkup offers.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex items-center bg-white/10 rounded-full p-1.5 border border-white/25 focus-within:border-[#F6D98A] focus-within:ring-2 focus-within:ring-[#F6D98A]/30 transition-all backdrop-blur-md shadow-inner"
            >
              <input
                type="email"
                placeholder="Your email address..."
                className="w-full px-3 py-1.5 text-xs text-white placeholder-slate-200 bg-transparent focus:outline-none"
              />
              <button
                type="submit"
                className="w-9 h-9 rounded-full text-[#3A2B0A] flex items-center justify-center shrink-0 hover:scale-110 active:scale-95 transition-all shadow-md cursor-pointer group/send"
                style={{
                  background:
                    "linear-gradient(135deg, #F6D98A 0%, #C8952E 100%)",
                }}
                aria-label="Subscribe"
              >
                <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover/send:translate-x-0.5 group-hover/send:-translate-y-0.5" />
              </button>
            </form>

            <div className="pt-2 text-[11px] text-[#FEF3C7] font-extrabold flex items-center gap-2 bg-white/5 p-3 rounded-2xl border border-white/10 backdrop-blur-sm">
              <ShieldCheck className="w-4 h-4 text-[#F6D98A] shrink-0" />
              <span>JCI & NABH Accredited Healthcare</span>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal Links Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-200/90 gap-4 font-medium">
          <div>
            © {new Date().getFullYear()} Apollo Hospitals Enterprise Limited.
            All Rights Reserved.
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <a href="#" className="hover:text-[#F6D98A] transition-colors">
              Privacy Policy
            </a>
            <span className="opacity-40">•</span>
            <a href="#" className="hover:text-[#F6D98A] transition-colors">
              Terms of Service
            </a>
            <span className="opacity-40">•</span>
            <a href="#" className="hover:text-[#F6D98A] transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
