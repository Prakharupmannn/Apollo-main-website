// Master Knowledge Base and Smart Route Navigation Directory for Apollo Assist Chatbot
// Apollo Hospitals Jabalpur

export const WELCOME_MESSAGE = {
  id: "welcome-1",
  sender: "assistant",
  text: "Hello! Welcome to Apollo JBP Hospitals Jabalpur. I am Apollo Assist, your 24/7 personal healthcare companion.\n\nI can instantly navigate you to any page, service, or department across our website — including 24/7 Emergency Care, Doctor Appointments, Clinical Case Studies, Hospital Events & Health Camps, Ambulance Services, Centres of Excellence, and all 37+ Medical Specialities.\n\nHow can I help you today?",
  timestamp: "Just now",
  isWelcome: true,
};

export const QUICK_ACTIONS = [
  {
    id: "action-emergency",
    label: "24/7 Emergency & Trauma Care",
    shortLabel: "Emergency Care",
    icon: "alert",
    tag: "24/7 Critical",
    isEmergency: true,
    query: "Emergency Care",
  },
  {
    id: "action-appointment",
    label: "Book Doctor Appointment",
    shortLabel: "Book Appointment",
    icon: "calendar",
    tag: "OPD & Consult",
    query: "Book Doctor Appointment",
  },
  {
    id: "action-events",
    label: "Hospital Events & Health Camps",
    shortLabel: "Events & Camps",
    icon: "calendar",
    tag: "Camps & CME",
    query: "Hospital Events",
  },
  {
    id: "action-casestudies",
    label: "Clinical Case Studies & Research",
    shortLabel: "Case Studies",
    icon: "activity",
    tag: "Clinical Research",
    query: "Case Studies",
  },
  {
    id: "action-ambulance",
    label: "24/7 Ambulance & Mobile ICU",
    shortLabel: "Ambulance",
    icon: "alert",
    tag: "Mobile ICU",
    isEmergency: true,
    query: "Ambulance Services",
  },
  {
    id: "action-doctors",
    label: "Find Specialist Doctors",
    shortLabel: "Doctors Directory",
    icon: "calendar",
    tag: "49+ Specialists",
    query: "Find Doctors",
  },
  {
    id: "action-centres",
    label: "Centres of Excellence",
    shortLabel: "Centres of Excellence",
    icon: "activity",
    tag: "Super Specialty",
    query: "Centres of Excellence",
  },
  {
    id: "action-all-pages",
    label: "Explore All Website Pages & Routes",
    shortLabel: "All Pages Directory",
    icon: "globe",
    tag: "Navigation Hub",
    query: "All Pages",
  },
];

// Complete Directory of Website Pages & Folders
export const SITE_ROUTES = [
  // 1. Emergency & Urgent Care
  {
    name: "24/7 Emergency Care",
    category: "Emergency & Critical",
    path: "/emergency",
    desc: "Level-1 comprehensive trauma unit, cardiac emergency STEMI network & stroke thrombolysis care.",
    keywords: ["emergency", "trauma", "casualty", "er", "urgent", "accident", "emergency page"],
  },
  {
    name: "24/7 Ambulance Service",
    category: "Emergency & Critical",
    path: "/patientcare/ambulance",
    desc: "24/7 Advanced Life Support (ALS) & Basic Life Support (BLS) mobile ICU ambulances.",
    keywords: ["ambulance", "als", "bls", "mobile icu", "patient transport"],
  },

  // 2. Patient Care & Appointments
  {
    name: "Book Doctor Appointment",
    category: "Patient Care",
    path: "/patientcare/appointment",
    desc: "Fast-track online appointment booking with 49+ specialist doctors across 25+ departments.",
    keywords: ["appointment", "book appointment", "opd", "consultation", "doctor appointment", "slot"],
  },
  {
    name: "Patient Care Overview",
    category: "Patient Care",
    path: "/patientcare",
    desc: "Complete patient services overview, inpatient amenities, diagnostic services & hospital facilities.",
    keywords: ["patient care", "patientcare", "hospital services", "inpatient", "facilities"],
  },
  {
    name: "Clinical Case Studies",
    category: "Patient Care",
    path: "/patientcare/case-studies",
    desc: "In-depth medical breakthrough reports, surgical achievements & successful clinical outcomes.",
    keywords: ["case studies", "case study", "casestudies", "clinical cases", "breakthrough", "research"],
  },
  {
    name: "Hospital Events & Health Camps",
    category: "Patient Care",
    path: "/patientcare/events",
    desc: "Free health checkup camps, community outreach programs, CME conferences & seminars.",
    keywords: ["events", "event", "camps", "camp", "cme", "seminar", "health camp", "webinar"],
  },
  {
    name: "Patient Care Specialities",
    category: "Patient Care",
    path: "/ourspecialities",
    desc: "Explore specialized clinical departments tailored for comprehensive inpatient and outpatient care.",
    keywords: ["patient care specialities", "care departments"],
  },

  // 3. Doctors & Clinical Team
  {
    name: "Doctors Directory",
    category: "Medical Team",
    path: "/doctors",
    desc: "Browse credentials, OPD schedules & experience of over 49 specialist & super-specialist consultants.",
    keywords: ["doctor", "doctors", "specialist", "specialists", "surgeon", "physician", "consultants"],
  },

  // 4. Centres of Excellence
  {
    name: "Centres of Excellence Hub",
    category: "Centres of Excellence",
    path: "/centres-of-excellence",
    desc: "Overview of Apollo's flagship super-speciality institutes and advanced medical infrastructure.",
    keywords: ["centres of excellence", "center of excellence", "coe", "institutes"],
  },
  {
    name: "Gastro Sciences Centre",
    category: "Centres of Excellence",
    path: "/centres-of-excellence/gastro",
    desc: "Advanced digestive care, medical & surgical gastroenterology, GI endoscopy & hepatology.",
    keywords: ["gastro", "gastro sciences", "liver", "digestive", "hepatology", "endoscopy", "pancreas"],
  },
  {
    name: "Onco Sciences Centre (Cancer Care)",
    category: "Centres of Excellence",
    path: "/centres-of-excellence/onco",
    desc: "Comprehensive cancer institute offering surgical, medical, radiation oncology & precision tumor care.",
    keywords: ["onco", "onco sciences", "cancer", "oncology", "chemo", "chemotherapy", "radiation", "tumor"],
  },
  {
    name: "Cardiac Sciences Centre",
    category: "Centres of Excellence",
    path: "/centres-of-excellence/cardiac",
    desc: "24/7 STEMI interventional cardiology, primary angioplasty, TAVI & advanced heart surgery.",
    keywords: ["cardiac", "cardiac sciences", "heart", "cardio", "angioplasty", "bypass", "stemi", "tavi"],
  },
  {
    name: "Neuro Sciences Centre",
    category: "Centres of Excellence",
    path: "/centres-of-excellence/neuro",
    desc: "Comprehensive brain, spine, stroke management, neuro-navigation surgery & neuro critical care.",
    keywords: ["neuro", "neuro sciences", "brain", "stroke", "spine", "neurology", "neurosurgery"],
  },
  {
    name: "Nephro Sciences Centre (Kidney & Dialysis)",
    category: "Centres of Excellence",
    path: "/centres-of-excellence/nephro",
    desc: "24/7 hemodialysis, kidney disease management, nephrology consultations & renal care.",
    keywords: ["nephro", "nephro sciences", "kidney", "nephrology", "dialysis", "renal"],
  },
  {
    name: "Ortho-Joint and Spine Sciences",
    category: "Centres of Excellence",
    path: "/centres-of-excellence/ortho-joint-spine",
    desc: "Robotic knee & hip replacement, complex trauma, arthroscopy & minimally invasive spine surgery.",
    keywords: ["ortho", "orthopaedics", "joint", "spine", "bone", "knee", "hip", "replacement", "fracture"],
  },
  {
    name: "Critical Care Centre",
    category: "Centres of Excellence",
    path: "/centres-of-excellence/critical-care",
    desc: "Level-1 multi-disciplinary ICU, cardiac CCU, neuro ICU & round-the-clock intensivists.",
    keywords: ["critical care", "icu", "ccu", "intensive care", "intensivist"],
  },

  // 5. Our Specialities
  {
    name: "Our Specialities (37+ Departments)",
    category: "Specialities",
    path: "/ourspecialities",
    desc: "Complete directory of over 37 medical and surgical departments catering to all patient needs.",
    keywords: ["ourspecialities", "specialities", "specialties", "departments", "all specialities"],
  },

  // 6. Health Library & Knowledge
  {
    name: "Health Library & Medical Articles",
    category: "Education & Knowledge",
    path: "/health-library",
    desc: "80+ evidence-based health articles, wellness tips, disease prevention guides & medical news.",
    keywords: ["health library", "blogs", "articles", "blog", "article", "news", "health tips", "disease", "wellness"],
  },

  // 7. Hospital Information & Careers
  {
    name: "About Apollo JBP Hospitals",
    category: "About & Information",
    path: "/aboutus",
    desc: "Our mission, clinical heritage, NABH standards, leadership team & world-class hospital infrastructure.",
    keywords: ["about", "about us", "who we are", "history", "mission", "vision", "leadership", "infrastructure"],
  },
  {
    name: "Careers & Current Openings",
    category: "Careers",
    path: "/careers",
    desc: "Join Madhya Pradesh's leading healthcare institution. Openings for doctors, nurses, technicians & admin.",
    keywords: ["careers", "career", "jobs", "job", "vacancy", "vacancies", "hiring", "recruitment", "work with us"],
  },
  {
    name: "Contact Us & Directions",
    category: "Contact & Location",
    path: "/contact",
    desc: "Hospital address, phone numbers, email contacts, department helplines & interactive Google Maps.",
    keywords: ["contact", "contact us", "reach", "phone", "email", "helpline", "location", "address", "map", "directions"],
  },

  // 8. Patient Portal & Legal
  {
    name: "Patient Portal Login",
    category: "User Account",
    path: "/login",
    desc: "Access your personalized health records, appointment history & patient profile securely.",
    keywords: ["login", "log in", "signin", "sign in", "portal", "account", "patient portal"],
  },
  {
    name: "Privacy Policy",
    category: "Legal & Compliance",
    path: "/privacy-policy",
    desc: "Our commitment to safeguarding patient data, privacy practices & information security.",
    keywords: ["privacy", "privacy policy", "data protection"],
  },
  {
    name: "Terms of Service",
    category: "Legal & Compliance",
    path: "/terms-of-service",
    desc: "Terms, conditions & hospital guidelines governing website use and digital patient services.",
    keywords: ["terms", "terms of service", "terms of use", "legal"],
  },
  {
    name: "Home Page",
    category: "General",
    path: "/",
    desc: "Apollo JBP Hospitals Jabalpur main website homepage with quick services, doctor search & highlights.",
    keywords: ["home", "homepage", "main page", "start"],
  },
];

