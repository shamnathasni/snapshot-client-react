import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UploadWidget from "../../Components/Upload/UploadWidget";
import { logoutDetails, updateVendorImage } from "../../Redux/VendorSlice";
import VendorNavbar from "../../Components/Layouts/VendorNavbar";
import Modal from "../../Components/Modal";
import { Button } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckToSlot } from "@fortawesome/free-solid-svg-icons";


const VendorProfilePage = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const vendor = useSelector((state) => state.Vendor.vendor);
  console.log(vendor, "vendor");
  const { name, email, number, image, _id } = vendor;
  const handleLogout = async () => {
    localStorage.removeItem("token");
    dispatch(logoutDetails());
    navigate("/vendor/login");
    setShowModal(false);
  };
  const cancelLogout = () => {
    setShowModal(false);
  };
  const confirmLogout = () => {
    setShowModal(true);
  };

  const handleImageUpload = (uploadedImageUrl) => {
    // Dispatch an action to update the image in the Redux store
    dispatch(updateVendorImage(uploadedImageUrl));
  };


  return (
    <>
      <VendorNavbar />
      <div className="pt-16 bg-blueGray-50">
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="relative">
                    <label htmlFor="fileInput" className="cursor-pointer w-4/5">
                      <img
                        src={
                          image
                            ? image
                            : "https://th.bing.com/th/id/OIP.puMo9ITfruXP8iQx9cYcqwHaGJ?pid=ImgDet&rs=1"
                        }
                        alt="card-image"
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </label>
                  </div>
                </div>
                <div className="w-full px-4 text-center mt-20">
                  {/* Include UploadWidget and pass the callback function */}

                  <UploadWidget
                    isImage={image ? true : false}
                    onImageUpload={handleImageUpload}
                  />
                </div>
              </div>
              <div className="w-full px-4 text-center mt-20">
                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      09/12/2023
                    </span>
                    <span className="text-[15px] text-blueGray-400">
                      joinedDate
                    </span>
                  </div>
                  <div className="mr-4 p-3 text-center">
                    <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                      10
                    </span>
                    <span className="text-[15px] text-blueGray-400">
                      Date of Birth
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center mt-12">
                <h3 className="text-xl font-semibold leading-normal  text-blueGray-700 mb-2">
                  {name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {email}
                </div>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {number}
                </div>
                <div className="mb-2 mt-10 font-bold">
                  <i className=" mr-2 text-lg  text-blueGray-400"></i>
                 <Link to={`/vendor/bookings/${_id}`}>
                    <FontAwesomeIcon icon={faCheckToSlot} /> Bookings
                    </Link>
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <div className="font-normal text-pink-500">
                      <span onClick={confirmLogout}>Logout</span>
                      {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                          <div className="p-4">
                            <p className="mb-4 text-black">
                              Are you sure you want to logout?
                            </p>
                            <div className="flex justify-center">
                              <Button
                                variant="outlined"
                                size="sm"
                                className="ml-2 bg-[#872341] text-white"
                                onClick={cancelLogout}
                              >
                                Cancel
                              </Button>
                              <Button
                                variant="outlined"
                                size="sm"
                                className="ml-2 bg-[#872341] text-white"
                                onClick={handleLogout}
                              >
                                Confirm
                              </Button>
                            </div>
                          </div>
                        </Modal>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorProfilePage;
