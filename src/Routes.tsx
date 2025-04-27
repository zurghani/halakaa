import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./pages/error/NotFound";
import ServerError from "./pages/error/ServerError";
import UnknownError from "./pages/error/UnknownError";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/login/Login";
import RoutesGuard from "./Routes.guard";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RoutesGuard />}>
          <Route element={<MainLayout />}>
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
