import HealthLibraryContent from "./HealthLibraryContent";
import { getHealthCareArticles } from "@/lib/health-care";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Health Library | Medical Articles & Wellness Blogs | Apollo Hospitals Jabalpur",
  description:
    "Explore trusted health information, doctor-reviewed medical blogs, wellness tips, and healthcare breakthroughs from Apollo Hospitals Jabalpur specialists.",
  keywords: [
    "Health Library Jabalpur",
    "Medical articles Jabalpur",
    "Apollo health blogs",
    "Doctor advice Jabalpur",
    "Health tips Apollo Hospitals",
  ],
  alternates: {
    canonical: "/health-library",
  },
  openGraph: {
    title: "Health Library & Wellness Articles | Apollo Hospitals Jabalpur",
    description:
      "Doctor-reviewed medical insights, health guidance, and hospital news from Apollo Hospitals Jabalpur.",
    url: "/health-library",
    siteName: "Apollo Hospitals Jabalpur",
    type: "website",
    images: [{ url: "/apollologo.webp", width: 1200, height: 630, alt: "Apollo Hospitals Health Library" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Health Library | Apollo Hospitals Jabalpur",
    description: "Doctor-reviewed medical articles and wellness insights from Apollo Hospitals Jabalpur.",
    images: ["/apollologo.webp"],
  },
};

export default async function HealthLibraryPage() {
  const { articles, categories, newsTicker, error } =
    await getHealthCareArticles();

  return (
    <HealthLibraryContent
      initialArticles={articles}
      initialCategories={categories}
      initialNewsTicker={newsTicker}
      initialError={error}
    />
  );
}
