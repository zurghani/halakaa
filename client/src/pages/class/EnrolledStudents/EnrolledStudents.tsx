import React from "react";
import { Table } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { useTranslation } from "react-i18next";
import { EnrolledStudentsData, EnrolledStudentsType } from "./enrolled.students.dummy";

interface EnrolledStudentsProps {
    selectable?: boolean;
    onSelect?: (student: EnrolledStudentsType | null) => void;
}

const EnrolledStudents: React.FC<EnrolledStudentsProps> = ({ selectable, onSelect }) => {
    const { t } = useTranslation();
    const rowSelection = selectable
        ? {
              type: "radio" as const,
              onChange: (_: React.Key[], selectedRows: EnrolledStudentsType[]) => {
                  const selected = selectedRows[0] || null;
                  onSelect?.(selected);
              },
          }
        : undefined;

    const columns: TableColumnsType<EnrolledStudentsType> = [
        {
            title: t("class.id"),
            dataIndex: "id",
            sorter: (a, b) => Number(a.id) - Number(b.id),
            onFilter: (value, record) => (record.id ? record.id.includes(value as string) : false),
            width: "30%",
        },
        {
            title: t("class.name"),
            dataIndex: "name",
            sorter: (a, b) => ((a.name || "") > (b.name || "") ? 1 : -1),
            width: "70%",
        },
    ];

    return <Table<EnrolledStudentsType> rowKey="id" rowSelection={rowSelection} columns={columns} dataSource={EnrolledStudentsData} />;
};

export default EnrolledStudents;
