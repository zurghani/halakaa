// StudentForm.tsx
import { DatePicker, Form, Input, Segmented, Select } from "antd";
import { StudentFormProps } from "../types";
import { useTranslation } from "react-i18next";

export const StudentForm: React.FC<StudentFormProps> = ({
    disabled = false,
    defaultValues = { gender: "male" },
    onSubmit,
    form,
}) => {
    const { t } = useTranslation();

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
                name="dateOfBirth"
                label={t("forms.dob")}
                rules={[{ required: true, message: t("forms.required.dob") }]}>
                <DatePicker disabled={disabled} />
            </Form.Item>

            <Form.Item
                name="gender"
                label={t("forms.gender")}
                rules={[{ required: true, message: t("forms.required.gender") }]}>
                <Segmented
                    disabled={disabled}
                    defaultValue="male"
                    options={[
                        { value: "male", label: t("forms.selectGender.male") },
                        { value: "female", label: t("forms.selectGender.female") },
                    ]}
                />
            </Form.Item>

            <Form.Item
                name="parentId"
                label={t("forms.parent")}
                rules={[{ required: false, message: t("forms.required.parent") }]}>
                <Select
                    disabled={disabled}
                    showSearch
                    placeholder={t("forms.selectParent")}
                    options={[
                        { label: "Mohamed", value: "mohamed" },
                        { label: "Ahmed", value: "ahmed" },
                        { label: "Sara", value: "sara" },
                    ]}
                />
            </Form.Item>
        </Form>
    );
};
