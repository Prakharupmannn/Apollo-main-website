// "use client";
// import { useRef, useState } from "react";
// import { ChevronLeft, ChevronRight, Play } from "lucide-react";
// import { getYouTubeId } from "@/lib/youtube";

// export type Podcast = { id: string; title: string; youtube: string };

// export default function PodcastPlayer({ podcasts }: { podcasts?: Podcast[] }) {
//   const items = (podcasts ?? [])
//     .map((p) => ({ ...p, vid: getYouTubeId(p.youtube) }))
//     .filter((p): p is Podcast & { vid: string } => !!p.vid);

//   const [activeId, setActiveId] = useState(items[0]?.id);
//   const [playing, setPlaying] = useState(false);
//   const rail = useRef<HTMLDivElement>(null);

//   if (!items.length) return null; // nothing to show → render nothing

//   const active = items.find((p) => p.id === activeId) ?? items[0];
//   const scroll = (dir: 1 | -1) =>
//     rail.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

//   return (
//     <div className="w-full">
//       {/* Main player */}
//       <div className="relative aspect-video overflow-hidden rounded-2xl bg-slate-100 shadow-lg">
//         {playing ? (
//           <iframe
//             key={active.vid}
//             className="absolute inset-0 h-full w-full"
//             src={`https://www.youtube-nocookie.com/embed/${active.vid}?autoplay=1&rel=0&modestbranding=1`}
//             title={active.title}
//             allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
//             allowFullScreen
//           />
//         ) : (
//           <button
//             onClick={() => setPlaying(true)}
//             className="group absolute inset-0"
//             aria-label={`Play ${active.title}`}
//           >
//             {/* eslint-disable-next-line @next/next/no-img-element */}
//             <img
//               src={`https://i.ytimg.com/vi/${active.vid}/hqdefault.jpg`}
//               alt={active.title}
//               className="h-full w-full object-cover"
//             />
//             <span className="absolute inset-0 flex items-center justify-center bg-black/10 transition group-hover:bg-black/20">
//               <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-xl transition group-hover:scale-110">
//                 <Play className="ml-1 h-7 w-7 text-sky-700" fill="currentColor" />
//               </span>
//             </span>
//           </button>
//         )}
//       </div>

//       <h3 className="mt-3 text-base font-semibold text-slate-900">{active.title}</h3>

//       {/* Scroller (only when more than one video) */}
//       {items.length > 1 && (
//         <div className="relative mt-4">
//           <button onClick={() => scroll(-1)} aria-label="Previous"
//             className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow md:block">
//             <ChevronLeft className="h-5 w-5" />
//           </button>

//           <div ref={rail}
//             className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
//             {items.map((p) => (
//               <button key={p.id}
//                 onClick={() => { setActiveId(p.id); setPlaying(true); }}
//                 className={`w-64 shrink-0 snap-start overflow-hidden rounded-xl border text-left transition ${
//                   p.id === active.id ? "border-sky-500 ring-2 ring-sky-200" : "border-slate-200 hover:border-sky-300"
//                 }`}>
//                 {/* eslint-disable-next-line @next/next/no-img-element */}
//                 <img src={`https://i.ytimg.com/vi/${p.vid}/mqdefault.jpg`} alt=""
//                   className="aspect-video w-full object-cover" loading="lazy" />
//                 <p className="line-clamp-2 p-2.5 text-sm font-medium text-slate-800">{p.title}</p>
//               </button>
//             ))}
//           </div>

//           <button onClick={() => scroll(1)} aria-label="Next"
//             className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 shadow md:block">
//             <ChevronRight className="h-5 w-5" />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Mic2, Play } from "lucide-react";
import { getYouTubeId } from "../../lib/youtube"

export type Podcast = { id: string; title: string; youtube: string };

type Props = {
  podcasts?: Podcast[];
  title?: string;
  eyebrow?: string;
  /** "section" = full premium block (doctor page), "compact" = for modal */
  variant?: "section" | "compact";
};

/* Big thumbnail: tries maxres first, falls back to hq */
function Thumb({ vid, className = "" }: { vid: string; className?: string }) {
  const [src, setSrc] = useState(`https://i.ytimg.com/vi/${vid}/maxresdefault.jpg`);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      className={className}
      onError={() => setSrc(`https://i.ytimg.com/vi/${vid}/hqdefault.jpg`)}
    />
  );
}

function Equalizer() {
  return (
    <span className="flex h-4 items-end gap-[3px]" aria-hidden>
      {[0, 0.2, 0.4].map((d) => (
        <span
          key={d}
          className="h-full w-[3px] origin-bottom rounded-full bg-sky-600"
          style={{ animation: `pc-eq 0.9s ease-in-out ${d}s infinite` }}
        />
      ))}
    </span>
  );
}

