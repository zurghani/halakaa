import { Table, TableProps } from "antd";
import { Tag } from "antd";
import { FindStudentResultType } from "./dummy.data";

const columns: TableProps<FindStudentResultType>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Age group",
    dataIndex: "ageGroup",
    key: "ageGroup",
    render: (ageGroup: string) => <Tag color="green">{ageGroup}</Tag>,
    filters: [
      { text: "5-10", value: "5-10" },
      { text: "11-15", value: "11-15" },
      { text: "16-20", value: "16-20" },
    ],
    onFilter: (value, record) => record.ageGroup.includes(value as string),
  },
];

const StudentTable = ({ students }: { students: FindStudentResultType[] }) => {
  return (
    <>
      <Table
        columns={columns}
        dataSource={students}
        onRow={(record: FindStudentResultType) => ({
          onClick: () => {
            // handle row click here
            console.log("Row clicked:", record);
          },
        })}
      />
    </>
  );
};

export default StudentTable;
