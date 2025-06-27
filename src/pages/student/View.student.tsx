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
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

const { useBreakpoint } = Grid;

// Common items for both roles

const ViewStudent: React.FC = () => {
  const { setButtons } = useSetButtons();
  // const { id } = useParams(); // MIGHT USE IN FUTURE GET STUDENT ID FROM URL
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const isMobile = !screens.lg;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPageTitle("Student Report"));
  }, []);

  useEffect(() => {
    setButtons([
      <Button icon={<PrinterOutlined />}></Button>,
      <DownloadModal title={""} dataSelectorFunction={undefined} />,
    ]);
  }, []);

  const collapseItems: CollapseProps["items"] = [
    {
      key: "common-1",
      label: t("general.attendance"),
      children: isMobile ? <AttendanceList /> : <AttendanceTable />,
    },
    {
      key: "common-2",
      label: t("general.classes"),
      children: isMobile ? <ClassesList /> : <ClassesTable />,
    },
    {
      key: "common-3",
      label: t("general.todo"),
      children: <AssignedTasks mode="view" />,
    },
    {
      key: "common-4",
      label: t("general.history"),
      children: isMobile ? <CompletedTasksList /> : <CompletedTasksTable />,
    },
  ];

  return (
    <>
      <StudentDetailsCard />
      <Collapse items={collapseItems} />
    </>
  );
};

export default ViewStudent;
