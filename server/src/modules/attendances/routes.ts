import { Hono } from "hono";
import * as attendancesController from "./controller";
import { requireRoles } from "@/middleware/requireRole";

const attendances = new Hono()
  .get("/", requireRoles({ attendances: ["view"] }), attendancesController.getAll)
  .post("/", requireRoles({ attendances: ["update"] }), attendancesController.update)
  .delete("/:id", requireRoles({ attendances: ["delete"] }), attendancesController.remove);
export default attendances;
