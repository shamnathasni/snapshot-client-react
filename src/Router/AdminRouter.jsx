import React from 'react'
import { Routes , Route } from "react-router-dom"
import AdminAuthPage from '../Pages/AdminPages/AdminAuthPage'
import AdminUserList from '../Pages/AdminPages/AdminUserList'
import AdminVendorList from '../Pages/AdminPages/AdminVendorList'
import AdminDashboard from '../Pages/AdminPages/AdminDashboard'
import AdminPublic from '../Components/PublicRouter/AdminPublic'
import AdminProtector from '../Components/protectorRoute/AdminProtector'
import AdminCategoryList from '../Pages/AdminPages/AdminCategoryList'
import AdminAddCategory from '../Pages/AdminPages/AdminAddCategory'
import AdminAddSubcategory from '../Pages/AdminPages/AdminAddSubcategory'
import AdminSubcategory from '../Pages/AdminPages/AdminSubcategory'

function AdminRouter() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<AdminPublic><AdminAuthPage/></AdminPublic>}/>
        <Route path="/dashboard" element={<AdminProtector><AdminDashboard/></AdminProtector>}/>
        <Route path="/userlist" element={<AdminProtector><AdminUserList/></AdminProtector>}/>
        <Route path="/vendorlist" element={<AdminProtector><AdminVendorList/></AdminProtector>}/>
        <Route path="/categorylist" element={<AdminProtector><AdminCategoryList/></AdminProtector>}/>
        <Route path="/subcategorylist" element={<AdminSubcategory/>}/>
        <Route path="/addCategory" element={<AdminAddCategory/>}/>
        <Route path="/addSubcategory" element={<AdminAddSubcategory/>}/>
      </Routes>
    </div>
  )
}

export default AdminRouter
