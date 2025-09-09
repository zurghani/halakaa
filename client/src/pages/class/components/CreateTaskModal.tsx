import { useState } from "react";
import { Button, Form, Modal } from "antd";
import { useTranslation } from "react-i18next";
import { PlusOutlined } from "@ant-design/icons";
import CreateTaskForm from "./CreateTaskForm";
import { NewTask, TaskStatus } from "../../../types";
import { authClient } from "../../../lib/auth-client";
import { useCreateTask } from "../../../queries/tasks";
interface CreateTaskModalProps {
    studentId: number;
    classId: number;
}
const CreateTaskModal = ({ studentId, classId }: CreateTaskModalProps) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const userId = authClient.useSession().data?.user.id;

    const createTaskMutation = useCreateTask();

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setOpen(false);
    };

    const onFinish = (values: NewTask) => {
        const taskToBeCreated: NewTask = {
            studentId,
            status: TaskStatus.Assigned,
            classId,
            assignedBy: userId,
            taskTypeId: Array.isArray(values.taskTypeId) ? values.taskTypeId[0] : values.taskTypeId,
            dueDate: values.dueDate,
            startingAyahId: Array.isArray(values.startingAyahId)
                ? values.startingAyahId[0]
                : values.startingAyahId,
            endingAyahId: Array.isArray(values.endingAyahId)
                ? values.endingAyahId[0]
                : values.endingAyahId,
        };

        setConfirmLoading(true);
        createTaskMutation.mutate(taskToBeCreated, {
            onSuccess: () => {
                setConfirmLoading(false);
                setOpen(false);
                form.resetFields();
            },
            onError: () => {
                setConfirmLoading(false);
            },
        });

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
