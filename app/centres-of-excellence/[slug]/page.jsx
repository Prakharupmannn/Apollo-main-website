import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Activity, ArrowLeft, ArrowRight, ArrowUpRight, Award, Bone, Brain, Check, ChevronDown,
  GraduationCap, HeartPulse, Microscope, ScanLine, ShieldCheck, Stethoscope,
} from "lucide-react";
import { centresOfExcellence, getCentreBySlug } from "@/data/centresOfExcellence";
import { CentreIcon } from "@/components/centres/CentresJourney";
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/centres/CentreMotion";

/* =====================================================================
   Helpers (module scope: created once, never re-created per render)
   ===================================================================== */
const pad = (n) => String(n).padStart(2, "0");

const ICONS = [
  [/scan|imag|endoscop/i, ScanLine],
  [/cardi|heart|hepat|nephro|kidney/i, HeartPulse],
  [/neuro|brain|stroke/i, Brain],
  [/joint|spine|sport|trauma|ortho/i, Bone],
  [/onco/i, Microscope],
  [/surg|gastro/i, Stethoscope],
  [/emergency|manage/i, ShieldCheck],
];
const iconFor = (name = "") => ICONS.find(([re]) => re.test(name))?.[1] || Activity;

// data can be a plain string or { category|name, items, description }
const norm = (x) =>
  typeof x === "string"
    ? { name: x }
    : { name: x.category || x.name, items: x.items, description: x.description };

const initials = (name = "") =>
  name.replace(/^dr\.?\s*/i, "").split(" ").filter(Boolean).map((w) => w[0]).slice(0, 2).join("").toUpperCase();

const TONES = [
  ["from-[#F6D98A] to-[#C8952E]", "#C8952E"],
  ["from-[#4BB6E8] to-[#087FB7]", "#087FB7"],
  ["from-[#62D2BA] to-[#139B83]", "#139B83"],
  ["from-[#F49A9A] to-[#D95B5B]", "#D95B5B"],
];

/* Decorative backdrops: dot grid + two soft glows in ONE gradient layer.
   (Replaces big blur-3xl divs, which are expensive to paint and scroll.) */
const BACKDROP = {
  light: {
    backgroundImage:
      "radial-gradient(rgba(14,82,107,.09) 1px, transparent 1px), radial-gradient(560px 400px at 100% 0%, rgba(29,130,166,.11), transparent 70%), radial-gradient(480px 360px at 0% 100%, rgba(200,149,46,.11), transparent 70%)",
    backgroundSize: "22px 22px, auto, auto",
    backgroundRepeat: "repeat, no-repeat, no-repeat",
  },
  dark: {
    backgroundImage:
      "radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px), radial-gradient(560px 400px at 100% 0%, rgba(246,217,138,.14), transparent 70%), radial-gradient(480px 360px at 0% 100%, rgba(98,210,186,.14), transparent 70%)",
    backgroundSize: "22px 22px, auto, auto",
    backgroundRepeat: "repeat, no-repeat, no-repeat",
  },
};

const CTA_BG = {
  backgroundImage:
    "radial-gradient(420px 320px at 100% 0%, rgba(29,130,166,.16), transparent 70%), radial-gradient(380px 300px at 0% 100%, rgba(200,149,46,.16), transparent 70%)",
};

const HAIRLINE = "bg-gradient-to-r from-transparent via-[#C8952E]/45 to-transparent";

/* Shared responsive rails (mobile swipe → grid) */
const RAIL_BASE =
  "[&>*]:snap-start -mx-6 grid snap-x snap-mandatory grid-flow-col gap-4 overflow-x-auto px-6 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:auto-cols-auto sm:grid-flow-row sm:overflow-visible sm:px-0 sm:pb-0";
const CARDS_RAIL = `${RAIL_BASE} auto-cols-[86%] sm:grid-cols-2 sm:gap-5`;
const DOCTORS_RAIL = `${RAIL_BASE} auto-cols-[78%] sm:justify-center sm:gap-6 sm:[grid-template-columns:repeat(auto-fit,minmax(250px,300px))]`;

/* =====================================================================
   Building blocks
   ===================================================================== */
const FOCUS =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8952E] focus-visible:ring-offset-2";

const BTN = {
  gold: "text-[#3A2B0A] bg-gradient-to-b from-[#F6D98A] to-[#C8952E] shadow-[0_14px_32px_rgba(200,149,46,.28)] hover:shadow-[0_18px_40px_rgba(200,149,46,.4)] hover:brightness-105",
  line: "border border-[#1D82A6]/20 bg-white text-[#0B3446] hover:border-[#C8952E]/50 hover:bg-[#F8FBFD]",
  ghost: "border border-white/25 text-white/85 hover:border-[#F6D98A]/60 hover:bg-white/10",
};

