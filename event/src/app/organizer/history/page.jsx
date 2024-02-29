"use client";
import SidebarComponent from "@/components/sidebar";
import { useState, useEffect } from "react";
import { FaRegFolderOpen } from "react-icons/fa";
import { MdFaceRetouchingNatural } from "react-icons/md";
import { axiosInstance } from "@/axios/axios";
import React from "react";
import TransactionDatabase from "@/components/organizer/transactionDatabase";
import { useDebounce } from "use-debounce";

function TransactionPage() {
  //fetchTransaction
  const [transaction, setTransaction] = useState([]);
  const [count, setCount] = useState([]);

  //ini search name
  const [searchname, setName] = useState("");
  const [value] = useDebounce(searchname, 500);

  const fetchTransaction = () => {
    axiosInstance()
      .get("/transaction")
      .then((res) => {
        setTransaction(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  const countTransaction = () => {
    axiosInstance()
      .get("/transaction/counttransaction", {
        params: {
          eventid: searchname,
          eventname: searchname,
        },
      })
      .then((res) => {
        setCount(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTransaction();
  }, []);

  useEffect(() => {
    countTransaction();
  }, []);

  console.log(transaction, "ini print transaction");
  console.log(count), " ini print counts";

  return (
    <>
      <div className="w-full bg-[#F1F1F1]">
        <div className="flex flex-col justify-center  max-w-[1000px] w-full items-center m-auto  ">
          <div className="w-full text-black font-semibold p-4 text-lg">
            Organizer Event Management Dashboard
          </div>
          <SidebarComponent />
          {/* Search Bar  */}
          <div className="py-5 w-[50%]  ">
            <div className="flex px-3  items-center gap-3 border-gray-300 border-b w-72  p-2">
              <IoSearch className=" w-5 h-5 text-black" />
              <input
                type="text"
                placeholder="Search any voucher here"
                className=" outline-none rounded-md text-[12px] py-1"
                value={searchname}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className=" bg-[#FABB11] mt-3 flex flex-col-2 font-semibold text-[16px] py-3 justify-between gap-2 px-4 w-full rounded-md">
            <div className="flex flex-col-2 gap-4 text-[15.5px] px-1">
              Transaction Overview
            </div>
          </div>
          {/* TransactionOverview */}
          <div className="flex flex-col ">
            <div className="bg-white w-[100px] h-[100px] rounded-md p-2 font-semibold text-[10px]">
              Number of Transaction
            </div>
            <div className=""></div>
          </div>

          {/* Header */}
          <div className=" bg-[#FABB11] mt-3 flex flex-col-2 font-semibold text-[16px] py-3 justify-between gap-2 px-4 w-full rounded-md">
            <div className="flex flex-col-2 gap-4 text-[15.5px] px-1">
              <FaRegFolderOpen className="text-[26px]" />
              Transaction Database
            </div>
          </div>
          <table className=" w-full table-auto lg:w-1/2 overflow-scroll">
            <tbody>
              <tr className=" text-[13px] font-normal bg-[#F6F7F8]">
                <th className="hover:bg-white py-1">TRID</th>

                <th className="hover:bg-white py-1">Customer Name</th>
                <th className="hover:bg-white py-1">Voucher Name</th>
                <th className="hover:bg-white py-1">Voucher ID</th>
              </tr>
            </tbody>
            {transaction.map((transaction, key) => (
              <TransactionDatabase
                {...transaction}
                key={key}
                // edit={() => edit(voucher.voucherid)}
                // hapus={() => hapus(voucher.voucherid)}
              />
            ))}
          </table>
        </div>
      </div>
    </>
  );
}
export default TransactionPage;
