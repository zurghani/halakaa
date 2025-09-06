import { useState } from "react";
import { Button, Form, Modal } from "antd";
import { useTranslation } from "react-i18next";
import EditTaskForm from "./EditTaskForm";
import { ActionButton } from "../../../components/Button/ActionButton";
import { TaskExpanded, TaskStatus, UpdateTask } from "../../../types";
import { useUpdateTask } from "../../../queries/tasks";
import dayjs from "dayjs";
import { authClient } from "../../../lib/auth-client";

interface EditTaskModalProps {
    task: TaskExpanded;
}

const EditTaskModal = ({ task }: EditTaskModalProps) => {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();
    const complete = Form.useWatch("complete", form);
    const userId = authClient.useSession().data?.user.id;

    const updateTaskMutation = useUpdateTask();

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        form.resetFields();
        setOpen(false);
    };

    const onFinish = (values: TaskExpanded) => {
        console.log("Received values of form: ", values);
        const startingAyahId = Array.isArray(values.startingAyah)
            ? values.startingAyah[0]
            : values.startingAyah?.id;
        const endingAyahId = Array.isArray(values.endingAyah)
            ? values.endingAyah[0]
            : values.endingAyah?.id;
        const taskTypeId = Array.isArray(values.taskType)
            ? values.taskType[0]
            : values.taskType?.id;

        let updateTaskInformation: UpdateTask = {
            taskTypeId: taskTypeId,
            startingAyahId: startingAyahId,
            endingAyahId: endingAyahId,
            dueDate: values.dueDate,
        };
        if (complete) {
            updateTaskInformation = {
                ...updateTaskInformation,
                status: TaskStatus.Completed,
                completedOn: dayjs().format("YYYY-MM-DD"),
                completedBy: userId,
                notes: values.notes || "",
                mistakes: values.mistakes || 0,
            };
        }

        setConfirmLoading(true);

        updateTaskMutation.mutate(
            {
                taskId: task.id.toString(),
                updates: updateTaskInformation,
            },
            {
                onSuccess: () => {
                    setConfirmLoading(false);
                    setOpen(false);
                    form.resetFields();
                },
                onError: () => {
                    setConfirmLoading(false);
                },
            }
        );
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
                <EditTaskForm form={form} onFinish={onFinish} initialValues={task} />
            </Modal>
        </>
    );
};
export default EditTaskModal;
