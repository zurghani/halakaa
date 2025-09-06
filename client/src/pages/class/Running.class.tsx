import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Badge, Button, Col, Grid, Row, Tabs, TabsProps, Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { useNavigate, useParams } from "react-router-dom";
import { Paths } from "../../Routes";
import AssignedTasks from "../../components/StudentTasks/AssignedTasks/AssignedTasks";
import CompletedTasksTable from "../../components/StudentTasks/CompletedTasks/CompletedTasks.table";
import CompletedTasksList from "../../components/StudentTasks/CompletedTasks/CompletedTasks.list";
import CreateTaskModal from "./components/CreateTaskModal";
import EnrollmentsTable from "./Enrollments/EnrollmentsTable";
import { EnrollmentWithStudents, TaskStatus } from "../../types";
import { useEnrollments } from "../../queries/enrollments";
import { useTasks } from "../../queries/tasks";

const { useBreakpoint } = Grid;

const RunningClass: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { setButtons } = useSetButtons();
    const { id } = useParams();
    const classId = id ?? "";

    const screens = useBreakpoint();
    const isMobile = !screens.lg;

    const [selectedStudent, setSelectedStudent] = useState<EnrollmentWithStudents | null>(null);
    // Set Page Title
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("general.class")));
    }, [t]);
    // Set Buttons
    useEffect(() => {
        setButtons([
            <Button onClick={() => navigate(Paths.HOME.MAIN)} icon={<CloseOutlined />}>
                {t("titles.exitClass")}
            </Button>,
        ]);
    }, [t]);

    const { data: enrollments, isLoading: enrollmentsLoading } = useEnrollments({
        classId: classId,
    });
    const { data: studentTasks, isLoading: studentTasksLoading } = useTasks({
        studentId: selectedStudent?.student.id?.toString(),
    });

    const completedTasks = studentTasks?.filter((task) => task.status === TaskStatus.Completed);
    const assignedTasks = studentTasks?.filter((task) => task.status === TaskStatus.Assigned);

    useEffect(() => {
        // update the store
    }, [selectedStudent]);

    const items: TabsProps["items"] = [
        {
            key: "assigned-tab",
            label: (
                <span>
                    {t("titles.assignedTasks")} <Badge count={assignedTasks?.length} />
                </span>
            ),
            children: (
                <div>
                    <AssignedTasks mode={"class"} tasks={assignedTasks || []} />
                    <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
                        {selectedStudent && (
                            <CreateTaskModal
                                studentId={selectedStudent?.student.id}
                                classId={Number(classId)}
                            />
                        )}
                    </div>
                </div>
            ),
        },
        {
            key: "compl",
            label: (
                <span>
                    {t("titles.completedTasks")}{" "}
                    <Badge count={completedTasks?.length} style={{ backgroundColor: "#52c41a" }} />
                </span>
            ),
            children: isMobile ? (
                <CompletedTasksList tasks={completedTasks || []} />
            ) : (
                <CompletedTasksTable tasks={completedTasks || []} />
            ),
        },
    ];

    if (enrollmentsLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Row gutter={24}>
                {isMobile ? (
                    <div>NEED TO IMPLEMENT MOBILE STUDENT SELECT</div>
                ) : (
                    <Col span={8}>
                        <EnrollmentsTable
                            enrollments={enrollments || []}
                            selectable
                            onSelect={setSelectedStudent}
                        />
                    </Col>
                )}
                {studentTasksLoading ? (
                    <div>Loading...</div>
                ) : (
                    <Col span={isMobile ? 24 : 16}>
                        <div>
                            {selectedStudent?.student.name} <Tag>{selectedStudent?.student.id}</Tag>
                        </div>
                        <Tabs defaultActiveKey="1" items={items} />
                        {/* <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
                        <CreateTaskModal />
                    </div> */}
                    </Col>
                )}
            </Row>
        </>
    );
};
export default RunningClass;
