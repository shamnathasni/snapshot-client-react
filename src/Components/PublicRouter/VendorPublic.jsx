import React from 'react'
import { Navigate } from 'react-router-dom'

function VendorPublic(props) {
    try {
        const token =  localStorage.getItem('token')
        if(token){
          return <Navigate to="/"/>
        }else{
          <Navigate to="/Login"/>
          return props.children
        }
      } catch (error) {
        console.log(error.message)
      }
}

export default VendorPublic
