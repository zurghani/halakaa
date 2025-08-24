import { Hono } from "hono";
import * as classesController from "./controller";
import { requireRoles } from "@/middleware/requireRole";

/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/
const classes = new Hono()
  .get("/", requireRoles({ classes: ["view"] }), classesController.getAll)
  .get("/:id", requireRoles({ classes: ["view"] }), classesController.getById)
  .post("/", requireRoles({ classes: ["create"] }), classesController.create)
  .put("/:id", requireRoles({ classes: ["update"] }), classesController.update)
  .delete("/:id", requireRoles({ classes: ["delete"] }), classesController.remove);

export default classes;
