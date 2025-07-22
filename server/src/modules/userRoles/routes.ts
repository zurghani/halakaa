import { Hono } from "hono";
import * as userRolesController from "./controller";
import { requireRoles } from "@/middleware/requireRole";

const userRoles = new Hono();
/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/
userRoles.get("/", requireRoles(["admin", "teacher"]), userRolesController.getAll);
userRoles.post("/", requireRoles(["admin"]), userRolesController.create);
userRoles.delete("/:id", requireRoles(["admin"]), userRolesController.remove);

export default userRoles;
