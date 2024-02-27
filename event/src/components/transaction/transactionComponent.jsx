"use client";
import { useEffect, useRef } from "react";
import { TbUpload } from "react-icons/tb";
import Link from "next/link";

function ButtontoTransactionComponent() {
  // const [eventid, setEventid] = useState([]);

  // const fetchEventsbyId = (id) => {
  //   axiosInstance()
  //     .get("/events/" + id)
  //     .then((res) => {
  //       setEventid(res.data.result);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // useEffect(() => {
  //   fetchEventsbyId();
  //   console.log(eventid);
  // }, [value]);

  // const [carts, setCart] = useState([]);
  // const [total, setTotal] = useState(0);

  // const fetchCart = () => {
  //   setCart(res.data.result);
  //   const sum = res.data.result.reduce(
  //     (sum, { qty, product }) => sum + qty * product.price,
  //     0
  //   );
  //   setTotal(sum);
  // };

  // const beli = async (values) => {
  //   try {
  //     await axiosInstance().post("/transactions", values);
  //     fetchCart();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchCart();
  // }, []);
  return (
    <>
      <button
      // onClick={() => {
      //   fetchEventsbyId;
      // }}
      >
        <Link
          href="/payment"
          className=" text-[12.5px] w-[128px] h-[40px] px-10 py-2.5 border rounded-lg text-white bg-black hover:bg-white border-black hover:text-black"
        >
          Proceed to Payment
        </Link>
      </button>
    </>
  );
}
export default ButtontoTransactionComponent;
