import { FormInstance } from "antd";
import { Dayjs } from "dayjs";
import { Student, StudentFormValues } from "../../types";

export interface StudentFormProps {
    disabled?: boolean;
    defaultValues?: StudentFormValues;
    form: FormInstance;
    onSubmit?: (data: any) => void;
}
