import { Hono } from "hono";
import * as classesController from "./controller";
import { requireRoles } from "@/middleware/requireRole";

const classes = new Hono();
/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/
classes.get("/", requireRoles(["admin", "teacher"]), classesController.getAll);
classes.get("/:id", requireRoles(["admin", "teacher"]), classesController.getById);
classes.post("/", requireRoles(["admin"]), classesController.create);
classes.put("/:id", requireRoles(["admin"]), classesController.update);
classes.delete("/:id", requireRoles(["admin"]), classesController.remove);

export default classes;
