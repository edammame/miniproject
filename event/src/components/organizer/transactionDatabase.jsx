function TransactionDatabase({
  transactionid,
  eventtransaction,
  user,
  voucher,
  voucherid,
  event,
}) {
  return (
    <>
      <tr className="text-center text-[12px]">
        <td className="lg:w-[100px]">{transactionid}</td>
        <td className="">{user?.username}</td>
        <td className="">{event?.eventname}</td>
        <td className="lg:w-[100px]">{voucher?.vouchername}</td>
      </tr>
    </>
  );
}
export default TransactionDatabase;
