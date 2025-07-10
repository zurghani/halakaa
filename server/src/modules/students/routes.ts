import { Hono } from "hono";
import * as studentsController from "./controller";

const students = new Hono();

students.get("/", studentsController.listStudents); // GET /book
// book.get("/:id", studentsController.getStudent); // GET /book/:id
// book.post("/", studentsController.createStudent); // POST /book

export default students;
