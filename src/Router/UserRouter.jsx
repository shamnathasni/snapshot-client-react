import React from 'react'
import { Routes , Route } from "react-router-dom"
import UserAuthPage from '../Pages/UserPages/UserAuthPage'
import UserHomePage from '../Pages/UserPages/UserHomePage'
import UserProfile from '../Pages/UserPages/UserProfilePage'
import UserPublic from '../Components/PublicRouter/UserPublic'
import UserProtector from '../Components/protectorRoute/UserProtector'
import EmailVerification from '../Pages/UserPages/UserOtpPage'
import UserStudioPage from '../Pages/UserPages/UserStudioPage'
import UserViewStudioPage from '../Pages/UserPages/UserViewStudioPage'
import UserBookingPage from '../Pages/UserPages/UserBookingPage'
import Success from '../Pages/UserPages/success'
import Cancel from '../Pages/UserPages/cancel'
import BookingDetailsPage from '../Pages/UserPages/bookingDetailsPage'
import UserChatPage from '../Pages/UserPages/UserChatPage'
import CategoryStudioPage from '../Pages/UserPages/CategoryStudioPage'
// import {io} from 'socket.io-client';

// const socket = io('http://localhost:4000');


function UserRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserHomePage/>}/>

        <Route path="/login" element={<UserPublic><UserAuthPage form={"login"} /></UserPublic>}/>
        <Route path='/signup' element={<UserPublic><UserAuthPage/></UserPublic>}/>
        <Route path="/getOtp" element={<EmailVerification/>}/>
        <Route path="/profile" element={<UserProtector><UserProfile/></UserProtector>}/>
        <Route path="/userStudio" element={<UserProtector><UserStudioPage/></UserProtector>}/>
        <Route path="/categoryStudio/:subCategory" element={<UserProtector><CategoryStudioPage/></UserProtector>}/>
        <Route path="/viewstudio" element={<UserProtector><UserViewStudioPage/></UserProtector>}/>
        <Route path="/booking" element={<UserProtector><UserBookingPage/></UserProtector>}/>
        <Route path="/success" element={<UserProtector><Success/></UserProtector>}/>
        <Route path="/cancel" element={<UserProtector><Cancel/></UserProtector>}/>
        <Route path="/bookingDetails/:userId" element={<UserProtector><BookingDetailsPage/></UserProtector>}/>
        <Route path="/chat/:vendorId/:bookingId" element={<UserProtector><UserChatPage /></UserProtector>}/>
        {/* <Route path="/chat" element={<UserProtector><UserChatPage socket={socket} /></UserProtector>}/> */}
      </Routes>
    </div>
  )
}

export default UserRouter
