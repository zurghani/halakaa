import { Hono } from "hono";
import * as studentsController from "./controller";

const students = new Hono();

students.get("/", studentsController.listStudents); // GET /book
students.post("/", studentsController.createStudent); // POST /book

// book.get("/:id", studentsController.getStudent); // GET /book/:id

export default students;
