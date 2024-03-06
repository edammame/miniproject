"use client";
import { axiosInstance } from "@/axios/axios";
import React, { useState, useEffect } from "react";
import { Typography } from "@material-tailwind/react";
import { useDebounce } from "use-debounce";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { eventlocation } from "@/redux/slices/eventSlice";

function EventList() {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [value] = useDebounce(search, 500);
  const eventSearch = useSelector((state) => state.eventSearch);
  const dispatch = useDispatch();

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
      <div className="mt-5 pl-8 flex">
        <div className="flex">
          <a href="#input1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#212121"
              class="w-9 h-9 opacity-30"
            >
              <path
                fill-rule="evenodd"
                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
        <input
          id="input1"
          type="text"
          placeholder="event location"
          className="border-none rounded-3xl"
          onChange={(e) => {
            dispatch(eventlocation(e.target.value));
          }}
        />
      </div>
      <div className="flex flex-col m-auto gap-6 px-8">
        {events.map((event, key) => (
          <EventCard {...event} key={key} />
        ))}
      </div>
    </div>
  );
}
export default EventList;

export function EventCard({
  eventid,
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
      href={"/customer/events/" + eventid}
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
