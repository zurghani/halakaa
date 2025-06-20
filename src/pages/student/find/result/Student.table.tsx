import { Table, TableProps } from "antd";
import AttendanceStatusTag from "../../../../components/Tags/AttendanceStatusTag";

const columns: TableProps["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age group",
    dataIndex: "ageGroup",
    key: "ageGroup",
    render: (status) => <AttendanceStatusTag status={status} />,
  },
];

const StudentTable: React.FC = () => {
  return (
    <>
      <Table columns={columns} dataSource={[]} />
    </>
  );
};

export default StudentTable;
