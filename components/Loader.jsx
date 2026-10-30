"use client";

import React from "react";
import Image from "next/image";

export default function Loader({ fullScreen = true, text = "Loading..." }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={
        fullScreen
          ? "fixed inset-0 z-[999999] flex items-center justify-center bg-[#FAF7F2]/80 backdrop-blur-md select-none"
          : "flex items-center justify-center py-12 select-none"
      }
    >
      <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72">
        {/* Ambient soft glow behind circular widget */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00E5FF]/25 via-[#1D82A6]/15 to-transparent blur-2xl pointer-events-none" />

        {/* Outer dotted circular track */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 288 288"
          fill="none"
        >
          {/* Subtle outer dotted guide ring */}
          <circle
            cx="144"
            cy="144"
            r="136"
            stroke="#1D82A6"
            strokeWidth="1.5"
            strokeDasharray="2 10"
            strokeOpacity="0.35"
          />
          {/* Subtle inner solid track ring */}
          <circle
            cx="144"
            cy="144"
            r="122"
            stroke="#E2F1F8"
            strokeWidth="4"
            strokeOpacity="0.8"
          />
        </svg>

        {/* Rotating Progress Arc with Glowing Bead */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none animate-apollo-spin"
          viewBox="0 0 288 288"
          fill="none"
        >
          <defs>
            <linearGradient id="apolloArcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.25" />
              <stop offset="35%" stopColor="#00C2CB" stopOpacity="0.85" />
              <stop offset="75%" stopColor="#1D82A6" stopOpacity="1" />
              <stop offset="100%" stopColor="#093749" stopOpacity="1" />
            </linearGradient>
            <filter id="apolloGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Glowing Arc */}
          <circle
            cx="144"
            cy="144"
            r="122"
            stroke="url(#apolloArcGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="260 500"
          />

          {/* Glowing Head Bead */}
          <circle
            cx="266"
            cy="144"
            r="6.5"
            fill="#FFFFFF"
            stroke="#00E5FF"
            strokeWidth="2.5"
            filter="url(#apolloGlow)"
          />
        </svg>

        {/* Inner elevated White Card matching Apollo design */}
        <div className="relative z-10 w-[208px] h-[208px] sm:w-[230px] sm:h-[230px] rounded-full bg-white shadow-[0_16px_40px_rgba(14,82,107,0.12),0_4px_12px_rgba(0,0,0,0.04)] border border-sky-100/80 flex flex-col items-center justify-center px-4 text-center">
          {/* Apollo Logo */}
          <div className="relative w-36 sm:w-40 h-14 sm:h-16 flex items-center justify-center">
            <Image
              src="/images/apollologo.webp"
              alt="Apollo JBP Hospitals"
              width={160}
              height={56}
              priority
              style={{ width: "auto" }}
              className="h-10 sm:h-12 w-auto object-contain"
            />
          </div>

          {/* Loading text with animated letter-spacing & pulse */}
          <div className="mt-2.5 flex items-center justify-center text-[11px] sm:text-[12px] font-bold tracking-[0.24em] text-[#0E526B] font-sans">
            <span>{text}</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes apolloSpin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-apollo-spin {
          animation: apolloSpin 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          transform-origin: center;
          will-change: transform;
        }
      `}</style>
    </div>
  );
}
