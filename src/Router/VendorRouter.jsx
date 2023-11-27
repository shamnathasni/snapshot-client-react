import React from 'react'
import { Route, Routes } from 'react-router-dom'
import VendorAuthPage from '../Pages/VendorPages/VendorAuthPage'
import VendorProfilePage from '../Pages/VendorPages/VendorProfilePage'
import VendorStudioPage from '../Pages/VendorPages/VendorStudioPage'
import VendorPublic from '../Components/PublicRouter/VendorPublic'
import VendorProtector from '../Components/protectorRoute/VendorProtector'


function VendorRouter() {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<VendorPublic><VendorAuthPage form={"login"}/></VendorPublic>}/>
        <Route path='/signup' element={<VendorPublic><VendorAuthPage/></VendorPublic>} />
        <Route path='/profile' element={<VendorProtector><VendorProfilePage/></VendorProtector>}/>
        <Route path='/studio' element={<VendorProtector><VendorStudioPage/></VendorProtector>}/>
      </Routes>
    </div>
  )
}

export default VendorRouter
