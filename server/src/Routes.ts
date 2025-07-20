import classes from "./modules/classes/routes";
import students from "./modules/students/routes";
import attendances from "./modules/attendances/routes";

const routes = [
    { route: "/students", handler: students },
    { route: "/classes", handler: classes },
    { route: "/attendances", handler: attendances },
];

export default routes;
