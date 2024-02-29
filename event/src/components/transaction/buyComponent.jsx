"use client";
import React, { useEffect, useState } from "react";

function BuyComponent() {
  const qtyinput = () => {
    const [qty, setQty] = useState("");

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Quantity Value:", qty);
    };

    return (
      <>
        <div className="w-full bg-orange-300">
          testingbuycomponent
          <form onSubmit={handleSubmit} className="flex gap-3" id="form">
            <input
              className="h-[40px] mt-1 text-[12.5px] border w-[128px] p-5 rounded-lg text-center"
              type="number"
              max={1}
              placeholder="Quantity"
              required
              value={qty}
              id="qty"
              onChange={(e) => setInputValue(e.target.value)}
            ></input>
            <button
              type="submit"
              className="h-[40px] mt-1 text-[12.5px] border w-[128px] rounded-lg text-white bg-black hover:bg-white border-black hover:text-black"
            >
              Buy
            </button>
          </form>
        </div>
      </>
    );
  };
}
export default BuyComponent;
