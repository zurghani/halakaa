import { Hono } from "hono";
import { requireRoles } from "@/middleware/requireRole";
import * as studentsService from "./service";
import type { AuthType } from "@/types";
import { validator } from "hono/validator";

/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/
const students = new Hono<{ Variables: AuthType }>()
  .get("/", requireRoles({ students: ["view"] }), async (c) => {
    const parentId = c.req.query("parent_id");
    const classId = Number(c.req.query("class_id")) || undefined;

    if (parentId || classId) {
      const students = await studentsService.getStudentByFilters({ parentId, classId });
      return c.json(students || []);
    }

    const students = await studentsService.getAllStudents();
    return c.json(students || []);
  })

  .get("/:id", requireRoles({ students: ["view"] }), async (c) => {
    const id = c.req.param("id");
    const student = await studentsService.getStudentById(parseInt(id));

    if (!student) {
      return c.json({ error: "Student not found" }, 404);
    }

    return c.json(student);
  })

  .post("/", requireRoles({ students: ["create"] }), async (c) => {
    const body = await c.req.json();
    const result = await studentsService.createStudent(body);
    return c.json(result, 201);
  })

  .put(
    "/:id",
    validator("json", (value) => value as studentsService.UpdateStudent),
    requireRoles({ students: ["update"] }),
    async (c) => {
      const id = c.req.param("id");
      const body = await c.req.json();

      const existingStudent = await studentsService.getStudentById(parseInt(id));
      if (!existingStudent) {
        return c.json({ error: "Student not found" }, 404);
      }

      const updatedStudent = await studentsService.updateStudent(parseInt(id), body);
      return c.json(updatedStudent);
    }
  )

  .delete("/:id", requireRoles({ students: ["delete"] }), async (c) => {
    const id = c.req.param("id");

    const existingStudent = await studentsService.getStudentById(parseInt(id));
    if (!existingStudent) {
      return c.json({ error: "Student not found" }, 404);
    }

    await studentsService.deleteStudent(parseInt(id));
    return c.json({
      message: `Student ${id} deleted successfully`,
    });
  });

export default students;
