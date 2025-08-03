import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { CaretLeftOutlined } from "@ant-design/icons";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { Paths } from "../../Routes";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { TaskType } from "./types";
import TaskTypeTable from "./components/TaskTypesTable";
import DownloadModal from "../../components/ExportModal/DownloadModal";

const initialTasks: TaskType[] = [
    { id: 1, name: "memorization", description: "New assignment" },
    { id: 2, name: "revision", description: "Revision of past memorizations" },
    { id: 3, name: "reciting", description: "Focus on Ahkam" },
];

const TaskTypesViewPage: React.FC = () => {
    const navigate = useNavigate();
    const { setButtons } = useSetButtons();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    // Set Page Title
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.viewTaskTypes")));
    }, [t]);

    // Set Buttons
    useEffect(() => {
        setButtons([
            <DownloadModal title={""} dataSelectorFunction={undefined} />,
            <Button
                key="edit"
                onClick={() => navigate(Paths.SETTINGS.ADMIN.TASKTYPES.EDIT)}
                icon={<CaretLeftOutlined />}>
                {t("general.edit")}
            </Button>,
        ]);
    }, [t]);
    return <TaskTypeTable data={initialTasks} editable={false} />;
};
export default TaskTypesViewPage;
