import * as studentsService from "./service";
import type { Handler } from "hono";

export const create: Handler = async (c) => {
    const body = await c.req.json();
    const result = await studentsService.createStudent(body);
    return c.json(result, 201);
};
export const getAll: Handler = async (c) => {
    const students = await studentsService.getAllStudents();
    return c.json(students);
};
export const getById: Handler = async (c) => {
    const id = c.req.param("id");
    const student = await studentsService.getStudentById(parseInt(id));
    return c.json(student);
};
export const update: Handler = async (c) => {
    const id = c.req.param("id");
    const body = await c.req.json();
    const updatedStudent = await studentsService.updateStudent(
        parseInt(id),
        body
    );
    return c.json(updatedStudent);
};
export const remove: Handler = async (c) => {
    const id = c.req.param("id");
    await studentsService.deleteStudent(parseInt(id));
    return c.json({
        message: `Student ${c.req.param("id")} deleted successfully`,
    });
};
