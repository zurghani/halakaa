import classes from "./modules/classes/routes";
import students from "./modules/students/routes";

const resources = [
    { route: "/students", handler: students },
    { route: "/classes", handler: classes }, // Assuming classes routes are similar to students
];

export default resources;
