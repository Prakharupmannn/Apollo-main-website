"use client";

import { useState } from "react";
import { BookOpen, Check, GraduationCap, Sparkles } from "lucide-react";

export default function ProfileTabs({ about, expertise, education, tone }) {
  const tabs = [
    { id: "overview", label: "Overview", icon: BookOpen, count: 0 },
    { id: "expertise", label: "Expertise", icon: Sparkles, count: expertise.length },
    { id: "education", label: "Education", icon: GraduationCap, count: education.length },
  ].filter((t) => t.id === "overview" || t.count > 0);

  const [active, setActive] = useState("overview");

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[#E3EEF2] bg-white shadow-[0_14px_40px_rgba(14,82,107,.08)]">
      <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#E1B54A]/15 blur-3xl" />

      {/* tab bar */}
      <div
        role="tablist"
        className="relative flex gap-2 overflow-x-auto border-b border-[#EDF2F4] bg-gradient-to-r from-[#F4FAFC] to-[#FFF9EC] p-3"
      >
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = active === t.id;

          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(t.id)}
              className={[
                "flex shrink-0 items-center gap-2 rounded-2xl px-5 py-3 text-xs font-bold transition-all duration-300",
                isActive
                  ? "bg-gradient-to-r from-[#0E526B] to-[#137A9A] text-white shadow-[0_10px_22px_rgba(14,82,107,.25)]"
                  : "text-[#607681] hover:bg-white hover:text-[#0E526B]",
              ].join(" ")}
            >
              <Icon className="h-4 w-4" />
              {t.label}
              {t.count > 0 && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] ${
                    isActive ? "bg-white/20" : "bg-[#EDF7FA] text-[#0E526B]"
                  }`}
                >
                  {t.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* panel */}
      <div key={active} className="anim-fade-up relative p-6 sm:p-8" style={{ animationDuration: "0.45s" }}>
        {active === "overview" && (
          <div className="space-y-4">
            {about.map((p, i) => (
              <p key={i} className="text-[15px] leading-8 text-[#3F5A66]">
                {p}
              </p>
            ))}
          </div>
        )}

        {active === "expertise" && (
          <div className="grid gap-3 sm:grid-cols-2">
            {expertise.map((item, i) => (
              <div
                key={item}
                className="anim-fade-up group flex items-center gap-3 rounded-2xl border border-[#E3EEF2] bg-[#F8FBFD] p-3.5 transition duration-300 hover:-translate-y-0.5 hover:border-[#C8952E]/40 hover:bg-white hover:shadow-[0_14px_32px_rgba(14,82,107,.09)]"
                style={{ animationDelay: `${i * 45}ms` }}
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition group-hover:bg-[#C8952E] group-hover:text-white"
                  style={{ background: tone.soft, color: tone.ink }}
                >
                  <Sparkles className="h-4 w-4" />
                </span>
                <span className="text-[13px] font-semibold leading-5 text-[#06202B]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        )}

        {active === "education" && (
          <ol className="relative space-y-5 border-l-2 border-dashed border-[#DCEAF0] pl-7">
            {education.map((q, i) => (
              <li
                key={`${q.degree}-${i}`}
                className="anim-fade-up relative"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <span className="absolute -left-[42px] top-0 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#0E526B] to-[#137A9A] text-white ring-4 ring-white">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-bold text-[#06202B]">{q.degree}</p>
                  {q.year && (
                    <span className="rounded-full bg-[#FFF8E7] px-2.5 py-0.5 text-[10px] font-bold text-[#C8952E]">
                      {q.year}
                    </span>
                  )}
                </div>

                {q.institute && (
                  <p className="mt-0.5 text-xs leading-5 text-[#607681]">
                    {q.institute}
                  </p>
                )}
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}