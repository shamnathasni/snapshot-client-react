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
        <Route path="/viewstudio" element={<UserProtector><UserViewStudioPage/></UserProtector>}/>
      </Routes>
    </div>
  )
}

export default UserRouter
