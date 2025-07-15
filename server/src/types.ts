export const ROLES = ["admin", "teacher", "parent"] as const;
export type Role = (typeof ROLES)[number];
