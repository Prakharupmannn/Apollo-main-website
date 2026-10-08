
export const centresOfExcellence = [
  {
  id: "01",
  slug: "gastro",
  shortName: "Gastro",
  title: "Gastro Sciences",
  eyebrow: "Digestive Health",
  subtitle: "Comprehensive care for digestive health",

  description:
    "Specialist-led care for digestive, liver and gastrointestinal conditions, supported by advanced diagnostics and modern treatment pathways.",

  descriptionn:
    "Comprehensive care for digestive, liver, pancreatic and gastrointestinal conditions with advanced diagnostic, endoscopic and surgical treatment options.",

  image: "/images/centres/gastro.png",

  capabilities: [
    "Gastroenterology",
    "Hepatology",
    "Advanced Endoscopy",
  ],

  conditions: [
    {
      category: "Esophageal Disorders",
      items: [
        "Acid Reflux (GERD)",
        "Esophagitis",
        "Barrett's Esophagus",
        "Swallowing Disorders",
      ],
    },
    {
      category: "Stomach & Intestinal Disorders",
      items: [
        "Peptic Ulcers",
        "Gastritis",
        "Irritable Bowel Syndrome (IBS)",
        "Crohn's Disease",
        "Ulcerative Colitis",
        "Celiac Disease",
      ],
    },
    {
      category: "Liver & Pancreatic Disorders",
      items: [
        "Fatty Liver Disease",
        "Hepatitis",
        "Liver Cirrhosis",
        "Liver Failure",
        "Pancreatitis",
        "Gallbladder & Biliary Diseases",
      ],
    },
    {
      category: "Colorectal & Anal Disorders",
      items: [
        "Hemorrhoids (Piles)",
        "Anal Fissures & Fistulas",
        "Colon Polyps",
        "Colorectal Cancer",
        "Diverticulitis",
      ],
    },
  ],

  diagnostics: [
    {
      name: "Colonoscopy",
      description:
        "Helps detect colorectal cancer, polyps and inflammatory bowel disease.",
    },
    {
      name: "Upper GI Endoscopy",
      description:
        "Minimally invasive examination of the upper gastrointestinal tract.",
    },
    {
      name: "Capsule Endoscopy",
      description:
        "Provides detailed visualization of areas of the small intestine that may be difficult to examine with conventional endoscopy.",
    },
    {
      name: "Liver Biopsy",
      description:
        "Helps evaluate liver tissue and identify underlying liver conditions.",
    },
    {
      name: "ERCP",
      description:
        "Used to diagnose and treat bile duct and pancreatic disorders.",
    },
    {
      name: "Endoscopic Narrow Band Imaging",
      description:
        "Advanced endoscopic imaging to help evaluate gastrointestinal abnormalities.",
    },
    {
      name: "FibroScan / Liver Elastography",
      description:
        "Non-invasive assessment of liver stiffness and liver health.",
    },
  ],

  treatments: [
    {
      category: "Medical Gastroenterology",
      items: [
        "Medical Management of Acid Reflux & Ulcers",
        "Inflammatory Bowel Disease Management",
        "Hepatitis Treatment",
        "Dietary & Nutritional Counseling",
      ],
    },
    {
      category: "Endoscopic Procedures",
      items: [
        "Endoscopic Polyp Removal",
        "Endoscopic Variceal Ligation",
        "Endoscopic Dilatation",
        "ERCP",
        "Endoscopic Hemostasis",
      ],
    },
    {
      category: "Surgical Gastroenterology",
      items: [
        "Complex GI Surgery",
        "Laparoscopic Cholecystectomy",
        "Colorectal Surgery",
        "Hernia Repair",
        "Liver Surgery",
      ],
    },
  ],

  specializedCare: [
    "Advanced Endoscopy",
    "ERCP",
    "3rd Space Peroral Endoscopic Myotomy",
    "Minimally Invasive GI Surgery",
    "Hepatobiliary Care",
    "Liver Disease Management",
  ],

  preventiveCare: [
    "Routine Gastrointestinal Screening",
    "Colorectal Cancer Screening",
    "Hepatitis Vaccination & Liver Health Monitoring",
    "Dietary & Nutritional Guidance",
    "Weight Management & Lifestyle Counselling",
  ],

  highlights: [
    "Multidisciplinary Gastrointestinal Care",
    "Advanced Diagnostic & Therapeutic Endoscopy",
    "Medical & Surgical Gastroenterology",
    "Liver & Hepatobiliary Care",
    "Personalized Treatment Planning",
  ],

  doctors: [
    {
      slug: "dr-arun-iyer",
      name: "Dr. Arun Iyer",
      designation: "DM Gastroenterology",
      speciality: "Gastroenterology",
      qualification: "MBBS, MD (General Medicine), DM (Gastroenterology)",
      experience: "", // confirm karke bharna, e.g. "12+ Years"
      expertise: ["GERD & Acidity", "Liver Disorders", "Pancreatitis"],
      image: "/images/doctors/arun.webp",
    },
    {
      slug: "dr-ganesh-gorthi",
      name: "Dr. Ganesh Gorthi",
      designation: "Senior Minimal Access Surgeon",
      speciality: "Gastro Surgery",
      qualification: "MBBS, MS (Surgery), MCh (Surgical Gastroenterology)",
      experience: "12+ Years",
      expertise: ["Minimal Access Surgery", "Bariatric Surgery", "GI Surgery"],
      image: "/images/doctors/ganesh.webp",
    },
    {
      slug: "dr-jayaram-k",
      name: "Dr. Jayaram K",
      designation: "Senior Consultant Medical Gastroenterologist & Hepatologist",
      speciality: "Gastroenterology & Hepatology",
      qualification: "", // hospital se confirm karke bharna
      experience: "",
      expertise: ["Liver Care", "Digestive Disorders"],
      image: "/images/doctors/jayaram.jpeg",
    },
    {
      slug: "dr-virendra-bhad",
      name: "Dr. Virendra Bhad",
      designation: "Consultant Medical Gastroenterologist, Hepatologist & Advanced Endoscopy Specialist",
      speciality: "Gastroenterology & Endoscopy",
      qualification: "", // hospital se confirm karke bharna
      experience: "",
      expertise: ["Advanced Endoscopy", "Liver Care"],
      image: "/images/doctors/virendra.jpeg",
    },
    // Naya doctor yahan add karo:
    // {
    //   slug: "dr-name-surname",
    //   name: "Dr. Name Surname",
    //   designation: "Consultant – Surgical Gastroenterology",
    //   speciality: "Surgical Gastroenterology",
    //   qualification: "MBBS, MS, MCh",
    //   experience: "10+ Years",
    //   expertise: ["Laparoscopy", "HPB Surgery"],
    //   image: "/images/doctors/dr-name-surname.jpg",
    // },
  ],

  stats: [
    {
      value: "360°",
      label: "Digestive Care",
    },
    {
      value: "24/7",
      label: "Clinical Support",
    },
  ],

  color: "#0B91B8",
},

  {
  id: "02",
  slug: "onco",
  shortName: "Onco",
  title: "Onco Sciences",
  eyebrow: "Cancer Care",
  subtitle: "Comprehensive cancer care with advanced technology and expert oncology specialists",

  description:
    "Comprehensive cancer care delivered through a multidisciplinary team of medical, surgical and radiation oncology specialists, supported by advanced diagnostics and precision treatment technologies.",

  descriptionn:
    "Advanced cancer care covering screening, diagnosis, medical oncology, surgical oncology, radiation oncology, targeted therapy, immunotherapy, palliative care and rehabilitation, supported by advanced PET-CT and LINAC technology.",

  image: "/images/centres/onco.png",

  capabilities: [
    "Medical Oncology",
    "Surgical Oncology",
    "Radiation Oncology",
    "Haemato-Oncology",
    "Bone Marrow Transplantation",
    "Advanced Cancer Diagnostics",
  ],

  conditions: [
    {
      category: "Breast & Women's Cancers",
      items: [
        "Breast Cancer",
        "Gynecological Cancers",
      ],
    },
    {
      category: "Head, Neck & Thoracic Cancers",
      items: [
        "Lung Cancer",
        "Head & Neck Cancers",
      ],
    },
    {
      category: "Gastrointestinal & Abdominal Cancers",
      items: [
        "Colorectal Cancer",
        "Gastrointestinal Cancers",
      ],
    },
    {
      category: "Urological & Prostate Cancers",
      items: [
        "Prostate Cancer",
      ],
    },
    {
      category: "Blood & Hematological Cancers",
      items: [
        "Leukemia",
        "Lymphoma",
        "Multiple Myeloma",
        "Blood Cancers",
      ],
    },
    {
      category: "Other Cancers",
      items: [
        "Various Solid Tumors",
        "Pediatric Cancers",
      ],
    },
  ],

  diagnostics: [
    {
      name: "PET-CT Scan",
      description:
        "Advanced imaging used for cancer detection, staging, treatment planning and monitoring response to therapy.",
    },
    {
      name: "Cancer Screening & Early Detection",
      description:
        "Screening and diagnostic evaluation aimed at identifying cancer at an early stage.",
    },
    {
      name: "CT Imaging",
      description:
        "Advanced CT imaging support for evaluation, staging and treatment planning.",
    },
    {
      name: "Radiation Treatment Planning",
      description:
        "Advanced imaging and planning techniques used to precisely target cancer cells while minimizing exposure to surrounding healthy tissues.",
    },
  ],

  treatments: [
    {
      category: "Medical Oncology",
      items: [
        "Chemotherapy",
        "Immunotherapy",
        "Targeted Therapy",
      ],
    },
    {
      category: "Radiation Oncology",
      items: [
        "3D Conformal Radiation Therapy (3DCRT)",
        "Intensity-Modulated Radiation Therapy (IMRT)",
        "Rapid Arc / VMAT",
        "Image-Guided Radiation Therapy (IGRT)",
        "Stereotactic Radiosurgery (SRS)",
        "Stereotactic Body Radiation Therapy (SBRT / SABR)",
        "Respiratory Gating",
        "Deep Inspiration Breath Hold (DIBH)",
      ],
    },
    {
      category: "Surgical Oncology",
      items: [
        "Advanced Cancer Surgery",
        "Minimally Invasive Cancer Surgery",
        "Robotic Cancer Surgery",
      ],
    },
    {
      category: "Haemato-Oncology",
      items: [
        "Blood Cancer Treatment",
        "Bone Marrow Transplantation",
        "Stem Cell Transplantation",
      ],
    },
    {
      category: "Supportive Cancer Care",
      items: [
        "Palliative Care",
        "Nutritional Support",
        "Psychological Support",
        "Cancer Rehabilitation",
      ],
    },
  ],

  specializedCare: [
    "Advanced PET-CT Imaging",
    "Varian VitalBeam Advance LINAC Radiotherapy",
    "Precision Radiation Therapy",
    "Medical Oncology",
    "Surgical Oncology",
    "Haemato-Oncology",
    "Bone Marrow & Stem Cell Transplantation",
    "Immunotherapy",
    "Targeted Cancer Therapy",
    "Multidisciplinary Cancer Care",
  ],

  preventiveCare: [
    "Cancer Screening & Early Detection",
    "Routine Cancer Risk Assessment",
    "Family History-Based Cancer Screening",
    "Lifestyle & Nutrition Guidance",
    "Tobacco & Alcohol Risk Counselling",
    "Regular Follow-up & Surveillance",
  ],

  highlights: [
    "Region's Advanced Varian VitalBeam Advance LINAC",
    "Region's 1st PET-CT Scan on Discovery IQ Platform",
    "Multidisciplinary Oncology Care",
    "Medical, Surgical & Radiation Oncology",
    "Advanced Precision Radiation Therapy",
    "Chemotherapy, Immunotherapy & Targeted Therapy",
    "Haemato-Oncology & Bone Marrow Transplant Care",
    "Patient-Centric Cancer Treatment",
  ],

  doctors: [
    {
      slug: "dr-k-siva-sree",
      name: "Dr. K. Siva Sree",
      designation: "Medical Oncologist",
      speciality: "Medical Oncology",
      qualification:
        "MBBS, MD (General Medicine), DM (Medical Oncology), ESMO Certification in Medical Oncology",
      experience: "",
      expertise: [
        "Breast Cancer",
        "Lung Cancer",
        "Gynaecological Oncology",
        "Gastrointestinal Cancers",
        "Haemato-Oncology",
        "Stem Cell Transplantation",
        "Precision Oncology",
        "Immuno-Oncology",
        "Geriatric & AYA Oncology",
        "Palliative Care",
      ],
      image: "/images/doctors/siva-sree.webp",
    },

    {
      slug: "dr-shreyas-reddy",
      name: "Dr. Shreyas Reddy",
      designation: "Consultant Radiation Oncologist",
      speciality: "Radiation Oncology",
      qualification: "MD (Radiation Oncology), PDCR, CCEPC",
      experience: "",
      expertise: [
        "3DCRT",
        "IMRT",
        "IGRT",
        "VMAT",
        "SRS",
        "SBRT",
        "Brachytherapy",
        "Precision Radiation Therapy",
      ],
      image: "/images/doctors/shreyas.png",
    },

    {
      slug: "dr-p-karunakar-reddy",
      name: "Dr. P. Karunakar Reddy",
      designation: "Consultant Surgical Oncologist",
      speciality: "Surgical Oncology",
      qualification: "",
      experience: "",
      expertise: [
        "Surgical Oncology",
        "Cancer Surgery",
        "Minimally Invasive Cancer Surgery",
        "Advanced Surgical Oncology",
      ],
      image: "/images/doctors/karunakarreddy.png",
    },

    {
      slug: "dr-biswa-prakash-patri",
      name: "Dr. Biswa Prakash Patri",
      designation:
        "Clinical Haematologist, Haemato-Oncologist & Bone Marrow Transplant Specialist",
      speciality: "Haematology & Haemato-Oncology",
      qualification: "",
      experience: "",
      expertise: [
        "Blood Disorders",
        "Blood Cancer",
        "Haemato-Oncology",
        "Bone Marrow Transplantation",
        "Pediatric Hematology",
      ],
      image: "/images/doctors/biswa.webp",
    },
  ],

  stats: [
    {
      value: "24/7",
      label: "Cancer Care Support",
    },
    {
      value: "360°",
      label: "Comprehensive Cancer Care",
    },
    {
      value: "1st",
      label: "PET-CT in the Region",
    },
    {
      value: "LINAC",
      label: "Advanced Radiation Therapy",
    },
  ],

  color: "#C23B63",
},
  {
  id: "03",
  slug: "cardiac",
  shortName: "Cardiac",
  title: "Cardiac Sciences",
  eyebrow: "Heart Care",
  subtitle: "Advanced heart care for every beat of life",

  description:
    "At Apollo Hospitals, the Best Heart Hospital in Jabalpur, our expert Heart Specialists in Jabalpur provide advanced diagnostics, cutting-edge treatments, and compassionate cardiac care.",

  descriptionn:
    "Comprehensive cardiac care combining advanced diagnostics, interventional cardiology, cardiac surgery, vascular surgery, pediatric cardiology and preventive heart care.",

  image: "/images/centres/cardiac.jpg",

  capabilities: [
    "Interventional Cardiology",
    "Cardiac Surgery",
    "Non-Invasive Cardiology",
    "Advanced Cardiac Imaging",
    "Cardiac Critical Care",
    "Preventive Cardiology",
    "Pediatric Cardiology",
    "Vascular Surgery",
  ],

  conditions: [
    {
      category: "Coronary Artery Disease",
      items: [
        "Coronary Artery Disease (CAD)",
        "Angina / Chest Pain",
        "Heart Attack (Myocardial Infarction)",
        "Blocked Heart Arteries",
      ],
    },
    {
      category: "Heart Failure & Cardiomyopathy",
      items: [
        "Heart Failure",
        "Congestive Heart Failure",
        "Dilated Cardiomyopathy",
        "Hypertrophic Cardiomyopathy",
      ],
    },
    {
      category: "Heart Rhythm Disorders",
      items: [
        "Arrhythmias",
        "Irregular Heartbeat",
      ],
    },
    {
      category: "Valvular & Structural Heart Disease",
      items: [
        "Valvular Heart Disease",
        "Congenital Heart Defects",
        "Aortic Aneurysm",
      ],
    },
    {
      category: "Vascular Conditions",
      items: [
        "Peripheral Artery Disease (PAD)",
        "Carotid Artery Disease",
        "Varicose Veins",
        "Aortic Disease",
      ],
    },
    {
      category: "Pediatric Heart Conditions",
      items: [
        "Congenital Heart Defects",
        "Atrial Septal Defect (ASD)",
        "Ventricular Septal Defect (VSD)",
        "Complex Congenital Heart Disease",
      ],
    },
  ],

  diagnostics: [
    {
      name: "Electrocardiogram (ECG)",
      description:
        "A diagnostic test used to evaluate the heart's electrical activity and detect irregular heart rhythms.",
    },
    {
      name: "Echocardiogram",
      description:
        "Ultrasound imaging of the heart used to assess heart structure and function.",
    },
    {
      name: "Stress Test",
      description:
        "A treadmill-based test used to evaluate how the heart performs during physical exertion.",
    },
    {
      name: "Holter Monitoring",
      description:
        "Portable continuous heart rhythm monitoring typically performed over 24–48 hours.",
    },
    {
      name: "Cardiac CT & MRI",
      description:
        "Advanced imaging techniques used to obtain detailed views of the heart and blood vessels.",
    },
    {
      name: "Coronary Angiography",
      description:
        "Cardiac imaging used to visualize the coronary arteries supplying blood to the heart muscle.",
    },
    {
      name: "Optical Coherence Tomography (OCT)",
      description:
        "High-resolution intravascular imaging used to evaluate coronary arteries.",
    },
    {
      name: "Intravascular Ultrasound (IVUS)",
      description:
        "Intravascular imaging used to assess the structure and condition of coronary arteries.",
    },
    {
      name: "Electrophysiology (EP) Study",
      description:
        "A specialized procedure used to identify the cause of abnormal heart rhythms and arrhythmias.",
    },
  ],

  treatments: [
    {
      category: "Interventional Cardiology",
      items: [
        "Angioplasty",
        "Coronary Stent Placement",
        "Rotablation",
        "Pacemaker Implantation",
        "Valve Replacement & Repair",
        "TAVR",
        "Cardiac Catheterization",
        "Assist Device Implantation",
      ],
    },
    {
      category: "Adult Cardiac Surgery",
      items: [
        "Coronary Artery Bypass Grafting (CABG)",
        "Valve Replacement",
        "ASD Repair",
        "Aortic Surgeries",
      ],
    },
    {
      category: "Vascular Surgery",
      items: [
        "Endovenous Laser Therapy",
        "Carotid Endarterectomy",
      ],
    },
    {
      category: "Pediatric Cardiology",
      items: [
        "Balloon Angioplasty",
        "ASD Device Closure",
        "VSD Device Closure",
      ],
    },
    {
      category: "Pediatric Cardiac Surgery",
      items: [
        "Valve Replacement",
        "Fontan Procedure",
      ],
    },
  ],

  specializedCare: [
    "Advanced Philips Azurion M12 Cath Lab",
    "Cardiac Catheterization",
    "Complex Interventional Cardiology",
    "TAVR",
    "Assist Device Implantation",
    "Advanced Cardiac Imaging",
    "Adult Cardiac Surgery",
    "Pediatric Cardiology",
    "Pediatric Cardiac Surgery",
    "Vascular Surgery",
    "ICCU / Intensive Cardiac Care",
  ],

  preventiveCare: [
    "Cardiovascular Risk Assessment",
    "Blood Pressure Monitoring",
    "Cholesterol Management",
    "Diabetes-Related Cardiac Risk Assessment",
    "Lifestyle Counselling",
    "Dietary Guidance",
    "Exercise Guidance",
    "Stress Management",
    "Smoking Cessation Guidance",
    "Regular Heart Health Screening",
  ],

  highlights: [
    "Advanced Philips Azurion M12 Cath Lab",
    "Experienced Interventional Cardiologists",
    "Dedicated Intensive Cardiac Care Unit",
    "Advanced Non-Invasive Cardiac Diagnostics",
    "Adult & Pediatric Cardiac Care",
    "Complex Interventional Procedures",
    "Cardiac Surgery & Valve Replacement",
    "Vascular Surgery",
    "TAVR & Advanced Cardiac Interventions",
    "Personalized Heart Care",
  ],

  doctors: [
    {
      slug: "dr-gunjan-ghodeshwar",
      name: "Dr. Gunjan Ghodeshwar",
      designation: "Senior Consultant & Interventional Cardiologist",
      speciality: "Interventional Cardiology",
      qualification: "",
      experience: "",
      expertise: [
        "Interventional Cardiology",
        "Coronary Interventions",
        "Cardiac Catheterization",
      ],
      image: "/images/doctors/gunjan-ghodeshwar.webp",
    },

    {
      slug: "dr-qayoom-yousuf",
      name: "Dr. Qayoom Yousuf",
      designation: "Consultant – Interventional Cardiology",
      speciality: "Interventional Cardiology",
      qualification: "",
      experience: "",
      expertise: [
        "Interventional Cardiology",
        "Coronary Interventions",
        "Angioplasty",
      ],
      image: "/images/doctors/qayoom-yousuf.webp",
    },

    {
      slug: "dr-jagan-nayakulu-hanumanthu",
      name: "Dr. (Surg. Capt.) Jagan Nayakulu Hanumanthu",
      designation: "Senior Consultant & Interventional Cardiologist",
      speciality: "Interventional Cardiology",
      qualification: "",
      experience: "",
      expertise: [
        "Interventional Cardiology",
        "Complex Cardiac Procedures",
        "Coronary Interventions",
      ],
      image: "/images/doctors/hanumanthu.webp",
    },

    {
      slug: "dr-ankush-singh-kotwal",
      name: "Dr. Ankush Singh Kotwal",
      designation: "Consultant CTVS Surgeon",
      speciality: "Cardiothoracic & Vascular Surgery",
      qualification: "",
      experience: "",
      expertise: [
        "Cardiac Surgery",
        "CTVS Surgery",
        "Valve Surgery",
        "Aortic Surgery",
      ],
      image: "/images/doctors/ankushsingh.webp",
    },
  ],

  stats: [
    {
      value: "24/7",
      label: "Cardiac Support",
    },
    {
      value: "360°",
      label: "Heart Care",
    },
    {
      value: "M12",
      label: "Advanced Cath Lab",
    },
    {
      value: "ICCU",
      label: "Intensive Cardiac Care",
    },
  ],

  color: "#079AC0",
},

  {
  id: "04",
  slug: "neuro",
  shortName: "Neuro",
  title: "Neuro Sciences",
  eyebrow: "Brain & Spine",
  subtitle: "Specialist care for the brain and nervous system",

  description:
    "Advanced neurological and neurosurgical care for stroke, epilepsy, migraine, Parkinson's disease, multiple sclerosis, spinal disorders and other conditions affecting the brain and nervous system.",

  descriptionn:
    "Expert neurological and neurosurgical care in Mahakoshal, Madhya Pradesh, combining advanced diagnostics, minimally invasive procedures, neurointervention, rehabilitation and long-term neurological management.",

  image: "/images/centres/neuro1.png",

  capabilities: [
    "Neurology",
    "Neurosurgery",
    "Stroke Care",
    "Neurointervention",
    "Spinal Surgery",
    "Minimally Invasive Neurosurgery",
    "Movement Disorder Care",
    "Neurological Rehabilitation",
  ],

  conditions: [
    {
      category: "Stroke & Cerebrovascular Disorders",
      items: [
        "Stroke",
        "Brain Aneurysms",
        "Arteriovenous Malformations (AVMs)",
      ],
    },
    {
      category: "Seizure & Movement Disorders",
      items: [
        "Epilepsy",
        "Parkinson's Disease",
        "Movement Disorders",
      ],
    },
    {
      category: "Headache & Nerve Disorders",
      items: [
        "Migraine",
        "Chronic Headaches",
        "Neuropathy",
      ],
    },
    {
      category: "Neurodegenerative & Memory Disorders",
      items: [
        "Multiple Sclerosis",
        "Alzheimer's Disease",
        "Dementia",
        "Memory Disorders",
      ],
    },
    {
      category: "Brain Disorders",
      items: [
        "Brain Tumors",
        "Other Neurological Disorders",
      ],
    },
    {
      category: "Spinal Disorders",
      items: [
        "Herniated Disc",
        "Spinal Stenosis",
        "Spinal Cord Injuries",
        "Spinal Deformities",
        "Degenerative Spinal Conditions",
      ],
    },
  ],

  diagnostics: [
    {
      name: "MRI & CT Scans",
      description:
        "High-resolution imaging used to detect abnormalities in the brain and spine.",
    },
    {
      name: "EEG (Electroencephalogram)",
      description:
        "Monitors brain activity to help diagnose epilepsy and sleep disorders.",
    },
    {
      name: "EMG (Electromyography)",
      description:
        "Evaluates nerve and muscle function to identify neuropathy and muscle disorders.",
    },
    {
      name: "Lumbar Puncture",
      description:
        "Analysis of cerebrospinal fluid to help diagnose infections and neurological conditions.",
    },
    {
      name: "Neuropsychological Testing",
      description:
        "Evaluates cognitive function to help diagnose memory and cognitive disorders.",
    },
  ],

  treatments: [
    {
      category: "Neurological Management",
      items: [
        "Medication Management",
        "Epilepsy Management",
        "Migraine & Headache Management",
        "Parkinson's Disease Management",
        "Multiple Sclerosis Management",
        "Neuropathy Management",
      ],
    },
    {
      category: "Neurosurgery",
      items: [
        "Brain Tumor Surgery",
        "Brain Aneurysm Surgery",
        "Epilepsy Surgery",
        "Spinal Surgery",
        "Minimally Invasive Neurosurgery",
      ],
    },
    {
      category: "Neurointervention",
      items: [
        "Aneurysm Coiling",
        "Aneurysm Clipping",
        "Arteriovenous Malformation (AVM) Treatment",
      ],
    },
    {
      category: "Advanced Neurosurgical Procedures",
      items: [
        "Deep Brain Stimulation (DBS)",
        "Endoscopic Neurosurgery",
        "Third Ventriculostomy",
        "Arachnoid Cyst Surgery",
      ],
    },
    {
      category: "Stroke & Rehabilitation Care",
      items: [
        "Emergency Stroke Care",
        "Stroke Rehabilitation",
        "Physical Therapy",
        "Occupational Therapy",
        "Speech Therapy",
      ],
    },
    {
      category: "Supportive Care",
      items: [
        "Lifestyle Counselling",
        "Palliative Care",
      ],
    },
  ],

  specializedCare: [
    "24/7 Emergency Stroke Care",
    "Neurointervention",
    "Aneurysm Coiling & Clipping",
    "Deep Brain Stimulation (DBS)",
    "Minimally Invasive Neurosurgery",
    "Endoscopic Neurosurgery",
    "Brain Tumor Surgery",
    "Spinal Surgery",
    "Epilepsy Surgery",
    "Neurological Rehabilitation",
  ],

  preventiveCare: [
    "Stroke Risk Assessment",
    "Blood Pressure & Vascular Risk Management",
    "Lifestyle Counselling",
    "Dietary Guidance",
    "Exercise Guidance",
    "Stress Management",
    "Early Evaluation of Neurological Symptoms",
    "Regular Neurological Follow-up",
  ],

  highlights: [
    "Expert Neurologists & Neurosurgeons",
    "24/7 Emergency Stroke Care",
    "Advanced MRI, CT, EEG & EMG Diagnostics",
    "Neurointervention Procedures",
    "Minimally Invasive Neurosurgery",
    "Deep Brain Stimulation (DBS)",
    "Comprehensive Brain & Spine Care",
    "Neurological Rehabilitation",
    "Patient-Focused Treatment Plans",
  ],

  doctors: [
    {
      slug: "dr-arunkumar-karthikayan",
      name: "Dr. Arunkumar Karthikayan",
      designation: "Consultant Neurosurgery",
      speciality: "Neurosurgery",
      qualification: "",
      experience: "",
      expertise: [
        "Neurosurgery",
        "Brain Surgery",
        "Spinal Surgery",
        "Minimally Invasive Neurosurgery",
      ],
      image: "/images/doctors/arun.webp",
    },

    {
      slug: "dr-suresh-babu-vallepu",
      name: "Dr. Suresh Babu Vallepu",
      designation: "Consultant Neurologist",
      speciality: "Neurology",
      qualification: "",
      experience: "",
      expertise: [
        "Neurology",
        "Stroke Care",
        "Epilepsy",
        "Neurological Disorders",
      ],
      image: "/images/doctors/suresh.webp",
    },

    {
      slug: "dr-vijayendra-reddy-chinta",
      name: "Dr. Vijayendra Reddy Chinta",
      designation: "Consultant – Neurology",
      speciality: "Neurology",
      qualification: "",
      experience: "",
      expertise: [
        "Neurology",
        "Stroke Care",
        "Movement Disorders",
        "Neurological Disorders",
      ],
      image: "/images/doctors/vijayendra.webp",
    },
  ],

  stats: [
    {
      value: "360°",
      label: "Neuro Care",
    },
    {
      value: "24/7",
      label: "Critical Support",
    },
  ],

  color: "#087EA4",
},

  {
  id: "05",
  slug: "nephro",
  shortName: "Nephro",
  title: "Nephro Sciences",
  eyebrow: "Kidney Care",
  subtitle: "Complete care for healthier kidneys",

  description:
    "At Apollo JBP Hospitals, a trusted Kidney Specialist Hospital in Jabalpur, our expert nephrology team provides advanced care for kidney diseases through comprehensive diagnosis, medical management, dialysis and kidney transplantation.",

  descriptionn:
    "Specialist kidney care spanning prevention, diagnosis, medical management, advanced dialysis, kidney transplantation, post-transplant care and long-term renal support.",

  image: "/images/centres/nephro.png",

  capabilities: [
    "Nephrology",
    "Dialysis Care",
    "Kidney Disease Management",
    "Kidney Transplantation",
    "Renal Replacement Therapy",
    "Kidney Biopsy",
    "Hypertension & Renal Care",
    "Renal Nutrition & Lifestyle Management",
  ],

  conditions: [
    {
      category: "Chronic & Acute Kidney Disorders",
      items: [
        "Chronic Kidney Disease (CKD)",
        "Acute Kidney Injury (AKI)",
        "End-Stage Kidney Disease",
        "Other Renal Disorders",
      ],
    },
    {
      category: "Glomerular & Inflammatory Kidney Diseases",
      items: [
        "Glomerulonephritis",
        "Nephrotic Syndrome",
        "Diabetic Kidney Disease",
      ],
    },
    {
      category: "Electrolyte & Metabolic Disorders",
      items: [
        "Electrolyte Imbalances",
        "Fluid & Electrolyte Disorders",
      ],
    },
    {
      category: "Hypertension & Kidney Disorders",
      items: [
        "Hypertension-Related Kidney Disease",
        "Renal Disorders Associated with Diabetes",
        "Renal Disorders Associated with Hypertension",
      ],
    },
    {
      category: "Kidney & Urinary Conditions",
      items: [
        "Kidney Infections",
        "Kidney Stones",
        "Urinary Disorders",
      ],
    },
  ],

  diagnostics: [
    {
      name: "Ultrasound Guided Kidney Biopsy",
      description:
        "Image-guided kidney biopsy used to obtain kidney tissue for accurate diagnosis of complex renal conditions.",
    },
    {
      name: "Renal Doppler Ultrasound",
      description:
        "Ultrasound-based evaluation of kidney structure and renal blood flow.",
    },
    {
      name: "Dual Energy CT",
      description:
        "Advanced CT imaging used for detailed evaluation of renal conditions.",
    },
    {
      name: "Serum Creatinine & Kidney Function Testing",
      description:
        "Laboratory testing used to assess kidney function and monitor renal disease.",
    },
    {
      name: "Blood Urea Nitrogen (BUN)",
      description:
        "Blood test used as part of kidney function assessment.",
    },
    {
      name: "Electrolyte Panel",
      description:
        "Evaluation of sodium, potassium and other essential electrolytes affected by kidney function.",
    },
    {
      name: "Glomerular Filtration Rate (GFR)",
      description:
        "Assessment of kidney filtration capacity and overall renal function.",
    },
    {
      name: "Continuous Kidney Function Monitoring",
      description:
        "Regular follow-up and monitoring to detect changes in kidney function and adjust treatment plans.",
    },
  ],

  treatments: [
    {
      category: "Medical Nephrology",
      items: [
        "Chronic Kidney Disease Management",
        "Acute Kidney Injury Management",
        "Hypertension Management",
        "Electrolyte Management",
        "Diabetic Kidney Disease Management",
        "Glomerulonephritis Management",
      ],
    },
    {
      category: "Dialysis & Renal Replacement Therapy",
      items: [
        "Hemodialysis",
        "Peritoneal Dialysis",
        "CRRT",
        "SLED Dialysis",
      ],
    },
    {
      category: "Advanced Renal Therapies",
      items: [
        "Plasmapheresis",
        "Renal Artery Angioplasty",
        "Kidney Biopsy",
      ],
    },
    {
      category: "Kidney Transplantation",
      items: [
        "Kidney Transplant Evaluation",
        "Living Donor Transplant",
        "Deceased Donor Transplant",
        "Personalized Donor Matching",
        "Kidney Transplant Surgery",
        "Post-Transplant Care",
        "Immunosuppressive Therapy",
      ],
    },
    {
      category: "Supportive Kidney Care",
      items: [
        "Personalized Dietary Management",
        "Nutritional Counselling",
        "Lifestyle Modification",
        "Weight Management",
        "Co-morbid Condition Management",
      ],
    },
    {
      category: "Targeted Therapies",
      items: [
        "Immunosuppressive Therapy",
        "Biologic Therapy",
      ],
    },
  ],

  specializedCare: [
    "Advanced Dialysis",
    "Hemodialysis",
    "Peritoneal Dialysis",
    "CRRT",
    "SLED Dialysis",
    "Plasmapheresis",
    "Renal Artery Angioplasty",
    "Ultrasound Guided Kidney Biopsy",
    "Kidney Transplantation",
    "Post-Transplant Care",
    "Immunosuppressive Therapy",
  ],

  preventiveCare: [
    "Early Detection of Kidney Disease",
    "Regular Kidney Function Monitoring",
    "Blood Pressure Management",
    "Diabetes Management",
    "Electrolyte & Fluid Balance Monitoring",
    "Personalized Kidney-Friendly Diet",
    "Weight Management",
    "Exercise & Lifestyle Modification",
    "Smoking & Risk-Factor Counselling",
    "Regular Nephrology Follow-up",
  ],

  highlights: [
    "Experienced Nephrology Team",
    "Advanced Kidney Disease Diagnostics",
    "Comprehensive Dialysis Services",
    "CRRT & SLED Renal Replacement Therapy",
    "Kidney Biopsy & Advanced Renal Diagnostics",
    "Plasmapheresis",
    "Renal Artery Angioplasty",
    "Comprehensive Kidney Transplant Program",
    "Post-Transplant Care & Immunosuppressive Therapy",
    "Personalized Kidney Care",
  ],

  doctors: [
    {
      slug: "dr-rajesh-laxman-rao-sherke",
      name: "Dr. Rajesh Laxman Rao Sherke",
      designation: "Senior Consultant, Nephrology",
      speciality: "Nephrology",
      qualification:
        "MBBS, MD (General Medicine), DM (Nephrology), DNB (Nephrology)",
      experience: "",
      expertise: [
        "Nephrology",
        "Dialysis",
        "Kidney Transplantation",
        "Acute & Chronic Kidney Disease Management",
        "Hypertension & Renal Disorders",
        "Vascular Access Procedures",
        "Kidney Biopsy",
        "Peritoneal Dialysis",
        "Haemodialysis",
        "CAPD",
        "SLED",
        "CRRT",
      ],
      image: "/images/doctors/rajesh-laxman.webp",
    },
  ],

  stats: [
    {
      value: "24/7",
      label: "Renal Support",
    },
    {
      value: "360°",
      label: "Kidney Care",
    },
  ],

  color: "#168BA7",
},

  {
  id: "06",
  slug: "ortho-joint-spine",
  shortName: "Ortho",
  title: "Ortho-Joint & Spine",
  eyebrow: "Bones & Movement",
  subtitle: "Helping you move with confidence",

  description:
    "Apollo JBP Hospitals provides advanced orthopaedic and spine care for joint pain, arthritis, fractures, sports injuries and complex spinal conditions through personalized treatment and rehabilitation.",

  descriptionn:
    "Comprehensive orthopaedic care for bones, joints and spine with a focus on joint replacement, robotic surgery, arthroscopy, sports injury management, trauma care, minimally invasive spine procedures and rehabilitation.",

  image: "/images/centres/ortho.png",

  capabilities: [
    "Joint Replacement",
    "Robotic Joint Replacement",
    "Spine Care",
    "Minimally Invasive Spine Surgery",
    "Arthroscopy & Sports Medicine",
    "Trauma & Fracture Care",
    "Joint Preservation",
    "Physiotherapy & Rehabilitation",
  ],

  conditions: [
    {
      category: "Joint Pain & Arthritis",
      items: [
        "Osteoarthritis",
        "Rheumatoid Arthritis",
        "Knee Pain",
        "Hip Pain",
        "Shoulder Pain",
        "Joint Degeneration",
        "Joint Deformities",
      ],
    },
    {
      category: "Sports & Ligament Injuries",
      items: [
        "ACL Injuries",
        "PCL Injuries",
        "Meniscus Injuries",
        "Rotator Cuff Injuries",
        "Shoulder Instability",
        "Sports Injuries",
        "Cartilage Injuries",
      ],
    },
    {
      category: "Fractures & Trauma",
      items: [
        "Complex Fractures",
        "Pelvic & Acetabular Fractures",
        "Upper Limb Fractures",
        "Lower Limb Fractures",
        "Dislocations",
        "Polytrauma Injuries",
      ],
    },
    {
      category: "Spine Disorders",
      items: [
        "Back Pain",
        "Neck Pain",
        "Herniated Disc",
        "Disc Herniation",
        "Spinal Stenosis",
        "Spondylolisthesis",
        "Spinal Deformities",
        "Spinal Cord Injuries",
        "Degenerative Spine Conditions",
      ],
    },
    {
      category: "Bone & Metabolic Conditions",
      items: [
        "Osteoporosis",
        "Bone-Related Disorders",
        "Bone Deformities",
      ],
    },
    {
      category: "Other Orthopaedic Conditions",
      items: [
        "Hand Disorders",
        "Foot & Ankle Disorders",
        "Paediatric Orthopaedic Conditions",
      ],
    },
  ],

  diagnostics: [
    {
      name: "DEXA Scan",
      description:
        "Bone density assessment used to evaluate osteoporosis and bone health.",
    },
    {
      name: "Advanced Orthopaedic Imaging",
      description:
        "Advanced diagnostic imaging used for early and precise evaluation of bone, joint and spinal conditions.",
    },
    {
      name: "Musculoskeletal Assessment",
      description:
        "Clinical assessment of joints, bones, muscles and movement to identify underlying orthopaedic problems.",
    },
    {
      name: "Spine Evaluation",
      description:
        "Detailed assessment of spinal conditions to guide conservative, minimally invasive or surgical treatment.",
    },
  ],

  treatments: [
    {
      category: "Joint Replacement",
      items: [
        "Robotic Knee Replacement",
        "Total Knee Replacement",
        "Hip Replacement",
        "Robotic Hip Replacement",
        "Shoulder Replacement",
        "Revision Joint Replacement",
      ],
    },
    {
      category: "Arthroscopy & Sports Medicine",
      items: [
        "Knee Arthroscopy",
        "Shoulder Arthroscopy",
        "ACL Reconstruction",
        "PCL Reconstruction",
        "Meniscus Repair",
        "Rotator Cuff Repair",
        "Cartilage Preservation Procedures",
        "Sports Injury Management",
      ],
    },
    {
      category: "Spine Surgery",
      items: [
        "Endoscopic Spine Surgery",
        "Minimally Invasive Spine Surgery (MISS)",
        "Endoscopic Spine Decompression",
        "Spinal Fusion",
        "Disc Replacement",
        "Spinal Decompression",
        "Kyphoplasty",
        "Spondylolisthesis Management",
        "Spinal Tumor Removal Surgery",
        "Spine Trauma Surgery",
      ],
    },
    {
      category: "Trauma & Fracture Care",
      items: [
        "Complex Trauma Surgery",
        "Pelvic & Acetabular Fracture Fixation",
        "Fracture Fixation",
        "Dislocation Management",
        "Polytrauma Management",
      ],
    },
    {
      category: "Joint Preservation & Deformity Correction",
      items: [
        "Arthritis Management",
        "Joint Preservation",
        "Osteotomy",
        "Deformity Correction Surgery",
      ],
    },
    {
      category: "Non-Surgical Management",
      items: [
        "Physiotherapy",
        "Rehabilitation",
        "Medication Management",
        "Bracing & Orthotic Support",
        "Lifestyle & Nutritional Counselling",
      ],
    },
  ],

  specializedCare: [
    "J&J Robotic Arm-Assisted Joint Replacement",
    "Robotic Hip & Knee Replacement",
    "Endoscopic Spine Surgery",
    "Unilateral Biportal Endoscopy (UBE)",
    "Transforaminal Endoscopic Spine Surgery",
    "Minimally Invasive Spine Surgery",
    "Advanced Arthroscopy",
    "Sports Medicine",
    "Complex Trauma Surgery",
    "Pelvic & Acetabular Fracture Surgery",
    "Spinal Tumor Surgery",
    "Joint Preservation",
  ],

  preventiveCare: [
    "Routine Musculoskeletal Health Screening",
    "Bone Health Assessment",
    "Osteoporosis Screening",
    "DEXA-Based Bone Density Assessment",
    "Ergonomic Evaluation",
    "Calcium & Vitamin D Nutritional Guidance",
    "Weight Management",
    "Exercise & Mobility Guidance",
    "Sports Injury Prevention",
    "Community Orthopaedic Awareness Programs",
  ],

  highlights: [
    "Robotic Hip & Knee Replacement",
    "Advanced Endoscopic Spine Surgery",
    "Minimally Invasive Spine Procedures",
    "Advanced Arthroscopy & Sports Medicine",
    "Complex Trauma & Fracture Care",
    "DEXA-Based Osteoporosis Management",
    "Advanced Spinal Procedures",
    "Joint Preservation & Deformity Correction",
    "Personalized Rehabilitation Programs",
    "Comprehensive Joint & Spine Care",
  ],

  doctors: [
    {
      slug: "dr-adam-teja",
      name: "Dr. Adam Teja",
      designation: "Orthopedic & Joint Replacement Surgeon",
      speciality: "Orthopaedics & Joint Replacement",
      qualification:
        "MBBS, MS (Orthopaedics), Fellowship in Endoscopic Spine Surgery, Fellowship in Arthroplasty",
      experience: "10+ Years",
      expertise: [
        "Endoscopic Spine Surgery",
        "Robotic Hip & Knee Replacement",
        "Arthroscopy",
        "ACL & PCL Reconstruction",
        "Meniscus Repair",
        "Shoulder Arthroscopy",
        "Complex Trauma",
        "Minimally Invasive Spine Surgery",
      ],
      image: "",
    },

    {
      slug: "dr-devashish-chhutani",
      name: "Dr. Devashish Chhutani",
      designation:
        "Associate Consultant Orthopaedic, Complex Trauma, Joint Replacement, Arthroscopy & Sports Injury Surgeon",
      speciality: "Orthopaedics & Sports Medicine",
      qualification:
        "MBBS, MS (Orthopaedics) – Gold Medalist, Fellowship in Advanced Arthroscopy & Sports Medicine, Fellowship Training in Robotic Knee Arthroplasty",
      experience: "8+ Years",
      expertise: [
        "Robotic Knee Replacement",
        "Total Knee Replacement",
        "Hip Replacement",
        "Revision Joint Replacement",
        "ACL Reconstruction",
        "PCL Reconstruction",
        "Meniscus Repair",
        "Shoulder Arthroscopy",
        "Rotator Cuff Repair",
        "Complex Trauma Surgery",
        "Pelvic & Acetabular Fracture Fixation",
        "Joint Preservation",
      ],
      image: "",
    },
  ],

  stats: [
    {
      value: "360°",
      label: "Mobility Care",
    },
    {
      value: "01",
      label: "Connected Journey",
    },
  ],

  color: "#2389A8",
},

  {
  id: "07",
  slug: "critical-care",
  shortName: "Critical Care",
  title: "Critical Care",
  eyebrow: "Intensive Care",
  subtitle: "Specialist care when every moment matters",

  description:
    "Apollo JBP Hospitals provides advanced critical care for critically ill patients through continuous monitoring, multidisciplinary expertise, advanced life-support systems and coordinated emergency response.",

  descriptionn:
    "Focused critical care supported by multidisciplinary expertise, continuous monitoring, advanced life-support systems and coordinated clinical response for critically ill patients.",

  image: "/images/centres/critical-care.png",

  capabilities: [
    "Intensive Care",
    "Emergency Support",
    "Critical Monitoring",
    "Advanced Life Support",
    "Mechanical Ventilation",
    "Multidisciplinary Critical Care",
    "Postoperative Critical Care",
    "Critical Care Rehabilitation",
  ],

  conditions: [
    {
      category: "Medical Emergencies",
      items: [
        "Severe Infections & Sepsis",
        "Septic Shock",
        "Acute Respiratory Failure",
        "Acute Kidney Injury",
        "Multi-Organ Dysfunction",
      ],
    },
    {
      category: "Cardiac Emergencies",
      items: [
        "Acute Myocardial Infarction",
        "Cardiogenic Shock",
        "Severe Arrhythmias",
        "Acute Heart Failure",
        "Post-Cardiac Surgery Complications",
      ],
    },
    {
      category: "Neurological Emergencies",
      items: [
        "Acute Stroke",
        "Severe Traumatic Brain Injury",
        "Status Epilepticus",
        "Altered Level of Consciousness",
        "Post-Neurosurgical Critical Illness",
      ],
    },
    {
      category: "Respiratory Conditions",
      items: [
        "Acute Respiratory Distress",
        "Severe Pneumonia",
        "Respiratory Failure",
        "Severe Asthma Exacerbation",
        "COPD Exacerbation",
      ],
    },
    {
      category: "Trauma & Surgical Emergencies",
      items: [
        "Major Trauma",
        "Polytrauma",
        "Postoperative Complications",
        "Severe Blood Loss",
        "Complex Surgical Emergencies",
      ],
    },
    {
      category: "Organ Failure",
      items: [
        "Acute Kidney Failure",
        "Liver Failure",
        "Multi-Organ Failure",
        "Severe Metabolic Disorders",
      ],
    },
  ],

  diagnostics: [
    {
      name: "Continuous Vital Monitoring",
      description:
        "Continuous monitoring of heart rate, blood pressure, oxygen saturation, respiratory rate and other vital parameters.",
    },
    {
      name: "Arterial Blood Gas Analysis",
      description:
        "Rapid assessment of oxygenation, ventilation and acid-base balance in critically ill patients.",
    },
    {
      name: "ECG & Cardiac Monitoring",
      description:
        "Continuous cardiac rhythm monitoring and ECG evaluation for critically ill patients.",
    },
    {
      name: "Portable X-Ray",
      description:
        "Bedside radiological evaluation for critically ill patients who cannot be shifted from the ICU.",
    },
    {
      name: "Ultrasound & Bedside Imaging",
      description:
        "Bedside imaging support for rapid assessment of critically ill patients.",
    },
    {
      name: "Laboratory & Organ Function Testing",
      description:
        "Regular blood and laboratory investigations to monitor organ function and treatment response.",
    },
  ],

  treatments: [
    {
      category: "Advanced Life Support",
      items: [
        "Cardiopulmonary Resuscitation (CPR)",
        "Advanced Cardiac Life Support (ACLS)",
        "Airway Management",
        "Emergency Stabilization",
      ],
    },
    {
      category: "Respiratory Support",
      items: [
        "Mechanical Ventilation",
        "Non-Invasive Ventilation",
        "High-Flow Oxygen Therapy",
        "Advanced Airway Management",
      ],
    },
    {
      category: "Sepsis & Infection Management",
      items: [
        "Sepsis Management",
        "Broad-Spectrum Antimicrobial Therapy",
        "Hemodynamic Stabilization",
        "Source Control",
      ],
    },
    {
      category: "Renal & Organ Support",
      items: [
        "CRRT",
        "Acute Kidney Injury Management",
        "Fluid & Electrolyte Management",
        "Multi-Organ Support",
      ],
    },
    {
      category: "Cardiac Critical Care",
      items: [
        "Hemodynamic Monitoring",
        "Cardiogenic Shock Management",
        "Post-Cardiac Surgery Care",
        "Advanced Cardiac Life Support",
      ],
    },
    {
      category: "Postoperative & Trauma Care",
      items: [
        "Postoperative ICU Care",
        "Trauma Stabilization",
        "Polytrauma Management",
        "Post-Surgical Complication Management",
      ],
    },
  ],

  specializedCare: [
    "24/7 Intensive Care",
    "Advanced Mechanical Ventilation",
    "Non-Invasive Ventilation",
    "High-Flow Oxygen Therapy",
    "CRRT",
    "Hemodynamic Monitoring",
    "Sepsis & Septic Shock Management",
    "Multi-Organ Support",
    "Postoperative Critical Care",
    "Trauma & Emergency Critical Care",
    "Multidisciplinary ICU Management",
  ],

  preventiveCare: [
    "Early Recognition of Critical Illness",
    "Infection Prevention",
    "ICU Infection Control",
    "Medication & Treatment Monitoring",
    "Nutrition & Fluid Management",
    "Pressure Injury Prevention",
    "Early Mobilization",
    "Post-ICU Follow-up",
    "Family Counselling & Education",
  ],

  highlights: [
    "24/7 Critical Care Support",
    "Continuous Patient Monitoring",
    "Multidisciplinary Critical Care Team",
    "Advanced Life Support",
    "Mechanical Ventilation",
    "CRRT & Organ Support",
    "Sepsis & Septic Shock Management",
    "Trauma & Postoperative Critical Care",
    "Rapid Emergency Response",
    "Personalized Critical Care Planning",
  ],

  doctors: [
  {
    slug: "dr-shobhit-kumar-tripathi",
    name: "Dr. Shobhit Kumar Tripathi",
    designation: "Paediatric Emergency Specialist",
    speciality: "Paediatric Emergency & Critical Care",
    qualification: "",
    experience: "",
    expertise: [
      "Paediatric Emergency Care",
      "Pediatric Critical Care",
      "Emergency Stabilization",
    ],
    image: "/images/doctors/Dr-Shobhit.webp",
  },

  {
    slug: "dr-shirisha-kumari-jinka",
    name: "Dr. Shirisha Kumari Jinka",
    designation:
      "Critical Care Specialist, Intensivist & ICU Consultant",
    speciality: "Critical Care & Intensive Care",
    qualification: "",
    experience: "",
    expertise: [
      "Critical Care",
      "Intensive Care",
      "ICU Management",
      "Emergency Critical Care",
    ],
    image: "/images/doctors/shirisha.webp",
  },

  {
    slug: "dr-mrunali-u-nikhare",
    name: "Dr. Mrunali U. Nikhare",
    designation: "Consultant – Emergency Medicine",
    speciality: "Emergency Medicine",
    qualification: "",
    experience: "",
    expertise: [
      "Emergency Medicine",
      "Emergency Stabilization",
      "Trauma & Emergency Care",
      "Critical Care",
    ],
    image: "/images/doctors/mrunali.webp",
  },

  {
    slug: "dr-nagaraj-kandagal",
    name: "Dr. Nagaraj Kandagal",
    designation: "Consultant Anaesthesiologist & Intensivist",
    speciality: "Anaesthesiology & Critical Care",
    qualification: "",
    experience: "",
    expertise: [
      "Anaesthesiology",
      "Critical Care",
      "Intensive Care",
      "Perioperative Critical Care",
    ],
    image: "/images/doctors/nagaraj.webp",
  },

  {
    slug: "dr-akanksha-choudhary",
    name: "Dr. Akanksha Choudhary",
    designation: "Associate Consultant – Critical Care",
    speciality: "Critical Care",
    qualification: "",
    experience: "",
    expertise: [
      "Critical Care",
      "Intensive Care",
      "ICU Management",
      "Emergency Critical Care",
    ],
    image: "/images/doctors/akanksha.webp",
  },

  {
    slug: "dr-sumit-sanjaykant-trivedi",
    name: "Dr. Sumit Sanjaykant Trivedi",
    designation: "Consultant – Anaesthesiology & Critical Care",
    speciality: "Anaesthesiology & Critical Care",
    qualification: "",
    experience: "",
    expertise: [
      "Anaesthesiology",
      "Critical Care",
      "Intensive Care",
      "Perioperative Critical Care",
    ],
    image:
      "/images/doctors/sumit-sanjaykant.webp",
  },
],

  stats: [
    {
      value: "24/7",
      label: "Critical Care",
    },
    {
      value: "01",
      label: "Connected Team",
    },
  ],

  color: "#0A89A7",
},
];

export function getCentreBySlug(slug) {
  return centresOfExcellence.find((centre) => centre.slug === slug);
}

