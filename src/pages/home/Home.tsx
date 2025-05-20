import React from "react";
import { useTranslation } from "react-i18next";
import StudentInfo from "../../components/StudentInfo/StudentInfo";

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("app.title")}</h1>
      <p>{t("app.description")}</p>
      <StudentInfo></StudentInfo>
    </div>
  );
};

export default Home;
