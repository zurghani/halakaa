import { db } from "@/db";
import { students, classes, enrollments } from "@/db/schema";
import { and, eq, ilike, sql } from "drizzle-orm";

// Types
export type Student = typeof students.$inferSelect;
export type NewStudent = typeof students.$inferInsert;
export type UpdateStudent = Partial<NewStudent>;

// Create
export const createStudent = async (student: NewStudent): Promise<Student> => {
  const [newStudent] = await db.insert(students).values(student).returning();
  return newStudent!;
};

// Read all
export const getAllStudents = async (): Promise<Student[]> => {
  return await db.select().from(students);
};

// Read one
export const getStudentById = async (id: number): Promise<Student | undefined> => {
  const [student] = await db.select().from(students).where(eq(students.id, id));
  return student;
};

// Read by filters
export type getStudentsFilters = { teacherId?: string; parentId?: string; classId?: number };
export const getStudentByFilters = async (filters: getStudentsFilters): Promise<Student[]> => {
  const selectFields = {
    id: students.id,
    fullName: students.fullName,
    parentId: students.parentId,
    userId: students.userId,
    gender: students.gender,
    dateOfBirth: students.dateOfBirth,
    createdAt: students.createdAt,
  };

  const conditions = [];

  if (filters.parentId && filters.parentId !== "") {
    conditions.push(eq(students.parentId, filters.parentId));
  }
  if (filters.classId && filters.classId !== 0) {
    conditions.push(eq(enrollments.classId, filters.classId));
  }
  if (filters.teacherId && filters.teacherId !== "") {
    conditions.push(eq(classes.teacherId, filters.teacherId));
  }

  if (conditions.length) {
    if (filters.teacherId || filters.classId) {
      let query = db
        .select(selectFields)
        .from(students)
        .innerJoin(enrollments, eq(enrollments.studentId, students.id))
        .innerJoin(classes, eq(classes.id, enrollments.classId));

      return conditions.length > 0 ? await query.where(and(...conditions)) : [];
    } else {
      let query = db.select(selectFields).from(students);
      return conditions.length > 0 ? await query.where(and(...conditions)) : [];
    }
  } else {
    return [];
  }
};

export type getStudentBySearchFilters = { id?: number; name?: string; dob?: string };

export const getStudentBySearch = async (
  filters: getStudentBySearchFilters
): Promise<Student[]> => {
  if (!filters.id && !filters.name && !filters.dob) {
    return [];
  }

  let whereCondition;
  if (filters.id) {
    whereCondition = ilike(sql`${students.id}::text`, `%${filters.id}%`);
  } else if (filters.name) {
    whereCondition = ilike(students.fullName, `%${filters.name}%`);
  } else if (filters.dob) {
    whereCondition = eq(students.dateOfBirth, filters.dob);
  }
  return await db.select().from(students).where(whereCondition);
};

// Update
export const updateStudent = async (
  id: number,
  updates: UpdateStudent
): Promise<Student | undefined> => {
  const [updatedStudent] = await db
    .update(students)
    .set(updates)
    .where(eq(students.id, id))
    .returning();
  return updatedStudent;
};

// Delete
export const deleteStudent = async (id: number): Promise<void> => {
  await db.delete(students).where(eq(students.id, id));
};

//
export const isParentOfStudent = async (parentId: string, studentId: number): Promise<boolean> => {
  const student = await db
    .select()
    .from(students)
    .where(and(eq(students.id, studentId), eq(students.parentId, parentId)));
  return student.length > 0;
};
