"use client";

import React, { useEffect, useId, useState } from "react";
import { numFont } from "./fonts";

function useMounted() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return on;
}

/* ---------- Sparkline with end dot ---------- */
export function Sparkline({
  data,
  color = "#0A5F7A",
  width = 112,
  height = 42,
}) {
  const uid = useId().replace(/:/g, "");
  const pad = 5;
  const max = Math.max(...data),
    min = Math.min(...data);
  const pts = data.map((d, i) => [
    pad + (i * (width - pad * 2)) / (data.length - 1),
    height - pad - ((d - min) / (max - min || 1)) * (height - pad * 2),
  ]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0]} ${p[1]}`).join(" ");
  const last = pts[pts.length - 1];
  const area = `${line} L${last[0]} ${height} L${pts[0][0]} ${height} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-10 w-28 overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`sp${uid}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#sp${uid})`} />
      <path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={last[0]} cy={last[1]} r="4" fill={color} />
      <circle
        cx={last[0]}
        cy={last[1]}
        r="2"
        fill="#ffffff"
      />
    </svg>
  );
}

/* ---------- Donut chart with legend ---------- */
export function DonutChart({ segments, centerLabel = "Total" }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const R = 74,
    C = 2 * Math.PI * R,
    GAP = 5;
  const on = useMounted();
  const [hover, setHover] = useState(null);

  let acc = 0;
  const arcs = segments.map((s, i) => {
    const part = (s.value / total) * C;
    const a = { ...s, i, len: Math.max(0, part - GAP), off: acc };
    acc += part;
    return a;
  });
  const active = hover !== null ? arcs[hover] : null;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative h-48 w-48 shrink-0">
        <svg viewBox="0 0 200 200" className="relative h-full w-full -rotate-90">
          <circle
            cx="100"
            cy="100"
            r={R}
            fill="none"
            stroke="#F1F5F9"
            strokeWidth="18"
          />
          {arcs.map((a) => (
            <circle
              key={a.label}
              cx="100"
              cy="100"
              r={R}
              fill="none"
              stroke={a.color}
              strokeWidth={hover === a.i ? 22 : 18}
              strokeDasharray={`${on ? a.len : 0} ${C}`}
              strokeDashoffset={-a.off}
              onMouseEnter={() => setHover(a.i)}
              onMouseLeave={() => setHover(null)}
              style={{
                transition:
                  "stroke-dasharray 1.1s cubic-bezier(.2,.8,.2,1), stroke-width .2s, opacity .2s",
                opacity: hover === null || hover === a.i ? 1 : 0.4,
                cursor: "pointer",
              }}
            />
          ))}
        </svg>
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <div>
            <p
              className={`${numFont.className} text-4xl font-bold leading-none text-slate-900`}
            >
              {active ? active.value : total}
            </p>
            <p className="mt-1.5 text-xs font-semibold text-slate-500">
              {active ? active.label : centerLabel}
            </p>
          </div>
        </div>
      </div>

      <ul className="w-full space-y-1.5">
        {arcs.map((a) => (
          <li
            key={a.label}
            onMouseEnter={() => setHover(a.i)}
            onMouseLeave={() => setHover(null)}
            className={`flex cursor-default items-center justify-between rounded-xl px-3 py-2 text-sm transition ${
              hover === a.i ? "bg-slate-100" : "hover:bg-slate-50"
            }`}
          >
            <span className="flex items-center gap-2.5 font-medium text-slate-700">
              <span
                className="h-2.5 w-2.5 rounded-full ring-2 ring-white shadow-xs"
                style={{ background: a.color }}
              />
              {a.label}
            </span>
            <span className="flex items-center gap-3">
              <span className="font-bold text-slate-900">{a.value}</span>
              <span className="w-10 rounded-full bg-slate-100 px-2 py-0.5 text-right text-xs font-semibold text-slate-500">
                {Math.round((a.value / total) * 100)}%
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Radial gauge ---------- */
export function RadialGauge({ value, label, sub }) {
  const uid = useId().replace(/:/g, "");
  const on = useMounted();
  const R = 70,
    C = 2 * Math.PI * R;
  const v = Math.min(100, Math.max(0, value));

  return (
    <div className="relative mx-auto h-52 w-52">
      <svg viewBox="0 0 180 180" className="relative h-full w-full -rotate-90">
        <defs>
          <linearGradient id={`g${uid}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#0A5F7A" />
            <stop offset="100%" stopColor="#1D82A6" />
          </linearGradient>
        </defs>
        <circle
          cx="90"
          cy="90"
          r="56"
          fill="none"
          stroke="#E2E8F0"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
        <circle
          cx="90"
          cy="90"
          r={R}
          fill="none"
          stroke="#F1F5F9"
          strokeWidth="12"
        />
        <circle
          cx="90"
          cy="90"
          r={R}
          fill="none"
          stroke={`url(#g${uid})`}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={`${on ? (v / 100) * C : 0} ${C}`}
          style={{
            transition: "stroke-dasharray 1.4s cubic-bezier(.2,.8,.2,1)",
          }}
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
        <div>
          <p
            className={`${numFont.className} text-5xl font-bold leading-none text-slate-900`}
          >
            {v}
            <span className="text-2xl text-[#0A5F7A]">%</span>
          </p>
          <p className="mt-2 text-xs font-bold text-slate-800">{label}</p>
          {sub && <p className="text-[11px] font-medium text-slate-500">{sub}</p>}
        </div>
      </div>
    </div>
  );
}