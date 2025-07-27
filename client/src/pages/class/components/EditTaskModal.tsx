import React, { useState } from "react";
import { Button, Form, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { CaretRightOutlined, PlusOutlined } from "@ant-design/icons";
import EditTaskForm, { EditTaskFormFieldsType } from "./EditTaskForm";

const EditTaskModal: React.FC = () => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const complete = Form.useWatch("complete", form);

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setOpen(false);
    };

    const onFinish = (values: EditTaskFormFieldsType) => {
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
            <Button onClick={showModal} icon={<CaretRightOutlined />}>
                {t("editTaskModal.editCompleteTask")}
            </Button>

            <Modal
                title={t("editTaskModal.editCompleteTask")}
                centered
                open={open}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        {t("editTaskModal.cancel")}
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        color="cyan"
                        loading={confirmLoading}
                        onClick={() => form.submit()}>
                        {complete ? t("editTaskModal.complete") : t("editTaskModal.save")}
                    </Button>,
                ]}>
                <EditTaskForm form={form} onFinish={onFinish} />
            </Modal>
        </>
    );
};
export default EditTaskModal;
