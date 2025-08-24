import { createAccessControl, type SubArray } from "better-auth/plugins/access";

export const allActions =  ["view", "create", "update", "delete"] as SubArray<["view", "create", "update", "delete"]>;

const statement = {
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


export type AppPermission = Partial<{
  [K in keyof typeof statement]: (typeof statement[K])[number][];
}>;


