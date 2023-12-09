import React from 'react'
import { Routes , Route } from "react-router-dom"
import UserAuthPage from '../Pages/UserPages/UserAuthPage'
import UserHomePage from '../Pages/UserPages/UserHomePage'
import UserProfile from '../Pages/UserPages/UserProfilePage'
import UserPublic from '../Components/PublicRouter/UserPublic'
import UserProtector from '../Components/protectorRoute/UserProtector'
import EmailVerification from '../Pages/UserPages/UserOtpPage'


function UserRouter() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UserHomePage/>}/>
        <Route path="/login" element={<UserPublic><UserAuthPage form={"login"} /></UserPublic>}/>
        <Route path='/signup' element={<UserPublic><UserAuthPage/></UserPublic>}/>
        <Route path="/getOtp" element={<EmailVerification/>}/>
        <Route path="/profile" element={<UserProtector><UserProfile/></UserProtector>}/>
      </Routes>
    </div>
  )
}

export default UserRouter
