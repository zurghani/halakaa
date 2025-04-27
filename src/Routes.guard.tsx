import React from "react";
import { useSelector } from "react-redux";
import { AppStore } from "./store";
import { Outlet, useNavigate } from "react-router-dom";

const RoutesGuard: React.FC = () => {
  const navigate = useNavigate();

  const isAuthenticated = useSelector(
    (state: AppStore) => state.auth.isAuthenticated
  );
  if (!isAuthenticated) {
    navigate("/login");
  }
  return <Outlet />;
};

export default RoutesGuard;
