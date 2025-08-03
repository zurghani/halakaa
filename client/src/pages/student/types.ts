import { FormInstance } from "antd";
import { Dayjs } from "dayjs";

export type Student = {
    fullName: string;
    gender: "male" | "female";
    id?: number | undefined;
    createdAt?: Date | null | undefined;
    parentId?: string | null | undefined;
    userId?: string | null | undefined;
    dateOfBirth?: string | Dayjs | undefined;
}

export interface StudentFormProps {
    disabled?: boolean;
    defaultValues?: Student;
    form: FormInstance;
    onSubmit?: (data: any) => void;
}