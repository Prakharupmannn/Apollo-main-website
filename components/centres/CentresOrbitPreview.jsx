// "use client";

// import { motion } from "framer-motion";
// import { centresOfExcellence } from "@/data/centresOfExcellence";
// import { CentreIcon } from "./CentresJourney";

// export default function CentresOrbitPreview() {
//   const total = centresOfExcellence.length;
//   const size = 560;
//   const radius = 210;
//   const center = size / 2;

//   return (
//     <div
//       className="relative"
//       style={{ height: size, width: size }}
//     >
//       {/* Static decorative rings */}
//       <div className="absolute inset-0 rounded-full border border-[#1D82A6]/10" />
//       <div className="absolute inset-[45px] rounded-full border border-dashed border-[#1D82A6]/15" />

//       {/* Slowly rotating ring of centre icons */}
//       <motion.div
//         className="absolute inset-0"
//         animate={{ rotate: 360 }}
//         transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
//       >
//         {centresOfExcellence.map((centre, index) => {
//           const angle = (index / total) * 360;
//           const radians = (angle * Math.PI) / 180;
//           const x = center + Math.cos(radians) * radius;
//           const y = center + Math.sin(radians) * radius;

//           return (
//             <motion.div
//               key={centre.slug}
//               className="absolute -translate-x-1/2 -translate-y-1/2"
//               style={{ left: x, top: y }}
//               // Counter-rotate so icons stay upright
//               animate={{ rotate: -360 }}
//               transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
//             >
//               <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#1D82A6]/20 bg-white/90 shadow-[0_10px_30px_rgba(6,32,43,.10)] backdrop-blur-sm">
//                 <CentreIcon slug={centre.slug} active={false} />
//               </div>
//             </motion.div>
//           );
//         })}
//       </motion.div>

//       {/* Center glass panel */}
//       <div className="absolute left-1/2 top-1/2 flex h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-white/60 bg-white/70 text-center shadow-[0_25px_70px_rgba(6,32,43,.12)] backdrop-blur-md">
//         <span className="relative mb-3 flex h-2 w-2">
//           <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C8952E]/60" />
//           <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C8952E]" />
//         </span>

//         <div className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#0E526B]/70">
//           {total} Centres
//         </div>

//         <div className="mt-2 font-serif text-xl italic leading-tight text-[#06202B]">
//           One Ecosystem
//           <br />
//           of Care
//         </div>
//       </div>
//     </div>
//   );
// }





// "use client";

// import { motion } from "framer-motion";
// import { centresOfExcellence } from "@/data/centresOfExcellence";
// import { CentreIcon } from "./CentresJourney";

// export default function CentresOrbitPreview() {
//   const total = centresOfExcellence.length;
//   const size = 560;
//   const radius = 210;
//   const center = size / 2;
//   const textRadius = 272;

//   return (
//     <div
//       className="relative"
//       style={{ height: size, width: size }}
//     >
//       {/* ===== Outer ring — rotates clockwise, carries gold text ===== */}
//       <motion.div
//         className="absolute inset-0"
//         animate={{ rotate: -360 }}
//         transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
//       >
//         <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 h-full w-full overflow-visible">
//           <defs>
//             <path
//               id="outerRingPath"
//               d={`M ${center},${center} m -${textRadius},0 a ${textRadius},${textRadius} 0 1,1 ${textRadius * 2},0 a ${textRadius},${textRadius} 0 1,1 -${textRadius * 2},0`}
//             />
//           </defs>

//           {/* Ring line itself */}
//           <circle
//             cx={center}
//             cy={center}
//             r={size / 2 - 1}
//             fill="none"
//             stroke="#1D82A6"
//             strokeOpacity="0.12"
//           />

//           {/* Circular gold text, attached to the ring */}
//           <text fill="#C8952E" fontSize="13" fontWeight="700" letterSpacing="3">
//             <textPath href="#outerRingPath" startOffset="0%">
//               CENTRE OF EXCELLENCE • CENTRE OF EXCELLENCE • CENTRE OF EXCELLENCE •
//             </textPath>
//           </text>
//         </svg>
//       </motion.div>

