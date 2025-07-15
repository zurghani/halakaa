import { Hono } from "hono";
import * as classesController from "./controller";
import { requireRoles } from "@/middleware/requireRole";

const classes = new Hono();
//example of role based access control
classes.get("/", requireRoles(["admin", "teacher"]), classesController.getAll);

export default classes;
