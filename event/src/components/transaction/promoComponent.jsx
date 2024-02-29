"use client";

import { TbDiscount2 } from "react-icons/tb";
import { useEffect, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import { axiosInstance } from "@/axios/axios";
import { createContext } from "react";
import { LuTicket } from "react-icons/lu";
import Link from "next/link";
import ButtontoTransactionComponent from "@/components/transaction/transactionComponent";

function PromoComponent({ event }) {
  const [promotion, setPromotion] = useState([]);
  const [voucherId, setVoucherId] = useState(null);
  const [discountprice, SetDiscountPrice] = useState();

  useEffect(() => {
    console.log(voucherId, "ini voucher nominal");
  });

  const fetchPromotion = () => {
    axiosInstance()
      .get("/voucher", {
        params: {
          vouchername: "",
        },
      })
      .then((res) => {
        setPromotion(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  // };
  useEffect(() => {
    fetchPromotion();
  }, []);

  return (
    <>
      {/* Voucher */}
      <div>
        <div className=" bg-red-500 flex flex-col-2 rounded-md font-semibold text-[16px] py-3 gap-2 px-4">
          <TbDiscount2 className="text-[26px]" /> Apply promo before check-out
        </div>
        <div className="bg-white p-3">
          <form
            action=""
            className="flex flex-cols-2 gap-10 pl-2 items-center"
            id="form"
          >
            <div className="h-[40px] text-[12.5px] w-[160px]">
              <Select
                required
                id="discount"
                label="Voucher Discount"
                name="discount"
                className="bg-white"
                onChange={(value) => {
                  // formik.setFieldValue("discount", value);
                  setVoucherId(
                    promotion.length ? promotion[value].voucherid : null
                  );
                  SetDiscountPrice(
                    promotion.length ? promotion[value].discount : 0
                  );
                }}
              >
                {promotion.map((p, key) => (
                  <Option key={key} value={key}>
                    {p.vouchername.toLocaleString()}
                  </Option>
                ))}
              </Select>
            </div>
          </form>
        </div>
      </div>

      <div>
        <div className=" bg-[#FABB11] flex flex-col-3 rounded-md font-semibold text-[16px] py-3 gap-2 px-4">
          <LuTicket className="text-[22px]" /> Booking Summary
        </div>
        {/* Content */}
        <div className="bg-white p-3 flex flex-col gap-1">
          {/* Subtotal Ticket Price */}
          <div className=" flex flex-col-2 justify-between">
            <div className="font-semibold text-[14px] p-2">
              Subtotal Ticket Price:
            </div>
            <div className=" text-justify text-[14px] p-2">
              IDR {Number(event?.eventprice).toLocaleString("id-ID")}
            </div>
          </div>
          {/* Ini referal promotion */}
          <div className=" flex flex-col-2 justify-between">
            <div className="font-semibold text-[14px] p-2">
              Voucher Discount:
            </div>
            <div className=" text-justify text-[14px] p-2">
              IDR {Number(discountprice || 0).toLocaleString("id-ID")}
            </div>
          </div>

          {/* Total Payment */}
          <div className=" flex flex-col-2 justify-between">
            <div className="font-semibold text-[14px] p-2">Total Discount</div>
            <div className=" text-justify text-[14px] p-2">
              IDR{" "}
              {(
                Number(event?.eventprice) - Number(discountprice || 0)
              ).toLocaleString("id-ID")}
            </div>
          </div>
        </div>
      </div>

      <div className="justify-center">
        <ButtontoTransactionComponent
          event={event}
          discountprice={discountprice}
          voucherId={voucherId}
        />
      </div>
    </>
  );
}

export default PromoComponent;
