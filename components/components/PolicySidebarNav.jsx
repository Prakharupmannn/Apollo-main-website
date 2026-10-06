"use client";

import { useState } from "react";
import {
  ChevronRight,
  Database,
  Mail,
  Share2,
  Lock,
  UserCheck,
  PhoneCall,
} from "lucide-react";

const ICON_MAP = {
  Database,
  Mail,
  Share2,
  Lock,
  UserCheck,
  PhoneCall,
};

export default function PolicySidebarNav({ sections }) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "section-1");

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="space-y-1">
      {sections.map((item) => {
        const Icon = ICON_MAP[item.iconName];
        const isActive = activeSection === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToSection(item.id)}
            className={`w-full flex items-center justify-between text-left text-xs font-semibold px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${
              isActive
                ? "bg-[#0E526B] text-white shadow-md"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
          >
            <div className="flex items-center gap-2.5 truncate">
              {Icon && (
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? "text-[#F59E0B]" : "text-slate-400"
                  }`}
                />
              )}
              <span className="truncate">{item.title}</span>
            </div>
            <ChevronRight
              className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                isActive ? "rotate-90 text-[#F59E0B]" : "text-slate-300"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}