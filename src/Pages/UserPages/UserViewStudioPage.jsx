import React, { useEffect, useRef, useState } from "react";
import {
  faLocationDot,
  faStar,
  faForward,
  faBackward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal } from "react-responsive-modal";
import Slider from "react-slick";
import "react-responsive-modal/styles.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { singleStudio, studioPackages } from "../../Api/UserApi";
import { useLocation } from "react-router-dom";
import { StickyNavbar } from "../../Components/Layouts/Navbar";
import BookingCard from "../../Components/User/BookingCard";
import Footer from "../../Components/Layouts/Footer";

function UserViewStudioPage() {
  const location = useLocation();
  const sliderRef = useRef(null);
  const studioId = location.state.id;
  const studioIds = location.state.id;
  const [studio, setSingleStudio] = useState(null);
  const [packages, setPackages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    singleStudio(studioId)
      .then((response) => {
        const singleStudio = response.data.singleStudio;
        setSingleStudio(singleStudio);
      })
      .catch((error) => console.log(error));
  }, [studioId]);

  useEffect(() => {
    studioPackages(studioIds)
      .then((response) => {
        const packages = response.data.packages;
        setPackages(packages);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [studioIds]);



  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="w-full h-[90vh]">
      <StickyNavbar />
      {studio ? (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="w-full h-1/3 md:h-full flex justify-center pt-1 md:pt-3  md:pl-3  md:pr-3">
              <img className="rounded-sm w-full" src={`${studio.coverImage}`} />
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
            <div className=" grid grid-cols-1 md:grid-cols-4 px-2 md:px-5">
              {packages && packages.length > 0 ? (
                packages.map((value, index) => (
                  <div key={index} className=" w-fit py-8">
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

            <div className="flex flex-row gap-3">
              {studio.galleryImage.map((value, index) => (
                <img
                  key={index}
                  sizes=""
                  className="w-full md:w-1/6 py-2 cursor-pointer"
                  src={`${value}`}
                  alt={`Gallery Image ${index}`}
                  onClick={() => openModal(index)}
                />
              ))}
            </div>
            {/* Image Modal */}
            <Modal open={modalOpen} onClose={closeModal} center>
              <Slider
                ref={(slider) => (sliderRef.current = slider)}
                {...settings}
                initialSlide={selectedImageIndex}
              >
                {studio.galleryImage.map((value, index) => (
                  <img
                    key={index}
                    sizes=""
                    className="h-fit w-fit"
                    src={`${value}`}
                    alt={`Gallery Image ${index}`}
                  />
                ))}
              </Slider>
              <div
                className="absolute top-1/2 left-4 cursor-pointer"
                onClick={prevSlide}
              >
                <FontAwesomeIcon
                  className="h-10 w-10 text-white"
                  icon={faBackward}
                />
              </div>
              <div
                className="absolute top-1/2 right-4 cursor-pointer"
                onClick={nextSlide}
              >
                <FontAwesomeIcon
                  className="h-10 w-10 text-white"
                  icon={faForward}
                />
              </div>
            </Modal>
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
