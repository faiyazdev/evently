import { Button } from "@/components/ui/button";
import { getEvents } from "@/lib/actions/event.actions";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const events = await getEvents();
  return (
    <>
      <section className="min-h-[83vh] py-5 md:py-10">
        <div className="wrapper h-full grid grid-cols-1 md:grid-cols-2 items-center gap-5 md:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Host, Connect, Celebrate: Your Events, Our Platform!
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Book and learn helpful tips from 3,168+ mentors in world-class
              companies with our global community.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>

          <Image
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>

      <section
        id="events"
        className="flex wrapper  flex-col gap-8 md:gap-12 my-8"
      >
        <h2 className="h2-bold">
          Trust by <br /> Thousands of Events
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          {/* <Search />
          <CategoryFilter /> */}
        </div>
        <div className="">
          {events.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="flex flex-col gap-3 rounded-lg border p-4"
                >
                  <h3 className="h3-bold">{event.title}</h3>
                  <p className="p-regular-16">{event.description}</p>
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
      </section>
      <div />
    </>
  );
}
