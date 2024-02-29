"use client";
import { useEffect, useRef } from "react";
import { TbUpload } from "react-icons/tb";
import Link from "next/link";
import { axiosInstance } from "@/axios/axios";

function ButtontoTransactionComponent({
  event,
  discountprice,
  promotion,
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
          voucher_id: promotion.voucher_id,
          eventid: event.eventid,
          eventtransaction: [],
        })
        .then((res) => {
          // alert("success to buy event ticket");
        })
        .catch((err) => console.log(err));
    }

    // location.reload();
  };

  // useEffect(() => {
  //   postTrasaction();
  // }, []);

  return (
    <>
      <button onClick={postTrasaction}>
        <Link
          href="/payment"
          className=" text-[12.5px] w-[128px] h-[40px] px-10 py-2.5 border rounded-lg text-white bg-black hover:bg-white border-black hover:text-black"
        >
          Proceed to Payment
        </Link>
      </button>
    </>
  );
}
export default ButtontoTransactionComponent;
