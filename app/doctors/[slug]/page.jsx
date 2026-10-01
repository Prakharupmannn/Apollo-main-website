import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CalendarDays,
  Check,
  Clock3,
  GraduationCap,
  Languages,
  MapPin,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserRound,
} from "lucide-react";

import { rawDoctors } from "@/data/doctorsPage";
import { hospital } from "@/data/siteData";
import MobileBookingBar from "../../../components/MobileBookingBar";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

/* ---------------- helpers ---------------- */

function toList(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string")
    return value
      .split(/,|;/)
      .map((s) => s.trim())
      .filter(Boolean);
  return [];
}

function toEducation(value) {
  return toList(value).map((q) =>
    typeof q === "string"
      ? { degree: q, institute: "", year: "" }
      : {
          degree: q.degree || "",
          institute: q.institute || "",
          year: q.year || "",
        }
  );
}

function getTone(slug = "") {
  const v = String(slug).toLowerCase();
  if (v.includes("onco")) return { ink: "#C72D69", soft: "#FFF0F6" };
  if (v.includes("card")) return { ink: "#D94C5B", soft: "#FFF1F3" };
  if (v.includes("gastro")) return { ink: "#168B73", soft: "#ECFAF6" };
  if (v.includes("neuro")) return { ink: "#6554C0", soft: "#F1EFFF" };
  if (v.includes("nephro")) return { ink: "#2673C7", soft: "#EEF6FF" };
  if (v.includes("ortho") || v.includes("spine"))
    return { ink: "#D27A29", soft: "#FFF5EA" };
  if (v.includes("critical")) return { ink: "#2674D8", soft: "#EEF5FF" };
  return { ink: "#0E526B", soft: "#EDF7FA" };
}

function findDoctor(slug) {
  return rawDoctors.find((d) => d.slug === slug);
}

function getAbout(doctor) {
  if (Array.isArray(doctor.about) && doctor.about.length)
    return doctor.about.filter(Boolean);

  const spec = (doctor.speciality || "medicine").toLowerCase();
  return [
    doctor.bio ||
      `${doctor.name} is a consultant in ${spec} at ${
        hospital?.name || "Apollo JBP Hospitals"
      }, Jabalpur. Patients are supported with clear communication, accurate diagnosis and a treatment plan built around their individual needs.`,
  ];
}

/* ---------------- small UI ---------------- */

function Card({ children, className = "" }) {
  return (
    <div
      className={`scroll-reveal relative overflow-hidden rounded-[24px] border border-[#E3EEF2] bg-white p-6 shadow-[0_14px_40px_rgba(14,82,107,.07)] sm:p-7 ${className}`}
    >
      {children}
    </div>
  );
}

function SectionTitle({ eyebrow, title, accent }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="h-8 w-1 bg-gradient-to-b from-[#E1B54A] to-[#C8952E]" />
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#0E526B]">
          {eyebrow}
        </p>
        <h2 className="mt-0.5 font-serif text-[22px] leading-tight text-[#06202B] sm:text-[26px]">
          {title}{" "}
          {accent && <span className="italic text-[#C8952E]">{accent}</span>}
        </h2>
      </div>
    </div>
  );
}

