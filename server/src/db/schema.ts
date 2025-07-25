import {
    pgTable,
    serial,
    text,
    timestamp,
    uuid,
    integer,
    date,
    time,
    pgEnum,
    primaryKey,
    uniqueIndex,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const genderEnum = pgEnum("gender_enum", ["male", "female"]);
export const originEnum = pgEnum("origin_enum", ["makki", "madani"]);
export const languageEnum = pgEnum("language_enum", ["en", "ar"]);
export const attendanceStatusEnum = pgEnum("attendance_status", ["present", "absent", "late"]);
export const taskStatusEnum = pgEnum("task_status", ["assigned", "completed"]);

// Tables
export const roles = pgTable("roles", {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const users = pgTable("users", {
    id: uuid("id").primaryKey(),
    fullName: text("full_name").notNull(),
    email: text("email").unique(),
    phone: text("phone"),
    language: languageEnum("language").default("en"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const userRoles = pgTable("user_roles", {
    id: serial("id").primaryKey(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
    roleId: integer("role_id").references(() => roles.id, {
        onDelete: "cascade",
    }),
    createdAt: timestamp("created_at").defaultNow(),
});

export const students = pgTable("students", {
    id: serial("id").primaryKey(),
    fullName: text("full_name").notNull(),
    parentId: uuid("parent_id").references(() => users.id),
    userId: uuid("user_id").references(() => users.id),
    gender: genderEnum("gender").notNull(),
    dateOfBirth: date("date_of_birth"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const ageGroup = pgTable("age_group", {
    id: serial("id").primaryKey(),
    description: text("description"),
    from: integer("from"),
    to: integer("to"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const classes = pgTable("classes", {
    id: serial("id").primaryKey(),
    teacherId: uuid("teacher_id").references(() => users.id),
    startsAt: time("starts_at"),
    endsAt: time("ends_at"),
    description: text("description"),
    ageGroup: integer("age_group").references(() => ageGroup.id),
    createdAt: timestamp("created_at").defaultNow(),
});

export const studentClasses = pgTable(
    "student_classes",
    {
        id: serial("id").primaryKey(),
        classId: integer("class_id").references(() => classes.id, {
            onDelete: "cascade",
        }),
        studentId: integer("student_id").references(() => students.id, {
            onDelete: "cascade",
        }),
        createdAt: timestamp("created_at").defaultNow(),
    },
    (table) => [uniqueIndex("unique_student_class").on(table.studentId, table.classId)]
);

export const surah = pgTable("surah", {
    id: serial("id").primaryKey(),
    origin: originEnum("origin"),
    name: text("name").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

export const ayah = pgTable("ayah", {
    id: serial("id").primaryKey(),
    surahId: integer("surah_id").references(() => surah.id),
    number: integer("number").notNull(),
    text: text("text"),
    plainText: text("plain_text"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const taskTypes = pgTable("task_types", {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
    description: text("description"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const tasks = pgTable("tasks", {
    id: serial("id").primaryKey(),
    studentId: integer("student_id").references(() => students.id),
    classId: integer("class_id").references(() => classes.id),
    teacherId: uuid("teacher_id").references(() => users.id),
    taskTypeId: integer("task_type_id").references(() => taskTypes.id),
    status: taskStatusEnum("status").default("assigned"),
    dueDate: date("due_date"),
    startingAyahId: integer("starting_ayah_id").references(() => ayah.id),
    endingAyahId: integer("ending_ayah_id").references(() => ayah.id),
    notes: text("notes"),
    mistakes: integer("mistakes"),
    createdAt: timestamp("created_at").defaultNow(),
});

export const attendance = pgTable("attendance", {
    id: serial("id").primaryKey(),
    studentId: integer("student_id").references(() => students.id),
    teacherId: uuid("teacher_id").references(() => users.id),
    classId: integer("class_id").references(() => classes.id),
    date: date("date").notNull(),
    status: attendanceStatusEnum("status").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
    userRoles: many(userRoles),
    childrenStudents: many(students, { relationName: "parent" }),
    ownStudentRecord: many(students, { relationName: "user" }),
    teachingClasses: many(classes),
    assignedTasks: many(tasks),
    recordedAttendance: many(attendance),
}));

export const rolesRelations = relations(roles, ({ many }) => ({
    userRoles: many(userRoles),
}));

export const userRolesRelations = relations(userRoles, ({ one }) => ({
    user: one(users, {
        fields: [userRoles.userId],
        references: [users.id],
    }),
    role: one(roles, {
        fields: [userRoles.roleId],
        references: [roles.id],
    }),
}));

export const studentsRelations = relations(students, ({ one, many }) => ({
    parent: one(users, {
        fields: [students.parentId],
        references: [users.id],
        relationName: "parent",
    }),
    user: one(users, {
        fields: [students.userId],
        references: [users.id],
        relationName: "user",
    }),
    studentClasses: many(studentClasses),
    tasks: many(tasks),
    attendance: many(attendance),
}));

export const ageGroupRelations = relations(ageGroup, ({ many }) => ({
    classes: many(classes),
}));

export const classesRelations = relations(classes, ({ one, many }) => ({
    teacher: one(users, {
        fields: [classes.teacherId],
        references: [users.id],
    }),
    ageGroupRef: one(ageGroup, {
        fields: [classes.ageGroup],
        references: [ageGroup.id],
    }),
    studentClasses: many(studentClasses),
}));

export const studentClassesRelations = relations(studentClasses, ({ one }) => ({
    student: one(students, {
        fields: [studentClasses.studentId],
        references: [students.id],
    }),
    class: one(classes, {
        fields: [studentClasses.classId],
        references: [classes.id],
    }),
}));

export const surahRelations = relations(surah, ({ many }) => ({
    ayahs: many(ayah),
}));

export const ayahRelations = relations(ayah, ({ one, many }) => ({
    surah: one(surah, {
        fields: [ayah.surahId],
        references: [surah.id],
    }),
    tasksAsStart: many(tasks, { relationName: "startingAyah" }),
    tasksAsEnd: many(tasks, { relationName: "endingAyah" }),
}));

export const taskTypesRelations = relations(taskTypes, ({ many }) => ({
    tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
    student: one(students, {
        fields: [tasks.studentId],
        references: [students.id],
    }),
    classRef: one(classes, {
        fields: [tasks.classId],
        references: [classes.id],
    }),
    teacher: one(users, {
        fields: [tasks.teacherId],
        references: [users.id],
    }),
    taskType: one(taskTypes, {
        fields: [tasks.taskTypeId],
        references: [taskTypes.id],
    }),
    startingAyah: one(ayah, {
        fields: [tasks.startingAyahId],
        references: [ayah.id],
        relationName: "startingAyah",
    }),
    endingAyah: one(ayah, {
        fields: [tasks.endingAyahId],
        references: [ayah.id],
        relationName: "endingAyah",
    }),
}));

export const attendanceRelations = relations(attendance, ({ one }) => ({
    student: one(students, {
        fields: [attendance.studentId],
        references: [students.id],
    }),
    teacher: one(users, {
        fields: [attendance.teacherId],
        references: [users.id],
    }),
    classRef: one(classes, {
        fields: [attendance.classId],
        references: [classes.id],
    }),
}));

// Exporting the schema
export const schema = {
    users,
    roles,
    userRoles,
    students,
    ageGroup,
    classes,
    studentClasses,
    surah,
    ayah,
    taskTypes,
    tasks,
    attendance,
};
