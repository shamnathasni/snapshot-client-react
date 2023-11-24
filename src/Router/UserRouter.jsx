import React from 'react'
import { Routes , Route } from "react-router-dom"
import UserAuthPage from '../Pages/UserPages/UserAuthPage'
import UserHomePage from '../Pages/UserPages/UserHomePage'
import UserProfile from '../Pages/UserPages/UserProfilePage'


function UserRouter() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<UserAuthPage form={"login"} />}/>
        <Route path='/signup' element={<UserAuthPage/>}/>
        <Route path="/" element={<UserHomePage/>}/>
        <Route path="/profile" element={<UserProfile/>}/>
      </Routes>
    </div>
  )
}

export default UserRouter
