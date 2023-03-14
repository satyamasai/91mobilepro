import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./Home";

import UserPrivateRoute from "./PrivateRoutes/PrivateRoute";
// import UserDashboard from "./User/UserDashboard";
import UserSignup from "./User/UserSignup";
import UserLogin from "./User/UserLogin";
import Upload from "./Upload";
import UserDashboard from "./User/UserDashboard";
import PrivateRoute from "./PrivateRoutes/PrivateRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/signup" element={<UserSignup />} />
      <Route path="/user/login" element={<UserLogin />} />
      <Route
        path="/upload"
        element={
          <PrivateRoute>
            <Upload />
          </PrivateRoute>
        }
      />

      <Route
        path="/user/dashboard"
        element={
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
