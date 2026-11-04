export const metadata = {
  title: "24/7 Emergency & Trauma Care in Jabalpur | Dial 1066 | Apollo Hospitals",
  description:
    "Immediate 24x7 emergency medical and trauma care in Jabalpur at Apollo Hospitals. Advanced life support ambulances, Level-1 emergency room, trauma specialists, and critical care ICU. Call 1066.",
  keywords: [
    "Emergency hospital in Jabalpur",
    "24/7 emergency care Jabalpur",
    "Ambulance number Jabalpur 1066",
    "Trauma centre Jabalpur",
    "ICU hospital Jabalpur",
  ],
  alternates: {
    canonical: "/emergency",
  },
  openGraph: {
    title: "24/7 Emergency & Trauma Care Centre | Apollo Hospitals Jabalpur",
    description:
      "Rapid emergency response, advanced life support ambulances, and 24/7 critical care in Jabalpur. Dial 1066 immediately.",
    url: "/emergency",
    siteName: "Apollo Hospitals Jabalpur",
    type: "website",
    images: [{ url: "/apollologo.webp", width: 1200, height: 630, alt: "Emergency Care - Apollo Hospitals" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "24/7 Emergency Care in Jabalpur | Dial 1066",
    description: "Round-the-clock emergency medical and trauma care at Apollo Hospitals Jabalpur.",
    images: ["/apollologo.webp"],
  },
};

export default function EmergencyLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    name: "Apollo Hospitals Jabalpur 24/7 Emergency & Trauma Centre",
    url: "https://www.apollohospitalsjbp.com/emergency",
    telephone: "1066",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Global Square, Patan Rd, Karmeta",
      addressLocality: "Jabalpur",
      addressRegion: "Madhya Pradesh",
      postalCode: "482002",
      addressCountry: "IN",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
