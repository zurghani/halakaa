import { FormInstance } from "antd";
import { Dayjs } from "dayjs";
import { Student } from "../../types";

export interface StudentFormProps {
    disabled?: boolean;
    defaultValues?: Student;
    form: FormInstance;
    onSubmit?: (data: any) => void;
}
