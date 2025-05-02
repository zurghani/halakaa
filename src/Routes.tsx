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
import Home from "./pages/home/Home";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path={Paths.AUTH.LOGIN} element={<Login />} />
        <Route element={<AuthenticationGuard />}>
          <Route element={<MainLayout />}>
            <Route path={Paths.HOME.ROOT} element={<Home />} />
            <Route path={Paths.HOME.MAIN} element={<Home />} />
          </Route>
        </Route>
        <Route path={Paths.ERROR.SERVER} element={<ServerError />} />
        <Route path={Paths.ERROR.UNKNOWN} element={<UnknownError />} />
        <Route path={Paths.ERROR.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;

export const Paths = {
  AUTH: {
    LOGIN: "/login",
  },
  HOME: {
    ROOT: "/",
    MAIN: "/home",
  },
  ERROR: {
    UNKNOWN: "/error",
    SERVER: "/500",
    NOT_FOUND: "*",
  },
  DASHBOARD: "/dashboard",
  STUDENT: {
    ROOT: "/student",
    CREATE: "/student/create",
    FIND: "/student/find",
  },
  TEACHER: {
    ROOT: "/teacher",
    CREATE: "/teacher/create",
    FIND: "/teacher/find",
  },
  CLASS: {
    ROOT: "/class",
    CLASSROOM: "/classroom",
    CREATE: "/class/create",
    FIND: "/class/find",
  },
  USER: {
    ROOT: "/user",
    CREATE: "/user/create",
    FIND: "/user/find",
  },
};
