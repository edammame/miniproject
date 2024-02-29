/** @format */
"use client";
import { Box, Button, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { createContext, useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

export function PaymentModal({ open, handleClose }) {
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="bg-[#FFFFFF] lg:mx-96 p-10 m-14">
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between border-b pb-2">
              <b>BCA VIRTUAL ACCOUNT</b>
              <div>
                <IoClose className="text-lg" onClick={handleClose} />
              </div>
            </div>
            {/* 
            <div className="flex justify-between gap-4 mt-4">
              <div className=" flex flex-col w-full">
                <label htmlFor=""> First Name </label>
                <input
                  className=" p-2  border-[#F3F4F6] rounded-lg w-full"
                  disabled
                  //   value={userSelector.first_name}
                ></input>
              </div>
              <div className=" flex flex-col  w-full">
                <label htmlFor=""> Last Name </label>
                <input
                  className=" p-2 border-[#F3F4F6] rounded-lg "
                  disabled
                  //   value={userSelector.last_name}
                ></input>
              </div>
            </div>
            <div className="flex justify-between gap-4 mt-4">
              <div className=" flex flex-col w-full">
                <label htmlFor=""> Email </label>
                <input
                  className=" p-2  border-[#F3F4F6] rounded-lg w-full"
                  disabled
                  //   value={userSelector.email}
                ></input>
              </div>
              <div className=" flex flex-col  w-full">
                <label htmlFor=""> Gender </label>
                <input
                  className=" p-2 border-[#F3F4F6] rounded-lg "
                  disabled
                  //   value={userSelector.gender}
                ></input>
              </div>
            </div>

            <div className="flex justify-between border-b py-2 ">
              <b>Billing Address</b>
            </div> */}

            {/* <div className="flex justify-between gap-4 mt-4">
              <div className=" flex flex-col w-full">
                <label htmlFor=""> Province </label>
                <select
                  className=" p-2 border border-[#e1e1e2] rounded-lg w-full"
                  id="provinceId"
                  onChange={formik.handleChange}
                  value={formik.values.province}
                >
                  {provinces?.map((province) => (
                    <option value={province.id}> {province.name}</option>
                  ))}
                </select>
              </div>
              <div className=" flex flex-col  w-full">
                <label htmlFor=""> City </label>
                <select
                  className=" p-2 border border-[#e1e1e2] rounded-lg w-full"
                  id="cityId"
                  onChange={formik.handleChange}
                  value={formik.values.city}
                >
                  {cities.map((city) => (
                    <option value={city.id}> {city.name}</option>
                  ))}
                </select>
              </div>
            </div> */}
            {/* <div className="flex justify-between gap-4 mt-4">
              <div className=" flex flex-col w-full">
                <label htmlFor=""> Address </label>
                <textarea
                  id="address"
                  onChange={formik.handleChange}
                  className=" p-2 border border-[#e1e1e2] rounded-lg w-full h-16 resize-none"
                ></textarea>
              </div>
              <div className=" flex flex-col  w-3/4">
                <label htmlFor=""> Postal Code </label>
                <input
                  id="postal_code"
                  onChange={formik.handleChange}
                  className=" p-2 border border-[#e1e1e2] rounded-lg w-full"
                ></input>
              </div>
            </div> */}

            <div className="flex flex-col gap-4 mt-2 ">
              <div className=" flex flex-col ">
                <div>Nomor Virtual Account</div>
                <b className="text-sm">80777087123458</b>
              </div>
              {/* <div className=" flex flex-col w-full">
                <div>Total Pembayaran</div>
                {/* <b className="text-sm">Rp{total.toLocaleString("id-ID")}</b> */}
              {/* </div> */}
              <button
                type="button"
                variant="contained"
                className="bg-black p-2 text-white w-[100px] rounded-md"
                onClick={handleClose}
              >
                Finish
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export function PaymentComponent() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className=" items-center">
        <button
          className="h-[40px] mt-1 text-[12.5px] border w-[128px] rounded-lg text-white bg-black hover:bg-white border-black hover:text-black"
          variant="contained"
          onClick={handleOpen}
        >
          Internet Banking
        </button>

        <PaymentModal open={open} handleClose={handleClose} />
      </div>
    </>
  );
}
