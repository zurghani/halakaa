import { db } from "@/db";
import { ayah, surah } from "@/db/schema";
import { and, eq, inArray, like } from "drizzle-orm";

export type Ayah = typeof ayah.$inferSelect;
export type AyahReference = Omit<Ayah, "plainText" | "createdAt"> & {
  surahName: typeof surah.$inferSelect.name;
};

export const getAllAyahs = async (): Promise<Ayah[]> => {
  return await db.select().from(ayah);
};

export const getAyahsBySurah = async (surahId: number): Promise<Ayah[]> => {
  return await db.select().from(ayah).where(eq(ayah.surahId, surahId));
};

export const getAyahBySurahAndNumber = async (surahId: number, number: number): Promise<Ayah[]> => {
  return await db
    .select()
    .from(ayah)
    .where(and(eq(ayah.surahId, surahId), eq(ayah.number, number)));
};

export const getAyahsLike = async (search: string): Promise<AyahReference[]> => {
  return await db
    .select({
      id: ayah.id,
      number: ayah.number,
      text: ayah.text,
      surahId: surah.id,
      surahName: surah.name,
    })
    .from(ayah)
    .innerJoin(surah, eq(ayah.surahId, surah.id))
    .where(like(ayah.plainText, `%${search}%`));
};

export const getAyahById = async (id: number): Promise<Ayah | undefined> => {
  const [data] = await db.select().from(ayah).where(eq(ayah.id, id));
  return data;
};

export const getAyahsByIds = async (ids: number[]): Promise<Ayah[]> => {
  if (ids.length === 0) return [];
  return await db.select().from(ayah).where(inArray(ayah.id, ids));
};

export const getAyahReferences = async (
  ids: number[]
): Promise<{ ayahId: number; number: number; surahId: number; surahName: string }[]> => {
  const data = await db
    .select({
      ayahId: ayah.id,
      number: ayah.number,
      surahId: surah.id,
      surahName: surah.name,
    })
    .from(ayah)
    .leftJoin(surah, eq(ayah.surahId, surah.id))
    .where(inArray(ayah.id, ids));
  return data.map((row) => ({
    ayahId: row.ayahId,
    number: row.number,
    surahId: row.surahId ?? 0,
    surahName: row.surahName ?? "",
  }));
};
