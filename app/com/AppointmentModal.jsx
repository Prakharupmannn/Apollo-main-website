"use client";

import { useState } from "react";
import { X, Calendar, Clock, User, Phone, Mail, Stethoscope, CheckCircle, ShieldCheck } from "lucide-react";

export default function AppointmentModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    specialty: "Cardiology",
    doctor: "Dr. Vivek Gupta",
    date: new Date().toISOString().split("T")[0],
    time: "10:00 AM",
    patientName: "",
    phone: "",
    email: "",
    notes: "",
  });

  const doctorsList = [
    { name: "Dr. Sangita Reddy", spec: "Hospital Administration" },
    { name: "Dr. Prathap C. Reddy", spec: "Cardiology" },
    { name: "Dr. Vivek Gupta", spec: "Cardiology" },
    { name: "Dr. Anuj Kumar", spec: "Oncology" },
    { name: "Dr. Meang Jain", spec: "Neurology" },
  ];

  const timeSlots = ["09:30 AM", "10:30 AM", "11:30 AM", "02:00 PM", "04:00 PM", "06:00 PM"];

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(2); // Confirmation screen
  };

  const handleReset = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border-2 border-[#1D82A6] relative overflow-hidden">
        
        {/* Header Ribbon */}
        <div className="bg-[#0E526B] -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 p-6 text-white mb-6 border-b border-[#1D82A6]/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-gradient text-slate-950 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h3 className="font-serif-apollo text-xl font-bold text-[#FEF3C7]">
                Book Appointment
              </h3>
              <p className="text-xs text-slate-200">Apollo Hospitals • Fast Track Registration</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Specialty & Doctor Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Specialty
                </label>
                <select
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:border-[#1D82A6] focus:ring-2 focus:ring-[#1D82A6]/20 focus:outline-none bg-[#EBF5F8]"
                >
                  <option value="Cardiology">Cardiology</option>
                  <option value="Oncology">Oncology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopaedics">Orthopaedics</option>
                  <option value="Gastroenterology">Gastroenterology</option>
                  <option value="Urology">Urology</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Select Doctor
                </label>
                <select
                  value={formData.doctor}
                  onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:border-[#1D82A6] focus:ring-2 focus:ring-[#1D82A6]/20 focus:outline-none bg-[#EBF5F8]"
                >
                  {doctorsList.map((d) => (
                    <option key={d.name} value={d.name}>
                      {d.name} ({d.spec})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:border-[#1D82A6] focus:ring-2 focus:ring-[#1D82A6]/20 focus:outline-none bg-[#EBF5F8]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Time Slot
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:border-[#1D82A6] focus:ring-2 focus:ring-[#1D82A6]/20 focus:outline-none bg-[#EBF5F8]"
                >
                  {timeSlots.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Patient Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Rajesh Kumar"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:border-[#1D82A6] focus:ring-2 focus:ring-[#1D82A6]/20 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:border-[#1D82A6] focus:ring-2 focus:ring-[#1D82A6]/20 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Medical Notes / Symptoms (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="Brief description of consultation request..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#1D82A6] focus:ring-2 focus:ring-[#1D82A6]/20 focus:outline-none"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>HIPAA & NABH Data Secured</span>
              </div>

              <button
                type="submit"
                className="px-7 py-3 rounded-full text-xs font-bold bg-gold-gradient text-slate-950 hover:brightness-110 shadow-lg cursor-pointer"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation Success Screen */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-lg animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h4 className="font-serif-apollo text-2xl font-bold text-[#0E526B]">
              Appointment Booked Successfully!
            </h4>

            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              Thank you, <span className="font-bold text-[#0E526B]">{formData.patientName}</span>. Your consultation with <span className="font-bold text-[#F59E0B]">{formData.doctor}</span> is confirmed for <span className="font-bold">{formData.date}</span> at <span className="font-bold">{formData.time}</span>.
            </p>

            <div className="bg-[#EBF5F8] p-4 rounded-2xl border border-[#1D82A6]/30 max-w-md mx-auto text-left text-xs space-y-1">
              <div><span className="font-bold text-slate-700">Booking Ref:</span> <span className="font-mono text-[#0E526B]">APO-98421-JBP</span></div>
              <div><span className="font-bold text-slate-700">Specialty:</span> {formData.specialty}</div>
              <div><span className="font-bold text-slate-700">Confirmation SMS:</span> Sent to {formData.phone}</div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-full text-xs font-bold bg-[#0E526B] text-[#FEF3C7] hover:bg-[#1D82A6]"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
