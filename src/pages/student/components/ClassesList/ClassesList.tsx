import { Table, TableProps, Tag } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../store";

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
    title: "Class ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Teacher",
    dataIndex: "teacherId",
    key: "teacherId",
  },
  {
    title: "Age Group",
    dataIndex: "ageGroup",
    key: "ageGroup",
    render: (ageGroup) => <Tag color="blue">{ageGroup}</Tag>,
  },
  {
    title: "Starts At",
    dataIndex: "start",
    key: "start",
  },
  {
    title: "Ends At",
    dataIndex: "end",
    key: "end",
  },
];

const ClassesList: React.FC = () => {
  const studentClasses = useSelector((state: AppStore) => state.class);
  const data = studentClasses.map((studentClass) => ({
    id: studentClass.id,
    teacherId: studentClass.teacherId,
    ageGroup: studentClass.ageGroup,
    start: studentClass.time.start,
    end: studentClass.time.end,
  }));

  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default ClassesList;
