import Link from "next/link";
import CentresHero from "@/components/centres/CentresHero";
import CentresJourney, { CentreIcon } from "@/components/centres/CentresJourney";
import { centresOfExcellence } from "@/data/centresOfExcellence";

export const metadata = {
  title: "Centres of Excellence | Apollo JBP Hospitals Jabalpur",
  description:
    "Explore the Centres of Excellence at Apollo JBP Hospitals Jabalpur.",
};

const pad = (n) => String(n).padStart(2, "0");

export default function CentresOfExcellencePage() {
  return (
    <main className="bg-[#EDF6FB]">
      {/* HERO */}
      <CentresHero />

      {/* INTERACTIVE JOURNEY — id + scroll-mt so the hero button lands below the sticky navbar */}
      <div id="centres-journey" className="scroll-mt-[88px]">
        <CentresJourney />
      </div>

      {/* BOTTOM CTA */}
      <section className="relative overflow-hidden bg-[#EDF6FB] px-6 pb-20 pt-6 sm:px-10 lg:px-16 lg:pb-28">
        <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[36px] border border-white/80 bg-[linear-gradient(135deg,#FFFFFF_0%,#FFF9EA_55%,#EEF7FB_100%)] shadow-[0_40px_100px_-40px_rgba(6,32,43,.35)]">
          {/* aurora + watermark (static, no runtime cost) */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -right-24 -top-24 h-[360px] w-[360px] rounded-full bg-[#F6D98A]/[0.5] blur-3xl" />
            <div className="absolute -bottom-32 -left-20 h-[340px] w-[340px] rounded-full bg-[#1D82A6]/[0.14] blur-3xl" />
            <div className="absolute bottom-[-30px] right-[30%] h-[220px] w-[220px] rounded-full bg-[#5CC8B5]/[0.14] blur-3xl" />
            <span className="absolute -bottom-10 right-4 select-none font-serif text-[220px] font-medium leading-none text-[#0E526B]/[0.04] lg:text-[300px]">
              {pad(centresOfExcellence.length)}
            </span>
          </div>

          <div className="relative grid items-center gap-10 p-8 sm:p-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-14 lg:p-16">
            {/* LEFT */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-[#C8952E]/30 bg-white/80 px-4 py-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C8952E]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#0E526B]">
                  One connected healthcare ecosystem
                </span>
              </div>

              <h2 className="font-serif text-[clamp(34px,4.4vw,58px)] leading-[1.04] tracking-[-0.03em] text-[#06202B]">
                Expertise for every
                <span className="block bg-gradient-to-r from-[#B8821F] via-[#F2C766] to-[#C8952E] bg-clip-text italic text-transparent">
                  stage of your care.
                </span>
              </h2>

              <p className="mt-6 max-w-[520px] text-[15px] leading-7 text-slate-600">
                From diagnosis to recovery, our centres bring together
                experienced specialists, advanced technology and coordinated
                care — all within one trusted healthcare ecosystem.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/patientcare/appointment"
                  className="group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[13px] font-extrabold text-[#3A2B0A] shadow-[0_18px_40px_-10px_rgba(200,149,46,.7)] transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "linear-gradient(180deg,#F8DE94 0%,#C8952E 100%)" }}
                >
                  Book an Appointment
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>

                <Link
                  href="/doctors"
                  className="inline-flex items-center gap-2 rounded-full border border-[#1D82A6]/25 bg-white/80 px-6 py-4 text-[13px] font-bold text-[#0E526B] transition-all duration-300 hover:border-[#1D82A6]/50 hover:bg-white"
                >
                  Find a Specialist
                </Link>
              </div>
            </div>

            {/* RIGHT — all centres as quick links */}
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {centresOfExcellence.map((centre) => (
                <Link
                  key={centre.slug}
                  href={`/centres-of-excellence/${centre.slug}`}
                  className="group flex flex-col items-center gap-2.5 rounded-2xl border border-[#1D82A6]/12 bg-white/85 px-2 py-4 text-center transition-all duration-300 hover:-translate-y-1 hover:border-[#C8952E]/50 hover:shadow-[0_18px_36px_-14px_rgba(200,149,46,.55)]"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EDF6FB] transition-colors duration-300 group-hover:bg-[#FFF1CC]">
                    <CentreIcon slug={centre.slug} active={false} />
                  </span>
                  <span className="text-[10px] font-semibold leading-tight text-[#0B3446]">
                    {centre.shortName || centre.title}
                  </span>
                </Link>
              ))}

              <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-[#F8DE94] to-[#C8952E] px-2 py-4 text-center text-[#3A2B0A]">
                <span className="font-serif text-3xl italic leading-none">
                  {pad(centresOfExcellence.length)}
                </span>
                <span className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.18em]">
                  Centres
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
