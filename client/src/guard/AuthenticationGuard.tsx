import React from "react";
// import { useSelector } from "react-redux";
// import { AppStore } from "../store";
import { Navigate, Outlet } from "react-router-dom";
import { Paths } from "../Routes";
import { authClient } from "../lib/auth-client";

const AuthenticationGuard: React.FC = () => {
    const {data, isPending} = authClient.useSession()
    // console.log("RoutesGuard", isAuthenticated);
    if (isPending) return null

    if (!data?.session) {
        return <Navigate to={Paths.AUTH.LOGIN} />;
    }
    return <Outlet />;
};

export default AuthenticationGuard;
