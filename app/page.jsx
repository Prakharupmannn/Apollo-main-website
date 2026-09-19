"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/components/Navbar";
import HeroSection from "../components/components/HeroSection";
import QuickActionsGrid from "../components/components/QuickActionsGrid";
import SpecialitiesSection from "../components/components/SpecialitiesSection";
import WhyChooseApollo from "../components/components/WhyChooseApollo";
import CentresOfExcellence from "../components/components/CentresOfExcellence";
import LeadingDoctors from "../components/components/LeadingDoctors";
import AppointmentBanner from "../components/components/AppointmentBanner";
import PatientTestimonials from "../components/components/PatientTestimonials";
import HealthArticles from "../components/components/HealthArticles";
import AppointmentModal from "../components/components/AppointmentModal";
import Footer from "../components/components/Footer";
import { Search, X } from "lucide-react";

export default function Home() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Force every load/refresh of this page to start at the top, instead of
  // the browser restoring whatever scroll position you were at before refreshing.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  const handleOpenAppointmentModal = () => {
    setIsAppointmentModalOpen(true);
  };

  const handleCloseAppointmentModal = () => {
    setIsAppointmentModalOpen(false);
  };

  const handleHeroSearch = (query) => {
    setSearchQuery(query);
    setSearchResults([
      { title: "Dr. Sangita Reddy", cat: "Executive Leadership", link: "#doctors" },
      { title: "Dr. Vivek Gupta", cat: "Cardiology", link: "#doctors" },
      { title: "Robotic Cardiac Surgery", cat: "Specialty Procedure", link: "#specialities" },
      { title: "Cancer Care Institute", cat: "Centre of Excellence", link: "#centres-of-excellence" },
    ]);
    setIsSearchModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-[#1D82A6] selection:text-white">
      {/* Fixed Navbar Header */}
      {/* <Navbar
        onOpenAppointmentModal={handleOpenAppointmentModal}
        onOpenSearchModal={() => setIsSearchModalOpen(true)}
      /> */}

      {/* Hero Section */}
      <HeroSection
        onOpenAppointmentModal={handleOpenAppointmentModal}
        onSearchSubmit={handleHeroSearch}
      />

      {/* Quick Actions Grid & 40+ Years Stats Banner */}
      <QuickActionsGrid
        onOpenAppointmentModal={handleOpenAppointmentModal}
      />

      {/* Comprehensive Care Specialities */}
      <SpecialitiesSection
        onOpenAppointmentModal={handleOpenAppointmentModal}
      />

      {/* The Apollo Advantage (Why Choose Apollo) */}
      <WhyChooseApollo />

      {/* Centres of Excellence */}
      <CentresOfExcellence
        onOpenAppointmentModal={handleOpenAppointmentModal}
      />

      {/* Meet Our Leading Doctors */}
      <LeadingDoctors
        onOpenAppointmentModal={handleOpenAppointmentModal}
      />

      {/* Book Your Appointment CTA Banner */}
      <AppointmentBanner
        onOpenAppointmentModal={handleOpenAppointmentModal}
      />

      {/* Real Stories Patient Testimonials */}
      <PatientTestimonials />

      {/* Health Articles & Awareness */}
      <HealthArticles />

      {/* Footer
      <Footer
        onOpenAppointmentModal={handleOpenAppointmentModal}
      /> */}

      {/* Interactive Appointment Modal */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={handleCloseAppointmentModal}
      />

      {/* Quick Search Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border-2 border-[#1D82A6] relative">
            <button
              onClick={() => setIsSearchModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-900"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Search className="w-5 h-5 text-[#F59E0B]" />
              <h3 className="font-serif-apollo text-lg font-bold text-[#0E526B]">
                Search Apollo Hospitals
              </h3>
            </div>

            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search doctors, specialities, packages..."
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-[#1D82A6] focus:ring-2 focus:ring-[#1D82A6]/20 focus:outline-none mb-4"
            />

            <div className="space-y-2 max-h-60 overflow-y-auto">
              <p className="text-[11px] font-bold uppercase text-slate-400">Quick Match Results:</p>
              {[
                { title: "Dr. Sangita Reddy", desc: "Joint Managing Director & Executive Director", href: "#doctors" },
                { title: "Dr. Vivek Gupta", desc: "Senior Director - Interventional Cardiology", href: "#doctors" },
                { title: "Cardiology Specialty", desc: "TAVI, Angioplasty, Robotic Bypass", href: "#specialities" },
                { title: "Cancer Care Institute", desc: "Proton Therapy & CyberKnife", href: "#centres-of-excellence" },
              ].map((res) => (
                <a
                  key={res.title}
                  href={res.href}
                  onClick={() => setIsSearchModalOpen(false)}
                  className="block p-3 rounded-xl hover:bg-[#EBF5F8] border border-slate-100 transition-colors"
                >
                  <div className="text-xs font-bold text-[#0E526B]">{res.title}</div>
                  <div className="text-[11px] text-slate-500">{res.desc}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}