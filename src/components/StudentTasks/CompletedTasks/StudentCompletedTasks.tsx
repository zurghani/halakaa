import { Col, Row, Table, TableProps } from "antd";
import React from "react";
import { TaskStatus, TaskType } from "../../../store/types";
import { useSelector } from "react-redux";
import { AppStore } from "../../../store";

import "./StudentCompletedTasks.scss";
import TaskTypeTag from "../../Tags/TaskTypeTag";

// interface DataType {
//   key: string;
//   teacher: string;
//   type: TaskType;
//   from: string;
//   to: string;
//   date: string;
// }

const columns: TableProps["columns"] = [
  {
    title: "Teacher",
    dataIndex: "teacher",
    key: "teacher",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    render: (type) => <TaskTypeTag type={type} closeIcon={"hide"} />,
  },
  {
    title: "From",
    dataIndex: "from",
    key: "from",
  },
  {
    title: "To",
    dataIndex: "to",
    key: "to",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
];

const StudentCompletedTasks: React.FC = () => {
  const studentTasks = useSelector((state: AppStore) => state.tasks);

  const data = studentTasks.tasks
    .filter((task) => task.status === TaskStatus.Completed)
    .map((task) => ({
      key: `completed - ${task.id}`,
      teacher: task.teacherId ?? "",
      type: task.type,
      from: task.ayahs.from,
      to: task.ayahs.to,
      date: task.dueDate ?? "",
      assignedOn: task.assignedOn,
      assignedBy: task.teacherId,
      completedBy: task.completedBy,
      completedOn: task.completedOn,
      notes: task.notes,
      mistakes: task.mistakes,
    }));
  return (
    <>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: (task) => (
            <Row gutter={[16, 8]}>
              <Col span={6}>From:</Col>
              <Col span={6}>{task.from}</Col>

              <Col span={6}>To:</Col>
              <Col span={6}>{task.to}</Col>

              <Col span={6}>Assigned On:</Col>
              <Col span={6}>{task.assignedOn}</Col>

              <Col span={6}>Completed On:</Col>
              <Col span={6}>{task.completedOn}</Col>

              <Col span={6}>Assigned By:</Col>
              <Col span={6}>{task.assignedBy}</Col>

              <Col span={6}>Completed By:</Col>
              <Col span={6}>{task.completedBy}</Col>

              <Col span={6}>Notes:</Col>
              <Col span={6}>{task.notes}</Col>

              <Col span={6}>Mistakes:</Col>
              <Col span={6}>{task.mistakes}</Col>
            </Row>
          ),
        }}
        dataSource={data}
      />
    </>
  );
};

export default StudentCompletedTasks;
