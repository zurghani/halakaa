import { db } from "@/db";
import { classes, studentClasses, students } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import type { Student } from "../students/service";
import type { Class } from "../classes/service";

//Types
export type Enrollment = typeof studentClasses.$inferSelect;
export type NewEnrollment = typeof studentClasses.$inferInsert;

// Create
export const createEnrollment = async (enrollment: NewEnrollment): Promise<Enrollment> => {
    const [newEnrollment] = await db.insert(studentClasses).values(enrollment).returning();
    return newEnrollment;
};

export type getEnrollmentsFilters = { classId?: number; studentId?: number };
export const getEnrollmentsByFilters = async (
    filters: getEnrollmentsFilters
): Promise<Student[] | Class[]> => {
    if (filters.classId) {
        const result = await db
            .select()
            .from(studentClasses)
            .innerJoin(students, eq(studentClasses.studentId, students.id))
            .where(eq(studentClasses.classId, filters.classId));

        return result.map((row) => row.students);
    }
    if (filters.studentId) {
        const result = await db
            .select()
            .from(studentClasses)
            .innerJoin(classes, eq(studentClasses.classId, classes.id))
            .where(eq(studentClasses.studentId, filters.studentId));
        return result.map((row) => row.classes);
    }

    return [];
};

// Delete
export const deleteEnrollment = async (id: number): Promise<void> => {
    await db.delete(studentClasses).where(eq(studentClasses.id, id));
};
