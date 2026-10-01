import {
  Search,
  CalendarDays,
  ClipboardCheck,
  Stethoscope,
  ArrowRight,
} from "lucide-react";

const STEP_ICONS = [
  Search,
  CalendarDays,
  ClipboardCheck,
  Stethoscope,
];

export default function Steps({ steps }) {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-16 lg:px-10 lg:py-20">

      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#1D82A6]/5 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#C8952E]/7 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">

          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#0E526B]">
            Simple & Seamless
          </p>

          <h2 className="mt-3 font-serif text-[34px] leading-[1.08] text-[#06202B] sm:text-[44px]">
            Your appointment in{" "}
            <span className="italic text-[#C8952E]">
              four simple steps.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#607681]">
            Finding the right specialist and planning your visit at Apollo JBP
            Hospitals is simple.
          </p>

        </div>

        {/* Steps */}
        <div className="relative mt-12">

          {/* Connecting line - desktop */}
          <div className="pointer-events-none absolute left-[12%] right-[12%] top-[39px] hidden border-t border-dashed border-[#C8952E]/40 lg:block" />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {steps.map((step, index) => {
              const Icon = STEP_ICONS[index % STEP_ICONS.length];

              return (
                <div
                  key={step.title}
                  className="group relative"
                >

                  <div className="relative h-full overflow-hidden rounded-[24px] border border-[#E2ECEF] bg-white p-6 text-center shadow-[0_10px_30px_rgba(6,32,43,.045)] transition-all duration-500 hover:-translate-y-2 hover:border-[#C8952E]/25 hover:shadow-[0_25px_55px_rgba(6,32,43,.11)]">

                    {/* hover glow */}
                    <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#1D82A6]/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                    {/* Number + Icon */}
                    <div className="relative mx-auto w-fit">

                      <div className="flex h-[78px] w-[78px] items-center justify-center rounded-full bg-gradient-to-br from-[#0A5F7A] to-[#0E526B] text-[#F6D98A] shadow-[0_12px_25px_rgba(14,82,107,.20)] transition-transform duration-500 group-hover:scale-105 group-hover:rotate-2">
                        <Icon className="h-6 w-6" />
                      </div>

                      {/* number */}
                      <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-[#C8952E] text-[10px] font-extrabold text-[#3A2B0A] shadow-md">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                    </div>

                    <h3 className="relative mt-6 font-serif text-xl text-[#06202B]">
                      {step.title}
                    </h3>

                    <p className="relative mx-auto mt-2 max-w-[230px] text-xs leading-6 text-[#607681]">
                      {step.text}
                    </p>

                    {/* small bottom accent */}
                    <div className="mx-auto mt-5 h-px w-8 bg-[#C8952E]/60 transition-all duration-500 group-hover:w-16" />

                  </div>

                  {/* Mobile connector */}
                  {index < steps.length - 1 && (
                    <div className="mx-auto my-2 h-5 w-px border-l border-dashed border-[#C8952E]/40 sm:hidden" />
                  )}

                </div>
              );
            })}

          </div>
        </div>

        {/* Bottom reassurance */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[10px] font-semibold text-[#71858E]">

          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8952E]" />
            Experienced Specialists
          </span>

          <span className="hidden h-3 w-px bg-[#DCE7EA] sm:block" />

          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#0E526B]" />
            Advanced Medical Care
          </span>

          <span className="hidden h-3 w-px bg-[#DCE7EA] sm:block" />

          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C8952E]" />
            Patient First
          </span>

        </div>

      </div>
    </section>
  );
}