import React, { useEffect, useState } from "react";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { singleStudio } from "../../Api/UserApi";
import { useLocation } from "react-router-dom";
import { StickyNavbar } from "../../Components/Layouts/Navbar";

function UserViewStudioPage() {
  const location = useLocation();
  const studioId = location.state.id;
  console.log(studioId, "studioId");
  const [studio, setSingleStudio] = useState(null);

  useEffect(() => {
    singleStudio(studioId)
      .then((response) => {
        const singleStudio = response.data.singleStudio;
        console.log(response.data, "singleStudio");
        setSingleStudio(singleStudio);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="w-full h-[90vh]">
     <StickyNavbar/>
      {studio ?( 
        <div> 
        <div className="grid grid-rows-1 md:grid-cols-2"> 
          <div className="w-full h-1/3 md:h-full flex justify-center pt-1 md:pt-3 pl-1 md:pl-3 pr-1 md:pr-3">
            <img 
            className="rounded-sm w-full"
            src={`${studio.coverImage}`} />
          </div>
          <div className=" md:py-20 flex flex-col ">
            <p className="text-center text-2xl font-normal font-MyFont">
              welcome to
            </p>
            <h1 className="font-extrabold font-serif text-center text-4xl md:text-6xl text-[#872341]">
              {studio.studioName}
            </h1>
            <div className="flex flex-row justify-center items-center gap-2 py-3">
              <FontAwesomeIcon icon={faLocationDot} />
              <p>{studio.city}</p>
            </div>
            <div className="text-center font-MyFont font-extralight px-3 py-8 ">{studio.about}</div>
         
          </div>
        </div>
        <div className="flex flex-col py-4 px-3">
            <div className="text-2xl md:text-3xl font-sans font-semibold py-2">Gallery</div>
            <hr className="align-text-bottom bg-black"></hr>
            <img 
            sizes=""
            className="w-1/4 md:1/6 py-2"
            src={`${studio.galleryImage}`} alt="" />
            
        </div>
        </div>
       ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default UserViewStudioPage;
