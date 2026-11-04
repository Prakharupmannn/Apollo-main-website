import { getActiveCareerJobBySlug } from "@/lib/career-service";

export async function generateMetadata({ params }) {
  const { id } = await params;
  let job = null;
  try {
    job = await getActiveCareerJobBySlug(id);
  } catch {}

  if (!job) {
    return { title: "Career Opportunity | Apollo Hospitals Jabalpur" };
  }

  const title = `${job.fullTitle || job.title} | Careers | Apollo Hospitals Jabalpur`;
  const description =
    job.overview ||
    `Job opening for ${job.fullTitle || job.title} at Apollo Hospitals Jabalpur (${job.dept || "Healthcare"}). Apply online.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/careers/${id}`,
    },
    openGraph: {
      title,
      description,
      url: `/careers/${id}`,
      siteName: "Apollo Hospitals Jabalpur",
      type: "website",
      images: [{ url: "/apollologo.webp", width: 1200, height: 630, alt: job.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/apollologo.webp"],
    },
  };
}

export default function CareerJobDetailLayout({ children }) {
  return children;
}
