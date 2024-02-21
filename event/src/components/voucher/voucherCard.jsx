"use client";
import { axiosInstance } from "@/axios/axios";
import { useFormik } from "formik";
import { useEffect } from "react";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

function CreateVoucherComponent() {
  const initialVoucher = {
    voucherid: "",
    vouchername: "",
    voucherpromodesc: "",
    discount: 0,
    voucherstartdate: "",
    voucherenddate: "",
  };

  const formik = useFormik({
    initialValues: initialVoucher,
    onSubmit: () => {
      console.log("test submit formik");
      simpan();
    },
  });

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  const simpan = () => {
    const form = new FormData();
    form.append("vouchercode", formik.values.vouchercode);
    form.append("voucherpromodesc", formik.values.voucherpromodesc);
    form.append("discount", formik.values.discount);
    form.append("voucherstartdate", formik.values.voucherstartdate);
    form.append("voucherenddate", formik.values.voucherenddate);

    if (formik.values.id) {
      axiosInstance()
        .patch("/vouchers/" + formik.values.id, form)
        .then(() => {
          alert("data voucher berhasil diedit");
          fetchVouchers();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axiosInstance();
      axiosInstance()
        .post("/vouchers/", form)
        .then(() => {
          alert("data voucher berhasil ditambahkan");
          fetchVouchers();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    formik.resetForm();
  };

  return (
    <>
      <div>
        <form id="form" action="" onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-1 p-3 text-black font-normal">
            <table className="">
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
                    {" "}
                    <textarea
                      type="text"
                      placeholder="voucher description"
                      className="border border-gray-300 text-[12.5px] text-black rounded-md  min-w-64"
                      required
                      id="voucherdescription"
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
                      // value={formik.values.eventdate}
                      // disabledDate = {disabledDate}
                      className="min-w-64"
                      showTime
                      onChange={(e) => {
                        //   console.log(e[0].$d);
                        //   console.log(e[1].$d);
                        formik.setFieldValue("starteventdate", e[0].$d);
                        formik.setFieldValue("endeventdate", e[1].$d);
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="flex gap-2 p-2">
              <button
                className=" bg-[#FABB11] text-black p-1 px-2 text-[12.5px] rounded-md w-24 "
                type="submit"
              >
                Save
              </button>
              <button
                className="bg-[#FADB7A] hover:bg-[#FABB11] text-black p-1 px-2 text-[12.5px] rounded-md w-24 "
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
