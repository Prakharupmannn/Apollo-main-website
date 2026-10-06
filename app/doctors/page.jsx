
import {
  ArrowRight, CalendarDays, CheckCircle2, ChevronDown, Clock3, Heart,
  MapPin, Search, ShieldCheck, Stethoscope, UsersRound,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Btn, Head, Section } from "../../components/doctors/ui";

import Steps from "../../components/doctors/Steps";
import Cta from "../../components/doctors/Cta";

import { rawDoctors } from "@/data/doctorsPage";
import { hospital } from "@/data/siteData";
import DoctorsHero from "../../components/doctors/DoctorsHero"
import DoctorsImageFlip from "../../components/doctors/DoctorsImageFlip";
import DoctorGrid from "../../components/doctors/DoctorGrid";
import DoctorFinder from "../../components/doctors/DoctorFinder";

const PAGE_SIZE = 12;

const specialties = [
  {
    slug: "all",
    title: "All Specialties",
    icon: UsersRound,
  },
  {
    slug: "oncology",
    title: "Onco Sciences",
    icon: Heart,
  },
  {
    slug: "cardiology",
    title: "Cardiac Sciences",
    icon: Heart,
  },
  {
    slug: "gastroenterology",
    title: "Gastro Sciences",
    icon: Stethoscope,
  },
  {
    slug: "neurology",
    title: "Neuro Sciences",
    icon: ShieldCheck,
  },
  {
    slug: "nephrology",
    title: "Nephro Sciences",
    icon: Stethoscope,
  },
  {
    slug: "orthopaedics",
    title: "Ortho, Joint & Spine",
    icon: Stethoscope,
  },
  {
    slug: "critical-care",
    title: "Critical Care",
    icon: Heart,
  },
  {
    slug: "gynaecology",
    title: "Women Health",
    icon: Heart,
  },
  {
    slug: "paediatrics",
    title: "Paediatrics",
    icon: Heart,
  },
  {
    slug: "urology",
    title: "Urology",
    icon: Stethoscope,
  },
];

const benefits = [
  {
    icon: UsersRound,
    title: "Renowned Consultants",
    text: "Experienced specialists across major medical disciplines.",
  },
  {
    icon: ShieldCheck,
    title: "Advanced Technology",
    text: "Modern diagnostics and treatment infrastructure.",
  },
  {
    icon: Stethoscope,
    title: "Comprehensive Specialties",
    text: "Specialist care across multiple Centres of Excellence.",
  },
  {
    icon: Heart,
    title: "Compassionate Care",
    text: "Clinical expertise with a patient-first approach.",
  },
  {
    icon: CheckCircle2,
    title: "Patient-Centric Approach",
    text: "Care designed around individual patient needs.",
  },
];

const steps = [
  {
    title: "Find a Doctor",
    text: "Search by specialty, department or doctor name.",
  },
  {
    title: "Choose a Slot",
    text: "Select a convenient date and time.",
  },
  {
    title: "Confirm Details",
    text: "Fill in your information and confirm.",
  },
  {
    title: "Meet Your Doctor",
    text: "Visit Apollo Jabalpur for your consultation.",
  },
];

const testimonials = [
  {
    name: "Ramesh Verma",
    location: "Jabalpur",
    text: "The doctors and care team were extremely supportive throughout the consultation and treatment journey.",
    image: "/images/doctors/user.png",
  },
  {
    name: "Sunita Sharma",
    location: "Jabalpur",
    text: "The experience was reassuring and the team explained everything clearly at every step.",
    image: "/images/doctors/user.png",
  },
];

const faqs = [
  {
    q: "How can I find the right doctor at Apollo JBP Hospitals?",
    a: "Use the doctor search and specialty filters to find a specialist based on department, specialty or doctor name.",
  },
  {
    q: "How many doctors are available at Apollo JBP Hospitals?",
    a: "The Doctors directory currently features 49 doctors across multiple specialties and Centres of Excellence.",
  },
  {
    q: "Can I book an appointment online?",
    a: "Yes. You can select a doctor and use the appointment option to begin the booking process.",
  },
  {
    q: "Which specialties are available?",
    a: "Apollo JBP Hospitals provides specialist services across oncology, cardiology, neurology, gastroenterology, orthopaedics, nephrology, urology, women's health, paediatrics and several other disciplines.",
  },
];

