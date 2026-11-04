export const metadata = {
  title: "24/7 Emergency Ambulance Service in Jabalpur | Call 1066 | Apollo Hospitals",
  description:
    "Fast 24x7 emergency ambulance service in Jabalpur equipped with advanced life support, ventilators, defibrillators, oxygen, and trained medical paramedics. Call 1066 for immediate emergency response.",
  keywords: [
    "Ambulance service in Jabalpur",
    "Emergency ambulance number 1066",
    "ICU on wheels Jabalpur",
    "Cardiac ambulance Jabalpur",
  ],
  alternates: {
    canonical: "/patientcare/ambulance",
  },
  openGraph: {
    title: "24/7 Emergency Ambulance Service | Apollo Hospitals Jabalpur",
    description:
      "Rapid emergency ambulance response with advanced life support equipment in Jabalpur. Dial 1066.",
    url: "/patientcare/ambulance",
    siteName: "Apollo Hospitals Jabalpur",
    type: "website",
    images: [{ url: "/apollologo.webp", width: 1200, height: 630, alt: "Ambulance Service Apollo Hospitals" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "24/7 Ambulance Service Jabalpur | Dial 1066",
    description: "Rapid ambulance dispatch with life-support facilities across Jabalpur.",
    images: ["/apollologo.webp"],
  },
};

export default function AmbulanceLayout({ children }) {
  return children;
}
