import type { MiddlewareHandler } from "hono";
import type { AuthType } from "@/types";
import auth from "../modules/auth";

export const authMiddleware: MiddlewareHandler<{ Variables: AuthType }> = async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
};
