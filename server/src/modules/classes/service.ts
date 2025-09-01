import { db } from "@/db";
import { classes, user } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { start } from "repl";

export type Class = typeof classes.$inferSelect;
export type ClassWithTeacherInfo = Omit<Class, "teacherId"> & {
  teacher: { id: typeof user.$inferInsert.id; name: typeof user.$inferInsert.name } | null;
};
export type NewClass = typeof classes.$inferInsert;
export type UpdateClass = Partial<NewClass>;

export const createClass = async (quranClass: NewClass): Promise<Class> => {
  const [newClass] = await db.insert(classes).values(quranClass).returning();
  return newClass!;
};

export const getAllClasses = async (): Promise<Class[]> => {
  return await db.select().from(classes);
};

export type getClassFilters = { teacherId?: string };
export const getClassByFilters = async (filters: getClassFilters): Promise<Class[]> => {
  const conditions = [];
  if (filters.teacherId) {
    conditions.push(eq(classes.teacherId, filters.teacherId));
  }
  const result = await db
    .select()
    .from(classes)
    .where(conditions.length > 0 ? and(...conditions) : undefined);
  return result;
};

export const getClassById = async (id: number): Promise<ClassWithTeacherInfo | undefined> => {
  const [quranClass] = await db
    .select({
      id: classes.id,
      startsAt: classes.startsAt,
      endsAt: classes.endsAt,
      description: classes.description,
      ageGroup: classes.ageGroup,
      teacher: {
        id: user.id,
        name: user.name,
      },
      createdAt: classes.createdAt,
    })
    .from(classes)
    .innerJoin(user, eq(classes.teacherId, user.id))
    .where(eq(classes.id, id));
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
