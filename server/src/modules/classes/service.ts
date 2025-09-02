import { db } from "@/db";
import { classes, user } from "@/db/schema";
import { and, eq, ilike, sql } from "drizzle-orm";

export type Class = typeof classes.$inferSelect;
export type NewClass = typeof classes.$inferInsert;
export type UpdateClass = Partial<NewClass>;

export const createClass = async (quranClass: NewClass): Promise<Class> => {
  const [newClass] = await db.insert(classes).values(quranClass).returning();
  return newClass!;
};

export const getAllClasses = async (): Promise<Class[]> => {
  return await db.select().from(classes);
};

export type getClassFilters = { teacherId?: string; classId?: number; teacherName?: string };
export const getClassByFilters = async (filters: getClassFilters): Promise<Class[]> => {
  //   if (filters.classId) {
  //     return await db.select().from(classes).where(eq(classes.id, filters.classId));
  //   }
  if (filters.classId) {
    return await db
      .select()
      .from(classes)
      .where(ilike(sql`${classes.id}::text`, `%${filters.classId}%`));
  }

  if (filters.teacherId) {
    return await db.select().from(classes).where(eq(classes.teacherId, filters.teacherId));
  }

  if (filters.teacherName) {
    return await db
      .select({
        id: classes.id,
        createdAt: classes.createdAt,
        teacherId: classes.teacherId,
        startsAt: classes.startsAt,
        endsAt: classes.endsAt,
        description: classes.description,
        ageGroup: classes.ageGroup,
      })
      .from(classes)
      .leftJoin(user, eq(classes.teacherId, user.id))
      .where(ilike(user.name, `%${filters.teacherName}%`));
  }

  return [];
};

export const getClassById = async (id: number): Promise<Class | undefined> => {
  const [quranClass] = await db.select().from(classes).where(eq(classes.id, id));
  return quranClass;
};

export const updateClass = async (id: number, updates: UpdateClass): Promise<Class | undefined> => {
  const [updatedClass] = await db
    .update(classes)
    .set(updates)
    .where(eq(classes.id, id))
    .returning();
  return updatedClass;
};

export const deleteClass = async (id: number): Promise<void> => {
  await db.delete(classes).where(eq(classes.id, id));
};
