import { db } from "@/db";
import { ayah } from "@/db/schema";
import { and, eq, like } from "drizzle-orm";

export type Ayah = typeof ayah.$inferSelect

export const getAllAyahs = async (): Promise<Ayah[]> => {
    return await db.select().from(ayah);
};

export const getAyahsBySurah = async (surahId: number): Promise<Ayah[]> => {
    return await db.select().from(ayah).where(eq(ayah.surahId, surahId));
}

export const getAyahBySurahAndNumber = async (surahId: number, number:number): Promise<Ayah[]> => {
    return await db.select().from(ayah).where(and(eq(ayah.surahId, surahId),eq(ayah.number, number)));
}

export const getAyahsLike = async (search: string): Promise<Ayah[]> => {
    return await db.select().from(ayah).where(like(ayah.plainText, `%${search}%`))

}

export const getAyahById = async (id: number): Promise<Ayah | undefined> => {
    const [data] = await db.select().from(ayah).where(eq(ayah.id, id));
    return data;
};
