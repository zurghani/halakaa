import type { Handler } from "hono";
import * as ageGroupsService from "./service";

export const create: Handler = async (c) => {
    const body = await c.req.json();
    if (body.from > body.to) {
        return c.json({ error: "Invalid age group: 'from' must be less than 'to'" }, 400);
    }
    const result = await ageGroupsService.createAgeGroup(body);
    return c.json(result, 201);
};

export const getAll: Handler = async (c) => {
    const ageGroups = await ageGroupsService.getAllAgeGroups();
    return c.json(ageGroups);
};

export const getById: Handler = async (c) => {
    const id = c.req.param("id");
    const group = await ageGroupsService.getAgeGroupById(parseInt(id));
    return c.json(group);
};

export const remove: Handler = async (c) => {
    const id = c.req.param("id");
    await ageGroupsService.deleteAgeGroup(parseInt(id));
    return c.json({
        message: `Age Group ${c.req.param("id")} deleted successfully`,
    });
};
