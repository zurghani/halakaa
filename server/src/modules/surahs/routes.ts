import { Hono } from "hono";
import * as surahsController from "./controller";
import { requireRoles } from "@/middleware/requireRole";

const surahs = new Hono();
/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/
surahs.get("/", surahsController.getAll);
surahs.get("/:id", surahsController.getById);

export default surahs;
