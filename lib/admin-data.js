export const ADMIN_BASE = "/admin";

export const STATS = {
  appointments: { value: 248, delta: "12% from last week", spark: [12, 18, 15, 24, 22, 30, 34] },
  doctors: { value: 28, delta: "2% from last month", spark: [20, 21, 21, 23, 24, 26, 28] },
  events: { value: 12, delta: "33% from last month", spark: [4, 5, 5, 7, 8, 10, 12] },
  caseStudies: { value: 18, delta: "33% from last month", spark: [6, 8, 9, 11, 13, 15, 18] },
};

export const CHART_MONTHLY = [
  { label: "Jan", value: 100 }, { label: "Feb", value: 105 }, { label: "Mar", value: 150 },
  { label: "Apr", value: 125 }, { label: "May", value: 170 }, { label: "Jun", value: 150 },
  { label: "Jul", value: 225 }, { label: "Aug", value: 180 },
];
export const CHART_WEEKLY = [
  { label: "Mon", value: 32 }, { label: "Tue", value: 41 }, { label: "Wed", value: 38 },
  { label: "Thu", value: 52 }, { label: "Fri", value: 47 }, { label: "Sat", value: 29 }, { label: "Sun", value: 14 },
];

export const NOTIFICATIONS = [
  { id: 1, title: "New appointment request", text: "Rohit Sharma booked Dr. Prathap C. Reddy", time: "5 min ago" },
  { id: 2, title: "Event published", text: "World Heart Day Camp is now live", time: "1 hr ago" },
  { id: 3, title: "Article in draft", text: "Mental Health Matters needs review", time: "Yesterday" },
];

export const DOCTORS = [
  { id: "DR001", name: "Dr. Prathap C. Reddy", speciality: "Cardiology & Pioneer Healthcare", department: "Cardiology", experience: "45+ Years", status: "Active", photo: "" },
  { id: "DR002", name: "Dr. Shreyas Reddy", speciality: "Radiation Oncologist", department: "Oncology", experience: "30+ Years", status: "Active", photo: "" },
  { id: "DR003", name: "Dr. Ankush Singh Kotwal", speciality: "Consultant CTVS Surgeon", department: "Cardiology", experience: "24+ Years", status: "Active", photo: "" },
  { id: "DR004", name: "Dr. Arun Iyer", speciality: "DM Gastroenterology", department: "Gastro", experience: "20+ Years", status: "Active", photo: "" },
  { id: "DR005", name: "Dr. Arunkumar Karthikayan", speciality: "Consultant Neurosurgery", department: "Neuro", experience: "22+ Years", status: "Active", photo: "" },
  { id: "DR006", name: "Dr. Meera Nair", speciality: "Joint Replacement Surgeon", department: "Orthopedics", experience: "16+ Years", status: "Active", photo: "" },
  { id: "DR007", name: "Dr. Sanjay Verma", speciality: "Consultant Physician", department: "Others", experience: "12+ Years", status: "Inactive", photo: "" },
  { id: "DR008", name: "Dr. Kavita Rao", speciality: "Medical Oncologist", department: "Oncology", experience: "18+ Years", status: "Active", photo: "" },
];

export const APPOINTMENTS = [
  { id: "#AP001", patient: "Rohit Sharma", doctor: "Dr. Prathap C. Reddy", date: "2026-10-21", time: "10:00 AM", status: "Confirmed", phone: "+91 98260 11001", reason: "Chest pain follow-up" },
  { id: "#AP002", patient: "Sunita Devi", doctor: "Dr. Arun Iyer", date: "2026-10-21", time: "11:30 AM", status: "Pending", phone: "+91 98260 11002", reason: "Acidity and bloating" },
  { id: "#AP003", patient: "Amit Kumar", doctor: "Dr. Ankush Singh Kotwal", date: "2026-10-21", time: "02:00 PM", status: "Confirmed", phone: "+91 98260 11003", reason: "Pre-surgery review" },
  { id: "#AP004", patient: "Priya Singh", doctor: "Dr. Shreyas Reddy", date: "2026-10-21", time: "03:30 PM", status: "Rescheduled", phone: "+91 98260 11004", reason: "Radiation plan discussion" },
  { id: "#AP005", patient: "Suresh Patel", doctor: "Dr. Arun Iyer", date: "2026-10-22", time: "09:00 AM", status: "Completed", phone: "+91 98260 11005", reason: "Endoscopy report" },
  { id: "#AP006", patient: "Neha Gupta", doctor: "Dr. Meera Nair", date: "2026-10-22", time: "12:15 PM", status: "Pending", phone: "+91 98260 11006", reason: "Knee pain" },
  { id: "#AP007", patient: "Vikram Joshi", doctor: "Dr. Arunkumar Karthikayan", date: "2026-10-23", time: "10:45 AM", status: "Confirmed", phone: "+91 98260 11007", reason: "Migraine consultation" },
  { id: "#AP008", patient: "Anjali Mishra", doctor: "Dr. Kavita Rao", date: "2026-10-23", time: "04:00 PM", status: "Pending", phone: "+91 98260 11008", reason: "Second opinion" },
  { id: "#AP009", patient: "Rahul Tiwari", doctor: "Dr. Sanjay Verma", date: "2026-10-24", time: "09:30 AM", status: "Cancelled", phone: "+91 98260 11009", reason: "General check-up" },
  { id: "#AP010", patient: "Pooja Yadav", doctor: "Dr. Prathap C. Reddy", date: "2026-10-24", time: "11:00 AM", status: "Confirmed", phone: "+91 98260 11010", reason: "ECG and echo" },
];

