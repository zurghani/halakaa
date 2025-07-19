import React, { useEffect, useState } from "react";
import EnrolledStudents from "../class/EnrolledStudents/EnrolledStudents";
import AssignedTasks from "../../components/StudentTasks/AssignedTasks/AssignedTasks";
import CompletedTasksTable from "../../components/StudentTasks/CompletedTasks/CompletedTasks.table";
import { Button, Col, Grid, Row, Tabs, TabsProps, Tag } from "antd";
import { EnrolledStudentsType } from "../class/EnrolledStudents/enrolled.students.dummy";
import { useTranslation } from "react-i18next";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import { useDispatch } from "react-redux";
import { setCurrentPageTitle } from "../../store/ui.slice";
import { CloseOutlined } from "@ant-design/icons";
import CompletedTasksList from "../../components/StudentTasks/CompletedTasks/CompletedTasks.list";
const { useBreakpoint } = Grid;

const RunningClass: React.FC = () => {
    const { t } = useTranslation();
    const { setButtons } = useSetButtons();
    const screens = useBreakpoint();
    const isMobile = !screens.lg;
    const [selectedStudent, setSelectedStudent] =
        useState<EnrolledStudentsType | null>(null);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("general.class")));
    }, [t]);

    useEffect(() => {
        setButtons([
            <Button icon={<CloseOutlined />}>{t("titles.exitClass")}</Button>,
        ]);
    }, []);
    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps["items"] = [
        {
            key: "tab-1",
            label: "Assigned Tasks",
            children: <AssignedTasks mode={"class"} />,
        },
        {
            key: "tab-2",
            label: "Completed Tasks",
            children: isMobile ? (
                <CompletedTasksList />
            ) : (
                <CompletedTasksTable />
            ),
        },
    ];
    return (
        <>
            <Row gutter={24}>
                {isMobile ? (
                    <div>NEED TO IMPLEMENT MOBILE STUDENT SELECT</div>
                ) : (
                    <Col span={8}>
                        <EnrolledStudents
                            selectable={true}
                            onSelect={setSelectedStudent}
                        />
                    </Col>
                )}
                <Col span={isMobile ? 24 : 16}>
                    <div>
                        {selectedStudent?.name} <Tag>{selectedStudent?.id}</Tag>
                    </div>
                    <Tabs
                        defaultActiveKey="1"
                        items={items}
                        onChange={onChange}
                    />
                </Col>
            </Row>
        </>
    );
};
export default RunningClass;
