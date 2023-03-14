import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // ---user key for authentication-------
  const userKey = localStorage.getItem("userToken");

  if (userKey) {
    return children;
  } else {
    alert("You have to login in first to upload file....");
  }

  return <Navigate to="/user/login" />;
};

export default PrivateRoute;
