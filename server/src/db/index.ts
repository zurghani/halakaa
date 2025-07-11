import { drizzle } from "drizzle-orm/postgres-js";
import { schema } from "./schema";
import postgres from "postgres";

// Create postgres connection
const sql = postgres(process.env.DATABASE_URL!);

// Create drizzle instance
export const db = drizzle(sql, { schema });
