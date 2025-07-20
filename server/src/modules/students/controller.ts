import * as studentsService from "./service";
import type { Handler } from "hono";
import type { Role } from "@/types";

export const create: Handler = async (c) => {
    const body = await c.req.json();
    const result = await studentsService.createStudent(body);
    return c.json(result, 201);
};
export const getAll: Handler = async (c) => {
    const user = c.get("user") as { id: string; roles: Role[] };
    let parentId = c.req.query("parent_id");
    let classId = Number(c.req.query("class_id"));
    let students: studentsService.Student[] = [];

    if (user.roles.includes("parent")) {
        parentId = user.id;
        students = await studentsService.getStudentByFilters({ parentId });
    }
    if (user.roles.includes("teacher")) {
        students = await studentsService.getStudentByFilters({ classId });
    }
    if (user.roles.includes("admin")) {
        students = await studentsService.getStudentByFilters({
            classId,
            parentId,
        });
    }

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
    const updatedStudent = await studentsService.updateStudent(parseInt(id), body);
    return c.json(updatedStudent);
};
export const remove: Handler = async (c) => {
    const id = c.req.param("id");
    await studentsService.deleteStudent(parseInt(id));
    return c.json({
        message: `Student ${c.req.param("id")} deleted successfully`,
    });
};
