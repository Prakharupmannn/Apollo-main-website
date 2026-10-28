import EventsListingContent from "./EventsListingContent";
import { getAllEvents } from "@/lib/events-service";

export const dynamic = "force-dynamic";

export default async function EventsListingPage() {
  try {
    const events = await getAllEvents();
    return <EventsListingContent initialEvents={events} initialError={null} />;
  } catch (error) {
    console.error("Failed to load events:", error);
    return (
      <EventsListingContent
        initialEvents={[]}
        initialError="Unable to load events at this moment."
      />
    );
  }
}
