import { createAccessControl, type SubArray } from "better-auth/plugins/access";
import { defaultStatements } from "better-auth/plugins/admin/access"; // <-- path fix

export const allActions = ["view", "create", "update", "delete"] as SubArray<
  ["view", "create", "update", "delete"]
>;

export const statement = {
  ...defaultStatements, // includes user/session admin resources
  students: allActions,
  classes: allActions,
  enrollments: allActions,
  attendances: allActions,
  tasks: allActions,
  taskTypes: allActions,
  ageGroups: allActions,
  ayahs: ["view"],
  surahs: ["view"],
} as const;

export const ac = createAccessControl(statement);

// Map each resource key -> allowed action array
export type AppPermission = Partial<{
  [K in keyof typeof statement]: (typeof statement)[K][number][];
}>;
