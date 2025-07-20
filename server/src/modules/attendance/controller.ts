import type { Handler } from "hono";
import type { Role } from "@/types";
import * as attendanceService from "./service";


export const create: Handler = async (c) => {
    const body = await c.req.json();
    const result = await attendanceService.createAttendance(body);
    return c.json(result, 201);
};

export const getAll: Handler = async (c) => {
    const user = c.get("user") as { id: string; roles: Role[] };
    const classId = Number(c.req.query("class_id")) || undefined;
    const studentId = Number(c.req.query("student_id")) || undefined;

    let attendance: attendanceService.Attendance[] = []

    if (!classId && !studentId) {
        return c.json ({ error: "You must provide a class_id or student_id" }, 400)
    }

    attendance = await attendanceService.getAttendanceByFilters({ classId, studentId })
};




export const update: Handler = async (c) => {
    const id = c.req.param("id");
    const body = await c.req.json();
    const updatedAttendance = await attendanceService.updateAttendance(parseInt(id), body);
    return c.json(updatedAttendance);
};
export const remove: Handler = async (c) => {
    const id = c.req.param("id");
    await attendanceService.deleteAttendance(parseInt(id));
    return c.json({
        message: `Attendance ${c.req.param("id")} deleted successfully`,
    });
};