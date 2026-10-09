"use client";
import { useEffect, useState } from "react";
import { X, PlayCircle } from "lucide-react";
import PodcastPlayer, { Podcast } from "./PodcastPlayer";

export default function WatchOverview({ podcasts, title }: { podcasts?: Podcast[]; title: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!podcasts?.length) return null; // no podcast → no button

  return (
    <>
      <button onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-5 py-2.5 font-semibold text-sky-700 shadow-sm transition hover:bg-sky-50">
        <PlayCircle className="h-5 w-5" /> Watch Overview
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}>
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">{title}</h2>
              <button onClick={() => setOpen(false)} aria-label="Close"
                className="rounded-full p-2 hover:bg-slate-100"><X className="h-5 w-5" /></button>
            </div>
            <PodcastPlayer podcasts={podcasts} />
          </div>
        </div>
      )}
    </>
  );
}