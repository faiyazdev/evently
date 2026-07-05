import { getEventById } from "@/lib/actions/event.actions";
import { format } from "date-fns";
import Link from "next/link";

async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const event = await getEventById(id);
  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="wrapper">
      <h3>Event Details {event.title}</h3>
      <p>{event.description}</p>
      <p>Price: {event.price || "Not specified"}</p>
      <p>Location: {event.location}</p>
      <p>Organizer: {event.organizer?._id || "Not specified"}</p>
      <p>Category: {event.category?._id || "Not specified"}</p>
      <p>Start Date: {format(event.startDateTime, "PPP p")}</p>
      <p>End Date: {format(event.endDateTime, "PPP p")}</p>
      <Link href={`/events/${id}/update`}>Update Event</Link>
    </div>
  );
}

export default EventPage;
