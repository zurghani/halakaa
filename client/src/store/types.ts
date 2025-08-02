export enum UserRole {
    All = "all",
    Admin = "admin",
    Teacher = "teacher",
    Parent = "parent",
    Student = "student",
}
export enum SupportedLanguage {
    English = "en",
    Arabic = "ar",
}
export type User = {
    uuid: string | null;
    name: string | null;
    email: string | null;
    phone?: string | null;
    langauge?: SupportedLanguage | null;
    role: UserRole | null;
};
export enum AttendanceStatus {
    Present = "present",
    Absent = "absent",
    Late = "late",
}

export type Student = {
    id: string | null;
    uuid?: User["uuid"];
    name: string | null;
    dateOfBirth?: string | null;
    age?: number | null;
    gender?: string | null;
    parentId?: Parent["uuid"] | null;
    attendance?: {
        teacherId: Teacher["uuid"];
        date: string;
        status: AttendanceStatus;
    }[];
}; //& User; ?

export type Parent = {
    uuid: User["uuid"];
    name: User["name"];
    students?: { id: Student["id"]; name: Student["name"] }[];
};

export type Classes = {
    id: string | null;
    teacherId?: Teacher["uuid"];
    description?: string;
    time: {
        start?: string;
        end?: string;
    };
    ageGroup?: string;
    students: { id: Student["id"]; name: Student["name"] }[] | [];
};
export type Teacher = {
    classes: Classes["id"][];
} & User;

export enum Origin {
    Makki = "makki",
    Madani = "madani",
}
export type Surah = {
    id: number;
    name: string;
    origin?: Origin;
    ayahs?: Ayah[];
};
export type Ayah = {
    id: number;
    surahId?: Surah["id"];
    surahName?: Surah["name"];
    number?: number;
    text?: string;
};
export enum TaskType {
    Reciting = "reciting",
    Memorization = "memorization",
    Revision = "revision",
}
export enum TaskStatus {
    Assigned = "assigned",
    Completed = "completed",
}

export type Task = {
    id: string;
    title: string;
    type: TaskType;
    status: TaskStatus;
    studentId: Student["id"];
    teacherId: Teacher["uuid"];
    ayahs: {
        from: string; //switched to string from Ayah for now
        to: string; //switched to string from Ayah for now
    };
    classId: Classes["id"];
    mistakes?: number;
    notes?: string;
    assignedOn?: string;
    dueDate?: string;
    completedOn?: string;
    completedBy?: Teacher["uuid"];
};
