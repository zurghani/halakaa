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
    const idsAyahs = c.req.query("ids");

    if (like) {
      const ayahs = await ayahsService.getAyahsLike(like);
      return c.json(ayahs || []);
    }

    if (idsAyahs) {
      const ids = idsAyahs
        .split(",")
        .map((id) => id.trim())
        .map((id) => parseInt(id));
      const ayahs = await ayahsService.getAyahsByIds(ids);
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
  .get("/references", requireRoles({ ayahs: ["view"] }), async (c) => {
    const idsParam = c.req.query("ids");

    if (!idsParam) return c.json([], 200);

    const ids = idsParam
      .split(",")
      .map((id) => id.trim())
      .map((id) => parseInt(id));

    if (ids.length === 0) return c.json([], 200);

    const refs = await ayahsService.getAyahReferences(ids);
    return c.json(refs);
  })
  .get("/:id", requireRoles({ ayahs: ["view"] }), async (c) => {
    const id = c.req.param("id");
    const ayah = await ayahsService.getAyahById(parseInt(id));

    if (!ayah) {
      return c.json({ error: "Ayah not found" }, 404);
    }

    return c.json(ayah);
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
