import type { Handler } from "hono";
import * as usersService from "./service";
import type { Role } from "@/types";

export const create: Handler = async (c) => {
    const body = await c.req.json();
    const result = await usersService.createUser(body);
    return c.json(result, 201);
};

export const getAll: Handler = async (c) => {
    const users = await usersService.getAllUsers();
    return c.json(users);
};

export const getById: Handler = async (c) => {
    const id = c.req.param("id");
    const user = await usersService.getUserById(id);
    return c.json(user);
};

export const getSelf: Handler = async (c) => {
    //TODO: change to use the authenticated user from the context
    const self = c.get("user") as { id: string; roles: Role[] };
    const user = await usersService.getUserById(self.id);
    return c.json(user);
};

export const update: Handler = async (c) => {
    const id = c.req.param("id");
    const body = await c.req.json();
    const updatedUser = await usersService.updateUser(id, body);
    return c.json(updatedUser);
};

export const remove: Handler = async (c) => {
    const id = c.req.param("id");
    await usersService.deleteUser(id);
    return c.json({
        message: `User ${c.req.param("id")} deleted successfully`,
    });
};
