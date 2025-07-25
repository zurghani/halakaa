import { db } from "@/db";
import { roles } from "@/db/schema";
import { eq } from "drizzle-orm";

export type Role = typeof roles.$inferSelect;
export type NewRole = typeof roles.$inferInsert;

export const createRole = async (role: NewRole): Promise<Role> => {
    const [newRole] = await db.insert(roles).values(role).returning();
    return newRole;
};

export const getAllRoles = async (): Promise<Role[]> => {
    return await db.select().from(roles);
};

export const getRoleById = async (id: number): Promise<Role | undefined> => {
    const [role] = await db.select().from(roles).where(eq(roles.id, id));
    return role;
};

export const deleteRole = async (id: number): Promise<void> => {
    await db.delete(roles).where(eq(roles.id, id));
};
