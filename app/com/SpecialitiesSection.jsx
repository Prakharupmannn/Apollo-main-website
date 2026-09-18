"use client";

import { useState } from "react";
import { Heart, Activity, Brain, Bone, Stethoscope, Shield, ArrowRight, CheckCircle2, ChevronRight, X } from "lucide-react";

export default function SpecialitiesSection({ onOpenAppointmentModal }) {
  const [activeSpecialty, setActiveSpecialty] = useState(null);

  const specialities = [
    {
      id: "cardiology",
      name: "Cardiology",
      tagline: "Advanced heart care for every heartbeat",
      desc: "Comprehensive cardiac diagnostics, TAVI, robotic bypass, and 24/7 cath lab emergency interventions.",
      icon: Heart,
      treatments: ["Robotic Cardiac Surgery", "Angioplasty & Stenting", "TAVI & Valve Replacement", "Arrhythmia & Pacemakers"],
      stats: "99.2% Success Rate",
    },
    {
      id: "oncology",
      name: "Oncology",
      tagline: "Hope through advanced cancer care",
      desc: "Proton therapy, CyberKnife robotic radiosurgery, personalized immunotherapy, and bone marrow transplants.",
      icon: Shield,
      treatments: ["CyberKnife Radiosurgery", "Proton Beam Therapy", "Medical & Chemo Oncology", "Bone Marrow Transplant"],
      stats: "Leading Cancer Center",
    },
    {
      id: "neurology",
      name: "Neurology",
      tagline: "Expert care for a healthier tomorrow",
      desc: "Dedicated stroke unit, DBS for Parkinson's, brain tumor surgeries, and pediatric neuro-rehabilitation.",
      icon: Brain,
      treatments: ["Deep Brain Stimulation", "Stroke Intervention 24/7", "Complex Spine Surgeries", "Epilepsy Management"],
      stats: "50,000+ Surgeries",
    },
    {
      id: "orthopaedics",
      name: "Orthopaedics",
      tagline: "Moving you towards a better life",
      desc: "Mako robotic joint replacements, sports injury arthroscopy, pediatric orthopedics, and complex trauma care.",
      icon: Bone,
      treatments: ["Robotic Knee Replacement", "Total Hip Arthroplasty", "Arthroscopic Shoulder Surgery", "Spine Decompression"],
      stats: "Fast Recovery Protocols",
    },
    {
      id: "gastroenterology",
      name: "Gastroenterology",
      tagline: "Complete care for digestive health",
      desc: "Advanced GI endoscopy, liver transplant program, pancreatic disease management, and GERD treatments.",
      icon: Activity,
      treatments: ["Endoscopic Ultrasound (EUS)", "Liver Transplant Unit", "ERCP Procedure", "IBD Specialized Care"],
      stats: "25,000+ Liver Transplants",
    },
    {
      id: "urology",
      name: "Urology",
      tagline: "Specialized care for a healthier you",
      desc: "Laser kidney stone removal, robotic prostatectomy, uro-oncology, and advanced reconstructive procedures.",
      icon: Stethoscope,
      treatments: ["Laser Stone Lithotripsy", "Robotic Prostate Surgery", "Kidney Transplant", "Female Urology Clinic"],
      stats: "98.8% Patient Outcome",
    },
  ];

  return (
    <section id="specialities" className="py-20 bg-[#F8FAFC] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-[#1D82A6]/30 pb-6">
          <div>
            <span className="text-xs font-bold text-[#1D82A6] uppercase tracking-widest block mb-1">
              Comprehensive Care
            </span>
            <h2 className="font-serif-apollo text-3xl sm:text-4xl font-extrabold text-[#0E526B]">
              Our Specialities
            </h2>
          </div>

          <a
            href="#doctors"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#1D82A6] hover:text-[#F59E0B] transition-colors group"
          >
            <span>View All Specialities</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 6 Speciality Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {specialities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => setActiveSpecialty(item)}
                className="gold-card-frame rounded-2xl p-6 cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Tag */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-[#EBF5F8] border border-[#1D82A6]/30 flex items-center justify-center text-[#1D82A6] group-hover:bg-[#1D82A6] group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[10px] font-bold text-[#0E526B] bg-[#EBF5F8] px-2.5 py-1 rounded-full border border-[#1D82A6]/30">
                      {item.stats}
                    </span>
                  </div>

                  {/* Specialty Title & Subtitle */}
                  <h3 className="font-serif-apollo text-xl font-bold text-[#0E526B] group-hover:text-[#1D82A6] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#F59E0B] mt-1">
                    {item.tagline}
                  </p>
                  <p className="text-xs text-slate-600 mt-3 leading-relaxed line-clamp-2">
                    {item.desc}
                  </p>
                </div>

                {/* Treatment Highlights */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs font-bold text-[#0E526B]">
                    <span>Explore Procedures</span>
                    <ChevronRight className="w-4 h-4 text-[#F59E0B] group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Specialty Quick Info Drawer / Modal */}
      {activeSpecialty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-[#1D82A6] relative">
            <button
              onClick={() => setActiveSpecialty(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#0E526B] text-[#F59E0B] flex items-center justify-center">
                <activeSpecialty.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif-apollo text-2xl font-bold text-[#0E526B]">
                  {activeSpecialty.name}
                </h3>
                <p className="text-xs font-semibold text-[#F59E0B]">
                  {activeSpecialty.tagline}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-700 leading-relaxed mb-6">
              {activeSpecialty.desc}
            </p>

            <div className="space-y-3 mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Key Clinical Procedures & Treatments:
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {activeSpecialty.treatments.map((t) => (
                  <div key={t} className="flex items-center gap-2 text-xs font-medium text-[#0E526B] bg-[#EBF5F8] p-2.5 rounded-xl border border-[#1D82A6]/20">
                    <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setActiveSpecialty(null)}
                className="px-4 py-2 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveSpecialty(null);
                  onOpenAppointmentModal();
                }}
                className="px-6 py-2.5 rounded-full text-xs font-bold bg-gold-gradient text-slate-950 shadow-md hover:brightness-110"
              >
                Book {activeSpecialty.name} Specialist
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
