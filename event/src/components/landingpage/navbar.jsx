"use client";
import React from "react";
import { Collapse, Typography, IconButton } from "@material-tailwind/react";
import Link from "next/link";

export function NavbarComponent() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
    <div className="sticky top-0 isolate gap-x-6 overflow-hidden bg-black px-4 py-4 w-full">
      <div className="mx-6 flex items-center justify-between text-white">
        <Typography
          as="a"
          href="#"
          className="cursor-pointer py-1.5 font-medium"
        >
          EXPERIENCE
        </Typography>

        <div className="flex items-center gap-x-6 z-10">
          <Link
            className="text-sm font-semibold hidden lg:inline-block"
            href={"/auth/login"}
          >
            Login
          </Link>
          <a
            className="text-sm font-semibold hidden lg:inline-block"
            href={"/auth/customerRegister"}
          >
            Sign Up
          </a>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="container mx-6 pt-4 pb-4">
          <div className="flex items-center gap-x-3 text-white">
            <Link
              fullWidth
              variant="text"
              size="sm"
              className=""
              href={"/auth/login"}
            >
              Login
            </Link>
            <Link
              fullWidth
              variant="gradient"
              size="sm"
              className=""
              href={"/auth/customerRegister"}
            >
              Sign up
            </Link>
          </div>
        </div>
      </Collapse>
    </div>
  );
}
