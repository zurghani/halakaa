import { Hono } from "hono";
import * as taskTypesController from "./controller";
import { requireRoles } from "@/middleware/requireRole";

const taskTypes = new Hono();
/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/
taskTypes.get("/", requireRoles(["admin", "teacher"]), taskTypesController.getAll);
taskTypes.get("/:id", requireRoles(["admin", "teacher"]), taskTypesController.getById);
taskTypes.post("/", requireRoles(["admin"]), taskTypesController.create);
taskTypes.delete("/:id", requireRoles(["admin"]), taskTypesController.remove);

export default taskTypes;