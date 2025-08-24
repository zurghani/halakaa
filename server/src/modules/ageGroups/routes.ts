import { Hono } from "hono";
import * as ageGroupsController from "./controller";
import { requireRoles } from "@/middleware/requireRole";

/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/

const ageGroups = new Hono()
  .get("/", requireRoles({ ageGroups: ["view"] }), ageGroupsController.getAll)
  .get("/:id", requireRoles({ ageGroups: ["view"] }), ageGroupsController.getById)
  .post("/", requireRoles({ ageGroups: ["create"] }), ageGroupsController.create)
  .delete("/:id", requireRoles({ ageGroups: ["delete"] }), ageGroupsController.deleteById);

export default ageGroups;
