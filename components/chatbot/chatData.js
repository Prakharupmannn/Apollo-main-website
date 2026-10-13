// Knowledge base and conversation flows for Apollo Assist Chatbot
// Apollo Hospitals Jabalpur

export const WELCOME_MESSAGE = {
  id: "welcome-1",
  sender: "assistant",
  text: "Hello! Welcome to Apollo JBP Hospitals Jabalpur. I am Apollo Assist, your 24/7 personal healthcare companion. How can I help you today?",
  timestamp: "Just now",
  isWelcome: true,
};

export const QUICK_ACTIONS = [
  {
    id: "action-appointment",
    label: "I want to book appointment",
    shortLabel: "Book Appointment",
    icon: "calendar",
    tag: "OPD & Consult",
    query: "I want to book appointment",
  },
  {
    id: "action-health-check",
    label: "I want to book health check",
    shortLabel: "Health Check Packages",
    icon: "activity",
    tag: "Preventive Care",
    query: "I want to book health check",
  },
  {
    id: "action-international",
    label: "International patient services",
    shortLabel: "International Patients",
    icon: "globe",
    tag: "Global Care",
    query: "International patient services",
  },
  {
    id: "action-emergency",
    label: "I have an emergency",
    shortLabel: "Emergency Assistance",
    icon: "alert",
    tag: "24/7 Critical",
    isEmergency: true,
    query: "I have an emergency",
  },
];

// Rich responses for core flows and FAQs
export const FLOW_RESPONSES = {
  appointment: {
    text: "I can help you schedule an appointment with our specialist doctors at Apollo JBP Hospitals Jabalpur.\n\nYou can book quickly online or speak directly with our OPD registration desk:",
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
    ],
    suggestions: [
      "Find Doctors by Specialty",
      "OPD Timings & Visiting Hours",
      "Insurance & Cashless TPA",
    ],
  },

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
        desc: "Specialized for heart health: Echo, TMT/Stress Test, Lipid Panel, Blood Sugar, and Cardiologist review.",
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
      "Fasting Guidelines",
      "I want to book appointment",
      "Hospital Contact & Location",
    ],
  },

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
      "Get Treatment Estimate",
    ],
  },

  emergency: {
    text: "🚨 EMERGENCY CARE (24/7) - IMMEDIATE ASSISTANCE\n\nIf this is a life-threatening medical emergency, please call our emergency trauma response team immediately or head straight to our Emergency Room:",
    isUrgent: true,
    cards: [
      {
        title: "24/7 Emergency Toll-Free Helpline",
        desc: "Immediate connection with our ER triage and Advanced Life Support Ambulance dispatch.",
        actionType: "call",
        actionUrl: "tel:18001236666",
        actionText: "Call 1800-123-6666 (Toll-Free)",
        highlight: true,
      },
      {
        title: "Apollo Emergency Hotline",
        desc: "Direct nationwide emergency response code.",
        actionType: "call",
        actionUrl: "tel:1066",
        actionText: "Call 1066 (24/7 Hotline)",
      },
      {
        title: "Emergency Room Location",
        desc: "Apollo JBP Hospitals, Global Square, Patan Road, Karmeta, Jabalpur, MP 482002. Open 24 Hours, 365 Days.",
        actionType: "link",
        actionUrl: "https://maps.google.com/?q=Apollo+JBP+Hospitals+Jabalpur",
        actionText: "Get Emergency Directions",
      },
    ],
    suggestions: [
      "Ambulance Services",
      "Critical Care Institute",
      "I want to book appointment",
    ],
  },
};

