import type { Handler } from "hono";
import * as userRolesService from "./service";
import type { Role } from "@/types";

export const create: Handler = async (c) => {
    const body = await c.req.json();
    const result = await userRolesService.createRole(body);
    return c.json(result, 201);
};

export const getAll: Handler = async (c) => {
    let roles: userRolesService.UserRole[] = [];
    roles = await userRolesService.getAllRoles();
    return c.json(roles)
}

export const remove: Handler = async (c) => {
    const id = c.req.param("id");
    await userRolesService.deleteRole(parseInt(id));
    return c.json({
        message: `Role ${c.req.param("id")} deleted successfully`,
    });
};