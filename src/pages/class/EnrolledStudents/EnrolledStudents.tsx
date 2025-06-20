import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { useTranslation } from "react-i18next";
import {
  EnrolledStudentsData,
  EnrolledStudentsType,
} from "./enrolled.students.dummy";

const EnrolledStudents: React.FC = () => {
  const { t } = useTranslation();

  const columns: TableColumnsType<EnrolledStudentsType> = [
    {
      title: t("class.id"),
      dataIndex: "id",
      sorter: (a, b) => Number(a.id) - Number(b.id),
      onFilter: (value, record) =>
        record.id ? record.id.includes(value as string) : false,
      width: "30%",
    },
    {
      title: t("class.name"),
      dataIndex: "name",
      sorter: (a, b) => ((a.name || "") > (b.name || "") ? 1 : -1),
      width: "70%",
    },
  ];

  return (
    <Table<EnrolledStudentsType>
      columns={columns}
      dataSource={EnrolledStudentsData}
    />
  );
};

export default EnrolledStudents;
