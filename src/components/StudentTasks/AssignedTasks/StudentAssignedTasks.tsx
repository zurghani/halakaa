import { Button, Col, Collapse, CollapseProps, Row } from "antd";
import React, { useState } from "react";
import { TaskStatus, TaskType } from "../../../store/types";
import TaskTypeTag from "../../Tags/TaskTypeTag";
import { CaretRightOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { AppStore } from "../../../store";

import "./StudentAssignedTasks.scss";

interface AssignedTasksProps {
  mode: "view" | "class";
}

const StudentAssignedTasks: React.FC<AssignedTasksProps> = () => {
  const studentTasks = useSelector((state: AppStore) => state.tasks);

  const items = studentTasks.tasks.map((task) => ({
    key: task.id,
    label: (
      <div className="task__label">
        <div className="task__label__left">
          <div>{task.title}</div>
          <TaskTypeTag type={task.type} closeIcon={"hide"} />
        </div>
        <div className="task__label__right">
          <Button
            className="task__label__right__button"
            icon={<CaretRightOutlined />}>
            Finish/Edit Task
          </Button>
        </div>
      </div>
    ),
    children: (
      <Row gutter={[16, 8]}>
        <Col span={4}>From:</Col>
        <Col span={20}>{task.ayahs.from}</Col>

        <Col span={4}>To:</Col>
        <Col span={20}>{task.ayahs.to}</Col>

        <Col span={4}>Assigned By:</Col>
        <Col span={20}>{task.teacherId}</Col>

        <Col span={4}>Assigned On:</Col>
        <Col span={20}>{task.assignedOn}</Col>

        <Col span={4}>Due:</Col>
        <Col span={20}>{task.dueDate}</Col>
      </Row>
    ),
  }));
  return (
    <div>
      <Collapse
        accordion
        items={items}
        collapsible="icon"
        defaultActiveKey={["1"]}
      />
    </div>
  );
};

export default StudentAssignedTasks;
