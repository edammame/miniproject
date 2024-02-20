"use client";
import React from "react";
// import { DatePicker } from "antd";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../../axios/axios";
import { useDebounce } from "use-debounce";
import { IoSearch } from "react-icons/io5";
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
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import AddEventComponent from "../../../components/organizer/organizerCard";
import SidebarComponent from "@/components/sidebar";

function DashboardPage() {
  {
    /* Formik, Handlechange */
  }
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);

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
    "Date-Time",
    "Status",
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
          fetchProducts();
        })
        .catch((err) => console.log(err));
  };

  const fetchEvents = () => {
    axiosInstance()
      .get("/events/", {
        params: {
          eventname: search,
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
      <SidebarComponent />
      <div className="w-full bg-[#F1F1F1]">
        <div className="flex flex-col justify-center  max-w-[1000px] w-full items-center m-auto  ">
          <div className="w-full text-black font-semibold p-4 text-lg">
            Organizer Event Management Dashboard
          </div>
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

          {/* /Trial: https://www.material-tailwind.com/docs/react/table */}
          <Card className="h-full w-full ">
            <CardHeader floated={false} shadow={false} className="rounded-none">
              <div className=" flex flex-col justify-between gap-3 md:flex-row md:items-center">
                <div>
                  <Typography
                    className=" text-base font-semibold"
                    color="blue-gray"
                  >
                    Event Last Added
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal text-sm">
                    These are list of event details that are added to the
                    database
                  </Typography>
                </div>
              </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    {tableHead.map((head) => (
                      <th
                        key={head}
                        className="border-y text-center border-blue-gray-100 bg-blue-gray-50/50 px-1 py-3"
                      >
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal leading-none opacity-70"
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
                        eventname,
                        eventprice,
                        eventdate,
                        eventstatus,
                        eventlocation,
                        voucherid,
                      },
                      index
                    ) => {
                      const isLast = index === events.length - 1;
                      const classes = isLast
                        ? "p-4"
                        : "p-4 border-b border-blue-gray-50";

                      return (
                        <tr key={eventname}>
                          <td className={classes}>
                            <div className="flex items-center gap-2">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold"
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
                              {eventdate}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <div className="w-max">
                              <Chip
                                size="sm"
                                variant="ghost"
                                value={eventstatus}
                                color={
                                  eventstatus === "available"
                                    ? "green"
                                    : eventstatus === "fully booked"
                                    ? "amber"
                                    : "red"
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
                              {eventlocation}
                            </Typography>
                          </td>
                          <td className={classes}>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {voucherid}
                            </Typography>
                          </td>

                          <td className={classes}>
                            <Tooltip content="Edit Database">
                              <IconButton variant="text" onClick={ubah}>
                                Edit
                              </IconButton>
                            </Tooltip>
                            <Tooltip content="Delete Database">
                              <IconButton variant="text" onClick={hapus}>
                                Delete
                              </IconButton>
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
              <Button variant="outlined" size="sm">
                Previous
              </Button>
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
              <Button variant="outlined" size="sm">
                Next
              </Button>
            </CardFooter>
          </Card>

          {/* Event List */}
          {/* <div className="text-left text-black font-semibold py-3  w-full">
            {" "}
            Event Database
          </div>
          <table className="w-full">
            <tr className=" text-center text-black text-[14px] font-semibold">
              <th>Event Poster</th>
              <th>Event Name</th>
              <th>Event Ticket Price</th>
            </tr>
            {events.map((event, key) => (
              <OrganizerProductCard
                {...event}
                key={key}
                ubah={() => ubah(event.id)}
                hapus={() => hapus(event.id)}
              />
            ))}
          </table>
           */}

          {/* Accordion*/}

          <Accordion open={open === 1} className="mt-14 px-5">
            <AccordionHeader
              className="text-base"
              onClick={() => handleOpen(1)}
            >
              New Event Details
            </AccordionHeader>
            <AccordionBody>
              {/* <div className="w-full py-3">
                <form id="form" action="" onSubmit={formik.handleSubmit}>
                  <h1 className="font-semibold text-base text-black py-2">
                    Add Event Information Details
                  </h1>
                  <div className="flex flex-col gap-1 text-black  font-normal">
                    <table>
                      <tr>
                        <td className="px-2 "> Event Name</td>
                        <td>
                          <input
                            type="text"
                            placeholder=" Event Name"
                            className="border border-gray-300 p-1 text-[14px] text-gray-300 rounded-md w-96 "
                            required
                            id="eventname"
                            // value={formik.values.eventname}
                            onChange={formik.handleChange}
                            // onChange={(e) => {
                            //   formik.setFieldValue("product_name", e.target.value);
                            // }}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-2 "> Event Poster</td>
                        <td>
                          <input
                            type="file"
                            placeholder=" Poster Url"
                            className="border p-1 text-[14px] text-black rounded-md  w-96 hidden"
                            id="eventposter"
                            onChange={(e) => renderFile(e)}
                            ref={upload}
                          />
                          <button
                            className="bg-full bg-[#FADB7A] text-[14px] text-black px-3 h-8 w-38 flex gap-2
                          items-center
                         rounded-md "
                            type="button"
                            onClick={() => {
                              upload.current.click();
                            }}
                          >
                            <TbUpload />
                            Click to Upload File
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-2 "> Event Ticket Price</td>
                        <td>
                          <input
                            type="number"
                            placeholder=" Ticket Price"
                            className="border border-gray-300 p-1 text-[14px] text-gray-300 rounded-md w-96"
                            min={0}
                            required
                            id="price"
                            // value={formik.values.eventprice}
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td className="px-2 "> Event Description</td>
                        <td>
                          <textarea
                            type="text"
                            placeholder=" Event description"
                            className="border border-gray-300 text-[14px] text-gray-300 rounded-md p-1 w-96"
                            required
                            // value={formik.values.eventdescription}
                            id="eventdescription"
                            onChange={formik.handleChange}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td className="px-2 "> Event Date</td>
                        <td>
                          <RangePicker
                            // value={formik.values.eventdate}
                            // disabledDate = {disabledDate}
                            showTime
                            onChange={(e) => setDate(e.target.value)}
                          />
                        </td>
                      </tr>
                    </table>
                    <tr className="flex gap-2">
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
                    </tr>
                  </div>
                </form>
              </div> */}
              <AddEventComponent />
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 2}>
            <AccordionHeader
              className="text-base  px-5"
              onClick={() => handleOpen(2)}
            >
              Events Summary
            </AccordionHeader>
            <AccordionBody>
              event by category & event by location will shown here
            </AccordionBody>
          </Accordion>
          <Accordion open={open === 3}>
            <AccordionHeader
              className="text-base  px-5"
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
