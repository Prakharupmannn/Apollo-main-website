import AboutContent from "./AboutContent";
import { brand } from "../../data/about-data";

// Update this to the real production domain before deploying.
const SITE_URL = "https://apollojbphospitals.com";

export const metadata = {
  title: "About Us | Apollo JBP Hospitals, Jabalpur",
  description:
    "Apollo JBP Hospitals is a quaternary care centre in Jabalpur — a managed unit of Apollo Hospitals Enterprise Ltd, offering the region's only PET-CT facility, 12 modular operation theatres, and specialised critical care.",
  alternates: {
    canonical: `${SITE_URL}/about-us`,
  },
  openGraph: {
    title: "About Us | Apollo JBP Hospitals, Jabalpur",
    description:
      "Quaternary care built for Central India — the region's only PET-CT facility, 12 modular operation theatres, and 50+ specialists.",
    url: `${SITE_URL}/about-us`,
    siteName: "Apollo JBP Hospitals",
    images: [`${SITE_URL}${brand ? "" : ""}/image/operation.jpg`],
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Hospital",
  name: "Apollo JBP Hospitals, Jabalpur",
  url: `${SITE_URL}/about-us`,
  telephone: brand.generalPhone,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Global Square, Patan Rd, Karmeta",
    addressLocality: "Jabalpur",
    addressRegion: "Madhya Pradesh",
    postalCode: "482002",
    addressCountry: "IN",
  },
  parentOrganization: {
    "@type": "Organization",
    name: "Apollo Hospitals Enterprise Ltd.",
  },
  medicalSpecialty: [
    "Cardiology",
    "Neurology",
    "Oncologic",
    "Orthopedic",
    "Nephrology",
    "Urology",
    "Gastroenterologic",
    "Pulmonary",
  ],
};

export default function AboutPageRoute() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutContent />
    </>
  );
}
