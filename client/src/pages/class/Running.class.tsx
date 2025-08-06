import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, Col, Grid, Row, Tabs, TabsProps, Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { AppStore } from "../../store";
import { TaskStatus } from "../../store/types";
import { useNavigate } from "react-router-dom";
import { Paths } from "../../Routes";
import AssignedTasks from "../../components/StudentTasks/AssignedTasks/AssignedTasks";
import CompletedTasksTable from "../../components/StudentTasks/CompletedTasks/CompletedTasks.table";
import CompletedTasksList from "../../components/StudentTasks/CompletedTasks/CompletedTasks.list";
import CreateTaskModal from "./components/CreateTaskModal";
import { Enrollment } from "./types";
import EnrollmentsTable from "./EnrolledStudents/EnrollmentsTable";
import { enrollmentsDummy } from "./EnrolledStudents/enrolled.students.dummy";

const { useBreakpoint } = Grid;

const RunningClass: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { setButtons } = useSetButtons();

    const screens = useBreakpoint();
    const isMobile = !screens.lg;

    const assignedTaskCount = useSelector(
        (state: AppStore) =>
            state.tasks.tasks.filter((task) => task.status === TaskStatus.Assigned).length
    );

    const completedTaskCount = useSelector(
        (state: AppStore) =>
            state.tasks.tasks.filter((task) => task.status === TaskStatus.Completed).length
    );

    const [selectedStudent, setSelectedStudent] = useState<Enrollment | null>(null);
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

    useEffect(() => {
        // update the store
    }, [selectedStudent]);

    const items: TabsProps["items"] = [
        {
            key: "assigned-tab",
            label: (
                <span>
                    {t("titles.assignedTasks")} <Badge count={assignedTaskCount} />
                </span>
            ),
            children: <AssignedTasks mode={"class"} />,
        },
        {
            key: "compl",
            label: (
                <span>
                    {t("titles.completedTasks")}{" "}
                    <Badge
                        status="default"
                        count={completedTaskCount}
                        style={{ backgroundColor: "#52c41a" }}
                    />
                </span>
            ),
            children: isMobile ? <CompletedTasksList /> : <CompletedTasksTable />,
        },
    ];
    return (
        <>
            <Row gutter={24}>
                {isMobile ? (
                    <div>NEED TO IMPLEMENT MOBILE STUDENT SELECT</div>
                ) : (
                    <Col span={8}>
                        <EnrollmentsTable
                            data={enrollmentsDummy}
                            selectable
                            onSelect={setSelectedStudent}
                        />
                    </Col>
                )}
                <Col span={isMobile ? 24 : 16}>
                    <div>
                        {selectedStudent?.studentName} <Tag>{selectedStudent?.id}</Tag>
                    </div>
                    <Tabs defaultActiveKey="1" items={items} />
                    <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
                        <CreateTaskModal />
                    </div>
                </Col>
            </Row>
        </>
    );
};
export default RunningClass;
