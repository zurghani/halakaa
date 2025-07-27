import { sign } from "hono/jwt";
import { db } from "../../db";
import { users, userRoles, roles } from "../../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const loginService = async (email: string, password: string, jwtSecret: string) => {
    const [user] = await db.select().from(users).where(eq(users.email, email));

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return null;
    }

    const userRolesResult = await db
        .select({
            roleName: roles.name,
        })
        .from(userRoles)
        .innerJoin(roles, eq(userRoles.roleId, roles.id))
        .where(eq(userRoles.userId, user.id));

    const role = userRolesResult[0]?.roleName ?? "unknown";

    const token = await sign(
        {
            id: user.id,
            role,
        },
        jwtSecret
    );

    return token;
};
