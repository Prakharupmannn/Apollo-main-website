
import { caseStudiesData } from "../data/caseStudiesData.js";
import pool from "../lib/db.js";

const toJson = (value) =>
  value == null ? null : JSON.stringify(value);

// Convert Lucide component references into database-friendly strings.
const getIconName = (icon) => {
  if (!icon) return null;
  if (icon === "Stethoscope" || icon === "Microscope") return icon;

  const iconName = icon.displayName || icon.name;

  return iconName || null;
};

async function importCaseStudies() {
  if (!Array.isArray(caseStudiesData)) {
    throw new Error(
      "Case studies data must be an array. Check data/caseStudiesData.js."
    );
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const sql = `
      INSERT INTO case_studies (
        slug,
        dept,
        deptLabel,
        icon,
        images,
        title,
        patient,
        patientInfo,
        doctor,
        doctorRole,
        treatmentDuration,
        acquiredDiseases,
        summary,
        accent,
        beforeStats,
        afterStats,
        details,
        quote,
        challenge,
        procedures,
        outcome,
        outcomesList
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

      ON DUPLICATE KEY UPDATE
        dept = VALUES(dept),
        deptLabel = VALUES(deptLabel),
        icon = VALUES(icon),
        images = VALUES(images),
        title = VALUES(title),
        patient = VALUES(patient),
        patientInfo = VALUES(patientInfo),
        doctor = VALUES(doctor),
        doctorRole = VALUES(doctorRole),
        treatmentDuration = VALUES(treatmentDuration),
        acquiredDiseases = VALUES(acquiredDiseases),
        summary = VALUES(summary),
        accent = VALUES(accent),
        beforeStats = VALUES(beforeStats),
        afterStats = VALUES(afterStats),
        details = VALUES(details),
        quote = VALUES(quote),
        challenge = VALUES(challenge),
        procedures = VALUES(procedures),
        outcome = VALUES(outcome),
        outcomesList = VALUES(outcomesList)
    `;

    for (const caseStudy of caseStudiesData) {
      if (!caseStudy.slug || !caseStudy.title) {
        throw new Error(
          `A case study is missing its slug or title: ${
            caseStudy.slug || "unknown"
          }`
        );
      }

      const values = [
        caseStudy.slug,
        caseStudy.dept ?? null,
        caseStudy.deptLabel ?? null,
        getIconName(caseStudy.icon),
        toJson(caseStudy.images ?? []),
        caseStudy.title,
        caseStudy.patient ?? null,
        toJson(caseStudy.patientInfo),
        caseStudy.doctor ?? null,
        caseStudy.doctorRole ?? null,
        caseStudy.treatmentDuration ?? null,
        caseStudy.acquiredDiseases ?? null,
        caseStudy.summary ?? null,
        caseStudy.accent ?? null,
        caseStudy.beforeStats ?? null,
        caseStudy.afterStats ?? null,
        toJson(caseStudy.details ?? []),
        caseStudy.quote ?? null,
        caseStudy.challenge ?? null,
        toJson(caseStudy.procedure ?? []),
        caseStudy.outcome ?? null,
        toJson(caseStudy.outcomesList ?? []),
      ];

      await connection.execute(sql, values);

      console.log(`Processed: ${caseStudy.slug}`);
    }

    await connection.commit();

    console.log(
      `Successfully processed ${caseStudiesData.length} case studies.`
    );
  } catch (error) {
    await connection.rollback();

    console.error("Case study import failed:", error.message);

    throw error;
  } finally {
    connection.release();
    await pool.end();
  }
}

importCaseStudies().catch(() => {
  process.exitCode = 1;
});
