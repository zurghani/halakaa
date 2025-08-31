import React from "react";
import { Modal, Form, Input, InputNumber, Row, Col } from "antd";
import { useTranslation } from "react-i18next";
import { NewAgeGroup } from "../../../../../types";

type AgeGroupCreateModalProps = {
    isOpen: boolean;
    onCreate: (task: NewAgeGroup) => void;
    onCancel: () => void;
};

const AgeGroupCreateModal: React.FC<AgeGroupCreateModalProps> = ({
    isOpen,
    onCreate,
    onCancel,
}) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const handleSave = () => {
        form.validateFields()
            .then((values) => {
                const newAgeGroup: NewAgeGroup = {
                    from: values.from,
                    to: values.to,
                    description: values.description,
                };
                onCreate(newAgeGroup);
                form.resetFields();
            })
            .catch(() => {});
    };

    return (
        <Modal
            open={isOpen}
            okText={t("general.save")}
            okType="primary"
            onOk={handleSave}
            cancelText={t("general.cancel")}
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
            closable
            title={t("createAgeGroupModal.createAgeGroup")}
            destroyOnClose>
            <Form form={form} layout="vertical">
                <Row>
                    <Col span={6}>
                        <Form.Item
                            name="from"
                            label={t("forms.from")}
                            rules={[{ required: true, message: t("forms.fieldRequired") }]}>
                            <InputNumber />
                        </Form.Item>
                    </Col>
                    <Col span={2} style={{ display: "flex", alignItems: "center" }}>
                        -
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            name="to"
                            label={t("forms.to")}
                            rules={[{ required: true, message: t("forms.fieldRequired") }]}>
                            <InputNumber />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    name="description"
                    label={t("forms.description")}
                    rules={[{ required: true, message: t("forms.fieldRequired") }]}>
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AgeGroupCreateModal;
