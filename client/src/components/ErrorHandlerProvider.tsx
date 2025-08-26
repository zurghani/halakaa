import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { errorHandler } from "../lib/error-handler";

interface ErrorHandlerProviderProps {
    children: React.ReactNode;
}

export const ErrorHandlerProvider: React.FC<ErrorHandlerProviderProps> = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        errorHandler.setNavigate(navigate);
    }, [navigate]);

    return <>{children}</>;
};