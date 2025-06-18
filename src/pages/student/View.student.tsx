import React from "react";
import PageLayout from "../../layouts/PageLayout/PageLayout";
import StudentDetailsCard from "../../components/StudentDetailsCard/StudentDetailsCard";
import { Collapse, CollapseProps } from "antd";
import Panel from "antd/es/splitter/Panel";
import { AppStore } from "../../store";
import { useSelector } from "react-redux";
import { UserRole } from "../../store/types";
import StudentAssignedTasks from "../../components/StudentTasks/AssignedTasks/StudentAssignedTasks";
import StudentCompletedTasks from "../../components/StudentTasks/CompletedTasks/StudentCompletedTasks";

// Common items for both roles
const commonItems = [
  {
    key: "common-1",
    label: "Attendance",
    children: <p>Content visible to everyone</p>,
  },
];

// Teacher-specific items
const teacherItems = [
  {
    key: "teacher-1",
    label: "Classes",
    children: <p>Classes Componenet In Development</p>,
  },
  {
    key: "teacher-2",
    label: "Tasks",
    children: <StudentAssignedTasks mode={"class"} />,
  },
];

// Parent-specific items
const parentItems = [
  {
    key: "parent-1",
    label: "To-Do? will use Assigned Task as temp",
    children: <StudentAssignedTasks mode={"view"} />,
  },
  {
    key: "parent-2",
    label: "History",
    children: <StudentCompletedTasks />,
  },
];

const ViewStudent: React.FC = () => {
  const userRole = useSelector((state: AppStore) => state.user.role) || "admin";

  const getCollapseItems = () => {
    const userRoleItems =
      userRole === UserRole.Teacher
        ? teacherItems
        : userRole === UserRole.Parent
          ? parentItems
          : [];
    return [...commonItems, ...userRoleItems];
  };
  return (
    <>
      <StudentDetailsCard />
      <Collapse items={getCollapseItems()} />
    </>
  );
};

export default ViewStudent;
