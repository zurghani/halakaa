import type { Handler } from "hono";
import type { Role } from "@/types";
import * as enrollmentsService from "./service"
import enrollments from "./routes";
import type { Student } from "../students/service";
import type { Class } from "../classes/service";



export const create: Handler = async (c) => {
    const body = await c.req.json();
    const result = await enrollmentsService.createEnrollment(body);
    return c.json(result, 201);
}

export const getAll: Handler = async (c) => {
    const classId = Number(c.req.query("class_id"));
    const studentId = Number(c.req.query("student_id"));
    
    let data: Student[] | Class[] = []
    if (classId) {
        data = await enrollmentsService.getEnrollmentsByFilters({ classId })
    } else if (studentId) {
        data = await enrollmentsService.getEnrollmentsByFilters({ studentId })
    }

    return c.json(enrollments)


}

export const remove: Handler = async (c) => {
    const id = c.req.param("id");
    await enrollmentsService.deleteEnrollment(parseInt(id));
    return c.json({
        message: `Enrollment ${c.req.param("id")} deleted successfully`,
    });
};