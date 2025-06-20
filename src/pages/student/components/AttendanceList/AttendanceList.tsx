import { Table, TableProps, Tag } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../store";
import AttendanceStatusTag from "../../../../components/Tags/AttendanceStatusTag";

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
    dataIndex: "teacherId",
    key: "id",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => <AttendanceStatusTag status={status} />,
  },
];

const AttendanceList: React.FC = () => {
  const attendance = useSelector((state: AppStore) => state.student.attendance);

  return (
    <>
      <Table columns={columns} dataSource={attendance} />
    </>
  );
};

export default AttendanceList;
