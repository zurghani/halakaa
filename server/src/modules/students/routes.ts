import { Hono } from "hono";
import * as studentsController from "./controller";
import { requireRoles } from "@/middleware/requireRole";

const students = new Hono();

/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/

students.get("/", studentsController.getAll); //Read All Students
students.get("/:id", requireRoles(["admin", "teacher"]), studentsController.getById); //Read by ID
students.post("/", requireRoles(["admin"]), studentsController.create); //Create Student
students.put("/:id", requireRoles(["admin"]), studentsController.update); //Update Student
students.delete("/:id", requireRoles(["admin"]), studentsController.remove); //Delete Student

export default students;
