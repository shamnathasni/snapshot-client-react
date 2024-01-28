import React, { useEffect, useState } from "react";
import VendorNavbar from "../../Components/Layouts/VendorNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AddPackage, packageList, studioList } from "../../Api/VendorApi";
import { useSelector } from "react-redux";
import AddPackageModal from "../../Components/Modals/AddPackageModal"; // Adjust the path accordingly
import { toast } from "react-toastify";
import PackageCard from "../../Components/vendor/packageCard";

function VendorStudioPage() {
  const [studio, setStudio] = useState([]);
  const [packageState, setPackageState] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const vendorsId = useSelector((state) => state.Vendor.vendor._id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await studioList(vendorsId);
        if (response) {
          const studioData = response.data.studio;

          setStudio(studioData);
        } else {
          console.error("No data in response");
        }
      } catch (error) {
        console.error("Error fetching studio data:", error);
      }
    };

    fetchData();
  }, []);

  // const navigate = useNavigate();

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    packageList()
      .then((response) => {
        setPackageState(response.data.packageData);
        // setPackageState(response.data.packageData);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddPackage = async (localState) => {
    try {
      const response = await AddPackage({
        localState,
      });

      // Display toast message
      toast(response.data.alert);

      // Wait for the state to be updated, then fetch the updated package list
      await setPackageState((prevPackages) => [
        ...prevPackages,
        response.data.packageData,
      ]);

      // Fetch the updated package list
      const updatedPackages = await packageList();

      // Update the packageState with the fetched list
      setPackageState(updatedPackages.data.packageData);
    } catch (error) {
      console.error("Error adding package:", error);
    }
  };

  return (
    <div className="bg-slate-100 h-[90vh]  md:w-full  no-scrollbar">
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
          <div className="py-10 w-full">
            <h2 className="font-sans text-xl font-bold ">About</h2>
            <hr></hr>
            <p className="w-full py-3 font-medium">{studio.about}</p>
          </div>
          <div className="py-10 flex-col">
            <div className="flex justify-between">
              <h2 className="font-sans text-xl font-bold ">Packages</h2>
              <button
                onClick={openModal}
                className="bg-[#872341] text-white w-[60px] text-center rounded-[9px] mb-3 p-2"
              >
                Add+
              </button>

              <AddPackageModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onAddPackage={(localState) => {
                  handleAddPackage(localState);
                }}
              />
            </div>
            <hr></hr>
            <div className="grid grid-cols-1 md:grid-cols-4 ">
              {packageState && packageState.length > 0 ? (
                packageState.map((value, index) => (
                  <div className="py-6" key={index}>
                    <PackageCard
                      subcategory={value?.subcategory}
                      camera={value?.camera}
                      Video={value?.video}
                      Both={value?.both}
                      imageurl={"/Cards/haldi.jpg"}
                      id={value?._id}
                    />
                  </div>
                ))
              ) : (
                <div className="py-3 font-medium">no packages available</div>
              )}
            </div>
          </div>
          <div className="py-10 flex-col">
            <h2 className="font-sans text-xl font-bold ">Gallery</h2>
            <hr></hr>
            <div className="flex flex-row gap-2">
              {studio.galleryImage.map((value, index) => (
                <div className="flex flex-row w-1/2 md:w-1/6">
                  <img
                    key={index}
                    className="box-border "
                    src={`${value}`}
                    alt={`Gallery Image ${index}`}
                  />
                </div>
              ))}
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
    </div>
  );
}

export default VendorStudioPage;
