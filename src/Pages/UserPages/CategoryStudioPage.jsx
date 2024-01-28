import React, { useEffect, useState } from "react";
import { StickyNavbar } from "../../Components/Layouts/Navbar";
import Footer from "../../Components/Layouts/Footer";
import { categoryStudioList, studioList } from "../../Api/UserApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";

function CategoryStudioPage() {
  const { subCategory } = useParams();
  const navigate = useNavigate();
  const [studio, setStudio] = useState([]);
  useEffect(() => {
    categoryStudioList(subCategory)
      .then((response) => {
        const studioData = response.data.studioData;
        setStudio(studioData);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleViewStudio = (Id) => {
    navigate("/viewstudio", { state: { id: Id } });
  };

  return (
    <div className="h-[90vh] w-full md:w-full">
      <StickyNavbar />
      <div
        className="h-[90vh] w-screen md:w-full  flex flex-col items-center"
        style={{
          backgroundImage: "url(/Navbar/userStudio.jpg)",
          backgroundSize: "cover",
        }}
      >
        <div className="w-full md:w-1/2  pl-10 md:p-0 mt-36 flex flex-col  justify-start md:justify-center">
          <p className="text-center text-xl font-normal font-MyFont">
            search for the available packages
          </p>
          <h1 className="font-extrabold font-serif text-center px-4  text-5xl md:text-7gitxl  text-[#872341]">
            {subCategory} Studios
          </h1>
        </div>
        <div className="w-full md:block hidden"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-10  ">
        {studio.map((value, index) => (
          <div key={index} className="py-10 md:py-20 h-1/3 ">
            <div className=" h-[60vh] bg-[#f8f3f5]  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img
                  className="rounded-t-lg h-[30vh] w-full"
                  src={`${value.coverImage}`}
                  alt=""
                />
              </a>
              <div className="p-5 flex flex-col justify-center">
                <a href="#">
                  <h5 className="text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {value.studioName}
                  </h5>
                </a>
                <span className="flex justify-center py-2 gap-2">
                  <div>
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <div className="font-medium">{value.city}</div>
                </span>
                <div>
                  {value.package && value.package.length > 0 ? (
                    <p className="text-center text-green-900 font-medium">
                      packages are available
                    </p>
                  ) : (
                    <p className="text-center text-red-800 font-medium">
                      no packages available
                    </p>
                  )}
                </div>
              </div>
              <div className="text-center font-serif text-[#22092C]">
                <Button
                  className="text-[872341]"
                  onClick={() => handleViewStudio(value._id)}
                >
                  {" "}
                  view studio
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default CategoryStudioPage;
