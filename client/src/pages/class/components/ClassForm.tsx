import { Col, Form, FormInstance, Input, Row, Select, TimePicker } from "antd";
import { useTranslation } from "react-i18next";
import { Class } from "../types";
import { useAgeGroups } from "../../../queries/ageGroups";

export interface ClassFormProps {
    disabled?: boolean;
    defaultValues?: Class | any;
    form: FormInstance;
    onSubmit?: (data: any) => void;
}
export const ClassForm: React.FC<ClassFormProps> = ({
    disabled = false,
    defaultValues,
    onSubmit,
    form,
}) => {
    const { t } = useTranslation();
    const { data: ageGroups, isLoading } = useAgeGroups();
    if (isLoading) return <div>Loading...</div>;

    return (
        <Form
            form={form}
            layout="vertical"
            style={{ padding: "20px", maxWidth: "40rem" }}
            onFinish={onSubmit}
            initialValues={defaultValues}>
            <Form.Item
                name="description"
                label={t("forms.description")}
                rules={[{ required: true, message: t("forms.required.description") }]}>
                <Input disabled={disabled} />
            </Form.Item>
            <Row gutter={16} style={{ width: "100%", margin: 0 }}>
                <Col span={12} style={{ paddingLeft: 0 }}>
                    <Form.Item
                        name="startsAt"
                        label={t("forms.from")}
                        rules={[{ required: true, message: t("forms.required.from") }]}>
                        <TimePicker
                            use12Hours
                            format="h:mm A"
                            minuteStep={15}
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                </Col>
                <Col span={12} style={{ paddingRight: 0 }}>
                    <Form.Item
                        name="endsAt"
                        label={t("forms.to")}
                        rules={[{ required: true, message: t("forms.required.to") }]}>
                        <TimePicker
                            use12Hours
                            format="h:mm A"
                            minuteStep={15}
                            style={{ width: "100%" }}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                name="teacher" // dont know how to display teacher name
                getValueProps={(value) => ({
                    value: value ? value.name : [],
                })}
                label={t("forms.teacher")}
                rules={[{ required: true, message: t("forms.required.teacher") }]}>
                <Select
                    mode="tags"
                    maxCount={1}
                    style={{ width: "100%" }}
                    disabled={disabled}
                    //TODO fetch teachers from api
                    options={[
                        { label: "Mohamed", value: "001" },
                        { label: "Ahmed", value: "002" },
                        { label: "Zacharea", value: "003" },
                        { label: "Yusuf", value: "004" },
                    ]}
                />
            </Form.Item>
            <Form.Item
                name="ageGroup"
                label={t("forms.ageGroup")}
                rules={[{ required: true, message: t("forms.required.ageGroup") }]}>
                <Select
                    mode="tags"
                    maxCount={1}
                    style={{ width: "100%" }}
                    disabled={disabled}
                    options={ageGroups?.map((ageGroup) => ({
                        label: `${ageGroup.from}-${ageGroup.to}`,
                        value: ageGroup.id,
                    }))}
                />
            </Form.Item>
        </Form>
    );
};
