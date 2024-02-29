function TransactionDatabase({
  transactionid,
  eventtransaction,
  user,
  voucher,
  voucherid,
}) {
  return (
    <>
      <tr className="text-center text-[12px]">
        <td className="lg:w-[100px]">{transactionid}</td>

        <td className="lg:w-[100px]">{eventtransaction.eventname}</td>
        <td className="lg:w-[100px]">{voucher.vouchername}</td>
      </tr>
    </>
  );
}
export default TransactionDatabase;
