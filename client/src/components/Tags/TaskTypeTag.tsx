import React from "react";
import { Tag } from "antd";

import "./TaskTypeTage.scss";
import { useTranslation } from "react-i18next";
export type TaskType = "memorization" | "revision" | "reciting";

interface TaskTypeTagProps {
    type: TaskType;
    closeIcon: "show" | "hide";
    onClose?: (e: React.MouseEvent<HTMLElement>) => void;
}

const TaskTypeTag: React.FC<TaskTypeTagProps> = ({
    type,
    closeIcon,
    onClose,
}) => {
    const { t } = useTranslation();
    const statusConfig = {
        memorization: {
            color: "green",
        },
        revision: {
            color: "purple",
        },
        reciting: {
            color: "blue",
        },
    };
    const { color } = statusConfig[type];
    return (
        <Tag
            closable={closeIcon === "show"}
            onClose={onClose}
            color={color}
            className="task-tag">
            {t(`tags.${type}`)}
        </Tag>
    );
};

export default TaskTypeTag;
