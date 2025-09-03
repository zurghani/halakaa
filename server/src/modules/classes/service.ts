import { db } from "@/db";
import { classes, enrollments, user } from "@/db/schema";
import { and, eq, ilike, sql } from "drizzle-orm";

export type Class = typeof classes.$inferSelect;
export type ClassWithTeacherInfo = Omit<Class, "teacherId"> & {
  teacher: { id: typeof user.$inferInsert.id; name: typeof user.$inferInsert.name };
};
export type NewClass = typeof classes.$inferInsert;
export type UpdateClass = Partial<NewClass>;

export const createClass = async (quranClass: NewClass): Promise<Class> => {
  const [newClass] = await db.insert(classes).values(quranClass).returning();
  return newClass!;
};

export const getAllClasses = async (): Promise<ClassWithTeacherInfo[]> => {
  return await db
    .select({
      id: classes.id,
      startsAt: classes.startsAt,
      endsAt: classes.endsAt,
      description: classes.description,
      ageGroup: classes.ageGroup,
      teacherId: classes.teacherId,
      createdAt: classes.createdAt,
      teacher: {
        id: user.id,
        name: user.name,
      },
    })
    .from(classes)
    .innerJoin(user, eq(classes.teacherId, user.id));
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

export type getClassbySearchInterface = {
  teacherId?: string;
  classId?: number;
  teacherName?: string;
};

export const getClassbySearch = async (
  filters: getClassbySearchInterface
): Promise<ClassWithTeacherInfo[]> => {
  if (filters.classId) {
    return await db
      .select({
        id: classes.id,
        createdAt: classes.createdAt,
        teacherId: classes.teacherId,
        startsAt: classes.startsAt,
        endsAt: classes.endsAt,
        description: classes.description,
        ageGroup: classes.ageGroup,
        teacher: {
          id: user.id,
          name: user.name,
        },
      })
      .from(classes)
      .innerJoin(user, eq(classes.teacherId, user.id))
      .where(ilike(sql`${classes.id}::text`, `%${filters.classId}%`));
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
        teacher: {
          id: user.id,
          name: user.name,
        },
      })
      .from(classes)
      .innerJoin(user, eq(classes.teacherId, user.id))
      .where(ilike(user.name, `%${filters.teacherName}%`));
  }

  return [];
};

export type getClassFilters = { teacherId?: string; studentId?: number };
export const getClassByFilters = async (
  filters: getClassFilters
): Promise<ClassWithTeacherInfo[]> => {
  const selectFields = {
    id: classes.id,
    createdAt: classes.createdAt,
    teacherId: classes.teacherId,
    startsAt: classes.startsAt,
    endsAt: classes.endsAt,
    description: classes.description,
    ageGroup: classes.ageGroup,
    teacher: {
      id: user.id,
      name: user.name,
    },
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
        .innerJoin(user, eq(classes.teacherId, user.id))
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