export default function PodcastPlayer({
  podcasts,
  title = "Podcasts & Talks",
  eyebrow = "Apollo Podcast Series",
  variant = "section",
}: Props) {
  const items = (podcasts ?? [])
    .map((p) => ({ ...p, vid: getYouTubeId(p.youtube) }))
    .filter((p): p is Podcast & { vid: string } => !!p.vid);

  const [activeId, setActiveId] = useState(items[0]?.id);
  const [playing, setPlaying] = useState(false);
  const rail = useRef<HTMLDivElement>(null);

  if (!items.length) return null;

  const isSection = variant === "section";
  const multi = items.length > 1;
  const idx = Math.max(0, items.findIndex((p) => p.id === activeId));
  const active = items[idx];
  const ep = (i: number) => String(i + 1).padStart(2, "0");

  const scroll = (dir: 1 | -1) =>
    rail.current?.scrollBy({ left: dir * 260, top: dir * 160, behavior: "smooth" });

  const pick = (id: string) => {
    setActiveId(id);
    setPlaying(true);
  };

  return (
    <section
      className={isSection ? "mx-auto w-full max-w-7xl " : "w-full"}
    >
      <style>{`@keyframes pc-eq{0%,100%{transform:scaleY(.3)}50%{transform:scaleY(1)}}`}</style>

      <div
        className={
          isSection
            ? "relative overflow-hidden rounded-[2rem] border border-sky-100 bg-gradient-to-br from-white via-sky-50/70 to-indigo-50/60 p-5 shadow-[0_30px_80px_-30px_rgba(2,132,199,0.35)] sm:p-8 lg:p-10"
            : ""
        }
      >
        {/* soft decorative glows */}
        {isSection && (
          <>
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sky-200/50 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-200/40 blur-3xl" />
          </>
        )}

        {/* Header */}
        {isSection && (
          <div className="relative mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 backdrop-blur">
                <Mic2 className="h-3.5 w-3.5" /> {eyebrow}
              </span>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-3xl">
                {title}
              </h2>
            </div>
            <p className="text-sm font-medium text-slate-500">
              {items.length} {items.length === 1 ? "episode" : "episodes"}
            </p>
          </div>
        )}

        <div
          className={`relative grid gap-6 lg:gap-8 ${
            multi && isSection ? "lg:grid-cols-[1.7fr_1fr]" : ""
          }`}
        >
          {/* ───────── Player (album cover) ───────── */}
          <div className={!multi && isSection ? "mx-auto w-full max-w-4xl" : ""}>
            <div className="relative">
              {/* ambient glow from the video art */}
              <Thumb
                key={`glow-${active.vid}`}
                vid={active.vid}
                className="pointer-events-none absolute inset-x-6 -bottom-4 top-6 h-[85%] w-[calc(100%-3rem)] scale-100 rounded-3xl object-cover opacity-50 blur-2xl"
              />

              <div className="relative aspect-video overflow-hidden rounded-3xl bg-slate-100 shadow-2xl ring-1 ring-black/5">
                {playing ? (
                  <iframe
                    key={active.vid}
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${active.vid}?autoplay=1&rel=0&modestbranding=1`}
                    title={active.title}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                  />
                ) : (
                  <button
                    onClick={() => setPlaying(true)}
                    aria-label={`Play ${active.title}`}
                    className="group absolute inset-0 text-left"
                  >
                    <Thumb
                      key={active.vid}
                      vid={active.vid}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold tracking-wide text-sky-700 shadow backdrop-blur">
                      EP {ep(idx)}
                    </span>

                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="relative flex h-20 w-20 items-center justify-center">
                        <span className="absolute inset-0 animate-ping rounded-full bg-white/50" />
                        <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-2xl transition group-hover:scale-110">
                          <Play className="ml-1 h-8 w-8 text-sky-700" fill="currentColor" />
                        </span>
                      </span>
                    </span>

                    <span className="absolute bottom-4 left-5 right-5 line-clamp-2 text-lg font-semibold text-white drop-shadow sm:text-xl">
                      {active.title}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* meta row */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600">
                  {playing ? "Now playing" : "Featured"} · Episode {ep(idx)}
                </p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900 sm:text-xl">
                  {active.title}
                </h3>
              </div>
              <a
                href={active.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-sky-300 hover:text-sky-700"
              >
                Watch on YouTube <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* ───────── Episodes tracklist ───────── */}
          {multi && (
            <div className="min-w-0">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Episodes
                </h4>
                <div className="flex gap-2">
                  <button
                    onClick={() => scroll(-1)}
                    aria-label="Previous episodes"
                    className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:border-sky-300 hover:text-sky-700"
                  >
                    <ChevronLeft className={`h-4 w-4 ${isSection ? "lg:rotate-90" : ""}`} />
                  </button>
                  <button
                    onClick={() => scroll(1)}
                    aria-label="Next episodes"
                    className="rounded-full border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:border-sky-300 hover:text-sky-700"
                  >
                    <ChevronRight className={`h-4 w-4 ${isSection ? "lg:rotate-90" : ""}`} />
                  </button>
                </div>
              </div>

              <div
                ref={rail}
                className={`flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
                  isSection
                    ? "lg:max-h-[27rem] lg:snap-y lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto lg:pb-0"
                    : ""
                }`}
              >
                {items.map((p, i) => {
                  const isActive = p.id === active.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => pick(p.id)}
                      className={`group flex w-64 shrink-0 snap-start flex-col overflow-hidden rounded-2xl border bg-white/80 text-left backdrop-blur transition ${
                        isSection ? "lg:w-full lg:flex-row lg:items-center lg:gap-3 lg:p-2.5" : ""
                      } ${
                        isActive
                          ? "border-sky-400 shadow-lg shadow-sky-100 ring-2 ring-sky-100"
                          : "border-slate-200 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
                      }`}
                    >
                      <div
                        className={`relative aspect-video w-full overflow-hidden ${
                          isSection ? "lg:w-36 lg:shrink-0 lg:rounded-xl" : ""
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`https://i.ytimg.com/vi/${p.vid}/mqdefault.jpg`}
                          alt=""
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition group-hover:opacity-100">
                          <Play className="h-6 w-6 text-white" fill="currentColor" />
                        </span>
                      </div>

                      <div className="flex min-w-0 flex-1 items-start gap-3 p-3 lg:p-0">
                        <div className="min-w-0 flex-1">
                          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-sky-600">
                            {isActive && playing ? <Equalizer /> : null}
                            Episode {ep(i)}
                          </p>
                          <p className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-slate-900">
                            {p.title}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}