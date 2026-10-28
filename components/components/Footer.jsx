"use client";

import { memo, useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  PhoneCall,
  Mail,
  MapPin,
  ShieldCheck,
  ChevronRight,
  HeartPulse,
  Calendar,
  CheckCircle2,
  ArrowUp,
  Award,
  Stethoscope,
  Clock,
} from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

/* ---------- Static data (hoisted: never re-created on re-render) ---------- */

const METRICS = [
  { icon: Clock, value: "40+", label: "Years of Medical Leadership" },
  { icon: Stethoscope, value: "13,000+", label: "Specialist Doctors" },
  { icon: Award, value: "NABH & JCI", label: "Accredited" },
];

const QUICK_LINKS = [
  { label: "Home Page", href: "/" },
  { label: "About Us", href: "/aboutus" },
  { label: "Our Specialities", href: "/ourspecialities" },
  { label: "Find a Doctor", href: "/doctors" },
  { label: "Patient Care", href: "/patientcare" },
];

const SERVICE_LINKS = [
  { label: "Health Library", href: "/health-library" },
  { label: "Contact & Location Map", href: "/contact" },
  { label: "24/7 Emergency Care", href: "/emergency" },
  { label: "Book Appointment", href: "/patientcare/appointment" },
  { label: "MP Service Reach", href: "/contact" },
];

