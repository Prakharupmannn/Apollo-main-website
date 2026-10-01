"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Activity,
  ShieldCheck,
  Bone,
  Droplets,
  Heart,
  Brain,
  Microscope,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  Zap,
  Sparkles,
  Phone,
  Search,
  Stethoscope,
  Baby,
  Syringe,
  Eye,
  Smile,
  Apple,
  Ear,
  Layers,
  Users,
  Clock,
} from "lucide-react";
import specialitiesData from "../../data/ourSpecialities";
import { useRouter } from "next/navigation";

const iconMap = {
  pulse: Activity,
  shield: ShieldCheck,
  bone: Bone,
  kidney: Droplets,
  heart: Heart,
  brain: Brain,
  cancer: Microscope,
  microscope: Microscope,
  stethoscope: Stethoscope,
  baby: Baby,
  syringe: Syringe,
  sparkles: Sparkles,
  ear: Ear,
  eye: Eye,
  smile: Smile,
  apple: Apple,
  activity: Activity,
  stomach: Microscope,
};

const CATEGORIES = [
  "All",
  "Cardiology",
  "Neurosciences",
  "Cancer Care",
  "Orthopedics",
  "Gastro Sciences",
  "Renal Care",
  "Women's Health",
  "Pediatrics",
  "Emergency & ICU",
  "Surgical Services",
  "General Medicine",
  "Internal Medicine",
  "Dermatology",
  "ENT",
  "Eye & Dental Care",
  "Mental Health",
  "Wellness & Rehab",
  "Diagnostics",
];

const gold = {
  background: "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
};
const teal = { background: "linear-gradient(135deg, #1D82A6, #0A5F7A)" };
const photoBg = { background: "linear-gradient(135deg, #EAF6FC, #FFF7E8)" };
const goldRing = {
  background: "linear-gradient(135deg,#F6D98A,#C8952E 35%,#FFF3C4 55%,#1D82A6)",
};

const css = `
@keyframes floaty { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
@keyframes spinSlow { to{transform:rotate(360deg)} }
@keyframes textShine { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
@keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }
@keyframes ringPulse { 0%{box-shadow:0 0 0 0 rgba(200,149,46,.5)} 70%{box-shadow:0 0 0 16px rgba(200,149,46,0)} 100%{box-shadow:0 0 0 0 rgba(200,149,46,0)} }
.sp-float{animation:floaty 7s ease-in-out infinite}
.sp-float-slow{animation:floaty 10s ease-in-out infinite}
.sp-spin{animation:spinSlow 50s linear infinite}
.sp-shine{background:linear-gradient(90deg,#C8952E,#F6D98A,#C8952E,#F6D98A);background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:textShine 4s linear infinite}
.sp-fade{animation:fadeUp .5s cubic-bezier(.2,.7,.2,1) both}
.sp-ring{animation:ringPulse 2.2s infinite}
.sp-range{-webkit-appearance:none;appearance:none;height:6px;border-radius:999px;background:linear-gradient(90deg,#1D82A6,#F6D98A,#C8952E);outline:none}
.sp-range::-webkit-slider-thumb{-webkit-appearance:none;width:22px;height:22px;border-radius:50%;background:#fff;border:4px solid #C8952E;cursor:pointer;box-shadow:0 4px 12px rgba(0,0,0,.2)}
.sp-range::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:#fff;border:4px solid #C8952E;cursor:pointer}
@media (prefers-reduced-motion:reduce){.sp-float,.sp-float-slow,.sp-spin,.sp-shine,.sp-fade,.sp-ring{animation:none!important}}
`;

