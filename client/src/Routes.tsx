// npm packages
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
// storeimport { AppStore } from "./store";
import { UserRole } from "./store/types";
import { ErrorHandlerProvider } from "./components/ErrorHandlerProvider";
// pages
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import ParentHome from "./pages/parent/ParentHome";
import FindStudent from "./pages/student/find/Find.student";
import ClassView from "./pages/class/View.class";
import UnknownError from "./pages/error/UnknownError";
import ServerError from "./pages/error/ServerError";
import NotFound from "./pages/error/NotFound";
import ViewClasses from "./pages/teacher/teacher.classes";
import ViewStudents from "./pages/teacher/teacher.students";
import FindClass from "./pages/class/find/Find.class";
import ViewStudent from "./pages/student/student.view";
import RunningClass from "./pages/class/Running.class";
import StudentCreatePage from "./pages/student/Student.create";
import StudentEditPage from "./pages/student/Student.edit";
import UserCreatePage from "./pages/user/User.create";
import UserEditPage from "./pages/user/User.edit";
import UserViewPage from "./pages/user/User.view";
import UserFindPage from "./pages/user/User.find";
import TaskTypesEditPage from "./pages/settings/TaskTypes/TaskTypes.edit";
import TaskTypesViewPage from "./pages/settings/TaskTypes/TaskTypes.view";
import ClassCreatePage from "./pages/class/Class.create";
import ClassEditPage from "./pages/class/Class.edit";
import EnrollmentsEditPage from "./pages/class/Enrollments.edit";
import AgeGroupEditPage from "./pages/settings/AgeGroup/AgeGroup.edit";
import AgeGroupViewPage from "./pages/settings/AgeGroup/AgeGroup.view";

// layouts
import MainLayout from "./layouts/MainLayout";
import PageLayout from "./layouts/PageLayout/PageLayout";
// guards
import AuthenticationGuard from "./guard/AuthenticationGuard";
import ParentGuard from "./guard/ParentGuard";
import { authClient } from "./lib/auth-client";

const AppRoutes = () => {
    return (
        <Router>
            <ErrorHandlerProvider>
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
                                <Route
                                    path={Paths.STUDENT.CREATE}
                                    element={<StudentCreatePage />}
                                />
                                <Route path={Paths.STUDENT.EDIT} element={<StudentEditPage />} />
                                <Route path={Paths.STUDENT.VIEW} element={<ViewStudent />} />
                                <Route path={Paths.STUDENT.FIND} element={<FindStudent />} />

                                <Route path={Paths.CLASS.CREATE} element={<ClassCreatePage />} />
                                <Route path={Paths.CLASS.EDIT} element={<ClassEditPage />} />
                                <Route path={Paths.CLASS.VIEW} element={<ClassView />} />
                                <Route path={Paths.CLASS.FIND} element={<FindClass />} />
                                <Route path={Paths.CLASS.RUNNING} element={<RunningClass />} />
                                <Route
                                    path={Paths.CLASS.ENROLLMENTS}
                                    element={<EnrollmentsEditPage />}
                                />

                                <Route path={Paths.TEACHER.CLASSES} element={<ViewClasses />} />
                                <Route path={Paths.TEACHER.STUDENTS} element={<ViewStudents />} />

                                <Route path={Paths.USER.CREATE} element={<UserCreatePage />} />
                                <Route path={Paths.USER.FIND} element={<UserFindPage />} />
                                <Route path={Paths.USER.VIEW} element={<UserViewPage />} />
                                <Route path={Paths.USER.EDIT} element={<UserEditPage />} />

                                <Route
                                    path={Paths.SETTINGS.ADMIN.TASKTYPES.EDIT}
                                    element={<TaskTypesEditPage />}
                                />
                                <Route
                                    path={Paths.SETTINGS.ADMIN.TASKTYPES.VIEW}
                                    element={<TaskTypesViewPage />}
                                />
                                <Route
                                    path={Paths.SETTINGS.ADMIN.AGEGROUP.EDIT}
                                    element={<AgeGroupEditPage />}
                                />
                                <Route
                                    path={Paths.SETTINGS.ADMIN.AGEGROUP.VIEW}
                                    element={<AgeGroupViewPage />}
                                />
                            </Route>
                        </Route>
                    </Route>
                    <Route path={Paths.ERROR.SERVER} element={<ServerError />} />
                    <Route path={Paths.ERROR.UNKNOWN} element={<UnknownError />} />
                    <Route path={Paths.ERROR.NOT_FOUND} element={<NotFound />} />
                </Routes>
            </ErrorHandlerProvider>
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
        EDIT: "/student/edit/:id",
        FIND: "/student/find",
    },
    TEACHER: {
        ROOT: "/teacher",
        CREATE: "/teacher/create",
        FIND: "/teacher/find",
        CLASSES: "/teacher/classes",
        STUDENTS: "/teacher/students",
    },
    PARENT: {
        ROOT: "/parent",
    },
    CLASS: {
        ROOT: "/class",
        VIEW: "/class/:id", //: "classId"
        CLASSROOM: "/classroom",
        CREATE: "/class/create",
        EDIT: "/class/edit/:id",
        ENROLLMENTS: "/class/edit-enrollments/:id",
        FIND: "/class/find",
        RUNNING: "/class/running",
    },
    USER: {
        ROOT: "/user",
        CREATE: "/user/create",
        FIND: "/user/find",
        VIEW: "/user/:id",
        EDIT: "/user/edit/:id",
    },
    SETTINGS: {
        ADMIN: {
            TASKTYPES: {
                VIEW: "/settings/task-types/view",
                EDIT: "/settings/task-types/edit",
            },
            AGEGROUP: {
                VIEW: "/settings/age-groups/view",
                EDIT: "/settings/age-groups/edit",
            },
        },
    },
};

const HomeRedirect = () => {
    const { data } = authClient.useSession();
    // temp since no admin routes
    const userRole = data?.user.role === "student" ? "parent" : data?.user.role;

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
    }, [data, navigate]);

    return <div>Redirecting to Home...</div>;
};
