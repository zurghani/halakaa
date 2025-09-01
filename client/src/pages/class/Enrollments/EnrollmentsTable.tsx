import React, { useState } from "react";
import { Button, Table } from "antd";
import type { TableColumnsType } from "antd";
import { useTranslation } from "react-i18next";
import { EnrollmentWithStudents } from "../../../types";
import { enrollments } from "server/src/db/schema";
import { PlusOutlined } from "@ant-design/icons";

interface EnrollmentsTableProps {
    enrollments: EnrollmentWithStudents[];
    editable?: boolean;
    selectable?: boolean;
    onSelect?: (student: EnrollmentWithStudents | null) => void;
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
    console.log("DATA", enrollments);
    const rowSelection = selectable
        ? {
              type: "radio" as const,
              selectedRowKeys,
              onChange: (keys: React.Key[], selectedRows: EnrollmentWithStudents[]) => {
                  setSelectedRowKeys(keys);
                  onSelect?.(selectedRows[0] || null);
              },
          }
        : undefined;

    const columns: TableColumnsType<EnrollmentWithStudents> = [
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
            render: (student) => student?.name,
            sorter: (a, b) => ((a.student.id || "") > (b.student.id || "") ? 1 : -1),
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
            <Table<EnrollmentWithStudents>
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
            {editable && (
                <div
                    style={{
                        marginTop: "2rem",
                        textAlign: "center",
                    }}>
                    <Button type="primary" icon={<PlusOutlined />} onClick={onCreate}>
                        {t("general.enrollment")}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default EnrollmentsTable;
