import { axiosInstanceSSR } from "@/axios/axios";
import React from "react";
import { useParams } from "react-router-dom";

import PromoComponent from "@/components/transaction/promoComponent";
import HeadComponent from "@/components/transaction/headerComponent";
import moment from "moment/moment";

// dont forget to write async
async function TransactionPage({ params }) {
  const { eventid } = params;

  const event = (await axiosInstanceSSR().get("/events/" + eventid)).data
    .result;
  console.log(event);

  return (
    <>
      <HeadComponent />
      <div className=" items-centers flex flex-col  bg-[#F1F1F1]">
        {/* Event Details */}
        <div className="flex flex-col justify-center max-w-screen-2xl w-full items-center m-auto ">
          <div className="grid max-w-screen-2xl  md:grid-cols-2 p-7 gap-3 w-full  sm:grid-cols-1">
            <div className="m-auto ">
              <img
                className=" max-w-[734px]  max-h-[523px]"
                src={process.env.API_URL + event?.eventposter}
                alt=""
              />
            </div>
            <div className=" pt-10 flex flex-col gap-2 w-9/12">
              <div className=" font-bold text-2xl">{event?.eventname}</div>

              <div className="my-2">
                <div className="text-[12px]">start from</div>
                <div className="font-semibold text-lg">
                  IDR {Number(event?.eventprice).toLocaleString("id-ID")}
                </div>
              </div>

              <div className="font-semibold">About the event</div>
              <hr />
              {/* eventorganizer */}
              <div className=" py-2">
                <div className="font-semibold text-[12px]">
                  Event Organized by:
                </div>
                <div className=" text-justify text-[14px] p-2 bg-gray-200">
                  {event?.user?.username}
                </div>
              </div>
              {/* eventlocation */}
              <div className=" py-2">
                <div className="font-semibold text-[12px]">Event Location:</div>
                <div className=" text-justify text-[14px] p-2 bg-gray-200">
                  {event?.location?.eventlocation}
                </div>
              </div>
              {/* eventdate */}
              <div className=" py-2">
                <div className="font-semibold  text-[12px]"> Time:</div>
                <div className=" text-justify text-[14px] p-2 bg-gray-200">
                  {moment(event?.eventstartdate).format("YYYY-MM-DD HH:mm")} -
                  {moment(event?.eventenddate).format("YYYY-MM-DD HH:mm")}
                </div>
              </div>
              {/* availableseat */}
              <div className=" py-2">
                <div className="font-semibold  text-[12px] ">
                  {" "}
                  Event Capacity:
                </div>
                <div className=" text-justify text-[14px] p-2 bg-gray-200">
                  {event?.availableseat}
                </div>
              </div>
              {/* type */}
              <div className=" py-2">
                <div className="font-semibold  text-[12px]"> Event Type:</div>
                <div className=" text-justify text-[14px] p-2 bg-gray-200">
                  {event?.eventtype}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Voucher */}
        <div className="flex flex-col p-8 gap-14  ">
          <PromoComponent event={event} />
        </div>
        {/* ClosingTag */}
      </div>
    </>
  );
}
export default TransactionPage;
