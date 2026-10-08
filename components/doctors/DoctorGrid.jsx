"use client";

import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Heart,
  Search,
  Stethoscope,
  UserRound,
} from "lucide-react";

/* ---------------- Specialty colors ---------------- */

function getDoctorTone(slug = "") {
  const value = String(slug).toLowerCase();

  if (value.includes("onco")) return { ink: "#C72D69", soft: "#FFF0F6" };
  if (value.includes("card")) return { ink: "#D94C5B", soft: "#FFF1F3" };
  if (value.includes("gastro")) return { ink: "#168B73", soft: "#ECFAF6" };
  if (value.includes("neuro")) return { ink: "#6554C0", soft: "#F1EFFF" };
  if (value.includes("nephro")) return { ink: "#2673C7", soft: "#EEF6FF" };
  if (value.includes("ortho") || value.includes("spine"))
    return { ink: "#D27A29", soft: "#FFF5EA" };
  if (value.includes("critical")) return { ink: "#2674D8", soft: "#EEF5FF" };

  return { ink: "#0E526B", soft: "#EDF7FA" };
}

/* ---------------- Doctor Card ---------------- */


function DoctorPhoto({ src, name, tone }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className="relative flex h-full w-full items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(160deg, ${tone.soft} 0%, #ffffff 100%)`,
        }}
      >
        {/* soft glow + rings */}
{/* purane blur-2xl wale glow div ki jagah */}
<div
  className="absolute inset-0"
  style={{
    background: `radial-gradient(circle at 50% 45%, ${tone.ink}33 0%, transparent 60%)`,
  }}
/>
<div
  className="absolute h-28 w-28 rounded-full border"
  style={{ borderColor: `${tone.ink}22` }}
/>
<div
  className="absolute h-40 w-40 rounded-full border"
  style={{ borderColor: `${tone.ink}14` }}
/>

{/* user icon */}
<span
  className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-[0_12px_30px_rgba(6,32,43,.10)] ring-4"
  style={{ color: tone.ink, "--tw-ring-color": tone.soft }}
>
  <UserRound className="h-10 w-10" strokeWidth={1.5} />
