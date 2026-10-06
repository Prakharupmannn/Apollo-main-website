"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  Stethoscope,
  PhoneCall,
  CheckCircle2,
  Sparkles,
  User,
  MapPin,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Award,
  Sun,
  Sunset,
  Moon,
  
} from "lucide-react";

// Import data from external JSON file
import appointmentData from "../../../data/appointmentData";

const goldGradientStyle = {
  background: "linear-gradient(135deg, #F6D98A 0%, #C8952E 100%)",
};

export default function MakeAppointmentPage() {
  // Step 1: Details | Step 2: Slot Booking | Step 3: Confirmation Pass
  const [step, setStep] = useState(1);

  // Form State containing all fields
  const [booking, setBooking] = useState({
    patientName: "",
    ageValue: "",
    ageUnit: "Year",
    gender: "MALE",
    contact: "",
    sameWhatsapp: true,
    whatsappNumber: "",
    scheme: "",
    appointmentDate: "2026-10-07",
    consultant: "DR CHARU PATHAK",
    pinCode: "",
    state: "MADHYA PRADESH",
    district: "",
    tehsil: "",
    village: "",
    wardNumber: "",
    address: "",
    slot: "09:30:00",
  });

  // Filter Searches
  const [docSearch, setDocSearch] = useState("");
  const [schemeSearch, setSchemeSearch] = useState("");

  const filteredDoctors = useMemo(() => {
    if (!docSearch.trim()) return appointmentData.consultants;
    return appointmentData.consultants.filter((d) =>
      d.toLowerCase().includes(docSearch.toLowerCase())
    );
  }, [docSearch]);

  const filteredSchemes = useMemo(() => {
    if (!schemeSearch.trim()) return appointmentData.schemes;
    return appointmentData.schemes.filter((s) =>
      s.toLowerCase().includes(schemeSearch.toLowerCase())
    );
  }, [schemeSearch]);

  const handleNextToSlots = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleFinalSubmit = () => {
    setStep(3);
  };

  return (
    <main className="relative min-h-screen bg-[#F0F6FA] text-slate-900 pt-28 pb-24 selection:bg-[#1D82A6] selection:text-white overflow-hidden">
      {/* Background Glowing Mesh Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#1D82A6]/20 via-[#0A5F7A]/15 to-transparent blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-40 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#F6D98A]/30 via-[#C8952E]/15 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HERO SECTION */}
        <section className="relative mb-12">
          <div className="relative rounded-[2.5rem] p-[2px] bg-gradient-to-r from-[#F6D98A] via-[#1D82A6] to-[#C8952E] shadow-[0_25px_60px_-15px_rgba(10,95,122,0.35)]">
            <div className="relative rounded-[calc(2.5rem-2px)] bg-gradient-to-br from-[#042835] via-[#0A5F7A] to-[#0D2E3A] overflow-hidden text-white p-8 sm:p-14">
              
              {/* Decorative Geometric Overlay */}
              <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                <div className="lg:col-span-8 space-y-5">
                  <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#FEF3C7] text-xs font-semibold">
                    <Sparkles className="w-4 h-4 text-[#F6D98A] animate-spin" style={{ animationDuration: '8s' }} />
                    <span>Apollo Hospitals Jabalpur • Express Digital Booking</span>
                  </div>

                  <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                    Book Your OPD <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F6D98A] via-[#FFFFFF] to-[#E3AF4D]">
                      Doctor Appointment
                    </span>
                  </h1>

                  <p className="text-slate-200/90 text-xs sm:text-base leading-relaxed max-w-2xl font-light">
                    Fast-track your consultation. Complete your patient registration, select your panel scheme, and reserve your preferred consultation window seamlessly.
                  </p>

                  {/* Feature Highlights */}
                  <div className="pt-2 flex flex-wrap gap-4 text-xs font-medium text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#F6D98A]" />
                      <span>Instant Confirmation</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Award className="w-4 h-4 text-[#F6D98A]" />
                      <span>Verified Specialists</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-4">
                  <a
                    href="tel:18001236666"
                    className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md font-bold text-xs transition-all flex items-center justify-center gap-3 shadow-lg hover:scale-[1.02]"
                  >
                    <PhoneCall className="w-4 h-4 text-[#F6D98A]" />
                    <span>Help Desk: 1800-123-6666</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STEPPER PROGRESS BAR */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -z-0 -translate-y-1/2" />
            <div
              className="absolute top-1/2 left-0 h-1 bg-[#1D82A6] -z-0 -translate-y-1/2 transition-all duration-500"
              style={{
                width: step === 1 ? "0%" : step === 2 ? "50%" : "100%",
              }}
            />

            {/* Step 1 Indicator */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  step >= 1
                    ? "bg-[#0A5F7A] text-white ring-4 ring-white shadow-md"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                1
              </div>
              <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                Patient Info
              </span>
            </div>

            {/* Step 2 Indicator */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  step >= 2
                    ? "bg-[#0A5F7A] text-white ring-4 ring-white shadow-md"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                2
              </div>
              <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                Select Slot
              </span>
            </div>

            {/* Step 3 Indicator */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                  step === 3
                    ? "bg-emerald-600 text-white ring-4 ring-white shadow-md"
                    : "bg-slate-200 text-slate-500"
                }`}
              >
                3
              </div>
              <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                Pass Ticket
              </span>
            </div>
          </div>
        </div>

        {/* MAIN CONTAINER */}
        <section className="max-w-6xl mx-auto">
          <div className="relative p-[1.5px] rounded-[2.5rem] bg-gradient-to-b from-white via-[#1D82A6]/30 to-[#C8952E]/40 shadow-2xl">
            <div className="bg-white rounded-[calc(2.5rem-1.5px)] p-6 sm:p-10 lg:p-12">
              <AnimatePresence mode="wait">
                
                {/* STEP 1: DEMOGRAPHICS & DETAILS FORM */}
                {step === 1 && (
                  <motion.form
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleNextToSlots}
                    className="space-y-10"
                  >
                    {/* SECTION 1: PATIENT IDENTITY */}
                    <div>
                      <div className="flex items-center gap-3 pb-3 mb-6 border-b border-slate-100">
                        <div className="p-2.5 rounded-xl bg-[#0A5F7A]/10 text-[#0A5F7A]">
                          <User className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-[#0B3446]">
                            1. Patient Demographics & Contact
                          </h3>
                          <p className="text-xs text-slate-500">
                            Provide complete legal name, age, gender, and mobile details.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {/* Patient Name */}
                        <div>
                          <label className="block text-[11px] font-extrabold text-slate-700 mb-1.5 uppercase tracking-wider">
                            Patient Name <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={booking.patientName}
                            onChange={(e) =>
                              setBooking({ ...booking, patientName: e.target.value })
                            }
                            placeholder="ENTER PATIENT NAME"
                            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold uppercase focus:bg-white focus:border-[#1D82A6] outline-none transition-all"
                          />
                        </div>

                        {/* Age of Patient */}
                        <div>
                          <label className="block text-[11px] font-extrabold text-slate-700 mb-1.5 uppercase tracking-wider">
                            Age of Patient <span className="text-rose-500">*</span>
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="number"
                              required
                              min="0"
                              value={booking.ageValue}
                              onChange={(e) =>
                                setBooking({ ...booking, ageValue: e.target.value })
                              }
                              placeholder="Enter Age"
                              className="w-3/5 px-3 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:bg-white focus:border-[#1D82A6] outline-none"
                            />
                            <select
                              value={booking.ageUnit}
                              onChange={(e) =>
                                setBooking({ ...booking, ageUnit: e.target.value })
                              }
                              className="w-2/5 px-2 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:bg-white outline-none cursor-pointer"
                            >
                              <option value="Year">Year</option>
                              <option value="Month">Month</option>
                              <option value="Days">Days</option>
                              <option value="Hours">Hours</option>
                            </select>
                          </div>
                        </div>

                        {/* Patient Gender */}
                        <div>
                          <label className="block text-[11px] font-extrabold text-slate-700 mb-1.5 uppercase tracking-wider">
                            Patient Gender <span className="text-rose-500">*</span>
                          </label>
                          <select
                            required
                            value={booking.gender}
                            onChange={(e) =>
                              setBooking({ ...booking, gender: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:bg-white focus:border-[#1D82A6] outline-none cursor-pointer"
                          >
                            <option value="MALE">Select Gender (MALE)</option>
                            <option value="FEMALE">FEMALE</option>
                            <option value="TRANSGENDER">TRANSGENDER</option>
                          </select>
                        </div>

                        {/* Contact & WhatsApp Sync */}
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                              Contact <span className="text-rose-500">*</span>
                            </label>
                            <label className="inline-flex items-center gap-1 cursor-pointer text-[10px] text-[#0A5F7A] font-bold">
                              <input
                                type="checkbox"
                                checked={booking.sameWhatsapp}
                                onChange={(e) =>
                                  setBooking({
                                    ...booking,
                                    sameWhatsapp: e.target.checked,
                                    whatsappNumber: e.target.checked
                                      ? booking.contact
                                      : "",
                                  })
                                }
                                className="rounded border-slate-300 text-[#0A5F7A] focus:ring-[#0A5F7A]"
                              />
                              <span>Same whatsapp</span>
                            </label>
                          </div>
                          <input
                            type="tel"
                            required
                            value={booking.contact}
                            onChange={(e) =>
                              setBooking({
                                ...booking,
                                contact: e.target.value,
                                whatsappNumber: booking.sameWhatsapp
                                  ? e.target.value
                                  : booking.whatsappNumber,
                              })
                            }
                            placeholder="Enter Contact Number"
                            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:bg-white focus:border-[#1D82A6] outline-none"
                          />
                        </div>

                        {/* WhatsApp Number Field */}
                        <div>
                          <label className="block text-[11px] font-extrabold text-slate-700 mb-1.5 uppercase tracking-wider">
                            WhatsApp Number
                          </label>
                          <input
                            type="tel"
                            disabled={booking.sameWhatsapp}
                            value={
                              booking.sameWhatsapp
                                ? booking.contact
                                : booking.whatsappNumber
                            }
                            onChange={(e) =>
                              setBooking({
                                ...booking,
                                whatsappNumber: e.target.value,
                              })
                            }
                            placeholder="Enter WhatsApp Number"
                            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:bg-white focus:border-[#1D82A6] outline-none disabled:opacity-60"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: LOCATION & ADDRESS */}
                    <div>
                      <div className="flex items-center gap-3 pb-3 mb-6 border-b border-slate-100">
                        <div className="p-2.5 rounded-xl bg-[#0A5F7A]/10 text-[#0A5F7A]">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-[#0B3446]">
                            2. Residential Location & Address
                          </h3>
                          <p className="text-xs text-slate-500">
                            Provide locality, PIN code, district, and address details.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {/* PIN Code */}
                        <div>
                          <label className="block text-[11px] font-extrabold text-slate-700 mb-1.5 uppercase tracking-wider">
                            PIN Code
                          </label>
                          <input
                            type="text"
                            value={booking.pinCode}
                            onChange={(e) =>
                              setBooking({ ...booking, pinCode: e.target.value })
                            }
                            placeholder="ENTER PIN CODE"
                            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold uppercase focus:bg-white focus:border-[#1D82A6] outline-none"
                          />
                        </div>

                        {/* State */}
                        <div>
                          <label className="block text-[11px] font-extrabold text-slate-700 mb-1.5 uppercase tracking-wider">
                            State <span className="text-rose-500">*</span>
                          </label>
                          <select
                            required
                            value={booking.state}
                            onChange={(e) =>
                              setBooking({ ...booking, state: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:bg-white focus:border-[#1D82A6] outline-none cursor-pointer"
                          >
                            <option value="MADHYA PRADESH">MADHYA PRADESH</option>
                            <option value="MAHARASHTRA">MAHARASHTRA</option>
                            <option value="CHHATTISGARH">CHHATTISGARH</option>
                            <option value="UTTAR PRADESH">UTTAR PRADESH</option>
                          </select>
                        </div>

                        {/* District */}
                        <div>
                          <label className="block text-[11px] font-extrabold text-slate-700 mb-1.5 uppercase tracking-wider">
                            District <span className="text-rose-500">*</span>
                          </label>
                          <select
                            required
                            value={booking.district}
                            onChange={(e) =>
                              setBooking({ ...booking, district: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:bg-white focus:border-[#1D82A6] outline-none cursor-pointer"
                          >
                            <option value="">Select District</option>
                            {appointmentData.districts.map((d) => (
                              <option key={d} value={d}>
                                {d}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Tehsil */}
                        <div>
                          <label className="block text-[11px] font-extrabold text-slate-700 mb-1.5 uppercase tracking-wider">
                            Tehsil
                          </label>
                          <select
                            value={booking.tehsil}
                            onChange={(e) =>
                              setBooking({ ...booking, tehsil: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:bg-white focus:border-[#1D82A6] outline-none cursor-pointer"
                          >
                            <option value="">Select Tahsil Name</option>
                            {appointmentData.tehsils.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Village */}
                        <div>
                          <label className="block text-[11px] font-extrabold text-slate-700 mb-1.5 uppercase tracking-wider">
                            Village
                          </label>
                          <select
                            value={booking.village}
                            onChange={(e) =>
                              setBooking({ ...booking, village: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:bg-white focus:border-[#1D82A6] outline-none cursor-pointer"
                          >
                            <option value="">Select Village Name</option>
                            {appointmentData.villages.map((v) => (
                              <option key={v} value={v}>
                                {v}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Ward Number */}
                        <div>
                          <label className="block text-[11px] font-extrabold text-slate-700 mb-1.5 uppercase tracking-wider">
                            Ward Number
                          </label>
                          <input
                            type="text"
                            value={booking.wardNumber}
                            onChange={(e) =>
                              setBooking({ ...booking, wardNumber: e.target.value })
                            }
                            placeholder="Enter Ward Number"
                            className="w-full px-4 py-3 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs font-semibold focus:bg-white focus:border-[#1D82A6] outline-none"
                          />
                        </div>

                        {/* Full Address */}
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-extrabold text-slate-700 mb-1.5 uppercase tracking-wider">
                            Address <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={booking.address}
                            onChange={(e) =>
                              setBooking({ ...booking, address: e.target.value })
                            }
                            placeholder="Enter Address"
                            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:bg-white focus:border-[#1D82A6] outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: SCHEME, DATE & CONSULTANT */}
                    <div>
                      <div className="flex items-center gap-3 pb-3 mb-6 border-b border-slate-100">
                        <div className="p-2.5 rounded-xl bg-[#0A5F7A]/10 text-[#0A5F7A]">
                          <Stethoscope className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-[#0B3446]">
                            3. Scheme Panel & Doctor Consultation
                          </h3>
                          <p className="text-xs text-slate-500">
                            Select applicable panel scheme and doctor specialty.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        {/* Scheme Name */}
                        <div>
                          <label className="block text-[11px] font-extrabold text-slate-700 mb-1.5 uppercase tracking-wider">
                            Scheme Name <span className="text-rose-500">*</span>
                          </label>
                          <div className="space-y-1.5">
                            <input
                              type="text"
                              placeholder="Filter scheme..."
                              value={schemeSearch}
                              onChange={(e) => setSchemeSearch(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[11px] outline-none"
                            />
                            <select
                              required
                              value={booking.scheme}
                              onChange={(e) =>
                                setBooking({ ...booking, scheme: e.target.value })
                              }
                              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:bg-white focus:border-[#1D82A6] outline-none cursor-pointer"
                            >
                              <option value="">Select Scheme Name</option>
                              {filteredSchemes.map((sch) => (
                                <option key={sch} value={sch}>
                                  {sch}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Appointment Date */}
                        <div>
                          <label className="block text-[11px] font-extrabold text-slate-700 mb-1.5 uppercase tracking-wider">
                            Appointment Date <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="date"
                            required
                            value={booking.appointmentDate}
                            onChange={(e) =>
                              setBooking({
                                ...booking,
                                appointmentDate: e.target.value,
                              })
                            }
                            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:bg-white focus:border-[#1D82A6] outline-none"
                          />
                        </div>

                        {/* Consultant Dropdown */}
                        <div>
                          <label className="block text-[11px] font-extrabold text-slate-700 mb-1.5 uppercase tracking-wider">
                            Consultant <span className="text-rose-500">*</span>
                          </label>
                          <div className="space-y-1.5">
                            <input
                              type="text"
                              placeholder="Filter doctor..."
                              value={docSearch}
                              onChange={(e) => setDocSearch(e.target.value)}
                              className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-[11px] outline-none"
                            />
                            <select
                              required
                              value={booking.consultant}
                              onChange={(e) =>
                                setBooking({
                                  ...booking,
                                  consultant: e.target.value,
                                })
                              }
                              className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 focus:bg-white focus:border-[#1D82A6] outline-none cursor-pointer"
                            >
                              {filteredDoctors.map((doc) => (
                                <option key={doc} value={doc}>
                                  {doc}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ACTION BUTTON */}
                    <div className="pt-6 border-t border-slate-100 flex justify-end">
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-10 py-4 rounded-2xl text-xs font-black text-[#3A2B0A] shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-3 transform hover:-translate-y-0.5"
                        style={goldGradientStyle}
                      >
                        <span>Proceed to Slot Booking</span>
                        <ArrowRight className="w-4 h-4 text-[#3A2B0A]" />
                      </button>
                    </div>
                  </motion.form>
                )}

                {/* STEP 2: DEDICATED ATTRACTIVE SLOT BOOKING SECTION */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    {/* Header Summary Bar */}
                    <div className="p-6 rounded-3xl bg-gradient-to-r from-[#06384A] to-[#0A5F7A] text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-lg">
                      <div className="space-y-1">
                        <div className="text-[11px] font-bold text-[#F6D98A] uppercase tracking-wider">
                          Booking Details
                        </div>
                        <h3 className="text-lg font-black">{booking.patientName || "Patient"}</h3>
                        <p className="text-xs text-slate-200">
                          {booking.consultant} • {booking.appointmentDate}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold flex items-center gap-2 transition-all"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>Edit Patient Info</span>
                      </button>
                    </div>

                    {/* Slot Picker Title */}
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-[#0A5F7A]/10 text-[#0A5F7A]">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-black text-[#0B3446]">
                            Select Preferred Time Slot
                          </h3>
                          <p className="text-xs text-slate-500">
                            Choose an available time window for your visit.
                          </p>
                        </div>
                      </div>

                      <div className="text-xs font-bold text-[#0A5F7A]">
                        Selected Slot:{" "}
                        <span className="text-rose-600 font-extrabold">
                          {booking.slot}
                        </span>
                      </div>
                    </div>

                    {/* TIME SLOTS GRID CATEGORIZED */}
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                        {appointmentData.timeSlots.map((s) => {
                          const isSel = booking.slot === s.time;
                          const isVisitors = s.note === "Visitors Only";
                          return (
                            <button
                              key={s.time}
                              type="button"
                              onClick={() => setBooking({ ...booking, slot: s.time })}
                              className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-between gap-3 ${
                                isSel
                                  ? "bg-[#0A5F7A] border-[#0A5F7A] text-white shadow-xl scale-105 ring-2 ring-[#F6D98A]"
                                  : isVisitors
                                  ? "bg-amber-100/70 border-amber-300 text-amber-900 hover:bg-amber-200"
                                  : "bg-emerald-50/60 border-emerald-200 text-slate-800 hover:bg-emerald-100/70"
                              }`}
                            >
                              <div
                                className={`p-2 rounded-xl ${
                                  isSel ? "bg-white/20" : "bg-white/60"
                                }`}
                              >
                                <Clock className="w-5 h-5" />
                              </div>
                              <div>
                                <div className="text-[10px] font-bold opacity-80">
                                  {booking.appointmentDate}
                                </div>
                                <div className="text-sm font-black tracking-tight mt-0.5">
                                  {s.time}
                                </div>
                                {s.note && (
                                  <div className="text-[9px] font-black mt-1.5 px-2 py-0.5 rounded bg-rose-600 text-white inline-block">
                                    {s.note}
                                  </div>
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* SLOTS FOOTER & SUBMIT */}
                    <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleFinalSubmit}
                        className="w-full sm:w-auto px-10 py-4 rounded-2xl text-xs font-black text-[#3A2B0A] shadow-xl hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2 transform hover:-translate-y-0.5"
                        style={goldGradientStyle}
                      >
                        <span>Confirm & Generate Registration Pass</span>
                        <ChevronRight className="w-4 h-4 text-[#3A2B0A]" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: CONFIRMATION PASS */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="p-4 text-center space-y-6"
                  >
                    <div className="w-20 h-20 rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xl">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-black text-emerald-950">
                        Registration Confirmed!
                      </h3>
                      <p className="text-xs text-slate-600 max-w-sm mx-auto mt-1">
                        Your appointment has been logged for{" "}
                        <span className="font-bold text-[#0B3446]">
                          {booking.patientName}
                        </span>
                        .
                      </p>
                    </div>

                    {/* PASS TICKET CARD */}
                    <div className="relative p-6 rounded-3xl bg-gradient-to-br from-[#06384A] to-[#0A5F7A] text-white max-w-lg mx-auto text-left text-xs space-y-4 shadow-2xl overflow-hidden border border-white/20">
                      <div className="flex justify-between items-center pb-3 border-b border-white/15">
                        <span className="font-extrabold text-[#F6D98A] tracking-wider uppercase text-[10px]">
                          Pass ID: APO-JBP-9921
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold">
                          CONFIRMED
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-1 text-[11px]">
                        <div>
                          <span className="text-slate-300 block text-[9px] uppercase">
                            Patient Name:
                          </span>{" "}
                          <span className="font-bold">{booking.patientName}</span>
                        </div>
                        <div>
                          <span className="text-slate-300 block text-[9px] uppercase">
                            Age / Gender:
                          </span>{" "}
                          <span className="font-bold">
                            {booking.ageValue} {booking.ageUnit} • {booking.gender}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-300 block text-[9px] uppercase">
                            Consultant:
                          </span>{" "}
                          <span className="font-bold text-[#F6D98A]">
                            {booking.consultant}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-300 block text-[9px] uppercase">
                            Selected Slot:
                          </span>{" "}
                          <span className="font-bold">
                            {booking.appointmentDate} ({booking.slot})
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-300 block text-[9px] uppercase">
                            Scheme:
                          </span>{" "}
                          <span className="font-bold">{booking.scheme || "N/A"}</span>
                        </div>
                        <div>
                          <span className="text-slate-300 block text-[9px] uppercase">
                            Contact:
                          </span>{" "}
                          <span className="font-bold">{booking.contact}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="px-8 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
                      >
                        Book Another Appointment
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}