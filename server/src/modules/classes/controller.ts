import type { Handler } from "hono";
import * as classService from "./service";
import type { Role } from "@/types";

export const create: Handler = async (c) => {
    const body = await c.req.json();
    const result = await classService.createClass(body);
    return c.json(result, 201);
};

export const getAll: Handler = async (c) => {
    const user = c.get("user") as { id: string; roles: Role[] };
    let teacherId = c.req.query("teacher_id");
    let classes: classService.Class[] = [];

    if (user.roles.includes("teacher")) {
        teacherId = user.id;
        classes = await classService.getClassByFilters({ teacherId });
    }
    if (user.roles.includes("admin")) {
        classes = await classService.getClassByFilters({ teacherId });
    }

    return c.json(classes);
};

export const getById: Handler = async (c) => {
    const id = c.req.param("id");
    const quranClass = await classService.getClassById(parseInt(id));
    return c.json(quranClass);
};

export const update: Handler = async (c) => {
    const id = c.req.param("id");
    const body = await c.req.json();
    const updatedClass = await classService.updateClass(parseInt(id), body);
    return c.json(updatedClass);
};
export const remove: Handler = async (c) => {
    const id = c.req.param("id");
    await classService.deleteClass(parseInt(id));
    return c.json({
        message: `Class ${c.req.param("id")} deleted successfully`,
    });
};