//       {/* ===== Inner dashed ring — rotates counter-clockwise ===== */}
//       <motion.div
//         className="absolute inset-[45px] rounded-full border border-dashed border-[#1D82A6]/15"
//         animate={{ rotate: -360 }}
//         transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
//       />

//       {/* ===== Ring of centre icons — unchanged ===== */}
//       <motion.div
//         className="absolute inset-0"
//         animate={{ rotate: 360 }}
//         transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
//       >
//         {centresOfExcellence.map((centre, index) => {
//           const angle = (index / total) * 360;
//           const radians = (angle * Math.PI) / 180;
//           const x = center + Math.cos(radians) * radius;
//           const y = center + Math.sin(radians) * radius;

//           return (
//             <motion.div
//               key={centre.slug}
//               className="absolute -translate-x-1/2 -translate-y-1/2"
//               style={{ left: x, top: y }}
//               animate={{ rotate: -360 }}
//               transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
//             >
//               <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#1D82A6]/20 bg-white/90 shadow-[0_10px_30px_rgba(6,32,43,.10)] backdrop-blur-sm">
//                 <CentreIcon slug={centre.slug} active={false} />
//               </div>
//             </motion.div>
//           );
//         })}
//       </motion.div>

//       {/* ===== Center glass panel ===== */}
//       <div className="absolute left-1/2 top-1/2 z-10 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2">

//         <div className="absolute inset-[-25px] rounded-full bg-[#1D82A6]/[0.12] blur-2xl" />

//         <motion.div
//           className="absolute inset-[-3px] rounded-full"
//           style={{
//             background:
//               "conic-gradient(from 0deg, transparent 0%, #1D82A6 15%, transparent 35%, transparent 65%, #1D82A6 85%, transparent 100%)",
//           }}
//           animate={{ rotate: 360 }}
//           transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
//         >
//           <div className="absolute inset-[3px] rounded-full bg-[#f6fbfd]" />
//         </motion.div>

//         <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white/75 text-center shadow-[0_20px_70px_rgba(6,32,43,.10)] backdrop-blur-sm">
//           <div>
//             <div className="mb-3 flex items-center justify-center gap-1.5">
//               <span className="relative flex h-1.5 w-1.5">
//                 <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1D82A6]/60" />
//                 <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1D82A6]" />
//               </span>
//               <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#0E526B]/70">
//                 Complete Care
//               </span>
//             </div>

//             <div className="font-serif text-[20px] italic leading-tight text-[#06202B]">
//               For a Healthier
//               <br />
//               Tomorrow
//             </div>

//             <div className="mx-auto mt-4 h-px w-7 bg-[#C8952E]" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





// "use client";

// import { motion } from "framer-motion";
// import { centresOfExcellence } from "@/data/centresOfExcellence";
// import { CentreIcon } from "./CentresJourney";

// export default function CentresOrbitPreview() {
//   const total = centresOfExcellence.length;
//   const size = 560;
//   const radius = 210;
//   const center = size / 2;
//   const textRadius = 272;

//   // Tick marks around the outer edge — instrument-dial feel
//   const ticks = Array.from({ length: 60 }, (_, i) => i);

//   return (
//     <div className="relative h-[220px] w-[220px] sm:h-[300px] sm:w-[300px] md:h-[400px] md:w-[400px] lg:h-[560px] lg:w-[560px]">
//       <div
//         className="absolute left-1/2 top-1/2 h-[560px] w-[560px] origin-center -translate-x-1/2 -translate-y-1/2 scale-[0.393] sm:scale-[0.536] md:scale-[0.714] lg:scale-100"
//       >
//         {/* Ambient glow behind whole orbit */}
//         <div className="pointer-events-none absolute inset-0 rounded-full bg-[#1D82A6]/[0.06] blur-3xl" />

//         {/* ===== Outer ring — gradient + glow + tick marks + gold text ===== */}
//         <motion.div
//           className="absolute inset-0"
//           animate={{ rotate: 360 }}
//           transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
//         >
//           <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 h-full w-full overflow-visible">
//             <defs>
//               <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor="#F6D98A" />
//                 <stop offset="50%" stopColor="#C8952E" />
//                 <stop offset="100%" stopColor="#F6D98A" />
//               </linearGradient>

