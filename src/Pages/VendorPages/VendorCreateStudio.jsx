import React from "react";
import VendorNavbar from "../../Components/Layouts/VendorNavbar";
import StudioForm from "../../Components/StudioForm";

function VendorCreateStudio() {
  return (
    <div>
      <VendorNavbar />
      <div
        className="h-[90vh] w-full grid justify-center items-center grid-cols-1 grid-rows-1 "
        style={{
          backgroundImage: "url(/Navbar/createStudio.jpg)",
          backgroundSize: "cover",
        }}
      >
        <div className="w-full md:w-1/2  pl-10 md:p-0 mt-36 flex flex-col  justify-start md:justify-center">
          <p className="text-center text-xl font-normal font-MyFont">
            studio/studio venders
          </p>
          <h1 className="font-extrabold font-serif text-center px-4  text-5xl md:text-7gitxl  text-[#872341]">
            Create Studio
          </h1>
        </div>
        <div className="w-full md:block hidden"></div>
      </div>
      <div className="flex justify-center items-center py-4 bg-slate-50">
        <StudioForm />
      </div>
    </div>
  );
}

export default VendorCreateStudio;
