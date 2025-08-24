import { sql } from "drizzle-orm";
import { db } from ".";

await db.transaction(async (tx) => {
  await tx.execute(
    sql`DROP TABLE IF EXISTS "user","account","session","verification","students","age_group","classes","enrollments","task_types","tasks","attendance","surah","ayah" CASCADE`
  );
});

console.log("✅ Reset Done.");
process.exit(0);
