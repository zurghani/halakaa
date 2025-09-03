import dayjs, { Dayjs } from "dayjs";
import {
    user,
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

export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
export type UpdateUser = Partial<NewUser>;

export type Student = Omit<typeof students.$inferSelect, "createdAt" | "dateOfBirth"> & {
    createdAt: string | null;
    dateOfBirth: string | null;
};
export type StudentFormValues = Omit<Student, "dateOfBirth"> & {
    dateOfBirth: Dayjs | null;
};
export type NewStudent = typeof students.$inferInsert;
export type UpdateStudent = Partial<NewStudent>;

export type AgeGroup = Omit<typeof ageGroup.$inferSelect, "createdAt"> & {
    createdAt?: string | null;
};
export type NewAgeGroup = typeof ageGroup.$inferInsert;

export type Attendance = Omit<typeof attendance.$inferSelect, "createdAt"> & {
    createdAt: string | null;
};
export type NewAttendance = typeof attendance.$inferInsert;
export type UpdateAttendance = Partial<NewAttendance>;

export type Class = typeof classes.$inferSelect;
export type ClassWithTeacherInfo = Omit<Class, "teacherId" | "createdAt"> & {
    teacher: { id: typeof user.$inferInsert.id; name: typeof user.$inferInsert.name };
    createdAt: string | null;
};
export type NewClass = typeof classes.$inferInsert;
export type UpdateClass = Partial<NewClass>;

export type Enrollment = typeof enrollments.$inferSelect;
export type NewEnrollment = typeof enrollments.$inferInsert;

export type Task = Omit<typeof tasks.$inferSelect, "createdAt"> & {
    createdAt: string | null;
};
export type NewTask = typeof tasks.$inferInsert;
export type UpdateTask = Partial<NewTask>;

// export type TaskType = typeof taskTypes.$inferSelect;
export type TaskType = Omit<typeof taskTypes.$inferSelect, "createdAt"> & {
    createdAt?: dayjs.Dayjs | string | null;
};
export type TaskExpanded = Omit<Task, "assignedBy" | "completedBy"> & {
    assignedBy: { id: typeof user.$inferInsert.id; name: typeof user.$inferInsert.name } | null;
    completedBy: { id: typeof user.$inferInsert.id; name: typeof user.$inferInsert.name } | null;
    taskType: {
        id: typeof taskTypes.$inferSelect.id;
        name: typeof taskTypes.$inferSelect.name;
    } | null;
    startingAyah: {
        ayahId: typeof ayah.$inferSelect.id;
        number: typeof ayah.$inferSelect.number;
        surahId: typeof ayah.$inferSelect.surahId;
        surahName: typeof surah.$inferSelect.name;
    } | null;
    endingAyah: {
        ayahId: typeof ayah.$inferSelect.id;
        number: typeof ayah.$inferSelect.number;
        surahId: typeof ayah.$inferSelect.surahId;
        surahName: typeof surah.$inferSelect.name;
    } | null;
};

export type NewTaskType = typeof taskTypes.$inferInsert;

export type Surah = typeof surah.$inferSelect;

export type Ayah = Omit<typeof ayah.$inferSelect, "createdAt"> & {
    createdAt?: string | null;
};
export enum TaskStatus {
    Assigned = "assigned",
    Completed = "completed",
}
