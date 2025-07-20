import { db } from "@/db";
import { studentClasses } from "@/db/schema";
import { eq } from "drizzle-orm";

//Types
export type Enrollment = typeof studentClasses.$inferSelect;
export type NewEnrollment = typeof studentClasses.$inferInsert;

// Create
export const createEnrollment = async (enrollment: NewEnrollment): Promise<Enrollment> => {
    const [newEnrollment] = await db.insert(studentClasses).values(enrollment).returning();
    return newEnrollment;
};

export const getEnrolledClassesByStudentId = async (studentId: number): Promise<Enrollment[]> => {
    const result = await db
        .select()
        .from(studentClasses)
        .where(eq(studentClasses.studentId, studentId));
    return result;
};
export const getEnrolledStudentsByClassId = async (classId: number): Promise<Enrollment[]> => {
    const result = await db
        .select()
        .from(studentClasses)
        .where(eq(studentClasses.classId, classId));
    return result;
};

// Delete
export const deleteEnrollment = async (id: number): Promise<void> => {
    await db.delete(studentClasses).where(eq(studentClasses.id, id));
};
