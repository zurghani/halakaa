import type { Context } from "hono";
import auth from "@/modules/auth";

export const ROLES = ["admin", "teacher", "parent"] as const;
export type Role = (typeof ROLES)[number];

export type AppContext = Context & {
  Variables: AuthType;
};

export type AuthType = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};
