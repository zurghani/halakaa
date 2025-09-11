import { Hono } from "hono";
import { requireRoles } from "@/middleware/requireRole";
import * as attendanceService from "./service";
import type { AuthType } from "@/types";
import { validator } from "hono/validator";

const attendances = new Hono<{ Variables: AuthType }>()
  .get("/", requireRoles({ attendances: ["view"] }), async (c) => {
    const classId = Number(c.req.query("class_id")) || undefined;
    const studentId = Number(c.req.query("student_id")) || undefined;
    const date = c.req.query("date") || undefined;

    if (!classId && !studentId && !date) {
      return c.json({ error: "You must provide a class_id or student_id or date" }, 400);
    }

    const attendance = await attendanceService.getAttendanceByFilters({ classId, studentId, date });
    return c.json(attendance || []);
  })

  .post("/", requireRoles({ attendances: ["create"] }), async (c) => {
    const body = await c.req.json();
    const result = await attendanceService.createAttendance(body);
    return c.json(result, 201);
  })

  .put(
    "/:id",
    validator("json", (value) => value as attendanceService.UpdateAttendance),
    requireRoles({ attendances: ["update"] }),
    async (c) => {
      const id = c.req.param("id");
      const body = await c.req.json();
      const result = await attendanceService.updateAttendance(parseInt(id), body);
      return c.json(result);
    }
  )

  .delete("/:id", requireRoles({ attendances: ["delete"] }), async (c) => {
    const id = c.req.param("id");

    await attendanceService.deleteAttendance(parseInt(id));
    return c.json({
      message: `Attendance ${id} deleted successfully`,
    });
  });
export default attendances;
