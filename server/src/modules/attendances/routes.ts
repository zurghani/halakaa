import { Hono } from "hono";
import * as attendancesController from "./controller";
import { requireRoles } from "@/middleware/requireRole";

const attendances = new Hono();

attendances.get("/", requireRoles(["admin", "teacher"]), attendancesController.getAll); // Get Attendance by Filters
attendances.post("/", requireRoles(["teacher"]), attendancesController.create); // Create Attendance
attendances.put("/:id", requireRoles(["admin", "teacher"]), attendancesController.update); // Update Attendance
attendances.delete("/:id", requireRoles(["admin"]), attendancesController.remove); // Delete Attendance

export default attendances;
