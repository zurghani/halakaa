import { AttendanceStatus, SupportedLanguage, UserRole } from "../types";

export type User = {
    uuid: string | null;
    name: string | null;
    email: string | null;
    phone?: string | null;
    langauge?: SupportedLanguage | null;
    role: UserRole | null;
};
