import type { Context } from "hono";

export const ROLES = ["admin", "teacher", "parent"] as const;
export type Role = (typeof ROLES)[number];

export type User = {
    id: string;
    roles: Role[];
};

export type AppContext = Context & {
    Variables: {
        user: User;
    };
};
