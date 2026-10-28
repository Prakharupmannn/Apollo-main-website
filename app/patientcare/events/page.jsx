import EventsListingContent from "./EventsListingContent";

export const dynamic = "force-dynamic";

async function getEvents() {
  const apiKey = process.env.API_KEY || "apollo54321";
  const apiUrl = process.env.EVENTS_API_URL || "http://localhost:3000/api/events";

  try {
    const res = await fetch(apiUrl, {
      headers: {
        "x-api-key": apiKey,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      console.error(`Events API returned HTTP ${res.status}`);
      return { events: [], error: "Unable to load events at this moment." };
    }

    const data = await res.json();
    if (data.success && Array.isArray(data.events)) {
      return { events: data.events, error: null };
    }

    return { events: [], error: data.message || "Invalid events response." };
  } catch (error) {
    console.error("Failed to fetch events from API:", error);
    return { events: [], error: "Unable to connect to events service." };
  }
}

export default async function EventsListingPage() {
  const { events, error } = await getEvents();

  return <EventsListingContent initialEvents={events} initialError={error} />;
}