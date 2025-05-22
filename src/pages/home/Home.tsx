import React from "react";
import { useTranslation } from "react-i18next";
import StudentView from "../../components/StudentView/StudentView";

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("app.title")}</h1>
      <p>{t("app.description")}</p>
      <StudentView />
    </div>
  );
};

export default Home;
