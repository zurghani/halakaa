


export type Class = {
    id?: number | undefined;
    createdAt?: Date | null | undefined;
    teacherId?: string | null | undefined;
    startsAt?: string | null | undefined;
    endsAt?: string | null | undefined;
    description?: string | null | undefined;
    ageGroup?: number | null | undefined;
}

export type Enrollment = {
    classId: number;
    studentId: number;
    id: number
    studentName?: string | null | undefined; //TEMP ADDED UNTIL FIGURE OUT
    createdAt?: Date | null | undefined;
}

export type Student = {
    fullName: string;
    gender: "male" | "female";
    id: number
    createdAt?: Date | null | undefined;
    parentId?: string | null | undefined;
    userId?: string | null | undefined;
    dateOfBirth?: string | null | undefined;
}