function Chip({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-xl border border-[#DCEAF0] bg-white/90 px-3.5 py-2 text-[12px] font-semibold text-[#294A58] shadow-sm backdrop-blur">
      <Icon className="h-4 w-4 text-[#C8952E]" />
      {children}
    </span>
  );
}

function PrimaryBtn({ href, children }) {
  return (
    <Link
      href={href}
      className="btn-shimmer group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0E526B] via-[#137A9A] to-[#0E526B] px-7 text-sm font-bold text-white shadow-[0_14px_30px_rgba(14,82,107,.30)] transition hover:-translate-y-0.5"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
    </Link>
  );
}

function GhostBtn({ href, children, className = "" }) {
  return (
    <Link
      href={href}
      className={`inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#BFD6DF] bg-white/90 px-6 text-sm font-bold text-[#0E526B] transition hover:-translate-y-0.5 hover:border-[#0E526B] hover:bg-[#F3F9FB] ${className}`}
    >
      {children}
    </Link>
  );
}

/* ---------------- HERO ---------------- */

function Hero({ doctor, tone, education, languages, highlights }) {
  const bookHref = `/contact?doctor=${encodeURIComponent(doctor.slug)}`;
  const firstDegree = education[0]?.degree;
  const badge = highlights[0];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#EAF6FA] via-white to-[#FFF7E3] pb-28 pt-24 lg:pb-32 lg:pt-28">
      {/* angled color panel */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[48%] lg:block"
        style={{
          clipPath: "polygon(24% 0, 100% 0, 100% 100%, 0 100%)",
          background: `linear-gradient(160deg, ${tone.soft} 0%, #FFF6DF 65%, #ffffff 100%)`,
        }}
      />

      {/* diagonal stripes */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(14,82,107,.055) 0 1px, transparent 1px 14px)",
          maskImage: "linear-gradient(to right, black, transparent 65%)",
          WebkitMaskImage: "linear-gradient(to right, black, transparent 65%)",
        }}
      />

      {/* outline watermark */}
     <span
  className="
    pointer-events-none
    absolute
    bottom-12
    left-4
    select-none
    font-serif
    text-[18vw]
    font-black
    uppercase
    leading-none
    sm:bottom-2
    sm:left-6
    sm:text-[16vw]
    lg:-bottom-8
  "
  style={{
    color: "transparent",
    WebkitTextStroke: `1.5px ${tone.ink}20`,
  }}
>
  Apollo
</span>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 lg:pt-5">
        <Link
          href="/doctors"
          className="group mb-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#0E526B]/70 transition hover:text-[#0E526B]"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition group-hover:-translate-x-1" />
          All Doctors
        </Link>

        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* LEFT */}
          <div>
            {doctor.speciality && (
              <span
                className="anim-fade-up inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em]"
                style={{ color: tone.ink, background: tone.soft }}
              >
                <Stethoscope className="h-3.5 w-3.5" />
                {doctor.speciality}
              </span>
            )}

            <h1
              className="anim-fade-up mt-5 font-serif text-[40px] leading-[1.03] text-[#06202B] sm:text-[54px] lg:text-[44px]"
              style={{ animationDelay: "80ms" }}
            >
              {doctor.name}
            </h1>

            {doctor.designation && (
              <p
                className="anim-fade-up mt-4 flex items-center gap-3 text-[16px] font-semibold text-[#C8952E]"
                style={{ animationDelay: "140ms" }}
              >
                <span className="h-[2px] w-10 bg-[#C8952E]" />
                {doctor.designation}
              </p>
            )}

            {doctor.summary && (
              <p
                className="anim-fade-up mt-4 max-w-xl text-[15px] leading-7 text-[#526B77]"
                style={{ animationDelay: "200ms" }}
              >
                {doctor.summary}
              </p>
            )}

            <div
              className="anim-fade-up mt-6 flex flex-wrap gap-2.5"
              style={{ animationDelay: "260ms" }}
            >
              {doctor.experience && (
                <Chip icon={Award}>{doctor.experience} Experience</Chip>
              )}
              {firstDegree && <Chip icon={GraduationCap}>{firstDegree}</Chip>}
              {languages.length > 0 && (
                <Chip icon={Languages}>{languages.join(" · ")}</Chip>
              )}
              <Chip icon={MapPin}>Jabalpur</Chip>
            </div>

            <div
              className="anim-fade-up mt-8 flex flex-wrap gap-3"
              style={{ animationDelay: "320ms" }}
            >
              <PrimaryBtn href={bookHref}>Book Appointment</PrimaryBtn>
              {hospital?.phone && (
                <GhostBtn href={`tel:${hospital.phone}`}>
                  <Phone className="h-4 w-4" />
                  Call OPD
                </GhostBtn>
              )}
            </div>
          </div>

          {/* RIGHT: photo composition */}
          <div className="anim-fade-up relative mx-auto w-full max-w-[390px] pb-4 pl-3 pt-3">
            {/* tilted color plate */}
            <div
              className="absolute inset-0 translate-x-5 translate-y-6 rotate-3 rounded-[28px]"
              style={{
                background: `linear-gradient(135deg, ${tone.ink}30, #E1B54A40)`,
              }}
            />
            {/* gold frame */}
            <div className="absolute inset-0 -translate-x-3 -translate-y-3 rounded-[28px] border-2 border-[#C8952E]/55" />

            {/* photo with cut corner */}
            <div className="relative drop-shadow-[0_30px_40px_rgba(14,82,107,.25)]">
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-white"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 70px) 0, 100% 70px, 100% 100%, 0 100%)",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(160deg, ${tone.soft} 0%, #ffffff 100%)`,
                  }}
                />

                {doctor.image ? (
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="relative h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="relative flex h-full w-full items-center justify-center">
                    <span
                      className="flex h-32 w-32 items-center justify-center rounded-3xl bg-white shadow-[0_18px_40px_rgba(6,32,43,.12)]"
                      style={{ color: tone.ink }}
                    >
                      <UserRound className="h-16 w-16" strokeWidth={1.4} />
                    </span>
                  </div>
                )}

                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/70 to-transparent" />
                <span className="photo-shine" />

                {/* corner brackets */}
                <span className="absolute bottom-4 right-4 h-6 w-6 border-b-2 border-r-2 border-white" />
                <span className="absolute left-4 top-4 h-6 w-6 border-l-2 border-t-2 border-white" />
              </div>
            </div>

            {/* available tag */}
            <div className="anim-float absolute left-8 top-8 z-10 inline-flex items-center gap-2 rounded-lg border border-white bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#168B73] shadow-lg backdrop-blur">
              <span className="h-2 w-2 rotate-45 bg-[#168B73]" />
              Available
            </div>

            {/* verified */}
            <div className="anim-float-slow absolute -left-3 bottom-14 z-10 flex items-center gap-3 rounded-2xl border border-white bg-white/95 px-4 py-3 shadow-[0_22px_50px_rgba(14,82,107,.18)] backdrop-blur sm:-left-8">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: tone.soft, color: tone.ink }}
              >
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#71858E]">
                  Verified Specialist
                </p>
                <p className="text-xs font-bold text-[#06202B]">
                  {hospital?.name || "Apollo JBP Hospitals"}
                </p>
              </div>
            </div>

            {/* highlight tile */}
            {badge && (
              <div className="anim-float absolute -right-2 bottom-6 z-10 rounded-2xl bg-gradient-to-br from-[#E1B54A] to-[#C8952E] px-5 py-3 text-[#06202B] shadow-[0_20px_40px_rgba(200,149,46,.40)] sm:-right-6">
                <p className="font-serif text-[26px] leading-none">
                  {badge.value}
                </p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-wider">
                  {badge.label}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FACTS BAR ---------------- */

function Facts({ doctor, education, highlights }) {
  const opdDays = toList(doctor.opd?.days);

  const facts = [
    {
      icon: Stethoscope,
      value: doctor.speciality || "Specialist",
      label: "Speciality",
    },
    {
      icon: Award,
      value: doctor.experience || highlights[0]?.value || "—",
      label: doctor.experience ? "Experience" : highlights[0]?.label || "Experience",
    },
    {
      icon: GraduationCap,
      value: education[0]?.degree || "—",
      label: "Qualification",
    },
    {
      icon: CalendarDays,
      value: opdDays.length ? `${opdDays.length} days / week` : "By appointment",
      label: "OPD",
    },
  ];

  return (
    <section className="relative z-20 -mt-14 px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 lg:grid-cols-4">
        {facts.map((f, i) => {
          const Icon = f.icon;
          return (
            <div
              key={f.label}
              className="anim-fade-up group relative overflow-hidden rounded-2xl border border-white bg-white p-4 shadow-[0_18px_44px_rgba(14,82,107,.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_54px_rgba(14,82,107,.18)]"
              style={{ animationDelay: `${300 + i * 80}ms` }}
            >
              <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#E1B54A] to-[#0E526B]" />
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    i === 0
                      ? "bg-gradient-to-br from-[#E1B54A] to-[#C8952E] text-white"
                      : "bg-[#EDF7FA] text-[#0E526B]"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-serif text-[16px] text-[#06202B]">
                    {f.value}
                  </p>
                  <p className="truncate text-[10px] uppercase tracking-wider text-[#71858E]">
                    {f.label}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------------- CONTENT CARDS ---------------- */

function About({ about, highlights }) {
  return (
    <Card>
      <Quote className="pointer-events-none absolute right-6 top-6 h-16 w-16 text-[#C8952E]/15" />
      <SectionTitle eyebrow="About" title="Getting to know" accent="the specialist" />

      <div className="relative space-y-4">
        {about.map((p, i) => (
          <p key={i} className="text-[15px] leading-8 text-[#3F5A66]">
            {p}
          </p>
        ))}
      </div>

      {highlights.length > 0 && (
        <div className="relative mt-6 grid grid-cols-3 gap-3 border-t border-dashed border-[#DCEAF0] pt-6">
          {highlights.map((h) => (
            <div
              key={h.label}
              className="group rounded-2xl bg-gradient-to-br from-[#F4FAFC] to-[#FFF9EC] p-4"
            >
              <p className="font-serif text-[28px] leading-none text-[#0E526B]">
                {h.value}
              </p>
              <p className="mt-2 text-[10px] font-semibold uppercase leading-4 tracking-wider text-[#71858E]">
                {h.label}
              </p>
              <span className="mt-3 block h-1 w-8 bg-[#C8952E] transition-all duration-500 group-hover:w-full" />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

function Expertise({ items }) {
  return (
    <Card>
      <SectionTitle eyebrow="Focus Areas" title="Areas of" accent="expertise" />
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="group inline-flex items-center gap-2 rounded-xl border border-[#E3EEF2] bg-[#F8FBFD] px-3 py-2 text-[12px] font-semibold leading-4 text-[#06202B] transition duration-300 hover:-translate-y-0.5 hover:border-[#C8952E]/50 hover:bg-white hover:shadow-[0_10px_24px_rgba(14,82,107,.10)]"
          >
            <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[#C8952E]" />
            {item}
          </span>
        ))}
      </div>
    </Card>
  );
}

function Education({ items }) {
  return (
    <Card>
      <SectionTitle eyebrow="Credentials" title="Education &" accent="training" />
      <ol className="space-y-3">
        {items.map((q, i) => (
          <li
            key={`${q.degree}-${i}`}
            className="flex items-start gap-3 rounded-2xl border border-[#E3EEF2] bg-[#F8FBFD] p-3 transition duration-300 hover:border-[#C8952E]/40 hover:bg-white"
          >
            <span className="flex h-10 min-w-[3.5rem] items-center justify-center rounded-xl bg-gradient-to-br from-[#0E526B] to-[#137A9A] px-2 text-[11px] font-bold text-white">
              {q.year || <Check className="h-4 w-4" strokeWidth={3} />}
            </span>
            <div className="min-w-0">
              <p className="text-[13px] font-bold leading-5 text-[#06202B]">
                {q.degree}
              </p>
              {q.institute && (
                <p className="mt-0.5 text-[11px] leading-4 text-[#607681]">
                  {q.institute}
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Card>
  );
}

function HowToBook() {
  const steps = [
    { t: "Request", d: "Tap Book Appointment and share your details." },
    { t: "Confirmation", d: "Our care team confirms the earliest slot." },
    {
      t: "Consult",
      d: `Visit ${hospital?.name || "the hospital"} and meet the doctor.`,
    },
  ];

  return (
    <Card>
      <SectionTitle eyebrow="Simple Process" title="Book in" accent="3 easy steps" />
      <div className="grid gap-3 sm:grid-cols-3">
        {steps.map((s, i) => (
          <div
            key={s.t}
            className="relative overflow-hidden rounded-2xl border border-[#E3EEF2] bg-gradient-to-br from-white to-[#F4FAFC] p-4 pt-5"
          >
            <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#E1B54A] to-transparent" />
            <span className="font-serif text-[34px] leading-none text-[#C8952E]/40">
              0{i + 1}
            </span>
            <p className="mt-2 text-sm font-bold text-[#06202B]">{s.t}</p>
            <p className="mt-1 text-xs leading-5 text-[#607681]">{s.d}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

/* ---------------- SIDEBAR ---------------- */

function Sidebar({ doctor }) {
  const opdDays = toList(doctor.opd?.days);
  const bookHref = `/contact?doctor=${encodeURIComponent(doctor.slug)}`;

  return (
    <aside className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
      {/* OPD */}
      <div className="scroll-reveal rounded-[24px] border border-[#E3EEF2] bg-white p-5 shadow-[0_14px_40px_rgba(14,82,107,.07)]">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0E526B]">
          <CalendarDays className="h-4 w-4 text-[#C8952E]" />
          OPD Availability
        </div>

        {opdDays.length ? (
          <>
            <div className="mt-4 grid grid-cols-7 gap-1.5">
              {DAYS.map((d) => (
                <span
                  key={d}
                  className={`flex h-9 items-center justify-center rounded-lg text-[10px] font-bold ${
                    opdDays.includes(d)
                      ? "bg-[#0E526B] text-white shadow-sm"
                      : "bg-[#F3F7F9] text-[#A3B4BC]"
                  }`}
                >
                  {d}
                </span>
              ))}
            </div>
            {doctor.opd?.timing && (
              <p className="mt-3 flex items-center gap-2 text-sm font-bold text-[#06202B]">
                <Clock3 className="h-4 w-4 text-[#C8952E]" />
                {doctor.opd.timing}
              </p>
            )}
          </>
        ) : (
          <p className="mt-3 text-xs leading-6 text-[#526B77]">
            Slots are confirmed by our care team when you request an
            appointment.
          </p>
        )}
      </div>

      {/* booking */}
      <div className="scroll-reveal relative overflow-hidden rounded-[24px] border border-[#DCEAF0] bg-gradient-to-br from-[#E6F4F8] via-white to-[#FFF4D9] p-5 shadow-[0_16px_40px_rgba(14,82,107,.10)]">
        <span
          className="absolute right-0 top-0 h-16 w-16 bg-[#E1B54A]/40"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%)" }}
        />

        <h3 className="relative font-serif text-xl text-[#06202B]">
          Book a consultation
        </h3>
        <p className="relative mt-1.5 max-w-[85%] text-xs leading-5 text-[#526B77]">
          Our care team will confirm the earliest slot with {doctor.name}.
        </p>

        <Link
          href={bookHref}
          className="group relative mt-4 flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E1B54A] to-[#C8952E] text-sm font-bold text-[#06202B] shadow-[0_12px_26px_rgba(200,149,46,.35)] transition hover:-translate-y-0.5 hover:brightness-105"
        >
          Book Appointment
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>

        {hospital?.phone && (
          <Link
            href={`tel:${hospital.phone}`}
            className="relative mt-2 flex h-11 items-center justify-center gap-2 rounded-xl border border-[#BFD6DF] bg-white text-xs font-bold text-[#0E526B] transition hover:border-[#0E526B]"
          >
            <Phone className="h-4 w-4" />
            Call OPD
          </Link>
        )}

        {hospital?.address && (
          <p className="relative mt-4 flex items-start gap-2 border-t border-[#DCEAF0] pt-3 text-[11px] leading-5 text-[#607681]">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C8952E]" />
            {hospital.address}
          </p>
        )}
      </div>
    </aside>
  );
}

/* ---------------- RELATED ---------------- */

function Related({ doctors }) {
  if (!doctors.length) return null;

  return (
    <section className="px-4 pb-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="min-w-0 font-serif text-lg text-[#06202B] sm:text-xl">
            More from{" "}
            <span className="italic text-[#C8952E]">
              this speciality
            </span>
          </p>

          <Link
            href="/doctors"
            className="flex shrink-0 items-center gap-1 text-[11px] font-bold text-[#0E526B] sm:text-xs"
          >
            All Doctors
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Link>
        </div>

        {/* Doctors */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {doctors.map((d) => {
            const tone = getTone(
              d.specialitySlug || d.speciality
            );

            return (
              <Link
                key={d.id || d.slug}
                href={`/doctors/${d.slug}`}
                className="
                  scroll-reveal group
                  flex min-w-0 items-center
                  gap-3 rounded-2xl
                  border border-[#E3EEF2]
                  bg-white
                  p-3
                  shadow-[0_8px_24px_rgba(14,82,107,.05)]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-[#C8952E]/40
                  hover:shadow-[0_20px_44px_rgba(14,82,107,.13)]
                  sm:gap-4
                "
              >
                {/* Image */}
                <span
                  className="
                    flex h-14 w-14 shrink-0
                    items-center justify-center
                    overflow-hidden rounded-xl
                    sm:h-16 sm:w-16
                  "
                  style={{
                    background: tone.soft,
                    color: tone.ink,
                  }}
                >
                  {d.image ? (
                    <img
                      src={d.image}
                      alt={d.name}
                      loading="lazy"
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <UserRound
                      className="h-7 w-7 sm:h-8 sm:w-8"
                      strokeWidth={1.5}
                    />
                  )}
                </span>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <p
                    className="
                      truncate
                      text-[8px]
                      font-bold
                      uppercase
                      tracking-[0.15em]
                      sm:text-[9px]
                      sm:tracking-[0.18em]
                    "
                    style={{ color: tone.ink }}
                  >
                    {d.speciality}
                  </p>

                  <p
                    className="
                      truncate
                      font-serif
                      text-[15px]
                      leading-tight
                      text-[#06202B]
                      sm:text-[17px]
                    "
                  >
                    {d.name}
                  </p>

                  {d.designation && (
                    <p
                      className="
                        mt-0.5
                        truncate
                        text-[10px]
                        leading-tight
                        text-[#607681]
                        sm:text-[11px]
                      "
                    >
                      {d.designation}
                    </p>
                  )}
                </div>

                {/* Arrow */}
                <span
                  className="
                    flex h-7 w-7 shrink-0
                    items-center justify-center
                    rounded-lg
                    bg-[#EDF7FA]
                    text-[#0E526B]
                    transition
                    group-hover:bg-[#C8952E]
                    group-hover:text-white
                    sm:h-8 sm:w-8
                  "
                >
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- BOTTOM CTA ---------------- */

function BottomCta({ doctor }) {
  return (
    <section className="px-6 pb-16 lg:px-10">
      <div className="scroll-reveal relative mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-[#DCEAF0] bg-gradient-to-r from-[#E6F4F8] via-white to-[#FFF2CF] px-6 py-9 shadow-[0_20px_50px_rgba(14,82,107,.09)] sm:px-10">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(14,82,107,.05) 0 1px, transparent 1px 14px)",
          }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-[#E1B54A]/25"
          style={{ clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%)" }}
        />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#0E526B]">
              {hospital?.name || "Apollo JBP Hospitals"}
            </p>
            <h2 className="mt-2 font-serif text-[28px] leading-tight text-[#06202B] sm:text-[34px]">
              Ready to meet{" "}
              <span className="italic text-[#C8952E]">{doctor.name}?</span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <PrimaryBtn href={`/contact?doctor=${encodeURIComponent(doctor.slug)}`}>
              Book Appointment
            </PrimaryBtn>
            <GhostBtn href="/doctors">All Doctors</GhostBtn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ROUTE ---------------- */

export async function generateStaticParams() {
  return rawDoctors.filter((d) => d.slug).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const doctor = findDoctor(slug);
  if (!doctor) return { title: "Doctor not found" };

  return {
    title: `${doctor.name} - ${doctor.speciality || "Specialist"} | ${
      hospital?.name || "Apollo JBP Hospitals"
    }`,
    description:
      doctor.summary ||
      doctor.designation ||
      `${doctor.name}, ${doctor.speciality || "specialist"} at ${
        hospital?.name || "Apollo JBP Hospitals"
      }, Jabalpur.`,
  };
}

export default async function DoctorProfilePage({ params }) {
  const { slug } = await params;
  const doctor = findDoctor(slug);

  if (!doctor) notFound();

  const tone = getTone(doctor.specialitySlug || doctor.speciality);
  const education = toEducation(doctor.qualifications || doctor.qualification);
  const expertise = toList(doctor.expertise);
  const languages = toList(doctor.languages);
  const about = getAbout(doctor);
  const highlights = Array.isArray(doctor.highlights)
    ? doctor.highlights.slice(0, 3)
    : [];

  // const sameSpeciality = rawDoctors.filter(
  //   (d) =>
  //     d.slug !== doctor.slug &&
  //     (d.specialitySlug
  //       ? d.specialitySlug === doctor.specialitySlug
  //       : d.speciality === doctor.speciality)
  // );
  // const related = (
  //   sameSpeciality.length
  //     ? sameSpeciality
  //     : rawDoctors.filter((d) => d.slug !== doctor.slug)
  // ).slice(0, 3);

  const specialtyKeywords = {
  oncology: ["onco", "cancer"],
  cardiology: ["cardi", "heart"],
  gastroenterology: ["gastro", "hepat"],
  neurology: ["neuro"],
  nephrology: ["nephro", "renal"],
  orthopaedics: ["ortho", "joint", "spine"],
  "critical-care": ["critical", "icu", "intensiv"],
  gynaecology: ["gynae", "gynec", "obstet", "women"],
  paediatrics: ["paed", "pedia", "child"],
  urology: ["urolog"],
};

  const getSpecialtyKey = (d) => {
  const text = [
    d.specialitySlug,
    d.speciality,
    d.designation,
    d.department,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  // Explicit slug ko priority
  if (d.specialitySlug) {
    return d.specialitySlug.toLowerCase();
  }

  // Keywords se speciality identify
  for (const [specialty, keywords] of Object.entries(specialtyKeywords)) {
    if (keywords.some((keyword) => text.includes(keyword))) {
      return specialty;
    }
  }

  return null;
};

const currentSpecialty = getSpecialtyKey(doctor);

const related = rawDoctors
  .filter((d) => {
    if (d.slug === doctor.slug) return false;

    return getSpecialtyKey(d) === currentSpecialty;
  })
  .slice(0, 3);

  const bookHref = `/contact?doctor=${encodeURIComponent(doctor.slug)}`;
  const twoCols = expertise.length > 0 && education.length > 0;

  return (
    <main className="bg-[#F8FCFD] pb-20 lg:pb-0">
      <Hero
        doctor={doctor}
        tone={tone}
        education={education}
        languages={languages}
        highlights={highlights}
      />

      <Facts doctor={doctor} education={education} highlights={highlights} />

      <section className="px-6 py-10 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-start gap-6 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <About about={about} highlights={highlights} />

            {(expertise.length > 0 || education.length > 0) && (
              <div className={`grid gap-6 ${twoCols ? "md:grid-cols-2" : ""}`}>
                {expertise.length > 0 && <Expertise items={expertise} />}
                {education.length > 0 && <Education items={education} />}
              </div>
            )}

            <HowToBook />
          </div>

          <Sidebar doctor={doctor} />
        </div>
      </section>

      <Related doctors={related} />
      <BottomCta doctor={doctor} />

      {/* mobile sticky booking bar */}
     <MobileBookingBar
  phone={hospital?.phone}
  bookHref={bookHref}
/>
    </main>
  );
}