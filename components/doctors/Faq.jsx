"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

export default function Faq({ items }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((f, i) => {
        const on = open === i;
        return (
          <div key={f.q} className={`overflow-hidden rounded-[22px] border transition-colors duration-300 ${on ? "border-[#C8952E]/40 bg-white shadow-[0_18px_44px_rgba(6,32,43,.08)]" : "border-[#E3EBEF] bg-white/70"}`}>
            <button onClick={() => setOpen(on ? -1 : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left" aria-expanded={on}>
              <span className="font-serif text-[17px] leading-snug text-[#06202B]">{f.q}</span>
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${on ? "rotate-45 bg-[#C8952E] text-white" : "bg-[#EDF7FA] text-[#0E526B]"}`}>
                <Plus className="h-4 w-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="px-6 pb-6 text-sm leading-7 text-[#526B77]">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
