import React, { use, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Grid, Row, Tabs, TabsProps, Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { setCurrentPageTitle } from "../../store/ui.slice";
import EnrolledStudents from "./EnrolledStudents/EnrolledStudents";
import AssignedTasks from "../../components/StudentTasks/AssignedTasks/AssignedTasks";
import CompletedTasksTable from "../../components/StudentTasks/CompletedTasks/CompletedTasks.table";
import CompletedTasksList from "../../components/StudentTasks/CompletedTasks/CompletedTasks.list";
import { EnrolledStudentsType } from "./EnrolledStudents/enrolled.students.dummy";

const { useBreakpoint } = Grid;

const RunningClass: React.FC = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { setButtons } = useSetButtons();

    const screens = useBreakpoint();
    const isMobile = !screens.lg;

    const [selectedStudent, setSelectedStudent] = useState<EnrolledStudentsType | null>(null);
    // Set Page Title
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("general.class")));
    }, [t]);
    // Set Buttons
    useEffect(() => {
        setButtons([<Button icon={<CloseOutlined />}>{t("titles.exitClass")}</Button>]);
    }, []);

    useEffect(() => {
        // update the store
    }, [selectedStudent]);

    const items: TabsProps["items"] = [
        {
            key: "assigned-tab",
            label: "Assigned Tasks",
            children: <AssignedTasks mode={"class"} />,
        },
        {
            key: "compl",
            label: "Completed Tasks",
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
                        <EnrolledStudents selectable={true} onSelect={setSelectedStudent} />
                    </Col>
                )}
                <Col span={isMobile ? 24 : 16}>
                    <div>
                        {selectedStudent?.name} <Tag>{selectedStudent?.id}</Tag>
                    </div>
                    <Tabs defaultActiveKey="1" items={items} />
                </Col>
            </Row>
        </>
    );
};
export default RunningClass;
