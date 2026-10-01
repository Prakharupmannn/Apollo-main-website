import {
  ArrowRight,
  CalendarDays,
  Stethoscope,
} from "lucide-react";

import Link from "next/link";

export default function Cta({ hospital }) {
  return (
    <section className="bg-white px-6 pb-16 lg:px-10 lg:pb-20">

      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[30px] border border-[#1D82A6]/15 bg-gradient-to-br from-[#EAF6FA] via-white to-[#FBF3DE] px-6 py-12 shadow-[0_24px_65px_rgba(6,32,43,.08)] sm:px-10 lg:px-14 lg:py-14">

        {/* background shapes */}
        <div className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-[#1D82A6]/15 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-[#C8952E]/15 blur-3xl" />

        <div className="pointer-events-none absolute right-[25%] top-[-70px] h-36 w-36 rounded-full border border-[#C8952E]/15" />

        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">

          {/* Content */}
          <div>

            <div className="flex items-center gap-3">

              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#0E526B] shadow-sm ring-1 ring-[#0E526B]/10">
                <Stethoscope className="h-5 w-5" />
              </span>

              <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-[#0E526B]">
                {hospital?.name || "Apollo JBP Hospitals"}
              </p>

            </div>

            <h2 className="mt-5 max-w-2xl font-serif text-[32px] leading-[1.08] text-[#06202B] sm:text-[40px]">

              Not sure who to{" "}

              <span className="italic text-[#C8952E]">
                consult?
              </span>

            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-[#526B77]">
              Tell us your concern and our team will help guide you towards
              the right specialist for your healthcare needs
              {hospital?.address ? ` at ${hospital.address}` : " at Apollo JBP Hospitals"}.
            </p>

            {/* reassurance */}
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[10px] font-semibold text-[#607681]">

              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0E526B]" />
                Specialist Guidance
              </span>

              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C8952E]" />
                Patient First
              </span>

              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0E526B]" />
                Advanced Care
              </span>

            </div>

          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">

            <Link
              href="/contact"
              className="group inline-flex h-12 items-center justify-center gap-3 rounded-full bg-[#C8952E] px-7 text-xs font-extrabold text-[#3A2B0A] shadow-[0_12px_25px_rgba(200,149,46,.20)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#D5A63B] hover:shadow-[0_18px_35px_rgba(200,149,46,.28)]"
            >
              <CalendarDays className="h-4 w-4" />

              Book an Appointment

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/centres-of-excellence"
              className="group inline-flex h-12 items-center justify-center gap-3 rounded-full border border-[#0E526B]/20 bg-white/80 px-7 text-xs font-bold text-[#0E526B] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[#0E526B]/40 hover:bg-white hover:shadow-lg"
            >
              Explore Centres

              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}