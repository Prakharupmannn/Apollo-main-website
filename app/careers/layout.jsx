export const metadata = {
  title: "Careers & Healthcare Job Openings | Apollo Hospitals Jabalpur",
  description:
    "Join the healthcare team at Apollo Hospitals Jabalpur. Explore job vacancies for doctors, nurses, paramedics, medical officers, technicians, and administrative professionals.",
  keywords: [
    "Hospital jobs in Jabalpur",
    "Doctor jobs Jabalpur",
    "Nursing vacancies Apollo hospital",
    "Healthcare careers Jabalpur",
    "Apollo hospital recruitment",
  ],
  alternates: {
    canonical: "/careers",
  },
  openGraph: {
    title: "Careers & Job Opportunities | Apollo Hospitals Jabalpur",
    description:
      "Build your career in clinical excellence and patient care with Apollo Hospitals Jabalpur. View active job vacancies.",
    url: "/careers",
    siteName: "Apollo Hospitals Jabalpur",
    type: "website",
    images: [{ url: "/apollologo.webp", width: 1200, height: 630, alt: "Careers at Apollo Hospitals Jabalpur" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Careers | Apollo Hospitals Jabalpur",
    description: "Explore career opportunities in healthcare with Apollo Hospitals Jabalpur.",
    images: ["/apollologo.webp"],
  },
};

export default function CareersLayout({ children }) {
  return children;
}
