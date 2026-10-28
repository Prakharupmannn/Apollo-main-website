import HealthLibraryContent from "./HealthLibraryContent";
import { getHealthCareArticles } from "@/lib/health-care";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Health Library | Apollo JBP Hospitals Jabalpur",
  description:
    "Health information, medical blogs, doctor-reviewed articles, and latest health updates from Apollo JBP Hospitals Jabalpur.",
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
