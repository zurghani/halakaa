import { Hono } from "hono";
import { requireRoles } from "@/middleware/requireRole";
import * as taskTypesService from "./service";
import type { AuthType } from "@/types";

/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/
const taskTypes = new Hono<{ Variables: AuthType }>()
  .get("/", requireRoles({ taskTypes: ["view"] }), async (c) => {
    const taskTypes = await taskTypesService.getAllTaskTypes();
    return c.json(taskTypes || []);
  })
  .get("/:id", requireRoles({ taskTypes: ["view"] }), async (c) => {
    const id = c.req.param("id");
    const taskType = await taskTypesService.getTaskTypeById(parseInt(id));
    
    if (!taskType) {
      return c.json({ error: "Task type not found" }, 404);
    }
    
    return c.json(taskType);
  })
  .post("/", requireRoles({ taskTypes: ["create"] }), async (c) => {
    const body = await c.req.json();
    const result = await taskTypesService.createTaskType(body);
    return c.json(result, 201);
  })
  .delete("/:id", requireRoles({ taskTypes: ["delete"] }), async (c) => {
    const id = c.req.param("id");
    
    const existingTaskType = await taskTypesService.getTaskTypeById(parseInt(id));
    if (!existingTaskType) {
      return c.json({ error: "Task type not found" }, 404);
    }
    
    await taskTypesService.deleteTaskType(parseInt(id));
    return c.json({
      message: `Task type ${id} deleted successfully`,
    });
  });

export default taskTypes;
