
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
    department: "neonatology",
    qualification: "",
    experience: "",
    expertise: [],
    image: "/images/doctors/jitendra-singh-rathour.webp",
    profileUrl: "https://apollojbphospitals.com/doctor/neonatologist-in-jabalpur-2/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-002",
    slug: "dr-qayoom-yousuf",
    name: "Dr. Qayoom Yousuf",
    designation: "Consultant – Interventional Cardiology",
    speciality: "Interventional Cardiology",
    department: "cardiac",
    qualification: "",
    experience: "",
    expertise: [],
    image: "/images/doctors/qayoom-yousuf.webp",
    profileUrl: "https://apollojbphospitals.com/doctor/heart-specialist-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-003",
    slug: "dr-akanksha-choudhary",
    name: "Dr. Akanksha Choudhary",
    designation: "Associate Consultant – Critical Care",
    speciality: "Critical Care",
    department: "critical-care",
    qualification: "",
    experience: "",
    expertise: [],
    image: "/images/doctors/akanksha-choudhary.webp",
    profileUrl: "https://apollojbphospitals.com/doctor/consultant-critical-care-specialist-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-004",
    slug: "dr-nagaraj-kandagal",
    name: "Dr. Nagaraj Kandagal",
    designation: "Consultant Anaesthesiologist & Intensivist",
    speciality: "Anaesthesiology & Critical Care",
    department: "critical-care",
    qualification: "MBBS, MD (Anaesthesiology)",
    experience: "",
    expertise: [
      "General Anaesthesia",
      "Neuro Anaesthesia",
      "Cardiac Anaesthesia",
      "Pediatric Anaesthesia",
      "Obstetric Anaesthesia",
      "Regional Anaesthesia",
      "Critical Care Medicine",
      "Ventilator Management",
    ],
    image: "/images/doctors/nagaraj-kandagal.webp",
    profileUrl: "https://apollojbphospitals.com/doctor/anaesthesia-specialist-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-005",
    slug: "dr-jayaram-k",
    name: "Dr. Jayaram K",
    designation: "Senior Consultant Medical Gastroenterologist & Hepatologist",
    speciality: "Gastroenterology & Hepatology",
    department: "gastro",
    qualification: "",
    experience: "",
    expertise: ["Gastroenterology", "Hepatology", "Liver Care"],
    image: "/images/doctors/jayaram.jpeg",
    profileUrl: "https://apollojbphospitals.com/doctor/bestgastroenterologist-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-006",
    slug: "dr-devashish-chhutani",
    name: "Dr. Devashish Chhutani",
    designation:
      "Associate Consultant Orthopaedic, Complex Trauma, Joint Replacement, Arthroscopy & Sports Injury Surgeon",
    speciality: "Orthopaedics",
    department: "orthopedics",
    qualification: "",
    experience: "",
    expertise: [
      "Complex Trauma",
      "Joint Replacement",
      "Arthroscopy",
      "Sports Injuries",
    ],
    image: "/images/doctors/devashish-chhutani.webp",
    profileUrl: "https://apollojbphospitals.com/doctor/orthopaedic-surgeon-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-007",
    slug: "dr-vijayendra-reddy-chinta",
    name: "Dr. Vijayendra Reddy Chinta",
    designation: "Consultant – Neurology",
    speciality: "Neurology",
    department: "neuro",
    qualification: "",
    experience: "",
    expertise: [],
    image: "/images/doctors/vijayendra-reddy-chinta.webp",
    profileUrl: "https://apollojbphospitals.com/doctor/neurologist-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-008",
    slug: "dr-surabhi-kaushik",
    name: "Dr. Surabhi Kaushik",
    designation: "Consultant – Radiodiagnosis & Imaging",
    speciality: "Radiodiagnosis & Imaging",
    department: "radiology",
    qualification: "",
    experience: "",
    expertise: ["Radiodiagnosis", "Medical Imaging"],
    image: "/images/doctors/surabhi-kaushik.webp",
    profileUrl: "https://apollojbphospitals.com/doctor/radiologist-in-jabalpur-2/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-009",
    slug: "dr-milind-h-gaidhane",
    name: "Dr. Milind H. Gaidhane",
    designation: "Consultant – Anaesthesiology",
    speciality: "Anaesthesiology",
    department: "anaesthesiology",
    qualification: "",
    experience: "",
    expertise: [],
    image: "/images/doctors/milind-gaidhane.webp",
    profileUrl: "",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-010",
    slug: "dr-mrunali-u-nikhare",
    name: "Dr. Mrunali U. Nikhare",
    designation: "Consultant – Emergency Medicine",
    speciality: "Emergency Medicine",
    department: "emergency",
    qualification: "",
    experience: "",
    expertise: [],
    image: "/images/doctors/mrunali-nikhare.webp",
    profileUrl: "",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-011",
    slug: "dr-suresh-babu-vallepu",
    name: "Dr. Suresh Babu Vallepu",
    designation: "Consultant Neurologist",
    speciality: "Neurology",
    department: "neuro",
    qualification: "",
    experience: "",
    expertise: [],
    image: "/images/doctors/suresh-babu-vallepu.webp",
    profileUrl: "https://apollojbphospitals.com/doctor/best-neurologist-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-012",
    slug: "dr-ashwini-samay-chavan",
    name: "Dr. Ashwini Samay Chavan",
    designation: "Endodontist & Root Canal Specialist",
    speciality: "Dentistry",
    department: "dentistry",
    qualification: "",
    experience: "",
    expertise: ["Endodontics", "Root Canal Treatment"],
    image: "/images/doctors/ashwini-samay-chavan.webp",
    profileUrl: "https://apollojbphospitals.com/doctor/best-dentist-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-013",
    slug: "dr-virendra-bhad",
    name: "Dr. Virendra Bhad",
    designation:
      "Consultant Medical Gastroenterologist, Hepatologist & Advanced Endoscopy Specialist",
    speciality: "Gastroenterology & Endoscopy",
    department: "gastro",
    qualification: "",
    experience: "",
    expertise: ["Advanced Endoscopy", "Hepatology", "Liver Care"],
    image: "/images/doctors/virendra.jpeg",
    profileUrl:
      "https://apollojbphospitals.com/doctor/medical-gastroenterologist-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-014",
    slug: "dr-gaurav-kumar-malvi",
    name: "Dr. Gaurav Kumar Malvi",
    designation:
      "Associate Consultant Urologist, Andrologist, Uro-Oncologist & Laparoscopic Uro Surgeon",
    speciality: "Urology",
    department: "urology",
    qualification: "",
    experience: "",
    expertise: [
      "Urology",
      "Andrology",
      "Uro-Oncology",
      "Laparoscopic Urology",
    ],
    image: "/images/doctors/gaurav-kumar-malvi.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/best-urologist-in-jabalpur-2/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-015",
    slug: "dr-shirisha-kumari-jinka",
    name: "Dr. Shirisha Kumari Jinka",
    designation: "Critical Care Specialist, Intensivist & ICU Consultant",
    speciality: "Critical Care",
    department: "critical-care",
    qualification: "",
    experience: "",
    expertise: ["Critical Care", "Intensive Care", "ICU"],
    image: "/images/doctors/shirisha-kumari-jinka.webp",
    profileUrl: "",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-016",
    slug: "dr-pranal-sahare",
    name: "Dr. Pranal Sahare",
    designation:
      "Urologist, Robotic Uro Surgeon, Laparoscopic Urologist, and Uro-Oncologist",
    speciality: "Urology",
    department: "urology",
    qualification: "",
    experience: "",
    expertise: [
      "Robotic Urology",
      "Laparoscopic Urology",
      "Uro-Oncology",
    ],
    image: "/images/doctors/pranal-sahare.webp",
    profileUrl: "",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-017",
    slug: "dr-monika-tripathi",
    name: "Dr. Monika Tripathi",
    designation:
      "Advanced Laparoscopic Gynecologist & High-Risk Pregnancy Specialist",
    speciality: "Obstetrics & Gynaecology",
    department: "gynae",
    qualification: "",
    experience: "",
    expertise: [
      "Laparoscopic Gynaecology",
      "High-Risk Pregnancy",
    ],
    image: "/images/doctors/monika-tripathi.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/best-gynecologist-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-018",
    slug: "dr-deepa-ghodeshwar",
    name: "Dr. Deepa Ghodeshwar",
    designation:
      "IVF Specialist, Infertility Specialist, and Reproductive Medicine Consultant",
    speciality: "Reproductive Medicine",
    department: "gynae",
    qualification: "",
    experience: "",
    expertise: [
      "IVF",
      "Infertility",
      "Reproductive Medicine",
    ],
    image: "/images/doctors/deepa-ghodeshwar.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/best-ivf-specialist-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-019",
    slug: "dr-biswa-prakash-patri",
    name: "Dr. Biswa Prakash Patri",
    designation:
      "Clinical Haematologist, Haemato-Oncologist & Bone Marrow Transplant Specialist",
    speciality: "Haematology & Haemato-Oncology",
    department: "onco",
    qualification: "",
    experience: "",
    expertise: [
      "Clinical Haematology",
      "Haemato-Oncology",
      "Bone Marrow Transplant",
    ],
    image: "/images/doctors/biswa-prakash-patri.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/best-hematologist-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-020",
    slug: "dr-shobhit-kumar-tripathi",
    name: "Dr. Shobhit Kumar Tripathi",
    designation: "Paediatric Emergency Specialist",
    speciality: "Paediatric Emergency",
    department: "pediatrics",
    qualification: "",
    experience: "",
    expertise: ["Paediatric Emergency", "PICU"],
    image: "/images/doctors/shobhit-kumar-tripathi.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/paediatric-emergency-specialist-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-021",
    slug: "dr-gunjan-ghodeshwar",
    name: "Dr. Gunjan Ghodeshwar",
    designation: "Senior Consultant & Interventional Cardiologist",
    speciality: "Interventional Cardiology",
    department: "cardiac",
    qualification: "",
    experience: "",
    expertise: ["Interventional Cardiology"],
    image: "/images/doctors/gunjan-ghodeshwar.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/best-cardiologist-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-022",
    slug: "dr-prabhat-kumar",
    name: "Dr. Prabhat Kumar",
    designation:
      "Associate Consultant – Robotic & Laparoscopic Colorectal Surgeon",
    speciality: "Colorectal Surgery",
    department: "surgical",
    qualification: "",
    experience: "",
    expertise: [
      "Colorectal Surgery",
      "Robotic Surgery",
      "Laparoscopic Surgery",
    ],
    image: "/images/doctors/prabhat-kumar.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/best-surgeon-3/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-023",
    slug: "dr-saad-shaikh",
    name: "Dr. Saad Shaikh",
    designation:
      "Consultant – General, Laparoscopic, Laser, HPB & Robotic Surgeon",
    speciality: "General & Laparoscopic Surgery",
    department: "surgical",
    qualification: "",
    experience: "",
    expertise: [
      "General Surgery",
      "Laparoscopic Surgery",
      "Laser Surgery",
      "HPB Surgery",
      "Robotic Surgery",
    ],
    image: "/images/doctors/saad-shaikh.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/best-surgeon-2/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-024",
    slug: "dr-p-ravi-teja",
    name: "Dr. P. Ravi Teja",
    designation: "Consultant – General, Laparoscopic & Laser Surgeon",
    speciality: "General Surgery",
    department: "surgical",
    qualification: "",
    experience: "",
    expertise: [
      "General Surgery",
      "Laparoscopic Surgery",
      "Laser Surgery",
    ],
    image: "/images/doctors/p-ravi-teja.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/best-surgeon/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-025",
    slug: "dr-partha-pratim-jana",
    name: "Dr. Partha Pratim Jana",
    designation: "Consultant – Infectious Diseases",
    speciality: "Infectious Diseases",
    department: "infectious",
    qualification: "",
    experience: "",
    expertise: ["Infectious Diseases"],
    image: "/images/doctors/partha-pratim-jana.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/infectious-disease-specialist-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-026",
    slug: "dr-payal-sharma",
    name: "Dr. Payal Sharma",
    designation: "Interventional Radiologist",
    speciality: "Interventional Radiology",
    department: "radiology",
    qualification: "",
    experience: "",
    expertise: ["Interventional Radiology"],
    image: "/images/doctors/payal-sharma.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/interventional-radiologist-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-027",
    slug: "dr-adam-teja",
    name: "Dr. Adam Teja",
    designation: "Robotic Joint Replacement & Endoscopic Spine Surgeon",
    speciality: "Orthopaedics & Spine",
    department: "orthopedics",
    qualification: "",
    experience: "",
    expertise: [
      "Robotic Joint Replacement",
      "Spine Surgery",
    ],
    image: "/images/doctors/adam-teja.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/best-orthopedic-surgeon-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-028",
    slug: "dr-sumit-sanjaykant-trivedi",
    name: "Dr. Sumit Sanjaykant Trivedi",
    designation: "Consultant – Anaesthesiology & Critical Care",
    speciality: "Anaesthesiology & Critical Care",
    department: "critical-care",
    qualification: "",
    experience: "",
    expertise: ["Anaesthesiology", "Critical Care"],
    image: "/images/doctors/sumit-sanjaykant-trivedi.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/best-anaesthesiologist-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-029",
    slug: "dr-jagan-nayakulu-hanumanthu",
    name: "Dr. (Surg. Capt.) Jagan Nayakulu Hanumanthu",
    designation: "Senior Consultant & Interventional Cardiologist",
    speciality: "Interventional Cardiology",
    department: "cardiac",
    qualification: "",
    experience: "",
    expertise: ["Interventional Cardiology"],
    image: "/images/doctors/hanumanthu.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/interventional-cardiologist-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-030",
    slug: "dr-swagata-sarkar",
    name: "Dr. Swagata Sarkar",
    designation: "Senior Consultant Ophthalmologist",
    speciality: "Ophthalmology",
    department: "ophthalmology",
    qualification: "",
    experience: "",
    expertise: ["Ophthalmology"],
    image: "/images/doctors/swagata-sarkar.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/ophthalmologist-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-031",
    slug: "dr-balaji-k",
    name: "Dr. Balaji K.",
    designation: "Consultant – Critical Care Medicine",
    speciality: "Critical Care Medicine",
    department: "critical-care",
    qualification: "",
    experience: "",
    expertise: ["Critical Care Medicine"],
    image: "/images/doctors/balaji-k.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/critical-care-doctor-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-032",
    slug: "dr-amit-vijay-ghatge",
    name: "Dr. Amit Vijay Ghatge",
    designation: "Consultant ENT Surgeon",
    speciality: "ENT",
    department: "ent",
    qualification: "",
    experience: "",
    expertise: ["ENT Surgery"],
    image: "/images/doctors/amit-vijay-ghatge.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/ent-specialist-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-033",
    slug: "dr-rajavigneshwari-n",
    name: "Dr. Rajavigneshwari N",
    designation: "Consultant Histopathologist & Pathologist",
    speciality: "Pathology",
    department: "pathology",
    qualification: "",
    experience: "",
    expertise: ["Histopathology", "Pathology"],
    image: "/images/doctors/rajavigneshwari-n.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/pathologist-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-034",
    slug: "dr-arunkumar-karthikayan",
    name: "Dr. Arunkumar Karthikayan",
    designation: "Consultant Neurosurgery",
    speciality: "Neurosurgery",
    department: "neuro",
    qualification: "",
    experience: "",
    expertise: ["Neurosurgery"],
    image: "/images/doctors/karthikayan.png",
    profileUrl:
      "https://apollojbphospitals.com/doctor/expert-neurosurgeon-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-035",
    slug: "dr-abhishek-jain",
    name: "Dr. Abhishek Jain",
    designation: "Consultant – Emergency Medicine & Trauma Care",
    speciality: "Emergency Medicine",
    department: "emergency",
    qualification: "",
    experience: "",
    expertise: ["Emergency Medicine", "Trauma Care"],
    image: "/images/doctors/abhishek-jain.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/emergency-medicine-doctor-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-036",
    slug: "dr-rashi-gupta",
    name: "Dr. Rashi Gupta",
    designation: "Consultant Neonatology",
    speciality: "Neonatology",
    department: "neonatology",
    qualification: "",
    experience: "",
    expertise: ["Neonatology"],
    image: "/images/doctors/rashi-gupta.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/neonatologist-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-037",
    slug: "dr-kadloor-satyanand",
    name: "Brigadier (Dr.) Kadloor Satyanand, SM",
    designation: "Consultant General Medicine",
    speciality: "General Medicine",
    department: "general-medicine",
    qualification: "",
    experience: "",
    expertise: ["General Medicine"],
    image: "/images/doctors/kadloor-satyanand.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/general-physician-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-038",
    slug: "dr-samay-premsing-chavan",
    name: "Dr. Samay Premsing Chavan",
    designation: "Endodontist & Root Canal Specialist",
    speciality: "Dentistry",
    department: "dentistry",
    qualification: "",
    experience: "",
    expertise: ["Endodontics", "Root Canal Treatment"],
    image: "/images/doctors/samay-premsing-chavan.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/endodontist-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-039",
    slug: "dr-manisha-uddey",
    name: "Dr. Manisha Uddey",
    designation: "Obstetrics & Gynaecology",
    speciality: "Obstetrics & Gynaecology",
    department: "gynae",
    qualification: "",
    experience: "",
    expertise: ["Obstetrics", "Gynaecology"],
    image: "/images/doctors/manisha-uddey.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/gynaecologist-in-jabalpur-near-me/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-040",
    slug: "dr-ambarish-joshi",
    name: "Dr. Ambarish Joshi",
    designation: "Pulmonary Medicine, Critical Care",
    speciality: "Pulmonary Medicine & Critical Care",
    department: "pulmonary",
    qualification: "",
    experience: "",
    expertise: ["Pulmonary Medicine", "Critical Care"],
    image: "/images/doctors/ambarish-joshi.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/pulmonologist-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-041",
    slug: "dr-p-karunakar-reddy",
    name: "Dr. P. Karunakar Reddy",
    designation: "Consultant Surgical Oncologist",
    speciality: "Surgical Oncology",
    department: "onco",
    qualification: "",
    experience: "",
    expertise: ["Surgical Oncology"],
    image: "/images/doctors/karunakarreddy.png",
    profileUrl:
      "https://apollojbphospitals.com/doctor/surgical-oncologist-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-042",
    slug: "dr-shivangini-gupta",
    name: "Dr. Shivangini Gupta",
    designation: "Consultant - Pediatric Nephrology",
    speciality: "Pediatric Nephrology",
    department: "nephro",
    qualification: "",
    experience: "",
    expertise: ["Pediatric Nephrology"],
    image: "/images/doctors/shivangini-gupta.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/pediatric-nephrologist-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-043",
    slug: "dr-vaidehee-milind-naik",
    name: "Dr. Vaidehee Milind Naik",
    designation: "Consultant Pathologist & Histopathologist",
    speciality: "Pathology",
    department: "pathology",
    qualification: "",
    experience: "",
    expertise: ["Pathology", "Histopathology"],
    image: "/images/doctors/vaidehee-milind-naik.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/pathology-doctor-in-jabalpur-near-me/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-044",
    slug: "dr-ganesh-gorthi",
    name: "Dr. Ganesh Gorthi",
    designation: "Senior Minimal Access Surgeon",
    speciality: "Gastro Surgery",
    department: "gastro",
    qualification: "",
    experience: "",
    expertise: [
      "Minimal Access Surgery",
      "GI Surgery",
      "Laparoscopic Surgery",
    ],
    image: "/images/doctors/ganesh.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/gastro-surgeon-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-045",
    slug: "dr-rajesh-laxman-rao-sherke",
    name: "Dr. Rajesh Laxman Rao Sherke",
    designation: "Senior Consultant, Nephrology",
    speciality: "Nephrology",
    department: "nephro",
    qualification: "",
    experience: "",
    expertise: ["Nephrology", "Kidney Care"],
    image: "/images/doctors/rajesh-laxman-rao-sherke.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/nephrologist-in-jabalpur/",
    opd: { days: [], timing: "" },
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
  profileUrl: "https://apollojbphospitals.com/doctor/gastroenterologist-in-jabalpur/",
  languages: ["Hindi", "English"],

  summary:
    "Senior gastroenterologist at Apollo JBP Hospitals, treating GERD, ulcers, liver and pancreatic disorders with modern diagnostics and a patient-first approach.",

  about: [
    "Dr. Arun Iyer is a leading gastroenterologist in Jabalpur, known for diagnosing and treating liver, stomach and intestinal disorders. At Apollo JBP Hospitals he delivers advanced care for acidity, IBS, GERD, hepatitis and chronic abdominal pain.",
    "He treats a wide range of digestive disorders, including gastric infections, pancreatitis and liver complications, with personalized, evidence-based treatment in a world-class hospital setting.",
  ],

  qualifications: [
    {
      degree: "DM (Gastroenterology)",
      institute: "Government Medical College and Hospital, Thiruvananthapuram, Kerala",
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
    { degree: "Fellowship in Advanced Endoscopy", institute: "", year: "" },
  ],

  highlights: [
    { value: "500+", label: "EUS procedures" },
    { value: "700+", label: "ERCP procedures" },
    { value: "5000+", label: "Endoluminal procedures" },
  ],

  expertise: [
    "Diseases of digestion, stomach and intestines",
    "Liver and pancreatic disorders",
    "Endoscopy and Colonoscopy",
    "ERCP (Endoscopic Retrograde Cholangiopancreatography)",
    "EUS (Endoscopic Ultrasound)",
    "Endoscopic ultrasound-guided procedures",
    "Endoluminal Therapeutics",
    "Third-space endoscopy, EMR, ESD and ESG",
    "Minimally invasive treatment of GI and hepatobiliary diseases",
  ],

  experience: "",
  opd: { days: [], timing: "" },
},

  {
    id: "d-047",
    slug: "dr-ankush-singh-kotwal",
    name: "Dr. Ankush Singh Kotwal",
    designation: "Consultant CTVS Surgeon",
    speciality: "Cardiothoracic & Vascular Surgery",
    department: "cardiac",
    qualification: "",
    experience: "",
    expertise: ["CTVS Surgery", "Cardiothoracic Surgery"],
    image: "/images/doctors/ankush-singh-kotwal.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/ctvs-cardiothoracic-surgeon-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-048",
    slug: "dr-shreyas-reddy",
    name: "Dr. Shreyas Reddy",
    designation: "Radiation Oncologist",
    speciality: "Radiation Oncology",
    department: "onco",
    qualification: "",
    experience: "",
    expertise: ["Radiation Oncology"],
    image: "/images/doctors/shreyas.png",
    profileUrl:
      "https://apollojbphospitals.com/doctor/cancer-doctor-in-jabalpur/",
    opd: { days: [], timing: "" },
  },

  {
    id: "d-049",
    slug: "dr-k-siva-sree",
    name: "Dr. K. Siva Sree",
    designation: "Medical Oncologist",
    speciality: "Medical Oncology",
    department: "onco",
    qualification: "",
    experience: "",
    expertise: ["Medical Oncology"],
    image: "/images/doctors/k-siva-sree.webp",
    profileUrl:
      "https://apollojbphospitals.com/doctor/cancer-specialist-in-jabalpur/",
    opd: { days: [], timing: "" },
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

