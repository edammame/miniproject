"use client";
import { Link } from "react-router-dom";
import { BiHome } from "react-icons/bi";
import { FiActivity } from "react-icons/fi";
import { FiArrowDownCircle } from "react-icons/fi";

function SidebarComponent() {
  return (
    <>
      <div>
        {" "}
        <>
          <div className="flex justify-between sticky top-0 p-1 w-full text-[#1113EA] ">
            <div className="flex">
              <Link
                to={"/"}
                className="px-2 py-2 hover:rounded-md hover:bg-[#f7f7f2]"
              >
                <BiHome className="text-[23px] hover:text-[#B82326]  font-thin" />
              </Link>
              <Link
                to={"/about"}
                className="px-2 py-2 hover:rounded-md hover:bg-[#f7f7f2] hover:text-[#B82326]"
              >
                About
              </Link>
            </div>
            <div className="px-2 py-2">
              <FiActivity className="text-[23px]" />{" "}
            </div>
            <div className="flex">
              <Link
                to={"/project"}
                className="px-2 py-2 hover:text-[#B82326]  hover:rounded-md hover:bg-[#f7f7f2]"
              >
                Project
              </Link>
              <div className="px-2 py-2 hover:text-[#B82326]  hover:rounded-md hover:bg-[#f7f7f2]">
                Contact
              </div>
            </div>
          </div>

          <div className=" items-end fixed bottom-10 right-10 text-[30px] animate-bounce text-[#1113EA] hover:text-[#B82326]">
            <FiArrowDownCircle />
          </div>
        </>
      </div>
    </>
  );
}
export default SidebarComponent;
