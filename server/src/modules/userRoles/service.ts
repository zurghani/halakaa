import { db } from "@/db";
import { userRoles } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export type UserRole = typeof userRoles.$inferSelect;
export type NewRole = typeof userRoles.$inferInsert;

export const createRole = async (userRole: NewRole): Promise<UserRole> => {
    const [newUserRole] = await db.insert(userRoles).values(userRole).returning();
    return newUserRole;
};


export const getAllRoles = async (): Promise<UserRole[]> => {
    return await db.select().from(userRoles);
};

export const deleteRole = async (id: number): Promise<void> => {
    await db.delete(userRoles).where(eq(userRoles.id, id));
};
