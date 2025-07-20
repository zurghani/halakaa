import { Hono } from "hono";
import * as attendanceController from "./controller";
import { requireRoles } from "@/middleware/requireRole";

const attendance = new Hono();

attendance.get("/", requireRoles(["admin","teacher"]), attendanceController.getAll); // Get Attendance by Filters
attendance.post("/", requireRoles(["teacher"]), attendanceController.create); // Create Attendance
attendance.put("/:id", requireRoles(["admin", "teacher"]), attendanceController.update); // Update Attendance
attendance.delete("/:id", requireRoles(["admin"]), attendanceController.remove); // Delete Attendance