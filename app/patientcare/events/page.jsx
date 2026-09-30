"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  PhoneCall,
  CalendarDays,
  History,
  Stethoscope,
  BadgeCheck,
  X,
} from "lucide-react";
import eventsData from "../../../data/eventsData.js";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30, scale: 0.97 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const goldGradient = {
  background: "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
};

export default function EventsListingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list");

  const filteredEvents = (eventsData || []).filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.excerpt || event.subtitle || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const upcomingEvents = filteredEvents.filter(
    (e) => String(e.status).toLowerCase() === "upcoming"
  );
  const pastEvents = filteredEvents.filter(
    (e) => String(e.status).toLowerCase() === "past"
  );

  const stats = [
    { value: `${eventsData.length}+`, label: "Camps & Events Hosted" },
    { value: `${upcomingEvents.length}`, label: "Upcoming This Month" },
    { value: "40+", label: "Specialist Doctors" },
  ];

  return (
    <main className="relative min-h-screen bg-[#F8FBFD] text-slate-900 pt-32 pb-20 selection:bg-[#1D82A6] selection:text-white overflow-hidden">
      <style jsx global>{`
        .ev-orb {
          position: absolute;
          border-radius: 9999px;
          pointer-events: none;
        }
        .ev-orb-1 {
          width: 400px;
          height: 400px;
          top: -130px;
          left: -110px;
          background: radial-gradient(circle, #bfe3f2, transparent 70%);
          opacity: 0.5;
          animation: evFloat1 16s ease-in-out infinite;
        }
        .ev-orb-2 {
          width: 360px;
          height: 360px;
          top: 15%;
          right: -130px;
          background: radial-gradient(circle, #f3dfa8, transparent 70%);
          opacity: 0.45;
          animation: evFloat2 20s ease-in-out infinite;
        }
        @keyframes evFloat1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(40px, 40px) scale(1.08);
          }
        }
        @keyframes evFloat2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-40px, 30px) scale(1.06);
          }
        }
        @keyframes evFloatCard {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .ev-float-card {
          animation: evFloatCard 4.5s ease-in-out infinite;
        }
        @keyframes evPulseRing {
          0% {
            transform: scale(0.9);
            opacity: 0.7;
          }
          100% {
            transform: scale(1.6);
            opacity: 0;
          }
        }
        .ev-pulse-ring {
          animation: evPulseRing 2s ease-out infinite;
        }
        @keyframes evShimmerSweep {
          0% {
            transform: translateX(-120%) skewX(-12deg);
          }
          100% {
            transform: translateX(220%) skewX(-12deg);
          }
        }
        .ev-shimmer::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            transparent,
            rgba(255, 255, 255, 0.4),
            transparent
          );
          transform: translateX(-120%) skewX(-12deg);
        }
        .ev-shimmer:hover::after {
          animation: evShimmerSweep 1s ease forwards;
        }
        .ev-card-glow {
          position: relative;
        }
        .ev-card-glow::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: inherit;
          background: inherit;
          filter: blur(16px);
          opacity: 0;
          transition: opacity 0.4s ease;
          z-index: -1;
        }
        .ev-card-glow:hover::before {
          opacity: 0.5;
        }
      `}</style>

      {/* ───── background orbs + dotted texture ───── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="ev-orb ev-orb-1" />
        <div className="ev-orb ev-orb-2" />
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: "radial-gradient(#1D82A6 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(ellipse 80% 50% at 50% 20%, black 15%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 50% at 50% 20%, black 15%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* ───── Hero ───── */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* LEFT: content */}
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#1D82A6]/20 text-[#0E526B] text-xs font-bold shadow-sm mb-5"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1D82A6] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1D82A6]" />
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#C8952E]" />
                Health Camps & Hospital Events • Apollo Jabalpur
              </motion.div>

              <p className="font-serif-apollo italic text-lg sm:text-xl text-[#C8952E] font-semibold mb-2">
                Free Camps, Launches & Community Care
              </p>

              <h1 className="font-serif-apollo text-4xl sm:text-5xl lg:text-[3.3rem] font-black tracking-tight leading-[1.08] text-[#0B3446] mb-5">
                Events & Free{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #C8952E 0%, #1D82A6 100%)",
                  }}
                >
                  Health Checkup Camps
                </span>
              </h1>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mb-8">
                From specialist consultation camps to major hospital
                inaugurations — stay updated with everything happening at
                Apollo JBP Hospitals, Jabalpur.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-8">
                <a
                  href="tel:18001236666"
                  className="ev-shimmer relative overflow-hidden px-7 py-3.5 rounded-full text-xs sm:text-sm font-black text-[#3A2B0A] shadow-[0_10px_30px_rgba(200,149,46,0.35)] hover:shadow-xl transition-all cursor-pointer flex items-center gap-2"
                  style={goldGradient}
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Register for a Camp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#upcoming-events"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0E526B] hover:text-[#1D82A6] transition-colors group"
                >
                  <span className="w-9 h-9 rounded-full bg-white border border-[#1D82A6]/20 shadow-sm flex items-center justify-center group-hover:border-[#1D82A6]/50 transition-colors">
                    <CalendarDays className="w-4 h-4 text-[#1D82A6]" />
                  </span>
                  See Upcoming Events
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {stats.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-slate-200 shadow-sm"
                  >
                    <span className="text-sm font-black text-[#0B3446]">
                      {s.value}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-500">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: featured latest event image + floating cards */}
            <div className="lg:col-span-6 pt-4 relative">
              {filteredEvents[0] && (
                <>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="relative rounded-[2rem] overflow-hidden shadow-[0_30px_70px_rgba(10,95,122,0.25)] border-4 border-white"
                  >
                    <img
                      src="/images/events/camp.png"
                      alt="Health Camp"
                      className="w-full h-[340px] sm:h-[420px] lg:h-[460px] object-cover brightness-[1.1]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B3446]/55 via-[#0B3446]/10 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5">
                      <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md text-[#0E526B] shadow-md mb-2">
                        <Stethoscope className="w-3 h-3 text-[#C8952E] animate-bounce" />
                        {filteredEvents[0].category}
                      </span>
                      
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="ev-float-card absolute -top-2 -left-4 sm:-left-8 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#EDF6FB] flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-[#1D82A6]" />
                    </div>
                    <div>
                      <div className="text-sm font-black text-[#0B3446] leading-none">
                        {filteredEvents[0].date}
                      </div>
                      <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                        {filteredEvents[0].time}
                      </div>
                    </div>
                  </motion.div>

                  {/* <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.65 }}
                    className="ev-float-card absolute -bottom-6 left-4 right-4 sm:left-8 sm:right-8 bg-white rounded-2xl shadow-xl border border-slate-100 px-4 py-3.5 flex items-center justify-between gap-3"
                    style={{ animationDelay: "1s" }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={goldGradient}
                      >
                        <BadgeCheck className="w-5 h-5 text-[#3A2B0A]" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-black text-[#0B3446] leading-none truncate">
                          {filteredEvents[0].cost}
                        </div>
                        <div className="text-[10px] text-slate-500 font-semibold mt-0.5 truncate">
                          {filteredEvents[0].doctor?.name}
                        </div>
                      </div>
                    </div>
                    <Link
                      href={`/patientcare/events/${filteredEvents[0].slug}`}
                      className="px-3.5 py-2 rounded-full bg-[#0E526B] text-white text-[11px] font-bold hover:bg-[#0A5F7A] transition-colors shrink-0"
                    >
                      View
                    </Link>
                  </motion.div> */}

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="absolute top-6 right-6 sm:right-10"
                  >
                    <a
                      href="tel:18001236666"
                      className="relative flex items-center gap-2 bg-rose-600 text-white rounded-full pl-3 pr-4 py-2.5 shadow-lg hover:bg-rose-700 transition-colors"
                    >
                      <span className="relative flex h-8 w-8 items-center justify-center shrink-0">
                        <span className="ev-pulse-ring absolute inline-flex h-full w-full rounded-full bg-white/50" />
                        <span className="relative inline-flex items-center justify-center h-8 w-8 rounded-full bg-white/15">
                          <PhoneCall className="w-3.5 h-3.5" />
                        </span>
                      </span>
                      <div className="leading-tight">
                        <div className="text-[9px] font-semibold text-rose-100">
                          24/7 Emergency
                        </div>
                        <div className="text-[11px] font-black">1800-123-6666</div>
                      </div>
                    </a>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </motion.section>

        {/* ───── Search + View Toggle Bar ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12"
        >
          <div className="relative p-[1.5px] rounded-[1.85rem] bg-gradient-to-r from-[#1D82A6]/30 via-[#F6D98A]/50 to-[#C8952E]/40 shadow-md">
            <div className="bg-white rounded-[calc(1.85rem-1.5px)] p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search for events, camps, doctors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 rounded-2xl bg-[#F8FBFD] border border-slate-200 focus:outline-none focus:border-[#1D82A6] focus:ring-2 focus:ring-[#1D82A6]/15 text-sm transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
                    aria-label="Clear search"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 bg-[#F8FBFD] p-1.5 rounded-2xl shrink-0 border border-slate-100">
                {["list", "month", "day"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`px-5 py-2 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                      viewMode === mode
                        ? "text-white shadow-md"
                        : "text-slate-500 hover:text-[#0E526B]"
                    }`}
                    style={viewMode === mode ? { background: "linear-gradient(135deg, #1D82A6, #0A5F7A)" } : undefined}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* ───── Upcoming Events ───── */}
        <motion.section
          id="upcoming-events"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 scroll-mt-32"
        >
          <motion.div variants={fadeUp} className="flex items-end justify-between flex-wrap gap-3 mb-7">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-600 mb-1.5">
                <CalendarDays className="w-3.5 h-3.5" /> Happening Soon
              </span>
              <h2 className="font-serif-apollo text-xl sm:text-2xl font-black text-[#0B3446]">
                Upcoming Events
              </h2>
            </div>
            <span className="text-[11px] font-bold text-slate-400">
              {upcomingEvents.length} event{upcomingEvents.length !== 1 ? "s" : ""}
            </span>
          </motion.div>

          {upcomingEvents.length === 0 ? (
            <motion.div
              variants={fadeUp}
              className="bg-white p-12 rounded-[1.85rem] text-center border border-slate-200 shadow-sm"
            >
              <CalendarDays className="w-8 h-8 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 text-sm font-semibold">
                There are no upcoming events matching your query.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event, i) => (
                <EventCard key={event.slug} event={event} index={i} />
              ))}
            </div>
          )}
        </motion.section>

        {/* ───── Past Events ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
        >
          <motion.div variants={fadeUp} className="flex items-end justify-between flex-wrap gap-3 mb-7">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#C8952E] mb-1.5">
                <History className="w-3.5 h-3.5" /> Look Back
              </span>
              <h2 className="font-serif-apollo text-xl sm:text-2xl font-black text-[#0B3446]">
                Latest Past Events
              </h2>
            </div>
            <span className="text-[11px] font-bold text-slate-400">
              {pastEvents.length} event{pastEvents.length !== 1 ? "s" : ""}
            </span>
          </motion.div>

          <div className="space-y-5">
            {pastEvents.map((event, i) => (
              <EventCard key={event.slug} event={event} index={i} horizontal />
            ))}
          </div>
        </motion.section>

        {/* ───── Trust Footer Banner ───── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="relative p-[1.5px] rounded-3xl bg-gradient-to-r from-[#1D82A6]/30 via-[#C8952E]/40 to-[#1D82A6]/30 shadow-md">
            <div className="rounded-[calc(1.5rem-1.5px)] bg-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] flex items-center justify-center text-[#F6D98A] shadow-lg shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[#0B3446]">
                    Apollo JBP Hospitals • Community Health Camps
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    To organize or register for a camp: 1800-123-6666 / 7566 123666.
                  </p>
                </div>
              </div>

              <a
                href="tel:18001236666"
                className="ev-shimmer relative overflow-hidden px-7 py-3 rounded-full text-xs font-extrabold text-[#3A2B0A] shadow-md hover:shadow-lg transition-all cursor-pointer shrink-0"
                style={goldGradient}
              >
                Call to Register
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}

/* ───────────────────────── Premium event card ───────────────────────── */
function EventCard({ event, index, horizontal = false }) {
  const excerpt =
    event.excerpt ||
    (event.description
      ? event.description.replace(/<[^>]+>/g, "").trim()
      : event.subtitle) ||
    "";

  return (
    <motion.div
      custom={index}
      variants={cardVariant}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="ev-card-glow relative rounded-[1.85rem] bg-gradient-to-br from-[#1D82A6]/25 via-white to-[#C8952E]/30 p-[1.5px] shadow-md hover:shadow-2xl transition-shadow duration-400"
    >
      <div
        className={`bg-white rounded-[calc(1.85rem-1.5px)] overflow-hidden h-full ${
          horizontal ? "flex flex-col md:flex-row" : "flex flex-col"
        }`}
      >
        {/* Date badge block over the event image */}
        <div
          className={`relative shrink-0 overflow-hidden ${
            horizontal ? "md:w-56 h-44 md:h-auto" : "h-44"
          }`}
        >
          <img
            src={event.image}
            alt={event.title}
            className="absolute inset-0 w-full h-full object-cover brightness-[1.08]"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A5F7A]/80 via-[#0B3446]/55 to-[#0B3446]/30" />

          <div className="relative h-full flex flex-col items-center justify-center text-center text-white px-3 py-4">
            <span className="text-[10px] font-black tracking-widest uppercase text-[#F6D98A]">
              {event.dateBadge?.month || event.date?.split(" ")[0]}
            </span>
            <div className="text-4xl font-black my-0.5 drop-shadow-md">
              {event.dateBadge?.day || ""}
            </div>
            <span className="text-[10px] font-bold opacity-85">
              {event.dateBadge?.year || event.date}
            </span>
          </div>

          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 text-[8.5px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-md text-[#0E526B] shadow-sm">
            <Stethoscope className="w-2.5 h-2.5 text-[#C8952E]" />
            {event.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between gap-4">
          <div>
            <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-500 font-semibold mb-2">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#1D82A6]" />
                {event.time}
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1 truncate max-w-[220px]">
                <MapPin className="w-3.5 h-3.5 text-rose-400" />
                {event.location}
              </span>
            </div>

            <Link href={`/patientcare/events/${event.slug}`}>
              <h3 className="font-serif-apollo text-base sm:text-lg font-black text-[#0B3446] hover:text-[#1D82A6] transition-colors leading-snug line-clamp-2">
                {event.title}
              </h3>
            </Link>

            <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
              {excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-6 h-6 rounded-full bg-[#EDF6FB] flex items-center justify-center shrink-0">
                <BadgeCheck className="w-3.5 h-3.5 text-[#1D82A6]" />
              </span>
              <span className="text-[11px] font-bold text-[#0A5F7A] truncate">
                {event.doctor?.name}
              </span>
            </div>
            <Link
              href={`/patientcare/events/${event.slug}`}
              className="inline-flex items-center gap-1 text-[11px] font-extrabold text-[#0E526B] bg-[#EDF6FB] hover:bg-[#0E526B] hover:text-white px-3 py-1.5 rounded-full transition-all shrink-0"
            >
              <span>Details</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}