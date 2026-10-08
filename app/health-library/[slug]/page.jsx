import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  ExternalLink,
  FileText,
  ListChecks,
  Phone,
  Radio,
  Award,
  Stethoscope,
  Siren,
  Sparkles,
  HeartPulse,
} from "lucide-react";

import healthData from "../healthLibraryData.json";
import ShareButton from "./ShareButton";

const goldStyle = {
  background: "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
};

const articles = healthData.articles;

const slugify = (t) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const renderInline = (text) =>
  text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={i} className="font-bold text-[#0B3446]">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );

function buildBlocks(lines) {
  const blocks = [];
  let list = null;
  lines.forEach((l) => {
    if (l.startsWith("- ")) {
      if (!list) {
        list = { type: "list", items: [] };
        blocks.push(list);
      }
      list.items.push(l.slice(2));
      return;
    }
    list = null;
    if (l.startsWith("### ")) blocks.push({ type: "h", text: l.slice(4) });
    else {
      const m = l.match(/^(\d+)\.\s+(.*)$/);
      if (m) blocks.push({ type: "num", n: m[1], text: m[2] });
      else blocks.push({ type: "p", text: l });
    }
  });
  return blocks;
}

/* ───────── routes ───────── */

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const art = articles.find((a) => a.slug === slug);
  if (!art) return { title: "Article not found" };
  return {
    title: `${art.title} | Apollo JBP Hospitals`,
    description: art.metaDescription || art.excerpt,
    openGraph: {
      title: art.title,
      description: art.metaDescription || art.excerpt,
      images: art.image ? [art.image] : [],
    },
  };
}

