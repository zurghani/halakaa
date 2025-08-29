import { db } from "@/db";
import { students, classes, enrollments } from "@/db/schema";
import { and, eq } from "drizzle-orm";

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
  const conditions = [];
  let base = db
    .select({
      id: students.id,
      fullName: students.fullName,
      parentId: students.parentId,
      userId: students.userId,
      gender: students.gender,
      dateOfBirth: students.dateOfBirth,
      createdAt: students.createdAt,
    })
    .from(students) as any; //I get errors without 'as any'

  if (filters.teacherId || filters.classId) {
    base = base
      .innerJoin(enrollments, eq(enrollments.studentId, students.id))
      .innerJoin(classes, eq(classes.id, enrollments.classId));
  }
  if (filters.parentId) {
    conditions.push(eq(students.parentId, filters.parentId));
  }
  if (filters.classId) {
    conditions.push(eq(enrollments.classId, filters.classId));
  }
  if (filters.teacherId) {
    conditions.push(eq(classes.teacherId, filters.teacherId));
  }
  const query = conditions.length > 0 ? base.where(and(...conditions)) : base;

  return await query;
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
