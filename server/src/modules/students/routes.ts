import { Hono } from "hono";
import * as studentsController from "./controller";
import { requireRoles } from "@/middleware/requireRole";

/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/
const students = new Hono()
  .get("/", requireRoles({ students: ["view"] }), studentsController.getAll)
  .get("/:id", requireRoles({ students: ["view"] }), studentsController.getById)
  .post("/", requireRoles({ students: ["create"] }), studentsController.create)
  .put("/:id", requireRoles({ students: ["update"] }), studentsController.update)
  .delete("/:id", requireRoles({ students: ["delete"] }), studentsController.remove);

export default students;
