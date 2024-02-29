function DatabaseComponent({
  vouchercode,
  vouchername,
  voucherpromodesc,
  discount,
  voucherstartdate,
  voucherenddate,
  edit,
  hapus,
}) {
  return (
    <tr className="text-center">
      <td>{vouchercode}</td>
      <td>{vouchername}</td>
      <td className="text-left">{voucherpromodesc}</td>
      <td className=" font-semibold">
        IDR {Number(discount).toLocaleString("id-ID")}
      </td>
      <td>{voucherstartdate}</td>
      <td>{voucherenddate}</td>
      <td className="flex gap-5 justify-center items-center h-[70px]">
        <button
          onClick={edit}
          className="h-[30px] border w-[72px] rounded-md text-white bg-black hover:bg-white border-black hover:text-black"
        >
          Edit
        </button>
        <button
          className="h-[30px] border w-[72px] rounded-md text-white bg-black hover:bg-white border-black hover:text-black"
          onClick={hapus}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
export default DatabaseComponent;
