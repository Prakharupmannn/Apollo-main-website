import PolicySidebarNav from "../../components/components/PolicySidebarNav";
import {
  ShieldCheck,
  Lock,
  Mail,
  UserCheck,
  FileText,
  Clock,
  Database,
  Share2,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Building2,
  ExternalLink,
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy | Apollo JBP Hospitals, Jabalpur",
  description:
    "Patient Data Protection & Privacy Standard for Apollo JBP Hospitals, Jabalpur.",
};

const sections = [
  { id: "section-1", title: "1. Information Collection & Usage", iconName: "Database" },
  { id: "section-2", title: "2. Email Communications", iconName: "Mail" },
  { id: "section-3", title: "3. Data Retention & Sharing", iconName: "Share2" },
  { id: "section-4", title: "4. Data Security Standards", iconName: "Lock" },
  { id: "section-5", title: "5. User Rights & Choices", iconName: "UserCheck" },
  { id: "section-6", title: "6. Contact & Grievance", iconName: "PhoneCall" },
];

export default function PrivacyPolicyPage() {

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 selection:bg-[#F59E0B]/30 selection:text-[#0E526B]">
      {/* Hero Header Section */}
      <section className="relative overflow-hidden bg-gradient-to-tr from-[#0A5F7A] via-[#1b708f] to-[#0E526B] text-white pt-32 pb-24 border-b border-[#F59E0B]/30">
        {/* Background Mesh & Glow Orbs */}
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
              <ShieldCheck className="w-4 h-4 text-[#F59E0B]" />
              <span>Patient Data Protection & Privacy Standard</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Privacy <span className="text-[#F59E0B]">Policy</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed max-w-2xl">
              At Apollo JBP Hospitals, Jabalpur, we prioritize your data security
              and medical confidentiality with the highest global compliance
              standards.
            </p>

            {/* Metadata Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-200">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Published on: February 18, 2025</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                <Building2 className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>Apollo JBP Hospitals, Jabalpur</span>
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
                <PolicySidebarNav sections={sections} />
              </div>

              {/* Quick Contact Card */}
              <div className="bg-gradient-to-br from-[#0E526B] to-[#1D82A6] text-white rounded-2xl p-5 shadow-lg border border-[#F59E0B]/30 space-y-3">
                <div className="p-2 w-fit rounded-lg bg-white/10 text-[#F59E0B]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-sm text-white">Have Privacy Concerns?</h4>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Our privacy team is available to assist you with any questions regarding your personal information.
                </p>
                <a
                  href="mailto:connect@apollojbphospitals.com"
                  className="inline-flex items-center gap-2 text-xs font-bold text-slate-950 bg-gradient-to-r from-[#edcd76] to-[#C8952E] px-4 py-2.5 rounded-xl shadow hover:brightness-110 transition-all w-full justify-center"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Data Privacy Office</span>
                </a>
              </div>
            </div>
          </aside>

          {/* Policy Detail Sections */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-8">
            {/* Preamble Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0E526B]" />
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                This Privacy Policy outlines how Apollo JBP Hospitals, Jabalpur (
                <strong className="text-slate-900">“Hospital,” “We,” “Us,”</strong> or{" "}
                <strong className="text-slate-900">“Our”</strong>) collects, uses, shares, and protects the personal information of users (
                <strong className="text-slate-900">“You”</strong> or{" "}
                <strong className="text-slate-900">“Your”</strong>) when accessing our website and services. By using our platform, you agree to the terms outlined in this policy.
              </p>
            </div>

            {/* Section 1 */}
            <section
              id="section-1"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 scroll-mt-24 transition-all"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2.5 rounded-xl bg-[#0E526B]/10 text-[#0E526B]">
                  <Database className="w-5 h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  1. Information Collection and Usage
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We collect personal information that you voluntarily provide when using our website, including:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="p-1.5 w-fit rounded-lg bg-blue-100 text-blue-700">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900">Contact Details</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Including name, email address, and phone number for communication and service interactions.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="p-1.5 w-fit rounded-lg bg-rose-100 text-rose-700">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900">Health Inquiries</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Health-related queries to provide general wellness guidance and specialist care tips.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="p-1.5 w-fit rounded-lg bg-amber-100 text-amber-700">
                    <Mail className="w-4 h-4" />
                  </div>
                  <h3 className="text-xs font-bold text-slate-900">Subscriptions</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Subscription details for newsletters, healthcare updates, and doctor-approved health articles.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section
              id="section-2"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 scroll-mt-24"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2.5 rounded-xl bg-[#0E526B]/10 text-[#0E526B]">
                  <Mail className="w-5 h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  2. Email Communications and Subscriptions
                </h2>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0E526B] shrink-0 mt-0.5" />
                  <span>
                    Users can subscribe to receive newsletters, health tips, and other informative content via email.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0E526B] shrink-0 mt-0.5" />
                  <span>
                    You may opt out of receiving these communications at any time by using the unsubscribe link provided in our emails.
                  </span>
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section
              id="section-3"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5 scroll-mt-24"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2.5 rounded-xl bg-[#0E526B]/10 text-[#0E526B]">
                  <Share2 className="w-5 h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  3. Data Retention and Sharing
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Your personal information is stored in compliance with applicable legal regulations. If you discontinue using our services, we retain your data only if required for legal purposes or to prevent fraudulent activities.
              </p>
              
              <div className="bg-slate-50 p-4 sm:p-5 rounded-xl border border-slate-200/80 space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  We May Share User Data With:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200/60 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                    <span>Service providers delivering health information.</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200/60 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                    <span>Authorized employees & tech partners (need-to-know).</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200/60 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                    <span>Law enforcement in response to valid requests.</span>
                  </div>
                  <div className="flex items-center gap-2 p-2.5 rounded-lg bg-white border border-slate-200/60 shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                    <span>Apollo Group affiliates for operational needs.</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section
              id="section-4"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 scroll-mt-24"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2.5 rounded-xl bg-[#0E526B]/10 text-[#0E526B]">
                  <Lock className="w-5 h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  4. Data Security Standards
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                We implement industry-standard security measures to protect user information from unauthorized access, loss, or misuse. However, while we take reasonable precautions, we cannot guarantee absolute security. We are not responsible for breaches caused by third-party actions, unless due to our negligence.
              </p>
            </section>

            {/* Section 5 */}
            <section
              id="section-5"
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4 scroll-mt-24"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="p-2.5 rounded-xl bg-[#0E526B]/10 text-[#0E526B]">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  5. Your Rights
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                As a valued user, you retain the following rights regarding your personal information:
              </p>
              <div className="space-y-2.5 text-xs sm:text-sm">
                {[
                  "Access, update, or request deletion of your personal data.",
                  "Withhold sensitive information from being shared.",
                  "Withdraw consent for data usage at any time.",
                ].map((right, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 font-medium text-slate-800"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#0E526B] text-white flex items-center justify-center text-xs shrink-0 font-bold">
                      {idx + 1}
                    </div>
                    <span>{right}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500 pt-1">
                For any updates or changes to your information, please contact our data team directly.
              </p>
            </section>

            {/* Section 6 */}
            <section
              id="section-6"
              className="bg-gradient-to-tr from-[#0A5F7A] via-[#1b708f] to-[#0E526B] text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-4 scroll-mt-24"
            >
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-2.5 rounded-xl bg-white/10 text-[#F59E0B]">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  6. Contact Information
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                For queries, updates, or grievances regarding our Privacy Policy, please reach out to Apollo JBP Hospitals:
              </p>

              <div className="p-4 rounded-xl bg-white/10 border border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-[#F59E0B] shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-300 block font-semibold uppercase tracking-wider">
                      Official Email Support
                    </span>
                    <a
                      href="mailto:connect@apollojbphospitals.com"
                      className="text-sm font-bold text-white hover:text-[#F59E0B] transition-colors"
                    >
                      connect@apollojbphospitals.com
                    </a>
                  </div>
                </div>

                <a
                  href="mailto:connect@apollojbphospitals.com"
                  className="px-4 py-2 rounded-lg bg-[#F59E0B] text-slate-950 text-xs font-bold hover:bg-[#edcd76] transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <span>Send Direct Email</span>
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