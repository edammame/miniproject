import React from "react";
import Link from "next/link";

function SidebarComponent() {
  return (
    <>
      <div className="flex flex-col-2 gap-3 bg-white rounded-md shadow-2xl p-2 px-2 w-full text-sm justify-center overflow-scroll">
        <Link
          href="/organizer/home"
          className="p-1.5 rounded-md hover:bg-[#F6F7F8] text-gray-700 font-semibold"
        >
          Profile
        </Link>
        <Link
          href="/organizer/dashboard"
          className="p-1.5 rounded-md hover:bg-[#F6F7F8] text-gray-700 font-semibold"
        >
          Event
        </Link>
        <Link
          href="/organizer/history"
          className="p-1.5 rounded-md hover:bg-[#F6F7F8] text-gray-700 font-semibold"
        >
          Transaction
        </Link>
        <Link
          href="/organizer/attendee"
          className="p-1.5 rounded-md hover:bg-[#F6F7F8] text-gray-700 font-semibold"
        >
          Attendee
        </Link>
        {/* <Link
          href="/organizer/voucher"
          className="p-1.5 rounded-md hover:bg-[#F6F7F8] text-gray-700 font-semibold"
        >
          Voucher
        </Link> */}
      </div>
    </>
  );
}
export default SidebarComponent;
