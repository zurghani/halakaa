import { Hono } from "hono";
import { requireRoles } from "@/middleware/requireRole";
import * as tasksService from "./service";
import type { AuthType } from "@/types";

/*
GET    => READ
POST   => CREATE
DELETE => DELETE
PUT    => UPDATE
*/
const tasks = new Hono<{ Variables: AuthType }>()
  .get("/", requireRoles({ tasks: ["view"] }), async (c) => {
    const studentId = Number(c.req.query("student_id"));
    
    if (studentId) {
      const tasks = await tasksService.getTasksByStudentId(studentId);
      return c.json(tasks || []);
    }
    
    // If no student_id provided, return empty array or all tasks based on your business logic
    return c.json([]);
  })
  
  .get("/:id", requireRoles({ tasks: ["view"] }), async (c) => {
    const id = c.req.param("id");
    const task = await tasksService.getTaskById(parseInt(id));
    
    if (!task) {
      return c.json({ error: "Task not found" }, 404);
    }
    
    return c.json(task);
  })
  
  .post("/", requireRoles({ tasks: ["create"] }), async (c) => {
    const body = await c.req.json();
    const result = await tasksService.createTask(body);
    return c.json(result, 201);
  })
  
  .put("/:id", requireRoles({ tasks: ["update"] }), async (c) => {
    const id = c.req.param("id");
    const body = await c.req.json();
    
    const existingTask = await tasksService.getTaskById(parseInt(id));
    if (!existingTask) {
      return c.json({ error: "Task not found" }, 404);
    }
    
    const updatedTask = await tasksService.updateTask(parseInt(id), body);
    return c.json(updatedTask);
  })
  
  .delete("/:id", requireRoles({ tasks: ["delete"] }), async (c) => {
    const id = c.req.param("id");
    
    const existingTask = await tasksService.getTaskById(parseInt(id));
    if (!existingTask) {
      return c.json({ error: "Task not found" }, 404);
    }
    
    await tasksService.deleteTask(parseInt(id));
    return c.json({
      message: `Task ${id} deleted successfully`,
    });
  });

export default tasks;
