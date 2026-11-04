export const metadata = {
  title: "Patient Care & Hospital Services | Apollo Hospitals Jabalpur",
  description:
    "Explore patient care services at Apollo Hospitals Jabalpur: doctor appointments, 24/7 ambulance, clinical case studies, upcoming health events, and dedicated patient support.",
  keywords: [
    "Patient care Jabalpur",
    "Apollo hospital patient services",
    "Doctor appointment booking Jabalpur",
    "Ambulance service Jabalpur",
  ],
  alternates: {
    canonical: "/patientcare",
  },
  openGraph: {
    title: "Patient Care Services | Apollo Hospitals Jabalpur",
    description:
      "Comprehensive patient-first healthcare services, online appointment booking, and emergency care at Apollo Hospitals Jabalpur.",
    url: "/patientcare",
    siteName: "Apollo Hospitals Jabalpur",
    type: "website",
    images: [{ url: "/apollologo.webp", width: 1200, height: 630, alt: "Patient Care Apollo Hospitals" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Patient Care | Apollo Hospitals Jabalpur",
    description: "Patient services and healthcare resources at Apollo Hospitals Jabalpur.",
    images: ["/apollologo.webp"],
  },
};

export default function PatientCareLayout({ children }) {
  return children;
}
