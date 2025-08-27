import { Hono } from "hono";
import { requireRoles } from "@/middleware/requireRole";
import * as surahsService from "./service";
import type { AuthType } from "@/types";

/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/
const surahs = new Hono<{ Variables: AuthType }>()
  .get("/", async (c) => {
    const subString = c.req.query("like");
    if (subString) {
      const surahs = await surahsService.getSurahLike(subString);
      return c.json(surahs || []);
    }
    const surahs = await surahsService.getAllSurahs();
    return c.json(surahs || []);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const surah = await surahsService.getSurahById(parseInt(id));

    if (!surah) {
      return c.json({ error: "Surah not found" }, 404);
    }

    return c.json(surah);
  });

export default surahs;
