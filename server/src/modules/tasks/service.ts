import { db } from "@/db";
import { tasks } from "@/db/schema";
import { eq } from "drizzle-orm";

export type Task = typeof tasks.$inferSelect;
export type NewTask =  typeof tasks.$inferInsert;
export type UpdateTask = Partial<NewTask>

export const createTask = async (task: NewTask): Promise<Task> => {
    const [newTask] = await db.insert(tasks).values(task).returning();
    return newTask!;
};


export const getTasksByStudentId = async (studentId: number): Promise<Task[]> => {

    const result = await db
        .select()
        .from(tasks)
        .where(eq(tasks.studentId, studentId));
    return result
};

export const getTaskById = async (id: number): Promise<Task | undefined> => {
    const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
    return task;
};

export const updateTask = async (id: number, updates: UpdateTask): Promise<Task | undefined> => {
    const [updatedTask] = await db
        .update(tasks)
        .set(updates)
        .where(eq(tasks.id, id))
        .returning();
    return updatedTask;
};

export const deleteTask = async (id: number): Promise<void> => {
    await db.delete(tasks).where(eq(tasks.id, id));
};