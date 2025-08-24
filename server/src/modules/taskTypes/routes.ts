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
taskTypes.get("/", taskTypesController.getAll);
taskTypes.get("/:id", taskTypesController.getById);
taskTypes.post("/",  taskTypesController.create);
taskTypes.delete("/:id", taskTypesController.remove);

export default taskTypes;