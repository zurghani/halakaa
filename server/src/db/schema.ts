import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  date,
  time,
  pgEnum,
  uniqueIndex,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Enums
export const genderEnum = pgEnum("gender_enum", ["male", "female"]);
export const originEnum = pgEnum("origin_enum", ["makki", "madani"]);
export const languageEnum = pgEnum("language_enum", ["en", "ar"]);
export const attendanceStatusEnum = pgEnum("attendance_status", ["present", "absent", "late"]);
export const taskStatusEnum = pgEnum("task_status", ["assigned", "completed"]);

// Tables
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  phone: text("phone"),
  language: languageEnum("language").default("en"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: text("role"),
  banned: boolean("banned"),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by"),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(() => /* @__PURE__ */ new Date()),
  updatedAt: timestamp("updated_at").$defaultFn(() => /* @__PURE__ */ new Date()),
});

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  parentId: text("parent_id").references(() => user.id),
  userId: text("user_id").references(() => user.id),
  gender: genderEnum("gender").notNull(),
  dateOfBirth: date("date_of_birth"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const ageGroup = pgTable("age_group", {
  id: serial("id").primaryKey(),
  description: text("description"),
  from: integer("from").notNull(),
  to: integer("to").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const classes = pgTable("classes", {
  id: serial("id").primaryKey(),
  teacherId: text("teacher_id").references(() => user.id),
  startsAt: time("starts_at"),
  endsAt: time("ends_at"),
  description: text("description"),
  ageGroup: integer("age_group").references(() => ageGroup.id),
  createdAt: timestamp("created_at").defaultNow(),
});

export const enrollments = pgTable(
  "enrollments",
  {
    id: serial("id").primaryKey(),
    classId: integer("class_id")
      .notNull()
      .references(() => classes.id, {
        onDelete: "cascade",
      }),
    studentId: integer("student_id")
      .notNull()
      .references(() => students.id, {
        onDelete: "cascade",
      }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [uniqueIndex("unique_enrollment").on(table.studentId, table.classId)]
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
  studentId: integer("student_id")
    .notNull()
    .references(() => students.id),
  classId: integer("class_id").references(() => classes.id),
  assignedBy: text("assigned_by").references(() => user.id),
  taskTypeId: integer("task_type_id").references(() => taskTypes.id),
  status: taskStatusEnum("status").default("assigned"),
  dueDate: date("due_date"),
  completedOn: date("completed_on"),
  completedBy: text("completed_by").references(() => user.id),
  startingAyahId: integer("starting_ayah_id").references(() => ayah.id),
  endingAyahId: integer("ending_ayah_id").references(() => ayah.id),
  notes: text("notes"),
  mistakes: integer("mistakes"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const attendance = pgTable(
  "attendance",
  {
    id: serial("id").primaryKey(),
    studentId: integer("student_id").references(() => students.id),
    teacherId: text("teacher_id").references(() => user.id),
    classId: integer("class_id").references(() => classes.id),
    date: date("date").notNull(),
    status: attendanceStatusEnum("status").notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [uniqueIndex("unique_student_date").on(table.studentId, table.date)]
);

// Relations
export const usersRelations = relations(user, ({ many }) => ({
  childrenStudents: many(students, { relationName: "parent" }),
  ownStudentRecord: many(students, { relationName: "user" }),
  teachingClasses: many(classes),
  assignedTasks: many(tasks),
  recordedAttendance: many(attendance),
}));

export const studentsRelations = relations(students, ({ one, many }) => ({
  parent: one(user, {
    fields: [students.parentId],
    references: [user.id],
    relationName: "parent",
  }),
  user: one(user, {
    fields: [students.userId],
    references: [user.id],
    relationName: "user",
  }),
  enrollments: many(enrollments),
  tasks: many(tasks),
  attendance: many(attendance),
}));

export const ageGroupRelations = relations(ageGroup, ({ many }) => ({
  classes: many(classes),
}));

export const classesRelations = relations(classes, ({ one, many }) => ({
  teacher: one(user, {
    fields: [classes.teacherId],
    references: [user.id],
  }),
  ageGroupRef: one(ageGroup, {
    fields: [classes.ageGroup],
    references: [ageGroup.id],
  }),
  enrollments: many(enrollments),
}));

export const enrollmentsRelations = relations(enrollments, ({ one }) => ({
  student: one(students, {
    fields: [enrollments.studentId],
    references: [students.id],
  }),
  class: one(classes, {
    fields: [enrollments.classId],
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
  assignedBy: one(user, {
    fields: [tasks.assignedBy],
    references: [user.id],
  }),
  completedBy: one(user, {
    fields: [tasks.completedBy],
    references: [user.id],
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
  teacher: one(user, {
    fields: [attendance.teacherId],
    references: [user.id],
  }),
  classRef: one(classes, {
    fields: [attendance.classId],
    references: [classes.id],
  }),
}));

// Exporting the schema
export const schema = {
  students,
  ageGroup,
  classes,
  enrollments,
  surah,
  ayah,
  taskTypes,
  tasks,
  attendance,
  user,
  verification,
  session,
  account,
};
