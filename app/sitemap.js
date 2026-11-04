import { getDoctors } from "@/lib/doctors-service";
import { getActiveCentres } from "@/lib/centres-service";
import { getActiveSpecialties } from "@/lib/specialties-service";
import { getHealthCareArticles } from "@/lib/health-care";
import { getAllEvents } from "@/lib/events-service";
import { caseStudiesData } from "@/data/caseStudiesData";
import { getActiveCareerJobs } from "@/lib/career-service";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  const baseUrl = "https://www.apollohospitalsjbp.com";
  const now = new Date();

  // Static core routes
  const staticRoutes = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/doctors`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/centres-of-excellence`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ourspecialities`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/emergency`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/patientcare/appointment`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/aboutus`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/health-library`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/patientcare`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/patientcare/ambulance`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/patientcare/case-studies`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/patientcare/events`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic: Doctors
  let doctorRoutes = [];
  try {
    const doctors = await getDoctors();
    if (Array.isArray(doctors)) {
      doctorRoutes = doctors
        .filter((d) => d && d.slug)
        .map((doc) => ({
          url: `${baseUrl}/doctors/${doc.slug}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.85,
        }));
    }
  } catch (e) {
    console.error("sitemap doctors error:", e?.message);
  }

  // Dynamic: Centres of Excellence
  let centreRoutes = [];
  try {
    const centres = await getActiveCentres();
    if (Array.isArray(centres)) {
      centreRoutes = centres
        .filter((c) => c && c.slug)
        .map((c) => ({
          url: `${baseUrl}/centres-of-excellence/${c.slug}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.85,
        }));
    }
  } catch (e) {
    console.error("sitemap centres error:", e?.message);
  }

  // Dynamic: Specialties
  let specialtyRoutes = [];
  try {
    const specialties = await getActiveSpecialties();
    if (Array.isArray(specialties)) {
      specialtyRoutes = specialties
        .filter((s) => s && s.slug)
        .map((s) => ({
          url: `${baseUrl}/ourspecialities/${s.slug}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.85,
        }));
    }
  } catch (e) {
    console.error("sitemap specialties error:", e?.message);
  }

  // Dynamic: Health Library Articles
  let articleRoutes = [];
  try {
    const data = await getHealthCareArticles();
    const articles = data?.articles || [];
    if (Array.isArray(articles)) {
      articleRoutes = articles
        .filter((a) => a && a.slug)
        .map((a) => ({
          url: `${baseUrl}/health-library/${a.slug}`,
          lastModified: a.updatedAt ? new Date(a.updatedAt) : now,
          changeFrequency: "monthly",
          priority: 0.75,
        }));
    }
  } catch (e) {
    console.error("sitemap health library error:", e?.message);
  }

  // Dynamic: Events
  let eventRoutes = [];
  try {
    const events = await getAllEvents();
    if (Array.isArray(events)) {
      eventRoutes = events
        .filter((e) => e && (e.slug || e.id))
        .map((e) => ({
          url: `${baseUrl}/patientcare/events/${e.slug || e.id}`,
          lastModified: now,
          changeFrequency: "weekly",
          priority: 0.75,
        }));
    }
  } catch (e) {
    console.error("sitemap events error:", e?.message);
  }

  // Case Studies
  let caseStudyRoutes = [];
  try {
    if (Array.isArray(caseStudiesData)) {
      caseStudyRoutes = caseStudiesData
        .filter((cs) => cs && cs.slug)
        .map((cs) => ({
          url: `${baseUrl}/patientcare/case-studies/${cs.slug}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.7,
        }));
    }
  } catch (e) {
    console.error("sitemap case studies error:", e?.message);
  }

  // Careers Jobs
  let careerRoutes = [];
  try {
    const jobs = await getActiveCareerJobs();
    if (Array.isArray(jobs)) {
      careerRoutes = jobs
        .filter((j) => j && (j.slug || j.id))
        .map((j) => ({
          url: `${baseUrl}/careers/${j.slug || j.id}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.7,
        }));
    }
  } catch (e) {
    console.error("sitemap careers error:", e?.message);
  }

  return [
    ...staticRoutes,
    ...doctorRoutes,
    ...centreRoutes,
    ...specialtyRoutes,
    ...articleRoutes,
    ...eventRoutes,
    ...caseStudyRoutes,
    ...careerRoutes,
  ];
}

