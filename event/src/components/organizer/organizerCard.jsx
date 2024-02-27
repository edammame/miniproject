"use client";
import { axiosInstance, axiosInstanceSSR } from "../../axios/axios";
import { FieldArray, useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { TbUpload } from "react-icons/tb";
import { DatePicker } from "antd";
import { Select, Option } from "@material-tailwind/react";
import moment from "moment/moment";
import dayjs from "dayjs";
import { MdEventNote } from "react-icons/md";

function AddEventComponent({ editId, fetchEvents }) {
  const intialEvent = {
    eventname: "",
    eventprice: 0,
    eventstartdate: new Date(),
    eventenddate: new Date(),
    eventposter: null,
    eventdescription: "",
    eventtype: "Free",
    location_id: "",
    voucherid: 0,
    availableseat: 0,
    reservedseat: "",
    eventid: 0,
  };
  const upload = useRef(null);

  const formik = useFormik({
    initialValues: intialEvent,
    onSubmit: () => {
      console.log("test onsubmit formik");
      simpan();
    },
  });
  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  // DropdownLocation
  const [location, setLocation] = useState([]);

  const fetchLocation = () => {
    axiosInstance()
      .get("/location")
      .then((res) => {
        setLocation(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  const ubah = async (id) => {
    const res = await axiosInstance().get("/events/" + id);
    console.log(res.data);
    const event = res.data.result;
    formik.setFieldValue("id", event.eventid);
    formik.setFieldValue("eventname", event.eventname);
    formik.setFieldValue("eventlocation", event.location_id);
    formik.setFieldValue("eventposter", event.eventposter);
    formik.setFieldValue("eventprice", event.eventprice);
    formik.setFieldValue("eventdescription", event.eventdescription);
    formik.setFieldValue(
      "eventstartdate",
      moment(event.eventstartdate).format("YYYY-MM-DD hh:mm:ss")
    );
    formik.setFieldValue(
      "eventenddate",
      moment(event.eventenddate).format("YYYY-MM-DD hh:mm:ss")
    );
    formik.setFieldValue("eventtype", event.eventtype);
    formik.setFieldValue("availableseat", event.availableseat);
  };

  useEffect(() => {
    if (editId) ubah(editId);
  }, [editId]);

  useEffect(() => {
    fetchLocation();
  }, []);

  const { RangePicker } = DatePicker;
  // https://ant.design/components/date-picker#components-date-picker-demo-disabled-date

  const inputDate = () => {
    const [date, setDate] = useState(null);
    const disabledDate = (current, { from }) => {
      if (from) {
        return Math.abs(current.diff(from, "days")) >= 7;
      }
      return false;
    };
  };

  const simpan = () => {
    console.log(formik.values);
    const form = new FormData();
    form.append("eventname", formik.values.eventname);
    form.append("eventlocation", formik.values.location_id);
    form.append("eventposter", formik.values.eventposter);
    form.append("eventprice", formik.values.eventprice);
    form.append("eventdescription", formik.values.eventdescription);
    form.append("eventtype", formik.values.eventtype);
    form.append("eventstartdate", new Date(formik.values.eventstartdate));
    form.append("eventenddate", formik.values.eventstartdate);
    form.append("availableseat", formik.values.availableseat);

    if (formik.values.id) {
      axiosInstance()
        .patch("/events" + formik.values.id, form)
        .then(() => {
          alert("event detail berhasil diedit");
          fetchEvents();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axiosInstanceSSR()
        .post("/events", form)
        .then(() => {
          alert("data berhasil ditambahkan");
          fetchEvents();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // formik.resetForm();
  };

  return (
    <div>
      <form id="form" action="" onSubmit={formik.handleSubmit}>
        `{" "}
        <div className="flex flex-col gap-1 text-black font-normal">
          <div className=" bg-[#6CBF67] flex flex-col-2 rounded-md font-semibold text-[16px] py-3 gap-2 px-4">
            <MdEventNote className="text-[26px]" /> Create New Event Details
          </div>
          <table className=" ">
            <tbody>
              <tr>
                <td className="px-2 text-[12.5px] font-normal"> Name</td>
                <td>
                  <input
                    type="text"
                    placeholder=" Event Name"
                    className="border border-gray-300 py-1 text-[12.5px] text-black rounded-md min-w-64"
                    required
                    id="eventname"
                    value={formik.values.eventname}
                    onChange={formik.handleChange}
                  />
                </td>
              </tr>

              <tr>
                <td className="px-2 text-[12.5px] font-normal "> Location</td>
                <td>
                  <Select
                    id="location_id"
                    label="Event Location"
                    name="eventlocation"
                    className="bg-white"
                    value={formik.values.eventlocation}
                    onChange={(value) => {
                      formik.setFieldValue("location_id", value);
                    }}
                  >
                    {location.map((location, key) => (
                      <Option key={key} value={location.locationid}>
                        {location.eventlocation}
                      </Option>
                    ))}
                  </Select>
                </td>
              </tr>
              <tr>
                <td className="px-2 text-[12.5px] font-normal ">
                  {" "}
                  Event Poster
                </td>
                <td>
                  <input
                    type="file"
                    placeholder=" Poster Url"
                    className="border p-1 text-[12.5px] text-black rounded-md  w-96 hidden"
                    id="eventposter"
                    onChange={(e) => renderFile(e)}
                    ref={upload}
                  />
                  <button
                    className="bg-full bg-[#FADB7A] text-[12.5px] text-black px-3 h-8 w-38 flex gap-2
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
                <td className="px-2 text-[12.5px] font-normal"> Event Type</td>
                <td>
                  {/* dropdown */}
                  <div className="w-64 text-[12.5px] font-normal bg-white">
                    <Select
                      id="eventtype"
                      label="Event Type"
                      name="eventtype"
                      value={formik.values.eventtype}
                      onChange={(value) => {
                        formik.setFieldValue("eventtype", value);
                      }}
                    >
                      <Option value="free">Free</Option>
                      <Option value="paid">Paid</Option>
                    </Select>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="px-2 text-[12.5px] font-normal ">
                  {" "}
                  Ticket Price
                </td>
                <td>
                  <input
                    type="number"
                    placeholder=" Ticket Price"
                    className="border border-gray-300 py-1 text-[12.5px] text-black rounded-md min-w-64"
                    min={0}
                    required
                    id="eventprice"
                    value={formik.values.eventprice}
                    onChange={formik.handleChange}
                  />
                </td>
              </tr>

              <tr>
                <td className="px-2 text-[12.5px] font-normal">
                  {" "}
                  Event Description
                </td>
                <td>
                  <textarea
                    type="text"
                    placeholder=" Event description"
                    className="border border-gray-300 text-[12.5px] text-black rounded-md py-1 min-w-64"
                    required
                    value={formik.values.eventdescription}
                    id="eventdescription"
                    onChange={formik.handleChange}
                  />
                </td>
              </tr>

              <tr>
                <td className="px-2 text-[12.5px] font-normal"> Event Date</td>
                <td>
                  <RangePicker
                    showTime={{ format: "HH:mm:ss" }}
                    format="YYYY-MM-DD HH:mm:ss"
                    value={[
                      dayjs(formik.values.starteventdate),
                      dayjs(formik.values.endeventdate),
                    ]}
                  />
                </td>
              </tr>
              <tr>
                <td className="px-2 text-[12.5px] font-normal ">
                  Available Seat
                </td>
                <td>
                  <input
                    type="number"
                    placeholder="Available Seat "
                    className="border border-gray-300 py-1 text-[12.5px] text-black rounded-md min-w-64"
                    min={0}
                    max={1000}
                    required
                    id="availableseat"
                    value={formik.values.availableseat}
                    onChange={formik.handleChange}
                  />
                </td>
              </tr>
            </tbody>
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
        `
      </form>
    </div>
  );
}
export default AddEventComponent;
