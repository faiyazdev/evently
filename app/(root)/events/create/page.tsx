import EventForm from "@/components/features/events/EventForm";
import { getCategories } from "@/lib/actions/category.actions";
import { auth } from "@clerk/nextjs/server";

async function page() {
  const categories = await getCategories();
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId;
  return (
    <div className="wrapper">
      <h1 className="text-3xl mb-5">CreateEvent</h1>
      <EventForm userId={userId!} type="create" categories={categories} />
    </div>
  );
}

export default page;
