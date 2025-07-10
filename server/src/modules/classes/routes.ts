import { Hono } from "hono";
import * as classesController from "./controller";

const classes = new Hono();

classes.get("/", classesController.listClasses); // GET /book
// book.get("/:id", studentsController.getStudent); // GET /book/:id
// book.post("/", studentsController.createStudent); // POST /book

export default classes;
