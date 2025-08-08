import React from "react";
import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useTranslation } from "react-i18next";
import { Enrollment } from "../types";

interface EnrollmentsTableProps {
    enrollments: Enrollment[];
    editable?: boolean;
    selectable?: boolean;
    onSelect?: (student: Enrollment | null) => void;
    onDelete?: (id: number) => void;
}

const EnrollmentsTable: React.FC<EnrollmentsTableProps> = ({
    enrollments: data,
    editable = false,
    selectable = false,
    onSelect,
    onDelete,
}) => {
    const { t } = useTranslation();
    const rowSelection = selectable
        ? {
              type: "radio" as const,
              onChange: (_: React.Key[], selectedRows: Enrollment[]) => {
                  const selected = selectedRows[0] || null;
                  onSelect?.(selected);
              },
          }
        : undefined;

    const columns: TableColumnsType<Enrollment> = [
        {
            title: t("class.id"),
            dataIndex: "classId",
            sorter: (a, b) => Number(a.id) - Number(b.id),
            // onFilter: (value, record) => (record.id ? record.id.includes(value as string) : false),
            width: "30%",
        },
        {
            title: t("class.name"),
            dataIndex: "studentName",
            sorter: (a, b) => ((a.studentId || "") > (b.studentId || "") ? 1 : -1),
            width: "70%",
        },
    ];

    if (editable) {
        columns.push({
            title: t("forms.delete"),
            key: "delete",
            render: (_, record) => (
                <Button danger size="small" onClick={() => onDelete?.(record.id)}>
                    {t("general.delete")}
                </Button>
            ),
        });
    }

    return (
        <div>
            <Table<Enrollment>
                rowKey="id"
                dataSource={data}
                columns={columns}
                pagination={false}
                rowSelection={rowSelection}
            />
        </div>
    );
};

export default EnrollmentsTable;
