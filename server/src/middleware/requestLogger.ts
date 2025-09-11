import type { MiddlewareHandler } from "hono";

export const loggerMiddleware: MiddlewareHandler = async (c, next) => {
    console.log(`${c.req.method} ${c.req.url} [${new Date().toISOString()}]`);
    console.log("Request Headers:", c.req.header);
    console.log("Request Body:", await c.req.text());
    console.log("\n*******************************\n");
    await next();
};
