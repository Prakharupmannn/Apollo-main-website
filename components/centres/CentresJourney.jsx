
"use client";

import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useRef, useState } from "react";
import { centresOfExcellence } from "@/data/centresOfExcellence";

const TOTAL = centresOfExcellence.length;

const clamp = (value, min, max) =>
  Math.min(Math.max(value, min), max);

export default function CentresJourney() {
  return (
    <>
      <CentresJourneyDesktop />
      <CentresJourneyMobile />
    </>
  );
}


function CentresJourneyDesktop() {
  const sectionRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(2);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = clamp(Math.floor(latest * TOTAL), 0, TOTAL - 1);
    setActiveIndex(index);
  });

  const activeCentre = centresOfExcellence[activeIndex];

  const goToCentre = (index) => {
    const section = sectionRef.current;
    if (!section) return;

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const sectionScrollableHeight = section.offsetHeight - window.innerHeight;
    const progress = index / (TOTAL - 1);
    const target = sectionTop + sectionScrollableHeight * progress;

    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative hidden h-[700vh] bg-[#EDF6FB] lg:block"
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-[#1D82A6]/[0.08] blur-3xl" />
          <div className="absolute right-[-180px] bottom-[-150px] h-[500px] w-[500px] rounded-full bg-[#C8952E]/[0.06] blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.18]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(14,82,107,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(14,82,107,.08) 1px, transparent 1px)",
              backgroundSize: "70px 70px",
            }}
          />
        </div>

        <div className="relative mx-auto flex h-full max-w-[1360px] flex-col px-6 py-6 lg:px-8 xl:px-12">

          {/* HEADER */}
          <div className="grid shrink-0 grid-cols-1 gap-4 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
            <div>
              <div className="mb-3 flex items-center gap-3">
                <span className="h-px w-9 bg-[#C8952E]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#0E526B]">
                  Our Expertise
                </span>
              </div>

              <p className="max-w-xl font-serif text-[clamp(20px,2.2vw,28px)] italic leading-[1.15] text-[#06202B]">
                Advanced care. Specialist expertise.
                A healthier tomorrow.
              </p>
            </div>

            <div className="max-w-xl border-l border-[#1D82A6]/20 pl-5 lg:mb-1">
              <p className="text-[13px] leading-6 text-slate-500 lg:text-sm">
                At Apollo Hospitals, Jabalpur, our Centres
                of Excellence bring together specialist
                expertise, advanced technology and a
                patient-first approach across complex
                and critical care.
              </p>
            </div>
          </div>

          {/* MAIN EXPERIENCE */}
          <div className="relative mt-5 min-h-0 flex-1">
            <div className="grid h-full grid-cols-1 items-center gap-6 lg:grid-cols-[40%_60%]">

              {/* 180° ROTATING RING */}
             {/* 180° ROTATING RING */}
<div className="relative hidden h-full min-h-[390px] lg:block">
  <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] origin-center -translate-x-[58%] -translate-y-1/2 scale-[0.78]">

    {/* Outer glow */}
    <div className="absolute inset-[-40px] rounded-full border border-[#1D82A6]/10" />

    {/* Decorative orbit */}
    <motion.div
      className="absolute inset-0"
      animate={{ rotate: -activeIndex * 30 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg viewBox="0 0 500 500" className="absolute inset-0 h-full w-full overflow-visible">
        <path d="M250 35 A215 215 0 0 1 250 465" fill="none" stroke="#c8e0e8" strokeWidth="1.5" />
        <path
          d="M250 35 A215 215 0 0 1 250 465"
          fill="none"
          stroke="#C8952E"
          strokeWidth="3"
          strokeDasharray="115 1000"
          strokeLinecap="round"
          className="opacity-80"
        />
        <circle cx="250" cy="250" r="145" fill="none" stroke="#d5e6ec" strokeWidth="1" strokeDasharray="2 7" />
      </svg>

      {centresOfExcellence.map((centre, index) => {
        const angle = -90 + index * 30;
        const radians = (angle * Math.PI) / 180;
        const radius = 215;
        const x = (250 + Math.cos(radians) * radius).toFixed(2);
        const y = (250 + Math.sin(radians) * radius).toFixed(2);
        const isActive = index === activeIndex;

        return (
          <motion.button
            key={centre.slug}
            type="button"
            onClick={() => goToCentre(index)}
            className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}px`, top: `${y}px` }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
          >
            <motion.div
              animate={{ rotate: activeIndex * 30 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3"
            >
              <div className={`text-right transition-all duration-500 ${isActive ? "opacity-100" : "opacity-65"}`}>
                <div className={`text-[11px] font-medium ${isActive ? "text-[#C8952E]" : "text-slate-400"}`}>
                  {centre.id}
                </div>
                <div className={`mt-0.5 max-w-[90px] text-[11px] font-semibold leading-tight ${isActive ? "text-[#06202B]" : "text-slate-500"}`}>
                  {centre.title}
                </div>
              </div>

              <div
                className={`relative flex h-[62px] w-[62px] shrink-0 items-center justify-center rounded-full border transition-all duration-500 ${
                  isActive
                    ? "border-[#C8952E] bg-gradient-to-br from-[#F6D98A] to-[#C8952E] shadow-[0_0_0_7px_rgba(200,149,46,.12),0_15px_35px_rgba(200,149,46,.28)]"
                    : "border-[#1D82A6]/20 bg-white/90 shadow-[0_8px_25px_rgba(6,32,43,.08)]"
                }`}
              >
                {isActive && (
                  <motion.span layoutId="active-ring" className="absolute inset-[-7px] rounded-full border border-[#C8952E]/30" />
                )}
                <CentreIcon slug={centre.slug} active={isActive} />
              </div>
            </motion.div>
          </motion.button>
        );
      })}
    </motion.div>

    {/* Center message */}
    <div className="absolute left-1/2 top-1/2 z-10 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2">
      <div className="absolute inset-[-25px] rounded-full bg-[#1D82A6]/[0.12] blur-2xl" />
      <motion.div
        className="absolute inset-[-3px] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, #1D82A6 15%, transparent 35%, transparent 65%, #1D82A6 85%, transparent 100%)",
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-[3px] rounded-full bg-[#f6fbfd]" />
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white/75 text-center shadow-[0_20px_70px_rgba(6,32,43,.10)] backdrop-blur-sm">
        <div>
          <div className="mb-3 flex items-center justify-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1D82A6]/60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1D82A6]" />
            </span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#0E526B]/70">
              Complete Care
            </span>
          </div>
          <div className="font-serif text-[20px] italic leading-tight text-[#06202B]">
            For a Healthier
            <br />
            Tomorrow
          </div>
          <div className="mx-auto mt-4 h-px w-7 bg-[#C8952E]" />
        </div>
      </div>
    </div>
  </div>

  {/* Scroll indicator */}
  <div className="absolute bottom-4 left-0 flex items-center gap-2.5 text-[#0E526B]/70">
    <div className="flex h-9 w-6 items-start justify-center rounded-full border border-[#1D82A6]/30 p-1.5">
      <motion.div
        animate={{ y: [0, 9, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="h-2 w-1 rounded-full bg-[#C8952E]"
      />
    </div>
    <span className="text-[9px] uppercase tracking-[0.2em]">Scroll to explore</span>
  </div>
</div>

              {/* CONTENT PANEL */}
             {/* CONTENT PANEL */}
<div className="relative flex h-full items-center">
  <AnimatePresence mode="wait">
    <motion.div
      key={activeCentre.slug}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group/card relative min-h-[420px] w-full overflow-hidden rounded-[28px] border border-[#1D82A6]/10 shadow-[0_25px_70px_rgba(6,32,43,.14)]"
    >
      {/* Full-bleed image — sits behind everything */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={activeCentre.image}
          alt={activeCentre.title}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          className="object-cover transition-transform duration-[1600ms] ease-out group-hover/card:scale-110"
          priority={activeIndex === 0}
        />
      </motion.div>

      {/* The key blend — solid/opaque on the left where text sits, fully clear on the right where the image shows */}
      <div className="absolute inset-0 bg-gradient-to-r from-white from-[8%] via-white/92 via-[38%] to-transparent to-[68%]" />

      {/* Faint bottom gradient for the CTA row's readability over the image tail */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#06202B]/15 to-transparent" />

      {/* Corner brackets — echoes the site's premium framing */}
      <span className="pointer-events-none absolute left-6 top-6 z-10 h-5 w-5 border-l border-t border-[#C8952E]/30" />
      <span className="pointer-events-none absolute bottom-6 right-6 z-10 h-5 w-5 border-b border-r border-white/50" />

      {/* Text content — sits in the solid/opaque zone */}
      <div className="relative z-10 flex h-full flex-col justify-center p-6 sm:p-7 lg:p-9">
        <div className="max-w-[52%] sm:max-w-[56%]">

          <div className="mb-4 flex items-center gap-3">
            <span className="font-serif text-2xl italic text-[#C8952E]">{activeCentre.id}</span>
            <span className="text-[13px] text-slate-400">/ 07</span>
            <span className="h-px w-8 bg-[#1D82A6]/20" />
          </div>

          <div className="mb-2 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#0E526B]">
            <span className="h-1 w-1 rounded-full bg-[#C8952E]" />
            {activeCentre.eyebrow}
          </div>

          <h3 className="font-serif text-[clamp(28px,3.2vw,46px)] leading-[0.95] tracking-[-0.03em] text-[#06202B]">
            {activeCentre.title}
          </h3>

          <h4 className="mt-4 font-serif text-lg italic leading-tight text-[#1D82A6]">
            {activeCentre.subtitle}
          </h4>

          <p className="mt-3 text-[13px] leading-6 text-slate-500">
            {activeCentre.description}
          </p>

          {/* Capabilities */}
          <div className="mt-5 flex flex-wrap gap-2">
            {activeCentre.capabilities.map((capability) => (
              <span
                key={capability}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#1D82A6]/15 bg-[#EDF6FB]/70 px-3 py-1.5 text-[10px] font-semibold text-[#0B3446] transition-colors duration-300 hover:border-[#C8952E]/40 hover:bg-white"
              >
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#C8952E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {capability}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-6 flex flex-wrap items-center gap-3.5">
            <Link
              href={`/centres-of-excellence/${activeCentre.slug}`}
              className="group inline-flex items-center gap-2.5 rounded-full px-5 py-3 text-[11px] font-extrabold text-[#3A2B0A] shadow-[0_10px_25px_rgba(200,149,46,.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_15px_35px_rgba(200,149,46,.38)]"
              style={{ background: "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)" }}
            >
              Explore {activeCentre.title}
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>

            <div className="flex items-center gap-2.5 text-[11px] text-slate-500">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1D82A6]/20 bg-white/90 transition-colors duration-300 hover:border-[#C8952E]/40">
                <span className="ml-0.5 text-[#0E526B]">▶</span>
              </span>
              Watch overview
            </div>
          </div>
        </div>
      </div>

      {/* Location badge — floats on the clear image side */}
      <div className="absolute bottom-6 right-6 z-10 rounded-xl border border-white/50 bg-white/85 px-3.5 py-2.5 shadow-lg backdrop-blur-md transition-transform duration-500 group-hover/card:-translate-y-1">
        <div className="text-[8px] font-semibold uppercase tracking-[0.2em] text-[#0E526B]/70">Apollo Hospitals</div>
        <div className="mt-1 text-[11px] font-semibold text-[#06202B]">Jabalpur</div>
      </div>
    </motion.div>
  </AnimatePresence>
</div>
              
            </div>
          </div>

          {/* BOTTOM PROGRESS */}
          <div className="hidden shrink-0 items-center gap-7 pt-3 lg:flex">
            <div className="w-[130px] text-[8px] uppercase tracking-[0.2em] text-[#0E526B]/70">
              <span className="text-[#C8952E]">{String(activeIndex + 1).padStart(2, "0")}</span> / 07 Centres
            </div>

            <div className="flex flex-1 items-center">
              {centresOfExcellence.map((centre, index) => {
                const active = index === activeIndex;
                return (
                  <button key={centre.slug} type="button" onClick={() => goToCentre(index)} className="group flex flex-1 items-center">
                    <span className={`h-[2px] flex-1 transition-all duration-500 ${index <= activeIndex ? "bg-[#C8952E]" : "bg-[#1D82A6]/15"}`} />
                    <span
                      className={`mx-2 flex h-5 min-w-5 items-center justify-center rounded-full border text-[8px] transition-all duration-300 ${
                        active ? "border-[#C8952E] bg-[#C8952E] text-white shadow-[0_0_0_3px_rgba(200,149,46,.12)]" : "border-[#1D82A6]/20 bg-white text-slate-400"
                      }`}
                    >
                      {centre.id}
                    </span>
                    <span className={`hidden text-[8px] font-semibold uppercase tracking-wider xl:block ${active ? "text-[#0E526B]" : "text-slate-400"}`}>
                      {centre.shortName}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="w-[130px] text-right text-[8px] uppercase tracking-[0.2em] text-[#0E526B]/70">
              People
              <br />
              Technology
              <br />
              Better Outcomes
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================== */
/* MOBILE / TABLET — normal-flow swipe carousel (below lg) */
/* ================================================== */

function CentresJourneyMobile() {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[index];
    if (!card) return;
    track.scrollTo({ left: card.offsetLeft - 20, behavior: "smooth" });
    setActiveIndex(index);
  };

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const scrollLeft = track.scrollLeft;
    let closest = 0;
    let closestDist = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const dist = Math.abs(child.offsetLeft - 20 - scrollLeft);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  };

  return (
    <section className="relative overflow-hidden bg-[#EDF6FB] px-5 py-16 lg:hidden">

      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#1D82A6]/[0.08] blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#C8952E]/[0.06] blur-3xl" />

      <div className="relative mb-8">
        <div className="mb-3 flex items-center gap-3">
          <span className="h-px w-8 bg-[#C8952E]" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#0E526B]">
            Our Expertise
          </span>
        </div>

        <p className="max-w-sm font-serif text-2xl italic leading-tight text-[#06202B]">
          Advanced care. Specialist expertise.
          A healthier tomorrow.
        </p>
      </div>

      {/* Swipeable cards */}
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {centresOfExcellence.map((centre) => (
          <div
            key={centre.slug}
            className="w-[86%] shrink-0 snap-center overflow-hidden rounded-[26px] border border-[#1D82A6]/15 bg-white shadow-[0_20px_50px_rgba(6,32,43,.10)] sm:w-[70%]"
          >
            <div className="relative h-52 w-full">
              <Image
                src={centre.image}
                alt={centre.title}
                fill
                sizes="90vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06202B]/70 via-[#06202B]/10 to-transparent" />

              <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-white/90">
                <CentreIcon slug={centre.slug} active={false} />
              </div>

              <span className="absolute bottom-4 left-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F6D98A]">
                {centre.eyebrow}
              </span>
            </div>

            <div className="p-6">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-[#C8952E]">
                {centre.id} <span className="text-slate-400">/ 07</span>
              </div>

              <h3 className="font-serif text-2xl leading-tight text-[#06202B]">{centre.title}</h3>

              <h4 className="mt-2 font-serif text-base italic text-[#1D82A6]">{centre.subtitle}</h4>

              <p className="mt-3 text-sm leading-6 text-slate-500">{centre.description}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {centre.capabilities.slice(0, 3).map((capability) => (
                  <span
                    key={capability}
                    className="rounded-full border border-[#1D82A6]/15 bg-[#EDF6FB]/60 px-3 py-1.5 text-[10px] font-semibold text-[#0B3446]"
                  >
                    {capability}
                  </span>
                ))}
              </div>

              <Link
                href={`/centres-of-excellence/${centre.slug}`}
                className="mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-xs font-extrabold text-[#3A2B0A] shadow-[0_10px_25px_rgba(200,149,46,.28)]"
                style={{ background: "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)" }}
              >
                Explore {centre.title}
                <span>→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="mt-6 flex items-center justify-center gap-2">
        {centresOfExcellence.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to centre ${index + 1}`}
            className={`h-[7px] rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-[22px] bg-[#C8952E]" : "w-[7px] bg-[#1D82A6]/25"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------ */
/* Centre icons */
/* ------------------------------------------------ */

export function CentreIcon({ slug, active }) {
  const stroke = active ? "#3A2B0A" : "#0E526B";
  const common = {
    width: 25,
    height: 25,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke,
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  if (slug === "cardiac") {
    return (
      <svg {...common}>
        <path d="M20.8 8.6c0 5.4-8.8 10.2-8.8 10.2S3.2 14 3.2 8.6A4.6 4.6 0 0 1 12 6.4a4.6 4.6 0 0 1 8.8 2.2Z" />
        <path d="M5.5 10.2h3l1.2-2.5 2.1 5 1.4-2.5h3.3" />
      </svg>
    );
  }

  if (slug === "neuro") {
    return (
      <svg {...common}>
        <path d="M9.5 4.5a3 3 0 0 0-5 2.2A3.4 3.4 0 0 0 5.8 13a3.1 3.1 0 0 0 3.7 4.6" />
        <path d="M14.5 4.5a3 3 0 0 1 5 2.2 3.4 3.4 0 0 1-1.3 6.3 3.1 3.1 0 0 1-3.7 4.6" />
        <path d="M12 4v16M8 8.5h4M12 12h4M8 15.5h4" />
      </svg>
    );
  }

  if (slug === "nephro") {
    return (
      <svg {...common}>
        <path d="M9.5 4.5c-3-1.2-6 1.1-6 5.1 0 4.7 2.8 7.4 5.5 7.4 1.9 0 3-1.4 3-3.2V8.5" />
        <path d="M14.5 4.5c3-1.2 6 1.1 6 5.1 0 4.7-2.8 7.4-5.5 7.4-1.9 0-3-1.4-3-3.2V8.5" />
      </svg>
    );
  }

  if (slug === "onco") {
    return (
      <svg {...common}>
        <path d="M9 4.5c-2.5 1.2-3.8 3.8-3.8 6.5 0 3.2 2.2 5.8 5.2 7.3" />
        <path d="M15 4.5c2.5 1.2 3.8 3.8 3.8 6.5 0 3.2-2.2 5.8-5.2 7.3" />
        <path d="M9 4.5 12 9l3-4.5M12 9v8" />
      </svg>
    );
  }

  if (slug === "ortho-joint-spine") {
    return (
      <svg {...common}>
        <path d="M9 3v5l2 2-2 2v5l3 3 3-3v-5l-2-2 2-2V3" />
        <path d="M9 7h6M9 17h6" />
      </svg>
    );
  }

  if (slug === "critical-care") {
    return (
      <svg {...common}>
        <path d="M6 5h12v14H6z" />
        <path d="M9 5V3h6v2M4 9h16M9 13h6M12 10v6" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M4 4h6v7H4zM14 4h6v7h-6zM4 13h6v7H4zM14 13h6v7h-6z" />
    </svg>
  );
}