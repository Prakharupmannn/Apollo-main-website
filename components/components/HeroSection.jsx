"use client";

import { useState, useEffect, useRef, memo } from "react";
import {
  motion,
  AnimatePresence,
  animate,
  useInView,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Search,
  ChevronRight,
  ArrowRight,
  ShieldCheck,
  HeartPulse,
  Award,
  Star,
  PhoneCall,
  Plus,
} from "lucide-react";

import Link from "next/link";
import Image from "next/image";

/* ───────────── Data ───────────── */
const SLIDES = [
  {
    src: "/images/operation1.jpg",
    label: "Surgery",
    tag: "Surgical Excellence",
    title: "Precision in every procedure",
    text: "Robotic & minimally invasive surgery with world-class surgeons.",
  },
  {
    src: "/images/image.png",
    label: "Cardiology",
    tag: "Heart Care",
    title: "Because every heartbeat counts",
    text: "Advanced cardiac diagnostics, intervention and recovery.",
  },
  {
    src: "/images/hero-part/hero3.jpg",
    label: "Family Care",
    tag: "Compassion First",
    title: "Healing hope for every family",
    text: "Trusted care across every stage of life — under one roof.",
  },
];

const SPECIALITIES = [
  "Cardiology",
  "Neurosciences",
  "Oncology",
  "Orthopaedics",
  "Gastroenterology",
  "Nephrology",
  "Transplant",
  "Emergency & Trauma",
  "Paediatrics",
];

const INTERVAL = 6000;
const SOFT = [0.22, 1, 0.36, 1];

/* ───────────── Animation helpers ───────────── */
const wordContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
};
const wordItem = {
  hidden: { y: "110%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.8, ease: SOFT } },
};
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: SOFT },
});
const capContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.55 } },
};
const capWord = {
  hidden: { y: 18, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: SOFT } },
};

/* ───────────── Count-up number ───────────── */
const CountUp = memo(function CountUp({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 2.2,
      ease: "easeOut",
      onUpdate: (l) => setV(Math.round(l)),
    });
    return () => c.stop();
  }, [inView, to]);
  return (
    <span ref={ref}>
      {v.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
});