</span>
      </div>
    );
  }

  return (
    <img
  src={src}
  alt={name}
  width={300}
  height={200}
  loading="lazy"
  decoding="async"
  onError={() => setFailed(true)}
  className="doctor-photo h-full w-full object-cover object-top transition-transform duration-700"
/>
  );
}
const DoctorCard = memo(function DoctorCard({ doctor }) {
  const tone = getDoctorTone(doctor.specialitySlug || doctor.speciality);

  return (
    <article className="doctor-card group relative flex h-full flex-col overflow-hidden">
      {/* BACKGROUND: blur ki jagah sasta radial-gradient */}
      <div className="doctor-texture pointer-events-none absolute inset-x-0 top-0 h-52" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-52 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 85% 0%, ${tone.ink}2E 0%, transparent 55%), radial-gradient(circle at 0% 55%, #E1B54A26 0%, transparent 50%)`,
        }}
      />

      {/* IMAGE AREA */}
      <div className="relative px-3 pt-3">
        <div
          className="absolute inset-x-3 top-3 h-[200px] rounded-[20px]"
          style={{
            background: `linear-gradient(160deg, ${tone.soft} 0%, #ffffff 100%)`,
          }}
        />

        <div className="relative h-[200px] overflow-hidden rounded-[20px] ring-1 ring-[#0E526B]/5">
          <DoctorPhoto src={doctor.image} name={doctor.name} tone={tone} />

          <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-white/80 to-transparent" />

          {/* Available: animate-ping hata diya, static dot */}
          <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider text-[#168B73] shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#168B73]" />
            Available
          </span>

          <button
            type="button"
            aria-label={`Save ${doctor.name}`}
            className="absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#0E526B] shadow-sm transition hover:scale-110 hover:text-[#D94C5B]"
          >
            <Heart className="h-3.5 w-3.5" />
          </button>
        </div>

        <span
          className="absolute -bottom-2.5 left-6 z-10 inline-flex max-w-[80%] items-center gap-1.5 rounded-full border border-white px-3 py-1.5 text-[10px] font-bold shadow-[0_8px_20px_rgba(6,32,43,.10)]"
          style={{ color: tone.ink, background: tone.soft }}
        >
          <Stethoscope className="h-3 w-3 shrink-0" />
          <span className="truncate">{doctor.speciality}</span>
        </span>
      </div>

      {/* CONTENT */}
      <div className="relative flex flex-1 flex-col px-5 pb-5 pt-5">
        <h3 className="font-serif text-[19px] leading-tight text-[#06202B]">
          {doctor.name}
        </h3>

        <p className="mt-1 min-h-[28px] text-[11px] font-semibold leading-[14px] text-[#C8952E]">
          {doctor.designation}
        </p>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-3">
          <Link
            href={`/doctors/${doctor.slug}`}
            className="flex h-9 items-center justify-center rounded-lg border border-[#BFD6DF] bg-white text-[11px] font-bold text-[#0E526B] transition hover:border-[#0E526B] hover:bg-[#F3F9FB]"
          >
            View Profile
          </Link>

          <Link
            href={`/contact?doctor=${doctor.slug}`}
            className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-[#0E526B] to-[#137A9A] text-[11px] font-bold text-white shadow-[0_8px_18px_rgba(14,82,107,.25)] transition hover:brightness-110"
          >
            Book Now
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
});

/* ---------------- Empty state ---------------- */

function EmptyDoctors() {
  return (
    <div className="rounded-[24px] border border-[#E2ECEF] bg-white px-6 py-20 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EFF7F9] text-[#0E526B]">
        <Search className="h-6 w-6" />
      </span>

      <h3 className="mt-5 font-serif text-2xl text-[#06202B]">
        No doctors found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#71858E]">
        Try another doctor name or specialty to find the right specialist.
      </p>

      <Link
        href="/doctors"
        className="mt-6 inline-flex rounded-full bg-[#0E526B] px-6 py-3 text-xs font-bold text-white"
      >
        View All Doctors
      </Link>
    </div>
  );
}

/* ---------------- Grid + Load More ---------------- */

// export default function DoctorGrid({ doctors, pageSize = 12 }) {
//   const [visible, setVisible] = useState(pageSize);
//   const [loading, setLoading] = useState(false);

//   const gridRef = useRef(null);
//   const firstNewIndex = useRef(null);

//   const shown = doctors.slice(0, visible);
//   const hasMore = visible < doctors.length;
//   const remaining = doctors.length - visible;
//   const progress = doctors.length
//     ? Math.round((shown.length / doctors.length) * 100)
//     : 0;

//   // Naye cards render hone ke baad pehle naye card par scroll
//   useEffect(() => {
//     if (firstNewIndex.current === null) return;

//     const el = gridRef.current?.querySelector(
//       `[data-index="${firstNewIndex.current}"]`
//     );

//     firstNewIndex.current = null;
//     el?.scrollIntoView({ behavior: "smooth", block: "start" });
//   }, [visible]);

//   function loadMore() {
//     if (loading) return;
//     setLoading(true);

//     setTimeout(() => {
//       firstNewIndex.current = visible;
//       setVisible((v) => Math.min(v + pageSize, doctors.length));
//       setLoading(false);
//     }, 450);
//   }

//   if (doctors.length === 0) return <EmptyDoctors />;

//   return (
//     <div>
//       <p className="mb-5 text-xs font-semibold text-[#607681]">
//         Showing {shown.length} of {doctors.length} doctors
//       </p>

//       <div
//   ref={gridRef}
//   className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
// >
//         {shown.map((doctor, index) => (
//           <div
//             key={doctor.id || doctor.slug}
//             data-index={index}
//             className="doctor-card-in scroll-mt-28"
//             style={{ animationDelay: `${(index % pageSize) * 60}ms` }}
//           >
//             <DoctorCard doctor={doctor} />
//           </div>
//         ))}
//       </div>

//       {/* Footer: hamesha last me */}
//       <div className="mt-12 flex flex-col items-center gap-4">
//         <div className="w-full max-w-xs">
//           <div className="h-1.5 overflow-hidden rounded-full bg-[#E3EEF2]">
//             <div
//               className="h-full rounded-full bg-gradient-to-r from-[#0E526B] to-[#C8952E] transition-all duration-700"
//               style={{ width: `${progress}%` }}
//             />
//           </div>
//           <p className="mt-2 text-center text-[11px] font-semibold text-[#71858E]">
//             {shown.length} / {doctors.length} doctors
//           </p>
//         </div>

//         {hasMore ? (
//           <button
//             type="button"
//             onClick={loadMore}
//             disabled={loading}
//             className="group inline-flex items-center gap-3 rounded-full border border-[#0E526B]/20 bg-white px-8 py-4 text-sm font-bold text-[#0E526B] shadow-sm transition hover:-translate-y-1 hover:border-[#C8952E]/50 hover:shadow-lg disabled:cursor-wait disabled:opacity-70"
//           >
//             {loading
//               ? "Loading..."
//               : `Load More Doctors (${Math.min(pageSize, remaining)} more)`}

//             <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0E526B] text-white transition group-hover:bg-[#C8952E]">
//               {loading ? (
//                 <Loader2 className="h-4 w-4 animate-spin" />
//               ) : (
//                 <ArrowRight className="h-4 w-4" />
//               )}
//             </span>
//           </button>
//         ) : (
//           <p className="rounded-full bg-[#EEF7FA] px-5 py-2 text-xs font-bold text-[#0E526B]">
//             ✓ You&apos;ve seen all {doctors.length} doctors
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

export default function DoctorGrid({ doctors, pageSize = 12 }) {
  const [visible, setVisible] = useState(pageSize);
  const [animFrom, setAnimFrom] = useState(Infinity); // sirf naye cards animate honge
  const gridRef = useRef(null);
  const pendingSlug = useRef(null);
  const [ready, setReady] = useState(false);

  const shown = doctors.slice(0, visible);
  const hasMore = visible < doctors.length;
  const remaining = doctors.length - visible;
  const progress = doctors.length
    ? Math.round((shown.length / doctors.length) * 100)
    : 0;

  const storageKey = () => `doctors-grid:${window.location.search}`;

  const save = (patch) => {
    try {
      const prev = JSON.parse(sessionStorage.getItem(storageKey()) || "{}");
      sessionStorage.setItem(storageKey(), JSON.stringify({ ...prev, ...patch }));
    } catch {}
  };

  // 1) Paint se pehle count restore
  useLayoutEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey()) || "null");
      if (saved?.count && saved.count > pageSize) {
        setVisible(Math.min(saved.count, doctors.length));
      }
      pendingSlug.current = saved?.slug || null;
    } catch {}
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) Usi card par INSTANT jump (smooth nahi, taaki scrolling dikhe hi na)
  useLayoutEffect(() => {
    if (!ready || !pendingSlug.current) return;

    const slug = pendingSlug.current;
    pendingSlug.current = null;

    const go = () => {
      const el = gridRef.current?.querySelector(
        `[data-doctor-slug="${CSS.escape(slug)}"]`
      );
      if (!el) return;
      const top =
        el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.3;
      window.scrollTo({ top, behavior: "instant" });
    };

    go();
    requestAnimationFrame(go); // Next ka apna scroll restore override ho jaye
    save({ slug: null });
  }, [ready, visible]);

  const handleClickCapture = (e) => {
    const el = e.target.closest("[data-doctor-slug]");
    if (el) save({ slug: el.dataset.doctorSlug, count: visible });
  };

  // Load More: koi fake delay nahi, koi auto-scroll nahi
  const loadMore = () => {
    const next = Math.min(visible + pageSize, doctors.length);
    setAnimFrom(visible);
    setVisible(next);
    save({ count: next });
  };

  if (doctors.length === 0) return <EmptyDoctors />;

  return (
    <div>
      <p className="mb-5 text-xs font-semibold text-[#607681]">
        Showing {shown.length} of {doctors.length} doctors
      </p>

      <div
  ref={gridRef}
  onClickCapture={handleClickCapture}
  className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
>
  {shown.map((doctor, index) => (
    <div
      key={doctor.id || doctor.slug}
      data-doctor-slug={doctor.slug}
      className={`scroll-mt-28 ${index >= animFrom ? "doctor-card-in" : ""}`}
      style={
        index >= animFrom
          ? { animationDelay: `${(index - animFrom) * 40}ms` }
          : undefined
      }
    >
      <DoctorCard doctor={doctor} />
    </div>
  ))}
</div>

      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="w-full max-w-xs">
          <div className="h-1.5 overflow-hidden rounded-full bg-[#E3EEF2]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#0E526B] to-[#C8952E]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-center text-[11px] font-semibold text-[#71858E]">
            {shown.length} / {doctors.length} doctors
          </p>
        </div>

        {hasMore ? (
          <button
            type="button"
            onClick={loadMore}
            className="group inline-flex items-center gap-3 rounded-full border border-[#0E526B]/20 bg-white px-8 py-4 text-sm font-bold text-[#0E526B] shadow-sm transition hover:-translate-y-1 hover:border-[#C8952E]/50 hover:shadow-lg"
          >
            Load More Doctors ({Math.min(pageSize, remaining)} more)
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0E526B] text-white transition group-hover:bg-[#C8952E]">
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
        ) : (
          <p className="rounded-full bg-[#EEF7FA] px-5 py-2 text-xs font-bold text-[#0E526B]">
            ✓ You&apos;ve seen all {doctors.length} doctors
          </p>
        )}
      </div>
    </div>
  );
}