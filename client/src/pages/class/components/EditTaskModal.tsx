import { useState } from "react";
import { Button, Form, Modal } from "antd";
import { useTranslation } from "react-i18next";
import EditTaskForm from "./EditTaskForm";
import { ActionButton } from "../../../components/Button/ActionButton";
import { TaskExpanded } from "../../../types";

interface EditTaskModalProps {
    task: TaskExpanded;
}

const EditTaskModal = ({ task }: EditTaskModalProps) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const complete = Form.useWatch("complete", form);

    console.log("Task in EditTaskModal:", task);
    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setOpen(false);
    };

    const onFinish = (values: TaskExpanded) => {
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
            <ActionButton onClick={showModal}>{t("editTaskModal.editCompleteTask")}</ActionButton>

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
                <EditTaskForm form={form} onFinish={onFinish} task={task} />
            </Modal>
        </>
    );
};
export default EditTaskModal;
