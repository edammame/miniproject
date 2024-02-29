"use client";
import { axiosInstance } from "@/axios/axios";
import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

function EventList() {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [value] = useDebounce(search, 500);
  const eventSearch = useSelector((state) => state.eventSearch);

  const fetchEvents = () => {
    axiosInstance()
      .get("/events", {
        params: {
          eventname: eventSearch.eventname,
          eventlocation: eventSearch.eventlocation,
        },
      })
      .then((res) => {
        setEvents(res.data.result);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchEvents();
  }, [eventSearch]);

  return (
    <div className="w-full  ">
      <div className="flex m-auto gap-3 max-w-lg">
        {events.map((event, key) => (
          <EventCard {...event} key={key} />
        ))}
      </div>
    </div>
  );
}
export default EventList;

export function EventCard({
  eventname,
  eventposter,
  eventdescription,
  eventtype,
  eventlocation,
  eventprice,
}) {
  const dispatch = useDispatch();

  return (
    <Link
      className="flex flex-col items-center md:items-start "
      href={"/customer/events/[:eventid]"}
    >
      <img
        src={process.env.API_URL + eventposter}
        className=" max-h-[154px] max-w-[212px] w-full"
        alt=""
      />
      <div className="p-5 px-0 w-full h-full flex flex-col justify-between gap-2 ">
        <div className=" font-bold w-full ">{eventname}</div>

        <Typography>{eventdescription}</Typography>

        <h3>{eventtype}</h3>

        <div>{eventlocation}</div>

        <div className="text-[#249C58] font-semibold  ">
          IDR {Number(eventprice).toLocaleString()}
        </div>
      </div>
    </Link>
  );
}
