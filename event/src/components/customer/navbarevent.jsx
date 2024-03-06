"use client";
import React from "react";
import { Typography } from "@material-tailwind/react";
import EventList from "./eventlist";
import { useDispatch, useSelector } from "react-redux";
import { eventname } from "@/redux/slices/eventSlice";

export function NavbarEvent() {
  const [openNav, setOpenNav] = React.useState(false);
  const eventSearch = useSelector((state) => state.eventSearch);
  const dispatch = useDispatch();
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <div className="bg-black px-4 py-4 lg:px-8 lg:py-4">
      <div className="mx-6 flex items-center justify-center">
        {/* <Typography as="a" href="#" className="">
          EXPERIENCE
        </Typography> */}

        <div className="flex">
          <div className="flex mr-3">
            <div className="w-full">
              <div className="flex gap-1 py-2 max-w-screen-2xl text-xs">
                <input
                  id="input"
                  type="text"
                  placeholder="search events"
                  className="border-none rounded-3xl"
                  onChange={(e) => {
                    dispatch(eventname(e.target.value));
                  }}
                />
                <div className="flex">
                  <a href="#input">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="white"
                      class="w-9 h-9 opacity-50"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 w-12 h-12 rounded-full">
            <a href={"/customer/dashboard"}>
              <img
                src={
                  "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                }
                className=" object-cover h-full rounded-full"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
