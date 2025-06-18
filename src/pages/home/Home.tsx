import React from "react";
import { useTranslation } from "react-i18next";
import StudentAssignedTasks from "../../components/StudentTasks/AssignedTasks/StudentAssignedTasks";
import StudentCompletedTasks from "../../components/StudentTasks/CompletedTasks/StudentCompletedTasks";

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("app.title")}</h1>
      <p>{t("app.description")}</p>
      <StudentAssignedTasks mode={"class"} />
      <StudentCompletedTasks />
    </div>
  );
};

export default Home;
