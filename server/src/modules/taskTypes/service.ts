import { db } from "@/db";
import { taskTypes } from "@/db/schema";
import { eq } from "drizzle-orm";

export type TaskType = typeof taskTypes.$inferSelect;
export type NewTaskType =  typeof taskTypes.$inferInsert;

export const createTaskType = async (taskType: NewTaskType): Promise<TaskType> => {
    const [newTaskType] = await db.insert(taskTypes).values(taskType).returning();
    return newTaskType!;
};


export const getAllTaskTypes = async (): Promise<TaskType[]> => {
    return await db.select().from(taskTypes);
};


export const getTaskTypeById = async (id: number): Promise<TaskType | undefined> => {
    const [taskType] = await db.select().from(taskTypes).where(eq(taskTypes.id, id));
    return taskType;
};


export const deleteTaskType = async (id: number): Promise<void> => {
    await db.delete(taskTypes).where(eq(taskTypes.id, id));
};