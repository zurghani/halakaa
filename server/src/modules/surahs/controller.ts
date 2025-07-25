import type { Handler } from "hono";
import * as surahsService from "./service"


export const getAll: Handler = async (c) => {
    const surahs = await surahsService.getAllSurahs();
    return c.json(surahs);
};

export const getById: Handler = async (c) => {
    const id = c.req.param("id");
    const surah = await surahsService.getSurahById(parseInt(id));
    return c.json(surah);
};