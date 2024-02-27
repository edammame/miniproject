"use client";
import Link from "next/link";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "@/axios/axios";
import { IoSearch } from "react-icons/io5";
import { useDebounce } from "use-debounce";
import { Divider } from "antd";
import DatabaseComponent from "@/components/voucher/voucherDb";

import CreateVoucherComponent from "@/components/voucher/voucherCard";
import { MdOutlineManageHistory } from "react-icons/md";
import { TbShoppingCartDiscount } from "react-icons/tb";
import { MdOutlineQrCode2 } from "react-icons/md";

function VoucherPage() {
  const [search, setSearch] = useState("");
  const [vouchers, setVouchers] = useState([]);

  const [value] = useDebounce(search, 500);
  const fetchVouchers = () => {
    axiosInstance()
      .get("/voucher/", {
        params: {
          vouchername: search,
        },
      })
      .then((res) => {
        setVouchers(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchVouchers();
  }, [value]);

  const edit = async (id) => {
    const res = await axiosInstance().get("/voucher/" + id);
    const voucher = res.data.result;
    formik.setFieldValue("voucherid", voucher.voucherid);
    formik.setFieldValue("vouchername", voucher.vouchername);
    formik.setFieldValue("voucherpromodesc", voucher.voucherpromodesc);
    formik.setFieldValue("discount", voucher.discount);
    formik.setFieldValue("stock", voucher.stock);
  };

  const hapus = (voucherid) => {
    if (
      window.confirm("apakah anda yakin menghapus voucherid " + voucherid + "?")
    )
      axiosInstance()
        .delete("/voucher/" + voucherid)
        .then(() => {
          alert(`voucherid ${voucherid} berhasil dihapus`);
          fetchVouchers();
          console.log(voucherid);
        })
        .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="w-full bg-[#F1F1F1]">
        {/* Headers */}
        <div className=" bg-[#6CBF67] flex flex-col-2 font-semibold text-[16px] py-3 justify-between gap-2 px-4">
          <div className="flex flex-col-2 gap-2 ">
            <MdOutlineQrCode2 className="text-[26px]" /> Create New Promotion
            Voucher
          </div>
          <div>
            <Link
              href="/organizer/dashboard"
              className=" text-[12.5px] w-[128px] h-[40px] px-10 py-2.5 border rounded-lg text-white bg-black hover:bg-white border-black hover:text-black"
            >
              Done
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center  max-w-[1000px] w-full items-center m-auto  ">
          {/* Search Bar  */}
          <div className="py-5 w-[50%]  ">
            <div className="flex px-3  items-center gap-3 border-gray-300 border-b w-72  p-2">
              <IoSearch className=" w-5 h-5 text-black" />
              <input
                type="text"
                placeholder="Search any voucher here"
                className=" outline-none rounded-md text-[12px] py-1"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="bg-[#FABB11] w-full lg:w-1/2 font-semibold text-[14px] py-3 px-3 flex flex-col-2 gap-2 rounded-md ">
            <MdOutlineManageHistory className="text-[20px]" />
            Voucher Database
          </div>
          <table className="w-[500px] ">
            <tbody>
              <tr className=" text-[13px] font-normal bg-[#F6F7F8]">
                {/* <th className="hover:bg-white py-2">ID</th> */}
                <th className="hover:bg-white py-1">Name</th>
                {/* <th className="hover:bg-white py-2">Description</th> */}
                <th className="hover:bg-white py-1">Discount</th>
                <th className="hover:bg-white py-1">Start</th>
                <th className="hover:bg-white py-1">End</th>
              </tr>
            </tbody>

            {vouchers.map((voucher, key) => (
              <DatabaseComponent
                {...voucher}
                key={key}
                edit={() => edit(voucher.voucherid)}
                hapus={() => hapus(voucher.voucherid)}
              />
            ))}
          </table>
          {/* <div className="mt-3 text-[10px]"> */}
          <div className="bg-[#FABB11] mt-8 font-semibold text-[14px] py-3 px-5 flex flex-col-2 gap-3  w-full lg:w-1/2 rounded-md ">
            <TbShoppingCartDiscount className="text-[20px]" />
            Voucher Details
          </div>
          <CreateVoucherComponent fetchVouchers={fetchVouchers} />
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
export default VoucherPage;
