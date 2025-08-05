import { Hono } from "hono";
import "dotenv/config";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import students from "./modules/students/routes";
import classes from "./modules/classes/routes";
import enrollments from "./modules/enrollments/routes";
import attendances from "./modules/attendances/routes";
import tasks from "./modules/tasks/routes";
import taskTypes from "./modules/taskTypes/routes";
import ayahs from "./modules/ayahs/routes";
import surahs from "./modules/surahs/routes";
import ageGroups from "./modules/ageGroups/routes";
import type { AuthType } from "./types";
import { authRoutes } from "./modules/auth";

const app = new Hono<{ Variables: AuthType }>()
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
  .route("/auth", authRoutes)
  .route("/students", students)
  .route("/classes", classes)
  .route("/enrollments", enrollments)
  .route("/attendances", attendances)
  .route("/tasks", tasks)
  .route("/task-types", taskTypes)
  .route("/ayahs", ayahs)
  .route("/surahs", surahs)
  .route("/age-groups", ageGroups);

export type AppType = typeof app;

export default {
  port: 4000,
  fetch: app.fetch,
};
