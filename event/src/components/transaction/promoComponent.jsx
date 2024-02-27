"use client";
import DropDown from "../../components/dropdown";
import { TbDiscount2 } from "react-icons/tb";
import { useEffect, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import { axiosInstance } from "@/axios/axios";

function PromoComponent() {
  // const promooption = [
  //   { value: "option1", label: "Independence45" },
  //   { value: "option2", label: "Option 2" },
  //   { value: "option3", label: "Option 3" },
  // ];

  const [promotion, setPromotion] = useState([]);
  const [voucherId, setVoucherId] = useState(null);
  useEffect(() => {
    console.log(voucherId);
  });

  const fetchPromotion = () => {
    axiosInstance()
      .get("/voucher", {
        params: {
          vouchername: "",
        },
      })
      .then((res) => {
        setPromotion(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  // };
  useEffect(() => {
    fetchPromotion();
  }, []);

  return (
    <>
      {/* Voucher */}
      {/* Form Promo */}
      <div>
        <div className=" bg-red-500 flex flex-col-2 rounded-md font-semibold text-[16px] py-3 gap-2 px-4">
          <TbDiscount2 className="text-[26px]" /> Apply promo before check-out
        </div>
        <div className="bg-white p-3">
          <form
            action=""
            className="flex flex-cols-2 gap-10 pl-2 items-center"
            id="form"
          >
            <div className="h-[40px] text-[12.5px] w-[160px]">
              <Select
                id="discount"
                label="Voucher Discount"
                name="discount"
                className="bg-white"
                onChange={(value) => {
                  // formik.setFieldValue("discount", value);
                  setVoucherId(value);
                }}
              >
                {promotion.map((p, key) => (
                  <Option key={key} value={p.voucherid}>
                    {p.discount.toLocaleString()}
                  </Option>
                ))}
              </Select>
            </div>
            <button
              type="submit"
              className="h-[40px] m-2 text-[12.5px] border w-[128px] rounded-lg text-white bg-black hover:bg-white border-black hover:text-black"
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
