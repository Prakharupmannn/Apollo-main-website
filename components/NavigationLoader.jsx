"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Loader from "./Loader";

export default function NavigationLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Keep track of active URL to prevent loading on same-page clicks
  const currentUrlRef = useRef("");
  const timerRef = useRef(null);
  const safetyTimeoutRef = useRef(null);

  // Update current URL ref when pathname or searchParams change
  useEffect(() => {
    if (typeof window !== "undefined") {
      currentUrlRef.current = window.location.href;
    }
  }, [pathname, searchParams]);

  // When pathname or searchParams change, the navigation has completed!
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }

    setIsLoading(false);
    setIsVisible(false);
  }, [pathname, searchParams]);

  const startNavigation = useCallback(() => {
    if (isLoading) return;

    // 80ms debounce avoids flickering on instantaneous transitions (prefetched/cached routes)
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsLoading(true);
      setIsVisible(true);
    }, 80);

    // Safety timeout: automatically dismiss after 8s so the screen never gets blocked permanently
    if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    safetyTimeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setIsVisible(false);
    }, 8000);
  }, [isLoading]);

  const stopNavigation = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (safetyTimeoutRef.current) {
      clearTimeout(safetyTimeoutRef.current);
      safetyTimeoutRef.current = null;
    }
    setIsLoading(false);
    setIsVisible(false);
  }, []);

  useEffect(() => {
    // 1. Efficient event delegation on document for all internal link clicks
    const handleAnchorClick = (event) => {
      // Only process primary left clicks without modifier keys
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

      // Find closest anchor tag
      const anchor = event.target && event.target.closest ? event.target.closest("a") : null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Ignore downloads
      if (anchor.hasAttribute("download")) return;

      // Ignore new tab/window targets
      const target = anchor.getAttribute("target");
      if (target && target !== "_self") return;

      // Ignore non-http/https protocols
      if (
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:") ||
        href.startsWith("sms:") ||
        href.startsWith("whatsapp:")
      ) {
        return;
      }

      try {
        const targetUrl = new URL(anchor.href, window.location.href);
        const currentUrl = new URL(window.location.href);

        // Ignore external domains
        if (targetUrl.origin !== currentUrl.origin) return;

        // Ignore same-page navigation (same pathname and search) including anchor #hashes
        const isSamePathname = targetUrl.pathname === currentUrl.pathname;
        const isSameSearch = targetUrl.search === currentUrl.search;

        if (isSamePathname && isSameSearch) {
          return;
        }

        // Legitimate navigation to a new route or search query
        startNavigation();
      } catch {
        // Ignore invalid URL parsing
      }
    };

    // 2. Handle browser Back / Forward history navigation
    const handlePopState = () => {
      startNavigation();
    };

    // 3. Custom events for any component that wishes to trigger navigation loader
    const handleCustomStart = () => startNavigation();
    const handleCustomEnd = () => stopNavigation();

    // Attach listeners with passive/capture flags
    document.addEventListener("click", handleAnchorClick, { capture: true });
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("app:navigation-start", handleCustomStart);
    window.addEventListener("app:navigation-end", handleCustomEnd);

    // Intercept pushState and replaceState for programmatic routing
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      const urlArg = args[2];
      if (urlArg) {
        try {
          const nextUrl = new URL(urlArg, window.location.href);
          const currentUrl = new URL(window.location.href);
          if (
            nextUrl.origin === currentUrl.origin &&
            (nextUrl.pathname !== currentUrl.pathname || nextUrl.search !== currentUrl.search)
          ) {
            startNavigation();
          }
        } catch {}
      }
      return originalPushState.apply(this, args);
    };

    window.history.replaceState = function (...args) {
      const urlArg = args[2];
      if (urlArg) {
        try {
          const nextUrl = new URL(urlArg, window.location.href);
          const currentUrl = new URL(window.location.href);
          if (
            nextUrl.origin === currentUrl.origin &&
            (nextUrl.pathname !== currentUrl.pathname || nextUrl.search !== currentUrl.search)
          ) {
            startNavigation();
          }
        } catch {}
      }
      return originalReplaceState.apply(this, args);
    };

    // Clean up event listeners properly to prevent memory leaks
    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("app:navigation-start", handleCustomStart);
      window.removeEventListener("app:navigation-end", handleCustomEnd);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;

      if (timerRef.current) clearTimeout(timerRef.current);
      if (safetyTimeoutRef.current) clearTimeout(safetyTimeoutRef.current);
    };
  }, [startNavigation, stopNavigation]);

  if (!isVisible) return null;

  return (
    <div className="transition-opacity duration-200 ease-in-out opacity-100">
      <Loader fullScreen={true} />
    </div>
  );
}

