import type { MiddlewareHandler } from "hono";
import type { Role } from "@/types";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
    // Example placeholder; replace with your JWT verification
    const user = {
        id: "uuid",
        roles: ["admin"] as Role[],
    };

    c.set("user", user);
    await next();
};
