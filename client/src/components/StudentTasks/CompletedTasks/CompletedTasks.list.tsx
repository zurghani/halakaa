import { Col, Collapse, Row, Tag } from "antd";
import { AppStore } from "../../../store";
import { useSelector } from "react-redux";
import { TaskStatus } from "../../../store/types";
import TaskTypeTag from "../../Tags/TaskTypeTag";
import "./CompletedTasks.scss";

const CompletedTasksList: React.FC = () => {
    const studentTasks = useSelector((state: AppStore) => state.tasks);

    const data = studentTasks.tasks.filter(
        (task) => task.status === TaskStatus.Completed
    );
    // TODO : add explanation for why we did we for loop here
    // For loop to create mapping of keys, ensures unique key as there are many collapses on the same page
    const keyMap = new Array(studentTasks.tasks.length);
    for (let i = 0; i < studentTasks.tasks.length; i++) {
        keyMap[i] = studentTasks.tasks[i].id.toString();
    }
    const items = studentTasks.tasks.map((task, i) => ({
        key: keyMap[i],
        label: (
            <>
                <div>{task.title}</div>
                <TaskTypeTag type={task.type} closeIcon={"hide"} />
                <Tag>{task.completedOn}</Tag>
            </>
        ),
        children: (
            <>
                <Row gutter={[16, 8]}>
                    <Col span={12}>From:</Col>
                    <Col span={12}>{task.ayahs.from}</Col>

                    <Col span={12}>To:</Col>
                    <Col span={12}>{task.ayahs.to}</Col>

                    <Col span={12}>Assigned By:</Col>
                    <Col span={12}>{task.teacherId}</Col>

                    <Col span={12}>Assigned On:</Col>
                    <Col span={12}>{task.assignedOn}</Col>

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
