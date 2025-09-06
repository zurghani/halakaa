import React, { useState } from "react";
import { Col, Collapse, Grid, Row, Tag } from "antd";
// TODO Add translation
import { t } from "i18next";

const { useBreakpoint } = Grid;

import "./AssignedTasks.scss";
import { useTranslation } from "react-i18next";
import EditTaskModal from "../../../pages/class/components/EditTaskModal";
import { useTags } from "../../../hooks/useTags";
import { TaskExpanded } from "../../../types";
import dayjs from "dayjs";

interface AssignedTasksProps {
    mode: "view" | "class";
    tasks: TaskExpanded[];
}

const AssignedTasks = ({ mode, tasks }: AssignedTasksProps) => {
    const { taskTypeTags } = useTags({});
    const { t } = useTranslation();
    const screens = useBreakpoint();
    const isMobile = !screens.lg;
    const [activeKey, setActiveKey] = useState<string[]>([]);

    const items = tasks.map((task, i) => {
        const key = task.createdAt?.toString() ?? "_" + i;

        return {
            key,
            label: (
                <div className="task__label">
                    <div className="task__label__left">
                        <div>
                            <Tag>{i + 1}</Tag>
                        </div>
                        {task.taskType?.name ? taskTypeTags[task.taskType?.name] : null}
                    </div>
                    <div className="task__label__right">
                        {activeKey.includes(key) && mode === "class" && (
                            <EditTaskModal task={task} />
                        )}
                    </div>
                </div>
            ),
            children: <TaskInfo {...task} />,
        };
    });
    return (
        <div>
            <Collapse
                onChange={(keys) => setActiveKey(keys as string[])}
                accordion
                items={items}
                collapsible="icon"
            />
        </div>
    );
};

export default AssignedTasks;

// TODO: fix the Rows. no More than 24

const TaskInfo: React.FC<TaskExpanded> = (task) => {
    return (
        <>
            <Row gutter={[16, 8]}>
                <Col span={8}>{t("general.from")}</Col>
                <Col span={16}>
                    {task.startingAyah
                        ? `(${task.startingAyah.number}) ${task.startingAyah.surahName}`
                        : "-"}
                </Col>

                <Col span={8}>{t("general.to")}</Col>
                <Col span={16}>
                    {task.endingAyah
                        ? `(${task.endingAyah.number}) ${task.endingAyah.surahName}`
                        : "-"}
                </Col>

                <Col span={8}>{t("general.assignedBy")}</Col>
                <Col span={16}>{task.assignedBy?.name}</Col>

                <Col span={8}>{t("general.assignedOn")}</Col>
                <Col span={16}>{dayjs(task.createdAt).format("YYYY-MM-DD")}</Col>

                <Col span={8}>{t("general.due")}</Col>
                <Col span={16}>{dayjs(task.dueDate).format("YYYY-MM-DD")}</Col>
            </Row>
        </>
    );
};
