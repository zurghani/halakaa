import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Col, Collapse, Grid, Row } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { AppStore } from "../../../store";
import { Task } from "../../../store/types";
// TODO Add translation
import { t } from "i18next";
import TaskTypeTag from "../../Tags/TaskTypeTag";

const { useBreakpoint } = Grid;

import "./AssignedTasks.scss";
import { useTranslation } from "react-i18next";
import EditTaskModal from "../../../pages/class/components/EditTaskModal";

interface AssignedTasksProps {
    mode: "view" | "class";
}

const AssignedTasks: React.FC<AssignedTasksProps> = ({ mode = "view" }) => {
    const { t } = useTranslation();
    const screens = useBreakpoint();
    const isMobile = !screens.lg;
    const studentTasks = useSelector((state: AppStore) => state.tasks);
    const [activeKey, setActiveKey] = useState<string[]>([]);
    // TODO : add explanation for why we did we for loop here
    // For loop to create mapping of keys, ensures unique key as there are many collapses on the same page
    const keyMap = new Array(studentTasks.tasks.length);
    for (let i = 0; i < studentTasks.tasks.length; i++) {
        keyMap[i] = studentTasks.tasks[i].id.toString();
    }
    const items = studentTasks.tasks.map((task, i) => ({
        key: keyMap[i],
        label: (
            <div className="task__label">
                <div className="task__label__left">
                    <div>{task.title}</div>
                    <TaskTypeTag type={task.type} closable={false} />
                </div>
                <div className="task__label__right">
                    {activeKey[0] == (i + 1).toString()
                        ? mode === "class" && (
                              //   <Button
                              //       className="task__label__right__button"
                              //       icon={<CaretRightOutlined />}>
                              //       {!isMobile && "Finish/Edit Task"}
                              //   </Button>
                              <EditTaskModal />
                          )
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

const TaskInfo: React.FC<Task> = (task) => {
    return (
        <>
            <Row gutter={[16, 8]}>
                <Col span={8}>{t("general.from")}</Col>
                <Col span={16}>{task.ayahs.from}</Col>

                <Col span={8}>{t("general.to")}</Col>
                <Col span={16}>{task.ayahs.to}</Col>

                <Col span={8}>{t("general.assignedBy")}</Col>
                <Col span={16}>{task.teacherId}</Col>

                <Col span={8}>{t("general.assignedOn")}</Col>
                <Col span={16}>{task.assignedOn}</Col>

                <Col span={8}>{t("general.due")}</Col>
                <Col span={16}>{task.dueDate}</Col>
            </Row>
        </>
    );
};
