// roles.ts
import { adminAc } from "better-auth/plugins/admin/access"; // <-- path fix
import { ac, allActions } from "./access-controller";

export const admin = ac.newRole({
  ...adminAc.statements,
  students: allActions,
  classes: allActions,
  enrollments: allActions,
  attendances: allActions,
  tasks: allActions,
  taskTypes: allActions,
  ageGroups: allActions,
  ayahs: ["view"],
  surahs: ["view"],
});

export const teacher = ac.newRole({
  students: ["view"],
  classes: ["view"],
  enrollments: ["view", "create", "update"],
  attendances: ["view", "create", "update"],
  tasks: ["view", "create", "update"],
  taskTypes: ["view"],
  ayahs: ["view"],
  surahs: ["view"],
  ageGroups: ["view"],
});

export const parent = ac.newRole({
  students: ["view"],
  attendances: ["view"],
  classes: ["view"],
  tasks: ["view"],
  ayahs: ["view"],
  surahs: ["view"],
  ageGroups: ["view"],
});

export const student = ac.newRole({
  students: ["view"],
  classes: ["view"],
  tasks: ["view"],
  ayahs: ["view"],
  surahs: ["view"],
  ageGroups: ["view"],
});
