import { Hono } from "hono";
import { requireRoles } from "@/middleware/requireRole";
import * as ayahsService from "./service";
import type { AuthType } from "@/types";

/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/
const ayahs = new Hono<{ Variables: AuthType }>()
  .get("/", requireRoles({ ayahs: ["view"] }), async (c) => {
    const surahId = Number(c.req.query("surah_id"));
    const ayahNumber = Number(c.req.query("number"));
    const like = c.req.query("like");
    
    if (like) {
      const ayahs = await ayahsService.getAyahsLike(like);
      return c.json(ayahs || []);
    }
    
    if (surahId && ayahNumber) {
      const ayahs = await ayahsService.getAyahBySurahAndNumber(surahId, ayahNumber);
      return c.json(ayahs || []);
    }
    
    if (surahId) {
      const ayahs = await ayahsService.getAyahsBySurah(surahId);
      return c.json(ayahs || []);
    }
    
    const ayahs = await ayahsService.getAllAyahs();
    return c.json(ayahs || []);
  })
  
  .get("/:id", requireRoles({ ayahs: ["view"] }), async (c) => {
    const id = c.req.param("id");
    const ayah = await ayahsService.getAyahById(parseInt(id));
    
    if (!ayah) {
      return c.json({ error: "Ayah not found" }, 404);
    }
    
    return c.json(ayah);
  });

export default ayahs;
