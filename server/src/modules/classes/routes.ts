import { isParentOfStudent } from "./../students/service";
import { Hono } from "hono";
import { requireRoles } from "@/middleware/requireRole";
import * as classesService from "./service";
import type { AuthType } from "@/types";
import { validator } from "hono/validator";

/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/
const classes = new Hono<{ Variables: AuthType }>()
  .get("/", requireRoles({ classes: ["view"] }), async (c) => {
    const user = c.get("user");
    //find
    const teacherId = c.req.query("teacher_id");
    const studentId = c.req.query("student_id");

    //Search
    const classId = Number(c.req.query("class_id_like") || "") || undefined;
    const teacherName = c.req.query("teacher_name_like");

    if (user?.role === "parent" || user?.role === "student") {
      if (studentId && (await isParentOfStudent(user?.id, Number(studentId)))) {
        const classes = await classesService.getClassByFilters({ studentId: Number(studentId) });
        return c.json(classes || []);
      } else {
        return c.json({ error: "No student linked to parent" }, 400);
      }
    }

    if (teacherId || studentId) {
      const classes = await classesService.getClassByFilters({
        teacherId,
        studentId: studentId ? Number(studentId) : undefined,
      });
      return c.json(classes || []);
    }

    if (classId || teacherName) {
      const classes = await classesService.getClassbySearch({ classId, teacherName });
      return c.json(classes || []);
    }

    return c.json((await classesService.getAllClasses()) || []);
  })

  .get("/:id", requireRoles({ classes: ["view"] }), async (c) => {
    const id = c.req.param("id");
    const classData = await classesService.getClassById(parseInt(id));

    if (!classData) {
      return c.json({ error: "Class not found" }, 404);
    }

    return c.json(classData);
  })

  .post("/", requireRoles({ classes: ["create"] }), async (c) => {
    const body = await c.req.json();
    const result = await classesService.createClass(body);
    return c.json(result, 201);
  })

  .put(
    "/:id",
    validator("json", (value) => value as classesService.UpdateClass),
    requireRoles({ classes: ["update"] }),
    async (c) => {
      const id = c.req.param("id");
      const body = await c.req.json();

      const existingClass = await classesService.getClassById(parseInt(id));
      if (!existingClass) {
        return c.json({ error: "Class not found" }, 404);
      }

      const updatedClass = await classesService.updateClass(parseInt(id), body);
      return c.json(updatedClass);
    }
  )

  .delete("/:id", requireRoles({ classes: ["delete"] }), async (c) => {
    const id = c.req.param("id");

    const existingClass = await classesService.getClassById(parseInt(id));
    if (!existingClass) {
      return c.json({ error: "Class not found" }, 404);
    }

    await classesService.deleteClass(parseInt(id));
    return c.json({
      message: `Class ${id} deleted successfully`,
    });
  });

export default classes;
