"use client";
import { axiosInstance, axiosInstanceSSR } from "@/axios/axios";
import { useFormik } from "formik";
import { useEffect } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

function CreateVoucherComponent({ fetchVouchers }) {
  const initialVoucher = {
    voucherid: "",
    vouchername: "",
    voucherpromodesc: "",
    discount: 0,
    voucherstartdate: new Date(),
    voucherenddate: new Date(),
    stock: 0,
  };

  const formik = useFormik({
    initialValues: initialVoucher,
    onSubmit: () => {
      console.log("masuk");
      simpan();
    },
  });

  useEffect(() => {
    // console.log(formik.values);
  }, [formik.values]);

  const simpan = () => {
    console.log(formik.values, "ini voucher simpan test");

    if (formik.values.voucherid) {
      axiosInstance()
        .patch("/voucher/" + formik.values.voucherid, formik.values)
        .then(() => {
          alert("data voucher berhasil diedit");
          fetchVouchers();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axiosInstance()
        .post("/voucher/", { ...formik.values })
        .then(() => {
          alert("data voucher berhasil ditambahkan");
          fetchVouchers();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // formik.resetForm();
  };

  // useEffect(() => {
  //   fetchVouchers();
  // }, []);

  return (
    <>
      <div>
        <form id="form" action="" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-1 p-3 text-black font-normal">
            <table className="w-[500px] ">
              <thead></thead>
              <tbody>
                <tr>
                  <td className="px-2 text-[12.5px] font-normal"> Name</td>
                  <td>
                    <input
                      type="text"
                      placeholder="voucher name"
                      className="border border-gray-300 py-1 text-[12.5px] text-black rounded-md min-w-64"
                      required
                      id="vouchername"
                      value={formik.values.vouchername}
                      onChange={formik.handleChange}
                      // onChange={(e) => {
                      //   formik.setFieldValue("product_name", e.target.value);
                      // }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="px-2 text-[12.5px] font-normal">
                    Promo Description
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="voucher description"
                      className="border border-gray-300 text-[12.5px] text-black rounded-md  min-w-64"
                      required
                      id="voucherpromodesc"
                      value={formik.values.voucherpromodesc}
                      onChange={formik.handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="px-2 text-[12.5px] font-normal"> Discount</td>
                  <td>
                    <input
                      type="number"
                      placeholder=" Discount"
                      className="border border-gray-300 py-1 text-[12.5px] text-black rounded-md min-w-64"
                      required
                      id="discount"
                      value={formik.values.discount}
                      onChange={formik.handleChange}
                      // onChange={(e) => {
                      //   formik.setFieldValue("eventname", e.target.value);
                      // }}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="px-2 text-[12.5px] font-normal">
                    {" "}
                    Event Date
                  </td>
                  <td>
                    <RangePicker
                      showTime={{ format: "HH:mm:ss" }}
                      format="YYYY-MM-DD HH:mm:ss"
                      value={[
                        dayjs(formik.values.voucherstartdate),
                        dayjs(formik.values.voucherenddate),
                      ]}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="px-2 text-[12.5px] font-normal ">Stock</td>
                  <td>
                    <input
                      type="number"
                      placeholder="Voucher Stock"
                      className="border border-gray-300 py-1 text-[12.5px] text-black rounded-md min-w-64"
                      min={0}
                      max={200}
                      required
                      id="stock"
                      value={formik.values.stock}
                      onChange={formik.handleChange}
                    />
                  </td>
                </tr>
              </tbody>
              <tfoot></tfoot>
            </table>
            <div className="flex gap-2 p-2">
              <button
                className="h-[40px] mt-1 text-[12.5px] border w-[128px] rounded-lg text-white bg-black hover:bg-white border-black hover:text-black"
                type="submit"
              >
                Save
              </button>
              <button
                className="h-[40px] mt-1 text-[12.5px] border w-[128px] rounded-lg text-white bg-black hover:bg-white border-black hover:text-black"
                onClick={() => formik.resetForm()}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateVoucherComponent;
