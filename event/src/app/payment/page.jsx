"use client";
import { LuTicket } from "react-icons/lu";
import React from "react";
import Link from "next/link";
import { RiVerifiedBadgeFill } from "react-icons/ri";

function PaymentPage() {
  return (
    <>
      <div className="bg-[#FABB11] w-full h-full items-center justify-items-center justify-center font-semibold text-[18px] grid py-3 px-8 gap-3">
        <div className="w-full h-[100px] font-semibold text-[18px] py-3 px-5 flex flex-cols gap-3">
          <LuTicket className="text-[24px] " />
          Booking Ticket Successful
        </div>
        <RiVerifiedBadgeFill className="text-[90px] text-yellow-100 justify-items-center animate-bounce" />

        <Link href="/events">
          <div className="p-5 m-2 w-[150px] justify-items-center text-sm py-2 rounded-2xl bg-[#FFFFFF] lg:mx-96 flex flex-cols gap-2 justify-between items-center">
            Return to Home
          </div>
        </Link>
        <Link href="/ratings">
          <div className="p-5 m-2 w-[150px] justify-items-center text-sm py-2 rounded-2xl bg-[#FFFFFF] lg:mx-96 flex flex-cols gap-2 justify-between items-center">
            Rate Event
          </div>
        </Link>
      </div>
    </>
  );
}
export default PaymentPage;
