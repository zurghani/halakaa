import { db } from "@/db";
import { enrollments, students } from "@/db/schema";
import { eq } from "drizzle-orm";

//Types
export type Enrollment = typeof enrollments.$inferSelect;
export type EnrollmentWithStudent = Omit<Enrollment, "studentId" | "classId"> & {
  student: { id: number; name: string };
};
export type NewEnrollment = typeof enrollments.$inferInsert;

// Create
export const createEnrollment = async (enrollment: NewEnrollment): Promise<Enrollment> => {
  const [newEnrollment] = await db.insert(enrollments).values(enrollment).returning();
  return newEnrollment!;
};

export const getEnrolledClassesByStudentId = async (studentId: number): Promise<Enrollment[]> => {
  const result = await db.select().from(enrollments).where(eq(enrollments.studentId, studentId));
  return result;
};
export const getEnrolledStudentsByClassId = async (
  classId: number
): Promise<EnrollmentWithStudent[]> => {
  const result = await db
    .select({
      id: enrollments.id,
      student: {
        id: enrollments.studentId,
        name: students.fullName,
      },
      createdAt: enrollments.createdAt,
    })
    .from(enrollments)
    .innerJoin(students, eq(enrollments.studentId, students.id))
    .where(eq(enrollments.classId, classId));
  return result;
};

// Delete
export const deleteEnrollment = async (id: number): Promise<void> => {
  await db.delete(enrollments).where(eq(enrollments.id, id));
};
