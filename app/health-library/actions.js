"use server";


import {
getHealthCareArticles,
getHealthCareArticleBySlug,
} from "@/lib/health-care";

export async function fetchHealthCareArticlesAction() {
return await getHealthCareArticles();
}

export async function fetchHealthCareArticleBySlugAction(slug) {
if (!slug || typeof slug !== "string") {
return null;
}

return await getHealthCareArticleBySlug(slug);
}
