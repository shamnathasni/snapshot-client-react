import React, { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import { StickyNavbar } from "../../Components/Layouts/Navbar";
import { BookingDetails } from "../../Api/UserApi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { io } from "socket.io-client";

function BookingDetailsPage() {
  const { userId } = useParams();
  const [bookingData, setBookingData] = useState("");
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  

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

  const connectToSocket = (vendorId) => {
    const newSocket = io("http://localhost:4000");
    setSocket(newSocket);

    newSocket.emit("join", { userId, vendorId });

    newSocket.on("newMessage", (data) => {
      // Handle incoming messages
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { from: data.from, message: data.message },
      ]);
    });
  };

  const disconnectSocket = () => {
    if (socket) {
      socket.disconnect();
    }
  };

//   const directToChat = (vendorId) => {
//     console.log(vendorId, 'vend');
//     connectToSocket(vendorId);
//     navigate("/chat", { state: { vendorId } });
//   };

  const sendMessage = () => {
    if (socket) {
      socket.emit("sendMessage", { vendorId: bookingData.vendorId, message });
      setMessage("");
    }
  };
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
                    <td className=" bg-blue-gray-50/50 py-2">
                      <Typography
                        as="a"
                        href="#"
                        variant="small"
                        color="blue-gray"
                        className=" btn btn-success text-center text-white py-3 font-medium"
                       
                        >
                            {console.log(value.studio.vendorId,"value.studio.vendorId")}
                        {/* <FontAwesomeIcon icon={ChatBubbleBottomCenterTextIcon}/> */}
                       <Link to={`/chat/${value.studio.vendorId}`} >Message Studio</Link>
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

export default BookingDetailsPage;
