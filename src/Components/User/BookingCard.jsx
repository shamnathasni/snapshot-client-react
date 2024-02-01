import React, { useState } from "react";
import { Checkbox, Radio } from "@material-tailwind/react";
import Calendar from "../Home/Calendar";
import { bookingData } from "../../Api/UserApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function BookingCard(props) {
  const { subcategory, camera, Video, Both, imageurl, id, studioId } = props;
  const [bookingType, setBookingType] = useState(); // 'camera', 'video', 'both'
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const userId = useSelector((state)=>state.User.user._id)
  // Function to handle date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handlechange = (e, type) => {
    const { name, value } = e.target;
    setBookingType((prevState) => ({
      ...prevState,
      [name]: value,
      type: type,
    }));
  };

  const handleBooking = async () => {
    try {
      const response = await bookingData(
        bookingType,
        selectedDate,
        id,
        studioId,
        userId
      );
      if (response) {
        toast(response.data.alert);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="package-card-container  p-3 relative">
      <div
        className="w-72 h-80  md:w-64 md:h-64 justify-center items-end flex rounded-lg shadow-lg  mx-4"
        style={{ backgroundImage: `url(${imageurl})`, backgroundSize: "cover" }}
      >
        <div className="flex flex-col justify-between w-11/12  rounded-[9px] h-33 mb-[-50px] shadow-lg  border bg-white">
          <div className="flex-col px-6 justify-center">
            <p className=" flex my-2 justify-center  text-[#872341] text-2xl font-serif font-semibold">
              {subcategory}
            </p>
            <div className=" flex flex-row justify-between  font-medium ">
              <span className="">For Camera : </span>
              <span className=" font-bold text-red-600"> ₹ {camera}</span>
            </div>
            <div className=" flex flex-row justify-between font-medium ">
              <span className="">For Video : </span>
              <span className="font-bold text-red-600"> ₹ {Video}</span>
            </div>
            <div className=" flex flex-row justify-between  font-medium">
              <span className="">For Both : </span>
              <span className="font-bold text-red-600"> ₹ {Both}</span>
            </div>
          </div>
          <div className="flex justify-center mt-2 mb-2">
            {/* booking modal */}

            <label
              htmlFor="my_modal_6"
              className=" rounded-md mb-1 mt-2 px-3 py-1 font-bold  text-white bg-[#872341]"
            >
              BOOK NOW
            </label>

            {/* Put this part before </body> tag */}
            <input type="checkbox" id="my_modal_6" className="modal-toggle" />
            <div className="modal" role="dialog">
              <div className="modal-box">
                {/* <h3 className="font-bold text-lg"></h3> */}
                <form className="grid grid-col-2">
                  <div>
                    <div className=" flex flex-row gap-2 items-center font-medium py-2">
                      <input
                        type="Radio"
                        id="camera"
                        name="booking"
                        value={camera}
                        onChange={(e) => handlechange(e, "camera")}
                      />

                      <label htmlFor="camera">
                        <span className="">For Camera : </span>
                        <span className=" font-bold text-red-600">
                          {" "}
                          ₹ {camera}
                        </span>
                      </label>
                    </div>
                    <div className=" flex flex-row gap-2 items-center font-medium py-2">
                      <input
                        type="Radio"
                        id="video"
                        name="booking"
                        value={Video}
                        onChange={(e) => handlechange(e, "video")}
                      />

                      <label htmlFor="video">
                        <span className="">For Video : </span>
                        <span className=" font-bold text-red-600">
                          {" "}
                          ₹ {Video}
                        </span>
                      </label>
                    </div>
                    <div className=" flex flex-row gap-2 items-center font-medium py-2">
                      <input
                        type="Radio"
                        id="both"
                        name="booking"
                        value={Both}
                        onChange={(e) => handlechange(e, "Both")}
                      />

                      <label htmlFor="both">
                        <span className="">For Both : </span>
                        <span className=" font-bold text-red-600">
                          {" "}
                          ₹ {Both}
                        </span>
                      </label>
                    </div>
                  </div>
                  <div>
                    {/* Date picker section */}
                    <div className="flex flex-col gap-2 items-center font-medium py-2">
                      <label>Select Date:</label>
                      {/* Use the Calendar component for date picking */}
                      <Calendar
                        studioId={studioId}
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                      />
                    </div>
                  </div>
                </form>
                <div className="modal-action">
                  <button
                    className="btn btn-success text-white  font-bold"
                    onClick={handleBooking}
                  >
                    Book
                  </button>
                  <label
                    htmlFor="my_modal_6"
                    className="btn bg-red-700 text-white font-bold"
                  >
                    Close!
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingCard;
