import type { Role } from "@/types";
import type { MiddlewareHandler } from "hono";

export const requireRoles = (roles: Role[]): MiddlewareHandler => {
    return async (c, next) => {
        const user = c.get("user") as { id: string; roles: Role[] } | undefined;

        if (!user) {
            return c.json({ message: "Unauthorized" }, 401);
        }

        const hasRole = user.roles.some((r) => roles.includes(r));
        if (!hasRole) {
            return c.json(
                {
                    message: `Forbidden: Requires one of roles [${roles.join(", ")}]`,
                },
                403
            );
        }

        await next();
    };
};
