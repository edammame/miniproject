"use client";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "@/axios/axios";
import { IoSearch } from "react-icons/io5";
import { useDebounce } from "use-debounce";
import { Divider } from "antd";
import DatabaseComponent from "@/components/voucher/voucherDb";
import SidebarComponent from "@/components/sidebar";
import CreateVoucherComponent from "@/components/voucher/voucherCard";

function VoucherPage() {
  const [search, setSearch] = useState("");
  const [vouchers, setVouchers] = useState([]);

  const [value] = useDebounce(search, 500);
  const fetchVouchers = () => {
    axiosInstance()
      .get("/vouchers/", {
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
    const res = await axiosInstance().get("/vouchers/" + id);
    const voucher = res.data.result;
    formik.setFieldValue("voucherid", voucher.id);
    formik.setFieldValue("vouchername", voucher.vouchername);
    formik.setFieldValue("voucherpromodesc", voucher.voucherpromodesc);
    formik.setFieldValue("discount", voucher.discount);
  };

  const hapus = (id) => {
    if (window.confirm("apakah anda yakin menghapus product id " + id + "?"))
      axiosInstance()
        .delete("/vouchers/" + id)
        .then(() => {
          alert(`id ${id} berhasil dihapus`);
          fetchVouchers();
        })
        .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="w-full bg-[#F1F1F1]">
        <div className="flex flex-col justify-center  max-w-[1000px] w-full items-center m-auto  ">
          <div className="w-full text-black font-semibold p-4 text-lg">
            Organizer Event Management Dashboard
          </div>
          <SidebarComponent />
          {/* Search Bar  */}
          <div className="py-5 w-full ">
            <div className="flex px-3 items-center gap-3 border-gray-300 border-b w-72  p-2">
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
          <Divider>Voucher Database</Divider>
          <table className="w-full">
            <tbody>
              <tr className=" text-[13px] font-normal bg-[#F6F7F8]">
                <th className="hover:bg-white py-2">V-ID</th>
                <th className="hover:bg-white py-2">Name</th>
                <th className="hover:bg-white py-2">Description</th>
                <th className="hover:bg-white py-2">Discount</th>
                <th className="hover:bg-white py-2">Start</th>
                <th className="hover:bg-white py-2">End</th>
              </tr>
            </tbody>

            {vouchers.map((voucher, key) => (
              <DatabaseComponent
                {...voucher}
                key={key}
                edit={() => edit(voucher.id)}
                hapus={() => hapus(voucher.id)}
              />
            ))}
          </table>
          {/* <div className="mt-3 text-[10px]"> */}
          <Divider>Voucher Details</Divider>
          <CreateVoucherComponent />
          {/* </div> */}
        </div>
      </div>
    </>
  );
}
export default VoucherPage;
