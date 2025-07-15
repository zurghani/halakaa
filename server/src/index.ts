import { serve } from "@hono/node-server";
import { Hono } from "hono";
import routes from "./Routes";
import "dotenv/config";

const app = new Hono();

app.use("*", async (c, next) => {
    console.log(`${c.req.method} ${c.req.url} [${new Date().toISOString()}]`);
    console.log("Request Headers:", c.req.header);
    console.log("Request Body:", await c.req.text());
    console.log("\n****************************\n");
    await next();
});

routes.forEach((route) => {
    app.route(route.route, route.handler);
});

serve(
    {
        fetch: app.fetch,
        port: 4000,
    },
    (info) => {
        console.log(`Server is running on http://localhost:${info.port}`);
    }
);
