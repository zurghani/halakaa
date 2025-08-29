import { db } from "@/db";
import { betterAuth, type BetterAuthPlugin } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { admin as adminRole, parent, student, teacher } from "./permissions";
import { ac } from "./access-controller";
import { Hono } from "hono";
import type { AuthType } from "@/types";
import { languageEnum } from "../../db/schema";
import { createAuthClient } from "better-auth/client";
import { adminClient } from "better-auth/client/plugins";
import "dotenv/config";
import { password } from "bun";

const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  trustedOrigins: [process.env.TRUSTED_ORIGIN ?? "http://localhost:3000"],
  emailAndPassword: {
    enabled: true,
    password: {
      verify: (data) => {
        return password.verify(data.password, data.hash);
      },
      hash: (pwd) => {
        return password.hash(pwd);
      },
    },
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
      roles: {
        admin: adminRole,
      },
    }),
  ],
});

export const authRoutes = new Hono<{ Bindings: AuthType }>({ strict: false });

authRoutes.on(["POST", "GET"], "/*", async (c) => {
  const s = await auth.api.getSession({ headers: c.req.raw.headers });
  console.log("ADMIN TEST – server sees:", s?.user?.id, s?.user?.role);
  return auth.handler(c.req.raw);
});

export const authClient = createAuthClient({
  plugins: [
    adminClient({
      ac,
      roles: {
        admin: adminRole,
        parent,
        teacher,
        student,
      },
    }),
  ],
});

export default auth;
