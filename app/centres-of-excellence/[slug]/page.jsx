import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  ChevronDown,
  Activity, ArrowLeft, ArrowRight, ArrowUpRight, Award, Bone, Brain, Check,
  GraduationCap, HeartPulse, Microscope, ScanLine, ShieldCheck, Stethoscope,
} from "lucide-react";
import { centresOfExcellence, getCentreBySlug } from "@/data/centresOfExcellence";
import { CentreIcon } from "@/components/centres/CentresJourney";
import { CountUp, Reveal, Stagger, StaggerItem } from "@/components/centres/CentreMotion";

/* ---------------- helpers ---------------- */
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
const iconFor = (name = "") => (ICONS.find(([re]) => re.test(name)) || [, Activity])[1];

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

const DOTS = {
  backgroundImage: "radial-gradient(rgba(14,82,107,.10) 1px, transparent 1px)",
  backgroundSize: "22px 22px",
};

/* ---------------- building blocks ---------------- */
const BTN = {
  gold: "text-[#3A2B0A] bg-gradient-to-b from-[#F6D98A] to-[#C8952E] shadow-[0_14px_32px_rgba(200,149,46,.28)]",
  line: "border border-[#1D82A6]/20 bg-white text-[#0B3446] hover:bg-[#F8FBFD]",
  ghost: "border border-white/25 text-white/85 hover:bg-white/10",
};

