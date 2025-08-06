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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleSave = () => {
        console.log("Saving task types:", taskTypes);
        // TODO: Replace with API call
        setIsModalOpen(true);
    };

    const handleDeleteRequest = (id: number) => {
        setDeleteId(id);
        setConfirmationModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (deleteId !== null) {
            setTaskTypes((prev) => prev.filter((task) => task.id !== deleteId));
        }
        setConfirmationModalOpen(false); 
        setDeleteId(null);
    };

    const handleCancelDelete = () => {
        setConfirmationModalOpen(false);
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
            onCreate={() => setTaskTypes([...taskTypes, { id: 5, name: "", description: "" }])} 
            />
            <TaskConfirmModal isModalOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <TaskDeleteConfirmationModal
                confirmationModalOpen={confirmationModalOpen}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </>
        )
};
export default TaskTypesEditPage;
