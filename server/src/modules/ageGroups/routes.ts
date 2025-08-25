import { Hono } from "hono";
import { requireRoles } from "@/middleware/requireRole";
import * as ageGroupsService from "./service";
import type { AuthType } from "@/types";

/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/

const ageGroups = new Hono<{ Variables: AuthType }>()
  .get("/", requireRoles({ ageGroups: ["view"] }), async (c) => {
    const ageGroups = await ageGroupsService.getAllAgeGroups();
    return c.json(ageGroups || []);
  })

  .get("/:id", requireRoles({ ageGroups: ["view"] }), async (c) => {
    const id = c.req.param("id");
    const group = await ageGroupsService.getAgeGroupById(parseInt(id));

    if (!group) {
      return c.json({ error: "Age group not found" }, 404);
    }

    return c.json(group);
  })

  .post("/", requireRoles({ ageGroups: ["create"] }), async (c) => {
    const body = await c.req.json();

    if (body.from > body.to) {
      return c.json({ error: "Invalid age group: 'from' must be less than 'to'" }, 400);
    }

    const result = await ageGroupsService.createAgeGroup(body);
    return c.json(result, 201);
  })

  .delete("/:id", requireRoles({ ageGroups: ["delete"] }), async (c) => {
    const id = c.req.param("id");

    // Check if age group exists before deleting
    const existingGroup = await ageGroupsService.getAgeGroupById(parseInt(id));
    if (!existingGroup) {
      return c.json({ error: "Age group not found" }, 404);
    }

    await ageGroupsService.deleteAgeGroup(parseInt(id));

    return c.json({
      message: `Age Group ${id} deleted successfully`,
    });
  });

export default ageGroups;
