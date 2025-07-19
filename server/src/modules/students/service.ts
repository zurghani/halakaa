import { db } from "@/db";
import { studentClasses, students } from "@/db/schema";
import { and, eq } from "drizzle-orm";

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
export const getStudentById = async (id: number): Promise<Student | undefined> => {
    const [student] = await db.select().from(students).where(eq(students.id, id));
    return student;
};

// Read by filters
export type getStudentsFilters = { parentId?: string; classId?: number };
export const getStudentByFilters = async (filters: getStudentsFilters): Promise<Student[]> => {
    const conditions = [];
    if (filters.parentId) {
        conditions.push(eq(students.parentId, filters.parentId));
    }
    if (filters.classId) {
        // conditions.push(eq(students, filters.classId));
        console.log("Class ID filter is not implemented yet");
    }
    const result = await db
        .select()
        .from(students)
        .where(conditions.length > 0 ? and(...conditions) : undefined);
    return result;
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
