"use client";

import { useState } from "react";
import {
  MapPin,
  PhoneCall,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Building,
  Navigation,
  Globe,
  ShieldCheck,
  Calendar,
  ChevronDown,
  HelpCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import AppointmentModal from "../../components/components/AppointmentModal";

export default function ContactPage() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    department: "General Inquiry",
    subject: "",
    message: "",
  });

  const [activeFaq, setActiveFaq] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState("Jabalpur");

  // Madhya Pradesh Regional Reach List (from uploaded reference screenshot)
  const mpDistricts = [
    { name: "Jabalpur", distance: "Main Campus Hub", feature: "24/7 Super-Specialty Hospital & Trauma Center" },
    { name: "Satna", distance: "180 km", feature: "Rapid Cardiac & Emergency Ambulance Transport" },
    { name: "Mandla", distance: "95 km", feature: "Tele-Consultation & Specialist Outreach Clinics" },
    { name: "Rewa", distance: "230 km", feature: "Oncology & Critical Care Referral Linkage" },
    { name: "Katni", distance: "90 km", feature: "Fast-Track Emergency Patient Transfer" },
    { name: "Seoni", distance: "140 km", feature: "Cardiology & Orthopaedic Rehabilitation Care" },
    { name: "Shahdol", distance: "185 km", feature: "Advanced Diagnostics & Tele-Pathology Support" },
    { name: "Sidhi", distance: "240 km", feature: "Direct Specialist Referral Network" },
    { name: "Tikamgarh", distance: "260 km", feature: "Tele-ICU Remote Monitoring Services" },
    { name: "Singrauli", distance: "300 km", feature: "Industrial Health & Trauma Emergency Care" },
    { name: "Panna", distance: "210 km", feature: "Outreach Preventive Health Checkup Camps" },
    { name: "Sagar", distance: "170 km", feature: "Robotic Joint & Cardiac Surgery Referral Desk" },
    { name: "Damoh", distance: "105 km", feature: "Dedicated Ambulance Dispatch Helpline" },
    { name: "Chhatarpur", distance: "220 km", feature: "Second Opinion & Tele-Medicine Services" },
    { name: "Narsinghpur", distance: "85 km", feature: "Express Emergency Ambulance Coverage" },
    { name: "Dindori", distance: "140 km", feature: "Maternal & Child Health Referral Desk" },
    { name: "Anuppur", distance: "210 km", feature: "Specialist OPD Consultation Camps" },
    { name: "Umaria", distance: "150 km", feature: "Neurology & Stroke Emergency Transfer" },
  ];

  const contactCards = [
    {
      title: "24/7 Emergency Hotline",
      number: "1066 / +91 761 4000100",
      desc: "Immediate Trauma Care, Ambulance Dispatch & Critical Triage",
      icon: PhoneCall,
      highlight: true,
      color: "bg-rose-500 text-white border-rose-400",
    },
    {
      title: "Appointment Booking Desk",
      number: "+91 761 4000108 / 109",
      desc: "OPD Appointments & Specialist Doctor Schedule",
      icon: Calendar,
      highlight: false,
      color: "bg-white text-slate-800 border-slate-200",
    },
    {
      title: "Health Checkups & TPA Desk",
      number: "+91 761 4000120",
      desc: "Corporate Screening & Cashless Insurance Desk",
      icon: ShieldCheck,
      highlight: false,
      color: "bg-white text-slate-800 border-slate-200",
    },
    {
      title: "Email & Helpdesk",
      number: "jabalpur_info@apollohospitals.com",
      desc: "General inquiries, feedback, and medical records assistance",
      icon: Mail,
      highlight: false,
      color: "bg-white text-slate-800 border-slate-200",
    },
  ];

  const faqs = [
    {
      q: "Where is Apollo Hospital Jabalpur located and how do I navigate there?",
      a: "Apollo Hospital Jabalpur is conveniently situated on the main arterial corridor in Jabalpur, Madhya Pradesh. You can follow our live interactive Google Map embed above or navigate via GPS for direct entry to main OPD and Emergency gates.",
    },
    {
      q: "What emergency services are available 24/7 at the Jabalpur facility?",
      a: "Our emergency department operates round the clock with Level-1 Trauma Care, Cardiac Cath Lab standby, Stroke ICU, 24/7 Blood Bank, Diagnostic Imaging (CT/MRI), and advanced Cardiac Ambulances with ventilators.",
    },
    {
      q: "How does the Cashless Insurance / TPA Helpdesk work?",
      a: "We are empanelled with major insurance providers and TPAs. Visit our TPA desk located on the ground floor near admission counters with your e-card and doctor recommendation for hassle-free pre-authorization.",
    },
    {
      q: "What are the visiting hours for Patient Wards and Intensive Care Units (ICU)?",
      a: "General Wards: 4:00 PM – 6:00 PM daily. ICU / ICCU: 11:00 AM – 12:00 PM & 5:00 PM – 6:00 PM (1 visitor per patient pass to ensure strict infection control).",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-28 pb-20 selection:bg-[#1D82A6] selection:text-white">
      {/* Hero Banner Header */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#093749] via-[#0E526B] to-[#1D82A6] p-8 sm:p-12 md:p-16 text-white shadow-2xl border border-[#F59E0B]/30">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#F59E0B]/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#1D82A6]/30 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FEF3C7] text-xs font-semibold mb-6 shadow-inner">
              <Building className="w-4 h-4 text-[#F59E0B]" />
              <span>Apollo Hospital Jabalpur • Super-Specialty Medical Hub</span>
            </div>

            <h1 className="font-serif-apollo text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
              Contact Us & Visit Apollo Jabalpur
            </h1>

            <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
              We are dedicated to providing world-class healthcare with 24/7 emergency response, expert consultations, and seamless regional medical connectivity across Madhya Pradesh.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="tel:1066"
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 transition-all shadow-lg border border-rose-300/40"
              >
                <PhoneCall className="w-4 h-4 animate-bounce" />
                <span>Call Emergency Hotline: 1066</span>
              </a>

              <button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-gold-gradient text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl border shadow-lg transition-all duration-300 flex flex-col justify-between ${card.color} ${
                  card.highlight ? "shadow-rose-500/20" : "hover:border-[#1D82A6]"
                }`}
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 font-bold ${
                      card.highlight
                        ? "bg-white text-rose-600 shadow-md"
                        : "bg-[#EBF5F8] text-[#0E526B]"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif-apollo text-base font-bold mb-1">
                    {card.title}
                  </h3>
                  <div className="text-xs font-mono font-bold tracking-wide mb-2">
                    {card.number}
                  </div>
                  <p className="text-[11px] opacity-80 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 1: GOOGLE MAPS EMBED - ATTRACTIVE & INTERACTIVE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#1D82A6]/40 relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#F59E0B] uppercase tracking-wider mb-1">
                <MapPin className="w-4 h-4 text-[#1D82A6]" />
                <span>Hospital Navigation & Campus Map</span>
              </div>
              <h2 className="font-serif-apollo text-2xl sm:text-3xl font-bold text-[#0E526B]">
                Apollo Hospitals Jabalpur Location
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://maps.google.com/?q=Apollo+Hospital+Jabalpur"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0E526B] text-[#FEF3C7] text-xs font-bold hover:bg-[#1D82A6] transition-all shadow-md"
              >
                <Navigation className="w-4 h-4 text-[#F59E0B]" />
                <span>Open in Google Maps &rarr;</span>
              </a>
            </div>
          </div>

          {/* Map Frame Container */}
          <div className="relative w-full h-[400px] sm:h-[480px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner group">
            <iframe
              title="Apollo Hospital Jabalpur Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117366.12602773347!2d79.8669527!3d23.1814674!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3981ae4268e3b1a9%3A0x6d9f9bb49f3e4905!2sJabalpur%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter saturate-105"
            ></iframe>

            {/* Glowing Map Overlay Badge */}
            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-[#1D82A6]/30 max-w-xs text-xs space-y-1.5 hidden sm:block">
              <div className="flex items-center gap-2 font-bold text-[#0E526B]">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Apollo JBP Hospitals</span>
              </div>
              <p className="text-[11px] text-slate-600">
                Main Campus, Civil Lines / Napier Town Corridor, Jabalpur, MP 482001
              </p>
              <div className="text-[10px] text-[#1D82A6] font-bold">
                Emergency 24/7 Gate Entry Available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: OUR SERVICE REACH IN MADHYA PRADESH (REFERENCE SCREENSHOT MATCH) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-br from-[#093749] via-[#0E526B] to-[#1D82A6] rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-2xl border border-[#F59E0B]/30 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#F59E0B]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#FEF3C7] text-xs font-semibold mb-3 border border-white/20">
              <Globe className="w-4 h-4 text-[#F59E0B]" />
              <span>Regional Healthcare Leadership</span>
            </div>
            <h2 className="font-serif-apollo text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Our Service Reach in Madhya Pradesh
            </h2>
            <p className="text-slate-200 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed">
              Apollo JBP Hospital is proud to serve patients across the following key regions of Madhya Pradesh with 24/7 ambulance dispatch, tele-consultation, and referral care.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Cols: District Selector Interactive Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {mpDistricts.map((dist) => {
                const isSelected = selectedDistrict === dist.name;
                return (
                  <button
                    key={dist.name}
                    onClick={() => setSelectedDistrict(dist.name)}
                    className={`p-3 rounded-2xl text-left text-xs font-semibold transition-all cursor-pointer flex items-center justify-between border ${
                      isSelected
                        ? "bg-gold-gradient text-slate-950 font-bold border-amber-300 shadow-lg scale-105"
                        : "bg-white/10 hover:bg-white/20 text-white border-white/15"
                    }`}
                  >
                    <span>{dist.name}</span>
                    {isSelected && <Sparkles className="w-3.5 h-3.5 text-slate-950 shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Right 5 Cols: Active Region Highlight Detail Card */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/20 text-white flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-[#FEF3C7] mb-2">
                  Region Service Focus
                </div>
                <h3 className="font-serif-apollo text-2xl font-bold text-white mb-2">
                  {selectedDistrict} District
                </h3>

                {mpDistricts.find((d) => d.name === selectedDistrict) && (
                  <div className="space-y-3 text-xs text-slate-200">
                    <div className="p-3 rounded-xl bg-black/20 border border-white/10">
                      <span className="font-bold text-[#F59E0B]">Distance from Main Hub:</span>{" "}
                      {mpDistricts.find((d) => d.name === selectedDistrict).distance}
                    </div>

                    <div className="p-3 rounded-xl bg-black/20 border border-white/10 leading-relaxed">
                      <span className="font-bold text-emerald-400">Specialized Services:</span>{" "}
                      {mpDistricts.find((d) => d.name === selectedDistrict).feature}
                    </div>

                    <p className="text-[11.5px] leading-relaxed opacity-90 pt-2">
                      Patients in {selectedDistrict} have direct access to Apollo Jabalpur's express critical care transfer, video consultations, and specialized surgical admissions.
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between">
                <a
                  href="tel:1066"
                  className="px-5 py-2.5 rounded-full bg-rose-500 text-white font-bold text-xs hover:bg-rose-600 transition-all flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Regional Ambulance Helpline</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE CONTACT FORM & VISITING HOURS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 7 Cols: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
            <div className="mb-6">
              <h3 className="font-serif-apollo text-2xl font-bold text-[#0E526B]">
                Send Us a Message
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Fill out the form below and our hospital administration team will respond within 24 hours.
              </p>
            </div>

            {formSubmitted ? (
              <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h4 className="font-serif-apollo text-xl font-bold text-emerald-900">
                  Message Received Successfully!
                </h4>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  Thank you, <span className="font-bold">{formData.name}</span>. Our patient support desk has logged your inquiry regarding <span className="font-bold">{formData.department}</span> and will get in touch shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-[#0E526B] text-white text-xs font-bold hover:bg-[#1D82A6]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Chandra"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#1D82A6] focus:ring-2 focus:ring-[#1D82A6]/20 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#1D82A6] focus:ring-2 focus:ring-[#1D82A6]/20 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="ramesh@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#1D82A6] focus:ring-2 focus:ring-[#1D82A6]/20 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Department / Inquiry Category</label>
                    <select
                      value={formData.department}
                      onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 font-medium focus:border-[#1D82A6] focus:outline-none"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="OPD Appointment">OPD Doctor Appointment</option>
                      <option value="Insurance TPA Desk">Insurance & Billing TPA</option>
                      <option value="International Patients">International Patient Care</option>
                      <option value="Feedback / Complaint">Patient Feedback / Suggestion</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Brief headline of your query..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#1D82A6] focus:ring-2 focus:ring-[#1D82A6]/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide details about your query or consultation request..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#1D82A6] focus:ring-2 focus:ring-[#1D82A6]/20 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry Message</span>
                </button>
              </form>
            )}
          </div>

          {/* Right 5 Cols: Visiting Hours & Timings Directory */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#1D82A6] uppercase tracking-wider mb-2">
                <Clock className="w-4 h-4 text-[#F59E0B]" />
                <span>Hospital Schedules</span>
              </div>

              <h3 className="font-serif-apollo text-xl font-bold text-[#0E526B] mb-6">
                Visiting Hours & Timings
              </h3>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl bg-[#EBF5F8] border border-[#1D82A6]/20 space-y-1">
                  <div className="font-bold text-[#0E526B] flex items-center justify-between">
                    <span>24/7 Emergency & Ambulance</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500 text-white font-bold">Always Open</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">Level-1 Trauma & Emergency Admission Gate open round the clock.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-800 justify-between flex">
                    <span>OPD Consultation Hours</span>
                    <span className="text-[#0E526B]">09:00 AM – 07:00 PM</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">Monday through Saturday. Specialist registration on prior appointment.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-800 justify-between flex">
                    <span>ICU / ICCU Visiting Hours</span>
                    <span className="text-[#0E526B]">11 AM – 12 PM | 5 PM – 6 PM</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">Strictly 1 visitor per patient pass. Mask compulsory.</p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-800 justify-between flex">
                    <span>In-Patient Ward Visiting</span>
                    <span className="text-[#0E526B]">04:00 PM – 06:00 PM</span>
                  </div>
                  <p className="text-slate-500 text-[11px]">2 visitor passes allowed per bed during evening hours.</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6 text-xs">
              <div className="flex items-center gap-2 text-[#0E526B] font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>NABH & NABL Accredited Healthcare Standards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FREQUENTLY ASKED QUESTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="font-serif-apollo text-2xl font-bold text-[#0E526B]">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Find quick answers regarding hospital navigation, visiting policies, and emergency admissions.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-serif-apollo text-sm font-bold text-[#0E526B] hover:text-[#1D82A6] bg-slate-50 flex items-center justify-between transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#1D82A6] transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="p-5 text-xs text-slate-600 leading-relaxed bg-white border-t border-slate-100 animate-fade-in">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />
    </main>
  );
}