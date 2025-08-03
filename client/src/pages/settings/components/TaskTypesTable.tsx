import React from "react";
import { Table, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { TaskType } from "../types";
import TaskTypeTag from "../../../components/Tags/TaskTypeTag";
import { PlusOutlined } from "@ant-design/icons";

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
    const columns: ColumnsType<TaskType> = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            render: (text) => <TaskTypeTag type={text} />,
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
        },
    ];

    if (editable) {
        columns.push({
            title: "Delete",
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
                <div style={{ marginTop: 16, textAlign: "right" }}>
                    <Button type="primary" onClick={onCreate} icon={<PlusOutlined />}>
                        Task Type
                    </Button>
                </div>
            )}
        </div>
    );
};

export default TaskTypeTable;
