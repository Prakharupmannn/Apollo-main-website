import pool from "@/lib/db";

const JSON_FIELDS = [
  "about",
  "languages",
  "qualifications",
  "highlights",
  "expertise",
  "experienceDetails",
  "training",
  "research",
  "publications",
  "faqs",
  "podcasts",
  "opd",
  "expertiseCategories",
  "conditions",
  "clinicalProcedures",
  "diagnosticServices",
  "clinicalInterests",
  "specializedInterventions",
  "areasOfSpecialInterest",
  "whyChoose",
  "certifications",
  "professionalMemberships",
  "researchDetails",
];

function parseDoctor(row) {
  if (!row) return null;

  const doctor = { ...row };

  for (const field of JSON_FIELDS) {
    const value = doctor[field];

    if (typeof value === "string") {
      try {
        doctor[field] = JSON.parse(value);
      } catch {
        doctor[field] = value;
      }
    }
  }

  return doctor;
}

const DOCTOR_SELECT = `
  SELECT
    id AS databaseId,
    doctor_code AS id,
    slug,
    name,
    designation,
    speciality,
    speciality_slug AS specialitySlug,
    speciality_id AS specialityId,
    department,
    department_id AS departmentId,
    image,
    profile_url AS profileUrl,
    summary,
    about,
    languages,
    qualifications,
    highlights,
    expertise,
    experience,
    experience_details AS experienceDetails,
    training,
    research,
    publications,
    faqs,
    podcasts,
    opd,
    display_order AS displayOrder,
    status,

    tagline,
    expertise_categories AS expertiseCategories,
    conditions,
    clinical_procedures AS clinicalProcedures,
    diagnostic_services AS diagnosticServices,
    clinical_interests AS clinicalInterests,
    specialized_interventions AS specializedInterventions,
    areas_of_special_interest AS areasOfSpecialInterest,
    why_choose AS whyChoose,
    professional_approach AS professionalApproach,
    certifications,
    professional_memberships AS professionalMemberships,
    research_details AS researchDetails

  FROM doctors
`;

export async function getDoctors() {
  const [rows] = await pool.execute(`
    ${DOCTOR_SELECT}
    WHERE status = 1
    ORDER BY display_order ASC, name ASC
  `);

  return rows.map(parseDoctor);
}

export async function getDoctorBySlug(slug) {
  if (!slug) return null;

  const [rows] = await pool.execute(
    `
      ${DOCTOR_SELECT}
      WHERE slug = ? AND status = 1
      LIMIT 1
    `,
    [slug]
  );

  return parseDoctor(rows[0]);
}

/* ── Specific Speciality Matching Mappings ──────────── */

