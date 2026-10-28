"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Loader2,
  ArrowRight,
  PhoneCall,
  CheckCircle2,
  ArrowUp,
  X,
  FileText,
  CalendarCheck,
  Stethoscope,
} from "lucide-react";
import PremiumBackground, { GlowFrame, PHOTOS } from "./PremiumBackground";

// Single login copy (used by everyone: patients, doctors & staff)
const COPY = {
  placeholder: "Enter Email, UHID or Employee ID",
  sub: "Patients, doctors and staff can sign in here to access reports, appointments, clinical history and hospital services from one secure place.",
  empty: "Please enter your registered email, UHID or Employee ID.",
};

const CHIPS = [
  { icon: FileText, label: "Lab Reports" },
  { icon: CalendarCheck, label: "OPD Booking" },
  { icon: Stethoscope, label: "Clinical History" },
];

const inputBase =
  "w-full rounded-lg border border-slate-200 bg-slate-100/80 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-[inset_0_1px_2px_rgba(15,23,42,0.05)] transition-all duration-200 hover:border-slate-300 focus:border-[#0A5F7A] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#0A5F7A]/15";

/** Crossfading Unsplash slideshow with Ken Burns zoom. */
function PhotoSlider() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % PHOTOS.slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const slide = PHOTOS.slides[idx];

  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#0A5F7A] to-[#02141C]">
      {PHOTOS.slides.map((s, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={s.src}
          src={s.src}
          alt=""
          referrerPolicy="no-referrer"
          loading={i === 0 ? "eager" : "lazy"}
          onError={(e) => (e.currentTarget.style.display = "none")}
          className={`apx-kenburns absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#021923]/90 via-[#021923]/20 to-[#021923]/25" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A5F7A]/25 via-transparent to-[#C8952E]/15 mix-blend-soft-light" />

      {/* Logo plate */}
      <Link
        href="/"
        className="apx-shine apx-stagger absolute left-6 top-6 inline-flex items-center rounded-xl bg-white/95 px-4 py-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.3)] transition-transform duration-300 hover:scale-[1.04]"
        style={{ "--i": 0 }}
      >
        <Image
          src="/images/apollologo.webp"
          alt="Apollo JBP Hospitals"
          width={360}
          height={100}
          priority
          className="object-contain"
          style={{ height: "clamp(36px, 6.5dvh, 54px)", width: "auto" }}
        />
      </Link>

      {/* Bottom glass caption */}
      <div className="absolute inset-x-5 bottom-5">
        <div className="rounded-2xl border border-white/20 bg-white/10 p-5 text-white shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <div key={idx} className="apx-stagger" style={{ "--i": 0 }}>
            <p className="font-serif text-xl font-bold leading-tight">{slide.title}</p>
            <p className="mt-1 text-sm text-white/80">{slide.text}</p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {CHIPS.map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-[#F6D98A]">
                <Icon className="h-3 w-3" />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-1.5">
            {PHOTOS.slides.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show slide ${i + 1}`}
                onClick={() => setIdx(i)}
                className={`h-1.5 cursor-pointer rounded-full transition-all duration-500 ${
                  i === idx ? "w-8 bg-[#F6D98A]" : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginForm() {
  const router = useRouter();

  // const { login } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [capsLock, setCapsLock] = useState(false);

  const [error, setError] = useState("");
  const [shakeKey, setShakeKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const copy = COPY;

  useEffect(() => {
    if (!showHelpModal) return;
    const onKey = (e) => e.key === "Escape" && setShowHelpModal(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showHelpModal]);

  const fail = (message) => {
    setError(message);
    setShakeKey((k) => k + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!identifier.trim()) {
      return fail(copy.empty);
    }

    if (!password) {
      return fail("Please enter your password.");
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "same-origin",
        body: JSON.stringify({
          login: identifier.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Invalid login credentials."
        );
      }

      setIsSuccess(true);

      router.replace("/admin");
      router.refresh();
    } catch (error) {
      setIsSuccess(false);
      fail(
        error.message ||
          "We could not sign you in. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden font-sans text-slate-800 antialiased selection:bg-[#C8952E] selection:text-white">
      <PremiumBackground />

      <main className="relative z-10 flex min-h-0 flex-1 overflow-y-auto p-3 sm:p-6 lg:p-8">
        <GlowFrame className="apx-rise m-auto w-full max-w-5xl lg:h-[620px] lg:max-h-full">
          <div className="grid h-full grid-cols-1 lg:grid-cols-2">
            {/* LEFT: PHOTO (desktop) */}
            <aside className="relative hidden lg:block">
              <PhotoSlider />
            </aside>

            {/* RIGHT: FORM */}
            <section className="flex min-h-0 flex-col overflow-y-auto bg-white">
              {/* Mobile photo strip */}
              <div className="relative h-36 shrink-0 overflow-hidden lg:hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={PHOTOS.slides[0].src}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="apx-kenburns h-full w-full object-cover"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#021923]/80 to-[#0A5F7A]/20" />
                <div className="absolute inset-x-0 bottom-3 flex justify-center">
                  <span className="rounded-xl bg-white px-4 py-2 shadow-xl">
                    <Image
                      src="/images/apollologo.webp"
                      alt="Apollo JBP Hospitals"
                      width={360}
                      height={100}
                      priority
                      className="object-contain"
                      style={{ height: "40px", width: "auto" }}
                    />
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-center px-7 py-8 sm:px-12 lg:px-12 xl:px-14">
                <div className="mx-auto w-full max-w-md">
                  <div className="apx-stagger flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0A5F7A]" style={{ "--i": 0 }}>
                    <ShieldCheck className="h-4 w-4" />
                    Secure Authentication
                    <span className="apx-live-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </div>

                  <h2 className="apx-stagger mt-2 font-serif text-[2rem] font-bold leading-tight tracking-tight text-slate-900 sm:text-[2.25rem]" style={{ "--i": 1 }}>
                    Login to <span className="apx-grad-text">Apollo JBP</span>
                  </h2>
                  <p className="apx-stagger mt-3 min-h-[3.75rem] text-sm leading-7 text-slate-500" style={{ "--i": 2 }}>
                    {copy.sub}
                  </p>

                  {/* Banners */}
                  {error && (
                    <div key={shakeKey} role="alert" className="apx-shake mt-4 flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-sm text-rose-800">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                      <span className="leading-snug">{error}</span>
                    </div>
                  )}
                  {isSuccess && (
                    <div role="status" className="mt-4 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3.5 text-sm text-emerald-800">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span className="leading-snug">Successfully signed in. Opening your dashboard…</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate className="mt-5 space-y-3.5">
                    <div className="apx-stagger relative" style={{ "--i": 4 }}>
                      <label htmlFor="login-identifier" className="sr-only">
                        {copy.placeholder}
                      </label>
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        id="login-identifier"
                        type="text"
                        autoComplete="username"
                        value={identifier}
                        placeholder={copy.placeholder}
                        onChange={(e) => {
                          setIdentifier(e.target.value);
                          if (error) setError("");
                        }}
                        className={`${inputBase} pl-11 pr-4`}
                      />
                    </div>

                    <div className="apx-stagger relative" style={{ "--i": 5 }}>
                      <label htmlFor="login-password" className="sr-only">
                        Password
                      </label>
                      <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                      <input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        value={password}
                        placeholder="Enter Password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (error) setError("");
                        }}
                        onKeyUp={(e) => setCapsLock(e.getModifierState?.("CapsLock") ?? false)}
                        onBlur={() => setCapsLock(false)}
                        className={`${inputBase} pl-11 pr-12`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 cursor-pointer place-items-center rounded-lg text-slate-400 transition-colors hover:bg-slate-200/70 hover:text-slate-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5F7A]"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>

                    {capsLock && (
                      <p className="flex items-center gap-1.5 pl-1 text-xs font-medium text-amber-600">
                        <ArrowUp className="h-3.5 w-3.5" /> Caps Lock is on
                      </p>
                    )}

                    <div className="apx-stagger flex items-center justify-between" style={{ "--i": 6 }}>
                      <label className="flex cursor-pointer select-none items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="h-4 w-4 cursor-pointer rounded border-slate-300 text-[#0A5F7A] transition focus:ring-[#0A5F7A] focus:ring-offset-0"
                        />
                        <span className="text-[13px] font-medium text-slate-500">Remember Me</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowHelpModal(true)}
                        className="flex cursor-pointer items-center gap-1 rounded text-[13px] font-semibold text-slate-700 transition-colors hover:text-[#0A5F7A] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A5F7A]"
                      >
                        <HelpCircle className="h-3.5 w-3.5" />
                        Forgot Password?
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{ "--i": 7 }}
                      className="apx-stagger apx-shine group mt-1 flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-lg bg-gradient-to-r from-[#0A5F7A] via-[#1496BE] to-[#0A5F7A] bg-[length:200%_100%] px-6 py-3.5 text-sm font-bold tracking-wide text-white shadow-[0_14px_30px_rgba(10,95,122,0.38)] transition-all duration-500 hover:-translate-y-0.5 hover:bg-[position:100%_0] hover:shadow-[0_20px_40px_rgba(10,95,122,0.48)] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0A5F7A]/40 active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-75"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-[#F6D98A]" />
                          <span>{isSuccess ? "Redirecting…" : "Verifying credentials…"}</span>
                        </>
                      ) : (
                        <>
                          <span>Login</span>
                          <ArrowRight className="h-4 w-4 text-[#F6D98A] transition-transform duration-200 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Helpdesk button (blue pill like the reference) */}
                  {/* <a
                    href="tel:7566123666"
                    style={{ "--i": 8 }}
                    className="apx-stagger mt-3 inline-flex items-center gap-2.5 rounded-lg bg-[#1877F2] px-4 py-2.5 text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(24,119,242,0.3)] transition-all hover:-translate-y-0.5 hover:bg-[#166FE0] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1877F2]/40"
                  >
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[#1877F2]">
                      <PhoneCall className="h-3.5 w-3.5" />
                    </span>
                    Call Help Desk
                  </a> */}

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 border-t border-slate-100 pt-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 font-medium">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      256-Bit TLS Encryption
                    </span>
                    <Link href="/privacy-policy" className="hover:text-[#0A5F7A] hover:underline">Privacy</Link>
                    <Link href="/terms-of-service" className="hover:text-[#0A5F7A] hover:underline">Terms</Link>
                    <Link href="/contact" className="hover:text-[#0A5F7A] hover:underline">Help Desk</Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </GlowFrame>
      </main>

      <footer className="relative z-10 hidden shrink-0 items-center justify-between gap-3 px-8 py-3 text-xs text-slate-600 sm:flex">
        <span>© 2026 Apollo JBP Hospitals Jabalpur. All rights reserved.</span>
        <span className="flex items-center gap-2">
          <PhoneCall className="h-3.5 w-3.5 text-rose-500" />
          Emergency Hotline 24×7:
          <strong className="notranslate font-semibold text-slate-900" translate="no">1800-123-6666</strong>
        </span>
      </footer>

      {/* Help modal */}
      {showHelpModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="help-modal-title"
          onClick={() => setShowHelpModal(false)}
        >
          <div
            className="apx-rise relative max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-7 shadow-[0_40px_100px_rgba(0,0,0,0.5)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#0A5F7A] via-[#2AB3D6] to-[#C8952E]" />
            <button
              type="button"
              onClick={() => setShowHelpModal(false)}
              aria-label="Close"
              className="absolute right-4 top-5 grid h-8 w-8 cursor-pointer place-items-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-3.5">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#EDF6FB] text-[#0A5F7A] ring-1 ring-[#0A5F7A]/20">
                <HelpCircle className="h-6 w-6" />
              </span>
              <div>
                <h3 id="help-modal-title" className="font-serif text-xl font-bold text-slate-900">Password Assistance</h3>
                <p className="text-xs text-slate-500">Apollo JBP Hospitals Helpdesk</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              To safeguard confidential health records, password resets are securely managed by our patient registration and hospital IT desk. Contact us directly through:
            </p>

            <div className="mt-4 space-y-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="font-medium text-slate-600">Hospital Support Desk</span>
                <a href="tel:7566123666" className="notranslate font-bold text-[#0A5F7A] hover:underline" translate="no">+91 7566123666</a>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-slate-200/60 pt-2.5">
                <span className="font-medium text-slate-600">Emergency Helpline</span>
                <a href="tel:18001236666" className="notranslate font-bold text-rose-600 hover:underline" translate="no">1800-123-6666</a>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-slate-200/60 pt-2.5">
                <span className="font-medium text-slate-600">Official Email</span>
                <a href="mailto:info@apollojbphospitals.com" className="text-xs font-bold text-[#0A5F7A] hover:underline sm:text-sm">info@apollojbphospitals.com</a>
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              Alternatively, visit the TPA & Registration Desk located on the Ground Floor, Global Square, Patan Road, Jabalpur.
            </p>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="cursor-pointer rounded-lg bg-[#0A5F7A] px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#064B61] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#0A5F7A]/40"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}