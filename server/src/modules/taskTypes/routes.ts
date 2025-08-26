import { Hono } from "hono";
import * as taskTypesController from "./controller";
import { requireRoles } from "@/middleware/requireRole";

/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/
const taskTypes = new Hono()
  .get("/", requireRoles({ taskTypes: ["view"] }), taskTypesController.getAll)
  .get("/:id", requireRoles({ taskTypes: ["view"] }), taskTypesController.getById)
  .post("/", requireRoles({ taskTypes: ["create"] }), taskTypesController.create)
  .delete("/:id", requireRoles({ taskTypes: ["delete"] }), taskTypesController.remove);

export default taskTypes;
