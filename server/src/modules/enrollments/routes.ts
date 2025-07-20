import { Hono } from "hono";
import * as enrollmentsController from "./controller";
import { requireRoles } from "@/middleware/requireRole";

const enrollments = new Hono();
/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/
enrollments.get("/", requireRoles(["admin", "teacher"]), enrollmentsController.getAll);
enrollments.post("/", requireRoles(["admin"]), enrollmentsController.create);
enrollments.delete("/:id", requireRoles(["admin"]), enrollmentsController.remove);

export default enrollments;
