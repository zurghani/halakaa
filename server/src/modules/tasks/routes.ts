import { Hono } from "hono";
import * as tasksController from "./controller";
import { requireRoles } from "@/middleware/requireRole";

/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/
const tasks = new Hono()
  .get("/", requireRoles({ tasks: ["view"] }), tasksController.getAll)
  .get("/:id", requireRoles({ tasks: ["view"] }), tasksController.getById)
  .post("/", requireRoles({ tasks: ["create"] }), tasksController.create)
  .put("/:id", requireRoles({ tasks: ["update"] }), tasksController.update)
  .delete("/:id", requireRoles({ tasks: ["delete"] }), tasksController.remove);

export default tasks;
