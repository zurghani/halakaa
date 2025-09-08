import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button, Collapse, CollapseProps, Grid } from "antd";
import { setCurrentPageTitle } from "../../store/ui.slice";
import StudentDetailsCard from "../../components/StudentDetailsCard/StudentDetailsCard";
import AssignedTasks from "../../components/StudentTasks/AssignedTasks/AssignedTasks";
import CompletedTasksTable from "../../components/StudentTasks/CompletedTasks/CompletedTasks.table";
import CompletedTasksList from "../../components/StudentTasks/CompletedTasks/CompletedTasks.list";
import ClassesTable from "./components/ClassesList/Classes.table";
import ClassesList from "./components/ClassesList/Classes.list";
import AttendanceTable from "./components/AttendanceList/Attendance.table";
import AttendanceList from "./components/AttendanceList/Attendance.list";
import { useSetButtons } from "../../layouts/PageLayout/PageLayout";
import DownloadModal from "../../components/ExportModal/DownloadModal";
import { PrinterOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ActionButton } from "../../components/Button/ActionButton";
import { Paths } from "../../Routes";
import { useStudent } from "../../queries/students";
import { useAttendances } from "../../queries/attendances";
import { useClasses } from "../../queries/classes";
import { useTasks } from "../../queries/tasks";
import { TaskStatus } from "../../types";
import { authClient } from "../../lib/auth-client";
import { UserRole } from "../../types";

const { useBreakpoint } = Grid;

// Common items for both roles

const ViewStudent: React.FC = () => {
    const userRole = authClient.useSession()?.data?.user.role || "guest";
    const navigate = useNavigate();
    const { setButtons } = useSetButtons();
    const { t } = useTranslation();
    const screens = useBreakpoint();
    const { id } = useParams<{ id: string }>();
    const isMobile = !screens.lg;
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrentPageTitle(t("titles.viewStudent")));
    }, [t]);

    useEffect(() => {
        setButtons([
            <Button icon={<PrinterOutlined />}></Button>,
            <DownloadModal title={""} dataSelectorFunction={undefined} />,
            userRole === UserRole.Admin && (
                <ActionButton
                    key="edit"
                    onClick={() => navigate(Paths.STUDENT.EDIT.replace(":id", id || ""))}>
                    {t("titles.editStudent")}
                </ActionButton>
            ),
        ]);
    }, [t]);
    const { data: attendanceData, isLoading: attendanceLoading } = useAttendances({
        studentId: id,
    });
    const { data: student, isLoading: studentLoading } = useStudent(id ?? "");
    const { data: classes, isLoading: classesLoading } = useClasses({ studentId: id });
    const { data: tasks, isLoading: tasksLoading } = useTasks({ studentId: id });

    const completedTasks = tasks?.filter((task) => task.status === TaskStatus.Completed);
    const assignedTasks = tasks?.filter((task) => task.status === TaskStatus.Assigned);
    // console.log("TASKS", tasksWithTaskTypesAndAyahs, ayahRefMap);

    const collapseItems: CollapseProps["items"] = [
        {
            key: "common-1",
            label: t("general.attendance"),
            children: isMobile ? (
                <AttendanceList attendance={attendanceData || []} />
            ) : (
                <AttendanceTable attendance={attendanceData || []} />
            ),
        },
        {
            key: "common-2",
            label: t("general.classes"),
            children: isMobile ? (
                <ClassesList classes={classes || []} />
            ) : (
                <ClassesTable classes={classes || []} />
            ),
        },
        {
            key: "common-3",
            label: t("general.todo"),
            children: <AssignedTasks mode="view" tasks={assignedTasks ?? []} />,
        },
        {
            key: "common-4",
            label: t("general.history"),
            children: isMobile ? (
                <CompletedTasksList tasks={completedTasks || []} />
            ) : (
                <CompletedTasksTable tasks={completedTasks || []} />
            ),
        },
    ];

    if (studentLoading || attendanceLoading || classesLoading || tasksLoading) {
        return <div>Loading...</div>;
    }
    if (!student) {
        return <div>Student not found</div>;
    }

    return (
        <>
            <StudentDetailsCard student={student} />
            <Collapse items={collapseItems} />
        </>
    );
};

export default ViewStudent;
