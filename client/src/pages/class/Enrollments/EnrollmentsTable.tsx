import React, { useState } from "react";
import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useTranslation } from "react-i18next";
import { EnrollmentWithStudent } from "../../../types";

interface EnrollmentsTableProps {
    enrollments: EnrollmentWithStudent[];
    editable?: boolean;
    selectable?: boolean;
    onSelect?: (student: EnrollmentWithStudent | null) => void;
    onDelete?: (id: number) => void;
    onCreate?: () => void;
}

const EnrollmentsTable: React.FC<EnrollmentsTableProps> = ({
    enrollments: data,
    editable = false,
    selectable = false,
    onSelect,
    onDelete,
    onCreate,
}) => {
    const { t } = useTranslation();
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    const rowSelection = selectable
        ? {
              type: "radio" as const,
              selectedRowKeys,
              onChange: (keys: React.Key[], selectedRows: EnrollmentWithStudent[]) => {
                  setSelectedRowKeys(keys);
                  onSelect?.(selectedRows[0] || null);
              },
          }
        : undefined;

    const columns: TableColumnsType<EnrollmentWithStudent> = [
        {
            title: t("general.enrollment"),
            dataIndex: "id",
            key: "id",
            sorter: (a, b) => Number(a.id) - Number(b.id),
            width: "30%",
        },
        {
            title: t("class.name"),
            dataIndex: "student",
            key: "student",
            render: (student) => student?.fullName,
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
            <Table<EnrollmentWithStudent>
                rowKey="id"
                dataSource={data}
                columns={columns}
                pagination={false}
                rowSelection={rowSelection}
                onRow={(record) =>
                    selectable
                        ? {
                              onClick: () => {
                                  setSelectedRowKeys([record.id]);
                                  onSelect?.(record);
                              },
                          }
                        : {}
                }
            />
        </div>
    );
};

export default EnrollmentsTable;
