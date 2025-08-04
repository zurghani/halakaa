import React from "react";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TaskType } from "../types";
import TaskTypeTag from "../../../components/Tags/TaskTypeTag";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface TaskTypeTableProps {
    data: TaskType[];
    editable?: boolean;
    onDelete?: (id: number) => void;
    onCreate?: () => void;
}

const TaskTypeTable: React.FC<TaskTypeTableProps> = ({
    data,
    editable = false,
    onDelete,
    onCreate,
}) => {
    const { t } = useTranslation();
    const columns: ColumnsType<TaskType> = [
        {
            title: t("forms.id"),
            dataIndex: "id",
            key: "id",
        },
        {
            title: t("forms.name"),
            dataIndex: "name",
            key: "name",
            render: (text) => <TaskTypeTag type={text} closable={false} />,
            sorter: (a, b) => a.name.localeCompare(b.name),
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
                    Delete
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
                        {t("general.taskType")}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default TaskTypeTable;
