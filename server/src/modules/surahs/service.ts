import { db } from "@/db";
import { surah } from "@/db/schema";
import { eq } from "drizzle-orm";

export type Surah = typeof surah.$inferSelect;

export const getAllSurahs = async (): Promise<Surah[]> => {
    return await db.select().from(surah);
};

export const getSurahById = async (id: number): Promise<Surah | undefined> => {
    const [data] = await db.select().from(surah).where(eq(surah.id, id));
    return data;
};