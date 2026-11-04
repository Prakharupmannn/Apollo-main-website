export const metadata = {
  title: "Contact Us & Hospital Location | Apollo Hospitals Jabalpur",
  description:
    "Get in touch with Apollo Hospitals Jabalpur. View hospital address at Karmeta, 24/7 emergency hotline 1066, OPD appointment helpline, map directions, and email contacts.",
  keywords: [
    "Apollo Hospital Jabalpur contact",
    "Apollo Jabalpur phone number",
    "Apollo hospital address Jabalpur",
    "Emergency hospital contact Jabalpur 1066",
  ],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact Us & Hospital Location | Apollo Hospitals Jabalpur",
    description:
      "Connect with Apollo Hospitals Jabalpur for appointments, 24/7 emergency assistance (1066), and general healthcare inquiries.",
    url: "/contact",
    siteName: "Apollo Hospitals Jabalpur",
    type: "website",
    images: [{ url: "/apollologo.webp", width: 1200, height: 630, alt: "Contact Apollo Hospitals Jabalpur" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Apollo Hospitals Jabalpur",
    description: "Hospital location, phone numbers, and 24/7 emergency contact details.",
    images: ["/apollologo.webp"],
  },
};

export default function ContactLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Apollo Hospitals Jabalpur",
    url: "https://www.apollohospitalsjbp.com/contact",
    mainEntity: {
      "@type": "Hospital",
      name: "Apollo Hospitals Jabalpur",
      telephone: "+91 761 000 0000",
      emergencyTelephone: "1066",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Global Square, Patan Rd, Karmeta",
        addressLocality: "Jabalpur",
        addressRegion: "Madhya Pradesh",
        postalCode: "482002",
        addressCountry: "IN",
      },
    },
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
