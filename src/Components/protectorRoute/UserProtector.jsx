import React from "react";
import { Navigate } from "react-router-dom";

function UserProtector(props) {
  const token = localStorage.getItem("token");
  if (token) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
}

export default UserProtector;
