import React from 'react'
import { Navigate } from 'react-router-dom'

function VendorProtector(props) {
    const token = localStorage.getItem("token")
    if (token) {
       return props.children
    } else {
       return < Navigate to="/vendor/login" />
    }
}

export default VendorProtector