const specialtyKeywords = {
  oncology: ["onco", "cancer"],
  cardiology: ["cardi", "heart"],
  gastroenterology: ["gastro", "hepat"],
  neurology: ["neuro"],
  nephrology: ["nephro", "renal"],
  orthopaedics: ["ortho", "joint", "spine"],
  "critical-care": ["critical", "icu", "intensiv"],
  gynaecology: ["gynae", "gynec", "obstet", "women"],
  paediatrics: ["paed", "pedia", "child"],
  urology: ["urolog"],
};

function filterDoctors(doctors, search, specialty) {
  const query = search?.trim().toLowerCase();

  return doctors.filter((doctor) => {
    const haystack = `${doctor.specialitySlug || ""} ${doctor.speciality || ""} ${
      doctor.designation || ""
    }`.toLowerCase();

    const matchesSearch =
      !query ||
      doctor.name?.toLowerCase().includes(query) ||
      haystack.includes(query);

    const keywords = specialtyKeywords[specialty] || [
      specialty?.replaceAll("-", " "),
    ];
    const matchesSpecialty =
  !specialty ||
  specialty === "all" ||
  getSpecSlug(doctor) === specialty ||
  doctor.specialitySlug === specialty ||
  keywords.some((k) => k && haystack.includes(k));

    // const matchesSpecialty =
    //   !specialty ||
    //   specialty === "all" ||
    //   doctor.specialitySlug === specialty ||
    //   keywords.some((k) => k && haystack.includes(k));

    return matchesSearch && matchesSpecialty;
  });
}

