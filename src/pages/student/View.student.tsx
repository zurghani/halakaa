import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Collapse, CollapseProps, Grid } from "antd";
import { setCurrentPageTitle } from "../../store/ui.slice";
import StudentDetailsCard from "../../components/StudentDetailsCard/StudentDetailsCard";
import AssignedTasks from "../../components/StudentTasks/AssignedTasks/AssignedTasks";
import CompletedTasksTable from "../../components/StudentTasks/CompletedTasks/CompletedTasks.table";
import CompletedTasksList from "../../components/StudentTasks/CompletedTasks/CompletedTasks.list";
import ClassesTable from "./components/ClassesList/Classes.table";
import ClassesList from "./components/ClassesList/Classes.list";
import AttendanceTable from "./components/AttendanceList/Attendance.table";
import AttendanceList from "./components/AttendanceList/Attendance.list";

const { useBreakpoint } = Grid;

// Common items for both roles

const ViewStudent: React.FC = () => {
  const screens = useBreakpoint();
  const isMobile = !screens.lg;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPageTitle("View Student"));
  }, []);

  const collapseItems: CollapseProps["items"] = [
    {
      key: "common-1",
      label: "Attendance",
      children: isMobile ? <AttendanceList /> : <AttendanceTable />,
    },
    {
      key: "common-2",
      label: "Classes",
      children: isMobile ? <ClassesList /> : <ClassesTable />,
    },
    {
      key: "common-3",
      label: "To-Do",
      children: <AssignedTasks mode={"class"} />,
    },
    {
      key: "common-4",
      label: "History",
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
