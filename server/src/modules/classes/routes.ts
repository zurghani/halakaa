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
classes.get("/",  classesController.getAll);
classes.get("/:id",  classesController.getById);
classes.post("/", classesController.create);
classes.put("/:id", classesController.update);
classes.delete("/:id",  classesController.remove);

export default classes;
