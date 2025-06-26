// npm packages
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
// store
import { AppStore } from "./store";
import { UserRole } from "./store/types";
// components
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import ParentHome from "./pages/parent/ParentHome";
import FindStudent from "./pages/student/find/Find.student";
import ClassView from "./pages/class/View.class";
import UnknownError from "./pages/error/UnknownError";
import ServerError from "./pages/error/ServerError";
import NotFound from "./pages/error/NotFound";
// layouts
import MainLayout from "./layouts/MainLayout";
import PageLayout from "./layouts/PageLayout/PageLayout";
// guards
import AuthenticationGuard from "./guard/AuthenticationGuard";
import ParentGuard from "./guard/ParentGuard";
import FindClass from "./pages/class/find/Find.class";
import ViewStudent from "./pages/student/View.student";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path={Paths.AUTH.LOGIN} element={<Login />} />
        <Route element={<AuthenticationGuard />}>
          {/* Other Authenticated Routes */}
          <Route element={<MainLayout />}>
            <Route path={Paths.HOME.ROOT} element={<HomeRedirect />} />
            <Route path={Paths.HOME.MAIN} element={<HomeRedirect />} />

            <Route path={Paths.HOME.ADMIN} element={<Home />} />
            <Route path={Paths.HOME.TEACHER} element={<Home />} />

            <Route element={<ParentGuard />}>
              <Route path={Paths.HOME.PARENT} element={<ParentHome />} />
            </Route>

            <Route element={<PageLayout />}>
              <Route path={Paths.STUDENT.VIEW} element={<ViewStudent />} />
              <Route path={Paths.STUDENT.FIND} element={<FindStudent />} />

              <Route path={Paths.CLASS.VIEW} element={<ClassView />} />
              <Route path={Paths.CLASS.FIND} element={<FindClass />} />
            </Route>
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
    TEACHER: "/home/teacher",
    STUDENT: "/home/student",
    PARENT: "/home/parent",
    ADMIN: "/home/admin",
  },
  ERROR: {
    UNKNOWN: "/error",
    SERVER: "/500",
    NOT_FOUND: "*",
  },
  DASHBOARD: "/dashboard",
  STUDENT: {
    ROOT: "/student",
    VIEW: "/student/:id",
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
    VIEW: "/class/view", //: "classId"
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

const HomeRedirect = () => {
  const userRole = useSelector((state: AppStore) => state.user.role);
  const navigate = useNavigate();

  useEffect(() => {
    let targetRoute = Paths.HOME.MAIN;
    if (userRole === UserRole.Teacher) {
      targetRoute = Paths.HOME.TEACHER;
    } else if (userRole === UserRole.Parent) {
      targetRoute = Paths.HOME.PARENT;
    } else if (userRole === UserRole.Admin) {
      targetRoute = Paths.HOME.ADMIN;
    }
    navigate(targetRoute, { replace: true });
  }, [userRole, navigate]);

  return <div>Redirecting to Home...</div>;
};
