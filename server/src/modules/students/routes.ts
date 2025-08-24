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
students.get("/:id", studentsController.getById); //Read by ID
students.post("/", studentsController.create); //Create Student
students.put("/:id", studentsController.update); //Update Student
students.delete("/:id", studentsController.remove); //Delete Student

export default students;
