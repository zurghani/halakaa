import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { loggerMiddleware } from "./middleware/requestLogger";
import routes from "./Routes";
import "dotenv/config";

const app = new Hono();

app.use("*", loggerMiddleware);

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
