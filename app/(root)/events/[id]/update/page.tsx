import EventForm from "@/components/features/events/EventForm";
import { getCategories } from "@/lib/actions/category.actions";
import { getEventById } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs/server";

async function page({ params }: { params: Promise<{ id: string }> }) {
  const eventId = (await params).id;
  const event = await getEventById(eventId);
  const categories = await getCategories();
  if (!event || !categories) {
    return <div>Event or Categories not found</div>;
  }

  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId;
  return (
    <div>
      <EventForm
        type="update"
        userId={userId!}
        categories={categories}
        event={event}
      />
    </div>
  );
}

export default page;
