"use client";

import { Star, Calendar, ArrowRight, Stethoscope, Award, Quote, Building2, HeartPulse, Activity, Brain } from "lucide-react";

export default function LeadingDoctors({ onOpenAppointmentModal }) {
  const doctors = [
    {
      id: 1,
      name: "Dr. Prathap C. Reddy",
      title: "Founder & Chairman, Apollo Hospitals Group",
      specialty: "Cardiology & Pioneer Healthcare Architect",
      exp: "45+ Years Exp.",
      quals: "MBBS, FCCP, FICA",
      rating: "5.0",
      reviews: "Pioneer Visionary",
      quote: "Healthcare is not a privilege for the few, it is a right for every life we touch.",
      featured: true,
    },
    {
      id: 2,
      name: "Dr. Sangita Reddy",
      title: "Joint Managing Director",
      specialty: "Hospital Administration & Healthcare Leadership",
      exp: "30+ Years Exp.",
      quals: "MBBS, Global Healthcare Pioneer",
      rating: "5.0",
      reviews: "1,200+ Cases",
    },
    {
      id: 3,
      name: "Dr. Vivek Gupta",
      title: "Senior Director, Interventional Cardiology",
      specialty: "Robotic Angioplasty & TAVI Specialist",
      exp: "24+ Years Exp.",
      quals: "MD, DM (Cardiology), FACC",
      rating: "4.9",
      reviews: "4,500+ Surgeries",
    },
    {
      id: 4,
      name: "Dr. Anuj Kumar",
      title: "Director, Surgical Oncology & CyberKnife",
      specialty: "Robotic Cancer Surgery & Immunotherapy",
      exp: "20+ Years Exp.",
      quals: "MS, MCh (Oncology)",
      rating: "4.9",
      reviews: "3,100+ Procedures",
    },
    {
      id: 5,
      name: "Dr. Meang Jain",
      title: "Senior Director, Neurosciences & Spine",
      specialty: "Deep Brain Stimulation & Complex Spine",
      exp: "22+ Years Exp.",
      quals: "MD, MCh (Neurosurgery)",
      rating: "4.9",
      reviews: "2,800+ Surgeries",
    },
  ];

  const featured = doctors.find((d) => d.featured);
  const rest = doctors.filter((d) => !d.featured);

  // Background icons for each of the 4 right side cards
  const bgIcons = [Building2, HeartPulse, Activity, Brain];

  return (
    <section id="doctors" className="relative py-24 lg:py-32 overflow-hidden bg-[#EDF6FB]">
      {/* ───── Dynamic background — same system as the hero ───── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="ld-orb ld-orb-1" />
        <div className="ld-orb ld-orb-2" />
        <div className="ld-orb ld-orb-3" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: "radial-gradient(#1D82A6 1px, transparent 1px)",
            backgroundSize: "26px 26px",
            maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 15%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black 15%, transparent 75%)",
          }}
        />
        <span className="ld-sparkle" style={{ top: "12%", left: "10%", animationDelay: "0s" }} />
        <span className="ld-sparkle" style={{ top: "70%", left: "6%", animationDelay: "1.4s" }} />
        <span className="ld-sparkle" style={{ top: "18%", left: "88%", animationDelay: "2.2s" }} />
        <span className="ld-sparkle" style={{ top: "80%", left: "92%", animationDelay: "0.8s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#0E526B]/15 shadow-sm mb-4">
              <Award className="w-3.5 h-3.5 text-[#C8952E]" />
              <span className="text-[11.5px] font-bold text-[#0E526B] uppercase tracking-widest">
                Meet Our Experts
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl xl:text-[2.6rem] font-extrabold text-[#0B3446] tracking-tight leading-tight">
              Our Leading{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg, #C8952E 0%, #E8C173 50%, #C8952E 100%)" }}
              >
                Doctors
              </span>
            </h2>
            <p className="text-sm text-slate-500 mt-3 max-w-md">
              Internationally trained specialists, pioneering surgeons, and healthcare leaders
              trusted by millions.
            </p>
          </div>

          <a
            href="#doctors"
            className="group shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-[#0E526B] bg-white/90 backdrop-blur-sm border border-[#0E526B]/20 hover:border-[#0E526B]/40 hover:bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
          >
            View All Doctors
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* ───── Doctors Bento Layout ───── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Featured Doctor — large spotlight card with bright ocean gradient */}
          {featured && (
            <div
              className="relative lg:row-span-2 rounded-[2rem] p-8 flex flex-col justify-between overflow-hidden text-white group bg-gradient-to-b from-[#0A5F7A] via-[#2A8FAF] to-[#17627D]"
            >
              <Stethoscope className="absolute -right-8 -bottom-8 w-56 h-56 text-white/[0.08] rotate-[-8deg]" strokeWidth={1} />
              <div className="absolute -top-20 -left-14 w-64 h-64 rounded-full bg-[#F6D98A]/20 blur-[80px]" />

              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 mb-6 px-3 py-1 rounded-full bg-white/10 border border-[#F6D98A]/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F6D98A]" />
                  <span className="text-[10.5px] font-bold text-[#F6D98A] tracking-wide uppercase">
                    Founder's Vision
                  </span>
                </span>

                {/* Avatar */}
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#F6D98A] to-[#C8952E] p-1 shadow-xl mb-5">
                  <div className="w-full h-full rounded-2xl bg-[#0A5F7A] flex items-center justify-center">
                    <Stethoscope className="w-10 h-10 text-[#F6D98A]" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white">{featured.name}</h3>
                <p className="text-[13px] font-semibold text-[#F6D98A] mt-1">{featured.title}</p>
                <p className="text-[13px] text-slate-100/90 mt-2 leading-relaxed">{featured.specialty}</p>

                {/* Quote */}
                <div className="mt-6 pl-4 border-l-2 border-[#F6D98A]/50 relative">
                  <Quote className="absolute -left-2 -top-1 w-4 h-4 text-[#F6D98A]/40" />
                  <p className="text-sm italic text-white/85 leading-relaxed">"{featured.quote}"</p>
                </div>
              </div>

              <div className="relative z-10 mt-8">
                <div className="flex items-center justify-between text-[12px] mb-5 pt-5 border-t border-white/15">
                  <span className="font-semibold text-white/80">{featured.quals}</span>
                  <span className="flex items-center gap-1 font-bold text-[#F6D98A]">
                    <Star className="w-3.5 h-3.5 fill-[#F6D98A]" /> {featured.rating}
                  </span>
                </div>
                <button
                  onClick={onOpenAppointmentModal}
                  className="w-full py-3 rounded-full text-sm font-bold text-[#3A2B0A] shadow-[0_6px_20px_rgba(197,146,46,0.4)] hover:shadow-[0_10px_28px_rgba(197,146,46,0.55)] hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                  style={{ background: "linear-gradient(180deg, #F6D98A 0%, #C8952E 100%)" }}
                >
                  <Calendar className="w-4 h-4" /> Book Consultation
                </button>
              </div>
            </div>
          )}

          {/* Remaining doctors — staggered white cards with background icons */}
          {rest.map((doc, idx) => {
            const BgIcon = bgIcons[idx % bgIcons.length];
            return (
              <div
                key={doc.id}
                className={`group relative rounded-[1.75rem] p-6 bg-white border border-slate-100 shadow-[0_6px_20px_rgba(15,52,72,0.06)] hover:shadow-[0_18px_40px_rgba(15,52,72,0.13)] hover:-translate-y-1.5 transition-all duration-300 flex items-center gap-5 overflow-hidden ${
                  idx % 2 === 1 ? "lg:ml-6" : ""
                }`}
              >
                {/* Background Design Icon */}
                <BgIcon 
                  className="absolute -right-5 -bottom-5 w-32 h-32 text-[#0E526B]/[0.04] group-hover:text-[#0E526B]/[0.08] group-hover:scale-110 group-hover:-rotate-6 transition-all duration-500 pointer-events-none stroke-[1.2]" 
                />

                {/* corner glow */}
                <div className="absolute -top-8 -right-8 w-28 h-28 rounded-full bg-[#C8952E]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Avatar */}
                <div className="relative z-10 shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-b from-[#0A5F7A] via-[#2A8FAF] to-[#17627D] p-[3px] shadow-md group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-full rounded-2xl bg-[#EBF5F8] flex items-center justify-center text-[#0E526B]">
                      <Stethoscope className="w-7 h-7" />
                    </div>
                  </div>
                  <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full bg-[#0E526B] text-[#FEF3C7] text-[9px] font-bold shadow">
                    {doc.exp}
                  </span>
                </div>

                {/* Info */}
                <div className="relative z-10 flex-1 min-w-0">
                  <h3 className="text-[15px] font-bold text-[#0B3446] group-hover:text-[#0E526B] transition-colors truncate">
                    {doc.name}
                  </h3>
                  <p className="text-[11px] font-bold text-[#C8952E] mt-0.5 truncate">{doc.title}</p>
                  <p className="text-[11.5px] text-slate-500 mt-1 line-clamp-2 leading-snug">{doc.specialty}</p>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
                    <span className="flex items-center gap-1 text-[11px] font-bold text-[#0E526B]">
                      <Star className="w-3.5 h-3.5 fill-[#C8952E] text-[#C8952E]" /> {doc.rating}
                      <span className="text-slate-400 font-medium ml-1">· {doc.reviews}</span>
                    </span>
                    <button
                      onClick={onOpenAppointmentModal}
                      className="w-8 h-8 rounded-full bg-[#EBF5F8] group-hover:bg-gradient-to-br group-hover:from-[#F6D98A] group-hover:to-[#C8952E] flex items-center justify-center shrink-0 transition-all duration-300"
                      aria-label={`Book consultation with ${doc.name}`}
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#1D82A6] group-hover:text-white transition-colors duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .ld-orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(70px);
        }
        .ld-orb-1 {
          width: 380px;
          height: 380px;
          top: -140px;
          left: -100px;
          background: radial-gradient(circle, #bfe3f2, transparent 70%);
          opacity: 0.55;
          animation: ldFloat1 16s ease-in-out infinite;
        }
        .ld-orb-2 {
          width: 340px;
          height: 340px;
          top: 25%;
          right: -140px;
          background: radial-gradient(circle, #f3dfa8, transparent 70%);
          opacity: 0.45;
          animation: ldFloat2 20s ease-in-out infinite;
        }
        .ld-orb-3 {
          width: 300px;
          height: 300px;
          bottom: -140px;
          left: 30%;
          background: radial-gradient(circle, #cdeaf7, transparent 70%);
          opacity: 0.45;
          animation: ldFloat3 18s ease-in-out infinite;
        }
        @keyframes ldFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(40px, 40px) scale(1.08); }
        }
        @keyframes ldFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 30px) scale(1.06); }
        }
        @keyframes ldFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -35px) scale(1.05); }
        }
        .ld-sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 9999px;
          background: #c8952e;
          box-shadow: 0 0 8px 2px rgba(200, 149, 46, 0.5);
          animation: ldTwinkle 3.5s ease-in-out infinite;
        }
        @keyframes ldTwinkle {
          0%, 100% { opacity: 0; transform: scale(0.6); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </section>
  );
}