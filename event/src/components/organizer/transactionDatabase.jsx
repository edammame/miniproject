function TransactionDatabase({
  transactionid,
  eventtransaction,
  transaction,
  totalprice,
  user,
  voucher,
  voucherid,
  event,
}) {
  return (
    <>
      <tr className="text-center text-[12px] gap-1">
        <td className="lg:w-[30px]">{transactionid}</td>
        <td className="w-[80px]">{event?.eventname}</td>
        <td className="w-[80px]">{voucher?.vouchername}</td>
        <td className="w-[80px]">
          Rp {Number(totalprice).toLocaleString("id-ID")}
        </td>
      </tr>
    </>
  );
}
export default TransactionDatabase;
