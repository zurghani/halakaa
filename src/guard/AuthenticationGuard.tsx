import React from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../store";
import { Navigate, Outlet } from "react-router-dom";
import { Paths } from "../Routes";

const AuthenticationGuard: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: AppStore) => state.auth.isAuthenticated
  );
  // console.log("RoutesGuard", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to={Paths.AUTH.LOGIN} />;
  }
  return <Outlet />;
};

export default AuthenticationGuard;
