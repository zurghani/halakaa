import { db } from "@/db";
import { attendance } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export type Attendance = typeof attendance.$inferSelect;
export type NewAttendance = typeof attendance.$inferInsert;
export type UpdateAttendance = Partial<NewAttendance>;

// Create
export const createAttendance = async (attendanceData: NewAttendance): Promise<Attendance> => {
    const [newAttendance] = await db.insert(attendance).values(attendanceData).returning();
    return newAttendance!;
};

export type getAttendanceFilters = { classId?: number; studentId?: number };
export const getAttendanceByFilters = async (
    filters: getAttendanceFilters
): Promise<Attendance[]> => {
    const conditions = [];
    if (filters.classId) {
        conditions.push(eq(attendance.classId, filters.classId));
    }
    if (filters.studentId) {
        conditions.push(eq(attendance.studentId, filters.studentId));
    }
    console.log("Conditions for attendance query:", conditions);
    const result = await db
        .select()
        .from(attendance)
        .where(conditions.length > 0 ? and(...conditions) : undefined);
    return result;
};

// Update
export const updateAttendance = async (
    id: number,
    updates: UpdateAttendance
): Promise<Attendance | undefined> => {
    const [updatedAttendance] = await db
        .update(attendance)
        .set(updates)
        .where(eq(attendance.id, id))
        .returning();
    return updatedAttendance;
};

// Delete
export const deleteAttendance = async (id: number): Promise<void> => {
    await db.delete(attendance).where(eq(attendance.id, id));
};
