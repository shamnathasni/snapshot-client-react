import React, { useEffect, useState } from "react";
import {
  adminStudiolist,
  adminVendorlist,
  blockVendor,
  unblockVendor,
} from "../../Api/AdminApi";
import AdminNavbar from "../../Components/Layouts/AdminNavbar";
import { Link } from "react-router-dom";
import { TooltipCustomStyles } from "../../Components/Admin/Tooltip";

function AdminStudioList() {
  const [studioData, setStudioData] = useState([]);

  useEffect(() => {
    adminStudiolist()
      .then((response) => {
        const Studios = response.data.studio;
        setStudioData(Studios);
      })
      .catch((err) => console.log(err));
  }, []);

  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) {
      return 0;
    }

    const sumOfRatings = ratings.reduce((acc, num) => acc + num, 0);
    return sumOfRatings / ratings.length;
  };

  return (
    <>
      <AdminNavbar />
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-2 lg:-mx-4">
          <div className="inline-block min-w-full py-6 sm:px-10 lg:px-12 m">
            <div className="overflow-hidden">
              {studioData.length > 0 ? (
                <table className="min-w-full text-left text-sm font-light border-2 border-black">
                  <thead className="border-b font-medium dark:border-neutral-500 bg-[#dadada]">
                    <tr>
                      <th scope="col" className="px-6 py-4 font-bold">
                        #
                      </th>
                      <th scope="col" className="px-6 py-4 font-bold">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-4 font-bold">
                        Vendor
                      </th>
                      <th scope="col" className="px-6 py-4 font-bold">
                        About
                      </th>
                      <th scope="col" className="px-6 py-4 font-bold">
                        performance
                      </th>
                      <th scope="col" className="px-6 py-4 font-bold">
                        Packages
                      </th>
                      <th scope="col" className="px-6 py-4 font-bold"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {studioData.map((value, index) => (
                      <tr
                        key={value._id}
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium align-middle">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium align-middle">
                          {value.studioName}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium align-middle">
                          {value.vendorId.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium max-w-28 align-middle">
                          <TooltipCustomStyles paragraph={value.about} />
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium max-w-28 align-middle ">
                          {value.rating === 0 ? (
                            <h1 className="text-black font-semibold">
                              No Stars
                            </h1>
                          ) : (
                            Array.from(
                              {
                                length: 5,
                              },
                              (_, index) => (
                                <span className="" key={index}>
                                  <FontAwesomeIcon
                                    icon={faStar}
                                    color={
                                      index <
                                      Math.floor(
                                        calculateAverageRating(value.rating)
                                      )
                                        ? "gold"
                                        : "gray"
                                    }
                                  />
                                </span>
                              )
                            )
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {value.package && value.package.length > 0 ? (
                            value.package.map((items, index) => (
                              <div
                                key={index}
                                className="whitespace-nowrap px-6 py-4 font-medium flex flex-col text-lg items-center"
                              >
                                {index + 1}) {items.subcategory}
                                <div className="flex text-lg items-center">
                                  - Camera-₹ {items.camera}
                                </div>
                                <div className="flex text-lg items-center">
                                  - Video-₹ {items.video}
                                </div>
                                <div className="flex text-lg items-center">
                                  - Both-₹ {items.both}
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="p-5 text-red-600">
                              No packages..
                            </div>
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4  ">
                          <button className="mb-5 pt-2 font-medium bg-[#22092C] text-white w-28 text-center h-10 flex justify-center rounded-md shadow-md">
                            <Link to={`/admin/bookinglist/${value._id}`}>
                              View Bookings
                            </Link>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#872341]">
                  No Studios found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminStudioList;
