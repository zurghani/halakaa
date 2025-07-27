import type { Handler } from "hono";
import { loginService } from "./service";

export const loginController: Handler = async (c) => {
    const body = await c.req.json();
    const { email, password } = body;

    const result = await loginService(email, password, c.env.JWT_SECRET);

    if (!result) {
        return c.json({ message: "Invalid credentials" }, 401);
    }

    return c.json({ token: result });
};
