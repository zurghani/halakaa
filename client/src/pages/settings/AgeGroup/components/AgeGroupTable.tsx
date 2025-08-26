import React from "react";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { AgeGroup } from "../../types";
import { useTags } from "../../../../hooks/useTags";

interface AgeGroupTableProps {
    data: AgeGroup[];
    editable?: boolean;
    onDelete?: (id: number) => void;
    onCreate?: () => void;
}

const AgeGroupTable: React.FC<AgeGroupTableProps> = ({
    data,
    editable = false,
    onDelete,
    onCreate,
}) => {
    const { ageGroupTags } = useTags({});

    const { t } = useTranslation();
    const columns: ColumnsType<AgeGroup> = [
        {
            title: t("forms.id"),
            dataIndex: "id",
            key: "id",
        },
        {
            title: t("forms.ageGroup"),
            key: "ageGroup",
            render: (_, record) =>
                ageGroupTags[`${record.from} - ${record.to}`] || `${record.from} - ${record.to}`,
            sorter: (a, b) => a.from - b.from,
        },
        {
            title: t("forms.description"),
            dataIndex: "description",
            key: "description",
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
            <Table rowKey="id" dataSource={data} columns={columns} pagination={false} />
            {editable && (
                <div
                    style={{
                        marginTop: "2rem",
                        textAlign: "center",
                    }}>
                    <Button type="primary" onClick={onCreate} icon={<PlusOutlined />}>
                        {t("general.ageGroup")}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default AgeGroupTable;