export default function OurSpecialitiesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [carIndex, setCarIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const listRef = useRef(null);
  const touchX = useRef(null);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return specialitiesData.filter((item) => {
      const okCat =
        selectedCategory === "All" || item.category === selectedCategory;
      const okSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.tagline.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);
      return okCat && okSearch;
    });
  }, [selectedCategory, searchQuery]);

  const total = filtered.length;
  const categoryCount = new Set(specialitiesData.map((s) => s.category)).size;

  const router = useRouter();

  // reset when filter changes
  useEffect(() => {
    setActiveIndex(0);
    setCarIndex(0);
  }, [selectedCategory, searchQuery]);

  // responsive flag (client only, no hydration mismatch)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const set = () => setIsMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const aIdx = Math.min(activeIndex, Math.max(total - 1, 0));
  const cIdx = Math.min(carIndex, Math.max(total - 1, 0));
  const active = filtered[aIdx];
  const ActiveIcon = iconMap[active?.icon] || Activity;

  const wrap = useCallback((i) => (total ? (i + total) % total : 0), [total]);
  const aNext = () => setActiveIndex(wrap(aIdx + 1));
  const aPrev = () => setActiveIndex(wrap(aIdx - 1));
  const cNext = useCallback(() => setCarIndex(wrap(cIdx + 1)), [wrap, cIdx]);
  const cPrev = useCallback(() => setCarIndex(wrap(cIdx - 1)), [wrap, cIdx]);

  // keep active list item centred inside the scroll list (no page jump)
  useEffect(() => {
    const box = listRef.current;
    if (!box || !active) return;
    const el = box.querySelector(`[data-slug="${active.slug}"]`);
    if (!el) return;
    box.scrollTo({
      top: el.offsetTop - box.clientHeight / 2 + el.clientHeight / 2,
      behavior: "smooth",
    });
  }, [active?.slug]); // eslint-disable-line

  // carousel geometry
  const step = isMobile ? 175 : 285;
  const cardW = isMobile ? 250 : 310;

  const distance = (idx) => {
    let d = idx - cIdx;
    const half = total / 2;
    if (d > half) d -= total;
    if (d < -half) d += total;
    return d;
  };

  const onKey = (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      cNext();
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      cPrev();
    }
  };
  const onTouchStart = (e) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) (dx < 0 ? cNext : cPrev)();
    touchX.current = null;
  };

  const arrowBtn =
    "w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-[#3A2B0A] shadow-[0_12px_30px_rgba(200,149,46,0.45)] hover:scale-110 active:scale-95 transition-transform";

  return (
    <main
      className="relative min-h-screen pt-28 pb-24 overflow-hidden text-slate-900"
      style={{
        background:
          "linear-gradient(180deg, #EAF6FC 0%, #F8FBFD 25%, #FFFBF1 62%, #EAF6FC 100%)",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* Soft animated background (no dots) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="sp-float-slow absolute -top-40 -left-32 w-[580px] h-[580px] rounded-full opacity-60"
          style={{
            background: "radial-gradient(circle, #a9dcf0, transparent 70%)",
          }}
        />
        <div
          className="sp-float absolute top-[18%] -right-40 w-[520px] h-[520px] rounded-full opacity-55"
          style={{
            background: "radial-gradient(circle, #f6d98a, transparent 70%)",
          }}
        />
        <div
          className="sp-float-slow absolute top-[58%] -left-40 w-[480px] h-[480px] rounded-full opacity-40"
          style={{
            background: "radial-gradient(circle, #bfe3f2, transparent 70%)",
          }}
        />
        <div
          className="sp-float absolute bottom-0 -right-32 w-[460px] h-[460px] rounded-full opacity-45"
          style={{
            background: "radial-gradient(circle, #f3dfa8, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sp-fade">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-[#1D82A6]/25 text-[#0E526B] text-xs font-bold shadow-md mb-5 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#C8952E]" />
            Apollo JBP Hospitals • Centres of Excellence
          </div>
          <h1 className="font-serif-apollo text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#0B3446] leading-[1.1]">
            Our <span className="sp-shine">Specialities</span>
          </h1>
          <div
            className="h-1.5 w-28 rounded-full mx-auto my-4"
            style={{
              background: "linear-gradient(90deg,#1D82A6,#F6D98A,#C8952E)",
            }}
          />
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {specialitiesData.length}+ specialised departments powered by
            world-class specialists, advanced technology and compassionate
            patient care.
          </p>
        </div>

        {/* Stats strip */}
        <div
          className="max-w-4xl mx-auto mb-10 p-[2px] rounded-[1.75rem] shadow-xl"
          style={{
            background:
              "linear-gradient(90deg, rgba(29,130,166,.5), #F6D98A, rgba(200,149,46,.6))",
          }}
        >
          <div className="bg-white rounded-[calc(1.75rem-2px)] grid grid-cols-3 divide-x divide-slate-100">
            {[
              {
                icon: Layers,
                v: `${specialitiesData.length}+`,
                l: "Departments",
                c: "#1D82A6",
              },
              {
                icon: Users,
                v: `${categoryCount}`,
                l: "Care Categories",
                c: "#C8952E",
              },
              { icon: Clock, v: "24/7", l: "Emergency Care", c: "#059669" },
            ].map((s) => (
              <div
                key={s.l}
                className="group flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 py-4 sm:py-5 px-2"
              >
                <s.icon
                  className="w-6 h-6 group-hover:scale-125 transition-transform"
                  style={{ color: s.c }}
                />
                <div className="text-center sm:text-left">
                  <p className="text-xl sm:text-2xl font-black text-[#0B3446] leading-none">
                    {s.v}
                  </p>
                  <p className="text-[10px] sm:text-xs font-semibold text-slate-500 mt-1">
                    {s.l}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Search + chips */}
        <div className="mb-10 space-y-4">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search specialities (e.g. Cardiology, Neurology, Pediatric)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 shadow-lg text-sm text-[#0B3446] placeholder-slate-400 focus:outline-none focus:border-[#1D82A6] focus:ring-4 focus:ring-[#1D82A6]/10 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 justify-start lg:justify-center lg:flex-wrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "text-[#3A2B0A] shadow-md scale-105"
                    : "bg-white/80 text-slate-600 hover:bg-white hover:text-[#0E526B] border border-slate-200"
                }`}
                style={selectedCategory === cat ? gold : undefined}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ───────── Master – Detail ───────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div
            ref={listRef}
            className="relative lg:col-span-5 space-y-3 max-h-[720px] overflow-y-auto p-1 pr-2 [scrollbar-width:thin]"
          >
            {total === 0 ? (
              <div className="bg-white p-8 rounded-2xl text-center text-slate-500 border border-slate-200 shadow-md">
                No speciality found matching your search.
              </div>
            ) : (
              filtered.map((s, i) => {
                const Icon = iconMap[s.icon] || Activity;
                const on = i === aIdx;
                return (
                  <button
                    key={s.slug}
                    data-slug={s.slug}
                    onClick={() => setActiveIndex(i)}
                    className={`w-full text-left flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                      on
                        ? "bg-white border-[#1D82A6] shadow-[0_15px_35px_rgba(29,130,166,0.22)] scale-[1.02]"
                        : "bg-white/80 border-slate-200 hover:border-[#C8952E]/50 hover:shadow-lg hover:-translate-y-0.5"
                    }`}
                  >
                    <span
                      className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all ${on ? "text-[#F6D98A]" : "bg-[#EDF6FB] text-[#0E526B]"}`}
                      style={
                        on
                          ? {
                              background:
                                "linear-gradient(135deg,#0E526B,#0B3446)",
                            }
                          : undefined
                      }
                    >
                      <Icon className="w-6 h-6" />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block font-black text-[#0B3446] truncate text-sm sm:text-base">
                        {s.name}
                      </span>
                      <span className="block text-xs font-semibold text-[#C8952E] truncate">
                        {s.tagline}
                      </span>
                    </span>
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-[#EDF6FB] border border-[#1D82A6]/15 text-[#0E526B] shrink-0">
                      {s.stat}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 shrink-0 transition-transform ${on ? "text-[#1D82A6] translate-x-1" : "text-slate-400"}`}
                    />
                  </button>
                );
              })
            )}
          </div>

          {active && (
            <div className="lg:col-span-7 lg:sticky lg:top-28">
              <div
                className="p-[2px] rounded-[2rem] shadow-2xl"
                style={goldRing}
              >
                <div className="bg-white rounded-[calc(2rem-2px)] overflow-hidden">
                  <div key={active.slug} className="sp-fade">
                    <div className="relative" style={photoBg}>
                      <img
                        src={active.image}
                        alt={active.name}
                        className="w-full h-56 sm:h-72 object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
                      <span
                        className="absolute top-4 right-4 inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-3.5 py-2 rounded-full text-[#3A2B0A] shadow-lg"
                        style={gold}
                      >
                        <Award className="w-3.5 h-3.5" /> {active.badge}
                      </span>
                      <span className="absolute top-4 left-4 text-[10px] font-black uppercase tracking-wider px-3.5 py-2 rounded-full bg-white/90 text-[#0E526B] shadow-md backdrop-blur-sm">
                        {active.category}
                      </span>
                    </div>

                    <div className="p-6 sm:p-8 -mt-8 relative">
                      <div className="flex items-end justify-between gap-3 mb-4">
                        <div
                          className="sp-ring w-16 h-16 rounded-2xl flex items-center justify-center text-[#F6D98A] shadow-xl border-4 border-white"
                          style={teal}
                        >
                          <ActiveIcon className="w-8 h-8" />
                        </div>

                        {/* Prev / Next arrows */}
                        <div className="flex items-center gap-2 bg-white rounded-full p-1.5 shadow-lg border border-slate-100">
                          <button
                            onClick={aPrev}
                            aria-label="Previous speciality"
                            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#EDF6FB] text-[#0E526B] hover:bg-[#0E526B] hover:text-white active:scale-90 transition-all"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <span className="text-xs font-black text-[#0B3446] min-w-[52px] text-center">
                            {aIdx + 1} / {total}
                          </span>
                          <button
                            onClick={aNext}
                            aria-label="Next speciality"
                            className="w-10 h-10 rounded-full flex items-center justify-center text-[#3A2B0A] hover:scale-110 active:scale-90 transition-transform shadow-md"
                            style={gold}
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <h2 className="font-serif-apollo text-3xl font-black text-[#0B3446]">
                        {active.name}
                      </h2>
                      <p className="text-sm font-bold text-[#C8952E] mb-3">
                        {active.tagline}
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        {active.intro}
                      </p>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="rounded-2xl bg-[#EDF6FB] border border-[#1D82A6]/15 p-4 hover:-translate-y-1 hover:shadow-lg transition-all">
                          <p className="text-3xl font-black text-[#0B3446]">
                            {active.stat}
                          </p>
                          <p className="text-xs font-semibold text-slate-500">
                            {active.statLabel}
                          </p>
                        </div>
                        <div className="rounded-2xl bg-[#FFF7E8] border border-[#C8952E]/25 p-4 flex items-center gap-3 hover:-translate-y-1 hover:shadow-lg transition-all">
                          <ShieldCheck className="w-8 h-8 text-[#1D82A6] shrink-0" />
                          <div>
                            <p className="text-xs font-black text-[#0B3446]">
                              Top-Tier Experts
                            </p>
                            <p className="text-[11px] text-slate-500">
                              Dedicated Care Team
                            </p>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xs font-black text-[#0B3446] mb-3 flex items-center gap-2">
                        <span className="w-1 h-4 rounded-full" style={gold} />{" "}
                        Key Services & Treatments
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                        {active.services.map((sv) => (
                          <div
                            key={sv}
                            className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl bg-[#F8FBFD] border border-slate-200 hover:border-[#C8952E]/60 hover:bg-white hover:shadow-md transition-all"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#1D82A6] shrink-0" />
                            <span className="text-xs font-bold text-[#0B3446]">
                              {sv}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-slate-100">
                        <span className="flex items-center gap-2 text-xs font-bold text-[#0E526B]">
                          <Zap className="w-4 h-4 text-[#C8952E]" /> Priority
                          Appointments Available
                        </span>
                        <div className="flex gap-3 flex-wrap">
                          <Link
                            href={`/ourspecialities/${active.slug}`}
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-black text-[#0E526B] bg-white border border-[#1D82A6]/30 hover:bg-[#0E526B] hover:text-white transition-all"
                          >
                            Explore <ArrowRight className="w-4 h-4" />
                          </Link>
                          <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-xs font-black text-[#3A2B0A] shadow-[0_10px_28px_rgba(200,149,46,0.4)] hover:-translate-y-0.5 transition-all"
                            style={gold}
                          >
                            <Phone className="w-4 h-4" /> Consult Specialist
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ───────── Coverflow carousel ───────── */}
        <div className="mt-24">
          <div className="text-center mb-10">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#C8952E] mb-2">
              Browse All
            </p>
            <h2 className="font-serif-apollo text-3xl sm:text-4xl font-black text-[#0B3446]">
              Explore Every Department
            </h2>
            <div
              className="h-1.5 w-20 rounded-full mx-auto mt-4"
              style={{
                background: "linear-gradient(90deg,#1D82A6,#F6D98A,#C8952E)",
              }}
            />
            <p className="text-xs sm:text-sm text-slate-500 mt-4">
              Use the arrows, swipe, or your keyboard ← → to move between
              departments
            </p>
          </div>

          {total === 0 ? (
            <div className="bg-white p-8 rounded-2xl text-center text-slate-500 border border-slate-200 shadow-md max-w-xl mx-auto">
              No speciality found matching your search.
            </div>
          ) : (
            <div className="relative">
              {/* decorative ring */}
              <div className="sp-spin absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[620px] sm:h-[620px] rounded-full border-2 border-dashed border-[#C8952E]/30 pointer-events-none" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] sm:w-[480px] sm:h-[480px] rounded-full border border-[#1D82A6]/20 pointer-events-none" />

              {/* stage */}
              <div
                tabIndex={0}
                onKeyDown={onKey}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
                className="relative mx-auto max-w-6xl h-[520px] sm:h-[560px] outline-none select-none"
                style={{ perspective: "1400px" }}
              >
                {filtered.map((s, idx) => {
                  const d = distance(idx);
                  const ad = Math.abs(d);
                  if (ad > 3) return null;
                  const Icon = iconMap[s.icon] || Activity;
                  const center = d === 0;
                  const opacity = center
                    ? 1
                    : ad === 1
                      ? 0.9
                      : ad === 2
                        ? 0.55
                        : 0;

                  // Center card -> open page. Side card -> only make it active.
                  const handleCardClick = () => {
                    if (center) router.push(`/ourspecialities/${s.slug}`);
                    else setCarIndex(idx);
                  };

                  return (
                    <div
                      key={s.slug}
                      role="link"
                      tabIndex={center ? 0 : -1}
                      aria-label={center ? `Open ${s.name}` : `Show ${s.name}`}
                      onClick={handleCardClick}
                      onKeyDown={(e) => {
                        if (center && e.key === "Enter") handleCardClick();
                      }}
                      className="group absolute top-4 left-1/2 cursor-pointer outline-none"
                      style={{
                        width: cardW,
                        transform: `translateX(-50%) translateX(${d * step}px) scale(${1 - ad * 0.13}) rotateY(${-d * 16}deg)`,
                        opacity,
                        zIndex: 20 - ad,
                        transition:
                          "transform .6s cubic-bezier(.22,.8,.24,1), opacity .5s ease",
                        willChange: "transform, opacity",
                        pointerEvents: ad > 2 ? "none" : "auto",
                      }}
                    >
                      <div
                        className={`p-[2px] rounded-[1.75rem] transition-shadow duration-300 ${
                          center
                            ? "shadow-[0_35px_80px_rgba(11,52,70,0.35)] group-hover:shadow-[0_40px_90px_rgba(200,149,46,0.5)]"
                            : "shadow-xl"
                        }`}
                        style={goldRing}
                      >
                        <div className="bg-white rounded-[calc(1.75rem-2px)] overflow-hidden">
                          <div
                            className="relative overflow-hidden"
                            style={photoBg}
                          >
                            <img
                              src={s.image}
                              alt={s.name}
                              loading="lazy"
                              className={`w-full h-48 sm:h-56 object-cover transition-transform duration-700 ${center ? "group-hover:scale-105" : ""}`}
                            />
                            <span
                              className="absolute top-3 left-3 w-11 h-11 rounded-xl flex items-center justify-center text-[#F6D98A] shadow-lg border-2 border-white"
                              style={teal}
                            >
                              <Icon className="w-5 h-5" />
                            </span>
                            <span
                              className="absolute top-3 right-3 text-[10px] font-black px-3 py-1.5 rounded-full text-[#3A2B0A] shadow-md"
                              style={gold}
                            >
                              {s.stat}
                            </span>
                          </div>

                          <div className="p-5">
                            <span className="inline-block text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#EDF6FB] text-[#0E526B] mb-2">
                              {s.category}
                            </span>
                            <h3 className="font-serif-apollo text-xl font-black text-[#0B3446] leading-snug line-clamp-1">
                              {s.name}
                            </h3>
                            <p className="text-xs font-bold text-[#C8952E] mb-2 line-clamp-1">
                              {s.tagline}
                            </p>
                            <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
                              {s.intro}
                            </p>

                            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                              <span className="text-[11px] font-semibold text-slate-500 line-clamp-1 pr-2">
                                {s.statLabel}
                              </span>
                              <span
                                className={`shrink-0 inline-flex items-center gap-1.5 text-xs font-black transition-all ${
                                  center
                                    ? "text-[#1D82A6] group-hover:gap-3"
                                    : "text-slate-400"
                                }`}
                              >
                                {center ? "Open" : "Select"}{" "}
                                <ArrowRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* side arrows */}
                <button
                  onClick={cPrev}
                  aria-label="Previous department"
                  className={`${arrowBtn} absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 z-40`}
                  style={gold}
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={cNext}
                  aria-label="Next department"
                  className={`${arrowBtn} absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-40`}
                  style={gold}
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* slider + counter */}
              <div className="relative max-w-2xl mx-auto mt-4 px-4">
                <div className="flex items-center justify-between mb-3">
                  <button
                    onClick={cPrev}
                    className="inline-flex items-center gap-1 text-xs font-black text-[#0E526B] hover:text-[#C8952E] transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" /> Prev
                  </button>
                  <span className="text-sm font-black text-[#0B3446] bg-white px-4 py-1.5 rounded-full shadow-md border border-slate-100">
                    {cIdx + 1} <span className="text-slate-400">/ {total}</span>
                  </span>
                  <button
                    onClick={cNext}
                    className="inline-flex items-center gap-1 text-xs font-black text-[#0E526B] hover:text-[#C8952E] transition-colors"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="range"
                  min={0}
                  max={Math.max(total - 1, 0)}
                  value={cIdx}
                  onChange={(e) => setCarIndex(Number(e.target.value))}
                  aria-label="Jump to department"
                  className="sp-range w-full"
                />
                <p className="text-center text-xs font-bold text-[#C8952E] mt-3">
                  {filtered[cIdx]?.name}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="mt-24 relative rounded-[2rem] overflow-hidden p-8 sm:p-14 text-white text-center shadow-2xl bg-gradient-to-br from-[#1D82A6] via-[#0E526B] to-[#0B3446]">
          <div
            className="sp-float absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, #F6D98A, transparent 70%)",
            }}
          />
          <div
            className="sp-float-slow absolute -bottom-20 -left-16 w-60 h-60 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, #6ec6e6, transparent 70%)",
            }}
          />
          <div className="sp-spin absolute top-6 left-8 w-20 h-20 rounded-full border-2 border-dashed border-[#F6D98A]/40" />
          <h3 className="relative font-serif-apollo text-2xl sm:text-4xl font-black mb-3">
            Not sure which specialist you need?
          </h3>
          <p className="relative text-sm sm:text-base text-slate-100 mb-7 max-w-xl mx-auto">
            Our care coordinators are available 24/7 to guide you to the right
            department.
          </p>
          <Link
            href="/contact"
            className="sp-ring relative inline-flex items-center gap-2 px-9 py-4 rounded-full font-black text-sm text-[#3A2B0A] shadow-xl hover:-translate-y-1 hover:scale-105 transition-all"
            style={gold}
          >
            <Phone className="w-4 h-4" /> Book an Appointment
          </Link>
        </div>
      </div>
    </main>
  );
}