//               <path
//                 id="outerRingPath"
//                 d={`M ${center},${center} m -${textRadius},0 a ${textRadius},${textRadius} 0 1,1 ${textRadius * 2},0 a ${textRadius},${textRadius} 0 1,1 -${textRadius * 2},0`}
//               />

//               <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
//                 <feGaussianBlur stdDeviation="4" result="blur" />
//                 <feMerge>
//                   <feMergeNode in="blur" />
//                   <feMergeNode in="SourceGraphic" />
//                 </feMerge>
//               </filter>
//             </defs>

//             {/* Base ring */}
//             <circle
//               cx={center}
//               cy={center}
//               r={size / 2 - 1}
//               fill="none"
//               stroke="#1D82A6"
//               strokeOpacity="0.1"
//               strokeWidth="1.5"
//             />

//             {/* Fine tick marks — like a dial */}
//             {ticks.map((i) => {
//               const angle = (i / ticks.length) * 360;
//               const isMajor = i % 5 === 0;
//               const r1 = size / 2 - (isMajor ? 14 : 8);
//               const r2 = size / 2;
//               const rad = (angle * Math.PI) / 180;
//               return (
//                 <line
//                   key={i}
//                   x1={center + Math.cos(rad) * r1}
//                   y1={center + Math.sin(rad) * r1}
//                   x2={center + Math.cos(rad) * r2}
//                   y2={center + Math.sin(rad) * r2}
//                   stroke={isMajor ? "#C8952E" : "#1D82A6"}
//                   strokeOpacity={isMajor ? 0.45 : 0.15}
//                   strokeWidth={isMajor ? 1.5 : 1}
//                 />
//               );
//             })}

//             {/* Glowing gold circular text */}
//             <text
//               fill="url(#goldRing)"
//               fontSize="13"
//               fontWeight="700"
//               letterSpacing="5"
//               filter="url(#softGlow)"
//             >
//               <textPath href="#outerRingPath" startOffset="0%">
//                 ✦ CENTRE OF EXCELLENCE ✦ CENTRE OF EXCELLENCE ✦ CENTRE OF EXCELLENCE
//               </textPath>
//             </text>
//           </svg>
//         </motion.div>

//         {/* ===== Inner dashed ring — opposite direction ===== */}
//         <motion.div
//           className="absolute inset-[45px] rounded-full border border-dashed border-[#1D82A6]/20"
//           animate={{ rotate: -360 }}
//           transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
//         />

//         {/* ===== Ring of centre icons ===== */}
//         <motion.div
//           className="absolute inset-0"
//           animate={{ rotate: 360 }}
//           transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
//         >
//           {centresOfExcellence.map((centre, index) => {
//             const angle = (index / total) * 360;
//             const radians = (angle * Math.PI) / 180;
//             const x = center + Math.cos(radians) * radius;
//             const y = center + Math.sin(radians) * radius;

//             return (
//               <motion.div
//                 key={centre.slug}
//                 className="absolute -translate-x-1/2 -translate-y-1/2"
//                 style={{ left: x, top: y }}
//                 animate={{ rotate: -360 }}
//                 transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
//               >
//                 <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#1D82A6]/25 bg-white/95 shadow-[0_10px_30px_rgba(6,32,43,.14)] backdrop-blur-sm">
//                   <CentreIcon slug={centre.slug} active={false} />
//                 </div>
//               </motion.div>
//             );
//           })}
//         </motion.div>

//         {/* ===== Center glass panel ===== */}
//         <div className="absolute left-1/2 top-1/2 z-10 h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2">

//           <div className="absolute inset-[-25px] rounded-full bg-[#1D82A6]/[0.14] blur-2xl" />

//           <motion.div
//             className="absolute inset-[-3px] rounded-full"
//             style={{
//               background:
//                 "conic-gradient(from 0deg, transparent 0%, #C8952E 15%, transparent 35%, transparent 65%, #C8952E 85%, transparent 100%)",
//             }}
//             animate={{ rotate: 360 }}
//             transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
//           >
//             <div className="absolute inset-[3px] rounded-full bg-[#f6fbfd]" />
//           </motion.div>

