import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminAuthPage from '../Pages/AdminPages/AdminAuthPage'
import AdminDashboard from '../Pages/AdminPages/AdminDashboard'
import AdminUserList from '../Pages/AdminPages/AdminUserList'

function AdminRouter() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<AdminAuthPage/>}/>
        <Route path='/dashboard' element={<AdminDashboard/>}/>
        <Route path='/userlist' element={<AdminUserList/>}/>
      </Routes>
    </div>
  )
}

export default AdminRouter
