import Image from "next/image";
import Link from "next/link";
import {
  Activity, ArrowRight, Baby, Bone, Brain, CalendarDays, Droplet, Droplets,
  Flower2, HeartPulse, Microscope, Stethoscope,
} from "lucide-react";

/**
 * Doctors hero - "Specialty Orbit"
 * One team in the centre, every specialty orbiting it. Each orbiting chip links
 * to that specialty in your directory. Light, futuristic, timeless.
 *
 * Performance: server component, zero client JS, zero blur filters.
 * Only transform/opacity animations (compositor-only), all disabled when the
 * visitor prefers reduced motion. Hovering the orbit pauses it.
 */

const outer = [
  { slug: "cardiology", label: "Cardiac", Icon: HeartPulse },
  { slug: "neurology", label: "Neuro", Icon: Brain },
  { slug: "orthopaedics", label: "Ortho & Spine", Icon: Bone },
  { slug: "paediatrics", label: "Paediatrics", Icon: Baby },
  { slug: "oncology", label: "Onco", Icon: Microscope },
];
const inner = [
  { slug: "nephrology", label: "Nephro", Icon: Droplets },
  { slug: "critical-care", label: "Critical Care", Icon: Activity },
  { slug: "gynaecology", label: "Women Health", Icon: Flower2 },
  { slug: "gastroenterology", label: "Gastro", Icon: Stethoscope },
  { slug: "urology", label: "Urology", Icon: Droplet },
];

