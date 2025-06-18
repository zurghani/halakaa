import { Table, TableProps } from "antd";
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
    }));
  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default StudentCompletedTasks;