const SPECIALITY_TARGETS = {
  // Cardiology & CTVS
  "ctvs-surgeon": {
    slugs: ["cardiothoracic-vascular-surgery", "ctvs-surgeon"],
    keywords: ["ctvs", "cardiothoracic", "thoracic surgeon"],
  },
  "cardiology": {
    slugs: ["interventional-cardiology", "cardiology"],
    keywords: ["cardiology", "cardiologist"],
  },
  "non-invasive-cardiology": {
    slugs: ["non-invasive-cardiology", "interventional-cardiology"],
    keywords: ["non-invasive cardiology", "echocardiography"],
  },

  // Neurosciences
  "neurology": {
    slugs: ["neurology"],
    keywords: ["neurology", "neurologist"],
  },
  "neurosurgeon": {
    slugs: ["neurosurgery", "neurosurgeon"],
    keywords: ["neurosurgeon", "neurosurgery", "spine surgery"],
  },
  "neurosurgery": {
    slugs: ["neurosurgery"],
    keywords: ["neurosurgeon", "neurosurgery"],
  },

  // Cancer Care
  "oncology": {
    slugs: ["surgical-oncology", "radiation-oncology", "medical-oncology", "haematology-haemato-oncology", "oncology"],
    department: "onco",
  },

  // Orthopedics
  "orthopaedics": {
    slugs: ["orthopaedics", "orthopaedics-spine"],
    keywords: ["orthopaedic", "orthopaedics", "joint replacement"],
  },

  // Gastro Sciences
  "gastroenterology": {
    slugs: ["gastroenterology", "gastroenterology-hepatology", "gastroenterology-endoscopy"],
    department: "gastro",
  },
  "laproscopic-surgeon-gastro-enterologist": {
    slugs: ["gastro-surgery", "general-laparoscopic-surgery", "colorectal-surgery"],
  },

  // Renal Care
  "nephrology": {
    slugs: ["nephrology"],
    keywords: ["nephrology", "nephrologist"],
  },
  "urologist": {
    slugs: ["urology", "urologist"],
    keywords: ["urology", "urologist", "uro-oncologist", "andrologist"],
  },

  // Women's Health
  "obstetrics-gynaecology": {
    slugs: ["obstetrics-gynaecology", "reproductive-medicine"],
    keywords: ["obstetrics", "gynaecology", "gynecology", "gynecologist", "reproductive medicine", "infertility", "ivf"],
  },
  "gynae-deptt": {
    slugs: ["obstetrics-gynaecology", "reproductive-medicine"],
    keywords: ["obstetrics", "gynaecology", "gynecology", "gynecologist", "reproductive medicine"],
  },

  // Pediatrics
  "pediatric-neonatology": {
    slugs: ["neonatology", "paediatric-emergency"],
    keywords: ["neonatology", "neonatologist", "pediatric", "paediatric"],
  },
  "child-specialist": {
    slugs: ["neonatology", "paediatric-emergency"],
    keywords: ["child specialist", "pediatric", "paediatric"],
  },
  "paeditrician": {
    slugs: ["neonatology", "paediatric-emergency"],
    keywords: ["paediatrician", "pediatrician", "paediatric", "pediatric"],
  },
  "paediatric-and-paediatric-nephrology": {
    slugs: ["pediatric-nephrology"],
    keywords: ["pediatric nephrology", "paediatric nephrology"],
  },

  // Critical Care & Anaesthesia
  "critical-care-medicine": {
    slugs: ["critical-care", "critical-care-medicine", "anaesthesiology-critical-care"],
    keywords: ["critical care", "intensivist", "icu"],
  },
  "anaesthesiologist": {
    slugs: ["anaesthesiology", "anaesthesiology-critical-care"],
    keywords: ["anaesthesiology", "anaesthesiologist", "anesthesiology"],
  },

  // Surgical Services
  "general-surgeon": {
    slugs: ["general-surgery", "general-laparoscopic-surgery", "colorectal-surgery"],
    keywords: ["general surgery", "general surgeon"],
  },
  "plastic-surgen": {
    slugs: ["plastic-surgery", "cosmetic-surgery"],
    keywords: ["plastic surgery", "plastic surgeon", "cosmetic"],
  },

  // General Medicine
  "general-physician": {
    slugs: ["general-medicine"],
    keywords: ["general medicine", "physician", "general physician", "internal medicine"],
  },
  "internal-medicine": {
    slugs: ["general-medicine"],
    keywords: ["internal medicine", "general medicine"],
  },
  "physician": {
    slugs: ["general-medicine"],
    keywords: ["general medicine", "physician"],
  },

  // Pulmonology
  "pulmonologist": {
    slugs: ["pulmonary-medicine-critical-care"],
    keywords: ["pulmonary", "pulmonology", "pulmonologist"],
  },

  // Dermatology
  "dermatologist": {
    slugs: ["dermatology"],
    keywords: ["dermatology", "dermatologist", "skin"],
  },
  "skin-specialist": {
    slugs: ["dermatology"],
    keywords: ["skin specialist", "dermatology"],
  },

  // ENT
  "ear-throat-nose": {
    slugs: ["ent"],
    keywords: ["ent", "ear nose throat", "otorhinolaryngology"],
  },
  "ent-deptt": {
    slugs: ["ent"],
    keywords: ["ent", "ear nose throat"],
  },

  // Eye & Dental
  "ophthalmology": {
    slugs: ["ophthalmology"],
    keywords: ["ophthalmology", "ophthalmologist", "eye"],
  },
  "dental": {
    slugs: ["dentistry", "dental"],
    keywords: ["dentistry", "dental", "endodontist"],
  },

  // Mental Health
  "psychiatric": {
    slugs: ["psychiatry", "psychiatric"],
    keywords: ["psychiatry", "psychiatric", "psychiatrist"],
  },

  // Wellness & Rehab
  "dietitian": {
    slugs: ["clinical-nutrition-dietetics", "dietetics"],
    keywords: ["dietitian", "nutritionist", "dietetics"],
  },
  "physiotherepy": {
    slugs: ["physiotherapy", "rehabilitation"],
    keywords: ["physiotherapy", "physiotherapist", "rehabilitation"],
  },

  // Diagnostics
  "radio-diagnosis": {
    slugs: ["radiodiagnosis-imaging", "interventional-radiology"],
    keywords: ["radiodiagnosis", "radiology", "radiologist"],
  },
  "mlc-incharge": {
    slugs: ["emergency-medicine", "forensic-medicine"],
    keywords: ["emergency medicine", "trauma care", "mlc"],
  },
};

