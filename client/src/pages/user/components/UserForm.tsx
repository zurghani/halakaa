import { Form, FormInstance, Input, Segmented, Select } from "antd";
import ChildrenTable from "./ChildrenTable";
import { useTranslation } from "react-i18next";
import { User } from "../types";

export interface UserFormProps {
    disabled?: boolean;
    defaultValues?: User;
    form: FormInstance;
    onSubmit?: (data: any) => void;
}
export const UserForm: React.FC<UserFormProps> = ({
    disabled = false,
    defaultValues,
    onSubmit,
    form,
}) => {
    const { t } = useTranslation();
    const showChildrenTable = defaultValues?.role === "parent" && (disabled || !!defaultValues?.id);

    return (
        <Form
            form={form}
            layout="vertical"
            style={{ padding: "20px", maxWidth: "40rem" }}
            onFinish={onSubmit}
            initialValues={defaultValues}>
            <Form.Item
                name="fullName"
                label={t("forms.fullName")}
                rules={[{ required: true, message: t("forms.required.fullName") }]}>
                <Input disabled={disabled} />
            </Form.Item>
            <Form.Item
                name="email"
                label={t("forms.email")}
                rules={[
                    { required: true, message: t("forms.required.email") },
                    { type: "email", message: t("forms.invalid.email") },
                ]}>
                <Input disabled={disabled} />
            </Form.Item>
            <Form.Item
                name="phone"
                label={t("forms.phone")}
                rules={[{ required: true, message: t("forms.required.phone") }]}>
                <Input disabled={disabled} />
            </Form.Item>
            <Form.Item
                name="language"
                label={t("forms.language")}
                rules={[{ required: true, message: t("forms.required.language") }]}>
                <Segmented
                    disabled={disabled}
                    options={[
                        { value: "en", label: t("forms.selectLanguage.english") },
                        { value: "ar", label: t("forms.selectLanguage.arabic") },
                    ]}
                />
            </Form.Item>
            <Form.Item
                name="role"
                label={t("forms.role")}
                rules={[{ required: true, message: t("forms.required.role") }]}>
                <Select
                    disabled={disabled}
                    options={[
                        { label: t("forms.selectRole.admin"), value: "admin" },
                        { label: t("forms.selectRole.teacher"), value: "teacher" },
                        { label: t("forms.selectRole.parent"), value: "parent" },
                    ]}
                />
            </Form.Item>
            {showChildrenTable && (
                <Form.Item label={t("forms.children")}>
                    <ChildrenTable
                        childrenData={defaultValues.children || []}
                        onDelete={(id) => {
                            console.log("Delete child with id:", id);
                        }}
                    />
                </Form.Item>
            )}
        </Form>
    );
};
