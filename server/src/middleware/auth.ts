import type { MiddlewareHandler } from "hono";
import type { Role } from "@/types";
/*
temporary for development purposes
use headers to pass user information, example:
x-user-role: parent
x-user-id: 12345
---
or change the role ["admin"] manually in the code
*/
export const authMiddleware: MiddlewareHandler = async (c, next) => {
    const roleHeader = c.req.header("x-user-role");
    const roles = roleHeader
        ? roleHeader.split(",").map((r) => r.trim() as Role)
        : ["admin"];

    const user = {
        id: c.req.header("x-user-id") || "anonymous",
        roles,
    };
    console.log("Authenticated user:", user);

    c.set("user", user);
    await next();
};
