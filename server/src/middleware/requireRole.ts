import type { MiddlewareHandler } from "hono";
import { authClient } from "../modules/auth";
import type { AppPermission } from "src/modules/auth/access-controller";

export const requireRoles = (permission: AppPermission): MiddlewareHandler => {
  return async (c, next) => {
    const user = c.get("user");

    if (!user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const { data, error } = await authClient.admin.hasPermission({
      userId: user.id,
      permission
    });

    if (error || !data.success) {
      return c.json({ error: "Forbidden" }, 403);
    }

    await next();
  };
};
