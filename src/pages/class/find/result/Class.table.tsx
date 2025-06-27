import { Table, TableProps } from "antd";
import { Tag } from "antd";
import { FindClassResultType } from "./dummy.data";
import { useNavigate } from "react-router-dom";

const columns: TableProps<FindClassResultType>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Teacher",
    dataIndex: "teacher",
    key: "teacher",
    sorter: (a, b) => a.teacher.length - b.teacher.length,
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
  {
    title: "Starts At",
    dataIndex: "StartsAt",
    key: "StartsAt",
    sorter: (a, b) => a.teacher.length - b.teacher.length,
  },
  {
    title: "Ends At",
    dataIndex: "EndsAt",
    key: "EndsAt",
    sorter: (a, b) => a.teacher.length - b.teacher.length,
  },
];

const ClassesTable = ({ classes }: { classes: FindClassResultType[] }) => {
  const navigate = useNavigate();

  return (
    <>
      <Table
        columns={columns}
        dataSource={classes}
        onRow={(record: FindClassResultType) => ({
          onClick: () => {
            // handle row click here
            navigate(`/class/${record.id}`);
          },
        })}
      />
    </>
  );
};

export default ClassesTable;
