import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Paths } from "../Routes";
import { UserRole } from "../types";
import { authClient } from "../lib/auth-client";

const ParentGuard: React.FC = () => {
    const { data, isPending } = authClient.useSession();

    if (isPending) return null;

    if (data?.user.role !== UserRole.Parent) {
        return <Navigate to={Paths.HOME.ROOT} />;
    }
    return <Outlet />;
};

export default ParentGuard;
