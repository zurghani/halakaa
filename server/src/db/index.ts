import { drizzle } from "drizzle-orm/postgres-js";
import { schema } from "./schema";
import postgres from "postgres";
import dotenv from "dotenv";
dotenv.config();

// Ensure DATABASE_URL is set
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
}
// Create postgres connection
const sql = postgres(process.env.DATABASE_URL!);

// Create drizzle instance
export const db = drizzle(sql, { schema });
