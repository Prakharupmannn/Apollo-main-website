"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  FileText,
  UserCheck,
  Share2,
  Clock,
  Mail,
  ChevronRight,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Building2,
  ExternalLink,
  FlaskConical,
  Scale,
  Lock,
  MessageSquare,
} from "lucide-react";

export default function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState("section-1");

  const sections = [
    { id: "section-1", title: "1. Authorization & Scope", icon: FileText },
    { id: "section-2", title: "2. Information Disclosure & Transfer", icon: Share2 },
    { id: "section-[#3]", title: "3. Retention of Personal Information", icon: Clock },
    { id: "section-4", title: "4. Patient Rights & Consent", icon: UserCheck },
    { id: "section-5", title: "5. Diagnostic Samples & Research", icon: FlaskConical },
    { id: "section-6", title: "6. Communications & Final Consent", icon: MessageSquare },
  ];

  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 selection:bg-[#F59E0B]/30 selection:text-[#0E526B]">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-tr from-[#0A5F7A] via-[#1b708f] to-[#0E526B] text-white pt-39 pb-24 border-b border-[#F59E0B]/30">
        {/* Ambient Glows & Overlay Pattern */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#F59E0B]/15 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#0E526B]/50 rounded-full blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: "radial-gradient(#F59E0B 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#FEF3C7] text-xs font-semibold backdrop-blur-md border border-white/20 shadow-sm">
              <Scale className="w-4 h-4 text-[#F59E0B]" />
              <span>Legal Terms, Treatment Authorization & Consent</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Terms & <span className="text-[#F59E0B]">Conditions</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed max-w-2xl">
              Authorization for Investigations, Procedure, Treatment, Data Processing, and Payments at Apollo JBP Hospitals.
            </p>

            {/* Metadata Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-200">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                <Building2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Apollo JBP Hospitals (“AJH”), Jabalpur</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                <ShieldAlert className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Patient Care Agreement</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Sticky Sidebar Navigation */}
          <aside className="lg:col-span-4 xl:col-span-3">
            <div className="sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-2">
                  Table of Contents
                </h3>
                <nav className="space-y-1">
                  {sections.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full flex items-center justify-between text-left text-xs font-semibold px-3 py-2.5 rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-[#0E526B] text-white shadow-md"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Icon
                            className={`w-4 h-4 shrink-0 ${
                              isActive ? "text-[#F59E0B]" : "text-slate-400"
                            }`}
                          />
                          <span className="truncate">{item.title}</span>
                        </div>
                        <ChevronRight
                          className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                            isActive ? "rotate-90 text-[#F59E0B]" : "text-slate-300"
                          }`}
                        />
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Quick Legal Support Card */}
              <div className="bg-gradient-to-br from-[#0E526B] to-[#1D82A6] text-white rounded-2xl p-5 shadow-lg border border-[#F59E0B]/30 space-y-3">
                <div className="p-2 w-fit rounded-lg bg-white/10 text-[#F59E0B]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white">Questions About Terms?</h4>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Reach out to our legal and patient assistance team for any clarifications.
                </p>
                <a
                  href="mailto:connect@apollojbphospitals.com"
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-[#edcd76] to-[#C8952E] px-4 py-2.5 rounded-xl shadow hover:brightness-110 transition-all w-full justify-center"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Contact Patient Services</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Terms Detail Sections */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-8">
            {/* Preamble / Introduction Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0E526B]" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900 uppercase tracking-wide mb-2">
                AUTHORIZATION FOR INVESTIGATIONS, PROCEDURE, TREATMENT AND PAYMENTS
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                I/We hereby authorize Apollo JBP Hospitals (<strong>“AJH”</strong>) to collect and process information from me that may include but not be restricted to my demographics, contact information, health records, insurance coverage, financial information, and any other relevant information that I may have shared with AJH prior to the date of this consent form for availing any services.
              </p>
            </div>

            {/* Section 1 */}
            <section
              id="section-1"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 scroll-mt-24"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2.5 rounded-xl bg-[#0E526B]/10 text-[#0E526B]">
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  1. Information Processing & Usage Scope
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                I understand that AJH may use the information mentioned above to provide me with services, or use it for other authorized purposes, including:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                {[
                  "Registration to receive services and maintaining unified health profiles/records.",
                  "Identification, communication, service announcements, and taking customer feedback.",
                  "Helpdesk, complaint resolution, and other customer care activities.",
                  "Creation and maintenance of electronic health records across Apollo group entities.",
                  "Receiving personalized announcements, offers, and medical product suggestions.",
                  "Research for improving diagnostic and medical treatment protocols.",
                  "Mandatory legal disclosures to government and law enforcement authorities.",
                  "Investigating and resolving disputes, grievances, or legal proceedings.",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#0E526B] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 2 */}
            <section
              id="section-2"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 scroll-mt-24"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2.5 rounded-xl bg-[#0E526B]/10 text-[#0E526B]">
                  <Share2 className="w-5 h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  2. Disclosure and Transfer of Personal Information
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                For the above-mentioned purposes, and to the extent permitted by applicable law, AJH may share, disclose, and in some cases transfer all or any information referred to above to entities required to deliver care.
              </p>

              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Authorized Transfer Entities & Global Scope:
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  These entities include Apollo group companies, affiliates, AJH doctors, hospitals, diagnostic centers, chemists, third-party service providers, and law enforcement agencies.
                </p>
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200/60 text-amber-900 text-xs font-medium space-y-1">
                  <div className="flex items-center gap-2 font-bold text-amber-950">
                    <Lock className="w-3.5 h-3.5 text-[#F59E0B]" />
                    <span>Cross-Border & Business Transfers</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-amber-800">
                    I consent to AJH transferring my personal information to entities that may be located outside India. In the event of a merger, reorganization, acquisition, joint venture, spin-off, asset sale, or bankruptcy, AJH may transfer personal information to relevant third parties with equal access rights.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section
              id="section-3"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 scroll-mt-24"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2.5 rounded-xl bg-[#0E526B]/10 text-[#0E526B]">
                  <Clock className="w-5 h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  3. Retention of Personal Information
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                AJH will keep any information collected for as long as necessary to provide services or as required under applicable law.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Information may also be retained to prevent fraud or abuse, or stored in a <strong>de-identified form</strong> for legitimate medical and analytical purposes.
              </p>
            </section>

            {/* Section 4 */}
            <section
              id="section-4"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 scroll-mt-24"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2.5 rounded-xl bg-[#0E526B]/10 text-[#0E526B]">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  4. Your Rights & Options
                </h2>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-700">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B] mt-2 shrink-0" />
                  <span>
                    You have the right to access, update, correct, and request deletion of personal information (excluding de-identified data or legally required records).
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B] mt-2 shrink-0" />
                  <span>
                    You are free to withhold confidential health or financial data and may withdraw consent for previously provided data.
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#F59E0B] mt-2 shrink-0" />
                  <span>
                    Exercising these rights may cause AJH to limit or deny services for which the withheld information is necessary.
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-500 pt-2">
                For questions or exercising your rights, contact us at{" "}
                <a
                  href="mailto:connect@apollojbphospitals.com"
                  className="text-[#0E526B] font-bold underline hover:text-[#F59E0B]"
                >
                  connect@apollojbphospitals.com
                </a>.
              </p>
            </section>

            {/* Section 5 */}
            <section
              id="section-5"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 scroll-mt-24"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2.5 rounded-xl bg-[#0E526B]/10 text-[#0E526B]">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  5. Diagnostic Samples & Scientific Research
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Leftover diagnostic samples (blood/tissue) and de-identified treatment data may be used by research scientists affiliated with Apollo for advancing medical science and preventive/therapeutic care.
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs text-slate-700">
                <div className="font-bold text-slate-900">Key Scientific Research Conditions:</div>
                <ul className="list-disc list-inside space-y-1.5 text-slate-600">
                  <span>Samples are used strictly after intended medical diagnostic testing is complete.</span>
                  <li>Treatment data shared with researchers will never disclose your identity.</li>
                  <li>Research use offers no financial benefit to patients, but helps future disease treatments.</li>
                  <li><strong>Opt-Out Option:</strong> You retain the option to disallow research use of your samples and data.</li>
                </ul>
              </div>
            </section>

            {/* Section 6 */}
            <section
              id="section-6"
              className="bg-gradient-to-tr from-[#0A5F7A] via-[#1b708f] to-[#0E526B] text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-5 scroll-mt-24"
            >
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-2.5 rounded-xl bg-white/10 text-[#F59E0B]">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  6. Communications & Patient Declaration
                </h2>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-200 leading-relaxed">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  <span>
                    I agree to receive SMS, WhatsApp alerts, and phone calls in connection with my healthcare services.
                  </span>
                </p>

                <div className="p-4 rounded-xl bg-white/10 border border-white/15 space-y-2">
                  <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider block">
                    Free Will Declaration
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed italic">
                    “I/We have signed/agreed to the above on my/our own free will after understanding fully the contents and the explanations given to me/us by the Hospital authorities including the doctors.”
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 text-xs">
                <span className="text-slate-300">
                  Questions regarding terms or data management?
                </span>
                <a
                  href="mailto:connect@apollojbphospitals.com"
                  className="px-4 py-2 rounded-lg bg-[#F59E0B] text-slate-950 font-bold hover:bg-[#edcd76] transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <span>connect@apollojbphospitals.com</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}