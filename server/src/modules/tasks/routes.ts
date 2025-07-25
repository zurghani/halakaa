import { Hono } from "hono";
import * as tasksController from "./controller";
import { requireRoles } from "@/middleware/requireRole";

const tasks = new Hono();
/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/
tasks.get("/", tasksController.getAll);
tasks.get("/:id", tasksController.getById);
tasks.post("/", requireRoles(["teacher"]), tasksController.create);
tasks.put("/:id", requireRoles(["teacher"]), tasksController.update);
tasks.delete("/:id", requireRoles(["admin"]), tasksController.remove);

export default tasks;
