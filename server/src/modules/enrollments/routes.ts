import { Hono } from "hono";
import { requireRoles } from "@/middleware/requireRole";
import * as enrollmentsService from "./service";
import type { AuthType } from "@/types";

/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/
const enrollments = new Hono<{ Variables: AuthType }>()
  .get("/", requireRoles({ enrollments: ["view"] }), async (c) => {
    const classId = Number(c.req.query("class_id"));
    const studentId = Number(c.req.query("student_id"));
    let data: enrollmentsService.EnrollmentWithStudent[] | enrollmentsService.Enrollment[] = [];

    if (classId) {
      data = await enrollmentsService.getEnrolledStudentsByClassId(classId);
    } else if (studentId) {
      data = await enrollmentsService.getEnrolledClassesByStudentId(studentId);
    }

    return c.json(data || []);
  })
  .post("/", requireRoles({ enrollments: ["create"] }), async (c) => {
    const body = await c.req.json();
    const result = await enrollmentsService.createEnrollment(body);
    return c.json(result, 201);
  })
  .delete("/:id", requireRoles({ enrollments: ["delete"] }), async (c) => {
    const id = c.req.param("id");

    await enrollmentsService.deleteEnrollment(parseInt(id));
    return c.json({
      message: `Enrollment ${id} deleted successfully`,
    });
  });

export default enrollments;
