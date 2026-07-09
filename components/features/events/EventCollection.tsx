import { EventDto } from "@/lib/dto/event.dto";
import Link from "next/link";

type EventCollectionProps = {
  data: EventDto[];
  collectionEventType?: "All_Events" | "My_Tickets";
  emptyTitle: string;
  collectionStateSubtext: string;
  limit: number;
  page: number;
  totalPages: number;
};
function EventCollection({ data: events }: EventCollectionProps) {
  return (
    <div className="">
      {events.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event._id}
              className="flex flex-col gap-3 rounded-lg border p-4"
            >
              <h3 className="h3-bold">{event.title}</h3>
              <p className="p-regular-16">
                {event.description} - {event.category.name}
              </p>
              <Link
                href={`/events/${event._id}`}
                className="text-blue-500 hover:underline"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No events found.</p>
      )}
    </div>
  );
}

export default EventCollection;
