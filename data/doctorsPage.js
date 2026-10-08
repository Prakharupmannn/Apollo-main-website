/*
  DOCTORS PAGE DATA
  -----------------
  Ab local data use ho raha hai. Backend ready hone par sirf `getDoctorsPageData()`
  ke andar fetch kholo — page/components me kuch change nahi karna padega,
  kyunki har doctor `normalizeDoctor()` se guzarta hai.

  Doctor `department` = centre slug (centresOfExcellence.js ke slug se match).
  Optional fields khali chhodo → UI me apne aap hide ho jate hain.
*/

export const hospital = {
  name: "Apollo JBP Hospitals",
  city: "Jabalpur",
  address: "Global Square, Patan Rd, Karmeta, Jabalpur, Madhya Pradesh 482002",
  phone: "", // e.g. "+91 XXXXX XXXXX" — khali ho to Call button hide
};

export const departments = [
  { slug: "gastro", title: "Gastro Sciences", blurb: "Digestive, liver & endoscopy care" },
  { slug: "onco", title: "Onco Sciences", blurb: "Medical, radiation & surgical oncology" },
  { slug: "cardiac", title: "Cardiac Sciences", blurb: "Advanced heart care & imaging" },
  { slug: "neuro", title: "Neuro Sciences", blurb: "Brain, spine & stroke care" },
  { slug: "nephro", title: "Nephro Sciences", blurb: "Kidney care & dialysis" },
  { slug: "ortho-joint-spine", title: "Ortho-Joint & Spine", blurb: "Bones, joints & mobility" },
  { slug: "critical-care", title: "Critical Care", blurb: "Round-the-clock intensive care" },
];



export const rawDoctors = [
  {
  id: "d-001",
  slug: "dr-jitendra-singh-rathour",
  name: "Dr. Jitendra Singh Rathour",
  designation: "Associate Consultant – Neonatology",
  speciality: "Neonatology",
  specialitySlug: "neonatology",
  department: "neonatology",

  image: "/images/doctors/dr-jitendra.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/neonatologist-in-jabalpur-2/",

  languages: ["Hindi", "English"],

  summary:
    "Dr. Jitendra Singh Rathour is a Neonatologist in Jabalpur and Neonatology Specialist with specialized training in MBBS, MD Pediatrics and DM Neonatology. He has clinical experience as a Neonatology Consultant and NICU In-charge, along with academic experience as an Assistant Professor of Pediatrics.",

  about: [
    "Dr. Jitendra Singh Rathour is a Neonatologist in Jabalpur with specialized qualifications in MBBS, MD Pediatrics and DM Neonatology. He has clinical experience as a Neonatology Consultant and NICU In-charge, along with academic experience as an Assistant Professor of Pediatrics.",

    "He focuses on specialized care for newborns requiring close medical monitoring and neonatal support. His training in neonatology and experience in NICU care contribute to comprehensive neonatal care, with a focus on newborn health, NICU management and neonatal respiratory care.",

    "As an Associate Consultant – Neonatology at Apollo JBP Hospitals, he provides specialized care for high-risk and critically ill newborns, including neonatal respiratory care and management of complex neonatal conditions."
  ],

  qualifications: [
    {
      degree: "DM (Neonatology)",
      institute:
        "Government Medical College, Chengalpattu, Tamil Nadu",
      year: "2025",
    },
    {
      degree: "MD (Pediatrics)",
      institute:
        "Maulana Azad Medical College (MAMC), New Delhi",
      year: "2017",
    },
    {
      degree: "MBBS",
      institute:
        "Karnataka Institute of Medical Sciences (KIMS), Hubli, under RGUHS, Bangalore",
      year: "",
    },
  ],

  highlights: [
    {
      value: "DM",
      label: "Neonatology",
    },
    {
      value: "NICU",
      label: "Consultant & In-charge",
    },
    {
      value: "NRP",
      label: "Neonatal Resuscitation",
    },
  ],

  expertise: [
    "Neonatal Intensive Care (NICU)",
    "Extremely Preterm & Extremely Low Birth Weight (ELBW) Infants",
    "High-Risk Newborn Care",
    "Neonatal Respiratory Failure & Mechanical Ventilation",
    "Non-invasive Respiratory Support – CPAP, HFNC & NIPPV",
    "Neonatal Sepsis & Critical Care",
    "Neonatal Resuscitation",
    "Neonatal Nutrition & Parenteral Nutrition",
    "Neonatal Neurology & Hypoxic-Ischemic Encephalopathy (HIE)",
    "Therapeutic Hypothermia",
    "Neonatal Jaundice & Hemolytic Disease",
    "Neonatal Transport & Stabilization",
    "ROP Screening & Management Coordination",
    "Management of Surgical & Complex Neonatal Conditions",
    "NICU Quality Improvement & Clinical Protocols",
  ],

  experience:
    "Dr. Jitendra Singh Rathour has worked as a Consultant & NICU In-charge at NEONEST Hospital, Rohini, New Delhi. He has also served as Assistant Professor of Pediatrics at KD Medical College, Mathura; MMU Medical College, Solan; and Mayo Institute of Medical Sciences, Lucknow.",

  training: [
    "NNF Programme on NRP Instructor",
    "NNF Workshop on Neonatal Ventilation",
    "SCAN Workshop in Echo/Neurosonogram",
    "Neurodevelopmental Workshop",
    "Lung Scan Workshop",
  ],

  research: [
    "Neonatal respiratory failure",
    "Neonatal immunological disorders",
    "Extrapulmonary tuberculosis in children",
  ],

  publications: [
    "Evaluation of Oxygen Saturation Index (OSI) as a non-invasive tool and comparison with Oxygenation Index (OI) in Hypoxemic Respiratory Failure: A Prospective Observational Study",

    "Evaluation of Gene Xpert (CBNAAT) in extrapulmonary tuberculosis in children",

    "Unusual Neonatal Presentation of Leucocyte Adhesion Defect Type 1: Case Report",
  ],

  opd: {
    days: [],
    timing: "",
  },
},
{
  id: "d-002",
  slug: "dr-qayoom-yousuf",
  name: "Dr. Qayoom Yousuf",
  designation: "Consultant – Interventional Cardiology",
  speciality: "Interventional Cardiology",
  specialitySlug: "interventional-cardiology",
  department: "cardiac",

  qualification: "MBBS, MD (Internal Medicine), DM (Cardiology), Fellowship in Interventional Cardiology",

  image: "/images/doctors/qayoom-yousuf.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/heart-specialist-in-jabalpur/",

  languages: ["English", "Hindi"],

  summary:
    "Dr. Qayoom Yousuf is an experienced Interventional Cardiologist providing advanced cardiac care at Apollo JBP Hospitals, Jabalpur. With specialized training in Cardiology and Interventional Cardiology, he focuses on the diagnosis and treatment of coronary artery disease, heart failure, arrhythmias, structural heart conditions and other cardiovascular disorders.",

  about: [
    "Dr. Qayoom Yousuf is an experienced Interventional Cardiologist providing advanced cardiac care at Apollo JBP Hospitals, Jabalpur. With specialized training in Cardiology and Interventional Cardiology, he focuses on the diagnosis and treatment of coronary artery disease, heart failure, arrhythmias, structural heart conditions and other cardiovascular disorders.",

    "Patients looking for an experienced cardiologist in Jabalpur can consult Dr. Qayoom Yousuf for comprehensive heart care, including coronary angiography, angioplasty, cardiac imaging, echocardiography, Cardiac implantable electronic devices & Congenital heart disease related procedures.",

    "As an Interventional Cardiologist in Jabalpur, Dr. Qayoom Yousuf has clinical experience in coronary interventions, advanced coronary imaging, cardiac catheterisation and cardiac device implantation. His approach combines detailed cardiac evaluation, evidence-based treatment and appropriate interventional procedures based on each patient’s condition."
  ],

  qualifications: [
    {
      degree: "MBBS",
      institute: "Government Medical College, Srinagar",
      year: ""
    },
    {
      degree: "MD (Internal Medicine)",
      institute: "SKIMS, Srinagar",
      year: ""
    },
    {
      degree: "DM (Cardiology)",
      institute: "SKIMS, Srinagar",
      year: ""
    },
    {
      degree: "Fellowship in Interventional Cardiology",
      institute: "SKIMS, Srinagar",
      year: ""
    }
  ],

  highlights: [
    {
      value: "5,000+",
      label: "Coronary Angiograms"
    },
    {
      value: "1,000+",
      label: "PCI Procedures"
    },
    {
      value: "500+",
      label: "Device Implantations"
    }
  ],

  expertise: [
    "Coronary Angiography and Angioplasty (PCI) – Stenting, drug balloons",
    "Coronary Artery Disease Management",
    "Acute and Chronic Coronary Syndromes",
    "Coronary Imaging – IVUS and OCT",
    "Coronary Physiology – FFR",
    "Heart Failure Management",
    "Arrhythmia Evaluation and Management",
    "Echocardiography – TTE and TEE",
    "ECG, Holter and Treadmill Testing",
    "Pacemaker, ICD Implantation & CRT devices",
    "Structural Heart Procedures",
    "ASD, VSD and PDA Device Closure",
    "Peripheral and Renal Artery Interventions",
    "Balloon Valvotomy, including PTMC, BAVD, PVBD",
    "Cardiac Catheterisation"
  ],

  conditions: [
    "Chest Pain",
    "Coronary artery disease and blocked arteries",
    "Heart attack and acute coronary syndromes",
    "Heart failure",
    "Heart rhythm disorders and arrhythmias",
    "Structural heart diseases",
    "Congenital heart conditions",
    "Valvular heart conditions",
    "Peripheral vascular conditions",
    "Conditions requiring pacemaker, ICD implantation or CRT devices"
  ],

  interests: [
    "TAVI / TAVR",
    "Renal Denervation"
  ],

  experience:
    "Dr. Qayoom Yousuf has extensive experience in coronary angiography and PCI. His documented cumulative experience includes performing more than 5,000 coronary angiograms & more than 1,000 PCI’s. He has also performed more than 500 cardiac device implantations. His expertise also includes advanced coronary imaging using IVUS and OCT, coronary physiology assessment using FFR, cardiac device procedures, structural heart interventions, selected peripheral vascular procedures & echocardiography.",

  training: [],

  research: [],

  publications: [],

  diagnosticServices: [
    "Echocardiography (TTE, TEE, Pediatric & Fetal Echocardiography)",
    "ECG",
    "Holter monitoring",
    "Treadmill testing",
    "Cardiac catheterization",
    "Diagnostic coronary angiography & angioplasty (PCI)",
    "Coronary imaging and physiology",
    "Cardiac device implantation",
    "ASD, PDA, VSD device closure"
  ],

  whyConsult:
    "Timely evaluation of heart-related symptoms and risk factors can help identify cardiovascular problems early. Patients experiencing chest discomfort, breathlessness, palpitations, unusual fatigue, dizziness or other concerning symptoms should seek appropriate medical evaluation.",

  opd: {
    days: [],
    timing: ""
  }
},

{
  id: "d-003",
  slug: "dr-akanksha-choudhary",
  name: "Dr. Akanksha Choudhary",
  designation: "Associate Consultant – Critical Care",
  speciality: "Critical Care",
  specialitySlug: "critical-care",
  department: "critical-care",

  qualification:
    "DNB – Anaesthesiology, MD – Anaesthesiology & Critical Care, MBBS",

  image: "/images/doctors/akanksha.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/consultant-critical-care-specialist-in-jabalpur/",

  languages: [],

  summary:
    "Dr. Akanksha Choudhary is a Critical Care Specialist in Jabalpur and Associate Consultant at Apollo JBP Hospitals, Jabalpur, with expertise in the management of critically ill patients and intensive care.",

  about: [
    "Dr. Akanksha Choudhary is a Critical Care Specialist in Jabalpur and Associate Consultant at Apollo JBP Hospitals, Jabalpur, with expertise in the management of critically ill patients and intensive care.",

    "She is a board-certified physician with extensive clinical exposure to critical care units, emergency care, trauma ICU and HDU management. Her clinical expertise includes ventilator management, haemodynamic support, critical patient monitoring, emergency resuscitation and management of critically ill patients.",

    "With her background in Anaesthesiology & Critical Care, Dr. Akanksha brings a comprehensive approach to the management of patients requiring intensive monitoring, organ support and emergency critical care."
  ],

  qualifications: [
    {
      degree: "DNB – Anaesthesiology",
      institute: "National Board of Examinations, New Delhi",
      year: ""
    },
    {
      degree: "MD – Anaesthesiology & Critical Care",
      institute:
        "MGM Medical College & Maharaja Yashwantrao Hospital, Indore",
      year: ""
    },
    {
      degree: "MBBS",
      institute: "Netaji Subhash Chandra Bose Medical College, Jabalpur",
      year: ""
    }
  ],

  highlights: [
    {
      value: "ICU",
      label: "Critical Care"
    },
    {
      value: "DNB",
      label: "Anaesthesiology"
    },
    {
      value: "MD",
      label: "Critical-Care"
    }
  ],

  expertise: [
    "Critical Care Medicine",
    "ICU Management",
    "Ventilator Management",
    "Haemodynamic Support",
    "Inotrope Management",
    "Trauma ICU Management",
    "HDU Management",
    "Emergency Critical Care",
    "Emergency Resuscitation",
    "Critical Patient Monitoring",
    "Perioperative Critical Care",
    "Difficult Airway Management",
    "Arterial Line Placement",
    "Central Line Procedures",
    "Sepsis & Critical Care Protocols",
    "General & Super-Specialty Anaesthesia",
    "CTVS Anaesthesia",
    "Neuro Anaesthesia",
    "Pediatric Anaesthesia",
    "Orthopedic & Urology Anaesthesia",
    "Trauma & Emergency Anaesthesia",
    "Regional Anaesthesia",
    "Ultrasound-Guided Nerve Blocks",
    "Spinal, Epidural & Combined Spinal-Epidural Anaesthesia",
    "Post-operative Pain Management"
  ],

  experience:
    "Dr. Akanksha Choudhary has clinical experience across critical care, anaesthesiology, emergency care, trauma ICU and HDU settings. She currently works as Associate Consultant – Critical Care at Apollo JBP Hospitals, Jabalpur.",

  experienceDetails: [
    {
      designation: "Associate Consultant – Critical Care",
      hospital: "Apollo JBP Hospitals, Jabalpur",
      description:
        "Dr. Akanksha currently works as a Consultant in Critical Care, providing comprehensive management for critically ill patients requiring intensive monitoring and critical care support."
    },
    {
      designation: "Consultant – Anaesthesiology",
      hospital: "Cloudnine Hospital, Punjabi Bagh, New Delhi",
      description:
        "Clinical experience in managing patients across surgical and critical care settings."
    },
    {
      designation: "Junior Consultant – Anaesthesiology",
      hospital: "Motherhood Hospital, Gurugram, Haryana",
      description:
        "Clinical experience in anaesthesia and perioperative patient management."
    },
    {
      designation: "Senior Resident – Anaesthesiology",
      hospital: "Aruna Asaf Ali Government Hospital, Delhi",
      responsibilities: [
        "Management of trauma and emergency cases",
        "ICU care",
        "Ventilator management",
        "Haemodynamic support",
        "Emergency airway management",
        "Perioperative patient management"
      ]
    },
    {
      designation: "Senior Resident – Anaesthesiology & Critical Care",
      hospital: "VMMC & Safdarjung Hospital, New Delhi",
      responsibilities: [
        "Perioperative ICU care",
        "Critical care management",
        "Difficult airway management",
        "Arterial and central line procedures",
        "Management of critically ill patients in a tertiary-care setting"
      ]
    },
    {
      designation: "Senior Resident – Anaesthesiology & Critical Care",
      hospital: "NSCB Medical College, Jabalpur",
      responsibilities: [
        "Trauma ICU and HDU management",
        "Ventilator management",
        "Inotrope management",
        "Emergency case management",
        "Critical patient monitoring"
      ]
    },
    {
      designation: "Junior Resident – Anaesthesiology & Critical Care",
      hospital:
        "MGM Medical College & Maharaja Yashwantrao Hospital, Indore",
      responsibilities: [
        "Perioperative care",
        "Emergency resuscitation",
        "ICU procedures",
        "Ventilator support",
        "Critical patient monitoring"
      ]
    }
  ],

  training: [
    "BLS – Basic Life Support (AHA Certified)",
    "ACLS – Advanced Cardiovascular Life Support",
    "COLS Instructor – Indian Resuscitation Society",
    "USG-Guided Regional Anaesthesia Workshop"
  ],

  research: [
    "Comparison of Ropivacaine vs. Ropivacaine with Fentanyl for Post-Operative Analgesia in Total Hip Replacement (THR) and Total Knee Replacement (TKR) Surgeries."
  ],

  researchDetails:
    "The research included pain scoring, patient-controlled analgesia monitoring, side-effect profiling and recovery outcomes.",

  publications: [],

  professionalApproach:
    "Dr. Akanksha Choudhary is committed to providing evidence-based critical care with a patient-centred approach. Her clinical practice focuses on careful assessment of critically ill patients, continuous monitoring, ventilatory support, haemodynamic management, emergency care and comprehensive ICU management. Her combined background in Anaesthesiology and Critical Care enables her to contribute to the management of complex and critically ill patients requiring advanced intensive care.",

  opd: {
    days: [],
    timing: ""
  }
},


{
  id: "d-004",
  slug: "dr-nagaraj-kandagal",
  name: "Dr. Nagaraj Kandagal",
  designation: "Consultant Anaesthesiologist & Intensivist",
  speciality: "Anaesthesiology & Critical Care",
  specialitySlug: "anaesthesiology-critical-care",
  department: "critical-care",

  qualification: "MBBS, MD (Anaesthesiology)",

  image: "/images/doctors/nagaraj.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/anaesthesia-specialist-in-jabalpur/",

  languages: [
    "English",
    "Kannada",
    "Hindi",
    "Telugu"
  ],

  summary:
    "Dr. Nagaraj Kandagal is an experienced Anaesthesiologist and Intensivist in Jabalpur, with expertise in Anaesthesiology and Critical Care. He has clinical experience in managing patients across diverse surgical specialities and critical care settings.",

  about: [
    "Dr. Nagaraj Kandagal is an experienced Anaesthesiologist and Intensivist in Jabalpur, with expertise in Anaesthesiology and Critical Care. He has clinical experience in managing patients across diverse surgical specialities and critical care settings.",

    "His clinical expertise includes ultrasound-guided nerve blocks, difficult airway management, central and arterial line placement, ventilator management and intensive care. He has also gained experience in Neuro Anaesthesia, Cardiac Anaesthesia, Obstetric Anaesthesia, Pediatric Anaesthesia and Orthopedic Anaesthesia.",

    "Dr. Nagaraj is committed to providing safe, evidence-based anaesthetic and critical care with a focus on comprehensive perioperative management and intensive care."
  ],

  highlights: [
    {
      value: "MD",
      label: "Anaesthesiology"
    },
    {
      value: "ICU",
      label: "Intensive Care"
    },
    {
      value: "4",
      label: "Languages"
    }
  ],

  expertise: [
    "General Anaesthesia",
    "Neuro Anaesthesia",
    "Cardiac Anaesthesia",
    "Pediatric Anaesthesia",
    "Obstetric Anaesthesia",
    "Orthopedic Anaesthesia",
    "Regional Anaesthesia",
    "Ultrasound-Guided Nerve Blocks",
    "Difficult Airway Management",
    "Critical Care Medicine",
    "Ventilator Management",
    "Central Line Placement",
    "Arterial Line Placement",
    "Thoracocentesis",
    "Paracentesis",
    "Percutaneous Tracheostomy",
    "Pain Management"
  ],

  experience:
    "Dr. Nagaraj Kandagal has clinical experience in anaesthesia and intensive care across diverse surgical specialities and critical care settings.",

  experienceDetails: [
    {
      designation: "Anaesthesiologist & Intensivist",
      hospital: "Sudha Hospital & MRC, Kota",
      description:
        "Experienced in anaesthesia and intensive care, including the management of critically ill patients, critical care procedures and ventilator management."
    },

    {
      designation: "Intensivist",
      hospital: "KLES Dr. Prabhakar Kore Hospital & MRC, Belagavi",
      responsibilities: [
        "Management of a wide range of ICU cases",
        "Critical care procedures",
        "Ventilator management",
        "Intensive care monitoring and patient management",
        "Anaesthesia experience through locum duties"
      ]
    },

    {
      designation: "Anaesthesiology Residency",
      hospital: "K. S. Hegde Medical Academy",
      description:
        "During postgraduate training, developed expertise in:",
      responsibilities: [
        "Neuro Anaesthesia",
        "Cardiac Anaesthesia",
        "Pediatric Anaesthesia",
        "Orthopedic Anaesthesia",
        "Obstetric Anaesthesia",
        "Regional Anaesthesia",
        "Pain Management",
        "Intensive Care"
      ]
    }
  ],

  training: [
    "Basic Life Support (BLS) – American Heart Association",
    "Advanced Cardiac Life Support (ACLS) – American Heart Association",
    "International Trauma Life Support (ITLS)"
  ],

  research: [
    "Anatomical Location of Vocal Cords in Relation to Cervical Vertebrae – A New Predictor of Difficult Laryngoscopy"
  ],

  researchDetails:
    "Dr. Nagaraj has contributed to academic work and presentations in the field of Anaesthesiology. His research focused on the anatomical location of the vocal cords in relation to cervical vertebrae and its relevance in predicting difficult laryngoscopy. He has also presented a case on Pre-eclampsia and participated in various academic conferences, CMEs and workshops related to airway management, critical care and anaesthesia.",

  publications: [],

  professionalApproach:
    "Dr. Nagaraj Kandagal believes in delivering safe, precise and patient-focused anaesthesia and critical care, supported by careful clinical assessment, advanced airway management, appropriate monitoring and comprehensive intensive care.",

  consultationCta:
    "Consult Dr. Nagaraj Kandagal at Apollo JBP Hospitals, Jabalpur for Anaesthesiology & Critical Care.",

  opd: {
    days: [],
    timing: ""
  }
}
,


{
  id: "d-005",
  slug: "dr-jayaram-k",
  name: "Dr. Jayaram K",
  designation: "Senior Consultant Medical Gastroenterologist & Hepatologist",
  speciality: "Gastroenterology & Hepatology",
  specialitySlug: "gastroenterology-hepatology",
  department: "gastro",

  qualification:
    "MBBS, MD (General Medicine), DM (Gastroenterology)",

  image: "/images/doctors/jayaram.jpeg",

  profileUrl:
    "https://apollojbphospitals.com/doctor/bestgastroenterologist-in-jabalpur/",

  languages: [],

  summary:
    "Dr. Jayaram K is a Senior Consultant Medical Gastroenterologist and Hepatologist, with qualifications including MBBS, MD (General Medicine), and DM (Gastroenterology). He has extensive experience in medical gastroenterology and hepatology across multi-speciality and tertiary-care hospital settings.",

  about: [
    "Dr. Jayaram K is a Senior Consultant Medical Gastroenterologist and Hepatologist, with qualifications including MBBS, MD (General Medicine), and DM (Gastroenterology). He completed his MBBS from Andhra Medical College, MD in General Medicine from Rangaraya Medical College, and DM in Gastroenterology from Andhra Medical College.",

    "With extensive experience in medical gastroenterology and hepatology, Dr. Jayaram K has worked across multi-speciality and tertiary-care hospital settings. His professional experience includes working as a Consultant Medical Gastroenterologist at Apollo Hospitals, Kakinada, and later as a Senior Consultant Medical Gastroenterologist at Apollo Hospitals, Arilova Health City, Visakhapatnam. He has also served as a Senior Consultant Medical Gastroenterologist and Hepatologist at Kiran Multispeciality Hospitals, Surat."
  ],

  highlights: [
    {
      value: "DM",
      label: "Gastroenterology"
    },
    {
      value: "2014",
      label: "DM Completed"
    },
    {
      value: "EUS",
      label: "Advanced Endoscopy"
    }
  ],

  expertise: [
    "Gastrointestinal Care",
    "Gastrointestinal Endoscopy",
    "Upper Gastrointestinal Endoscopy",
    "Colonoscopy",
    "ERCP",
    "Therapeutic Endoscopy",
    "Hepatology & Liver Care",
    "Endoscopic Ultrasound (EUS)",
    "Peroral Endoscopic Myotomy (POEM)",
    "Esophageal Variceal Ligation",
    "Esophageal Dilatation",
    "Polypectomy",
    "Argon Plasma Coagulation",
    "Glue Injection Therapy",
    "Gastrointestinal and Biliary Stent Placement",
    "Therapeutic Ascitic Fluid Drainage",
    "Nasojejunal Tube Placement",
    "Hemoclip Application",
    "Bipolar Coagulation"
  ],

  experience:
    "Dr. Jayaram K has extensive professional experience in medical gastroenterology and hepatology across multi-speciality and tertiary-care hospital settings.",

  experienceDetails: [
    {
      designation: "Consultant Physician",
      hospital: "Vamsi Hospitals, Kothagudem",
      description:
        "Managed medical emergencies at the beginning of his professional career."
    },
    {
      designation: "Consultant Medical Gastroenterologist",
      hospital: "Apollo Hospitals, Kakinada",
      period: "2014–2016"
    },
    {
      designation: "Consultant Medical Gastroenterologist",
      hospital: "Hope International Hospital, Kakinada"
    },
    {
      designation: "Senior Consultant Medical Gastroenterologist",
      hospital: "Apollo Hospitals, Arilova Health City, Visakhapatnam"
    },
    {
      designation:
        "Senior Consultant Medical Gastroenterologist and Hepatologist",
      hospital: "Kiran Multispeciality Hospitals, Surat",
      period: "Since April 2023"
    }
  ],

  clinicalProcedures: [
    "Upper GI Endoscopy",
    "Colonoscopy",
    "ERCP",
    "Therapeutic Endoscopy",
    "Endoscopic Ultrasound (EUS)",
    "Peroral Endoscopic Myotomy (POEM)",
    "Esophageal Variceal Ligation",
    "Esophageal Dilatation",
    "Polypectomy",
    "Argon Plasma Coagulation",
    "Glue Injection Therapy",
    "Gastrointestinal and Biliary Stent Placement",
    "Therapeutic Ascitic Fluid Drainage",
    "Nasojejunal Tube Placement",
    "Hemoclip Application",
    "Bipolar Coagulation"
  ],

  training: [],

  research: [
    "Hepatitis C genotype prevalence and treatment in coastal Andhra Pradesh"
  ],

  researchDetails:
    "Dr. Jayaram K is committed to continuous learning and regularly works towards upgrading his clinical skills. He has presented abstracts at national conferences of the Indian Society of Gastroenterology and INASAL. His academic work includes research on Hepatitis C genotype prevalence and treatment in coastal Andhra Pradesh, reflecting his interest in hepatology and liver disease management.",

  publications: [],

  professionalApproach:
    "Dr. Jayaram K provides comprehensive specialist care in gastroenterology and hepatology, with experience in gastrointestinal endoscopy, colonoscopy, ERCP and therapeutic endoscopy.",

  consultationCta:
    "Patients looking for a gastroenterologist in Jabalpur or specialized care for gastrointestinal and liver-related conditions can consult Dr. Jayaram K, Senior Consultant Medical Gastroenterologist & Hepatologist, at Apollo JBP Hospitals, Jabalpur.",

  opd: {
    days: [],
    timing: ""
  }
},

{
  id: "d-006",
  slug: "dr-devashish-chhuttani",
  name: "Dr. Devashish Chhuttani",
  designation: "Consultant Orthopaedic Surgeon",
  speciality: "Orthopaedics",
  specialitySlug: "orthopaedics",
  department: "orthopaedics",

  qualification:
    "MBBS, MS (Orthopaedics), Fellowship in Advanced Arthroscopy & Sports Medicine, Fellowship Training in Robotic Knee Arthroplasty",

  experience: "8+ years",

  image: "/images/doctors/devashish.webp",

  profileUrl: "",

  languages: [],

  summary:
    "Dr. Devashish Chhuttani is a Consultant Orthopaedic Surgeon with over 8 years of experience in Complex Trauma, Joint Replacement, Arthroscopy, and Sports Medicine. He is currently practicing at Apollo Hospital, Jabalpur.",

  about: [
    "Dr. Devashish Chhuttani is a Consultant Orthopaedic Surgeon with over 8 years of experience in Complex Trauma, Joint Replacement, Arthroscopy, and Sports Medicine.",

    "He completed his MBBS from Government Stanley Medical College, Chennai, and MS Orthopaedics from MGM Medical College, Indore, where he was awarded a Gold Medal. He further served as Senior Resident in the Department of Orthopaedics at AIIMS, New Delhi — the premier and most prestigious medical institute of the country.",

    "Dr. Chhuttani has completed advanced fellowships in Robotic Knee Arthroplasty and Advanced Arthroscopy & Sports Medicine. He is currently practicing at Apollo Hospital, Jabalpur. His areas of expertise include Robotic Total Knee Replacement, Primary and Revision Hip & Knee Arthroplasty, Pelvic-Acetabulum fracture fixation, and advanced arthroscopic procedures for knee and shoulder injuries.",

    "A gold medalist and active academician, he has 11+ indexed publications in national and international journals and has received multiple awards for research presentations. He is dedicated to providing advanced, minimally invasive, and patient-centered orthopaedic care."
  ],

  highlights: [
    {
      value: "8+",
      label: "Years Experience"
    },
    {
      value: "11+",
      label: "Indexed Publications"
    },
    {
      value: "Gold",
      label: "Medalist"
    }
  ],

  expertise: [
    "Robotic Knee Replacement Surgery",
    "Total Knee Replacement",
    "Hip Replacement Surgery",
    "Revision Joint Replacement",
    "ACL Reconstruction",
    "PCL Reconstruction",
    "Meniscus Repair",
    "Shoulder Arthroscopy",
    "Rotator Cuff Repair",
    "Sports Injury Management",
    "Cartilage Preservation Procedures",
    "Complex Trauma Surgery",
    "Pelvic & Acetabular Fractures",
    "Polytrauma Management",
    "Upper & Lower Limb Fractures",
    "Arthritis Management",
    "Knee Pain Treatment",
    "Hip Pain Management",
    "Shoulder Disorders",
    "Minimally Invasive Orthopaedic Surgery",
    "Deformity Correction Surgery",
    "Hand, Foot & Ankle Surgery",
    "Spine Trauma Surgery",
    "Paediatric Orthopaedic Surgery"
  ],

  expertiseCategories: [
    {
      category: "Robotic Joint Replacement",
      items: [
        "Robotic Knee Replacement Surgery",
        "Total Knee Replacement",
        "Hip Replacement Surgery",
        "Revision Joint Replacement"
      ]
    },
    {
      category: "Arthroscopy & Sports Medicine",
      items: [
        "ACL Reconstruction",
        "PCL Reconstruction",
        "Meniscus Repair",
        "Shoulder Arthroscopy",
        "Rotator Cuff Repair",
        "Sports Injury Management",
        "Cartilage Preservation Procedures"
      ]
    },
    {
      category: "Trauma & Fracture Care",
      items: [
        "Complex Trauma Surgery",
        "Pelvic & Acetabular Fractures",
        "Polytrauma Management",
        "Upper & Lower Limb Fractures"
      ]
    },
    {
      category: "Joint Preservation",
      items: [
        "Arthritis Management",
        "Knee Pain Treatment",
        "Hip Pain Management",
        "Shoulder Disorders"
      ]
    },
    {
      category: "Advanced Orthopaedic Procedures",
      items: [
        "Minimally Invasive Orthopaedic Surgery",
        "Deformity Correction Surgery",
        "Hand, Foot & Ankle Surgery",
        "Spine Trauma Surgery",
        "Paediatric Orthopaedic Surgery"
      ]
    }
  ],

  conditions: [
    "Knee Arthritis",
    "Hip Arthritis",
    "Sports Injuries",
    "Ligament Tears (ACL/PCL)",
    "Meniscus Injuries",
    "Shoulder Instability",
    "Rotator Cuff Tears",
    "Complex Fractures",
    "Joint Deformities",
    "Knee Pain",
    "Hip Pain",
    "Shoulder Pain",
    "Polytrauma Injuries"
  ],

  qualifications: [
    {
      degree: "MBBS",
      institute: "Government Stanley Medical College, Chennai",
      year: ""
    },
    {
      degree: "MS (Orthopaedics)",
      institute: "MGM Medical College, Indore",
      year: ""
    },
    {
      degree: "Fellowship in Advanced Arthroscopy & Sports Medicine",
      institute: "",
      year: ""
    },
    {
      degree: "Fellowship Training in Robotic Knee Arthroplasty",
      institute: "",
      year: ""
    },
    {
      degree: "FIBA (IAOS)",
      institute: "",
      year: ""
    },
    {
      degree: "FIFA (Sports Medicine)",
      institute: "",
      year: ""
    },
    {
      degree: "FRKA (Arthroplasty)",
      institute: "",
      year: ""
    },
    {
      degree: "AO Trauma Training",
      institute: "AIIMS, New Delhi",
      year: ""
    }
  ],

  experienceDetails: [
    {
      designation: "Senior Registrar, Department of Orthopaedics",
      hospital: "AIIMS, New Delhi",
      description:
        "Former Senior Registrar at AIIMS, New Delhi — described in the source as the premier and most prestigious medical institute of the country. Gold Medalist."
    },
    {
      designation: "Fellow",
      hospital: "",
      description: "Advanced Arthroscopy & Sports Medicine"
    },
    {
      designation: "Fellow",
      hospital: "",
      description: "Robotic Knee Arthroplasty"
    },
    {
      designation: "Academic Resident, Department of Orthopaedics",
      hospital: "MGM Medical College & MY Hospital, Indore",
      description: "Former Academic Resident. Gold Medalist."
    }
  ],

  training: [
    "Fellowship in Advanced Arthroscopy & Sports Medicine",
    "Fellowship Training in Robotic Knee Arthroplasty",
    "FIBA (IAOS)",
    "FIFA (Sports Medicine)",
    "FRKA (Arthroplasty)",
    "AO Trauma Training – AIIMS, New Delhi"
  ],

  research: [],

  researchDetails:
    "Dr. Devashish Chhuttani is an active academician with 11+ indexed publications in national and international journals. He has also received multiple awards for research presentations.",

  publications: [
    "11+ indexed publications in national and international journals"
  ],

  awards: [
    "Gold Medalist – MS Orthopaedics",
    "Multiple awards for research presentations"
  ],

  whyChoose: [
    "Gold Medalist Orthopaedic Surgeon",
    "Expertise in conventional and Robotic Knee Replacement",
    "Fellowship-Trained Arthroscopy & Sports Medicine Specialist",
    "Former Orthopaedic Senior Registrar from prestigious institute AIIMS, New Delhi",
    "Advanced Trauma & Joint Preservation Specialist",
    "Minimally Invasive Surgical Expertise",
    "Evidence-Based, Patient-Centered Treatment",
    "Focus on Faster Recovery & Early Rehabilitation"
  ],

  professionalApproach:
    "He is dedicated to providing advanced, minimally invasive, and patient-centered orthopaedic care.",

  consultationCta:
    "If you are looking for an Orthopaedic Surgeon in Jabalpur, Robotic Knee Replacement Surgeon in Jabalpur, Sports Injury Specialist in Jabalpur, Arthroscopy Surgeon in Jabalpur, or an expert for joint replacement, fractures, ligament injuries, arthritis, and trauma care, consult Dr. Devashish Chhuttani at Apollo JBP Hospitals, Jabalpur for advanced orthopaedic treatment with world-class expertise.",

  opd: {
    days: [],
    timing: ""
  }
}
,
{
  id: "d-007",
  slug: "dr-vijayendra-reddy-chinta",
  name: "Dr. Vijayendra Reddy Chinta",
  designation: "Consultant – Neurology",
  speciality: "Neurology",
  specialitySlug: "neurology",
  department: "neuro",

  qualification:
    "DrNB in Neurology, SCE Neurology – Royal College of Physicians (UK)",

  experience:
    "Dr. Vijayendra Reddy Chinta has served as Consultant Neurologist at Amara Hospital, Tirupati, and Assistant Professor in Neurology at Sri Venkateswara Institute of Medical Sciences (SVIMS), Tirupati.",

  image: "/images/doctors/vijayendra.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/neurologist-in-jabalpur/",

  languages: [],

  summary:
    "Dr. Vijayendra Reddy Chinta is a highly experienced Neurologist in Jabalpur specializing in the diagnosis, advanced procedural intervention, and long-term management of complex disorders of the brain, spinal cord, nerves, and muscles. He is recognized for his patient-centric approach and evidence-based practice, with expertise spanning acute stroke care, refractory epilepsy, migraine, Parkinson’s disease, memory disorders, and complex neuromuscular illnesses.",

  about: [
    "Dr. Vijayendra Reddy Chinta is a highly experienced Neurologist in Jabalpur specializing in the diagnosis, advanced procedural intervention, and long-term management of complex disorders of the brain, spinal cord, nerves, and muscles. Recognized for his patient-centric approach and evidence-based practice, he is committed to delivering precision neurological care in Central India.",

    "If you are searching for a Stroke Specialist in Jabalpur, Movement Disorder Expert, or Nerve Specialist in Jabalpur, Dr. Vijayendra provides comprehensive evaluations and specialized interventions. His clinical expertise spans acute stroke care, refractory epilepsy, migraine, Parkinson’s disease, memory disorders, and complex neuromuscular illnesses.",

    "Dr. Vijayendra completed his DrNB in Neurology from Manipal Hospital, Bengaluru and holds the prestigious SCE Neurology certification from the Royal College of Physicians (UK).",

    "He previously served as Consultant Neurologist at Amara Hospital, Tirupati, and Assistant Professor in Neurology at Sri Venkateswara Institute of Medical Sciences (SVIMS), Tirupati, bringing deep clinical, academic, and interventional expertise to patient care.",

    "At Apollo JBP Hospitals, he leads the Neurology Department in offering advanced diagnostic modalities such as Transcranial Doppler (TCD), Polysomnography (Sleep Studies), and Video-EEG Monitoring, alongside specialized bedside interventions like Deep Brain Stimulation (DBS) programming and Therapeutic Botox Injections."
  ],

  highlights: [
    {
      value: "DrNB",
      label: "Neurology"
    },
    {
      value: "SCE",
      label: "Neurology – UK"
    },
    {
      value: "DBS",
      label: "Programming"
    }
  ],

  expertise: [
    "Deep Brain Stimulation (DBS) Programming",
    "Movement Disorders",
    "Parkinson’s Disease",
    "Dystonia",
    "Essential Tremor",
    "Complex Parkinsonian Syndromes",
    "Therapeutic Botox Injections",
    "Chronic Migraine",
    "Hemifacial Spasm",
    "Blepharospasm",
    "Focal Dystonias",
    "Post-Stroke Spasticity",
    "Transcranial Doppler (TCD) Ultrasound",
    "Acute Stroke Evaluation",
    "Intracranial Stenosis Assessment",
    "Vasospasm Monitoring",
    "Long-Term Video-EEG Monitoring",
    "Epilepsy Monitoring",
    "Refractory Epilepsy Evaluation",
    "Polysomnography (Sleep Study)",
    "Sleep Apnea Evaluation",
    "Restless Legs Syndrome",
    "Complex Sleep-Related Neurological Disorders"
  ],

  expertiseCategories: [
    {
      category: "Advanced Movement Disorders & DBS",
      items: [
        "Deep Brain Stimulation (DBS) Programming for Parkinson’s disease",
        "Deep Brain Stimulation (DBS) Programming for dystonia",
        "Deep Brain Stimulation (DBS) Programming for essential tremor",
        "Management of complex parkinsonian syndromes"
      ]
    },
    {
      category: "Specialized Neuro-Interventions",
      items: [
        "Therapeutic Botox Injections for chronic migraine",
        "Therapeutic Botox Injections for hemifacial spasm",
        "Therapeutic Botox Injections for blepharospasm",
        "Therapeutic Botox Injections for focal dystonias",
        "Therapeutic Botox Injections for post-stroke spasticity"
      ]
    },
    {
      category: "Neurovascular Diagnostics",
      items: [
        "Transcranial Doppler (TCD) Ultrasound",
        "Acute stroke evaluation",
        "Intracranial stenosis assessment",
        "Vasospasm monitoring"
      ]
    },
    {
      category: "Epilepsy & Neurophysiology",
      items: [
        "Continuous Long-Term Video-EEG",
        "Epilepsy Monitoring",
        "Precise seizure classification",
        "Refractory epilepsy evaluation"
      ]
    },
    {
      category: "Sleep Medicine",
      items: [
        "Polysomnography (Sleep Study)",
        "Sleep apnea evaluation",
        "Restless legs syndrome evaluation",
        "Complex sleep-related neurological disorders"
      ]
    }
  ],

  conditions: [
    "Brain Stroke (Ischemic & Hemorrhagic, TIA)",
    "Neurovascular Diseases",
    "Parkinson’s Disease & Tremor Disorders",
    "Post-DBS Parkinson’s Disease Optimization",
    "Migraine",
    "Chronic Tension Headaches",
    "Neuralgias",
    "Epilepsy",
    "Seizures",
    "Unexplained Syncope",
    "Sleep Apnea",
    "Sleep-Related Neurological Disorders",
    "Alzheimer’s Disease",
    "Dementia",
    "Memory Impairment",
    "Peripheral Neuropathy",
    "Radiculopathy (Cervical & Lumbar)",
    "Movement Disorders",
    "Dystonia",
    "Spasticity",
    "Vertigo",
    "Balance Disorders",
    "Ataxia",
    "Multiple Sclerosis",
    "Myasthenia Gravis",
    "Neuro-Immunology Disorders",
    "Bell’s Palsy",
    "Facial Nerve Disorders"
  ],

  qualifications: [
    {
      degree: "DrNB in Neurology",
      institute: "Manipal Hospital, Bengaluru",
      year: ""
    },
    {
      degree: "SCE Neurology",
      institute: "Royal College of Physicians (UK)",
      year: ""
    }
  ],

  experienceDetails: [
    {
      designation: "Consultant Neurologist",
      hospital: "Amara Hospital, Tirupati",
      description:
        "Served as Consultant Neurologist with clinical expertise in neurological diagnosis, management and specialized interventions."
    },
    {
      designation: "Assistant Professor – Neurology",
      hospital:
        "Sri Venkateswara Institute of Medical Sciences (SVIMS), Tirupati",
      description:
        "Served as Assistant Professor in Neurology with clinical and academic experience."
    },
    {
      designation: "Consultant – Neurology",
      hospital: "Apollo JBP Hospitals, Jabalpur",
      description:
        "Leads the Neurology Department and provides advanced neurological evaluation, diagnostics and specialized neurological interventions."
    }
  ],

  training: [
    "DrNB in Neurology – Manipal Hospital, Bengaluru",
    "SCE Neurology – Royal College of Physicians (UK)"
  ],

  research: [
    "Clinical research and academic work in stroke",
    "Clinical research and academic work in epilepsy",
    "Clinical research and academic work in neurogenetics",
    "Clinical research and academic work in dementia"
  ],

  researchDetails:
    "Dr. Vijayendra is actively involved in clinical research and academic neurology. His scholarly contributions, including presentations and original research in stroke, epilepsy, neurogenetics, and dementia, have been recognized internationally and published by the European Stroke Organisation – World Stroke Organization (ESO-WSO).",

  publications: [
    "Research and scientific contributions published by the European Stroke Organisation – World Stroke Organization (ESO-WSO)"
  ],

  diagnosticServices: [
    "Transcranial Doppler (TCD) Ultrasound",
    "Polysomnography (Sleep Studies)",
    "Video-EEG Monitoring",
    "Long-Term Video-EEG & Epilepsy Monitoring"
  ],

  specializedInterventions: [
    "Deep Brain Stimulation (DBS) Programming",
    "Therapeutic Botox Injections",
    "Transcranial Doppler (TCD) Ultrasound",
    "Long-Term Video-EEG & Epilepsy Monitoring",
    "Polysomnography (Sleep Study)"
  ],

  whyChoose: [
    "Specialized procedural skill in DBS programming, TCD ultrasound, Therapeutic Botox and Sleep Diagnostics",
    "International research credentials through research and scientific contributions published by the European Stroke Organisation – World Stroke Organization (ESO-WSO)",
    "UK-certified excellence with Specialty Certificate in Neurology (SCE Neurology, UK)",
    "Comprehensive neuro-diagnostics including advanced Epilepsy Monitoring (EEG) and Sleep Studies (Polysomnography)",
    "Evidence-based and patient-centric neurological care",
    "Modern, guideline-driven treatment tailored to individual clinical needs"
  ],

  professionalApproach:
    "Dr. Vijayendra is committed to delivering precision neurological care through an evidence-based and patient-centric approach. His practice focuses on comprehensive neurological evaluation, advanced diagnostics, specialized procedural interventions and personalized long-term management.",

  consultationCta:
    "Consult Dr. Vijayendra Reddy Chinta, Consultant – Neurology, at Apollo JBP Hospitals, Jabalpur for expert neurological evaluation, advanced diagnostics, specialized interventions and personalized care.",

  opd: {
    days: [],
    timing: ""
  }
}
,

{
  id: "d-008",
  slug: "dr-surabhi-kaushik",
  name: "Dr. Surabhi Kaushik",
  designation: "Consultant – Radiodiagnosis & Imaging",
  speciality: "Radiodiagnosis & Imaging",
  specialitySlug: "radiodiagnosis-imaging",
  department: "radiology",

  qualification:
    "MD – Radiodiagnosis, DNB – Radiodiagnosis, MBBS",

  experience:
    "Dr. Surabhi Kaushik has worked as Assistant Professor and Consultant Radiologist at Amrita Hospital & Medical College, Faridabad, and as Consultant Radiologist at Deep Medical Centre, New Delhi and Moolchand Khairati Ram Hospital, New Delhi. She has also served as Senior Resident at Vardhman Mahavir Medical College & Safdarjung Hospital, New Delhi and G.B. Pant Hospital & Maulana Azad Medical College, New Delhi.",

  image: "/images/doctors/surabhi.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/radiologist-in-jabalpur-2/",

  languages: [],

  summary:
    "Dr. Surabhi Kaushik is a highly skilled Radiologist in Jabalpur with extensive expertise in diagnostic and interventional imaging. She has trained at renowned institutions including Dr. Ram Manohar Lohia Hospital, New Delhi, and has served as a Consultant Radiologist and Assistant Professor at reputed hospitals and medical colleges. She specializes in accurate and timely diagnosis using advanced imaging technologies and provides comprehensive diagnostic imaging services at Apollo JBP Hospitals, Jabalpur.",

  about: [
    "Dr. Surabhi Kaushik is a highly skilled Radiologist in Jabalpur with extensive expertise in diagnostic and interventional imaging. She has trained at renowned institutions, including Dr. Ram Manohar Lohia Hospital, New Delhi, and has served as a Consultant Radiologist and Assistant Professor at reputed hospitals and medical colleges.",

    "With a patient-centric and evidence-based approach, Dr. Kaushik specializes in accurate and timely diagnosis using advanced imaging technologies, enabling clinicians to make informed treatment decisions. Her commitment to precision and quality makes her an integral part of multidisciplinary patient care.",

    "At Apollo JBP Hospitals, Jabalpur, she provides comprehensive diagnostic imaging services using advanced radiology techniques for patients of all age groups."
  ],

  highlights: [
    {
      value: "MD",
      label: "Radio-diagnosis"
    },
    {
      value: "DNB",
      label: "Radiodiagnosis"
    },
    {
      value: "Imaging",
      label: "Diagnostic & Interventional"
    }
  ],

  expertise: [
    "Ultrasound (USG)",
    "Doppler Studies",
    "CT Scan Reporting",
    "MRI Reporting",
    "Digital X-Ray Reporting",
    "Mammography",
    "Women’s Imaging",
    "Abdominal Imaging",
    "Neuro Imaging",
    "Chest Imaging",
    "Musculoskeletal Imaging",
    "Non-Vascular Interventions",
    "Image-Guided Biopsies",
    "Image-Guided Drainage Procedures",
    "Emergency Radiology",
    "Routine & Advanced Ultrasound",
    "Colour Doppler Studies",
    "CT & MRI Interpretation",
    "Mammography Reporting",
    "Neuro & Spine Imaging",
    "Cardiac Imaging",
    "Image-Guided FNAC & Biopsies",
    "Emergency Imaging"
  ],

  expertiseCategories: [
    {
      category: "Diagnostic Imaging",
      items: [
        "Routine & Advanced Ultrasound",
        "CT Scan Reporting",
        "MRI Reporting",
        "CT & MRI Interpretation",
        "Digital X-Ray Reporting",
        "Emergency Imaging"
      ]
    },
    {
      category: "Ultrasound & Doppler",
      items: [
        "Ultrasound (USG)",
        "Colour Doppler Studies",
        "Doppler Studies"
      ]
    },
    {
      category: "Women’s Imaging",
      items: [
        "Mammography",
        "Mammography Reporting",
        "Women’s Imaging",
        "Endometriosis MRI"
      ]
    },
    {
      category: "Specialized Imaging",
      items: [
        "Neuro Imaging",
        "Neuro & Spine Imaging",
        "Cardiac Imaging",
        "Abdominal Imaging",
        "Chest Imaging",
        "Musculoskeletal Imaging"
      ]
    },
    {
      category: "Interventional Radiology",
      items: [
        "Non-Vascular Interventions",
        "Image-Guided Biopsies",
        "Image-Guided FNAC & Biopsies",
        "Image-Guided Drainage Procedures"
      ]
    }
  ],

  conditions: [
    "Dementia-related imaging evaluation",
    "Endometriosis imaging evaluation"
  ],

  qualifications: [
    {
      degree: "MD – Radiodiagnosis",
      institute:
        "Postgraduate Institute of Medical Education & Research, Dr. Ram Manohar Lohia Hospital, New Delhi",
      year: ""
    },
    {
      degree: "DNB – Radiodiagnosis",
      institute: "National Board of Examinations (NBE)",
      year: ""
    },
    {
      degree: "MBBS",
      institute: "Late B.R.K. Memorial Government Medical College, Chhattisgarh",
      year: ""
    }
  ],

  experienceDetails: [
    {
      designation: "Assistant Professor and Consultant Radiologist",
      hospital: "Amrita Hospital & Medical College, Faridabad",
      description:
        "Worked as Assistant Professor and Consultant Radiologist with clinical and academic experience in diagnostic imaging."
    },
    {
      designation: "Consultant Radiologist",
      hospital: "Deep Medical Centre, New Delhi",
      description:
        "Worked as Consultant Radiologist with experience in diagnostic radiology and imaging."
    },
    {
      designation: "Consultant Radiologist",
      hospital: "Moolchand Khairati Ram Hospital, New Delhi",
      description:
        "Worked as Consultant Radiologist with experience in diagnostic imaging."
    },
    {
      designation: "Senior Resident",
      hospital:
        "Vardhman Mahavir Medical College & Safdarjung Hospital, New Delhi",
      description:
        "Worked as Senior Resident in Radiology."
    },
    {
      designation: "Senior Resident",
      hospital:
        "G.B. Pant Hospital & Maulana Azad Medical College, New Delhi",
      description:
        "Worked as Senior Resident in Radiology."
    }
  ],

  clinicalProcedures: [
    "Ultrasound (USG)",
    "Colour Doppler Studies",
    "CT Scan Reporting",
    "MRI Reporting",
    "Digital X-Ray Reporting",
    "Mammography Reporting",
    "Image-Guided FNAC",
    "Image-Guided Biopsies",
    "Image-Guided Drainage Procedures",
    "Non-Vascular Interventions",
    "Emergency Imaging"
  ],

  training: [],

  research: [
    "MRI Visual Rating Scales in Dementia",
    "Cardiac Imaging",
    "Women’s Imaging",
    "Endometriosis MRI"
  ],

  researchDetails:
    "Dr. Kaushik has contributed to multiple national and international publications and scientific presentations in the field of Radiology. Her research interests include MRI Visual Rating Scales in Dementia, Cardiac Imaging, Women’s Imaging, and Endometriosis MRI. She has presented her work at prestigious radiology conferences, reflecting her commitment to academic excellence and continuous learning.",

  publications: [
    "Multiple national and international publications in the field of Radiology"
  ],

  professionalMemberships: [
    "Radiological Society of North America (RSNA)",
    "Indian Radiological & Imaging Association (IRIA)",
    "European Society of Radiology (ESR)",
    "Korean Society of Radiology (KSR)"
  ],

  professionalApproach:
    "Dr. Kaushik follows a patient-centric and evidence-based approach, focusing on accurate and timely diagnosis using advanced imaging technologies. Her practice emphasizes precision, quality, safety and multidisciplinary patient care.",

  whyChoose: [
    "Experienced Radiologist in Jabalpur",
    "Expertise in Advanced Diagnostic Imaging",
    "Specialist in CT, MRI, Ultrasound & Mammography",
    "Accurate & Timely Diagnostic Reporting",
    "Evidence-Based Imaging with International Standards",
    "Multidisciplinary Approach to Patient Care",
    "Dedicated to Precision, Safety & Clinical Excellence"
  ],

  consultationCta:
    "Consult Dr. Surabhi Kaushik, Consultant – Radiodiagnosis & Imaging, at Apollo JBP Hospitals, Jabalpur for comprehensive diagnostic imaging, advanced radiology services, women’s imaging, and image-guided procedures.",

  opd: {
    days: [],
    timing: ""
  }
}
,

{
  id: "d-009",
  slug: "dr-milind-h-gaidhane",
  name: "Dr. Milind H. Gaidhane",
  designation: "Consultant – Anaesthesiology",
  speciality: "Anaesthesiology",
  specialitySlug: "anaesthesiology",
  department: "anaesthesiology",

  qualification:
    "DNB (Anaesthesiology), Diploma in Anaesthesiology (D.A.), MBBS",

  experience: "8+ years",

  image: "/images/doctors/milind.webp",

  profileUrl: "",

  languages: [],

  summary:
    "Dr. Milind H. Gaidhane is a Consultant Anaesthesiologist at Apollo JBP Hospitals, Jabalpur, with over 8 years of experience in anaesthesiology and perioperative patient care. He has extensive experience in administering anaesthesia for a wide range of surgical procedures, with a focus on patient safety before, during, and after surgery.",

  about: [
    "Dr. Milind H. Gaidhane is a Consultant Anaesthesiologist at Apollo JBP Hospitals, Jabalpur, with over 8 years of experience in anaesthesiology and perioperative patient care. He has extensive experience in administering anaesthesia for a wide range of surgical procedures, ensuring patient safety before, during, and after surgery.",

    "Dr. Gaidhane has previously worked as an Anaesthesiologist and Intensivist at several reputed multispecialty hospitals, where he gained valuable experience in managing high-risk surgical patients, advanced airway techniques, and perioperative care.",

    "At Apollo JBP Hospitals, his role is dedicated to providing comprehensive anaesthesia services for elective and emergency surgical procedures.",

    "He is committed to delivering safe, evidence-based anaesthesia with a strong focus on patient comfort, precision, and surgical excellence."
  ],

  highlights: [
    {
      value: "8+",
      label: "Years Experience"
    },
    {
      value: "DNB",
      label: "Anaesthesiology"
    },
    {
      value: "ICU",
      label: "Intensivist Experience"
    }
  ],

  expertise: [
    "General Anaesthesia",
    "Regional Anaesthesia",
    "Neuro Anaesthesia",
    "High-Risk Surgical Anaesthesia",
    "Difficult Airway Management",
    "Fiberoptic Bronchoscopy-Assisted Intubation",
    "Ultrasound-Guided Regional Nerve Blocks",
    "Perioperative Patient Management",
    "Pre-Anaesthetic Evaluation",
    "Intraoperative Monitoring",
    "Post-Operative Pain Management",
    "Day Care & Major Surgical Anaesthesia"
  ],

  expertiseCategories: [
    {
      category: "Anaesthesia",
      items: [
        "General Anaesthesia",
        "Regional Anaesthesia",
        "Neuro Anaesthesia",
        "High-Risk Surgical Anaesthesia",
        "Day Care & Major Surgical Anaesthesia"
      ]
    },
    {
      category: "Advanced Airway Management",
      items: [
        "Difficult Airway Management",
        "Fiberoptic Bronchoscopy-Assisted Intubation"
      ]
    },
    {
      category: "Regional & Pain Management",
      items: [
        "Ultrasound-Guided Regional Nerve Blocks",
        "Post-Operative Pain Management"
      ]
    },
    {
      category: "Perioperative Care",
      items: [
        "Perioperative Patient Management",
        "Pre-Anaesthetic Evaluation",
        "Intraoperative Monitoring"
      ]
    }
  ],

  conditions: [
    "High-Risk Surgical Cases",
    "Patients Requiring Difficult Airway Management",
    "Patients Requiring Neuro Anaesthesia",
    "Patients Requiring Regional Anaesthesia",
    "Patients Requiring Perioperative Pain Management",
    "Elective Surgical Cases",
    "Emergency Surgical Cases"
  ],

  qualifications: [
    {
      degree: "DNB (Anaesthesiology)",
      institute: "National Board of Examinations, New Delhi",
      year: ""
    },
    {
      degree: "Diploma in Anaesthesiology (D.A.)",
      institute: "TNMC & Nair Charitable Hospital, Mumbai",
      year: ""
    },
    {
      degree: "MBBS",
      institute: "Government Medical College, Nagpur",
      year: ""
    }
  ],

  experienceDetails: [
    {
      designation: "Consultant Anaesthesiologist",
      hospital: "Apollo JBP Hospitals, Jabalpur",
      description:
        "Provides comprehensive anaesthesia services for elective and emergency surgical procedures, with a focus on patient safety, comfort and perioperative care."
    },
    {
      designation: "Anaesthesiologist",
      hospital: "",
      description:
        "Worked at several reputed multispecialty hospitals across Maharashtra and Chhattisgarh, administering anaesthesia for various surgical specialties and managing complex perioperative cases."
    },
    {
      designation: "Intensivist",
      hospital: "",
      description:
        "Earlier worked as an Intensivist, gaining experience in managing high-risk surgical patients and emergency situations."
    }
  ],

  clinicalInterests: [
    "High-Risk Surgical Anaesthesia",
    "Neuro Anaesthesia",
    "Regional Anaesthesia",
    "Advanced Airway Management",
    "Perioperative Patient Safety",
    "Pain Management",
    "Evidence-Based Anaesthesia Practice"
  ],

  training: [
    "International Critical Care Update (ICCU)",
    "Mechanical Ventilation Workshop",
    "Hemodynamic Monitoring Workshop",
    "American Heart Association – BLS & ACLS Certification",
    "NIMACON (National Anaesthesia Conference)",
    "Chronic Pain & Interventional Pain Management Workshops"
  ],

  research: [],

  researchDetails: "",

  publications: [],

  whyChoose: [
    "Experienced Anaesthesiologist in Jabalpur",
    "Expertise in High-Risk Surgical Anaesthesia",
    "Skilled in Advanced Airway Management",
    "Experienced in Regional & Neuro Anaesthesia",
    "Focused on Safe Perioperative Care",
    "Patient-Centric and Evidence-Based Practice",
    "Dedicated to Delivering Safe Anaesthesia for All Surgical Specialties"
  ],

  professionalApproach:
    "Dr. Gaidhane is committed to delivering safe, evidence-based anaesthesia with a strong focus on patient comfort, precision, perioperative safety, and surgical excellence.",

  consultationCta:
    "Consult Dr. Milind H. Gaidhane, Consultant Anaesthesiologist, at Apollo JBP Hospitals, Jabalpur, for expert pre-operative assessment, safe anaesthesia care, and comprehensive perioperative management.",

  opd: {
    days: [],
    timing: ""
  }
}
,

{
  id: "d-010",
  slug: "dr-mrunali-u-nikhare",
  name: "Dr. Mrunali U. Nikhare",
  designation: "Consultant – Emergency Medicine",
  speciality: "Emergency Medicine",
  specialitySlug: "emergency-medicine",
  department: "emergency",

  qualification:
    "DNB – Emergency Medicine, FRCEM Primary, MBBS",

  experience:
    "Dr. Mrunali U. Nikhare has extensive experience in emergency medicine, trauma, critical care, and management of life-threatening conditions. Her professional experience includes roles at Mehta Medicare Hospital, Pune, AIIMS Nagpur, Deenanath Mangeshkar Hospital, Pune, and other emergency medicine settings.",

  image: "/images/doctors/mrunali.webp",

  profileUrl: "",

  languages: [],

  summary:
    "Dr. Mrunali U. Nikhare is a highly skilled Emergency Medicine Specialist in Jabalpur with extensive experience in managing medical emergencies, trauma, critical care, and life-threatening conditions. She has trained and worked at leading institutions including AIIMS Nagpur and Deenanath Mangeshkar Hospital & Research Centre, Pune, where she managed high-acuity emergency cases and trauma patients.",

  about: [
    "Dr. Mrunali U. Nikhare is a highly skilled Emergency Medicine Specialist in Jabalpur with extensive experience in managing medical emergencies, trauma, critical care, and life-threatening conditions. She has trained and worked at leading institutions, including AIIMS Nagpur and Deenanath Mangeshkar Hospital & Research Centre, Pune, where she managed high-acuity emergency cases and trauma patients.",

    "She has expertise in rapid diagnosis, resuscitation, trauma care, emergency procedures, and stabilization of critically ill patients. Her patient-first approach, combined with evidence-based emergency care and advanced life support skills, enables timely intervention in life-threatening situations.",

    "At Apollo JBP Hospitals, Jabalpur, Dr. Nikhare is committed to delivering prompt, compassionate, and comprehensive emergency care for patients of all age groups."
  ],

  highlights: [
    {
      value: "DNB",
      label: "Emergency-Medicine"
    },
    {
      value: "FRCEM",
      label: "Primary – UK"
    },
    {
      value: "AIIMS",
      label: "Emergency Medicine"
    }
  ],

  expertise: [
    "Emergency Medicine",
    "Trauma & Polytrauma Management",
    "Advanced Cardiac Life Support (ACLS)",
    "Advanced Trauma Life Support (ATLS)",
    "Emergency Resuscitation",
    "Medical Emergencies",
    "Surgical Emergencies",
    "Pediatric Emergency Care",
    "Stroke Emergency Management",
    "Acute Cardiac Emergencies",
    "Poisoning & Toxicology",
    "Sepsis & Septic Shock Management",
    "Ventilator Management",
    "Emergency Ultrasound (FAST)",
    "Difficult Airway Management",
    "Central Venous Access",
    "Chest Tube Insertion"
  ],

  expertiseCategories: [
    {
      category: "Emergency & Critical Care",
      items: [
        "Emergency Medicine",
        "Medical Emergencies",
        "Surgical Emergencies",
        "Emergency Resuscitation",
        "Sepsis & Septic Shock Management",
        "Ventilator Management"
      ]
    },
    {
      category: "Trauma & Resuscitation",
      items: [
        "Trauma & Polytrauma Management",
        "Advanced Trauma Life Support (ATLS)",
        "Emergency Resuscitation",
        "FAST Ultrasound in Trauma",
        "Emergency Thrombolysis",
        "Fracture Splinting",
        "Wound Management & Suturing"
      ]
    },
    {
      category: "Cardiac & Neurological Emergencies",
      items: [
        "Advanced Cardiac Life Support (ACLS)",
        "Acute Cardiac Emergencies",
        "Cardioversion & Defibrillation",
        "Stroke Emergency Management",
        "Emergency Thrombolysis"
      ]
    },
    {
      category: "Airway & Critical Procedures",
      items: [
        "Difficult Airway Management",
        "Endotracheal Intubation",
        "Emergency Airway Management",
        "Cricothyroidotomy",
        "Central Venous Catheter Placement",
        "Chest Tube Insertion",
        "Mechanical Ventilation"
      ]
    },
    {
      category: "Specialized Emergency Care",
      items: [
        "Pediatric Emergency Care",
        "Poisoning & Toxicology",
        "Emergency Ultrasound (FAST)",
        "Femoral Nerve Block"
      ]
    }
  ],

  conditions: [
    "Medical Emergencies",
    "Surgical Emergencies",
    "Trauma & Polytrauma",
    "Life-Threatening Conditions",
    "Acute Cardiac Emergencies",
    "Stroke Emergencies",
    "Sepsis & Septic Shock",
    "Poisoning & Toxicology Emergencies",
    "Critical Illness",
    "Pediatric Emergencies",
    "High-Acuity Emergency Cases",
    "Difficult Airway Emergencies"
  ],

  qualifications: [
    {
      degree: "DNB – Emergency Medicine",
      institute:
        "Deenanath Mangeshkar Hospital & Research Centre, Pune",
      year: ""
    },
    {
      degree: "FRCEM Primary",
      institute: "Royal College of Emergency Medicine, London, UK",
      year: ""
    },
    {
      degree: "MBBS",
      institute: "Seth G.S. Medical College & KEM Hospital, Mumbai",
      year: ""
    }
  ],

  experienceDetails: [
    {
      designation: "In-Charge – Emergency & Intensive Care Unit",
      hospital: "Mehta Medicare Hospital, Pune",
      description:
        "Managed emergency and intensive care services and critically ill patients."
    },
    {
      designation: "Senior Resident – Department of Trauma & Emergency",
      hospital: "AIIMS Nagpur",
      description:
        "Managed high-acuity emergency and trauma cases at a leading tertiary-care institution."
    },
    {
      designation: "Associate Consultant – Emergency Medicine",
      hospital: "Deenanath Mangeshkar Hospital, Pune",
      description:
        "Provided emergency medicine care and management of critically ill and trauma patients."
    },
    {
      designation: "Senior Registrar – Emergency Medicine",
      hospital: "",
      description:
        "Worked in emergency medicine with experience in acute and critical care."
    },
    {
      designation: "DNB Resident – Emergency Medicine",
      hospital: "",
      description:
        "Completed postgraduate training in Emergency Medicine."
    },
    {
      designation: "Medical Officer",
      hospital: "Primary Health Centre, Maharashtra",
      description:
        "Provided medical care in a primary healthcare setting."
    }
  ],

  clinicalProcedures: [
    "Adult & Pediatric CPR",
    "Endotracheal Intubation",
    "Difficult Airway Management",
    "Central Venous Catheter Placement",
    "Chest Tube Insertion",
    "Cardioversion & Defibrillation",
    "FAST Ultrasound in Trauma",
    "Emergency Thrombolysis",
    "Cricothyroidotomy",
    "Wound Management & Suturing",
    "Fracture Splinting",
    "Femoral Nerve Block",
    "Mechanical Ventilation",
    "Emergency Airway Management"
  ],

  training: [
    "International Critical Care Update (ICCU)",
    "Mechanical Ventilation Workshop",
    "Hemodynamic Monitoring Workshop",
    "NIMACON (National Anaesthesia Conference)",
    "Chronic Pain & Interventional Pain Management Workshops"
  ],

  certifications: [
    "Advanced Cardiovascular Life Support (ACLS)",
    "Basic Life Support (BLS)",
    "Advanced Trauma Life Support (ATLS)",
    "Basic FATE (Focused Transthoracic Echocardiography) Certification",
    "Maharashtra Medical Council Registered Medical Practitioner"
  ],

  research: [
    "Point-of-Care Lung Ultrasound and NT-proBNP in the diagnosis of Acute Heart Failure"
  ],

  researchDetails:
    "Dr. Nikhare conducted research on Point-of-Care Lung Ultrasound and NT-proBNP in the diagnosis of Acute Heart Failure, submitted as her DNB thesis. She remains actively engaged in evidence-based emergency medicine and continuous professional development.",

  publications: [],

  professionalApproach:
    "Dr. Nikhare follows a patient-first, evidence-based and protocol-driven approach to emergency care, with a focus on rapid diagnosis, timely resuscitation, stabilization of critically ill patients and compassionate management of life-threatening conditions.",

  whyChoose: [
    "Experienced Emergency Medicine Specialist in Jabalpur",
    "Expertise in Trauma & Critical Care",
    "AIIMS Nagpur–trained Emergency Physician",
    "Skilled in Advanced Life Support & Emergency Procedures",
    "Evidence-based, protocol-driven emergency care",
    "Rapid diagnosis and treatment of life-threatening conditions",
    "Compassionate, patient-centric approach",
    "Comprehensive emergency care for adults and children"
  ],

  consultationCta:
    "Consult Dr. Mrunali U. Nikhare, Emergency Medicine Specialist at Apollo JBP Hospitals, Jabalpur, for expert management of trauma, critical illnesses, medical emergencies, surgical emergencies, and emergency stabilization.",

  opd: {
    days: [],
    timing: ""
  }
}
,

{
  id: "d-011",
  slug: "dr-suresh-babu-vallepu",
  name: "Dr. Suresh Babu Vallepu",
  designation: "Consultant Neurologist",
  speciality: "Neurology",
  specialitySlug: "neurology",
  department: "neuro",

  qualification:
    "DM – Neurology, MD – General Medicine, MBBS",

  experience:
    "Dr. Suresh Babu Vallepu has worked as Consultant Neurologist at Russh Hospital, Hyderabad and Vikaas Hospital, Guntur.",

  image: "/images/doctors/suresh.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/best-neurologist-in-jabalpur/",

  languages: [],

  summary:
    "Dr. Suresh Babu Vallepu is a highly experienced Consultant Neurologist at Apollo JBP Hospitals, Jabalpur, specializing in the diagnosis and treatment of a wide range of neurological disorders. He completed his DM in Neurology from Govind Ballabh Pant Hospital (GB Pant Hospital), New Delhi, and provides evidence-based neurological care using advanced diagnostic techniques.",

  about: [
    "Dr. Suresh Babu Vallepu is a highly experienced Consultant Neurologist at Apollo JBP Hospitals, Jabalpur, specializing in the diagnosis and treatment of a wide range of neurological disorders. Having completed his DM in Neurology from the prestigious Govind Ballabh Pant Hospital (GB Pant Hospital), New Delhi, he brings advanced expertise in managing complex neurological conditions with evidence-based care and the latest diagnostic techniques.",

    "Recognized as one of the trusted neurologists in Jabalpur, Dr. Suresh has extensive experience in the management of acute stroke, epilepsy, Parkinson’s disease, movement disorders, neuropathy, sleep disorders, muscle disorders, and demyelinating diseases. He is committed to delivering timely diagnosis, personalized treatment plans, and long-term neurological rehabilitation to improve patients’ quality of life.",

    "At Apollo JBP Hospitals, Jabalpur, Dr. Suresh performs comprehensive neurological evaluations and advanced neurodiagnostic procedures, including EEG, EMG, and Nerve Conduction Studies (NCS). He also has expertise in Botox therapy for movement disorders and chronic headaches, along with advanced pain management procedures such as Transforaminal Epidural Block.",

    "Patients looking for the best neurologist in Jabalpur, stroke specialist in Jabalpur, epilepsy doctor in Jabalpur, Parkinson’s disease specialist in Jabalpur, or a brain and nerve specialist can rely on Dr. Suresh Babu Vallepu for compassionate, patient-centered neurological care backed by advanced technology and clinical excellence."
  ],

  highlights: [
    {
      value: "DM",
      label: "Neurology"
    },
    {
      value: "EEG",
      label: "Neurodiagnostics"
    },
    {
      value: "EMG",
      label: "Nerve & Muscle Testing"
    }
  ],

  expertise: [
    "Acute Stroke Management",
    "Epilepsy Treatment",
    "Parkinson’s Disease",
    "Movement Disorders",
    "Neuropathy",
    "Demyelinating Disorders (Multiple Sclerosis)",
    "Muscle Disorders",
    "Sleep Disorders",
    "Headache & Migraine Management",
    "Botox Therapy for Neurological Disorders",
    "EEG (Electroencephalography)",
    "EMG (Electromyography)",
    "Nerve Conduction Studies (NCS)",
    "Pain Management",
    "Transforaminal Epidural Block",
    "Neuro Rehabilitation"
  ],

  expertiseCategories: [
    {
      category: "Stroke & Neurovascular Care",
      items: [
        "Acute Stroke Management",
        "Stroke Prevention & Rehabilitation"
      ]
    },
    {
      category: "Epilepsy & Neurodiagnostics",
      items: [
        "Epilepsy Treatment",
        "EEG (Electroencephalography)",
        "EMG (Electromyography)",
        "Nerve Conduction Studies (NCS)",
        "Neurodiagnostic Services"
      ]
    },
    {
      category: "Movement Disorders",
      items: [
        "Parkinson’s Disease",
        "Movement Disorders",
        "Movement Disorder Clinic",
        "Botox Therapy for Neurological Disorders"
      ]
    },
    {
      category: "Neuromuscular & Demyelinating Disorders",
      items: [
        "Neuropathy",
        "Demyelinating Disorders (Multiple Sclerosis)",
        "Muscle Disorders",
        "Neuromuscular Disorders"
      ]
    },
    {
      category: "Headache, Sleep & Pain",
      items: [
        "Headache & Migraine Management",
        "Sleep Disorders",
        "Sleep Medicine",
        "Pain Management",
        "Transforaminal Epidural Block"
      ]
    },
    {
      category: "Rehabilitation",
      items: [
        "Neuro Rehabilitation"
      ]
    }
  ],

  conditions: [
    "Acute Stroke",
    "Epilepsy",
    "Parkinson’s Disease",
    "Movement Disorders",
    "Neuropathy",
    "Demyelinating Disorders",
    "Multiple Sclerosis",
    "Muscle Disorders",
    "Sleep Disorders",
    "Headache & Migraine",
    "Neurological Disorders Requiring Botox Therapy"
  ],

  qualifications: [
    {
      degree: "DM – Neurology",
      institute: "Govind Ballabh Pant Hospital (GB Pant Hospital), New Delhi",
      year: ""
    },
    {
      degree: "MD – General Medicine",
      institute: "KIMS, Narketpally",
      year: ""
    },
    {
      degree: "MBBS",
      institute: "CAIMS, Karimnagar",
      year: ""
    }
  ],

  experienceDetails: [
    {
      designation: "Consultant Neurologist",
      hospital: "Russh Hospital, Hyderabad",
      description:
        "Worked as Consultant Neurologist with experience in neurological diagnosis and management."
    },
    {
      designation: "Consultant Neurologist",
      hospital: "Vikaas Hospital, Guntur",
      description:
        "Worked as Consultant Neurologist with experience in neurological diagnosis and treatment."
    },
    {
      designation: "Consultant Neurologist",
      hospital: "Apollo JBP Hospitals, Jabalpur",
      description:
        "Provides comprehensive neurological evaluation, advanced neurodiagnostic procedures and evidence-based treatment."
    }
  ],

  clinicalProcedures: [
    "EEG (Electroencephalography)",
    "EMG (Electromyography)",
    "Nerve Conduction Studies (NCS)",
    "Botox Therapy for Movement Disorders",
    "Botox Therapy for Chronic Headaches",
    "Transforaminal Epidural Block"
  ],

  areasOfSpecialInterest: [
    "Stroke Prevention & Rehabilitation",
    "Epilepsy Care",
    "Parkinson’s Disease Management",
    "Movement Disorder Clinic",
    "Headache & Migraine Treatment",
    "Sleep Medicine",
    "Neuromuscular Disorders",
    "Neurodiagnostic Services",
    "Comprehensive Neurology Care"
  ],

  training: [],

  research: [],

  researchDetails: "",

  publications: [],

  professionalMemberships: [
    "Indian Stroke Association",
    "Indian Epilepsy Association",
    "Movement Disorders Society of India"
  ],

  whyChoose: [
    "DM Neurology from GB Pant Hospital, New Delhi",
    "Expertise in advanced stroke and epilepsy management",
    "Comprehensive treatment for Parkinson’s disease and movement disorders",
    "Advanced neurological investigations including EEG, EMG & NCS",
    "Specialized Botox therapy for movement disorders and chronic headaches",
    "Patient-focused, evidence-based neurological care"
  ],

  professionalApproach:
    "Dr. Suresh is committed to delivering timely diagnosis, personalized treatment plans, long-term neurological rehabilitation, and compassionate, patient-centered care backed by advanced technology and clinical excellence.",

  consultationCta:
    "Consult Dr. Suresh Babu Vallepu, Consultant Neurologist at Apollo JBP Hospitals, Jabalpur, for expert management of stroke, epilepsy, Parkinson’s disease, movement disorders, neuropathy, sleep disorders, muscle disorders and other neurological conditions.",

  opd: {
    days: [],
    timing: ""
  }
}
,


{
  id: "d-012",
  slug: "dr-ashwini-samay-chavan",
  name: "Dr. Ashwini Samay Chavan",
  designation: "Endodontist & Root Canal Specialist",
  speciality: "Dentistry",
  specialitySlug: "dentistry",
  department: "dentistry",

  qualification:
    "BDS (Bachelor of Dental Surgery), PGDCC, D-Ortho",

  experience:
    "Dr. Ashwini Samay Chavan has extensive experience in Endodontics, Root Canal Treatment, Restorative Dentistry, Cosmetic Dentistry, General Dental Care, Conservative Dental Treatments and Smile Rehabilitation.",

  image: "/images/doctors/ashwinichavan.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/best-dentist-in-jabalpur/",

  languages: [],

  summary:
    "Dr. Ashwini Samay Chavan is a highly skilled Dentist in Jabalpur with expertise in Root Canal Treatment (RCT), Endodontics, Restorative Dentistry, Cosmetic Dentistry, and General Dental Care. She is dedicated to providing advanced, painless, and patient-focused dental treatments that help preserve natural teeth and improve overall oral health.",

  about: [
    "Dr. Ashwini Samay Chavan is a highly skilled Dentist in Jabalpur with expertise in Root Canal Treatment (RCT), Endodontics, Restorative Dentistry, Cosmetic Dentistry, and General Dental Care. She is dedicated to providing advanced, painless, and patient-focused dental treatments that help preserve natural teeth and improve overall oral health.",

    "At Apollo JBP Hospitals, Jabalpur, Dr. Ashwini offers comprehensive dental solutions ranging from routine dental check-ups to complex endodontic treatments and smile restoration procedures. Her clinical approach focuses on accurate diagnosis, personalized treatment planning, and long-term oral health outcomes.",

    "Her expertise in painless root canal treatment in Jabalpur makes her a preferred choice for patients seeking effective and comfortable dental care."
  ],

  highlights: [
    {
      value: "BDS",
      label: "Dental Surgery"
    },
    {
      value: "RCT",
      label: "Root Canal Specialist"
    },
    {
      value: "PGDCC",
      label: "Advanced Dental Training"
    }
  ],

  expertise: [
    "Endodontics",
    "Root Canal Treatment",
    "Single Sitting Root Canal Treatment",
    "Multi-Visit Root Canal Treatment",
    "Re-Root Canal Treatment (RCT Retreatment)",
    "Complex Endodontic Procedures",
    "Dental Infection Management",
    "Tooth Pain Treatment",
    "Tooth-Colored Fillings",
    "Smile Enhancement Procedures",
    "Aesthetic Dental Restorations",
    "Tooth Reconstruction",
    "Dental Crowns & Bridges",
    "Restoration of Damaged Teeth",
    "Dental Consultation & Oral Health Assessment",
    "Preventive Dental Care",
    "Gum Disease Management",
    "Dental Cleaning & Oral Hygiene Guidance",
    "Pediatric Dental Care",
    "Comprehensive Treatment Planning",
    "Clinical Endodontics and Restorative Dentistry",
    "Manual and Rotary Root Canal Systems",
    "Simple to Complex Root Canal Procedures",
    "Endodontic Retreatment Cases",
    "Conservative Dental Treatments",
    "Smile Rehabilitation Procedures",
    "Oral Health Management",
    "Preventive Dentistry",
    "Patient Counseling and Dental Education"
  ],

  expertiseCategories: [
    {
      category: "Root Canal Treatment & Endodontics",
      items: [
        "Single Sitting Root Canal Treatment",
        "Multi-Visit Root Canal Treatment",
        "Re-Root Canal Treatment (RCT Retreatment)",
        "Complex Endodontic Procedures",
        "Dental Infection Management",
        "Tooth Pain Treatment",
        "Manual and Rotary Root Canal Systems",
        "Simple to Complex Root Canal Procedures",
        "Endodontic Retreatment Cases"
      ]
    },
    {
      category: "Cosmetic & Restorative Dentistry",
      items: [
        "Tooth-Colored Fillings",
        "Smile Enhancement Procedures",
        "Aesthetic Dental Restorations",
        "Tooth Reconstruction",
        "Dental Crowns & Bridges",
        "Restoration of Damaged Teeth",
        "Smile Rehabilitation Procedures"
      ]
    },
    {
      category: "General Dental Care",
      items: [
        "Dental Consultation & Oral Health Assessment",
        "Preventive Dental Care",
        "Gum Disease Management",
        "Dental Cleaning & Oral Hygiene Guidance",
        "Pediatric Dental Care",
        "Comprehensive Treatment Planning",
        "Oral Health Management",
        "Preventive Dentistry",
        "Patient Counseling and Dental Education"
      ]
    },
    {
      category: "Conservative Dentistry",
      items: [
        "Clinical Endodontics and Restorative Dentistry",
        "Conservative Dental Treatments"
      ]
    }
  ],

  conditions: [
    "Dental Infections",
    "Tooth Pain",
    "Damaged Teeth",
    "Gum Disease",
    "Dental Conditions Requiring Root Canal Treatment",
    "Dental Conditions Requiring Endodontic Retreatment"
  ],

  qualifications: [
    {
      degree: "BDS (Bachelor of Dental Surgery)",
      institute: "",
      year: ""
    },
    {
      degree: "PGDCC",
      institute: "",
      year: ""
    },
    {
      degree: "D-Ortho",
      institute: "",
      year: ""
    }
  ],

  experienceDetails: [],

  clinicalProcedures: [
    "Single Sitting Root Canal Treatment",
    "Multi-Visit Root Canal Treatment",
    "Re-Root Canal Treatment (RCT Retreatment)",
    "Complex Endodontic Procedures",
    "Dental Infection Management",
    "Tooth-Colored Fillings",
    "Aesthetic Dental Restorations",
    "Tooth Reconstruction",
    "Dental Crowns & Bridges",
    "Restoration of Damaged Teeth",
    "Dental Cleaning",
    "Smile Rehabilitation Procedures"
  ],

  training: [],

  research: [],

  researchDetails: "",

  publications: [],

  professionalMemberships: [
    "Indian Dental Association (IDA)",
    "Indian Association of Conservative Dentistry & Endodontics (IACDE)"
  ],

  whyChoose: [
    "Experienced Endodontist in Jabalpur",
    "Advanced Root Canal Treatment Specialist",
    "Expertise in Cosmetic & Restorative Dentistry",
    "Comprehensive General Dental Care",
    "Personalized Treatment Planning",
    "Focus on Tooth Preservation & Long-Term Oral Health",
    "Modern Techniques for Comfortable Dental Treatment"
  ],

  professionalApproach:
    "Dr. Ashwini follows a patient-focused clinical approach centered on accurate diagnosis, personalized treatment planning, comfortable dental treatment, tooth preservation and long-term oral health.",

  consultationCta:
    "Consult Dr. Ashwini Samay Chavan at Apollo JBP Hospitals, Jabalpur for expert root canal treatment, cosmetic dentistry, tooth pain treatment, smile restoration, restorative dentistry, dental fillings, preventive dental care, and comprehensive oral health solutions.",

  opd: {
    days: [],
    timing: ""
  }
}
,


{
  id: "d-013",
  slug: "dr-virendra-bhad",
  name: "Dr. Virendra Bhad",
  designation:
    "Consultant Medical Gastroenterologist, Hepatologist & Advanced Endoscopy Specialist",
  speciality: "Gastroenterology & Endoscopy",
  specialitySlug: "gastroenterology-endoscopy",
  department: "gastro",

  qualification:
    "DM (Medical Gastroenterology), MD (General Medicine), MBBS",

  experience:
    "Dr. Virendra Bhad has extensive experience in medical gastroenterology, hepatology, advanced endoscopy, digestive diseases, liver disorders, pancreatic and biliary disorders, and gastrointestinal emergency care.",

  image: "/images/doctors/virendra.jpeg",

  profileUrl:
    "https://apollojbphospitals.com/doctor/medical-gastroenterologist-in-jabalpur/",

  languages: [],

  summary:
    "Dr. Virendra Bhad is a dedicated and highly skilled Medical Gastroenterologist in Jabalpur with expertise in the prevention, diagnosis, and treatment of disorders affecting the digestive system, liver, pancreas, gallbladder, and intestines. Having completed DM in Medical Gastroenterology, he specializes in managing a wide spectrum of gastrointestinal and hepatobiliary diseases through advanced medical therapies and minimally invasive endoscopic procedures.",

  about: [
    "Dr. Virendra Bhad is a dedicated and highly skilled Medical Gastroenterologist in Jabalpur with expertise in the prevention, diagnosis, and treatment of disorders affecting the digestive system, liver, pancreas, gallbladder, and intestines. Having completed DM in Medical Gastroenterology, he specializes in managing a wide spectrum of gastrointestinal and hepatobiliary diseases through advanced medical therapies and minimally invasive endoscopic procedures.",

    "At Apollo JBP Hospitals, Jabalpur, Dr. Bhad provides comprehensive care for patients suffering from acidity, GERD, fatty liver disease, hepatitis, liver cirrhosis, pancreatitis, irritable bowel syndrome (IBS), inflammatory bowel disease (IBD), gastrointestinal bleeding, and colorectal disorders.",

    "His focus is on delivering evidence-based treatment, early diagnosis, and personalized care to improve digestive health and overall quality of life."
  ],

  highlights: [
    {
      value: "DM",
      label: "Medical Gastroenterology"
    },
    {
      value: "Liver",
      label: "Hepatology & Liver Care"
    },
    {
      value: "EUS",
      label: "Advanced Endoscopy"
    }
  ],

  expertise: [
    "Advanced Endoscopy",
    "Hepatology",
    "Liver Care",
    "Acidity & Acid Reflux (GERD)",
    "Gastritis & Peptic Ulcer Disease",
    "Irritable Bowel Syndrome (IBS)",
    "Inflammatory Bowel Disease (IBD)",
    "Chronic Constipation",
    "Diarrheal Disorders",
    "Gastrointestinal Infections",
    "Digestive Health Disorders",
    "Gastrointestinal Bleeding",
    "Colorectal Diseases",
    "Fatty Liver Disease",
    "Non-Alcoholic Fatty Liver Disease (NAFLD)",
    "Hepatitis B & Hepatitis C",
    "Alcohol-Related Liver Disease",
    "Liver Cirrhosis",
    "Jaundice Evaluation & Treatment",
    "Chronic Liver Disease",
    "Liver Function Abnormalities",
    "Acute Pancreatitis",
    "Chronic Pancreatitis",
    "Gallbladder Disorders",
    "Bile Duct Diseases",
    "Pancreatic Disorders",
    "Diagnostic Upper GI Endoscopy",
    "Colonoscopy",
    "Therapeutic Endoscopy",
    "Gastrointestinal Disease Evaluation",
    "Endoscopic Diagnosis and Management"
  ],

  expertiseCategories: [
    {
      category: "Digestive Disorders & Medical Gastroenterology",
      items: [
        "Acidity & Acid Reflux (GERD)",
        "Gastritis & Peptic Ulcer Disease",
        "Irritable Bowel Syndrome (IBS)",
        "Inflammatory Bowel Disease (IBD)",
        "Chronic Constipation",
        "Diarrheal Disorders",
        "Gastrointestinal Infections",
        "Digestive Health Disorders",
        "Gastrointestinal Bleeding",
        "Colorectal Diseases"
      ]
    },
    {
      category: "Liver Diseases & Hepatology",
      items: [
        "Fatty Liver Disease",
        "Non-Alcoholic Fatty Liver Disease (NAFLD)",
        "Hepatitis B & Hepatitis C",
        "Alcohol-Related Liver Disease",
        "Liver Cirrhosis",
        "Jaundice Evaluation & Treatment",
        "Chronic Liver Disease",
        "Liver Function Abnormalities"
      ]
    },
    {
      category: "Pancreatic & Biliary Disorders",
      items: [
        "Acute Pancreatitis",
        "Chronic Pancreatitis",
        "Gallbladder Disorders",
        "Bile Duct Diseases",
        "Pancreatic Disorders"
      ]
    },
    {
      category: "Advanced Endoscopy Procedures",
      items: [
        "Diagnostic Upper GI Endoscopy",
        "Colonoscopy",
        "Therapeutic Endoscopy",
        "Gastrointestinal Disease Evaluation",
        "Endoscopic Diagnosis and Management"
      ]
    }
  ],

  conditions: [
    "Acidity & Acid Reflux (GERD)",
    "Gastritis & Peptic Ulcer Disease",
    "Irritable Bowel Syndrome (IBS)",
    "Inflammatory Bowel Disease (IBD)",
    "Chronic Constipation",
    "Diarrheal Disorders",
    "Gastrointestinal Infections",
    "Gastrointestinal Bleeding",
    "Colorectal Diseases",
    "Fatty Liver Disease",
    "Non-Alcoholic Fatty Liver Disease (NAFLD)",
    "Hepatitis B & Hepatitis C",
    "Alcohol-Related Liver Disease",
    "Liver Cirrhosis",
    "Jaundice",
    "Chronic Liver Disease",
    "Liver Function Abnormalities",
    "Acute Pancreatitis",
    "Chronic Pancreatitis",
    "Gallbladder Disorders",
    "Bile Duct Diseases",
    "Pancreatic Disorders"
  ],

  qualifications: [
    {
      degree: "DM (Medical Gastroenterology)",
      institute: "",
      year: ""
    },
    {
      degree: "MD (General Medicine)",
      institute: "",
      year: ""
    },
    {
      degree: "MBBS",
      institute: "",
      year: ""
    }
  ],

  experienceDetails: [],

  clinicalProcedures: [
    "Advanced Endoscopic Procedures",
    "Diagnostic Upper GI Endoscopy",
    "Colonoscopy",
    "Therapeutic Endoscopy",
    "Endoscopic Diagnosis and Management"
  ],

  training: [],

  research: [],

  researchDetails: "",

  publications: [],

  professionalMemberships: [],

  whyChoose: [
    "Experienced Medical Gastroenterologist in Jabalpur",
    "Expert in Digestive & Liver Disorders",
    "Advanced Endoscopy & Colonoscopy Specialist",
    "Comprehensive Fatty Liver Treatment",
    "Specialized GERD, Acidity & IBS Management",
    "Patient-Centered Treatment Approach",
    "Evidence-Based Medical Gastroenterology Care",
    "Focus on Long-Term Digestive Wellness"
  ],

  professionalApproach:
    "Dr. Bhad focuses on evidence-based treatment, early diagnosis, personalized care, patient education, preventive gastroenterology, and long-term digestive wellness.",

  consultationCta:
    "Consult Dr. Virendra Bhad at Apollo JBP Hospitals, Jabalpur for expert treatment of fatty liver disease, acidity, GERD, hepatitis, liver disorders, pancreatitis, digestive problems, IBS, IBD, endoscopy, colonoscopy, and comprehensive medical gastroenterology care.",

  opd: {
    days: [],
    timing: ""
  }
}
,


{
  id: "d-014",
  slug: "dr-gaurav-kumar-malvi",
  name: "Dr. Gaurav Kumar Malvi",
  designation:
    "Associate Consultant Urologist, Andrologist, Uro-Oncologist & Laparoscopic Uro Surgeon",
  speciality: "Urology",
  specialitySlug: "urology",
  department: "urology",

  qualification:
    "MS (General Surgery), MCh Urology, MBBS",

  experience:
    "Dr. Gaurav Kumar Malvi has extensive experience in managing complex urological disorders using minimally invasive and advanced surgical techniques, including kidney stone treatment, laser prostate surgery, endourology, laparoscopic urology, uro-oncology, male infertility, renal transplant surgery, and reconstructive urology.",

  image: "/images/doctors/gauravkumar.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/best-urologist-in-jabalpur-2/",

  languages: [],

  summary:
    "Dr. Gaurav Kumar Malvi is a highly skilled Urologist in Jabalpur specializing in Kidney Stone Treatment, Laser Prostate Surgery, Endourology, Laparoscopic Urology, Uro-Oncology, Male Infertility, Renal Transplant Surgery, and Reconstructive Urology. With advanced training in urology from prestigious institutions including Seth G.S. Medical College & KEM Hospital, Mumbai, he has extensive experience in managing complex urological disorders using minimally invasive and advanced surgical techniques.",

  about: [
    "Dr. Gaurav Kumar Malvi is a highly skilled Urologist in Jabalpur specializing in Kidney Stone Treatment, Laser Prostate Surgery, Endourology, Laparoscopic Urology, Uro-Oncology, Male Infertility, Renal Transplant Surgery, and Reconstructive Urology.",

    "With advanced training in urology from prestigious institutions including Seth G.S. Medical College & KEM Hospital, Mumbai, he has extensive experience in managing complex urological disorders using minimally invasive and advanced surgical techniques.",

    "His clinical expertise covers endourological surgeries, advanced kidney stone treatment, laparoscopic urological procedures, urological cancer surgery, renal transplant surgery, male infertility treatment, female urology, pediatric urology, neuro-urology, and minimally invasive urology procedures."
  ],

  highlights: [
    {
      value: "MCh",
      label: "Urology"
    },
    {
      value: "RIRS",
      label: "Kidney Stone Surgery"
    },
    {
      value: "Uro-Oncology",
      label: "Cancer Surgery"
    }
  ],

  expertise: [
    "Urology",
    "Andrology",
    "Uro-Oncology",
    "Laparoscopic Urology",

    "RIRS (Retrograde Intrarenal Surgery)",
    "PCNL (Percutaneous Nephrolithotomy)",
    "Mini-PCNL",
    "URS (Ureterorenoscopy)",
    "Laser Lithotripsy",
    "Cystolithotripsy",
    "Percutaneous Cystolithotripsy",
    "Complex Stone Disease Management",

    "TURP (Transurethral Resection of Prostate)",
    "Laser Prostate Surgery",
    "Endoscopic Prostate Procedures",
    "Management of Urinary Obstruction",

    "Laparoscopic Nephrectomy",
    "Laparoscopic Donor Nephrectomy",
    "Laparoscopic Pyeloplasty",
    "Laparoscopic Radical Nephrectomy",
    "Laparoscopic Partial Nephrectomy",
    "Laparoscopic Radical Cystectomy",
    "Laparoscopic Ureterolithotomy",

    "Kidney Cancer Surgery",
    "Bladder Cancer Surgery",
    "Prostate Cancer Management",
    "Radical Cystectomy",
    "Radical Nephrectomy",
    "Partial Nephrectomy",
    "Urological Cancer Evaluation & Treatment",

    "Male Infertility Evaluation",
    "Andrology Disorders",
    "Varicocele Management",
    "Erectile Dysfunction Evaluation",
    "Male Reproductive Health",

    "Donor Nephrectomy",
    "Renal Transplant Recipient Surgery",
    "Pre-Transplant Evaluation",
    "Post-Transplant Urological Care",

    "Urethral Reconstruction",
    "Ureteric Reimplantation",
    "Female Urology",
    "Pediatric Urology",
    "Neuro-Urology",
    "Complex Reconstructive Urological Procedures",

    "Endourological Surgeries",
    "Laser Stone Surgery",
    "Advanced Kidney Stone Treatment",
    "Laparoscopic Urological Procedures",
    "Urological Cancer Surgery",
    "Renal Transplant Surgery",
    "Male Infertility Treatment",
    "Minimally Invasive Urology Procedures"
  ],

  expertiseCategories: [
    {
      category: "Kidney Stone Treatment & Endourology",
      items: [
        "RIRS (Retrograde Intrarenal Surgery)",
        "PCNL (Percutaneous Nephrolithotomy)",
        "Mini-PCNL",
        "URS (Ureterorenoscopy)",
        "Laser Lithotripsy",
        "Cystolithotripsy",
        "Percutaneous Cystolithotripsy",
        "Complex Stone Disease Management",
        "Endourological Surgeries",
        "Laser Stone Surgery",
        "Advanced Kidney Stone Treatment"
      ]
    },
    {
      category: "Laser Prostate Surgery",
      items: [
        "TURP (Transurethral Resection of Prostate)",
        "Laser Prostate Surgery",
        "Endoscopic Prostate Procedures",
        "Management of Urinary Obstruction"
      ]
    },
    {
      category: "Laparoscopic Urology",
      items: [
        "Laparoscopic Nephrectomy",
        "Laparoscopic Donor Nephrectomy",
        "Laparoscopic Pyeloplasty",
        "Laparoscopic Radical Nephrectomy",
        "Laparoscopic Partial Nephrectomy",
        "Laparoscopic Radical Cystectomy",
        "Laparoscopic Ureterolithotomy",
        "Laparoscopic Urological Procedures"
      ]
    },
    {
      category: "Uro-Oncology",
      items: [
        "Kidney Cancer Surgery",
        "Bladder Cancer Surgery",
        "Prostate Cancer Management",
        "Radical Cystectomy",
        "Radical Nephrectomy",
        "Partial Nephrectomy",
        "Urological Cancer Evaluation & Treatment",
        "Urological Cancer Surgery"
      ]
    },
    {
      category: "Male Infertility & Andrology",
      items: [
        "Male Infertility Evaluation",
        "Andrology Disorders",
        "Varicocele Management",
        "Erectile Dysfunction Evaluation",
        "Male Reproductive Health",
        "Male Infertility Treatment"
      ]
    },
    {
      category: "Renal Transplant Surgery",
      items: [
        "Donor Nephrectomy",
        "Renal Transplant Recipient Surgery",
        "Pre-Transplant Evaluation",
        "Post-Transplant Urological Care",
        "Renal Transplant Surgery"
      ]
    },
    {
      category: "Reconstructive & Pediatric Urology",
      items: [
        "Urethral Reconstruction",
        "Ureteric Reimplantation",
        "Female Urology",
        "Pediatric Urology",
        "Neuro-Urology",
        "Complex Reconstructive Urological Procedures"
      ]
    }
  ],

  conditions: [
    "Kidney Stones",
    "Complex Stone Disease",
    "Enlarged Prostate (BPH)",
    "Urinary Obstruction",
    "Kidney Cancer",
    "Bladder Cancer",
    "Prostate Cancer",
    "Male Infertility",
    "Varicocele",
    "Erectile Dysfunction",
    "Male Reproductive Disorders",
    "Urological Disorders Requiring Renal Transplant",
    "Urethral Disorders",
    "Ureteric Disorders",
    "Pediatric Urological Conditions",
    "Neuro-Urological Conditions",
    "Complex Reconstructive Urological Conditions"
  ],

  qualifications: [
    {
      degree: "MS (General Surgery)",
      institute: "",
      year: ""
    },
    {
      degree: "MCh Urology",
      institute: "Seth G.S. Medical College & KEM Hospital, Mumbai",
      year: ""
    },
    {
      degree: "MBBS",
      institute: "",
      year: ""
    }
  ],

  experienceDetails: [],

  clinicalProcedures: [
    "RIRS (Retrograde Intrarenal Surgery)",
    "PCNL (Percutaneous Nephrolithotomy)",
    "Mini-PCNL",
    "URS (Ureterorenoscopy)",
    "Laser Lithotripsy",
    "Cystolithotripsy",
    "Percutaneous Cystolithotripsy",
    "TURP (Transurethral Resection of Prostate)",
    "Laser Prostate Surgery",
    "Laparoscopic Nephrectomy",
    "Laparoscopic Donor Nephrectomy",
    "Laparoscopic Pyeloplasty",
    "Laparoscopic Radical Nephrectomy",
    "Laparoscopic Partial Nephrectomy",
    "Laparoscopic Radical Cystectomy",
    "Laparoscopic Ureterolithotomy",
    "Radical Cystectomy",
    "Radical Nephrectomy",
    "Partial Nephrectomy",
    "Donor Nephrectomy",
    "Renal Transplant Recipient Surgery",
    "Urethral Reconstruction",
    "Ureteric Reimplantation",
    "Complex Reconstructive Urological Procedures"
  ],

  training: [],

  research: [
    "Research papers presented at national and international urology conferences",
    "Scientific articles on urology",
    "Scientific articles on uro-oncology",
    "Scientific articles on bladder disorders",
    "Scientific articles on reconstructive urology"
  ],

  researchDetails:
    "Dr. Gaurav has presented multiple research papers at national and international urology conferences and has published scientific articles in reputed journals on topics related to urology, uro-oncology, bladder disorders, and reconstructive urology.",

  publications: [
    "Scientific articles published in reputed journals on urology, uro-oncology, bladder disorders, and reconstructive urology"
  ],

  professionalMemberships: [
    "Urological Society of India (USI)",
    "West Zone Urological Society of India",
    "American Urological Association (AUA)"
  ],

  whyChoose: [
    "Experienced Urologist in Jabalpur",
    "Expert in Kidney Stone Treatment",
    "Advanced Laser Prostate Surgery Specialist",
    "Skilled Laparoscopic Uro Surgeon",
    "Expertise in Uro-Oncology & Cancer Surgery",
    "Specialized Male Infertility & Andrology Care",
    "Renal Transplant Surgery Experience",
    "Minimally Invasive Urology Procedures"
  ],

  professionalApproach:
    "Dr. Gaurav Kumar Malvi focuses on advanced, minimally invasive and comprehensive urological care, with expertise across endourology, kidney stone treatment, laparoscopic surgery, uro-oncology, male infertility, renal transplantation and reconstructive urology.",

  consultationCta:
    "Consult Dr. Gaurav Kumar Malvi at Apollo JBP Hospitals, Jabalpur for expert kidney stone treatment, RIRS, PCNL, laser prostate surgery, male infertility treatment, uro-oncology care, laparoscopic urology surgery, renal transplant evaluation, pediatric urology, and advanced urological care.",

  opd: {
    days: [],
    timing: ""
  }
}
,

{
  id: "d-015",
  slug: "dr-shirisha-kumari-jinka",
  name: "Dr. Shirisha Kumari Jinka",
  designation: "Critical Care Specialist, Intensivist & ICU Consultant",
  speciality: "Critical Care",
  specialitySlug: "critical-care",
  department: "critical-care",

  qualification:
    "DNB (Anaesthesiology), DrNB (Critical Care Medicine), MBBS",

  experience:
    "Dr. Shirisha Kumari Jinka has extensive experience in critical care medicine, intensive care, mechanical ventilation, ECMO, hemodynamic monitoring, renal replacement therapy, sepsis management, shock management, and multidisciplinary ICU care.",

  image: "/images/doctors/shirisha.webp",

  profileUrl: "",

  languages: [],

  summary:
    "Dr. Shirisha Kumari Jinka is a highly qualified Critical Care Specialist in Jabalpur with advanced training in Critical Care Medicine, Intensive Care Unit (ICU) management, Mechanical Ventilation, ECMO, Hemodynamic Monitoring, and Renal Replacement Therapy (CRRT). She specializes in managing critically ill patients requiring advanced life support, organ support therapies, and multidisciplinary intensive care.",

  about: [
    "Dr. Shirisha Kumari Jinka is a highly qualified Critical Care Specialist in Jabalpur with advanced training in Critical Care Medicine, Intensive Care Unit (ICU) management, Mechanical Ventilation, ECMO, Hemodynamic Monitoring, and Renal Replacement Therapy (CRRT). She specializes in managing critically ill patients requiring advanced life support, organ support therapies, and multidisciplinary intensive care.",

    "As an experienced Intensivist in Jabalpur, Dr. Shirisha is dedicated to providing evidence-based critical care for patients with severe infections, respiratory failure, septic shock, multi-organ dysfunction, trauma, and post-operative complications.",

    "Her expertise in advanced ICU technologies and life-saving interventions helps improve outcomes for critically ill patients."
  ],

  highlights: [
    {
      value: "DrNB",
      label: "Critical Care Medicine"
    },
    {
      value: "ECMO",
      label: "Advanced Life Support"
    },
    {
      value: "CRRT",
      label: "Renal Replacement"
    }
  ],

  expertise: [
    "Critical Care",
    "Intensive Care",
    "ICU",
    "Intensive Care Unit (ICU) Management",
    "Critical Care Medicine",
    "Emergency Critical Care",
    "Multidisciplinary ICU Care",
    "Advanced Life Support",
    "Post-Operative Critical Care",
    "Trauma & Emergency ICU Management",

    "Mechanical Ventilation Management",
    "Advanced Ventilator Strategies",
    "Non-Invasive Ventilation (BiPAP, CPAP, HFNC)",
    "Respiratory Failure Treatment",
    "Prone Ventilation",
    "Ventilator Weaning Protocols",
    "Acute Respiratory Distress Syndrome (ARDS) Management",

    "ECMO (Extracorporeal Membrane Oxygenation)",
    "Hemodynamic Monitoring",
    "Vasopressor & Inotrope Management",
    "Shock Management",
    "Advanced Cardiac Monitoring",
    "Invasive ICU Monitoring Systems",

    "Sepsis Treatment",
    "Septic Shock Management",
    "Multi-Organ Failure",
    "Severe Infections",
    "ICU Infection Prevention",
    "Critical Medical Emergencies",

    "CRRT (Continuous Renal Replacement Therapy)",
    "Renal Replacement Therapy",
    "Acute Kidney Injury Management",
    "Critical Care Nephrology Support",

    "Point-of-Care Ultrasound (POCUS) in Critical Care",
    "Emergency Airway Management",
    "Advanced Resuscitation and Cardiac Life Support",
    "Family Counseling and Critical Care Communication"
  ],

  expertiseCategories: [
    {
      category: "Critical Care Medicine & Intensive Care",
      items: [
        "Intensive Care Unit (ICU) Management",
        "Critical Care Medicine",
        "Emergency Critical Care",
        "Multidisciplinary ICU Care",
        "Advanced Life Support",
        "Post-Operative Critical Care",
        "Trauma & Emergency ICU Management"
      ]
    },
    {
      category: "Mechanical Ventilation & Respiratory Support",
      items: [
        "Mechanical Ventilation Management",
        "Advanced Ventilator Strategies",
        "Non-Invasive Ventilation (BiPAP, CPAP, HFNC)",
        "Respiratory Failure Treatment",
        "Prone Ventilation",
        "Ventilator Weaning Protocols",
        "Acute Respiratory Distress Syndrome (ARDS) Management"
      ]
    },
    {
      category: "ECMO & Advanced Organ Support",
      items: [
        "ECMO (Extracorporeal Membrane Oxygenation)",
        "Hemodynamic Monitoring",
        "Vasopressor & Inotrope Management",
        "Shock Management",
        "Advanced Cardiac Monitoring",
        "Invasive ICU Monitoring Systems"
      ]
    },
    {
      category: "Sepsis & Multi-Organ Failure",
      items: [
        "Sepsis Treatment",
        "Septic Shock Management",
        "Multi-Organ Failure",
        "Severe Infections",
        "ICU Infection Prevention",
        "Critical Medical Emergencies"
      ]
    },
    {
      category: "Renal Replacement Therapy",
      items: [
        "CRRT (Continuous Renal Replacement Therapy)",
        "Renal Replacement Therapy",
        "Acute Kidney Injury Management",
        "Critical Care Nephrology Support"
      ]
    },
    {
      category: "Advanced Critical Care Procedures",
      items: [
        "Emergency Airway Management",
        "Point-of-Care Ultrasound (POCUS) in Critical Care",
        "Advanced Resuscitation and Cardiac Life Support",
        "Family Counseling and Critical Care Communication"
      ]
    }
  ],

  conditions: [
    "Severe Infections",
    "Respiratory Failure",
    "Septic Shock",
    "Multi-Organ Dysfunction",
    "Multi-Organ Failure",
    "Trauma",
    "Post-Operative Complications",
    "Acute Respiratory Distress Syndrome (ARDS)",
    "Shock",
    "Acute Kidney Injury",
    "Critical Medical Emergencies"
  ],

  qualifications: [
    {
      degree: "DNB (Anaesthesiology)",
      institute: "",
      year: ""
    },
    {
      degree: "DrNB (Critical Care Medicine)",
      institute: "",
      year: ""
    },
    {
      degree: "MBBS",
      institute: "",
      year: ""
    }
  ],

  experienceDetails: [],

  clinicalProcedures: [
    "Mechanical Ventilation",
    "Non-Invasive Ventilation (BiPAP, CPAP, HFNC)",
    "ECMO (Extracorporeal Membrane Oxygenation)",
    "Hemodynamic Monitoring",
    "Vasopressor & Inotrope Management",
    "Advanced Cardiac Monitoring",
    "Invasive ICU Monitoring",
    "CRRT (Continuous Renal Replacement Therapy)",
    "Emergency Airway Management",
    "Point-of-Care Ultrasound (POCUS)",
    "Advanced Resuscitation",
    "Cardiac Life Support"
  ],

  training: [],

  certifications: [
    "Basic Life Support (BLS) – American Heart Association",
    "Advanced Cardiac Life Support (ACLS) – American Heart Association"
  ],

  research: [],

  researchDetails: "",

  publications: [],

  professionalMemberships: [
    "Indian Society of Critical Care Medicine (ISCCM)",
    "Andhra Pradesh Medical Council (APMC)"
  ],

  whyChoose: [
    "Experienced Critical Care Specialist in Jabalpur",
    "Trusted Intensivist and ICU Consultant",
    "Expertise in Mechanical Ventilation & ECMO",
    "Advanced Sepsis and Shock Management",
    "Skilled in CRRT & Renal Replacement Therapy",
    "Comprehensive Emergency & Critical Care Services",
    "Evidence-Based ICU Management",
    "Patient-Centered Intensive Care Approach"
  ],

  professionalApproach:
    "Dr. Shirisha Kumari Jinka follows an evidence-based, multidisciplinary and patient-centered approach to intensive care, with a focus on advanced life support, organ support therapies, critical illness management and comprehensive ICU care.",

  consultationCta:
    "Consult Dr. Shirisha Kumari Jinka at Apollo JBP Hospitals, Jabalpur for expert critical care medicine, intensive care treatment, ventilator management, ECMO support, sepsis treatment, respiratory failure management, ICU consultation, and advanced life support services.",

  opd: {
    days: [],
    timing: ""
  }
}
,


{
  id: "d-016",
  slug: "dr-pranal-sahare",
  name: "Dr. Pranal Sahare",
  designation:
    "Urologist, Robotic Uro Surgeon, Laparoscopic Urologist, and Uro-Oncologist",
  speciality: "Urology",
  specialitySlug: "urology",
  department: "urology",

  qualification:
    "MCh (Urology), DNB (Urology), MS (General Surgery)",

  experience:
    "Dr. Pranal Sahare has professional experience as Visiting Consultant Urology at Narayana Multispeciality Hospital, Ahmedabad and HCG Cancer Centre, Nagpur, Consultant Urology at BJ Medical College & Civil Hospital, Ahmedabad, and Assistant Professor in the Department of Urology in Nagpur.",

  image: "/images/doctors/pranal.webp",

  profileUrl: "",

  languages: [],

  summary:
    "Dr. Pranal Sahare is a highly experienced Urologist, Robotic Uro Surgeon, Laparoscopic Urologist, and Uro-Oncologist in Jabalpur, specializing in advanced minimally invasive urological procedures. With an MCh in Urology from BJ Medical College, Ahmedabad and DNB (Urology) from NBE, New Delhi, he has extensive expertise in managing complex urological diseases including prostate cancer, kidney cancer, bladder cancer, kidney stones, male infertility, reconstructive urology, and pediatric urology.",

  about: [
    "Dr. Pranal Sahare is a highly experienced Urologist, Robotic Uro Surgeon, Laparoscopic Urologist, and Uro-Oncologist in Jabalpur, specializing in advanced minimally invasive urological procedures.",

    "With an MCh in Urology from BJ Medical College, Ahmedabad and DNB (Urology) from NBE, New Delhi, Dr. Sahare has extensive expertise in managing complex urological diseases including prostate cancer, kidney cancer, bladder cancer, kidney stones, male infertility, reconstructive urology, and pediatric urology.",

    "Currently associated with Apollo JBP Hospitals, Jabalpur, he is recognized for delivering advanced robotic and laparoscopic urology care with precision, safety, and excellent clinical outcomes."
  ],

  highlights: [
    {
      value: "MCh",
      label: "Urology"
    },
    {
      value: "Robotic",
      label: "Uro Surgery"
    },
    {
      value: "Uro-Oncology",
      label: "Cancer Surgery"
    }
  ],

  expertise: [
    "Robotic Urology",
    "Laparoscopic Urology",
    "Uro-Oncology",

    "Robotic Radical Prostatectomy for Prostate Cancer",
    "Robotic Partial & Radical Nephrectomy for Kidney Cancer",
    "Robotic Radical Cystectomy for Bladder Cancer",
    "Advanced Robotic Urological Procedures",
    "Laparoscopic Nephrectomy",
    "Laparoscopic Partial Nephrectomy",
    "Laparoscopic Pyeloplasty",
    "Laparoscopic Ureterolithotomy",
    "Laparoscopic VVF Repair",
    "Laparoscopic Donor Nephrectomy for Kidney Transplant Programs",

    "RIRS (Retrograde Intrarenal Surgery)",
    "PCNL (Percutaneous Nephrolithotomy)",
    "Mini-PCNL",
    "Ureteroscopy (URS)",
    "Holmium Laser Stone Surgery",
    "Complex Stone Disease Management",

    "HoLEP (Holmium Laser Enucleation of Prostate)",
    "Green Light Laser Prostate Surgery (PVP)",
    "TURP",
    "Advanced BPH Management",

    "Prostate Cancer Surgery",
    "Kidney Cancer Surgery",
    "Bladder Cancer Surgery",
    "Radical Prostatectomy",
    "Partial Nephrectomy",
    "Radical Cystectomy",

    "Microsurgical Varicocelectomy",
    "Vasoepididymostomy",
    "Sperm Retrieval Procedures",
    "Male Fertility Evaluation",

    "Urethroplasty",
    "Hypospadias Repair",
    "Vesico-Vaginal Fistula (VVF) Repair",
    "Complex Reconstructive Procedures",

    "Hypospadias",
    "Undescended Testis",
    "Congenital Urological Anomalies",
    "Pediatric Reconstructive Urology",

    "Advanced Endourological Procedures",
    "TURBT",
    "Holmium Laser Applications",
    "Advanced Robotic Urological Surgery",
    "Laparoscopic Urological Procedures",
    "Laparoscopic Radical Prostatectomy",
    "Laparoscopic Radical Cystectomy",
    "Reconstructive Urology"
  ],

  expertiseCategories: [
    {
      category: "Robotic & Laparoscopic Uro Surgery",
      items: [
        "Robotic Radical Prostatectomy for Prostate Cancer",
        "Robotic Partial & Radical Nephrectomy for Kidney Cancer",
        "Robotic Radical Cystectomy for Bladder Cancer",
        "Advanced Robotic Urological Procedures",
        "Laparoscopic Nephrectomy",
        "Laparoscopic Partial Nephrectomy",
        "Laparoscopic Pyeloplasty",
        "Laparoscopic Ureterolithotomy",
        "Laparoscopic VVF Repair",
        "Laparoscopic Donor Nephrectomy for Kidney Transplant Programs"
      ]
    },
    {
      category: "Kidney Stone Treatment",
      items: [
        "RIRS (Retrograde Intrarenal Surgery)",
        "PCNL (Percutaneous Nephrolithotomy)",
        "Mini-PCNL",
        "Ureteroscopy (URS)",
        "Holmium Laser Stone Surgery",
        "Complex Stone Disease Management"
      ]
    },
    {
      category: "Laser Prostate Surgery",
      items: [
        "HoLEP (Holmium Laser Enucleation of Prostate)",
        "Green Light Laser Prostate Surgery (PVP)",
        "TURP",
        "Advanced BPH Management"
      ]
    },
    {
      category: "Uro-Oncology",
      items: [
        "Prostate Cancer Surgery",
        "Kidney Cancer Surgery",
        "Bladder Cancer Surgery",
        "Radical Prostatectomy",
        "Partial Nephrectomy",
        "Radical Cystectomy"
      ]
    },
    {
      category: "Male Infertility & Andrology",
      items: [
        "Microsurgical Varicocelectomy",
        "Vasoepididymostomy",
        "Sperm Retrieval Procedures",
        "Male Fertility Evaluation"
      ]
    },
    {
      category: "Reconstructive Urology",
      items: [
        "Urethroplasty",
        "Hypospadias Repair",
        "Vesico-Vaginal Fistula (VVF) Repair",
        "Complex Reconstructive Procedures"
      ]
    },
    {
      category: "Pediatric Urology",
      items: [
        "Hypospadias",
        "Undescended Testis",
        "Congenital Urological Anomalies",
        "Pediatric Reconstructive Urology"
      ]
    }
  ],

  conditions: [
    "Prostate Cancer",
    "Kidney Cancer",
    "Bladder Cancer",
    "Kidney Stones",
    "Complex Stone Disease",
    "Benign Prostatic Hyperplasia (BPH)",
    "Urinary Disorders",
    "Male Infertility",
    "Varicocele",
    "Male Fertility Disorders",
    "Urethral Disorders",
    "Hypospadias",
    "Undescended Testis",
    "Congenital Urological Anomalies",
    "Pediatric Urological Conditions",
    "Reconstructive Urological Conditions"
  ],

  qualifications: [
    {
      degree: "MCh (Urology)",
      institute: "BJ Medical College & Civil Hospital, Ahmedabad",
      year: ""
    },
    {
      degree: "DNB (Urology)",
      institute: "National Board of Examinations, New Delhi",
      year: ""
    },
    {
      degree: "MS (General Surgery)",
      institute: "LTMMC & LTMGH, Sion Hospital, Mumbai",
      year: ""
    }
  ],

  experienceDetails: [
    {
      designation: "Visiting Consultant Urology",
      hospital: "Narayana Multispeciality Hospital, Ahmedabad",
      description:
        "Worked as Visiting Consultant in Urology."
    },
    {
      designation: "Consultant Urology",
      hospital: "BJ Medical College & Civil Hospital, Ahmedabad",
      description:
        "Worked as Consultant in Urology."
    },
    {
      designation: "Assistant Professor, Department of Urology",
      hospital: "Nagpur",
      description:
        "Served as Assistant Professor in the Department of Urology."
    },
    {
      designation: "Visiting Consultant Urology",
      hospital: "HCG Cancer Centre, Nagpur",
      description:
        "Worked as Visiting Consultant in Urology."
    }
  ],

  clinicalProcedures: [
    "PCNL",
    "Mini-PCNL",
    "URS",
    "TURP",
    "TURBT",
    "RIRS",
    "Holmium Laser Stone Surgery",
    "HoLEP",
    "Green Light Laser Prostate Surgery (PVP)",
    "Robotic Radical Prostatectomy",
    "Robotic Partial Nephrectomy",
    "Robotic Radical Nephrectomy",
    "Robotic Radical Cystectomy",
    "Laparoscopic Nephrectomy",
    "Laparoscopic Partial Nephrectomy",
    "Laparoscopic Pyeloplasty",
    "Laparoscopic Ureterolithotomy",
    "Laparoscopic VVF Repair",
    "Laparoscopic Donor Nephrectomy",
    "Radical Prostatectomy",
    "Radical Cystectomy",
    "Microsurgical Varicocelectomy",
    "Vasoepididymostomy",
    "Sperm Retrieval Procedures",
    "Urethroplasty",
    "Hypospadias Repair",
    "Vesico-Vaginal Fistula (VVF) Repair"
  ],

  training: [],

  research: [],

  researchDetails: "",

  publications: [],

  professionalMemberships: [],

  whyChoose: [
    "Expert in Robotic & Laparoscopic Uro Surgery",
    "Advanced Treatment for Kidney Stones, Enlarged Prostate & Urological Disorders",
    "Specialized Expertise in Prostate Cancer, Kidney Cancer & Bladder Cancer Surgery",
    "Advanced Laser Prostate Surgery & Endourology Specialist",
    "Expertise in Kidney Transplant Related Laparoscopic Nephrectomy",
    "Minimally Invasive Surgery with Faster Recovery",
    "Patient-Centric, Evidence-Based Treatment Approach",
    "Comprehensive Adult & Pediatric Urology Care"
  ],

  professionalApproach:
    "Dr. Pranal Sahare focuses on precision, safety, minimally invasive surgical techniques, evidence-based treatment and comprehensive adult and pediatric urological care.",

  consultationCta:
    "For robotic prostate surgery, kidney stone treatment, RIRS, PCNL, laser prostate surgery, laparoscopic urology procedures, kidney cancer treatment, bladder cancer treatment, and advanced urological care in Jabalpur, consult Dr. Pranal Sahare at Apollo JBP Hospitals, Jabalpur.",

  opd: {
    days: [],
    timing: ""
  }
}
,



{
  id: "d-017",
  slug: "dr-monika-tripathi",
  name: "Dr. Monika Tripathi",
  designation:
    "Advanced Laparoscopic Gynecologist & High-Risk Pregnancy Specialist",
  speciality: "Obstetrics & Gynaecology",
  specialitySlug: "obstetrics-gynaecology",
  department: "gynae",

  image: "/images/doctors/monikatripathi.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/best-gynecologist-in-jabalpur/",

  languages: [],

  summary:
    "Dr. Monika Tripathi is a dedicated Obstetrician & Gynecologist with advanced fellowship training in Gynaecological Endoscopy from AIIMS Raipur. She specializes in high-risk pregnancy management, advanced laparoscopic gynecological surgery, infertility-related gynecology care, and minimally invasive procedures.",

  about: [
    "Dr. Monika Tripathi is a dedicated Obstetrician & Gynecologist with advanced fellowship training in Gynaecological Endoscopy from AIIMS Raipur. She specializes in high-risk pregnancy management, advanced laparoscopic gynecological surgery, infertility-related gynecology care, and minimally invasive procedures.",

    "Known for her patient-friendly communication, ethical approach, and modern evidence-based treatment, Dr. Monika Tripathi is committed to providing comprehensive women’s healthcare with compassion, safety, and personalized attention.",

    "Dr. Monika Tripathi believes that every woman deserves respectful, compassionate, and high-quality healthcare. With specialized training in advanced gynecological endoscopy and extensive experience in obstetrics & gynecology, she focuses on providing safe pregnancy care, minimally invasive surgery, and holistic women’s wellness solutions."
  ],

  qualifications: [
    {
      degree: "MS – Obstetrics & Gynaecology",
      institute: "",
      year: "",
    },
    {
      degree: "Fellowship in Gynaecological Endoscopy",
      institute: "AIIMS Raipur",
      year: "",
    },
    {
      degree: "MBBS",
      institute: "",
      year: "",
    },
  ],

  highlights: [
    {
      value: "MS",
      label: "Obstetrics & Gynaecology",
    },
    {
      value: "AIIMS",
      label: "Endoscopy Fellowship",
    },
    {
      value: "High-Risk",
      label: "Pregnancy Specialist",
    },
  ],

  expertise: [
    "Laparoscopic Gynaecology",
    "High-Risk Pregnancy Management",
    "Normal Delivery Care",
    "Cesarean Delivery (C-Section)",
    "Pregnancy Hypertension & Diabetes Management",
    "Antenatal & Postnatal Care",
    "Emergency Obstetric Care",
    "Labour Room & Delivery Management",

    "PCOS & Irregular Period Treatment",
    "Heavy Bleeding & Painful Period Management",
    "Fibroid Treatment",
    "Ovarian Cyst Treatment",
    "Endometriosis Care",
    "White Discharge & Infection Treatment",
    "Menopause & Hormonal Care",
    "Infertility Evaluation & Counseling",
    "Preventive Women’s Health Check-up",

    "Advanced Laparoscopic & Hysteroscopic Surgery",
    "Total Laparoscopic Hysterectomy (TLH)",
    "Laparoscopic Fibroid Surgery",
    "Laparoscopic Ovarian Cystectomy",
    "Endometriosis Surgery",
    "Diagnostic Laparoscopy",
    "Diagnostic & Operative Hysteroscopy",
    "Advanced Minimally Invasive Gynecological Procedures",
  ],

  experience:
    "Dr. Monika Tripathi has completed a Fellowship in Gynaecological Endoscopy at AIIMS Raipur. She has worked as a Specialist in Obstetrics & Gynaecology at ESIC Hospital, Raipur; Assistant Professor and Senior Resident at Shri Shankaracharya Institute of Medical Sciences, Bhilai; and Consultant Obstetrician & Gynecologist at Priya Hospital, Rajasthan.",

  training: [
    "Fellowship in Gynaecological Endoscopy – AIIMS Raipur",
  ],

  research: [],

  publications: [],

  opd: {
    days: [],
    timing: "",
  },
},

{
  id: "d-018",
  slug: "dr-deepa-ghodeshwar",
  name: "Dr. Deepa Ghodeshwar",
  designation:
    "IVF Specialist, Infertility Specialist, and Reproductive Medicine Consultant",
  speciality: "Reproductive Medicine",
  specialitySlug: "reproductive-medicine",
  department: "gynae",

  image: "/images/doctors/Dr-deepa.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/best-ivf-specialist-in-jabalpur/",

  languages: [],

  summary:
    "Dr. Deepa Ghodeshwar (Khobragade) is a highly experienced IVF Specialist, Infertility Specialist, and Reproductive Medicine Consultant with expertise in advanced fertility treatments, IVF procedures, gynecological care, and minimally invasive surgeries. She is known for delivering personalized fertility solutions with compassionate and evidence-based treatment approaches.",

  about: [
    "Dr. Deepa Ghodeshwar (Khobragade) is a highly experienced IVF Specialist, Infertility Specialist, and Reproductive Medicine Consultant with expertise in advanced fertility treatments, IVF procedures, gynecological care, and minimally invasive surgeries. She is known for delivering personalized fertility solutions with compassionate and evidence-based treatment approaches.",

    "With advanced training in Reproductive Medicine and IVF, Dr. Deepa has helped numerous couples overcome infertility challenges through modern reproductive technologies and advanced gynecological procedures. She has worked with reputed institutions including Apollo Hospital Bangalore, Government Medical College Nagpur, and leading fertility centers.",

    "Dr. Deepa Ghodeshwar provides expert infertility treatment, IVF care, reproductive medicine, and advanced gynecological treatment with a focus on personalized and women-centric care."
  ],

  qualifications: [
    {
      degree: "MS – Obstetrics & Gynaecology",
      institute: "Nagpur",
      year: "",
    },
    {
      degree: "FRM – Fellowship in Reproductive Medicine",
      institute: "Bangalore",
      year: "",
    },
    {
      degree: "MBBS",
      institute: "",
      year: "",
    },
  ],

  highlights: [
    {
      value: "IVF",
      label: "Specialist",
    },
    {
      value: "FRM",
      label: "Reproductive Medicine",
    },
    {
      value: "Infertility",
      label: "Specialist.",
    },
  ],

  expertise: [
    "IVF",
    "Infertility",
    "Reproductive Medicine",
    "IVF Treatment (Test Tube Baby Treatment)",
    "IUI (Intrauterine Insemination)",
    "Ovulation Induction",
    "IVF Stimulation Protocols",
    "Oocyte Retrieval",
    "Embryo Transfer",
    "Infertility Evaluation & Treatment",

    "PCOS & Hormonal Disorder Treatment",
    "High-Risk Pregnancy Care",
    "Recurrent Pregnancy Loss Treatment",
    "Menstrual Disorder Management",

    "Laparoscopy",
    "Hysteroscopy",
    "Ovarian Cyst Surgery",
    "Myomectomy",
    "Vaginal & Abdominal Hysterectomy",
  ],

  experience:
    "Dr. Deepa Ghodeshwar has worked as Assistant Professor at Indira Gandhi Government Medical College, Nagpur; Registrar at Apollo Hospital, Bangalore; and Senior Resident at GMCH, Nagpur.",

  training: [
    "FRM – Fellowship in Reproductive Medicine (Bangalore)",
  ],

  research: [],

  publications: [],

  opd: {
    days: [],
    timing: "",
  },
},
{
  id: "d-019",
  slug: "dr-biswa-prakash-patri",
  name: "Dr. Biswa Prakash Patri",
  designation:
    "Clinical Haematologist, Haemato-Oncologist & Bone Marrow Transplant Specialist",
  speciality: "Haematology & Haemato-Oncology",
  specialitySlug: "haematology-haemato-oncology",
  department: "onco",

  image: "/images/doctors/biswa.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/best-hematologist-in-jabalpur/",

  languages: [],

  summary:
    "Dr. Biswa Prakash Patri is a highly qualified Clinical Haematologist, Haemato-Oncologist, Bone Marrow Transplant & Cellular Therapy Specialist with extensive expertise in diagnosing and managing complex blood disorders and hematological cancers in both adults and children. With advanced super-specialty training and hands-on experience in stem cell transplantation, chemotherapy, immunotherapy, and pediatric hematology care, he provides comprehensive, evidence-based, and patient-centric treatment.",

  about: [
    "At Apollo JBP Hospitals, Jabalpur, Dr. Biswa Prakash Patri is a highly qualified Clinical Haematologist, Haemato-Oncologist, Bone Marrow Transplant & Cellular Therapy Specialist with extensive expertise in diagnosing and managing complex blood disorders and hematological cancers in both adults and children.",

    "With advanced super-specialty training from premier institutes and hands-on experience in stem cell transplantation, chemotherapy, immunotherapy, and pediatric hematology care, he provides comprehensive, evidence-based, and patient-centric treatment.",

    "Dr. Patri has received advanced training at Tata Medical Centre, Kolkata and Government Medical College, Gauhati, gaining expertise in benign and malignant hematological disorders, pediatric blood disorders, transplant medicine, and various cellular therapies.",

    "He has actively participated in multiple bone marrow transplant procedures and advanced cellular therapy programs, delivering high-end hematology care for both adults and children."
  ],

  qualifications: [
    {
      degree: "DM – Clinical Hematology",
      institute: "",
      year: "",
    },
    {
      degree:
        "Post-Doctoral Fellowship (PDF) in Clinical Hematology & Bone Marrow Transplant",
      institute: "Tata Medical Centre, Kolkata",
      year: "",
    },
    {
      degree: "MD (Path)",
      institute: "",
      year: "",
    },
    {
      degree: "MBBS",
      institute: "",
      year: "",
    },
  ],

  highlights: [
    {
      value: "DM",
      label: "Clinical Hematology",
    },
    {
      value: "BMT",
      label: "Bone Marrow Transplant",
    },
    {
      value: "Cellular",
      label: "Therapy Specialist",
    },
  ],

  expertise: [
    "Clinical Haematology",
    "Haemato-Oncology",
    "Bone Marrow Transplant",
    "Cellular Therapy",

    "Acute Leukemia (AML, ALL)",
    "Chronic Leukemia (CML, CLL)",
    "Pediatric Leukemia & Childhood Blood Cancers",
    "Lymphomas (Non-Hodgkin & Hodgkin Lymphoma)",
    "Multiple Myeloma",

    "Thalassemia & Hemoglobinopathies",
    "Pediatric Anemia & Nutritional Blood Disorders",
    "Hemophilia & Bleeding Disorders",
    "Aplastic Anemia",
    "Platelet Disorders (ITP)",
    "Sickle Cell Disease",
    "Bone Marrow Failure Syndromes",

    "Advanced Chemotherapy",
    "Immunotherapy",
    "Targeted Therapy",
    "Bone Marrow Transplant – Autologous & Allogenic",
    "Stem Cell Therapy",
    "Pediatric Bone Marrow Transplant Care",
    "Bone Marrow Aspiration & Biopsy",
    "Intrathecal Chemotherapy",
    "CAR-T Cell Therapy Support",
    "Pre & Post Transplant Care",
    "GVHD Management",
    "Pediatric Hematology & Hemato-Oncology Care",
  ],

  experience:
    "Dr. Biswa Prakash Patri has worked as Assistant Professor in the Department of Clinical Haematology & BMT at IMS & SUM Medical College & Hospital, Bhubaneswar; Senior Resident (DM) at Gauhati Medical College; Associate Consultant Hematologist at Bengal Faith Hospital; and completed Post Doctoral Fellowship at Tata Medical Centre, Kolkata. He has also contributed to clinical teaching, transplant unit development, and advanced hematology research.",

  training: [
    "Post-Doctoral Fellowship (PDF) in Clinical Hematology & Bone Marrow Transplant – Tata Medical Centre, Kolkata",
    "Advanced training in hematology and transplant medicine at Government Medical College, Gauhati",
  ],

  research: [
    "Multiple national & international publications in hematology",
    "Poster presentations at Haematocon & EGHCON",
    "Contributor to National Guidelines for Sickle Cell Disease (2022) by ICMR – ICH collaboration",
    "Award-winning research in hemophilia management",
  ],

  publications: [
    "Multiple national & international publications in hematology",
    "Poster presentations at Haematocon & EGHCON",
    "Contributor to National Guidelines for Sickle Cell Disease (2022) by ICMR – ICH collaboration",
    "Award-winning research in hemophilia management",
  ],

  opd: {
    days: [],
    timing: "",
  },
},


{
  id: "d-020",
  slug: "dr-shobhit-kumar-tripathi",
  name: "Dr. Shobhit Kumar Tripathi",
  designation: "Paediatric Emergency Specialist",
  speciality: "Paediatric Emergency",
  specialitySlug: "paediatric-emergency",
  department: "pediatrics",

  image: "/images/doctors/Dr-shobhit.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/paediatric-emergency-specialist-in-jabalpur/",

  languages: [],

  summary:
    "Dr. Shobhit Kumar Tripathi is a highly trained Paediatric Emergency Specialist and Pediatric Critical Care Specialist with advanced expertise in managing critically ill children, pediatric emergencies, neonatal intensive care, and PICU management. He is known for providing rapid, evidence-based, and compassionate care for newborns, infants, and children requiring emergency and intensive medical support.",

  about: [
    "Dr. Shobhit Kumar Tripathi is a highly trained Paediatric Emergency Specialist and Pediatric Critical Care Specialist with advanced expertise in managing critically ill children, pediatric emergencies, neonatal intensive care, and PICU management. He is known for providing rapid, evidence-based, and compassionate care for newborns, infants, and children requiring emergency and intensive medical support.",

    "Currently pursuing DM in Paediatric Emergency Medicine from AIIMS, Dr. Tripathi has extensive experience in Pediatric Intensive Care (PICU), Neonatal Intensive Care (NICU), emergency resuscitation, ventilator support, and advanced pediatric critical care procedures.",

    "As an Assistant Professor at Shankaracharya Hospital, he has managed pediatric emergency and critical care patients, supervised PICU care including ventilatory support and hemodynamic monitoring, conducted bedside teaching and academic sessions, and participated in departmental case discussions and academic activities."
  ],

  qualifications: [
    {
      degree: "DM – Paediatric Emergency Medicine",
      institute: "AIIMS",
      year: "",
    },
    {
      degree: "Fellowship in Neonatology",
      institute: "AIIMS Raipur",
      year: "",
    },
    {
      degree: "MD – Paediatrics",
      institute: "Govt. Medical College, Kota",
      year: "",
    },
    {
      degree: "MBBS",
      institute: "Maulana Azad Medical College, New Delhi",
      year: "",
    },
  ],

  highlights: [
    {
      value: "DM",
      label: "Paediatric Emergency",
    },
    {
      value: "PICU",
      label: "Critical Care Specialist",
    },
    {
      value: "NICU",
      label: "Neonatal Care",
    },
  ],

  expertise: [
    "Paediatric Emergency",
    "Pediatric Critical Care",
    "Pediatric Emergency Management",
    "Pediatric Intensive Care (PICU)",
    "Neonatal Intensive Care (NICU)",
    "Child Emergency Stabilization",
    "Pediatric Sepsis Management",
    "Shock & Critical Illness Management",
    "Pediatric Ventilator Support",
    "Emergency Resuscitation (PALS)",

    "Neonatal Emergency Care",
    "Premature Baby Care",
    "High-Risk Newborn Management",
    "Advanced Pediatric Critical Care",
    "Child ICU Management",
    "Respiratory Distress Management in Children",

    "Intubation & Airway Management",
    "Central & Arterial Line Insertion",
    "Lumbar Puncture",
    "Bronchoscopy",
    "CRRT Initiation",
    "Peritoneal Dialysis (PD)",
    "Plasmapheresis (PLEX)",
  ],

  experience:
    "Dr. Shobhit Kumar Tripathi has worked as Assistant Professor at Shankaracharya Hospital, where he managed pediatric emergency and critical care patients, supervised PICU including ventilatory support and hemodynamic monitoring, conducted bedside teaching and academic sessions, and participated in departmental case discussions and academic activities.",

  training: [
    "Fellowship in Neonatology – AIIMS Raipur",
  ],

  research: [],

  publications: [],

  opd: {
    days: [],
    timing: "",
  },
},
{
  id: "d-021",
  slug: "dr-gunjan-ghodeshwar",
  name: "Dr. Gunjan Ghodeshwar",
  designation: "Senior Consultant & Interventional Cardiologist",
  speciality: "Interventional Cardiology",
  specialitySlug: "interventional-cardiology",
  department: "cardiac",

  image: "/images/doctors/gunjan-ghodeshwar.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/best-cardiologist-in-jabalpur/",

  languages: [],

  summary:
    "Dr. Gunjan Ghodeshwar is a renowned Interventional Cardiologist in Jabalpur with extensive expertise in advanced cardiac procedures, emergency heart care, angioplasty, pacemaker implantation, and preventive cardiology. He is associated with Apollo JBP Hospitals and specializes in diagnosing and treating complex cardiovascular diseases with precision, compassion, and evidence-based treatment protocols.",

  about: [
    "Dr. Gunjan Ghodeshwar is a renowned Interventional Cardiologist in Jabalpur with extensive expertise in advanced cardiac procedures, emergency heart care, angioplasty, pacemaker implantation, and preventive cardiology.",

    "Recognized as one of the Best Cardiologists in Jabalpur, Dr. Gunjan Ghodeshwar specializes in diagnosing and treating complex cardiovascular diseases with precision, compassion, and evidence-based treatment protocols. His experience as an AIIMS Nagpur Cardiologist further strengthens his expertise in handling critical and advanced cardiac cases.",

    "Dr. Gunjan Ghodeshwar consults at Apollo JBP Hospitals, Jabalpur, providing comprehensive cardiac care supported by modern cardiac diagnostics, emergency services, cath lab facilities, and advanced critical care support."
  ],

  qualifications: [
    {
      degree: "MBBS",
      institute: "Government Medical College, Nagpur",
      year: "",
    },
    {
      degree: "MD (Medicine)",
      institute: "Gandhi Medical College, Bhopal",
      year: "",
    },
    {
      degree: "DM (Cardiology)",
      institute:
        "Sri Jayadeva Institute of Cardiovascular Sciences & Research, Bangalore",
      year: "",
    },
    {
      degree: "FSCAI",
      institute:
        "Fellow of Society for Cardiovascular Angiography and Interventions",
      year: "",
    },
  ],

  highlights: [
    {
      value: "DM",
      label: "Cardiology",
    },
    {
      value: "FSCAI",
      label: "Interventional Cardiology",
    },
    {
      value: "AIIMS",
      label: "Former Associate Professor",
    },
  ],

  expertise: [
    "Interventional Cardiology",
    "Coronary Angiography",
    "Coronary Angioplasty & Stent Placement",
    "Heart Attack Treatment & Emergency Cardiac Care",
    "Complex Cardiac Interventions",
    "Pacemaker Implantation",
    "AICD Implantation (Automatic Implantable Cardioverter Defibrillator)",
    "Hypertension & Heart Failure Treatment",
    "Arrhythmia & Chest Pain Management",
    "ECG, 2D Echo & Comprehensive Cardiac Evaluation",
    "Diabetes-related Heart Disease Care",
    "Preventive Cardiology & Lifestyle Heart Care",
    "Advanced Cardiac Critical Care",
  ],

  experience:
    "Dr. Gunjan Ghodeshwar has vast experience in advanced cardiac interventions and critical cardiac care. He has worked as Ex-Consultant Cardiologist at Platina Heart Hospital and as Former Associate Professor in the Department of Cardiology at AIIMS Nagpur.",

  training: [],

  research: [
    "National and international cardiac research studies focusing on cardiovascular disease management",
    "Research studies related to heart failure",
    "Research studies related to preventive cardiology",
    "Research studies related to acute coronary syndrome",
  ],

  publications: [],

  opd: {
    days: [],
    timing: "",
  },
},


 {
  id: "d-022",
  slug: "dr-prabhat-kumar",
  name: "Dr. Prabhat Kumar",
  designation:
    "Associate Consultant – Robotic & Laparoscopic Colorectal Surgeon",
  speciality: "Colorectal Surgery",
  specialitySlug: "colorectal-surgery",
  department: "surgical",

  image: "/images/doctors/prabhat.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/best-surgeon-3/",

  languages: ["English", "Hindi"],

  summary:
    "Dr. Prabhat Kumar is a highly skilled robotic and laparoscopic colorectal surgeon in Jabalpur, specializing in advanced colorectal and minimally invasive surgeries. He has strong expertise in managing complex gastrointestinal conditions with a focus on precise surgical outcomes, safety, and faster recovery.",

  about: [
    "Dr. Prabhat Kumar is a robotic and laparoscopic colorectal surgeon specializing in advanced colorectal and minimally invasive surgeries.",
    "He has been trained at Sir Ganga Ram Hospital, New Delhi, with expertise in complex colorectal procedures, minimally invasive gastrointestinal surgery, cancer surgery, and advanced laparoscopic and robotic techniques.",
    "His clinical interests include sphincter-preserving rectal cancer surgery, TaTME, TAMIS, complex abdominal wall reconstruction, hernia surgery, and management of inflammatory bowel diseases.",
    "He follows an evidence-based and patient-centric approach with a focus on precision, safety, and faster recovery."
  ],

  qualifications: [
    {
      degree: "MBBS",
      institute: "University College of Medical Sciences, New Delhi",
      year: "",
    },
    {
      degree: "DNB – General Surgery",
      institute: "Sir Ganga Ram Hospital, New Delhi",
      year: "",
    },
    {
      degree: "Fellowship in MIS & Robotic Colon and Rectal Surgery",
      institute: "Sir Ganga Ram Hospital, New Delhi",
      year: "",
    },
  ],

  highlights: [
    {
      value: "Robotic",
      label: "Colorectal Surgery",
    },
    {
      value: "MIS",
      label: "Advanced Surgery",
    },
    {
      value: "SGRH",
      label: "Advanced Surgical Training",
    },
  ],

  expertise: [
    "Robotic colorectal surgery",
    "Colorectal surgery",
    "Colon and rectal cancer surgery",
    "Laser treatment for piles, fissure and fistula",
    "Colonoscopy and therapeutic endoscopy",
    "Hernia surgery including laparoscopic and complex repair",
    "Gallbladder and appendix surgery",
    "Minimally invasive gastrointestinal surgery",
    "Advanced laparoscopic and robotic colorectal procedures including LAR and APR",
    "Sphincter-preserving rectal cancer surgery",
    "TaTME and TAMIS",
    "Colonoscopy with polypectomy, EMR and biopsies",
    "Management of inflammatory bowel diseases",
    "Complex abdominal wall reconstruction and hernia surgery",
    "Minimally invasive cancer surgery",
  ],

  experience:
    "Dr. Prabhat Kumar has trained and worked at Sir Ganga Ram Hospital, New Delhi, one of India's leading centers for advanced surgical care. He has expertise in advanced laparoscopic and robotic colorectal procedures including LAR and APR, with special interest in sphincter-preserving rectal cancer surgery, TaTME and TAMIS. He also performs colonoscopy with polypectomy, EMR and biopsies, manages inflammatory bowel diseases, and is experienced in complex abdominal wall reconstruction and hernia surgeries.",

  training: [
    "Fellowship in MIS & Robotic Colon and Rectal Surgery at Sir Ganga Ram Hospital, New Delhi",
    "Advanced training in robotic-assisted colorectal surgery",
    "Advanced laparoscopic and minimally invasive gastrointestinal surgery training",
    "Training in colonoscopy and therapeutic endoscopic interventions",
  ],

  research: [],

  publications: [
    "Presented clinical cases at national conferences including ACRSICON.",
    "Organized national-level workshops on colorectal diseases.",
  ],

  opd: {
    days: [],
    timing: "",
  },
},

{
  id: "d-023",
  slug: "dr-saad-shaikh",
  name: "Dr. Saad Shaikh",
  designation:
    "Consultant – General, Laparoscopic, Laser, HPB & Robotic Surgeon",
  speciality: "General & Laparoscopic Surgery",
  specialitySlug: "general-laparoscopic-surgery",
  department: "surgical",

  image: "/images/doctors/saad-shaikh.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/best-surgeon-2/",

  languages: ["English", "Hindi"],

  summary:
    "Dr. Saad Shaikh is a highly skilled and experienced General Surgeon in Jabalpur and an expert Laparoscopic, Laser, HPB and Robotic Surgeon. He specializes in advanced and complex surgical procedures with a focus on precision, safe outcomes and faster recovery.",

  about: [
    "Dr. Saad Shaikh is a General Surgeon and an expert Laparoscopic, Laser, HPB and Robotic Surgeon known for performing advanced and complex surgical procedures with precision.",
    "With extensive training in minimal access surgery, robotic surgery, HPB surgery and laser proctology, he specializes in complex hernia, appendicitis, gallbladder stones, gastrointestinal surgeries, piles, fissure and fistula.",
    "He has successfully performed 3000+ surgeries and has extensive experience in advanced laparoscopic, open and laser procedures, liver transplant-related care and hepato-pancreato-biliary surgeries.",
    "His approach focuses on minimally invasive techniques, precision, safety and faster recovery for patients."
  ],

  qualifications: [
    {
      degree: "MBBS",
      institute: "Seth G.S. Medical College & KEM Hospital, Mumbai",
      year: "",
    },
    {
      degree: "MS – General Surgery",
      institute: "Grant Government Medical College & Sir JJ Hospital, Mumbai",
      year: "",
    },
    {
      degree: "F.MAS & D.MAS – Laparoscopic Surgery",
      institute: "World Laparoscopy Hospital, NCR – Batch Topper",
      year: "",
    },
    {
      degree: "F.I.C.R.S",
      institute: "International College of Robotic Surgeons",
      year: "",
    },
    {
      degree:
        "Fellowship in Hepato-Pancreato-Biliary & Liver Transplant Surgery",
      institute: "Gleneagles Global Hospital, Mumbai",
      year: "",
    },
  ],

  highlights: [
    {
      value: "3000+",
      label: "Surgeries Performed",
    },
    {
      value: "100+",
      label: "Liver Transplant Cases",
    },
    {
      value: "300+",
      label: "HPB Surgeries",
    },
  ],

  expertise: [
    "General surgery",
    "Laparoscopic and minimally invasive surgery",
    "Robotic surgery",
    "Hernia surgery including TAPP, TEP and IPOM",
    "Gallbladder stone surgery and cholecystectomy",
    "Laser treatment for piles, fissure and fistula",
    "Gastrointestinal and HPB surgeries",
    "Appendix surgery and appendectomy",
    "Breast lump and general surgical procedures",
    "Advanced liver and pancreatic surgery",
    "Laser-based treatment for anorectal conditions",
    "Liver transplant surgery",
  ],

  experience:
    "Dr. Saad Shaikh brings extensive experience as a Consultant Laparoscopic, Laser, HPB and Robotic Surgeon, having worked in multiple reputed hospitals. He has performed 3000+ advanced laparoscopic, open and laser surgeries, been part of 100+ liver transplant cases, and performed 300+ hepato-pancreato-biliary surgeries. He has expertise in managing complex gastrointestinal conditions and advanced surgical procedures.",

  training: [
    "F.MAS & D.MAS in Laparoscopic Surgery from World Laparoscopy Hospital, NCR – Batch Topper",
    "F.I.C.R.S – Fellowship of International College of Robotic Surgeons",
    "Fellowship in Hepato-Pancreato-Biliary & Liver Transplant Surgery at Gleneagles Global Hospital, Mumbai",
    "Advanced training in minimal access and laparoscopic surgery",
    "Advanced training in robotic surgery and laser proctology",
  ],

  research: [],

  publications: [],

  opd: {
    days: [],
    timing: "",
  },
},

{
  id: "d-024",
  slug: "dr-p-ravi-teja",
  name: "Dr. P. Ravi Teja",
  designation: "Consultant – General, Laparoscopic & Laser Surgeon",
  speciality: "General Surgery",
  specialitySlug: "general-surgery",
  department: "surgical",

  image: "/images/doctors/ravi-teja.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/best-surgeon/",

  languages: ["English", "Hindi", "Telagu"],

  summary:
    "Dr. P. Ravi Teja is a highly experienced General Surgeon in Jabalpur and a trusted Laparoscopic Surgeon specializing in advanced minimally invasive and laser-based procedures. He focuses on patient safety, precision, faster recovery and comprehensive surgical care.",

  about: [
    "Dr. P. Ravi Teja is an experienced General and Laparoscopic Surgeon specializing in advanced minimally invasive and laser-based surgical procedures.",
    "He provides comprehensive treatment for a wide range of surgical conditions including hernia, gallbladder stones, piles, fissure, fistula, appendix conditions, varicose veins and colorectal conditions.",
    "With experience across reputed hospitals, he has performed laparoscopic surgeries, emergency surgeries and complex colorectal operations using modern surgical techniques.",
    "His practice emphasizes patient safety, precision, minimal discomfort, faster recovery, strong patient communication and ethical care."
  ],

  qualifications: [
    {
      degree: "MS – General Surgery",
      institute: "",
      year: "",
    },
    {
      degree: "MBBS",
      institute: "Manipal College of Medical Sciences",
      year: "",
    },
    {
      degree: "F.MAS & D.MAS – Laparoscopic Surgery",
      institute: "World Laparoscopy Hospital, Delhi NCR",
      year: "",
    },
    {
      degree: "Fellowship in GI Endoscopy",
      institute: "",
      year: "",
    },
    {
      degree: "Fellowship in Laser Proctology & Varicose Veins Treatment",
      institute: "",
      year: "",
    },
    {
      degree: "FALS – Fellowship in Colorectal Surgery",
      institute: "",
      year: "",
    },
  ],

  highlights: [
    {
      value: "FALS",
      label: "Colorectal Surgery",
    },
    {
      value: "F.MAS",
      label: "Laparoscopic Surgery",
    },
    {
      value: "Laser",
      label: "Proctology & Veins",
    },
  ],

  expertise: [
    "General surgery",
    "Laparoscopic and minimally invasive surgery",
    "Hernia surgery",
    "Gallbladder stone surgery and cholecystectomy",
    "Appendix surgery and appendectomy",
    "Laser treatment for piles, fissure and fistula",
    "Varicose veins laser treatment",
    "Gastrointestinal endoscopy",
    "Colorectal surgery",
    "Bariatric and weight loss surgery",
    "AV fistula for dialysis patients",
    "GI onco surgeries",
    "Emergency surgery",
    "Complex colorectal operations",
  ],

  experience:
    "Dr. P. Ravi Teja has extensive clinical experience across reputed hospitals. He has worked as Senior Resident at SVRRGGH Hospital, Tirupati, Consultant at Life Care Hospital, Maharashtra, Consultant at Viswas Hospital, Guntur, and Consultant at Victor Hospital, Goa. He has successfully performed numerous laparoscopic surgeries, emergency surgeries and complex colorectal operations.",

  training: [
    "F.MAS & D.MAS in Laparoscopic Surgery from World Laparoscopy Hospital, Delhi NCR",
    "Fellowship in GI Endoscopy",
    "Fellowship in Laser Proctology & Varicose Veins Treatment",
    "FALS – Fellowship in Colorectal Surgery",
    "Advanced training in minimally invasive laparoscopic surgery",
    "Advanced laser surgical techniques for piles and varicose veins",
  ],

  research: [],

  publications: [],

  opd: {
    days: [],
    timing: "",
  },
}
,

{
  id: "d-025",
  slug: "dr-partha-pratim-jana",
  name: "Dr. Partha Pratim Jana",
  designation: "Consultant – Infectious Diseases",
  speciality: "Infectious Diseases",
  specialitySlug: "infectious-diseases",
  department: "infectious",

  image: "/images/doctors/partha-pratim.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/infectious-disease-specialist-in-jabalpur/",

  languages: ["English", "Hindi"],

  summary:
    "Dr. Partha Pratim Jana is a leading Infectious Disease Specialist in Jabalpur, practicing at Apollo JBP Hospitals. He has extensive expertise in infection control, antimicrobial resistance and critical care infections, with experience managing bacterial, viral, fungal and parasitic diseases.",

  about: [
    "Dr. Partha Pratim Jana is an Infectious Disease Specialist at Apollo JBP Hospitals, Jabalpur, with extensive experience in infection control, antimicrobial resistance and critical care infections.",
    "He provides expert management for bacterial, viral, fungal and parasitic diseases, including drug-resistant infections, HIV/AIDS, sepsis and hospital-acquired infections.",
    "Trained at Maulana Azad Medical College, New Delhi and Jupiter Hospital, Pune, he combines his background in microbiology and family medicine to provide comprehensive and patient-centered infectious disease care.",
    "His clinical interests include antimicrobial resistance, diagnostic stewardship, infection prevention and control, critical care infections, sepsis and infections in immunocompromised and transplant patients."
  ],

  qualifications: [
    {
      degree: "Post-Doctoral Fellowship – Infectious Diseases",
      institute: "Jupiter Hospital, Pune",
      year: "",
    },
    {
      degree: "MD – Microbiology",
      institute: "Maulana Azad Medical College, New Delhi",
      year: "",
    },
    {
      degree: "MMed – Family Medicine",
      institute: "CMC Vellore / MGR University",
      year: "",
    },
    {
      degree: "CTCCM – Critical Care Medicine",
      institute: "Indian Society of Critical Care Medicine",
      year: "",
    },
    {
      degree: "CCEBDM – Diabetes Management",
      institute: "Public Health Foundation of India",
      year: "",
    },
    {
      degree: "MBBS",
      institute: "IMTU, Guntur, Andhra Pradesh",
      year: "",
    },
  ],

  highlights: [
    {
      value: "AMR",
      label: "Antimicrobial Resistance",
    },
    {
      value: "ICU",
      label: "Critical Care Infections",
    },
    {
      value: "IPC",
      label: "Infection Prevention",
    },
  ],

  expertise: [
    "Infectious diseases",
    "Tropical and systemic infections including malaria, typhoid, dengue and scrub typhus",
    "HIV and opportunistic infections",
    "Tuberculosis including MDR-TB and XDR-TB",
    "Invasive fungal infections including mucormycosis, aspergillosis and candidiasis",
    "Hospital-acquired and ICU infections",
    "Infections in cancer and transplant patients",
    "Post-surgical and device-related infections",
    "Antibiotic stewardship",
    "Infection prevention and control programs",
    "Adult immunization",
    "Infection risk assessment",
    "Antimicrobial resistance and diagnostic stewardship",
    "Critical care infections and sepsis management",
    "Infections in immunocompromised and transplant patients",
  ],

  experience:
    "Dr. Partha Pratim Jana is a Consultant in Infectious Diseases at Apollo JBP Hospitals, Jabalpur. His previous professional experience includes Postdoctoral Fellowship in Infectious Diseases at Jupiter Hospital, Pune; Senior Resident in Microbiology at ESI Medical College, Kolkata; and Consultant roles in Critical Care and Internal Medicine at AMRI, Belle Vue, Desun, Mission and Yashoda Hospitals.",

  training: [
    "Post-Doctoral Fellowship in Infectious Diseases at Jupiter Hospital, Pune",
    "CTCCM – Critical Care Medicine from Indian Society of Critical Care Medicine",
    "CCEBDM – Diabetes Management from Public Health Foundation of India",
    "Training in infection control and antimicrobial resistance management",
  ],

  research: [
    "Research and publications on tuberculosis.",
    "Research and publications on fungal infections.",
    "Research and publications on infective endocarditis.",
    "Research and publications on drug resistance.",
    "Presented infectious disease research at MYCOCON, CIDSCON, CRITICARE and IAMM conferences.",
    "Recognized among the Top 5 Oral Presenters at CRITICARE 2024 for infectious disease research.",
  ],

  publications: [
    "Published multiple papers in national and international journals on tuberculosis, fungal infections, infective endocarditis and drug resistance.",
  ],

  opd: {
    days: [],
    timing: "",
  },
}
,


{
  id: "d-026",
  slug: "dr-payal-sharma",
  name: "Dr. Payal Sharma",
  designation: "Consultant – Interventional Radiology",
  speciality: "Interventional Radiology",
  specialitySlug: "interventional-radiology",
  department: "radiology",

  image: "/images/doctors/payal-sharma.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/interventional-radiologist-in-jabalpur/",

  languages: ["English", "Hindi"],

  summary:
    "Dr. Payal Sharma is a highly skilled Interventional Radiologist in Jabalpur with specialized expertise in image-guided cancer interventions, minimally invasive vascular procedures and advanced oncological radiology treatments. She has received advanced fellowship training from Tata Memorial Hospital, Mumbai.",

  about: [
    "Dr. Payal Sharma is a highly skilled Interventional Radiologist in Jabalpur specializing in image-guided cancer interventions, minimally invasive vascular procedures and advanced oncological radiology treatments.",
    "She has received advanced fellowship training in Interventional Radiology from Tata Memorial Hospital, Mumbai, one of India's premier cancer centers.",
    "With a strong academic background and hands-on experience in complex interventional procedures, she is known for precision, clinical judgment and a multidisciplinary approach to patient care.",
    "She provides image-guided cancer interventions, minimally invasive vascular procedures, biopsies, tumor treatments, embolization procedures and other interventional radiology services."
  ],

  qualifications: [
    {
      degree: "Fellowship in Interventional Radiology (FVIR)",
      institute: "Tata Memorial Hospital, Mumbai",
      year: "",
    },
    {
      degree: "MD – Radiodiagnosis",
      institute: "Institute of Medical Sciences (IMS), BHU, Varanasi",
      year: "",
    },
    {
      degree: "MBBS",
      institute: "",
      year: "",
    },
  ],

  highlights: [
    {
      value: "TMH",
      label: "Interventional Radiology Fellowship",
    },
    {
      value: "500+",
      label: "Vascular Interventions Assisted",
    },
    {
      value: "5000+",
      label: "CT & USG Procedures",
    },
  ],

  expertise: [
    "Interventional radiology",
    "Interventional oncology",
    "Image-guided tumor ablation including Microwave, RFA and Cryoablation",
    "Transarterial Chemoembolization including TACE, DEB-TACE and DEB-IRI",
    "Radioembolization including SIRT / TARE",
    "Image-guided biopsies for cancer diagnosis",
    "Diagnostic and therapeutic angiography",
    "Angioembolization for trauma",
    "Angioembolization for gastrointestinal bleeding",
    "Angioembolization for tumors",
    "Angioembolization for AVMs",
    "Pre-operative embolization",
    "CT-guided biopsies",
    "Ultrasound-guided biopsies",
    "Image-guided drainages",
    "CT, MRI and ultrasound interpretation",
    "Minimally invasive vascular procedures",
  ],

  experience:
    "Dr. Payal Sharma has worked as Assistant Professor – Radiodiagnosis at Netaji Subhash Chandra Bose Medical College, Jabalpur. During her fellowship training at Tata Memorial Hospital, Mumbai, she performed 100+ angiographic and embolization procedures, assisted in 500+ complex vascular interventions, participated in 5000+ CT and USG-guided procedures, and was actively involved in tumor boards and multidisciplinary cancer care.",

  training: [
    "Fellowship in Interventional Radiology (FVIR) at Tata Memorial Hospital, Mumbai",
    "Advanced training in image-guided cancer interventions",
    "Advanced training in minimally invasive vascular and embolization procedures",
    "Training in CT and ultrasound-guided interventional procedures",
    "Multidisciplinary tumor board and cancer care experience",
  ],

  research: [],

  publications: [],

  opd: {
    days: [],
    timing: "4:00 PM – 6:00 PM",
  },
},

{
  id: "d-027",
  slug: "dr-adam-teja",
  name: "Dr. Adam Teja",
  designation: "Robotic Joint Replacement & Endoscopic Spine Surgeon",
  speciality: "Orthopaedics & Spine",
  specialitySlug: "orthopaedics-spine",
  department: "orthopedics",

  image: "/images/doctors/adam-teja.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/best-orthopedic-surgeon-in-jabalpur/",

  languages: ["English", "Hindi"],

  summary:
    "Dr. Adam Teja is a highly skilled orthopedic surgeon in Jabalpur with over 10 years of clinical experience, specializing in endoscopic spine surgery, Monoportal and Biportal (UBE), robotic joint replacement, arthroscopy and complex trauma care. He combines advanced surgical techniques with patient-centric care to support long-term functional recovery.",

  about: [
    "Dr. Adam Teja is an experienced orthopedic surgeon in Jabalpur with over 10 years of clinical experience in advanced orthopaedic and trauma care.",
    "He specializes in endoscopic spine surgery including Monoportal and Biportal UBE, robotic hip and knee joint replacement, arthroscopy and complex trauma management.",
    "With international and national fellowship training, he combines minimally invasive surgical techniques with patient-centric care to achieve long-term functional recovery.",
    "His clinical practice covers spine disorders, joint degeneration, sports injuries, ligament injuries, fractures and complex orthopaedic conditions."
  ],

  qualifications: [
    {
      degree: "Fellowship in Endoscopic Spine Surgery",
      institute: "RASE, India",
      year: "",
    },
    {
      degree: "Fellowship in Arthroplasty",
      institute: "Hospital Erasme, Brussels, Belgium",
      year: "",
    },
    {
      degree: "Fellowship in Arthroplasty",
      institute: "Nanavati Super Specialty Hospital, Mumbai",
      year: "",
    },
    {
      degree: "Fellowship in Arthroscopy",
      institute: "Sancheti Institute, Pune",
      year: "",
    },
    {
      degree: "MS – Orthopaedics",
      institute: "SMS Medical College, Jaipur",
      year: "",
    },
    {
      degree: "MBBS",
      institute: "Government Medical College, Akola",
      year: "",
    },
  ],

  highlights: [
    {
      value: "10+",
      label: "Years of Experience",
    },
    {
      value: "UBE",
      label: "Endoscopic Spine Surgery",
    },
    {
      value: "Robotic",
      label: "Joint Replacement",
    },
  ],

  expertise: [
    "Endoscopic spine surgery",
    "Monoportal and Biportal UBE (Unilateral Biportal Endoscopy)",
    "Trans-foraminal endoscopy",
    "Cervical and lumbar disc herniation treatment",
    "Canal stenosis management",
    "Robotic hip and knee arthroplasty",
    "Shoulder, knee and sports injury arthroscopy",
    "ACL tears",
    "PCL tears",
    "Meniscus tears",
    "Bankart repair",
    "Rotator cuff tears",
    "Osteoarthritis and degenerative joint diseases",
    "Minimally invasive spine procedures",
    "Endoscopic fusion procedures",
    "Spondylolisthesis management",
    "Complex fracture and trauma management",
  ],

  experience:
    "Dr. Adam Teja has over 10 years of clinical experience in orthopaedic surgery. His clinical expertise includes endoscopic spine surgery, robotic hip and knee arthroplasty, arthroscopy, minimally invasive spine procedures and complex fracture and trauma management.",

  training: [
    "Fellowship in Endoscopic Spine Surgery from RASE, India",
    "Fellowship in Arthroplasty at Hospital Erasme, Brussels, Belgium",
    "Fellowship in Arthroplasty at Nanavati Super Specialty Hospital, Mumbai",
    "Fellowship in Arthroscopy at Sancheti Institute, Pune",
    "International teaching faculty experience in Spine Endoscopy Workshops in India, Egypt and USA",
    "Eminent faculty at National Arthroplasty and Spine Conferences",
  ],

  research: [
    "Research on lumbar disc herniation",
    "Research on spine decompression techniques",
    "Research on joint replacement outcomes",
    "Research on shoulder and trauma surgery",
  ],

  publications: [
    "Research and academic work related to lumbar disc herniation, spine decompression techniques, joint replacement outcomes, and shoulder and trauma surgery.",
  ],

  opd: {
    days: [],
    timing: "",
  },
}
,

{
  id: "d-028",
  slug: "dr-sumit-sanjaykant-trivedi",
  name: "Dr. Sumit Sanjaykant Trivedi",
  designation: "Consultant – Anaesthesiology & Critical Care",
  speciality: "Anaesthesiology & Critical Care",
  specialitySlug: "anaesthesiology-critical-care",
  department: "critical-care",

  image: "/images/doctors/sumit-sanjaykant.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/best-anaesthesiologist-in-jabalpur/",

  languages: ["English", "Hindi"],

  summary:
    "Dr. Sumit Trivedi is an experienced and compassionate Anaesthesiologist and Critical Care Specialist with extensive hands-on experience in peri-operative anaesthesia, airway management, emergency medicine and ICU care. He is known for precision, patient-focused care and a strong commitment to safety.",

  about: [
    "Dr. Sumit Trivedi is an experienced Anaesthesiologist and Critical Care Specialist with extensive hands-on experience in peri-operative anaesthesia, airway management, emergency medicine and ICU care.",
    "He completed his MBBS from Maharashtra University of Health Sciences and pursued further specialization from Jawaharlal Nehru Medical College, DMIMS Wardha and Indraprastha Apollo Hospitals, New Delhi.",
    "His clinical practice includes advanced airway management, difficult intubations, regional and neuraxial anaesthesia, critical care and peri-operative management of high-risk surgical patients.",
    "He follows an ethical, evidence-based and patient-centric approach with a strong focus on patient safety, medical education and clinical training."
  ],

  qualifications: [
    {
      degree: "Diploma in Anaesthesiology (DA)",
      institute: "Jawaharlal Nehru Medical College, DMIMS (DU), Wardha",
      year: "",
    },
    {
      degree: "Diploma in Emergency Medicine (DEM)",
      institute: "Indraprastha Apollo Hospital, New Delhi",
      year: "",
    },
    {
      degree: "MBBS",
      institute: "Maharashtra University of Health Sciences, Nagpur",
      year: "",
    },
  ],

  highlights: [
    {
      value: "DA",
      label: "Anaesthesiology",
    },
    {
      value: "ICU",
      label: "Critical Care",
    },
    {
      value: "Airway",
      label: "Advanced Management",
    },
  ],

  expertise: [
    "General anaesthesia",
    "Regional anaesthesia",
    "Neuraxial blocks including spinal, epidural and CSE",
    "Fibre-optic intubation",
    "Awake intubation",
    "Peripheral nerve blocks",
    "Pain procedures",
    "Airway management in ICU and emergency settings",
    "Peri-operative care for high-risk cardiac surgeries",
    "Peri-operative care for high-risk neurological surgeries",
    "Peri-operative care for high-risk trauma surgeries",
    "Tracheostomy",
    "Post-operative critical care monitoring",
    "Emergency medicine",
    "Critical care",
  ],

  experience:
    "Dr. Sumit Trivedi has extensive professional experience in anaesthesiology and critical care. He has worked as Consultant Anaesthesiologist & Critical Care Physician at V.Y. Hospital, Raipur (2015 – Present), Senior Resident in Anaesthesiology at RIMS Hospital, Raipur (2016 – 2024), Lecturer in the Department of Anaesthesiology at Jawaharlal Nehru Medical College, Wardha (2014 – 2015), and completed his rotating internship at NKP Salve Institute of Medical Sciences, Nagpur.",

  training: [
    "Diploma in Anaesthesiology (DA) from Jawaharlal Nehru Medical College, DMIMS (DU), Wardha",
    "Diploma in Emergency Medicine (DEM) from Indraprastha Apollo Hospital, New Delhi",
    "Advanced training in airway management and difficult intubation",
    "Training in regional and neuraxial anaesthesia techniques",
    "Training in critical care and peri-operative safety",
  ],

  research: [
    "Tracheostomy vs. Translaryngeal Intubation in Surgical ICU – DMIMS Journal",
    "Benign Fibrous Histiocytoma – A Rare Case Report – International Journal of Dental Clinics",
    "Formula for Determining ABG – co-authored; pending publication",
    "Comparative Study of Blood Sugar Levels Post-IV Induction Agents (Propofol vs Thiopentone Sodium) – ongoing",
  ],

  publications: [
    "Tracheostomy vs. Translaryngeal Intubation in Surgical ICU – DMIMS Journal",
    "Benign Fibrous Histiocytoma – A Rare Case Report – International Journal of Dental Clinics",
  ],

  opd: {
    days: [],
    timing: "",
  },
},

{
  id: "d-029",
  slug: "dr-jagan-nayakulu-hanumanthu",
  name: "Dr. (Surg. Capt.) Jagan Nayakulu Hanumanthu",
  designation: "Senior Consultant & Interventional Cardiologist",
  speciality: "Interventional Cardiology",
  specialitySlug: "interventional-cardiology",
  department: "cardiac",

  image: "/images/doctors/hanumanthu.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/interventional-cardiologist-jabalpur/",

  languages: ["English", "Hindi"],

  summary:
    "Dr. Jagan Nayakulu Hanumanthu is a highly distinguished Senior Interventional Cardiologist with over four decades of clinical, academic and research experience in cardiology and internal medicine. A graduate of AIIMS, New Delhi, he has served with distinction in the Armed Forces Medical Services and held senior academic and leadership positions across leading medical institutions.",

  about: [
    "Dr. Jagan Nayakulu Hanumanthu is a highly distinguished Senior Interventional Cardiologist with over four decades of clinical, academic and research experience in cardiology and internal medicine.",
    "He has served with distinction in the Armed Forces Medical Services (Indian Navy), progressing from Medical Officer to Professor and Head of the Department of Cardiology.",
    "He has held key academic and leadership positions at institutions including Global Hospitals Hyderabad, Narayana Medical College Nellore, Manipal Super Specialty Hospital Vizag and Aarupadai Veedu Medical College & Hospital Pondicherry.",
    "He is a recognized teacher for DM Cardiology under the Medical Council of India and has trained numerous cardiologists across India.",
    "His clinical expertise spans diagnostic and interventional cardiology, complex coronary interventions, structural heart disease, acute coronary syndromes, heart failure, arrhythmia management and preventive cardiology."
  ],

  qualifications: [
    {
      degree: "MBBS",
      institute: "Andhra Medical College, Visakhapatnam",
      year: "",
    },
    {
      degree: "MD – General Medicine",
      institute: "Armed Forces Medical College (AFMC), Pune",
      year: "",
    },
    {
      degree: "DNB – Medicine",
      institute: "National Board of Examinations, New Delhi",
      year: "",
    },
    {
      degree: "DM – Cardiology",
      institute: "All India Institute of Medical Sciences (AIIMS), New Delhi",
      year: "",
    },
  ],

  highlights: [
    {
      value: "45+",
      label: "Years of Experience",
    },
    {
      value: "5600+",
      label: "Angiography & Angioplasty",
    },
    {
      value: "DM",
      label: "Cardiology – AIIMS",
    },
  ],

  expertise: [
    "Interventional cardiology",
    "Diagnostic cardiology",
    "Coronary angiography",
    "Coronary angioplasty",
    "Peripheral angioplasty",
    "Renal angioplasty",
    "Device closures including PDA and ASD",
    "Coil embolization",
    "Mitral balloon valvuloplasty",
    "Pulmonary balloon valvuloplasty",
    "Electrophysiology studies",
    "Radiofrequency ablation",
    "Pacemaker implantation",
    "ICD implantation",
    "Acute coronary syndrome management",
    "Heart failure management",
    "Complex coronary interventions",
    "Structural heart disease",
    "Hypertension management",
    "Dyslipidemia management",
    "Arrhythmia management",
    "Preventive cardiology",
  ],

  experience:
    "Dr. Hanumanthu has over four decades of clinical, academic and research experience, with more than 45 years of national and international experience. He has performed over 5,600 coronary angiography and angioplasty procedures. His academic and professional experience includes Professor & Director of Interventional Cardiology at Narayana Medical College, Nellore; Chief Consultant Cardiologist at Global Hospitals, Hyderabad; Visiting Professor at Maharaja's Institute of Medical Sciences, Vizianagaram and Mamatha Medical College, Khammam; and Professor in Medicine & Cardiology at Armed Forces Medical College and Army Hospital (Research & Referral), New Delhi. He has also served as Faculty and Recognized Examiner for DM Cardiology and MD Medicine under MCI.",

  training: [
    "Observer-ship in Interventional Cardiology at Mount Sinai Hospital, New York, USA, on deputation by the Government of India",
    "Advanced training in diagnostic and interventional cardiology",
    "Advanced training in complex coronary and structural heart interventions",
    "Training and academic experience in electrophysiology and device therapy",
  ],

  research: [
    "Published and presented over 20 scientific papers in reputed national and international conferences and journals.",
    "Unusual Cardiac Complications after Lithotripsy – The Lancet (1994)",
    "Emerging Risk Factors for Coronary Artery Disease – Journal of Marine Medicine (2002)",
    "Immediate Multi-vessel Primary PCI in Delayed STEMI Patients – SCAI, Las Vegas (2019)",
    "Best Paper Presentation – SCAI Conference, Las Vegas, USA (2019)",
    "Chaired sessions at major cardiology conferences across India.",
  ],

  publications: [
    "Unusual Cardiac Complications after Lithotripsy – The Lancet (1994)",
    "Emerging Risk Factors for Coronary Artery Disease – Journal of Marine Medicine (2002)",
    "Immediate Multi-vessel Primary PCI in Delayed STEMI Patients – SCAI, Las Vegas (2019)",
    "Author and co-editor of “Environment and Lifestyle Diseases” (2005)",
    "Over 20 scientific papers published and presented in national and international conferences and journals.",
  ],

  opd: {
    days: [],
    timing: "",
  },
},

{
  id: "d-030",
  slug: "dr-swagata-sarkar",
  name: "Dr. Swagata Sarkar",
  designation: "Senior Consultant Ophthalmologist",
  speciality: "Ophthalmology",
  specialitySlug: "ophthalmology",
  department: "ophthalmology",

  image: "/images/doctors/swagata-sarkar.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/ophthalmologist-jabalpur/",

  languages: [
    "English",
    "Hindi",
    "Marathi",
    "Bengali",
    "Gujrati",
  ],

  summary:
    "Dr. Swagata Sarkar is a highly skilled and accomplished Eye Surgeon with extensive experience in the diagnosis and management of various eye diseases. With fellowship training and experience across leading eye care institutes and multispecialty hospitals, Dr. Sarkar is known for an evidence-based approach, sharp diagnostic skills, clear patient communication and successful treatment outcomes.",

  about: [
    "Dr. Swagata Sarkar is a highly skilled and accomplished Eye Surgeon with extensive experience in the diagnosis and management of various eye diseases.",
    "Dr. Sarkar has undergone extensive fellowship training and practiced as a Senior Ophthalmic Consultant across prestigious eye care institutes and corporate multispecialty hospitals including Sankara Nethralaya, L.V. Prasad Eye Institute, Retina Foundation, Bombay Hospital and Medical Research Centre, Hinduja Healthcare, Seven Hills Hospital, Holy Family Hospital, Hiranandani Hospitals and Apollo Hospitals Navi Mumbai.",
    "With experience across clinical care, teaching and research, Dr. Sarkar is known for an evidence-based approach, sharp diagnostic skills, clear and understandable explanations of medical conditions and successful treatment outcomes.",
    "Dr. Sarkar provides expertise across both surgical and medical ophthalmology, including adult and pediatric eye diseases, cataract, diabetic retinopathy, retinal disorders and ocular inflammatory conditions."
  ],

  qualifications: [
    {
      degree: "M.B.B.S",
      institute: "",
      year: "",
    },
    {
      degree: "M.S. – Ophthalmology",
      institute: "",
      year: "",
    },
    {
      degree: "F.R.F",
      institute: "Retina Foundation, Ahmedabad",
      year: "",
    },
    {
      degree: "F.M.R.F",
      institute: "Medical Research Foundation, Chennai",
      year: "",
    },
    {
      degree: "Fellowship",
      institute: "Sankara Nethralaya, Chennai",
      year: "",
    },
    {
      degree: "LVA Module Certified",
      institute: "L.V. Prasad Eye Institute, Hyderabad",
      year: "",
    },
    {
      degree: "Glaukos iStent Inject W Certified",
      institute: "California, USA",
      year: "",
    },
  ],

  highlights: [
    {
      value: "MS",
      label: "Ophthalmology",
    },
    {
      value: "FRF",
      label: "Retina Fellowship",
    },
    {
      value: "140th",
      label: "MRC Best Paper Award",
    },
  ],

  expertise: [
    "Surgical and medical ophthalmology",
    "Advanced cataract surgery with phacoemulsification",
    "Phacomorphic procedures with phacoemulsification",
    "Diabetic retinopathy",
    "Diabetic macular oedema",
    "Vitreo-retinal surgeries",
    "Uveitis and ocular inflammatory disorders",
    "Autoimmune ocular disorders",
    "Retinopathy of prematurity",
    "Ocular trauma management",
    "Ocular surface disorders",
    "Adult eye diseases",
    "Pediatric eye diseases",
  ],

  experience:
    "Dr. Sarkar has extensive clinical, teaching and research experience across leading eye care institutes and corporate multispecialty hospitals. His professional experience includes Sankara Nethralaya, Chennai; L.V. Prasad Eye Institute, Hyderabad; Retina Foundation, Ahmedabad; Bombay Hospital and Medical Research Centre, Mumbai; Hinduja Healthcare, Mumbai; Seven Hills Hospital, Mumbai; Holy Family Hospital, Mumbai; Hiranandani Hospitals, Mumbai; Apollo Hospitals, Navi Mumbai; and his current association with Apollo JBP Hospitals, Jabalpur.",

  training: [
    "Fellow Medical Research Foundation, Chennai",
    "Fellow Retina Foundation, Ahmedabad",
    "LVA Module Certified at L.V. Prasad Eye Institute, Hyderabad",
    "Fellowship at Sankara Nethralaya, Chennai",
    "Glaukos iStent Inject W Certified, California, USA",
    "Advanced training in cataract and retinal ophthalmology",
  ],

  research: [
    "Active involvement in clinical research and research programs focused on eye diseases.",
    "Participated in the National Orientation Module for Rehabilitation of the Visually Impaired, organized by the National Institute for the Visually Handicapped (NIVH) in collaboration with LV Prasad Eye Institute, Hyderabad.",
    "Received the Best Paper Award at the 140th Research Meeting of the MRC, Bombay, for clinical contribution to ophthalmology.",
  ],

  publications: [],

  opd: {
    days: [],
    timing: "",
  },
},
{
  id: "d-031",
  slug: "dr-balaji-k",
  name: "Dr. Balaji K.",
  designation: "Consultant – Critical Care Medicine",
  speciality: "Critical Care Medicine",
  specialitySlug: "critical-care-medicine",
  department: "critical-care",

  image: "/images/doctors/balaji-k.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/critical-care-doctor-jabalpur/",

  languages: ["English", "Hindi"],

  summary:
    "Dr. Balaji K. is a highly accomplished Critical Care Specialist with advanced training from JIPMER, Puducherry and PGIMER, Chandigarh. With over three years of post-DM experience, he specializes in managing complex, multi-organ and life-threatening medical conditions in intensive-care settings.",

  about: [
    "Dr. Balaji K. is a highly accomplished Critical Care Specialist with advanced training from JIPMER, Puducherry and PGIMER, Chandigarh.",
    "With over three years of post-DM experience, he has expertise in managing complex, multi-organ and life-threatening medical conditions in intensive-care settings.",
    "Before joining Apollo JBP Hospitals, Jabalpur, he served as Consultant – Critical Care at Manipal Hospitals, Dwarka, Delhi and AIG Hospitals, Hyderabad, where he was actively involved in DrNB resident training and academic research programs.",
    "His clinical practice combines academic precision, evidence-based protocols, advanced clinical judgment and compassionate, patient-centered care."
  ],

  qualifications: [
    {
      degree: "DM – Intensive Care Medicine",
      institute: "PGIMER, Chandigarh",
      year: "",
    },
    {
      degree: "MD – Anaesthesiology & Critical Care",
      institute: "JIPMER, Puducherry",
      year: "",
    },
    {
      degree: "MBBS",
      institute: "Dr. M.G.R. Medical University, Chennai",
      year: "",
    },
    {
      degree: "Fellowship – Biostatistics (Ongoing)",
      institute: "University of Philadelphia",
      year: "",
    },
  ],

  highlights: [
    {
      value: "3+",
      label: "Years Post-DM Experience",
    },
    {
      value: "DM",
      label: "Intensive Care Medicine",
    },
    {
      value: "ECMO",
      label: "Advanced Critical Care",
    },
  ],

  expertise: [
    "Critical care medicine",
    "Multi-organ failure management",
    "Sepsis management",
    "Mechanical ventilation",
    "Advanced airway management",
    "Extracorporeal Membrane Oxygenation (ECMO)",
    "Renal Replacement Therapy (RRT)",
    "Transplant critical care",
    "Perioperative monitoring",
    "Obstetric critical care",
    "Neurological critical care",
    "Trauma critical care",
    "Hematology in ICU practice",
    "Infectious diseases in ICU practice",
  ],

  experience:
    "Dr. Balaji K. has over three years of post-DM experience in Critical Care Medicine. Before joining Apollo JBP Hospitals, Jabalpur, he served as Consultant – Critical Care at Manipal Hospitals, Dwarka, Delhi and AIG Hospitals, Hyderabad. At AIG Hospitals, he was actively involved in DrNB resident training and academic research programs.",

  training: [
    "DM in Intensive Care Medicine from PGIMER, Chandigarh",
    "MD in Anaesthesiology & Critical Care from JIPMER, Puducherry",
    "Fellowship in Biostatistics at University of Philadelphia – ongoing",
    "Advanced training in mechanical ventilation and airway management",
    "Advanced training in ECMO and renal replacement therapy",
    "Training in transplant, obstetric, neurological and trauma critical care",
  ],

  research: [
    "More than 14 publications in indexed journals.",
    "Published research in journals including BMC Anesthesiology.",
    "Published research in Journal of Anaesthesiology Clinical Pharmacology.",
    "Actively involved in academic research programs and DrNB resident training.",
    "Faculty speaker at multiple national and AIIMS-hosted critical care conferences.",
  ],

  publications: [
    "More than 14 publications in indexed journals, including BMC Anesthesiology and Journal of Anaesthesiology Clinical Pharmacology.",
  ],

  opd: {
    days: [],
    timing: "",
  },
},

{
  id: "d-032",
  slug: "dr-amit-vijay-ghatge",
  name: "Dr. Amit Vijay Ghatge",
  designation: "Consultant ENT Surgeon",
  speciality: "ENT",
  specialitySlug: "ent",
  department: "ent",

  image: "/images/doctors/amit-vijay.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/ent-specialist-in-jabalpur/",

  languages: ["English", "Hindi", "Marathi"],

  summary:
    "Dr. Amit Vijay Ghatge is a highly experienced ENT surgeon with over 20 years of post-MS clinical expertise. He specializes in micro-ear surgery, endoscopic sinus surgery, head and neck surgery, skull base surgery, pediatric ENT care, and comprehensive ENT management.",

  about: [
    "Dr. Amit Vijay Ghatge is a highly experienced ENT (Ear, Nose & Throat) surgeon with over 20 years of post-MS clinical expertise.",
    "He has trained and worked at some of India's prestigious hospitals and institutions, developing advanced skills in micro-ear surgery, endoscopic sinus surgery, head and neck surgery and comprehensive ENT care.",
    "His professional experience includes leading hospitals and medical institutions across Nagpur, Mumbai and Aurangabad, including Tata Memorial Hospital, Jaslok Hospital, Wadia Children's Hospital and Seth A.J.B. Municipal ENT Hospital.",
    "Currently associated with Apollo Hospitals, Jabalpur, he provides advanced ENT consultation and surgical treatment with a focus on compassion, precision and patient care."
  ],

  qualifications: [
    {
      degree: "MBBS",
      institute: "Nagpur University",
      year: "",
    },
    {
      degree: "MS – ENT",
      institute: "Nagpur University",
      year: "",
    },
    {
      degree: "Clinical Fellow in Oncology",
      institute: "Tata Memorial Hospital, Mumbai",
      year: "",
    },
  ],

  highlights: [
    {
      value: "20+",
      label: "Years Post-MS Experience",
    },
    {
      value: "ENT",
      label: "Advanced Surgery",
    },
    {
      value: "Oncology",
      label: "Clinical Fellowship",
    },
  ],

  expertise: [
    "ENT surgery",
    "Micro-ear surgery",
    "Endoscopic sinus surgery",
    "Head and neck surgery",
    "Skull base surgery",
    "Pediatric ENT care",
    "Voice disorders",
    "Airway disorders",
    "Complex ENT cases",
    "Head and neck oncological cases",
    "Advanced endoscopic ENT procedures",
    "Microsurgical ENT techniques",
  ],

  experience:
    "Dr. Amit Vijay Ghatge has over 20 years of post-MS ENT surgical and clinical experience. He is currently Director at ENT ONE Clinics, Nagpur and has worked as Consultant ENT Surgeon at Anand Hospitals, Chhindwara and Max Hospitals, Nagpur. His former consultant positions include Kingsway Hospitals, Alexis Hospitals, Meditrina Hospital and Wockhardt Hospitals in Nagpur. He has also served as Senior Registrar at Government Medical College, Aurangabad, Bai Jerbai Wadia Children's Hospital, K.B. Bhabha Hospital and Seth A.J.B. Municipal ENT Hospital.",

  training: [
    "Clinical Fellowship in Oncology at Tata Memorial Hospital, Mumbai",
    "Advanced training at Jaslok Hospital, Mumbai",
    "Advanced training at Wadia Children's Hospital, Mumbai",
    "Advanced training at Seth A.J.B. Municipal ENT Hospital, Mumbai",
    "Advanced training in micro-ear surgery",
    "Advanced training in endoscopic sinus surgery and head and neck procedures",
  ],

  research: [],

  publications: [],

  opd: {
    days: [],
    timing: "",
  },
},

{
  id: "d-033",
  slug: "dr-rajavigneshwari-n",
  name: "Dr. Rajavigneshwari N",
  designation: "Consultant Histopathologist & Pathologist",
  speciality: "Pathology",
  specialitySlug: "pathology",
  department: "pathology",

  image: "/images/doctors/rajavigneshwari.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/pathologist-in-jabalpur/",

  languages: ["English", "Hindi"],

  summary:
    "Dr. Rajavigneshwari N is a highly skilled Histopathologist and Pathologist serving as Consultant at Apollo JBP Hospitals, Jabalpur. She specializes in histopathology, surgical oncology diagnostics, cytology, intraoperative frozen section reporting, and immunohistochemistry, with extensive experience in hospital-based diagnostics and oncology-specific pathology.",

  about: [
    "Dr. Rajavigneshwari N is a Consultant Histopathologist and Pathologist at Apollo JBP Hospitals, Jabalpur, with expertise in hospital-based diagnostics and oncology-specific pathology.",

    "She specializes in histopathology, surgical oncology diagnostics, cytology including FNAC and Pap smears, intraoperative frozen section reporting, and immunohistochemistry (IHC).",

    "She has previously worked with reputed institutions including MGM Healthcare, MGM Cancer Institute, Apollo Specialty Hospital Vanagaram, Apollo Cancer Centre Teynampet, and PRS Hospital Trivandrum.",

    "At Apollo JBP Hospitals, she provides precise and timely diagnostic interpretations supporting cancer, gastrointestinal, and soft tissue pathology, with a focus on accurate, timely, and patient-focused diagnostic services.",

    "She has also contributed to clinical audits, laboratory quality management, and NABH/JCI accreditation protocols, along with academic teaching, case discussions, and presentations.",
  ],

  qualifications: [
    {
      degree: "MBBS",
      institute:
        "Sri Manakula Vinayagar Medical College & Hospital, Pondicherry University",
      year: "Aug 2008 – Dec 2013",
    },
    {
      degree: "MD (Pathology)",
      institute:
        "Mahatma Gandhi Medical College & Research Institute, Sree Balaji Vidyapeeth University",
      year: "Jun 2014 – May 2017",
    },
    {
      degree: "Certified Observership – Cytopathology & Oncopathology",
      institute:
        "Department of Surgical Pathology, Regional Cancer Centre, Trivandrum",
      year: "Jul – Aug 2017",
    },
  ],

  highlights: [
    {
      value: "MD",
      label: "Pathology",
    },
    {
      value: "IHC",
      label: "Oncopathology",
    },
    {
      value: "FNAC",
      label: "Cytopathology",
    },
  ],

  expertise: [
    "Histopathology",
    "Surgical Pathology",
    "Surgical Oncology Diagnostics",
    "Oncopathology",
    "GI Pathology",
    "Gynecological Pathology",
    "Neuropathology",
    "Cytology",
    "FNAC",
    "Pap Smear Reporting",
    "Cell Block Reporting",
    "Immunohistochemistry (IHC) Interpretation",
    "Synoptic Reporting (CAP)",
    "Intraoperative Frozen Section Consultation",
    "Grossing of Complex Resection Specimens",
    "Laboratory Quality Management",
    "NABH, JCI and NABC Accreditation Processes",
    "Stat Lab Leadership",
    "Laboratory Process Optimization",
  ],

  experience:
    "Dr. Rajavigneshwari N brings extensive experience in histopathology, oncopathology, cytology, frozen section reporting, and IHC across leading pathology and oncology institutions.",

  training: [
    "Certified Observership in Cytopathology & Oncopathology, Department of Surgical Pathology, Regional Cancer Centre, Trivandrum.",
    "Training and experience in histopathology, surgical oncology diagnostics, cytology, immunohistochemistry, frozen section reporting, and complex specimen grossing.",
    "Experience with synoptic CAP reporting and multidisciplinary oncology case discussions.",
    "Experience in laboratory quality management and NABH/JCI/NABC accreditation processes.",
  ],

  research: [
    "Clinicopathological spectrum of ovarian tumours in a tertiary care hospital.",
    "Contributed to validation of YieldEase, a novel FNAC adequacy assessment machine, in collaboration with Johns Hopkins University students. Completed July 2025.",
    "Myxopapillary ependymoma with anaplastic features: A rare case report.",
  ],

  publications: [
    "Rajavigneshwari N, Kotasthane DS, Koteeswaran G. Clinicopathological spectrum of ovarian tumours in a tertiary care hospital. J Evol Med Dent Sci. 2017;6(36):2948–2952. DOI: 10.14260/jemds/2017/635",

    "Nagarajan R, Shanmugam S, Buttannavar R, Ghosh S. Myxopapillary ependymoma with anaplastic features: A rare case report. Indian J Pathol Oncol. 2025;12(2):178–181. DOI: 10.18231/j.ijpo.2025.035",

    "Oral Paper – Pleomorphic adenoma, soft palate, CME, Madras Medical College, Chennai.",

    "Poster – Papillary carcinoma thyroid in a 5-year-old child, CME, PIMS.",

    "Poster – Congenital Nevus: A Case Study, SVMC, Puducherry.",
  ],

 faqs: [
  {
    question:
      "Who is Dr. Raja Vigneshwari N. and what is her role at Apollo JBP Hospitals?",
    questionHindi:
      "डॉ. राजा विग्नेश्वरी एन. कौन हैं और अपोलो जेबीपी हॉस्पिटल्स में उनकी भूमिका क्या है?",
    answer:
      "Dr. Raja Vigneshwari N. is a consultant pathologist and histopathologist at Apollo JBP Hospitals, known for her diagnostic expertise in oncopathology, gastrointestinal pathology, and hematology.",
    answerHindi:
      "डॉ. राजा विग्नेश्वरी एन. अपोलो जेबीपी हॉस्पिटल्स में पैथोलॉजिस्ट और हिस्टोपैथोलॉजिस्ट के रूप में कार्यरत हैं, जो ऑन्कोपैथोलॉजी, गैस्ट्रोइंटेस्टाइनल और हेमेटोलॉजी में विशेषज्ञता रखती हैं।",
  },

  {
    question:
      "What qualifications does Dr. Vigneshwari hold in pathology?",
    questionHindi:
      "पैथोलॉजी में डॉ. विग्नेश्वरी की क्या शैक्षणिक योग्यताएं हैं?",
    answer:
      "She holds MBBS from Pondicherry University and MD in Pathology from Sree Balaji Vidyapeeth University, with clinical training from RCC, Trivandrum.",
    answerHindi:
      "उन्होंने पांडिचेरी यूनिवर्सिटी से एमबीबीएस और श्री बालाजी विद्यापीठ यूनिवर्सिटी से पैथोलॉजी में एमडी किया है, साथ ही आरसीसी त्रिवेंद्रम से क्लीनिकल ट्रेनिंग भी प्राप्त की है।",
  },

  {
    question:
      "What is Dr. Vigneshwari's experience in histopathology and lab services?",
    questionHindi:
      "हिस्टोपैथोलॉजी और लैब सेवाओं में डॉ. विग्नेश्वरी का क्या अनुभव है?",
    answer:
      "She has worked with top hospitals like MGM Healthcare and Apollo Specialty Hospitals, with responsibilities in histopathology, blood bank, FNAC, and laboratory quality management.",
    answerHindi:
      "उन्होंने एमजीएम हेल्थकेयर और अपोलो स्पेशियलिटी हॉस्पिटल्स जैसे शीर्ष अस्पतालों में हिस्टोपैथोलॉजी, ब्लड बैंक, एफएनएसी और लैब क्वालिटी मैनेजमेंट में कार्य किया है।",
  },

  {
    question:
      "Is Dr. Vigneshwari involved in academic research or publications?",
    questionHindi:
      "क्या डॉ. विग्नेश्वरी शैक्षणिक अनुसंधान या प्रकाशनों से जुड़ी हुई हैं?",
    answer:
      "Yes, she has ongoing publications and research collaborations including Johns Hopkins projects and studies on astrocytoma and rare cancer cases.",
    answerHindi:
      "हां, वह जॉन्स हॉपकिन्स के साथ रिसर्च प्रोजेक्ट्स और दुर्लभ कैंसर मामलों पर अध्ययनों सहित कई प्रकाशनों में शामिल हैं।",
  },

  {
    question:
      "What procedures and diagnoses is Dr. Vigneshwari skilled in?",
    questionHindi:
      "डॉ. विग्नेश्वरी किन प्रक्रियाओं और निदानों में कुशल हैं?",
    answer:
      "She is proficient in intraoperative frozen sections, FNAC, IHC marker interpretation, PAP smear analysis, and CAP protocol-based grossing and reporting.",
    answerHindi:
      "वह फ्रोजन सेक्शन, एफएनएसी, आईएचसी मार्कर, पीएपी स्मीयर, और सीएपी प्रोटोकॉल आधारित रिपोर्टिंग में कुशल हैं।",
  },

  {
    question:
      "How can I consult Dr. Raja Vigneshwari N.?",
    questionHindi:
      "मैं डॉ. राजा विग्नेश्वरी एन. से परामर्श कैसे ले सकता/सकती हूं?",
    answer:
      "You can book an appointment online at https://apollojbphospitals.com/make-appointment/ or call 7566123666.",
    answerHindi:
      "आप https://apollojbphospitals.com/make-appointment/ पर अपॉइंटमेंट बुक कर सकते हैं या 7566123666 पर कॉल करें।",
  },
],

  opd: {
    days: [],
    timing: "",
  },
},

{
  id: "d-034",
  slug: "dr-arunkumar-karthikayan",
  name: "Dr. Arunkumar Karthikayan",
  designation: "Consultant Neurosurgery",
  speciality: "Neurosurgery",
  specialitySlug: "neurosurgery",
  department: "neuro",

  image: "/images/doctors/karthikayan.png",

  profileUrl:
    "https://apollojbphospitals.com/doctor/expert-neurosurgeon-in-jabalpur/",

  languages: ["English", "Hindi"],

  summary:
    "Dr. Arunkumar Karthikayan is a highly accomplished neurosurgeon at Apollo JBP Hospitals, with advanced training from SCTIMST and JIPMER and expertise in skull base neurosurgery, neuro-oncology, endoscopic surgery, and complex neurovascular disorders.",

  about: [
    "Dr. Arunkumar Karthikayan is a Consultant Neurosurgeon at Apollo JBP Hospitals, Jabalpur, with advanced training from SCTIMST, Trivandrum and JIPMER, Pondicherry.",

    "His clinical expertise includes skull base neurosurgery, neuro-oncology, endoscopic surgery, complex neurovascular disorders, awake craniotomy, stereotactic procedures, and minimally invasive or keyhole neurosurgery.",

    "At Apollo JBP Hospitals, he provides multidisciplinary care for brain tumors, spinal disorders, traumatic brain injuries, stroke, vascular lesions, pediatric neurosurgical conditions, and functional neurosurgery.",

    "His approach combines advanced neurosurgical techniques and technology with comprehensive, patient-centered care.",
  ],

  qualifications: [
    {
      degree: "MBBS",
      institute:
        "Jawaharlal Institute of Postgraduate Medical Education and Research (JIPMER), Pondicherry",
      year: "",
    },
    {
      degree: "M.S. General Surgery",
      institute:
        "Jawaharlal Institute of Postgraduate Medical Education and Research (JIPMER), Pondicherry",
      year: "",
    },
    {
      degree: "MCh Neurosurgery",
      institute:
        "Sree Chitra Tirunal Institute of Medical Sciences and Technology (SCTIMST), Trivandrum",
      year: "",
    },
    {
      degree: "Fellowship in Advanced Endoscopic & Lateral Skull Base Neurosurgery",
      institute: "World Skull Base Foundation",
      year: "",
    },
  ],

  highlights: [
    {
      value: "MCh",
      label: "Neurosurgery – SCTIMST",
    },
    {
      value: "Skull Base",
      label: "Advanced Neurosurgery",
    },
    {
      value: "Neuro-Oncology",
      label: "Brain Tumor Surgery",
    },
  ],

  expertise: [
    "Skull Base Neurosurgery",
    "Advanced Endoscopic Neurosurgery",
    "Lateral Skull Base Surgery",
    "Neuro-Oncology",
    "Brain Tumor Surgery",
    "Awake Craniotomy",
    "Stereotactic Neurosurgery",
    "Minimally Invasive & Keyhole Neurosurgery",
    "Complex Neurovascular Surgery",
    "Cerebral Aneurysm Surgery",
    "Stroke & Vascular Neurosurgery",
    "Spinal Neurosurgery",
    "Traumatic Brain Injury Management",
    "Pediatric Neurosurgery",
    "Functional Neurosurgery",
    "Neuroimaging",
    "Neuromonitoring",
    "Neuronavigation",
  ],

  experience:
    "Dr. Arunkumar Karthikayan has gained extensive neurosurgical experience through SCTIMST, Apollo Proton Cancer Centre, and Kauvery Hospitals, with expertise in complex brain, skull base, neurovascular, and minimally invasive neurosurgical procedures.",

  experienceDetails: [
    {
      role: "Consultant Neurosurgeon",
      organization: "Kauvery Hospitals, Alwarpet, Chennai",
      period: "",
      details: [
        "Provided comprehensive neurosurgical care across complex neurological and neurosurgical conditions.",
      ],
    },
    {
      role: "Associate Consultant Neurosurgeon",
      organization: "Kauvery Hospitals, Alwarpet, Chennai",
      period: "",
      details: [
        "Managed neurosurgical cases with focus on advanced and complex procedures.",
      ],
    },
    {
      role: "Junior Consultant Neurosurgeon",
      organization: "Apollo Proton Cancer Centre, Chennai",
      period: "",
      details: [
        "Worked in neurosurgical care within a JCI-approved cancer centre.",
      ],
    },
    {
      role: "Senior Resident – MCh Neurosurgery",
      organization:
        "Sree Chitra Tirunal Institute of Medical Sciences and Technology (SCTIMST), Trivandrum",
      period: "",
      details: [
        "Advanced neurosurgical training in a tertiary academic institute.",
      ],
    },
    {
      role: "Assistant Professor – General Surgery",
      organization: "AVMC, Pondicherry",
      period: "",
      details: [
        "Contributed to clinical and academic teaching in General Surgery.",
      ],
    },
    {
      role: "Part-time Consultant",
      organization: "SR Multispeciality Hospital, Arumbakkam, Chennai",
      period: "",
      details: [
        "Provided surgical consultation and patient care.",
      ],
    },
  ],

  training: [
    "MCh Neurosurgery training at SCTIMST, Trivandrum.",
    "Fellowship in Advanced Endoscopic and Lateral Skull Base Neurosurgery from World Skull Base Foundation.",
    "Advanced exposure to skull base, neuro-oncology, neurovascular, endoscopic, minimally invasive, and functional neurosurgical techniques.",
    "International and national professional involvement through CNS, AANS, NSI, SBSSI, AO Spine, NSSA, TANS, ASI, and IMA.",
  ],

  research: [
    "Research and academic work in skull base neurosurgery, neurovascular surgery, brain tumors, spinal neurosurgery, and minimally invasive neurosurgical techniques.",
    "Clinico-radiological work on vestibular schwannoma and the use of DTI metrics for prognostication.",
    "Research and case-based academic work involving spinal angiolipoma, hypothalamic hamartoma, pineal region tumors, spinal metastasis, CSF rhinorrhea, aneurysms, and microvascular decompression.",
  ],

  publications: [
    "Sudhir BJ, Karthikayan A, Amjad JM, Arun KG. Strategic tunnelling of superficial temporal artery during bypass surgery for moyamoya disease. Acta Neurochirurgica. 2022.",

    "Jaiswal PA, Divakar G, Krishnakumar K, Karthikayan A, Sawakare Y, Mhatre R, Abraham M. Spinal angiolipoma – a rare but reversible cause of paraplegia in a child. Child's Nervous System. 2020.",

    "Rajasekar G, Nair P, Abraham M, Felix V, Karthikayan A. Cerebrospinal fluid rhinorrhea from the lateral recess of sphenoid sinus: More to it than meets the eye. Neurology India. 2019;67(1):201.",

    "Assessing the risk for development of Venous Thromboembolism in Surgical Patients using Adapted Caprini Scoring System. International Journal of Surgery. 2016;30:68–73.",

    "Karthikayan A, Sureshkumar S, Kadambari D, Vijayakumar C. Low serum 25-hydroxy vitamin D levels are associated with aggressive breast cancer variants and poor prognostic factors in patients with breast carcinoma. Archives of Endocrinology and Metabolism. 2018;62(4):452–459.",

    "Singh HK, Prasad MS, Kandasamy AK, Dharanipragada K. Tamoxifen-induced hypertriglyceridemia causing acute pancreatitis. Journal of Pharmacology & Pharmacotherapeutics. 2016;7(1):38.",

    "Chapter in Comprehensive Textbook of Radiology by IRIA: CT and MRI in surgical planning and intraoperative imaging – applications in CNS awake surgeries and functional imaging.",

    "Roopesh Kumar VR, VS Madhugiri, Karthikayan Arunkumar. Simplifying the surgical strategies for excising medial sphenoid wing meningiomas – a stepwise approach. Neurology India. 2022.",

    "Kumar RV, Sanjeevi V, Karthikayan A, Rajendran A. Mirror Aneurysms of the distal posterior inferior cerebellar artery: A case report and literature review. J Cerebrovasc Sci. 2022.",

    "Kumar RV, Karthikayan A. A concise operative atlas of microvascular decompression – different intraoperative scenarios and technical nuances. J Cerebrovasc Sci. 2022.",

    "Kumar RV, Karthikayan A, Rajendran A. Optico-chiasmatic hypothalamic cavernomas: A report of three cases and review of literature. J Cerebrovasc Sci. 2022.",

    "Kiruba SM, Arunkumar Karthikayan, Roopesh Kumar VR. Ipsilateral Nasoseptal flap for reconstruction during transpterygoid approaches. Journal of Neurosurgery. 2022 (Submitted).",
  ],

  professionalMemberships: [
    "International Member – Congress of Neurological Surgeons (CNS)",
    "International Member – American Association of Neurological Surgeons (AANS)",
    "Member – Neurological Society of India (NSI)",
    "Life Member – Skull Base Surgery Society of India (SBSSI 507)",
    "Member – AO Spine",
    "Life Member – Association of Neuro Spinal Surgeons of India (NSSA)",
    "Life Member – Tamil Nadu Association of Neurosurgeons (TANS)",
    "Life Member – Association of Surgeons of India (ASI)",
    "Life Member – Indian Medical Association (IMA)",
  ],

  researchDetails: [
    "Faculty and invited presentations on stroke surgery, advanced endoscopic skull base surgery, awake craniotomy, decompressive craniectomy, brain tumor supramaximal resection, neuroimaging, neuromonitoring, and neuronavigation.",
    "Presented work on open fork versus closed fork technique for clipping ACOM artery aneurysms.",
    "Podium presentation on clinico-radiological correlates of vestibular schwannoma and DTI metrics for prognostication.",
    "Academic case presentations included dorsal spinal angiolipoma, hypothalamic hamartoma with precocious puberty, pineal region squamous cell carcinoma, occult spinal metastasis, CSF rhinorrhea, and post-traumatic inguinal hernia.",
  ],

  faqs: [
    {
      question:
        "Who is Dr. Arunkumar Karthikayan and what is his expertise?",
        questionHindi:"डॉ. अरुणकुमार कार्तिकेयन कौन हैं और उनकी विशेषज्ञता क्या है?",
      answer:
        "Dr. Arunkumar Karthikayan is a highly experienced consultant neurosurgeon at Apollo JBP Hospitals with expertise in advanced skull base surgery, neuro-oncology, minimally invasive spine surgery, and functional neurosurgery.",
      answerHindi:
        "डॉ. अरुणकुमार कार्तिकेयन अपोलो जेबीपी हॉस्पिटल्स में वरिष्ठ न्यूरोसर्जन हैं, जो खोपड़ी की सर्जरी, न्यूरो-ऑन्कोलॉजी, मिनिमल इनवेसिव स्पाइन सर्जरी और फंक्शनल न्यूरोसर्जरी में विशेषज्ञ हैं।",
    },

    {
      question: "What are Dr. Arunkumar’s educational qualifications?",
      questionHindi:"डॉ. अरुणकुमार की शैक्षणिक योग्यताएं क्या हैं?",
      answer:
        "He completed MCh Neurosurgery from SCTIMST Trivandrum, MS Surgery and MBBS from JIPMER, and fellowship in advanced endoscopic skull base neurosurgery from World Skull Base Foundation.",
      answerHindi:
        "उन्होंने एमसीएच न्यूरोसर्जरी एससीटीआईएमएसटी त्रिवेंद्रम से, एमएस और एमबीबीएस जेआईपीएमईआर पांडिचेरी से पूरा किया है और वर्ल्ड स्कल बेस फाउंडेशन से एंडोस्कोपिक न्यूरोसर्जरी में फेलोशिप ली है।",
    },

    {
      question: "What conditions and surgeries does Dr. Karthikayan handle?",
      questionHindi:"डॉ. कार्तिकेयन किन बीमारियों और सर्जरी में विशेषज्ञ हैं?",
      answer:
        "He manages brain tumors, spinal conditions, trauma, epilepsy surgeries, skull base tumors, pituitary lesions, aneurysms, and advanced functional and vascular neurosurgeries.",
      answerHindi:
        "वे ब्रेन ट्यूमर, रीढ़ की समस्याएं, ट्रॉमा, मिर्गी की सर्जरी, स्कल बेस ट्यूमर, पिट्यूटरी विकार, एन्यूरिज्म और फंक्शनल व वैस्कुलर न्यूरोसर्जरी करते हैं।",
    },

    {
      question: "Where did Dr. Karthikayan gain his surgical experience?",
      questionHindi:"डॉ. कार्तिकेयन को सर्जरी का अनुभव कहां से मिला?",
      answer:
        "He served at SCTIMST, Apollo Proton Centre, and Kauvery Hospitals, and conducted numerous lectures and workshops in neurosurgery and skull base procedures.",
      answerHindi:
        "उन्होंने एससीटीआईएमएसटी, अपोलो प्रोटॉन सेंटर और कावेरी हॉस्पिटल्स में सेवा दी है और न्यूरोसर्जरी तथा स्कल बेस प्रक्रियाओं से संबंधित कई व्याख्यान और कार्यशालाएं आयोजित की हैं।",
    },

    {
      question:
        "Has Dr. Arunkumar published research or attended conferences?",
        questionHindi:"क्या डॉ. अरुणकुमार ने रिसर्च पब्लिश की है या सम्मेलनों में भाग लिया है?",
      answer:
        "Yes, he has over 10 publications in reputed journals and has been invited to present at global conferences like WFNS, AANS, NSI, and more.",
      answerHindi:
        "हां, उन्होंने प्रतिष्ठित जर्नलों में 10 से अधिक रिसर्च पब्लिश की हैं और WFNS, AANS, NSI जैसे अंतरराष्ट्रीय सम्मेलनों में भाग लिया है।",
    },

    {
      question: "How can I consult Dr. Arunkumar Karthikayan?",
      questionHindi:"मैं डॉ. अरुणकुमार कार्तिकेयन से परामर्श कैसे ले सकता/सकती हूं?",
      answer:
        "You can book an appointment online at https://apollojbphospitals.com/make-appointment/ or call 7566123666.",
      answerHindi:
        "आप https://apollojbphospitals.com/make-appointment/ पर अपॉइंटमेंट बुक कर सकते हैं या 7566123666 पर कॉल करें।",
    },
  ],

  opd: {
    days: [],
    timing: "",
  },
},

{
  id: "d-035",
  slug: "dr-abhishek-jain",
  name: "Dr. Abhishek Jain",
  designation: "Consultant – Emergency Medicine & Trauma Care",
  speciality: "Emergency Medicine",
  specialitySlug: "emergency-medicine",
  department: "emergency",

  image: "/images/doctors/abhishek-jain.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/emergency-medicine-doctor-in-jabalpur/",

  languages: ["Hindi", "English"],

  summary:
    "Dr. Abhishek Jain is a Consultant in Emergency & Trauma Care at Apollo JBP Hospitals, Jabalpur, with over a decade of experience in emergency medicine, critical care, and trauma response.",

  about: [
    "Dr. Abhishek Jain is a skilled and dedicated emergency medicine doctor serving as Consultant in Emergency & Trauma Care at Apollo JBP Hospitals, Jabalpur.",

    "He has over a decade of hands-on experience in emergency medicine, critical care, and trauma response, with expertise in rapid emergency interventions and life-saving acute care.",

    "He completed his DNB in Emergency Medicine from Manipal Hospital, Bengaluru, and has pursued advanced training in Critical Care Medicine at Datta Meghe Institute, Wardha.",

    "His clinical strengths include trauma resuscitation, ventilatory support, cardiac emergencies, and multi-organ emergency management.",
  ],

  qualifications: [
    {
      degree: "MBBS",
      institute: "CIMS Bilaspur",
      year: "2006–2007",
    },
    {
      degree: "DNB Emergency Medicine (DNB EMD)",
      institute: "Manipal Hospital, Bengaluru, Karnataka",
      year: "2018–2019",
    },
    {
      degree: "DM Critical Care Medicine",
      institute:
        "Datta Meghe Institute of Higher Education and Research Center (DU), Wardha, Maharashtra",
      year: "2022–2025",
    },
  ],

  highlights: [
    {
      value: "10+",
      label: "Years of Emergency Experience",
    },
    {
      value: "DNB",
      label: "Emergency Medicine",
    },
    {
      value: "DM",
      label: "Critical Care Medicine",
    },
  ],

  expertise: [
    "Emergency Medicine",
    "Trauma Care",
    "Emergency Interventions",
    "Trauma Resuscitation",
    "Critical Care",
    "ICU Management",
    "Ventilatory Support",
    "Cardiac Emergencies",
    "Multi-Organ Emergency Management",
    "Internal Medicine",
  ],

  experience:
    "Dr. Abhishek Jain has over a decade of experience in emergency, critical care, and trauma response, including leadership roles in emergency and critical care services.",

  experienceDetails: [
    {
      role: "Critical Care Medicine & Internal Medicine",
      organization: "District Hospital Mungeli",
      period: "3 years",
      details: [
        "Worked across critical care medicine and internal medicine services.",
        "Managed emergency and critical care patients.",
      ],
    },
    {
      role: "Director & Incharge",
      organization: "Jain Hospital",
      period: "3 years",
      details: [
        "Led hospital emergency and critical care services.",
        "Managed critical care and internal medicine responsibilities.",
      ],
    },
  ],

  training: [
    "DNB training in Emergency Medicine at Manipal Hospital, Bengaluru.",
    "Advanced training in Critical Care Medicine at Datta Meghe Institute of Higher Education and Research Center, Wardha.",
  ],

  research: [],

  researchDetails: [],

  publications: [],

  faqs: [
    {
      question:
        "Who is Dr. Abhishek Jain and what are his specialties at Apollo JBP Hospitals?",
      questionHindi:
        "डॉ. अभिषेक जैन कौन हैं और अपोलो जेबीपी हॉस्पिटल्स में उनकी विशेषज्ञता क्या है?",
      answer:
        "Dr. Abhishek Jain is a consultant in emergency medicine & trauma care at Apollo JBP Hospitals, with expertise in critical care, trauma response, and rapid life-saving interventions.",
      answerHindi:
        "डॉ. अभिषेक जैन अपोलो जेबीपी हॉस्पिटल्स में आपातकालीन चिकित्सा और ट्रॉमा केयर के विशेषज्ञ हैं, जो क्रिटिकल केयर और त्वरित जीवनरक्षक उपचार में माहिर हैं।",
    },

    {
      question:
        "What qualifications does Dr. Abhishek Jain hold in emergency medicine?",
      questionHindi:
        "आपातकालीन चिकित्सा में डॉ. अभिषेक जैन की क्या योग्यताएं हैं?",
      answer:
        "He completed MBBS from CIMS Bilaspur, DNB in Emergency Medicine from Manipal Hospital, and has pursued DM in Critical Care Medicine from Datta Meghe Institute, Wardha.",
      answerHindi:
        "उन्होंने सीआईएमएस बिलासपुर से एमबीबीएस, मणिपाल हॉस्पिटल से डीएनबी और वर्धा के दत्ता मेघे इंस्टीट्यूट से क्रिटिकल केयर मेडिसिन में डीएम किया है।",
    },

    {
      question:
        "What is Dr. Jain's experience in emergency and critical care?",
      questionHindi:
        "आपातकालीन और क्रिटिकल केयर में डॉ. जैन का क्या अनुभव है?",
      answer:
        "He has over 10 years of experience managing emergency and ICU units, including leadership roles at District Hospital Mungeli and Jain Hospital.",
      answerHindi:
        "उन्हें 10 वर्षों से अधिक का अनुभव है जिसमें उन्होंने जिला अस्पताल मुंगेली और जैन हॉस्पिटल में इमरजेंसी और आईसीयू का संचालन किया है।",
    },

    {
      question:
        "What are Dr. Jain's core strengths in emergency care?",
      questionHindi:
        "आपातकालीन चिकित्सा में डॉ. जैन की मुख्य विशेषज्ञताएं क्या हैं?",
      answer:
        "He specializes in trauma resuscitation, ventilatory support, cardiac emergencies, and multi-organ critical interventions.",
      answerHindi:
        "वे ट्रॉमा पुनर्जीवन, वेंटिलेटरी सपोर्ट, हृदय आपात स्थिति और मल्टी-ऑर्गन इमरजेंसी में विशेषज्ञ हैं।",
    },

    {
      question:
        "Is Dr. Abhishek Jain experienced in ICU and trauma management?",
      questionHindi:
        "क्या डॉ. अभिषेक जैन को आईसीयू और ट्रॉमा प्रबंधन में अनुभव है?",
      answer:
        "Yes, Dr. Jain has managed both emergency departments and critical care units with advanced life-support procedures.",
      answerHindi:
        "हां, डॉ. जैन ने आपातकालीन विभागों और क्रिटिकल केयर यूनिट्स दोनों को उन्नत जीवन रक्षक तकनीकों के साथ संभाला है।",
    },

    {
      question: "How can I consult Dr. Abhishek Jain?",
      questionHindi:
        "मैं डॉ. अभिषेक जैन से परामर्श कैसे ले सकता/सकती हूं?",
      answer:
        "You can book an appointment online at https://apollojbphospitals.com/make-appointment/ or call 7566123666.",
      answerHindi:
        "आप https://apollojbphospitals.com/make-appointment/ पर ऑनलाइन अपॉइंटमेंट बुक कर सकते हैं या 7566123666 पर कॉल करें।",
    },
  ],

  opd: {
    days: [],
    timing: "",
  },
},

{
  id: "d-036",
  slug: "dr-rashi-gupta",
  name: "Dr. Rashi Gupta",
  designation: "Consultant Neonatology",
  speciality: "Neonatology",
  specialitySlug: "neonatology",
  department: "neonatology",

  image: "/images/doctors/rashi-gupta.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/neonatologist-in-jabalpur/",

  languages: ["English", "Hindi"],

  summary:
    "Dr. Rashi Gupta is an award-winning neonatologist at Apollo JBP Hospitals, Jabalpur, with advanced training in neonatology and expertise in newborn ventilation, neonatal nutrition, POCUS, functional echocardiography, and high-risk neonatal care.",

  about: [
    "Dr. Rashi Gupta is a Consultant Neonatologist at Apollo JBP Hospitals, Jabalpur, with advanced training and academic experience in newborn and critical neonatal care.",

    "She is a Gold Medallist in DM Neonatology from ABVIMS & RML Hospital, New Delhi, and completed her MD Pediatrics from SMS Medical College, Jaipur.",

    "Her clinical interests include newborn ventilation, neonatal nutrition, neurodevelopmental follow-up, POCUS, functional echocardiography, and advanced respiratory support for critically ill newborns.",

    "She combines tertiary neonatal care with academic teaching, research, and continued contribution to neonatal education and innovation.",
  ],

  qualifications: [
    {
      degree: "MBBS",
      institute: "Kasturba Medical College, Manipal",
      year: "",
    },
    {
      degree: "MD Pediatrics",
      institute: "SMS Medical College, Jaipur",
      year: "",
    },
    {
      degree: "DM Neonatology – Gold Medallist",
      institute: "ABVIMS & RML Hospital, New Delhi",
      year: "2020–2023",
    },
  ],

  highlights: [
    {
      value: "DM",
      label: "Neonatology – Gold Medallist",
    },
    {
      value: "AIIMS",
      label: "Advanced Pediatric Training",
    },
    {
      value: "POCUS",
      label: "Functional Echocardiography",
    },
  ],

  expertise: [
    "Neonatal Intensive Care",
    "Newborn Ventilation",
    "Advanced Respiratory Support",
    "Non-Invasive & Invasive Ventilation",
    "HFOV",
    "Neonatal Nutrition",
    "High-Risk Newborn Care",
    "Premature Baby Care",
    "Neonatal Resuscitation",
    "Neurodevelopmental Follow-up",
    "POCUS",
    "Functional Echocardiography",
    "Cranial Ultrasonography",
    "Post-Surgical Neonatal Care",
    "Post-Cardiac Surgery Neonatal Care",
    "PICU & HDU Care",
    "USG-Guided Central Line Insertion",
    "Critical Bedside Procedures",
  ],

  experience:
    "Dr. Rashi Gupta has extensive experience in neonatal and pediatric critical care, including senior residency at AIIMS New Delhi, DM Neonatology training at ABVIMS & RML Hospital, consultancy at Nelson Hospital Nagpur, and academic experience at JNMC Wardha.",

  experienceDetails: [
    {
      role: "Senior Resident",
      organization: "AIIMS, New Delhi",
      period: "2019–2020",
      details: [
        "Worked for 18 months with exposure to multiple pediatric super-specialities.",
        "Completed a 6-month rotation in PICU/HDU.",
      ],
    },
    {
      role: "DM Neonatology",
      organization: "ABVIMS & RML Hospital, New Delhi",
      period: "2020–2023",
      details: [
        "Completed DM Neonatology from a Level 3 tertiary care centre with a 32-bed NICU.",
        "Received the Best Post Doctoral Student Award in 2023.",
        "Gained experience in advanced neonatal intensive care, post-surgical and post-cardiac surgery neonatal management.",
      ],
    },
    {
      role: "Consultant",
      organization: "Nelson Hospital, Nagpur",
      period: "2024–2025",
      details: [
        "Provided neonatal and critical newborn care.",
      ],
    },
    {
      role: "Assistant Professor",
      organization: "JNMC, Wardha",
      period: "2024–Present",
      details: [
        "Contributes to academic teaching and neonatal clinical care.",
      ],
    },
    {
      role: "Academic Junior Resident",
      organization: "Chacha Nehru Bal Chikitsalaya, Delhi Government",
      period: "6 months",
      details: [
        "Gained additional pediatric academic and clinical exposure.",
      ],
    },
  ],

  training: [
    "Advanced neonatal training at ABVIMS & RML Hospital, New Delhi, in a Level 3 tertiary care centre with a 32-bed NICU.",
    "Senior residency training at AIIMS New Delhi with exposure to pediatric super-specialities and PICU/HDU.",
    "POCUS hands-on training including functional echocardiography and cranial ultrasonography.",
    "Training in USG-guided central line insertion and critical bedside procedures including ICD insertion and lumbar puncture.",
    "Experience with non-invasive, invasive, and advanced mechanical ventilation including HFOV.",
    "Trained in management of post-surgical and post-cardiac surgery neonatal cases.",
  ],

  research: [
    "Research associate with Dr. Satish Deopujari, working on neonatal resuscitative devices.",
    "Primary author of a prospective cohort study evaluating sonographic diaphragmatic thickness and excursion to predict CPAP failure in neonates below 34 weeks of gestation. DOI: 10.1002/ppul.26608.",
    "Author of a chapter on management of neonates born with B, HIV, Varicella and Hepatitis B in the Handbook of Neonatal Clinical Practices.",
  ],

  researchDetails: [
    "Awarded First Prize in Poster Presentation at the Technological Advancement Conference, CHKD, East Virginia, USA, on 29 October 2024.",
    "Delivered guest lectures at Michigan Children's Hospital and Johns Hopkins Hospital, Maryland, in November 2024.",
    "Presented a poster at the CUGH Conference in Atlanta, USA, in February 2025.",
    "Faculty for the Neonatal Ventilation Workshop at MP Pedicon in December 2024.",
    "Faculty for the NNF Shine Workshop in Aurangabad in June 2024.",
    "Participated as faculty and panelist at First Breath Conference in Nagpur on challenges in newborn resuscitation.",
    "Delivered a CME talk on antenatal steroids, delayed cord clamping (DCC), and DR-CPAP for medical officers with the State Government.",
    "Faculty at First Breath Conference, Ujjain, April 2024.",
    "Faculty and academic contributor in neonatal ventilation workshops, conferences, and CME programmes.",
    "Passionately involved in fellow, postgraduate, and nursing teaching.",
    "Part of the organizing committee for NNF state-level quizzes and various conferences.",
    "Runner-up in National Level Young Scholar Award in Pediatrics (TYSA), 2019, Ahmedabad.",
    "Runner-up in North Zone IAP Quiz, 2018, Jammu.",
    "Winner of State IAP Quiz, 2018, Jaipur.",
    "Runner-up of NNF Neonatology Quiz, 2018, Jaipur.",
    "Winner of Paper Presentation at RAJ PAEDICON, 2018, Kota.",
    "Presented a poster at the National Primary Immunodeficiency Conference, Jaipur, 2018.",
    "Runner-up in PID Quiz conducted by ISPID at the Fourth National Conference of PID, 2018, Jaipur.",
  ],

  publications: [
    "Primary Author – Sonographic assessment of diaphragmatic thickness and excursion to predict CPAP failure in neonates below 34 weeks of gestation: A prospective cohort study. DOI: 10.1002/ppul.26608.",
    "Author – Management of Neonates born with B, HIV, Varicella and Hepatitis B, in the Handbook of Neonatal Clinical Practices.",
  ],

  faqs: [
    {
      question:
        "Who is Dr. Rashi Gupta and what are her specialties at Apollo JBP Hospitals?",
      questionHindi:
        "डॉ. राशि गुप्ता कौन हैं और अपोलो जेबीपी हॉस्पिटल्स में उनकी विशेषज्ञताएं क्या हैं?",
      answer:
        "Dr. Rashi Gupta is a gold medalist neonatologist at Apollo JBP Hospitals, Jabalpur, specializing in newborn ventilation, nutrition, and high-risk neonatal care.",
      answerHindi:
        "डॉ. राशि गुप्ता अपोलो जेबीपी हॉस्पिटल्स, जबलपुर में गोल्ड मेडलिस्ट नियोनेटोलॉजिस्ट हैं, जो नवजात शिशु वेंटिलेशन, पोषण और गंभीर शिशु देखभाल में विशेषज्ञ हैं।",
    },

    {
      question:
        "What qualifications does Dr. Rashi Gupta hold in neonatology?",
      questionHindi:
        "नवजात चिकित्सा में डॉ. राशि गुप्ता की क्या योग्यताएं हैं?",
      answer:
        "She completed MBBS from KMC Manipal, MD Pediatrics from SMS Jaipur, and DM Neonatology with a Gold Medal from RML Hospital, New Delhi.",
      answerHindi:
        "उन्होंने केएमसी मणिपाल से एमबीबीएस, एसएमएस जयपुर से एमडी और आरएमएल हॉस्पिटल नई दिल्ली से डीएम नियोनेटोलॉजी गोल्ड मेडल के साथ पूरा किया है।",
    },

    {
      question:
        "What makes Dr. Rashi Gupta a trusted neonatologist in Jabalpur?",
      questionHindi:
        "डॉ. राशि गुप्ता को जबलपुर में भरोसेमंद नियोनेटोलॉजिस्ट क्यों माना जाता है?",
      answer:
        "Her training at AIIMS Delhi and work at Nelson Hospital and JNMC Wardha, combined with her academic achievements, awards, and research, support her expertise in neonatal care.",
      answerHindi:
        "एम्स दिल्ली में प्रशिक्षण, नेल्सन अस्पताल और जेएनएमसी वर्धा में कार्य अनुभव के साथ उनके शैक्षणिक उपलब्धियां, पुरस्कार और शोध कार्य नवजात देखभाल में उनकी विशेषज्ञता को मजबूत करते हैं।",
    },

    {
      question:
        "Does Dr. Gupta offer care for premature or critically ill babies?",
      questionHindi:
        "क्या डॉ. गुप्ता समय से पहले जन्मे या गंभीर रूप से बीमार बच्चों की देखभाल करती हैं?",
      answer:
        "Yes, she provides advanced care for premature, surgical, and post-cardiac babies, including advanced ventilation, HFOV, PICU exposure, and neurodevelopmental follow-up.",
      answerHindi:
        "हां, वह समय से पहले जन्मे, सर्जिकल और पोस्ट-कार्डियक नवजातों के लिए उन्नत देखभाल प्रदान करती हैं, जिसमें एडवांस्ड वेंटिलेशन, एचएफओवी, पीआईसीयू और न्यूरो डेवेलपमेंट फॉलो-अप शामिल हैं।",
    },

    {
      question:
        "What research or academic awards has Dr. Gupta received?",
      questionHindi:
        "डॉ. गुप्ता को कौन-कौन से शोध या शैक्षणिक पुरस्कार प्राप्त हुए हैं?",
      answer:
        "She has presented internationally at Johns Hopkins Hospital and Michigan Children's Hospital and received the Best Post Doctoral Student Award at ABVIMS & RML Hospital in 2023.",
      answerHindi:
        "उन्होंने जॉन्स हॉपकिन्स हॉस्पिटल और मिशिगन चिल्ड्रेन्स हॉस्पिटल में अंतरराष्ट्रीय प्रस्तुतियां दी हैं और 2023 में ABVIMS एवं RML हॉस्पिटल से बेस्ट पोस्ट डॉक्टोरल स्टूडेंट अवार्ड प्राप्त किया।",
    },

    {
      question:
        "What is Dr. Rashi Gupta’s approach to neonatal care?",
      questionHindi:
        "डॉ. राशि गुप्ता नवजात देखभाल के लिए किस दृष्टिकोण का पालन करती हैं?",
      answer:
        "Her care focuses on advanced neonatal support, ventilation, functional echocardiography, neurodevelopmental follow-up, and personalized parent-neonate engagement.",
      answerHindi:
        "उनकी देखभाल का उद्देश्य उन्नत नवजात सहायता, वेंटिलेशन, फंक्शनल इकोकार्डियोग्राफी, न्यूरो-डेवलपमेंटल फॉलो-अप और माता-पिता व नवजात के बीच व्यक्तिगत देखभाल पर केंद्रित है।",
    },

    {
      question: "How can I consult Dr. Rashi Gupta?",
      questionHindi:
        "मैं डॉ. राशि गुप्ता से परामर्श कैसे ले सकता/सकती हूं?",
      answer:
        "You can book an appointment online at https://apollojbphospitals.com/make-appointment/ or call 7566123666.",
      answerHindi:
        "आप https://apollojbphospitals.com/make-appointment/ पर ऑनलाइन अपॉइंटमेंट बुक कर सकते हैं या 7566123666 पर कॉल करें।",
    },
  ],

  opd: {
    days: [],
    timing: "",
  },
},


{
  id: "d-037",
  slug: "dr-kadloor-satyanand",
  name: "Brigadier (Dr.) Kadloor Satyanand, SM",
  designation: "Consultant General Medicine",
  speciality: "General Medicine",
  specialitySlug: "general-medicine",
  department: "general-medicine",

  image: "/images/doctors/kadloor.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/general-physician-in-jabalpur/",

  languages: ["English", "Hindi"],

  summary:
    "Brigadier (Dr.) Kadloor Satyanand is a distinguished General Medicine physician with decades of experience in tertiary care, military hospitals, clinical research, critical care, healthcare management, and medical education.",

  about: [
    "Brigadier (Dr.) Kadloor Satyanand is a Consultant in General Medicine with extensive experience in tertiary care, clinical medicine, critical care, and healthcare leadership.",
    "He served in the Indian Army for 34 years and 5 months, working as a physician and holding senior leadership positions across military hospitals and tertiary care institutions.",
    "He has also held academic and administrative roles in medicine, healthcare management, and medical education, including experience in JCI and NABH accredited hospitals.",
    "He is experienced in chronic disease management, critical care consultation, clinical research, healthcare administration, quality management, and multidisciplinary medical coordination."
  ],

  qualifications: [
    {
      degree: "MBBS",
      institute: "MRMC Gulbarga",
      year: "",
    },
    {
      degree: "MD (General Medicine)",
      institute: "Army Hospital (R&R)",
      year: "",
    },
    {
      degree: "Masters in Critical Care Medicine",
      institute: "",
      year: "2018–2019",
    },
    {
      degree: "PG Diploma in Medical Law & Ethics (PGDMLE)",
      institute:
        "Medversity / National Law School of India University",
      year: "",
    },
    {
      degree: "PG Diploma in Healthcare & Hospital Management (PGDHHM)",
      institute: "IGNOU",
      year: "",
    },
  ],

  highlights: [
    {
      value: "34+",
      label: "Years of Army Service",
    },
    {
      value: "SM",
      label: "Sena Medal",
    },
    {
      value: "MD",
      label: "General Medicine",
    },
  ],

  expertise: [
    "General Medicine",
    "Internal Medicine",
    "Critical Care Consultation",
    "Clinical Research",
    "Healthcare Management",
    "Hospital Administration",
    "Medical Education",
    "Leadership",
    "Quality Management",
    "Medical Law & Ethics",
    "Pharmacovigilance",
    "Multidisciplinary Super-Specialty Coordination",
  ],

  experience:
    "Brigadier (Dr.) Kadloor Satyanand brings over three decades of experience in General Medicine, critical care, tertiary care, healthcare leadership, and medical education.",

  experienceDetails: [
    {
      role: "Professor of Medicine",
      organization: "Symbiosis Medical College for Women",
      duration: "Nov 2022 – Present",
    },
    {
      role: "Senior Faculty",
      organization: "Symbiosis International University",
      duration: "Sep 2019 – Jun 2021",
    },
    {
      role:
        "Senior Faculty / Professor in Medicine, Consultant in Medicine & Medical Superintendent",
      organization: "Chellaram Diabetes Institute",
      duration: "Jan 2019 – Aug 2019",
    },
    {
      role: "Consultant & HOD",
      organization: "Command Hospital (SC)",
      duration: "Dec 2017 – Dec 2018",
    },
    {
      role: "Commandant",
      organization: "Tertiary Care Zonal Hospital (490)",
      duration: "Sep 2015 – Dec 2017",
    },
  ],

  training: [
    "Masters in Critical Care Medicine (2018–2019)",
    "PG Diploma in Medical Law & Ethics (PGDMLE)",
    "PG Diploma in Healthcare & Hospital Management (PGDHHM)",
    "Experience with JCI and NABH accredited hospitals",
    "PACES Examiner for MRCP (UK)",
  ],

  research: [
    "Clinical research experience in General Medicine and tertiary care.",
    "Experience in clinical research, quality management, and multidisciplinary healthcare systems.",
  ],

  researchDetails: [
    "Served in tertiary care military hospitals with exposure to multiple super-specialities and complex medical cases.",
    "Contributed to medical education, clinical supervision, and academic activities.",
    "Experienced in healthcare quality systems and JCI/NABH accreditation standards.",
    "Served as a PACES examiner for MRCP (UK).",
  ],

  publications: [],

  professionalMemberships: [],

  faqs: [
    {
      question:
        "Who is Brigadier (Dr.) Kadloor Satyanand and what is his role at Apollo JBP Hospitals?",
      questionHindi:
        "ब्रिगेडियर (डॉ.) कडलूर सत्यनंद कौन हैं और अपोलो जेबीपी हॉस्पिटल्स में उनकी भूमिका क्या है?",
      answer:
        "Brigadier (Dr.) Kadloor Satyanand is a distinguished General Medicine physician with extensive experience in tertiary care, military hospitals, critical care, healthcare management, and medical education.",
      answerHindi:
        "ब्रिगेडियर (डॉ.) कडलूर सत्यनंद एक अनुभवी जनरल मेडिसिन विशेषज्ञ हैं, जिनके पास टर्शियरी केयर, मिलिट्री हॉस्पिटल्स, क्रिटिकल केयर, हेल्थकेयर मैनेजमेंट और मेडिकल एजुकेशन का व्यापक अनुभव है।",
    },
    {
      question: "What are Dr. Kadloor Satyanand's qualifications?",
      questionHindi:
        "डॉ. कडलूर सत्यनंद की शैक्षणिक योग्यताएं क्या हैं?",
      answer:
        "His qualifications include MBBS, MD in General Medicine, a Masters in Critical Care Medicine, PG Diploma in Medical Law & Ethics, and PG Diploma in Healthcare & Hospital Management.",
      answerHindi:
        "उनकी योग्यताओं में MBBS, MD (General Medicine), Masters in Critical Care Medicine, PG Diploma in Medical Law & Ethics और PG Diploma in Healthcare & Hospital Management शामिल हैं।",
    },
    {
      question:
        "What makes Dr. Kadloor Satyanand a distinguished physician?",
      questionHindi:
        "डॉ. कडलूर सत्यनंद को एक प्रतिष्ठित चिकित्सक क्या बनाता है?",
      answer:
        "He served for 34 years and 5 months in the Indian Army, held senior medical and leadership positions, received the Sena Medal, and has extensive experience in tertiary care and medical education.",
      answerHindi:
        "उन्होंने भारतीय सेना में 34 वर्ष 5 महीने तक सेवा की, वरिष्ठ चिकित्सा और नेतृत्व पदों पर कार्य किया, सेना मेडल प्राप्त किया और टर्शियरी केयर तथा मेडिकल एजुकेशन में व्यापक अनुभव हासिल किया।",
    },
    {
      question:
        "Can Dr. Kadloor Satyanand help with chronic medical conditions?",
      questionHindi:
        "क्या डॉ. कडलूर सत्यनंद पुरानी और जटिल चिकित्सा समस्याओं के उपचार में सहायता कर सकते हैं?",
      answer:
        "Yes. His General Medicine experience includes evaluation and management of chronic medical conditions, complex medical problems, critical care needs, and multidisciplinary care.",
      answerHindi:
        "हाँ। General Medicine में उनके अनुभव में पुरानी बीमारियों, जटिल चिकित्सा समस्याओं, critical care needs और multidisciplinary care का मूल्यांकन एवं प्रबंधन शामिल है।",
    },
  ],

  opd: {
    days: [],
    timing: "",
  },
},

{
  id: "d-038",
  slug: "dr-samay-premsing-chavan",
  name: "Dr. Samay Premsing Chavan",
  designation: "Endodontist & Root Canal Specialist",
  speciality: "Dentistry",
  specialitySlug: "dentistry",
  department: "dentistry",

  image: "/images/doctors/samaypremsing.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/endodontist-in-jabalpur/",

  languages: ["Hindi", "English"],

  summary:
    "Dr. Samay Premsing Chavan is an Endodontist and Root Canal Specialist with over 10 years of clinical experience in advanced root canal treatment, dental pain management, and conservative dentistry.",

  about: [
    "Dr. Samay Premsing Chavan is an Endodontist and Root Canal Specialist at Apollo JBP Hospitals, Jabalpur, with over 10 years of experience in endodontic and dental care.",
    "He specializes in advanced root canal treatment, re-treatment of failed root canals, dental pain management, dental trauma care, and procedures focused on preserving natural teeth.",
    "He holds an MDS in Endodontics from SD Dental College, Parbhani, and a BDS from SMBT Dental College, Sangamner, both affiliated with MUHS Nashik.",
    "Known for his precision, gentle approach, modern dental techniques, and patient-focused care, he has also participated in national dental conferences including IACDE-IES and IDA."
  ],

  qualifications: [
    {
      degree: "MDS (Endodontics)",
      institute:
        "SD Dental College & Hospital, Parbhani, MUHS, Nashik",
      year: "2018",
    },
    {
      degree: "BDS",
      institute:
        "SMBT Dental College, Sangamner, MUHS, Nashik",
      year: "2012",
    },
  ],

  highlights: [
    {
      value: "10+",
      label: "Years of Experience",
    },
    {
      value: "MDS",
      label: "Endodontics",
    },
    {
      value: "RCT",
      label: "Root Canal Specialist",
    },
  ],

  expertise: [
    "Endodontics",
    "Advanced Root Canal Treatment",
    "Painless Root Canal Treatment",
    "Re-treatment of Failed RCTs",
    "Dental Pain Management",
    "Dental Infection Management",
    "Dental Trauma Care",
    "Tooth Preservation",
    "Conservative Dentistry",
    "Modern Endodontic Techniques",
    "Microscopic & Precision-Based Root Canal Therapy",
  ],

  experience:
    "Dr. Samay Premsing Chavan has over 10 years of experience in endodontics, root canal treatment, dental pain management, and conservative dentistry.",

  experienceDetails: [
    {
      role: "Consultant Dentist",
      organization: "Pawar Dental Clinic & Implant Center, Kinwat, Nanded",
      duration: "Since Nov 2013",
    },
    {
      role: "Specialist Dentist",
      organization:
        "Namokar Implant Center & Dental Hospital, Nanded, Maharashtra",
      duration: "Since Jul 2013",
    },
    {
      role: "General Dentist",
      organization:
        "Sai Multispecialty Hospital, Nanded, Maharashtra",
      duration: "Dec 2014 – Feb 2016",
    },
    {
      role: "Specialist Dentist",
      organization:
        "Omsai Dental Clinic, Nanded, Maharashtra",
      duration: "Since Jul 2018",
    },
    {
      role: "Senior Lecturer",
      organization:
        "HRSM Dental College & Hospital, Hingoli, Maharashtra",
      duration: "Since Aug 2018",
    },
    {
      role: "Specialist Dentist",
      organization:
        "Sai Multispecialty Hospital, Nanded, Maharashtra",
      duration: "Since Aug 2018",
    },
  ],

  training: [
    "Participated in IACDE-IES national conferences and PG conventions.",
    "Participated in IDA NED-CON Zonal Conference 2016.",
    "Participated in IACDE-IES conferences held at Amritsar, Kolkata, and Ahmedabad.",
    "Keeps clinical practice aligned with modern endodontic techniques and dental technology.",
  ],

  research: [],

  publications: [],

  faqs: [
    {
      question:
        "Who is Dr. Samay Premsing Chavan and what does he specialize in?",
      questionHindi:
        "डॉ. समय प्रेमसिंह चव्हाण कौन हैं और वे किस विशेषज्ञता में कार्य करते हैं?",
      answer:
        "Dr. Samay Premsing Chavan is an Endodontist and Root Canal Specialist at Apollo JBP Hospitals, specializing in root canal treatment, dental pain management, and conservative dentistry.",
      answerHindi:
        "डॉ. समय प्रेमसिंह चव्हाण Apollo JBP Hospitals में Endodontist और Root Canal Specialist हैं। वे रूट कैनाल उपचार, दांत दर्द प्रबंधन और Conservative Dentistry में विशेषज्ञता रखते हैं।",
    },
    {
      question:
        "Where did Dr. Samay Chavan complete his MDS?",
      questionHindi:
        "डॉ. समय चव्हाण ने अपना MDS कहाँ से पूरा किया है?",
      answer:
        "He completed his MDS in Endodontics from SD Dental College & Hospital, Parbhani, affiliated with MUHS, Nashik.",
      answerHindi:
        "उन्होंने अपना MDS (Endodontics) SD Dental College & Hospital, Parbhani से पूरा किया है, जो MUHS, Nashik से संबद्ध है।",
    },
    {
      question:
        "What endodontic services does Dr. Samay Chavan provide?",
      questionHindi:
        "डॉ. समय चव्हाण कौन-कौन सी Endodontic सेवाएं प्रदान करते हैं?",
      answer:
        "He provides advanced root canal treatment, re-treatment of failed RCTs, dental trauma care, dental pain management, and tooth preservation services.",
      answerHindi:
        "वे Advanced Root Canal Treatment, असफल RCT का दोबारा उपचार, Dental Trauma Care, दांत दर्द प्रबंधन और दांत बचाने की सेवाएं प्रदान करते हैं।",
    },
    {
      question:
        "Does Dr. Samay Chavan treat dental pain and infections?",
      questionHindi:
        "क्या डॉ. समय चव्हाण दांत दर्द और संक्रमण का इलाज करते हैं?",
      answer:
        "Yes. He specializes in managing complex dental pain, dental infections, abscesses, and nerve inflammation with conservative and endodontic treatment.",
      answerHindi:
        "हाँ। वे जटिल दांत दर्द, Dental Infection, Abscess और Nerve Inflammation का Conservative और Endodontic Treatment के माध्यम से उपचार करते हैं।",
    },
    {
      question:
        "Has Dr. Chavan attended any national dental conferences?",
      questionHindi:
        "क्या डॉ. चव्हाण ने राष्ट्रीय डेंटल सम्मेलनों में भाग लिया है?",
      answer:
        "Yes. He has participated in national dental events including IACDE-IES and IDA conferences, keeping himself updated with modern endodontic techniques.",
      answerHindi:
        "हाँ। उन्होंने IACDE-IES और IDA जैसे राष्ट्रीय डेंटल सम्मेलनों में भाग लिया है और आधुनिक Endodontic Techniques से जुड़े रहे हैं।",
    },
    {
      question:
        "Why choose Dr. Samay Chavan at Apollo JBP Hospitals?",
      questionHindi:
        "Apollo JBP Hospitals में डॉ. समय चव्हाण को क्यों चुनें?",
      answer:
        "Patients can benefit from his over 10 years of clinical experience, precision-focused treatment, gentle approach, and expertise in root canal and dental pain management.",
      answerHindi:
        "मरीजों को उनके 10+ वर्षों के क्लिनिकल अनुभव, सटीक उपचार, सौम्य दृष्टिकोण और Root Canal तथा Dental Pain Management में विशेषज्ञता का लाभ मिल सकता है।",
    },
    {
      question:
        "How can I consult Dr. Samay Chavan?",
      questionHindi:
        "मैं डॉ. समय चव्हाण से परामर्श कैसे ले सकता हूँ?",
      answer:
        "You can book an appointment at Apollo JBP Hospitals or contact the hospital for consultation.",
      answerHindi:
        "आप Apollo JBP Hospitals में अपॉइंटमेंट बुक कर सकते हैं या परामर्श के लिए अस्पताल से संपर्क कर सकते हैं।",
    },
  ],

  opd: {
    days: [],
    timing: "",
  },
},


{
  id: "d-039",
  slug: "dr-manisha-uddey",
  name: "Dr. Manisha Uddey",
  designation: "Obstetrics & Gynaecology",
  speciality: "Obstetrics & Gynaecology",
  specialitySlug: "obstetrics-gynaecology",
  department: "gynae",

  image: "/images/doctors/manisha-uddey.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/gynaecologist-in-jabalpur-near-me/",

  languages: ["Hindi", "English"],

  summary:
    "Dr. Manisha Uddey is an experienced gynaecologist with over a decade of clinical experience in high-risk obstetrics, minimally invasive gynaecological surgery, ultrasonography, and family planning.",

  about: [
    "Dr. Manisha Uddey is a compassionate and experienced gynaecologist at Apollo JBP Hospitals, known for patient-centric care, clear communication, and a focus on informed decision-making.",
    "She has over a decade of diverse clinical experience across government hospital service, academic practice, and private care, with a strong focus on women's health.",
    "She is skilled in high-risk obstetrics, gynaecological ultrasonography, open and laparoscopic surgery, hysteroscopy, colposcopy, infertility care, and family planning.",
    "Her clinical approach combines modern minimally invasive surgical techniques with compassionate and patient-focused women's healthcare."
  ],

  qualifications: [
    {
      degree: "MBBS",
      institute: "Government Medical College, Bhopal",
      year: "2013",
    },
    {
      degree: "MS (Obstetrics & Gynaecology)",
      institute: "Kasturba Gandhi, Delhi",
      year: "2018",
    },
    {
      degree: "DMAS (Diploma in Minimal Access Surgery)",
      institute: "World Laparoscopic Hospital, Gurugram",
      year: "",
    },
    {
      degree: "FMAS (Fellowship in Minimal Access Surgery)",
      institute: "World Laparoscopic Hospital, Gurugram",
      year: "2022",
    },
  ],

  highlights: [
    {
      value: "10+",
      label: "Years of Experience",
    },
    {
      value: "4000+",
      label: "Laparoscopic Tubectomies",
    },
    {
      value: "FMAS",
      label: "Minimal Access Surgery",
    },
  ],

  expertise: [
    "Obstetrics",
    "Gynaecology",
    "High-Risk Pregnancy Management",
    "Obstetric & Gynaecological Ultrasonography",
    "Normal & High-Risk Deliveries",
    "Laparoscopic Tubectomy",
    "MTP, LTT & Tubal Recanalization",
    "Laparoscopic Hysterectomy",
    "Laparoscopic Ovarian Surgery",
    "Vaginal Hysterectomy",
    "Diagnostic & Operative Hysteroscopy",
    "Colposcopy",
    "Infertility & IUI",
    "Cancer Screening",
    "Family Planning",
  ],

  experience:
    "Dr. Manisha Uddey has over a decade of experience across government hospital service, academic practice, and private gynaecological care, with expertise in obstetrics and minimally invasive surgery.",

  experienceDetails: [
    {
      role: "PG Medical Specialist",
      organization: "District Hospital Dindori",
      duration: "4 years",
    },
    {
      role: "Faculty",
      organization: "Sukhsagar Medical College, Jabalpur",
      duration: "3 years",
    },
    {
      role: "Private Practice",
      organization: "Private Practice",
      duration: "4 years",
    },
  ],

  training: [
    "DMAS – Diploma in Minimal Access Surgery, World Laparoscopic Hospital, Gurugram",
    "FMAS – Fellowship in Minimal Access Surgery, World Laparoscopic Hospital, Gurugram",
  ],

  research: [],

  publications: [],

  faqs: [
    {
      question:
        "Who is Dr. Manisha Uddey and what are her specialties?",
      questionHindi:
        "डॉ. मनीषा उड्डे कौन हैं और उनकी विशेषज्ञताएं क्या हैं?",
      answer:
        "Dr. Manisha Uddey is a gynaecologist at Apollo JBP Hospitals specializing in obstetrics, gynaecological surgery, high-risk pregnancy management, infertility care, and minimally invasive procedures.",
      answerHindi:
        "डॉ. मनीषा उड्डे Apollo JBP Hospitals की स्त्री रोग विशेषज्ञ हैं। वे Obstetrics, Gynaecological Surgery, High-Risk Pregnancy Management, Infertility Care और Minimally Invasive Procedures में विशेषज्ञता रखती हैं।",
    },
    {
      question:
        "Where did Dr. Manisha Uddey complete her higher education?",
      questionHindi:
        "डॉ. मनीषा उड्डे ने अपनी उच्च शिक्षा कहाँ से पूरी की है?",
      answer:
        "She completed her MBBS from Government Medical College, Bhopal, MS in Obstetrics & Gynaecology from Kasturba Gandhi, Delhi, and DMAS and FMAS from World Laparoscopic Hospital, Gurugram.",
      answerHindi:
        "उन्होंने MBBS Government Medical College, Bhopal से, MS (Obstetrics & Gynaecology) Kasturba Gandhi, Delhi से तथा DMAS और FMAS World Laparoscopic Hospital, Gurugram से किया है।",
    },
    {
      question:
        "What types of deliveries does Dr. Manisha Uddey manage?",
      questionHindi:
        "डॉ. मनीषा उड्डे किस प्रकार की डिलीवरी का प्रबंधन करती हैं?",
      answer:
        "She manages normal and high-risk deliveries with appropriate monitoring for maternal and fetal safety.",
      answerHindi:
        "वे मां और शिशु की सुरक्षा के लिए उचित निगरानी के साथ सामान्य और हाई-रिस्क डिलीवरी का प्रबंधन करती हैं।",
    },
    {
      question:
        "Is Dr. Manisha Uddey experienced in laparoscopic gynaecological surgery?",
      questionHindi:
        "क्या डॉ. मनीषा उड्डे को लेप्रोस्कोपिक स्त्री रोग सर्जरी का अनुभव है?",
      answer:
        "Yes. She has advanced training in minimal access surgery and experience in laparoscopic tubectomy, hysterectomy, ovarian surgery, and other gynaecological procedures.",
      answerHindi:
        "हाँ। उन्हें Minimal Access Surgery में उन्नत प्रशिक्षण प्राप्त है और उन्हें Laparoscopic Tubectomy, Hysterectomy, Ovarian Surgery तथा अन्य स्त्री रोग प्रक्रियाओं का अनुभव है।",
    },
    {
      question:
        "Does Dr. Manisha Uddey provide infertility treatment and counselling?",
      questionHindi:
        "क्या डॉ. मनीषा उड्डे बांझपन का उपचार और काउंसलिंग प्रदान करती हैं?",
      answer:
        "Yes. Her listed expertise includes infertility care, IUI, hormonal therapy, ovulation induction, and infertility counselling.",
      answerHindi:
        "हाँ। उनकी विशेषज्ञता में Infertility Care, IUI, Hormonal Therapy, Ovulation Induction और Infertility Counselling शामिल हैं।",
    },
    {
      question:
        "Why choose Dr. Manisha Uddey at Apollo JBP Hospitals?",
      questionHindi:
        "Apollo JBP Hospitals में डॉ. मनीषा उड्डे को क्यों चुनें?",
      answer:
        "Patients can benefit from her over a decade of clinical experience, compassionate approach, minimal access surgery training, and expertise in women's healthcare.",
      answerHindi:
        "मरीजों को उनके 10+ वर्षों के क्लिनिकल अनुभव, करुणामय दृष्टिकोण, Minimal Access Surgery में प्रशिक्षण और महिला स्वास्थ्य देखभाल की विशेषज्ञता का लाभ मिल सकता है।",
    },
    {
      question:
        "How can I consult Dr. Manisha Uddey?",
      questionHindi:
        "मैं डॉ. मनीषा उड्डे से परामर्श कैसे ले सकता हूँ?",
      answer:
        "You can book an appointment at Apollo JBP Hospitals or contact the hospital for consultation.",
      answerHindi:
        "आप Apollo JBP Hospitals में अपॉइंटमेंट बुक कर सकते हैं या परामर्श के लिए अस्पताल से संपर्क कर सकते हैं।",
    },
  ],

  opd: {
    days: [],
    timing: "",
  },
},

{
  id: "d-040",
  slug: "dr-ambarish-joshi",
  name: "Dr. Ambarish Joshi",
  designation: "Pulmonary Medicine, Critical Care",
  speciality: "Pulmonary Medicine & Critical Care",
  specialitySlug: "pulmonary-medicine-critical-care",
  department: "pulmonary",

  image: "/images/doctors/ambarish-joshi.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/pulmonologist-in-jabalpur/",

  languages: ["Hindi", "English"],

  summary:
    "Dr. Ambarish Joshi is a pulmonologist and critical care specialist with advanced bronchoscopy training and over a decade of experience in respiratory medicine, critical care, sleep medicine, teaching, and research.",

  about: [
    "Dr. Ambarish Joshi is a pulmonologist and critical care specialist at Apollo JBP Hospitals with advanced training in bronchoscopy and extensive experience in respiratory medicine.",
    "His clinical expertise includes pulmonary medicine, critical care, sleep medicine, advanced bronchoscopy, drug-resistant tuberculosis, interstitial lung disease, asthma, COPD, lung cancer, and respiratory infections.",
    "He has been involved in clinical teaching, research, and national-level medical education programs, and has participated as faculty at major respiratory medicine conferences including NAPCON and NATCON.",
    "His approach combines evidence-based respiratory care, precise diagnosis, advanced procedural skills, and a strong focus on patient welfare."
  ],

  qualifications: [
    {
      degree: "MBBS",
      institute: "JJMMC, Davangere, Karnataka",
      year: "2010",
    },
    {
      degree: "MD (Pulmonary Medicine)",
      institute: "King George’s Medical University, Lucknow",
      year: "2012–2015",
    },
    {
      degree: "DNB (Pulmonary Medicine)",
      institute: "National Board of Examinations",
      year: "2017",
    },
    {
      degree: "DM (Pulmonary Medicine & Critical Care)",
      institute: "VMMC & Safdarjung Hospital, New Delhi",
      year: "2021",
    },
    {
      degree: "Advanced Bronchoscopy Training",
      institute: "University Medical Center, Amsterdam, Netherlands",
      year: "2024",
    },
  ],

  highlights: [
    {
      value: "10+",
      label: "Years of Experience",
    },
    {
      value: "DM",
      label: "Pulmonary Medicine & Critical Care",
    },
    {
      value: "Bronchoscopy",
      label: "Advanced Training",
    },
  ],

  expertise: [
    "Pulmonary Medicine",
    "Critical Care",
    "Advanced Bronchoscopy",
    "Sleep Medicine",
    "Drug-Resistant Tuberculosis",
    "Interstitial Lung Disease",
    "Asthma & COPD",
    "Lung Cancer",
    "Respiratory Infections",
    "Pulmonary Hypertension",
    "Respiratory Failure",
    "Mechanical & Non-Invasive Ventilation",
    "ICU Ventilator Management",
    "Hemodynamic Monitoring",
    "Respiratory Rehabilitation",
  ],

  experience:
    "Dr. Ambarish Joshi has over a decade of experience in pulmonary medicine, critical care, teaching, research, and national-level medical education.",

  experienceDetails: [
    {
      role: "Senior Consultant – Pulmonology & Sleep Medicine",
      organization: "Primus Super Specialty Hospital, Chanakyapuri, New Delhi",
      duration: "",
    },
    {
      role: "Assistant Professor",
      organization: "Career Institute of Medical Sciences, Lucknow",
      duration: "1 year",
    },
    {
      role: "Senior Resident – Respiratory Medicine",
      organization: "King George’s Medical University, Lucknow",
      duration: "2 years",
    },
  ],

  training: [
    "Advanced Bronchoscopy Training – University Medical Center, Amsterdam, Netherlands",
    "Advanced training in bronchoscopy and interventional respiratory procedures",
    "Training and experience in critical care, mechanical ventilation, and non-invasive ventilation",
    "Active participation in national respiratory medicine conferences and medical education programs",
  ],

  research: [
    "Research and clinical publications in pulmonary medicine, respiratory infections, tuberculosis, bronchoscopy, and critical care.",
    "Active engagement in respiratory medicine research and national-level academic programs.",
  ],

  researchDetails: [
    "Winner – CHEST Challenge, India Edition (2021)",
    "Rank 1 – All India NEET SS Entrance (2018)",
    "Best MD Thesis Award (2014–2015)",
    "1st Prize – Poster Presentation, NATCON 2015",
    "2nd Prize – Post Graduate Quiz, Academy of Respiratory Medicine (2015)",
    "Top 5 – State-Level Chest Medicine Quiz (2014)",
    "Frequently invited as faculty at national respiratory medicine conferences including NAPCON and NATCON.",
  ],

  publications: [
    "Lymphangioleiomyomatosis Presenting as Pneumothorax – Lung India, 2017",
    "Tongue Tuberculosis – A Rare Case – Sahel Medical Journal, 2017",
    "A Case of Cerebral Malaria – IJCCM, 2019",
    "A Study of Relative Value of FNAC and Bronchoscopy in Pulmonary Lesions – IJMRR, 2016",
    "Contribution to the Textbook of Clinical Cases by KGMU",
    "Assisted in A Handbook on Interstitial Lung Diseases by Dr. Surya Kant",
  ],

  faqs: [
    {
      question:
        "Who is Dr. Ambarish Joshi and what does he specialize in?",
      questionHindi:
        "डॉ. अम्बरीष जोशी कौन हैं और वे किस विशेषज्ञता में कार्य करते हैं?",
      answer:
        "Dr. Ambarish Joshi is a pulmonologist and critical care specialist at Apollo JBP Hospitals specializing in pulmonary medicine, asthma, COPD, critical care, bronchoscopy, sleep medicine, and respiratory disorders.",
      answerHindi:
        "डॉ. अम्बरीष जोशी Apollo JBP Hospitals में Pulmonologist और Critical Care Specialist हैं। वे Pulmonary Medicine, Asthma, COPD, Critical Care, Bronchoscopy, Sleep Medicine और Respiratory Disorders में विशेषज्ञता रखते हैं।",
    },
    {
      question:
        "What advanced pulmonology qualifications does Dr. Ambarish Joshi hold?",
      questionHindi:
        "डॉ. अम्बरीष जोशी के पास Pulmonary Medicine में कौन-कौन सी उच्च योग्यताएं हैं?",
      answer:
        "He holds an MD in Pulmonary Medicine from King George’s Medical University, a DNB in Pulmonary Medicine, a DM in Pulmonary Medicine & Critical Care from VMMC & Safdarjung Hospital, and advanced bronchoscopy training from University Medical Center Amsterdam.",
      answerHindi:
        "उन्होंने King George’s Medical University से MD (Pulmonary Medicine), DNB (Pulmonary Medicine), VMMC & Safdarjung Hospital से DM (Pulmonary Medicine & Critical Care) और University Medical Center Amsterdam से Advanced Bronchoscopy Training प्राप्त की है।",
    },
    {
      question:
        "What lung conditions does Dr. Joshi treat?",
      questionHindi:
        "डॉ. जोशी किन फेफड़ों और श्वसन संबंधी बीमारियों का इलाज करते हैं?",
      answer:
        "His expertise includes asthma, COPD, interstitial lung disease, respiratory infections, drug-resistant tuberculosis, pulmonary hypertension, lung cancer, and sleep-related breathing disorders.",
      answerHindi:
        "उनकी विशेषज्ञता में Asthma, COPD, Interstitial Lung Disease, Respiratory Infections, Drug-Resistant Tuberculosis, Pulmonary Hypertension, Lung Cancer और Sleep-Related Breathing Disorders शामिल हैं।",
    },
    {
      question:
        "Does Dr. Joshi perform advanced interventional pulmonology procedures?",
      questionHindi:
        "क्या डॉ. जोशी उन्नत इंटरवेंशनल पल्मोनोलॉजी प्रक्रियाएं करते हैं?",
      answer:
        "Yes. He has advanced training in bronchoscopy and is experienced in procedures including thoracoscopy, transbronchial lung biopsy, pleural biopsy, and pleural drainage.",
      answerHindi:
        "हाँ। उन्हें Advanced Bronchoscopy का प्रशिक्षण प्राप्त है और वे Thoracoscopy, Transbronchial Lung Biopsy, Pleural Biopsy और Pleural Drainage जैसी प्रक्रियाओं में प्रशिक्षित हैं।",
    },
    {
      question:
        "Is Dr. Joshi experienced in critical care and ventilator support?",
      questionHindi:
        "क्या डॉ. जोशी को क्रिटिकल केयर और वेंटिलेटर सपोर्ट का अनुभव है?",
      answer:
        "Yes. His expertise includes ICU ventilator management, mechanical and non-invasive ventilation, hemodynamic monitoring, critical care, and respiratory rehabilitation.",
      answerHindi:
        "हाँ। उनकी विशेषज्ञता में ICU Ventilator Management, Mechanical और Non-Invasive Ventilation, Hemodynamic Monitoring, Critical Care और Respiratory Rehabilitation शामिल हैं।",
    },
    {
      question:
        "Why choose Dr. Ambarish Joshi at Apollo JBP Hospitals?",
      questionHindi:
        "Apollo JBP Hospitals में डॉ. अम्बरीष जोशी को क्यों चुनें?",
      answer:
        "Patients can benefit from his evidence-based approach, extensive respiratory and critical care experience, advanced bronchoscopy training, research background, and commitment to patient welfare.",
      answerHindi:
        "मरीजों को उनके Evidence-Based Approach, Pulmonary और Critical Care के व्यापक अनुभव, Advanced Bronchoscopy Training, Research Background और Patient Welfare के प्रति प्रतिबद्धता का लाभ मिल सकता है।",
    },
    {
      question:
        "How can I consult Dr. Ambarish Joshi?",
      questionHindi:
        "मैं डॉ. अम्बरीष जोशी से परामर्श कैसे ले सकता हूँ?",
      answer:
        "You can book an appointment at Apollo JBP Hospitals or contact the hospital for consultation.",
      answerHindi:
        "आप Apollo JBP Hospitals में अपॉइंटमेंट बुक कर सकते हैं या परामर्श के लिए अस्पताल से संपर्क कर सकते हैं।",
    },
  ],

  opd: {
    days: [],
    timing: "",
  },
},

{
  id: "d-041",
  slug: "dr-p-karunakar-reddy",
  name: "Dr. P. Karunakar Reddy",
  designation: "Consultant Surgical Oncologist",
  speciality: "Surgical Oncology",
  specialitySlug: "surgical-oncology",
  department: "onco",

  image: "/images/doctors/karunakarreddy.png",

  profileUrl:
    "https://apollojbphospitals.com/doctor/surgical-oncologist-in-jabalpur/",

  languages: ["Hindi", "English"],

  summary:
    "Dr. P. Karunakar Reddy is a Surgical Oncologist with extensive training in complex oncological surgeries, multidisciplinary cancer care, and patient-focused surgical treatment.",

  about: [
    "Dr. P. Karunakar Reddy is a Consultant Surgical Oncologist at Apollo JBP Hospitals with a strong foundation in general surgery and surgical oncology.",
    "He specializes in head and neck, thoracic, gastrointestinal, and gynecologic oncology surgeries, along with general surgical oncology procedures.",
    "His experience includes independent oncology consultations, surgical care, multidisciplinary coordination, patient interaction, and healthcare team leadership.",
    "He is committed to clinical excellence, compassionate patient care, and coordinated cancer treatment."
  ],

  qualifications: [
    {
      degree: "MBBS",
      institute: "Osmania Medical College, Hyderabad",
      year: "2004–2009",
    },
    {
      degree: "Internship",
      institute: "Osmania Medical College, Hyderabad",
      year: "2009–2010",
    },
    {
      degree: "MS (General Surgery)",
      institute: "Osmania Medical College, Hyderabad",
      year: "2011–2014",
    },
    {
      degree: "M.Ch (Surgical Oncology)",
      institute:
        "MNJ Institute of Oncology, Osmania Medical College, Hyderabad",
      year: "2014–2017",
    },
  ],

  highlights: [
    {
      value: "M.Ch",
      label: "Surgical Oncology",
    },
    {
      value: "4+",
      label: "Major Oncology Areas",
    },
    {
      value: "Cancer",
      label: "Surgical Care",
    },
  ],

  expertise: [
    "Surgical Oncology",
    "Head & Neck Oncology",
    "Thoracic Oncology",
    "Gastrointestinal Oncology",
    "Gynecologic Oncology",
    "General Surgical Procedures",
    "Complex Oncological Surgery",
    "Multidisciplinary Cancer Care",
    "Patient Interaction & Complaint Resolution",
    "Team Leadership",
    "Project Management",
  ],

  experience:
    "Dr. P. Karunakar Reddy has extensive experience in surgical oncology, complex cancer surgery, multidisciplinary care, and oncology consultations across leading healthcare institutions.",

  experienceDetails: [
    {
      role: "Senior Resident – Surgical Oncology",
      organization: "MNJ Institute of Oncology, Hyderabad",
      duration: "Aug 2017 – Jul 2018",
    },
    {
      role: "Assistant Professor",
      organization: "Omega Susrutha Hospital, Karimnagar",
      duration: "Mar 2019 – Jan 2020",
    },
    {
      role: "Consultant",
      organization: "Apollo Tele Health",
      duration: "Mar 2020 – Present",
    },
  ],

  training: [
    "M.Ch in Surgical Oncology – MNJ Institute of Oncology, Hyderabad",
    "Post-M.Ch clinical experience in oncology consultations and surgical care",
    "Experience in multidisciplinary cancer care and coordination with oncology teams",
  ],

  research: [],

  publications: [],

  faqs: [
    {
      question:
        "Who is Dr. P. Karunakar Reddy and what is his expertise?",
      questionHindi:
        "डॉ. पी. करुणाकर रेड्डी कौन हैं और उनकी विशेषज्ञता क्या है?",
      answer:
        "Dr. P. Karunakar Reddy is a Consultant Surgical Oncologist at Apollo JBP Hospitals, specializing in head and neck, thoracic, gastrointestinal, and gynecologic oncology surgery.",
      answerHindi:
        "डॉ. पी. करुणाकर रेड्डी Apollo JBP Hospitals में Consultant Surgical Oncologist हैं। वे Head & Neck, Thoracic, Gastrointestinal और Gynecologic Oncology Surgery में विशेषज्ञता रखते हैं।",
    },
    {
      question:
        "What are Dr. Reddy's qualifications?",
      questionHindi:
        "डॉ. रेड्डी की शैक्षणिक योग्यताएं क्या हैं?",
      answer:
        "He holds an MBBS and MS in General Surgery from Osmania Medical College, Hyderabad, and an M.Ch in Surgical Oncology from MNJ Institute of Oncology, Hyderabad.",
      answerHindi:
        "उन्होंने Osmania Medical College, Hyderabad से MBBS और MS (General Surgery) तथा MNJ Institute of Oncology, Hyderabad से M.Ch (Surgical Oncology) किया है।",
    },
    {
      question:
        "What types of cancer surgeries does Dr. Reddy specialize in?",
      questionHindi:
        "डॉ. रेड्डी किस प्रकार की कैंसर सर्जरी में विशेषज्ञता रखते हैं?",
      answer:
        "His surgical oncology expertise includes head and neck tumor surgery, thoracic oncology, gastrointestinal oncology, gynecologic oncology, and general surgical oncology procedures.",
      answerHindi:
        "उनकी Surgical Oncology विशेषज्ञता में Head & Neck Tumor Surgery, Thoracic Oncology, Gastrointestinal Oncology, Gynecologic Oncology और General Surgical Oncology Procedures शामिल हैं।",
    },
    {
      question:
        "Does Dr. Reddy have experience in multidisciplinary cancer care?",
      questionHindi:
        "क्या डॉ. रेड्डी को मल्टीडिसिप्लिनरी कैंसर केयर का अनुभव है?",
      answer:
        "Yes. His experience includes multidisciplinary cancer care and coordination with different oncology teams to support comprehensive patient management.",
      answerHindi:
        "हाँ। उनके अनुभव में Multidisciplinary Cancer Care और विभिन्न Oncology Teams के साथ समन्वय करके व्यापक मरीज देखभाल शामिल है।",
    },
    {
      question:
        "Why choose Dr. P. Karunakar Reddy at Apollo JBP Hospitals?",
      questionHindi:
        "Apollo JBP Hospitals में डॉ. पी. करुणाकर रेड्डी को क्यों चुनें?",
      answer:
        "Patients can benefit from his surgical oncology training, experience in complex cancer surgeries, multidisciplinary coordination, and patient-focused approach.",
      answerHindi:
        "मरीजों को उनकी Surgical Oncology Training, Complex Cancer Surgery के अनुभव, Multidisciplinary Coordination और Patient-Focused Approach का लाभ मिल सकता है।",
    },
    {
      question:
        "How can I consult Dr. P. Karunakar Reddy?",
      questionHindi:
        "मैं डॉ. पी. करुणाकर रेड्डी से परामर्श कैसे ले सकता हूँ?",
      answer:
        "You can book an appointment at Apollo JBP Hospitals or contact the hospital for consultation.",
      answerHindi:
        "आप Apollo JBP Hospitals में अपॉइंटमेंट बुक कर सकते हैं या परामर्श के लिए अस्पताल से संपर्क कर सकते हैं।",
    },
  ],

  opd: {
    days: [],
    timing: "",
  },
},
{
  id: "d-042",
  slug: "dr-shivangini-gupta",
  name: "Dr. Shivangini Gupta",
  designation: "Consultant - Pediatric Nephrology",
  speciality: "Pediatric Nephrology",
  specialitySlug: "pediatric-nephrology",
  department: "nephro",

  image: "/images/doctors/shivangini-gupta.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/pediatric-nephrologist-in-jabalpur/",

  languages: ["Hindi", "English"],

  summary:
    "Dr. Shivangini Gupta is a Pediatric Nephrologist with over 10 years of experience in diagnosing and managing kidney-related conditions in children, including nephrotic syndrome, urinary tract infections, congenital kidney disorders, and chronic kidney disease.",

  about: [
    "Dr. Shivangini Gupta is a Pediatric Nephrologist at Apollo JBP Hospitals, specializing in the diagnosis and treatment of kidney-related conditions in children.",
    "She provides child-friendly, patient-centered care for conditions including nephrotic syndrome, urinary tract infections, congenital anomalies of the kidney and urinary tract, and chronic kidney disease.",
    "Her clinical expertise includes pediatric renal replacement therapy, dialysis, and pediatric renal transplant care, along with personalized support for young patients and their families.",
    "She has a strong academic background and has participated in national-level workshops, training programs, and academic forums in pediatric nephrology."
  ],

  qualifications: [
    {
      degree: "MBBS",
      institute: "Nepalgunj Medical College, Nepal",
      year: "2009",
    },
    {
      degree: "DNB (Pediatrics)",
      institute:
        "Vivekananda Polyclinic and Institute of Medical Sciences, Lucknow",
      year: "2015",
    },
    {
      degree: "FNB (Pediatric Nephrology)",
      institute: "Sir Ganga Ram Hospital, Delhi",
      year: "2021–2023",
    },
    {
      degree: "FISPN",
      institute: "Indian Society of Pediatric Nephrology",
      year: "",
    },
  ],

  highlights: [
    {
      value: "10+",
      label: "Years of Experience",
    },
    {
      value: "FNB",
      label: "Pediatric Nephrology",
    },
    {
      value: "Renal",
      label: "Transplant & Replacement Care",
    },
  ],

  expertise: [
    "Pediatric Nephrology",
    "Pediatric Renal Replacement Therapy",
    "Urinary Tract Infections",
    "Steroid-Resistant Nephrotic Syndrome",
    "Nocturnal Enuresis",
    "Congenital Anomalies of the Kidney & Urinary Tract (CAKUT)",
    "Chronic Kidney Disease",
    "Pediatric Renal Transplant Care",
    "Peritoneal Dialysis",
    "Hemodialysis",
    "Pediatric Kidney Disease Management",
  ],

  experience:
    "Dr. Shivangini Gupta has over 10 years of experience, including residency and consultant roles in pediatric nephrology at major healthcare institutions.",

  experienceDetails: [
    {
      role: "Senior Resident",
      organization: "Career Institute of Medical Sciences, Lucknow",
      duration: "",
    },
    {
      role: "Senior Resident",
      organization: "Sir Ganga Ram Hospital, Delhi",
      duration: "",
    },
    {
      role: "Senior Resident",
      organization: "Rainbow Children’s Hospital, New Delhi",
      duration: "",
    },
    {
      role: "Pediatric Nephrology Practice",
      organization: "Action Balaji Hospital, Delhi",
      duration: "",
    },
    {
      role: "Pediatric Nephrology Practice",
      organization: "Sitaram Bhartia Hospital, Delhi",
      duration: "",
    },
    {
      role: "Pediatric Nephrology Practice",
      organization: "Yashoda Hospital, Kaushambi, Delhi",
      duration: "",
    },
  ],

  training: [
    "FNB in Pediatric Nephrology – Sir Ganga Ram Hospital, Delhi",
    "National-level pediatric nephrology workshops and training programs",
    "Advanced training in pediatric renal replacement and transplant care",
  ],

  research: [],

  publications: [],

  faqs: [
    {
      question:
        "Who is Dr. Shivangini Gupta and what is her specialization?",
      questionHindi:
        "डॉ. शिवांगीनी गुप्ता कौन हैं और उनकी विशेषज्ञता क्या है?",
      answer:
        "Dr. Shivangini Gupta is a Pediatric Nephrologist at Apollo JBP Hospitals specializing in the diagnosis and management of kidney diseases in children, including nephrotic syndrome, urinary tract infections, and chronic kidney disease.",
      answerHindi:
        "डॉ. शिवांगीनी गुप्ता Apollo JBP Hospitals में Pediatric Nephrologist हैं। वे बच्चों में Nephrotic Syndrome, Urinary Tract Infections और Chronic Kidney Disease सहित किडनी रोगों के निदान और प्रबंधन में विशेषज्ञता रखती हैं।",
    },
    {
      question:
        "What advanced pediatric nephrology training does Dr. Gupta have?",
      questionHindi:
        "डॉ. गुप्ता के पास Pediatric Nephrology में कौन सा उन्नत प्रशिक्षण है?",
      answer:
        "She completed FNB in Pediatric Nephrology from Sir Ganga Ram Hospital, Delhi, along with her DNB in Pediatrics.",
      answerHindi:
        "उन्होंने Sir Ganga Ram Hospital, Delhi से FNB (Pediatric Nephrology) और DNB (Pediatrics) की योग्यता प्राप्त की है।",
    },
    {
      question:
        "What conditions does Dr. Shivangini Gupta treat?",
      questionHindi:
        "डॉ. शिवांगीनी गुप्ता बच्चों में किन किडनी रोगों का इलाज करती हैं?",
      answer:
        "She manages pediatric kidney conditions including nephrotic syndrome, urinary tract infections, congenital anomalies of the kidney and urinary tract, chronic kidney disease, and nocturnal enuresis.",
      answerHindi:
        "वे बच्चों में Nephrotic Syndrome, Urinary Tract Infections, Congenital Anomalies of the Kidney and Urinary Tract, Chronic Kidney Disease और Nocturnal Enuresis जैसी समस्याओं का प्रबंधन करती हैं।",
    },
    {
      question:
        "Does Dr. Gupta manage pediatric dialysis and transplant care?",
      questionHindi:
        "क्या डॉ. गुप्ता बच्चों में डायलिसिस और ट्रांसप्लांट की देखभाल करती हैं?",
      answer:
        "Yes. Her expertise includes pediatric renal replacement therapy, peritoneal and hemodialysis, and pediatric renal transplant care.",
      answerHindi:
        "हाँ। उनकी विशेषज्ञता में Pediatric Renal Replacement Therapy, Peritoneal Dialysis, Hemodialysis और Pediatric Renal Transplant Care शामिल हैं।",
    },
    {
      question:
        "What makes Dr. Shivangini Gupta a trusted pediatric nephrologist?",
      questionHindi:
        "डॉ. शिवांगीनी गुप्ता को एक भरोसेमंद Pediatric Nephrologist क्या बनाता है?",
      answer:
        "Her patient-centered approach, child-friendly care, advanced pediatric nephrology training, and experience at major healthcare institutions support comprehensive kidney care for children.",
      answerHindi:
        "उनका Patient-Centered Approach, Child-Friendly Care, Advanced Pediatric Nephrology Training और प्रमुख संस्थानों का अनुभव बच्चों के लिए व्यापक किडनी देखभाल में सहायक है।",
    },
    {
      question:
        "Why consult Dr. Shivangini Gupta at Apollo JBP Hospitals?",
      questionHindi:
        "Apollo JBP Hospitals में डॉ. शिवांगीनी गुप्ता से परामर्श क्यों लें?",
      answer:
        "She brings over 10 years of clinical experience along with specialized pediatric nephrology training and expertise in advanced renal care for children.",
      answerHindi:
        "उनके पास 10+ वर्षों का क्लिनिकल अनुभव, Specialized Pediatric Nephrology Training और बच्चों के लिए Advanced Renal Care की विशेषज्ञता है।",
    },
    {
      question:
        "How can I consult Dr. Shivangini Gupta?",
      questionHindi:
        "मैं डॉ. शिवांगीनी गुप्ता से परामर्श कैसे ले सकता हूँ?",
      answer:
        "You can book an appointment at Apollo JBP Hospitals or contact the hospital for consultation.",
      answerHindi:
        "आप Apollo JBP Hospitals में अपॉइंटमेंट बुक कर सकते हैं या परामर्श के लिए अस्पताल से संपर्क कर सकते हैं।",
    },
  ],

  opd: {
    days: [],
    timing: "",
  },
},

{
  id: "d-043",
  slug: "dr-vaidehee-milind-naik",
  name: "Dr. Vaidehee Milind Naik",
  designation: "Consultant Pathologist & Histopathologist",
  speciality: "Pathology",
  specialitySlug: "pathology",
  department: "pathology",

  image: "/images/doctors/vaidehee-naik.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/pathology-doctor-in-jabalpur-near-me/",

  languages: ["Hindi", "English"],

  summary:
    "Dr. Vaidehee Milind Naik is a Consultant Pathologist and Histopathologist with extensive experience in histopathology, cytology, clinical pathology, and diagnostic laboratory medicine.",

  about: [
    "Dr. Vaidehee Milind Naik is a Consultant Pathologist and Histopathologist at Apollo JBP Hospitals, Jabalpur, specializing in accurate and timely diagnostic services.",
    "Her expertise includes histopathology, cytology, clinical pathology, hematology, clinical biochemistry, immunology, serology, FNAC, Pap smear evaluation, and laboratory medicine.",
    "She is also experienced in immunohistochemistry, frozen section analysis, ROTEM (TEG) interpretation, flow cytometry, and quality management systems in ISO 15189:2012 certified laboratories.",
    "Her diagnostic expertise supports the evaluation of infections, autoimmune diseases, hematological disorders, malignancies, and chronic illnesses through laboratory, tissue, and cytological examination."
  ],

  qualifications: [
    {
      degree: "MBBS",
      institute:
        "N.K.P. Salve Institute of Medical Sciences, MUHS, Nagpur",
      year: "",
    },
    {
      degree: "MD (Pathology)",
      institute:
        "MGM Medical College and Hospital, Navi Mumbai",
      year: "",
    },
  ],

  highlights: [
    {
      value: "MD",
      label: "Pathology",
    },
    {
      value: "IHC",
      label: "Histopathology",
    },
    {
      value: "FNAC",
      label: "Cytopathology",
    },
  ],

  expertise: [
    "Pathology",
    "Histopathology",
    "Clinical Pathology",
    "Hematology",
    "Clinical Biochemistry",
    "Immunology",
    "Serology",
    "FNAC",
    "Cytopathology",
    "Pap Smear Evaluation",
    "Immunohistochemistry",
    "Frozen Section Analysis",
    "ROTEM (TEG) Interpretation",
    "Flow Cytometry",
    "Laboratory Medicine",
    "Quality Management Systems",
    "Medical Education & Teaching",
  ],

  experience:
    "Dr. Vaidehee Milind Naik has extensive experience in pathology, histopathology, laboratory medicine, cytology, and diagnostic quality management.",

  experienceDetails: [],

  training: [
    "Certificate course in Blood Management",
    "Certificate course in Quality Management Systems",
    "Certificate course in Flow Cytometry",
    "Participation in national and regional conferences focused on Oncopathology and advanced diagnostic techniques",
  ],

  research: [
    "Presented research and clinical findings at VAPCON, NIMACON, and events hosted by Tata Memorial Hospital Mumbai, AIIMS, and KIMS-Kingsway, Nagpur.",
    "Active involvement in medical education, diagnostic pathology, and clinical research.",
  ],

  publications: [
    "Collision Tumour of Cerebellopontine Angle in a Patient with No Neurofibromatosis Criteria: A Rare, Peculiar, and Interesting Case — International Surgery Journal.",
    "Erythema Induratum: A Rare Case with Unusual Presentation — International Journal of Bioassays.",
    "Histomorphological Profile and Clinicopathological Correlation of Soft Tissue Tumours – A Study at a Tertiary Care Teaching Hospital — International Journal of Health Sciences & Research.",
    "Squamous Cell Carcinoma: A Rare Case with Unusual Presentation in Uterus — International Journal of Health Sciences & Research.",
  ],

  faqs: [
    {
      question:
        "Who is Dr. Vaidehee Milind Naik and what is her expertise?",
      questionHindi:
        "डॉ. वैधही मिलिंद नाइक कौन हैं और उनकी विशेषज्ञता क्या है?",
      answer:
        "Dr. Vaidehee Milind Naik is a Consultant Pathologist and Histopathologist at Apollo JBP Hospitals specializing in histopathology, clinical pathology, cytology, and diagnostic laboratory medicine.",
      answerHindi:
        "डॉ. वैधही मिलिंद नाइक Apollo JBP Hospitals में Consultant Pathologist और Histopathologist हैं। वे Histopathology, Clinical Pathology, Cytology और Diagnostic Laboratory Medicine में विशेषज्ञता रखती हैं।",
    },
    {
      question:
        "What role does a pathologist like Dr. Naik play in patient diagnosis?",
      questionHindi:
        "डॉ. नाइक जैसी पैथोलॉजिस्ट मरीजों के निदान में क्या भूमिका निभाती हैं?",
      answer:
        "As a laboratory medicine specialist, Dr. Naik evaluates blood, urine, tissue, and cytological specimens to help identify diseases and support physicians in treatment planning.",
      answerHindi:
        "Laboratory Medicine Specialist के रूप में डॉ. नाइक रक्त, मूत्र, ऊतक और Cytological Specimens की जांच करती हैं, जिससे बीमारियों की पहचान और उपचार की योजना बनाने में चिकित्सकों को सहायता मिलती है।",
    },
    {
      question:
        "Does Dr. Naik handle cancer biopsy and histopathology?",
      questionHindi:
        "क्या डॉ. नाइक कैंसर बायोप्सी और हिस्टोपैथोलॉजी की जांच करती हैं?",
      answer:
        "Yes. She is experienced in histopathology and biopsy analysis, including tissue evaluation for malignancy, infection, and inflammatory conditions.",
      answerHindi:
        "हाँ। उन्हें Histopathology और Biopsy Analysis का अनुभव है, जिसमें Malignancy, Infection और Inflammatory Conditions से संबंधित ऊतक परीक्षण शामिल हैं।",
    },
  ],

  opd: {
    days: [],
    timing: "",
  },
},

{
  id: "d-044",
  slug: "dr-ganesh-gorthi",
  name: "Dr. Ganesh Gorthi",
  designation: "Senior Minimal Access Surgeon",
  speciality: "Gastro Surgery",
  specialitySlug: "gastro-surgery",
  department: "gastro",

  image: "/images/doctors/ganesh.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/gastro-surgeon-in-jabalpur/",

  languages: ["Hindi", "English"],

  summary:
    "Dr. Ganesh Gorthi is a globally trained robotic and laparoscopic surgeon with over two decades of experience in gastrointestinal, bariatric, general, and minimal access surgery.",

  about: [
    "Dr. Ganesh Gorthi is a Senior Minimal Access Surgeon at Apollo JBP Hospitals with extensive experience in robotic, laparoscopic, gastrointestinal, bariatric, and general surgery.",
    "He has worked across India and the UK, including a decade of clinical experience within the UK NHS system, and has served at leading hospitals including Apollo Hospitals, Yashoda Hospitals, Continental Hospitals, and Kamineni Hospitals.",
    "He has a strong focus on robotic surgery, surgical innovation, teaching, and developing sustainable minimally invasive surgery programs.",
    "His expertise includes advanced GI and hepatobiliary surgery, bariatric procedures, and minimally invasive treatment of abdominal and gastrointestinal conditions."
  ],

  qualifications: [
    {
      degree: "M.B.B.S",
      institute: "Guntur Medical College, India",
      year: "",
    },
    {
      degree: "M.S. (General Surgery)",
      institute: "Guntur Medical College, India",
      year: "",
    },
    {
      degree: "M.R.C.S.",
      institute: "Royal College of Surgeons, Edinburgh, UK",
      year: "",
    },
    {
      degree: "F.R.C.S.",
      institute: "Royal College of Surgeons, Edinburgh, UK",
      year: "",
    },
    {
      degree: "F.A.C.S.",
      institute: "American College of Surgeons, USA",
      year: "",
    },
    {
      degree: "F.M.A.S.",
      institute: "Minimal Access Surgery, India",
      year: "",
    },
    {
      degree: "Fellowship in Robotic Surgery",
      institute: "New Delhi, India",
      year: "",
    },
    {
      degree: "Diploma in Business Management",
      institute: "Open College, Birmingham, UK",
      year: "",
    },
  ],

  highlights: [
    {
      value: "20+",
      label: "Years of Experience",
    },
    {
      value: "50+",
      label: "Robotic Procedures",
    },
    {
      value: "NHS",
      label: "UK Clinical Experience",
    },
  ],

  expertise: [
    "Minimal Access Surgery",
    "GI Surgery",
    "Laparoscopic Surgery",
    "Robotic Surgery",
    "Gastrointestinal Surgery",
    "Bariatric Surgery",
    "General Surgery",
    "Hepatobiliary Surgery",
    "Liver Surgery",
    "Pancreatic Surgery",
    "Gallbladder Surgery",
    "Hernia Surgery",
    "Advanced Minimally Invasive Surgery",
    "Robotic GI Surgery",
    "Robotic Bariatric Surgery",
  ],

  experience:
    "Dr. Ganesh Gorthi brings over two decades of experience in robotic, laparoscopic, gastrointestinal, bariatric, and minimal access surgery, including a decade with the UK NHS.",

  experienceDetails: [
    {
      role: "Consultant and Head of Robotic Surgery",
      organization: "Leading Hospitals in India",
      duration: "",
    },
    {
      role:
        "Advanced Laparoscopic, Bariatric & Hepatobiliary Surgery",
      organization: "UK NHS",
      duration: "2002–2012",
    },
    {
      role: "Robotic Surgery Program Leadership",
      organization: "Continental Hospitals, Hyderabad",
      duration: "",
    },
  ],

  training: [
    "F.M.A.S. – Minimal Access Surgery, India",
    "Fellowship in Robotic Surgery – New Delhi, India",
    "Advanced laparoscopic, bariatric, and hepatobiliary surgical experience through the UK NHS",
    "International exposure in robotic and minimally invasive surgery",
  ],

  research: [
    "Research on robotic surgery implementation and surgical outcomes.",
    "Multiple national and international conference presentations.",
  ],

  publications: [
    "Published articles in BMJ Case Reports.",
    "Published articles in Journal of Surgical Oncology.",
    "Multiple national and international conference presentations on robotic and minimal access surgery.",
  ],

  faqs: [
    {
      question:
        "Who is Dr. Ganesh Gorthi and what does he specialize in?",
      questionHindi:
        "डॉ. गणेश गोर्थी कौन हैं और वे किस विशेषज्ञता में कार्य करते हैं?",
      answer:
        "Dr. Ganesh Gorthi is a Senior Minimal Access Surgeon at Apollo JBP Hospitals specializing in robotic, laparoscopic, gastrointestinal, bariatric, and general surgery.",
      answerHindi:
        "डॉ. गणेश गोर्थी Apollo JBP Hospitals में Senior Minimal Access Surgeon हैं। वे Robotic, Laparoscopic, Gastrointestinal, Bariatric और General Surgery में विशेषज्ञता रखते हैं।",
    },
    {
      question:
        "Does Dr. Ganesh Gorthi perform bariatric surgery in Jabalpur?",
      questionHindi:
        "क्या डॉ. गणेश गोर्थी जबलपुर में बैरिएट्रिक सर्जरी करते हैं?",
      answer:
        "Yes. Dr. Ganesh Gorthi specializes in bariatric surgery and minimally invasive surgical procedures for obesity and related metabolic conditions.",
      answerHindi:
        "हाँ। डॉ. गणेश गोर्थी Bariatric Surgery और मोटापे तथा उससे जुड़ी metabolic conditions के लिए minimally invasive surgical procedures में विशेषज्ञता रखते हैं।",
    },
    {
      question:
        "What are Dr. Ganesh Gorthi's specialties?",
      questionHindi:
        "डॉ. गणेश गोर्थी की प्रमुख विशेषज्ञताएं क्या हैं?",
      answer:
        "His specialties include minimal access surgery, GI surgery, laparoscopic surgery, robotic surgery, hepatobiliary surgery, bariatric surgery, and general surgery.",
      answerHindi:
        "उनकी प्रमुख विशेषज्ञताओं में Minimal Access Surgery, GI Surgery, Laparoscopic Surgery, Robotic Surgery, Hepatobiliary Surgery, Bariatric Surgery और General Surgery शामिल हैं।",
    },
    {
      question:
        "Where can I find a hepatobiliary specialist in Jabalpur?",
      questionHindi:
        "जबलपुर में Hepatobiliary Specialist से कहाँ परामर्श लिया जा सकता है?",
      answer:
        "Dr. Ganesh Gorthi at Apollo JBP Hospitals provides surgical care for hepatobiliary and gastrointestinal conditions, including liver, pancreas, and gallbladder-related surgical problems.",
      answerHindi:
        "Apollo JBP Hospitals में डॉ. गणेश गोर्थी Hepatobiliary और Gastrointestinal conditions के लिए surgical care प्रदान करते हैं, जिसमें Liver, Pancreas और Gallbladder से संबंधित surgical problems शामिल हैं।",
    },
    {
      question:
        "Is Dr. Ganesh Gorthi a specialist for abdominal and gastrointestinal surgery?",
      questionHindi:
        "क्या डॉ. गणेश गोर्थी पेट और गैस्ट्रोइंटेस्टाइनल सर्जरी के विशेषज्ञ हैं?",
      answer:
        "Yes. His expertise includes gastrointestinal and minimally invasive surgery involving the abdomen, liver, pancreas, gallbladder, and other digestive system conditions.",
      answerHindi:
        "हाँ। उनकी विशेषज्ञता में पेट, लिवर, पैंक्रियास, पित्ताशय और पाचन तंत्र से संबंधित अन्य समस्याओं की Gastrointestinal और Minimally Invasive Surgery शामिल है।",
    },
    {
      question:
        "What are Dr. Ganesh Gorthi's qualifications and experience?",
      questionHindi:
        "डॉ. गणेश गोर्थी की शैक्षणिक योग्यताएं और अनुभव क्या हैं?",
      answer:
        "His qualifications include MBBS, MS in General Surgery, MRCS, FRCS, FACS, FMAS, and Fellowship in Robotic Surgery. He also has over two decades of surgical experience, including 10 years with the UK NHS.",
      answerHindi:
        "उनकी योग्यताओं में MBBS, MS (General Surgery), MRCS, FRCS, FACS, FMAS और Fellowship in Robotic Surgery शामिल हैं। उन्हें दो दशकों से अधिक का surgical experience है, जिसमें UK NHS के साथ 10 वर्षों का अनुभव शामिल है।",
    },
    {
      question:
        "Why consult Dr. Ganesh Gorthi at Apollo JBP Hospitals?",
      questionHindi:
        "Apollo JBP Hospitals में डॉ. गणेश गोर्थी से परामर्श क्यों लें?",
      answer:
        "Patients can benefit from his extensive experience in robotic and minimal access surgery, gastrointestinal and bariatric procedures, international surgical exposure, and focus on surgical innovation.",
      answerHindi:
        "मरीजों को Robotic और Minimal Access Surgery, Gastrointestinal और Bariatric Procedures, अंतरराष्ट्रीय surgical exposure और surgical innovation में उनके व्यापक अनुभव का लाभ मिल सकता है।",
    },
    {
      question:
        "How can I consult Dr. Ganesh Gorthi?",
      questionHindi:
        "मैं डॉ. गणेश गोर्थी से परामर्श कैसे ले सकता हूँ?",
      answer:
        "You can book an appointment at Apollo JBP Hospitals or contact the hospital for consultation.",
      answerHindi:
        "आप Apollo JBP Hospitals में अपॉइंटमेंट बुक कर सकते हैं या परामर्श के लिए अस्पताल से संपर्क कर सकते हैं।",
    },
  ],

  opd: {
    days: [],
    timing: "",
  },
},

{
  id: "d-045",
  slug: "dr-rajesh-laxman-rao-sherke",
  name: "Dr. Rajesh Laxman Rao Sherke",
  designation: "Senior Consultant, Nephrology",
  speciality: "Nephrology",
  specialitySlug: "nephrology",
  department: "nephro",

  image: "/images/doctors/rajesh-laxman.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/nephrologist-in-jabalpur/",

  languages: ["English", "Hindi"],

  summary:
    "Dr. Rajesh Laxman Rao Sherke is a Senior Consultant in Nephrology with extensive expertise in kidney disease management, dialysis, renal transplantation, hypertension, and advanced renal therapies.",

  about: [
    "Dr. Rajesh Laxman Rao Sherke is a Senior Consultant Nephrologist at Apollo JBP Hospitals, providing evidence-based and personalized care for a wide range of kidney disorders.",
    "His clinical expertise includes acute and chronic kidney disease, dialysis, kidney transplantation, hypertension-related renal disorders, kidney biopsy, electrolyte management, and vascular access procedures.",
    "He is trained in advanced renal replacement therapies including haemodialysis, CAPD, SLED, and CRRT, and has experience in transplant-related evaluation and long-term renal care.",
    "His professional interests also include clinical research, medical education, development of nephrology and dialysis services, healthcare quality management, and patient care programs."
  ],

  qualifications: [
    {
      degree: "MBBS",
      institute: "Govt. Medical College, Nagpur, India",
      year: "",
    },
    {
      degree: "MD (General Medicine)",
      institute: "Govt. Medical College, Nagpur, India",
      year: "",
    },
    {
      degree: "DM (Nephrology)",
      institute:
        "Christian Medical College, Vellore; Dr. MGR Medical University, Chennai, India",
      year: "",
    },
    {
      degree: "DNB (Nephrology)",
      institute: "National Board of Examinations, New Delhi",
      year: "",
    },
    {
      degree: "Specialist Registrar (Renal Medicine)",
      institute: "St. James’s University Hospital, Leeds, UK",
      year: "",
    },
    {
      degree: "Renal Clinical Fellow",
      institute: "Freeman Hospital, Newcastle-upon-Tyne, UK",
      year: "",
    },
  ],

  highlights: [
    {
      value: "DM",
      label: "Nephrology",
    },
    {
      value: "UK",
      label: "Renal Medicine Experience",
    },
    {
      value: "CRRT",
      label: "Advanced Dialysis Care",
    },
  ],

  expertise: [
    "Nephrology",
    "Kidney Care",
    "Acute Kidney Disease",
    "Chronic Kidney Disease",
    "Dialysis",
    "Kidney Transplantation",
    "Hypertension & Renal Disorders",
    "Kidney Biopsy",
    "Peritoneal Dialysis",
    "Haemodialysis",
    "CAPD",
    "SLED",
    "CRRT",
    "Vascular Access Procedures",
    "Electrolyte Management",
    "Patient Care Management",
    "Clinical Decision-Making",
    "Healthcare Administration",
    "Quality Management",
    "Medical Education & Research",
  ],

  experience:
    "Dr. Rajesh Laxman Rao Sherke has extensive experience in nephrology, dialysis, renal transplantation, advanced renal replacement therapies, and comprehensive kidney care.",

  experienceDetails: [],

  training: [
    "Specialist Registrar – Renal Medicine, St. James’s University Hospital, Leeds, UK",
    "Renal Clinical Fellowship – Freeman Hospital, Newcastle-upon-Tyne, UK",
    "Advanced training in haemodialysis, CAPD, SLED, and CRRT",
    "Training in kidney transplantation and renal replacement therapy",
  ],

  research: [
    "Clinical research and trials in Nephrology.",
    "Hypertension management and research.",
    "Research and development of nephrology and dialysis services.",
    "Medical education and training programs in renal care.",
  ],

  areasOfSpecialInterest: [
    "Renal Transplantation – Live & Cadaveric",
    "Advanced Dialysis Techniques – Haemodialysis, CAPD, SLED & CRRT",
    "Hypertension Management & Research",
    "Clinical Research & Trials in Nephrology",
    "Development of Nephrology & Dialysis Centers",
    "Medical Education & Training Programs",
    "Policy Development in Nephrology & Patient Care",
  ],

  publications: [],

  faqs: [
    {
      question:
        "Who is Dr. Rajesh Laxman Rao Sherke and what are his qualifications?",
      questionHindi:
        "डॉ. राजेश लक्ष्मण राव शेरके कौन हैं और उनकी योग्यताएं क्या हैं?",
      answer:
        "Dr. Rajesh Laxman Rao Sherke is a Senior Consultant Nephrologist at Apollo JBP Hospitals. He holds MBBS, MD in General Medicine, DM in Nephrology, and DNB in Nephrology, along with renal medicine experience in the UK.",
      answerHindi:
        "डॉ. राजेश लक्ष्मण राव शेरके Apollo JBP Hospitals में Senior Consultant Nephrologist हैं। उनके पास MBBS, MD (General Medicine), DM (Nephrology) और DNB (Nephrology) की योग्यताएं हैं तथा UK में Renal Medicine का अनुभव भी है।",
    },
    {
      question:
        "What kidney problems does Dr. Sherke treat?",
      questionHindi:
        "डॉ. शेरके किन किडनी रोगों का इलाज करते हैं?",
      answer:
        "Dr. Sherke manages acute and chronic kidney disease, hypertension-related renal disorders, electrolyte imbalances, kidney infections, nephrotic syndrome, and other kidney-related conditions.",
      answerHindi:
        "डॉ. शेरके Acute और Chronic Kidney Disease, Hypertension-Related Renal Disorders, Electrolyte Imbalances, Kidney Infections, Nephrotic Syndrome और अन्य किडनी संबंधी समस्याओं का प्रबंधन करते हैं।",
    },
    {
      question:
        "Does Dr. Sherke provide dialysis care at Apollo JBP Hospitals?",
      questionHindi:
        "क्या डॉ. शेरके Apollo JBP Hospitals में डायलिसिस की देखभाल करते हैं?",
      answer:
        "Yes. His expertise includes haemodialysis, peritoneal dialysis, CAPD, SLED, and CRRT as part of advanced renal replacement therapy.",
      answerHindi:
        "हाँ। उनकी विशेषज्ञता में Haemodialysis, Peritoneal Dialysis, CAPD, SLED और CRRT जैसी Advanced Renal Replacement Therapies शामिल हैं।",
    },
    {
      question:
        "Is Dr. Sherke involved in kidney transplant care?",
      questionHindi:
        "क्या डॉ. शेरके किडनी ट्रांसप्लांट की देखभाल में शामिल हैं?",
      answer:
        "Yes. Renal transplantation, including live and cadaveric transplantation, is one of his areas of special interest. His role includes patient evaluation and ongoing renal management.",
      answerHindi:
        "हाँ। Renal Transplantation, जिसमें Live और Cadaveric Transplantation शामिल हैं, उनकी विशेष रुचि के क्षेत्रों में है। उनकी भूमिका में मरीज का मूल्यांकन और आगे की Renal Management शामिल है।",
    },
    {
      question:
        "How does Dr. Sherke manage hypertension and kidney-related complications?",
      questionHindi:
        "डॉ. शेरके हाई ब्लड प्रेशर और किडनी से जुड़ी जटिलताओं का प्रबंधन कैसे करते हैं?",
      answer:
        "He focuses on hypertension management, renal assessment, appropriate medical treatment, patient education, and long-term kidney care.",
      answerHindi:
        "वे Hypertension Management, Renal Assessment, उचित Medical Treatment, Patient Education और Long-Term Kidney Care पर ध्यान देते हैं।",
    },
    {
      question:
        "Why consult Dr. Rajesh Sherke at Apollo JBP Hospitals?",
      questionHindi:
        "Apollo JBP Hospitals में डॉ. राजेश शेरके से परामर्श क्यों लें?",
      answer:
        "Patients can benefit from his nephrology expertise, advanced renal replacement therapy experience, UK renal medicine exposure, and personalized approach to kidney care.",
      answerHindi:
        "मरीजों को उनकी Nephrology Expertise, Advanced Renal Replacement Therapy के अनुभव, UK Renal Medicine Exposure और Personalized Kidney Care Approach का लाभ मिल सकता है।",
    },
    {
      question:
        "How can I consult Dr. Rajesh Sherke?",
      questionHindi:
        "मैं डॉ. राजेश शेरके से परामर्श कैसे ले सकता हूँ?",
      answer:
        "You can book an appointment at Apollo JBP Hospitals or contact the hospital for consultation.",
      answerHindi:
        "आप Apollo JBP Hospitals में अपॉइंटमेंट बुक कर सकते हैं या परामर्श के लिए अस्पताल से संपर्क कर सकते हैं।",
    },
  ],

  opd: {
    days: [],
    timing: "",
  },
},

{
  id: "d-046",
  slug: "dr-arun-iyer",
  name: "Dr. Arun Iyer",
  designation: "DM Gastroenterology",
  speciality: "Gastroenterology",
  specialitySlug: "gastroenterology",
  department: "gastro",

  image: "/images/doctors/arun.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/gastroenterologist-in-jabalpur/",

  languages: ["Hindi", "English"],

  summary:
    "Senior gastroenterologist at Apollo JBP Hospitals, treating digestive, liver and pancreatic disorders with advanced endoscopy and a patient-first approach.",

  about: [
    "Dr. Arun Iyer is a leading gastroenterologist in Jabalpur, specializing in the diagnosis and treatment of liver, stomach and intestinal disorders including GERD, ulcers, IBS, hepatitis and chronic abdominal pain.",
    "He provides comprehensive digestive care for gastric infections, pancreatitis, liver complications and other gastrointestinal disorders using modern diagnostics and evidence-based treatment.",
    "Dr. Iyer has advanced expertise in endoscopy, colonoscopy, ERCP, EUS and endoluminal therapeutics, with experience in minimally invasive treatment of gastrointestinal and hepatobiliary diseases.",
    "His advanced endoscopy experience includes third-space endoscopy, EMR, ESD and ESG, with 500+ EUS procedures, 700+ ERCP procedures and 5000+ endoluminal procedures."
  ],

  qualifications: [
    {
      degree: "DM (Gastroenterology)",
      institute:
        "Government Medical College and Hospital, Thiruvananthapuram, Kerala",
      year: "2017",
    },
    {
      degree: "MD (Internal Medicine)",
      institute: "VMMC and Safdarjung Hospital, New Delhi",
      year: "2013",
    },
    {
      degree: "MBBS",
      institute: "Seth G.S. Medical College and KEM Hospital, Mumbai",
      year: "2009",
    },
    {
      degree: "Fellowship in Advanced Endoscopy",
      institute: "",
      year: "",
    },
  ],

  highlights: [
    {
      value: "500+",
      label: "EUS Procedures",
    },
    {
      value: "700+",
      label: "ERCP Procedures",
    },
    {
      value: "5000+",
      label: "Endoluminal Procedures",
    },
  ],

  expertise: [
    "Diseases of digestion, stomach and intestines",
    "Liver and pancreatic disorders",
    "Endoscopy and Colonoscopy",
    "ERCP (Endoscopic Retrograde Cholangiopancreatography)",
    "EUS (Endoscopic Ultrasound)",
    "Endoscopic ultrasound-guided procedures",
    "Endoluminal Therapeutics",
    "Endoscopic surgery",
    "Third-space endoscopy",
    "EMR, ESD and ESG",
    "Minimally invasive treatment of GI and hepatobiliary diseases",
  ],

  experience:
    "Dr. Arun Iyer brings advanced gastroenterology and endoscopy expertise, with extensive experience in EUS, ERCP, endoluminal procedures and minimally invasive gastrointestinal and hepatobiliary care.",

  training: [
    "Fellowship in Advanced Endoscopy",
    "Advanced training in ERCP, EUS and Endoluminal Therapeutics",
    "Specialized experience in third-space endoscopy, EMR, ESD and ESG",
    "Advanced minimally invasive treatment of gastrointestinal and hepatobiliary diseases",
  ],

  research: [],

  publications: [],

  opd: {
    days: [],
    timing: "",
  },

  faqs: [
    {
      question:
        "Who is Dr. Arun Iyer and what is his medical background?",
      questionHindi:
        "डॉ. अरुण अय्यर कौन हैं और उनकी मेडिकल योग्यता क्या है?",
      answer:
        "Dr. Arun Iyer is a gastroenterologist at Apollo JBP Hospitals, Jabalpur. He holds MBBS, MD in Internal Medicine and DM in Gastroenterology, with expertise in liver, pancreatic and gastrointestinal disorders.",
      answerHindi:
        "डॉ. अरुण अय्यर Apollo JBP Hospitals, जबलपुर के गैस्ट्रोएंटरोलॉजिस्ट हैं। उन्होंने MBBS, MD (मेडिसिन) और DM (गैस्ट्रोएंटरोलॉजी) किया है और लिवर, अग्न्याशय तथा पाचन तंत्र के रोगों के विशेषज्ञ हैं।",
    },
    {
      question:
        "What digestive disorders does Dr. Iyer treat at Apollo JBP Hospitals?",
      questionHindi:
        "डॉ. अय्यर Apollo JBP Hospitals में किन पाचन संबंधी बीमारियों का इलाज करते हैं?",
      answer:
        "Dr. Iyer treats acidity, ulcers, IBS, Crohn's disease, fatty liver, hepatitis and gastrointestinal bleeding, along with a wide range of digestive disorders.",
      answerHindi:
        "डॉ. अय्यर एसिडिटी, अल्सर, IBS, क्रोन्स डिज़ीज़, फैटी लिवर, हेपेटाइटिस और गैस्ट्रोइंटेस्टाइनल ब्लीडिंग सहित कई पाचन संबंधी बीमारियों का इलाज करते हैं।",
    },
    {
      question:
        "Does Dr. Iyer perform endoscopy and colonoscopy procedures?",
      questionHindi:
        "क्या डॉ. अय्यर एंडोस्कोपी और कोलोनोस्कोपी करते हैं?",
      answer:
        "Yes. Dr. Iyer performs diagnostic and therapeutic upper GI endoscopy, colonoscopy and ERCP, and has advanced expertise in EUS and endoluminal procedures.",
      answerHindi:
        "हाँ। डॉ. अय्यर डायग्नोस्टिक और थेराप्यूटिक अपर GI एंडोस्कोपी, कोलोनोस्कोपी और ERCP करते हैं तथा EUS और एंडोलुमिनल प्रक्रियाओं में भी विशेषज्ञता रखते हैं।",
    },
    {
      question: "What liver conditions does Dr. Iyer specialize in?",
      questionHindi:
        "डॉ. अय्यर किन लिवर संबंधी बीमारियों के विशेषज्ञ हैं?",
      answer:
        "Dr. Iyer treats liver conditions including hepatitis B and C, cirrhosis, liver failure and portal hypertension using advanced non-surgical approaches where appropriate.",
      answerHindi:
        "डॉ. अय्यर हेपेटाइटिस B और C, सिरोसिस, लिवर फेल्योर और पोर्टल हाइपरटेंशन जैसी लिवर संबंधी बीमारियों का इलाज करते हैं।",
    },
    {
      question: "Is Dr. Iyer available for emergency gastro care?",
      questionHindi:
        "क्या डॉ. अय्यर इमरजेंसी गैस्ट्रो केयर प्रदान करते हैं?",
      answer:
        "Yes. Dr. Iyer provides care for gastrointestinal emergencies such as GI bleeding, pancreatitis and food-pipe blockages at Apollo JBP Hospitals.",
      answerHindi:
        "हाँ। डॉ. अय्यर Apollo JBP Hospitals में GI ब्लीडिंग, पैंक्रियाटाइटिस और फूड-पाइप ब्लॉकेज जैसी आपातकालीन पाचन समस्याओं के लिए उपचार प्रदान करते हैं।",
    },
    {
      question:
        "Why is Dr. Arun Iyer considered a gastroenterology specialist in Jabalpur?",
      questionHindi:
        "डॉ. अरुण अय्यर को जबलपुर में गैस्ट्रोएंटरोलॉजी विशेषज्ञ क्यों माना जाता है?",
      answer:
        "Patients consult Dr. Iyer for his advanced gastroenterology training, extensive endoscopy experience, modern diagnostic approach and patient-focused care.",
      answerHindi:
        "मरीज डॉ. अय्यर से उनकी उन्नत गैस्ट्रोएंटरोलॉजी ट्रेनिंग, व्यापक एंडोस्कोपी अनुभव, आधुनिक डायग्नोस्टिक दृष्टिकोण और patient-focused care के लिए परामर्श लेते हैं।",
    },
    {
      question: "How can I consult Dr. Arun Iyer?",
      questionHindi:
        "डॉ. अरुण अय्यर से परामर्श कैसे लिया जा सकता है?",
      answer:
        "You can consult Dr. Arun Iyer at Apollo JBP Hospitals, Jabalpur by filling the appointment form or calling 7566 123666.",
      answerHindi:
        "आप Apollo JBP Hospitals, जबलपुर में डॉ. अरुण अय्यर से परामर्श के लिए अपॉइंटमेंट फॉर्म भर सकते हैं या 7566 123666 पर कॉल कर सकते हैं।",
    },
  ],
},

{
  id: "d-047",
  slug: "dr-ankush-singh-kotwal",
  name: "Dr. Ankush Singh Kotwal",
  designation: "Consultant CTVS Surgeon",
  speciality: "Cardiothoracic & Vascular Surgery",
  specialitySlug: "cardiothoracic-vascular-surgery",
  department: "cardiac",

  image: "/images/doctors/ankushsingh.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/ctvs-cardiothoracic-surgeon-jabalpur/",

  languages: ["Hindi", "English"],

  summary:
    "Consultant CTVS Surgeon specializing in cardiothoracic and vascular surgery, CABG, valve surgery, minimally invasive cardiac procedures, pacemaker implantation and complex thoracic vascular care.",

  about: [
    "Dr. Ankush Singh Kotwal is a Consultant CTVS Surgeon at Apollo JBP Hospitals, specializing in comprehensive cardiac and thoracic surgical care. He manages heart diseases, vascular conditions and complex cardiothoracic surgical cases with a patient-focused approach.",
    "His surgical expertise includes coronary artery bypass grafting, off-pump beating-heart surgery, heart valve repair and replacement, minimally invasive cardiac surgery and complex thoracic vascular procedures.",
    "Dr. Kotwal also performs pacemaker, ICD and conduction system pacing device implantation and works closely with interventional cardiology teams for coronary angiography and angioplasty-related surgical care.",
    "He is committed to maintaining high patient safety standards and successful surgical outcomes, while also contributing to cardiothoracic research, innovation and medical education."
  ],

  qualifications: [
    {
      degree: "MCh CVTS (Cardiac Surgery)",
      institute: "SGPGIMS, Lucknow",
      year: "2021",
    },
    {
      degree: "MBBS",
      institute: "SKIMS, Srinagar",
      year: "",
    },
  ],

  highlights: [
    {
      value: "MCh",
      label: "Cardiac Surgery",
    },
    {
      value: "CABG",
      label: "Cardiac Bypass Surgery",
    },
    {
      value: "MICS",
      label: "Minimally Invasive Cardiac Surgery",
    },
  ],

  expertise: [
    "Cardiothoracic & Vascular Surgery (CTVS)",
    "Coronary Artery Bypass Grafting (CABG)",
    "Off-Pump / Beating Heart Surgery",
    "Heart Valve Repair & Replacement",
    "Minimally Invasive Cardiac Surgery (MICS)",
    "Robotic Cardiac Surgery",
    "Pacemaker & Cardiac Device Implantation",
    "ICD and Conduction System Pacing",
    "Complex Aortic & Thoracic Vascular Repairs",
    "Aortic Aneurysm and Dissection Surgery",
    "Open and Endovascular Thoracic Vascular Procedures",
    "Coronary Angiography & Angioplasty Support",
  ],

  experience:
    "Dr. Ankush Singh Kotwal is a Consultant CTVS Surgeon with expertise in coronary bypass surgery, valve procedures, minimally invasive cardiac surgery, cardiac device implantation and complex thoracic vascular surgery.",

  training: [
    "MCh CVTS (Cardiac Surgery) from SGPGIMS, Lucknow",
    "Advanced training in cardiothoracic and vascular surgery",
    "Specialized experience in minimally invasive cardiac surgery and complex cardiac procedures",
  ],

  research: [
    "Cardiothoracic research and innovation",
    "Teaching and mentoring medical students and residents",
  ],

  publications: [],

  opd: {
    days: [],
    timing: "10:00 AM – 5:00 PM",
  },

  faqs: [
    {
      question: "Who is Dr. Ankush Singh Kotwal at Apollo JBP Hospitals?",
      questionHindi:
        "Apollo JBP Hospitals में डॉ. अंकुश सिंह कोटवाल कौन हैं?",
      answer:
        "Dr. Ankush Singh Kotwal is a Consultant CTVS Surgeon at Apollo JBP Hospitals, specializing in complex heart, lung and thoracic surgeries. He holds an MCh in CVTS from SGPGIMS, Lucknow.",
      answerHindi:
        "डॉ. अंकुश सिंह कोटवाल Apollo JBP Hospitals में Consultant CTVS Surgeon हैं। वे जटिल हृदय, फेफड़ों और छाती की सर्जरी में विशेषज्ञता रखते हैं और उन्होंने SGPGIMS, लखनऊ से MCh CVTS किया है।",
    },
    {
      question:
        "What surgeries does Dr. Ankush Singh Kotwal perform at Apollo JBP Hospitals?",
      questionHindi:
        "डॉ. अंकुश सिंह कोटवाल Apollo JBP Hospitals में कौन-कौन सी सर्जरी करते हैं?",
      answer:
        "He specializes in CABG, heart valve repair and replacement, minimally invasive cardiac surgery, pacemaker and ICD implantation, and complex thoracic vascular repairs.",
      answerHindi:
        "वे CABG, हार्ट वाल्व रिपेयर एवं रिप्लेसमेंट, मिनिमली इनवेसिव कार्डियक सर्जरी, पेसमेकर और ICD इम्प्लांटेशन तथा जटिल थोरैसिक वैस्कुलर सर्जरी में विशेषज्ञता रखते हैं।",
    },
    {
      question: "What is Beating Heart Surgery (Off-Pump CABG)?",
      questionHindi:
        "बीटिंग हार्ट सर्जरी या ऑफ-पंप CABG क्या है?",
      answer:
        "Off-Pump CABG, also called Beating Heart Surgery, is a bypass procedure performed without using a heart-lung machine. Dr. Kotwal offers this surgical approach at Apollo JBP Hospitals.",
      answerHindi:
        "ऑफ-पंप CABG, जिसे बीटिंग हार्ट सर्जरी भी कहा जाता है, ऐसी बाईपास सर्जरी है जिसमें हार्ट-लंग मशीन का उपयोग नहीं किया जाता। डॉ. कोटवाल Apollo JBP Hospitals में यह सर्जिकल विकल्प प्रदान करते हैं।",
    },
    {
      question:
        "Does Apollo JBP Hospitals offer Minimally Invasive Heart Surgery?",
      questionHindi:
        "क्या Apollo JBP Hospitals में मिनिमली इनवेसिव हार्ट सर्जरी की सुविधा है?",
      answer:
        "Yes. Dr. Ankush Singh Kotwal performs Minimally Invasive Cardiac Surgery (MICS), which uses smaller keyhole incisions and may help reduce surgical trauma and recovery time.",
      answerHindi:
        "हाँ। डॉ. अंकुश सिंह कोटवाल Minimally Invasive Cardiac Surgery (MICS) करते हैं, जिसमें छोटे चीरे लगाए जाते हैं और इससे सर्जिकल ट्रॉमा तथा रिकवरी टाइम कम करने में मदद मिल सकती है।",
    },
    {
      question:
        "Can I get pacemaker or ICD implants at Apollo JBP Hospitals?",
      questionHindi:
        "क्या Apollo JBP Hospitals में पेसमेकर या ICD इम्प्लांट कराया जा सकता है?",
      answer:
        "Yes. Dr. Kotwal provides pacemaker, ICD and conduction system pacing device implantation through the Department of Cardiac Sciences.",
      answerHindi:
        "हाँ। डॉ. कोटवाल Department of Cardiac Sciences के अंतर्गत पेसमेकर, ICD और conduction system pacing devices का इम्प्लांटेशन करते हैं।",
    },
    {
      question:
        "Does Dr. Kotwal handle complex aortic aneurysm surgeries?",
      questionHindi:
        "क्या डॉ. कोटवाल जटिल एओर्टिक एन्यूरिज्म की सर्जरी करते हैं?",
      answer:
        "Yes. Dr. Ankush Singh Kotwal performs open and endovascular treatments for aortic aneurysms and thoracic vascular disorders.",
      answerHindi:
        "हाँ। डॉ. अंकुश सिंह कोटवाल एओर्टिक एन्यूरिज्म और थॉरेसिक वैस्कुलर समस्याओं के लिए ओपन तथा एंडोवास्कुलर उपचार करते हैं।",
    },
    {
      question: "Does Apollo JBP Hospitals offer heart valve treatments?",
      questionHindi:
        "क्या Apollo JBP Hospitals में हार्ट वाल्व का उपचार उपलब्ध है?",
      answer:
        "Yes. Dr. Kotwal specializes in heart valve repair and replacement using open as well as minimally invasive surgical approaches.",
      answerHindi:
        "हाँ। डॉ. कोटवाल ओपन और मिनिमली इनवेसिव दोनों सर्जिकल तकनीकों के माध्यम से हार्ट वाल्व रिपेयर और रिप्लेसमेंट में विशेषज्ञता रखते हैं।",
    },
    {
      question:
        "Does Apollo JBP Hospitals support cardiac diagnostics like angiography?",
      questionHindi:
        "क्या Apollo JBP Hospitals में एंजियोग्राफी जैसी कार्डियक डायग्नोस्टिक सेवाएं उपलब्ध हैं?",
      answer:
        "Yes. Dr. Kotwal coordinates closely with interventional cardiology teams for coronary angiography and angioplasty-related care when surgical treatment is required.",
      answerHindi:
        "हाँ। डॉ. कोटवाल coronary angiography और angioplasty से संबंधित उपचार में interventional cardiology टीम के साथ मिलकर कार्य करते हैं, विशेषकर जब सर्जिकल उपचार की आवश्यकता हो।",
    },
    {
      question:
        "Is Dr. Ankush Singh Kotwal involved in research and teaching?",
      questionHindi:
        "क्या डॉ. अंकुश सिंह कोटवाल रिसर्च और मेडिकल शिक्षण से भी जुड़े हैं?",
      answer:
        "Yes. His areas of interest include cardiothoracic research and innovation, as well as teaching and mentoring medical students and residents.",
      answerHindi:
        "हाँ। उनकी रुचि cardiothoracic research और innovation के साथ-साथ medical students और residents की teaching और mentoring में भी है।",
    },
    {
      question:
        "How can I book an appointment with Dr. Ankush Singh Kotwal?",
      questionHindi:
        "डॉ. अंकुश सिंह कोटवाल से अपॉइंटमेंट कैसे बुक करें?",
      answer:
        "Dr. Ankush Singh Kotwal is available at Apollo JBP Hospitals, Cardiac Sciences OPD, from 10 AM to 5 PM. Patients can book an appointment through the hospital appointment form or call 7566123666.",
      answerHindi:
        "डॉ. अंकुश सिंह कोटवाल Apollo JBP Hospitals के Cardiac Sciences OPD में सुबह 10 बजे से शाम 5 बजे तक उपलब्ध हैं। अपॉइंटमेंट के लिए अस्पताल के appointment form का उपयोग करें या 7566123666 पर कॉल करें।",
    },
  ],
},

{
  id: "d-048",
  slug: "dr-shreyas-reddy",
  name: "Dr. Shreyas Reddy",
  designation: "Radiation Oncologist",
  speciality: "Radiation Oncology",
  specialitySlug: "radiation-oncology",
  department: "onco",

  image: "/images/doctors/shreyas.png",

  profileUrl:
    "https://apollojbphospitals.com/doctor/cancer-doctor-in-jabalpur/",

  languages: [
    "Hindi",
    "English",
    "Kannada",
    "Telugu",
    "Malayalam",
    "Tulu",
  ],

  summary:
    "Consultant Radiation Oncologist specializing in advanced radiotherapy, brachytherapy, palliative care and multidisciplinary cancer treatment, with a strong background in clinical research and teaching.",

  about: [
    "Dr. Shreyas Reddy is a Consultant Radiation Oncologist at Apollo JBP Hospitals with a strong academic foundation and extensive clinical experience in radiation oncology. He combines advanced radiotherapy techniques with personalized and compassionate cancer care.",
    "He specializes in modern radiation treatment techniques including 3DCRT, IMRT, IGRT, VMAT, SRS, SBRT and SGRT, along with intracavitary, interstitial, surface mold and intraluminal brachytherapy.",
    "Dr. Reddy has experience in chemotherapy and concurrent chemoradiation, palliative radiotherapy and multidisciplinary cancer treatment. His areas of special interest include head and neck cancers, gynaecological malignancies, breast cancers, brain tumours and gastrointestinal tumours.",
    "Alongside clinical care, he has contributed to clinical trials, research publications, cancer awareness initiatives and undergraduate and postgraduate teaching."
  ],

  qualifications: [
    {
      degree: "MD – Radiation Oncology",
      institute: "Father Muller Medical College Hospital, Mangalore",
      year: "",
    },
    {
      degree: "MBBS",
      institute: "Kasturba Medical College Hospital, Mangalore, Manipal University",
      year: "",
    },
    {
      degree: "Professional Diploma in Clinical Research (PDCR)",
      institute: "",
      year: "",
    },
    {
      degree: "Certificate Course in Essentials of Palliative Care (CCEPC)",
      institute: "",
      year: "",
    },
  ],

  highlights: [
    {
      value: "MD",
      label: "Radiation Oncology",
    },
    {
      value: "4th",
      label: "RGUHS MD Rank",
    },
    {
      value: "SRS / SBRT",
      label: "Advanced Radiotherapy",
    },
  ],

  expertise: [
    "Radiation Oncology",
    "3D Conformal Radiotherapy (3DCRT)",
    "Intensity-Modulated Radiotherapy (IMRT)",
    "Image-Guided Radiotherapy (IGRT)",
    "Volumetric Modulated Arc Therapy (VMAT)",
    "Stereotactic Radiosurgery (SRS)",
    "Stereotactic Body Radiotherapy (SBRT)",
    "Surface-Guided Radiotherapy (SGRT)",
    "Intracavitary Brachytherapy",
    "Interstitial Brachytherapy",
    "Surface Mold Brachytherapy",
    "Intraluminal Brachytherapy",
    "Chemotherapy and Concurrent Chemoradiation",
    "Palliative Radiotherapy",
    "Head and Neck Cancers",
    "Gynaecological Malignancies",
    "Breast Cancer",
    "Brain Tumours",
    "Gastrointestinal (GI) Tumours",
    "Cancer Screening and Awareness",
    "Multidisciplinary Cancer Treatment",
  ],

  experience:
    "Dr. Shreyas Reddy has clinical experience across academic and cancer-care institutions, including Kasturba Medical College Hospital, Medicover Cancer Institute and Balco Medical Center, with expertise in advanced radiotherapy and comprehensive cancer care.",

  experienceDetails: [
    {
      role: "Senior Resident",
      organization: "Kasturba Medical College Hospital, Attavar, Mangalore",
    },
    {
      role: "Assistant Professor",
      organization: "Kasturba Medical College Hospital, Attavar, Mangalore",
    },
    {
      role: "Consultant Radiation Oncologist",
      organization: "Medicover Cancer Institute, Nellore",
    },
    {
      role: "Consultant Radiation Oncologist",
      organization:
        "Balco Medical Center (Vedanta Medical Research Foundation), Naya Raipur",
    },
  ],

  training: [
    "MD training in Radiation Oncology at Father Muller Medical College Hospital, Mangalore",
    "Professional Diploma in Clinical Research (PDCR)",
    "Certificate Course in Essentials of Palliative Care (CCEPC)",
    "Advanced training and clinical experience in modern radiotherapy and brachytherapy techniques",
  ],

  research: [
    "Participated as Sub-Investigator and Co-Investigator in Phase III clinical trials involving Non-Hodgkin Lymphoma, metastatic breast cancer and non-small cell lung cancer.",
    "Research work covering radiotherapy dosimetry, antiemetic regimens and treatment planning techniques.",
    "Contributed to cancer awareness and screening initiatives focused on early detection and preventive care.",
    "Received ICMR Short-Term Studentships during undergraduate studies for research work.",
  ],

  researchDetails: [
    "Authored and co-authored research papers published in peer-reviewed journals including Scientific Reports and Journal of Medical Physics.",
    "Received recognition for research presentations and posters at national and international conferences.",
    "Received Best Poster Award for a comparative study on palliative radiotherapy in bone metastases.",
    "Active participation in clinical research and trials involving lymphoma, metastatic breast cancer and non-small cell lung cancer.",
  ],

  publications: [
    "Research publications in Scientific Reports and Journal of Medical Physics covering radiotherapy dosimetry, treatment planning and related oncology topics.",
    "Multiple peer-reviewed research papers and academic contributions in radiation oncology.",
  ],

  opd: {
    days: [],
    timing: "",
  },

  faqs: [
    {
      question:
        "Who is Dr. Shreyas Reddy and what are his qualifications?",
      questionHindi:
        "डॉ. श्रेयस रेड्डी कौन हैं और उनकी मेडिकल योग्यता क्या है?",
      answer:
        "Dr. Shreyas Reddy is a Radiation Oncologist at Apollo JBP Hospitals, Jabalpur. He holds an MBBS and MD in Radiation Oncology and has experience in advanced radiation techniques and comprehensive cancer care.",
      answerHindi:
        "डॉ. श्रेयस रेड्डी Apollo JBP Hospitals, जबलपुर के Radiation Oncologist हैं। उन्होंने MBBS और Radiation Oncology में MD किया है तथा आधुनिक रेडिएशन तकनीकों और व्यापक कैंसर केयर में अनुभव रखते हैं।",
    },
    {
      question: "What types of cancer does Dr. Reddy treat?",
      questionHindi:
        "डॉ. रेड्डी किन प्रकार के कैंसर का इलाज करते हैं?",
      answer:
        "Dr. Reddy specializes in radiation treatment for head and neck cancers, breast cancer, brain tumours, gynaecological malignancies and gastrointestinal tumours.",
      answerHindi:
        "डॉ. रेड्डी सिर और गर्दन के कैंसर, स्तन कैंसर, ब्रेन ट्यूमर, स्त्री रोग संबंधी कैंसर और गैस्ट्रोइंटेस्टाइनल ट्यूमर के लिए रेडिएशन उपचार में विशेषज्ञता रखते हैं।",
    },
    {
      question: "Which radiotherapy technologies does Dr. Reddy use?",
      questionHindi:
        "डॉ. रेड्डी किन रेडियोथेरेपी तकनीकों का उपयोग करते हैं?",
      answer:
        "Dr. Reddy is experienced in 3DCRT, IMRT, IGRT, VMAT, SRS, SBRT, SGRT and multiple brachytherapy techniques. Treatment is planned according to the patient's cancer type and clinical requirements.",
      answerHindi:
        "डॉ. रेड्डी 3DCRT, IMRT, IGRT, VMAT, SRS, SBRT, SGRT और विभिन्न ब्रैकीथेरेपी तकनीकों में अनुभवी हैं। उपचार की योजना कैंसर के प्रकार और मरीज की clinical requirements के अनुसार बनाई जाती है।",
    },
    {
      question:
        "Does Dr. Reddy provide pain relief and palliative care for cancer patients?",
      questionHindi:
        "क्या डॉ. रेड्डी कैंसर मरीजों के लिए दर्द से राहत और पल्लिएटिव केयर प्रदान करते हैं?",
      answer:
        "Yes. Dr. Reddy has additional training in palliative care and provides palliative radiotherapy and supportive care aimed at symptom relief and quality of life for appropriate patients.",
      answerHindi:
        "हाँ। डॉ. रेड्डी ने palliative care में अतिरिक्त प्रशिक्षण लिया है और उपयुक्त मरीजों के लिए लक्षणों से राहत, palliative radiotherapy तथा quality of life को बेहतर बनाने वाली supportive care प्रदान करते हैं।",
    },
    {
      question:
        "Is radiation therapy safe and effective under Dr. Reddy's care?",
      questionHindi:
        "क्या डॉ. रेड्डी की देखरेख में रेडिएशन थेरेपी सुरक्षित और प्रभावी है?",
      answer:
        "Dr. Reddy uses advanced radiation techniques and individualized treatment planning to deliver precise radiation while aiming to protect surrounding healthy tissues.",
      answerHindi:
        "डॉ. रेड्डी advanced radiation techniques और individualized treatment planning का उपयोग करते हैं ताकि रेडिएशन को सटीक रूप से दिया जा सके और आसपास के स्वस्थ ऊतकों की सुरक्षा का ध्यान रखा जा सके।",
    },
    {
      question:
        "Why choose Dr. Shreyas Reddy as a cancer doctor in Jabalpur?",
      questionHindi:
        "जबलपुर में कैंसर डॉक्टर के रूप में डॉ. श्रेयस रेड्डी को क्यों चुनें?",
      answer:
        "Patients may consult Dr. Reddy for his academic background, advanced radiotherapy expertise, clinical research experience, multidisciplinary approach and compassionate patient communication.",
      answerHindi:
        "मरीज डॉ. रेड्डी से उनकी मजबूत academic background, advanced radiotherapy expertise, clinical research experience, multidisciplinary approach और compassionate patient communication के लिए परामर्श ले सकते हैं।",
    },
    {
      question: "How can I consult Dr. Shreyas Reddy?",
      questionHindi:
        "डॉ. श्रेयस रेड्डी से परामर्श कैसे लिया जा सकता है?",
      answer:
        "To consult Dr. Shreyas Reddy at Apollo JBP Hospitals, Jabalpur, patients can use the hospital appointment form or call 7566123666.",
      answerHindi:
        "Apollo JBP Hospitals, जबलपुर में डॉ. श्रेयस रेड्डी से परामर्श के लिए अस्पताल के appointment form का उपयोग किया जा सकता है या 7566123666 पर कॉल किया जा सकता है।",
    },
  ],
},

{
  id: "d-049",
  slug: "dr-k-siva-sree",
  name: "Dr. K. Siva Sree",
  designation: "Medical Oncologist",
  speciality: "Medical Oncology",
  specialitySlug: "medical-oncology",
  department: "onco",

  image: "/images/doctors/siva-sree.webp",

  profileUrl:
    "https://apollojbphospitals.com/doctor/cancer-specialist-in-jabalpur/",

  languages: ["English", "Tamil", "Hindi"],

  summary:
    "Medical Oncologist specializing in solid and hematological malignancies, chemotherapy, targeted therapy, immunotherapy, precision oncology and stem cell transplantation, with a strong background in research and medical education.",

  about: [
    "Dr. K. Siva Sree is a Medical Oncologist at Apollo JBP Hospitals with extensive experience in clinical oncology, patient care, research and medical education. She provides personalized cancer treatment using evidence-based medical oncology approaches.",
    "Her clinical expertise covers lung cancer, breast oncology, gynaecological cancers, haemato-oncology, stem cell transplantation, precision oncology, immuno-oncology, geriatric oncology, adolescent and young adult oncology, and palliative care.",
    "She has experience with chemotherapy, targeted therapy, immunotherapy, genomic profiling and biomarker-driven treatment strategies, along with autologous and allogeneic stem cell transplantation and supportive care.",
    "Alongside clinical practice, Dr. Siva Sree is actively involved in clinical research, trials, academic teaching, scientific publications and conference presentations, with a focus on advancing cancer care and improving access to specialized oncology services."
  ],

  qualifications: [
    {
      degree: "DM – Medical Oncology",
      institute:
        "Cancer Institute (WIA), Adyar, Chennai, The Tamil Nadu Dr. MGR Medical University",
      year: "",
    },
    {
      degree: "MD – General Medicine",
      institute: "Kasturba Medical College, Mangalore, MAHE",
      year: "",
    },
    {
      degree: "MBBS",
      institute:
        "Government Medical College, Anantapur, Dr. NTR University of Health Sciences",
      year: "",
    },
    {
      degree: "Certification in Medical Oncology",
      institute: "European Society for Medical Oncology (ESMO)",
      year: "",
    },
  ],

  highlights: [
    {
      value: "DM",
      label: "Medical Oncology",
    },
    {
      value: "Precision",
      label: "Cancer Treatment",
    },
    {
      value: "Stem Cell",
      label: "Transplantation",
    },
  ],

  expertise: [
    "Medical Oncology",
    "Lung Cancer",
    "Breast Oncology",
    "Gynaecological Oncology",
    "Haemato-Oncology",
    "Leukemias, Lymphomas and Multiple Myeloma",
    "Stem Cell Transplantation",
    "Autologous and Allogeneic Transplantation",
    "Precision Oncology",
    "Genomic Profiling and Biomarker-Driven Treatment",
    "Immuno-Oncology",
    "Checkpoint Inhibitors and Combination Immunotherapy",
    "CAR T-cell Strategies",
    "Chemotherapy",
    "Targeted Therapy",
    "Geriatric Oncology",
    "Adolescent and Young Adult (AYA) Oncology",
    "Palliative Care",
    "Cancer Symptom Management",
    "Multimodal Cancer Treatment",
  ],

  experience:
    "Dr. K. Siva Sree has extensive clinical and academic experience in medical oncology, including roles at Kasturba Medical College, CARE Hospitals, Malla Reddy Hospitals and Medical College, Cancer Institute (WIA), and as an Associate Professor in Medical Oncology.",

  experienceDetails: [
    {
      role: "Junior Resident – Internal Medicine",
      organization: "Kasturba Medical College, Mangalore",
    },
    {
      role: "Senior Resident – Internal Medicine & Critical Care",
      organization: "CARE Hospitals, Hyderabad",
    },
    {
      role: "Assistant Professor – Internal Medicine",
      organization: "Malla Reddy Hospitals and Medical College, Hyderabad",
    },
    {
      role: "Senior Resident – Medical Oncology",
      organization: "Cancer Institute (WIA), Chennai",
    },
    {
      role: "Assistant Professor & Daycare In-Charge – Medical Oncology",
      organization: "Cancer Institute (WIA), Chennai",
    },
    {
      role: "Associate Professor – Medical Oncology",
      organization: "Present role",
    },
  ],

  training: [
    "DM training in Medical Oncology at Cancer Institute (WIA), Adyar, Chennai",
    "Certification in Medical Oncology from European Society for Medical Oncology (ESMO)",
    "Advanced clinical experience in chemotherapy, targeted therapy and immunotherapy",
    "Training and experience in autologous and allogeneic stem cell transplantation",
    "Academic teaching and training of undergraduate and postgraduate medical professionals",
  ],

  research: [
    "Clinical trials involving novel therapies for lung malignancies and head and neck cancers.",
    "Research in Lung Cancer, Breast Oncology, Gynaecological Oncology and Haemato-Oncology.",
    "Research in Stem Cell Transplantation, Precision Oncology and Immuno-Oncology.",
    "Research interests in Geriatric Oncology, Adolescent and Young Adult Oncology, Palliative Care and Translational Research.",
    "Principal Investigator for a pilot trial studying mirtazapine for cancer-associated anorexia-cachexia in advanced head and neck cancer.",
    "Co-Investigator for clinical trials under organizations including Biotechnology Industry Research Assistance Council (BIRAC-CTN).",
  ],

  researchDetails: [
    "Contributed to peer-reviewed oncology publications in journals including Cancer Research, Statistics, and Treatment, South Asian Journal of Cancer, and Indian Journal of Medical and Paediatric Oncology.",
    "Presented research and clinical work at ICON, ICKSH, LYMPHOCON and other academic forums.",
    "Conference presentations have covered pediatric chronic myeloid leukemia, T-cell lymphomas and breast cancer outcomes.",
    "Delivered invited lectures on current concepts in lung malignancies and management of gestational trophoblastic neoplasia.",
    "Received travel grants and quiz competition prizes at conferences including TYACON and LYMPHOCON.",
    "Received recognition from the Government of Tamil Nadu for contribution to quality health services.",
  ],

  publications: [
    "Peer-reviewed publications in Cancer Research, Statistics, and Treatment.",
    "Peer-reviewed publications in South Asian Journal of Cancer.",
    "Peer-reviewed publications in Indian Journal of Medical and Paediatric Oncology.",
  ],

  opd: {
    days: [],
    timing: "",
  },

  faqs: [
    {
      question:
        "Who is Dr. K. Siva Sree and what are her qualifications?",
      questionHindi:
        "डॉ. के. शिवा श्री कौन हैं और उनकी मेडिकल योग्यता क्या है?",
      answer:
        "Dr. K. Siva Sree is a Medical Oncologist at Apollo JBP Hospitals, Jabalpur. She holds MBBS, MD in General Medicine and DM in Medical Oncology from Cancer Institute (WIA), Chennai.",
      answerHindi:
        "डॉ. के. शिवा श्री Apollo JBP Hospitals, जबलपुर की Medical Oncologist हैं। उन्होंने MBBS, MD (General Medicine) और Cancer Institute (WIA), चेन्नई से DM (Medical Oncology) किया है।",
    },
    {
      question:
        "What types of cancers does Dr. Siva Sree treat?",
      questionHindi:
        "डॉ. सिवा श्री किन प्रकार के कैंसर का इलाज करती हैं?",
      answer:
        "Dr. Siva Sree treats breast, lung, gynaecological, gastrointestinal and blood cancers using chemotherapy, targeted therapy, immunotherapy and other medical oncology approaches.",
      answerHindi:
        "डॉ. सिवा श्री स्तन, फेफड़े, स्त्री रोग, गैस्ट्रोइंटेस्टाइनल और रक्त संबंधी कैंसर का इलाज chemotherapy, targeted therapy, immunotherapy और अन्य medical oncology उपचारों से करती हैं।",
    },
    {
      question: "Does she offer personalized chemotherapy treatment?",
      questionHindi:
        "क्या डॉ. सिवा श्री व्यक्तिगत कीमोथेरेपी उपचार प्रदान करती हैं?",
      answer:
        "Yes. Dr. Siva Sree develops personalized chemotherapy and systemic treatment plans based on the patient's condition, cancer stage and relevant molecular or clinical information.",
      answerHindi:
        "हाँ। डॉ. सिवा श्री मरीज की स्थिति, कैंसर के स्टेज और उपलब्ध molecular या clinical information के आधार पर व्यक्तिगत chemotherapy और systemic treatment plans तैयार करती हैं।",
    },
    {
      question: "What advanced cancer therapies does she provide?",
      questionHindi:
        "डॉ. सिवा श्री कौन-सी आधुनिक कैंसर थेरापी प्रदान करती हैं?",
      answer:
        "Her areas of expertise include precision oncology, immunotherapy, targeted therapy, genomic profiling, biomarker-driven treatment and stem cell transplantation.",
      answerHindi:
        "उनकी विशेषज्ञता में precision oncology, immunotherapy, targeted therapy, genomic profiling, biomarker-driven treatment और stem cell transplantation शामिल हैं।",
    },
    {
      question:
        "Is Dr. Siva Sree involved in cancer research and clinical trials?",
      questionHindi:
        "क्या डॉ. सिवा श्री कैंसर रिसर्च और क्लीनिकल ट्रायल से जुड़ी हैं?",
      answer:
        "Yes. Dr. Siva Sree has participated as a Co-Investigator and Principal Investigator in clinical trials and is actively involved in oncology research, academic presentations and publications.",
      answerHindi:
        "हाँ। डॉ. सिवा श्री ने Co-Investigator और Principal Investigator के रूप में clinical trials में भाग लिया है और oncology research, academic presentations तथा publications में सक्रिय रूप से शामिल हैं।",
    },
    {
      question:
        "Why choose Dr. K. Siva Sree for cancer treatment in Jabalpur?",
      questionHindi:
        "जबलपुर में कैंसर उपचार के लिए डॉ. के. सिवा श्री को क्यों चुनें?",
      answer:
        "Her expertise across solid and hematological malignancies, personalized treatment planning, advanced systemic therapies, research and patient-focused care makes her an experienced medical oncology specialist.",
      answerHindi:
        "Solid और hematological malignancies, personalized treatment planning, advanced systemic therapies, research और patient-focused care में उनकी विशेषज्ञता उन्हें एक अनुभवी medical oncology specialist बनाती है।",
    },
    {
      question: "How can I consult Dr. K. Siva Sree?",
      questionHindi:
        "डॉ. के. सिवा श्री से परामर्श कैसे लिया जा सकता है?",
      answer:
        "To consult Dr. K. Siva Sree at Apollo JBP Hospitals, patients can use the hospital's online appointment form or call 7566123666.",
      answerHindi:
        "Apollo JBP Hospitals में डॉ. के. सिवा श्री से परामर्श के लिए अस्पताल के online appointment form का उपयोग किया जा सकता है या 7566123666 पर कॉल किया जा सकता है।",
    },
  ],
},
];

export const steps = [
  { title: "Find your specialist", text: "Browse by Centre of Excellence or search by name and speciality." },
  { title: "Request an appointment", text: "Tap Book Appointment on the doctor's card and share your details." },
  { title: "Get confirmation", text: "Our team contacts you to confirm the slot that suits you." },
  { title: "Visit & follow-up", text: "Meet your doctor at Apollo JBP Hospitals and plan your care journey." },
];

export const faqs = [
  { q: "How do I book an appointment with a doctor?", a: "Choose a doctor from the list and use the Book Appointment button. Our team will contact you to confirm availability." },
  { q: "Can I consult a doctor from any department?", a: "Yes. Use the Centre of Excellence filters to find the right specialist, or search by name or speciality." },
  { q: "What should I carry for my first visit?", a: "Carry a photo ID, previous medical records, prescriptions and any recent reports related to your concern." },
  { q: "How do I know a doctor's availability?", a: "OPD days and timings appear on the doctor's detail panel when available. Otherwise our team will confirm the slot for you." },
];

/* ---- normalizer: API ka shape kuch bhi ho, yahan map kar do ---- */
export function normalizeDoctor(r = {}) {
  return {
    id: String(r.id ?? r.slug ?? r.name),
    slug: r.slug ?? String(r.name || "").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: r.name ?? r.full_name ?? "",
    designation: r.designation ?? "",
    speciality: r.speciality ?? r.specialty ?? "",
    department: r.department ?? r.centre ?? "",
    qualification: r.qualification ?? "",
    experience: r.experience ?? "",
    expertise: r.expertise ?? [],
    languages: r.languages ?? [],
    bio: r.bio ?? "",
    image: r.image ?? r.photo ?? "",
    profileUrl: r.profileUrl ?? r.profile_url ?? "",
    opd: { days: r.opd?.days ?? [], timing: r.opd?.timing ?? "" },
  };
}

export async function getDoctorsPageData() {
  // ---- BACKEND AANE PAR: ----
  // const res = await fetch(`${process.env.API_URL}/doctors`, { next: { revalidate: 300 } });
  // const raw = await res.json();
  // const doctors = raw.map(normalizeDoctor);
  const doctors = rawDoctors.map(normalizeDoctor);

  return {
    hospital,
    doctors,
    departments: departments.map((d) => ({
      ...d,
      count: doctors.filter((x) => x.department === d.slug).length,
    })),
    steps,
    faqs,
  };
}
