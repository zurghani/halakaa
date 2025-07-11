import { db } from "@/db";
import { students } from "@/db/schema";

export const getAllStudents = async () => {
    return await db.select().from(students);
};
