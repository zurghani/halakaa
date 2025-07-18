import { db } from "@/db";
import { studentClasses, students } from "@/db/schema";
import { eq } from "drizzle-orm";

// Types
export type Student = typeof students.$inferSelect;
export type NewStudent = typeof students.$inferInsert;
export type UpdateStudent = Partial<NewStudent>;

// Create
export const createStudent = async (student: NewStudent): Promise<Student> => {
    const [newStudent] = await db.insert(students).values(student).returning();
    return newStudent;
};

// Read all
export const getAllStudents = async (): Promise<Student[]> => {
    return await db.select().from(students);
};

// Read one
export const getStudentById = async (
    id: number
): Promise<Student | undefined> => {
    const [student] = await db
        .select()
        .from(students)
        .where(eq(students.id, id));
    return student;
};

export const getStudentsByParentID = async (parentID: string): Promise<Student[]> => {
    const result = await db.select().from(students).where(eq(students.parentId, parentID));
    return result;
};

export const getStudentsByClassID = async (classID: number): Promise<Student[]> => {
    const result = await db.select().from(studentClasses).innerJoin(students, eq(studentClasses.studentId, students.id)).where(eq(studentClasses.classId, classID))
    return result.map((row) => row.students);
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
