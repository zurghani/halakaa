import { Hono } from "hono";
import * as ayahsController from "./controller";
import { requireRoles } from "@/middleware/requireRole";

/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/
const ayahs = new Hono()
  .get("/", requireRoles({ ayahs: ["view"] }), ayahsController.getAll)
  .get("/:id", requireRoles({ ayahs: ["view"] }), ayahsController.getById);

export default ayahs;
