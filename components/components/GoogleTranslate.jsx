"use client";

import {
  useEffect,
  useCallback,
  useSyncExternalStore,
} from "react";
import Script from "next/script";
import { Languages } from "lucide-react";

const COOKIE = "googtrans";

/* ───────── cookie helpers ───────── */
function readLang() {
  if (typeof document === "undefined") return "en";
  const m = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  return m && decodeURIComponent(m[1]).endsWith("/hi") ? "hi" : "en";
}

function writeCookie(value) {
  const host = window.location.hostname;
  document.cookie = `${COOKIE}=${value}; path=/; max-age=31536000`;
  if (host.includes(".")) {
    document.cookie = `${COOKIE}=${value}; path=/; max-age=31536000; domain=.${host}`;
    document.cookie = `${COOKIE}=${value}; path=/; max-age=31536000; domain=${host}`;
  }
}

function clearCookie() {
  const host = window.location.hostname;
  const past = "expires=Thu, 01 Jan 1970 00:00:00 UTC";
  document.cookie = `${COOKIE}=; ${past}; path=/`;
  if (host.includes(".")) {
    document.cookie = `${COOKIE}=; ${past}; path=/; domain=.${host}`;
    document.cookie = `${COOKIE}=; ${past}; path=/; domain=${host}`;
  }
}

/* ───────── shared language store ─────────
   The phone switcher and the tablet/laptop switcher are both mounted,
   so they must share one state or they go out of sync. */
let currentLang = "en";
let switching = false;
const listeners = new Set();

function setGlobalLang(next) {
  currentLang = next;
  listeners.forEach((fn) => fn());
}
function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
const getSnapshot = () => currentLang;
const getServerSnapshot = () => "en";

/* ───────── translator helpers ───────── */
function findCombo() {
  return document.querySelector("select.goog-te-combo");
}

/* Waits for Google's hidden dropdown (slow on mobile) instead of reloading at once */
function waitForCombo(timeoutMs = 4000) {
  return new Promise((resolve) => {
    const start = Date.now();
    const tick = () => {
      const combo = findCombo();
      if (combo && combo.options.length > 1) return resolve(combo);
      if (Date.now() - start >= timeoutMs) return resolve(null);
      setTimeout(tick, 80);
    };
    tick();
  });
}

function applyLang(combo, next) {
  const hasOption = Array.from(combo.options).some((o) => o.value === next);
  combo.value = hasOption ? next : "";
  combo.dispatchEvent(new Event("change", { bubbles: true }));
}

function hasTranslatedLeftovers() {
  return !!document.querySelector('body font[style*="vertical-align"]');
}

function whenDomSettles(onQuiet, quietMs = 200, maxMs = 2000) {
  let timer;
  let finished = false;
  let hardCap;
  const obs = new MutationObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(finish, quietMs);
  });
  function finish() {
    if (finished) return;
    finished = true;
    clearTimeout(timer);
    clearTimeout(hardCap);
    obs.disconnect();
    onQuiet();
  }
  obs.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });
  timer = setTimeout(finish, quietMs);
  hardCap = setTimeout(finish, maxMs);
}

/* ───────── Put this ONCE in layout ───────── */
export function GoogleTranslateLoader() {
  useEffect(() => {
    // Keep React from crashing when Google rewrites text nodes
    if (typeof Node === "function" && !Node.prototype.__gtPatched) {
      Node.prototype.__gtPatched = true;

      const origRemove = Node.prototype.removeChild;
      Node.prototype.removeChild = function (child) {
        if (child.parentNode !== this) return child;
        return origRemove.apply(this, arguments);
      };

      const origInsert = Node.prototype.insertBefore;
      Node.prototype.insertBefore = function (newNode, ref) {
        if (ref && ref.parentNode !== this) return newNode;
        return origInsert.apply(this, arguments);
      };
    }
    setGlobalLang(readLang());
  }, []);

  return (
    <>
      {/* Off-screen (not display:none) so mobile browsers still build the dropdown */}
      <div
        id="google_translate_element"
        className="notranslate"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: 1,
          height: 1,
          overflow: "hidden",
          pointerEvents: "none",
        }}
      />
      <Script id="gt-init" strategy="afterInteractive">
        {`
          window.googleTranslateElementInit = function () {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: "en",
                includedLanguages: "en,hi",
                autoDisplay: false
              },
              "google_translate_element"
            );
          };
        `}
      </Script>
      <Script
        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />
    </>
  );
}

/* ───────── Sliding gold pill switcher ───────── */
export function LanguageSwitcher({ variant = "light", showIcon = false }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Make sure the saved language is read on mount
  useEffect(() => {
    setGlobalLang(readLang());
  }, []);

  const change = useCallback(
    (next) => {
      if (next === currentLang || switching) return;
      switching = true;

      const root = document.documentElement;

      // 1. Pill moves instantly (all switchers update together)
      setGlobalLang(next);

      // 2. Save choice
      if (next === "hi") writeCookie("/en/hi");
      else clearCookie();

      // 3. Free the main thread while translating
      root.classList.add("lang-switching");

      const finishUp = () => {
        root.classList.remove("lang-switching");
        switching = false;
      };

      // 4. Let the pill paint, then translate
      requestAnimationFrame(async () => {
        const combo = await waitForCombo(4000);

        // Translator never loaded: the cookie is set, so a reload applies it
        if (!combo) {
          window.location.reload();
          return;
        }

        applyLang(combo, next);

        whenDomSettles(() => {
          finishUp();
          // English did not fully restore: reload once
          if (next === "en" && hasTranslatedLeftovers()) {
            window.location.reload();
          }
        });
      });
    },
    [],
  );

  const isHi = lang === "hi";

  const track =
    variant === "light"
      ? "bg-white/15 border-white/30"
      : "bg-[#EDF6FB] border-[#1D82A6]/25";
  const inactive =
    variant === "light"
      ? "text-white/85 hover:text-white"
      : "text-slate-600 hover:text-[#0A5F7A]";

  return (
    <div
      className="notranslate flex items-center gap-1.5 shrink-0"
      translate="no"
    >
      {showIcon && (
        <Languages className="w-3.5 h-3.5 text-amber-300 drop-shadow-[0_0_6px_rgba(252,211,77,0.5)]" />
      )}
      <div
        role="group"
        aria-label="Language switcher"
        className={`relative grid grid-cols-2 items-center rounded-full border p-0.5 ${track}`}
      >
        <span
          aria-hidden="true"
          className={`absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] rounded-full shadow-[0_2px_8px_rgba(197,146,46,0.5)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isHi ? "translate-x-full" : "translate-x-0"
          }`}
          style={{
            background: "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)",
          }}
        />
        <button
          type="button"
          onClick={() => change("en")}
          aria-pressed={!isHi}
          className={`relative z-10 min-h-[28px] min-w-[36px] px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wide transition-colors duration-300 cursor-pointer border-0 bg-transparent [touch-action:manipulation] ${
            !isHi ? "text-[#3A2B0A]" : inactive
          }`}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => change("hi")}
          aria-pressed={isHi}
          className={`relative z-10 min-h-[28px] min-w-[36px] px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-extrabold transition-colors duration-300 cursor-pointer border-0 bg-transparent [touch-action:manipulation] ${
            isHi ? "text-[#3A2B0A]" : inactive
          }`}
        >
          हिं
        </button>
      </div>
    </div>
  );
}