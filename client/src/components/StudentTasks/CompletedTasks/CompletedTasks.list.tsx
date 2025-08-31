import { Col, Collapse, Row, Tag } from "antd";
import "./CompletedTasks.scss";
import { useTags } from "../../../hooks/useTags";
import { TaskWithTaskTypeAndAyahReference } from "../../../types";

const CompletedTasksList = ({ tasks }: { tasks: TaskWithTaskTypeAndAyahReference[] }) => {
    const { taskTypeTags } = useTags({});

    // TODO : add explanation for why we did we for loop here
    // For loop to create mapping of keys, ensures unique key as there are many collapses on the same page

    const items = tasks.map((task, i) => ({
        key: `completed-${task.id}`,
        label: (
            <>
                <Tag>{task.id}</Tag>
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
                    <Col span={12}>{task.assignedBy}</Col>

                    <Col span={12}>Assigned On:</Col>
                    <Col span={12}>{task.createdAt}</Col>

                    <Col span={12}>Completed On:</Col>
                    <Col span={12}>{task.completedOn}</Col>

                    <Col span={12}>Completed By:</Col>
                    <Col span={12}>{task.completedBy}</Col>

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
