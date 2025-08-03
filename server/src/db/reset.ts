import { sql } from "drizzle-orm";
import { db } from ".";

await db.transaction(async (tx) => {
    await tx.execute(
        sql`TRUNCATE TABLE "roles", "users","user_roles","students","age_group","classes","enrollments","task_types","tasks","attendance","surah","ayah" RESTART IDENTITY CASCADE`
    );
});

console.log("✅ Reset Done.");
process.exit(0);
