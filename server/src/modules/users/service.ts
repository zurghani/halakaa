import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type UpdateUser = Partial<NewUser>

export const createUser = async (user: NewUser): Promise<User> => {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
};

export const getAllUsers = async (): Promise<User[]> => {
    return await db.select().from(users);
};

export const getUserById = async (id: string): Promise<User | undefined> => {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
};


export const updateUser = async (id: string, updates: UpdateUser): Promise<User | undefined> => {
    const [updatedUser] = await db
        .update(users)
        .set(updates)
        .where(eq(users.id, id))
        .returning();
    return updatedUser;
};

export const deleteUser = async (id: string): Promise<void> => {
    await db.delete(users).where(eq(users.id, id));
};