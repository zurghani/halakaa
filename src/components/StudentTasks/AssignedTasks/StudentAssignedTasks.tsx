import { Button, Col, Collapse, CollapseProps, Row } from "antd";
import React from "react";
import { TaskStatus, TaskType } from "../../../store/types";
import TaskTypeTag from "../../Tags/TaskTypeTag";
import { CaretRightOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { AppStore } from "../../../store";

import "./StudentAssignedTasks.scss";

interface AssignedTasksProps {
  mode: "view" | "class";
}

const tasks = [
  {
    id: "1",
    title: "Task 1",
    type: TaskType.Memorization,
    from: "البقرة (1)",
    to: "البقرة (34)",
    assignedBy: "Adam Ali",
    assignedOn: "13/May/2023",
    due: "20/May/2023",
    active: true,
  },
  {
    id: "2",
    title: "Task 2",
    type: TaskType.Revision,
    from: "البقرة (1)",
    to: "البقرة (34)",
    assignedBy: "Adam Ali",
    assignedOn: "16/May/2023",
    due: "28/May/2023",
    active: false,
  },
];

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
          {task.status === TaskStatus.Assigned && (
            <Button icon={<CaretRightOutlined />}>Finish/Edit Task</Button>
          )}
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
    <>
      <Collapse items={items} collapsible="icon" defaultActiveKey={["1"]} />
    </>
  );
};

export default StudentAssignedTasks;
