import React, { useEffect, useRef, useState } from "react";
import { Button, Card, Typography } from "@material-tailwind/react";
import { StickyNavbar } from "../../Components/Layouts/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { bookingDetails, confirmBooking, rejectBooking } from "../../Api/VendorApi";
import Modal from "../../Components/Modal";
import {toSentenceCase} from "alter-case"


function VendorBookingDetails() {
  const { id } = useParams();
  const [bookingData, setBookingData] = useState("");
  const [showModal, setShowModal] = useState(false);
  console.log(bookingData,"bookingData");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await bookingDetails(id);
        if (response.data.status) {
          const details = response.data.bookings;
          console.log(details, "details");
          setBookingData(details);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const confirmReject = () => {
    setShowModal(true);
  };

  const cancelReject = () => {
    // Cancel the logout action
    setShowModal(false);
  };


  const handleConfirm = async (Id) =>{
    try {
      
      const response = confirmBooking(Id)
      if(response){
        const newBooking = bookingData.map((value)=>
          value._id === Id ? {...value, status: "confirm"}:value
        )
        setBookingData(newBooking)
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleReject = async (Id) =>{
    try {
      
      const response = rejectBooking(Id)
      if(response){
        console.log(response,"res");
        
        const newBooking = bookingData.map((value)=> {

          value._id === Id ? {...value, status : "reject"}:value
        }
          )
        setBookingData(newBooking)
       { console.log(bookingData,"ppp");}
      }
      setShowModal(false);
      
    } catch (error) {
      console.log(error.message);
    }
  }

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
                        {console.log(toSentenceCase(value.studio.about))}
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
                        className="font-normal"
                      >
                        {value.status === "pending" && (
                          <>
                            <button
                              className="btn btn-success opacity-30 hover:scale-105 ease-in-out duration-300 text-center m-2 text-white  py-3 font-medium"
                              onClick={() => handleConfirm(value._id)}
                            >
                              Confirm
                            </button>
                            <button
                              className="btn bg-red-300 hover:scale-105 ease-in-out duration-300 text-center  m-2 text-white py-3 font-medium"
                              onClick={confirmReject}
                            >
                              Reject
                            </button>
                            {showModal && (
                              <Modal onClose={() => setShowModal(false)}>
                                <div className="p-4">
                                  <p className="mb-4 text-black">
                                    Are you sure,do you need to reject?
                                  </p>
                                  <div className="flex justify-center">
                                    <Button
                                      variant="outlined"
                                      size="sm"
                                      className="ml-2 bg-[#872341] text-white"
                                      onClick={cancelReject}
                                    >
                                      Cancel
                                    </Button>
                                    <Button
                                      variant="outlined"
                                      size="sm"
                                      className="ml-2 bg-[#872341] text-white"
                                      onClick={()=>handleReject(value._id)}
                                    >
                                      Confirm
                                    </Button>
                                  </div>
                                </div>
                              </Modal>
                            )}
                          </>
                        )}
                        {value.status !== "pending" && (
                          <span className={value.status ==="reject"&&"font-sans text-red-500 p-8 font-medium text-lg"} >
                            {value.status === "reject"&&"rejected"}  
                          
                          </span>
                        )}
                      
                    {value.status === "confirm"&&(
                    <td className=" ">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className=" btn hover:scale-105 ease-in-out duration-300 bg-blue-500 text-center m-2 text-white py-3 font-medium"
                      >
                        <Link to={`/vendor/chat/${value._id}`}>
                          Message User
                        </Link>
                      </Typography>
                    </td>
                    )}
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
