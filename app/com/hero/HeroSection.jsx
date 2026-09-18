"use client";

import { useState, useRef } from "react";
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Clock,
  Award,
  Volume2,
  VolumeX,
} from "lucide-react";

const quickLinks = [
  { label: "Book Appointment", href: "#" },
  { label: "Find Hospital", href: "#" },
  { label: "Book Health Checkup", href: "#" },
  { label: "Get Expert Opinion", href: "#" },
];

export default function HeroSection() {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[640px] overflow-hidden bg-navy-950">
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/hero-surgery.mp4"
        poster="/images/hero-fallback.jpg"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay gradients — legibility + brand tint, not decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/45 to-navy-950/90" />
      <div className="absolute inset-0 bg-gradient-to-tr from-sage-500/10 via-transparent to-transparent mix-blend-overlay" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between max-w-7xl mx-auto px-6 lg:px-8 pt-[150px] pb-10">
        {/* Headline block */}
        <div className="max-w-2xl mt-6 md:mt-14">
          <div className="flex items-center gap-2 mb-5">
            <span className="w-8 h-px bg-gold-500" />
            <span className="text-gold-400 text-[13px] tracking-[0.15em] uppercase font-medium">
              Apollo JBP Hospitals
            </span>
          </div>

          <h1 className="font-serif text-white text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.12] font-medium animate-hero-in">
            Precision medicine, delivered with the warmth of family.
          </h1>

          <p className="mt-5 text-offwhite/75 text-[15.5px] leading-relaxed max-w-lg">
            From emergency response to advanced surgery, our specialists pair
            world-class technology with a simple promise — you're never just a
            patient here.
          </p>

          {/* Trust markers */}
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            <div className="flex items-center gap-2 text-offwhite/80 text-[13.5px]">
              <ShieldCheck size={16} className="text-gold-500" />
              JCI & NABH Accredited
            </div>
            <div className="flex items-center gap-2 text-offwhite/80 text-[13.5px]">
              <Clock size={16} className="text-gold-500" />
              24/7 Emergency Response
            </div>
            <div className="flex items-center gap-2 text-offwhite/80 text-[13.5px]">
              <Award size={16} className="text-gold-500" />
              350+ Specialist Consultants
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="w-full max-w-3xl mt-10">
          <div className="flex items-center bg-white/10 backdrop-blur-lg border border-white/15 rounded-full pl-6 pr-2 py-2 shadow-[0_20px_50px_rgba(0,0,0,0.35)]">
            <input
              type="text"
              placeholder="Search for doctors, specialities, and health check packages…"
              className="flex-1 bg-transparent outline-none text-offwhite placeholder:text-offwhite/50 text-[14.5px] py-2"
            />
            <button
              aria-label="Search"
              className="flex items-center justify-center w-11 h-11 rounded-full bg-gold-500 hover:bg-gold-400 transition-colors shrink-0"
            >
              <Search size={18} className="text-navy-950" />
            </button>
          </div>
        </div>

        {/* Quick action pills */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden backdrop-blur-md border border-white/10">
          {quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group flex items-center justify-between gap-3 bg-navy-950/40 hover:bg-navy-950/10 transition-colors px-5 py-4"
            >
              <span className="text-offwhite text-[14px] font-medium">
                {link.label}
              </span>
              <span className="flex items-center justify-center w-8 h-8 rounded-full border border-gold-500/50 text-gold-400 group-hover:bg-gold-500 group-hover:text-navy-950 transition-colors shrink-0">
                <ArrowRight size={14} />
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Sound toggle for the video */}
      <button
        onClick={toggleSound}
        aria-label={muted ? "Unmute video" : "Mute video"}
        className="absolute bottom-6 right-6 z-10 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-offwhite hover:bg-white/20 transition-colors"
      >
        {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </section>
  );
}