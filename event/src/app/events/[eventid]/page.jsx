import { axiosInstanceSSR } from "@/axios/axios";
import React from "react";
import { useParams } from "react-router-dom";
import { MdPayment } from "react-icons/md";
import PromoComponent from "@/components/transaction/promoComponent";
import UploadTfComponent from "@/components/transaction/transactionComponent";
import HeadComponent from "@/components/transaction/headerComponent";

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
        {/* Buy  */}
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

              <form action="" className="flex gap-3" id="form">
                <input
                  className="h-[40px] mt-1 text-[12.5px] border w-[128px] p-5 rounded-lg text-center"
                  type="number"
                  min={1}
                  placeholder="Quantity"
                  required
                  id="qty"
                ></input>
                <button
                  type="submit"
                  className="h-[40px] mt-1 text-[12.5px] border w-[128px] rounded-lg text-white bg-black hover:bg-white border-black hover:text-black"
                >
                  Buy
                </button>
              </form>

              <div className="font-semibold">About the event</div>
              <hr />
              {/* eventorganizer */}
              <div className=" py-2">
                <div className="font-semibold text-[12px]">
                  Event Organized by:
                </div>
                <div className=" text-justify text-[14px]">
                  {event?.user?.username}
                </div>
              </div>
              {/* eventlocation */}
              <div className=" py-2">
                <div className="font-semibold text-[12px]">Event Location:</div>
                <div className=" text-justify text-[14px]">
                  {event?.location?.eventlocation}
                </div>
              </div>
              {/* eventdate */}
              <div className=" py-2">
                <div className="font-semibold  text-[12px]"> Time:</div>
                <div className=" text-justify text-[14px]">
                  {event?.eventstartdate} - {event?.eventenddate}
                </div>
              </div>
              {/* availableseat */}
              <div className=" py-2">
                <div className="font-semibold  text-[12px]">
                  {" "}
                  Event Capacity:
                </div>
                <div className=" text-justify text-[14px]">
                  {event?.availableseat}
                </div>
              </div>
              {/* type */}
              <div className=" py-2">
                <div className="font-semibold  text-[12px]"> Event Type:</div>
                <div className=" text-justify text-[14px]">
                  {event?.eventtype}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Voucher */}
        <div className="flex flex-col p-8 gap-14 ">
          <PromoComponent />

          {/* Payment */}
          <div>
            <div className=" bg-[#FABB11] flex flex-col-3 rounded-md font-semibold text-[16px] py-3 gap-2 px-4">
              <MdPayment className="text-[22px]" /> Payment Summary
            </div>
            {/* Content */}
            <div className="bg-white p-3 flex flex-col gap-1">
              {/* Subtotal Ticket Price */}
              <div className=" flex flex-col-2 justify-between">
                <div className="font-semibold text-[14px] px-2">
                  Subtotal Ticket Price:
                </div>
                <div className=" text-justify text-[14px] px-3">
                  {
                    // {event.eventprice} * {quantity} ||
                    "IDR eventprice"
                  }
                </div>
              </div>
              {/* Referal */}
              <div className=" flex flex-col-2 justify-between">
                <div className="font-semibold text-[14px] px-2">
                  {" "}
                  Referal Discount:
                </div>
                <div className=" text-justify text-[14px] px-2">
                  {
                    // {referaldiscount} ||
                    "IDR referal"
                  }
                </div>
              </div>
              {/* Promo */}
              <div className=" flex flex-col-2 justify-between">
                <div className="font-semibold text-[14px] px-2">
                  {" "}
                  Promo Discount:
                </div>
                <div className=" text-justify text-[14px] px-2">
                  {
                    // {voucherdiscount} ||
                    "IDR discount"
                  }
                </div>
              </div>
              {/* Total Payment */}

              <div className=" flex flex-col-2 justify-between">
                <div className="font-semibold text-[14px] px-2">
                  {" "}
                  Total Payment:
                </div>
                <div className=" text-justify text-[14px] px-2">
                  {
                    // {subtotal_ticket_price} - {referaldiscount}- {voucherdiscount} ||
                    "IDR payment"
                  }
                </div>
              </div>
            </div>
            <UploadTfComponent />
          </div>
          {/* ClosingTag */}
        </div>
      </div>
    </>
  );
}
export default TransactionPage;
