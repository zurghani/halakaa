import { db } from "@/db";
import { attendance, user } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export type Attendance = typeof attendance.$inferSelect;
export type NewAttendance = typeof attendance.$inferInsert;
export type UpdateAttendance = Partial<NewAttendance>;

export type AttendanceWithTeacher = Omit<Attendance, "teacherId"> & {
  teacher: { id: typeof user.$inferSelect.id; name: typeof user.$inferSelect.name };
};

// Create
export const createAttendance = async (
  attendanceData: NewAttendance
): Promise<Attendance | AttendanceWithTeacher> => {
  let existing: AttendanceWithTeacher | undefined;
  await getAttendanceByFilters({
    classId: attendanceData.classId,
    studentId: attendanceData.studentId,
    date: attendanceData.date,
  }).then((res) => {
    if (res.length > 0) {
      existing = res[0];
    }
  });
  if (existing) {
    return existing;
  } else {
    const [newAttendance] = await db.insert(attendance).values(attendanceData).returning();
    return newAttendance!;
  }
};

export type getAttendanceFilters = { classId?: number; studentId?: number; date?: string };
export const getAttendanceByFilters = async (
  filters: getAttendanceFilters
): Promise<AttendanceWithTeacher[]> => {
  const conditions = [];
  if (filters.classId) {
    conditions.push(eq(attendance.classId, filters.classId));
  }
  if (filters.studentId) {
    conditions.push(eq(attendance.studentId, filters.studentId));
  }
  if (filters.date) {
    conditions.push(eq(attendance.date, filters.date));
  }

  const result = await db
    .select({
      date: attendance.date,
      id: attendance.id,
      createdAt: attendance.createdAt,
      teacher: {
        id: user.id,
        name: user.name,
      },
      classId: attendance.classId,
      studentId: attendance.studentId,
      status: attendance.status,
    })
    .from(attendance)
    .innerJoin(user, eq(attendance.teacherId, user.id))
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
