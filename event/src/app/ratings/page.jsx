import { VideoComponent } from "@/components/landingpage/video/video";
import Ratings from "@/components/transaction/ratings";
import React from "react";

const Page = () => {
  return (
    <>
      <div>
        <a href={"/customer/events"} className="m-3">
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="black"
              class="w-10 h-10 opacity-20"
            >
              <path
                fill-rule="evenodd"
                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </a>
        <div className="flex justify-center items-center mt-20">
          <div className="flex flex-col gap-5 items-center p-32">
            <h1 className="font-bold">How's Your EXPERIENCE?</h1>
            <div className="">
              <Ratings initialRating={0} maxRating={5} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
