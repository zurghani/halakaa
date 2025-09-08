import { Col, Collapse, Row, Tag } from "antd";
import "./CompletedTasks.scss";
import { useTags } from "../../../hooks/useTags";
import { TaskExpanded } from "../../../types";
import dayjs from "dayjs";

const CompletedTasksList = ({ tasks }: { tasks: TaskExpanded[] }) => {
    const { taskTypeTags } = useTags({});

    const items = tasks.map((task, i) => ({
        key: `completed-${task.id}`,
        label: (
            <>
                <Tag>{i + 1}</Tag>
                {task.taskType?.name ? taskTypeTags[task.taskType?.name] : null}
                <Tag>{task.completedOn}</Tag>
            </>
        ),
        children: (
            <>
                <Row gutter={[16, 8]}>
                    <Col span={12}>From:</Col>
                    <Col span={12}>
                        {task.startingAyah
                            ? `(${task.startingAyah.number}) ${task.startingAyah.surahName}`
                            : "-"}
                    </Col>

                    <Col span={12}>To:</Col>
                    <Col span={12}>
                        {task.endingAyah
                            ? `(${task.endingAyah.number}) ${task.endingAyah.surahName}`
                            : "-"}
                    </Col>

                    <Col span={12}>Assigned By:</Col>
                    <Col span={12}>{task.assignedBy?.name}</Col>

                    <Col span={12}>Assigned On:</Col>
                    <Col span={12}>{dayjs(task.createdAt).format("YYYY-MM-DD")}</Col>

                    <Col span={12}>Completed On:</Col>
                    <Col span={12}>{dayjs(task.completedOn).format("YYYY-MM-DD")}</Col>

                    <Col span={12}>Completed By:</Col>
                    <Col span={12}>{task.completedBy?.name}</Col>

                    <Col span={12}>Notes:</Col>
                    <Col span={12}>{task.notes}</Col>

                    <Col span={12}>Mistakes:</Col>
                    <Col span={12}>{task.mistakes}</Col>
                </Row>
            </>
        ),
    }));
    return (
        <div className="outline">
            <Collapse accordion items={items} collapsible="icon" />
        </div>
    );
};

export default CompletedTasksList;
