import React, { useEffect, useState } from "react";
import { resendOTP, verifyOtp } from "../../Api/UserApi";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userDetails } from "../../Redux/UserSlice";
import { toast } from "react-toastify";

const EmailVerification = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state.userData;
  const handleOtp = async (e) => {
    e.preventDefault();
    try {
      // Assuming verifyOtp takes the OTP as an argument
      const response = await verifyOtp(otp, userData);
      if (response.data.status) {
        localStorage.setItem("token", response.data.token);
        const { newUser } = response.data;
        dispatch(userDetails(newUser));
        toast(response.data.alert);
        navigate("/");
      } else {
        toast(response.data.alert);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //TIMER RESEND OTP BUTTON
  const [timer, setTimer] = useState(60); // Initial timer value in seconds
  const [showResendButton, setShowResendButton] = useState(false);

  useEffect(() => {
    let intervalId;

    if (timer > 0) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setShowResendButton(true);
    }

    return () => clearInterval(intervalId);
  }, [timer]);

  const handleResendClick = () => {
    // Logic to resend OTP
    setTimer(60); // Reset timer
    setShowResendButton(false);
  };

  const resendOtp = async () => {
    try {
      const response = await resendOTP(userData);
      console.log(response, "res");
      if (response) {
        toast(response.data.alert);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>Email Verification</p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              <p>We have sent a code to your email ba**@dipainhouse.com</p>
            </div>
          </div>

          <div>
            <form onSubmit={handleOtp} method="post">
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs space-x-1">
                  <div className="w-full h-16">
                    <input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      type="text"
                      name=""
                      id=""
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      type="submit"
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                    >
                      Verify Account
                    </button>
                  </div>

                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-black">
                    {showResendButton ? (
                      <button
                        className="flex flex-row items-center text-green-800 hover:text-green-950"
                        onClick={resendOtp}
                      >
                        Resend
                      </button>
                    ) : (
                      <p>Resend OTP in <span  className="text-red-900 font-semibold">{timer}</span> seconds</p>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
