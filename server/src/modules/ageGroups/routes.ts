import { Hono } from "hono";
import * as ageGroupsController from "./controller";
import { requireRoles } from "@/middleware/requireRole";

const ageGroups = new Hono();
/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/
ageGroups.get("/", requireRoles(["admin", "teacher"]), ageGroupsController.getAll);
ageGroups.get("/:id", requireRoles(["admin", "teacher"]), ageGroupsController.getById);
ageGroups.post("/", requireRoles(["admin"]), ageGroupsController.create);
ageGroups.delete("/:id", requireRoles(["admin"]), ageGroupsController.remove);

export default ageGroups;