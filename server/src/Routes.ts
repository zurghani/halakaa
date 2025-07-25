import classes from "./modules/classes/routes";
import enrollments from "./modules/enrollments/routes";
import students from "./modules/students/routes";
import attendances from "./modules/attendances/routes";
import userRoles from "./modules/userRoles/routes";
import roles from "./modules/roles/routes";
import tasks from "./modules/tasks/routes";
import taskTypes from "./modules/taskTypes/routes";
import ayahs from "./modules/ayahs/routes";
import surahs from "./modules/surahs/routes"
import ageGroups from "./modules/ageGroups/routes";

const routes = [
    { route: "/students", handler: students },
    { route: "/classes", handler: classes },
    { route: "/enrollments", handler: enrollments },
    { route: "/attendances", handler: attendances },
    { route: "/user-roles", handler: userRoles },
    { route: "/roles", handler: roles },
    { route: "/tasks", handler: tasks },
    { route: "/task-types", handler: taskTypes },
    { route: "/ayahs", handler: ayahs },
    { route: "/surahs", handler: surahs },
    { route: "/age-groups", handler: ageGroups },
];

export default routes;
