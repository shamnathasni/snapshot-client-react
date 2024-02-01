import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { confirmPayment, submitRating } from "../../Api/UserApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

function Success() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const packageId = queryParams.get("packageId");

  const userId = useSelector((state)=>state.User.user._id)

  const [rating, setRating] = useState(0);

  const handleRatingClick = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleRatingSubmit = () => {
    submitRating(packageId, rating);
    // You may want to handle the response from the API or add additional logic here
  };

  useEffect(()=>{
  confirmPayment(packageId,userId)
  .catch((err)=>console.log(err.message))
  },[])

  const stars = Array.from({ length: 5 }, (_, index) => (
    <FontAwesomeIcon
      key={index}
      icon={faStar}
      color={index + 1 <= rating ? "gold" : "gray"}
      onClick={() => handleRatingClick(index + 1)}
      style={{ cursor: "pointer", marginRight: "5px" }}
    />
  ));

  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6  md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p>Have a great day!</p>
          <div className="py-4">
            <p className="text-gray-600 my-2">Rate the studio:</p>
            <div>{stars}</div>
            <button
              onClick={handleRatingSubmit}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold mt-2"
            >
              Submit Rating
            </button>
          </div>
          <div className="py-6 text-center">
            <Link
              to={"/"}
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              GO BACK
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
