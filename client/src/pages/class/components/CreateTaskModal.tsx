import React, { useState } from "react";
import { Button, Form, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { PlusOutlined } from "@ant-design/icons";
import CreateTaskForm, { FieldType } from "./CreateTaskForm";

const CreateTaskModal: React.FC = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setOpen(false);
    };

    const onFinish = (values: FieldType) => {
        console.log("Form values:", values);
        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
            setOpen(false);
            form.resetFields();
        }, 1000);
    };

    return (
        <>
            <Button type="primary" onClick={showModal} icon={<PlusOutlined />}>
                {t("createTaskModal.createTask")}
            </Button>

            <Modal
                title={t("createTaskModal.createTask")}
                centered
                open={open}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        {t("createTaskModal.cancel")}
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        color="cyan"
                        loading={confirmLoading}
                        onClick={() => form.submit()}>
                        {t("createTaskModal.create")}
                    </Button>,
                ]}>
                <CreateTaskForm form={form} onFinish={onFinish} />
            </Modal>
        </>
    );
};
export default CreateTaskModal;
