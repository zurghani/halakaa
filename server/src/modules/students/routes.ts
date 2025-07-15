import { Hono } from "hono";
import * as studentsController from "./controller";

const students = new Hono();

/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/

students.get("/", studentsController.getAll);
students.get("/:id", studentsController.getById);
students.post("/", studentsController.create);
students.put("/:id", studentsController.update);
students.delete("/:id", studentsController.remove);

export default students;
