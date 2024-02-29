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
    <div className="sticky top-0 isolate gap-x-6 overflow-hidden bg-gray-50 px-4 py-4 w-full">
      <div
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl w-[125%]"
        aria-hidden="true"
      >
        <div
          className="container mx-auto flex items-center justify-between text-blue-gray-900 aspect-[577/310] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30"
          style={{
            clipPath:
              "polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 0% 74.2%, 0% 54.1%, 68.6% 100%, 74.8% 41.9%)",
          }}
        ></div>
      </div>
      <div className="mx-6 flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="cursor-pointer py-1.5 font-medium"
        >
          EXPERIENCE
        </Typography>

        <div className="flex items-center gap-x-3 z-10">
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
        <div className="container mx-auto">
          <div className="flex items-center gap-x-3">
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
