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
enrollments.get("/", enrollmentsController.getAll);
enrollments.post("/", enrollmentsController.create);
enrollments.delete("/:id", enrollmentsController.remove);

export default enrollments;
