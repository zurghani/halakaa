import * as studentsService from "./service";
import type { Handler } from "hono";

export const createStudent: Handler = async (c) => {
    const body = await c.req.json();
    const result = await studentsService.createStudent(body);
    return c.json(result, 201);
};
export const listStudents: Handler = async (c) => {
    const students = await studentsService.getAllStudents();
    return c.json(students);
};
export const getStudent: Handler = async (c) => {
    const id = c.req.param("id");
    const student = await studentsService.getStudentById(parseInt(id));
    return c.json(student);
};
