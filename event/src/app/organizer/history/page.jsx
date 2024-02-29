"use client";
import NavbarComponent from "@/components/organizer/navbarorganizer";
import { useState, useEffect } from "react";
import { FaRegFolderOpen } from "react-icons/fa";
import { MdFaceRetouchingNatural } from "react-icons/md";
import { axiosInstance } from "@/axios/axios";
import { IoSearch } from "react-icons/io5";
import React from "react";
import TransactionDatabase from "@/components/organizer/transactionDatabase";
import { useDebounce } from "use-debounce";

function TransactionPage() {
  //fetchTransaction
  const [transaction, setTransaction] = useState([]);
  //fetchTransactionbyEventId
  const [count, setCount] = useState([]);

  //ini search name
  const [searchname, setSearchname] = useState("");
  const [value] = useDebounce(searchname, 500);

  const fetchTransaction = () => {
    axiosInstance()
      .get("/transaction")
      .then((res) => {
        setTransaction(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  const countTransaction = (eventid) => {
    axiosInstance()
      .get("/transaction/counttransaction/" + eventid, {
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
          <NavbarComponent />
          {/* Search Bar  */}
          <div className="py-5 w-[50%]  ">
            <div className="flex px-3 items-center gap-3 border-gray-300 w-72 ">
              <IoSearch className=" w-5 h-5 text-black" />
              <input
                type="text"
                placeholder="Search"
                className=" outline-none rounded-md text-[12px] py-1"
                value={searchname}
                onChange={(e) => setSearchname(e.target.value)}
              />
            </div>
          </div>
          <div className=" bg-[#FABB11] mt-3 flex flex-col-2 font-semibold text-[16px] py-3 justify-between gap-2 px-4 w-full rounded-md">
            <div className="flex flex-col-2 gap-4 text-[15.5px] px-1">
              Transaction Overview
            </div>
          </div>
          {/* TransactionOverview */}
          <div className="flex flex-col-2 gap-2 m-2 ">
            <div className="bg-white w-[100px] h-[100px] rounded-md p-2 font-semibold text-[10px]">
              Number of Transaction
              <div className=" text-lg">20</div>{" "}
            </div>
            <div className="bg-white w-[160px] h-[100px] rounded-md p-2 font-semibold text-[10px]">
              Total Revenue per Event
              <div className=" text-lg">IDR 20.000.000</div>
            </div>
            {/* <div className="bg-white w-[100px] h-[100px] rounded-md p-2 font-semibold text-[10px]">
              Total Transaction per Event
              <div className=" text-lg">5</div>
            </div> */}
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
                <th className="hover:bg-white py-1">Event Name</th>
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
