import { Hono } from "hono";
// import * as ageGroupsController from "./controller";
import { requireRoles } from "@/middleware/requireRole";
import * as ageGroupsService from "./service";

/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/

const ageGroups = new Hono()
  .get("/", requireRoles({ ageGroups: ["view"] }), async (c) => {
    const ageGroups = await ageGroupsService.getAllAgeGroups();

    return c.json(ageGroups);
  })

  .get("/:id", requireRoles({ ageGroups: ["view"] }), async (c) => {
    const id = c.req.param("id");
    const group = await ageGroupsService.getAgeGroupById(parseInt(id));

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

    await ageGroupsService.deleteAgeGroup(parseInt(id));

    return c.json({
      message: `Age Group ${c.req.param("id")} deleted successfully`,
    });
  });

export default ageGroups;
