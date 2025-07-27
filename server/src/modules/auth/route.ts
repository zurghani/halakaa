import { Hono } from "hono";
import { loginController } from "./controller";

const auth = new Hono();

auth.post("/login", loginController);

export default auth;
