"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Plus, Clock, Languages, GraduationCap, CalendarCheck, Phone, BadgeCheck } from "lucide-react";

const gold = { background: "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)" };

/* Scroll progress bar */
export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[60] pointer-events-none">
      <div
        className="h-full transition-[width] duration-150"
        style={{ width: `${p}%`, background: "linear-gradient(90deg,#1D82A6,#F6D98A,#C8952E)" }}
      />
    </div>
  );
}

/* Reveal on scroll */
export function Reveal({ children, delay = 0, y = 36, className = "" }) {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "none" : `translateY(${y}px) scale(0.98)`,
        transition: `opacity .8s ease ${delay}ms, transform .8s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* Animated number counter (99.2%, 15K+, <45m, 24/7 ...) */
export function Counter({ value, className = "" }) {
  const str = String(value);
  const m = str.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!m) return;
    const el = ref.current;
    if (!el) return;
    const target = parseFloat(m[2]);
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const dur = 1600;
        const tick = (t) => {
          const k = Math.min((t - start) / dur, 1);
          setN(target * (1 - Math.pow(1 - k, 3)));
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [str]); // eslint-disable-line

  if (!m) return <span className={className}>{str}</span>;
  const decimals = (m[2].split(".")[1] || "").length;
  return (
    <span ref={ref} className={className}>
      {m[1]}
      {n.toFixed(decimals)}
      {m[3]}
    </span>
  );
}

/* 3D tilt wrapper */
export function Tilt({ children, className = "", max = 7 }) {
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * max}deg) rotateX(${-y * max}deg) translateY(-6px)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      className={className}
      style={{ transition: "transform .25s ease-out", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

/* FAQ accordion */
export function FaqAccordion({ faqs }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-3">
      {faqs.map((f, i) => {
        const on = open === i;
        return (
          <div
            key={f.q}
            className={`rounded-2xl border transition-all duration-300 ${
              on
                ? "bg-gradient-to-r from-[#F1F9FD] to-[#FFFBF1] border-[#C8952E]/50 shadow-lg"
                : "bg-white border-slate-100 hover:border-[#1D82A6]/30"
            }`}
          >
            <button
              onClick={() => setOpen(on ? -1 : i)}
              className="w-full flex items-center justify-between gap-4 text-left p-4"
            >
              <span className="font-black text-[#0B3446] text-sm">
                <span className="text-[#C8952E]">Q. </span>
                {f.q}
              </span>
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${on ? "rotate-45 text-[#3A2B0A]" : "bg-[#EDF6FB] text-[#1D82A6]"}`}
                style={on ? gold : undefined}
              >
                <Plus className="w-4 h-4" />
              </span>
            </button>
            <div className={`grid transition-[grid-template-rows] duration-300 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <p className="px-4 pb-4 pl-9 text-sm text-slate-600 leading-relaxed">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* Doctor card */
export function DoctorCard({ doctor }) {
  const [broken, setBroken] = useState(false);
  const initials = doctor.name
    .replace(/^Dr\.?\s*/i, "")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <Tilt className="h-full">
      <div
        className="group relative h-full p-[2px] rounded-[1.75rem] shadow-lg hover:shadow-[0_25px_60px_rgba(200,149,46,0.35)] transition-shadow duration-500 anim-shimmer"
        style={{
          background: "linear-gradient(135deg,#1D82A6,#F6D98A,#C8952E,#F6D98A,#1D82A6)",
          backgroundSize: "300% 300%",
        }}
      >
        <div className="bg-white rounded-[calc(1.75rem-2px)] overflow-hidden h-full flex flex-col">
          {/* photo */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#EAF6FC] to-[#FFF7E8]">
            {broken ? (
              <div className="w-full h-64 flex items-center justify-center">
                <span
                  className="w-28 h-28 rounded-full flex items-center justify-center text-4xl font-black text-[#F6D98A] shadow-xl"
                  style={{ background: "linear-gradient(135deg,#1D82A6,#0B3446)" }}
                >
                  {initials}
                </span>
              </div>
            ) : (
              <img
                src={doctor.image}
                alt={doctor.name}
                onError={() => setBroken(true)}
                className="w-full h-64 object-cover object-top group-hover:scale-105 transition-transform duration-700"
              />
            )}
            <span
              className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 text-[10px] font-black px-3 py-1.5 rounded-full text-[#3A2B0A] shadow-md"
              style={gold}
            >
              <BadgeCheck className="w-3.5 h-3.5" /> {doctor.experience} Experience
            </span>
          </div>

          {/* info */}
          <div className="p-5 flex flex-col flex-1">
            <h3 className="font-serif-apollo text-lg font-black text-[#0B3446] leading-snug">{doctor.name}</h3>
            <p className="text-xs font-bold text-[#C8952E] mb-3">{doctor.designation}</p>

            <div className="space-y-2 text-[12px] text-slate-600 mb-4">
              <p className="flex items-start gap-2">
                <GraduationCap className="w-4 h-4 text-[#1D82A6] shrink-0 mt-0.5" /> {doctor.qualification}
              </p>
              <p className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#1D82A6] shrink-0 mt-0.5" /> {doctor.timings}
              </p>
              <p className="flex items-start gap-2">
                <Languages className="w-4 h-4 text-[#1D82A6] shrink-0 mt-0.5" /> {doctor.languages.join(", ")}
              </p>
            </div>

            <Link
              href="/contact"
              className="mt-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs font-black text-[#3A2B0A] shadow-[0_10px_26px_rgba(200,149,46,0.35)] group-hover:shadow-[0_14px_34px_rgba(200,149,46,0.55)] transition-all"
              style={gold}
            >
              <CalendarCheck className="w-4 h-4" /> Book Appointment
            </Link>
          </div>
        </div>
      </div>
    </Tilt>
  );
}

/* Empty state if no doctors mapped yet */
export function NoDoctors({ name }) {
  return (
    <div className="p-[2px] rounded-[1.75rem] bg-gradient-to-br from-[#1D82A6]/40 via-white to-[#C8952E]/50 shadow-lg">
      <div className="bg-white rounded-[calc(1.75rem-2px)] p-10 text-center">
        <p className="font-serif-apollo text-xl font-black text-[#0B3446] mb-2">Our {name} specialists are ready to help</p>
        <p className="text-sm text-slate-600 mb-5">Call our care team to know the doctor availability and book your slot.</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-black text-[#3A2B0A] shadow-lg"
          style={gold}
        >
          <Phone className="w-4 h-4" /> Contact Us
        </Link>
      </div>
    </div>
  );
}