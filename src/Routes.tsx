import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./errors/NotFound";
import ServerError from "./errors/ServerError";
import UnknownError from "./errors/UnknownError";
import MainLayout from "./layouts/MainLayout";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/home" element={<div>Home</div>} />
        </Route>
        <Route path="/500" element={<ServerError />} />
        <Route path="/error" element={<UnknownError />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
