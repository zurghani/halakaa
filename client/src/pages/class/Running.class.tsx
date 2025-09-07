import React, { use, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Badge, Button, Checkbox, Col, Divider, Flex, Grid, Row, Tabs, TabsProps, Tag } from "antd";
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
import dayjs from "dayjs";
import {
    useAttendances,
    useCreateAttendance,
    useUpdateAttendance,
} from "../../queries/attendances";
import { authClient } from "../../lib/auth-client";

const { useBreakpoint } = Grid;

const RunningClass: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { setButtons } = useSetButtons();
    const { id } = useParams();
    const classId = id ?? "";

    const screens = useBreakpoint();
    const isMobile = !screens.md;
    const toggleTableOn = !screens.xl;

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
            children: toggleTableOn ? (
                <CompletedTasksList tasks={completedTasks || []} />
            ) : (
                <CompletedTasksTable tasks={completedTasks || []} />
            ),
        },
    ];

    const { data: attendances, isLoading: attendancesLoading } = useAttendances({
        classId: Number(classId),
        studentId: selectedStudent?.student.id.toString() || "1",
        date: dayjs().format("YYYY-MM-DD"),
    });

    const recordAttendance = () => {
        if (attendances && attendances.length > 0) {
            useUpdateAttendanceMutation.mutate(
                {
                    attendanceId: attendances[0].id,
                    updateAttendance: { status: "present" },
                },
                {
                    onSuccess: () => {
                        console.log("Attendance recorded successfully");
                    },
                }
            );
        }
    };
    const useUpdateAttendanceMutation = useUpdateAttendance();
    const removeAttendance = () => {
        if (attendances && attendances.length > 0) {
            useUpdateAttendanceMutation.mutate(
                {
                    attendanceId: attendances[0].id,
                    updateAttendance: { status: "absent" },
                },
                {
                    onSuccess: () => {
                        console.log("Attendance removed successfully");
                    },
                }
            );
        }
    };

    //TODO:  when we first load this page we need to create an attendance record for today if not exists for todays date

    if (enrollmentsLoading) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <Row gutter={24}>
                {isMobile ? (
                    <h1>
                        This page runs well only on wide screen devices! please switch for better
                        experiance
                    </h1>
                ) : (
                    <Col span={8}>
                        <EnrollmentsTable
                            enrollments={enrollments || []}
                            selectable
                            onSelect={setSelectedStudent}
                        />
                    </Col>
                )}
                {studentTasksLoading || !selectedStudent ? (
                    <Col span={isMobile ? 24 : 16}>
                        <div style={{ textAlign: "center", marginTop: "2rem" }}>
                            waiting for student to be selected..
                        </div>
                    </Col>
                ) : (
                    <Col span={isMobile ? 24 : 16}>
                        <Flex justify={"space-between"}>
                            <span>
                                <Tag>{selectedStudent?.student.id}</Tag>
                                {selectedStudent?.student.name}
                            </span>
                            <Checkbox
                                checked={
                                    attendances &&
                                    attendances.length > 0 &&
                                    attendances[0].status === "present"
                                }
                                onChange={(e) =>
                                    e.target.checked === true
                                        ? recordAttendance()
                                        : removeAttendance()
                                }>
                                Attendance <Tag>{dayjs().format("MMMM/DD")}</Tag>
                            </Checkbox>
                        </Flex>
                        <Tabs defaultActiveKey="1" items={items} style={{ marginTop: "1rem" }} />
                    </Col>
                )}
            </Row>
        </>
    );
};
export default RunningClass;
