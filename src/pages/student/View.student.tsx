import React, { useEffect } from "react";
import StudentDetailsCard from "../../components/StudentDetailsCard/StudentDetailsCard";
import { Collapse, CollapseProps, Grid } from "antd";
import StudentAssignedTasks from "../../components/StudentTasks/AssignedTasks/StudentAssignedTasks";
import StudentCompletedTasks from "../../components/StudentTasks/CompletedTasks/StudentCompletedTasks";
import ClassesList from "./components/ClassesList/ClassesList";
import AttendanceList from "./components/AttendanceList/AttendanceList";
import { useDispatch } from "react-redux";
import { setCurrentPageTitle } from "../../store/ui.slice";
import AttendanceListMobile from "./components/AttendanceList/AttendanceListMobile";
import ClassesListMobile from "./components/ClassesList/ClassesListMobile";
import StudentCompletedTasksMobile from "../../components/StudentTasks/CompletedTasks/StudentCompletedTasksMobile";

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
      children: isMobile ? <AttendanceListMobile /> : <AttendanceList />,
    },
    {
      key: "common-2",
      label: "Classes",
      children: isMobile ? <ClassesListMobile /> : <ClassesList />,
    },
    {
      key: "common-3",
      label: "To-Do",
      children: <StudentAssignedTasks mode={"class"} />,
    },
    {
      key: "common-4",
      label: "History",
      children: isMobile ? (
        <StudentCompletedTasksMobile />
      ) : (
        <StudentCompletedTasks />
      ),
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
