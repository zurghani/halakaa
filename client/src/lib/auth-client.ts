import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { admin, student, teacher, parent } from "server/dist/modules/auth/permissions";

export const authClient = createAuthClient({
    baseURL: "http://localhost:4000",
    plugins: [
        adminClient({
            roles: {
                admin,
                parent,
                student,
                teacher,
            },
        }),
    ],
});
