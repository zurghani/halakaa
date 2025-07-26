import { Hono } from "hono";
import * as usersController from "./controller";
import { requireRoles } from "@/middleware/requireRole";

const users = new Hono();

/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/

users.get("/", requireRoles(["admin"]), usersController.getAll);
users.get("/:id", requireRoles(["admin"]), usersController.getById);
users.get("/me", requireRoles(["admin"]), usersController.getSelf);
users.post("/", requireRoles(["admin"]), usersController.create);
users.put("/:id", requireRoles(["admin"]), usersController.update);
users.delete("/:id", requireRoles(["admin"]), usersController.remove);

export default users;