//           <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white/80 text-center shadow-[0_20px_70px_rgba(6,32,43,.14)] backdrop-blur-sm">
//             <div>
//               <div className="mb-3 flex items-center justify-center gap-1.5">
//                 <span className="relative flex h-1.5 w-1.5">
//                   <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1D82A6]/60" />
//                   <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1D82A6]" />
//                 </span>
//                 <span className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#0E526B]/70">
//                   Complete Care
//                 </span>
//               </div>

//               <div className="font-serif text-[20px] italic leading-tight text-[#06202B]">
//                 For a Healthier
//                 <br />
//                 Tomorrow
//               </div>

//               <div className="mx-auto mt-4 h-px w-7 bg-[#C8952E]" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




// "use client";

// import { motion } from "framer-motion";
// import { centresOfExcellence } from "@/data/centresOfExcellence";
// import { CentreIcon } from "./CentresJourney";

// export default function CentresOrbitPreview() {
//   const total = centresOfExcellence.length;
//   const size = 440; // base artwork size — was 560, now smaller
//   const radius = 160;
//   const center = size / 2;
//   const textRadius = 210;

//   const ticks = Array.from({ length: 60 }, (_, i) => i);

//   return (
//     <div className="relative h-[160px] w-[160px] sm:h-[220px] sm:w-[220px] md:h-[300px] md:w-[300px] lg:h-[400px] lg:w-[400px]">
//       <div
//         className="absolute left-1/2 top-1/2 h-[440px] w-[440px] origin-center -translate-x-1/2 -translate-y-1/2 scale-[0.364] sm:scale-[0.5] md:scale-[0.682] lg:scale-[0.909]"
//       >
//         {/* Ambient glow */}
//         <div className="pointer-events-none absolute inset-0 rounded-full bg-[#1D82A6]/[0.06] blur-3xl" />

//         {/* ===== Outer ring — gradient + glow + tick marks + gold text ===== */}
//         <motion.div
//           className="absolute inset-0"
//           animate={{ rotate: 360 }}
//           transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
//         >
//           <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 h-full w-full overflow-visible">
//             <defs>
//               <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
//                 <stop offset="0%" stopColor="#F6D98A" />
//                 <stop offset="50%" stopColor="#C8952E" />
//                 <stop offset="100%" stopColor="#F6D98A" />
//               </linearGradient>

//               <path
//                 id="outerRingPath"
//                 d={`M ${center},${center} m -${textRadius},0 a ${textRadius},${textRadius} 0 1,1 ${textRadius * 2},0 a ${textRadius},${textRadius} 0 1,1 -${textRadius * 2},0`}
//               />

//               <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
//                 <feGaussianBlur stdDeviation="4" result="blur" />
//                 <feMerge>
//                   <feMergeNode in="blur" />
//                   <feMergeNode in="SourceGraphic" />
//                 </feMerge>
//               </filter>
//             </defs>

//             <circle
//               cx={center}
//               cy={center}
//               r={size / 2 - 1}
//               fill="none"
//               stroke="#1D82A6"
//               strokeOpacity="0.1"
//               strokeWidth="1.5"
//             />

//             {ticks.map((i) => {
//               const angle = (i / ticks.length) * 360;
//               const isMajor = i % 5 === 0;
//               const r1 = size / 2 - (isMajor ? 12 : 7);
//               const r2 = size / 2;
//               const rad = (angle * Math.PI) / 180;

//               const x1 = (center + Math.cos(rad) * r1).toFixed(2);
//               const y1 = (center + Math.sin(rad) * r1).toFixed(2);
//               const x2 = (center + Math.cos(rad) * r2).toFixed(2);
//               const y2 = (center + Math.sin(rad) * r2).toFixed(2);

//               return (
//                 <line
//                   key={i}
//                   x1={x1}
//                   y1={y1}
//                   x2={x2}
//                   y2={y2}
//                   stroke={isMajor ? "#C8952E" : "#1D82A6"}
//                   strokeOpacity={isMajor ? 0.45 : 0.15}
//                   strokeWidth={isMajor ? 1.5 : 1}
//                 />
//               );
//             })}

