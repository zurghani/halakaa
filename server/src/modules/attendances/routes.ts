import { Hono } from "hono";
import * as attendancesController from "./controller";
import { requireRoles } from "@/middleware/requireRole";

const attendances = new Hono();

attendances.get("/", attendancesController.getAll); // Get Attendance by Filters
attendances.post("/", attendancesController.update); // Update Attendance
attendances.delete("/:id", attendancesController.remove); // Delete Attendance

export default attendances;
