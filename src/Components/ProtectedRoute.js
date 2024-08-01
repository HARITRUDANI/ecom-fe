import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuth = localStorage.getItem("userData");
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
