import React, { useEffect } from "react";
import StudentDetailsCard from "../../components/StudentDetailsCard/StudentDetailsCard";
import { Collapse, CollapseProps } from "antd";
import StudentAssignedTasks from "../../components/StudentTasks/AssignedTasks/StudentAssignedTasks";
import StudentCompletedTasks from "../../components/StudentTasks/CompletedTasks/StudentCompletedTasks";
import ClassesList from "./components/ClassesList/ClassesList";
import AttendanceList from "./components/AttendanceList/AttendanceList";
import { useDispatch } from "react-redux";
import { setCurrentPageTitle } from "../../store/ui.slice";

// Common items for both roles
const collapseItems: CollapseProps["items"] = [
  {
    key: "common-1",
    label: "Attendance",
    children: <AttendanceList />,
  },
  {
    key: "common-2",
    label: "Classes",
    children: <ClassesList />,
  },
  {
    key: "common-3",
    label: "To-Do",
    children: <StudentAssignedTasks mode={"class"} />,
  },
  {
    key: "common-4",
    label: "History",
    children: <StudentCompletedTasks />,
  },
];

const ViewStudent: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPageTitle("View Student"));
  }, []);
  return (
    <>
      <StudentDetailsCard />
      <Collapse items={collapseItems} />
    </>
  );
};

export default ViewStudent;
