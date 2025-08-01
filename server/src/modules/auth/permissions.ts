import { ac, allActions } from "./access-controller";

export const admin = ac.newRole({
  students: allActions,
  classes: allActions,
  enrollments: allActions,
  attendances: allActions,
  tasks: allActions,
  taskTypes: allActions,
  ayahs: ["view"],
  surahs: ["view"],
  ageGroups: ["view"],
});

export const teacher = ac.newRole({
  students: ["view", "create", "update"],
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
