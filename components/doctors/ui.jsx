"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Reveal } from "@/components/centres/CentreMotion";

export const pad = (n) => String(n).padStart(2, "0");

export const initials = (name = "") =>
  name
    .replace(/^dr\.?\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/* =========================================================
   BUTTON
========================================================= */

const BTN = {
  gold: "text-[#3A2B0A] bg-gradient-to-b from-[#F6D98A] to-[#C8952E] shadow-[0_14px_32px_rgba(200,149,46,.28)]",
  line: "border border-[#1D82A6]/20 bg-white text-[#0B3446] hover:bg-[#F8FBFD]",
  ghost: "border border-white/25 text-white/85 hover:bg-white/10",
};

export function Btn({
  href,
  v = "gold",
  icon: Icon = ArrowRight,
  external,
  children,
}) {
  const cls = `group inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-xs font-extrabold transition duration-300 hover:-translate-y-0.5 ${BTN[v]}`;

  const inner = (
    <>
      {children}

      <Icon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </>
  );

  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
    >
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

export function Head({
  eyebrow,
  title,
  accent,
  text,
  dark,
  aside,
  center,
}) {
  return (
    <div
      className={`mb-8 flex flex-col gap-6 lg:mb-10 ${
        center
          ? "items-center text-center"
          : "justify-between lg:flex-row lg:items-end"
      }`}
    >
      <div className="max-w-2xl">
        <div
          className={`mb-4 flex items-center gap-4 ${
            center ? "justify-center" : ""
          }`}
        >
          <span className="h-[3px] w-8 rounded-full bg-[#C8952E]" />

          <span
            className={`text-[10px] font-bold uppercase tracking-[0.32em] ${
              dark ? "text-white/80" : "text-[#0E526B]"
            }`}
          >
            {eyebrow}
          </span>
        </div>

        <h2
          className={`font-serif text-[34px] leading-[1.08] sm:text-[42px] ${
            dark ? "text-white" : "text-[#06202B]"
          }`}
        >
          {title}{" "}
          <span
            className={`italic ${
              dark ? "text-[#F6D98A]" : "text-[#C8952E]"
            }`}
          >
            {accent}
          </span>
        </h2>

        {text && (
          <p
            className={`mt-4 text-sm leading-7 ${
              dark ? "text-white/70" : "text-[#526B77]"
            }`}
          >
            {text}
          </p>
        )}
      </div>

      {aside}
    </div>
  );
}

/* =========================================================
   SECTION
========================================================= */

export function Section({
  id,
  bg = "bg-white",
  children,
  noReveal = false,
}) {
  const content = (
    <section
      id={id}
      className={`relative scroll-mt-20 overflow-visible px-6 py-14 lg:px-10 lg:py-20 ${bg}`}
    >
      {/* background atmosphere */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(rgba(14,82,107,.10) 1px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />

        <div className="absolute -right-32 -top-10 h-96 w-96 rounded-full bg-[#1D82A6]/[0.08] blur-3xl" />

        <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#C8952E]/[0.07] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {children}
      </div>
    </section>
  );

  return noReveal ? content : <Reveal>{content}</Reveal>;
}

/* =========================================================
   STAGGER
========================================================= */

export function Stagger({
  children,
  className = "",
  delay = 0.06,
  amount = 0.12,
  once = true,
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once,
        amount,
      }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   STAGGER ITEM
========================================================= */

export function StaggerItem({
  children,
  className = "",
  y = 20,
  x = 0,
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          x,
          y,
        },

        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

/* =========================================================
   INFINITE MARQUEE
========================================================= */

export function Marquee({ items }) {
  const row = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-[#1D82A6]/10 bg-white py-4">
      <style>{`
        @keyframes jbp-marquee {
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div
        className="flex w-max gap-10 whitespace-nowrap"
        style={{
          animation: "jbp-marquee 38s linear infinite",
        }}
      >
        {row.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-10 font-serif text-xl italic text-[#0E526B]/70"
          >
            {t}

            <i className="h-1.5 w-1.5 rounded-full bg-[#C8952E]" />
          </span>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />

      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}