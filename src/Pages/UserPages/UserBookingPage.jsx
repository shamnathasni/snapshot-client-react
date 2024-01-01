import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useLocation } from "react-router-dom";

function UserBookingPage() {
  const location = useLocation();
  const bookingData = location.state.data;
  const handlepayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51OSCi8SIZzPXrKvEDrV8xUanWEKraQc40vPmXqfPlxZ2HWdoNRIjYbgUvDKNcwT5cLgfCh05dTk0kLNLFoR0SJkm00Z6CkZcq1"
    );
    const body = {
      package: bookingData,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/create-checkout-session",
        {
          method: "post",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container py-9 m-6 flex flex-col justify-center items-center">
      <p className="text-center text-xl font-sans ">
        You should pay 15% of the amount as an advance ,<br></br>
        only after that you could book the package
      </p>
      <div className="flex justify-between py-4 gap-2">
        <button
          className="btn  bg-red-800 w-16 text-center text-lg text-white"
          onClick={handlepayment}
        >
          Pay
        </button>
        <button className="btn  bg-green-700 w-16 text-center text-lg text-white">
          Close
        </button>
      </div>
    </div>
  );
}

export default UserBookingPage;