function Ring({ items, offset = 0, reverse = false, duration, className }) {
  const step = 360 / items.length;
  return (
    <div className={`absolute rounded-full border border-dashed border-[#1D82A6]/25 ${className}`}>
      <div
        className="dh-ring absolute inset-0"
        style={{ animationDuration: duration, animationDirection: reverse ? "reverse" : "normal" }}
      >
        {items.map(({ slug, label, Icon }, i) => {
          const a = offset + i * step;
          return (
            <div key={slug} className="absolute inset-0" style={{ transform: `rotate(${a}deg)` }}>
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                <div style={{ transform: `rotate(${-a}deg)` }}>
                  <div
                    className="dh-ring"
                    style={{ animationDuration: duration, animationDirection: reverse ? "normal" : "reverse" }}
                  >
                    <Link
                      href={`/doctors?specialty=${slug}#expert-doctors`}
                      aria-label={label}
                      className="flex items-center gap-2 rounded-full bg-white p-1 shadow-[0_10px_24px_-10px_rgba(14,82,107,0.55)] ring-1 ring-[#1D82A6]/15 transition-shadow hover:ring-[#C8952E] sm:pr-3.5"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#E3F4FA] to-[#FFF3D6] text-[#0E526B] sm:h-9 sm:w-9">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="hidden whitespace-nowrap text-xs font-semibold text-[#06202B] sm:inline">
                        {label}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function DoctorsHero({ total = 49 }) {
  return (
    <section className="relative overflow-hidden bg-[#F5FAFD]">
      <style>{`
        @keyframes dh-spin{to{transform:rotate(360deg)}}
        @keyframes dh-up{from{opacity:0;transform:translate3d(0,22px,0)}to{opacity:1;transform:none}}
        @keyframes dh-pop{from{opacity:0;transform:scale(.88)}to{opacity:1;transform:none}}
        .dh-ring{animation:dh-spin 70s linear infinite;will-change:transform}
        .dh-core{animation:dh-spin 9s linear infinite;will-change:transform}
        .dh-up{opacity:0;animation:dh-up .8s cubic-bezier(.22,1,.36,1) forwards}
        .dh-pop{opacity:0;animation:dh-pop 1.1s cubic-bezier(.22,1,.36,1) .15s forwards}
        .dh-orbit:hover .dh-ring{animation-play-state:paused}
        @media (prefers-reduced-motion:reduce){
          .dh-ring,.dh-core{animation:none}
          .dh-up,.dh-pop{opacity:1;animation:none}
        }
      `}</style>

      {/* background: soft aurora + fading grid (all static) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_85%_30%,rgba(29,130,166,0.16),transparent_70%),radial-gradient(45%_45%_at_10%_90%,rgba(200,149,46,0.14),transparent_70%),radial-gradient(40%_40%_at_55%_0%,rgba(129,140,248,0.10),transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(rgba(14,82,107,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(14,82,107,0.07) 1px,transparent 1px)",
            backgroundSize: "56px 56px",
            WebkitMaskImage: "radial-gradient(70% 70% at 60% 45%,#000,transparent)",
            maskImage: "radial-gradient(70% 70% at 60% 45%,#000,transparent)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-5 pb-16 pt-[128px] sm:px-8 lg:min-h-[calc(100svh-20px)] lg:grid-cols-[1.02fr_1fr] lg:gap-6 lg:pb-14 lg:pt-[140px]">
        {/* ---------------- content ---------------- */}
        <div>
          <p
            className="dh-up inline-flex items-center gap-2 rounded-full bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-[#0E526B] ring-1 ring-[#1D82A6]/20"
            style={{ animationDelay: ".05s" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C8952E] opacity-60 motion-reduce:animate-none" />
              <span className="relative h-2 w-2 rounded-full bg-[#C8952E]" />
            </span>
            Apollo JBP Hospitals, Jabalpur
          </p>

          <h1
            className="dh-up mt-6 text-[2.9rem] font-extrabold leading-[0.95] tracking-[-0.045em] text-[#06202B] sm:text-5xl lg:text-[4.2rem]"
            style={{ animationDelay: ".15s" }}
          >
            One team.
            <span className="block bg-gradient-to-r from-[#0E526B] via-[#1D82A6] to-[#C8952E] bg-clip-text pb-2 text-transparent">
              Every specialty.
            </span>
          </h1>

          <p
            className="dh-up mt-5 max-w-md text-[15px] leading-7 text-slate-600"
            style={{ animationDelay: ".28s" }}
          >
            {total} experienced doctors across 20+ specialties, working together
            with advanced technology so you get the right expert, first time.
          </p>

          <div className="dh-up mt-8 flex flex-wrap gap-3" style={{ animationDelay: ".4s" }}>
            <Link
              href="#expert-doctors"
              className="group inline-flex items-center gap-2 rounded-full bg-[#28627b] px-7 py-4 text-sm font-bold text-white shadow-[0_18px_34px_-14px_rgba(6,32,43,0.8)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Find your doctor
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/patientcare/appointment"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#F6D98A] to-[#C8952E] px-7 py-4 text-sm font-bold text-[#3A2B0A] shadow-[0_16px_30px_-14px_rgba(200,149,46,0.9)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <CalendarDays className="h-4 w-4" />
              Book an appointment
            </Link>
          </div>

          <dl
            className="dh-up mt-10 grid max-w-md grid-cols-3 rounded-2xl bg-white/70 p-1 ring-1 ring-[#1D82A6]/15"
            style={{ animationDelay: ".52s" }}
          >
            {[
              [String(total), "Expert doctors"],
              ["20+", "Specialties"],
              ["24/7", "Emergency care"],
            ].map(([v, l], i) => (
              <div key={l} className={`px-4 py-3 ${i ? "border-l border-[#0E526B]/10" : ""}`}>
                <dd className="bg-gradient-to-br from-[#0E526B] to-[#1D82A6] bg-clip-text text-2xl font-extrabold tracking-tight text-transparent sm:text-3xl">
                  {v}
                </dd>
                <dt className="text-[11px] text-slate-500 sm:text-xs">{l}</dt>
              </div>
            ))}
          </dl>
        </div>

        {/* ---------------- orbit ---------------- */}
        <div className="dh-pop dh-orbit relative mx-auto aspect-square w-full max-w-[300px] min-[400px]:max-w-[360px] sm:max-w-[520px] lg:max-w-[600px]">
          {/* soft glow disc */}
          <div className="absolute inset-[14%] rounded-full bg-[radial-gradient(circle,rgba(29,130,166,0.20),transparent_70%)]" />

          <Ring items={outer} offset={36} duration="80s" className="inset-[6%]" />
          <Ring items={inner} reverse duration="60s" className="inset-[24%]" />

          {/* core: rotating conic ring + photo */}
          <div className="absolute left-1/2 top-1/2 aspect-square w-[34%] -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-0 overflow-hidden rounded-full shadow-[0_20px_50px_-15px_rgba(14,82,107,0.6)]">
              <div
                className="dh-core absolute -inset-1/2"
                style={{
                  background:
                    "conic-gradient(#C8952E,#F6D98A,#1D82A6,#BFE6F3,#C8952E)",
                }}
              />
            </div>
            <div className="absolute inset-[5px] overflow-hidden rounded-full bg-[#DCEEF5]">
              <Image
                src="/images/doctors/doctorhero.png"
                alt="Expert doctors at Apollo JBP Hospitals"
                fill
                priority
                sizes="(min-width:1024px) 210px, 40vw"
                className="object-cover object-[50%_26%]"
              />
            </div>
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-3 py-1 text-[10px] font-bold text-[#0E526B] shadow-lg ring-1 ring-[#1D82A6]/15 sm:text-xs">
              {total} doctors, one team
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}