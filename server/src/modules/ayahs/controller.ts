import type { Handler } from "hono";
import * as ayahsService from "./service";

export const getAll: Handler = async (c) => {

    const surahId = Number(c.req.query("surah_id"));
    const ayahNumber = Number(c.req.query("number"));
    const like = c.req.query("like");
    let ayahs: ayahsService.Ayah[] = []
    if(like) {
        ayahs = await ayahsService.getAyahsLike(like);
        return c.json(ayahs)
    }
    if(surahId && ayahNumber) {
        ayahs = await ayahsService.getAyahBySurahAndNumber(surahId, ayahNumber);
        return c.json(ayahs)
    }
    if(surahId) {
        ayahs = await ayahsService.getAyahsBySurah(surahId);
        return c.json(ayahs)
    }
    ayahs = await ayahsService.getAllAyahs();
    return c.json(ayahs)
    
};

export const getById: Handler = async (c) => {
    const id = c.req.param("id");
    const ayah = await ayahsService.getAyahById(parseInt(id));
    return c.json(ayah);
};