import { Hono } from "hono";
import * as studentsController from "./controller";

const students = new Hono();

students.get("/", studentsController.listStudents);
students.get("/:id", studentsController.getStudent);
students.post("/", studentsController.createStudent);

export default students;
