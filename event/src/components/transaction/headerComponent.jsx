import { LuTicket } from "react-icons/lu";

function HeadComponent() {
  return (
    <>
      {" "}
      <div className="bg-[#FABB11] fixed w-full font-semibold text-[18px] py-3 px-5 flex flex-col-2 gap-3">
        <LuTicket className="text-[24px] " />
        Booking Event Detail
      </div>
    </>
  );
}
export default HeadComponent;