const SOCIALS = [
  { label: "Facebook", icon: FaFacebookF, bg: "bg-[#1877F2]", href: "https://www.facebook.com/apollojbphospitals/" },
  { label: "X (Twitter)", icon: FaTwitter, bg: "bg-[#0F1419]", href: "https://x.com/apollojbp/" },
  { label: "Instagram", icon: FaInstagram, bg: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]", href: "https://www.instagram.com/apollojbphospitals/" },
  { label: "LinkedIn", icon: FaLinkedinIn, bg: "bg-[#0A66C2]", href: "https://www.linkedin.com/company/apollojbphospitals/" },
  { label: "YouTube", icon: FaYoutube, bg: "bg-[#FF0000]", href: "https://www.youtube.com/@ApolloJbpHospitals" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-service" },
];

/* Full-width on phones, auto width from sm+, stays one line on xl pill */
const BOOK_BTN =
  "inline-flex w-full shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-3 text-xs font-bold text-slate-950 sm:w-auto sm:flex-1 xl:flex-none " +
  "bg-gradient-to-b from-[#F7D26B] to-[#D9A02B] shadow-[0_4px_14px_rgba(217,160,43,0.4)] " +
  "transition hover:-translate-y-px hover:brightness-110 active:translate-y-0 " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

const EMERGENCY_BTN =
  "inline-flex w-full shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-gradient-to-b from-[#FF6B6B] to-[#E5383B] px-5 py-3 text-xs font-bold text-white " +
  "shadow-[0_4px_18px_rgba(255,80,80,0.55)] transition hover:brightness-110 sm:w-auto sm:flex-1 xl:flex-none " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

/* ---------- Small reusable pieces ---------- */

const FooterLinkList = memo(function FooterLinkList({ title, links }) {
  return (
    <nav aria-label={title} className="min-w-0">
      <h4 className="font-serif-apollo text-sm font-bold tracking-wide text-white">
        {title}
      </h4>
      <span className="mt-2 mb-4 block h-0.5 w-8 rounded bg-[#16A6C5]" />
      <ul className="space-y-2.5 text-[13px] text-cyan-50/85">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="group inline-flex items-center gap-1.5 py-0.5 transition-colors hover:text-white"
            >
              <ChevronRight
                aria-hidden="true"
                className="h-3.5 w-3.5 shrink-0 text-[#16A6C5] transition-transform group-hover:translate-x-0.5"
              />
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
});

/* ---------- Footer ---------- */

export default function Footer({ onOpenAppointmentModal }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = useCallback(
    (e) => {
      e.preventDefault();
      if (email) setSubscribed(true);
    },
    [email]
  );

  const scrollToTop = useCallback(
    () => window.scrollTo({ top: 0, behavior: "smooth" }),
    []
  );

  return (
    <footer
      id="footer"
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#0E526B] via-[#087F9C] to-[#16A6C5] text-white"
    >
      {/* ---- Background layers: all GPU-cheap (gradients only, no big blurs) ---- */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* darken the left so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E526B]/90 via-[#0E526B]/40 to-transparent" />
        {/* ambient light reflections (radial gradients instead of blur filters) */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(40rem 24rem at 10% 0%, rgba(22,166,197,.28), transparent 60%), radial-gradient(34rem 22rem at 90% 100%, rgba(255,255,255,.10), transparent 60%)",
          }}
        />
        {/* faint medical grid */}
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "linear-gradient(to bottom, black, transparent 85%)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent 85%)",
          }}
        />
        {/* hospital photo — right side, desktop only, lazy, faded into the gradient */}
        <div
          className="absolute inset-y-0 right-0 hidden w-[42%] lg:block"
          style={{
            maskImage: "linear-gradient(to left, black 25%, transparent)",
            WebkitMaskImage: "linear-gradient(to left, black 25%, transparent)",
          }}
        >
          <Image
            src="/images/apollo-hospital-image.webp"
            alt=""
            fill
            sizes="(min-width: 1024px) 42vw, 0px"
            quality={60}
            loading="lazy"
            className="object-cover object-right opacity-30 mix-blend-luminosity"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        {/* ================= Floating action banner ================= */}
        {/* Stacks on phone + tablet + small laptop, becomes a single pill at xl */}
        <section
          aria-label="Hospital highlights"
          className="rounded-3xl border border-white/30 bg-white/20 p-4 shadow-[0_20px_50px_-12px_rgba(3,30,45,0.55)] sm:bg-white/15 sm:p-5 sm:backdrop-blur-md xl:rounded-full xl:py-3 xl:pl-6 xl:pr-3"
        >
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between xl:gap-6">
            {/* Slogan */}
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#16A6C5]/25 ring-1 ring-[#16A6C5]/60">
                <HeartPulse aria-hidden="true" className="h-5 w-5 text-[#7FE3F5]" />
              </span>
              <p className="font-serif-apollo text-base font-bold leading-snug min-[400px]:text-lg sm:text-xl xl:max-w-[16rem] xl:text-[17px]">
                Touching Lives, Healing Hearts, Creating Hope
              </p>
            </div>

            {/* Metrics */}
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:flex xl:gap-5">
              {METRICS.map(({ icon: Icon, value, label }) => (
                <li key={label} className="flex min-w-0 items-center gap-2.5">
                  <Icon aria-hidden="true" className="h-5 w-5 shrink-0 text-[#7FE3F5]" />
                  <span className="text-[11px] leading-tight text-cyan-50/90">
                    <b className="block text-sm text-white">{value}</b>
                    {label}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex w-full flex-col items-stretch gap-2 sm:flex-row sm:items-center xl:w-auto">
              <a href="tel:1800-123-6666" className={EMERGENCY_BTN}>
                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
                </span>
                Emergency 1800-123-6666
              </a>

              {onOpenAppointmentModal ? (
                <button type="button" onClick={onOpenAppointmentModal} className={BOOK_BTN}>
                  <Calendar aria-hidden="true" className="h-4 w-4 shrink-0" />
                  Book Appointment
                </button>
              ) : (
                <Link href="/patientcare/appointment" className={BOOK_BTN}>
                  <Calendar aria-hidden="true" className="h-4 w-4 shrink-0" />
                  Book Appointment
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* ================= Main grid: 1 col phone / 2 col tablet / 4 col desktop ================= */}
        <div className="grid grid-cols-1 gap-8 py-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 sm:py-12 lg:grid-cols-4 lg:gap-8">
          {/* 1. Brand */}
          <div className="min-w-0 space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <Image
                src="/images/apollologo.webp"
                alt="Apollo JBP Hospitals logo"
                width={160}
                height={40}
                style={{ width: "auto" }}
                className="h-10 w-auto shrink-0 rounded-xl bg-white p-1.5 object-contain shadow-md"
              />
              <span className="font-serif-apollo text-base font-bold leading-tight min-[400px]:text-lg">
                Apollo JBP Hospitals
                <small className="block text-[10px] font-semibold tracking-widest text-[#7FE3F5]">
                  JABALPUR
                </small>
              </span>
            </div>

            <p className="max-w-xs text-[13px] leading-relaxed text-cyan-50/85 sm:max-w-md lg:max-w-xs">
              A multi-specialty tertiary care centre offering advanced cardiac,
              oncology, robotic joint replacement and neuro-trauma care.
            </p>

            <address className="space-y-2.5 text-[13px] not-italic text-cyan-50/90">
              <p className="flex items-start gap-2.5">
                <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-[#7FE3F5]" />
                <span className="min-w-0">
                  Global Square, Patan Road, Karmeta, Jabalpur, MP 482002
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <PhoneCall aria-hidden="true" className="h-4 w-4 shrink-0 text-[#7FE3F5]" />
                <a href="tel:+917566123666" className="hover:text-white">
                  +91 7566 123666
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail aria-hidden="true" className="h-4 w-4 shrink-0 text-[#7FE3F5]" />
                <a
                  href="mailto:Connect@apollojbphospitals.com"
                  className="min-w-0 break-all hover:text-white"
                >
                  Connect@apollojbphospitals.com
                </a>
              </p>
            </address>

            <ul className="flex flex-wrap gap-2.5 pt-1">
              {SOCIALS.map(({ label, icon: Icon, bg, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`grid h-10 w-10 place-items-center rounded-full text-white shadow-md ring-1 ring-white/30 transition hover:-translate-y-0.5 hover:scale-105 sm:h-9 sm:w-9 ${bg}`}
                  >
                    <Icon aria-hidden="true" className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. Quick navigation */}
          <FooterLinkList title="Quick Navigation" links={QUICK_LINKS} />

          {/* 3. Key services */}
          <FooterLinkList title="Key Services" links={SERVICE_LINKS} />

          {/* 4. Newsletter + accreditation */}
          <div className="min-w-0 space-y-4 sm:col-span-2 lg:col-span-1">
            <div>
              <h4 className="font-serif-apollo text-sm font-bold tracking-wide">
                Health Newsletter
              </h4>
              <span className="mt-2 block h-0.5 w-8 rounded bg-[#16A6C5]" />
            </div>
            <p className="text-[13px] leading-relaxed text-cyan-50/85">
              Doctor-approved health updates and screening tips, in your inbox.
            </p>

            {subscribed ? (
              <p
                role="status"
                className="flex items-center gap-2 rounded-xl border border-emerald-300/60 bg-emerald-400/20 p-3 text-xs font-semibold text-emerald-100"
              >
                <CheckCircle2 aria-hidden="true" className="h-4 w-4 shrink-0 text-emerald-300" />
                You&apos;re subscribed. Thank you!
              </p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex w-full max-w-md items-center rounded-full border border-white/30 bg-white/15 p-1 focus-within:border-white/70 sm:backdrop-blur-md lg:max-w-none"
              >
                <input
                  type="email"
                  required
                  autoComplete="email"
                  aria-label="Email address for health newsletter"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  /* 16px on mobile prevents iOS auto-zoom on focus */
                  className="min-w-0 flex-1 bg-transparent px-3 py-2 text-base text-white placeholder-cyan-50/60 focus:outline-none sm:text-xs"
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-full bg-gradient-to-b from-[#F7D26B] to-[#D9A02B] px-4 py-2 text-xs font-bold text-slate-950 transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  Subscribe
                </button>
              </form>
            )}

            <div className="flex max-w-md items-center gap-3 rounded-2xl border border-emerald-300/40 bg-emerald-500/15 p-3 shadow-[0_0_24px_rgba(52,211,153,0.35)] lg:max-w-none">
              <ShieldCheck aria-hidden="true" className="h-8 w-8 shrink-0 text-emerald-300" />
              <p className="text-[11px] leading-snug text-emerald-50/90">
                <b className="block text-[13px] text-white">NABH &amp; NABL Accredited</b>
                Highest Standard Patient Care
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Bottom legal strip ================= */}
      <div className="relative z-10 border-t border-white/10 bg-[#07384B] pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-center text-xs text-cyan-50/75 sm:px-6 md:flex-row md:text-left lg:px-8">
          <p>© 2025 Apollo JBP Hospitals Jabalpur. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              {LEGAL_LINKS.map((l, i) => (
                <li key={l.label} className="flex items-center gap-4">
                  {i > 0 && <span aria-hidden="true" className="h-3 w-px bg-white/25" />}
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-b from-[#22C1E0] to-[#087F9C] text-white shadow-[0_6px_16px_rgba(0,0,0,0.35)] ring-1 ring-white/30 transition hover:-translate-y-0.5 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              <ArrowUp aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
