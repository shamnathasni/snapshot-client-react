import React from 'react'
import { Routes , Route } from "react-router-dom"
import AdminAuthPage from '../Pages/AdminPages/AdminAuthPage'
import AdminUserList from '../Pages/AdminPages/AdminUserList'
import AdminVendorList from '../Pages/AdminPages/AdminVendorList'
import AdminDashboard from '../Pages/AdminPages/AdminDashboard'
import AdminPublic from '../Components/PublicRouter/AdminPublic'
import AdminProtector from '../Components/protectorRoute/AdminProtector'

function AdminRouter() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<AdminPublic><AdminAuthPage/></AdminPublic>}/>
        <Route path="/dashboard" element={<AdminProtector><AdminDashboard/></AdminProtector>}/>
        <Route path="/userlist" element={<AdminProtector><AdminUserList/></AdminProtector>}/>
        <Route path="/vendorlist" element={<AdminProtector><AdminVendorList/></AdminProtector>}/>
      </Routes>
    </div>
  )
}

export default AdminRouter
