export const metadata = {
  title: "Book Doctor Appointment Online | OPD Consultation | Apollo Hospitals Jabalpur",
  description:
    "Easily book an in-person or OPD doctor appointment online at Apollo Hospitals Jabalpur. Choose your preferred specialist, specialty department, and convenient consultation slot.",
  keywords: [
    "Book doctor appointment Jabalpur",
    "Online doctor consultation Jabalpur",
    "Apollo hospital OPD appointment",
    "Doctor booking Jabalpur",
  ],
  alternates: {
    canonical: "/patientcare/appointment",
  },
  openGraph: {
    title: "Book Doctor Appointment Online | Apollo Hospitals Jabalpur",
    description:
      "Select your doctor, pick a date and confirm your OPD appointment at Apollo Hospitals Jabalpur.",
    url: "/patientcare/appointment",
    siteName: "Apollo Hospitals Jabalpur",
    type: "website",
    images: [{ url: "/apollologo.webp", width: 1200, height: 630, alt: "Book Doctor Appointment Apollo Hospitals" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Doctor Appointment | Apollo Hospitals Jabalpur",
    description: "Quick and easy online appointment booking with specialist doctors in Jabalpur.",
    images: ["/apollologo.webp"],
  },
};

export default function AppointmentLayout({ children }) {
  return children;
}
