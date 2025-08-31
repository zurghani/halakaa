import { Col, Row, Table, TableProps } from "antd";
import { useTranslation } from "react-i18next";
import { useTags } from "../../../hooks/useTags";
import { TaskWithTaskTypeAndAyahReference } from "../../../types";
import { useTaskTypes } from "../../../queries/taskTypes";

const CompletedTasksTable = ({ tasks }: { tasks: TaskWithTaskTypeAndAyahReference[] }) => {
    const { taskTypeTags } = useTags({});
    const { t } = useTranslation();
    const { data: taskTypes } = useTaskTypes();
    const tableData: TableProps["dataSource"] = tasks.map((task) => ({
        ...task,
        key: task.id,
    }));
    const columns: TableProps["columns"] = [
        {
            title: t("general.teacher"),
            dataIndex: "assignedBy",
            key: "assignedBy",

            defaultSortOrder: "descend",
            sorter: (a, b) => (a.assignedBy > b.assignedBy ? 1 : -1),
        },
        {
            title: t("general.type"),
            dataIndex: "taskType",
            key: "taskType",
            render: (taskType) => taskTypeTags[taskType.name] || taskType.name,
            filters:
                taskTypes?.map((type) => ({
                    text: type.name,
                    value: type.id,
                })) ?? [],
            onFilter: (value, record) => record.type.indexOf(value as string) === 0,
        },
        {
            title: t("general.from"),
            dataIndex: "startingAyah",
            key: "startingAyah",
            render: (ayahRef) => (ayahRef ? `(${ayahRef.number}) ${ayahRef.surahName}` : "-"),
            sorter: (a, b) => a.ayahId - b.ayahId,
        },
        {
            title: t("general.to"),
            dataIndex: "endingAyah",
            key: "endingAyah",
            render: (ayahRef) => (ayahRef ? `(${ayahRef.number}) ${ayahRef.surahName}` : "-"),
            sorter: (a, b) => a.ayahId - b.ayahId,
        },
        {
            title: t("general.date"),
            dataIndex: "createdAt",
            key: "createdAt",
            sorter: (a, b) => (a.createdAt > b.createdAt ? 1 : -1),
        },
    ];
    return (
        <>
            <Table
                columns={columns}
                pagination={false}
                expandable={{
                    expandedRowRender: (task) => (
                        <Row gutter={[16, 8]}>
                            <Col span={6}>From:</Col>
                            <Col span={6}>{task.from}</Col>

                            <Col span={6}>To:</Col>
                            <Col span={6}>{task.to}</Col>

                            <Col span={6}>Assigned On:</Col>
                            <Col span={6}>{task.assignedOn}</Col>

                            <Col span={6}>Completed On:</Col>
                            <Col span={6}>{task.completedOn}</Col>

                            <Col span={6}>Assigned By:</Col>
                            <Col span={6}>{task.assignedBy}</Col>

                            <Col span={6}>Completed By:</Col>
                            <Col span={6}>{task.completedBy}</Col>

                            <Col span={6}>Notes:</Col>
                            <Col span={6}>{task.notes}</Col>

                            <Col span={6}>Mistakes:</Col>
                            <Col span={6}>{task.mistakes}</Col>
                        </Row>
                    ),
                }}
                dataSource={tableData}
            />
        </>
    );
};

export default CompletedTasksTable;
