"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Loader from "./Loader";

export default function NavigationLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Admin panel mein navigation loader disable
  const isAdminRoute = pathname.startsWith("/admin");

  const [isVisible, setIsVisible] = useState(false);

  const loadingRef = useRef(false);
  const timerRef = useRef(null);
  const safetyTimeoutRef = useRef(null);
  // Jo URL abhi screen par commit hai (pathname + search, hash ke bina)
  const committedKeyRef = useRef("");

  const clearTimers = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    timerRef.current = null;
    safetyTimeoutRef.current = null;
  }, []);

  const stopNavigation = useCallback(() => {
    clearTimers();
    loadingRef.current = false;
    setIsVisible(false);
  }, [clearTimers]);

  const startNavigation = useCallback(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    // 150ms: fast/cached navigation par loader dikhega hi nahi
    timerRef.current = setTimeout(() => setIsVisible(true), 150);

    // Safety: kabhi 6s se zyada nahi atkega
    safetyTimeoutRef.current = setTimeout(stopNavigation, 6000);
  }, [stopNavigation]);

  // Navigation complete: committed URL update karo aur loader band karo
  useEffect(() => {
    committedKeyRef.current = window.location.pathname + window.location.search;
    stopNavigation();
  }, [pathname, searchParams, stopNavigation]);

  useEffect(() => {
    // Sirf tab loader chalao jab pathname ya search sach me badle (hash-only par nahi)
    const isRealChange = (url) =>
      url.pathname + url.search !== committedKeyRef.current;

    const handleAnchorClick = (event) => {
      if (
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        event.defaultPrevented
      ) {
        return;
      }

      const anchor = event.target?.closest?.("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || anchor.hasAttribute("download")) return;

      const target = anchor.getAttribute("target");
      if (target && target !== "_self") return;

      if (/^(mailto:|tel:|javascript:|sms:|whatsapp:|#)/.test(href)) return;

      try {
        const targetUrl = new URL(anchor.href, window.location.href);
        if (targetUrl.origin !== window.location.origin) return;
        if (!isRealChange(targetUrl)) return;

        startNavigation();
      } catch {}
    };

    // Back / Forward: us waqt window.location pehle se NAYA URL hota hai
    const handlePopState = () => {
      if (isRealChange(new URL(window.location.href))) {
        startNavigation();
      } else {
        stopNavigation();
      }
    };

    // Browser cache (bfcache) se page wapas aaye to loader kabhi na dikhe
    const handlePageShow = (event) => {
      if (event.persisted) stopNavigation();
    };

    const handleCustomStart = () => startNavigation();
    const handleCustomEnd = () => stopNavigation();

    document.addEventListener("click", handleAnchorClick, { capture: true });
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("app:navigation-start", handleCustomStart);
    window.addEventListener("app:navigation-end", handleCustomEnd);

    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("app:navigation-start", handleCustomStart);
      window.removeEventListener("app:navigation-end", handleCustomEnd);
      clearTimers();
    };
  }, [startNavigation, stopNavigation, clearTimers]);

  if (isAdminRoute) return null;

  if (!isVisible) return null;

  return (
    <div className="transition-opacity duration-200 ease-in-out opacity-100">
      <Loader fullScreen={true} />
    </div>
  );
}
