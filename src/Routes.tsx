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
import ParentGuard from "./guard/ParentGuard";
import ParentHome from "./pages/parent/ParentHome";
import PageLayout from "./layouts/PageLayout/PageLayout";
import FindStudent from "./pages/student/Find.student";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path={Paths.AUTH.LOGIN} element={<Login />} />
        <Route element={<AuthenticationGuard />}>
          {/* Other Authenticated Routes */}
          <Route element={<MainLayout />}>
            <Route element={<PageLayout title="Find Student" />}>
              <Route path={Paths.STUDENT.FIND} element={<FindStudent />} />
            </Route>
            <Route element={<ParentGuard />}>
              <Route path={Paths.PARENT.ROOT} element={<ParentHome />} />
            </Route>
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
  PARENT: {
    ROOT: "/parent",
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
