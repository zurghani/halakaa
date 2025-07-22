import { Tag } from "antd";
import type { TagProps } from "antd/lib/tag";
import { useTranslation } from "react-i18next";

export type TaskType = "memorization" | "revision" | "reciting";

interface TaskTypeTagProps extends TagProps {
    type: TaskType;
}

const TaskTypeTag: React.FC<TaskTypeTagProps> = ({ type, ...rest }) => {
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
        <Tag closable color={color} className="task-tag" {...rest}>
            {t(`tags.${type}`)}
        </Tag>
    );
};

export default TaskTypeTag;
