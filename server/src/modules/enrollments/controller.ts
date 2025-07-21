import type { Handler } from "hono";
import * as enrollmentsService from "./service";

export const create: Handler = async (c) => {
    const body = await c.req.json();
    const result = await enrollmentsService.createEnrollment(body);
    return c.json(result, 201);
};

export const getAll: Handler = async (c) => {
    const classId = Number(c.req.query("class_id"));
    const studentId = Number(c.req.query("student_id"));
    let data: enrollmentsService.Enrollment[] = [];
    if (classId) {
        data = await enrollmentsService.getEnrolledStudentsByClassId(classId);
    } else if (studentId) {
        data = await enrollmentsService.getEnrolledClassesByStudentId(studentId);
    }

    return c.json(data);
};

export const remove: Handler = async (c) => {
    const id = c.req.param("id");
    await enrollmentsService.deleteEnrollment(parseInt(id));
    return c.json({
        message: `Enrollment ${c.req.param("id")} deleted successfully`,
    });
};
