"use client";
import { useEffect, useRef } from "react";
import { TbUpload } from "react-icons/tb";

function UploadTfComponent() {
  // UploadBuktiTransfer
  const upload = useRef(null);

  return (
    <>
      {/* Upload Bukti Transfer */}
      <div className="bg-white p-5 flex flex-col">
        <div className=" text-[12.5px] font-semibold">
          Upload proof of payment here
        </div>
        <form action="" className="flex gap-3" id="form">
          <input
            type="file"
            placeholder=" Poster Url"
            className="border p-1 text-[12.5px] text-black rounded-md  w-96 hidden"
            id="eventposter"
            onChange={(e) => renderFile(e)}
            ref={upload}
          />
          <button
            className="bg-full bg-[#FADB7A] h-[40px] mt-1 text-[12.5px] border w-[128px] text-black px-3  w-38 flex gap-2
items-center
rounded-md "
            type="button"
            onClick={() => {
              upload.current.click();
            }}
          >
            <TbUpload />
            Payment
          </button>

          <button
            type="submit"
            className="h-[40px] mt-1 text-[12.5px] border w-[128px] rounded-lg text-white bg-black hover:bg-white border-black hover:text-black"
          >
            Upload
          </button>
        </form>
      </div>{" "}
    </>
  );
}
export default UploadTfComponent;
