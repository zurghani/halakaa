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
    const teacherId = c.req.query("teacher_id");
    const studentId = c.req.query("student_id");
    let classes: any[] = [];

    // If student_id is provided, fetch classes for that student
    if (studentId) {
      classes = await classesService.getClassByFilters({ studentId: Number(studentId) });
    }
    // If teacher, fetch classes for that teacher
    else if (user?.role === "teacher") {
      classes = await classesService.getClassByFilters({ teacherId: user.id });
    }
    // If admin, fetch by teacherId if provided, else all classes
    else if (user?.role === "admin") {
      if (teacherId) {
        classes = await classesService.getClassByFilters({ teacherId: teacherId });
      } else {
        classes = await classesService.getAllClasses();
      }
    }
    // If parent and studentId is provided, fetch classes for that student
    else if (user?.role === "parent" && studentId) {
      classes = await classesService.getClassByFilters({ studentId: Number(studentId) });
    }

    return c.json(classes || []);
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
