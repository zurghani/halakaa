import { db } from "@/db";
import { ayah, surah, tasks, taskTypes, user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getAyahReferences } from "../ayahs/service";
import { alias } from "drizzle-orm/pg-core";

export type Task = typeof tasks.$inferSelect;
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
export type NewTask = typeof tasks.$inferInsert;
export type UpdateTask = Partial<NewTask>;

export const createTask = async (task: NewTask): Promise<Task> => {
  const [newTask] = await db.insert(tasks).values(task).returning();
  return newTask!;
};

export const getTasksByStudentId = async (studentId: number): Promise<TaskExpanded[]> => {
  const assignedByUser = alias(user, "assignedByUser");
  const completedByUser = alias(user, "completedByUser");

  const data = await db
    .select({
      id: tasks.id,
      createdAt: tasks.createdAt,
      studentId: tasks.studentId,
      classId: tasks.classId,
      assignedBy: {
        id: assignedByUser.id,
        name: assignedByUser.name,
      },
      taskTypeId: tasks.taskTypeId,
      status: tasks.status,
      dueDate: tasks.dueDate,
      completedOn: tasks.completedOn,
      completedBy: {
        id: completedByUser.id,
        name: completedByUser.name,
      },
      startingAyahId: tasks.startingAyahId,
      endingAyahId: tasks.endingAyahId,
      notes: tasks.notes,
      mistakes: tasks.mistakes,
      taskType: {
        id: taskTypes.id,
        name: taskTypes.name,
      },
    })
    .from(tasks)
    .leftJoin(taskTypes, eq(tasks.taskTypeId, taskTypes.id))
    .leftJoin(assignedByUser, eq(tasks.assignedBy, assignedByUser.id))
    .leftJoin(completedByUser, eq(tasks.completedBy, completedByUser.id))
    .where(eq(tasks.studentId, studentId));

  const ayahIds = [
    ...new Set(data.flatMap((t) => [t.startingAyahId, t.endingAyahId].filter(Boolean)) as number[]),
  ];

  //TODO: optimize this
  const ayahRefs = ayahIds.length ? await getAyahReferences(ayahIds) : [];

  const ayahMap = new Map(ayahRefs.map((ref) => [ref.ayahId, ref]));

  return data.map((t) => ({
    ...t,
    taskType: t.taskType ? { id: t.taskType.id, name: t.taskType.name } : null,
    startingAyah: t.startingAyahId ? (ayahMap.get(t.startingAyahId) ?? null) : null,
    endingAyah: t.endingAyahId ? (ayahMap.get(t.endingAyahId) ?? null) : null,
  }));
};

export const getTaskById = async (id: number): Promise<Task | undefined> => {
  const [task] = await db.select().from(tasks).where(eq(tasks.id, id));
  return task;
};

export const updateTask = async (id: number, updates: UpdateTask): Promise<Task | undefined> => {
  const [updatedTask] = await db.update(tasks).set(updates).where(eq(tasks.id, id)).returning();
  return updatedTask;
};

export const deleteTask = async (id: number): Promise<void> => {
  await db.delete(tasks).where(eq(tasks.id, id));
};
