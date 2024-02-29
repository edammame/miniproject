"use client";
import { axiosInstance } from "@/axios/axios";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function EventCard(event) {
  const dispatch = useDispatch();
  const eventsList = useSelector((state) => state.event);
  //   const { eventname, eventtype, eventlocation, eventcategory } = eventsList;

  //   useEffect(() => {
  //     fetchEvents();
  //   }, [dispatch]);

  return (
    <>
      <div>
        <div>{event.eventname}</div>
        {/* {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : ( */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div> */}
        {/* )} */}
      </div>
    </>
  );
}
export default EventCard;
