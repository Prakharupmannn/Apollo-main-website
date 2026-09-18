"use client";

import { useState } from "react";
import { Star, Calendar, ShieldCheck, ArrowRight, UserCheck, Award, Stethoscope } from "lucide-react";

export default function LeadingDoctors({ onOpenAppointmentModal }) {
  const [activeTab, setActiveTab] = useState("all");

  const doctors = [
    {
      id: 1,
      name: "Dr. Sangita Reddy",
      title: "Joint Managing Director & Executive Director",
      specialty: "Hospital Administration & Healthcare Leadership",
      category: "leadership",
      exp: "30+ Years Exp.",
      quals: "MBBS, Global Healthcare Pioneer",
      rating: "5.0",
      reviews: "1,200+ Cases",
    },
    {
      id: 2,
      name: "Dr. Prathap C. Reddy",
      title: "Founder & Chairman - Apollo Hospitals Group",
      specialty: "Cardiology & Pioneer Healthcare Architect",
      category: "cardiology",
      exp: "45+ Years Exp.",
      quals: "MBBS, FCCP, FICA",
      rating: "5.0",
      reviews: "Pioneer Visionary",
    },
    {
      id: 3,
      name: "Dr. Vivek Gupta",
      title: "Senior Director - Interventional Cardiology",
      specialty: "Robotic Angioplasty & TAVI Specialist",
      category: "cardiology",
      exp: "24+ Years Exp.",
      quals: "MD, DM (Cardiology), FACC",
      rating: "4.9",
      reviews: "4,500+ Surgeries",
    },
    {
      id: 4,
      name: "Dr. Anuj Kumar",
      title: "Director - Surgical Oncology & CyberKnife",
      specialty: "Robotic Cancer Surgery & Immunotherapy",
      category: "oncology",
      exp: "20+ Years Exp.",
      quals: "MS, MCh (Oncology)",
      rating: "4.9",
      reviews: "3,100+ Procedures",
    },
    {
      id: 5,
      name: "Dr. Meang Jain",
      title: "Senior Director - Neurosciences & Spine",
      specialty: "Deep Brain Stimulation & Complex Spine",
      category: "neurology",
      exp: "22+ Years Exp.",
      quals: "MD, MCh (Neurosurgery)",
      rating: "4.9",
      reviews: "2,800+ Surgeries",
    },
  ];

  const filteredDoctors = activeTab === "all" ? doctors : doctors.filter((d) => d.category === activeTab);

  return (
    <section id="doctors" className="py-20 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-[#1D82A6]/30 pb-6">
          <div>
            <span className="text-xs font-bold text-[#1D82A6] uppercase tracking-widest block mb-1">
              Meet Our Experts
            </span>
            <h2 className="font-serif-apollo text-3xl sm:text-4xl font-extrabold text-[#0E526B]">
              Our Leading Doctors
            </h2>
          </div>

          <a
            href="#doctors"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#1D82A6] hover:text-[#F59E0B] transition-colors group"
          >
            <span>View All Doctors</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Specialty Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {[
            { id: "all", label: "All Specialists" },
            { id: "cardiology", label: "Cardiology" },
            { id: "oncology", label: "Oncology" },
            { id: "neurology", label: "Neurology" },
            { id: "leadership", label: "Executive Leadership" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                activeTab === tab.id
                  ? "bg-[#0E526B] text-[#FEF3C7] border-[#1D82A6] shadow-md"
                  : "bg-white text-slate-700 border-slate-200 hover:border-[#1D82A6]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="gold-card-frame rounded-2xl p-5 bg-white flex flex-col justify-between group"
            >
              <div>
                {/* Doctor Visual Avatar Header */}
                <div className="relative rounded-xl overflow-hidden bg-[#EBF5F8] p-4 text-center border border-[#1D82A6]/30 mb-4 group-hover:border-[#1D82A6] transition-colors">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#1D82A6] to-[#0E526B] p-1 shadow-md mb-2">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#1D82A6]">
                      <Stethoscope className="w-9 h-9" />
                    </div>
                  </div>

                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#0E526B] text-[#FEF3C7] text-[10px] font-bold">
                    {doc.exp}
                  </span>
                </div>

                {/* Name & Credentials */}
                <h3 className="font-serif-apollo text-base font-bold text-[#0E526B] group-hover:text-[#1D82A6] transition-colors">
                  {doc.name}
                </h3>
                <p className="text-[11px] font-bold text-[#F59E0B] mt-0.5">
                  {doc.title}
                </p>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  {doc.specialty}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-3">
                  <span className="font-semibold text-slate-700">{doc.quals}</span>
                  <span className="flex items-center gap-1 font-bold text-[#0E526B]">
                    <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" /> {doc.rating}
                  </span>
                </div>

                <button
                  onClick={onOpenAppointmentModal}
                  className="w-full py-2.5 rounded-full text-xs font-bold bg-[#1D82A6] hover:bg-[#166F91] text-white transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" /> Book Consultation
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
