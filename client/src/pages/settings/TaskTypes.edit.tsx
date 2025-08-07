import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { Paths } from "../../Routes";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { TaskType } from "./types";
import TaskTypeTable from "./components/TaskTypesTable";
import { ActionButton } from "../../components/Button/ActionButton";
import TaskConfirmModal from "./components/Modals/TaskConfirmSaveSuccess";
import TaskDeleteConfirmationModal from "./components/Modals/TaskDeleteConfirmation";
import TaskCreateModal from "./components/Modals/TaskCreate";

const initialTasks: TaskType[] = [
    { id: 1, name: "memorization", description: "New assignment" },
    { id: 2, name: "revision", description: "Revision of past memorizations" },
    { id: 3, name: "reciting", description: "Focus on Ahkam" },
];

const TaskTypesEditPage: React.FC = () => {
    const navigate = useNavigate();
    const { setButtons } = useSetButtons();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const [taskTypes, setTaskTypes] = useState<TaskType[]>(initialTasks);
    const [isTaskCreateModalOpen, setIsTaskCreateModalOpen] = useState(false);                          // create new task type modal state  
    const [isTaskConfirmSaveSuccessModalOpen, setIsTaskConfirmSaveSuccessModalOpen] = useState(false);  // save confirm sucess modal state
    const [isTaskDeleteConfirmationModalOpen, setIsTaskDeleteConfirmationModalOpen] = useState(false);  // delete confirmation modal state
    const [deleteId, setDeleteId] = useState<number | null>(null);

    // Handle creating a new task type
    const handleCreateTask = (newTask: TaskType) => {
        setTaskTypes((prev) => [...prev, newTask]);
        setIsTaskCreateModalOpen(false);
    };

    // Handle saving task types
    const handleSave = () => {
        console.log("Saving task types:", taskTypes);
        // TODO: Replace with API call
        setIsTaskConfirmSaveSuccessModalOpen(true);
    };

    // Handle delete task type
    const handleDeleteRequest = (id: number) => {
        setDeleteId(id);
        setIsTaskDeleteConfirmationModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (deleteId !== null) {
            setTaskTypes((prev) => prev.filter((task) => task.id !== deleteId));
        }
        setIsTaskDeleteConfirmationModalOpen(false); 
        setDeleteId(null);
    };

    const handleCancelDelete = () => {
        setIsTaskDeleteConfirmationModalOpen(false);
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
    }, [t, taskTypes]);

    return (
        <>
            <TaskTypeTable
            data={taskTypes}
            editable
            onDelete={handleDeleteRequest}
            onCreate={() => setIsTaskCreateModalOpen(true)}
            />
            <TaskConfirmModal isTaskConfirmSaveSuccessModalOpen={isTaskConfirmSaveSuccessModalOpen} onClose={() => setIsTaskConfirmSaveSuccessModalOpen(false)} />
            <TaskDeleteConfirmationModal
                isTaskDeleteConfirmationModalOpen={isTaskDeleteConfirmationModalOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
            <TaskCreateModal
                isTaskCreateModalOpen={isTaskCreateModalOpen}
                onCreate={handleCreateTask}
                onCancel={() => setIsTaskCreateModalOpen(false)}
            />
        </>
        )
};
export default TaskTypesEditPage;
