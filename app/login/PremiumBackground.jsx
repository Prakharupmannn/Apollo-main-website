"use client";

import React from "react";

/** Unsplash photos (swap any URL you like). */
export const PHOTOS = {
  backdrop: "/images/image.webp",
  slides: [
    {
      src: "/images/image.webp",
      title: "Excellence in Care, Connected to You.",
      text: "Access world-class specialists and personalized health records anywhere, anytime.",
    },
  ],
};

/** Light, blurred photo backdrop with soft teal and gold glows. */
export default function PremiumBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#EAF4F8]">
      <style>{`
        @keyframes apx-kenburns { from { transform: scale(1.02); } to { transform: scale(1.14) translate(-1.5%, -1%); } }
        @keyframes apx-drift-a { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(60px,40px,0) scale(1.15); } }
        @keyframes apx-drift-b { 0%,100% { transform: translate3d(0,0,0) scale(1); } 50% { transform: translate3d(-70px,-30px,0) scale(1.1); } }
        @keyframes apx-rise { from { opacity: 0; transform: translateY(24px) scale(.98); filter: blur(6px); } to { opacity: 1; transform: none; filter: blur(0); } }
        @keyframes apx-fade-up { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
        @keyframes apx-shine { 0% { transform: translateX(-130%) skewX(-18deg); } 55%,100% { transform: translateX(300%) skewX(-18deg); } }
        @keyframes apx-pop { 0% { transform: scale(.3); opacity: 0; } 65% { transform: scale(1.14); opacity: 1; } 100% { transform: scale(1); } }
        @keyframes apx-ring { 0% { transform: scale(.8); opacity: .55; } 100% { transform: scale(2.1); opacity: 0; } }
        @keyframes apx-draw { to { stroke-dashoffset: 0; } }
        @keyframes apx-shake { 10%,90% { transform: translateX(-1px); } 20%,80% { transform: translateX(3px); } 30%,50%,70% { transform: translateX(-6px); } 40%,60% { transform: translateX(6px); } }
        @keyframes apx-pulse-dot { 0%,100% { box-shadow: 0 0 0 0 rgba(52,211,153,.6); } 70% { box-shadow: 0 0 0 8px rgba(52,211,153,0); } }
        @keyframes apx-gold-text { to { background-position: 200% center; } }

        .apx-rise { animation: apx-rise .9s cubic-bezier(.2,.8,.2,1) both; }
        .apx-stagger { opacity: 0; animation: apx-fade-up .7s cubic-bezier(.2,.8,.2,1) forwards; animation-delay: calc(var(--i, 0) * 80ms + 200ms); }
        .apx-shake { animation: apx-shake .5s cubic-bezier(.36,.07,.19,.97) both; }
        .apx-live-dot { animation: apx-pulse-dot 2s infinite; }
        .apx-kenburns { animation: apx-kenburns 14s ease-in-out infinite alternate; }
        .apx-grad-text {
          background: linear-gradient(90deg, #0A5F7A, #2AB3D6, #C8952E, #2AB3D6, #0A5F7A);
          background-size: 200% auto;
          -webkit-background-clip: text; background-clip: text; color: transparent;
          animation: apx-gold-text 7s linear infinite;
        }
        .apx-shine { position: relative; overflow: hidden; }
        .apx-shine::after {
          content: ""; position: absolute; inset: 0; width: 38%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,.5), transparent);
          animation: apx-shine 5.5s ease-in-out infinite; pointer-events: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .apx-rise, .apx-stagger, .apx-shake, .apx-live-dot, .apx-grad-text, .apx-kenburns,
          .apx-shine::after, .apx-anim { animation: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* Blurred hospital photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={PHOTOS.backdrop}
        alt=""
        referrerPolicy="no-referrer"
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-[6px]"
        onError={(e) => (e.currentTarget.style.display = "none")}
      />

      {/* Washed-out veil */}
      <div className="absolute inset-0 " />

      {/* Soft glows */}
      <div className="apx-anim absolute -left-32 -top-32 h-[30rem] w-[30rem] rounded-full bg-[#2AB3D6]/25 blur-[110px]" style={{ animation: "apx-drift-a 22s ease-in-out infinite" }} />
      <div className="apx-anim absolute -bottom-40 -right-32 h-[32rem] w-[32rem] rounded-full bg-[#E8B64C]/25 blur-[120px]" style={{ animation: "apx-drift-b 26s ease-in-out infinite" }} />

      {/* Fine dot grid */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(rgba(10,95,122,.18) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />
    </div>
  );
}

/** Elevated white card with a soft glow and hairline border. */
export function GlowFrame({ children, className = "", style }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.25rem] bg-white shadow-[0_40px_100px_rgba(7,60,85,0.28),0_0_0_1px_rgba(255,255,255,0.7)] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}