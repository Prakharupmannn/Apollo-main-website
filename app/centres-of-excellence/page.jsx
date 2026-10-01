
import Link from "next/link";
import CentresJourney from "@/components/centres/CentresJourney";
import CentresOrbitPreview from "@/components/centres/CentresOrbitPreview";

export const metadata = {
  title: "Centres of Excellence | Apollo Hospitals Jabalpur",
  description:
    "Explore the Centres of Excellence at Apollo Hospitals Jabalpur.",
};

export default function CentresOfExcellencePage() {
  return (
    <main className="bg-[#EDF6FB]">

      {/* -------------------------------- */}
      {/* HERO */}
      {/* -------------------------------- */}

      <section className="relative min-h-[65vh] overflow-hidden bg-white">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(29,130,166,.12),transparent_35%),radial-gradient(circle_at_10%_70%,rgba(200,149,46,.06),transparent_30%)]" />

        <div className="relative mx-auto flex min-h-[65vh] max-w-[1320px] items-center px-6 py-16 lg:px-10">

          <div className="max-w-xl">

            <div className="mb-4 flex items-center gap-3">
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#0E526B]">
                Apollo Hospitals Jabalpur
              </span>

              <span className="h-px w-9 bg-[#C8952E]" />
            </div>

            <h1 className="font-serif text-[clamp(30px,4.2vw,60px)] leading-[0.98] tracking-[-0.04em] text-[#06202B]">
              Centres of{" "}
              <span className="italic text-[#C8952E]">
                Excellence
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-500 lg:text-lg">
              Where specialist expertise, advanced
              technology and compassionate care come
              together for every patient.
            </p>

            <div className="mt-7 flex items-center gap-4">
              <span className="h-px w-12 bg-[#C8952E]" />

              <span className="text-[11px] uppercase tracking-[0.22em] text-[#0E526B]/70">
                Explore our specialist care
              </span>
            </div>
          </div>

          {/* Orbit visual — teaser for the interactive journey below */}
          <div className="pointer-events-none flex justify-center pt-10 lg:absolute lg:right-0 lg:top-[55%] lg:block lg:-translate-y-1/2 lg:pt-0">
            <CentresOrbitPreview />
          </div>
        </div>
      </section>

      {/* -------------------------------- */}
      {/* INTERACTIVE JOURNEY */}
      {/* -------------------------------- */}

      <CentresJourney />

      {/* -------------------------------- */}
      {/* BOTTOM CTA */}
      {/* -------------------------------- */}

      {/* <section className="relative overflow-hidden bg-[#06202B] px-6 py-20 text-white lg:px-10">

        <div className="absolute right-0 top-0 h-full w-[50%] bg-[radial-gradient(circle_at_center,rgba(29,130,166,.28),transparent_65%)]" />
        <div className="absolute left-0 bottom-0 h-full w-[40%] bg-[radial-gradient(circle_at_center,rgba(200,149,46,.10),transparent_60%)]" />

        <div className="relative mx-auto max-w-[1080px] text-center">

          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#F6D98A]">
            One connected healthcare ecosystem
          </span>

          <h2 className="mt-4 font-serif text-[32px] italic leading-tight lg:text-[52px]">
            Expertise for every
            <br />
            stage of your care.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/70">
            Discover specialist services, experienced
            clinicians and advanced care pathways
            designed around your needs.
          </p>

        </div>
      </section> */}
      <section className="relative overflow-hidden bg-[#F8F8F5] px-6 py-16 sm:px-10 lg:px-16 lg:py-20">
  <div className="mx-auto max-w-[1240px]">

    <div className="relative grid items-center gap-12 overflow-hidden border-y border-[#0E526B]/15 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:py-14">

      {/* LEFT — Editorial Content */}
      <div className="relative z-10">

        {/* Eyebrow */}
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-10 bg-[#C8952E]" />

          <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#0E526B]/70">
            One connected healthcare ecosystem
          </span>
        </div>

        {/* Heading */}
        <h2 className="max-w-[650px] font-serif text-[38px] font-medium leading-[1.08] tracking-[-0.02em] text-[#103F50] sm:text-[46px] lg:text-[58px]">
          Expertise for every
          <span className="block italic text-[#C8952E]">
            stage of your care.
          </span>
        </h2>

        {/* Description */}
        <p className="mt-6 max-w-[530px] text-[14px] leading-7 text-[#315563]/80 sm:text-[15px]">
          From diagnosis to recovery, our centres bring together
          experienced specialists, advanced technology and
          coordinated care — all within one trusted healthcare
          ecosystem.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap items-center gap-5">

          <Link
            href="/contact"
            className="group inline-flex items-center gap-4 border-b border-[#0E526B] pb-2 text-[12px] font-bold uppercase tracking-[0.14em] text-[#0E526B] transition-all duration-300 hover:gap-6"
          >
            Book an Appointment

            <span className="text-[#C8952E] transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>

          <Link
            href="/centres-of-excellence"
            className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#0E526B]/60 transition-colors duration-300 hover:text-[#0E526B]"
          >
            Explore Centres
          </Link>

        </div>
      </div>


      {/* RIGHT — Quiet Visual Element */}
      <div className="relative hidden min-h-[250px] lg:block">

        {/* Vertical architectural line */}
        <div className="absolute left-1/2 top-1/2 h-[220px] w-px -translate-x-1/2 -translate-y-1/2 bg-[#0E526B]/15" />

        {/* Large number */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="font-serif text-[150px] font-medium leading-none text-[#0E526B]/[0.045]">
            07
          </span>
        </div>

        {/* Small information blocks */}
        <div className="absolute left-[18%] top-[20%]">
          <span className="block text-[9px] uppercase tracking-[0.25em] text-[#0E526B]/45">
            Centres
          </span>

          <span className="mt-1 block font-serif text-2xl text-[#0E526B]">
            Excellence
          </span>
        </div>

        <div className="absolute bottom-[18%] right-[12%] text-right">
          <span className="block text-[9px] uppercase tracking-[0.25em] text-[#0E526B]/45">
            Care
          </span>

          <span className="mt-1 block font-serif text-2xl italic text-[#C8952E]">
            Connected
          </span>
        </div>

        {/* Minimal cross */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

          <span className="absolute left-1/2 top-1/2 h-10 w-px -translate-x-1/2 -translate-y-1/2 bg-[#C8952E]/60" />

          <span className="absolute left-1/2 top-1/2 h-px w-10 -translate-x-1/2 -translate-y-1/2 bg-[#C8952E]/60" />

          <span className="relative block h-2 w-2 rounded-full bg-[#C8952E]" />

        </div>
      </div>

    </div>
  </div>
</section>
    </main>
  );
}