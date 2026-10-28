"use server";

import { getHealthCareArticles } from "@/lib/health-care";

export async function fetchHealthCareArticlesAction() {
  return await getHealthCareArticles();
}
