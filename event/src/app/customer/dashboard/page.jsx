"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "@/components/sidebar";
import UserAvatar from "@/components/useravatar";

function ProfileForm( username, email ) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  return (
    <>
      <div className="flex flex-col justify-center w-screen">
        <section className="flex h-screen">
          <div className="top-0 pt-1 ml-2">
            <SideBar />
          </div>
          <div className="grid items-center w-full h-[250px]">
            <div className="flex justify-center mt-11">
              <UserAvatar />
            </div>
            <form className="flex justify-center m-auto md:w-[500px] h-44 translate-y-8">
              <div className="grid gap-4 w-full">
                <div>{user?.username}</div>
                <div>{user?.email}</div>
                <div>{user?.customerReferralNo}</div>
                <div>{user?.customerTotalPoints}</div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}

export default ProfileForm;
