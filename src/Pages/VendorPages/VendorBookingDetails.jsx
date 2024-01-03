import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { StickyNavbar } from "../../Components/Layouts/Navbar";

import { Link, useNavigate, useParams } from "react-router-dom";

import { bookingDetails } from "../../Api/VendorApi";

function VendorBookingDetails() {
  const { id } = useParams();
  console.log(id);
  const [bookingData, setBookingData] = useState("");
 
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await bookingDetails(id);
        if (response.data.status) {
          const details = response.data.bookings;
          console.log(details,"details");
          setBookingData(details);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

 
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
                {bookingData.map((value) => (
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
                  
                    <td className="">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {/* { format(value.date, "yyyy-mm-dd")} */}
                        {value.date}
                      </Typography>
                    </td>
                    <td className="bg-blue-gray-50/50 ">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {value.amount}
                      </Typography>
                    </td>
                    <td className=" ">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className=" btn btn-success text-center m-2 text-white py-3 font-medium"
                       
                        >
                        {console.log(value._id,"user999")}
                        {/* <FontAwesomeIcon icon={ChatBubbleBottomCenterTextIcon}/> */}
                       <Link to={`/vendor/chat/${value._id}`} >Message User</Link>
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>no bookings found</div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default VendorBookingDetails;
