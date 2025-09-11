import { db } from "@/db";
import { ayah, surah, tasks, taskTypes, user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getAyahReferences, type AyahReference } from "../ayahs/service";
import { alias } from "drizzle-orm/pg-core";

export type Task = typeof tasks.$inferSelect;
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
export type NewTask = typeof tasks.$inferInsert;
export type UpdateTask = Partial<NewTask>;

export const createTask = async (task: NewTask): Promise<Task> => {
  const [newTask] = await db.insert(tasks).values(task).returning();
  return newTask!;
};

export const getTasksByStudentId = async (studentId: number): Promise<TaskExpanded[]> => {
  const assignedByUser = alias(user, "assignedByUser");
  const completedByUser = alias(user, "completedByUser");

  // Fetch base task data
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

  // Collect all ayah IDs that appear in any task
  const ayahIds = [
    ...new Set(data.flatMap((t) => [t.startingAyahId, t.endingAyahId]).filter(Boolean) as number[]),
  ];

  // Get references for all unique ayah IDs
  const ayahRefs: AyahReference[] = ayahIds.length ? await getAyahReferences(ayahIds) : [];

  // Map ayahId -> AyahReference for quick lookup
  const ayahMap = new Map<number, AyahReference>(
    ayahRefs.map((ref) => [ref.id, ref]) // important: use ref.id because AyahReference.id is ayah id
  );

  // Build final tasks with AyahReference objects
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