/* ───────────── Isolated Live Pulse Chip (prevents whole Hero re-renders) ───────────── */
const LivePulseChip = memo(function LivePulseChip({ chipX2, chipY }) {
  const [bpm, setBpm] = useState(74);

  useEffect(() => {
    const id = setInterval(
      () => setBpm(70 + Math.round(Math.random() * 8)),
      1300,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      style={{ x: chipX2, y: chipY }}
      className="hidden sm:flex absolute -right-6 top-20 z-30 items-center gap-3 bg-[#0B3446] text-white rounded-2xl px-4 py-3 shadow-[0_16px_36px_rgba(15,52,72,0.3)]"
    >
      <svg width="46" height="22" viewBox="0 0 46 22" fill="none">
        <motion.path
          d="M0 11 H12 L16 3 L21 19 L26 8 L29 11 H46"
          stroke="#F6D98A"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </svg>
      <div className="leading-tight">
        <div className="text-[10px] text-white/60 font-medium uppercase tracking-wider">
          Live pulse
        </div>
        <div className="text-sm font-extrabold tabular-nums">
          {bpm}{" "}
          <span className="text-[10px] font-semibold text-[#F6D98A]">
            BPM
          </span>
        </div>
      </div>
    </motion.div>
  );
});

export default function HeroSection({ onSearchSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory] = useState("all");
  const [active, setActive] = useState(0);

  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { margin: "200px" });

  /* ── timer driven by one motion value (pauses when offscreen or on hover) ── */
  const progress = useMotionValue(0);
  const ctrl = useRef(null);
  useEffect(() => {
    if (!isSectionInView) {
      ctrl.current?.pause();
      return;
    }
    progress.set(0);
    ctrl.current = animate(progress, 1, {
      duration: INTERVAL / 1000,
      ease: "linear",
      onComplete: () => setActive((i) => (i + 1) % SLIDES.length),
    });
    return () => ctrl.current?.stop();
  }, [active, progress, isSectionInView]);

  /* ── mouse: parallax + tilt + spotlight (optimized for zero layout thrashing) ── */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useMotionValue(-600);
  const py = useMotionValue(-600);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  const chipX = useTransform(sx, [-1, 1], [-14, 14]);
  const chipY = useTransform(sy, [-1, 1], [-10, 10]);
  const chipX2 = useTransform(sx, [-1, 1], [16, -16]);
  const chipY2 = useTransform(sy, [-1, 1], [12, -12]);
  const rotY = useTransform(sx, [-1, 1], [-7, 7]);
  const rotX = useTransform(sy, [-1, 1], [6, -6]);
  const gx = useTransform(sx, [-1, 1], [15, 85]);
  const gy = useTransform(sy, [-1, 1], [10, 90]);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.30), transparent 55%)`;
  const spot = useMotionTemplate`radial-gradient(520px circle at ${px}px ${py}px, rgba(232,193,115,0.22), transparent 65%)`;

  const rectRef = useRef(null);
  const isHoverSupportedRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      isHoverSupportedRef.current = window.matchMedia("(hover: hover)").matches;
    }
    const handleScrollOrResize = () => {
      rectRef.current = null;
    };
    window.addEventListener("resize", handleScrollOrResize, { passive: true });
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener("resize", handleScrollOrResize);
      window.removeEventListener("scroll", handleScrollOrResize);
    };
  }, []);

  const handleMouseEnter = (e) => {
    if (!isHoverSupportedRef.current) return;
    rectRef.current = e.currentTarget.getBoundingClientRect();
  };

  const handleMouseMove = (e) => {
    if (!isHoverSupportedRef.current) return;
    if (!rectRef.current) {
      rectRef.current = e.currentTarget.getBoundingClientRect();
    }
    const r = rectRef.current;
    if (!r.width || !r.height) return;
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
    px.set(e.clientX - r.left);
    py.set(e.clientY - r.top);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearchSubmit) onSearchSubmit(searchQuery, selectedCategory);
  };

  const slide = SLIDES[active];

  return (
    <section
      ref={sectionRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      className="relative pt-36 pb-0 lg:pt-44 overflow-hidden bg-[#EDF6FB]"
    >
      {/* ───── Animated background ───── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden bg-[#EDF6FB]">
        <div className="hero-mesh" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-orb hero-orb-4" />

        {/* cursor spotlight */}
        <motion.div
          className="absolute inset-0 hidden lg:block"
          style={{ background: spot }}
        />

        <svg
          className="hero-ring hero-ring-1"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle
            cx="200"
            cy="200"
            r="180"
            stroke="#1D82A6"
            strokeOpacity="0.16"
            strokeWidth="1.5"
            strokeDasharray="4 10"
          />
        </svg>
        <svg
          className="hero-ring hero-ring-2"
          viewBox="0 0 300 300"
          fill="none"
        >
          <circle
            cx="150"
            cy="150"
            r="130"
            stroke="#C8952E"
            strokeOpacity="0.18"
            strokeWidth="1.5"
            strokeDasharray="2 8"
          />
        </svg>

        {[
          ["18%", "12%", "0s"],
          ["30%", "78%", "1.2s"],
          ["62%", "6%", "2.4s"],
          ["72%", "88%", "0.6s"],
          ["10%", "55%", "1.8s"],
          ["85%", "40%", "3s"],
        ].map(([top, left, delay], i) => (
          <span
            key={i}
            className="hero-sparkle"
            style={{ top, left, animationDelay: delay }}
          />
        ))}

        {[
          {
            left: "10%",
            d: "0s",
            t: "15s",
            I: Plus,
            c: "w-4 h-4 text-[#0E526B]/25",
          },
          {
            left: "26%",
            d: "4s",
            t: "19s",
            I: HeartPulse,
            c: "w-5 h-5 text-[#C8952E]/30",
          },
          {
            left: "64%",
            d: "7s",
            t: "17s",
            I: Plus,
            c: "w-3.5 h-3.5 text-[#1D82A6]/25",
          },
          {
            left: "84%",
            d: "2s",
            t: "21s",
            I: Plus,
            c: "w-4 h-4 text-[#0E526B]/20",
          },
          {
            left: "48%",
            d: "10s",
            t: "18s",
            I: HeartPulse,
            c: "w-4 h-4 text-[#C8952E]/25",
          },
        ].map(({ left, d, t, I, c }, i) => (
          <span
            key={i}
            className="hero-particle"
            style={{ left, animationDelay: d, animationDuration: t }}
          >
            <I className={c} />
          </span>
        ))}

        {/* self-drawing gold ECG */}
        <svg
          className="absolute inset-x-0 top-[9%] h-32 w-full opacity-[0.3]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="none"
        >
          <motion.path
            d="M0 60 L420 60 L445 20 L470 100 L495 60 L520 60 L700 60 L720 36 L740 84 L760 60 L1200 60"
            stroke="#C8952E"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: [0, 1, 1], opacity: [0, 1, 0] }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.7, 1],
            }}
          />
        </svg>

        <svg
          className="absolute -bottom-1 left-0 w-full hero-wave"
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C240,140 480,20 720,60 C960,100 1200,40 1440,90 L1440,160 L0,160 Z"
            fill="url(#waveGradient)"
          />
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1D82A6" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#C8952E" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#0E526B" stopOpacity="0.08" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* ═════════════ LEFT ═════════════ */}
          <div className="lg:col-span-6 space-y-7 text-center lg:text-left">
            <motion.div
              {...fadeUp(0)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#0E526B]/15 shadow-[0_2px_10px_rgba(15,52,72,0.06)]"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8952E] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8952E]" />
              </span>
              <span className="text-[12px] font-semibold text-[#0E526B] tracking-wide">
                Apollo JBP Hospitals — Precision &amp; Compassion
              </span>
            </motion.div>

            <div className="space-y-4">
              <motion.span
                {...fadeUp(0.1)}
                className="block font-serif italic text-xl sm:text-2xl text-[#C8952E] font-medium"
              >
                Touching Lives, Healing Hope
              </motion.span>

              <motion.h1
                variants={wordContainer}
                initial="hidden"
                animate="show"
                className="text-[2.6rem] sm:text-5xl xl:text-[3.6rem] font-extrabold text-[#0B3446] tracking-tight leading-[1.2]"
              >
                {["Expert", "Care", "for", "a"].map((w) => (
                  <span
                    key={w}
                    className="inline-block overflow-hidden align-bottom pb-1 mr-3"
                  >
                    <motion.span variants={wordItem} className="inline-block">
                      {w}
                    </motion.span>
                  </span>
                ))}
                <br className="hidden sm:block" />
                <span className="inline-block overflow-hidden align-bottom pb-2 mr-3">
                  <motion.span
                    variants={wordItem}
                    className="inline-block bg-clip-text text-transparent hero-gold-shine"
                  >
                    Healthier
                  </motion.span>
                </span>
                <span className="relative inline-block">
                  <span className="inline-block overflow-hidden align-bottom pb-2">
                    <motion.span
                      variants={wordItem}
                      className="inline-block bg-clip-text text-transparent hero-gold-shine"
                    >
                      Tomorrow
                    </motion.span>
                  </span>
                  {/* hand-drawn gold underline */}
                  <svg
                    className="absolute left-0 -bottom-1 w-full h-3"
                    viewBox="0 0 200 12"
                    preserveAspectRatio="none"
                    fill="none"
                  >
                    <motion.path
                      d="M2 8 Q 50 1 100 6 T 198 4"
                      stroke="#C8952E"
                      strokeWidth="3"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.1, delay: 1.5, ease: SOFT }}
                    />
                  </svg>
                </span>
              </motion.h1>
            </div>

            <motion.p
              {...fadeUp(0.7)}
              className="text-[15px] sm:text-base text-slate-600 leading-[1.8] max-w-xl mx-auto lg:mx-0"
            >
              Advanced healthcare, trusted by millions, for every stage of life.
              Combining over 40 years of clinical experience with advanced
              surgical technology and expert specialists — because every life
              matters.
            </motion.p>

            <motion.div
              {...fadeUp(0.85)}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-5 pt-1"
            >
              <Link
                href="/patientcare/appointment"
                className="group relative overflow-hidden flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold text-[#3A2B0A] shadow-[0_6px_20px_rgba(197,146,46,0.4)] hover:shadow-[0_10px_28px_rgba(197,146,46,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
                style={{
                  background:
                    "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
                }}
              >
                <span className="hero-btn-shimmer" />
                <span className="relative">Book an Appointment</span>
                <ChevronRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/doctors"
                className="group relative flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold border border-[#1D82A6] text-[#0E526B] hover:-translate-y-0.5 transition-all duration-300"
              >
                <span
                  className="absolute inset-0 -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, #0E526B 0%, #1D82A6 100%)",
                  }}
                />
                <ShieldCheck className="w-4 h-4 text-[#C8952E] group-hover:text-white transition-colors duration-300" />
                <span className="group-hover:text-white transition-colors duration-300">
                  Find a Doctor
                </span>
                <ArrowRight className="w-4 h-4 text-[#C8952E] group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            </motion.div>

            <motion.div
              {...fadeUp(1)}
              className="pt-2 max-w-xl mx-auto lg:mx-0"
            >
              <form
                onSubmit={handleSearch}
                className="flex items-center bg-white p-2 rounded-full shadow-[0_8px_28px_rgba(15,52,72,0.10)] border border-slate-200/80 focus-within:border-[#C8952E]/60 focus-within:shadow-[0_10px_34px_rgba(200,149,46,0.22)] transition-all"
              >
                <div className="pl-3.5 text-[#0E526B]/60">
                  <Search className="w-[18px] h-[18px]" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search doctors, specialities (e.g. Cardiology, Dr. Sangita)..."
                  aria-label="Search doctors or specialities"
                  className="w-full min-w-0 px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 bg-transparent focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 sm:px-6 py-2.5 rounded-full text-white text-xs font-bold shrink-0 hover:brightness-110 transition-all"
                  style={{
                    background:
                      "linear-gradient(180deg, #14688A 0%, #0E526B 100%)",
                  }}
                >
                  Search
                </button>
              </form>
            </motion.div>

            <motion.div
              {...fadeUp(1.15)}
              className="pt-5 mt-2 grid grid-cols-3 gap-5 border-t border-[#0E526B]/10 max-w-lg mx-auto lg:mx-0 text-left"
            >
              {[
                {
                  I: ShieldCheck,
                  t: "JCI Accredited",
                  s: "A Global Gold Standard in Healthcare",
                },
                { I: HeartPulse, t: "24/7 Care", s: "Emergency & trauma" },
                {
                  I: Award,
                  t: (
                    <>
                      <CountUp to={13000} suffix="+" /> Doctors
                    </>
                  ),
                  s: "Leading Medical Specialists",
                },
              ].map(({ I, t, s }, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-white/70 backdrop-blur-sm flex items-center justify-center shrink-0 shadow-sm">
                    <I className="w-[18px] h-[18px] text-[#0E526B]" />
                  </div>
                  <div>
                    <div className="text-[12.5px] font-bold text-[#0B3446] leading-tight">
                      {t}
                    </div>
                    <div className="text-[10.5px] text-slate-500">{s}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ═════════════ RIGHT: ARCH STAGE ═════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: SOFT }}
            className="lg:col-span-6 flex items-center gap-6"
          >
            <div
              className="relative flex-1 min-w-0 max-w-md mx-auto lg:max-w-none"
              onMouseEnter={() => ctrl.current?.pause()}
              onMouseLeave={() => ctrl.current?.play()}
            >
              {/* aura */}
              <div
                className="absolute -inset-8 rounded-[3rem] blur-3xl opacity-40 hero-aura"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(200,149,46,0.40), rgba(29,130,166,0.34))",
                }}
              />

              {/* rotating seal */}
              <div className="hidden sm:block absolute -left-8 -top-8 z-30 w-28 h-28 rounded-full bg-white/90 backdrop-blur shadow-[0_14px_34px_rgba(15,52,72,0.2)]">
                <svg
                  viewBox="0 0 120 120"
                  className="hero-spin absolute inset-0 w-full h-full"
                >
                  <defs>
                    <path
                      id="sealCircle"
                      d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
                    />
                  </defs>
                  <text fontSize="9.5" fontWeight="700" fill="#0B3446">
                    <textPath
                      href="#sealCircle"
                      textLength="272"
                      lengthAdjust="spacing"
                    >
                      APOLLO JBP • EVERY LIFE MATTERS •
                    </textPath>
                  </text>
                </svg>
                <div
                  className="absolute inset-[26%] rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(180deg,#F6D98A,#C8952E)",
                  }}
                >
                  <motion.span
                    animate={{ scale: [1, 1.22, 1] }}
                    transition={{ duration: 1.1, repeat: Infinity }}
                  >
                    <HeartPulse className="w-5 h-5 text-white" />
                  </motion.span>
                </div>
              </div>

              {/* 3D tilt group */}
              <motion.div
                style={{
                  rotateX: rotX,
                  rotateY: rotY,
                  transformPerspective: 1200,
                }}
                className="relative"
              >
                {/* arch outline = the timer */}
                <svg
                  className="absolute z-20 pointer-events-none"
                  style={{
                    left: "-4%",
                    top: "-3%",
                    width: "108%",
                    height: "106%",
                  }}
                  viewBox="-12 -12 324 424"
                  fill="none"
                >
                  <path
                    d="M150 400 H36 A36 36 0 0 1 0 364 V150 A150 150 0 0 1 300 150 V364 A36 36 0 0 1 264 400 Z"
                    stroke="#C8952E"
                    strokeOpacity="0.25"
                    strokeWidth="1.5"
                    strokeDasharray="3 6"
                  />
                  <motion.path
                    d="M150 400 H36 A36 36 0 0 1 0 364 V150 A150 150 0 0 1 300 150 V364 A36 36 0 0 1 264 400 Z"
                    stroke="#C8952E"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{ pathLength: progress }}
                  />
                </svg>

                {/* the arch */}
                <div
                  className="relative aspect-[3/4] w-full overflow-hidden border-[6px] border-white bg-[#0B3446] shadow-[0_40px_80px_-20px_rgba(15,52,72,0.45)]"
                  style={{ borderRadius: "9999px 9999px 36px 36px" }}
                >
                  {/* photos with reveal wipe */}
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={slide.src}
                      className="absolute inset-0"
                      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                      exit={{
                        scale: 1.12,
                        transition: { duration: 1.3, ease: "easeInOut" },
                      }}
                      transition={{ duration: 1.25, ease: [0.76, 0, 0.24, 1] }}
                    >
                      <motion.div
                        className="absolute inset-0"
                        initial={{ scale: 1.25 }}
                        animate={{ scale: 1.02 }}
                        transition={{
                          duration: INTERVAL / 1000 + 1.5,
                          ease: "linear",
                        }}
                      >
                        <Image
                          src={slide.src}
                          alt={slide.title}
                          fill
                          priority
                          sizes="(max-width: 1024px) 90vw, 40vw"
                          className="object-cover"
                        />
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B3446]/90 via-[#0B3446]/10 to-[#0B3446]/10" />
                  <motion.div
                    className="absolute inset-0 pointer-events-none mix-blend-soft-light"
                    style={{ background: glare }}
                  />

                  {/* counter pill */}
                  <div className="absolute top-9 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/30 text-white text-[11px] font-bold tracking-widest">
                    <span className="text-[#F6D98A] tabular-nums">
                      0{active + 1}
                    </span>
                    <span className="w-5 h-px bg-white/50" />
                    <span className="uppercase">{slide.label}</span>
                  </div>

                  {/* caption */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slide.title}
                      className="absolute left-0 right-0 bottom-9 px-7 sm:px-9 z-10"
                      initial="hidden"
                      animate="show"
                      exit={{
                        opacity: 0,
                        y: -12,
                        transition: { duration: 0.3 },
                      }}
                      variants={capContainer}
                    >
                      <motion.span
                        variants={capWord}
                        className="inline-block px-3 py-1 mb-3 rounded-full bg-[#C8952E]/95 text-[#3A2B0A] text-[10.5px] font-bold tracking-wider uppercase"
                      >
                        {slide.tag}
                      </motion.span>
                      <h3 className="text-white text-2xl sm:text-[1.7rem] font-extrabold leading-tight drop-shadow">
                        {slide.title.split(" ").map((w, i) => (
                          <motion.span
                            key={i}
                            variants={capWord}
                            className="inline-block mr-[0.28em]"
                          >
                            {w}
                          </motion.span>
                        ))}
                      </h3>
                      <motion.p
                        variants={capWord}
                        className="text-white/80 text-[13px] mt-2 max-w-xs"
                      >
                        {slide.text}
                      </motion.p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* floating rating card */}
              <motion.div
                style={{ x: chipX2, y: chipY2 }}
                className="absolute -bottom-8 left-3 sm:left-0 lg:-left-10 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-[0_16px_40px_rgba(15,52,72,0.22)] border border-slate-100 flex items-center gap-3"
              >
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background:
                      "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
                  }}
                >
                  <Star className="w-3 h-3 text-white fill-white" />
                </div>
                <div>
                  <div className="text-[14px] font-extrabold text-[#0B3446] leading-tight">
                    4.9 / 5.0 Rating
                  </div>
                  <div className="text-[11px] text-slate-500">
                    150,000+ verified reviews
                  </div>
                </div>
                <Link
                  href="/patientcare/appointment"
                  className="px-3.5 py-2 rounded-full text-xs font-bold text-white shrink-0 hover:brightness-110 transition-all"
                  style={{
                    background:
                      "linear-gradient(180deg, #14688A 0%, #0E526B 100%)",
                  }}
                >
                  Book Now
                </Link>
              </motion.div>

              {/* live BPM chip */}
              {/* <motion.div
                style={{ x: chipX, y: chipY }}
                className="hidden sm:flex absolute -left-10 top-40 z-30 items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-[0_16px_36px_rgba(15,52,72,0.18)] border border-slate-100"
              >
                <div className="w-10 h-10 rounded-full bg-[#0E526B]/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-[#0E526B]" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-[#0B3446] leading-tight">
                    99.4%
                  </div>
                  <div className="text-[10.5px] text-slate-500 leading-tight">
                    Patient satisfaction
                  </div>
                </div>
              </motion.div> */}

              <LivePulseChip chipX2={chipX2} chipY={chipY} />

              {/* emergency chip */}
              <motion.div
                style={{ x: chipX, y: chipY2 }}
                className="hidden sm:flex absolute -right-6 -bottom-6 z-30 items-center gap-2 bg-white text-[#0B3446] rounded-full pl-2 pr-4 py-2 shadow-[0_16px_36px_rgba(15,52,72,0.22)] border border-slate-100"
              >
                <span className="relative w-7 h-7 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                  <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-50" />
                  <PhoneCall className="relative w-3.5 h-3.5 text-white" />
                </span>
                <div className="leading-tight">
                  <div className="text-[10px] text-slate-500 font-medium">
                    24/7 Emergency
                  </div>
                  <div className="text-xs font-bold">1800-123-6666</div>
                </div>
              </motion.div>

              {/* mobile dots */}
              <div className="flex lg:hidden justify-center gap-2 mt-16">
                {SLIDES.map((s, i) => (
                  <button
                    key={s.src}
                    aria-label={`Show ${s.label}`}
                    onClick={() => setActive(i)}
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      i === active
                        ? "w-9 bg-[#C8952E]"
                        : "w-2.5 bg-[#0E526B]/25"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* ── thumbnail rail (desktop) ── */}
            <div className="hidden lg:flex flex-col gap-4 w-36 shrink-0">
              {SLIDES.map((s, i) => {
                const on = i === active;
                return (
                  <motion.button
                    key={s.src}
                    type="button"
                    aria-label={`Show ${s.label}`}
                    onClick={() => setActive(i)}
                    animate={{ scale: on ? 1.06 : 0.96, x: on ? -10 : 0 }}
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.5, ease: SOFT }}
                    className={`relative h-24 rounded-2xl overflow-hidden text-left border-2 shadow-[0_14px_30px_-10px_rgba(15,52,72,0.4)] ${
                      on ? "border-[#C8952E]" : "border-white"
                    }`}
                  >
                    <Image
                      src={s.src}
                      alt=""
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0 transition-opacity duration-500"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(14,82,107,0.35), rgba(11,52,70,0.88))",
                        opacity: on ? 0.55 : 1,
                      }}
                    />
                    <div className="absolute inset-0 p-3 flex flex-col justify-between">
                      <span className="text-[#F6D98A] text-[11px] font-bold tabular-nums">
                        0{i + 1}
                      </span>
                      <span className="text-white text-[11px] font-bold tracking-widest uppercase">
                        {s.label}
                      </span>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 h-[3px] bg-white/20">
                      <motion.div
                        className="h-full origin-left"
                        style={{
                          scaleX: on ? progress : 0,
                          background: "linear-gradient(90deg,#F6D98A,#C8952E)",
                        }}
                      />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ═════════════ SPECIALITIES MARQUEE ═════════════ */}
      <div className="relative z-10 mt-24 lg:mt-28 border-y border-[#0E526B]/10 bg-white/60 backdrop-blur-md overflow-hidden">
        <div className="hero-marquee py-4">
          {[...SPECIALITIES, ...SPECIALITIES].map((s, i) => (
            <span
              key={i}
              className="flex items-center gap-8 pr-8 text-[13px] font-bold tracking-[0.18em] uppercase text-[#0E526B]/80 whitespace-nowrap"
            >
              {s}
              <Plus className="w-3.5 h-3.5 text-[#C8952E]" />
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hero-mesh {
          position: absolute;
          inset: -20%;
          background: conic-gradient(
            from 0deg at 50% 50%,
            rgba(191, 227, 242, 0.5),
            rgba(243, 223, 168, 0.35),
            rgba(205, 234, 247, 0.5),
            rgba(191, 227, 242, 0.5)
          );
          filter: blur(90px);
          animation: meshRotate 30s linear infinite;
        }
        @keyframes meshRotate {
          to {
            transform: rotate(360deg);
          }
        }

        .hero-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(60px);
        }
        .hero-orb-1 {
          width: 320px;
          height: 320px;
          top: -100px;
          left: -100px;
          background: radial-gradient(circle, #bfe3f2, transparent 70%);
          opacity: 0.65;
          animation: orbFloat1 14s ease-in-out infinite;
        }
        .hero-orb-2 {
          width: 280px;
          height: 280px;
          top: 15%;
          right: -110px;
          background: radial-gradient(circle, #f3dfa8, transparent 70%);
          opacity: 0.55;
          animation: orbFloat2 18s ease-in-out infinite;
        }
        .hero-orb-3 {
          width: 260px;
          height: 260px;
          bottom: -100px;
          left: 25%;
          background: radial-gradient(circle, #a9dcef, transparent 70%);
          opacity: 0.5;
          animation: orbFloat3 20s ease-in-out infinite;
        }
        .hero-orb-4 {
          width: 200px;
          height: 200px;
          bottom: 10%;
          right: 10%;
          background: radial-gradient(circle, #e8c173, transparent 70%);
          opacity: 0.4;
          animation: orbFloat1 16s ease-in-out infinite reverse;
        }
        @keyframes orbFloat1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(50px, 40px) scale(1.1);
          }
        }
        @keyframes orbFloat2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-40px, 50px) scale(1.08);
          }
        }
        @keyframes orbFloat3 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(35px, -45px) scale(1.06);
          }
        }

        .hero-ring {
          position: absolute;
          width: 400px;
          height: 400px;
        }
        .hero-ring-1 {
          top: -60px;
          right: -60px;
          animation: ringSpin 60s linear infinite;
        }
        .hero-ring-2 {
          bottom: -40px;
          left: -40px;
          width: 300px;
          height: 300px;
          animation: ringSpin 45s linear infinite reverse;
        }
        @keyframes ringSpin {
          to {
            transform: rotate(360deg);
          }
        }

        .hero-spin {
          animation: ringSpin 22s linear infinite;
        }

        .hero-btn-shimmer {
          position: absolute;
          top: 0;
          left: -60%;
          width: 50%;
          height: 100%;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255, 255, 255, 0.55) 50%,
            transparent 100%
          );
          transform: skewX(-20deg);
          animation: shimmerSlide 3.5s ease-in-out infinite;
        }
        @keyframes shimmerSlide {
          0% {
            left: -60%;
          }
          45%,
          100% {
            left: 130%;
          }
        }

        :global(.hero-gold-shine) {
          background-image: linear-gradient(
            90deg,
            #c8952e 0%,
            #f6d98a 40%,
            #c8952e 80%
          );
          background-size: 200% 100%;
          animation: goldShine 4s ease-in-out infinite;
        }
        @keyframes goldShine {
          0%,
          100% {
            background-position: 0% 0;
          }
          50% {
            background-position: 100% 0;
          }
        }

        .hero-sparkle {
          position: absolute;
          width: 5px;
          height: 5px;
          border-radius: 9999px;
          background: #c8952e;
          box-shadow: 0 0 8px 2px rgba(200, 149, 46, 0.5);
          animation: sparkleTwinkle 3.5s ease-in-out infinite;
        }
        @keyframes sparkleTwinkle {
          0%,
          100% {
            opacity: 0;
            transform: scale(0.6);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        .hero-particle {
          position: absolute;
          bottom: -40px;
          animation-name: floatUp;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes floatUp {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translate(18px, -260px);
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translate(-10px, -520px);
            opacity: 0;
          }
        }

        .hero-wave {
          animation: waveShift 10s ease-in-out infinite;
        }
        @keyframes waveShift {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }

        .hero-aura {
          animation: auraPulse 6s ease-in-out infinite;
        }
        @keyframes auraPulse {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.03);
          }
        }

        .hero-marquee {
          display: flex;
          width: max-content;
          animation: marquee 45s linear infinite;
        }
        @keyframes marquee {
          to {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 768px) {
          .hero-mesh {
            filter: blur(40px);
            animation: none !important;
          }
          .hero-orb {
            filter: blur(25px);
            animation: none !important;
          }
          .hero-orb-3,
          .hero-orb-4 {
            display: none !important;
          }
          .hero-ring-1,
          .hero-ring-2 {
            animation: none !important;
          }
          .hero-wave {
            animation: none !important;
          }
          .hero-aura {
            filter: blur(20px);
            animation: none !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-mesh,
          .hero-orb,
          .hero-ring,
          .hero-sparkle,
          .hero-particle,
          .hero-wave,
          .hero-aura,
          .hero-btn-shimmer,
          .hero-gold-shine,
          .hero-spin,
          .hero-marquee {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
