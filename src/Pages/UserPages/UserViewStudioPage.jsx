import React, { useEffect, useState } from "react";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { singleStudio, studioPackages } from "../../Api/UserApi";
import { useLocation } from "react-router-dom";
import { StickyNavbar } from "../../Components/Layouts/Navbar";
import BookingCard from "../../Components/User/BookingCard";
import Footer from "../../Components/Layouts/Footer";

function UserViewStudioPage() {
  const location = useLocation();
  const studioId = location.state.id;
  const studioIds = location.state.id;
  console.log(studioId, "studioId");
  const [studio, setSingleStudio] = useState(null);
  const [packages, setPacakges] = useState([]);

  useEffect(() => {
    singleStudio(studioId)
      .then((response) => {
        const singleStudio = response.data.singleStudio;
        console.log(response.data, "singleStudio");
        setSingleStudio(singleStudio);
      })
      .catch((error) => console.log(error));
  }, [studioId]);
  useEffect(() => {
    studioPackages(studioIds)
      .then((response) => {
        const pacakge = response.data.packages;
        console.log(pacakge, "packages");
        setPacakges(pacakge);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
   
      <div className="w-full h-[90vh]">
        <StickyNavbar />
        {studio ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="w-full h-1/3 md:h-full flex justify-center pt-1 md:pt-3  md:pl-3  md:pr-3">
                <img
                  className="rounded-sm w-full"
                  src={`${studio.coverImage}`}
                />
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
                <div className="flex flex-row justify-center items-center gap-2 py-1">
                  {Array.from(
                    { length: Math.floor(studio.rating) },
                    (_, index) => (
                      <span className="" key={index}>
                        <FontAwesomeIcon icon={faStar} color="gold" />
                      </span>
                    )
                  )}
                  {studio.rating === 0 ? (
                    <h1 className=" font-MyFont">No Stars</h1>
                  ) : (
                    <div className=" font-MyFont">{studio.rating}stars</div>
                  )}
                </div>
                <div className="text-center font-MyFont font-extralight px-3 py-8 ">
                  {studio.about}
                </div>
              </div>
            </div>
            <div className="py-9 px-5">
              <h4 className="font-mono font-semibold text-[#872341] text-3xl">
                PACKAGES
              </h4>
              <p className="pb-2 font-serif font-extralight">
                for booking the packages you should pay 30% of amount in advance{" "}
              </p>
              <hr></hr>
              <div className="grid grid-cols-1 md:grid-cols-4 px-2 md:px-5">
                {console.log(packages, "pac")}

                {packages && packages.length > 0 ? (
                  packages.map((value, index) => (
                    <div key={index} className=" w-fit py-8">
                      {console.log(value.studioId, "pac.studioId")}
                      <BookingCard
                        subcategory={value.subcategory}
                        camera={value.camera}
                        Video={value.video}
                        Both={value.both}
                        imageurl={"/Cards/haldi.jpg"}
                        id={value._id}
                        studioId={value.studioId}
                      />
                    </div>
                  ))
                ) : (
                  <div className="py-3 font-medium">no packages available</div>
                )}
              </div>
            </div>

            <div className="flex flex-col py-4 px-3">
              <div className="text-2xl md:text-3xl font-sans font-semibold py-2">
                Gallery
              </div>
              <hr className="align-text-bottom bg-black"></hr>

              <div className="flex flex-row flex-wrap">
                {studio.galleryImage.map((value, index) => (
                  <img
                    key={index}
                    sizes=""
                    className="w-1/4 md:w-1/6 py-2"
                    src={`${value}`}
                    alt={`Gallery Image ${index}`}
                  />
                ))}
              </div>
            </div>
          </div>
          
        ) : (
          <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#872341]"></div>
        </div>
        )}
        <div className="w-full">
        <Footer />
      </div>
      </div>
      
    
  );
}

export default UserViewStudioPage;
