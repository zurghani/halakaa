import type { Handler } from "hono";
import * as tasksService from "./service";
import type { Role } from "@/types";


export const create: Handler = async (c) => {
    const body = await c.req.json();
    const result = await tasksService.createTask(body);
    return c.json(result, 201);
};
// TODO: implement checking for teacher/parent correspondance to student id.
export const getAll: Handler = async (c) => {
    const studentId = Number(c.req.query("student_id"));
    const tasks = await tasksService.getTasksByStudentId(studentId)
    return c.json(tasks);
};

export const getById: Handler = async (c) => {
    const id = c.req.param("id");
    const task = await tasksService.getTaskById(parseInt(id));
    return c.json(task);
};

export const update: Handler = async (c) => {
    const id = c.req.param("id");
    const body = await c.req.json();
    const updatedTask = await tasksService.updateTask(parseInt(id), body);
    return c.json(updatedTask);
}

export const remove: Handler = async (c) => {
    const id = c.req.param("id");
    await tasksService.deleteTask(parseInt(id));
    return c.json({
        message: `Task Type ${c.req.param("id")} deleted successfully`,
    });
};