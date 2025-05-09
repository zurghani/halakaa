// npm packages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// components
import UnknownError from "./pages/error/UnknownError";
import ServerError from "./pages/error/ServerError";
import NotFound from "./pages/error/NotFound";
import Login from "./pages/login/Login";
import MainLayout from "./layouts/MainLayout";
// guards
import AuthenticationGuard from "./guard/AuthenticationGuard";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AuthenticationGuard />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<div>Home</div>} />
            <Route path="/home" element={<div>Home</div>} />
          </Route>
        </Route>
        <Route path="/500" element={<ServerError />} />
        <Route path="/error" element={<UnknownError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
