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

export enum UserRole {
    All = "all",
    Admin = "admin",
    Teacher = "teacher",
    Parent = "parent",
    Student = "student",
}
export enum SupportedLanguage {
    English = "en",
    Arabic = "ar",
}
export enum AttendanceStatus {
    Present = "present",
    Absent = "absent",
    Late = "late",
}
//student
export type User = typeof user.$inferSelect;
export type NewUser = typeof user.$inferInsert;
export type UpdateUser = Partial<NewUser>;

export type Student = Omit<typeof students.$inferSelect, "createdAt" | "dateOfBirth"> & {
    createdAt: string | null;
    dateOfBirth: Dayjs | null;
};

export type NewStudent = typeof students.$inferInsert;
export type StudentWithParent = Omit<Student, "parentId"> & {
    parent: { id: typeof user.$inferSelect.id; name: typeof user.$inferSelect.name };
};
export type UpdateStudent = Partial<NewStudent>;

//AgeGroup
export type AgeGroup = Omit<typeof ageGroup.$inferSelect, "createdAt"> & {
    createdAt?: string | null;
};
export type NewAgeGroup = typeof ageGroup.$inferInsert;

//Attendance
export type Attendance = Omit<typeof attendance.$inferSelect, "createdAt"> & {
    createdAt: string | null;
};
export type NewAttendance = typeof attendance.$inferInsert;
export type AttendanceWithTeacher = Omit<Attendance, "teacherId"> & {
    teacher: { id: typeof user.$inferSelect.id; name: typeof user.$inferSelect.name };
};
export type UpdateAttendance = Partial<NewAttendance>;

//class
export type Class = Omit<typeof classes.$inferSelect, "createdAt"> & {
    createdAt: string | null;
};
export type ClassWithTeacherInfo = Omit<Class, "teacherId" | "createdAt"> & {
    teacher: { id: typeof user.$inferInsert.id; name: typeof user.$inferInsert.name };
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
export type Task = Omit<typeof tasks.$inferSelect, "createdAt"> & {
    createdAt: string | null;
};
export type NewTask = typeof tasks.$inferInsert;
export type UpdateTask = Partial<NewTask>;

export type TaskExpanded = Omit<Task, "assignedBy" | "completedBy"> & {
    assignedBy: { id: typeof user.$inferInsert.id; name: typeof user.$inferInsert.name } | null;
    completedBy: { id: typeof user.$inferInsert.id; name: typeof user.$inferInsert.name } | null;
    taskType: {
        id: typeof taskTypes.$inferSelect.id;
        name: typeof taskTypes.$inferSelect.name;
    } | null;
    startingAyah: AyahReference | null;
    endingAyah: AyahReference | null;
};

//taskType
export type TaskType = Omit<typeof taskTypes.$inferSelect, "createdAt"> & {
    createdAt?: Dayjs | string | null;
};
export type AyahReference = Omit<Ayah, "plainText" | "createdAt"> & {
    surahName: typeof surah.$inferSelect.name;
};
export type NewTaskType = typeof taskTypes.$inferInsert;

//Quran
export type Surah = typeof surah.$inferSelect;

export type Ayah = Omit<typeof ayah.$inferSelect, "createdAt"> & {
    createdAt?: string | null;
};
export enum TaskStatus {
    Assigned = "assigned",
    Completed = "completed",
}
