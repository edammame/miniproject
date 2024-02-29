"use client";
import React from "react";
import { Drawer, Button, IconButton } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { functionLogout, username } from "@/redux/slices/userSlice";

function SideBar() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <React.Fragment>
      <button onClick={openDrawer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="#bdbdbd"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <Drawer open={open} onClose={closeDrawer} className="bg-gray-200 p-4">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex">
            <div className="bg-gray-200 w-14 h-14 rounded-full">
              <img
                src={
                  "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
                }
                className=" object-cover h-full rounded-full"
              />
            </div>
            <div className="text-black bg-red-300 ml-2 mt-5">
              {user?.username}
            </div>
          </div>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>

        <div className="flex gap-2">
          <a href="/customer/events">
            <div className="flex gap-4">
              <Button className="flex justify-center" size="sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-6 h-6"
                >
                  <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                  <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                </svg>
                <h4 className="ml-1 translate-y-1.5">HOME</h4>
              </Button>
              <Button
                className="flex justify-center"
                size="sm"
                onClick={() => dispatch(functionLogout())}
                variant="outlined"
              >
                <h4 className="ml-1 translate-y-1.5">Log Out</h4>
              </Button>
            </div>
          </a>
        </div>
      </Drawer>
    </React.Fragment>
  );
}
export default SideBar;
