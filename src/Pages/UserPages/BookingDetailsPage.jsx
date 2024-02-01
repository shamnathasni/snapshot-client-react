import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { StickyNavbar } from "../../Components/Layouts/Navbar";
import { Link, useParams } from "react-router-dom";
import { BookingDetails } from "../../Api/UserApi";

function BookingDetailsPage() {
  const { userId } = useParams();
  const [bookingData, setBookingData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await BookingDetails(userId);
        if (response.data.status) {
          const details = response.data.bookingdetails;
          setBookingData(details);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div>
      <StickyNavbar />
      <div className="p-9">
        <Card className="h-full w-full overflow-scroll flex justify-center items-center p-4 ">
          {bookingData ? (
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className=" text-base font-serif leading-none opacity-95 text-black font-bold uppercase "
                    >
                      Package
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="text-base font-serif leading-none  opacity-95 text-black font-bold uppercase"
                    >
                      Type
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 ">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className=" text-base  font-serif leading-noneopacity-95 text-black font-bold  uppercase"
                    >
                      Studio
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className=" text-base  font-serif leading-none opacity-95 text-black font-bold uppercase "
                    >
                      Date
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="text-base  font-serif leading-none opacity-95 text-black font-bold uppercase "
                    >
                      Amount
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="text-base  font-serif leading-none opacity-95 text-black font-bold uppercase "
                    ></Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookingData.booking.map((value) => (
                  <tr key={value._id}>
                    <td className="">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {value.package.subcategory}
                      </Typography>
                    </td>
                    <td className=" bg-blue-gray-50/50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {value.type}
                      </Typography>
                    </td>
                    <td className=" ">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {value.studio.studioName}
                      </Typography>
                    </td>
                    <td className=" bg-blue-gray-50/50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {/* { format(value.date, "yyyy-mm-dd")} */}
                        {value.date}
                      </Typography>
                    </td>
                    <td className=" ">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {value.amount}
                      </Typography>
                    </td>
                    <td className=" bg-blue-gray-50/50">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {value.is_verified === true && (
                          <button className="w-32 h-7 rounded-md bg-green-500  text-white m-2">
                            <Link
                              to={`/chat/${value.studio.vendorId}/${value._id}`}
                            >
                              Message Studio
                            </Link>
                          </button>
                        )}
                        {value.is_verified === false && (
                          <span>
                            {value.status === "pending" && "pending...."}
                            {value.status === "confirm" && (
                              <button className="w-32 h-7 rounded-md bg-blue-700  text-white m-2">
                                <Link to={`/booking/${value._id}`}>
                                  request for payment
                                </Link>
                              </button>
                            )}

                            {value.status === "reject" && (
                              <button className="w-32 h-7 rounded-md bg-red-700 text-white m-2">
                                <Link to={"/userStudio"}>booking rejected</Link>
                              </button>
                            )}
                          </span>
                        )}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#872341]"></div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default BookingDetailsPage;
