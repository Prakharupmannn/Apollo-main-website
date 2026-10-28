"use client";

import React, { useId, useRef, useState } from "react";

export default function AreaChart({ data }) {
  const W = 720,
    H = 300;
  const pad = { l: 46, r: 22, t: 28, b: 36 };
  const uid = useId().replace(/:/g, "");
  const ref = useRef(null);
  const [hover, setHover] = useState(null);

  const max = Math.max(
    50,
    Math.ceil(Math.max(...data.map((d) => d.value)) / 50) * 50
  );
  const step = (W - pad.l - pad.r) / (data.length - 1);
  const x = (i) => pad.l + i * step;
  const y = (v) => pad.t + (H - pad.t - pad.b) * (1 - v / max);
  const peak = data.reduce((m, d, i) => (d.value > data[m].value ? i : m), 0);

  const pts = data.map((d, i) => [x(i), y(d.value)]);
  const line = pts.reduce((acc, [px, py], i) => {
    if (i === 0) return `M ${px} ${py}`;
    const [qx, qy] = pts[i - 1];
    const mx = (qx + px) / 2;
    return `${acc} C ${mx} ${qy}, ${mx} ${py}, ${px} ${py}`;
  }, "");
  const area = `${line} L ${x(data.length - 1)} ${H - pad.b} L ${x(0)} ${
    H - pad.b
  } Z`;
  const ticks = [0, 1, 2, 3, 4].map((t) => Math.round((max / 4) * t));

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = ((e.clientX - r.left) / r.width) * W;
    setHover(
      Math.max(0, Math.min(data.length - 1, Math.round((px - pad.l) / step)))
    );
  };

  const tipX =
    hover !== null ? Math.min(Math.max(x(hover) - 46, 4), W - 96) : 0;
  const tipY = hover !== null ? Math.max(y(data[hover].value) - 62, 2) : 0;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full overflow-visible"
      onMouseMove={onMove}
      onMouseLeave={() => setHover(null)}
      role="img"
      aria-label="Appointments overview chart"
    >
      <defs>
        <linearGradient id={`fill${uid}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0A5F7A" stopOpacity="0.20" />
          <stop offset="60%" stopColor="#0A5F7A" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#0A5F7A" stopOpacity="0" />
        </linearGradient>
        <filter id={`shadow${uid}`} x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0F172A" floodOpacity="0.10" />
        </filter>
      </defs>

      {/* Grid lines */}
      {ticks.map((t) => (
        <g key={t}>
          <line
            x1={pad.l}
            x2={W - pad.r}
            y1={y(t)}
            y2={y(t)}
            stroke="#E2E8F0"
            strokeDasharray="4 6"
            strokeWidth="1"
          />
          <text
            x={pad.l - 12}
            y={y(t) + 4}
            textAnchor="end"
            fontSize="11"
            fill="#64748B"
            fontWeight="500"
          >
            {t}
          </text>
        </g>
      ))}

      {/* Gradient Area */}
      <path d={area} fill={`url(#fill${uid})`} />

      {/* Smooth Line */}
      <path
        d={line}
        fill="none"
        stroke="#0A5F7A"
        strokeWidth="2.75"
        strokeLinecap="round"
      />

      {/* Points & X-Labels */}
      {data.map((d, i) => (
        <g key={d.label}>
          <circle
            cx={x(i)}
            cy={y(d.value)}
            r="3.5"
            fill="#FFFFFF"
            stroke="#0A5F7A"
            strokeWidth="2"
            opacity={hover === i ? 0 : 0.9}
          />
          <text
            x={x(i)}
            y={H - 12}
            textAnchor="middle"
            fontSize="11"
            fill={hover === i ? "#0A5F7A" : "#64748B"}
            fontWeight={hover === i ? 700 : 500}
          >
            {d.label}
          </text>
        </g>
      ))}

      {/* Peak marker */}
      <g>
        <circle
          cx={x(peak)}
          cy={y(data[peak].value)}
          r="4.5"
          fill="#F59E0B"
          stroke="#FFFFFF"
          strokeWidth="2"
        />
        {hover === null && (
          <g>
            <rect
              x={x(peak) - 34}
              y={y(data[peak].value) - 26}
              width="68"
              height="20"
              rx="6"
              fill="#FEF3C7"
              stroke="#FDE68A"
            />
            <text
              x={x(peak)}
              y={y(data[peak].value) - 13}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="#92400E"
            >
              Peak {data[peak].value}
            </text>
          </g>
        )}
      </g>

      {/* Hover interaction */}
      {hover !== null && (
        <g>
          <line
            x1={x(hover)}
            x2={x(hover)}
            y1={pad.t}
            y2={H - pad.b}
            stroke="#0A5F7A"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <circle
            cx={x(hover)}
            cy={y(data[hover].value)}
            r="5.5"
            fill="#FFFFFF"
            stroke="#0A5F7A"
            strokeWidth="3"
          />
          <g
            transform={`translate(${tipX}, ${tipY})`}
            filter={`url(#shadow${uid})`}
          >
            <rect
              width="92"
              height="46"
              rx="12"
              fill="#FFFFFF"
              stroke="#E2E8F0"
              strokeWidth="1"
            />
            <text
              x="46"
              y="18"
              textAnchor="middle"
              fontSize="10"
              fontWeight="600"
              fill="#64748B"
            >
              {data[hover].label}
            </text>
            <text
              x="46"
              y="36"
              textAnchor="middle"
              fontSize="15"
              fontWeight="700"
              fill="#0A5F7A"
            >
              {data[hover].value}
            </text>
          </g>
        </g>
      )}
    </svg>
  );
}