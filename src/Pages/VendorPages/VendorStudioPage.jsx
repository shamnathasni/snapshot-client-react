import React, { useEffect, useState } from "react";
import VendorNavbar from "../../Components/Layouts/VendorNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { studioList } from "../../Api/VendorApi";
import { useSelector } from "react-redux";
import AddPackageModal from "../../Components/Modals/AddPackageModal"; // Adjust the path accordingly

function VendorStudioPage() {
  const [studio, setStudio] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const vendorsId = useSelector((state) => state.Vendor.vendor._id);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle adding a package
  const handleAddPackage = (packageDetails) => {
    // Add logic to handle adding the package details
    console.log("Adding package:", packageDetails);
  };

  useEffect (() => {
    const fetchData = async () => {
      try {
        const response = await studioList(vendorsId);
        console.log(response, " response.data");
        const studioData = response.data.studio;
        console.log(response.data.studio, "studioData");
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

      {studio && studio.vendorId === vendorsId ? (
        <div className="py-20 px-10">
          <div className="grid grid-cols-1 md:grid-cols-4">
            <div>
              <img
                src={`${studio.coverImage}`}
                alt={`Studio ${studio.studioName}`}
              />
            </div>
            <div className="flex flex-col px-20 py-7 md:py-0 ">
              <h1 className="font-sans text-4xl font-bold ">
                {studio.studioName}
              </h1>
              <div className="flex flex-row py-2">
                <FontAwesomeIcon icon={faLocationDot} />
                <div className="px-2 font-sans font-semibold">
                  {studio.city}
                </div>
              </div>
            </div>
            {/* ... other elements you want to display */}
          </div>
          <div className="py-10 flex-col">
            <h2 className="font-sans text-xl font-bold ">About</h2>
            <hr></hr>
            <div className="py-3 font-medium">{studio.about}</div>
          </div>
          <div className="py-10 flex-col">
            <div className="flex justify-between">
              <h2 className="font-sans text-xl font-bold ">Packages</h2>
              <button
                onClick={openModal}
                className="bg-[#872341] text-white w-[50px] text-center rounded-sm mb-2"
              >
                Add+
              </button>
              {/* ... */}
              {/* Render the AddPackageModal component */}
              <AddPackageModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onAddPackage={handleAddPackage}
              />
            </div>
            <hr></hr>
            <div className="py-3 font-medium">no packages available</div>
          </div>
          <div className="py-10 flex-col">
            <h2 className="font-sans text-xl font-bold ">Gallery</h2>
            <hr></hr>
            <div className="py-3 flex flex-row">
              <img
                className="box-border w-1/2 md:w-1/6 "
                src={`${studio.galleryImage}`}
              />
            </div>
          </div>
        </div>
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
