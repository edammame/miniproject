"use client";
import React, { useRef, useState } from "react";

function UserAvatar() {
  const ref = useRef(null);
  const [image, setImage] = useState(
    "https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80"
  );

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };
  return (
    <div className="bg-gray-200 w-[200px] h-[200px] rounded-full">
      <img
        src={image}
        className=" object-cover h-full  w-full rounded-full"
        onClick={() => ref.current.click()}
      />
      <input
        className="hidden"
        ref={ref}
        type="file"
        onChange={onImageChange}
      />
    </div>
  );
}

export default UserAvatar;
