import { caseStudiesData } from "@/data/caseStudiesData";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const study = caseStudiesData.find((c) => c.slug === slug);

  if (!study) {
    return { title: "Case Study | Apollo Hospitals Jabalpur" };
  }

  const title = `${study.title} | Case Study | Apollo Hospitals Jabalpur`;
  const description =
    study.overview?.challenge ||
    study.summary ||
    `Clinical case study on ${study.title} successfully managed by specialist doctors at Apollo Hospitals Jabalpur.`;

  const baseUrl = "https://www.apollohospitalsjbp.com";
  const imgUrl = study.images?.[0]
    ? (study.images[0].startsWith("http") ? study.images[0] : `${baseUrl}${study.images[0].startsWith("/") ? "" : "/"}${study.images[0]}`)
    : `${baseUrl}/apollologo.webp`;

  return {
    title,
    description,
    alternates: {
      canonical: `/patientcare/case-studies/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `/patientcare/case-studies/${slug}`,
      siteName: "Apollo Hospitals Jabalpur",
      type: "article",
      images: [{ url: imgUrl, width: 1200, height: 630, alt: study.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imgUrl],
    },
  };
}

export default function CaseStudyDetailLayout({ children }) {
  return children;
}
