import React from "react";
import { useTranslation } from "react-i18next";
import StudentView from "../../components/StudentView/StudentView";

const ParentHome: React.FC = () => {
  return (
    <div>
      <StudentView />
    </div>
  );
};

export default ParentHome;
