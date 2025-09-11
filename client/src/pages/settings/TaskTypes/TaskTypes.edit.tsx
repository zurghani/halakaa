import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { setCurrentPageTitle } from "../../../store/ui.slice";
import { Paths } from "../../../Routes";
import { useSetButtons } from "../../../layouts/PageLayout/PageLayout";
import { NewTaskType, TaskType } from "../../../types";
import TaskTypeTable from "./components/TaskTypesTable";
import { ActionButton } from "../../../components/Button/ActionButton";
import SaveSuccessModal from "../../../components/Modals/Success";
import DeleteConfirmModal from "../../../components/Modals/Delete";
import TaskCreateModal from "./components/Modals/TaskCreate";
import { useCreateTaskType, useDeleteTaskType, useTaskTypes } from "../../../queries/taskTypes";

const TaskTypesEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { setButtons } = useSetButtons();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { data: initialTaskTypes, isLoading } = useTaskTypes();
    const createTaskTypeMutation = useCreateTaskType();
    const deleteTaskTypeMutation = useDeleteTaskType();

    const [taskTypesList, setTaskTypesList] = useState<TaskType[]>(initialTaskTypes || []);
    const [toBeCreatedTaskList, setToBeCreatedTaskList] = useState<TaskType[]>([]);
    const [toBeDeletedTaskList, setToBeDeletedTaskList] = useState<number[]>([]);

    const [isTaskCreateModalOpen, setIsTaskCreateModalOpen] = useState(false);
    const [isTasksSuccessModalOpen, setIsTasksSuccessModalOpen] = useState(false);
    const [isTaskDeleteModalOpen, setIsTaskDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleCreateTask = (newTask: NewTaskType) => {
        const taskToBeAdded: TaskType = {
            id: Math.floor(Math.random() * -1000), // Temporary negative ID for frontend
            name: newTask.name,
            description: newTask.description || "",
        };
        setToBeCreatedTaskList((prev) => [...prev, taskToBeAdded]);
        setIsTaskCreateModalOpen(false);
    };

    const handleSave = () => {
        toBeCreatedTaskList.forEach((task) => {
            createTaskTypeMutation.mutate({ name: task.name, description: task.description });
        });
        toBeDeletedTaskList.forEach((id) => {
            deleteTaskTypeMutation.mutate(id.toString());
        });
        setIsTasksSuccessModalOpen(true);
        navigate(Paths.SETTINGS.ADMIN.TASKTYPES.VIEW);
    };

    const handleDeleteRequest = (id: number) => {
        setDeleteId(id);
        setIsTaskDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (deleteId !== null) {
            if (toBeCreatedTaskList.find((task) => task.id === deleteId)) {
                setToBeCreatedTaskList((prev) => prev.filter((task) => task.id !== deleteId));
            } else {
                setToBeDeletedTaskList((prev) => [...prev, deleteId]);
            }
            setTaskTypesList((prev) => prev.filter((task) => task.id !== deleteId));
        }
        setIsTaskDeleteModalOpen(false);
        setDeleteId(null);
    };

    const handleCancelDelete = () => {
        setIsTaskDeleteModalOpen(false);
        setDeleteId(null);
    };

    // Set Page Title
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.editTaskTypes")));
    }, [t]);

    // Set Buttons
    useEffect(() => {
        setButtons([
            <Button key="cancel" onClick={() => navigate(Paths.HOME.MAIN)} icon={<CloseOutlined />}>
                {t("general.cancel")}
            </Button>,
            <ActionButton key="save" onClick={handleSave}>
                {t("general.save")}
            </ActionButton>,
        ]);
    }, [t, toBeCreatedTaskList, toBeDeletedTaskList]);

    useEffect(() => {
        if (!isLoading) {
            setTaskTypesList(initialTaskTypes || []);
        }
    }, [initialTaskTypes, isLoading]);

    return (
        <>
            <TaskTypeTable
                data={[...(taskTypesList || []), ...toBeCreatedTaskList]}
                editable
                onDelete={handleDeleteRequest}
                onCreate={() => setIsTaskCreateModalOpen(true)}
            />
            <SaveSuccessModal
                isOpen={isTasksSuccessModalOpen}
                onClose={() => setIsTasksSuccessModalOpen(false)}
                navigatePath={Paths.SETTINGS.ADMIN.TASKTYPES.VIEW}
                title={t("modal.taskType.createSuccess")}
                message={t("modal.doneMessage")}
            />
            <DeleteConfirmModal
                isOpen={isTaskDeleteModalOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
                title={t("modal.taskType.deleteTitle")}
                message={t("modal.taskType.deleteConfirmation")}
            />
            <TaskCreateModal
                isOpen={isTaskCreateModalOpen}
                onCreate={handleCreateTask}
                onCancel={() => setIsTaskCreateModalOpen(false)}
            />
        </>
    );
};
export default TaskTypesEditPage;
