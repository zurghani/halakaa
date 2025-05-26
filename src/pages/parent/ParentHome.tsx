import React from "react";
import { useTranslation } from "react-i18next";
import ParentStudentList from "./components/ParentStudentList/ParentStudentList";

const ParentHome: React.FC = () => {
  return (
    <div>
      <h1>Welcome</h1>
      <p>Pick a student to start</p>
      <ParentStudentList />
    </div>
  );
};

export default ParentHome;
