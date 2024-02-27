"use client";
import moment from "moment/moment";
import { FaRegEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";

function DatabaseComponent({
  voucherid,
  vouchername,
  // voucherpromodesc,
  discount,
  voucherstartdate,
  voucherenddate,
  edit,
  hapus,
}) {
  return (
    <tr className="text-center text-[12px]">
      {/* <td>{voucherid}</td> */}
      <td className="lg:w-[100px]">{vouchername}</td>
      {/* <td className="text-left">{voucherpromodesc}</td> */}
      <td className=" lg:w-[100px] font-semibold">
        IDR {Number(discount).toLocaleString("id-ID")}
      </td>
      <td className="lg:w-[100px]">
        {moment(voucherstartdate).format("YYYY-MM-DD hh:mm:ss")}
      </td>
      <td className="lg:w-[100px]">
        {moment(voucherenddate).format("YYYY-MM-DD hh:mm:ss")}
      </td>
      <td className="flex lg:w-[100px] gap-3 justify-center items-center h-[70px]">
        {/* <button
          onClick={() => edit(voucherid)}
          className=" border rounded-md text-black"
        >
          <FaRegEdit />
          {/* Edit */}
        {/* </button> */}
        <button className=" border rounded-md text-black" onClick={hapus}>
          <FiDelete />
          {/* Delete */}
        </button>
      </td>
    </tr>
  );
}
export default DatabaseComponent;
