import { db } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { admin as adminRole, parent, student } from "./permissions";
import { ac } from "./access-controller";
import { Hono } from "hono";
import type { AuthType } from "@/types";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  trustedOrigins: ["http://localhost:3000"],
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    admin({
      ac,
      roles: {
        admin: adminRole,
        parent,
        student,
      },
      adminRoles: ["admin"],
      defaultRole: "student",
    }),
  ],
});

export const authRoutes = new Hono<{ Bindings: AuthType }>({ strict: false });

authRoutes.on(["POST", "GET"], "/*", (c) => {
  return auth.handler(c.req.raw);
});
