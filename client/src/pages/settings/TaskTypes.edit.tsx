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
import TaskConfirmModal from "./components/TaskConfirmModal";
import TaskDeleteConfirmationModal from "./components/TaskDeleteConfirmationModal";
import TaskCreateModal from "./components/TaskCreateModal";

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
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);                  // save modal state
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);  // delete confirmation modal state
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);              // create new task type modal state  

    // Handle creating a new task type
    const handleCreateTask = (newTask: TaskType) => {
        setTaskTypes((prev) => [...prev, newTask]);
        setIsCreateModalOpen(false);
    };

    // Handle saving task types
    const handleSave = () => {
        console.log("Saving task types:", taskTypes);
        // TODO: Replace with API call
        setIsSaveModalOpen(true);
    };

    // Handle delete task type
    const handleDeleteRequest = (id: number) => {
        setDeleteId(id);
        setIsConfirmationModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (deleteId !== null) {
            setTaskTypes((prev) => prev.filter((task) => task.id !== deleteId));
        }
        setIsConfirmationModalOpen(false); 
        setDeleteId(null);
    };

    const handleCancelDelete = () => {
        setIsConfirmationModalOpen(false);
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
            onCreate={() => setIsCreateModalOpen(true)}
            />
            <TaskConfirmModal isSaveModalOpen={isSaveModalOpen} onClose={() => setIsSaveModalOpen(false)} />
            <TaskDeleteConfirmationModal
                isConfirmationModalOpen={isConfirmationModalOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
            <TaskCreateModal
                isCreateModalOpen={isCreateModalOpen}
                onCreate={handleCreateTask}
                onCancel={() => setIsCreateModalOpen(false)}
            />
        </>
        )
};
export default TaskTypesEditPage;
