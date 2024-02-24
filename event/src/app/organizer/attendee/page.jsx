import SidebarComponent from "@/components/sidebar";
import { FaRegFolderOpen } from "react-icons/fa";

function AttendeePage() {
  return (
    <>
      {" "}
      <>
        <div className="w-full bg-[#F1F1F1]">
          <div className="flex flex-col justify-center  max-w-[1000px] w-full items-center m-auto  ">
            <div className="w-full text-black font-semibold p-4 text-lg">
              Organizer Event Management Dashboard
            </div>
            <SidebarComponent />

            {/* Header */}
            <div className=" bg-[#FABB11] mt-3 flex flex-col-2 font-semibold text-[16px] py-3 justify-between gap-2 px-4 w-full rounded-md">
              <div className="flex flex-col-2 gap-4 text-[15.5px] px-1">
                <FaRegFolderOpen className="text-[26px]" />
                Customer Database
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
export default AttendeePage;
