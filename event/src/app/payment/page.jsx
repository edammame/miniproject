"use client";
import { LuTicket } from "react-icons/lu";
import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { PaymentComponent } from "@/components/transaction/paymentComponent";
import { FaArrowRight } from "react-icons/fa";

function PaymentPage() {
  return (
    <>
      <div className="bg-[#FABB11] w-full h-full font-semibold text-[18px] grid py-3 px-8 gap-3">
        <div className="w-full h-[100px] font-semibold text-[18px] py-3 px-5 flex flex-cols gap-3">
          <LuTicket className="text-[24px] " />
          Proceed with Payment
        </div>

        <div className="p-5 m-2 py-2 rounded-2xl bg-[#FFFFFF] lg:mx-96 flex flex-cols gap-2 justify-between items-center">
          <div className=" text-[14px] p-2 flex flex-cols  gap-2 items-center">
            Payment Method
            <FaArrowRight className=" text-[14px]" />
          </div>{" "}
          <PaymentComponent className="p-2 " />
        </div>
      </div>
    </>
  );
}
export default PaymentPage;
