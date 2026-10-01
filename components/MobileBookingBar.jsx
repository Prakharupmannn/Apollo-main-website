"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function MobileBookingBar({ phone, bookHref }) {
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const footer = document.querySelector("footer");

    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFooterVisible(entry.isIntersecting);
      },
      {
        threshold: 0,
      }
    );

    observer.observe(footer);

    return () => observer.disconnect();
  }, []);

  if (footerVisible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#E3EEF2] bg-white/95 p-3 shadow-[0_-10px_30px_rgba(14,82,107,.10)] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-md gap-2">
        {phone && (
          <Link
            href={`tel:${phone}`}
            aria-label="Call OPD"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#BFD6DF] text-[#0E526B]"
          >
            <Phone className="h-5 w-5" />
          </Link>
        )}

        <Link
          href={bookHref}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0E526B] to-[#137A9A] text-sm font-bold text-white shadow-lg"
        >
          Book Appointment
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}