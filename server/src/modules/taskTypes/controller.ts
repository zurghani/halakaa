import type { Handler } from "hono";
import * as taskTypesService from "./service";


export const create: Handler = async (c) => {
    const body = await c.req.json();
    const result = await taskTypesService.createTaskType(body);
    return c.json(result, 201);
};

export const getAll: Handler = async (c) => {
    const taskTypes = await taskTypesService.getAllTaskTypes();
    return c.json(taskTypes);
};

export const getById: Handler = async (c) => {
    const id = c.req.param("id");
    const taskType = await taskTypesService.getTaskTypeById(parseInt(id));
    return c.json(taskType);
};

export const remove: Handler = async (c) => {
    const id = c.req.param("id");
    await taskTypesService.deleteTaskType(parseInt(id));
    return c.json({
        message: `Task Type ${c.req.param("id")} deleted successfully`,
    });
};