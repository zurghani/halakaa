import { Hono } from "hono";
import * as enrollmentsController from "./controller";
import { requireRoles } from "@/middleware/requireRole";

/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/
const enrollments = new Hono()
  .get("/", requireRoles({ enrollments: ["view"] }), enrollmentsController.getAll)
  .post("/", requireRoles({ enrollments: ["create"] }), enrollmentsController.create)
  .delete("/:id", requireRoles({ enrollments: ["delete"] }), enrollmentsController.remove);

export default enrollments;
