import React, { useEffect, useState } from "react";
import VendorNavbar from "../../Components/Layouts/VendorNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import {faLocationDot} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { studioList } from "../../Api/VendorApi";

function VendorStudioPage() {
  const [studio, setStudio] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await studioList();
        console.log(response, " response.data");
        const studioData = response.data.studio;
        setStudio(studioData);
      } catch (error) {
        console.error("Error fetching studio data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <VendorNavbar />
      <div
        className="h-[90vh] w-full grid justify-center items-center grid-cols-2"
        style={{
          backgroundImage: "url(/Navbar/S.jpg)",
          backgroundSize: "cover",
        }}
      >
        <div className="w-full md:block hidden"></div>
        <div className="w-full md:w-1/2  pl-10 md:p-0  flex flex-col justify-start md:justify-center">
          <p className="text-center text-xl font-normal font-MyFont">
            welcome to
          </p>
          <h1 className="font-extrabold font-serif text-center text-7xl text-[#872341]">
            STUDIO
          </h1>
        </div>
      </div>
      {studio.length > 0 ? (
        studio.map((value) => (
          <div className="py-20 px-10" key={value._id}>
            <div className="grid grid-cols-1 md:grid-cols-4">
              <div>
                <img
                  src={`${value.coverImage}`}
                  alt={`Studio ${value.studioName}`}
                />
              </div>
              <div className="flex flex-col px-20 py-7 md:py-0 ">
                <h1 className="font-sans text-4xl font-bold ">{value.studioName}</h1>
                <div className="flex flex-row py-2">
                  <FontAwesomeIcon icon={faLocationDot}/>
                  <div className="px-2 font-sans font-semibold">{value.city}</div>
                  </div>
              </div>
              {/* ... other elements you want to display */}
            </div>
            <div className="py-10 flex-col">
              <h2 className="font-sans text-xl font-bold ">About</h2>
              <hr></hr>
              <div className="py-3 font-medium">{value.about}</div>
            </div>
            <div className="py-10 flex-col">
              <h2 className="font-sans text-xl font-bold ">Packages</h2>
              <hr></hr>
              <div className="py-3 font-medium">{value.about}</div>
            </div>
            <div className="py-10 flex-col">
              <h2 className="font-sans text-xl font-bold ">Gallery</h2>
              <hr></hr>
              <div className="py-3 flex flex-row">
                <img
                className="box-border w-1/2 md:w-1/6 "
                src={`${value.galleryImage}`}
                />
              </div>
            </div>
          </div>
            
        ))
      ) : (
        <div className="flex justify-center items-center h-[50vh]">
          <div className="h-30 flex flex-row items-center py-10">
            <Link to={"/vendor/createStudio"}>
              <div className="flex flex-row">
                <FontAwesomeIcon
                  icon={faFolderPlus}
                  className="text-3xl py-2"
                />
                <h3 className="font-bold text-4xl mx-3">Create studio</h3>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default VendorStudioPage;
