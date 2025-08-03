import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { CaretLeftOutlined, CloseOutlined } from "@ant-design/icons";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { Paths } from "../../Routes";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { TaskType } from "./types";
import TaskTypeTable from "./components/TaskTypesTable";

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

    const handleSave = () => {
        console.log("Saving task types:", taskTypes);
        // TODO: Replace with API call
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
            <Button key="save" onClick={handleSave} icon={<CaretLeftOutlined />}>
                {t("general.save")}
            </Button>,
        ]);
    }, [t, taskTypes]);
    return (
        <TaskTypeTable
            data={taskTypes}
            editable
            onDelete={(id) => setTaskTypes((prev) => prev.filter((t) => t.id !== id))}
            onCreate={() => setTaskTypes([...taskTypes, { id: 5, name: "", description: "" }])}
        />
    );
};
export default TaskTypesEditPage;