//             <text
//               fill="url(#goldRing)"
//               fontSize="11"
//               fontWeight="700"
//               letterSpacing="4"
//               filter="url(#softGlow)"
//             >
//               <textPath href="#outerRingPath" startOffset="0%">
//                 ✦ CENTRE OF EXCELLENCE ✦ CENTRE OF EXCELLENCE ✦ CENTRE OF EXCELLENCE
//               </textPath>
//             </text>
//           </svg>
//         </motion.div>

//         {/* ===== Inner dashed ring — opposite direction ===== */}
//         <motion.div
//           className="absolute inset-[35px] rounded-full border border-dashed border-[#1D82A6]/20"
//           animate={{ rotate: -360 }}
//           transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
//         />

//         {/* ===== Ring of centre icons ===== */}
//         <motion.div
//           className="absolute inset-0"
//           animate={{ rotate: 360 }}
//           transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
//         >
//           {centresOfExcellence.map((centre, index) => {
//             const angle = (index / total) * 360;
//             const radians = (angle * Math.PI) / 180;
//             const x = (center + Math.cos(radians) * radius).toFixed(2);
//             const y = (center + Math.sin(radians) * radius).toFixed(2);

//             return (
//               <motion.div
//                 key={centre.slug}
//                 className="absolute -translate-x-1/2 -translate-y-1/2"
//                 style={{ left: `${x}px`, top: `${y}px` }}
//                 animate={{ rotate: -360 }}
//                 transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
//               >
//                 <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#1D82A6]/25 bg-white/95 shadow-[0_10px_30px_rgba(6,32,43,.14)] backdrop-blur-sm">
//                   <CentreIcon slug={centre.slug} active={false} />
//                 </div>
//               </motion.div>
//             );
//           })}
//         </motion.div>

//         {/* ===== Center glass panel ===== */}
//         <div className="absolute left-1/2 top-1/2 z-10 h-[140px] w-[140px] -translate-x-1/2 -translate-y-1/2">

//           <div className="absolute inset-[-20px] rounded-full bg-[#1D82A6]/[0.14] blur-2xl" />

//           <motion.div
//             className="absolute inset-[-3px] rounded-full"
//             style={{
//               background:
//                 "conic-gradient(from 0deg, transparent 0%, #C8952E 15%, transparent 35%, transparent 65%, #C8952E 85%, transparent 100%)",
//             }}
//             animate={{ rotate: 360 }}
//             transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
//           >
//             <div className="absolute inset-[3px] rounded-full bg-[#f6fbfd]" />
//           </motion.div>

//           <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white/80 text-center shadow-[0_20px_70px_rgba(6,32,43,.14)] backdrop-blur-sm">
//             <div>
//               <div className="mb-2 flex items-center justify-center gap-1.5">
//                 <span className="relative flex h-1.5 w-1.5">
//                   <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1D82A6]/60" />
//                   <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1D82A6]" />
//                 </span>
//                 <span className="text-[8px] font-semibold uppercase tracking-[0.25em] text-[#0E526B]/70">
//                   Complete Care
//                 </span>
//               </div>

//               <div className="font-serif text-[15px] italic leading-tight text-[#06202B]">
//                 For a Healthier
//                 <br />
//                 Tomorrow
//               </div>

//               <div className="mx-auto mt-3 h-px w-6 bg-[#C8952E]" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






"use client";

import { motion } from "framer-motion";
import { centresOfExcellence } from "@/data/centresOfExcellence";
import { CentreIcon } from "./CentresJourney";

