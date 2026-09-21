"use client";

import { useState } from "react";
import {
  PhoneCall,
  Ambulance,
  Activity,
  HeartPulse,
  Flame,
  Zap,
  Clock,
  ShieldAlert,
  AlertTriangle,
  UserCheck,
  CheckCircle,
  MapPin,
  Stethoscope,
  Building,
  HelpCircle,
  ChevronRight,
  ShieldCheck,
  FileText,
  Share2,
} from "lucide-react";
import AppointmentModal from "../../components/components/AppointmentModal";

export default function EmergencyPage() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [ambulanceStep, setAmbulanceStep] = useState("form"); // 'form' | 'dispatched'
  const [pickupData, setPickupData] = useState({
    location: "",
    emergencyType: "Chest Pain / Heart Attack",
    contactPhone: "",
    patientCondition: "",
  });

  const [activeTab, setActiveTab] = useState("protocols"); // 'protocols' | 'units' | 'hotlines'

  const emergencyUnits = [
    {
      title: "Level-1 Comprehensive Trauma Unit",
      icon: ShieldAlert,
      color: "bg-rose-50 text-rose-700 border-rose-200",
      desc: "Immediate surgical intervention for multi-trauma, head injuries, highway accidents, and complex fractures.",
      stats: "Zero Wait Time • 24/7 Trauma Surgeons On Standby",
    },
    {
      title: "Cardiac Emergency & STEMI Network",
      icon: HeartPulse,
      color: "bg-[#EBF5F8] text-[#0E526B] border-[#1D82A6]/30",
      desc: "Door-to-Balloon time under 60 minutes for acute myocardial infarction with 24/7 standby Cath Lab team.",
      stats: "Primary Angioplasty Ready • Dedicated CCU",
    },
    {
      title: "Stroke Unit & Thrombolysis Care",
      icon: Zap,
      color: "bg-amber-50 text-amber-800 border-amber-200",
      desc: "Rapid non-contrast CT brain scan and intravenous clot-busting thrombolytic therapy within golden hour.",
      stats: "F.A.S.T Protocol • Neuro-ICU Beds",
    },
    {
      title: "Pediatric & Neonatal ER",
      icon: Activity,
      color: "bg-emerald-50 text-emerald-800 border-emerald-200",
      desc: "Specialized pediatric emergency doctors, warmers, and ventilator support for infants and children.",
      stats: "PICU / NICU Transport Ambulances",
    },
    {
      title: "Poisoning, Snake Bite & Burn Unit",
      icon: Flame,
      color: "bg-purple-50 text-purple-800 border-purple-200",
      desc: "Antivenom availability, gastric lavage facilities, and sterile burn care isolators with intensive monitoring.",
      stats: "24/7 Toxicology Specialists",
    },
    {
      title: "24/7 Emergency Blood Bank & Diagnostics",
      icon: Stethoscope,
      color: "bg-cyan-50 text-cyan-800 border-cyan-200",
      desc: "Instant cross-matching for PRBC, Platelets, and FFP, coupled with emergency CT, MRI, and ABG lab.",
      stats: "NABH Accredited Transfusion Center",
    },
  ];

  const firstAidProtocols = [
    {
      condition: "Heart Attack Symptoms",
      steps: [
        "Call Emergency 1066 immediately for cardiac ambulance.",
        "Keep the patient seated in a semi-upright relaxed position.",
        "Loosen tight clothing around neck and waist.",
        "Do not leave the patient unattended; perform CPR if unconscious.",
      ],
      alert: "Never attempt patient self-driving if severe chest squeezing is present.",
    },
    {
      condition: "Acute Stroke (F.A.S.T.)",
      steps: [
        "F (Face): Check if one side of face droops when smiling.",
        "A (Arms): Ask to raise both arms; check if one arm drifts down.",
        "S (Speech): Listen for slurred or unintelligible words.",
        "T (Time): Note exact time symptoms began and call 1066.",
      ],
      alert: "Do NOT administer food, water, or blood pressure pills during acute stroke.",
    },
    {
      condition: "Severe Trauma & Bleeding",
      steps: [
        "Apply firm, direct pressure on the bleeding wound with clean cloth.",
        "Elevate the injured limb above heart level if no fracture is suspected.",
        "Keep patient warm with blanket to prevent medical shock.",
        "Immobilize head and neck if spine injury is suspected in road accidents.",
      ],
      alert: "Avoid removing embedded objects; apply padding around the wound.",
    },
    {
      condition: "Snake Bite & Poisoning",
      steps: [
        "Immobilize the bitten limb at or slightly below heart level.",
        "Remove rings, tight bracelets, or shoes before swelling begins.",
        "Take a photo of the snake/poison container from safe distance if possible.",
        "Transfer immediately to Apollo Jabalpur for anti-snake venom (ASV).",
      ],
      alert: "Do NOT cut the bite area, apply ice, or use mouth suction.",
    },
  ];

  const emergencyContacts = [
    { label: "National Emergency Helpline", number: "1066", desc: "Toll-Free 24/7 Direct Ambulance Hotline" },
    { label: "Apollo Jabalpur ER Reception", number: "+91 761 4000100", desc: "Emergency Triage & Patient Arrival Desk" },
    { label: "Trauma & ICU Direct Counter", number: "+91 761 4000105", desc: "Critical Bed Availability & Transfer" },
    { label: "24/7 Blood Bank Direct Desk", number: "+91 761 4000115", desc: "Emergency PRBC & Platelet Dispatch" },
  ];

  const handleDispatchSubmit = (e) => {
    e.preventDefault();
    setAmbulanceStep("dispatched");
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-48 pb-20 selection:bg-rose-500 selection:text-white">
      {/* High-Impact Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#0E526B] p-8 sm:p-12 md:p-16 text-white shadow-2xl border-2 border-rose-400/40">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-rose-500/20 blur-3xl pointer-events-none animate-pulse" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#1D82A6]/30 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-rose-950/80 border border-rose-400/60 text-rose-200 text-xs font-bold mb-6 shadow-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
              <span>24/7 EMERGENCY & LEVEL-1 TRAUMA ACTIVE</span>
            </div>

            <h1 className="font-serif-apollo text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-4">
              Apollo Emergency & Critical Care Services
            </h1>

            <p className="text-rose-100 text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
              Equipped with cardiac ACLS ambulances, Level-1 trauma surgeons, 24/7 STEMI Cath Lab, and express triage care at Apollo Hospitals Jabalpur.
            </p>

            {/* Emergency Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="tel:1066"
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-rose-500 text-white font-bold text-sm sm:text-base hover:bg-rose-600 transition-all shadow-[0_0_25px_rgba(244,63,94,0.6)] border border-rose-200 cursor-pointer"
              >
                <PhoneCall className="w-5 h-5 animate-bounce" />
                <span>Call Emergency Hotline: 1066</span>
              </a>

              <a
                href="tel:+917614000100"
                className="flex items-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all border border-white/20 backdrop-blur-md"
              >
                <Ambulance className="w-4 h-4 text-amber-300" />
                <span>Hospital Desk: +91 761 4000100</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: RAPID AMBULANCE DISPATCH WIDGET */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-rose-500/30 relative overflow-hidden">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
              <Ambulance className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="font-serif-apollo text-2xl font-bold text-[#0E526B]">
                Express Ambulance Request (Jabalpur & MP Region)
              </h2>
              <p className="text-xs text-slate-500">
                Submit pickup coordinates for immediate cardiac ACLS ambulance dispatch.
              </p>
            </div>
          </div>

          {ambulanceStep === "form" ? (
            <form onSubmit={handleDispatchSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Pickup Location / Address *
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-rose-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={pickupData.location}
                      onChange={(e) => setPickupData({ ...pickupData, location: e.target.value })}
                      placeholder="e.g. Civil Lines, Vijay Nagar, or MP Highway Landmark..."
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Patient Contact Phone Number *
                  </label>
                  <div className="relative">
                    <PhoneCall className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={pickupData.contactPhone}
                      onChange={(e) => setPickupData({ ...pickupData, contactPhone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Nature of Emergency *
                  </label>
                  <select
                    value={pickupData.emergencyType}
                    onChange={(e) => setPickupData({ ...pickupData, emergencyType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-slate-50 font-semibold focus:outline-none"
                  >
                    <option value="Chest Pain / Heart Attack">Chest Pain / Heart Attack</option>
                    <option value="Road Accident / Major Trauma">Road Accident / Major Trauma</option>
                    <option value="Stroke Symptoms (F.A.S.T.)">Stroke Symptoms (F.A.S.T.)</option>
                    <option value="Severe Breathing Difficulty">Severe Breathing Difficulty</option>
                    <option value="Poisoning / Snake Bite">Poisoning / Snake Bite</option>
                    <option value="High Fever / Unresponsive">High Fever / Unresponsive</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Patient Condition Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={pickupData.patientCondition}
                    onChange={(e) => setPickupData({ ...pickupData, patientCondition: e.target.value })}
                    placeholder="Brief description (e.g. conscious, severe pain)..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>GPS Tracking & Doctor-on-Board Ambulance Response</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Ambulance className="w-4 h-4" />
                  <span>Request Emergency Ambulance Now</span>
                </button>
              </div>
            </form>
          ) : (
            /* Dispatched Confirmation Screen */
            <div className="p-8 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-600 text-white flex items-center justify-center mx-auto shadow-xl animate-bounce">
                <Ambulance className="w-8 h-8" />
              </div>

              <h3 className="font-serif-apollo text-2xl font-bold text-rose-900">
                Ambulance Dispatch Signal Initiated!
              </h3>

              <p className="text-xs text-rose-700 max-w-md mx-auto leading-relaxed">
                Apollo Emergency Desk has received request for <span className="font-bold">{pickupData.location}</span>. Our paramedic control driver is calling <span className="font-bold">{pickupData.contactPhone}</span> immediately.
              </p>

              <div className="bg-white p-4 rounded-2xl border border-rose-300 max-w-md mx-auto text-left text-xs space-y-1 font-mono">
                <div><span className="font-bold text-slate-700">Dispatch Ref:</span> <span className="text-rose-600 font-bold">EMG-1066-JBP</span></div>
                <div><span className="font-bold text-slate-700">Emergency Priority:</span> {pickupData.emergencyType}</div>
                <div><span className="font-bold text-slate-700">Estimated Arrival:</span> 8-12 Mins (Traffic Dependent)</div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <a
                  href="tel:1066"
                  className="px-6 py-2.5 rounded-full bg-rose-600 text-white font-bold text-xs hover:bg-rose-700"
                >
                  Call Driver Direct (1066)
                </a>
                <button
                  onClick={() => setAmbulanceStep("form")}
                  className="px-5 py-2.5 rounded-full bg-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-300"
                >
                  Modify Request
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: 24/7 EMERGENCY SPECIALTY UNITS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-serif-apollo text-2xl sm:text-3xl font-bold text-[#0E526B]">
            24/7 Emergency & Critical Care Units
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2">
            Multi-specialty emergency infrastructure designed for instant resuscitation, trauma surgery, and cardiac catheterization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {emergencyUnits.map((unit, idx) => {
            const Icon = unit.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl border shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between ${unit.color}`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif-apollo text-lg font-bold mb-2">
                    {unit.title}
                  </h3>

                  <p className="text-xs leading-relaxed opacity-90 mb-4">
                    {unit.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-current/15 text-[11px] font-bold tracking-wide">
                  {unit.stats}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: STEP-BY-STEP FIRST AID PROTOCOLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Life Saving First Response</span>
              </div>
              <h2 className="font-serif-apollo text-2xl font-bold text-[#0E526B]">
                First Aid Emergency Action Protocols
              </h2>
            </div>

            <div className="text-xs text-slate-500">
              Approved by Apollo Resuscitation Council
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {firstAidProtocols.map((proto, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <h3 className="font-serif-apollo text-lg font-bold text-[#0E526B] flex items-center justify-between">
                  <span>{proto.condition}</span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-[#EBF5F8] text-[#0E526B]">
                    Protocol #{idx + 1}
                  </span>
                </h3>

                <ul className="space-y-2 text-xs text-slate-700">
                  {proto.steps.map((st, sIdx) => (
                    <li key={sIdx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{st}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{proto.alert}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: DIRECT EMERGENCY HOTLINES & DIRECTORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#093749] to-[#0E526B] p-8 sm:p-12 text-white shadow-2xl border border-[#F59E0B]/30">
          <div className="text-center max-w-xl mx-auto mb-8">
            <h3 className="font-serif-apollo text-2xl font-bold text-[#FEF3C7]">
              Emergency Desk Phone Directory
            </h3>
            <p className="text-xs text-slate-200 mt-1">
              Direct access lines for immediate casualty, ICU bed confirmation, and blood bank inquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyContacts.map((c, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center space-y-2"
              >
                <div className="text-xs font-bold text-amber-300">{c.label}</div>
                <a
                  href={`tel:${c.number.replace(/\s+/g, "")}`}
                  className="block font-mono text-lg font-bold text-white hover:text-[#F59E0B] transition-colors"
                >
                  {c.number}
                </a>
                <p className="text-[10.5px] text-slate-300 leading-tight">{c.desc}</p>
              </div>
            ))}
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