function slugify(s = "") {
  return String(s)
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const getSpecSlug = (d) => d.specialitySlug || slugify(d.speciality);

function buildSpecialtyOptions(doctors) {
  const map = new Map();

  doctors.forEach((d) => {
    const slug = getSpecSlug(d);
    if (!slug) return;
    const cur = map.get(slug) || { slug, label: d.speciality || slug, count: 0 };
    cur.count += 1;
    map.set(slug, cur);
  });

  return [...map.values()].sort((a, b) => a.label.localeCompare(b.label));
}

export default async function DoctorsPage({ searchParams }) {
  const params = await searchParams;

  const search = params?.search || "";
  const specialty = params?.specialty || "all";

  const filteredDoctors = filterDoctors(rawDoctors, search, specialty);
  const specialtyOptions = buildSpecialtyOptions(rawDoctors);

  const counts = Object.fromEntries(
    specialties.map((s) => [
      s.slug,
      s.slug === "all"
        ? rawDoctors.length
        : filterDoctors(rawDoctors, "", s.slug).length,
    ])
  );

  return (
    <main className="overflow-hidden bg-[#F8FCFD] text-[#06202B]">
      <DoctorsHero hospital={hospital} />
      <DoctorFinder
  search={search}
  specialty={specialty}
  options={specialtyOptions}
  total={rawDoctors.length}
/>
      <SpecialtyRail active={specialty} counts={counts} />
      <WhyApollo />
      <ApolloDoctorsIntro hospital={hospital} />

      <DoctorDirectory
        doctors={filteredDoctors}
        search={search}
        specialty={specialty}
      />

      <Steps steps={steps} />
      <PatientStories />
      <DoctorFaq />
      <Cta hospital={hospital} />
    </main>
  );
}



function HeroStat({ value, label, icon: Icon }) {
  return (
    <div className="flex items-center gap-3 border-l border-[#0E526B]/10 pl-3 first:border-0 first:pl-0">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#0E526B] shadow-sm ring-1 ring-[#0E526B]/10">
        <Icon className="h-5 w-5" />
      </span>

      <div>
        <div className="text-sm font-bold text-[#06202B]">
          {value}
        </div>

        <div className="mt-0.5 text-[9px] text-[#607681]">
          {label}
        </div>
      </div>
    </div>
  );
}



function SpecialtyRail({ active, counts }) {
  return (
    <section className="px-6 pt-12 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex items-end justify-between gap-5">
          <div>
            <p className="font-serif text-2xl text-[#06202B]">Popular Specialties</p>
            <p className="mt-1 text-xs text-[#71858E]">
              Find specialists by Centre of Excellence.
            </p>
          </div>
          <Link
            href="/centres-of-excellence"
            className="hidden items-center gap-1 text-xs font-bold text-[#0E526B] sm:flex"
          >
            View All Specialties <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 pt-1 scrollbar-none">
          {specialties.map((item) => {
            const Icon = item.icon;
            const selected = active === item.slug;
            const count = counts?.[item.slug] ?? 0;

            return (
              <Link
                key={item.slug}
                scroll
                href={
                  item.slug === "all"
                    ? "/doctors#expert-doctors"
                    : `/doctors?specialty=${item.slug}#expert-doctors`
                }
                className={[
                  "group relative flex min-w-[128px] shrink-0 flex-col items-center rounded-[22px] border px-4 py-5 text-center transition-all duration-300",
                  selected
                    ? "border-[#0E526B] bg-gradient-to-br from-[#0E526B] to-[#06202B] text-white shadow-[0_16px_34px_rgba(14,82,107,.28)]"
                    : "border-[#E2EDF1] bg-white text-[#06202B] hover:-translate-y-1 hover:border-[#C8952E]/50 hover:shadow-lg",
                ].join(" ")}
              >
                <span
                  className={[
                    "mb-3 flex h-11 w-11 items-center justify-center rounded-2xl transition",
                    selected
                      ? "bg-white/15"
                      : "bg-[#F2F8FA] text-[#0E526B] group-hover:bg-[#FFF8E7] group-hover:text-[#C8952E]",
                  ].join(" ")}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-[11px] font-bold leading-4">{item.title}</span>
                <span
                  className={[
                    "mt-2 rounded-full px-2.5 py-0.5 text-[10px] font-semibold",
                    selected ? "bg-white/15 text-white" : "bg-[#F2F8FA] text-[#607681]",
                  ].join(" ")}
                >
                  {count} {count === 1 ? "Doctor" : "Doctors"}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyApollo() {
  return (
    <section className="px-6 py-14 lg:px-10 lg:py-20">

      <div className="mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-[#E7EDF0] bg-gradient-to-r from-[#FFFDF7] via-white to-[#F4FAFC]">

        <div className="grid lg:grid-cols-[0.75fr_1.25fr]">

          <div className="relative overflow-hidden bg-[#0E526B] px-7 py-10 text-white sm:px-10">

            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border border-[#C8952E]/30" />

            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#F1D68D]">
              Why Apollo Doctors?
            </p>

            <h2 className="mt-4 max-w-sm font-serif text-3xl leading-tight sm:text-4xl">
              Expertise that puts{" "}
              <span className="italic text-[#E1B54A]">
                people first.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-6 text-white/70">
              Specialist expertise, advanced technology and compassionate
              clinical care come together to support every patient's journey.
            </p>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5">

            {benefits.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="border-b border-[#E8EEF1] p-6 last:border-b-0 sm:border-r lg:border-b-0"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FFF8E7] text-[#C8952E]">
                    <Icon className="h-5 w-5" />
                  </span>

                  <h3 className="mt-5 text-sm font-bold text-[#06202B]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-[#687D86]">
                    {item.text}
                  </p>
                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
}

function ApolloDoctorsIntro({ hospital }) {
  return (
    <Section bg="bg-white">

      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">

        {/* IMAGE */}
        <div className="relative">

          <DoctorsImageFlip />

          <div className="absolute bottom-6 right-[-10px] rounded-[18px] bg-[#06202B] px-5 py-4 text-white shadow-xl">

            <p className="text-[8px] uppercase tracking-[0.2em] text-[#DDBB63]">
              Advanced Facility
            </p>

            <p className="mt-1 font-serif text-xl">
              PET-CT & LINAC
            </p>

          </div>

        </div>

        {/* CONTENT */}
        <div>

          <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#0E526B]">
            Expert Doctors in Jabalpur
          </p>

          <h2 className="mt-3 font-serif text-[34px] leading-tight text-[#06202B] sm:text-[42px]">
            Apollo JBP{" "}
            <span className="italic text-[#C8952E]">
              Doctors
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-[#607681]">
            Apollo JBP Hospitals, Jabalpur is now open to deliver exceptional
            care across multiple specialties. Our expert doctors in Jabalpur
            encompass a diverse team of consultants supported by advanced
            technology and comprehensive diagnostic and treatment facilities.
          </p>

          <p className="mt-4 text-sm leading-7 text-[#607681]">
            The hospital provides specialist care across Oncology, Cardiology,
            Neurology, Orthopaedics, Gastroenterology, Gynecology, Dermatology,
            Ophthalmology, Pediatrics, Endocrinology, Urology, Nephrology,
            Pulmonology, Rheumatology, Neurosurgery, ENT, Vascular Surgery,
            Psychiatry, Dentistry and Transplant Services.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">

            <Btn href="/centres-of-excellence">
              Our Centres of Excellence
            </Btn>

            <Btn
              href="/contact"
              v="line"
            >
              Contact Us
            </Btn>

          </div>

        </div>

      </div>

    </Section>
  );
}

function SpecialtyOverview() {
  const items = [
    "Oncology",
    "Cardiology",
    "Neurology",
    "Orthopaedics",
    "Gastroenterology",
    "Gynecology",
    "Dermatology",
    "Ophthalmology",
    "Pediatrics",
    "Endocrinology",
    "Urology",
    "Nephrology",
    "Pulmonology",
    "Rheumatology",
    "Neurosurgery",
    "Radiology",
    "ENT",
    "Vascular Surgery",
    "Psychiatry",
    "Dentistry",
    "Transplant Services",
  ];

  return (
    <section className="px-6 pb-16 lg:px-10">

      <div className="mx-auto max-w-[1380px] rounded-[28px] bg-[#06202B] p-7 text-white sm:p-10">

        <div className="max-w-2xl">

          <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#DDBB63]">
            Comprehensive Specialist Care
          </p>

          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            Care across{" "}
            <span className="italic text-[#DDBB63]">
              multiple specialties.
            </span>
          </h2>

        </div>

        <div className="mt-8 flex flex-wrap gap-2">

          {items.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs text-white/80"
            >
              {item}
            </span>
          ))}

        </div>

      </div>

    </section>
  );
}

function DoctorDirectory({ doctors, search, specialty }) {
  const activeLabel =
    specialties.find((s) => s.slug === specialty)?.title || "All Specialties";

  return (
    <section
      id="expert-doctors"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-[#F1F8FA] via-white to-[#F7FBFD] px-6 py-16 lg:px-10 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-[#0E526B]/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-[#C8952E]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#0E526B]">
              Meet Our Team
            </p>
            <h2 className="mt-2 font-serif text-[38px] leading-tight text-[#06202B] sm:text-[48px]">
              Our Expert <span className="italic text-[#C8952E]">Doctors</span>
            </h2>
            <p className="mt-2 text-sm text-[#607681]">
              Find the right specialist for your health needs.
            </p>
          </div>

          <span className="w-fit rounded-full bg-[#0E526B]/10 px-4 py-2 text-xs font-bold text-[#0E526B]">
            {activeLabel}
          </span>
        </div>

        <div className="grid gap-7 lg:grid-cols-[250px_1fr]">
          <DoctorFilters search={search} specialty={specialty} />

          {/* key: filter/search badalne par grid reset ho jaye (12 se dobara start) */}
          <DoctorGrid
            key={`${specialty}-${search}`}
            doctors={doctors}
          />
        </div>
      </div>
    </section>
  );
}

function DoctorFilters({ search, specialty }) {
  const items = specialties.filter((s) => s.slug !== "all");

  return (
    <aside className="hidden h-fit rounded-[24px] border border-[#E2ECEF] bg-white p-5 shadow-[0_10px_30px_rgba(6,32,43,.04)] lg:sticky lg:top-28 lg:block">
      <div className="flex items-center justify-between border-b border-[#EDF2F4] pb-4">
        <h3 className="text-sm font-bold text-[#06202B]">Filter Doctors</h3>
        <Link
          href="/doctors#expert-doctors"
          className="text-[10px] font-bold text-[#C8952E]"
        >
          Reset All
        </Link>
      </div>

      <FilterGroup title="Specialty">
        {items.map((item) => {
          const checked = specialty === item.slug;
          const qs = new URLSearchParams();
          if (search) qs.set("search", search);
          if (!checked) qs.set("specialty", item.slug);
          const href = `/doctors${qs.toString() ? `?${qs}` : ""}#expert-doctors`;

          return (
            <Link
              key={item.slug}
              href={href}
              className={[
                "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-xs transition",
                checked
                  ? "bg-[#0E526B]/10 font-bold text-[#0E526B]"
                  : "text-[#607681] hover:bg-[#F3F9FB]",
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-4 w-4 items-center justify-center rounded border",
                  checked ? "border-[#0E526B] bg-[#0E526B] text-white" : "border-[#C9D9DF]",
                ].join(" ")}
              >
                {checked && <CheckCircle2 className="h-3 w-3" />}
              </span>
              {item.title}
            </Link>
          );
        })}
      </FilterGroup>

      <FilterGroup title="Location">
        <p className="flex items-center gap-2 px-2 py-1.5 text-xs text-[#607681]">
          <MapPin className="h-3.5 w-3.5 text-[#0E526B]" /> Jabalpur
        </p>
      </FilterGroup>
    </aside>
  );
}

function FilterGroup({ title, children }) {
  return (
    <div className="border-b border-[#EDF2F4] py-5 last:border-0">

      <div className="mb-3 flex items-center justify-between">

        <h4 className="text-xs font-bold text-[#06202B]">
          {title}
        </h4>

        <ChevronDown className="h-4 w-4 text-[#71858E]" />

      </div>

      {children}

    </div>
  );
}


function PatientStories() {
  return (
    <section className="bg-[#06202B] px-6 py-16 text-white lg:px-10 lg:py-20">

      <div className="mx-auto max-w-7xl">

        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-center">

          <div>

            <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#DDBB63]">
              Patient Stories
            </p>

            <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
              What our{" "}
              <span className="italic text-[#DDBB63]">
                patients say.
              </span>
            </h2>

            <p className="mt-4 max-w-md text-sm leading-6 text-white/60">
              Real experiences from patients and families who trusted Apollo
              JBP Hospitals with their care.
            </p>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {testimonials.map((item) => (
              <div
                key={item.name}
                className="rounded-[24px] border border-white/10 bg-white/[0.06] p-5"
              >

                <div className="flex gap-4">

                  <Image
                    src={item.image}
                    alt={item.name || ""}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-2xl object-cover"
                  />

                  <div>
                    <div className="text-[#E1B54A]">
                      ★★★★★
                    </div>

                    <p className="mt-1 text-xs text-white/50">
                      {item.location}
                    </p>
                  </div>

                </div>

                <p className="mt-5 font-serif text-lg leading-7 text-white/90">
                  “{item.text}”
                </p>

                <p className="mt-4 text-xs font-bold text-white/60">
                  {item.name}
                </p>

              </div>
            ))}

          </div>

        </div>
      </div>

    </section>
  );
}


function DoctorFaq() {
  return (
    <Section bg="bg-white">

      <Head
        eyebrow="Doctor FAQs"
        title="Questions about"
        accent="finding your doctor?"
        text="Helpful information to make your specialist search easier."
      />

      <div className="mx-auto max-w-4xl">

        <div className="divide-y divide-[#E7EEF1] rounded-[24px] border border-[#E3EBEF] bg-white px-6">

          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group py-5"
            >

              <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-sm font-bold text-[#06202B]">
                {faq.q}

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F1F7F9] text-[#0E526B] transition group-open:rotate-180">
                  <ChevronDown className="h-4 w-4" />
                </span>
              </summary>

              <p className="max-w-3xl pt-4 text-sm leading-6 text-[#607681]">
                {faq.a}
              </p>

            </details>
          ))}

        </div>

      </div>

    </Section>
  );
}