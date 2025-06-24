import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Col, Collapse, Row } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { AppStore } from "../../../store";
import { Task } from "../../../store/types";
import { t } from "i18next";
import TaskTypeTag from "../../Tags/TaskTypeTag";

import "./StudentAssignedTasks.scss";

interface AssignedTasksProps {
  mode: "view" | "class";
}

const StudentAssignedTasks: React.FC<AssignedTasksProps> = () => {
  const studentTasks = useSelector((state: AppStore) => state.tasks);
  const [activeKey, setActiveKey] = useState<string[]>([]);
  // TODO : add explanation for why we did we for loop here
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
          <TaskTypeTag type={task.type} closeIcon={"hide"} />
        </div>
        <div className="task__label__right">
          {activeKey[0] == (i + 1).toString() ? (
            <Button
              className="task__label__right__button"
              icon={<CaretRightOutlined />}>
              Finish/Edit Task
            </Button>
          ) : null}
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

export default StudentAssignedTasks;

// TODO: fix the Rows. no More than 24

const TaskInfo: React.FC<Task> = (task) => {
  return (
    <Row gutter={[16, 8]}>
      <Col span={4}>From:</Col>
      <Col span={16}>{task.ayahs.from}</Col>
      <Col span={4}>
        {/* <Button icon={<CaretRightOutlined />}>Finish/Edit Task</Button> */}
      </Col>

      <Col span={4}>To:</Col>
      <Col span={20}>{task.ayahs.to}</Col>

      <Col span={4}>Assigned By:</Col>
      <Col span={20}>{task.teacherId}</Col>

      <Col span={4}>Assigned On:</Col>
      <Col span={20}>{task.assignedOn}</Col>

      <Col span={4}>Due:</Col>
      <Col span={20}>{task.dueDate}</Col>
    </Row>
  );
};
