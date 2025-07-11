import { serve } from "@hono/node-server";
import { Hono } from "hono";
import routes from "./Routes";

import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
const db = drizzle(process.env.DATABASE_URL!);

const app = new Hono();

serve(
    {
        fetch: app.fetch,
        port: 4000,
    },
    (info) => {
        console.log(`Server is running on http://localhost:${info.port}`);
    }
);

routes.forEach((resource) => {
    app.route(resource.route, resource.handler);
});
