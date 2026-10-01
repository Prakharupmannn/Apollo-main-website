"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Heart,
  Loader2,
  MapPin,
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
        <div
          className="absolute h-44 w-44 rounded-full opacity-20 blur-2xl"
          style={{ background: tone.ink }}
        />
        <div
          className="absolute h-40 w-40 rounded-full border"
          style={{ borderColor: `${tone.ink}22` }}
        />
        <div
          className="absolute h-56 w-56 rounded-full border"
          style={{ borderColor: `${tone.ink}14` }}
        />

        {/* user icon */}
        <span
          className="relative flex h-28 w-28 items-center justify-center rounded-full bg-white shadow-[0_12px_30px_rgba(6,32,43,.10)] ring-4"
          style={{ color: tone.ink, "--tw-ring-color": tone.soft }}
        >
          <UserRound className="h-14 w-14" strokeWidth={1.5} />
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className="doctor-photo h-full w-full object-cover object-top transition-transform duration-700"
    />
  );
}
function DoctorCard({ doctor }) {
  const tone = getDoctorTone(doctor.specialitySlug || doctor.speciality);

  return (
    <article className="doctor-card group relative flex h-full flex-col overflow-hidden">
      {/* BACKGROUND EFFECTS */}
      <div className="doctor-texture pointer-events-none absolute inset-x-0 top-0 h-72" />

      <div
        className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-45"
        style={{ background: tone.ink }}
      />
      <div className="pointer-events-none absolute -left-16 top-40 h-44 w-44 rounded-full bg-[#E1B54A]/20 blur-3xl" />

      {/* IMAGE AREA */}
      <div className="relative px-4 pt-4">
        <div
          className="absolute inset-x-4 top-4 h-[270px] rounded-[24px]"
          style={{
            background: `linear-gradient(160deg, ${tone.soft} 0%, #ffffff 100%)`,
          }}
        />
        <div
          className="absolute left-1/2 top-10 h-52 w-52 -translate-x-1/2 rounded-full opacity-20 blur-2xl"
          style={{ background: tone.ink }}
        />

        <div className="relative h-[270px] overflow-hidden rounded-[24px] ring-1 ring-[#0E526B]/5">
          <DoctorPhoto src={doctor.image} name={doctor.name} tone={tone} />

          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/80 to-transparent" />

          {/* Available */}
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-[#168B73] shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#168B73] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#168B73]" />
            </span>
            Available
          </span>

          {/* Save */}
          <button
            type="button"
            aria-label={`Save ${doctor.name}`}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#0E526B] shadow-sm transition hover:scale-110 hover:text-[#D94C5B]"
          >
            <Heart className="h-4 w-4" />
          </button>
        </div>

        {/* Floating specialty chip */}
        <span
          className="absolute -bottom-3 left-8 z-10 inline-flex max-w-[80%] items-center gap-1.5 rounded-full border border-white px-3.5 py-2 text-[10px] font-bold shadow-[0_8px_20px_rgba(6,32,43,.10)]"
          style={{ color: tone.ink, background: tone.soft }}
        >
          <Stethoscope className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{doctor.speciality}</span>
        </span>
      </div>

      {/* CONTENT */}
      <div className="relative flex flex-1 flex-col px-6 pb-6 pt-7">
        <h3 className="font-serif text-[23px] leading-tight text-[#06202B]">
          {doctor.name}
        </h3>

        <p className="mt-1.5 min-h-[32px] text-xs font-semibold leading-4 text-[#C8952E]">
          {doctor.designation}
        </p>

        {/* Info panel */}
        {/* <div className="mt-4 grid grid-cols-2 gap-2 rounded-2xl border border-[#E6EFF3] bg-white/70 p-2 backdrop-blur">
          <div className="flex items-center gap-2 rounded-xl bg-[#F4FAFC] px-3 py-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#0E526B] shadow-sm">
              <Clock3 className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="text-[9px] uppercase tracking-wider text-[#8AA0AA]">
                Experience
              </p>
              <p className="text-[11px] font-bold text-[#06202B]">
                {doctor.experience || "—"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-[#FFF9EC] px-3 py-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#C8952E] shadow-sm">
              <MapPin className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="text-[9px] uppercase tracking-wider text-[#8AA0AA]">
                Location
              </p>
              <p className="text-[11px] font-bold text-[#06202B]">Jabalpur</p>
            </div>
          </div>
        </div> */}

        {/* Actions */}
        <div className="mt-auto grid grid-cols-2 gap-2.5 pt-5">
          <Link
            href={`/doctors/${doctor.slug}`}
            className="flex h-11 items-center justify-center rounded-xl border border-[#BFD6DF] bg-white text-[11px] font-bold text-[#0E526B] transition hover:border-[#0E526B] hover:bg-[#F3F9FB]"
          >
            View Profile
          </Link>

          <Link
            href={`/contact?doctor=${doctor.slug}`}
            className="flex h-11 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#0E526B] to-[#137A9A] text-[11px] font-bold text-white shadow-[0_10px_22px_rgba(14,82,107,.28)] transition hover:brightness-110"
          >
            Book Now
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}

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

export default function DoctorGrid({ doctors, pageSize = 12 }) {
  const [visible, setVisible] = useState(pageSize);
  const [loading, setLoading] = useState(false);

  const gridRef = useRef(null);
  const firstNewIndex = useRef(null);

  const shown = doctors.slice(0, visible);
  const hasMore = visible < doctors.length;
  const remaining = doctors.length - visible;
  const progress = doctors.length
    ? Math.round((shown.length / doctors.length) * 100)
    : 0;

  // Naye cards render hone ke baad pehle naye card par scroll
  useEffect(() => {
    if (firstNewIndex.current === null) return;

    const el = gridRef.current?.querySelector(
      `[data-index="${firstNewIndex.current}"]`
    );

    firstNewIndex.current = null;
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [visible]);

  function loadMore() {
    if (loading) return;
    setLoading(true);

    setTimeout(() => {
      firstNewIndex.current = visible;
      setVisible((v) => Math.min(v + pageSize, doctors.length));
      setLoading(false);
    }, 450);
  }

  if (doctors.length === 0) return <EmptyDoctors />;

  return (
    <div>
      <p className="mb-5 text-xs font-semibold text-[#607681]">
        Showing {shown.length} of {doctors.length} doctors
      </p>

      <div ref={gridRef} className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((doctor, index) => (
          <div
            key={doctor.id || doctor.slug}
            data-index={index}
            className="doctor-card-in scroll-mt-28"
            style={{ animationDelay: `${(index % pageSize) * 60}ms` }}
          >
            <DoctorCard doctor={doctor} />
          </div>
        ))}
      </div>

      {/* Footer: hamesha last me */}
      <div className="mt-12 flex flex-col items-center gap-4">
        <div className="w-full max-w-xs">
          <div className="h-1.5 overflow-hidden rounded-full bg-[#E3EEF2]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#0E526B] to-[#C8952E] transition-all duration-700"
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
            disabled={loading}
            className="group inline-flex items-center gap-3 rounded-full border border-[#0E526B]/20 bg-white px-8 py-4 text-sm font-bold text-[#0E526B] shadow-sm transition hover:-translate-y-1 hover:border-[#C8952E]/50 hover:shadow-lg disabled:cursor-wait disabled:opacity-70"
          >
            {loading
              ? "Loading..."
              : `Load More Doctors (${Math.min(pageSize, remaining)} more)`}

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0E526B] text-white transition group-hover:bg-[#C8952E]">
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
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