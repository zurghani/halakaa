import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { useTranslation } from "react-i18next";
import { Student } from "../../store/types";

interface DataType extends Student {
  key: React.Key;
}

const data: DataType[] = [
  {
    key: "1",
    name: "Mohamed Ali",
    id: "123245",
  },
  {
    key: "2",
    name: "Fatima Zahra",
    id: "543210",
  },
  {
    key: "3",
    name: "Ahmed Mostafa",
    id: "678901",
  },
  {
    key: "4",
    name: "Sara Nabil",
    id: "456789",
  },
  {
    key: "5",
    name: "Mohamed Ali",
    id: "111222",
  },
];

const EnrolledStudents: React.FC = () => {
  const { t } = useTranslation();

  const columns: TableColumnsType<DataType> = [
    {
      title: t("class.id"),
      dataIndex: "id",
      sorter: (a, b) => {
        const idA = Number(a.id ?? 0);
        const idB = Number(b.id ?? 0);
        return idA - idB;
      },
      onFilter: (value, record) =>
        record.id ? record.id.includes(value as string) : false,
      width: "30%",
    },
    {
      title: t("class.name"),
      dataIndex: "name",
      filters: Array.from(new Set(data.map((d) => d.name)))
        .filter((name): name is string => typeof name === "string" && name !== null)
        .map((name) => ({
          text: name,
          value: name,
        })),
      filterSearch: true,
        onFilter: (value, record) =>
          record.name
            ? record.name.includes(value as string)
            : false,
        width: "70%",
    },
  ];

  return <Table<DataType> columns={columns} dataSource={data} />;
};

export default EnrolledStudents;
