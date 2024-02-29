"use client";
import { useRef } from "react";
import { TbUpload } from "react-icons/tb";
import Link from "next/link";
import { axiosInstance } from "@/axios/axios";
import { LuTicket } from "react-icons/lu";
import React from "react";
import { useEffect } from "react";
import { PaymentComponent } from "@/components/transaction/paymentComponent";
import { FaArrowRight } from "react-icons/fa";

function ButtontoTransactionComponent({
  event,
  discountprice,
  voucherId,
  user,
  eventtransaction,
}) {
  const postTrasaction = () => {
    if (window.confirm("Confirm to buy this event ticket?")) {
      axiosInstance()
        .post("/transaction", {
          qty: 1,
          subtotalprice: Number(event?.eventprice),
          discountprice: Number(discountprice),
          totalprice: Number(event?.eventprice) - Number(discountprice),
          user_id: user?.user_id,
          voucher_id: voucherId,
          event_id: event.eventid,
        })
        .then((res) => {})
        .catch((err) => console.log(err));
    } else {
      alert("Transaction canceled, Please Try Again");
      location.reload();
    }
  };

  // useEffect(() => {
  //   postTrasaction();
  // }, []);

  return (
    <>
      <div className="bg-[#FABB11] rounded-md w-full h-full font-semibold text-[18px] grid py-3 px-4 gap-3">
        <div className="w-full h-[100px] p-2 font-semibold text-[18px] flex flex-cols gap-3">
          {/* <LuTicket className="text-[24px] " /> */}
          Proceed with Payment
        </div>

        <div className="p-5 py-2 rounded-2xl bg-[#FFFFFF] lg:mx-96 flex flex-cols gap-2 justify-between items-center">
          <div className=" text-[14px] p-2 flex flex-cols gap-2 items-center">
            Payment Method
            <FaArrowRight className=" text-[14px]" />
          </div>
          <PaymentComponent className="p-2 " />
        </div>
      </div>
      <div className="p-4">
        <button onClick={postTrasaction}>
          <Link
            href="/payment"
            className=" text-[10.5px] w-[128px] h-[40px] px-10 py-2.5 border rounded-lg text-white bg-black hover:bg-white border-black hover:text-black"
          >
            Proceed to Payment
          </Link>
        </button>
      </div>
    </>
  );
}
export default ButtontoTransactionComponent;