export default async function HealthArticlePage({ params }) {
  const { slug } = await params;
  const art = articles.find((a) => a.slug === slug);
  if (!art) notFound();

  const isNews = art.type === "news";
  const blocks = buildBlocks(art.content || []);
  const headings = blocks.filter((b) => b.type === "h");
  const myCats = art.categories || [art.category];

  const related = articles
    .filter(
      (a) =>
        a.slug !== art.slug &&
        (a.categories || [a.category]).some((c) => myCats.includes(c)),
    )
    .concat(articles.filter((a) => a.slug !== art.slug))
    .filter((a, i, arr) => arr.findIndex((x) => x.slug === a.slug) === i)
    .slice(0, 3);

  return (
    <main className="relative min-h-screen bg-[#EDF6FB] text-slate-900 pt-28 sm:pt-36 xl:pt-40 pb-20 selection:bg-[#1D82A6] selection:text-white">
      {/* ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-[380px] h-[380px] rounded-full opacity-55 bg-[radial-gradient(circle,#bfe3f2,transparent_70%)]" />
        <div className="absolute top-1/3 -right-32 w-[340px] h-[340px] rounded-full opacity-50 bg-[radial-gradient(circle,#f3dfa8,transparent_70%)]" />
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage: "radial-gradient(#1D82A6 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(ellipse 80% 45% at 50% 20%, black 15%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 80% 45% at 50% 20%, black 15%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* back */}
        <Link
          href="/health-library"
          className="group inline-flex items-center gap-2 mb-5 text-xs font-extrabold uppercase tracking-[0.18em] text-[#0E526B]/80 hover:text-[#0E526B] transition"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition group-hover:-translate-x-1" />
          Health Library
        </Link>

        {/* HERO */}
        <header className="relative p-[1.5px] rounded-[1.75rem] sm:rounded-[2.25rem] bg-gradient-to-r from-[#1D82A6] via-[#F6D98A] to-[#C8952E] shadow-[0_25px_60px_rgba(10,95,122,0.28)]">
          <div className="relative rounded-[calc(1.75rem-1.5px)] sm:rounded-[calc(2.25rem-1.5px)] overflow-hidden bg-gradient-to-br from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] text-white">
            {art.image && (
              <img
                src={art.image}
                alt={art.title}
                className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B3446]/85 via-[#0B3446]/40 to-transparent" />
            <HeartPulse className="absolute -right-10 -bottom-10 w-72 h-72 opacity-[0.07] -rotate-12 pointer-events-none" />

            <div className="relative z-10 p-6 sm:p-10 lg:p-14 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span
                  className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-md ${
                    isNews
                      ? "bg-gradient-to-r from-rose-600 to-rose-500 text-white"
                      : "bg-gradient-to-l from-[#C8952E] to-[#F6D98A] text-[#0B3446]"
                  }`}
                >
                  {isNews ? <Radio className="w-3 h-3" /> : <Award className="w-3 h-3" />}
                  {isNews ? "Apollo News" : art.category}
                </span>
                {art.readTime && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25">
                    <Clock className="w-3 h-3 text-[#F6D98A]" />
                    {art.readTime}
                  </span>
                )}
                {art.date && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25">
                    <Calendar className="w-3 h-3 text-[#F6D98A]" />
                    {art.date}
                  </span>
                )}
              </div>

              <h1 className="font-serif-apollo text-2xl sm:text-4xl lg:text-5xl font-black leading-[1.2] drop-shadow-lg">
                {art.title}
              </h1>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-3 pr-2">
                  <div className="w-11 h-11 rounded-xl bg-white/15 border border-white/25 text-[#F6D98A] flex items-center justify-center">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold leading-tight">{art.author}</p>
                    <p className="text-[11px] text-white/75 leading-tight">{art.authorRole}</p>
                  </div>
                </div>
                <ShareButton />
              </div>
            </div>
          </div>
        </header>

        {/* BODY */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 items-start">
          {/* article */}
          <article className="min-w-0 rounded-[1.75rem] bg-white border border-[#1D82A6]/15 shadow-[0_15px_45px_rgba(10,95,122,0.1)] p-5 sm:p-9">
            <div className="space-y-4 text-slate-700 text-[15px] leading-7">
              {blocks.map((b, i) => {
                if (b.type === "h") {
                  return (
                    <h2
                      key={i}
                      id={slugify(b.text)}
                      className="scroll-mt-32 flex items-center gap-3 font-serif-apollo text-xl sm:text-2xl font-extrabold text-[#0B3446] pt-6 first:pt-0"
                    >
                      <span className="w-1.5 h-7 rounded-full bg-gradient-to-b from-[#1D82A6] to-[#C8952E] shrink-0" />
                      <span>{b.text}</span>
                    </h2>
                  );
                }
                if (b.type === "list") {
                  return (
                    <ul
                      key={i}
                      className={`grid gap-2.5 ${b.items.length > 6 ? "sm:grid-cols-2" : ""}`}
                    >
                      {b.items.map((it, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-[#EDF6FB]/80 to-white border border-[#1D82A6]/10 hover:border-[#C8952E]/40 transition-colors"
                        >
                          <CheckCircle2 className="w-5 h-5 text-[#1D82A6] shrink-0 mt-0.5" />
                          <span className="min-w-0 break-words text-sm leading-6">
                            {renderInline(it)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (b.type === "num") {
                  return (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl bg-[#EDF6FB]/70 border border-[#1D82A6]/10"
                    >
                      <span
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black text-[#3A2B0A] shrink-0"
                        style={goldStyle}
                      >
                        {b.n}
                      </span>
                      <span>{renderInline(b.text)}</span>
                    </div>
                  );
                }
                return (
                  <p key={i} className="break-words">
                    {renderInline(b.text)}
                  </p>
                );
              })}
            </div>

            {/* downloads */}
            {art.documents?.length > 0 && (
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {art.documents.map((d) => (
                  <a
                    key={d.url}
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-4 rounded-2xl border border-[#1D82A6]/20 bg-gradient-to-r from-white to-[#FFF9EC] hover:border-[#C8952E]/50 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    <span className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0A5F7A] to-[#2A8FAF] text-[#F6D98A] flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-extrabold text-[#0B3446] leading-snug group-hover:text-[#1D82A6] transition-colors">
                        {d.label}
                      </span>
                      <span className="text-[11px] text-slate-500 font-semibold">PDF document</span>
                    </span>
                    <Download className="w-4 h-4 text-[#C8952E] shrink-0" />
                  </a>
                ))}
              </div>
            )}

            {/* preview notice */}
            {art.partial && art.sourceUrl && (
              <div className="mt-8 p-5 rounded-2xl border border-[#C8952E]/30 bg-gradient-to-r from-[#FFF9EC] to-white">
                <p className="text-sm font-bold text-[#0B3446] leading-snug">
                  This is a summary of the article.
                </p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Read the complete article on the official Apollo JBP Hospitals website.
                </p>
                <a
                  href={art.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-extrabold text-[#3A2B0A] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  style={goldStyle}
                >
                  Read full article
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* tags */}
            {art.tags?.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
                <span className="text-xs font-extrabold text-[#0E526B]">Related Tags:</span>
                {art.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-3 py-1 rounded-full bg-[#EDF6FB] text-[#0E526B] border border-[#1D82A6]/20 font-semibold"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {/* CTA */}
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <Link
                href="/patientcare/appointment"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-[#3A2B0A] font-extrabold text-xs shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all"
                style={goldStyle}
              >
                Book Appointment
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/health-library"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl bg-[#EDF6FB] text-[#0E526B] border border-[#1D82A6]/25 font-extrabold text-xs hover:bg-white hover:shadow-md transition-all"
              >
                Back to Health Library
              </Link>
            </div>
          </article>

          {/* sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-36">
            {headings.length > 1 && (
              <div className="hidden lg:block rounded-3xl bg-white border border-[#1D82A6]/15 shadow-lg p-5">
                <div className="flex items-center gap-2 mb-4">
                  <ListChecks className="w-4 h-4 text-[#C8952E]" />
                  <h4 className="text-sm font-extrabold text-[#0B3446]">In this article</h4>
                </div>
                <nav className="space-y-1">
                  {headings.map((h) => (
                    <a
                      key={h.text}
                      href={`#${slugify(h.text)}`}
                      className="block px-3 py-2 rounded-xl text-xs font-bold text-[#0E526B] leading-snug hover:bg-[#EDF6FB] hover:text-[#1D82A6] transition-colors"
                    >
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            )}

            <div className="relative p-[1.5px] rounded-3xl bg-gradient-to-br from-red-500 via-red-600 to-[#0E526B] shadow-[0_10px_30px_rgba(239,68,68,0.3)]">
              <div className="relative rounded-[calc(1.5rem-1.5px)] overflow-hidden bg-gradient-to-b from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] p-5 text-white">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center shadow-lg mb-3">
                  <Siren className="w-5 h-5" />
                </div>
                <h4 className="font-extrabold text-base leading-snug">24/7 Emergency Care</h4>
                <p className="text-[11px] text-slate-100/90 mt-1 leading-relaxed">
                  Critical care, trauma & ambulance service always on standby.
                </p>
                <a
                  href="tel:1800-123-6666"
                  className="mt-4 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-red-500/25 hover:bg-red-600 border border-red-300/40 text-red-100 hover:text-white text-xs font-extrabold transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Call 1800-123-6666
                </a>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-tr from-[#0A5F7A] to-[#2A8FAF] p-5 text-white shadow-lg border border-[#F6D98A]/40">
              <Sparkles className="absolute -right-2 -top-2 w-20 h-20 text-white/10" />
              <h4 className="relative font-extrabold text-base leading-snug">Need Expert Advice?</h4>
              <p className="relative text-[11px] text-slate-100/90 mt-1 mb-4 leading-relaxed">
                Talk to an Apollo Jabalpur specialist about what you just read.
              </p>
              <Link
                href="/patientcare/appointment"
                className="relative w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-extrabold text-[#3A2B0A] shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all"
                style={goldStyle}
              >
                Consult Specialist
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </aside>
        </div>

        {/* related */}
        {related.length > 0 && (
          <section className="mt-14">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-1.5 h-6 rounded-full bg-gradient-to-b from-[#1D82A6] to-[#C8952E]" />
              <h3 className="font-serif-apollo text-xl sm:text-2xl font-black text-[#0B3446]">
                Keep Reading
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/health-library/${r.slug}`}
                  className="group relative p-[1.5px] rounded-[1.5rem] bg-gradient-to-br from-[#1D82A6]/50 via-white to-[#C8952E]/60 shadow-md hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
                >
                  <div className="h-full rounded-[calc(1.5rem-1.5px)] bg-white p-5 flex flex-col">
                    <span className="self-start text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#EDF6FB] text-[#0E526B] border border-[#1D82A6]/20">
                      {r.type === "news" ? "Apollo News" : r.category}
                    </span>
                    <h4 className="mt-3 font-serif-apollo text-base font-extrabold text-[#0B3446] leading-snug line-clamp-3 group-hover:text-[#1D82A6] transition-colors">
                      {r.title}
                    </h4>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-extrabold text-[#C8952E]">
                      Read
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}