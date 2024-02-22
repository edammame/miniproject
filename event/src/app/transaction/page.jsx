"use client";
import { axiosInstanceSSR } from "@/axios/axios";
import React, { useState } from "react";
import DropDown from "../../components/dropdown";
import { TbDiscount2 } from "react-icons/tb";
import { LuTicket } from "react-icons/lu";
import { MdPayment } from "react-icons/md";
import { useEffect, useRef } from "react";
import { TbUpload } from "react-icons/tb";

// dont forget to write async
function TransactionPage({ params }) {
  const { eventId } = params;

  // const event = (await axiosInstanceSSR().get("/events/" + eventId)).data
  //   .result;
  // console.log(event);

  const options = [
    { value: "option1", label: "Independence45" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const upload = useRef(null);

  return (
    <>
      <div className="bg-[#FABB11] font-semibold text-[18px] py-3 px-5 flex flex-col-2 gap-3">
        <LuTicket className="text-[24px]" />
        Booking Detail
      </div>
      <div className=" items-centers flex flex-col  bg-[#F1F1F1]">
        {/* Buy  */}
        <div className="flex flex-col justify-center max-w-screen-2xl w-full items-center m-auto ">
          <div className="grid max-w-screen-2xl  md:grid-cols-2 p-7 gap-3 w-full  sm:grid-cols-1">
            <div className="m-auto ">
              {" "}
              event image here
              {/* <img
                className=" max-w-[734px]  max-h-[523px]"
                // src={process.env.API_URL + product.image_url}
                alt=""
              /> */}
            </div>
            <div className=" pt-10 flex flex-col gap-4  w-9/12">
              <div className=" font-bold text-2xl">event name</div>
              {/* <div className=" font-bold text-3xl">{event.eventname}</div> */}
              <div className="my-2">
                <div>start from</div>
                <div className="font-semibold text-lg">
                  IDR ticketprice
                  {/* IDR {Number(event?.eventprice).toLocaleString("id-ID")} */}
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
              <div className="font-semibold">Event Location:</div>
              <div className=" text-justify text-sm">
                {
                  // {event.eventlocation} ||
                  "Location Description"
                }
              </div>
              <div className="font-semibold"> Date & Time:</div>
              <div className=" text-justify text-sm">
                {
                  // {event.eventdate} ||
                  "startdate & enddate"
                }
              </div>
            </div>
          </div>
        </div>
        {/* Voucher */}
        <div className="flex flex-col p-8 gap-14 ">
          {/* Form Promo */}
          <div>
            <div className=" bg-[#FABB11] flex flex-col-2 rounded-md font-semibold text-[16px] py-3 gap-2 px-4">
              <TbDiscount2 className="text-[26px]" /> Apply promo before
              check-out
            </div>
            <div className="bg-white p-3">
              <form action="" className="flex gap-3" id="form">
                <div className="h-[40px] text-[12.5px] w-[168px]">
                  <DropDown
                    // label="Select an option"
                    options={options}
                    selected={selectedOption}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="h-[40px] mt-1 text-[12.5px] border w-[128px] rounded-lg text-white bg-black hover:bg-white border-black hover:text-black"
                >
                  Apply
                </button>
              </form>
            </div>
          </div>
          {/* Apply Referal Code */}
          <div>
            <div className=" bg-[#FABB11] flex flex-col-2 rounded-md font-semibold text-[16px] py-3 gap-2 px-4">
              <TbDiscount2 className="text-[26px]" /> Apply referal code
            </div>
            <div className="bg-white p-3">
              <form action="" className="flex gap-3" id="form">
                <div className="h-[40px] text-[12.5px] w-[168px]">
                  <DropDown
                    // label="Select an option"
                    options={options}
                    selected={selectedOption}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="h-[40px] mt-1 text-[12.5px] border w-[128px] rounded-lg text-white bg-black hover:bg-white border-black hover:text-black"
                >
                  Apply
                </button>
              </form>
            </div>
          </div>
          {/* Payment */}
          <div>
            <div className=" bg-[#FABB11] flex flex-col-2 rounded-md font-semibold text-[16px] py-3 gap-2 px-4">
              <MdPayment className="text-[22px]" /> Payment Summary
            </div>
            <div className="bg-white p-3 flex flex-col">
              <div className=" text-[12.5px]">Upload proof of payment here</div>
              <form action="" className="flex gap-3" id="form">
                <input
                  type="file"
                  placeholder=" Poster Url"
                  className="border p-1 text-[12.5px] text-black rounded-md  w-96 hidden"
                  id="eventposter"
                  onChange={(e) => renderFile(e)}
                  ref={upload}
                />
                <button
                  className="bg-full bg-[#FADB7A] h-[40px] mt-1 text-[12.5px] border w-[128px] text-black px-3  w-38 flex gap-2
            items-center
           rounded-md "
                  type="button"
                  onClick={() => {
                    upload.current.click();
                  }}
                >
                  <TbUpload />
                  Payment
                </button>

                <button
                  type="submit"
                  className="h-[40px] mt-1 text-[12.5px] border w-[128px] rounded-lg text-white bg-black hover:bg-white border-black hover:text-black"
                >
                  Upload
                </button>
              </form>
            </div>
          </div>
          {/* ClosingTag */}
        </div>
      </div>{" "}
    </>
  );
}
export default TransactionPage;
