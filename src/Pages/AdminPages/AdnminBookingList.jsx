import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { StickyNavbar } from "../../Components/Layouts/Navbar";

import { useParams } from "react-router-dom";
import { BookingDetails } from "../../Api/AdminApi";
import AdminNavbar from "../../Components/Layouts/AdminNavbar";


function AdminBookingList() {
  const { studioId } = useParams();
  console.log(studioId,"studioId");
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
        BookingDetails(studioId)
        .then((response)=>{
          const details = response.data.bookingData;
          console.log(details, "details");
          setBookingData(details);
        })
      .catch((err)=>console.log(err.message))
       
      


 
  }, [studioId]);
  console.log(bookingData, "bd");

  return (
    <div>
     <AdminNavbar/>
      <div className="p-9 bg-slate-50">
        <Card className="h-full w-full overflow-scroll flex justify-center items-center p-4 ">
          {bookingData.length>0 ? (
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className=" text-base font-serif leading-none opacity-95 text-black font-bold uppercase "
                    >
                      
                    </Typography>  
                    </th>
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
                    >Status</Typography>
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
                {bookingData.map((value,index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
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
                            color={value.status === "reject"  ? "red" : "balck"}
                        // className={value.status === "reject"  ?`font-normal text-red` :`font-normal text-black` }
                      >
                        {value.status}
                      </Typography>
                    </td>
                    <td className="">
                      <Typography
                        variant="small"
                        color={value.is_verified===false?"red":"blue-gray"}
                        className="font-medium"
                      >
                        {value.is_verified===true?"booked":"not booked"}
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

export default AdminBookingList;
