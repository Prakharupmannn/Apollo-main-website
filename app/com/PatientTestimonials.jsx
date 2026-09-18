"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2, User } from "lucide-react";

export default function PatientTestimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Rajesh Kumar",
      location: "New Delhi, India",
      procedure: "Robotic Cardiac Surgery",
      rating: 5,
      quote:
        "The care and support I received at Apollo Hospitals was exceptional. The doctors and staff were always there for me, and I felt healthier and stronger today. Truly a life-changing experience!",
      avatar: "RK",
    },
    {
      id: 2,
      name: "Ananya Sharma",
      location: "Mumbai, India",
      procedure: "CyberKnife Oncology",
      rating: 5,
      quote:
        "When I was diagnosed with early stage tumor, Apollo's CyberKnife team gave me absolute confidence. Non-invasive, pain-free treatments and I was back with my family in days.",
      avatar: "AS",
    },
    {
      id: 3,
      name: "David Miller",
      location: "London, UK (International Patient)",
      procedure: "Total Hip Replacement",
      rating: 5,
      quote:
        "Traveled from the UK for orthopedic surgery at Apollo Hospitals. The international patient care desk managed everything seamlessly from flight pickup to top surgeon consultations.",
      avatar: "DM",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const active = testimonials[currentIndex];

  return (
    <section className="py-20 bg-[#093749] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header with Nav Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-[#1D82A6]/40 pb-6">
          <div>
            <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest block mb-1">
              Real Stories, Real Hope
            </span>
            <h2 className="font-serif-apollo text-3xl sm:text-4xl font-extrabold text-white">
              What Our Patients Say
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-[#0E526B] border border-[#1D82A6]/50 flex items-center justify-center text-[#F59E0B] hover:bg-[#1D82A6] hover:text-white transition-colors cursor-pointer"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-[#0E526B] border border-[#1D82A6]/50 flex items-center justify-center text-[#F59E0B] hover:bg-[#1D82A6] hover:text-white transition-colors cursor-pointer"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonial Active Quote Card */}
        <div className="bg-gradient-to-r from-[#0E526B] via-[#093749] to-[#0E526B] rounded-3xl p-8 sm:p-12 border-2 border-[#1D82A6]/40 shadow-2xl relative">
          <Quote className="w-16 h-16 text-[#1D82A6]/30 absolute top-6 right-6 pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Avatar & Info */}
            <div className="md:col-span-4 text-center md:text-left space-y-4">
              <div className="w-20 h-20 mx-auto md:mx-0 rounded-full bg-gradient-to-tr from-[#F59E0B] to-[#FEF3C7] p-1 shadow-xl">
                <div className="w-full h-full rounded-full bg-[#093749] flex items-center justify-center text-[#F59E0B] font-serif-apollo text-xl font-bold">
                  {active.avatar}
                </div>
              </div>

              <div>
                <h3 className="font-serif-apollo text-xl font-bold text-white">
                  {active.name}
                </h3>
                <p className="text-xs text-[#F59E0B] font-medium mt-0.5">
                  {active.location}
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs text-slate-100 mt-2 border border-white/10">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  {active.procedure}
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center justify-center md:justify-start gap-1">
                {[...Array(active.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                ))}
              </div>
            </div>

            {/* Right Quote Body */}
            <div className="md:col-span-8 border-t md:border-t-0 md:border-l border-[#1D82A6]/30 pt-6 md:pt-0 md:pl-8">
              <p className="font-serif-apollo text-lg sm:text-xl text-slate-100 leading-relaxed italic">
                "{active.quote}"
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