export const EVENTS = [
  { id: "EVT001", title: "World Heart Day Camp", date: "2026-09-29", location: "Apollo JBP Hospital", status: "Published", description: "Free cardiac screening and awareness talk.", image: "" },
  { id: "EVT002", title: "Free Health Checkup Camp", date: "2026-08-15", location: "Community Center", status: "Published", description: "Basic vitals, sugar and BP screening.", image: "" },
  { id: "EVT003", title: "Cancer Awareness Program", date: "2026-11-10", location: "Apollo JBP Hospital", status: "Draft", description: "Early detection and prevention session.", image: "" },
  { id: "EVT004", title: "Nutrition & Wellness Workshop", date: "2026-06-05", location: "Conference Hall", status: "Published", description: "Diet planning with our clinical nutritionists.", image: "" },
  { id: "EVT005", title: "Diabetes Screening Camp", date: "2026-05-20", location: "Main Hospital", status: "Published", description: "HbA1c and fasting sugar tests.", image: "" },
];

export const CASE_STUDIES = [
  { id: "CS001", title: "Minimally invasive valve replacement", department: "Cardiology", date: "2026-09-12", status: "Published", summary: "A 62-year-old patient recovers in four days.", image: "" },
  { id: "CS002", title: "Complex spine decompression", department: "Neuro", date: "2026-08-30", status: "Published", summary: "Return to walking within a week.", image: "" },
  { id: "CS003", title: "Robotic knee replacement outcomes", department: "Orthopedics", date: "2026-08-04", status: "Draft", summary: "Precision alignment and faster rehab.", image: "" },
  { id: "CS004", title: "Early-stage oncology success story", department: "Oncology", date: "2026-07-18", status: "Published", summary: "Combined therapy plan and recovery.", image: "" },
];

export const ARTICLES = [
  { id: "HL001", title: "Heart Health Tips for a Better Life", category: "Cardiology", type: "Articles", date: "2026-10-05", status: "Published", image: "" },
  { id: "HL002", title: "Understanding Diabetes", category: "Endocrinology", type: "Articles", date: "2026-09-28", status: "Published", image: "" },
  { id: "HL003", title: "Healthy Eating for a Stronger You", category: "Nutrition", type: "Videos", date: "2026-09-18", status: "Published", image: "" },
  { id: "HL004", title: "Mental Health Matters", category: "Mental Health", type: "Articles", date: "2026-09-15", status: "Draft", image: "" },
  { id: "HL005", title: "Post-Operative Care Guide", category: "General", type: "Infographics", date: "2026-09-10", status: "Published", image: "" },
  { id: "HL006", title: "Know Your Blood Pressure", category: "Cardiology", type: "Videos", date: "2026-08-22", status: "Published", image: "" },
];

export const BANNERS = [
  { id: "BN001", title: "Book your health check-up", placement: "Home hero", order: 1, status: "Published", image: "" },
  { id: "BN002", title: "24×7 Emergency care", placement: "Home strip", order: 2, status: "Published", image: "" },
  { id: "BN003", title: "Meet our cardiac team", placement: "Doctors page", order: 3, status: "Draft", image: "" },
  { id: "BN004", title: "Join our wellness camps", placement: "Events page", order: 4, status: "Published", image: "" },
];