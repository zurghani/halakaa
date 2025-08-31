import { db } from "@/db";
import { classes, enrollments } from "@/db/schema";
import { and, eq } from "drizzle-orm";

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

export type getClassFilters = { teacherId?: string; studentId?: number };
export const getClassByFilters = async (filters: getClassFilters): Promise<Class[]> => {
  const selectFields = {
    id: classes.id,
    createdAt: classes.createdAt,
    teacherId: classes.teacherId,
    startsAt: classes.startsAt,
    endsAt: classes.endsAt,
    description: classes.description,
    ageGroup: classes.ageGroup,
  };
  const conditions = [];

  if (filters.teacherId && filters.teacherId !== "") {
    conditions.push(eq(classes.teacherId, filters.teacherId));
  }
  if (filters.studentId) {
    conditions.push(eq(enrollments.studentId, filters.studentId));
  }
  if (conditions.length) {
    if (filters.studentId) {
      const query = db
        .select(selectFields)
        .from(classes)
        .innerJoin(enrollments, eq(enrollments.classId, classes.id))
        .where(eq(enrollments.studentId, filters.studentId));
      return await query;
    } else {
      let query = db.select(selectFields).from(classes);
      return conditions.length > 0 ? await query.where(and(...conditions)) : [];
    }
  } else {
    return [];
  }
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
