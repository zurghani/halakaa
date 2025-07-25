import { Hono } from "hono";
import * as rolesController from "./controller";
import { requireRoles } from "@/middleware/requireRole";

const roles = new Hono();
/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/
roles.get("/", requireRoles(["admin"]), rolesController.getAll);
roles.get("/:id", requireRoles(["admin"]), rolesController.getById);
roles.post("/", requireRoles(["admin"]), rolesController.create);
roles.delete("/:id", requireRoles(["admin"]), rolesController.remove);

export default roles;