function normalizeSlug(str) {
  return String(str || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function hasWordMatch(text, keyword) {
  const t = ` ${String(text || "").toLowerCase().replace(/[^a-z0-9]/g, " ")} `;
  const k = ` ${keyword.toLowerCase().replace(/[^a-z0-9]/g, " ")} `;
  return t.includes(k);
}

function matchesSpeciality(doctor, specSlug) {
  const normSpecSlug = normalizeSlug(specSlug);
  const normDocSlug = normalizeSlug(doctor.specialitySlug || doctor.speciality_slug);
  const normDocDept = normalizeSlug(doctor.department);

  // Exact slug match
  if (normDocSlug && normDocSlug === normSpecSlug) {
    return true;
  }

  const target = SPECIALITY_TARGETS[specSlug];
  if (!target) {
    return false;
  }

  // Department check
  if (target.department && normDocDept === target.department) {
    return true;
  }

  // Check target slugs
  if (target.slugs && (target.slugs.includes(normDocSlug) || target.slugs.includes(normDocDept))) {
    return true;
  }

  // Check target keywords with word-boundary match against doctor designation & speciality
  const docFields = `${doctor.speciality || ""} ${doctor.designation || ""}`;
  if (target.keywords) {
    for (const kw of target.keywords) {
      if (hasWordMatch(docFields, kw)) {
        return true;
      }
    }
  }

  return false;
}

function formatExperience(exp) {
  if (!exp) return "10+ Yrs";
  const str = String(exp).trim();
  const match = str.match(/\b(\d+)\+?\s*(?:yrs|years)?/i);
  if (match) return `${match[1]}+ Yrs`;
  return str.length <= 15 ? str : "10+ Yrs";
}

function formatQualifications(quals) {
  if (Array.isArray(quals) && quals.length > 0) {
    return (
      quals
        .map((q) => (typeof q === "string" ? q : q.degree || q.name || ""))
        .filter(Boolean)
        .join(", ") || "MBBS, Specialist"
    );
  }
  if (typeof quals === "string" && quals.trim()) {
    return quals.trim();
  }
  return "MBBS, Specialist";
}

function formatTimings(opd) {
  if (!opd) return "Mon - Sat • 10:00 AM – 5:00 PM";
  if (typeof opd === "object") {
    const timing = opd.timing || "";
    const days =
      Array.isArray(opd.days) && opd.days.length > 0
        ? opd.days.join(", ")
        : "Mon - Sat";
    if (timing.trim()) {
      return `${days} • ${timing.trim()}`;
    }
  }
  if (typeof opd === "string" && opd.trim()) {
    return opd.trim();
  }
  return "Mon - Sat • 10:00 AM – 5:00 PM";
}

function formatDoctorForCard(d) {
  return {
    id: d.id || d.doctor_code || d.databaseId || `doc-${d.slug}`,
    slug: d.slug,
    name: d.name,
    designation: d.designation || d.speciality || "Consultant Specialist",
    qualification: formatQualifications(d.qualifications),
    experience: formatExperience(d.experience),
    image: d.image || "/images/doctors/default-doctor.webp",
    timings: formatTimings(d.opd),
    languages:
      Array.isArray(d.languages) && d.languages.length > 0
        ? d.languages
        : ["English", "Hindi"],
  };
}

/**
 * Fetches all doctors from the existing doctors API endpoint
 * using the configured server-side API key.
 * Falls back to direct database query during static pre-rendering (next build).
 */
export async function fetchDoctorsFromApi() {
  const apiKey =
    process.env.API_KEY ||
    process.env.NEXT_PUBLIC_API_KEY ||
    "apollo54321";
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/admin/doctors`, {
      headers: {
        "x-api-key": apiKey,
      },
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data;
      }
    }
  } catch (err) {
    // Falls back during static generation (next build) or when port 3000 is not yet listening
  }

  return await getDoctors();
}

/**
 * Main function to get formatted doctors for any given speciality slug.
 */
export async function getDoctorsForSpeciality(specialitySlug) {
  const doctors = await fetchDoctorsFromApi();
  const activeDoctors = (doctors || []).filter(
    (d) => d.status === 1 || d.status === true || d.status == null
  );

  return activeDoctors
    .filter((d) => matchesSpeciality(d, specialitySlug))
    .map(formatDoctorForCard);
}
