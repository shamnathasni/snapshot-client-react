import React, { useEffect, useState } from "react";
import { StickyNavbar } from "../../Components/Layouts/Navbar";
import Footer from "../../Components/Layouts/Footer";
import { categoryStudioList, searchStudio } from "../../Api/UserApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faExclamation } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";

function CategoryStudioPage() {
  const { subCategory } = useParams();
  const navigate = useNavigate();
  const [studio, setStudio] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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

  useEffect(() => {
    // Perform search API call when searchQuery changes
    if (searchQuery.trim() !== "") {
      searchStudio(searchQuery)
        .then((response) => {
          const results = response.data.search;
          setStudio(results);
        })
        .catch((err) => console.log(err));
    } else {
      setStudio([]);
    }
  }, [searchQuery]);

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
        <div className="w-[50vw] p-3">
          <form>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 19l-4-4m0-7a7 7 0 1 1-14 0 7 7 0 0 1 14 0zm-14 0a9 9 0 1 0 18 0 9 9 0 0 0-18 0z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#872341] focus:border-[#872341] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search studios,city........"
                name="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                disabled
                className="text-white absolute end-2.5 bottom-2.5 bg-[#872341] hover:bg-[#872341]  focus:ring-4 focus:outline-none focus:ring-[#872341] font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#872341] dark:hover:bg-[#872341] dark:focus:ring-[#872341]"
              >
                Search
              </button>
            </div>
          </form>
        </div>
        <div className="w-full md:block hidden"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 px-10  ">
        {searchQuery.trim() !== "" && studio.length === 0 ? (
          <div className="col-span-4 h-52 flex  flex-col justify-center items-center text-center text-red-800 font-medium">
            <p>No matched results for "{searchQuery}"</p>
            <div className="text-4xl"><FontAwesomeIcon icon={faExclamation}/></div>
          </div>
        ) : (
          studio.map((value, index) => (
            <div
              key={index}
              className="py-10 md:py-20 h-1/3 hover:scale-105 ease-in-out duration-300"
            >
              <div className=" h-[65vh] bg-[#f8f3f5]  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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
                <div className="text-center font-serif text-[#22092C] ">
                  <Button
                    className="text-[872341] hover:scale-105 ease-in-out duration-300"
                    onClick={() => handleViewStudio(value._id)}
                  >
                    {" "}
                    view studio
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default CategoryStudioPage;
