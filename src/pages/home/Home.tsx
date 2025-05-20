import React from "react";
import { useTranslation } from "react-i18next";
import ClassInfo from "../../components/ClassInfo/ClassInfo";

const Home: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("app.title")}</h1>
      <p>{t("app.description")}</p>
      <ClassInfo></ClassInfo>
    </div>
  );
};

export default Home;
