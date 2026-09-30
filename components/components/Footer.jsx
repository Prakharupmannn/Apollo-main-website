"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PhoneCall,
  Mail,
  MapPin,
  Send,
  ShieldCheck,
  Globe,
  Share2,
  ChevronRight,
  HeartPulse,
  Sparkles,
  Calendar,
  CheckCircle2,
  ArrowUp,
  Award,
  Clock,
  Building,
  UserCheck,
  Stethoscope,
} from "lucide-react";

export default function Footer({ onOpenAppointmentModal }) {
  const [subscribedEmail, setSubscribedEmail] = useState("");
  const [subscribedSuccess, setSubscribedSuccess] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (subscribedEmail) {
      setSubscribedSuccess(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      id="footer"
      className="bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] text-white pt-16 pb-10 border-t border-[#F59E0B]/30 relative overflow-hidden select-none"
    >
      {/* Background Decorative Mesh & Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Background Image Overlay */}
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay scale-105"
          style={{
            backgroundImage: "url('/images/apollo-hospital-image.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Ambient Gradient Glow Orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#F59E0B]/15 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-20 w-[30rem] h-[30rem] bg-[#1D82A6]/25 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-[#0E526B]/20 rounded-full blur-3xl" />

        {/* Subtle Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(#F59E0B 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Assurance Banner Card */}
        <div className="mb-16 p-[2px] rounded-3xl bg-gradient-to-r from-[#1D82A6] via-[#F59E0B] to-[#0E526B] shadow-2xl">
          <div className="bg-gradient-to-r from-[#FAF7F2] via-[#FFFFFF] to-[#EBF5F8] text-slate-900 rounded-[calc(1.5rem-2px)] p-6 sm:p-10 relative overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-6 border border-white/90">
            {/* Background Accent Icon */}
            <HeartPulse className="absolute -right-6 -bottom-6 w-64 h-64 opacity-[0.06] pointer-events-none text-[#0E526B] transform -rotate-12" />

            <div className="space-y-2 max-w-2xl relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0E526B]/10 text-[#0E526B] text-[11px] font-bold uppercase tracking-wider border border-[#0E526B]/20">
                <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Apollo Hospitals Jabalpur • Central India Hub</span>
              </div>
              <h3 className="font-serif-apollo text-2xl sm:text-3xl font-bold text-[#0E526B] leading-tight">
                Touching Lives, Healing Hearts,{" "}
                <span className="text-gold-gradient">Creating Hope</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                40+ Years of Medical Leadership • 10,000+ Specialist Doctors •
                NABH & JCI Accredited Excellence
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
              <a
                href="tel:1800-123-6666"
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 transition-all shadow-md"
              >
                <PhoneCall className="w-4 h-4 animate-bounce" />
                <span>Emergency 1800-123-6666</span>
              </a>

              <Link
                href="/contact"
                className="flex items-center gap-2 px-6 py-3 rounded-full text-slate-950 font-bold text-xs bg-gradient-to-b from-[#edcd76] to-[#C8952E] shadow-[0_3px_10px_rgba(197,146,46,0.35)] hover:shadow-[0_5px_16px_rgba(197,146,46,0.5)] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main 5-Column Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/15">
          {/* Column 1: Hospital Brand & Campus Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-2xl shadow-md border border-white/40">
                <img
                  src="/images/apollologo.png"
                  alt="Apollo Hospitals Logo"
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div>
                <span className="font-serif-apollo text-xl font-bold text-white block leading-none">
                  Apollo Hospitals
                </span>
                <span className="text-[10px] text-[#F59E0B] uppercase tracking-widest font-bold block mt-1">
                  JABALPUR • MADHYA PRADESH
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed max-w-sm">
              Apollo Hospitals Jabalpur is a state-of-the-art multi-specialty
              tertiary care center providing advanced cardiac, oncology, robotic
              joint replacement, and neuro-trauma services.
            </p>

            <div className="space-y-2 text-xs text-slate-200 pt-1 font-medium">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
                <span>
                  Global Square, Patan Rd, Karmeta, Jabalpur, MP 482002
                </span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>
                  Emergency:{" "}
                  <a
                    href="tel:1800-123-6666"
                    className="text-rose-300 font-bold hover:underline"
                  >
                    1800-123-6666
                  </a>{" "}
                  | Reception:{" "}
                  <a
                    href="tel:+917614000100"
                    className="hover:text-[#F59E0B] transition-colors"
                  >
                    +91 761 4000100
                  </a>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F59E0B] shrink-0" />
                <span>jabalpur_info@apollohospitals.com</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-2.5">
              {[
                { label: "Website", icon: Globe, href: "/" },
                { label: "Location", icon: MapPin, href: "/contact" },
                {
                  label: "Health Library",
                  icon: Stethoscope,
                  href: "/health-library",
                },
                { label: "Emergency", icon: PhoneCall, href: "/emergency" },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={idx}
                    href={item.href}
                    className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#F59E0B] hover:text-slate-950 text-slate-200 border border-white/20 flex items-center justify-center transition-all duration-300 shadow-sm"
                    aria-label={item.label}
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif-apollo text-xs font-bold text-[#FEF3C7] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-200 font-medium">
              {[
                { label: "Home Page", href: "/" },
                { label: "About Us", href: "/aboutus" },
                { label: "Our Specialities", href: "/ourspecialities" },
                { label: "Find a Doctor", href: "/doctors" },
                { label: "Patient Care", href: "/patientcare" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="hover:text-[#F59E0B] flex items-center gap-1.5 transition-colors group"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#F59E0B] group-hover:translate-x-1 transition-transform" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Patient Services & Pages */}
          <div className="space-y-3">
            <h4 className="font-serif-apollo text-xs font-bold text-[#FEF3C7] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              Key Services & Pages
            </h4>
            <ul className="space-y-2 text-xs text-slate-200 font-medium">
              {[
                { label: "Health Library", href: "/health-library" },
                { label: "Contact & Location Map", href: "/contact" },
                { label: "Emergency Care (24/7)", href: "/emergency" },
                { label: "Book Appointment", href: "/contact" },
                { label: "MP Service Reach", href: "/contact#reach" },
              ].map((link, idx) => (
                <li key={idx}>
                  {link.onClick ? (
                    <button
                      onClick={link.onClick}
                      className="hover:text-[#F59E0B] flex items-center gap-1.5 transition-colors group text-left cursor-pointer"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-[#F59E0B] group-hover:translate-x-1 transition-transform" />
                      <span>{link.label}</span>
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      className="hover:text-[#F59E0B] flex items-center gap-1.5 transition-colors group"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-[#F59E0B] group-hover:translate-x-1 transition-transform" />
                      <span>{link.label}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Accreditation */}
          <div className="space-y-4">
            <h4 className="font-serif-apollo text-xs font-bold text-[#FEF3C7] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              Health Newsletter
            </h4>
            <p className="text-xs text-slate-200 leading-relaxed">
              Get doctor-approved health updates and screening tips sent to your
              inbox.
            </p>

            {subscribedSuccess ? (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-200 text-xs font-semibold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Subscribed successfully!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex items-center bg-white/10 rounded-xl p-1 border border-white/20 focus-within:border-[#F59E0B]">
                  <input
                    type="email"
                    required
                    value={subscribedEmail}
                    onChange={(e) => setSubscribedEmail(e.target.value)}
                    placeholder="Your email address..."
                    className="w-full px-2.5 py-1.5 text-xs text-white placeholder-slate-300 bg-transparent focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-b from-[#edc65d] to-[#C8952E] shadow-[0_3px_10px_rgba(197,146,46,0.35)] hover:shadow-[0_5px_16px_rgba(197,146,46,0.5)] hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 cursor-pointer text-slate-950 font-bold text-xs hover:brightness-110 shrink-0"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            )}

            <div className="pt-2 text-[11px] text-slate-200 flex items-center gap-2 bg-white/5 p-3 rounded-2xl border border-white/10">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="font-bold text-white">
                  NABH & NABL Accredited
                </div>
                <div className="text-[10px] text-slate-300">
                  Highest Standard Patient Care
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-300 gap-4">
          <div className="flex items-center gap-2">
            <span>
              © {new Date().getFullYear()} Apollo Hospitals Jabalpur. All Rights
              Reserved.
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/contact"
              className="hover:text-[#F59E0B] transition-colors"
            >
              Privacy Policy
            </Link>
            <span>•</span>
            <Link
              href="/contact"
              className="hover:text-[#F59E0B] transition-colors"
            >
              Terms of Use
            </Link>
            <span>•</span>
            <Link
              href="/contact"
              className="hover:text-[#F59E0B] transition-colors"
            >
              Sitemap
            </Link>

            <button
              onClick={scrollToTop}
              className="ml-4 p-2 rounded-full bg-white/10 hover:bg-[#F59E0B] hover:text-slate-950 text-white transition-all shadow-md"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
