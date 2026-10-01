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
    subtitle: "Comprehensive cancer care, closer to home",
    description:"Looking for the best cancer hospital in Jabalpur? Apollo offers expert cancer specialists in Jabalpur with advanced, affordable oncology care.",
    descriptionn:
      "An integrated approach to cancer care bringing together diagnosis, medical treatment, radiation and surgical expertise.",
    image: "/images/centres/onco.png",

    capabilities: [
      "Medical Oncology",
      "Radiation Oncology",
      "Surgical Oncology",
    ],

    doctors: [],

    stats: [
      {
        value: "360°",
        label: "Cancer Care",
      },
      {
        value: "01",
        label: "Connected Journey",
      },
    ],

    color: "#1489A8",
  },

  {
    id: "03",
    slug: "cardiac",
    shortName: "Cardiac",
    title: "Cardiac Sciences",
    eyebrow: "Heart Care",
    subtitle: "Advanced heart care for every beat of life",
    description: "At Apollo Hospitals, the Best Heart Hospital in Jabalpur, our expert Heart Specialists in Jabalpur provide advanced diagnostics, cutting-edge treatments, and compassionate cardiac care.",
    descriptionn:
      "Comprehensive cardiac care combining advanced diagnostics, interventional procedures, cardiac surgery and critical care.",
    image: "/images/centres/cardiac.jpg",

    capabilities: [
      "Interventional Cardiology",
      "Cardiac Surgery",
      "Advanced Cardiac Imaging",
    ],

    doctors: [],

    stats: [
      {
        value: "24/7",
        label: "Cardiac Support",
      },
      {
        value: "360°",
        label: "Heart Care",
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
    descriptionn: "Expert Neurological Care in Mahakoshal, Madhya Pradesh",
    description:
      "Advanced neurological and neurosurgical care focused on diagnosis, treatment and long-term recovery.",
    image: "/images/centres/neuro1.png",

    capabilities: [
      "Neurology",
      "Neurosurgery",
      "Stroke Care",
    ],

    doctors: [],

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
    description: "At Apollo JBP Hospitals, a trusted Kidney Specialist Hospital in Jabalpur, our expert team led by the Best Kidney Doctor in Jabalpur offers advanced care…",
    descriptionn:
      "Specialist kidney care spanning diagnosis, medical management, renal replacement therapies and long-term support.",
    image: "/images/centres/nephro.png",

    capabilities: [
      "Nephrology",
      "Dialysis Care",
      "Kidney Disease Management",
    ],

    doctors: [],

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
    description: "",
    descriptionn:
      "Comprehensive orthopaedic care for bones, joints and spine with a focus on mobility, recovery and quality of life.",
    image: "/images/centres/ortho.png",

    capabilities: [
      "Joint Replacement",
      "Spine Care",
      "Sports & Trauma",
    ],

    doctors: [],

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
    description: "",
    descriptionn:
      "Focused critical care supported by multidisciplinary expertise, continuous monitoring and coordinated clinical response.",
    image: "/images/centres/critical-care.png",

    capabilities: [
      "Intensive Care",
      "Emergency Support",
      "Critical Monitoring",
    ],

    doctors: [],

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


