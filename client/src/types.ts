import { Dayjs } from "dayjs";
import {
    students,
    ageGroup,
    classes,
    attendance,
    enrollments,
    tasks,
    taskTypes,
    surah,
    ayah,
} from "../../server/src/db/schema";

export type Student = Omit<typeof students.$inferSelect, "createdAt" | "dateOfBirth"> & {
    createdAt: string | null;
    dateOfBirth: string | null;
};
export type StudentFormValues = Omit<Student, "dateOfBirth"> & {
    dateOfBirth: Dayjs | null;
};
export type NewStudent = typeof students.$inferInsert;
export type UpdateStudent = Partial<NewStudent>;

export type AgeGroup = typeof ageGroup.$inferSelect;
export type NewAgeGroup = typeof ageGroup.$inferInsert;

export type Attendance = typeof attendance.$inferSelect;
export type NewAttendance = typeof attendance.$inferInsert;
export type UpdateAttendance = Partial<NewAttendance>;

export type Class = typeof classes.$inferSelect;
export type NewClass = typeof classes.$inferInsert;
export type UpdateClass = Partial<NewClass>;

export type Enrollment = typeof enrollments.$inferSelect;
export type NewEnrollment = typeof enrollments.$inferInsert;

export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;
export type UpdateTask = Partial<NewTask>;

// export type TaskType = typeof taskTypes.$inferSelect;
export type TaskType = Omit<typeof taskTypes.$inferSelect, "createdAt"> & {
    createdAt?: string | null;
};
export type NewTaskType = typeof taskTypes.$inferInsert;

export type Surah = typeof surah.$inferSelect;

export type Ayah = typeof ayah.$inferSelect;
