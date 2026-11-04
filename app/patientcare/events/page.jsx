import EventsListingContent from "./EventsListingContent";
import { getAllEvents } from "@/lib/events-service";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Health Events, Camps & Seminars | Apollo Hospitals Jabalpur",
  description:
    "Join upcoming health checkup camps, specialist webinars, wellness workshops, and community health events organized by Apollo Hospitals Jabalpur.",
  keywords: [
    "Health camps Jabalpur",
    "Medical seminars Jabalpur",
    "Free health checkup Jabalpur",
    "Apollo hospital events",
  ],
  alternates: {
    canonical: "/patientcare/events",
  },
  openGraph: {
    title: "Events & Health Camps | Apollo Hospitals Jabalpur",
    description:
      "Upcoming community health initiatives, free screening camps, and medical events in Jabalpur.",
    url: "/patientcare/events",
    siteName: "Apollo Hospitals Jabalpur",
    type: "website",
    images: [{ url: "/apollologo.webp", width: 1200, height: 630, alt: "Apollo Hospitals Events" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Events & Health Camps | Apollo Hospitals Jabalpur",
    description: "Upcoming health camps and webinars by Apollo Hospitals Jabalpur.",
    images: ["/apollologo.webp"],
  },
};



export default async function EventsListingPage() {
  let events = [];
  let error = null;
  try {
    events = await getAllEvents();
  } catch (err) {
    console.error("Failed to load events:", err);
    error = "Unable to load events at this moment.";
  }

  return <EventsListingContent initialEvents={events} initialError={error} />;
}
