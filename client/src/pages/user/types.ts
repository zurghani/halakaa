export type User = {
    fullName: string;
    id?: string | undefined;
    email?: string | null | undefined;
    phone?: string | null | undefined;
    language?: "en" | "ar" | null | undefined;
    createdAt?: Date | null | undefined;
};
export interface UserFormProps {
    disabled?: boolean;
    defaultValues?: User;
    onSubmit?: (data: any) => void;
}
