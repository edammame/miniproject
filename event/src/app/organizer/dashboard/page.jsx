"use client";
import React, { MaterialTailwind } from "react";
// import { DatePicker } from "antd";
import { useEffect, useRef, useState } from "react";

import { axiosInstance } from "../../../axios/axios";
import { useDebounce } from "use-debounce";
import { IoSearch } from "react-icons/io5";
import Link from "next/link";

// ReactIcons
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import { FiDelete } from "react-icons/fi";
import { MdOutlineQrCode2 } from "react-icons/md";

import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Tooltip,
  Input,
  ThemeProvider,
} from "@material-tailwind/react";
import AddEventComponent from "../../../components/organizer/organizerCard";
import SidebarComponent from "@/components/sidebar";

function DashboardPage() {
  {
    /* Formik, Handlechange */
  }
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [editId, setEditId] = useState(0);

  const [value] = useDebounce(search, 500);

  {
    /* Accordion*/
  }
  const [open, setOpen] = React.useState(1);
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  {
    /* Table*/
  }
  const tableHead = [
    "Event Name",
    "Ticket Price",
    "Start Date",
    "End Date",
    "Type",
    "Location",
  ];

  {
    /* Formik*/
  }

  const hapus = (id) => {
    if (window.confirm("apakah anda yakin menghapus event id " + id + "?"))
      axiosInstance()
        .delete("/events/" + id)
        .then(() => {
          alert(`id ${id} berhasil dihapus`);
          fetchEvents();
          console.log(id);
        })
        .catch((err) => console.log(err));
  };

  const fetchEvents = () => {
    axiosInstance()
      .get("/events/", {
        params: {
          eventname: search,
          location: search,
          eventlocation: search,
          category_id: search,
        },
      })
      .then((res) => {
        setEvents(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchEvents();
  }, [value]);

  return (
    <>
      <div className="w-full bg-[#F1F1F1]">
        <div className="flex flex-col justify-center  max-w-[1000px] w-full items-center m-auto  ">
          <div className="w-full text-black font-semibold p-4 text-lg">
            Organizer Event Management Dashboard
          </div>
          <SidebarComponent />
          {/* Search Bar  */}
          <div className="py-5 w-full ">
            <div className="flex px-3 items-center gap-3 border-gray-300 border-b w-72  p-2">
              <IoSearch className=" w-5 h-5 text-black" />
              <input
                type="text"
                placeholder="Search any event here"
                className=" outline-none rounded-md text-[12px] py-1"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className=" bg-[#FABB11] flex flex-col-2 font-semibold text-[16px] py-3 justify-between gap-2 px-4 w-full rounded-md">
            <div className="flex flex-col-2 gap-2 text-[16px]">
              <MdOutlineQrCode2 className="text-[26px]" />
              Event Last Added
            </div>
          </div>

          {/* /Trial: https://www.material-tailwind.com/docs/react/table */}
          <Card className="h-full w-full items-center">
            <CardHeader
              floated={false}
              shadow={false}
              className="rounded-none text-xs font-normal w-full text-left"
            >
              <p className="px-5">Database event details</p>
            </CardHeader>
            <CardBody className="overflow-scroll">
              <table className="w-full min-w-max table-auto">
                <thead>
                  <tr>
                    {tableHead.map((head) => (
                      <th
                        key={head}
                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 px-1 py-3"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="text-center font-semibold text-[12px] leading-none opacity-70"
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {events.map(
                    (
                      {
                        eventid,
                        eventname,
                        eventprice,
                        eventstartdate,
                        eventenddate,
                        eventtype,
                        location,
                        user,
                      },
                      index
                    ) => {
                      const isLast = index === events.length - 1;
                      const classes = isLast
                        ? "p-2 text-center justify-items-center "
                        : "p-2 border-b border-blue-gray-50 justify-items-center text-center";

                      return (
                        <tr key={eventname}>
                          <td className={classes}>
                            <div className="flex text-left">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className=" font-normal text-[12px] px-1"
                              >
                                {eventname}
                              </Typography>
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {eventprice}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {eventstartdate}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {eventenddate}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <div className="w-max">
                              <Chip
                                size="sm"
                                variant="ghost"
                                value={eventtype}
                                className=" justify-items-center w-[80px]"
                                color={
                                  eventtype === "free"
                                    ? "green"
                                    : eventtype === "paid"
                                    ? "blue"
                                    : "yellow"
                                }
                              />
                            </div>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {location.eventlocation}
                            </Typography>
                          </td>

                          <td className="flex flex-col-2">
                            <Tooltip content="Edit Database">
                              <button
                                className=" text-gray-600 text-[16px] p-2"
                                onClick={() => {
                                  setEditId(eventid);
                                }}
                              >
                                <FaRegEdit />
                                {/* Edit */}
                              </button>
                            </Tooltip>
                            <Tooltip content="Delete Database">
                              <button
                                className=" text-gray-600 text-[18px] p-2"
                                onClick={() => {
                                  hapus(eventname);
                                }}
                              >
                                <FiDelete />
                                {/* Delete */}
                              </button>
                            </Tooltip>
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
              <button size="sm">
                <FaArrowLeft />
              </button>
              <div className="flex items-center gap-2">
                <IconButton variant="outlined" size="sm">
                  1
                </IconButton>
                <IconButton variant="text" size="sm">
                  2
                </IconButton>
                <IconButton variant="text" size="sm">
                  3
                </IconButton>
                <IconButton variant="text" size="sm">
                  ...
                </IconButton>
                <IconButton variant="text" size="sm">
                  8
                </IconButton>
                <IconButton variant="text" size="sm">
                  9
                </IconButton>
                <IconButton variant="text" size="sm">
                  10
                </IconButton>
              </div>
              <button size="sm">
                <FaArrowRight />
              </button>
            </CardFooter>
          </Card>
          <Accordion open={open === 1} className="mt-14 px-5">
            <AccordionHeader
              className="text-[14px]"
              onClick={() => handleOpen(1)}
            >
              New Event Details
            </AccordionHeader>
            <AccordionBody>
              <AddEventComponent editId={editId} fetchEvents={fetchEvents} />
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 2}>
            <AccordionHeader
              className="text-[14px] px-5"
              onClick={() => handleOpen(2)}
            >
              Voucher Details
            </AccordionHeader>
            <AccordionBody>
              <div className="">
                {/* Add New Voucher */}
                <div>
                  <div className=" bg-[#6CBF67] flex flex-col-2 rounded-md font-semibold text-[16px] py-3 gap-2 px-4">
                    <MdOutlineQrCode2 className="text-[26px]" /> Create New
                    Voucher Promotion
                  </div>
                  <div className="bg-white p-4 flex flex-col gap-3">
                    <div className=" text-[12.5px] font-medium">
                      Create promotion voucher for your future event
                    </div>
                    <Link
                      href="/organizer/voucher"
                      className=" text-[12.5px] w-[128px] h-[40px] px-10 py-2.5 border rounded-lg text-white bg-black hover:bg-white border-black hover:text-black"
                    >
                      Create
                    </Link>
                  </div>
                </div>
              </div>
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 3}>
            <AccordionHeader
              className="text-[14px] px-5"
              onClick={() => handleOpen(3)}
            >
              Overview & Statistic
            </AccordionHeader>
            <AccordionBody>graph? chart?</AccordionBody>
          </Accordion>
        </div>
      </div>
    </>
  );
}
export default DashboardPage;
