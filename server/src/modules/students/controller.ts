import { requireRoles } from "@/middleware/requireRole";
import * as studentsService from "./service";
import type { Handler } from "hono";
import type { Role } from "@/types";

export const create: Handler = async (c) => {
    const body = await c.req.json();
    const result = await studentsService.createStudent(body);
    return c.json(result, 201);
};
export const getAll: Handler = async (c) => {
    const parentID = c.req.query("parent_id");
    const classID = Number(c.req.query("class_id"));
    const user = c.get("user") as { id: string; roles: Role[] }
    let students;

    const hasRole = (role: Role) => user.roles.includes(role);

    if (parentID){
        if (hasRole("admin") || hasRole("parent")) {
        students = await studentsService.getStudentsByParentID(parentID);
        } else {
            return c.json(
                {
                    message: "Forbidden: Requires one of roles: Admin, Parent",
                },
                403
            );
        }
    } 
    else if (classID) {
        if (hasRole("admin") || hasRole("teacher")) {
        students = await studentsService.getStudentsByClassID(Number(classID));
        } else {
            return c.json(
                {
                    message: "Forbidden: Requires one of roles: Admin, Teacher",
                },
                403
            );
        }
    }
    else {
        if (hasRole("admin") || hasRole("teacher")) {
        students = await studentsService.getAllStudents();
        } else {
            return c.json(
                {
                    message: "Forbidden: Requires one of roles: Admin, Teacher",
                },
                403
            );
        }
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
