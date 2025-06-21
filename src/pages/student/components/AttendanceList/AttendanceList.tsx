import { Table, TableProps, Tag } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { AppStore } from "../../../../store";
import AttendanceStatusTag from "../../../../components/Tags/AttendanceStatusTag";
import { AttendanceStatus } from "../../../../store/types";

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
    defaultSortOrder: "descend",
    sorter: (a, b) => a.teacherId - b.teacherId,
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.date - b.date,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => <AttendanceStatusTag status={status} />,
    filters: [
      {
        text: "Present",
        value: AttendanceStatus.Present,
      },
      {
        text: "Late",
        value: AttendanceStatus.Late,
      },

      {
        text: "Absent",
        value: AttendanceStatus.Absent,
      },
    ],
    onFilter: (value, record) => record.status.indexOf(value as string) === 0,
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
