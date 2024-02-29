"use client";
import React from "react";
import { Drawer, Button, IconButton } from "@material-tailwind/react";
import { useDispatch } from "react-redux";
import { functionLogout } from "@/redux/slices/userSlice";

function SideBar() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

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
            <div className="ml-2 mt-5">username</div>
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
        <div className="p-4">
          <div className="grid gap-5">
            <div className="flex">Ref Code</div>
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                  clip-rule="evenodd"
                />
              </svg>
              points
            </div>
            <div className="flex"></div>
          </div>
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
