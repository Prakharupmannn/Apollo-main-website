"use client";

/**
 * Apollo Hospitals Jabalpur: Home Hero Section
 * Fully responsive across all devices (mobile, tablet, desktop, ultra-wide, landscape)
 * Highly optimized rendering:
 * - Persistent GPU-accelerated image layers (zero transition stutter or decoding delay)
 * - LCP prioritization on initial image
 * - Autoplay paused when offscreen or tab hidden (zero background CPU/battery drain)
 * - Touch swipe support for mobile navigation
 * - Memoized animated components with hardware acceleration
 */

import { useCallback, useEffect, useRef, useState, memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CalendarDays,
  UserRound,
  LayoutGrid,
  Play,
  HeartPulse,
  Ambulance,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

const AUTOPLAY_MS = 6500;
const EASE = [0.22, 1, 0.36, 1];

const SLIDES = [
  {
    src: "/images/hero-part/Sunset.webp",
    label: "World-class infrastructure",
    title: "Advanced Care",
    accent: "for a Healthier Tomorrow",
    text: "World-class medical expertise, advanced technology and a human touch at every stage of your health journey.",
    position: "center 55%",
  },
  {
    src: "/images/hero-part/Surgeryhero.webp",
    label: "Advanced technology",
    title: "Advanced care",
    accent: "powered by precision",
    text: "Modern medical technology and coordinated specialist teams, built around every patient.",
    position: "center",
  },
  {
    src: "/images/hero-part/Carehero.webp",
    label: "Compassionate care",
    title: "Care that puts",
    accent: "people first",
    text: "A patient-first approach that brings clinical expertise and human connection together.",
    position: "center",
  },
  {
    src: "/images/hero-part/Lobby.webp",
    label: "A healing environment",
    title: "A better place",
    accent: "to begin healing",
    text: "From your first visit to recovery, care designed around you and your family.",
    position: "center",
  },
];

const QUICK_ACTIONS = [
  {
    label: "Explore",
    title: "Centres of Excellence",
    Icon: LayoutGrid,
    href: "/centres-of-excellence",
  },
  {
    label: "Meet our specialists",
    title: "Our Doctors",
    Icon: UserRound,
    href: "/doctors",
  },
  {
    label: "24×7 care",
    title: "Emergency Services",
    Icon: Ambulance,
    href: "/emergency",
  },
];

/* One headline line that slides up from behind a mask. Memoized with GPU acceleration */
const Line = memo(function Line({ children, delay = 0, reduce, className = "" }) {
  return (
    <span className="block overflow-hidden pb-[0.14em] pr-[0.1em]">
      <motion.span
        className={`block will-change-transform ${className}`}
        initial={reduce ? false : { y: "112%" }}
        animate={{ y: 0 }}
        exit={reduce ? undefined : { y: "-112%" }}
        transition={{ duration: 0.85, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
});

export default function HeroSection({
  headerHeight,
  onOpenAppointmentModal,
  onSearchSubmit,
}) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const slide = SLIDES[active];
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(true);

  // Touch gesture coordinates for mobile swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goTo = useCallback(
    (i) => setActive((i + SLIDES.length) % SLIDES.length),
    []
  );

  // Pause autoplay when hero is scrolled out of view to save CPU/battery
  useEffect(() => {
    if (!sectionRef.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Autoplay: cycles slides when in view and page is visible
  useEffect(() => {
    if (reduce || !isInView) return;

    let timeoutId;

    const tick = () => {
      timeoutId = setTimeout(() => {
        if (typeof document !== "undefined" && document.hidden) return;
        setActive((a) => (a + 1) % SLIDES.length);
      }, AUTOPLAY_MS);
    };

    tick();

    const handleVisibility = () => {
      if (document.hidden) {
        clearTimeout(timeoutId);
      } else {
        clearTimeout(timeoutId);
        tick();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [active, reduce, isInView]);

  // Touch swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 48) {
      if (diff > 0) {
        // Swiped left -> next slide
        goTo(active + 1);
      } else {
        // Swiped right -> prev slide
        goTo(active - 1);
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Apollo Hospitals Jabalpur hero"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={headerHeight ? { "--header-h": `${headerHeight}px` } : undefined}
      className="relative isolate flex min-h-[100svh] sm:min-h-[600px] lg:min-h-[660px] flex-col overflow-x-hidden bg-[#031d31] pt-[72px] sm:pt-[84px] text-white lg:h-[100svh] lg:max-h-[1000px] lg:overflow-hidden lg:pt-[var(--header-h,116px)]"
    >
      {/* Photography: Still, GPU hardware-accelerated cross-fade, persistent DOM cache to eliminate decoding/network lag */}
      <div className="absolute inset-0 -z-30 overflow-hidden pointer-events-none">
        {SLIDES.map((s, i) => {
          const isActive = active === i;
          return (
            <div
              key={s.src}
              aria-hidden={!isActive}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out will-change-[opacity] ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              <Image
                src={s.src}
                alt=""
                fill
                priority={i === 0}
                fetchPriority={i === 0 ? "high" : "auto"}
                loading={i === 0 ? "eager" : "lazy"}
                quality={75}
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: s.position }}
              />
            </div>
          );
        })}
      </div>

      {/* Readability: dark gradient on the text side, deep navy at the bottom for the glass bar */}
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(2,24,41,.92)_0%,rgba(2,28,48,.7)_32%,rgba(2,28,48,.12)_66%,rgba(2,28,48,0)_100%)] pointer-events-none" />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(0deg,rgba(2,22,36,.94)_0%,rgba(2,22,36,.55)_24%,rgba(2,22,36,0)_52%)] pointer-events-none" />

      {/* Copy */}
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 items-center px-4 pt-3 sm:px-8 sm:pt-6 lg:px-[5.7%] lg:pt-4">
        <div className="max-w-[900px] w-full">
          {/* Apollo badge above the slide heading - animated once on mount */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-3.5 sm:mb-6 inline-flex max-w-full items-center gap-2.5 sm:gap-3 rounded-full border border-white/25 bg-white/[0.10] py-1 sm:py-1.5 pl-1.5 pr-4 sm:pr-5 shadow-[0_8px_30px_rgba(0,0,0,.35),inset_0_1px_0_rgba(255,255,255,.25)] backdrop-blur-xl"
          >
            {/* Gold icon chip with pulse */}
            <span className="relative flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f6c453] to-[#e9a92b] shadow-[0_0_16px_rgba(246,196,83,.55)]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#f6c453] opacity-30" />
              <HeartPulse
                className="relative h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#3a2600]"
                strokeWidth={2.5}
              />
            </span>

            {/* Name */}
            <span className="truncate text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.14em] text-white">
              Apollo JBP Hospitals
            </span>

            {/* Divider + tagline (hidden on small screens) */}
            <span className="hidden h-4 w-px bg-white/30 sm:block" />
            <span className="hidden bg-gradient-to-r from-[#7ce6f2] via-[#b4f4f1] to-white bg-clip-text text-[12px] font-medium italic tracking-wide text-transparent sm:block">
              Precision &amp; Compassion
            </span>
          </motion.div>

          {/* Slide Heading & Description */}
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.src + "-copy"}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <h1 className="font-serif text-[clamp(1.85rem,6.2vw,2.5rem)] sm:text-[clamp(2.2rem,min(4.4vw,8.2vh),4.3rem)] font-normal leading-[1.08] sm:leading-[1.04] tracking-[-0.035em]">
                <Line reduce={reduce}>{slide.title}</Line>

                <Line
                  reduce={reduce}
                  delay={0.09}
                  className="bg-gradient-to-r from-[#7ce6f2] via-[#b4f4f1] to-white bg-clip-text italic text-transparent"
                >
                  {slide.accent}
                </Line>
              </h1>

              <motion.p
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.25 }}
                className="mt-3 sm:mt-4 max-w-[500px] text-[13.5px] leading-[1.6] text-white/90 sm:text-[16px] sm:leading-[1.65]"
              >
                {slide.text}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom dock: quick links and appointment button */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 pb-4 pt-4 sm:px-8 sm:pt-6 lg:px-[5.7%] lg:pb-5">
        <nav
          aria-label="Quick links"
          className="grid grid-cols-1 gap-1.5 sm:gap-1 rounded-2xl border border-white/25 bg-white/[0.12] p-1.5 sm:p-2 shadow-[0_20px_60px_rgba(0,0,0,.35)] backdrop-blur-2xl sm:grid-cols-3 lg:grid-cols-[1fr_1fr_1fr_auto]"
        >
          {QUICK_ACTIONS.map(({ label, title, Icon, href }, i) => (
            <Link
              key={href}
              href={href}
              className={`group relative flex min-h-[50px] sm:min-h-[58px] items-center gap-2.5 sm:gap-3 rounded-xl px-3 sm:px-4 py-2 transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-200 ${
                i < 2
                  ? "lg:after:absolute lg:after:right-0 lg:after:top-3 lg:after:h-[calc(100%-1.5rem)] lg:after:w-px lg:after:bg-white/20"
                  : ""
              }`}
            >
              <span className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-cyan-100">
                <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10.5px] sm:text-[11px] font-medium text-cyan-100/75">
                  {label}
                </span>
                <span className="block truncate text-[13px] sm:text-sm font-semibold text-white">
                  {title}
                </span>
              </span>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-white/60 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
            </Link>
          ))}
          <Link
            href="/patientcare/appointment"
            className="group flex min-h-[50px] sm:min-h-[58px] items-center justify-center gap-2.5 sm:gap-3 rounded-xl bg-gradient-to-r from-[#f6c453] to-[#e9a92b] px-5 sm:px-7 text-[13px] sm:text-sm font-semibold text-[#3a2600] shadow-[0_8px_24px_rgba(233,169,43,.35)] transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:col-span-3 lg:col-span-1"
          >
            <CalendarDays className="h-4 w-4" />
            Book appointment
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </nav>
      </div>

      {/* Screen-reader description of the current slide */}
      <p className="sr-only" aria-live="polite">
        {slide.label}
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------
   Optional: the story cards section below the hero.
   Use:  <HeroSection />  <StoryCards />
   ------------------------------------------------------------------ */
const STORIES = [
  { src: "/images/apollohero.png", label: "World-class infrastructure" },
  { src: "/images/operation1.jpg", label: "Advanced technology" },
  { src: "/images/centres/cardiac.jpg", label: "Compassionate patient care" },
  { src: "/images/care.png", label: "A healing environment" },
];

export function StoryCards() {
  return (
    <section
      id="apollo-story-cards"
      className="scroll-mt-24 bg-[#031d31] px-5 py-12 sm:px-8 lg:px-[5.7%]"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-4 lg:grid-cols-4">
        {STORIES.map((s) => (
          <button
            key={s.label}
            type="button"
            className="group relative h-[150px] overflow-hidden rounded-2xl border border-cyan-200/30 text-left sm:h-[190px]"
          >
            <Image
              src={s.src}
              alt={s.label}
              fill
              sizes="(max-width: 1024px) 50vw, 25vw"
              className="object-cover transition duration-700 group-hover:scale-[1.04]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-[#001c2b]/90 via-transparent to-transparent" />
            <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2 text-sm font-semibold">
              {s.label}
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/80">
                <Play className="ml-0.5 h-3 w-3 fill-white" />
              </span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
