import { FormInstance } from "antd";
import { UserRole } from "../../store/types";

export type User = {
    fullName: string;
    id?: string | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    language?: "en" | "ar" | null | undefined;
    createdAt?: Date | null | undefined;
    role?: UserRole | null | undefined; //ADDED FOR NOW
    children?: { id: string; fullName: string; ageGroup: string }[]; // ADDED FOR NOW
};


export interface UserListItem extends User {
    key: string;
    role: UserRole;
}

export const rolesObject = [UserRole.All, UserRole.Admin, UserRole.Teacher, UserRole.Parent];

export interface UserFormProps {
    disabled?: boolean;
    defaultValues?: User;
    form: FormInstance;
    onSubmit?: (data: any) => void;
}

export type UserSearchOptionsType = {
    name: { value: "name"; label: string };
    email: { value: "email"; label: string };
    phone: { value: "phone"; label: string };
};