function Btn({ href, v = "gold", icon: Icon = ArrowRight, className = "", children }) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex min-h-[48px] items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-3.5 text-xs font-extrabold transition duration-300 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${FOCUS} ${BTN[v]} ${className}`}
    >
      {v === "gold" && (
        <span aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 -skew-x-12 bg-white/45 opacity-0 transition duration-700 group-hover:translate-x-[520%] group-hover:opacity-100 motion-reduce:hidden" />
      )}
      <span className="relative">{children}</span>
      <Icon className="relative h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

function Eyebrow({ children, tone = "text-[#0E526B]", className = "mb-4 gap-4" }) {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="h-[3px] w-8 rounded-full bg-gradient-to-r from-[#F6D98A] to-[#C8952E]" />
      <span aria-hidden className="-ml-2 h-1.5 w-1.5 rotate-45 bg-[#C8952E]" />
      <span className={`text-[10px] font-bold uppercase tracking-[0.32em] ${tone}`}>{children}</span>
    </div>
  );
}

function Head({ eyebrow, title, accent, text, dark, aside }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-6 lg:mb-10 lg:flex-row lg:items-end">
      <div className="max-w-2xl">
        <Eyebrow tone={dark ? "text-white/80" : "text-[#0E526B]"}>{eyebrow}</Eyebrow>
        <h2 className={`font-serif text-[34px] leading-[1.08] tracking-[-0.01em] [text-wrap:balance] sm:text-[42px] ${dark ? "text-white" : "text-[#06202B]"}`}>
          {title}{" "}
          <span className={`italic ${dark ? "text-[#F6D98A]" : "text-[#C8952E]"}`}>{accent}</span>
        </h2>
        {text && (
          <p className={`mt-4 max-w-xl text-sm leading-7 ${dark ? "text-white/70" : "text-[#526B77]"}`}>{text}</p>
        )}
      </div>
      {aside}
    </div>
  );
}

/* `defer` lets the browser skip rendering off-screen sections until they near the viewport */
function Section({ id, bg = "bg-white", dark, defer = true, children }) {
  return (
    <Reveal>
      <section
        id={id}
        className={`relative scroll-mt-32 overflow-hidden lg:scroll-mt-36 px-6 py-14 lg:px-10 lg:py-20 ${bg} ${
          defer ? "[contain-intrinsic-size:auto_720px] [content-visibility:auto]" : ""
        }`}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0" style={dark ? BACKDROP.dark : BACKDROP.light} />
        <span aria-hidden className={`absolute inset-x-0 top-0 h-px ${HAIRLINE}`} />
        <div className="relative mx-auto max-w-7xl">{children}</div>
      </section>
    </Reveal>
  );
}

/* Feature card (default) — gold-edged, glass-clean */
function FeatureCard({ name, list, description, i, dark }) {
  const Icon = iconFor(name);
  const [grad, ink] = dark ? TONES[0] : TONES[i % 4];

  return (
    <div
      className={`group relative h-full rounded-[25px] p-px transition-all duration-500 hover:-translate-y-2 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
        dark
          ? "bg-gradient-to-b from-white/25 to-white/5 hover:from-[#F6D98A] hover:to-[#C8952E]/40"
          : "bg-gradient-to-b from-[#E3EBEF] to-[#F3E8CC] shadow-[0_1px_2px_rgba(6,32,43,.04),0_14px_34px_rgba(6,32,43,.06)] hover:from-[#F6D98A] hover:to-[#C8952E] hover:shadow-[0_34px_64px_rgba(6,32,43,.16)]"
      }`}
    >
      <div
        className={`relative h-full overflow-hidden rounded-[24px] p-6 ${
          dark ? "bg-gradient-to-b from-[#16708C] to-[#0E5A74]" : "bg-gradient-to-b from-white to-[#FAFCFD]"
        }`}
      >
        {/* hover glow + top accent + light sweep */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-25"
          style={{ background: `radial-gradient(circle, ${ink}, transparent 70%)` }}
        />
        <span aria-hidden className="absolute inset-x-0 top-0 h-1 origin-left scale-x-[0.18] transition-transform duration-500 group-hover:scale-x-100" style={{ background: ink }} />
        <span aria-hidden className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 transition duration-700 group-hover:translate-x-[420%] group-hover:opacity-100 motion-reduce:hidden" />

        <div className="relative flex items-start justify-between">
          <span className="relative">
            <span aria-hidden className="absolute inset-0 rounded-2xl opacity-40 blur-lg transition group-hover:opacity-70" style={{ background: ink }} />
            <span className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${grad} text-white shadow-lg ring-1 ring-white/40 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 motion-reduce:transition-none`}>
              <Icon className="h-6 w-6" />
            </span>
          </span>
          <span
            aria-hidden
            className={`font-serif text-5xl leading-none text-transparent ${
              dark ? "[-webkit-text-stroke:1px_rgba(255,255,255,.22)]" : "[-webkit-text-stroke:1px_rgba(14,82,107,.2)]"
            }`}
          >
            {pad(i + 1)}
          </span>
        </div>

        <h3 className={`relative mt-5 font-serif text-[20px] leading-tight ${dark ? "text-white" : "text-[#06202B]"}`}>{name}</h3>
        {description && (
          <p className={`relative mt-2.5 text-xs leading-5 ${dark ? "text-white/65" : "text-[#607681]"}`}>{description}</p>
        )}

        {list.length > 0 && (
          <ul className={`relative mt-4 space-y-2 border-t pt-4 ${dark ? "border-white/10" : "border-[#EAF0F3]"}`}>
            {list.map((li, k) => (
              <li key={`${li}-${k}`} className={`flex items-start gap-2.5 text-xs leading-5 ${dark ? "text-white/75" : "text-[#526B77]"}`}>
                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-white" style={{ background: ink }}>
                  <Check className="h-2.5 w-2.5" strokeWidth={4} />
                </span>
                {li}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* Row card (numbered, horizontal) */
function RowCard({ name, list, description, i, dark }) {
  const [, ink] = TONES[i % 4];
  return (
    <div
      className={`group relative flex h-full gap-5 overflow-hidden rounded-[22px] border p-5 transition-all duration-500 hover:translate-x-1.5 hover:border-[#C8952E]/40 hover:shadow-[0_20px_45px_rgba(6,32,43,.10)] motion-reduce:transition-none motion-reduce:hover:translate-x-0 ${
        dark ? "border-white/15 bg-white/[0.06]" : "border-[#E3EBEF] bg-gradient-to-br from-white to-[#FBFDFE]"
      }`}
    >
      <span aria-hidden className="absolute inset-y-0 left-0 w-1 origin-top scale-y-[0.3] transition-transform duration-500 group-hover:scale-y-100" style={{ background: ink }} />
      <span aria-hidden className="font-serif text-4xl italic leading-none" style={{ color: ink }}>{pad(i + 1)}</span>
      <div className="min-w-0">
        <h3 className={`font-serif text-lg leading-tight ${dark ? "text-white" : "text-[#06202B]"}`}>{name}</h3>
        {description && <p className={`mt-2 text-xs leading-5 ${dark ? "text-white/60" : "text-[#607681]"}`}>{description}</p>}
        {list.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-2">
            {list.map((li, k) => (
              <span key={`${li}-${k}`} className="rounded-full border px-3 py-1 text-[11px] leading-4" style={{ borderColor: `${ink}40`, background: `${ink}0F`, color: "#3F5A66" }}>
                {li}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Cards({ items, cols, dark, variant }) {
  const Card = variant === "row" ? RowCard : FeatureCard;
  return (
    <Stagger className={`${CARDS_RAIL} ${cols}`} delay={0.07}>
      {items.map((raw, i) => {
        const { name, items: list = [], description } = norm(raw);
        return (
          <StaggerItem key={`${name}-${i}`} y={20}>
            <Card name={name} list={list} description={description} i={i} dark={dark} />
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}

function CardSection({ items, bg, dark, cols, variant, aside, ...head }) {
  if (!items?.length) return null;
  return (
    <Section id={head.id} bg={bg} dark={dark}>
      <Head dark={dark} aside={aside && <Btn {...aside}>{aside.label}</Btn>} {...head} />
      <Cards items={items} cols={cols} dark={dark} variant={variant} />
    </Section>
  );
}

/* =====================================================================
   Config: 4 card sections, 1 renderer
   ===================================================================== */
const SECTIONS = [
  {
    id: "capabilities", bg: "bg-[#F7FBFD]", cols: "lg:grid-cols-3",
    eyebrow: "Complete Care", title: "Care designed around", accent: "your journey.",
    text: "Our multidisciplinary approach brings together clinical expertise, technology and coordinated care to support patients through every stage of treatment.",
  },
  {
    id: "conditions", cols: "xl:grid-cols-4",
    eyebrow: "Conditions We Treat", title: "Care for a wide range of", accent: "conditions.",
    text: "Our specialists provide assessment and treatment across the major conditions associated with this Centre of Excellence.",
  },
  {
    id: "diagnostics", dark: true, cols: "xl:grid-cols-4",
    bg: "bg-gradient-to-br from-[#0A5F7A] via-[#17627D] to-[#0B526B]",
    eyebrow: "Advanced Diagnostics", title: "Accurate diagnosis.", accent: "Better outcomes.",
    text: "State-of-the-art diagnostic facilities help our specialists detect, evaluate and monitor conditions with precision.",
    aside: { href: "/ourspecialities/radio-diagnosis", label: "Explore Diagnostics", v: "ghost" },
  },
  {
    id: "treatments", bg: "bg-[#F7FBFD]", cols: "lg:grid-cols-2", variant: "row",
    eyebrow: "Treatment Options", title: "Comprehensive treatment for", accent: "lasting relief.",
    text: "From medical management to advanced procedures, we offer a full range of treatment options tailored to each patient.",
    aside: { href: "/treatments", label: "Explore Treatments", v: "line" },
  },
];

/* =====================================================================
   Sticky quick-nav (pure CSS, scrolls sideways on phones) + mobile CTA bar
   ===================================================================== */
const NAV = [
  ["capabilities", "Capabilities"],
  ["conditions", "Conditions"],
  ["diagnostics", "Diagnostics"],
  ["treatments", "Treatments"],
  ["preventive", "Prevention"],
  ["doctors", "Specialists"],
];

function SectionNav({ c }) {
  const has = {
    capabilities: c.capabilities, conditions: c.conditions, diagnostics: c.diagnostics,
    treatments: c.treatments, preventive: c.preventiveCare, doctors: c.doctors,
  };
  const links = NAV.filter(([id]) => has[id]?.length);
  if (links.length < 2) return null;

  return (
    <nav aria-label="Page sections" className="sticky top-16 z-30 mt-10 border-y border-[#C8952E]/20 bg-white/85 backdrop-blur-xl lg:top-20">
      <ul className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:justify-center lg:px-10">
        {links.map(([id, label]) => (
          <li key={id} className="shrink-0">
            <a
              href={`#${id}`}
              className={`inline-flex min-h-[40px] items-center rounded-full border border-[#1D82A6]/15 bg-white px-4 text-xs font-bold text-[#0E526B] transition hover:border-[#C8952E]/50 hover:bg-[#FFF9EA] hover:text-[#8A6212] ${FOCUS}`}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function StickyBook({ hasDoctors }) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#C8952E]/25 bg-white/90 px-4 pt-3 shadow-[0_-12px_30px_rgba(6,32,43,.08)] backdrop-blur-xl pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden">
      <div className="mx-auto flex max-w-md gap-3">
        <Btn href="/patientcare/appointment" className="flex-1">Book an Appointment</Btn>
        <Btn href={hasDoctors ? "#doctors" : "/doctors"} v="line" icon={ArrowUpRight} className="px-5">Doctors</Btn>
      </div>
    </div>
  );
}

/* =====================================================================
   Unique sections
   ===================================================================== */
function Hero({ c }) {
  const words = c.title.split(" ");
  const last = words.pop();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white to-[#F7FBFD] pb-16 pt-32 lg:pb-20 lg:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "radial-gradient(520px 380px at 100% 8%, rgba(29,130,166,.12), transparent 70%), radial-gradient(420px 320px at 0% 100%, rgba(200,149,46,.10), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <span aria-hidden className="pointer-events-none absolute -top-8 right-4 select-none font-serif text-[clamp(7rem,20vw,17rem)] italic leading-none text-transparent [-webkit-text-stroke:1px_rgba(200,149,46,.22)] lg:right-10">
          {c.id}
        </span>
        <Link href="/centres-of-excellence" className={`group mb-10 inline-flex items-center gap-2 rounded-sm text-xs font-semibold uppercase tracking-[0.2em] text-[#0E526B] hover:text-[#C8952E] ${FOCUS}`}>
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" /> All Centres
        </Link>

        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-10">
          <Reveal y={20}>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C8952E]/25 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0E526B] shadow-[0_6px_18px_rgba(200,149,46,.10)]">
              <i className="h-1.5 w-1.5 rounded-full bg-[#C8952E]" />
              Apollo Hospitals Jabalpur — Centre {c.id} / 07
            </span>

            <p className="font-serif text-xl italic text-[#C8952E]">{c.subtitle}</p>

            <h1 className="mt-3 text-[clamp(2.1rem,6.4vw,3.5rem)] font-extrabold leading-[1.04] tracking-tight text-[#06202B] [text-wrap:balance]">
  <span className="relative inline">
    {words.join(" ")}{words.length > 0 && " "}
    <span className="text-[#1D82A6]">
      {last}
    </span>

    <span
      aria-hidden="true"
      className="absolute bottom-[-5px] left-0 h-[2px] w-full rounded-full bg-gradient-to-r from-[#C8952E] via-[#C8952E]/60 to-transparent"
    />
  </span>
</h1>

            <p className="mt-7 max-w-md text-base leading-8 text-slate-500">{c.description}</p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Btn href="/patientcare/appointment">Book an Appointment</Btn>
              <Btn href={c.doctors?.length ? "#doctors" : "/doctors"} v="line" icon={ArrowUpRight}>View Specialists</Btn>
            </div>
          </Reveal>

          <Reveal y={24} delay={0.08} className="relative">
            <span aria-hidden className="absolute -right-6 -top-6 hidden h-28 w-28 rounded-full border border-[#C8952E]/30 sm:block" />
            {/* gold keyline frame */}
            <span aria-hidden className="absolute -bottom-4 -left-4 right-5 top-6 rounded-[32px] border border-[#C8952E]/35" />

            <div className="group relative aspect-[4/3.1] overflow-hidden rounded-[28px] shadow-[0_40px_90px_rgba(6,32,43,.20)] ring-1 ring-white/60 sm:aspect-[4/3]">
              <Image src={c.image} alt={c.title} fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105 motion-reduce:transition-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06202B]/45 via-transparent to-transparent" />
              <div className="absolute inset-0 rounded-[28px] ring-1 ring-inset ring-white/20" />
            </div>

            <div className="absolute -right-3 top-8 z-10 rounded-2xl border border-[#F6D98A]/20 bg-gradient-to-br from-[#0B3446] to-[#06202B] px-5 py-4 shadow-[0_20px_45px_rgba(6,32,43,.35)] sm:-right-6 sm:top-10">
              <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#F6D98A]/80">Capabilities</div>
              <div className="mt-1 font-serif text-3xl italic text-white">{pad(c.capabilities?.length || 0)}</div>
              <div className="mt-0.5 text-[11px] text-white/60">Specialised services</div>
            </div>

            <div className="absolute -bottom-7 left-6 right-6 z-10 flex items-center gap-4 rounded-2xl border border-white/70 bg-white/95 px-5 py-4 shadow-[0_25px_60px_rgba(6,32,43,.14)] sm:left-10 sm:right-auto sm:w-[280px]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EDF6FB] ring-1 ring-[#C8952E]/30">
                <CentreIcon slug={c.slug} active={false} />
              </span>
              <div>
                <div className="text-sm font-bold text-[#06202B]">{c.title}</div>
                <div className="text-[11px] text-slate-500">{c.eyebrow}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Facts({ c }) {
  const { capabilities = [], conditions = [], diagnostics = [], stats } = c;
  const facts = [
    [Stethoscope, capabilities.length, "Core Capabilities"],
    [Activity, conditions.length, "Care Categories"],
    [ScanLine, diagnostics.length, "Diagnostic Services"],
    [ShieldCheck, stats?.[0]?.value || "360°", stats?.[0]?.label || "Integrated Care"],
  ];

  return (
    <section className="relative z-20 -mt-8 px-6 lg:px-10">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0E526B] via-[#0B4A61] to-[#0E526B] p-3 shadow-[0_25px_60px_rgba(6,32,43,.18)] ring-1 ring-[#F6D98A]/20">
        <span aria-hidden className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#F6D98A]/70 to-transparent" />
        <div className="grid grid-cols-2 divide-x divide-white/15 lg:grid-cols-4">
          {facts.map(([Icon, value, label], i) => (
            <div key={label} className="flex items-center gap-3 px-4 py-5 sm:px-6">
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${i ? "bg-white/10 text-[#F6D98A]" : "bg-gradient-to-b from-[#F6D98A] to-[#C8952E] text-[#3A2B0A]"}`}>
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="font-serif text-xl text-white">
                  {typeof value === "number" ? (value ? <CountUp value={value} /> : "—") : value}
                </div>
                <div className="text-[10px] text-white/65">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

function Preventive({ c }) {
  const list = c.preventiveCare || [];
  if (!list.length) return null;

  return (
    <Section id="preventive" bg="bg-white">
      <Head eyebrow="Preventive Care" title="Stay ahead of" accent="health risks."
        text="Prevention, screening and lifestyle guidance can support earlier detection and long-term wellbeing." />

      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="group relative min-h-[220px] overflow-hidden rounded-[22px] ring-1 ring-[#C8952E]/25">
          <Image src={c.image} alt="" fill sizes="(max-width:1024px) 100vw, 35vw" className="object-cover transition-transform duration-1000 group-hover:scale-105 motion-reduce:transition-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06202B]/80 to-transparent" />
          <div className="absolute inset-x-5 bottom-5">
            <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#F6D98A]">
              <HeartPulse className="h-3.5 w-3.5" /> Prevention matters
            </div>
            <p className="mt-2 text-xs leading-5 text-white/80">Early attention, appropriate screening and healthy habits can support timely care.</p>
          </div>
        </div>

        <div className="grid content-start gap-2.5 rounded-[22px] border border-[#DDE9EE] bg-white p-5 shadow-[0_10px_30px_rgba(6,32,43,.04)] sm:grid-cols-2 sm:p-7">
          {list.map((item, k) => (
            <div key={`${item}-${k}`} className="group flex items-start gap-3 rounded-[14px] border border-[#E8EFF2] bg-[#FAFCFD] p-4 transition hover:-translate-y-0.5 hover:border-[#C8952E]/30 hover:bg-white hover:shadow-[0_10px_24px_rgba(6,32,43,.06)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#EDF7FA] text-[#0E526B] transition group-hover:bg-[#C8952E] group-hover:text-white">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <span className="pt-0.5 text-[11.5px] leading-5 text-[#526B77]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* Specialised care + highlights in ONE section */
function Closing({ c }) {
  const care = c.specializedCare || [];
  const hl = c.highlights || [];
  if (!care.length && !hl.length) return null;

  return (
    <Section bg="bg-[#F7FBFD]">
      <div className="grid gap-5 lg:grid-cols-2">
        {care.length > 0 && (
          <Reveal className="rounded-[26px] border border-[#E3EBEF] bg-gradient-to-b from-white to-[#FBFDFE] p-7 shadow-[0_12px_34px_rgba(6,32,43,.06)]">
            <Eyebrow className="mb-3 gap-3">Specialised Care</Eyebrow>
            <h2 className="font-serif text-[28px] leading-tight text-[#06202B] [text-wrap:balance]">
              Focused expertise for <span className="italic text-[#C8952E]">complex needs.</span>
            </h2>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {care.map((x, k) => {
                const { name } = norm(x);
                const Icon = iconFor(name);
                return (
                  <span key={`${name}-${k}`} className="inline-flex items-center gap-2 rounded-full border border-[#E3EBEF] bg-[#F8FBFD] px-4 py-2 text-xs text-[#3F5A66] transition hover:-translate-y-0.5 hover:border-[#C8952E]/40 hover:bg-white hover:shadow-[0_8px_20px_rgba(200,149,46,.14)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                    <Icon className="h-3.5 w-3.5 text-[#C8952E]" /> {name}
                  </span>
                );
              })}
            </div>
          </Reveal>
        )}

        {hl.length > 0 && (
          <Reveal delay={0.08} className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-[#1D82A6] to-[#0E6A8B] p-7 shadow-[0_20px_50px_rgba(14,82,107,.25)] ring-1 ring-[#F6D98A]/20">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ backgroundImage: "radial-gradient(360px 280px at 100% 0%, rgba(246,217,138,.18), transparent 70%)" }}
            />
            <div className="relative">
              <Eyebrow tone="text-white/80" className="mb-3 gap-3">Why This Centre</Eyebrow>
              <h2 className="font-serif text-[28px] leading-tight text-white [text-wrap:balance]">
                A connected approach to <span className="italic text-[#F6D98A]">specialist care.</span>
              </h2>
              <ul className="mt-6 space-y-3">
                {hl.map((x, k) => {
                  const { name } = norm(x);
                  return (
                    <li key={`${name}-${k}`} className="flex items-start gap-3 text-sm leading-6 text-white/80">
                      <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-[#F6D98A] to-[#C8952E] text-[#3A2B0A]">
                        <Check className="h-2.5 w-2.5" strokeWidth={4} />
                      </span>
                      {name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        )}
      </div>
    </Section>
  );
}

/* =====================================================================
   Doctors (dynamic per centre: c.doctors)
   Details block is shared by the mobile accordion and the desktop hover card
   so the markup/logic exists once.
   ===================================================================== */
const GLASS_INSET = "shadow-[inset_0_1px_0_rgba(255,255,255,.18)] backdrop-blur-xl";

function SpecialityTag({ children, size = "text-[10px] tracking-[0.2em]" }) {
  return (
    <div className={`flex items-center gap-2 font-bold uppercase text-[#F6D98A] ${size}`}>
      <i className="h-1.5 w-1.5 rounded-full bg-[#F6D98A] shadow-[0_0_10px_#F6D98A]" />
      {children}
    </div>
  );
}

function DoctorDetails({ d, desktop = false }) {
  const expertise = (d.expertise || []).slice(0, 3);
  const pt = desktop ? "pt-4" : "pt-3";

  return (
    <div className={`space-y-3.5 ${pt}`}>
      {d.qualification && (
        <p className={`flex items-start gap-2 border-t border-white/10 text-[11px] leading-5 text-white/75 ${pt}`}>
          <GraduationCap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#F6D98A]" />
          {d.qualification}
        </p>
      )}

      {expertise.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {expertise.map((e) => (
            <span key={e} className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] text-white/80">{e}</span>
          ))}
        </div>
      )}

      <Link
        href={`/patientcare/appointment?doctor=${encodeURIComponent(d.slug || d.name)}`}
        className={`group/b flex items-center justify-between rounded-full bg-gradient-to-b from-[#F6D98A] to-[#C8952E] py-1.5 pl-5 pr-1.5 text-xs font-extrabold text-[#3A2B0A] shadow-[0_10px_28px_rgba(200,149,46,.35)] transition hover:brightness-105 ${FOCUS}`}
      >
        Book Appointment
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0E526B] text-[#F6D98A] transition-transform duration-300 group-hover/b:rotate-45">
          <ArrowUpRight className="h-4 w-4" />
        </span>
      </Link>
    </div>
  );
}

function DoctorCard({ d, i }) {
  const [grad] = TONES[i % 4];

  return (
    <article className="group relative h-full rounded-[32px] bg-gradient-to-b from-[#1D82A6]/25 via-[#1D82A6]/5 to-[#C8952E]/40 p-px shadow-[0_14px_36px_rgba(6,32,43,.10)] transition-all duration-500 hover:-translate-y-2 hover:from-[#F6D98A] hover:via-[#F6D98A]/30 hover:to-[#C8952E] hover:shadow-[0_32px_64px_rgba(6,32,43,.22)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="relative h-full overflow-hidden rounded-[31px] bg-[#0E526B]">
        {/* portrait */}
        <div className={`relative aspect-[3/4] overflow-hidden bg-gradient-to-br sm:aspect-[4/5] ${grad}`}>
          {d.image ? (
            <Image
              src={d.image}
              alt={d.name}
              fill
              sizes="(max-width:640px) 78vw, (max-width:1024px) 50vw, 300px"
              className="object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06] motion-reduce:transition-none"
            />
          ) : (
            <div className="absolute inset-0 flex items-start justify-center pt-[18%]">
              <span aria-hidden className="absolute -right-10 top-10 h-56 w-56 rounded-full border border-white/20" />
              <span aria-hidden className="absolute -right-2 top-20 h-36 w-36 rounded-full border border-white/20" />
              <span className="font-serif text-8xl italic text-white/90">{initials(d.name)}</span>
            </div>
          )}

          {/* depth overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A5F7A] via-[#0A5F7A]/35 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(246,217,138,.18),transparent_55%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          {/* top row */}
          <div className="absolute inset-x-4 top-4 flex items-center justify-between">
            <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 font-serif text-xs italic text-white backdrop-blur-md">
              {pad(i + 1)}
            </span>
            {d.experience && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F6D98A]/40 bg-[#0E526B]/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#F6D98A] backdrop-blur-md">
                <Award className="h-3 w-3" />
                {d.experience}
              </span>
            )}
          </div>

          {/* ===== MOBILE: tap-to-expand details (no JS) ===== */}
          <details className="absolute inset-x-3 bottom-3 lg:hidden">
            <summary className={`flex cursor-pointer list-none items-center justify-between rounded-[22px] border border-white/25 bg-[#0E7FA3]/55 px-4 py-3 backdrop-blur-xl [&::-webkit-details-marker]:hidden ${FOCUS}`}>
              <div>
                <SpecialityTag size="text-[9px] tracking-[0.16em]">{d.speciality}</SpecialityTag>
                <h3 className="mt-1 font-serif text-[19px] leading-tight text-white">{d.name}</h3>
              </div>
              <span className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F6D98A] text-[#0E526B] transition-transform duration-300 group-open:rotate-180">
                <ChevronDown className="h-4 w-4" />
              </span>
            </summary>

            <div className={`mt-2 rounded-[22px] border border-white/25 bg-[#0E7FA3]/55 p-4 ${GLASS_INSET}`}>
              {d.designation && <p className="text-[11px] leading-5 text-white/60">{d.designation}</p>}
              <DoctorDetails d={d} />
            </div>
          </details>
        </div>

        {/* ===== DESKTOP: floating glass card, expands on hover / keyboard focus ===== */}
        <div className={`absolute inset-x-3 bottom-3 hidden rounded-[24px] border border-white/25 bg-[#0E7FA3]/45 p-5 lg:block ${GLASS_INSET}`}>
          <SpecialityTag>{d.speciality}</SpecialityTag>
          <h3 className="mt-2 font-serif text-[22px] leading-tight text-white">{d.name}</h3>
          {d.designation && <p className="mt-1 line-clamp-2 text-[11.5px] leading-5 text-white/60">{d.designation}</p>}

          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-focus-within:grid-rows-[1fr] group-hover:grid-rows-[1fr] motion-reduce:transition-none">
            <div className="overflow-hidden">
              <DoctorDetails d={d} desktop />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function Doctors({ c }) {
  const list = c.doctors || [];
  if (!list.length) return null;

  return (
    <Section id="doctors" defer={false} bg="bg-gradient-to-b from-white via-[#F3F9FB] to-white">
      <Head
        eyebrow="Our Specialists"
        title="Meet the experts behind"
        accent="your care."
        text={`Experienced consultants from our ${c.title} team, focused on accurate diagnosis and compassionate treatment.`}
        aside={
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[#C8952E]/30 bg-[#FFF9EA] px-4 py-2 text-[11px] font-bold text-[#8A6212]">
              {pad(list.length)} {list.length === 1 ? "Specialist" : "Specialists"}
            </span>
            <Btn href="/doctors" v="line" icon={ArrowUpRight}>View all doctors</Btn>
          </div>
        }
      />

      {/* auto-fit + justify-center → 1, 2, 3 or 8 doctors always look balanced */}
      <Stagger className={DOCTORS_RAIL} delay={0.09}>
        {list.map((d, i) => (
          <StaggerItem key={d.slug || d.name} y={28}>
            <DoctorCard d={d} i={i} />
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

function Related({ list }) {
  return (
    <Section bg="bg-[#F3F9FB]">
      <Head eyebrow="Explore More" title="Our Centres of" accent="Excellence."
        aside={<Btn href="/centres-of-excellence" v="line">View all centres</Btn>} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((r) => (
          <Link key={r.slug} href={`/centres-of-excellence/${r.slug}`}
            className={`group overflow-hidden rounded-[20px] bg-[#062F40] shadow-[0_12px_35px_rgba(6,32,43,.10)] ring-1 ring-transparent transition-all duration-500 hover:-translate-y-1.5 hover:ring-[#C8952E]/50 hover:shadow-[0_25px_50px_rgba(6,32,43,.18)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${FOCUS}`}>
            <div className="relative h-[190px] overflow-hidden">
              <Image src={r.image} alt={r.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105 motion-reduce:transition-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06202B] via-[#06202B]/20 to-transparent" />
              <span className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 ring-1 ring-[#C8952E]/30">
                <CentreIcon slug={r.slug} active={false} />
              </span>
              <span className="absolute bottom-4 left-5 text-[9px] font-bold uppercase tracking-[0.2em] text-[#F6D98A]">{r.eyebrow}</span>
            </div>
            <div className="flex items-center justify-between p-5">
              <h3 className="font-serif text-lg text-white">{r.title}</h3>
              <ArrowRight className="h-4 w-4 text-white/60 transition group-hover:translate-x-1 group-hover:text-[#F6D98A]" />
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

function Cta({ c }) {
  return (
    <section className="bg-white px-6 py-12 lg:px-10 lg:py-14">
      <div
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[24px] border border-[#C8952E]/25 bg-gradient-to-br from-[#EAF6FA] via-white to-[#FBF3DE] px-6 py-12 shadow-[0_24px_60px_rgba(6,32,43,.08)] sm:px-10 lg:px-14 lg:py-14"
        style={CTA_BG}
      >
        <span aria-hidden className={`absolute inset-x-10 top-0 h-px ${HAIRLINE}`} />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.28em] text-[#0E526B]">{c.title}</p>
            <h2 className="font-serif text-[30px] leading-[1.08] text-[#06202B] [text-wrap:balance] sm:text-[36px]">
              Ready to begin your <span className="italic text-[#C8952E]">care journey?</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#526B77]">
              Connect with our specialists at Apollo Hospitals, Jabalpur and take the first step toward the right care for you.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Btn href="/patientcare/appointment">Book an Appointment</Btn>
            <Btn href="/centres-of-excellence" v="line">All Centres</Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   Route
   ===================================================================== */
export function generateStaticParams() {
  return centresOfExcellence.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = getCentreBySlug(slug);
  if (!c) return {};
  const title = `${c.title} | Apollo Hospitals Jabalpur`;
  const description = c.seoDescription || c.description;
  return { title, description, openGraph: { title, description } };
}

export default async function CentrePage({ params }) {
  const { slug } = await params;
  const c = getCentreBySlug(slug);
  if (!c) notFound();

  const related = centresOfExcellence.filter((x) => x.slug !== c.slug).slice(0, 3);

  return (
    <main className="bg-white pb-20 antialiased lg:pb-0">
      <Hero c={c} />
      <Facts c={c} />
      <SectionNav c={c} />

      {SECTIONS.map((s) => (
        <CardSection key={s.id} {...s} items={c[s.id]} />
      ))}

      <Preventive c={c} />
      <Closing c={c} />
      <Doctors c={c} />
      <Related list={related} />
      <Cta c={c} />
      <StickyBook hasDoctors={!!c.doctors?.length} />
    </main>
  );
}
