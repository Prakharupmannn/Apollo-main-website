import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Award,
  UserCheck,
  Tag,
  HelpCircle,
  AlertCircle,
  Building2,
  Mail,
  Sparkles,
  ShieldCheck,
  Stethoscope,
  BadgeCheck,
  HeartPulse,
} from "lucide-react";
import eventsData from "../../../../data/eventsData";

const goldGradient = {
  background: "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
};

const goldBorder = {
  background:
    "linear-gradient(135deg, #F6D98A 0%, #C8952E 35%, #FFF3C4 55%, #C8952E 75%, #1D82A6 100%)",
};

export async function generateStaticParams() {
  return eventsData.map((event) => ({ slug: event.slug }));
}

export default async function EventDetailPage({ params }) {
  const { slug } = await params;

  const event = eventsData.find((e) => e.slug === slug);

  if (!event) notFound();

  const isPast = String(event.status).toLowerCase() === "past";
  const phoneNumber = event.organizer.phone.split("/")[0].trim();

  return (
    <main
      className="relative min-h-screen text-slate-900 pt-32 pb-24 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #EAF6FC 0%, #F8FBFD 28%, #FFFBF1 62%, #EAF6FC 100%)",
      }}
    >
      {/* ───── Background decoration ───── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full opacity-60"
          style={{ background: "radial-gradient(circle, #a9dcf0, transparent 70%)" }}
        />
        <div
          className="absolute top-[18%] -right-40 w-[480px] h-[480px] rounded-full opacity-55"
          style={{ background: "radial-gradient(circle, #f6d98a, transparent 70%)" }}
        />
        <div
          className="absolute top-[55%] -left-40 w-[440px] h-[440px] rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, #bfe3f2, transparent 70%)" }}
        />
        <div
          className="absolute bottom-0 right-0 w-[420px] h-[420px] rounded-full opacity-45"
          style={{ background: "radial-gradient(circle, #f3dfa8, transparent 70%)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.28]"
          style={{
            backgroundImage: "radial-gradient(#1D82A6 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage:
              "radial-gradient(ellipse 85% 50% at 50% 12%, black 15%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 85% 50% at 50% 12%, black 15%, transparent 80%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* ───── Breadcrumb + status ───── */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <Link
            href="/patientcare/events"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#0E526B] hover:text-white hover:bg-[#0E526B] transition-all bg-white px-5 py-2.5 rounded-full border border-[#1D82A6]/25 shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Events</span>
          </Link>
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-wider border shadow-md ${
              isPast
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-emerald-50 text-emerald-700 border-emerald-200"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isPast ? "bg-amber-500" : "bg-emerald-500 animate-pulse"
              }`}
            />
            {isPast ? "Past Event" : "Upcoming Event"}
          </span>
        </div>

        {/* ───── Hero ───── */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT: text */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#1D82A6]/25 text-[#0E526B] text-xs font-bold shadow-md mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1D82A6] opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1D82A6]" />
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#C8952E]" />
              <span>{event.category} • Apollo JBP Hospitals</span>
            </div>

            <h1 className="font-serif-apollo text-3xl sm:text-4xl lg:text-[2.7rem] font-black tracking-tight leading-[1.12] text-[#0B3446] mb-3">
              {event.title}
            </h1>

            <div
              className="h-1.5 w-24 rounded-full mb-5"
              style={{ background: "linear-gradient(90deg, #1D82A6, #F6D98A, #C8952E)" }}
            />

            {event.subtitle && (
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mb-7">
                {event.subtitle}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href={`tel:${phoneNumber}`}
                className="relative overflow-hidden px-7 py-3.5 rounded-full text-xs sm:text-sm font-black text-[#3A2B0A] shadow-[0_12px_32px_rgba(200,149,46,0.4)] hover:shadow-2xl hover:-translate-y-0.5 transition-all cursor-pointer flex items-center gap-2"
                style={goldGradient}
              >
                <Phone className="w-4 h-4" />
                <span>Call to Register: {event.organizer.phone}</span>
              </a>

              <a
                href="https://apollojbphospitals.com/contact-us/#section-book-appointment"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#0E526B] hover:text-[#1D82A6] transition-colors group"
              >
                <span className="w-10 h-10 rounded-full bg-white border border-[#1D82A6]/25 shadow-md flex items-center justify-center group-hover:bg-[#1D82A6] transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-[#1D82A6] group-hover:text-white transition-colors" />
                </span>
                Book Appointment Online
              </a>
            </div>

            {/* quick meta chips */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#1D82A6]/15 shadow-md">
                <Calendar className="w-4 h-4 text-[#1D82A6]" />
                <span className="text-xs font-bold text-[#0B3446]">{event.date}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#C8952E]/25 shadow-md">
                <Clock className="w-4 h-4 text-[#C8952E]" />
                <span className="text-xs font-bold text-[#0B3446]">{event.time}</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-emerald-200 shadow-md">
                <Tag className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold text-emerald-700">{event.cost}</span>
              </div>
            </div>
          </div>

          {/* RIGHT: premium framed photo (full, uncropped, nothing over it) */}
          <div className="lg:col-span-7 relative">
            {/* soft premium glow behind the frame */}
            <div
              className="absolute -inset-10 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at 50% 50%, rgba(246,217,138,0.55) 0%, rgba(169,220,240,0.35) 45%, transparent 72%)",
                filter: "blur(30px)",
              }}
            />

            {/* fine dotted texture peeking out behind the frame */}
            <div
              className="absolute -top-6 -right-6 w-40 h-40 opacity-60 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#C8952E 1.5px, transparent 1.5px)",
                backgroundSize: "14px 14px",
              }}
            />
            <div
              className="absolute -bottom-6 -left-6 w-40 h-40 opacity-50 pointer-events-none"
              style={{
                backgroundImage: "radial-gradient(#1D82A6 1.5px, transparent 1.5px)",
                backgroundSize: "14px 14px",
              }}
            />

            {/* gold gradient border ring */}
            <div
              className="relative rounded-[2.1rem] p-[3px] shadow-[0_35px_90px_rgba(11,52,70,0.28)]"
              style={goldBorder}
            >
              {/* white mat */}
              <div className="rounded-[calc(2.1rem-3px)] bg-white p-3 sm:p-4">
                {/* photo – shown fully, no crop, no overlay */}
                <div className="rounded-[1.5rem] overflow-hidden ring-1 ring-slate-200/70 bg-slate-50">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="block w-full h-auto"
                  />
                </div>

                {/* elegant caption bar inside the frame, below the photo */}
                <div className="mt-3 sm:mt-4 flex items-center justify-between gap-3 px-2 pb-1">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                      style={goldGradient}
                    >
                      <Stethoscope className="w-4 h-4 text-[#3A2B0A]" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[12px] font-black text-[#0B3446] leading-tight truncate">
                        {event.category}
                      </p>
                      <p className="text-[10px] font-semibold text-slate-500 truncate">
                        Apollo JBP Hospitals, Jabalpur
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#EDF6FB] text-[#0E526B] shrink-0">
                    <BadgeCheck className="w-3.5 h-3.5 text-[#1D82A6]" />
                    Verified
                  </span>
                </div>
              </div>
            </div>

            {/* info strip BELOW the photo – never covers it */}
            <div className="relative mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 px-4 py-3.5 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[#EDF6FB] flex items-center justify-center shrink-0">
                  <UserCheck className="w-5 h-5 text-[#1D82A6]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-black text-[#0B3446] leading-tight">
                    {event.doctor.name}
                  </div>
                  <div className="text-[11px] text-slate-500 font-semibold mt-0.5">
                    {event.doctor.specialty}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg border border-slate-100 px-4 py-3.5 flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={goldGradient}
                >
                  <Calendar className="w-5 h-5 text-[#3A2B0A]" />
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-black text-[#0B3446] leading-tight">
                    {event.date}
                  </div>
                  <div className="text-[11px] text-slate-500 font-semibold mt-0.5">
                    {event.time}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───── Metadata strip ───── */}
        <section className="relative p-[2px] rounded-[2rem] bg-gradient-to-r from-[#1D82A6]/50 via-[#F6D98A] to-[#C8952E]/60 shadow-xl">
          <div className="bg-white rounded-[calc(2rem-2px)] p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
            {[
              { icon: Calendar, label: "Date", value: event.date, color: "#1D82A6", bg: "#EDF6FB" },
              { icon: Clock, label: "Timing", value: event.time, color: "#C8952E", bg: "#FFF7E8" },
              { icon: Tag, label: "Consultation Fee", value: event.cost, color: "#059669", bg: "#ECFDF5" },
              { icon: Phone, label: "Helpline", value: event.organizer.emergency, color: "#E11D48", bg: "#FFF1F2" },
            ].map((m, i) => {
              const MIcon = m.icon;
              return (
                <div key={i} className="flex items-center gap-4 pt-4 sm:pt-0 sm:first:pl-0 sm:pl-6">
                  <div
                    className="p-3.5 rounded-2xl shrink-0 shadow-sm"
                    style={{ background: m.bg, color: m.color }}
                  >
                    <MIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase text-slate-400 font-black tracking-wider">
                      {m.label}
                    </p>
                    <p className="text-sm font-black text-[#0B3446]">{m.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ───── Content Grid ───── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT: main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <div className="relative p-[2px] rounded-[1.85rem] bg-gradient-to-br from-[#1D82A6]/40 via-white to-[#C8952E]/45 shadow-lg">
              <div className="bg-white rounded-[calc(1.85rem-2px)] p-6 sm:p-8 space-y-4">
                <h2 className="font-serif-apollo text-xl sm:text-2xl font-black text-[#0B3446] border-b border-slate-100 pb-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#EDF6FB] flex items-center justify-center shrink-0">
                    <AlertCircle className="w-5 h-5 text-[#1D82A6]" />
                  </span>
                  About Event & Medical Context
                </h2>
                <div
                  className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-base space-y-3"
                  dangerouslySetInnerHTML={{ __html: event.description }}
                />
              </div>
            </div>

            {/* Symptoms / Conditions */}
            {event.highlights?.length > 0 && (
              <div className="relative p-[2px] rounded-[1.85rem] bg-gradient-to-br from-emerald-300/60 via-white to-[#C8952E]/40 shadow-lg">
                <div className="bg-gradient-to-br from-white via-white to-emerald-50/40 rounded-[calc(1.85rem-2px)] p-6 sm:p-8 space-y-5">
                  <h2 className="font-serif-apollo text-lg sm:text-xl font-black text-[#0B3446] flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    </span>
                    Key Symptoms & Conditions Addressed
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {event.highlights.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:border-[#C8952E]/50 hover:shadow-md hover:-translate-y-0.5 transition-all"
                      >
                        <span
                          className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={goldGradient}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#3A2B0A]" />
                        </span>
                        <p className="text-sm font-semibold text-slate-800 leading-snug">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* What to Expect */}
            {event.whatToExpect?.length > 0 && (
              <div className="relative rounded-[1.85rem] overflow-hidden bg-gradient-to-br from-[#0A5F7A] via-[#0E526B] to-[#0B3446] text-white p-6 sm:p-8 shadow-2xl">
                <div
                  className="absolute -top-16 -right-16 w-60 h-60 rounded-full opacity-25 pointer-events-none"
                  style={{ background: "radial-gradient(circle, #F6D98A, transparent 70%)" }}
                />
                <div
                  className="absolute -bottom-20 -left-16 w-56 h-56 rounded-full opacity-20 pointer-events-none"
                  style={{ background: "radial-gradient(circle, #6ec6e6, transparent 70%)" }}
                />
                <h2 className="relative font-serif-apollo text-lg sm:text-xl font-black flex items-center gap-2.5 text-[#F6D98A] mb-5">
                  <Award className="w-6 h-6" />
                  What Will You Get in This Camp?
                </h2>
                <ul className="relative space-y-3">
                  {event.whatToExpect.map((expect, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-slate-100 text-sm bg-white/10 border border-white/10 rounded-xl px-4 py-3 backdrop-blur-sm"
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-300 flex-shrink-0 mt-0.5" />
                      <span>{expect}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* FAQs */}
            {event.faqs?.length > 0 && (
              <div className="relative p-[2px] rounded-[1.85rem] bg-gradient-to-br from-[#1D82A6]/40 via-white to-[#C8952E]/45 shadow-lg">
                <div className="bg-white rounded-[calc(1.85rem-2px)] p-6 sm:p-8 space-y-4">
                  <h2 className="font-serif-apollo text-lg sm:text-xl font-black text-[#0B3446] flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-[#EDF6FB] flex items-center justify-center shrink-0">
                      <HelpCircle className="w-5 h-5 text-[#1D82A6]" />
                    </span>
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-3">
                    {event.faqs.map((faq, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-gradient-to-r from-[#F1F9FD] to-[#FFFBF1] border border-slate-100 hover:border-[#1D82A6]/30 hover:shadow-md transition-all space-y-1.5"
                      >
                        <p className="font-black text-[#0B3446] text-sm sm:text-base flex items-start gap-2">
                          <span className="text-[#C8952E]">Q.</span>
                          {faq.q}
                        </p>
                        <p className="text-slate-600 text-sm leading-relaxed pl-5">{faq.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: sidebar */}
          <div className="space-y-6 lg:sticky lg:top-28 self-start">
            {/* Doctor profile */}
            {event.doctor && (
              <div className="relative p-[2px] rounded-[1.85rem] bg-gradient-to-br from-[#1D82A6]/50 via-white to-[#C8952E]/55 shadow-lg">
                <div className="bg-white rounded-[calc(1.85rem-2px)] p-6 space-y-4">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-white shadow-md"
                      style={{ background: "linear-gradient(135deg, #1D82A6, #0A5F7A)" }}
                    >
                      <UserCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase text-[#C8952E] tracking-widest">
                        Specialist Doctor
                      </p>
                      <h3 className="text-base font-black text-[#0B3446] leading-snug">
                        {event.doctor.name}
                      </h3>
                    </div>
                  </div>
                  <div className="space-y-2.5 text-[13px] text-slate-600">
                    <p className="flex gap-1.5">
                      <strong className="text-slate-800 shrink-0">Specialty:</strong>
                      <span>{event.doctor.specialty}</span>
                    </p>
                    <p className="flex gap-1.5">
                      <strong className="text-slate-800 shrink-0">Hospital:</strong>
                      <span>{event.doctor.hospital}</span>
                    </p>
                    {event.doctor.experience && (
                      <p className="flex gap-1.5">
                        <strong className="text-slate-800 shrink-0">Background:</strong>
                        <span>{event.doctor.experience}</span>
                      </p>
                    )}
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full bg-[#EDF6FB] text-[#0E526B]">
                    <BadgeCheck className="w-3.5 h-3.5 text-[#1D82A6]" />
                    Apollo Verified Specialist
                  </div>
                </div>
              </div>
            )}

            {/* Registration action */}
            <div className="relative rounded-[1.85rem] overflow-hidden bg-gradient-to-br from-[#1D82A6] via-[#0E526B] to-[#0B3446] text-white p-6 shadow-2xl">
              <div
                className="absolute -bottom-14 -right-10 w-48 h-48 rounded-full opacity-30 pointer-events-none"
                style={{ background: "radial-gradient(circle, #F6D98A, transparent 70%)" }}
              />
              <div className="relative flex items-center gap-2 mb-2">
                <HeartPulse className="w-5 h-5 text-[#F6D98A]" />
                <h3 className="text-lg font-black">Book Consultation Slot</h3>
              </div>
              <p className="relative text-[12px] text-slate-100 leading-relaxed mb-4">
                Prior registration is recommended to avoid waiting queues during camp hours.
              </p>

              <div className="relative space-y-3">
                <a
                  href={`tel:${phoneNumber}`}
                  className="w-full flex items-center justify-center gap-2 font-black py-3 px-4 rounded-2xl transition-all shadow-md text-sm text-[#3A2B0A] hover:brightness-105 hover:-translate-y-0.5"
                  style={goldGradient}
                >
                  <Phone className="w-4 h-4" />
                  <span>Call: {event.organizer.phone}</span>
                </a>

                <a
                  href="https://apollojbphospitals.com/contact-us/#section-book-appointment"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-4 rounded-2xl border border-white/25 transition-all text-sm"
                >
                  <span>Book Appointment Online</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Emergency card */}
            <div className="relative p-[2px] rounded-[1.85rem] bg-gradient-to-br from-rose-300/60 via-white to-[#C8952E]/50 shadow-lg">
              <div className="bg-white rounded-[calc(1.85rem-2px)] p-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={goldGradient}
                  >
                    <ShieldCheck className="w-5 h-5 text-[#3A2B0A]" />
                  </div>
                  <div>
                    <div className="text-sm font-black text-[#0B3446] leading-none">
                      24/7 Emergency
                    </div>
                    <div className="text-[11px] text-slate-500 font-semibold mt-1">
                      {event.organizer.emergency}
                    </div>
                  </div>
                </div>
                <a
                  href={`tel:${event.organizer.emergency}`}
                  className="px-3.5 py-2 rounded-full bg-[#0E526B] text-white text-[11px] font-bold hover:bg-[#0A5F7A] transition-colors shrink-0"
                >
                  Call Now
                </a>
              </div>
            </div>

            {/* Venue */}
            <div className="relative p-[2px] rounded-[1.85rem] bg-gradient-to-br from-[#1D82A6]/40 via-white to-rose-200/50 shadow-lg">
              <div className="bg-white rounded-[calc(1.85rem-2px)] p-6 space-y-3">
                <h3 className="text-base font-black text-[#0B3446] flex items-center gap-2.5 border-b border-slate-100 pb-3">
                  <span className="w-9 h-9 rounded-xl bg-rose-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-rose-500" />
                  </span>
                  Event Venue & Location
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {event.location}
                </p>
                <a
                  href="https://maps.app.goo.gl/KZmFTJb5PvBjD8zT8"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-black text-[#1D82A6] hover:text-[#0A5F7A] transition-colors"
                >
                  <span>Get Directions on Google Maps</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Organizer */}
            <div className="relative p-[2px] rounded-[1.85rem] bg-gradient-to-br from-slate-300 via-white to-slate-200 shadow-lg">
              <div className="bg-white rounded-[calc(1.85rem-2px)] p-6 space-y-3">
                <h3 className="text-sm font-black text-[#0B3446] flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center shrink-0">
                    <Building2 className="w-4 h-4 text-slate-500" />
                  </span>
                  Organized By
                </h3>
                <p className="text-sm font-bold text-slate-800">{event.organizer.name}</p>
                <p className="text-xs text-slate-500 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  {event.organizer.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}