import Link from "next/link";
import Image from "next/image";
import { centresOfExcellence } from "@/data/centresOfExcellence";
import { CentreIcon } from "./CentresJourney";

/* Server component on purpose: no hooks, no framer-motion, no JS animation.
   Everything moves with CSS transforms (GPU) and respects reduced-motion. */

const TOTAL = centresOfExcellence.length;
const pad = (n) => String(n).padStart(2, "0");

// Two columns, different order so the wall never looks repetitive
const COL_A = centresOfExcellence;
const COL_B = [...centresOfExcellence.slice(3), ...centresOfExcellence.slice(0, 3)].reverse();

export default function CentresHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(135deg,#F2F9FC_0%,#FFFFFF_46%,#FFF7E6_100%)]">
      <style>{`
        @keyframes cx-y { from { transform: translate3d(0,0,0) } to { transform: translate3d(0,-50%,0) } }
        @keyframes cx-x { from { transform: translate3d(0,0,0) } to { transform: translate3d(-50%,0,0) } }
        @keyframes cx-rise { from { opacity:0; transform: translate3d(0,18px,0) } to { opacity:1; transform: translate3d(0,0,0) } }
        @keyframes cx-float { 0%,100% { transform: translate3d(0,0,0) } 50% { transform: translate3d(0,-10px,0) } }
        .cx-y { animation: cx-y 48s linear infinite; }
        .cx-x { animation: cx-x 40s linear infinite; }
        .cx-rise { opacity:0; animation: cx-rise .8s cubic-bezier(.22,1,.36,1) forwards; }
        .cx-float { animation: cx-float 6s ease-in-out infinite; }
        .cx-pause:hover .cx-y, .cx-pause:hover .cx-x { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .cx-y, .cx-x, .cx-float { animation: none; }
          .cx-rise { animation: none; opacity: 1; }
        }
      `}</style>

      {/* ---------- Aurora background (static = free to render) ---------- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 -top-24 h-[420px] w-[420px] rounded-full bg-[#1D82A6]/[0.16] blur-3xl" />
        <div className="absolute right-[-120px] top-[8%] h-[460px] w-[460px] rounded-full bg-[#F6D98A]/[0.45] blur-3xl" />
        <div className="absolute bottom-[-160px] left-[28%] h-[380px] w-[380px] rounded-full bg-[#5CC8B5]/[0.14] blur-3xl" />
        <div className="absolute bottom-[10%] right-[22%] h-[260px] w-[260px] rounded-full bg-[#8E9CF5]/[0.12] blur-3xl" />
        {/* fine dot grid, faded at the edges */}
        <div
          className="absolute inset-0 opacity-[0.5] [mask-image:radial-gradient(ellipse_at_30%_40%,black,transparent_70%)]"
          style={{
            backgroundImage: "radial-gradient(rgba(14,82,107,.16) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>

      <div className="mx-auto grid max-w-[1320px] grid-cols-[minmax(0,1fr)] items-center gap-10 px-6 pb-14 pt-[150px] sm:pt-[165px] lg:min-h-[min(100svh,800px)] lg:grid-cols-[minmax(0,1.02fr)_minmax(0,.98fr)] lg:gap-6 lg:px-10 lg:pb-12 lg:pt-[150px]">
        {/* =============== LEFT — copy =============== */}
        <div className="relative z-10">
          <div
            className="cx-rise inline-flex items-center gap-2.5 rounded-full border border-[#C8952E]/30 bg-white/80 px-4 py-2 shadow-[0_8px_30px_-10px_rgba(200,149,46,.5)]"
            style={{ animationDelay: ".05s" }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C8952E]/60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#C8952E]" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#0E526B] sm:text-[11px]">
              Apollo JBP Hospitals · Jabalpur
            </span>
          </div>

          <h1
            className="cx-rise mt-5 font-serif text-[clamp(32px,4.2vw,62px)] leading-[0.98] tracking-[-0.04em] text-[#06202B]"
            style={{ animationDelay: ".15s" }}
          >
            {pad(TOTAL)} Centres of
            <br />
            <span className="bg-gradient-to-r from-[#B8821F] via-[#F2C766] to-[#C8952E] bg-clip-text italic text-transparent">
              Excellence
            </span>
          </h1>

          <p
            className="cx-rise mt-5 max-w-xl text-[15px] leading-7 text-slate-600"
            style={{ animationDelay: ".28s" }}
          >
            Where specialist expertise, advanced technology and compassionate
            care come together — for every patient, at every critical moment.
          </p>

          {/* CTAs */}
          <div
            className="cx-rise mt-7 flex flex-wrap items-center gap-3.5"
            style={{ animationDelay: ".4s" }}
          >
            <a
              href="#centres-journey"
              className="group inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[12px] font-extrabold text-[#3A2B0A] shadow-[0_18px_40px_-10px_rgba(200,149,46,.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_50px_-10px_rgba(200,149,46,.8)]"
              style={{ background: "linear-gradient(180deg,#F8DE94 0%,#C8952E 100%)" }}
            >
              Explore the Centres
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#3A2B0A]/10 transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </a>

            <Link
              href="/doctors"
              className="inline-flex items-center gap-2 rounded-full border border-[#1D82A6]/25 bg-white/80 px-5 py-3.5 text-[12px] font-bold text-[#0E526B] transition-all duration-300 hover:border-[#1D82A6]/50 hover:bg-white"
            >
              Find a Specialist
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/* Centre chips — real links, great for navigation + SEO */}
         {/* Centre chips — real links, great for navigation + SEO */}
<nav
  aria-label="Centres of Excellence"
  className="cx-rise mt-7 -mx-6 px-6 sm:mx-0 sm:px-0"
  style={{ animationDelay: ".52s" }}
>
  <div
    className="
      flex flex-nowrap gap-2 overflow-x-auto pb-2
      snap-x snap-proximity
      [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
      sm:flex-wrap sm:overflow-visible sm:pb-0
    "
  >
    {centresOfExcellence.map((centre) => (
      <Link
        key={centre.slug}
        href={`/centres-of-excellence/${centre.slug}`}
        className="group inline-flex shrink-0 snap-start items-center gap-2 whitespace-nowrap rounded-full border border-[#1D82A6]/15 bg-white/75 py-1.5 pl-1.5 pr-3.5 text-[11px] font-semibold text-[#0B3446] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C8952E]/50 hover:bg-white hover:shadow-[0_10px_24px_-10px_rgba(200,149,46,.6)]"
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EDF6FB] transition-colors duration-300 group-hover:bg-[#FFF3D6] [&>svg]:h-4 [&>svg]:w-4">
          <CentreIcon slug={centre.slug} active={false} />
        </span>
        {centre.shortName || centre.title}
      </Link>
    ))}
  </div>
</nav>

          {/* Trust strip */}
          <ul
            className="cx-rise mt-6 flex flex-wrap gap-x-7 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0E526B]/70"
            style={{ animationDelay: ".62s" }}
          >
            {["Specialist-led", "Advanced technology", "Patient-first"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#C8952E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* =============== RIGHT — showcase =============== */}

        {/* Desktop: tilted wall of two counter-scrolling columns */}
        <div className="cx-pause relative hidden h-[520px] lg:block" aria-hidden="true">
          {/* gold orbit hairlines behind the wall */}
          <div className="absolute left-1/2 top-1/2 h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#C8952E]/25" />
          <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#1D82A6]/25" />

          <div
            className="absolute inset-0 flex justify-center gap-4 [mask-image:linear-gradient(to_bottom,transparent,black_14%,black_86%,transparent)]"
            style={{ transform: "rotate(-7deg) scale(0.92)" }}
          >
            <MarqueeColumn items={COL_A} />
            <MarqueeColumn items={COL_B} reverse className="mt-12" />
          </div>

          {/* floating glass badges */}
          <div className="cx-float absolute left-0 top-[22%] z-10 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-[0_20px_50px_-15px_rgba(6,32,43,.35)]">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#F8DE94] to-[#C8952E] font-serif text-base italic text-[#3A2B0A]">
              {pad(TOTAL)}
            </span>
            <div>
              <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#0E526B]/70">Specialised</div>
              <div className="text-[13px] font-bold text-[#06202B]">Centres of Care</div>
            </div>
          </div>

          <div
            className="cx-float absolute bottom-[14%] right-0 z-10 rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-[0_20px_50px_-15px_rgba(6,32,43,.35)]"
            style={{ animationDelay: "-3s" }}
          >
            <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#0E526B]/70">Apollo JBP Hospitals</div>
            <div className="mt-0.5 font-serif text-[15px] italic text-[#06202B]">For a Healthier Tomorrow</div>
          </div>
        </div>

        {/* Mobile / tablet: single horizontal marquee, full-bleed */}
        <div
          className="cx-pause relative -mx-6 lg:hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
          aria-hidden="true"
        >
          <div className="cx-x flex w-max will-change-transform">
            <MobileRow />
            <MobileRow />
          </div>
        </div>
      </div>

      {/* soft bottom fade into the journey section */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-b from-transparent to-[#EDF6FB]" />
    </section>
  );
}

/* ------------------------------------------------ */

function MarqueeColumn({ items, reverse = false, className = "" }) {
  return (
    <div className={`w-[185px] overflow-visible ${className}`}>
      <div
        className="cx-y flex flex-col will-change-transform"
        style={reverse ? { animationDirection: "reverse" } : undefined}
      >
        <ColumnCopy items={items} />
        <ColumnCopy items={items} />
      </div>
    </div>
  );
}

function ColumnCopy({ items }) {
  return (
    <div className="flex flex-col gap-4 pb-4">
      {items.map((centre) => (
        <CentreTile key={centre.slug} centre={centre} className="h-[210px] w-[185px]" sizes="185px" />
      ))}
    </div>
  );
}

function MobileRow() {
  return (
    <div className="flex gap-4 pr-4">
      {centresOfExcellence.map((centre) => (
        <CentreTile key={centre.slug} centre={centre} className="h-[210px] w-[160px]" sizes="160px" />
      ))}
    </div>
  );
}

function CentreTile({ centre, className = "", sizes }) {
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-3xl border border-white/70 bg-[#dcecf3] shadow-[0_22px_45px_-18px_rgba(6,32,43,.45)] ${className}`}
    >
      <Image
        src={centre.image}
        alt=""
        fill
        sizes={sizes}
        quality={60}
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#06202B]/85 via-[#06202B]/10 to-transparent" />

      <div className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/95">
        <CentreIcon slug={centre.slug} active={false} />
      </div>

      <span className="absolute right-4 top-4 font-serif text-sm italic text-white/90">
        {centre.id}
      </span>

      <div className="absolute inset-x-4 bottom-4">
        <div className="mb-1 flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.22em] text-[#F6D98A]">
          <span className="h-px w-4 bg-[#F6D98A]" />
          {centre.eyebrow}
        </div>
        <div className="font-serif text-[16px] leading-tight text-white">{centre.title}</div>
      </div>
    </div>
  );
}
