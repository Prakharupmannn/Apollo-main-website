"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  UsersRound,
  HeartPulse,
  Stethoscope,
} from "lucide-react";

function HeroStat({ value, label, icon: Icon }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EDF6FB]">
        <Icon className="h-3.5 w-3.5 text-[#0E526B]" />
      </div>

      <div>
        <div className="text-[11px] font-extrabold tracking-tight text-[#06202B]">
          {value}
        </div>
        <div className="text-[8px] font-medium text-slate-500">
          {label}
        </div>
      </div>
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function DoctorsHero({ hospital }) {
  return (
    <section className="relative overflow-hidden bg-[#F1FAFC]">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0">

        <div className="absolute -left-40 top-20 h-[430px] w-[430px] rounded-full bg-[#1D82A6]/10 blur-3xl" />

        <div className="absolute -right-32 -top-20 h-[500px] w-[500px] rounded-full bg-[#C8952E]/10 blur-3xl" />

        <div className="absolute left-[7%] top-[28%] h-24 w-24 rounded-full border border-[#C8952E]/20" />

        <div className="absolute right-[8%] top-[18%] h-36 w-36 rounded-full border border-[#1D82A6]/10" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(#0E526B 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-125px)] max-w-7xl items-center px-5 pb-16 pt-[145px] sm:px-8 lg:pb-20 lg:pt-[145px]">

        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">

          {/* =================================================
              LEFT
          ================================================== */}

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6"
          >

            <motion.div
              variants={fadeUp}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#1D82A6]/15 bg-white/70 px-3.5 py-1.5 backdrop-blur-md"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C8952E] opacity-60" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-[#C8952E]" />
              </span>

              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#0E526B]">
                The Experts Behind Your Care
              </span>
            </motion.div>

            <motion.p
              variants={fadeUp}
              className="mb-2 font-serif text-base italic text-[#C8952E] sm:text-lg"
            >
              Expertise meets compassion.
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="max-w-2xl text-[2.5rem] font-extrabold leading-[1] tracking-[-0.035em] text-[#06202B] sm:text-5xl lg:text-[4rem]"
            >
              Meet the specialists
              <br />

              <span className="relative inline-block text-[#0E526B]">
                behind{" "}
                <span className="text-[#C8952E]">
                  your care.
                </span>

                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{
                    delay: 0.9,
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute bottom-[-5px] left-0 h-[2px] rounded-full bg-gradient-to-r from-[#C8952E] to-transparent"
                />
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-lg text-[13px] leading-6 text-slate-600 sm:text-sm"
            >
              Meet the experienced doctors and consultants at Apollo JBP
              Hospitals, bringing together specialist expertise, advanced
              medical technology and a patient-first approach to healthcare
              in Jabalpur and the Mahakoshal region.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-7 flex flex-wrap items-center gap-3"
            >

              <Link
                href="#doctors"
                className="group flex items-center gap-2.5 rounded-full bg-gradient-to-b from-[#F6D98A] to-[#C8952E] px-5 py-2.5 text-xs font-bold text-[#3A2B0A] shadow-[0_10px_25px_rgba(200,149,46,0.22)] transition-all duration-300 hover:-translate-y-1"
              >
                Explore Our Doctors
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="group flex items-center gap-2 rounded-full border border-[#0E526B]/15 bg-white/70 px-5 py-2.5 text-xs font-bold text-[#0E526B] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md"
              >
                Book an Appointment
                <ArrowUpRight className="h-3.5 w-3.5 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-7 grid max-w-[560px] grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4"
            >

              <HeroStat
                value="49"
                label="Expert Doctors"
                icon={UsersRound}
              />

              <HeroStat
                value="20+"
                label="Specialties"
                icon={Stethoscope}
              />

              <HeroStat
                value="Advanced"
                label="Medical Care"
                icon={HeartPulse}
              />

              <HeroStat
                value="Patient"
                label="First Approach"
                icon={HeartPulse}
              />

            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2"
            >

              <div className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C8952E]" />
                <span className="text-[9px] font-semibold text-slate-500">
                  Patient First
                </span>
              </div>

              <span className="h-3 w-px bg-slate-300" />

              <span className="text-[9px] font-semibold text-slate-500">
                Specialist Care
              </span>

              <span className="h-3 w-px bg-slate-300" />

              <span className="text-[9px] font-semibold text-slate-500">
                Advanced Technology
              </span>

            </motion.div>

          </motion.div>

          {/* =================================================
              RIGHT IMAGE
          ================================================== */}

          <motion.div
            className="relative lg:col-span-6"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            <div className="relative mx-auto max-w-[500px]">

              {/* image aura */}
              <motion.div
                animate={{
                  scale: [1, 1.035, 1],
                  opacity: [0.3, 0.45, 0.3],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-[#C8952E]/25 to-[#1D82A6]/15 blur-3xl"
              />

              {/* image frame */}
              <div className="relative overflow-hidden rounded-[2rem] border-[5px] border-white bg-white shadow-[0_25px_60px_-18px_rgba(15,52,72,0.30)]">

                <motion.img
                  src="/images/doctors/doctorhero.png"
                  alt="Expert doctors at Apollo JBP Hospitals"
                  className="h-[430px] w-full object-cover sm:h-[500px]"
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 1.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#06202B]/35 via-transparent to-transparent" />

                <div className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-[#F6D98A]" />

                <div className="absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-[#F6D98A]" />

              </div>

              {/* patient first */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -bottom-5 -left-3 hidden rounded-xl border border-white/80 bg-white/90 px-3.5 py-3 shadow-[0_15px_35px_rgba(15,52,72,0.16)] backdrop-blur-xl sm:block"
              >
                <div className="flex items-center gap-2.5">

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EDF6FB]">
                    <HeartPulse className="h-4 w-4 text-[#0E526B]" />
                  </div>

                  <div>
                    <div className="text-[10px] font-bold text-[#06202B]">
                      Patient First
                    </div>

                    <div className="mt-0.5 text-[9px] text-slate-500">
                      At the heart of every decision
                    </div>
                  </div>

                </div>
              </motion.div>

              {/* doctor count */}
              <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-3 top-12 hidden rounded-xl border border-[#C8952E]/20 bg-[#06202B] px-3.5 py-2.5 text-white shadow-[0_15px_30px_rgba(6,32,43,0.18)] sm:block"
              >
                <span className="text-[8px] uppercase tracking-[0.18em] text-white/45">
                  Our Team
                </span>

                <div className="mt-0.5 text-lg font-extrabold tracking-tight">
                  49
                </div>

                <div className="text-[8px] text-[#F6D98A]">
                  Expert Doctors
                </div>
              </motion.div>

            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}