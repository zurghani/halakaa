import React from "react";
import { useTranslation } from "react-i18next";
import StudentAssignedTasks from "../../components/StudentTasks/AssignedTasks/StudentAssignedTasks";

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("app.title")}</h1>
      <p>{t("app.description")}</p>
      <StudentAssignedTasks mode={"class"} />
    </div>
  );
};

export default Home;
