"use client";
import EventCard from "@/components/customer/eventcard";
import EventList from "@/components/customer/eventlist";
import { NavbarEvent } from "@/components/customer/navbarevent";

function Page() {
  return (
    <>
      <NavbarEvent />
      {/* <EventCard /> */}

      <EventList />
    </>
  );
}

export default Page;
