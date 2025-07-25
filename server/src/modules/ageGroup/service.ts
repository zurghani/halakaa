import { db } from "@/db";
import { ageGroup } from "@/db/schema";
import { eq } from "drizzle-orm";

export type AgeGroup = typeof ageGroup.$inferSelect;
export type NewAgeGroup =  typeof ageGroup.$inferInsert;


export const createAgeGroup = async (ageGroupNew: NewAgeGroup): Promise<AgeGroup> => {
    if (ageGroupNew.from > ageGroupNew.to){
        throw new Error("Invalid age group: 'from' must be less than 'to'");
    }
    const [newAgeGroup] = await db.insert(ageGroup).values(ageGroupNew).returning();
    return newAgeGroup;
};

export const getAllAgeGroups = async (): Promise<AgeGroup[]> => {
    return await db.select().from(ageGroup);
};

export const getAgeGroupById = async (id: number): Promise<AgeGroup | undefined> => {
    const [group] = await db.select().from(ageGroup).where(eq(ageGroup.id, id));
    return group;
};

export const deleteAgeGroup = async (id: number): Promise<void> => {
    await db.delete(ageGroup).where(eq(ageGroup.id, id));
};