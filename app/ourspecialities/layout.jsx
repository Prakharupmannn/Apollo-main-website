export const metadata = {
  title: "Medical Specialties & Clinical Departments | Apollo Hospitals Jabalpur",
  description:
    "Explore 25+ comprehensive medical specialties at Apollo Hospitals Jabalpur: Cardiology, Oncology, Neurology, Orthopaedics, Gastroenterology, Nephrology, Urology, Women's Health, Paediatrics, and Surgical services.",
  keywords: [
    "Medical specialties Jabalpur",
    "Specialist departments Apollo hospital",
    "Cardiology Jabalpur",
    "Cancer treatment Jabalpur",
    "Orthopaedic surgery Jabalpur",
    "Nephrology dialysis Jabalpur",
  ],
  alternates: {
    canonical: "/ourspecialities",
  },
  openGraph: {
    title: "Medical Specialties | Apollo Hospitals Jabalpur",
    description:
      "Comprehensive specialist care across 25+ medical disciplines at Apollo Hospitals Jabalpur.",
    url: "/ourspecialities",
    siteName: "Apollo Hospitals Jabalpur",
    type: "website",
    images: [{ url: "/apollologo.webp", width: 1200, height: 630, alt: "Medical Specialties Apollo Hospitals" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Medical Specialties | Apollo Hospitals Jabalpur",
    description: "Explore clinical specialties and expert doctor consultations in Jabalpur.",
    images: ["/apollologo.webp"],
  },
};

export default function SpecialtiesLayout({ children }) {
  return children;
}
