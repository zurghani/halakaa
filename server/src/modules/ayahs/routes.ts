import { Hono } from "hono";
import * as ayahsController from "./controller";

const ayahs = new Hono();
/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/
ayahs.get("/", ayahsController.getAll);
ayahs.get("/:id", ayahsController.getById);

export default ayahs;
