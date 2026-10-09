import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Activity, ShieldCheck, Bone, Droplets, Heart, Brain, Microscope, Stethoscope, Baby,
  Syringe, Sparkles, Ear, Eye, Smile, Apple,
  ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Award, Phone, HelpCircle,
  BadgeCheck, HeartPulse, CalendarCheck, ClipboardList, Zap, MapPin, Clock, Users,
} from "lucide-react";
import specialitiesData from "../../../data/ourSpecialities";
import { getDoctorsBySpeciality } from "../../../data/doctors";
import { ScrollProgress, Reveal, Counter, Tilt, FaqAccordion, DoctorCard, NoDoctors } from "./Effects";

const iconMap = {
  pulse: Activity, shield: ShieldCheck, bone: Bone, kidney: Droplets, heart: Heart,
  brain: Brain, cancer: Microscope, microscope: Microscope, stethoscope: Stethoscope,
  baby: Baby, syringe: Syringe, sparkles: Sparkles, ear: Ear, eye: Eye, smile: Smile,
  apple: Apple, activity: Activity, stomach: Microscope,
};

const gold = { background: "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)" };
const teal = { background: "linear-gradient(135deg, #1D82A6, #0A5F7A)" };
const photoBg = { background: "linear-gradient(135deg, #EAF6FC, #FFF7E8)" };

const css = `
@keyframes floaty { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
@keyframes shimmerMove { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
@keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
@keyframes ringPulse { 0%{box-shadow:0 0 0 0 rgba(200,149,46,.55)} 70%{box-shadow:0 0 0 18px rgba(200,149,46,0)} 100%{box-shadow:0 0 0 0 rgba(200,149,46,0)} }
@keyframes spinSlow { to{transform:rotate(360deg)} }
@keyframes textShine { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
@keyframes heroIn { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:none} }
.anim-float{animation:floaty 6s ease-in-out infinite}
.anim-float-slow{animation:floaty 9s ease-in-out infinite}
.anim-shimmer{animation:shimmerMove 6s ease infinite}
.anim-marquee{animation:marquee 32s linear infinite}
.anim-marquee:hover{animation-play-state:paused}
.anim-ring{animation:ringPulse 2.2s infinite}
.anim-spin{animation:spinSlow 22s linear infinite}
.text-shine{background:linear-gradient(90deg,#C8952E,#F6D98A,#C8952E,#F6D98A);background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;animation:textShine 4s linear infinite}
.hero-in{animation:heroIn .9s cubic-bezier(.2,.7,.2,1) both}
@media (prefers-reduced-motion:reduce){.anim-float,.anim-float-slow,.anim-shimmer,.anim-marquee,.anim-ring,.anim-spin,.text-shine,.hero-in{animation:none!important}}
`;

export async function generateStaticParams() {
  return specialitiesData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = specialitiesData.find((x) => x.slug === slug);
  if (!s) return {};
  return {
    title: `${s.name} in Jabalpur | Apollo JBP Hospitals`,
    description: s.intro,
  };
}

