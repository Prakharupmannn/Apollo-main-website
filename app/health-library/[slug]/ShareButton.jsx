"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch (e) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-xs font-extrabold text-[#0E526B] hover:bg-[#EDF6FB] border border-[#1D82A6]/25 shadow-sm transition-all cursor-pointer"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-emerald-600" />
      ) : (
        <Share2 className="w-3.5 h-3.5 text-[#1D82A6]" />
      )}
      <span>{copied ? "Link Copied!" : "Share"}</span>
    </button>
  );
}