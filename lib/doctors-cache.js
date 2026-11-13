
import { unstable_cache } from "next/cache";
import {
  getDoctorCards,
  getDoctorBySlug,
  getDoctorSlugs,
} from "@/lib/doctors-service";
import { getActiveSpecialties } from "@/lib/specialties-service";

export const getDoctorCardsCached = unstable_cache(
  () => getDoctorCards(),
  ["doctor-cards"],
  { tags: ["doctors"], revalidate: 3600 }
);

export const getDoctorSlugsCached = unstable_cache(
  () => getDoctorSlugs(),
  ["doctor-slugs"],
  { tags: ["doctors"], revalidate: 3600 }
);

export const getSpecialtiesCached = unstable_cache(
  () => getActiveSpecialties(),
  ["specialties-active"],
  { tags: ["specialties"], revalidate: 3600 }
);

export const getDoctorBySlugCached = (slug) =>
  unstable_cache(() => getDoctorBySlug(slug), ["doctor", slug], {
    tags: ["doctors", `doctor-${slug}`],
    revalidate: 3600,
  })();