// Rich responses for core flows and FAQs
export const FLOW_RESPONSES = {
  // 1. Appointment Flow
  appointment: {
    text: "I can help you schedule an appointment with our specialist doctors at Apollo JBP Hospitals Jabalpur.\n\nYou can book quickly online with instant slot confirmation or speak directly with our OPD registration desk:",
    cards: [
      {
        title: "Fast-Track Online Booking",
        desc: "Choose from 49+ specialist doctors across 25+ medical departments with instant time-slot confirmation.",
        actionType: "link",
        actionUrl: "/patientcare/appointment",
        actionText: "Book Appointment Online",
      },
      {
        title: "Call OPD Desk Directly",
        desc: "Available Monday - Saturday: 9:00 AM – 6:00 PM for telephonic slot booking and doctor availability.",
        actionType: "call",
        actionUrl: "tel:+917566123666",
        actionText: "+91 7566 123666",
      },
      {
        title: "View Doctors Directory",
        desc: "Search leading doctors by specialty, qualification, experience, and OPD timings.",
        actionType: "link",
        actionUrl: "/doctors",
        actionText: "View All Doctors",
      },
    ],
    suggestions: [
      "Find Doctors by Specialty",
      "OPD Timings & Visiting Hours",
      "Insurance & Cashless TPA",
      "Centres of Excellence",
    ],
  },

  // 2. Emergency Flow
  emergency: {
    text: "🚨 24/7 EMERGENCY & TRAUMA CARE - IMMEDIATE RESPONSE\n\nIf you are experiencing a life-threatening medical emergency (severe chest pain, breathing difficulty, stroke symptoms, major trauma or accident), please reach out immediately:",
    isUrgent: true,
    cards: [
      {
        title: "24/7 Emergency Care Department",
        desc: "Apollo JBP Emergency Room features Level-1 Trauma Care, dedicated Resuscitation bays, 24/7 Cath Lab & Stroke Thrombolysis team on immediate standby.",
        badge: "Open 24/7",
        actionType: "link",
        actionUrl: "/emergency",
        actionText: "Go to Emergency Page",
        highlight: true,
      },
      {
        title: "24/7 Emergency Ambulance Service",
        desc: "Advanced Life Support (ALS) & Mobile ICU ambulances equipped with defibrillators, ventilators, oxygen and paramedics.",
        badge: "Immediate Dispatch",
        actionType: "link",
        actionUrl: "/patientcare/ambulance",
        actionText: "Book / Track Ambulance",
        highlight: true,
      },
      {
        title: "Emergency Toll-Free Code (1066)",
        desc: "Instant telephone connection with our ER triage coordinator and rapid ambulance dispatch.",
        actionType: "call",
        actionUrl: "tel:1066",
        actionText: "Call 1066 (24/7 Toll-Free)",
        highlight: true,
      },
      {
        title: "Emergency Room GPS Directions",
        desc: "Apollo JBP Hospitals, Global Square, Patan Road, Karmeta, Jabalpur, MP 482002. Open 24 Hours, 365 Days.",
        actionType: "link",
        actionUrl: "https://maps.google.com/?q=Apollo+JBP+Hospitals+Jabalpur",
        actionText: "Get Emergency GPS Route",
      },
    ],
    suggestions: [
      "24/7 Ambulance Service",
      "Critical Care Centre",
      "Hospital Location & Map",
      "Call +91 7566 123666",
    ],
  },

  // 3. Events Flow
  events: {
    text: "Apollo JBP Hospitals regularly organizes Free Health Screening Camps, Community Awareness Programs, and Academic Continuing Medical Education (CME) seminars.\n\nExplore our latest events and outreach initiatives:",
    cards: [
      {
        title: "Hospital Events & Health Camps",
        desc: "View upcoming and recent health checkup camps, doctor consultation drives, and community health events.",
        badge: "Community & CME",
        actionType: "link",
        actionUrl: "/patientcare/events",
        actionText: "Explore Events & Camps",
      },
      {
        title: "Free Pediatric Nephrology Camp",
        desc: "Specialized kidney health screening and consultation camp for children with senior pediatric nephrologists.",
        actionType: "link",
        actionUrl: "/patientcare/events/pediatric-nephrology-free-checkup-camp",
        actionText: "View Camp Details",
      },
      {
        title: "FibroScan for Fatty Liver Camp",
        desc: "Non-invasive liver health assessment and consultation camp using advanced transient elastography.",
        actionType: "link",
        actionUrl: "/patientcare/events/fibro-scan-for-fatty-liver-free-health-checkup-camp",
        actionText: "View Camp Details",
      },
    ],
    suggestions: [
      "Clinical Case Studies",
      "Health Library Articles",
      "Book Doctor Appointment",
      "All Pages Directory",
    ],
  },

  // 4. Case Studies Flow
  caseStudies: {
    text: "Our medical and surgical teams have treated complex and rare clinical conditions with exceptional outcomes.\n\nExplore our peer-reviewed clinical case studies and breakthrough patient recoveries:",
    cards: [
      {
        title: "Clinical Case Studies Repository",
        desc: "Browse detailed clinical reports, diagnostic methodologies, advanced surgeries, and patient recovery journeys.",
        badge: "Clinical Excellence",
        actionType: "link",
        actionUrl: "/patientcare/case-studies",
        actionText: "View All Case Studies",
      },
      {
        title: "Chronic Pancreatitis Interventions",
        desc: "Multidisciplinary management and advanced surgical intervention for complex chronic pancreatic disorders.",
        actionType: "link",
        actionUrl: "/patientcare/case-studies/chronic-pancreatitis",
        actionText: "Read Pancreatitis Case",
      },
      {
        title: "Stage IIIB Cervical Cancer Treatment",
        desc: "Successful multimodality oncological treatment combining surgical resection, chemotherapy and targeted radiation.",
        actionType: "link",
        actionUrl: "/patientcare/case-studies/stage-iiib-cervical-cancer",
        actionText: "Read Oncology Case",
      },
      {
        title: "Complex Gallstone & Hernia Surgery",
        desc: "Minimally invasive laparoscopic procedure resolving acute complicated gallstone disease and hernia repair.",
        actionType: "link",
        actionUrl: "/patientcare/case-studies/gallstone-surgery",
        actionText: "Read Surgical Case",
      },
    ],
    suggestions: [
      "Centres of Excellence",
      "Find Specialist Doctors",
      "Hospital Events",
      "All Pages Directory",
    ],
  },

  // 5. Ambulance Flow
  ambulance: {
    text: "🚑 24/7 APOLLO AMBULANCE & MOBILE ICU SERVICES\n\nOur Advanced Life Support (ALS) ambulances function as mobile intensive care units on wheels, staffed with trained emergency paramedics and critical care transport equipment.",
    isUrgent: true,
    cards: [
      {
        title: "Ambulance Services Portal",
        desc: "Learn about our fleet of ALS, BLS & Neonatal emergency transport units covering Jabalpur and surrounding MP districts.",
        badge: "24/7 Mobile ICU",
        actionType: "link",
        actionUrl: "/patientcare/ambulance",
        actionText: "Open Ambulance Page",
        highlight: true,
      },
      {
        title: "Instant Ambulance Dispatch Helpline",
        desc: "Direct toll-free ambulance emergency line for immediate GPS-tracked dispatch.",
        actionType: "call",
        actionUrl: "tel:1066",
        actionText: "Call 1066 (Ambulance Hotline)",
        highlight: true,
      },
      {
        title: "Hospital ER Trauma Desk",
        desc: "Connect directly with our 24/7 emergency room coordination desk.",
        actionType: "call",
        actionUrl: "tel:+917566123666",
        actionText: "Call +91 7566 123666",
      },
    ],
    suggestions: [
      "24/7 Emergency Care Page",
      "Hospital Location & GPS",
      "Critical Care Centre",
    ],
  },

  // 6. All Pages Directory Flow
  allPages: {
    text: "Here is your quick navigation guide to every section, folder, and page on the Apollo JBP Hospitals website:\n\nSelect any destination below to route directly to that page:",
    cards: [
      {
        title: "24/7 Emergency & Trauma",
        desc: "Level-1 emergency department, 24/7 trauma triage, Cath Lab & acute stroke network.",
        badge: "24/7 Critical",
        actionType: "link",
        actionUrl: "/emergency",
        actionText: "Go to Emergency Page",
        highlight: true,
      },
      {
        title: "24/7 Ambulance Services",
        desc: "Advanced Life Support (ALS) & Mobile ICU emergency patient transport.",
        badge: "Ambulance",
        actionType: "link",
        actionUrl: "/patientcare/ambulance",
        actionText: "Go to Ambulance Page",
      },
      {
        title: "Book Doctor Appointment",
        desc: "Book consultation slots online across 25+ clinical departments and 49+ specialists.",
        badge: "OPD Booking",
        actionType: "link",
        actionUrl: "/patientcare/appointment",
        actionText: "Book Appointment Online",
      },
      {
        title: "Doctors Directory",
        desc: "Profiles, credentials, OPD timings, and experience of all senior consultants.",
        badge: "49+ Doctors",
        actionType: "link",
        actionUrl: "/doctors",
        actionText: "View Doctors Directory",
      },
      {
        title: "Centres of Excellence",
        desc: "Cardiac, Onco, Neuro, Gastro, Nephro, Ortho-Joint & Spine, and Critical Care institutes.",
        badge: "Super Speciality",
        actionType: "link",
        actionUrl: "/centres-of-excellence",
        actionText: "Explore Centres of Excellence",
      },
      {
        title: "Our Specialities (37+ Departments)",
        desc: "Explore full medical and surgical departments from Cardiology to Pediatrics and Urology.",
        badge: "37+ Specialities",
        actionType: "link",
        actionUrl: "/ourspecialities",
        actionText: "Browse All Specialities",
      },
      {
        title: "Clinical Case Studies",
        desc: "Breakthrough medical recoveries, surgical case reports & research outcomes.",
        badge: "Clinical Cases",
        actionType: "link",
        actionUrl: "/patientcare/case-studies",
        actionText: "View Clinical Case Studies",
      },
      {
        title: "Hospital Events & Camps",
        desc: "Free health checkup camps, community medical drives, and CME scientific seminars.",
        badge: "Events & CME",
        actionType: "link",
        actionUrl: "/patientcare/events",
        actionText: "View Events & Camps",
      },
      {
        title: "Health Library & Articles",
        desc: "80+ doctor-verified health articles, wellness guides, and preventive healthcare tips.",
        badge: "Health Library",
        actionType: "link",
        actionUrl: "/health-library",
        actionText: "Open Health Library",
      },
      {
        title: "Careers & Job Vacancies",
        desc: "Current medical, nursing, paramedical, and administrative job openings.",
        badge: "Careers",
        actionType: "link",
        actionUrl: "/careers",
        actionText: "View Career Openings",
      },
      {
        title: "About Us & Leadership",
        desc: "Hospital history, NABH quality accreditations, infrastructure & medical leadership.",
        badge: "About Apollo",
        actionType: "link",
        actionUrl: "/aboutus",
        actionText: "Learn About Us",
      },
      {
        title: "Contact Us & Directions",
        desc: "Hospital address, department direct phone numbers, email & interactive Google Map.",
        badge: "Contact Desk",
        actionType: "link",
        actionUrl: "/contact",
        actionText: "Contact Hospital",
      },
      {
        title: "Patient Portal Login",
        desc: "Sign in to access your appointment bookings, clinical reports, and medical history.",
        badge: "Portal Login",
        actionType: "link",
        actionUrl: "/login",
        actionText: "Sign In to Portal",
      },
      {
        title: "Hospital Home Page",
        desc: "Return to the main Apollo JBP Hospitals Jabalpur homepage.",
        badge: "Home",
        actionType: "link",
        actionUrl: "/",
        actionText: "Go to Home Page",
      },
    ],
    suggestions: [
      "Book Doctor Appointment",
      "24/7 Emergency Care",
      "Clinical Case Studies",
      "Hospital Events",
      "Centres of Excellence",
      "Doctors Directory",
    ],
  },

  // 7. Doctors Flow
  doctors: {
    text: "Apollo JBP Hospitals Jabalpur features over 49 specialist and super-specialist consultants across Cardiology, Oncology, Neuro Sciences, Orthopaedics, Gastro, Nephrology, and Critical Care.\n\nYou can explore doctor profiles, credentials, and OPD schedules here:",
    cards: [
      {
        title: "Full Doctors Directory",
        desc: "Search leading doctors by name, medical specialty, qualification, or condition treated.",
        badge: "49+ Consultants",
        actionType: "link",
        actionUrl: "/doctors",
        actionText: "View All Doctors",
      },
      {
        title: "Book Doctor Appointment",
        desc: "Select your preferred specialist and confirm an OPD consultation slot online.",
        badge: "Online Booking",
        actionType: "link",
        actionUrl: "/patientcare/appointment",
        actionText: "Schedule Appointment",
      },
    ],
    suggestions: [
      "Cardiology Doctors",
      "Oncology Doctors",
      "Orthopaedic Doctors",
      "Neuro Specialists",
      "OPD Timings",
    ],
  },

  // 8. Centres of Excellence Flow
  centresOfExcellence: {
    text: "Explore the Centres of Excellence at Apollo JBP Hospitals Jabalpur. Our 7 flagship institutes bring together multidisciplinary clinical teams, advanced diagnostic technology, and world-class inpatient care:",
    cards: [
      {
        title: "Centres of Excellence Hub",
        desc: "Comprehensive overview of all 7 specialized medical centres and their advanced treatment facilities.",
        badge: "Hub Overview",
        actionType: "link",
        actionUrl: "/centres-of-excellence",
        actionText: "Explore All Centres",
      },
      {
        title: "Cardiac Sciences Centre",
        desc: "24/7 STEMI interventional care, primary angioplasty, TAVI, and bypass cardiac surgery.",
        badge: "Heart Care",
        actionType: "link",
        actionUrl: "/centres-of-excellence/cardiac",
        actionText: "Explore Cardiac Centre",
      },
      {
        title: "Onco Sciences Centre",
        desc: "Precision oncology, multidisciplinary tumor board, surgical oncology, and targeted chemotherapy.",
        badge: "Cancer Care",
        actionType: "link",
        actionUrl: "/centres-of-excellence/onco",
        actionText: "Explore Onco Centre",
      },
      {
        title: "Neuro Sciences Centre",
        desc: "Acute stroke thrombolysis, neuro-navigation brain surgery, and endoscopic spine surgery.",
        badge: "Brain & Spine",
        actionType: "link",
        actionUrl: "/centres-of-excellence/neuro",
        actionText: "Explore Neuro Centre",
      },
      {
        title: "Gastro Sciences Centre",
        desc: "Advanced liver care, therapeutic GI endoscopy, ERCP, and surgical gastroenterology.",
        badge: "Digestive & Liver",
        actionType: "link",
        actionUrl: "/centres-of-excellence/gastro",
        actionText: "Explore Gastro Centre",
      },
      {
        title: "Nephro Sciences Centre",
        desc: "24/7 hemodialysis, chronic kidney disease (CKD) management, and renal care.",
        badge: "Kidney Care",
        actionType: "link",
        actionUrl: "/centres-of-excellence/nephro",
        actionText: "Explore Nephro Centre",
      },
      {
        title: "Ortho-Joint and Spine Sciences",
        desc: "Robotic joint replacements, sports medicine arthroscopy, and complex fracture trauma surgery.",
        badge: "Joint & Spine",
        actionType: "link",
        actionUrl: "/centres-of-excellence/ortho-joint-spine",
        actionText: "Explore Ortho Centre",
      },
      {
        title: "Critical Care Centre",
        desc: "Level-1 multi-bed ICU, CCU, neuro ICU, and round-the-clock intensivist coverage.",
        badge: "ICU & Critical",
        actionType: "link",
        actionUrl: "/centres-of-excellence/critical-care",
        actionText: "Explore Critical Care",
      },
    ],
    suggestions: [
      "Cardiac Sciences",
      "Onco Sciences",
      "Neuro Sciences",
      "Gastro Sciences",
      "Nephro Sciences",
      "Ortho-Joint & Spine",
      "Critical Care",
    ],
  },

  // 9. Specialities Flow
  specialities: {
    text: "Apollo JBP Hospitals features over 37 clinical specialties and surgical sub-specialties providing end-to-end medical care under one roof:",
    cards: [
      {
        title: "All 37+ Clinical Specialities",
        desc: "Explore every department including Cardiology, Oncology, Orthopaedics, Pediatrics, Urology, ENT, and more.",
        badge: "37+ Specialities",
        actionType: "link",
        actionUrl: "/ourspecialities",
        actionText: "Browse Specialities",
      },
      {
        title: "Patient Care Specialities",
        desc: "Dedicated clinical services tailored for patient recovery, rehabilitation, and long-term wellness.",
        actionType: "link",
        actionUrl: "/ourspecialities",
        actionText: "Patient Care Departments",
      },
      {
        title: "Book Specialty Consultation",
        desc: "Book an appointment with specialist consultants across any department.",
        actionType: "link",
        actionUrl: "/patientcare/appointment",
        actionText: "Book Appointment",
      },
    ],
    suggestions: [
      "Cardiology",
      "Neurology",
      "Oncology",
      "Orthopaedics",
      "Gastroenterology",
      "Nephrology",
      "Pediatrics",
      "Urology",
      "View All Specialities",
    ],
  },

  // 10. Health Library Flow
  healthLibrary: {
    text: "Our Health Library is a comprehensive repository of medical education, disease prevention guides, and healthcare articles authored and reviewed by our clinical experts:",
    cards: [
      {
        title: "Apollo Health Library",
        desc: "Access 80+ doctor-curated articles covering heart health, diabetes, cancer awareness, lifestyle, and seasonal wellness.",
        badge: "Medical Knowledge",
        actionType: "link",
        actionUrl: "/health-library",
        actionText: "Explore Health Library",
      },
      {
        title: "Book Preventive Health Check",
        desc: "Schedule a comprehensive health checkup package to monitor your wellness metrics.",
        actionType: "link",
        actionUrl: "/patientcare/appointment",
        actionText: "Book Health Check",
      },
    ],
    suggestions: [
      "ProHealth Checkup Packages",
      "Clinical Case Studies",
      "Hospital Events & Camps",
      "Book Doctor Appointment",
    ],
  },

  // 11. Careers Flow
  careers: {
    text: "Join the healthcare team at Apollo JBP Hospitals Jabalpur. We offer dynamic career opportunities across medical, nursing, paramedical, allied health, and administrative disciplines:",
    cards: [
      {
        title: "Careers & Open Positions",
        desc: "Explore current openings for Staff Nurses, Medical Officers (MBBS), Technicians, Pharmacists, Dieticians, and Managers.",
        badge: "We Are Hiring",
        actionType: "link",
        actionUrl: "/careers",
        actionText: "Browse Job Vacancies",
      },
      {
        title: "HR & Recruitment Helpdesk",
        desc: "Connect directly with our hospital human resources and talent acquisition team.",
        actionType: "link",
        actionUrl: "/contact",
        actionText: "Contact HR Desk",
      },
    ],
    suggestions: [
      "About Apollo Jabalpur",
      "Hospital Leadership",
      "Contact Hospital",
      "All Pages Directory",
    ],
  },

  // 12. About Us Flow
  aboutUs: {
    text: "Apollo JBP Hospitals Jabalpur is Madhya Pradesh's premier multi-speciality tertiary care hospital, bringing world-class healthcare, NABH quality standards, and clinical excellence to Central India.",
    cards: [
      {
        title: "About Apollo JBP Hospitals",
        desc: "Discover our mission, hospital infrastructure, advanced modular operation theatres, clinical leadership, and patient-first ethos.",
        badge: "About Us",
        actionType: "link",
        actionUrl: "/aboutus",
        actionText: "Read Our Story",
      },
      {
        title: "Centres of Excellence",
        desc: "Explore our 7 specialized institutes delivering international quality medical care.",
        actionType: "link",
        actionUrl: "/centres-of-excellence",
        actionText: "View Centres of Excellence",
      },
      {
        title: "Contact & Hospital Location",
        desc: "Get location address, navigation directions, and hospital reception contacts.",
        actionType: "link",
        actionUrl: "/contact",
        actionText: "View Hospital Details",
      },
    ],
    suggestions: [
      "Centres of Excellence",
      "Doctors Directory",
      "Careers",
      "All Pages Directory",
    ],
  },

  // 13. Contact Flow
  contact: {
    text: "📍 **Apollo JBP Hospitals Jabalpur - Contact & Directions**\n\nGlobal Square, Patan Road, Karmeta, Jabalpur, Madhya Pradesh 482002, India.\n\n• **Main Reception**: +91 7566 123666\n• **24/7 Emergency Code**: 1066 / 1800-123-6666\n• **Railway Station**: ~7 km | **Dumna Airport**: ~22 km",
    cards: [
      {
        title: "Contact Us & Department Helplines",
        desc: "Find detailed department phone extensions, inquiry forms, and international patient desk contacts.",
        badge: "Contact Page",
        actionType: "link",
        actionUrl: "/contact",
        actionText: "Open Contact Page",
      },
      {
        title: "Google Maps GPS Directions",
        desc: "Get instant turn-by-turn driving directions to Apollo JBP Hospitals on Google Maps.",
        actionType: "link",
        actionUrl: "https://maps.google.com/?q=Apollo+JBP+Hospitals+Jabalpur",
        actionText: "Open in Google Maps",
      },
      {
        title: "Call Reception Directly",
        desc: "Speak with our front-desk customer relationship officer for assistance.",
        actionType: "call",
        actionUrl: "tel:+917566123666",
        actionText: "Call +91 7566 123666",
      },
    ],
    suggestions: [
      "OPD Timings & Visiting Hours",
      "I want to book appointment",
      "24/7 Emergency Care",
      "All Pages Directory",
    ],
  },

  // 14. Login / Patient Portal Flow
  login: {
    text: "You can sign in to the Apollo Patient Portal to manage your appointments, review medical reports, and view consultation histories securely:",
    cards: [
      {
        title: "Patient Portal Login",
        desc: "Log in with your registered mobile number or email credentials to access your health records.",
        badge: "Secure Portal",
        actionType: "link",
        actionUrl: "/login",
        actionText: "Go to Login Page",
      },
      {
        title: "Book New Appointment",
        desc: "Need to book a new appointment without signing in? Use our fast-track booking portal.",
        actionType: "link",
        actionUrl: "/patientcare/appointment",
        actionText: "Book Appointment Online",
      },
    ],
    suggestions: [
      "Book Doctor Appointment",
      "Find Doctors",
      "Contact Reception",
      "All Pages Directory",
    ],
  },

  // 15. Health Check Flow
  healthCheck: {
    text: "Preventive health screenings are essential for early detection and long-term wellness. Apollo JBP Hospitals Jabalpur offers tailored ProHealth health check packages:",
    cards: [
      {
        title: "Apollo ProHealth Comprehensive",
        desc: "Complete checkup including CBC, Lipid Profile, Liver Function, Kidney Function, ECG, Chest X-Ray & Physician Consultation.",
        badge: "Most Popular",
        actionType: "link",
        actionUrl: "/patientcare/appointment",
        actionText: "Enquire & Book Package",
      },
      {
        title: "Cardiac Well-being Checkup",
        desc: "Specialized for heart health: Echo, TMT/Stress Test, Lipid Panel, Blood Sugar, and Senior Cardiologist review.",
        badge: "Cardiac Care",
        actionType: "link",
        actionUrl: "/patientcare/appointment",
        actionText: "Schedule Heart Check",
      },
      {
        title: "Senior Citizen Wellness Package",
        desc: "Holistic screening covering bone density, kidney, diabetes, eye, and comprehensive geriatric assessment.",
        badge: "Senior Care",
        actionType: "link",
        actionUrl: "/patientcare/appointment",
        actionText: "Book for Senior",
      },
    ],
    infoNote:
      "Tip: 10-12 hours of overnight fasting is recommended for accurate blood and lipid profile results.",
    suggestions: [
      "Book Doctor Appointment",
      "Centres of Excellence",
      "Hospital Contact & Location",
      "All Pages Directory",
    ],
  },

  // 16. International Patients Flow
  international: {
    text: "Apollo Hospitals Jabalpur welcomes patients from around the world with world-class clinical expertise, dedicated concierge care, and transparent treatment pricing.",
    cards: [
      {
        title: "Dedicated International Services",
        desc: "• Complimentary Medical Opinion & Cost Estimates\n• Medical Visa (M-Visa) Invitation Letters\n• Airport Pick-up & Local Accommodation Guidance\n• Language Interpreters & Dedicated Care Coordinator",
        actionType: "link",
        actionUrl: "/contact",
        actionText: "Connect with International Desk",
      },
      {
        title: "International Patient Helpline",
        desc: "Speak with our international patient relations officer or write to our care team directly.",
        actionType: "call",
        actionUrl: "tel:+917566123666",
        actionText: "Call +91 7566 123666",
      },
    ],
    suggestions: [
      "Centres of Excellence",
      "Find Specialist Doctors",
      "Contact Hospital",
      "All Pages Directory",
    ],
  },

  // 17. Legal Flow
  legal: {
    text: "Apollo JBP Hospitals adheres strictly to statutory healthcare regulations, data privacy compliance, and transparent terms of service:",
    cards: [
      {
        title: "Privacy Policy",
        desc: "Read our comprehensive policy on patient data confidentiality, medical record security, and digital privacy.",
        badge: "Compliance",
        actionType: "link",
        actionUrl: "/privacy-policy",
        actionText: "Read Privacy Policy",
      },
      {
        title: "Terms of Service",
        desc: "Review website terms of use, online consultation guidelines, and digital patient disclaimers.",
        badge: "Terms of Use",
        actionType: "link",
        actionUrl: "/terms-of-service",
        actionText: "Read Terms of Service",
      },
    ],
    suggestions: [
      "About Apollo Jabalpur",
      "Contact Hospital",
      "All Pages Directory",
      "Go to Home Page",
    ],
  },

  // 18. Home Page Flow
  home: {
    text: "Welcome to Apollo JBP Hospitals Jabalpur! You can return to our homepage or navigate to any section of the website:",
    cards: [
      {
        title: "Apollo Hospital Homepage",
        desc: "Visit the main homepage for fast-track appointments, doctor directory, and clinical highlights.",
        badge: "Main Website",
        actionType: "link",
        actionUrl: "/",
        actionText: "Go to Homepage",
      },
      {
        title: "Explore All Website Pages",
        desc: "View our comprehensive sitemap directory to navigate anywhere across the website.",
        badge: "Directory",
        actionType: "link",
        actionUrl: "/patientcare",
        actionText: "View Patient Care Portal",
      },
    ],
    suggestions: [
      "Book Doctor Appointment",
      "24/7 Emergency Care",
      "Clinical Case Studies",
      "Hospital Events",
      "All Pages Directory",
    ],
  },
};

