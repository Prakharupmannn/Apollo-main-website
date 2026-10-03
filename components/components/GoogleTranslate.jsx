"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { Languages } from "lucide-react";

const COOKIE = "googtrans";

function readLang() {
  if (typeof document === "undefined") return "en";
  const m = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
  return m && decodeURIComponent(m[1]).endsWith("/hi") ? "hi" : "en";
}

function writeCookie(value) {
  const host = window.location.hostname;
  document.cookie = `${COOKIE}=${value}; path=/`;
  if (host.includes(".")) {
    document.cookie = `${COOKIE}=${value}; path=/; domain=.${host}`;
    document.cookie = `${COOKIE}=${value}; path=/; domain=${host}`;
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

/* ───────── Put this ONCE in layout.js ───────── */
export function GoogleTranslateLoader() {
  useEffect(() => {
    // Stops React from crashing when Google Translate rewrites text nodes
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
  }, []);

  return (
    <>
      <div id="google_translate_element" style={{ display: "none" }} />
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
  const [lang, setLang] = useState("en");

  // Read the saved language after mount (avoids hydration mismatch)
  useEffect(() => {
    setLang(readLang());
  }, []);

  const isHi = lang === "hi";

  const change = (next) => {
    if (next === lang) return;
    if (next === "hi") writeCookie("/en/hi");
    else clearCookie();
    window.location.reload();
  };

  const track =
    variant === "light"
      ? "bg-white/15 border-white/30"
      : "bg-[#EDF6FB] border-[#1D82A6]/25";
  const inactive =
    variant === "light"
      ? "text-white/85 hover:text-white"
      : "text-slate-600 hover:text-[#0A5F7A]";

  return (
    <div className="notranslate flex items-center gap-1.5 shrink-0" translate="no">
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
          className={`relative z-10 px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wide transition-colors duration-300 cursor-pointer border-0 bg-transparent ${
            !isHi ? "text-[#3A2B0A]" : inactive
          }`}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => change("hi")}
          aria-pressed={isHi}
          className={`relative z-10 px-2.5 sm:px-3 py-1 rounded-full text-[11px] font-extrabold transition-colors duration-300 cursor-pointer border-0 bg-transparent ${
            isHi ? "text-[#3A2B0A]" : inactive
          }`}
        >
          हिं
        </button>
      </div>
    </div>
  );
}