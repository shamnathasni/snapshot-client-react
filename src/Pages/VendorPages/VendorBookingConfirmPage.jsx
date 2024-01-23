import React from "react";

import { cancel, success } from "../../Api/UserApi";
import { useLocation,useNavigate } from "react-router-dom";

function VendorBookingConfirmPage() {
    const navigate = useNavigate()
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const bookingData = searchParams.get("bookingInfo");
console.log(bookingData,"bookingData");

  const handleConfirm = async () => {
    try {
      success(bookingData);
      navigate("vendor/login")
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = async () => {
    try {
      cancel();
      navigate("vendor/login")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div class="p-8 mt-10">
      <div class=" w-1/2 mx-auto p-4 rounded-md shadow-lg bg-gray-50">
        <h1 class="text-2xl font-bold text-indigo-500 mb-4">CONFIRM BOOKING</h1>
        <p class="text-gray-700 text-left mb-4">
          after confirming you get 15% of amonut as an advance amount
        </p>

        <div class="flex justify-end">
          <button
            onClick={handleConfirm}
            class="bg-indigo-500 py-2 px-4 text-white rounded-md font-semibold uppercase text-sm mr-2"
          >
            Confirm
          </button>
          <button
            onClick={handleCancel}
            class="bg-red-500 py-2 px-4 text-white rounded-md font-semibold uppercase text-sm"
          >
            Deny
          </button>
        </div>
      </div>
    </div>
  );
}

export default VendorBookingConfirmPage;
