import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setCurrentPageTitle } from "../../../store/ui.slice";
import { Paths } from "../../../Routes";
import { useSetButtons } from "../../../layouts/PageLayout/PageLayout";
import DownloadModal, { flatten } from "../../../components/ExportModal/DownloadModal";
import { ActionButton } from "../../../components/Button/ActionButton";
import TaskTypeTable from "./components/TaskTypesTable";
import { useTaskTypes } from "../../../queries/taskTypes";

const TaskTypesViewPage: React.FC = () => {
    const navigate = useNavigate();
    const { setButtons } = useSetButtons();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    // Set Page Title
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.taskTypes")));
    }, [t]);
    const { data: taskTypes, isLoading } = useTaskTypes();
    // Set Buttons
    useEffect(() => {
        setButtons([
            <DownloadModal
                file_name={"task-types"}
                data={flatten(taskTypes || [], "Task Types")}
            />,
            <ActionButton key="edit" onClick={() => navigate(Paths.SETTINGS.ADMIN.TASKTYPES.EDIT)}>
                {t("general.edit")}
            </ActionButton>,
        ]);
    }, [t, taskTypes]);

    if (isLoading) return <div>Loading...</div>;

    return <TaskTypeTable data={taskTypes} editable={false} />;
};
export default TaskTypesViewPage;
