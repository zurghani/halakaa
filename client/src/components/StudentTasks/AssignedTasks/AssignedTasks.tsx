import React, { useState } from "react";
import { Col, Collapse, Grid, Row, Tag } from "antd";
// TODO Add translation
import { t } from "i18next";

const { useBreakpoint } = Grid;

import "./AssignedTasks.scss";
import { useTranslation } from "react-i18next";
import EditTaskModal from "../../../pages/class/components/EditTaskModal";
import { useTags } from "../../../hooks/useTags";
import { TaskWithTaskTypeAndAyahReference } from "../../../types";

interface AssignedTasksProps {
    mode: "view" | "class";
    tasks: TaskWithTaskTypeAndAyahReference[];
}

const AssignedTasks = ({ mode, tasks }: AssignedTasksProps) => {
    const { taskTypeTags } = useTags({});
    const { t } = useTranslation();
    const screens = useBreakpoint();
    const isMobile = !screens.lg;
    const [activeKey, setActiveKey] = useState<string[]>([]);
    // TODO : add explanation for why we did we for loop here
    // For loop to create mapping of keys, ensures unique key as there are many collapses on the same page
    const keyMap = new Array(tasks.length);
    for (let i = 0; i < tasks.length; i++) {
        keyMap[i] = tasks[i].id.toString();
    }
    const items = tasks.map((task, i) => ({
        key: keyMap[i],
        label: (
            <div className="task__label">
                <div className="task__label__left">
                    <div>
                        <Tag>{task.taskTypeId}</Tag>
                    </div>
                    {task.taskType?.name ? taskTypeTags[task.taskType?.name] : null}
                </div>
                <div className="task__label__right">
                    {activeKey[0] == (i + 1).toString()
                        ? mode === "class" && <EditTaskModal />
                        : null}
                </div>
            </div>
        ),
        children: <TaskInfo {...task} />,
    }));
    return (
        <div>
            <Collapse
                onChange={(e) => setActiveKey(e)}
                accordion
                items={items}
                collapsible="icon"
            />
        </div>
    );
};

export default AssignedTasks;

// TODO: fix the Rows. no More than 24

const TaskInfo: React.FC<TaskWithTaskTypeAndAyahReference> = (task) => {
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
                <Col span={16}>{task.assignedBy}</Col>

                <Col span={8}>{t("general.assignedOn")}</Col>
                <Col span={16}>{task.createdAt}</Col>

                <Col span={8}>{t("general.due")}</Col>
                <Col span={16}>{task.dueDate}</Col>
            </Row>
        </>
    );
};