export default async function SpecialityDetailPage({ params }) {
  const { slug } = await params;
  const s = specialitiesData.find((x) => x.slug === slug);
  if (!s) notFound();

  const Icon = iconMap[s.icon] || Activity;
  const doctors = getDoctorsBySpeciality(s.slug);

  const sameCategory = specialitiesData.filter((x) => x.slug !== s.slug && x.category === s.category);
  const rest = specialitiesData.filter((x) => x.slug !== s.slug && x.category !== s.category);
  const related = [...sameCategory, ...rest].slice(0, 3);

  const why = [
    "Senior consultants with global clinical training",
    "Advanced diagnostics and modern operation theatres",
    "Personalised care plans with transparent guidance",
    "24/7 emergency and follow-up support",
  ];

  const steps = [
    { icon: CalendarCheck, t: "Book Your Slot", d: "Call us or book online and choose a time that suits you." },
    { icon: Stethoscope, t: "Meet the Specialist", d: `Get a detailed ${s.name} consultation and evaluation.` },
    { icon: ClipboardList, t: "Diagnosis & Plan", d: "Advanced tests followed by a clear, personalised care plan." },
    { icon: HeartPulse, t: "Treatment & Follow-up", d: "Expert treatment with dedicated recovery support." },
  ];

  const faqs = [
    { q: `How do I book a ${s.name} consultation?`, a: "Use the Book Appointment button or call our helpline. Priority slots are available." },
    { q: `Is emergency ${s.name} care available?`, a: "Yes, our emergency team and specialists are available round the clock." },
    { q: "Do I need to carry previous reports?", a: "Yes, please carry earlier prescriptions, test reports and scans so the doctor can plan better." },
  ];

  const ticker = [...s.services, ...s.services, ...s.services, ...s.services];

  return (
    <main
      className="relative min-h-screen pt-32 pb-24 overflow-hidden text-slate-900"
      style={{ background: "linear-gradient(180deg, #EAF6FC 0%, #F8FBFD 28%, #FFFBF1 62%, #EAF6FC 100%)" }}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <ScrollProgress />

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="anim-float-slow absolute -top-40 -left-32 w-[560px] h-[560px] rounded-full opacity-60" style={{ background: "radial-gradient(circle, #a9dcf0, transparent 70%)" }} />
        <div className="anim-float absolute top-[16%] -right-40 w-[500px] h-[500px] rounded-full opacity-55" style={{ background: "radial-gradient(circle, #f6d98a, transparent 70%)" }} />
        <div className="anim-float-slow absolute top-[55%] -left-40 w-[460px] h-[460px] rounded-full opacity-40" style={{ background: "radial-gradient(circle, #bfe3f2, transparent 70%)" }} />
        <div className="anim-float absolute bottom-0 right-0 w-[440px] h-[440px] rounded-full opacity-45" style={{ background: "radial-gradient(circle, #f3dfa8, transparent 70%)" }} />
        <div
          className="absolute inset-0 opacity-[0.28]"
          style={{
            backgroundImage: "radial-gradient(#1D82A6 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(ellipse 85% 45% at 50% 10%, black 15%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 85% 45% at 50% 10%, black 15%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top bar */}
        <div className="hero-in flex items-center justify-between flex-wrap gap-3">
          <Link
            href="/ourspecialities"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0E526B] hover:text-white hover:bg-[#0E526B] hover:-translate-x-1 transition-all bg-white px-5 py-2.5 rounded-full border border-[#1D82A6]/25 shadow-md"
          >
            <ArrowLeft className="w-4 h-4" /> All Specialities
          </Link>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-wider bg-white border border-[#C8952E]/30 text-[#0E526B] shadow-md">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {s.category}
          </span>
        </div>

        {/* Hero */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 hero-in" style={{ animationDelay: "120ms" }}>
            <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-wider px-4 py-2 rounded-full text-[#3A2B0A] shadow-md mb-5" style={gold}>
              <Award className="w-3.5 h-3.5" /> {s.badge}
            </span>

            <div className="flex items-center gap-4 mb-4">
              <span className="anim-ring w-14 h-14 rounded-2xl flex items-center justify-center text-[#F6D98A] shadow-xl" style={teal}>
                <Icon className="w-7 h-7" />
              </span>
              <p className="text-sm font-bold text-[#C8952E]">{s.tagline}</p>
            </div>

            <h1 className="font-serif-apollo text-4xl sm:text-5xl lg:text-[3.4rem] font-black tracking-tight text-[#0B3446] leading-[1.08] mb-3">
              <span className="text-shine">{s.name}</span>
            </h1>
            <div className="h-1.5 w-24 rounded-full mb-5" style={{ background: "linear-gradient(90deg,#1D82A6,#F6D98A,#C8952E)" }} />
            <p className="text-slate-600 leading-relaxed mb-7">{s.intro}</p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                href="/contact"
                className="anim-ring inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-black text-[#3A2B0A] shadow-[0_12px_32px_rgba(200,149,46,0.4)] hover:-translate-y-0.5 transition-all"
                style={gold}
              >
                <Phone className="w-4 h-4" /> Consult Specialist
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-bold text-[#0E526B] bg-white border border-[#1D82A6]/25 shadow-md hover:bg-[#1D82A6] hover:text-white transition-all"
              >
                Book Online <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white border border-[#1D82A6]/15 shadow-md p-4 hover:-translate-y-1 hover:shadow-xl transition-all">
                <p className="text-3xl font-black text-[#0B3446]">
                  <Counter value={s.stat} />
                </p>
                <p className="text-xs font-semibold text-slate-500">{s.statLabel}</p>
              </div>
              <div className="rounded-2xl bg-white border border-[#C8952E]/25 shadow-md p-4 flex items-center gap-3 hover:-translate-y-1 hover:shadow-xl transition-all">
                <BadgeCheck className="w-8 h-8 text-[#1D82A6] shrink-0" />
                <p className="text-xs font-black text-[#0B3446]">Apollo Verified Specialists</p>
              </div>
            </div>
          </div>

          {/* Framed clear photo */}
          <div className="lg:col-span-7 relative hero-in" style={{ animationDelay: "260ms" }}>
            <div className="absolute -inset-10 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(246,217,138,0.55), rgba(169,220,240,0.35) 45%, transparent 72%)", filter: "blur(30px)" }} />
            <div className="anim-float absolute -top-6 -right-6 w-40 h-40 opacity-60 pointer-events-none" style={{ backgroundImage: "radial-gradient(#C8952E 1.5px, transparent 1.5px)", backgroundSize: "14px 14px" }} />
            <div className="anim-float-slow absolute -bottom-6 -left-6 w-40 h-40 opacity-50 pointer-events-none" style={{ backgroundImage: "radial-gradient(#1D82A6 1.5px, transparent 1.5px)", backgroundSize: "14px 14px" }} />
            <div className="anim-spin absolute -top-10 -left-10 w-24 h-24 rounded-full border-2 border-dashed border-[#C8952E]/50 pointer-events-none" />

            <Tilt max={4}>
              <div
                className="anim-shimmer relative rounded-[2.1rem] p-[3px] shadow-[0_35px_90px_rgba(11,52,70,0.28)]"
                style={{ background: "linear-gradient(135deg,#F6D98A,#C8952E,#FFF3C4,#C8952E,#1D82A6,#F6D98A)", backgroundSize: "300% 300%" }}
              >
                <div className="rounded-[calc(2.1rem-3px)] bg-white p-3 sm:p-4">
                  <div className="group rounded-[1.5rem] overflow-hidden ring-1 ring-slate-200/70" style={photoBg}>
                    <img src={s.image} alt={s.name} className="block w-full h-[320px] sm:h-[440px] object-cover group-hover:scale-[1.04] transition-transform duration-[900ms]" />
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3 px-2 pb-1">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={gold}>
                        <HeartPulse className="w-4 h-4 text-[#3A2B0A]" />
                      </span>
                      <p className="text-xs font-black text-[#0B3446] truncate">Apollo JBP Hospitals, Jabalpur</p>
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#EDF6FB] text-[#0E526B] shrink-0">
                      Centre of Excellence
                    </span>
                  </div>
                </div>
              </div>
            </Tilt>
          </div>
        </section>

        {/* Services ticker */}
        <div className="relative overflow-hidden rounded-full bg-gradient-to-r from-[#0B3446] via-[#0E526B] to-[#0B3446] py-4 shadow-xl">
          <div className="anim-marquee flex w-max gap-10 whitespace-nowrap">
            {ticker.map((t, i) => (
              <span key={i} className="inline-flex items-center gap-10 text-sm font-bold text-white/90">
                {t}
                <Sparkles className="w-4 h-4 text-[#F6D98A]" />
              </span>
            ))}
          </div>
        </div>

        {/* Quick info strip */}
        <Reveal>
          <section className="p-[2px] rounded-[2rem] shadow-xl" style={{ background: "linear-gradient(90deg, rgba(29,130,166,.5), #F6D98A, rgba(200,149,46,.6))" }}>
            <div className="bg-white rounded-[calc(2rem-2px)] p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              {[
                { icon: Zap, l: "Appointments", v: "Priority Slots Available", c: "#C8952E", bg: "#FFF7E8" },
                { icon: Clock, l: "Emergency", v: "24/7 Specialist Support", c: "#059669", bg: "#ECFDF5" },
                { icon: MapPin, l: "Location", v: "Apollo JBP, Jabalpur", c: "#E11D48", bg: "#FFF1F2" },
              ].map((m, i) => (
                <div key={i} className="group flex items-center gap-4 pt-4 sm:pt-0 sm:first:pl-0 sm:pl-6">
                  <div className="p-3.5 rounded-2xl shrink-0 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-transform" style={{ background: m.bg, color: m.c }}>
                    <m.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-slate-400 font-black tracking-wider">{m.l}</p>
                    <p className="text-sm font-black text-[#0B3446]">{m.v}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        {/* Services */}
        <section>
          <Reveal className="mb-7">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#C8952E] mb-2">What We Offer</p>
            <h2 className="font-serif-apollo text-2xl sm:text-4xl font-black text-[#0B3446]">Services & Treatments</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {s.services.map((sv, i) => (
              <Reveal key={sv} delay={i * 90}>
                <div className="group flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-white to-[#FFFBF1] border border-slate-100 shadow-md hover:border-[#C8952E]/60 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300">
                  <span className="w-11 h-11 rounded-full flex items-center justify-center shrink-0 text-xs font-black text-[#3A2B0A] group-hover:rotate-[360deg] transition-transform duration-700" style={gold}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm font-bold text-[#0B3446] flex-1">{sv}</p>
                  <CheckCircle2 className="w-5 h-5 text-[#1D82A6] shrink-0 group-hover:scale-125 transition-transform" />
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Doctors */}
        <section>
          <Reveal className="text-center mb-10">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#1D82A6]/25 text-[#0E526B] text-xs font-bold shadow-md mb-4">
              <Users className="w-4 h-4 text-[#C8952E]" />
              {doctors.length > 0 ? `${doctors.length} Expert ${doctors.length > 1 ? "Doctors" : "Doctor"}` : "Expert Team"}
            </span>
            <h2 className="font-serif-apollo text-3xl sm:text-4xl font-black text-[#0B3446]">
              Meet Our <span className="text-shine">{s.name}</span> Specialists
            </h2>
            <div className="h-1.5 w-24 rounded-full mx-auto mt-4" style={{ background: "linear-gradient(90deg,#1D82A6,#F6D98A,#C8952E)" }} />
          </Reveal>

          {doctors.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((d, i) => (
                <Reveal key={d.id} delay={i * 120}>
                  <DoctorCard doctor={d} />
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <NoDoctors name={s.name} />
            </Reveal>
          )}
        </section>

        {/* Steps */}
        <section>
          <Reveal className="text-center mb-10">
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#C8952E] mb-2">Simple Process</p>
            <h2 className="font-serif-apollo text-2xl sm:text-4xl font-black text-[#0B3446]">Your Care Journey</h2>
          </Reveal>
          <div className="relative">
            <div className="hidden lg:block absolute top-14 left-[12%] right-[12%] h-[3px] rounded-full opacity-60" style={{ background: "linear-gradient(90deg,#1D82A6,#F6D98A,#C8952E)" }} />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {steps.map((st, i) => (
                <Reveal key={st.t} delay={i * 130}>
                  <div className="group relative h-full p-[2px] rounded-[1.6rem] bg-gradient-to-br from-[#1D82A6]/40 via-white to-[#C8952E]/45 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                    <div className="bg-white rounded-[calc(1.6rem-2px)] p-6 h-full">
                      <span className="absolute top-4 right-5 text-5xl font-black text-[#1D82A6]/10 group-hover:text-[#C8952E]/25 transition-colors">0{i + 1}</span>
                      <span className="w-14 h-14 rounded-2xl flex items-center justify-center text-[#F6D98A] shadow-lg mb-4 group-hover:scale-110 group-hover:-rotate-6 transition-transform" style={teal}>
                        <st.icon className="w-7 h-7" />
                      </span>
                      <h3 className="font-black text-[#0B3446] mb-1.5">{st.t}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{st.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why + FAQ */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Reveal>
            <div className="relative h-full rounded-[1.85rem] overflow-hidden bg-gradient-to-br from-[#0A5F7A] via-[#0E526B] to-[#0B3446] text-white p-8 shadow-2xl">
              <div className="anim-float absolute -top-16 -right-16 w-60 h-60 rounded-full opacity-25" style={{ background: "radial-gradient(circle, #F6D98A, transparent 70%)" }} />
              <div className="anim-float-slow absolute -bottom-20 -left-16 w-56 h-56 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #6ec6e6, transparent 70%)" }} />
              <h2 className="relative font-serif-apollo text-xl sm:text-2xl font-black text-[#F6D98A] flex items-center gap-2.5 mb-5">
                <Award className="w-6 h-6" /> Why Choose Apollo JBP
              </h2>
              <ul className="relative space-y-3">
                {why.map((w) => (
                  <li key={w} className="flex items-start gap-3 text-sm bg-white/10 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm hover:bg-white/20 hover:translate-x-1 transition-all">
                    <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" /> {w}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="h-full p-[2px] rounded-[1.85rem] bg-gradient-to-br from-[#1D82A6]/40 via-white to-[#C8952E]/45 shadow-lg">
              <div className="bg-white rounded-[calc(1.85rem-2px)] p-8 space-y-4 h-full">
                <h2 className="font-serif-apollo text-xl sm:text-2xl font-black text-[#0B3446] flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#EDF6FB] flex items-center justify-center shrink-0">
                    <HelpCircle className="w-5 h-5 text-[#1D82A6]" />
                  </span>
                  Frequently Asked Questions
                </h2>
                <FaqAccordion faqs={faqs} />
              </div>
            </div>
          </Reveal>
        </section>

        {/* Related */}
        <section>
          <Reveal className="flex items-end justify-between flex-wrap gap-3 mb-7">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#C8952E] mb-2">Related Care</p>
              <h2 className="font-serif-apollo text-2xl sm:text-4xl font-black text-[#0B3446]">Other Specialities</h2>
            </div>
            <Link href="/ourspecialities" className="inline-flex items-center gap-2 text-sm font-black text-[#1D82A6] hover:gap-3 transition-all">
              View all departments <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((o, i) => {
              const OIcon = iconMap[o.icon] || Activity;
              return (
                <Reveal key={o.slug} delay={i * 110}>
                  <Link
                    href={`/ourspecialities/${o.slug}`}
                    className="group block p-[2px] rounded-[1.6rem] bg-gradient-to-br from-[#1D82A6]/40 via-white to-[#C8952E]/50 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className="bg-white rounded-[calc(1.6rem-2px)] overflow-hidden">
                      <div className="relative overflow-hidden" style={photoBg}>
                        <img src={o.image} alt={o.name} className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-700" />
                        <span className="absolute top-3 left-3 w-10 h-10 rounded-xl flex items-center justify-center text-[#F6D98A] border-2 border-white shadow-lg" style={teal}>
                          <OIcon className="w-5 h-5" />
                        </span>
                      </div>
                      <div className="p-5 flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-black text-[#0B3446] truncate">{o.name}</p>
                          <p className="text-xs font-semibold text-[#C8952E] truncate">{o.tagline}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-[#1D82A6] shrink-0 group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <Reveal>
          <section className="relative rounded-[2rem] overflow-hidden p-8 sm:p-14 text-white text-center shadow-2xl bg-gradient-to-br from-[#1D82A6] via-[#0E526B] to-[#0B3446]">
            <div className="anim-float absolute -top-16 -right-16 w-72 h-72 rounded-full opacity-30" style={{ background: "radial-gradient(circle, #F6D98A, transparent 70%)" }} />
            <div className="anim-float-slow absolute -bottom-20 -left-16 w-60 h-60 rounded-full opacity-20" style={{ background: "radial-gradient(circle, #6ec6e6, transparent 70%)" }} />
            <div className="anim-spin absolute top-6 left-8 w-20 h-20 rounded-full border-2 border-dashed border-[#F6D98A]/40" />
            <h3 className="relative font-serif-apollo text-2xl sm:text-4xl font-black mb-3">
              Book your <span className="text-[#F6D98A]">{s.name}</span> consultation today
            </h3>
            <p className="relative text-sm sm:text-base text-slate-100 mb-7 max-w-xl mx-auto">
              Prior appointments help you avoid waiting queues. Our care team will guide you at every step.
            </p>
            <Link
              href="/contact"
              className="anim-ring relative inline-flex items-center gap-2 px-9 py-4 rounded-full font-black text-sm text-[#3A2B0A] shadow-xl hover:-translate-y-1 hover:scale-105 transition-all"
              style={gold}
            >
              <Phone className="w-4 h-4" /> Book an Appointment
            </Link>
          </section>
        </Reveal>
      </div>
    </main>
  );
}