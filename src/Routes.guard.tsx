import React from "react";
import { useSelector } from "react-redux";
import { AppStore } from "./store";
import { Navigate, Outlet } from "react-router-dom";

const RoutesGuard: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: AppStore) => state.auth.isAuthenticated
  );
  console.log("RoutesGuard", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default RoutesGuard;
