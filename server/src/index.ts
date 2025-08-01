import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import students from "./modules/students/routes";
import classes from "./modules/classes/routes";
import enrollments from "./modules/enrollments/routes";
import attendances from "./modules/attendances/routes";
import userRoles from "./modules/userRoles/routes";
import roles from "./modules/roles/routes";
import tasks from "./modules/tasks/routes";
import taskTypes from "./modules/taskTypes/routes";
import ayahs from "./modules/ayahs/routes";
import surahs from "./modules/surahs/routes";
import ageGroups from "./modules/ageGroups/routes";
import users from "./modules/users/routes";

const app = new Hono()
  .use(
    cors({
      origin: "http://localhost:3000",
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    })
  )
  .use(logger())
  .get("/", (c) => {
    return c.json({
      health: "OK",
      messasge: "Halkah v1 API",
    });
  })
  .route("/students", students)
  .route("/classes", classes)
  .route("/enrollments", enrollments)
  .route("/attendances", attendances)
  .route("/user-roles", userRoles)
  .route("/roles", roles)
  .route("/tasks", tasks)
  .route("/task-types", taskTypes)
  .route("/ayahs", ayahs)
  .route("/surahs", surahs)
  .route("/age-groups", ageGroups)
  .route("/users", users);

export type AppType = typeof app;

serve(
  {
    fetch: app.fetch,
    port: 4000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
