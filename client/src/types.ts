import { Dayjs } from "dayjs";
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

//student
export type Student = Omit<typeof students.$inferSelect, "createdAt" | "dateOfBirth"> & {
    createdAt: string | null;
    dateOfBirth: string | null;
};
export type StudentFormValues = Omit<Student, "dateOfBirth"> & {
    dateOfBirth: Dayjs | null;
};
export type NewStudent = typeof students.$inferInsert;
export type UpdateStudent = Partial<NewStudent>;

//age group
export type AgeGroup = typeof ageGroup.$inferSelect;
export type NewAgeGroup = typeof ageGroup.$inferInsert;

//attendance
export type Attendance = typeof attendance.$inferSelect;
export type NewAttendance = typeof attendance.$inferInsert;
export type UpdateAttendance = Partial<NewAttendance>;

//class
export type Class = Omit<typeof classes.$inferSelect, "createdAt"> & {
    createdAt: string | null;
};
export type ClassWithTeacherInfo = Omit<Class, "teacherId" | "createdAt"> & {
    teacher: { id: typeof user.$inferInsert.id; name: typeof user.$inferInsert.name } | null;
    createdAt: string | null;
};
export type ClassFormValues = Omit<Class, "startsAt" | "endsAt"> & {
    startsAt: Dayjs | null;
    endsAt: Dayjs | null;
};
export type ClassWithAgeGroup = Omit<Class, "ageGroup"> & { ageGroup: string | "" };
export type NewClass = typeof classes.$inferInsert;
export type UpdateClass = Partial<NewClass>;

//enrollment
export type Enrollment = Omit<typeof enrollments.$inferSelect, "createdAt"> & {
    createdAt: string | null;
};
export type EnrollmentWithStudents = Omit<Enrollment, "studentId" | "classId"> & {
    student: { id: number; name: string };
};
export type NewEnrollment = typeof enrollments.$inferInsert;

//task
export type Task = typeof tasks.$inferSelect;
export type NewTask = typeof tasks.$inferInsert;
export type UpdateTask = Partial<NewTask>;

//taskType
export type TaskType = Omit<typeof taskTypes.$inferSelect, "createdAt"> & {
    createdAt?: string | null;
};
export type NewTaskType = typeof taskTypes.$inferInsert;

//Quran
export type Surah = typeof surah.$inferSelect;

export type Ayah = typeof ayah.$inferSelect;