// Word boundary matching helper to prevent false positive substring collisions
function matchesWord(text, word) {
  const escaped = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(?:^|[^a-z0-9])${escaped}(?:$|[^a-z0-9])`, "i").test(text);
}

// Natural language query processor and smart routing engine
export function generateBotResponse(userInput) {
  if (!userInput) return FLOW_RESPONSES.appointment;
  const rawInput = userInput.trim();
  const query = rawInput.toLowerCase();

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. ALL PAGES / SITEMAP / DIRECTORY / NAVIGATION ROUTING
  // ─────────────────────────────────────────────────────────────────────────────
  if (
    query === "all pages" ||
    query === "pages" ||
    query.includes("all page") ||
    query.includes("all route") ||
    query.includes("sitemap") ||
    query.includes("directory") ||
    query.includes("navigation") ||
    matchesWord(query, "menu") ||
    query.includes("explore pages") ||
    query.includes("where can i go") ||
    query.includes("all links") ||
    query.includes("show me pages") ||
    query.includes("website pages") ||
    query.includes("every page") ||
    query.includes("hospital routes")
  ) {
    return FLOW_RESPONSES.allPages;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. 24/7 EMERGENCY & AMBULANCE ROUTING
  // ─────────────────────────────────────────────────────────────────────────────
  if (
    query.includes("emergency") ||
    query.includes("trauma") ||
    query.includes("casualty") ||
    query.includes("urgent") ||
    query.includes("heart attack") ||
    query.includes("cardiac arrest") ||
    query.includes("stroke") ||
    query.includes("accident") ||
    matchesWord(query, "1066") ||
    matchesWord(query, "er") ||
    query.includes("er page") ||
    query.includes("emergency page")
  ) {
    return FLOW_RESPONSES.emergency;
  }

  if (
    query.includes("ambulance") ||
    query.includes("als ambulance") ||
    query.includes("bls ambulance") ||
    query.includes("mobile icu") ||
    query.includes("patient transport")
  ) {
    return FLOW_RESPONSES.ambulance;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. PATIENT CARE OVERVIEW ROUTING (Explicitly matched before sub-keywords)
  // ─────────────────────────────────────────────────────────────────────────────
  if (
    query === "patient care" ||
    query === "patientcare" ||
    query.includes("patient care overview") ||
    query.includes("patient services") ||
    query.includes("inpatient") ||
    query.includes("outpatient") ||
    query.includes("hospital services")
  ) {
    return {
      text: "The Apollo Patient Care division offers comprehensive inpatient care, round-the-clock emergency transport, online appointment scheduling, and patient support amenities:",
      cards: [
        {
          title: "Patient Care Portal",
          desc: "Complete patient services overview, hospital amenities, admission guides, and visitor rules.",
          badge: "Patient Care",
          actionType: "link",
          actionUrl: "/patientcare",
          actionText: "Visit Patient Care",
        },
        {
          title: "Book Doctor Appointment",
          desc: "Schedule consultation with specialist doctors online.",
          badge: "Appointments",
          actionType: "link",
          actionUrl: "/patientcare/appointment",
          actionText: "Book Appointment",
        },
        {
          title: "24/7 Ambulance Services",
          desc: "Mobile ICU ambulance transport with rapid emergency dispatch.",
          badge: "Ambulance",
          actionType: "link",
          actionUrl: "/patientcare/ambulance",
          actionText: "Ambulance Page",
        },
        {
          title: "Clinical Case Studies",
          desc: "Explore breakthrough medical achievements and cured cases.",
          badge: "Case Studies",
          actionType: "link",
          actionUrl: "/patientcare/case-studies",
          actionText: "View Case Studies",
        },
        {
          title: "Hospital Events & Camps",
          desc: "Free health checkup camps and community outreach drives.",
          badge: "Events",
          actionType: "link",
          actionUrl: "/patientcare/events",
          actionText: "View Events",
        },
      ],
      suggestions: [
        "Book Doctor Appointment",
        "24/7 Emergency Care",
        "Clinical Case Studies",
        "Hospital Events",
        "All Pages Directory",
      ],
    };
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 4. EVENTS & HEALTH CAMPS ROUTING
  // ─────────────────────────────────────────────────────────────────────────────
  if (
    query.includes("event") ||
    query.includes("events") ||
    matchesWord(query, "camp") ||
    matchesWord(query, "camps") ||
    matchesWord(query, "cme") ||
    query.includes("seminar") ||
    query.includes("webinar") ||
    query.includes("health camp") ||
    query.includes("free checkup") ||
    query.includes("checkup camp") ||
    query.includes("bageshwar")
  ) {
    // Specific event slug queries
    if (query.includes("kidney camp") || query.includes("pediatric nephrology")) {
      return {
        text: "Here are details for our Pediatric Nephrology Free Checkup Camp:",
        cards: [
          {
            title: "Pediatric Nephrology Free Checkup Camp",
            desc: "Expert children's kidney health consultation, diagnostic screening & expert guidance.",
            badge: "Free Camp",
            actionType: "link",
            actionUrl: "/patientcare/events/pediatric-nephrology-free-checkup-camp",
            actionText: "View Event Details",
          },
          {
            title: "All Events & Camps",
            desc: "Explore all upcoming community health camps and academic seminars.",
            actionType: "link",
            actionUrl: "/patientcare/events",
            actionText: "View All Events",
          },
        ],
        suggestions: ["All Events", "Book Appointment", "Clinical Case Studies"],
      };
    }

    if (query.includes("fibroscan") || query.includes("fatty liver")) {
      return {
        text: "Here are details for our FibroScan for Fatty Liver Free Health Camp:",
        cards: [
          {
            title: "FibroScan for Fatty Liver Camp",
            desc: "Non-invasive, fast liver stiffness measurement & consultation for fatty liver disease.",
            badge: "Free Camp",
            actionType: "link",
            actionUrl: "/patientcare/events/fibro-scan-for-fatty-liver-free-health-checkup-camp",
            actionText: "View Event Details",
          },
          {
            title: "Gastro Sciences Centre",
            desc: "Learn about advanced hepatology and digestive care at Apollo JBP Hospitals.",
            actionType: "link",
            actionUrl: "/centres-of-excellence/gastro",
            actionText: "Explore Gastro Centre",
          },
        ],
        suggestions: ["All Events", "Gastro Sciences", "Book Appointment"],
      };
    }

    return FLOW_RESPONSES.events;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 5. CLINICAL CASE STUDIES ROUTING
  // ─────────────────────────────────────────────────────────────────────────────
  if (
    query.includes("case study") ||
    query.includes("case studies") ||
    query.includes("casestudies") ||
    query.includes("clinical case") ||
    query.includes("clinical cases") ||
    query.includes("breakthrough") ||
    query.includes("research case") ||
    query.includes("patient stories") ||
    query.includes("success stories")
  ) {
    // Specific case study queries
    if (query.includes("pancreatitis")) {
      return {
        text: "Read our clinical case study on Multidisciplinary Management of Chronic Pancreatitis:",
        cards: [
          {
            title: "Chronic Pancreatitis Case Study",
            desc: "Interventional endoscopy and surgical breakthrough for complicated chronic pancreatitis.",
            badge: "Clinical Case",
            actionType: "link",
            actionUrl: "/patientcare/case-studies/chronic-pancreatitis",
            actionText: "Read Pancreatitis Case",
          },
          {
            title: "View All Case Studies",
            desc: "Explore other breakthrough cases in oncology, cardiology, and general surgery.",
            actionType: "link",
            actionUrl: "/patientcare/case-studies",
            actionText: "All Case Studies",
          },
        ],
        suggestions: ["Gastro Sciences", "All Case Studies", "Book Appointment"],
      };
    }

    if (query.includes("cervical cancer") || query.includes("cancer case")) {
      return {
        text: "Read our clinical case study on Stage IIIB Cervical Cancer Multimodality Treatment:",
        cards: [
          {
            title: "Stage IIIB Cervical Cancer Case Study",
            desc: "Advanced oncology intervention achieving successful complete clinical remission.",
            badge: "Oncology Case",
            actionType: "link",
            actionUrl: "/patientcare/case-studies/stage-iiib-cervical-cancer",
            actionText: "Read Cancer Case",
          },
          {
            title: "Onco Sciences Centre",
            desc: "Explore our Comprehensive Cancer Care Centre and tumor board.",
            actionType: "link",
            actionUrl: "/centres-of-excellence/onco",
            actionText: "Explore Oncology",
          },
        ],
        suggestions: ["Onco Sciences", "All Case Studies", "Book Appointment"],
      };
    }

    return FLOW_RESPONSES.caseStudies;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 6. APPOINTMENTS & OPD BOOKING
  // ─────────────────────────────────────────────────────────────────────────────
  if (
    query.includes("appointment") ||
    query.includes("book appointment") ||
    matchesWord(query, "opd") ||
    matchesWord(query, "consult") ||
    query.includes("consultation") ||
    matchesWord(query, "slot") ||
    query.includes("doctor appointment")
  ) {
    return FLOW_RESPONSES.appointment;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 7. HEALTH CHECK PACKAGES
  // ─────────────────────────────────────────────────────────────────────────────
  if (
    query.includes("health check") ||
    query.includes("checkup") ||
    matchesWord(query, "package") ||
    matchesWord(query, "packages") ||
    query.includes("prohealth") ||
    query.includes("screening") ||
    query.includes("full body check")
  ) {
    return FLOW_RESPONSES.healthCheck;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 8. DOCTOR INQUIRIES & DIRECTORY
  // ─────────────────────────────────────────────────────────────────────────────
  if (
    query.includes("doctor") ||
    query.includes("specialist") ||
    query.includes("physician") ||
    query.includes("surgeon") ||
    query.includes("consultant") ||
    query.includes("find doctor") ||
    matchesWord(query, "dr")
  ) {
    return FLOW_RESPONSES.doctors;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 9. CENTRES OF EXCELLENCE (All 7 Individual Centres)
  // ─────────────────────────────────────────────────────────────────────────────
  if (
    query.includes("cardio") ||
    query.includes("heart") ||
    query.includes("tavi") ||
    query.includes("angioplasty") ||
    query.includes("bypass") ||
    matchesWord(query, "stemi") ||
    query.includes("cardiac")
  ) {
    return {
      text: "Our Cardiac Sciences Centre of Excellence provides 24/7 STEMI interventional care, primary angioplasty, TAVI, bypass surgery, and electrophysiology under senior cardiologists and cardiac surgeons.",
      cards: [
        {
          title: "Cardiac Sciences Centre",
          desc: "World-class catheterization labs, cardiac ICU, and robotic cardiac interventions.",
          badge: "Centre of Excellence",
          actionType: "link",
          actionUrl: "/centres-of-excellence/cardiac",
          actionText: "Explore Cardiac Centre",
        },
        {
          title: "Cardiology Department",
          desc: "View outpatient cardiology consulting services, diagnostics & doctors.",
          badge: "Speciality",
          actionType: "link",
          actionUrl: "/ourspecialities/cardiology",
          actionText: "Cardiology Speciality",
        },
        {
          title: "Book Cardiac Appointment",
          desc: "Schedule a consultation with our senior cardiologist.",
          actionType: "link",
          actionUrl: "/patientcare/appointment",
          actionText: "Book Appointment",
        },
      ],
      suggestions: [
        "Centres of Excellence Hub",
        "Book Doctor Appointment",
        "24/7 Emergency Care",
        "All Pages Directory",
      ],
    };
  }

  if (
    query.includes("cancer") ||
    query.includes("onco") ||
    query.includes("chemo") ||
    query.includes("radiation") ||
    query.includes("tumor") ||
    query.includes("cyberknife")
  ) {
    return {
      text: "The Apollo Comprehensive Cancer Care Centre offers precision oncology, medical oncology, surgical oncology, targeted chemotherapy, and immunotherapy backed by multidisciplinary tumor boards.",
      cards: [
        {
          title: "Onco Sciences Centre",
          desc: "Advanced cancer screening, tumor profiling, chemo daycare, and compassionate oncology care.",
          badge: "Centre of Excellence",
          actionType: "link",
          actionUrl: "/centres-of-excellence/onco",
          actionText: "Explore Onco Centre",
        },
        {
          title: "Oncology Department",
          desc: "Consult our senior medical and surgical oncologists.",
          badge: "Speciality",
          actionType: "link",
          actionUrl: "/ourspecialities/oncology",
          actionText: "Oncology Speciality",
        },
        {
          title: "Cancer Case Studies",
          desc: "Read peer-reviewed case reports on complex cancer recoveries.",
          actionType: "link",
          actionUrl: "/patientcare/case-studies/stage-iiib-cervical-cancer",
          actionText: "Read Cancer Case Study",
        },
      ],
      suggestions: [
        "Book Oncology Appointment",
        "Centres of Excellence Hub",
        "Doctors Directory",
        "All Pages Directory",
      ],
    };
  }

  if (
    query.includes("neuro") ||
    query.includes("brain") ||
    query.includes("stroke") ||
    query.includes("neurosurgery") ||
    query.includes("neurology")
  ) {
    return {
      text: "Our Neuro Sciences Institute features 24/7 Acute Stroke thrombolysis, neuro-navigation brain surgery, endoscopic spine surgery, and neurological critical care.",
      cards: [
        {
          title: "Neuro Sciences Centre",
          desc: "Comprehensive brain, spine, and stroke recovery care with 24/7 emergency response.",
          badge: "Centre of Excellence",
          actionType: "link",
          actionUrl: "/centres-of-excellence/neuro",
          actionText: "Explore Neuro Centre",
        },
        {
          title: "Neurology Speciality",
          desc: "Outpatient neuro consultations, EEG, EMG, and neuropathy clinics.",
          badge: "Speciality",
          actionType: "link",
          actionUrl: "/ourspecialities/neurology",
          actionText: "Neurology Speciality",
        },
        {
          title: "Book Neuro Consultation",
          desc: "Consult our senior neurologists and neurosurgeons.",
          actionType: "link",
          actionUrl: "/patientcare/appointment",
          actionText: "Book Appointment",
        },
      ],
      suggestions: [
        "Centres of Excellence Hub",
        "24/7 Emergency Care",
        "Doctors Directory",
        "All Pages Directory",
      ],
    };
  }

  if (
    query.includes("gastro") ||
    query.includes("liver") ||
    query.includes("digestive") ||
    query.includes("endoscopy") ||
    query.includes("pancreas") ||
    query.includes("hepatology")
  ) {
    return {
      text: "Our Gastro Sciences Centre of Excellence specializes in advanced digestive disease care, liver cirrhosis, GI bleeding interventions, ERCP, and laparoscopic surgical gastroenterology.",
      cards: [
        {
          title: "Gastro Sciences Centre",
          desc: "Digestive health institute, endoscopy suites, hepatology clinics, and advanced GI surgery.",
          badge: "Centre of Excellence",
          actionType: "link",
          actionUrl: "/centres-of-excellence/gastro",
          actionText: "Explore Gastro Centre",
        },
        {
          title: "Gastroenterology Speciality",
          desc: "Explore clinical gastro services, diagnostics, and consulting doctors.",
          badge: "Speciality",
          actionType: "link",
          actionUrl: "/ourspecialities/gastroenterology",
          actionText: "Gastro Speciality",
        },
        {
          title: "FibroScan Liver Camp",
          desc: "Learn about our free fatty liver screening camps and liver health drives.",
          actionType: "link",
          actionUrl: "/patientcare/events/fibro-scan-for-fatty-liver-free-health-checkup-camp",
          actionText: "View Liver Camp",
        },
      ],
      suggestions: [
        "Book Gastro Consultation",
        "Centres of Excellence Hub",
        "Clinical Case Studies",
        "All Pages Directory",
      ],
    };
  }

  if (
    query.includes("nephro") ||
    query.includes("kidney") ||
    query.includes("dialysis") ||
    query.includes("renal")
  ) {
    return {
      text: "Our Nephro Sciences Centre of Excellence provides round-the-clock hemodialysis, chronic kidney disease (CKD) staging, renal dietetics, and kidney disease consultations.",
      cards: [
        {
          title: "Nephro Sciences Centre",
          desc: "24/7 Hemodialysis unit, acute renal failure treatment, and preventive nephrology care.",
          badge: "Centre of Excellence",
          actionType: "link",
          actionUrl: "/centres-of-excellence/nephro",
          actionText: "Explore Nephro Centre",
        },
        {
          title: "Nephrology Speciality",
          desc: "Outpatient nephrology consultations and clinical kidney care.",
          badge: "Speciality",
          actionType: "link",
          actionUrl: "/ourspecialities/nephrology",
          actionText: "Nephrology Speciality",
        },
        {
          title: "Pediatric Nephrology Camp",
          desc: "Free kidney health consultation camp organized for children.",
          actionType: "link",
          actionUrl: "/patientcare/events/pediatric-nephrology-free-checkup-camp",
          actionText: "View Camp Details",
        },
      ],
      suggestions: [
        "Book Nephrology Appointment",
        "Centres of Excellence Hub",
        "All Pages Directory",
      ],
    };
  }

  if (
    query.includes("ortho") ||
    query.includes("joint") ||
    matchesWord(query, "bone") ||
    matchesWord(query, "bones") ||
    matchesWord(query, "knee") ||
    matchesWord(query, "hip") ||
    query.includes("fracture") ||
    matchesWord(query, "spine")
  ) {
    return {
      text: "The Ortho-Joint and Spine Sciences Centre specializes in robotic knee & hip replacement, sports arthroscopy, fracture trauma, and minimally invasive spine surgery.",
      cards: [
        {
          title: "Ortho-Joint & Spine Centre",
          desc: "Advanced robotic reconstructions, joint replacement, spine surgery, and rapid rehabilitation.",
          badge: "Centre of Excellence",
          actionType: "link",
          actionUrl: "/centres-of-excellence/ortho-joint-spine",
          actionText: "Explore Ortho Centre",
        },
        {
          title: "Orthopaedics Speciality",
          desc: "Meet our senior orthopaedic surgeons and bone health specialists.",
          badge: "Speciality",
          actionType: "link",
          actionUrl: "/ourspecialities/orthopaedics",
          actionText: "Orthopaedics Speciality",
        },
        {
          title: "Book Orthopaedic Appointment",
          desc: "Schedule a joint or spine consultation.",
          actionType: "link",
          actionUrl: "/patientcare/appointment",
          actionText: "Book Appointment",
        },
      ],
      suggestions: [
        "Senior Wellness Package",
        "Centres of Excellence Hub",
        "Doctors Directory",
        "All Pages Directory",
      ],
    };
  }

  if (
    query.includes("critical care") ||
    matchesWord(query, "icu") ||
    matchesWord(query, "ccu") ||
    query.includes("intensive care") ||
    query.includes("intensivist")
  ) {
    return {
      text: "Our Critical Care Institute features Level-1 multi-disciplinary ICUs, dedicated cardiac CCU, neuro ICU, and 24/7 intensivist medical supervision for life-support management.",
      cards: [
        {
          title: "Critical Care Centre of Excellence",
          desc: "Advanced hemodynamic monitoring, mechanical ventilation, and 24/7 intensivist care.",
          badge: "Centre of Excellence",
          actionType: "link",
          actionUrl: "/centres-of-excellence/critical-care",
          actionText: "Explore Critical Care",
        },
        {
          title: "24/7 Emergency Care",
          desc: "Level-1 emergency trauma care and resuscitation units.",
          badge: "Emergency ER",
          actionType: "link",
          actionUrl: "/emergency",
          actionText: "Go to Emergency Page",
        },
        {
          title: "24/7 Ambulance Services",
          desc: "Advanced Life Support mobile ICU ambulances.",
          badge: "Ambulance",
          actionType: "link",
          actionUrl: "/patientcare/ambulance",
          actionText: "Ambulance Services",
        },
      ],
      suggestions: [
        "24/7 Emergency Care",
        "Ambulance Services",
        "Centres of Excellence Hub",
        "All Pages Directory",
      ],
    };
  }

  // Hub Centres of Excellence match
  if (
    query.includes("centres of excellence") ||
    query.includes("centers of excellence") ||
    query.includes("centre of excellence") ||
    query.includes("center of excellence") ||
    matchesWord(query, "coe") ||
    query.includes("institutes")
  ) {
    return FLOW_RESPONSES.centresOfExcellence;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 10. SPECIALITIES & CLINICAL DEPARTMENTS ROUTING
  // ─────────────────────────────────────────────────────────────────────────────
  if (
    query.includes("specialities") ||
    query.includes("specialties") ||
    query.includes("departments") ||
    query.includes("clinical departments") ||
    query === "ourspecialities"
  ) {
    return FLOW_RESPONSES.specialities;
  }

  // Specific specialty keyword matching
  if (query.includes("urology") || query.includes("urologist") || query.includes("prostate") || query.includes("urinary")) {
    return {
      text: "Our Urology Department offers advanced endourology, laser prostate surgery, kidney stone removal, and uro-oncology.",
      cards: [
        {
          title: "Urology Department",
          desc: "Laser kidney stone removal, prostate care, and reconstructive urology.",
          badge: "Speciality",
          actionType: "link",
          actionUrl: "/ourspecialities/urologist",
          actionText: "Explore Urology",
        },
        {
          title: "Book Urology Appointment",
          desc: "Schedule a visit with our urology consultants.",
          actionType: "link",
          actionUrl: "/patientcare/appointment",
          actionText: "Book Appointment",
        },
      ],
      suggestions: ["Nephro Sciences", "All Specialities", "Doctors Directory"],
    };
  }

  if (
    query.includes("pediatric") ||
    query.includes("pediatrics") ||
    query.includes("paediatric") ||
    matchesWord(query, "child") ||
    matchesWord(query, "children") ||
    query.includes("neonatal") ||
    query.includes("neonatology") ||
    matchesWord(query, "baby")
  ) {
    return {
      text: "Our Pediatric and Neonatology Department provides comprehensive child healthcare, NICU critical care, pediatric vaccinations, and growth monitoring.",
      cards: [
        {
          title: "Pediatric & Neonatology",
          desc: "Advanced Level-3 NICU, newborn care, pediatric intensive care, and immunization.",
          badge: "Speciality",
          actionType: "link",
          actionUrl: "/ourspecialities/pediatric-neonatology",
          actionText: "Explore Pediatrics",
        },
        {
          title: "Pediatric Nephrology Camp",
          desc: "Read about our free pediatric kidney consultation camps.",
          actionType: "link",
          actionUrl: "/patientcare/events/pediatric-nephrology-free-checkup-camp",
          actionText: "View Event Details",
        },
        {
          title: "Book Pediatric Appointment",
          desc: "Book a consultation with our child specialists.",
          actionType: "link",
          actionUrl: "/patientcare/appointment",
          actionText: "Book Appointment",
        },
      ],
      suggestions: ["All Specialities", "Doctors Directory", "All Pages Directory"],
    };
  }

  if (
    query.includes("gynae") ||
    query.includes("gynecology") ||
    query.includes("gynaecology") ||
    query.includes("obstetrics") ||
    query.includes("pregnancy") ||
    query.includes("maternity") ||
    matchesWord(query, "women")
  ) {
    return {
      text: "Our Obstetrics & Gynaecology Department provides complete women's healthcare, high-risk pregnancy management, painless deliveries, and laparoscopic gynecological surgeries.",
      cards: [
        {
          title: "Obstetrics & Gynaecology",
          desc: "Comprehensive maternity care, fetal medicine, gynecologic oncology, and infertility clinics.",
          badge: "Speciality",
          actionType: "link",
          actionUrl: "/ourspecialities/obstetrics-gynaecology",
          actionText: "Explore Gynaecology",
        },
        {
          title: "Book Gynae Consultation",
          desc: "Schedule an appointment with our senior female gynaecologists.",
          actionType: "link",
          actionUrl: "/patientcare/appointment",
          actionText: "Book Appointment",
        },
      ],
      suggestions: ["All Specialities", "Doctors Directory", "All Pages Directory"],
    };
  }

  if (
    query.includes("pulmonology") ||
    query.includes("pulmonologist") ||
    matchesWord(query, "lung") ||
    matchesWord(query, "lungs") ||
    query.includes("respiratory") ||
    query.includes("asthma") ||
    matchesWord(query, "chest")
  ) {
    return {
      text: "Our Pulmonology Department specializes in respiratory care, asthma, COPD, sleep apnea, and Mahakoshal's first advanced EBUS diagnostic technology.",
      cards: [
        {
          title: "Pulmonology Department",
          desc: "Advanced diagnostic bronchoscopy, EBUS, pulmonary function testing, and respiratory critical care.",
          badge: "Speciality",
          actionType: "link",
          actionUrl: "/ourspecialities/pulmonologist",
          actionText: "Explore Pulmonology",
        },
        {
          title: "EBUS Technology in Jabalpur",
          desc: "Read our health article on Endobronchial Ultrasound (EBUS) technology at Apollo JBP.",
          actionType: "link",
          actionUrl: "/health-library/ebus-procedure-in-jabalpur",
          actionText: "Read Health Article",
        },
        {
          title: "Book Pulmonology Consultation",
          desc: "Schedule a visit with our chest physician.",
          actionType: "link",
          actionUrl: "/patientcare/appointment",
          actionText: "Book Appointment",
        },
      ],
      suggestions: ["All Specialities", "Health Library", "All Pages Directory"],
    };
  }

  if (
    matchesWord(query, "ent") ||
    matchesWord(query, "ear") ||
    matchesWord(query, "ears") ||
    matchesWord(query, "nose") ||
    query.includes("throat")
  ) {
    return {
      text: "Our Ear, Nose & Throat (ENT) Department provides microscopic ear surgery, endoscopic sinus surgery, and head-neck evaluations.",
      cards: [
        {
          title: "Ear, Nose & Throat (ENT)",
          desc: "Comprehensive diagnostic audiometry, endoscopic sinus surgery, and ENT clinics.",
          badge: "Speciality",
          actionType: "link",
          actionUrl: "/ourspecialities/ear-throat-nose",
          actionText: "Explore ENT Department",
        },
        {
          title: "Book ENT Appointment",
          desc: "Book a consultation slot with our ENT specialist.",
          actionType: "link",
          actionUrl: "/patientcare/appointment",
          actionText: "Book Appointment",
        },
      ],
      suggestions: ["All Specialities", "Doctors Directory", "All Pages Directory"],
    };
  }

  if (
    matchesWord(query, "eye") ||
    matchesWord(query, "eyes") ||
    query.includes("ophthalmology") ||
    matchesWord(query, "vision") ||
    query.includes("cataract")
  ) {
    return {
      text: "Our Ophthalmology Department offers advanced eye examinations, cataract screening, glaucoma management, and diabetic retinopathy clinics.",
      cards: [
        {
          title: "Ophthalmology (Eye Care)",
          desc: "Comprehensive eye testing, cataract assessment, and ophthalmic surgery.",
          badge: "Speciality",
          actionType: "link",
          actionUrl: "/ourspecialities/ophthalmology",
          actionText: "Explore Ophthalmology",
        },
        {
          title: "Book Eye Consultation",
          desc: "Schedule an eye examination with our ophthalmologist.",
          actionType: "link",
          actionUrl: "/patientcare/appointment",
          actionText: "Book Appointment",
        },
      ],
      suggestions: ["All Specialities", "Doctors Directory", "All Pages Directory"],
    };
  }

  if (
    query.includes("dental") ||
    query.includes("dentist") ||
    matchesWord(query, "teeth") ||
    matchesWord(query, "tooth")
  ) {
    return {
      text: "Our Dental Sciences Department provides restorative dentistry, root canals, oral surgery, and cosmetic smile designs.",
      cards: [
        {
          title: "Dental Sciences Department",
          desc: "Advanced oral health treatments, root canals, and cosmetic dental procedures.",
          badge: "Speciality",
          actionType: "link",
          actionUrl: "/ourspecialities/dental",
          actionText: "Explore Dental Department",
        },
        {
          title: "Dental Case Study",
          desc: "Read our case report on Retreatment of a Crowned Tooth with Periapical Lesion.",
          actionType: "link",
          actionUrl: "/patientcare/case-studies/retreatment-crowned-tooth-periapical-lesion",
          actionText: "Read Dental Case",
        },
      ],
      suggestions: ["All Specialities", "Case Studies", "All Pages Directory"],
    };
  }

  if (
    matchesWord(query, "skin") ||
    query.includes("dermatology") ||
    query.includes("dermatologist")
  ) {
    return {
      text: "Our Dermatology Department treats clinical skin disorders, allergies, eczema, acne, and offers medical aesthetic consultations.",
      cards: [
        {
          title: "Dermatology Department",
          desc: "Comprehensive clinical dermatology, skin biopsy, and treatment for chronic skin conditions.",
          badge: "Speciality",
          actionType: "link",
          actionUrl: "/ourspecialities/dermatologist",
          actionText: "Explore Dermatology",
        },
        {
          title: "Book Skin Appointment",
          desc: "Schedule a consultation with our senior dermatologist.",
          actionType: "link",
          actionUrl: "/patientcare/appointment",
          actionText: "Book Appointment",
        },
      ],
      suggestions: ["All Specialities", "Doctors Directory", "All Pages Directory"],
    };
  }

  if (
    query.includes("general physician") ||
    query.includes("internal medicine") ||
    matchesWord(query, "fever") ||
    query.includes("infection")
  ) {
    return {
      text: "Our Internal Medicine and General Physician team provides holistic diagnosis and treatment for infectious diseases, diabetes, hypertension, and multi-system medical disorders.",
      cards: [
        {
          title: "Internal Medicine",
          desc: "Comprehensive diagnostic and therapeutic management of adult illnesses and chronic conditions.",
          badge: "Speciality",
          actionType: "link",
          actionUrl: "/ourspecialities/internal-medicine",
          actionText: "Explore Internal Medicine",
        },
        {
          title: "General Physician Clinic",
          desc: "Outpatient primary medical care and health evaluations.",
          badge: "Primary Care",
          actionType: "link",
          actionUrl: "/ourspecialities/general-physician",
          actionText: "General Physician",
        },
        {
          title: "Book Physician Consultation",
          desc: "Schedule a doctor consultation slot.",
          actionType: "link",
          actionUrl: "/patientcare/appointment",
          actionText: "Book Appointment",
        },
      ],
      suggestions: ["ProHealth Packages", "All Specialities", "All Pages Directory"],
    };
  }

  if (
    query.includes("general surgery") ||
    matchesWord(query, "hernia") ||
    query.includes("laparoscopic") ||
    query.includes("gallbladder") ||
    query.includes("gallstone")
  ) {
    return {
      text: "Our General & Laparoscopic Surgery Department performs minimally invasive abdominal, hernia, gallbladder, and emergency surgical procedures.",
      cards: [
        {
          title: "General Surgery Department",
          desc: "Minimally invasive laparoscopic surgical care with faster recovery and minimal scarring.",
          badge: "Speciality",
          actionType: "link",
          actionUrl: "/ourspecialities/general-surgeon",
          actionText: "Explore General Surgery",
        },
        {
          title: "Gallstone & Hernia Case Study",
          desc: "Read our published surgical case study on laparoscopic gallstone removal.",
          actionType: "link",
          actionUrl: "/patientcare/case-studies/gallstone-surgery",
          actionText: "Read Surgical Case",
        },
      ],
      suggestions: ["All Specialities", "Doctors Directory", "All Pages Directory"],
    };
  }

  if (
    query.includes("plastic surgery") ||
    query.includes("cosmetic") ||
    matchesWord(query, "burn")
  ) {
    return {
      text: "Our Plastic & Reconstructive Surgery Department offers trauma reconstruction, burn care, and cosmetic aesthetic surgeries.",
      cards: [
        {
          title: "Plastic Surgery Department",
          desc: "Microvascular reconstruction, trauma repair, burn rehabilitation, and cosmetic enhancements.",
          badge: "Speciality",
          actionType: "link",
          actionUrl: "/ourspecialities/plastic-surgen",
          actionText: "Explore Plastic Surgery",
        },
        {
          title: "Book Surgery Consultation",
          desc: "Book a confidential consultation with our reconstructive surgeon.",
          actionType: "link",
          actionUrl: "/patientcare/appointment",
          actionText: "Book Appointment",
        },
      ],
      suggestions: ["All Specialities", "Doctors Directory", "All Pages Directory"],
    };
  }

  if (
    query.includes("physiotherapy") ||
    matchesWord(query, "physio") ||
    matchesWord(query, "rehab") ||
    query.includes("exercise therapy")
  ) {
    return {
      text: "Our Physiotherapy & Physical Rehabilitation Department assists patients with post-surgical recovery, stroke rehabilitation, and musculoskeletal mobility.",
      cards: [
        {
          title: "Physiotherapy Department",
          desc: "Modern electrotherapy, exercise therapy, sports rehabilitation, and post-op recovery.",
          badge: "Speciality",
          actionType: "link",
          actionUrl: "/ourspecialities/physiotherepy",
          actionText: "Explore Physiotherapy",
        },
        {
          title: "Ortho & Spine Centre",
          desc: "Discover coordinated joint rehabilitation and orthopaedic care.",
          actionType: "link",
          actionUrl: "/centres-of-excellence/ortho-joint-spine",
          actionText: "Ortho Centre",
        },
      ],
      suggestions: ["All Specialities", "All Pages Directory"],
    };
  }

  if (
    matchesWord(query, "diet") ||
    query.includes("dietitian") ||
    query.includes("nutrition") ||
    query.includes("diet plan")
  ) {
    return {
      text: "Our Clinical Dietetics and Nutrition Department provides tailored clinical diet charts for diabetes, cardiac health, kidney support, and post-operative recovery.",
      cards: [
        {
          title: "Dietetics & Nutrition",
          desc: "Personalized medical nutrition therapy and lifestyle diet counseling.",
          badge: "Speciality",
          actionType: "link",
          actionUrl: "/ourspecialities/dietitian",
          actionText: "Explore Dietetics",
        },
        {
          title: "Book Nutrition Consultation",
          desc: "Schedule a personalized diet session with our clinical dietitian.",
          actionType: "link",
          actionUrl: "/patientcare/appointment",
          actionText: "Book Appointment",
        },
      ],
      suggestions: ["Health Library", "All Specialities", "All Pages Directory"],
    };
  }

  if (
    query.includes("radiology") ||
    matchesWord(query, "mri") ||
    matchesWord(query, "ct scan") ||
    matchesWord(query, "xray") ||
    matchesWord(query, "x-ray") ||
    query.includes("ultrasound") ||
    query.includes("imaging")
  ) {
    return {
      text: "Our Radio Diagnosis Department operates 24/7 high-resolution CT, MRI, digital X-Ray, ultrasound, and interventional radiology services.",
      cards: [
        {
          title: "Radio Diagnosis & Imaging",
          desc: "24/7 Diagnostic imaging with rapid report turnaround under senior radiologists.",
          badge: "Diagnostic 24/7",
          actionType: "link",
          actionUrl: "/ourspecialities/radio-diagnosis",
          actionText: "Explore Radiology",
        },
        {
          title: "Contact Radiology Desk",
          desc: "Enquire about imaging scan timings and slot bookings.",
          actionType: "call",
          actionUrl: "tel:+917566123666",
          actionText: "Call +91 7566 123666",
        },
      ],
      suggestions: ["24/7 Emergency Care", "All Specialities", "All Pages Directory"],
    };
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 11. HEALTH LIBRARY & ARTICLES ROUTING
  // ─────────────────────────────────────────────────────────────────────────────
  if (
    query.includes("health library") ||
    matchesWord(query, "blog") ||
    matchesWord(query, "blogs") ||
    matchesWord(query, "article") ||
    matchesWord(query, "articles") ||
    query.includes("health tips") ||
    query.includes("wellness tips") ||
    query.includes("medical news")
  ) {
    return FLOW_RESPONSES.healthLibrary;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 12. CAREERS & RECRUITMENT ROUTING
  // ─────────────────────────────────────────────────────────────────────────────
  if (
    query.includes("career") ||
    query.includes("careers") ||
    matchesWord(query, "job") ||
    matchesWord(query, "jobs") ||
    query.includes("vacancy") ||
    query.includes("vacancies") ||
    query.includes("hiring") ||
    query.includes("recruitment") ||
    query.includes("work with us") ||
    query.includes("nurse job") ||
    query.includes("doctor job") ||
    matchesWord(query, "apply")
  ) {
    return FLOW_RESPONSES.careers;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 13. ABOUT US & HOSPITAL INFORMATION ROUTING
  // ─────────────────────────────────────────────────────────────────────────────
  if (
    query.includes("about us") ||
    query.includes("about apollo") ||
    query.includes("about hospital") ||
    query.includes("who we are") ||
    query.includes("history") ||
    query.includes("mission") ||
    query.includes("vision") ||
    query.includes("leadership") ||
    query.includes("management") ||
    matchesWord(query, "nabh") ||
    query.includes("infrastructure")
  ) {
    return FLOW_RESPONSES.aboutUs;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 14. CONTACT & LOCATION / DIRECTIONS ROUTING
  // ─────────────────────────────────────────────────────────────────────────────
  if (
    query.includes("contact") ||
    query.includes("contact us") ||
    query.includes("phone") ||
    query.includes("phone number") ||
    matchesWord(query, "call") ||
    query.includes("helpline") ||
    query.includes("email") ||
    query.includes("reception") ||
    matchesWord(query, "reach") ||
    query.includes("help desk")
  ) {
    return FLOW_RESPONSES.contact;
  }

  if (
    query.includes("location") ||
    query.includes("address") ||
    matchesWord(query, "where") ||
    query.includes("direction") ||
    query.includes("directions") ||
    matchesWord(query, "map") ||
    query.includes("how to reach") ||
    matchesWord(query, "jabalpur")
  ) {
    return FLOW_RESPONSES.contact;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 15. LOGIN / PATIENT PORTAL ROUTING
  // ─────────────────────────────────────────────────────────────────────────────
  if (
    query.includes("login") ||
    query.includes("log in") ||
    query.includes("signin") ||
    query.includes("sign in") ||
    matchesWord(query, "portal") ||
    query.includes("patient portal") ||
    matchesWord(query, "account") ||
    query.includes("my account") ||
    query.includes("medical report") ||
    query.includes("download report")
  ) {
    return FLOW_RESPONSES.login;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 16. INTERNATIONAL PATIENT SERVICES ROUTING
  // ─────────────────────────────────────────────────────────────────────────────
  if (
    query.includes("international") ||
    matchesWord(query, "visa") ||
    query.includes("foreign") ||
    query.includes("abroad") ||
    query.includes("overseas")
  ) {
    return FLOW_RESPONSES.international;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 17. INSURANCE & CASHLESS TPA ROUTING
  // ─────────────────────────────────────────────────────────────────────────────
  if (
    query.includes("insurance") ||
    matchesWord(query, "tpa") ||
    query.includes("cashless") ||
    query.includes("ayushman") ||
    query.includes("pmjay") ||
    matchesWord(query, "cghs") ||
    matchesWord(query, "echs") ||
    matchesWord(query, "claim")
  ) {
    return {
      text: "Apollo JBP Hospitals Jabalpur supports cashless hospitalization across leading Private TPAs and Government schemes, including:\n\n• AB-PMJAY (Ayushman Bharat)\n• CGHS & ECHS\n• ESIC\n• Railway & BSNL\n• Major Private Insurers (Star Health, HDFC ERGO, ICICI Lombard, Care, Niva Bupa, etc.)\n\nPlease carry your insurance card, Government ID, and policy documents to our dedicated TPA Desk at the hospital lobby.",
      cards: [
        {
          title: "Contact TPA & Insurance Desk",
          desc: "Connect directly with our hospital billing and cashless insurance coordination team.",
          badge: "Cashless TPA",
          actionType: "link",
          actionUrl: "/contact",
          actionText: "Contact TPA Desk",
        },
        {
          title: "Book Doctor Appointment",
          desc: "Schedule consultation before your scheduled cashless procedure.",
          actionType: "link",
          actionUrl: "/patientcare/appointment",
          actionText: "Book Appointment",
        },
      ],
      suggestions: [
        "Contact TPA Desk",
        "I want to book appointment",
        "Hospital Timings",
        "All Pages Directory",
      ],
    };
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 18. PRIVACY POLICY & TERMS OF SERVICE ROUTING
  // ─────────────────────────────────────────────────────────────────────────────
  if (
    query.includes("terms of service") ||
    query.includes("terms of use") ||
    matchesWord(query, "terms")
  ) {
    return {
      text: "Review the Apollo JBP Hospitals website terms of use, online consultation guidelines, and digital patient disclaimers:",
      cards: [
        {
          title: "Terms of Service",
          desc: "Review website terms of use, online consultation guidelines, and digital patient disclaimers.",
          badge: "Terms of Use",
          actionType: "link",
          actionUrl: "/terms-of-service",
          actionText: "Read Terms of Service",
        },
        {
          title: "Privacy Policy",
          desc: "Read our comprehensive policy on patient data confidentiality, medical record security, and digital privacy.",
          badge: "Compliance",
          actionType: "link",
          actionUrl: "/privacy-policy",
          actionText: "Read Privacy Policy",
        },
      ],
      suggestions: ["Privacy Policy", "About Us", "Contact Hospital", "All Pages Directory"],
    };
  }

  if (
    query.includes("privacy") ||
    matchesWord(query, "policy") ||
    query.includes("legal") ||
    query.includes("disclaimer")
  ) {
    return FLOW_RESPONSES.legal;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 19. HOME PAGE ROUTING
  // ─────────────────────────────────────────────────────────────────────────────
  if (
    query === "home" ||
    query === "homepage" ||
    query === "main page" ||
    query === "start" ||
    query.includes("go home") ||
    query.includes("main website")
  ) {
    return FLOW_RESPONSES.home;
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 20. TIMINGS & VISITING HOURS
  // ─────────────────────────────────────────────────────────────────────────────
  if (
    query.includes("timing") ||
    matchesWord(query, "hour") ||
    matchesWord(query, "hours") ||
    query.includes("visiting") ||
    query.includes("opd time") ||
    matchesWord(query, "open")
  ) {
    return {
      text: "🏥 **Apollo Hospitals Jabalpur Timings**:\n\n• **OPD Consultations**: Monday to Saturday, 9:00 AM – 6:00 PM\n• **Emergency & Trauma ER**: Open 24 Hours, 7 Days a week (24x7)\n• **Diagnostic Labs & Pharmacy**: Open 24x7\n• **Inpatient Visiting Hours**: 4:00 PM – 6:00 PM (1 visitor per pass)",
      cards: [
        {
          title: "Book OPD Appointment",
          desc: "Schedule a convenient consultation slot during OPD hours.",
          badge: "9 AM - 6 PM",
          actionType: "link",
          actionUrl: "/patientcare/appointment",
          actionText: "Book Appointment",
        },
        {
          title: "24/7 Emergency Care",
          desc: "Emergency triage and trauma care are active round-the-clock.",
          badge: "Open 24/7",
          actionType: "link",
          actionUrl: "/emergency",
          actionText: "Go to Emergency Page",
        },
      ],
      suggestions: [
        "I want to book appointment",
        "Hospital Location & Map",
        "24/7 Emergency Care",
        "All Pages Directory",
      ],
    };
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 21. GREETINGS & APPRECIATION
  // ─────────────────────────────────────────────────────────────────────────────
  if (
    matchesWord(query, "hi") ||
    matchesWord(query, "hello") ||
    matchesWord(query, "hey") ||
    matchesWord(query, "namaste") ||
    query.includes("good morning") ||
    query.includes("good afternoon") ||
    query.includes("good evening")
  ) {
    return {
      text: "Hello! Welcome to Apollo JBP Hospitals Jabalpur. How can I assist you with your health and healthcare needs today?\n\nYou can select any service or ask me to navigate you to any page on our website:",
      cards: [
        {
          title: "Explore All Website Pages",
          desc: "Quick access to Emergency, Doctors, Events, Case Studies, Ambulance, and Specialities.",
          badge: "Site Directory",
          actionType: "link",
          actionUrl: "/patientcare",
          actionText: "Explore Pages",
        },
        {
          title: "Book Doctor Appointment",
          desc: "Fast-track slot confirmation across 49+ medical specialists.",
          badge: "Book Online",
          actionType: "link",
          actionUrl: "/patientcare/appointment",
          actionText: "Book Appointment",
        },
      ],
      suggestions: [
        "24/7 Emergency Care",
        "Book Doctor Appointment",
        "Hospital Events & Camps",
        "Clinical Case Studies",
        "All Pages Directory",
      ],
    };
  }

  if (query.includes("thank") || query.includes("thanks")) {
    return {
      text: "You're very welcome! We are always here to help you and your family. Wishing you good health and happiness!",
      cards: [
        {
          title: "Explore Website Directory",
          desc: "Navigate to any other hospital page or health service.",
          actionType: "link",
          actionUrl: "/patientcare",
          actionText: "View Hospital Services",
        },
      ],
      suggestions: [
        "I want to book appointment",
        "Health Check Packages",
        "Hospital Events",
        "All Pages Directory",
      ],
    };
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // 22. FALLBACK HELPFUL SMART NAVIGATION RESPONSE
  // ─────────────────────────────────────────────────────────────────────────────
  return {
    text: `Thank you for reaching out to Apollo Assist. Regarding "${userInput}", I am here to help you find the right page or service.\n\nYou can select from our popular pages below or visit our complete website directory:`,
    cards: [
      {
        title: "All Website Pages Directory",
        desc: "Browse our complete directory of pages: Emergency, Events, Case Studies, Doctors, and Specialities.",
        badge: "Directory",
        actionType: "link",
        actionUrl: "/patientcare",
        actionText: "Explore All Pages",
      },
      {
        title: "24/7 Emergency Care",
        desc: "Immediate assistance for emergency and critical medical needs.",
        badge: "24/7 ER",
        actionType: "link",
        actionUrl: "/emergency",
        actionText: "Emergency Page",
        highlight: true,
      },
      {
        title: "Book Doctor Appointment",
        desc: "Online consultation booking with specialist doctors.",
        badge: "Appointments",
        actionType: "link",
        actionUrl: "/patientcare/appointment",
        actionText: "Book Appointment Online",
      },
      {
        title: "Hospital Reception Helpline",
        desc: "Speak with our front-desk patient care team for personalized guidance.",
        actionType: "call",
        actionUrl: "tel:+917566123666",
        actionText: "Call +91 7566 123666",
      },
    ],
    suggestions: [
      "All Pages Directory",
      "24/7 Emergency Care",
      "Book Doctor Appointment",
      "Hospital Events & Camps",
      "Clinical Case Studies",
      "Centres of Excellence",
      "Find Doctors",
    ],
  };
}
