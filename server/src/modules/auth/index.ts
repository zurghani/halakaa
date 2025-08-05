import { db } from "@/db";
import { betterAuth, type BetterAuthPlugin } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { admin as adminRole, parent, student, teacher } from "./permissions";
import { ac } from "./access-controller";
import { Hono } from "hono";
import type { AuthType } from "@/types";
import { languageEnum } from "src/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  trustedOrigins: ["http://localhost:3000"],
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false,
        input: true,
      },
      language: {
        type: languageEnum.enumValues,
        required: true,
        defaultValue: "en",
        input: true,
      },
    },
  },
  plugins: [
    admin({
      ac,
      roles: {
        admin: adminRole,
        parent,
        student,
        teacher,
      },
      adminRoles: ["admin"],
      defaultRole: "student",
    }) as unknown as BetterAuthPlugin,
  ],
});

export const authRoutes = new Hono<{ Bindings: AuthType }>({ strict: false });

authRoutes.on(["POST", "GET"], "/*", (c) => {
  return auth.handler(c.req.raw);
});

export default auth;
