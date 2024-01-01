import React, { useState } from "react";

function PackageCard(props) {
  const { subcategory, camera, Video, Both, imageurl, id } = props;

  return (
    <div className="package-card-container p-3 relative">
      <div
        className="w-72 h-80 md:w-64 md:h-64 justify-center items-end flex rounded-lg shadow-lg mx-4"
        style={{ backgroundImage: `url(${imageurl})`, backgroundSize: "cover" }}
      >
        <div className="flex flex-col justify-between w-11/12  rounded-[9px] h-33 mb-[-50px] shadow-lg border bg-white">
          <div className="flex-col px-6 justify-center mb-4">
            <p className="flex my-2 justify-center text-[#872341] text-2xl font-serif font-semibold">
              {subcategory}
            </p>
            <div className="flex flex-row justify-between font-medium">
              <span>For Camera : </span>
              <span className="font-bold text-red-600"> ₹ {camera}</span>
            </div>
            <div className="flex flex-row justify-between font-medium">
              <span>For Video : </span>
              <span className="font-bold text-red-600"> ₹ {Video}</span>
            </div>
            <div className="flex flex-row justify-between font-medium">
              <span>For Both : </span>
              <span className="font-bold text-red-600"> ₹ {Both}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PackageCard;
