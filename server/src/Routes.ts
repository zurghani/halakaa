import classes from "./modules/classes/routes";
import enrollments from "./modules/enrollments/routes";
import students from "./modules/students/routes";
import attendances from "./modules/attendances/routes";
import roles from "./modules/roles/routes"
import taskTypes from "./modules/taskTypes/routes";

const routes = [
    { route: "/students", handler: students },
    { route: "/classes", handler: classes },
    { route: "/enrollments", handler: enrollments },
    { route: "/attendances", handler: attendances },
    { route: "/roles", handler: roles },
    { route: "/task-types", handler: taskTypes },
];

export default routes;
