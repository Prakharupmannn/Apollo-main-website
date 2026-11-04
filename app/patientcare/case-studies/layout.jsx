export const metadata = {
  title: "Clinical Case Studies & Treatment Breakthroughs | Apollo Hospitals Jabalpur",
  description:
    "Explore clinical case studies and complex medical treatments successfully handled by specialist doctors and surgeons at Apollo Hospitals Jabalpur across dentistry, gastro surgery, oncology, and other specialties.",
  keywords: [
    "Medical case studies Jabalpur",
    "Clinical success stories Apollo hospital",
    "Complex surgery cases Jabalpur",
  ],
  alternates: {
    canonical: "/patientcare/case-studies",
  },
  openGraph: {
    title: "Clinical Case Studies | Apollo Hospitals Jabalpur",
    description:
      "Real patient treatments, surgical breakthroughs, and multidisciplinary case reports from Apollo Hospitals Jabalpur.",
    url: "/patientcare/case-studies",
    siteName: "Apollo Hospitals Jabalpur",
    type: "website",
    images: [{ url: "/apollologo.webp", width: 1200, height: 630, alt: "Case Studies Apollo Hospitals" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clinical Case Studies | Apollo Hospitals Jabalpur",
    description: "Treatment breakthroughs and surgical success reports from Apollo Hospitals Jabalpur.",
    images: ["/apollologo.webp"],
  },
};

export default function CaseStudiesLayout({ children }) {
  return children;
}
