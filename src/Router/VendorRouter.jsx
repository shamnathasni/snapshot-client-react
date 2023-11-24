import React from 'react'
import { Route, Routes } from 'react-router-dom'
import VendorAuthPage from '../Pages/VendorPages/VendorAuthPage'
import VendorProfilePage from '../Pages/VendorPages/VendorProfilePage'


function VendorRouter() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<VendorAuthPage form={"login"}/>}/>
        <Route path='/signup' element={<VendorAuthPage/>} />
        <Route path='/profile' element={<VendorProfilePage/>}/>
      </Routes>
    </div>
  )
}

export default VendorRouter
