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
        <Box className="bg-[#FFFFFF] w-[300px] lg:mx-96 p-10 m-10">
          <div className="flex flex-col gap-2 text-xs">
            <div className="flex justify-between border-b pb-2 text-center">
              <b>BCA VIRTUAL ACCOUNT</b>
              <div>
                <IoClose className="text-lg" onClick={handleClose} />
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-2 ">
              <div className=" flex flex-col ">
                <div>Nomor Virtual Account</div>
                <b className="text-sm">80777087123458</b>
              </div>

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
