import React from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../store";
import { Navigate, Outlet } from "react-router-dom";
import { Paths } from "../Routes";
import { UserRole } from "../store/types";

const ParentGuard: React.FC = () => {
  const userRole = useSelector((state: AppStore) => state.user.role);

  if (userRole !== UserRole.Parent) {
    return <Navigate to={Paths.HOME.ROOT} />;
  }
  return <Outlet />;
};

export default ParentGuard;