// Natural language query processor
export function generateBotResponse(userInput) {
  const query = userInput.trim().toLowerCase();

  // 1. Core Quick Actions
  if (
    query.includes("appointment") ||
    query.includes("book appointment") ||
    query.includes("doctor appointment")
  ) {
    return FLOW_RESPONSES.appointment;
  }

  if (
    query.includes("health check") ||
    query.includes("checkup") ||
    query.includes("package") ||
    query.includes("prohealth") ||
    query.includes("screening")
  ) {
    return FLOW_RESPONSES.healthCheck;
  }

  if (
    query.includes("international") ||
    query.includes("visa") ||
    query.includes("foreign") ||
    query.includes("abroad") ||
    query.includes("overseas")
  ) {
    return FLOW_RESPONSES.international;
  }

  if (
    query.includes("emergency") ||
    query.includes("1066") ||
    query.includes("ambulance") ||
    query.includes("trauma") ||
    query.includes("urgent") ||
    query.includes("heart attack") ||
    query.includes("accident")
  ) {
    return FLOW_RESPONSES.emergency;
  }

  // Centres of Excellence
  if (
    query.includes("centres of excellence") ||
    query.includes("centers of excellence") ||
    query.includes("centre of excellence") ||
    query.includes("center of excellence") ||
    query.includes("centres") ||
    query.includes("centers")
  ) {
    return {
      text: "Explore the Centres of Excellence at Apollo JBP Hospitals Jabalpur. Discover our specialized medical departments, advanced treatments, and expert healthcare services.",
      cards: [
        {
          title: "Centres of Excellence",
          desc: "Explore our specialized medical centres, expert doctors, and advanced treatment facilities.",
          actionType: "link",
          actionUrl: "/centres-of-excellence",
          actionText: "Explore Centres of Excellence",
        },
      ],
      suggestions: [
        "Gastro Sciences",
        "Onco Sciences",
        "Cardiac Sciences",
        "Neuro Sciences",
        "Nephro Sciences",
        "Ortho-Joint & Spine",
        "Critical Care",
        "View All Centres of Excellence",
      ],
    };
  }

  // departments routes
  // Centres of Excellence - Individual Route Handling

  const centreRoutes = {
    "gastro sciences": "/centres-of-excellence/gastro",
    "onco sciences": "/centres-of-excellence/onco",
    "cardiac sciences": "/centres-of-excellence/cardiac",
    "neuro sciences": "/centres-of-excellence/neuro",
    "nephro sciences": "/centres-of-excellence/nephro",
    "ortho-joint & spine": "/centres-of-excellence/ortho-joint-spine",
    "critical care": "/centres-of-excellence/critical-care",
    "view all centres of excellence": "/centres-of-excellence",
  };

  if (centreRoutes[query]) {
    return {
      text: `Explore ${userInput} at Apollo JBP Hospitals Jabalpur.`,
      cards: [
        {
          title: userInput,
          desc: "Explore specialized treatments, expert doctors, and healthcare services.",
          actionType: "link",
          actionUrl: centreRoutes[query],
          actionText: `Explore ${userInput}`,
        },
      ],
      suggestions: ["View All Centres of Excellence"],
    };
  }

  // 2. Doctor Inquiries
  if (
    query.includes("doctor") ||
    query.includes("specialist") ||
    query.includes("physician") ||
    query.includes("surgeon")
  ) {
    return {
      text: "Apollo JBP Hospitals Jabalpur has over 49 specialist and super-specialist consultants across Cardiology, Oncology, Neuro Sciences, Orthopaedics, Gastro, Nephro, and Critical Care.\n\nYou can explore doctor profiles, credentials, and OPD schedules here:",
      cards: [
        {
          title: "Doctor Directory",
          desc: "Search leading doctors by name, specialty, or condition treated.",
          actionType: "link",
          actionUrl: "/doctors",
          actionText: "View All Doctors",
        },
      ],
      suggestions: [
        "Cardiology Doctors",
        "Oncology Doctors",
        "Orthopaedic Doctors",
        "I want to book appointment",
      ],
    };
  }

  // 3. Specialties / Centres of Excellence
  if (
    query.includes("cardio") ||
    query.includes("heart") ||
    query.includes("tavi") ||
    query.includes("angioplasty")
  ) {
    return {
      text: "Our Cardiac Sciences Centre of Excellence provides 24/7 STEMI interventional care, primary angioplasty, TAVI, bypass surgery, and electrophysiology under senior cardiologists including Dr. Vivek Gupta and team.",
      cards: [
        {
          title: "Cardiac Sciences Centre",
          desc: "World-class catheterization labs, cardiac ICU, and robotic cardiac interventions.",
          actionType: "link",
          actionUrl: "/centres-of-excellence/cardiology",
          actionText: "Explore Cardiac Centre",
        },
      ],
      suggestions: [
        "Book Cardiology Appointment",
        "Cardiac Health Check",
        "Emergency Hotline",
      ],
    };
  }

  if (
    query.includes("cancer") ||
    query.includes("onco") ||
    query.includes("chemo") ||
    query.includes("radiation") ||
    query.includes("cyberknife")
  ) {
    return {
      text: "The Apollo Comprehensive Cancer Care Centre offers precision oncology, medical oncology, surgical oncology, targeted chemotherapy, and immunotherapy backed by multidisciplinary tumor boards.",
      cards: [
        {
          title: "Oncology Care Centre",
          desc: "Advanced cancer screening, tumor profiling, and compassionate cancer care.",
          actionType: "link",
          actionUrl: "/centres-of-excellence/oncology",
          actionText: "Explore Oncology Centre",
        },
      ],
      suggestions: [
        "Book Oncology Consultation",
        "Health Check Packages",
        "Contact Hospital",
      ],
    };
  }

  if (
    query.includes("neuro") ||
    query.includes("brain") ||
    query.includes("spine") ||
    query.includes("stroke")
  ) {
    return {
      text: "Our Neuro Sciences Institute features 24/7 Acute Stroke thrombolysis, neuro-navigation surgery, endoscopic spine surgery, and neurological critical care.",
      cards: [
        {
          title: "Neuro Sciences Centre",
          desc: "Comprehensive brain, spine, and stroke recovery care.",
          actionType: "link",
          actionUrl: "/centres-of-excellence/neurology",
          actionText: "Explore Neuro Centre",
        },
      ],
      suggestions: ["Book Neuro Consultation", "Emergency 24/7 Hotline"],
    };
  }

  if (
    query.includes("ortho") ||
    query.includes("joint") ||
    query.includes("bone") ||
    query.includes("knee") ||
    query.includes("hip")
  ) {
    return {
      text: "The Orthopaedics & Joint Care Centre specializes in robotic knee & hip replacement, sports injury arthroscopy, minimally invasive fracture trauma, and pediatric orthopaedics.",
      cards: [
        {
          title: "Ortho & Spine Centre",
          desc: "Advanced robotic joint reconstructions and rapid rehabilitation.",
          actionType: "link",
          actionUrl: "/centres-of-excellence/orthopaedics",
          actionText: "Explore Orthopaedics",
        },
      ],
      suggestions: ["Book Ortho Appointment", "Senior Wellness Package"],
    };
  }

  // 4. Timings & Visiting Hours
  if (
    query.includes("timing") ||
    query.includes("hour") ||
    query.includes("visiting") ||
    query.includes("opd time") ||
    query.includes("open")
  ) {
    return {
      text: "🏥 **Apollo Hospitals Jabalpur Timings**:\n\n• **OPD Consultations**: Monday to Saturday, 9:00 AM – 6:00 PM\n• **Emergency & Trauma**: Open 24 Hours, 7 Days a week (24x7)\n• **Diagnostic Labs & Pharmacy**: Open 24x7\n• **Inpatient Visiting Hours**: 4:00 PM – 6:00 PM (1 visitor per pass)",
      suggestions: [
        "I want to book appointment",
        "Hospital Location",
        "I have an emergency",
      ],
    };
  }

  // 5. Location, Address & Directions
  if (
    query.includes("location") ||
    query.includes("address") ||
    query.includes("where") ||
    query.includes("direction") ||
    query.includes("map") ||
    query.includes("reach")
  ) {
    return {
      text: "📍 **Hospital Address**:\nApollo JBP Hospitals\nGlobal Square, Patan Road, Karmeta, Jabalpur, Madhya Pradesh 482002, India.\n\nEasily accessible from Jabalpur Railway Station (approx. 7 km) and Dumna Airport (approx. 22 km).",
      cards: [
        {
          title: "Google Maps Navigation",
          desc: "Click to open GPS directions on Google Maps.",
          actionType: "link",
          actionUrl: "https://maps.google.com/?q=Apollo+JBP+Hospitals+Jabalpur",
          actionText: "Open in Google Maps",
        },
      ],
      suggestions: [
        "OPD Timings",
        "Call Reception",
        "I want to book appointment",
      ],
    };
  }

  // 6. Insurance & Cashless TPA
  if (
    query.includes("insurance") ||
    query.includes("tpa") ||
    query.includes("cashless") ||
    query.includes("ayushman") ||
    query.includes("pmjay") ||
    query.includes("cghs") ||
    query.includes("echs") ||
    query.includes("claim")
  ) {
    return {
      text: "Apollo JBP Hospitals Jabalpur supports cashless hospitalization across leading Private TPAs and Government schemes, including:\n\n• AB-PMJAY (Ayushman Bharat)\n• CGHS & ECHS\n• ESIC\n• Railway & BSNL\n• Major Private Insurers (Star Health, HDFC ERGO, ICICI Lombard, Max Bupa, Care, etc.)\n\nPlease carry your insurance card, Government ID, and policy documents to our dedicated TPA Desk at the hospital lobby.",
      suggestions: [
        "Contact TPA Desk",
        "I want to book appointment",
        "Hospital Timings",
      ],
    };
  }

  // 7. General Greetings
  if (
    query.includes("hi") ||
    query.includes("hello") ||
    query.includes("hey") ||
    query.includes("namaste") ||
    query.includes("good morning") ||
    query.includes("good afternoon") ||
    query.includes("good evening")
  ) {
    return {
      text: "Hello! Welcome to Apollo JBP Hospitals Jabalpur. How can I assist you with your health and healthcare needs today?",
      suggestions: [
        "I want to book appointment",
        "I want to book health check",
        "International patient services",
        "I have an emergency",
      ],
    };
  }

  if (query.includes("thank") || query.includes("thanks")) {
    return {
      text: "You're very welcome! We are always here to help you and your family. Wishing you good health and happiness!",
      suggestions: [
        "I want to book appointment",
        "Health Check Packages",
        "Contact Hospital",
      ],
    };
  }

  // 8. Fallback helpful response
  return {
    text: `Thank you for reaching out to Apollo Assist. Regarding "${userInput}", our team is ready to guide you.\n\nYou can choose from our popular services below or connect directly with our support desk:`,
    cards: [
      {
        title: "Hospital Reception Helpline",
        desc: "Speak with our patient care representative for personalized guidance.",
        actionType: "call",
        actionUrl: "tel:+917566123666",
        actionText: "Call +91 7566 123666",
      },
    ],
    suggestions: [
      "I want to book appointment",
      "I want to book health check",
      "International patient services",
      "I have an emergency",
    ],
  };
}
