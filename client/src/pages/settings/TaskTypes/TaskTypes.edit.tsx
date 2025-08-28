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

    const [taskTypesList, setTaskTypesList] = useState<TaskType[]>([]);
    const [changes, setChanges] = useState<
        { action: "create" | "delete"; task: TaskType | NewTaskType }[]
    >([]);
    const [isTaskCreateModalOpen, setIsTaskCreateModalOpen] = useState(false);
    const [isTasksSuccessModalOpen, setIsTasksSuccessModalOpen] = useState(false);
    const [isTaskDeleteModalOpen, setIsTaskDeleteModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    useEffect(() => {
        if (initialTaskTypes) {
            setTaskTypesList(initialTaskTypes);
            setChanges([]); // reset staged changes
        }
    }, [initialTaskTypes]);

    const handleCreateTask = (newTask: NewTaskType) => {
        setTaskTypesList((prev) => [...prev, newTask]);
        setChanges((prev) => [...prev, { action: "create", task: newTask }]);
        setIsTaskCreateModalOpen(false);
    };

    const handleSave = () => {
        console.log("Saving task types:", taskTypesList);
        changes.forEach((task) => {
            if (task.action === "create") {
                createTaskTypeMutation.mutate(task.task);
            }
            if (task.action === "delete") {
                deleteTaskTypeMutation.mutate(task.task.id.toString());
            }
        });
        setIsTasksSuccessModalOpen(true);
    };

    const handleDeleteRequest = (id: number) => {
        setDeleteId(id);
        setIsTaskDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (deleteId !== null) {
            const taskToDelete = taskTypesList.find((task) => task.id === deleteId);
            setTaskTypesList((prev) => prev.filter((task) => task.id !== deleteId));

            if (taskToDelete) {
                setChanges((prev) => {
                    const isTaskLocalCreate = prev.find(
                        (task) => task.action === "create" && task.task.id === deleteId
                    );

                    if (isTaskLocalCreate) {
                        return prev.filter(
                            (c) => !(c.action === "create" && c.task.id === deleteId)
                        );
                    } else {
                        return [...prev, { action: "delete", task: taskToDelete }];
                    }
                });
            }
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
    }, [t, taskTypesList]);

    return (
        <>
            <TaskTypeTable
                data={taskTypesList}
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
