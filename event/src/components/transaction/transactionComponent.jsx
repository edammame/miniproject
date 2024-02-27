"use client";
import { useEffect, useRef } from "react";
import { TbUpload } from "react-icons/tb";
import Link from "next/link";
import { axiosInstance } from "@/axios/axios";

function ButtontoTransactionComponent({ event, discountprice, promotion }) {
  const postTrasaction = () => {
    if (window.confirm("Confirm to buy this event ticket?")) {
      axiosInstance()
        .post("/transactions/", {
          qty: 1,
          discountprice: Number(discountprice),
          totalprice: (
            Number(event?.eventprice) - Number(discountprice)
          ).toLocaleString("id-ID"),
          user_id: 1,
          voucher_id: promotion.voucher_id,
          subtotalprice: Number(event?.eventprice),
          qty: 1,
          total: event.price,
          eventid: event.eventid,
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
