import type { Handler } from "hono";
import * as roleService from "./service";

export const create: Handler = async (c) => {
    const body = await c.req.json();
    const result = await roleService.createRole(body);
    return c.json(result, 201);
};

export const getAll: Handler = async (c) => {
    const roles = await roleService.getAllRoles();
    return c.json(roles);
};

export const getById: Handler = async (c) => {
    const id = c.req.param("id");
    const role = await roleService.getRoleById(parseInt(id));
    return c.json(role);
};

export const remove: Handler = async (c) => {
    const id = c.req.param("id");
    await roleService.deleteRole(parseInt(id));
    return c.json({
        message: `Role ${c.req.param("id")} deleted successfully`,
    });
};
