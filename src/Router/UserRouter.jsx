import React from "react";
import { Routes, Route } from "react-router-dom";
import UserAuthPage from "../Pages/UserPages/UserAuthPage";
import UserHomePage from "../Pages/UserPages/UserHomePage";
import UserProfile from "../Pages/UserPages/UserProfilePage";
import UserPublic from "../Components/PublicRouter/UserPublic";
import UserProtector from "../Components/protectorRoute/UserProtector";
import EmailVerification from "../Pages/UserPages/UserOtpPage";
import UserStudioPage from "../Pages/UserPages/UserStudioPage";
import UserViewStudioPage from "../Pages/UserPages/UserViewStudioPage";
import UserBookingPage from "../Pages/UserPages/UserBookingPage";
import UserChatPage from "../Pages/UserPages/UserChatPage";
import CategoryStudioPage from "../Pages/UserPages/CategoryStudioPage";
import Success from "../Pages/UserPages/Success";
import Cancel from "../Pages/UserPages/Cancel";
import BookingDetailsPage from "../Pages/UserPages/BookingDetailsPage";

function UserRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserHomePage />} />

        <Route
          path="/login"
          element={
            <UserPublic>
              <UserAuthPage form={"login"} />
            </UserPublic>
          }
        />
        <Route
          path="/signup"
          element={
            <UserPublic>
              <UserAuthPage />
            </UserPublic>
          }
        />
        <Route path="/getOtp" element={<EmailVerification />} />
        <Route
          path="/profile"
          element={
            <UserProtector>
              <UserProfile />
            </UserProtector>
          }
        />
        <Route path="/userStudio" element={<UserStudioPage />} />
        <Route
          path="/categoryStudio/:subCategory"
          element={<CategoryStudioPage />}
        />
        <Route path="/viewstudio" element={<UserProtector><UserViewStudioPage /></UserProtector>} />
        <Route
          path="/booking/:bookingId"
          element={
            <UserProtector>
              <UserBookingPage />
            </UserProtector>
          }
        />
        <Route
          path="/success"
          element={
            <UserProtector>
              <Success />
            </UserProtector>
          }
        />
        <Route
          path="/cancel"
          element={
            <UserProtector>
              <Cancel />
            </UserProtector>
          }
        />
        <Route
          path="/bookingDetails/:userId"
          element={
            <UserProtector>
              <BookingDetailsPage />
            </UserProtector>
          }
        />
        <Route
          path="/chat/:vendorId/:bookingId"
          element={
            <UserProtector>
              <UserChatPage />
            </UserProtector>
          }
        />
      </Routes>
    </div>
  );
}

export default UserRouter;
