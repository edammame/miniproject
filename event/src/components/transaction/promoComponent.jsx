"use client";
import DropDown from "../organizer/dropdown";
import { TbDiscount2 } from "react-icons/tb";
import { useState } from "react";

function PromoComponent() {
  const promooption = [
    { value: "option1", label: "Independence45" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <>
      {" "}
      {/* Voucher */}
      {/* Form Promo */}
      <div>
        <div className=" bg-red-500 flex flex-col-2 rounded-md font-semibold text-[16px] py-3 gap-2 px-4">
          <TbDiscount2 className="text-[26px]" /> Apply promo before check-out
        </div>
        <div className="bg-white p-3">
          <form action="" className="flex gap-3" id="form">
            <div className="h-[40px] text-[12.5px] w-[168px]">
              <DropDown
                // label="Select an option"
                options={promooption}
                selected={selectedOption}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="h-[40px] mt-1 text-[12.5px] border w-[128px] rounded-lg text-white bg-black hover:bg-white border-black hover:text-black"
              //   onClick={Formik.handleSubmit}
            >
              Apply
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default PromoComponent;
