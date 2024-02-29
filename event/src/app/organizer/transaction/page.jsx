import React from "react";
import { Table } from "antd";
import SidebarComponent from "@/components/organizer/sidebar";
import { MdOutlineManageHistory } from "react-icons/md";

// https://ant.design/components/table
const columns = [
  {
    title: "ID",
    dataIndex: "transactionid",
  },
  {
    title: "Customer Name",
    dataIndex: "customerid",
  },
  {
    title: "Event Name",
    dataIndex: "eventid",
  },
  {
    title: "Location",
    dataIndex: "locationid",
  },

  {
    title: "Ticket Price",
    dataIndex: "eventprice",
  },
  {
    title: "Voucher Applied",
    dataIndex: "voucherid",
  },
];
const data = [
  {
    key: "1",
    transactionid: "John Brown",
    customerid: 32,
    locationid: "New York No. 1 Lake Park",
    eventid: "Coldplay",
    eventprice: "10000000",
    voucherid: 1,
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
  },
];

function TrstionSummaryPage() {
  return (
    <>
      <div className="w-full bg-[#F1F1F1]">
        <div className="flex flex-col justify-center  max-w-[1000px] w-full items-center m-auto  ">
          <div className="w-full text-black font-semibold p-4 text-lg">
            Organizer Event Management Dashboard
          </div>
          <SidebarComponent />
          <div className="bg-[#FABB11] font-semibold text-[14px] py-3 px-5 flex flex-col-2 gap-3 w-full rounded-md ">
            <MdOutlineManageHistory className="text-[20px]" />
            Transaction History
          </div>
          <Table columns={columns} dataSource={data} size="middle" />
          {/* <Divider>Small size table</Divider>
          <Table columns={columns} dataSource={data} size="small" /> */}
        </div>
      </div>
    </>
  );
}
export default TrstionSummaryPage;
