import React from "react";
import { Modal, Form, Input } from "antd";
import { useTranslation } from "react-i18next";
import { TaskType } from "../../../types";
import { NewTaskType } from "../../../../../types";

type TaskCreateModalProps = {
    isOpen: boolean;
    onCreate: (task: TaskType) => void;
    onCancel: () => void;
};

const TaskCreateModal: React.FC<TaskCreateModalProps> = ({ isOpen, onCreate, onCancel }) => {
    const { t } = useTranslation();
    const [form] = Form.useForm();

    const handleSave = () => {
        form.validateFields()
            .then((values) => {
                const newTask: NewTaskType = {
                    name: values.name,
                    description: values.description,
                };
                onCreate(newTask);
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
            title={t("createTaskModal.createTaskType")}
            destroyOnClose>
            <Form form={form} layout="vertical">
                <Form.Item
                    name="name"
                    label={t("forms.name")}
                    rules={[{ required: true, message: t("forms.fieldRequired") }]}>
                    <Input />
                </Form.Item>
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

export default TaskCreateModal;