export default function CentresOrbitPreview() {
  const total = centresOfExcellence.length;
  const size = 380;
  const radius = 135;
  const center = size / 2;
  const textRadius = 180;

  const ticks = Array.from({ length: 60 }, (_, i) => i);

  return (
    <div className="relative mt-6 h-[140px] w-[140px] sm:h-[190px] sm:w-[190px] md:h-[260px] md:w-[260px] lg:mt-0 lg:h-[320px] lg:w-[320px]">
      <div
        className="absolute left-1/2 top-1/2 h-[380px] w-[380px] origin-center -translate-x-1/2 -translate-y-1/2 scale-[0.368] sm:scale-[0.5] md:scale-[0.684] lg:scale-[0.842]"
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-[#1D82A6]/[0.06] blur-3xl" />

        {/* ===== Outer ring — gradient + glow + tick marks + gold text ===== */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 h-full w-full overflow-visible">
            <defs>
              <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F6D98A" />
                <stop offset="50%" stopColor="#C8952E" />
                <stop offset="100%" stopColor="#F6D98A" />
              </linearGradient>

              <path
                id="outerRingPath"
                d={`M ${center},${center} m -${textRadius},0 a ${textRadius},${textRadius} 0 1,1 ${textRadius * 2},0 a ${textRadius},${textRadius} 0 1,1 -${textRadius * 2},0`}
              />

              <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <circle
              cx={center}
              cy={center}
              r={size / 2 - 1}
              fill="none"
              stroke="#1D82A6"
              strokeOpacity="0.1"
              strokeWidth="1.5"
            />

            {ticks.map((i) => {
              const angle = (i / ticks.length) * 360;
              const isMajor = i % 5 === 0;
              const r1 = size / 2 - (isMajor ? 11 : 6);
              const r2 = size / 2;
              const rad = (angle * Math.PI) / 180;

              const x1 = (center + Math.cos(rad) * r1).toFixed(2);
              const y1 = (center + Math.sin(rad) * r1).toFixed(2);
              const x2 = (center + Math.cos(rad) * r2).toFixed(2);
              const y2 = (center + Math.sin(rad) * r2).toFixed(2);

              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isMajor ? "#C8952E" : "#1D82A6"}
                  strokeOpacity={isMajor ? 0.45 : 0.15}
                  strokeWidth={isMajor ? 1.5 : 1}
                />
              );
            })}

            <text
              fill="url(#goldRing)"
              fontSize="10"
              fontWeight="700"
              letterSpacing="3.5"
              filter="url(#softGlow)"
            >
              <textPath href="#outerRingPath" startOffset="0%">
                ✦ CENTRE OF EXCELLENCE ✦ CENTRE OF EXCELLENCE ✦ CENTRE OF EXCELLENCE
              </textPath>
            </text>
          </svg>
        </motion.div>

        {/* ===== Inner dashed ring — opposite direction ===== */}
        <motion.div
          className="absolute inset-[30px] rounded-full border border-dashed border-[#1D82A6]/20"
          animate={{ rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        />

        {/* ===== Ring of centre icons ===== */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          {centresOfExcellence.map((centre, index) => {
            const angle = (index / total) * 360;
            const radians = (angle * Math.PI) / 180;
            const x = (center + Math.cos(radians) * radius).toFixed(2);
            const y = (center + Math.sin(radians) * radius).toFixed(2);

            return (
              <motion.div
                key={centre.slug}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${x}px`, top: `${y}px` }}
                animate={{ rotate: -360 }}
                transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#1D82A6]/25 bg-white/95 shadow-[0_10px_30px_rgba(6,32,43,.14)] backdrop-blur-sm">
                  <CentreIcon slug={centre.slug} active={false} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ===== Center glass panel ===== */}
        <div className="absolute left-1/2 top-1/2 z-10 h-[120px] w-[120px] -translate-x-1/2 -translate-y-1/2">

          <div className="absolute inset-[-16px] rounded-full bg-[#1D82A6]/[0.14] blur-2xl" />

          <motion.div
            className="absolute inset-[-3px] rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0%, #C8952E 15%, transparent 35%, transparent 65%, #C8952E 85%, transparent 100%)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-[3px] rounded-full bg-[#f6fbfd]" />
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-white/80 text-center shadow-[0_20px_70px_rgba(6,32,43,.14)] backdrop-blur-sm">
            <div>
              <div className="mb-1.5 flex items-center justify-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1D82A6]/60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#1D82A6]" />
                </span>
                <span className="text-[7px] font-semibold uppercase tracking-[0.22em] text-[#0E526B]/70">
                  Complete Care
                </span>
              </div>

              <div className="font-serif text-[13px] italic leading-tight text-[#06202B]">
                For a Healthier
                <br />
                Tomorrow
              </div>

              <div className="mx-auto mt-2.5 h-px w-5 bg-[#C8952E]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}