function Btn({ href, v = "gold", icon: Icon = ArrowRight, children }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-xs font-extrabold transition duration-300 hover:-translate-y-0.5 ${BTN[v]}`}
    >
      {children}
      <Icon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

function Head({ eyebrow, title, accent, text, dark, aside }) {
  return (
    <div className="mb-8 flex flex-col justify-between lg:mb-10 gap-6 lg:flex-row lg:items-end">
      <div className="max-w-2xl">
        <div className="mb-4 flex items-center gap-4">
          <span className="h-[3px] w-8 rounded-full bg-[#C8952E]" />
          <span className={`text-[10px] font-bold uppercase tracking-[0.32em] ${dark ? "text-white/80" : "text-[#0E526B]"}`}>
            {eyebrow}
          </span>
        </div>
        <h2 className={`font-serif text-[34px] leading-[1.08] sm:text-[42px] ${dark ? "text-white" : "text-[#06202B]"}`}>
          {title} <span className={`italic ${dark ? "text-[#F6D98A]" : "text-[#C8952E]"}`}>{accent}</span>
        </h2>
        {text && <p className={`mt-4 text-sm leading-7 ${dark ? "text-white/70" : "text-[#526B77]"}`}>{text}</p>}
      </div>
      {aside}
    </div>
  );
}

function Section({ id, bg = "bg-white", dark, children }) {
  return (
    <Reveal>
      <section id={id} className={`relative scroll-mt-20 overflow-hidden px-6 py-14 lg:px-10 lg:py-20 ${bg}`}>
        {/* decorative layers */}
        <div className="pointer-events-none absolute inset-0 opacity-70" style={dark ? { backgroundImage: "radial-gradient(rgba(255,255,255,.08) 1px, transparent 1px)", backgroundSize: "22px 22px" } : DOTS} />
        <div className={`pointer-events-none absolute -right-32 -top-10 h-96 w-96 rounded-full blur-3xl ${dark ? "bg-[#F6D98A]/10" : "bg-[#1D82A6]/[0.08]"}`} />
        <div className={`pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full blur-3xl ${dark ? "bg-[#62D2BA]/10" : "bg-[#C8952E]/[0.07]"}`} />
        <div className="relative mx-auto max-w-7xl">{children}</div>
      </section>
    </Reveal>
  );
}

/* Feature card (default) */
function FeatureCard({ name, list, description, i, dark }) {
  const Icon = iconFor(name);
  const [grad, ink] = dark ? TONES[0] : TONES[i % 4];

  return (
    <div
      className={`group relative h-full overflow-hidden rounded-[24px] border p-6 transition-all duration-500 hover:-translate-y-2 ${
        dark
          ? "border-white/15 bg-gradient-to-b from-white/[0.10] to-white/[0.03] backdrop-blur-sm hover:border-[#F6D98A]/60"
          : "border-[#E3EBEF] bg-gradient-to-b from-white to-[#FAFCFD] shadow-[0_10px_30px_rgba(6,32,43,.05)] hover:border-transparent hover:shadow-[0_30px_60px_rgba(6,32,43,.14)]"
      }`}
    >
      {/* hover glow + top accent */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30" style={{ background: ink }} />
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-[0.18] transition-transform duration-500 group-hover:scale-x-100" style={{ background: ink }} />

      <div className="relative flex items-start justify-between">
        <span className="relative">
          <span className="absolute inset-0 rounded-2xl opacity-40 blur-lg transition group-hover:opacity-70" style={{ background: ink }} />
          <span className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${grad} text-white shadow-lg transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110`}>
            <Icon className="h-6 w-6" />
          </span>
        </span>
        <span
          className={`font-serif text-5xl leading-none text-transparent ${
            dark ? "[-webkit-text-stroke:1px_rgba(255,255,255,.22)]" : "[-webkit-text-stroke:1px_rgba(14,82,107,.2)]"
          }`}
        >
          {pad(i + 1)}
        </span>
      </div>

      <h3 className={`relative mt-5 font-serif text-[20px] leading-tight ${dark ? "text-white" : "text-[#06202B]"}`}>{name}</h3>
      {description && <p className={`relative mt-2.5 text-xs leading-5 ${dark ? "text-white/60" : "text-[#607681]"}`}>{description}</p>}

      {list.length > 0 && (
        <ul className={`relative mt-4 space-y-2 border-t pt-4 ${dark ? "border-white/10" : "border-[#EAF0F3]"}`}>
          {list.map((li) => (
            <li key={li} className={`flex items-start gap-2.5 text-xs leading-5 ${dark ? "text-white/70" : "text-[#526B77]"}`}>
              <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-white" style={{ background: ink }}>
                <Check className="h-2.5 w-2.5" strokeWidth={4} />
              </span>
              {li}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* Row card (numbered, horizontal) */
function RowCard({ name, list, description, i, dark }) {
  const [, ink] = TONES[i % 4];
  return (
    <div
      className={`group relative flex h-full gap-5 overflow-hidden rounded-[22px] border p-5 transition-all duration-500 hover:translate-x-1.5 hover:shadow-[0_20px_45px_rgba(6,32,43,.10)] ${
        dark ? "border-white/15 bg-white/[0.06]" : "border-[#E3EBEF] bg-white"
      }`}
    >
      <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-[0.3] transition-transform duration-500 group-hover:scale-y-100" style={{ background: ink }} />
      <span className="font-serif text-4xl italic leading-none" style={{ color: ink }}>{pad(i + 1)}</span>
      <div className="min-w-0">
        <h3 className={`font-serif text-lg leading-tight ${dark ? "text-white" : "text-[#06202B]"}`}>{name}</h3>
        {description && <p className={`mt-2 text-xs leading-5 ${dark ? "text-white/60" : "text-[#607681]"}`}>{description}</p>}
        {list.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-2">
            {list.map((li) => (
              <span key={li} className="rounded-full border px-3 py-1 text-[11px] leading-4" style={{ borderColor: `${ink}40`, background: `${ink}0F`, color: "#3F5A66" }}>
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
    <Stagger className={`[&>*]:snap-start -mx-6 grid snap-x snap-mandatory auto-cols-[86%] grid-flow-col gap-4 overflow-x-auto px-6 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:auto-cols-auto sm:grid-flow-row sm:overflow-visible sm:px-0 sm:pb-0 sm:grid-cols-2 sm:gap-5 ${cols}`} delay={0.07}>
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
    <Section bg={bg} dark={dark}>
      <Head dark={dark} aside={aside && <Btn {...aside}>{aside.label}</Btn>} {...head} />
      <Cards items={items} cols={cols} dark={dark} variant={variant} />
    </Section>
  );
}

/* ---------------- config: 6 sections, 1 renderer ---------------- */
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
    aside: { href: "/diagnostics", label: "Explore Diagnostics", v: "ghost" },
  },
  {
    id: "treatments", bg: "bg-[#F7FBFD]", cols: "lg:grid-cols-2", variant: "row",
    eyebrow: "Treatment Options", title: "Comprehensive treatment for", accent: "lasting relief.",
    text: "From medical management to advanced procedures, we offer a full range of treatment options tailored to each patient.",
    aside: { href: "/treatments", label: "Explore Treatments", v: "line" },
  },
];

/* ---------------- unique sections ---------------- */
function Hero({ c }) {
  const words = c.title.split(" ");
  const last = words.pop();

  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-32 lg:pb-20 lg:pt-40">
      <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-[#1D82A6]/[0.07] blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Link href="/centres-of-excellence" className="group mb-10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0E526B] hover:text-[#C8952E]">
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" /> All Centres
        </Link>

        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-10">
          <Reveal y={20}>
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#1D82A6]/15 bg-[#F8FBFD] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0E526B]">
              <i className="h-1.5 w-1.5 rounded-full bg-[#C8952E]" />
              Apollo Hospitals Jabalpur — Centre {c.id} / 07
            </span>

            <p className="font-serif text-xl italic text-[#C8952E]">{c.subtitle}</p>

            <h1 className="mt-3 text-[38px] font-extrabold leading-[1.03] tracking-tight text-[#06202B] sm:text-[46px] lg:text-[52px]">
              {words.join(" ")}{words.length > 0 && " "}
              <span className="relative inline-block text-[#1D82A6]">
                {last}
                <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 200 10" fill="none" preserveAspectRatio="none">
                  <path d="M2 7C40 2 80 2 100 6C120 9 160 2 198 5" stroke="#C8952E" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="mt-7 max-w-md text-base leading-8 text-slate-500">{c.description}</p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Btn href="/contact">Book an Appointment</Btn>
              <Btn href={c.doctors?.length ? "#doctors" : "/doctors"} v="line" icon={ArrowUpRight}>View Specialists</Btn>
            </div>
          </Reveal>

          <Reveal y={24} delay={0.08} className="relative">
            <div className="group relative aspect-[4/3.1] overflow-hidden rounded-[28px] shadow-[0_35px_90px_rgba(6,32,43,.18)] sm:aspect-[4/3]">
              <Image src={c.image} alt={c.title} fill priority sizes="(max-width:1024px) 100vw, 50vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06202B]/40 to-transparent" />
            </div>

            <div className="absolute -right-3 top-8 z-10 rounded-2xl bg-[#06202B] px-5 py-4 shadow-[0_20px_45px_rgba(6,32,43,.35)] sm:-right-6 sm:top-10">
              <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#F6D98A]/80">Capabilities</div>
              <div className="mt-1 font-serif text-3xl italic text-white">{pad(c.capabilities.length)}</div>
              <div className="mt-0.5 text-[11px] text-white/60">Specialised services</div>
            </div>

            <div className="absolute -bottom-7 left-6 right-6 z-10 flex items-center gap-4 rounded-2xl border border-slate-100 bg-white px-5 py-4 shadow-[0_25px_60px_rgba(6,32,43,.14)] sm:left-10 sm:right-auto sm:w-[280px]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EDF6FB]">
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
  const { capabilities, conditions = [], diagnostics = [], stats } = c;
  const facts = [
    [Stethoscope, capabilities.length, "Core Capabilities"],
    [Activity, conditions.length, "Care Categories"],
    [ScanLine, diagnostics.length, "Diagnostic Services"],
    [ShieldCheck, stats?.[0]?.value || "360°", stats?.[0]?.label || "Integrated Care"],
  ];

  return (
    <section className="relative z-20 -mt-8 px-6 lg:px-10">
      <Reveal className="mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-[#0E526B] p-3 shadow-[0_25px_60px_rgba(6,32,43,.16)]">
        <div className="grid grid-cols-2 divide-x divide-white/15 lg:grid-cols-4">
          {facts.map(([Icon, value, label], i) => (
            <div key={label} className="flex items-center gap-3 px-4 py-5 sm:px-6">
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${i ? "bg-white/10 text-[#F6D98A]" : "bg-[#C8952E] text-[#3A2B0A]"}`}>
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <div className="font-serif text-xl text-white">
                  {typeof value === "number" ? <CountUp value={value || "—"} /> : value}
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
    <Section bg="bg-white">
      <Head eyebrow="Preventive Care" title="Stay ahead of" accent="health risks."
        text="Prevention, screening and lifestyle guidance can support earlier detection and long-term wellbeing." />

      <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="group relative min-h-[220px] overflow-hidden rounded-[22px]">
          <Image src={c.image} alt="" fill sizes="(max-width:1024px) 100vw, 35vw" className="object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06202B]/75 to-transparent" />
          <div className="absolute inset-x-5 bottom-5">
            <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#F6D98A]">
              <HeartPulse className="h-3.5 w-3.5" /> Prevention matters
            </div>
            <p className="mt-2 text-xs leading-5 text-white/80">Early attention, appropriate screening and healthy habits can support timely care.</p>
          </div>
        </div>

        <div className="grid content-start gap-2.5 rounded-[22px] border border-[#DDE9EE] bg-white p-5 sm:grid-cols-2 sm:p-7">
          {list.map((item) => (
            <div key={item} className="group flex items-start gap-3 rounded-[14px] border border-[#E8EFF2] bg-[#FAFCFD] p-4 transition hover:-translate-y-0.5 hover:border-[#C8952E]/30 hover:bg-white">
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

/* Specialised care + highlights in ONE section (saves a full section of height) */
function Closing({ c }) {
  const care = c.specializedCare || [];
  const hl = c.highlights || [];
  if (!care.length && !hl.length) return null;

  return (
    <Section bg="bg-[#F7FBFD]">
      <div className="grid gap-5 lg:grid-cols-2">
        {care.length > 0 && (
          <Reveal className="rounded-[26px] border border-[#E3EBEF] bg-white p-7 shadow-[0_10px_30px_rgba(6,32,43,.05)]">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-[3px] w-8 rounded-full bg-[#C8952E]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#0E526B]">Specialised Care</span>
            </div>
            <h2 className="font-serif text-[28px] leading-tight text-[#06202B]">
              Focused expertise for <span className="italic text-[#C8952E]">complex needs.</span>
            </h2>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {care.map((x) => {
                const name = norm(x).name;
                const Icon = iconFor(name);
                return (
                  <span key={name} className="inline-flex items-center gap-2 rounded-full border border-[#E3EBEF] bg-[#F8FBFD] px-4 py-2 text-xs text-[#3F5A66] transition hover:-translate-y-0.5 hover:border-[#C8952E]/40 hover:bg-white">
                    <Icon className="h-3.5 w-3.5 text-[#C8952E]" /> {name}
                  </span>
                );
              })}
            </div>
          </Reveal>
        )}

        {hl.length > 0 && (
          <Reveal delay={0.08} className="relative overflow-hidden rounded-[26px] bg-[#1D82A6] p-7">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#F6D98A]/10 blur-3xl" />
            <div className="relative">
              <div className="mb-3 flex items-center gap-3">
                <span className="h-[3px] w-8 rounded-full bg-[#C8952E]" />
                <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/80">Why This Centre</span>
              </div>
              <h2 className="font-serif text-[28px] leading-tight text-white">
                A connected approach to <span className="italic text-[#F6D98A]">specialist care.</span>
              </h2>
              <ul className="mt-6 space-y-3">
                {hl.map((x) => (
                  <li key={norm(x).name} className="flex items-start gap-3 text-sm leading-6 text-white/75">
                    <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#C8952E] text-[#3A2B0A]">
                      <Check className="h-2.5 w-2.5" strokeWidth={4} />
                    </span>
                    {norm(x).name}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
      </div>
    </Section>
  );
}

/* ---------------- doctors (dynamic per centre: c.doctors) ---------------- */
// function DoctorCard({ d, i }) {
//   const [grad, ink] = TONES[i % 4];
//   const expertise = (d.expertise || []).slice(0, 3);

//   return (
//     <article className="group relative h-full rounded-[32px] bg-gradient-to-b from-[#1D82A6]/25 via-[#1D82A6]/5 to-[#C8952E]/40 p-px shadow-[0_14px_36px_rgba(6,32,43,.10)] transition-all duration-500 hover:-translate-y-2 hover:from-[#F6D98A] hover:via-[#F6D98A]/30 hover:to-[#C8952E] hover:shadow-[0_32px_64px_rgba(6,32,43,.22)]">
//       <div className="relative h-full overflow-hidden rounded-[31px] bg-[#0E526B]">
//         {/* portrait */}
//         <div className={`relative aspect-[3/4] overflow-hidden bg-gradient-to-br sm:aspect-[4/5] ${grad}`}>
//           {d.image ? (
//             <Image
//               src={d.image}
//               alt={d.name}
//               fill
//               sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 320px"
//               className="object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
//             />
//           ) : (
//             <div className="absolute inset-0 flex items-start justify-center pt-[18%]">
//               <span className="absolute -right-10 top-10 h-56 w-56 rounded-full border border-white/20" />
//               <span className="absolute -right-2 top-20 h-36 w-36 rounded-full border border-white/20" />
//               <span className="font-serif text-8xl italic text-white/90">{initials(d.name)}</span>
//             </div>
//           )}

//           {/* depth overlays */}
//           <div className="absolute inset-0 bg-gradient-to-t from-[#0A5F7A] via-[#0A5F7A]/35 to-transparent" />
//           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(246,217,138,.18),transparent_55%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

//           {/* top row */}
//           <div className="absolute inset-x-4 top-4 flex items-center justify-between">
//             <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1.5 font-serif text-xs italic text-white backdrop-blur-md">
//               {pad(i + 1)}
//             </span>
//             {d.experience && (
//               <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F6D98A]/40 bg-[#0E526B]/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#F6D98A] backdrop-blur-md">
//                 <Award className="h-3 w-3" /> {d.experience}
//               </span>
//             )}
//           </div>
//         </div>

//         {/* floating glass panel */}
//         <div className="absolute inset-x-3 bottom-3 rounded-[24px] border border-white/25 bg-[#0E7FA3]/45 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.18)] backdrop-blur-xl">
//           <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F6D98A]">
//             <i className="h-1.5 w-1.5 rounded-full" style={{ background: "#F6D98A", boxShadow: "0 0 10px #F6D98A" }} />
//             {d.speciality}
//           </div>
//           <h3 className="mt-2 font-serif text-[22px] leading-tight text-white">{d.name}</h3>
//           {d.designation && <p className="mt-1 line-clamp-2 text-[11.5px] leading-5 text-white/60">{d.designation}</p>}

//           {/* expands on hover / focus / touch devices */}
//           <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-focus-within:grid-rows-[1fr] group-hover:grid-rows-[1fr] [@media(hover:none)]:grid-rows-[1fr]">
//             <div className="overflow-hidden">
//               <div className="space-y-3.5 pt-4">
//                 {d.qualification && (
//                   <p className="flex items-start gap-2 border-t border-white/10 pt-4 text-[11px] leading-5 text-white/75">
//                     <GraduationCap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#F6D98A]" />
//                     {d.qualification}
//                   </p>
//                 )}

//                 {expertise.length > 0 && (
//                   <div className="flex flex-wrap gap-1.5">
//                     {expertise.map((e) => (
//                       <span key={e} className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] text-white/80">{e}</span>
//                     ))}
//                   </div>
//                 )}

//                 <Link
//                   href={`/contact?doctor=${encodeURIComponent(d.slug || d.name)}`}
//                   className="group/b flex items-center justify-between rounded-full bg-gradient-to-b from-[#F6D98A] to-[#C8952E] py-1.5 pl-5 pr-1.5 text-xs font-extrabold text-[#3A2B0A] shadow-[0_10px_28px_rgba(200,149,46,.35)] transition hover:brightness-105"
//                 >
//                   Book Appointment
//                   <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0E526B] text-[#F6D98A] transition-transform duration-300 group-hover/b:rotate-45">
//                     <ArrowUpRight className="h-4 w-4" />
//                   </span>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </article>
//   );
// }

function DoctorCard({ d, i }) {
  const [grad, ink] = TONES[i % 4];
  const expertise = (d.expertise || []).slice(0, 3);

  return (
    <article className="group relative h-full rounded-[32px] bg-gradient-to-b from-[#1D82A6]/25 via-[#1D82A6]/5 to-[#C8952E]/40 p-px shadow-[0_14px_36px_rgba(6,32,43,.10)] transition-all duration-500 hover:-translate-y-2 hover:from-[#F6D98A] hover:via-[#F6D98A]/30 hover:to-[#C8952E] hover:shadow-[0_32px_64px_rgba(6,32,43,.22)]">

      <div className="relative h-full overflow-hidden rounded-[31px] bg-[#0E526B]">

        {/* portrait */}
        <div className={`relative aspect-[3/4] overflow-hidden bg-gradient-to-br sm:aspect-[4/5] ${grad}`}>

          {d.image ? (
            <Image
              src={d.image}
              alt={d.name}
              fill
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 320px"
              className="object-cover object-top transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
            />
          ) : (
            <div className="absolute inset-0 flex items-start justify-center pt-[18%]">
              <span className="absolute -right-10 top-10 h-56 w-56 rounded-full border border-white/20" />
              <span className="absolute -right-2 top-20 h-36 w-36 rounded-full border border-white/20" />
              <span className="font-serif text-8xl italic text-white/90">
                {initials(d.name)}
              </span>
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

          {/* ================= MOBILE VIEW DETAILS BUTTON ================= */}
          <details className="absolute inset-x-3 bottom-3 lg:hidden">

            <summary className="flex cursor-pointer list-none items-center justify-between rounded-[22px] border border-white/25 bg-[#0E7FA3]/55 px-4 py-3 backdrop-blur-xl [&::-webkit-details-marker]:hidden">

              <div>
                <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.16em] text-[#F6D98A]">
                  <i
                    className="h-1.5 w-1.5 rounded-full"
                    style={{
                      background: "#F6D98A",
                      boxShadow: "0 0 10px #F6D98A",
                    }}
                  />
                  {d.speciality}
                </div>

                <h3 className="mt-1 font-serif text-[19px] leading-tight text-white">
                  {d.name}
                </h3>
              </div>

              {/* button */}
              <span className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F6D98A] text-[#0E526B] transition-transform duration-300 group-open:rotate-180">
                <ChevronDown className="h-4 w-4" />
              </span>

            </summary>


            {/* ================= SAME FLOATING CARD ================= */}
            <div className="mt-2 rounded-[22px] border border-white/25 bg-[#0E7FA3]/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.18)] backdrop-blur-xl">

              {d.designation && (
                <p className="text-[11px] leading-5 text-white/60">
                  {d.designation}
                </p>
              )}

              <div className="space-y-3.5 pt-3">

                {d.qualification && (
                  <p className="flex items-start gap-2 border-t border-white/10 pt-3 text-[11px] leading-5 text-white/75">
                    <GraduationCap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#F6D98A]" />
                    {d.qualification}
                  </p>
                )}

                {expertise.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {expertise.map((e) => (
                      <span
                        key={e}
                        className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] text-white/80"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  href={`/contact?doctor=${encodeURIComponent(
                    d.slug || d.name
                  )}`}
                  className="flex items-center justify-between rounded-full bg-gradient-to-b from-[#F6D98A] to-[#C8952E] py-1.5 pl-5 pr-1.5 text-xs font-extrabold text-[#3A2B0A] shadow-[0_10px_28px_rgba(200,149,46,.35)]"
                >
                  Book Appointment

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0E526B] text-[#F6D98A]">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>

              </div>
            </div>

          </details>
        </div>


        {/* ================= DESKTOP CARD ================= */}
        <div className="absolute inset-x-3 bottom-3 hidden rounded-[24px] border border-white/25 bg-[#0E7FA3]/45 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.18)] backdrop-blur-xl lg:block">

          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#F6D98A]">
            <i
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: "#F6D98A",
                boxShadow: "0 0 10px #F6D98A",
              }}
            />
            {d.speciality}
          </div>

          <h3 className="mt-2 font-serif text-[22px] leading-tight text-white">
            {d.name}
          </h3>

          {d.designation && (
            <p className="mt-1 line-clamp-2 text-[11.5px] leading-5 text-white/60">
              {d.designation}
            </p>
          )}

          {/* desktop hover */}
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 group-hover:grid-rows-[1fr]">

            <div className="overflow-hidden">

              <div className="space-y-3.5 pt-4">

                {d.qualification && (
                  <p className="flex items-start gap-2 border-t border-white/10 pt-4 text-[11px] leading-5 text-white/75">
                    <GraduationCap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#F6D98A]" />
                    {d.qualification}
                  </p>
                )}

                {expertise.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {expertise.map((e) => (
                      <span
                        key={e}
                        className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[10px] text-white/80"
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                )}

                <Link
                  href={`/contact?doctor=${encodeURIComponent(
                    d.slug || d.name
                  )}`}
                  className="group/b flex items-center justify-between rounded-full bg-gradient-to-b from-[#F6D98A] to-[#C8952E] py-1.5 pl-5 pr-1.5 text-xs font-extrabold text-[#3A2B0A] shadow-[0_10px_28px_rgba(200,149,46,.35)] transition hover:brightness-105"
                >
                  Book Appointment

                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0E526B] text-[#F6D98A] transition-transform duration-300 group-hover/b:rotate-45">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>

              </div>

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
    <Section id="doctors" bg="bg-gradient-to-b from-white via-[#F3F9FB] to-white">
      <Head
        eyebrow="Our Specialists"
        title="Meet the experts behind"
        accent="your care."
        text={`Experienced consultants from our ${c.title} team, focused on accurate diagnosis and compassionate treatment.`}
        aside={<Btn href="/doctors" v="line" icon={ArrowUpRight}>View all doctors</Btn>}
      />

      {/* auto-fit + justify-center → 1, 2, 3 or 8 doctors always look balanced */}
      <Stagger className="[&>*]:snap-start -mx-6 grid snap-x snap-mandatory auto-cols-[78%] grid-flow-col gap-4 overflow-x-auto px-6 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:auto-cols-auto sm:grid-flow-row sm:justify-center sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 sm:[grid-template-columns:repeat(auto-fit,minmax(250px,300px))]" delay={0.09}>
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
            className="group overflow-hidden rounded-[20px] bg-[#062F40] shadow-[0_12px_35px_rgba(6,32,43,.10)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_25px_50px_rgba(6,32,43,.16)]">
            <div className="relative h-[190px] overflow-hidden">
              <Image src={r.image} alt={r.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06202B] via-[#06202B]/20 to-transparent" />
              <span className="absolute left-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90">
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
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[24px] border border-[#1D82A6]/15 bg-gradient-to-br from-[#EAF6FA] via-white to-[#FBF3DE] px-6 py-12 shadow-[0_24px_60px_rgba(6,32,43,.08)] sm:px-10 lg:px-14 lg:py-14">
        <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-[#1D82A6]/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-[#C8952E]/15 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.28em] text-[#0E526B]">{c.title}</p>
            <h2 className="font-serif text-[30px] leading-[1.08] text-[#06202B] sm:text-[36px]">
              Ready to begin your <span className="italic text-[#C8952E]">care journey?</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-[#526B77]">
              Connect with our specialists at Apollo Hospitals, Jabalpur and take the first step toward the right care for you.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Btn href="/contact">Book an Appointment</Btn>
            <Btn href="/centres-of-excellence" v="line">All Centres</Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- route ---------------- */
export function generateStaticParams() {
  return centresOfExcellence.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const c = getCentreBySlug(slug);
  if (!c) return {};
  return {
    title: `${c.title} | Apollo Hospitals Jabalpur`,
    description: c.seoDescription || c.description,
  };
}

export default async function CentrePage({ params }) {
  const { slug } = await params;
  const c = getCentreBySlug(slug);
  if (!c) notFound();

  const related = centresOfExcellence.filter((x) => x.slug !== c.slug).slice(0, 3);

  return (
    <main className="bg-white">
      <Hero c={c} />
      <Facts c={c} />

      {SECTIONS.map((s) => (
        <Fragment key={s.id}>
          <CardSection {...s} items={s.id === "capabilities" ? c.capabilities : c[s.id]} />
        </Fragment>
      ))}

      <Preventive c={c} />
      <Closing c={c} />

      <Doctors c={c} />
      <Related list={related} />
      <Cta c={c} />
    </main>
  );
}
